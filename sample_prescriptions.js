/**
 * DoseBuddy - Sample Prescription Data & Image Canvas Generators
 * Provides dummy data for testing without using real patient data.
 */

const SAMPLE_PRESCRIPTIONS = [
  {
    id: "sample-rx-1",
    title: "Amoxicillin 500mg",
    doctor: "Dr. A. Smith, M.D. (General Health)",
    patient: "Jane Doe (Sample Patient)",
    medication: "Amoxicillin",
    dosage: "500 mg",
    frequency: "1-0-1",
    frequencyText: "1 Morning - 0 Afternoon - 1 Night",
    instructions: "Take 1 capsule twice daily after meals with full glass of water.",
    pillsStock: 20,
    rawText: "Rx: Amoxicillin 500mg Capsules\nSig: 1-0-1 (Take 1 cap in morning & 1 cap at night after meals)\nQty: 20 Capsules",
    colorScheme: "blue"
  },
  {
    id: "sample-rx-2",
    title: "Metformin 500mg",
    doctor: "Dr. R. Gupta, Endocrinologist",
    patient: "John Smith (Sample Patient)",
    medication: "Metformin",
    dosage: "500 mg",
    frequency: "1-1-1",
    frequencyText: "1 Morning - 1 Afternoon - 1 Night",
    instructions: "Take 1 tablet 3 times daily with meals for glucose control.",
    pillsStock: 45,
    rawText: "Rx: Metformin HCl 500mg Tablets\nSig: 1-1-1 (1 tablet morning, 1 afternoon, 1 night with food)\nQty: 45 Tablets",
    colorScheme: "amber"
  },
  {
    id: "sample-rx-3",
    title: "Atorvastatin 10mg",
    doctor: "Dr. M. Jenkins, Cardiologist",
    patient: "Robert Lee (Sample Patient)",
    medication: "Atorvastatin",
    dosage: "10 mg",
    frequency: "0-0-1",
    frequencyText: "0 Morning - 0 Afternoon - 1 Night",
    instructions: "Take 1 tablet at bedtime for cholesterol.",
    pillsStock: 30,
    rawText: "Rx: Atorvastatin 10mg\nSig: 0-0-1 (Take 1 tablet at bedtime)\nQty: 30 Tablets",
    colorScheme: "indigo"
  },
  {
    id: "sample-rx-4",
    title: "Aspirin 81mg (Low Dose)",
    doctor: "Dr. M. Jenkins, Cardiologist",
    patient: "Robert Lee (Sample Patient)",
    medication: "Aspirin",
    dosage: "81 mg",
    frequency: "1-0-0",
    frequencyText: "1 Morning - 0 Afternoon - 0 Night",
    instructions: "Take 1 tablet every morning with breakfast.",
    pillsStock: 60,
    rawText: "Rx: Aspirin Low Dose 81mg\nSig: 1-0-0 (Take 1 tablet in morning)\nQty: 60 Tablets",
    colorScheme: "rose"
  }
];

/**
 * Creates a synthetic prescription canvas image URL for visual OCR testing
 */
function createPrescriptionCanvasImage(rx) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header Banner
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, canvas.width, 70);

  // Clinic Header
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText("CITY HEALTH CLINIC (SAMPLE RX)", 20, 35);
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(rx.doctor + " | Tel: (555) 019-2831", 20, 56);

  // Rx Symbol
  ctx.fillStyle = "#2563eb";
  ctx.font = "bold 48px serif";
  ctx.fillText("℞", 25, 130);

  // Details
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText(`Medicine: ${rx.medication} ${rx.dosage}`, 90, 115);

  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#1e40af";
  ctx.fillText(`Dosage Schedule: ${rx.frequency}`, 90, 145);

  ctx.fillStyle = "#334155";
  ctx.font = "14px sans-serif";
  ctx.fillText(`Instructions: ${rx.instructions}`, 90, 175);
  ctx.fillText(`Patient: ${rx.patient}`, 90, 205);
  ctx.fillText(`Date: 2026-10-09 | Refills: 3`, 90, 235);

  // Watermark Notice
  ctx.fillStyle = "#ef4444";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("SAMPLE / DUMMY PRESCRIPTION - NOT REAL MEDICAL ADVICE", 90, 290);

  // Doctor Signature line
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(350, 350);
  ctx.lineTo(550, 350);
  ctx.stroke();

  ctx.fillStyle = "#475569";
  ctx.font = "italic 16px cursive";
  ctx.fillText("Dr. Signature Verified", 380, 340);
  ctx.font = "11px sans-serif";
  ctx.fillText("Authorized Prescriber", 410, 365);

  return canvas.toDataURL("image/png");
}
