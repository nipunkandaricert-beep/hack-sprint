/**
 * DoseBuddy - Sample Prescription Data & Image Canvas Generators
 * Provides verified multi-medication demo slips for visual OCR testing.
 */

const SAMPLE_PRESCRIPTIONS = [
  {
    id: "sample-rx-combo-1",
    title: "Triple Care (Antibiotic + Fever + Antacid)",
    doctor: "Dr. A. Smith, M.D. (Internal Medicine)",
    patient: "Jane Doe (Sample Patient)",
    medication: "Augmentin 625mg + Dolo 650mg + Pantop 40mg",
    dosage: "Multi-Rx",
    frequency: "Daily Regimen",
    instructions: "Follow schedule per medicine below",
    medicines: [
      { name: "Augmentin (Amoxicillin + Clav)", dose: "625 mg", freq: "1-0-1", instructions: "Take twice daily after food" },
      { name: "Paracetamol", dose: "650 mg", freq: "1-0-1", instructions: "Take after meals for fever/pain" },
      { name: "Pantoprazole", dose: "40 mg", freq: "1-0-0", instructions: "Take before breakfast on empty stomach" }
    ],
    itemsList: [
      "1. Tab. Augmentin 625mg - 1-0-1 (after food)",
      "2. Tab. Dolo 650mg - 1-0-1 (for fever)",
      "3. Cap. Pantop 40mg - 1-0-0 (before breakfast)"
    ]
  },
  {
    id: "sample-rx-combo-2",
    title: "Cardio-Diabetic Regimen (3 Meds)",
    doctor: "Dr. R. Gupta, Endocrinologist & Cardiologist",
    patient: "Robert Lee (Sample Patient)",
    medication: "Metformin + Telmisartan + Atorvastatin",
    dosage: "Multi-Rx",
    frequency: "Daily Regimen",
    instructions: "Maintain regular daily timing with meals",
    medicines: [
      { name: "Metformin", dose: "500 mg", freq: "1-1-1", instructions: "Take 3 times daily with food" },
      { name: "Telmisartan", dose: "40 mg", freq: "1-0-0", instructions: "Take in the morning with water" },
      { name: "Atorvastatin", dose: "10 mg", freq: "0-0-1", instructions: "Take once daily at bedtime" }
    ],
    itemsList: [
      "1. Tab. Metformin 500mg - 1-1-1 (with food)",
      "2. Tab. Telma 40mg - 1-0-0 (morning with water)",
      "3. Tab. Atorva 10mg - 0-0-1 (at bedtime)"
    ]
  },
  {
    id: "sample-rx-combo-3",
    title: "Allergy & Wellness (Montek-LC + D3)",
    doctor: "Dr. M. Jenkins, Pulmonologist",
    patient: "Sarah Connor (Sample Patient)",
    medication: "Montelukast + Paracetamol + Vitamin D3",
    dosage: "Multi-Rx",
    frequency: "Daily Regimen",
    instructions: "Take as directed",
    medicines: [
      { name: "Montelukast", dose: "10 mg", freq: "0-0-1", instructions: "Take once daily at bedtime" },
      { name: "Paracetamol", dose: "650 mg", freq: "1-0-1", instructions: "Take after food as needed" },
      { name: "Vitamin D3", dose: "60000 IU", freq: "1-0-0", instructions: "Take once in morning with milk" }
    ],
    itemsList: [
      "1. Tab. Montek-LC 10mg - 0-0-1 (at bedtime)",
      "2. Tab. Paracetamol 650mg - 1-0-1 (after food)",
      "3. Cap. Vitamin D3 60000 IU - 1-0-0 (morning with milk)"
    ]
  }
];

/**
 * Creates a synthetic prescription canvas image URL for visual OCR testing
 */
function createPrescriptionCanvasImage(rx) {
  const canvas = document.createElement("canvas");
  canvas.width = 750;
  canvas.height = 520;
  const ctx = canvas.getContext("2d");

  // Crisp White Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top Hospital Header Banner
  ctx.fillStyle = "#274233";
  ctx.fillRect(0, 0, canvas.width, 70);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("CITY WELLNESS CLINIC — OFFICIAL PRESCRIPTION", 25, 34);
  ctx.font = "12px 'Segoe UI', Arial, sans-serif";
  ctx.fillStyle = "#a4c4b0";
  ctx.fillText(`${rx.doctor} | Tel: +1 (555) 019-2831 | Reg: MED-9281`, 25, 56);

  // Patient Info Bar
  ctx.fillStyle = "#f2f7f4";
  ctx.fillRect(0, 70, canvas.width, 35);
  ctx.strokeStyle = "#e3ede7";
  ctx.strokeRect(0, 70, canvas.width, 35);

  ctx.fillStyle = "#335542";
  ctx.font = "bold 13px 'Segoe UI', Arial, sans-serif";
  ctx.fillText(`Patient: ${rx.patient}   |   Age: 48   |   Gender: F   |   Date: 2026-10-09`, 25, 92);

  // Large Rx Symbol
  ctx.fillStyle = "#335542";
  ctx.font = "bold 44px serif";
  ctx.fillText("℞", 25, 155);

  // Render Prescription Lines
  ctx.fillStyle = "#1b2620";
  ctx.font = "bold 16px 'Segoe UI', Arial, sans-serif";

  const linesToDraw = rx.itemsList || [
    `1. Tab. ${rx.medication} ${rx.dosage} - ${rx.frequency}`,
    `Instructions: ${rx.instructions}`
  ];

  let yPos = 148;
  linesToDraw.forEach((lineText) => {
    ctx.fillStyle = "#1b2620";
    ctx.font = "bold 16px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(lineText, 80, yPos);
    yPos += 42;
  });

  // Notes Box
  ctx.fillStyle = "#f8faf9";
  ctx.fillRect(80, yPos, 580, 50);
  ctx.strokeStyle = "#d2e4d8";
  ctx.strokeRect(80, yPos, 580, 50);

  ctx.fillStyle = "#647b6e";
  ctx.font = "italic 13px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Notes: Drink plenty of water. Complete full course. Keep out of reach of children.", 95, yPos + 30);

  // Sample Watermark Notice
  ctx.fillStyle = "#b91c1c";
  ctx.font = "bold 12px Arial, sans-serif";
  ctx.fillText("DEMO SAMPLE PRESCRIPTION FOR OCR TESTING — NOT REAL MEDICAL ADVICE", 80, yPos + 80);

  // Doctor Signature Line
  ctx.strokeStyle = "#889f92";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(480, 470);
  ctx.lineTo(680, 470);
  ctx.stroke();

  ctx.fillStyle = "#274233";
  ctx.font = "italic bold 18px 'Brush Script MT', cursive, sans-serif";
  ctx.fillText("Dr. A. Smith", 520, 460);
  ctx.font = "11px 'Segoe UI', Arial, sans-serif";
  ctx.fillStyle = "#647b6e";
  ctx.fillText("Authorized Medical Prescriber", 505, 488);

  return canvas.toDataURL("image/png");
}
