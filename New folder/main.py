import json
import os
import re
from io import BytesIO
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError

# Load .env from multiple potential locations reliably
base_dir = Path(__file__).resolve().parent
load_dotenv(base_dir / ".env")
load_dotenv(Path.cwd() / ".env")
load_dotenv(base_dir.parent / ".env")

app = FastAPI(title="DoseBuddy Prescription Extraction API", version="2.0.0")

# Permissive CORS for seamless local development across any frontend port (8080, 8081, 5173, 3000, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

VALID_PERIODS = {"Morning", "Afternoon", "Night"}
SUPPORTED_FORMATS = {"PNG", "JPEG", "JPG", "WEBP", "BMP", "TIFF", "MPO"}


def get_api_key() -> str:
    """Retrieve Gemini API key from environment variables."""
    return (
        os.getenv("GEMINI_API_KEY", "").strip()
        or os.getenv("GOOGLE_API_KEY", "").strip()
        or os.getenv("GOOGLE_GENAI_API_KEY", "").strip()
    )


@app.get("/")
def home():
    return {
        "message": "DoseBuddy Prescription Extraction API is active and running!",
        "endpoints": {
            "health": "/api/health",
            "extract": "/api/extract",
            "extract_compat": "/api/prescriptions/extract",
        },
    }


@app.get("/api/health")
def health():
    key = get_api_key()
    return {
        "status": "healthy",
        "app": "DoseBuddy",
        "gemini_configured": bool(key),
        "model": os.getenv("GEMINI_MODEL", "gemini-2.0-flash"),
    }


def clean_json_response(text: str) -> Dict[str, Any]:
    """Robustly parse JSON from LLM output, handling markdown code fences and whitespace."""
    if not text:
        raise ValueError("Empty response received from Gemini.")

    text = text.strip()

    # Remove markdown code fences if present (```json ... ```)
    if "```" in text:
        match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text, re.IGNORECASE)
        if match:
            text = match.group(1).strip()

    # Find the outermost JSON object brackets
    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1 or end < start:
        # Check if an array was returned directly
        arr_start = text.find("[")
        arr_end = text.rfind("]")
        if arr_start != -1 and arr_end > arr_start:
            arr_data = json.loads(text[arr_start:arr_end + 1])
            return {"medicines": arr_data}
        raise ValueError("No JSON structure found in Gemini response.")

    json_str = text[start:end + 1]
    return json.loads(json_str)


def normalize_frequency(freq_str: str) -> str:
    """Normalize frequencies to standard patterns (e.g., 1-0-1) where applicable."""
    s = freq_str.strip().lower()
    if not s:
        return "1-0-1"
    
    # Direct match for digit patterns like 1-0-1, 1-1-1, 0-0-1, 1 0 1, 1-0-0
    pattern_match = re.search(r"([0-2])\s*[-–—/,\s]\s*([0-2])\s*[-–—/,\s]\s*([0-2])", s)
    if pattern_match:
        return f"{pattern_match.group(1)}-{pattern_match.group(2)}-{pattern_match.group(3)}"

    if "three" in s or "tid" in s or "thrice" in s or "3 times" in s:
        return "1-1-1"
    if "twice" in s or "bid" in s or "2 times" in s or "morning and night" in s or "morning and evening" in s:
        return "1-0-1"
    if "bedtime" in s or "night" in s or "hs" in s or "sleep" in s:
        return "0-0-1"
    if "morning only" in s or "daily morning" in s or "breakfast" in s:
        return "1-0-0"
    if "once" in s or "od" in s or "daily" in s:
        return "1-0-0"

    return freq_str


async def extract_file_from_request(
    file: Optional[UploadFile] = None,
    image: Optional[UploadFile] = None,
    prescription: Optional[UploadFile] = None,
    request: Optional[Request] = None,
) -> UploadFile:
    """Accept uploads under various field names (file, image, prescription, or form data)."""
    if file and file.filename:
        return file
    if image and image.filename:
        return image
    if prescription and prescription.filename:
        return prescription

    if request:
        try:
            form = await request.form()
            for key in ["file", "image", "prescription", "photo", "document"]:
                val = form.get(key)
                if isinstance(val, UploadFile) and val.filename:
                    return val
            # Fallback: grab any UploadFile from form
            for val in form.values():
                if isinstance(val, UploadFile) and val.filename:
                    return val
        except Exception:
            pass

    raise HTTPException(status_code=400, detail="No prescription image file found in the request.")


async def _extract_handler(
    file: Optional[UploadFile] = None,
    image: Optional[UploadFile] = None,
    prescription: Optional[UploadFile] = None,
    request: Optional[Request] = None,
) -> Dict[str, Any]:
    target_file = await extract_file_from_request(file, image, prescription, request)

    raw_bytes = await target_file.read()
    if not raw_bytes:
        raise HTTPException(status_code=400, detail="The uploaded image file is empty.")

    if len(raw_bytes) > 15 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image must be 15 MB or smaller.")

    # Validate image format using PIL
    mime_type = "image/jpeg"
    try:
        with Image.open(BytesIO(raw_bytes)) as img:
            img_format = (img.format or "").upper()
            if img_format not in SUPPORTED_FORMATS:
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported image format: {img_format}. Please upload a PNG, JPG, or WEBP image.",
                )
            # Map standard MIME types
            if img_format == "PNG":
                mime_type = "image/png"
            elif img_format in ("JPEG", "JPG", "MPO"):
                mime_type = "image/jpeg"
            elif img_format == "WEBP":
                mime_type = "image/webp"
            elif img_format == "BMP":
                mime_type = "image/bmp"
            elif img_format == "TIFF":
                mime_type = "image/tiff"
    except (UnidentifiedImageError, OSError) as img_err:
        raise HTTPException(
            status_code=400,
            detail="That image could not be decoded. Please upload a valid PNG, JPG, or WEBP photo.",
        )

    api_key = get_api_key()
    if not api_key:
        return {
            "mode": "manual",
            "message": "AI extraction is not configured (GEMINI_API_KEY missing). Please enter details manually.",
            "medicines": [],
            "needs_review": True,
        }

    # Execute Gemini Extraction
    prompt = """You are an OCR and medical prescription parsing assistant for a patient reminder app.
Extract all medications visible in this prescription image.
Return ONLY a valid JSON object matching this exact schema:
{
  "medicines": [
    {
      "name": "Medicine Name",
      "dose": "Dosage (e.g. 500mg, 1 tablet, 10ml)",
      "frequency": "Timing pattern (e.g. 1-0-1, 1-1-1, 0-0-1, 1-0-0, or Once Daily)",
      "period": "Morning, Afternoon, or Night (if clearly specified, otherwise leave empty)",
      "instructions": "Special instructions (e.g. Take after food, with water)",
      "uncertain_fields": []
    }
  ]
}
Rules:
1. Transcribe ONLY what is clearly visible on the prescription.
2. If any field (name, dose, timing) is illegible or ambiguous, list the field name inside 'uncertain_fields'.
3. Do not invent details.
4. Output strictly raw JSON."""

    # Models to attempt in order of availability
    configured_model = os.getenv("GEMINI_MODEL", "").strip()
    candidate_models = [m for m in [configured_model, "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"] if m]

    last_error: Optional[Exception] = None

    # Try using google.genai SDK
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        for model_name in candidate_models:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=[
                        prompt,
                        types.Part.from_bytes(data=raw_bytes, mime_type=mime_type),
                    ],
                    config=types.GenerateContentConfig(
                        response_mime_type="application/json",
                        temperature=0.1,
                    ),
                )
                response_text = response.text or ""
                result = clean_json_response(response_text)
                return _format_extracted_medicines(result)
            except Exception as e:
                last_error = e
                # Try next model candidate if model is not found / deprecated
                continue

    except ImportError:
        # Fallback to legacy google.generativeai if installed
        try:
            import google.generativeai as legacy_genai

            legacy_genai.configure(api_key=api_key)
            for model_name in candidate_models:
                try:
                    model = legacy_genai.GenerativeModel(model_name)
                    response = model.generate_content(
                        [prompt, {"mime_type": mime_type, "data": raw_bytes}],
                        generation_config={"temperature": 0.1},
                    )
                    result = clean_json_response(response.text or "")
                    return _format_extracted_medicines(result)
                except Exception as e:
                    last_error = e
                    continue
        except Exception as e:
            last_error = e

    # If all candidate models or SDK attempts fail
    error_msg = f"{type(last_error).__name__}: {str(last_error)}" if last_error else "Unknown extraction error"
    print(f"[DoseBuddy OCR Backend] Extraction error: {error_msg}")

    return {
        "mode": "manual",
        "message": "AI extraction encountered an issue. Please verify or manually enter medication details.",
        "medicines": [],
        "needs_review": True,
        "detail": error_msg[:200],
    }


def _format_extracted_medicines(result: Dict[str, Any]) -> Dict[str, Any]:
    raw_medicines = result.get("medicines", [])
    if isinstance(raw_medicines, dict):
        raw_medicines = [raw_medicines]
    elif not isinstance(raw_medicines, list):
        raw_medicines = []

    medicines = []
    for item in raw_medicines[:30]:
        if not isinstance(item, dict):
            continue

        raw_name = str(item.get("name", "")).strip()[:150]
        if not raw_name:
            continue

        raw_dose = str(item.get("dose", "")).strip()[:100]
        raw_freq = str(item.get("frequency", "")).strip()[:100]
        norm_freq = normalize_frequency(raw_freq)

        period = str(item.get("period", "")).strip().capitalize()
        if period not in VALID_PERIODS:
            period = ""

        instructions = str(item.get("instructions", "")).strip()[:300]
        uncertain = item.get("uncertain_fields", [])
        if not isinstance(uncertain, list):
            uncertain = []

        medicines.append({
            "name": raw_name,
            "dose": raw_dose or "1 dose",
            "frequency": norm_freq,
            "period": period,
            "instructions": instructions or "Take as directed by physician",
            "uncertain_fields": [str(u)[:80] for u in uncertain[:15]],
        })

    return {
        "mode": "ai",
        "message": f"Successfully extracted {len(medicines)} medication(s). Please review and confirm before scheduling.",
        "medicines": medicines,
        "needs_review": True,
        "count": len(medicines),
    }


@app.post("/api/extract")
async def extract_prescription(
    file: Optional[UploadFile] = File(None),
    image: Optional[UploadFile] = File(None),
    prescription: Optional[UploadFile] = File(None),
    request: Request = None,
):
    return await _extract_handler(file=file, image=image, prescription=prescription, request=request)


@app.post("/api/prescriptions/extract")
async def extract_prescription_compat(
    file: Optional[UploadFile] = File(None),
    image: Optional[UploadFile] = File(None),
    prescription: Optional[UploadFile] = File(None),
    request: Request = None,
):
    return await _extract_handler(file=file, image=image, prescription=prescription, request=request)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
