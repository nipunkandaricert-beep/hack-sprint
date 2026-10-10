# 🌿 DoseBuddy — Smart Prescription Reminder & Health Companion

> **DoseBuddy** is an accessible, privacy-focused web application designed to help patients and caregivers extract, verify, schedule, and track daily medication regimens effortlessly using AI OCR and Google Calendar sync.

---

## 🌟 Key Features

### 📷 1. Multi-Medicine AI OCR Scanner
* **Dual OCR Processing Engines**:
  * **Browser Engine (Tesseract.js)**: Runs 100% offline client-side using a **3-Pass Intelligent Parser** (Line-by-Line Context Scanning + Word-Level Extraction + Global Medical Knowledge Base Fallback).
  * **Backend Engine (FastAPI + Google Gemini AI)**: High-precision OCR API (`New folder/main.py`) powered by Gemini models for instant parsing.
* **Handwritten & Regional Prescription Support**:
  * Recognizes handwritten symbols, circled item prefixes (`(1) Tab.`, `① Tab.`), plus-separated frequencies (`1 + 0 + 1`, `0 + 1 + 0`), and Bengali numerical digits (`১`, `২`, `০`).
* **Multi-Medicine Batch Confirmation Modal**:
  * Edit, add, or remove multiple extracted medications in a single interactive modal before generating schedules.

---

### 📅 2. Daily Schedule & Adherence Tracking
* **3-Time-Slot Schedule Grid**: Organizes medication intake across **Morning (08:00 AM)**, **Afternoon (01:00 PM)**, and **Night (09:00 PM)**.
* **Adherence Score Ring**: Visual circular progress bar tracking daily compliance percentage.
* **Date Navigation**: Easily jump between Past, Today, and Tomorrow's schedules.
* **Senior Accessibility Mode (`👓 Senior View`)**: Large high-contrast text, 52px+ touch targets, accessible focus rings, and high-visibility borders for elderly users.

---

### 🗓️ 3. Google Calendar & iCal Export
* **Google Calendar Quick Sync**: 1-click deep link to create daily recurring calendar reminders on phone & smartwatch.
* **Standardized `.ICS` Export**: Download universal `.ics` calendar files compatible with Apple iCal, Microsoft Outlook, and Google Calendar.

---

### 📦 4. Pill Refill & Stock Tracker
* **Automatic Inventory Deduction**: Pill counts decrease dynamically as doses are marked as taken.
* **Low-Stock Warnings**: Triggers warning badges when pill stock drops below 5 pills.
* **1-Click Refill Action**: Quickly top-up pill counts.

---

### 🛡️ 5. Caregiver Safety Net & Interaction Matrix
* **Caregiver Alert System**: Dispatches instant notifications (Email / Phone / WhatsApp) if a critical dose is skipped.
* **Drug Interaction Safety Matrix**: Real-time checking against drug-drug interaction pairs (e.g., *Aspirin + Ibuprofen*, *Metformin + Alcohol*).

---

### 🌍 6. Multi-Language & Offline First
* **Multi-Language Support**: Switch seamlessly between **English**, **Hindi (हिंदी)**, and **Telugu (తెలుగు)**.
* **Offline Local Mode**: Saves all state to browser `localStorage` with optional Caregiver/Patient role login.

---

## 🛠️ Project Structure

```
hack-sprint/
├── index.html              # Main single-page application structure & UI layout
├── styles.css              # Custom Tailwind CSS theme rules (Sage-Green Healthcare design)
├── app.js                  # Core application logic, state management, OCR parser, modals
├── sample_prescriptions.js # Synthetic multi-medicine sample prescription slips & canvas generator
├── .gitignore              # Ignored files (dist/, node_modules/, temp files)
└── New folder/             # Backend Python FastAPI module
    ├── main.py             # FastAPI backend endpoint (CORS, Gemini AI image OCR fallback)
    ├── requirements.txt    # Python dependencies (fastapi, uvicorn, google-genai)
    └── README-STEP-BY-STEP.txt
```

---

## 🚀 Quick Start Guide

### Option 1: Standalone Frontend (No Backend Required)
1. Open `index.html` directly in any web browser, or serve it using Python:
   ```bash
   python -m http.server 8081
   ```
2. Open `http://localhost:8081` in your browser.
3. Upload any prescription photo or click **"Try Sample Prescription Card"** to test the scanner!

---

### Option 2: Running with Optional Gemini AI Backend
1. Navigate to the backend directory:
   ```bash
   cd "New folder"
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set your Google Gemini API key in an `.env` file inside `New folder/`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
5. Health check endpoint: `http://127.0.0.1:8000/api/health`

---

## ⚠️ Medical Disclaimer
> **DoseBuddy** is an educational and scheduling tool only. It does **NOT** provide medical advice, diagnosis, or treatment. Users must always double-check AI-extracted dosage and medication details with a qualified healthcare professional.
