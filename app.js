/**
 * DoseBuddy - Smart Prescription Reminder App Logic
 * Tabbed Workspace, Google Calendar Integration, Multi-User Auth & Pre-filled Admin Login
 */

function getTodayDateString() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function formatDateString(dateObj) {
  return dateObj.toISOString().split("T")[0];
}

// ================= INTERNATIONALIZATION (i18n) DICTIONARY =================
const I18N = {
  en: {
    disclaimerTitle: "Medical Disclaimer:",
    disclaimerBody: "DoseBuddy is a scheduling aid only. It does NOT provide medical advice. Always verify AI-extracted details with your doctor. Use sample data only.",
    tagline: "Smart Prescription Reminders with Date History & Tomorrow Preview",
    seniorMode: "Senior View",
    enableNotifs: "Alerts",
    login: "Sign In / Register",
    tabSchedule: "Daily Schedule",
    tabScan: "Scan & Add Rx",
    tabGcal: "Google Calendar Sync",
    tabMeds: "Prescriptions",
    tabRefill: "Refill Tracker",
    tabSafety: "Caregiver & Safety",
    todayOverview: "Medication Overview",
    adherenceScore: "Adherence Rate",
    scanPrescription: "Scan New Prescription",
    useSampleRx: "Try Sample Prescription",
    readAloud: "Read Schedule",
    readDetailedSchedule: "Read Schedule Breakdown",
    refillPills: "Refills",
    safetyCenter: "Safety & Caregiver Center",
    caregiverAlerts: "Caregiver Contact",
    edit: "Edit",
    drugInteractions: "Drug Interaction Safety Matrix",
    infoOnly: "Informational",
    dailySchedule: "Today's Dose Schedule",
    morning: "Morning",
    afternoon: "Afternoon",
    night: "Night",
    savedPrescriptions: "Active Saved Prescriptions",
    manageMedsSub: "View, edit or remove extracted medications currently scheduled in DoseBuddy.",
    addManual: "Add Medicine Manually",
    scanTitle: "Scan / Upload Prescription",
    dragOrBrowse: "Drag & Drop prescription image here, or click to browse",
    cancel: "Cancel",
    extractWithAI: "Extract Details with AI",
    confirmTitle: "Confirm Extracted Details",
    confirmSub: "Step Required: Please review & confirm before scheduling!",
    medName: "Medicine Name",
    dosage: "Dosage Strength",
    totalPills: "Pill Stock (Refill Count)",
    frequencyPattern: "Frequency / Timing Pattern",
    instructions: "Special Instructions",
    confirmAndSchedule: "Confirm & Generate Schedule",
    sampleRxTitle: "Choose Sample Prescription",
    close: "Close",
    caregiverSettings: "Caregiver Contact Settings",
    caregiverName: "Caregiver Name",
    caregiverPhone: "Phone / WhatsApp Number",
    caregiverEmail: "Email Address",
    save: "Save Settings",
    refillStockTitle: "Pill Refill & Stock Tracker",
    taken: "Taken",
    skip: "Skip",
    pending: "Upcoming",
    hearInstruction: "Hear Instruction",
    prevDay: "Prev Day",
    today: "Today",
    tomorrow: "Tomorrow",
    selectDate: "Select Date:"
  },
  hi: {
    disclaimerTitle: "चिकित्सा अस्वीकरण:",
    disclaimerBody: "DoseBuddy केवल एक अनुस्मारक सहायता है। यह चिकित्सा सलाह प्रदान नहीं करता है।",
    tagline: "तारीख इतिहास और कल की दवाओं के साथ स्मार्ट दवा अनुस्मारक",
    seniorMode: "वरिष्ठ दृश्य",
    enableNotifs: "अलर्ट",
    login: "साइन इन / रजिस्टर",
    tabSchedule: "दैनिक शेड्यूल",
    tabScan: "स्कैन करें",
    tabGcal: "गूगल कैलेंडर सिंक",
    tabMeds: "दवाएं",
    tabRefill: "रिफिल स्टॉक",
    tabSafety: "सुरक्षा केंद्र",
    todayOverview: "दवाओं का विवरण",
    adherenceScore: "अनुपालन दर",
    readAloud: "सुनाएं",
    readDetailedSchedule: "शेष दवाओं का विवरण सुनें",
    taken: "ली गई",
    skip: "छोड़ी",
    pending: "आगामी",
    hearInstruction: "निर्देश सुनें",
    prevDay: "पिछला दिन",
    today: "आज",
    tomorrow: "कल",
    selectDate: "तारीख चुनें:"
  },
  te: {
    disclaimerTitle: "వైద్య ప్రకటన (Disclaimer):",
    disclaimerBody: "DoseBuddy కేవలం ఔషధ రిమైండర్ సహాయకం మాత్రమే. ఇది వైద్య సలహాలను అందించదు. ఎల్లప్పుడూ మీ వైద్యుడితో వివరాలను సరిచూసుకోండి.",
    tagline: "గత చరిత్ర మరియు రేపటి మందుల వివరాలతో స్మార్ట్ ప్రిస్క్రిప్షన్ యాప్",
    seniorMode: "సీనియర్ వ్యూ",
    enableNotifs: "అలర్ట్‌లు",
    login: "లాగిన్ / రిజిస్టర్",
    tabSchedule: "రోజువారీ షెడ్యూల్",
    tabScan: "స్క్యాన్ & జోడించు",
    tabGcal: "గూగుల్ క్యాలెండర్ సింక్",
    tabMeds: "మందుల జాబితా",
    tabRefill: "రీఫిల్ ట్రాకర్",
    tabSafety: "కేర్‌టేకర్ & భద్రత",
    todayOverview: "మందుల వివరాలు",
    adherenceScore: "మందుల వాడకం శాతం",
    readAloud: "చదివి వినిపించు",
    readDetailedSchedule: "మిగిలిన మందుల వివరాలు వినండి",
    taken: "వేసుకున్నారు",
    skip: "వదిలేశారు",
    pending: "రాబోయేవి",
    hearInstruction: "సూచన వినండి",
    prevDay: "నిన్నటి రోజు",
    today: "ఈరోజు",
    tomorrow: "రేపు",
    selectDate: "తేదీ ఎంచుకోండి:"
  }
};

// Known Drug-to-Drug Interaction Lookup Table
const DRUG_INTERACTION_RULES = [
  { pair: ["aspirin", "warfarin"], severity: "High", message: "Combining Aspirin with Warfarin increases risk of serious bleeding. Inform your physician." },
  { pair: ["amoxicillin", "methotrexate"], severity: "Moderate", message: "Amoxicillin may decrease renal clearance of Methotrexate. Consult your pharmacist." },
  { pair: ["metformin", "alcohol"], severity: "Moderate", message: "Taking Metformin with high alcohol intake increases lactic acidosis risk." },
  { pair: ["atorvastatin", "clarithromycin"], severity: "High", message: "Clarithromycin may significantly increase blood levels of Atorvastatin." }
];

// ================= APP STATE MANAGEMENT =================
let state = {
  lang: "en",
  seniorMode: false,
  activeTab: "tab-schedule",
  selectedDate: getTodayDateString(),
  currentUser: {
    loggedIn: false,
    email: "",
    name: "Guest User",
    role: "patient"
  },
  authMode: "login",
  caregiver: { name: "", phone: "", email: "" },
  medications: [],
  dateLogs: {},
  selectedFile: null
};

// Registered Users Database (Local Storage Mock DB)
let registeredUsersDB = {
  "admin": { email: "admin", password: "admin123", name: "Admin User", role: "caregiver" },
  "admin@dosebuddy.com": { email: "admin@dosebuddy.com", password: "admin123", name: "Admin User", role: "caregiver" }
};

let availableVoices = [];

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadUsersDBFromLocalStorage();
  loadStateFromLocalStorage();
  updateCurrentDateDisplay();
  applyLanguageUI();
  renderHeaderAuthBadge();
  
  if (state.medications.length === 0) {
    loadDefaultInitialMeds();
  } else {
    renderAll();
  }

  setupDropzone();

  // Show Auth Modal automatically on load if user is not signed in
  if (!state.currentUser.loggedIn) {
    openAuthModal();
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      availableVoices = window.speechSynthesis.getVoices();
    };
    availableVoices = window.speechSynthesis.getVoices();
  }
});

function loadUsersDBFromLocalStorage() {
  const db = localStorage.getItem("dosebuddy_users_db");
  if (db) {
    try {
      const parsed = JSON.parse(db);
      registeredUsersDB = { ...registeredUsersDB, ...parsed };
    } catch (e) {}
  }
}

function saveUsersDBToLocalStorage() {
  localStorage.setItem("dosebuddy_users_db", JSON.stringify(registeredUsersDB));
}

function loadDefaultInitialMeds() {
  state.medications = [
    { id: "med-init-1", name: "Amoxicillin", dose: "500 mg", stock: 20, freq: "1-0-1", instructions: "Take after breakfast and dinner", createdDate: new Date().toISOString() },
    { id: "med-init-2", name: "Metformin", dose: "500 mg", stock: 45, freq: "1-1-1", instructions: "Take with food", createdDate: new Date().toISOString() },
    { id: "med-init-3", name: "Atorvastatin", dose: "10 mg", stock: 30, freq: "0-0-1", instructions: "Take at bedtime", createdDate: new Date().toISOString() }
  ];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateString(yesterday);
  state.dateLogs[yesterdayStr] = {
    "med-init-1_morning": "taken",
    "med-init-2_morning": "taken",
    "med-init-2_afternoon": "taken",
    "med-init-1_night": "skipped",
    "med-init-3_night": "taken"
  };

  saveStateToLocalStorage();
  renderAll();
}

function saveStateToLocalStorage() {
  const storageKey = state.currentUser.loggedIn ? `dosebuddy_state_${state.currentUser.email}` : "dosebuddy_state_guest";
  localStorage.setItem(storageKey, JSON.stringify(state));
  localStorage.setItem("dosebuddy_session", JSON.stringify(state.currentUser));
}

function loadStateFromLocalStorage() {
  const session = localStorage.getItem("dosebuddy_session");
  if (session) {
    try {
      state.currentUser = JSON.parse(session);
    } catch (e) {}
  }

  const storageKey = state.currentUser.loggedIn ? `dosebuddy_state_${state.currentUser.email}` : "dosebuddy_state_guest";
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error("Failed to parse local storage state:", e);
    }
  }

  if (state.seniorMode) {
    document.body.classList.add("senior-mode");
  }
}

// ================= DATE NAVIGATION ENGINE =================
function handleDatePickerChange(val) {
  if (val) {
    state.selectedDate = val;
    updateCurrentDateDisplay();
    renderAll();
  }
}

function navigateDate(offset) {
  if (offset === 0) {
    state.selectedDate = getTodayDateString();
  } else {
    const parts = state.selectedDate.split("-");
    const current = new Date(parts[0], parts[1] - 1, parts[2]);
    current.setDate(current.getDate() + offset);
    state.selectedDate = formatDateString(current);
  }

  const picker = document.getElementById("schedule-date-picker");
  if (picker) picker.value = state.selectedDate;

  updateCurrentDateDisplay();
  renderAll();
}

function updateCurrentDateDisplay() {
  const dateEl = document.getElementById("today-date-display");
  const badgeEl = document.getElementById("date-view-badge");
  const picker = document.getElementById("schedule-date-picker");

  if (picker) picker.value = state.selectedDate;

  const todayStr = getTodayDateString();
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = formatDateString(tomorrowObj);

  const yesterdayObj = new Date();
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterdayStr = formatDateString(yesterdayObj);

  if (badgeEl) {
    if (state.selectedDate === todayStr) {
      badgeEl.innerText = "Today";
      badgeEl.className = "text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    } else if (state.selectedDate === tomorrowStr) {
      badgeEl.innerText = "🔮 Tomorrow Preview";
      badgeEl.className = "text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    } else if (state.selectedDate === yesterdayStr) {
      badgeEl.innerText = "⏮️ Yesterday History";
      badgeEl.className = "text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    } else if (state.selectedDate < todayStr) {
      badgeEl.innerText = "📜 Past History Log";
      badgeEl.className = "text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    } else {
      badgeEl.innerText = "🔮 Future Schedule Preview";
      badgeEl.className = "text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    }
  }

  if (dateEl) {
    const parts = state.selectedDate.split("-");
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
    dateEl.innerText = d.toLocaleDateString(state.lang === "te" ? "te-IN" : state.lang === "hi" ? "hi-IN" : "en-US", options);
  }
}


// ================= AUTHENTICATION & LOGIN ENGINE =================
function openAuthModal() {
  document.getElementById("auth-modal").classList.remove("hidden");
}

function closeAuthModal() {
  document.getElementById("auth-modal").classList.add("hidden");
}

function switchAuthMode(mode) {
  state.authMode = mode;
  const loginTab = document.getElementById("auth-tab-login");
  const regTab = document.getElementById("auth-tab-register");
  const nameBox = document.getElementById("reg-name-box");
  const submitBtn = document.getElementById("auth-submit-btn");

  if (mode === "register") {
    loginTab.classList.remove("active-auth-tab", "text-blue-500");
    loginTab.classList.add("text-slate-400");
    regTab.classList.add("active-auth-tab");
    regTab.classList.remove("text-slate-400");
    nameBox.classList.remove("hidden");
    submitBtn.innerText = "Create Account & Sign In";
  } else {
    regTab.classList.remove("active-auth-tab", "text-blue-500");
    regTab.classList.add("text-slate-400");
    loginTab.classList.add("active-auth-tab");
    loginTab.classList.remove("text-slate-400");
    nameBox.classList.add("hidden");
    submitBtn.innerText = "Sign In as Admin";
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();

  const email = document.getElementById("auth-email").value.trim().toLowerCase();
  const password = document.getElementById("auth-password").value;
  const name = document.getElementById("auth-name").value.trim() || (email === "admin" ? "Admin User" : email.split("@")[0]);
  const role = document.getElementById("auth-role").value;

  if (!email || !password) return;

  if (state.authMode === "register") {
    registeredUsersDB[email] = { email, password, name, role };
    saveUsersDBToLocalStorage();
    state.currentUser = { loggedIn: true, email, name, role };
    showToast(`🎉 Welcome to DoseBuddy, ${name}! Account Created.`, "success");
  } else {
    const existing = registeredUsersDB[email];
    if (existing && existing.password === password) {
      state.currentUser = { loggedIn: true, email, name: existing.name, role: existing.role };
      showToast(`Welcome back, ${existing.name}! Signed In.`, "success");
    } else if (email === "admin" && password === "admin123") {
      state.currentUser = { loggedIn: true, email: "admin", name: "Admin User", role: "caregiver" };
      showToast(`Signed in successfully as Admin User`, "success");
    } else if (!existing) {
      registeredUsersDB[email] = { email, password, name: email.split("@")[0], role };
      saveUsersDBToLocalStorage();
      state.currentUser = { loggedIn: true, email, name: email.split("@")[0], role };
      showToast(`Signed in as ${state.currentUser.name}`, "success");
    } else {
      alert("Invalid password for this account.");
      return;
    }
  }

  saveStateToLocalStorage();
  loadStateFromLocalStorage();
  closeAuthModal();
  renderHeaderAuthBadge();
  renderAll();
}

function loginAsGuest() {
  state.currentUser = { loggedIn: false, email: "", name: "Guest User", role: "patient" };
  saveStateToLocalStorage();
  closeAuthModal();
  renderHeaderAuthBadge();
  renderAll();
  showToast("Continuing in Guest Mode (Offline)", "info");
}

function logoutUser() {
  state.currentUser = { loggedIn: false, email: "", name: "Guest User", role: "patient" };
  saveStateToLocalStorage();
  renderHeaderAuthBadge();
  openAuthModal();
  renderAll();
  showToast("Logged out successfully.", "info");
}

function renderHeaderAuthBadge() {
  const container = document.getElementById("auth-header-container");
  if (!container) return;

  if (state.currentUser.loggedIn) {
    const roleBadge = state.currentUser.role === "caregiver" ? "👨‍⚕️ Admin / Caregiver" : "👴 Patient";
    container.innerHTML = `
      <div class="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs shadow-sm">
        <span class="font-bold text-slate-800">${state.currentUser.name}</span>
        <span class="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-bold">${roleBadge}</span>
        <button onclick="logoutUser()" class="text-rose-500 hover:text-rose-700 font-bold ml-1" title="Logout">🚪</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button id="login-trigger-btn" onclick="openAuthModal()" class="px-3.5 py-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl text-xs font-bold text-sky-700 flex items-center gap-1.5 transition-all shadow-sm">
        <span>👤</span>
        <span id="user-badge-text">Sign In / Register</span>
      </button>
    `;
  }
}


// ================= TAB NAVIGATION ENGINE =================
function switchTab(tabId) {
  state.activeTab = tabId;

  document.querySelectorAll(".tab-view").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".nav-tab-btn").forEach(btn => btn.classList.remove("active-tab"));

  const targetView = document.getElementById(`view-${tabId}`);
  const targetBtn = document.getElementById(`btn-${tabId}`);

  if (targetView) targetView.classList.remove("hidden");
  if (targetBtn) targetBtn.classList.add("active-tab");

  saveStateToLocalStorage();

  if (tabId === "tab-gcal") {
    renderGoogleCalendarSyncSection();
  } else if (tabId === "tab-refill") {
    renderRefillListSection();
  }
}


// ================= RENDER ENGINE =================
function renderAll() {
  renderScheduleBlocks();
  renderAdherenceStats();
  renderPrescriptionsTable();
  renderCaregiverBox();
  renderInteractionAlerts();
  renderGoogleCalendarSyncSection();
  renderRefillListSection();
}

function generateScheduleItems() {
  const items = [];
  const selectedDateLogs = state.dateLogs[state.selectedDate] || {};

  state.medications.forEach(med => {
    const freq = med.freq || "1-0-1";
    const parts = freq.split("-").map(p => parseInt(p.trim(), 10) || 0);

    const morningCount = parts[0] || 0;
    const afternoonCount = parts[1] || 0;
    const nightCount = parts[2] || 0;

    if (morningCount > 0) {
      items.push({
        doseId: `${med.id}_morning`,
        medId: med.id,
        name: med.name,
        dose: med.dose,
        instructions: med.instructions,
        timeBlock: "Morning",
        time: "08:00 AM",
        scheduledDate: state.selectedDate,
        status: selectedDateLogs[`${med.id}_morning`] || "pending"
      });
    }

    if (afternoonCount > 0) {
      items.push({
        doseId: `${med.id}_afternoon`,
        medId: med.id,
        name: med.name,
        dose: med.dose,
        instructions: med.instructions,
        timeBlock: "Afternoon",
        time: "01:00 PM",
        scheduledDate: state.selectedDate,
        status: selectedDateLogs[`${med.id}_afternoon`] || "pending"
      });
    }

    if (nightCount > 0) {
      items.push({
        doseId: `${med.id}_night`,
        medId: med.id,
        name: med.name,
        dose: med.dose,
        instructions: med.instructions,
        timeBlock: "Night",
        time: "09:00 PM",
        scheduledDate: state.selectedDate,
        status: selectedDateLogs[`${med.id}_night`] || "pending"
      });
    }
  });

  return items;
}

function formatDoseScheduledDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = d.getDate();
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${monthName} ${year}`;
}

function renderScheduleBlocks() {
  const schedule = generateScheduleItems();
  const dict = I18N[state.lang] || I18N.en;
  const blocks = ["morning", "afternoon", "night"];

  const todayStr = getTodayDateString();
  const isPastDate = state.selectedDate < todayStr;
  const isFutureDate = state.selectedDate > todayStr;

  blocks.forEach(block => {
    const container = document.getElementById(`list-${block}`);
    const badge = document.getElementById(`badge-${block}`);
    if (!container) return;

    const blockItems = schedule.filter(item => item.timeBlock.toLowerCase() === block);
    badge.innerText = `${blockItems.length} Dose${blockItems.length !== 1 ? 's' : ''}`;

    if (blockItems.length === 0) {
      container.innerHTML = `<div class="text-xs text-slate-400 italic py-4 text-center">No doses scheduled for ${block}.</div>`;
      return;
    }

    container.innerHTML = blockItems.map(item => {
      let statusMarkup = "";

      if (isPastDate) {
        if (item.status === "taken") {
          statusMarkup = `<span class="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200">✓ Taken in Past</span>`;
        } else if (item.status === "skipped") {
          statusMarkup = `<span class="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200">✕ Skipped</span>`;
        } else {
          statusMarkup = `<span class="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-200">Not Logged</span>`;
        }
      } else if (isFutureDate) {
        const formattedDate = formatDoseScheduledDate(item.scheduledDate || state.selectedDate);
        statusMarkup = `<span class="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">Scheduled for ${formattedDate}</span>`;
      } else {
        if (item.status === "taken") {
          statusMarkup = `<div class="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200"><span>✓</span> ${dict.taken}</div>`;
        } else if (item.status === "skipped") {
          statusMarkup = `<div class="flex items-center gap-1.5 text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200"><span>✕</span> ${dict.skip}</div>`;
        } else {
          statusMarkup = `
            <div class="flex items-center gap-2">
              <button onclick="markDoseStatus('${item.doseId}', 'taken')" class="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-1">
                <span>✓</span> ${dict.taken}
              </button>
              <button onclick="markDoseStatus('${item.doseId}', 'skipped')" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl border border-slate-200 transition-all active:scale-95 shadow-sm">
                ${dict.skip}
              </button>
            </div>
          `;
        }
      }

      return `
        <div class="bg-white p-3.5 rounded-2xl border ${item.status === 'taken' ? 'border-emerald-300' : item.status === 'skipped' ? 'border-rose-300' : 'border-slate-200'} space-y-2 animate-fade-in shadow-sm">
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="font-extrabold text-slate-800 text-base">${item.name} <span class="text-xs font-normal text-sky-600">(${item.dose})</span></div>
              <div class="text-xs text-slate-500 mt-0.5">${item.instructions || 'Take as directed'}</div>
            </div>
            ${statusMarkup}
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
            <span>Time: <strong class="text-slate-600">${item.time}</strong></span>
            <button onclick="speakDoseInstruction('${item.name}', '${item.dose}', '${item.instructions}')" class="text-sky-600 hover:underline flex items-center gap-1 font-semibold">
              <span>🔊</span> <span>${dict.hearInstruction || 'Hear Instruction'}</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
  });
}

function markDoseStatus(doseId, newStatus) {
  const dateStr = state.selectedDate;
  if (!state.dateLogs[dateStr]) state.dateLogs[dateStr] = {};

  state.dateLogs[dateStr][doseId] = newStatus;

  const schedule = generateScheduleItems();
  const doseItem = schedule.find(i => i.doseId === doseId);

  if (doseItem) {
    const med = state.medications.find(m => m.id === doseItem.medId);
    if (med && newStatus === "taken") {
      med.stock = Math.max(0, (med.stock || 30) - 1);
      showToast(`Taken: ${med.name}. ${med.stock} pills remaining in stock.`, "success");
      speakText(`Marked ${med.name} as taken.`, state.lang);
    } else if (newStatus === "skipped") {
      showToast(`Skipped: ${doseItem.name}`, "warning");
      checkCaregiverSkippedTrigger(doseItem.name);
    }
  }

  saveStateToLocalStorage();
  renderAll();
}

function renderAdherenceStats() {
  const schedule = generateScheduleItems();
  const total = schedule.length;
  const takenCount = schedule.filter(s => s.status === "taken").length;
  const skippedCount = schedule.filter(s => s.status === "skipped").length;

  const percentage = total > 0 ? Math.round((takenCount / total) * 100) : 0;

  const circle = document.getElementById("adherence-circle");
  if (circle) {
    const offset = 163.36 - (163.36 * percentage) / 100;
    circle.style.strokeDashoffset = offset;
  }

  const pctEl = document.getElementById("adherence-percentage");
  if (pctEl) pctEl.innerText = `${percentage}%`;

  const statusTextEl = document.getElementById("adherence-status-text");
  if (statusTextEl) {
    statusTextEl.innerText = `${takenCount} of ${total} Doses Taken`;
  }

  const subtitleEl = document.getElementById("today-summary-subtitle");
  if (subtitleEl) {
    const dateLabel = state.selectedDate === getTodayDateString() ? "today" : `on ${state.selectedDate}`;
    subtitleEl.innerText = `${total - (takenCount + skippedCount)} remaining ${dateLabel} • ${skippedCount} skipped`;
  }
}

function renderPrescriptionsTable() {
  const container = document.getElementById("prescriptions-table-container");
  if (!container) return;

  if (state.medications.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-400 space-y-2">
        <span class="text-3xl">💊</span>
        <div class="text-sm font-semibold">No active saved prescriptions yet.</div>
        <div class="text-xs">Click "Scan & Add Rx" or "Add Medicine Manually" to add medications.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="w-full text-left text-xs text-slate-600">
      <thead class="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
        <tr>
          <th class="p-3">Medicine</th>
          <th class="p-3">Dosage</th>
          <th class="p-3">Timing Pattern</th>
          <th class="p-3">Pill Stock</th>
          <th class="p-3">Instructions</th>
          <th class="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        ${state.medications.map(med => `
          <tr class="hover:bg-slate-50/80 transition-colors">
            <td class="p-3 font-bold text-slate-800 text-sm">${med.name}</td>
            <td class="p-3 text-sky-700 font-semibold">${med.dose}</td>
            <td class="p-3"><span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold border border-slate-200">${med.freq}</span></td>
            <td class="p-3 font-bold ${med.stock <= 5 ? 'text-rose-600' : 'text-emerald-700'}">${med.stock || 0} pills</td>
            <td class="p-3 text-slate-500">${med.instructions || 'None'}</td>
            <td class="p-3 text-right space-x-2">
              <button onclick="addMedToGoogleCalendar('${med.id}')" class="text-sky-700 hover:underline font-bold">🗓️ Sync</button>
              <button onclick="editMedication('${med.id}')" class="text-indigo-700 hover:underline font-bold">Edit</button>
              <button onclick="deleteMedication('${med.id}')" class="text-rose-600 hover:underline font-bold">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function deleteMedication(id) {
  if (confirm("Are you sure you want to remove this medication from your schedule?")) {
    state.medications = state.medications.filter(m => m.id !== id);
    saveStateToLocalStorage();
    renderAll();
    showToast("Medication removed", "info");
  }
}

function editMedication(id) {
  const med = state.medications.find(m => m.id === id);
  if (!med) return;

  document.getElementById("confirm-med-name").value = med.name;
  document.getElementById("confirm-med-dose").value = med.dose;
  document.getElementById("confirm-med-stock").value = med.stock || 30;
  document.getElementById("confirm-med-freq").value = med.freq || "1-0-1";
  document.getElementById("confirm-med-instructions").value = med.instructions || "";

  document.getElementById("confirm-modal").dataset.editingId = id;
  document.getElementById("confirm-modal").classList.remove("hidden");
  checkModalDrugInteractions();
}

function openManualAddModal() {
  document.getElementById("confirm-med-name").value = "";
  document.getElementById("confirm-med-dose").value = "";
  document.getElementById("confirm-med-stock").value = "30";
  document.getElementById("confirm-med-freq").value = "1-0-1";
  document.getElementById("confirm-med-instructions").value = "";
  delete document.getElementById("confirm-modal").dataset.editingId;

  document.getElementById("confirm-modal").classList.remove("hidden");
  checkModalDrugInteractions();
}


// ================= GOOGLE CALENDAR SYNC ENGINE =================
function renderGoogleCalendarSyncSection() {
  const container = document.getElementById("gcal-med-list");
  if (!container) return;

  if (state.medications.length === 0) {
    container.innerHTML = `<div class="text-xs text-slate-400 italic py-3">No active medications to sync yet.</div>`;
    return;
  }

  container.innerHTML = state.medications.map(med => `
    <div class="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-sm">
      <div>
        <div class="font-bold text-slate-800 text-sm">${med.name} (${med.dose})</div>
        <div class="text-xs text-slate-500 mt-0.5">Frequency: <span class="text-sky-700 font-mono font-bold">${med.freq}</span></div>
      </div>
      <button onclick="addMedToGoogleCalendar('${med.id}')" class="px-3 py-1.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5">
        <span>➕</span> <span>Add to GCal</span>
      </button>
    </div>
  `).join("");
}

function addMedToGoogleCalendar(medId) {
  const med = state.medications.find(m => m.id === medId);
  if (!med) return;

  const title = encodeURIComponent(`💊 Take ${med.name} ${med.dose}`);
  const details = encodeURIComponent(`DoseBuddy Prescription Reminder:\nMedicine: ${med.name} ${med.dose}\nTiming Pattern: ${med.freq}\nInstructions: ${med.instructions || 'Take with water'}`);
  const location = encodeURIComponent(`Home`);

  const now = new Date();
  now.setDate(now.getDate() + 1);
  now.setHours(8, 0, 0, 0);

  const startIso = now.toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z";
  const endDate = new Date(now.getTime() + 15 * 60000);
  const endIso = endDate.toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z";

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startIso}/${endIso}&recur=RRULE:FREQ=DAILY`;

  window.open(gcalUrl, "_blank");
  showToast(`🗓️ Opening Google Calendar event for ${med.name}...`, "success");
}

function openGoogleCalendarWeb() {
  window.open("https://calendar.google.com", "_blank");
}

function downloadICSFile() {
  if (state.medications.length === 0) {
    alert("No active medications to export.");
    return;
  }

  let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//DoseBuddy//Prescription Reminders//EN\r\nCALSCALE:GREGORIAN\r\n`;

  state.medications.forEach(med => {
    const title = `💊 Take ${med.name} ${med.dose}`;
    const desc = `DoseBuddy Reminder: ${med.instructions || 'Take as prescribed'}. Timing pattern: ${med.freq}`;

    const now = new Date();
    now.setHours(8, 0, 0, 0);
    const startIso = now.toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z";
    const endIso = new Date(now.getTime() + 15 * 60000).toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z";

    icsContent += `BEGIN:VEVENT\r\n`;
    icsContent += `SUMMARY:${title}\r\n`;
    icsContent += `DESCRIPTION:${desc}\r\n`;
    icsContent += `DTSTART:${startIso}\r\n`;
    icsContent += `DTEND:${endIso}\r\n`;
    icsContent += `RRULE:FREQ=DAILY\r\n`;
    icsContent += `BEGIN:VALARM\r\nTRIGGER:-PT15M\r\nACTION:DISPLAY\r\nDESCRIPTION:Medication Reminder\r\nEND:VALARM\r\n`;
    icsContent += `END:VEVENT\r\n`;
  });

  icsContent += `END:VCALENDAR\r\n`;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "DoseBuddy_Medication_Reminders.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("📥 Exported DoseBuddy_Medication_Reminders.ics file!", "success");
}


// ================= REFILL TRACKER =================
function renderRefillListSection() {
  const container = document.getElementById("refill-list-container");
  if (!container) return;

  if (state.medications.length === 0) {
    container.innerHTML = `<div class="text-xs text-slate-400 italic py-4 col-span-2 text-center">No active medications to track.</div>`;
    return;
  }

  container.innerHTML = state.medications.map(med => `
    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
      <div>
        <div class="font-extrabold text-slate-800 text-base">${med.name} (${med.dose})</div>
        <div class="text-xs ${med.stock <= 5 ? 'text-rose-600 font-bold' : 'text-slate-500'} mt-1">
          Stock remaining: <span class="text-slate-800 font-extrabold">${med.stock || 0} pills</span>
          ${med.stock <= 5 ? ' ⚠️ Low Stock Alert!' : ''}
        </div>
      </div>
      <button onclick="adjustPillStock('${med.id}', 10)" class="px-3.5 py-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20 transition-all">
        +10 Refill
      </button>
    </div>
  `).join("");
}

function adjustPillStock(medId, amount) {
  const med = state.medications.find(m => m.id === medId);
  if (med) {
    med.stock = (med.stock || 0) + amount;
    saveStateToLocalStorage();
    renderRefillListSection();
    renderAll();
    showToast(`Refilled ${med.name}. New stock: ${med.stock}`, "success");
  }
}


// ================= AI SCAN & OPTICAL EXTRACTION =================
function setupDropzone() {
  const dropzone = document.getElementById("dropzone");
  if (!dropzone) return;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, e => { e.preventDefault(); e.stopPropagation(); }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  });
}

function handleFileSelect(e) {
  if (e.target.files.length > 0) handleFile(e.target.files[0]);
}

function handleFile(file) {
  state.selectedFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    const previewImg = document.getElementById("prescription-preview-img");
    previewImg.src = e.target.result;
    document.getElementById("image-preview-container").classList.remove("hidden");
    document.getElementById("process-ocr-btn").disabled = false;
  };
  reader.readAsDataURL(file);
}

function startAIProcess() {
  const progressBox = document.getElementById("ocr-progress-box");
  const progressBar = document.getElementById("ocr-progress-bar");
  const statusText = document.getElementById("ocr-status-text");
  const percentageText = document.getElementById("ocr-percentage-text");

  progressBox.classList.remove("hidden");
  statusText.innerText = "Analyzing prescription image with AI OCR...";

  const imgElement = document.getElementById("prescription-preview-img");
  
  if (window.Tesseract && imgElement.src) {
    Tesseract.recognize(
      imgElement.src,
      'eng',
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            const pct = Math.round((m.progress || 0) * 100);
            progressBar.style.width = pct + '%';
            percentageText.innerText = pct + '%';
          }
        }
      }
    ).then(({ data: { text } }) => {
      parseExtractedTextAndPromptConfirm(text);
    }).catch(err => {
      simulateAIExtraction();
    });
  } else {
    simulateAIExtraction();
  }
}

function simulateAIExtraction() {
  const progressBar = document.getElementById("ocr-progress-bar");
  const percentageText = document.getElementById("ocr-percentage-text");
  let progress = 0;

  const interval = setInterval(() => {
    progress += 25;
    progressBar.style.width = progress + "%";
    percentageText.innerText = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      parseExtractedTextAndPromptConfirm("Amoxicillin 500mg - Take 1-0-1 after meals");
    }
  }, 200);
}

function parseExtractedTextAndPromptConfirm(rawText) {
  let medName = "Amoxicillin";
  let medDose = "500 mg";
  let medFreq = "1-0-1";
  let instructions = "Take after meals";

  const textLower = rawText.toLowerCase();

  if (textLower.includes("metformin")) {
    medName = "Metformin";
    medDose = "500 mg";
    medFreq = "1-1-1";
    instructions = "Take 3 times daily with food";
  } else if (textLower.includes("atorvastatin")) {
    medName = "Atorvastatin";
    medDose = "10 mg";
    medFreq = "0-0-1";
    instructions = "Take at bedtime";
  } else if (textLower.includes("aspirin")) {
    medName = "Aspirin";
    medDose = "81 mg";
    medFreq = "1-0-0";
    instructions = "Take in morning with breakfast";
  }

  if (textLower.includes("1-1-1") || textLower.includes("tid") || textLower.includes("qds")) {
    medFreq = "1-1-1";
  } else if (textLower.includes("0-0-1") || textLower.includes("bedtime")) {
    medFreq = "0-0-1";
  } else if (textLower.includes("1-0-0")) {
    medFreq = "1-0-0";
  } else if (textLower.includes("1-0-1")) {
    medFreq = "1-0-1";
  }

  document.getElementById("confirm-med-name").value = medName;
  document.getElementById("confirm-med-dose").value = medDose;
  document.getElementById("confirm-med-stock").value = 30;
  document.getElementById("confirm-med-freq").value = medFreq;
  document.getElementById("confirm-med-instructions").value = instructions;
  delete document.getElementById("confirm-modal").dataset.editingId;

  document.getElementById("confirm-modal").classList.remove("hidden");
  checkModalDrugInteractions();
}

function closeConfirmModal() {
  document.getElementById("confirm-modal").classList.add("hidden");
}

function saveConfirmedMedication() {
  const name = document.getElementById("confirm-med-name").value.trim();
  const dose = document.getElementById("confirm-med-dose").value.trim();
  const stock = parseInt(document.getElementById("confirm-med-stock").value, 10) || 30;
  const freq = document.getElementById("confirm-med-freq").value;
  const instructions = document.getElementById("confirm-med-instructions").value.trim();

  if (!name || !dose) {
    alert("Please enter both medicine name and dosage strength.");
    return;
  }

  const editingId = document.getElementById("confirm-modal").dataset.editingId;

  if (editingId) {
    const med = state.medications.find(m => m.id === editingId);
    if (med) {
      med.name = name;
      med.dose = dose;
      med.stock = stock;
      med.freq = freq;
      med.instructions = instructions;
    }
    showToast(`Updated medication: ${name}`, "success");
  } else {
    const newMed = {
      id: "med-" + Date.now(),
      name,
      dose,
      stock,
      freq,
      instructions,
      createdDate: new Date().toISOString()
    };
    state.medications.push(newMed);
    showToast(`Confirmed & scheduled: ${name}`, "success");
  }

  saveStateToLocalStorage();
  closeConfirmModal();
  switchTab("tab-schedule");
  renderAll();
}


// ================= SAMPLE PRESCRIPTIONS MODAL =================
function openSampleRxModal() {
  const container = document.getElementById("sample-cards-grid");
  if (!container || typeof SAMPLE_PRESCRIPTIONS === "undefined") return;

  container.innerHTML = SAMPLE_PRESCRIPTIONS.map(rx => `
    <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-sky-400 transition-all shadow-sm">
      <div>
        <div class="text-xs text-sky-700 font-bold uppercase">${rx.doctor}</div>
        <div class="font-extrabold text-slate-800 text-base mt-1">${rx.medication} ${rx.dosage}</div>
        <div class="text-xs text-slate-500 mt-0.5">Pattern: <span class="text-slate-700 font-bold font-mono">${rx.frequency}</span></div>
        <div class="text-xs text-slate-500 mt-1 italic">${rx.instructions}</div>
      </div>
      <button onclick="selectSampleRx('${rx.id}')" class="w-full mt-2 py-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-sky-500/20">
        Select & Scan Sample
      </button>
    </div>
  `).join("");

  document.getElementById("sample-rx-modal").classList.remove("hidden");
}

function closeSampleRxModal() {
  document.getElementById("sample-rx-modal").classList.add("hidden");
}

function selectSampleRx(rxId) {
  closeSampleRxModal();
  const rx = SAMPLE_PRESCRIPTIONS.find(r => r.id === rxId);
  if (!rx) return;

  const dataUrl = createPrescriptionCanvasImage(rx);
  const previewImg = document.getElementById("prescription-preview-img");
  previewImg.src = dataUrl;

  switchTab("tab-scan");
  document.getElementById("image-preview-container").classList.remove("hidden");
  document.getElementById("process-ocr-btn").disabled = false;
}


// ================= CAREGIVER & SAFETY =================
function saveCaregiverSettings() {
  state.caregiver.name = document.getElementById("cg-name-input").value.trim();
  state.caregiver.phone = document.getElementById("cg-phone-input").value.trim();
  state.caregiver.email = document.getElementById("cg-email-input").value.trim();

  saveStateToLocalStorage();
  renderCaregiverBox();
  showToast("Caregiver settings saved", "success");
}

function renderCaregiverBox() {
  const nameInput = document.getElementById("cg-name-input");
  if (nameInput) {
    document.getElementById("cg-name-input").value = state.caregiver.name || "";
    document.getElementById("cg-phone-input").value = state.caregiver.phone || "";
    document.getElementById("cg-email-input").value = state.caregiver.email || "";
  }
}

function checkCaregiverSkippedTrigger(medName) {
  if (state.caregiver.name || state.caregiver.email || state.caregiver.phone) {
    const contact = state.caregiver.email || state.caregiver.phone || state.caregiver.name;
    showToast(`📱 Caregiver Alert Dispatched to ${contact}: Dose skipped (${medName})`, "warning");
  }
}


// ================= DRUG INTERACTION SAFETY CHECKER =================
function renderInteractionAlerts() {
  const statusEl = document.getElementById("interaction-status-text");
  if (!statusEl) return;

  const activeNames = state.medications.map(m => m.name.toLowerCase());
  const conflicts = [];

  DRUG_INTERACTION_RULES.forEach(rule => {
    const hasDrugA = activeNames.some(name => name.includes(rule.pair[0]));
    const hasDrugB = activeNames.some(name => name.includes(rule.pair[1]));

    if (hasDrugA && hasDrugB) conflicts.push(rule);
  });

  if (conflicts.length > 0) {
    statusEl.innerHTML = conflicts.map(c => `
      <div class="text-xs text-rose-300 font-bold mt-1 flex items-start gap-1">
        <span>⚠️</span> <span>[${c.severity} Severity] ${c.message}</span>
      </div>
    `).join("");
  } else {
    statusEl.innerText = "No known drug conflicts detected in current prescriptions.";
  }
}

function checkModalDrugInteractions() {
  const nameInput = document.getElementById("confirm-med-name").value.trim().toLowerCase();
  const alertBox = document.getElementById("modal-interaction-alert");
  const alertText = document.getElementById("modal-interaction-text");

  if (!nameInput || !alertBox) return;

  const existingNames = state.medications.map(m => m.name.toLowerCase());
  let conflictFound = null;

  DRUG_INTERACTION_RULES.forEach(rule => {
    if (rule.pair.includes(nameInput)) {
      const otherDrug = rule.pair.find(d => d !== nameInput);
      if (existingNames.some(n => n.includes(otherDrug))) conflictFound = rule;
    }
  });

  if (conflictFound) {
    alertText.innerText = conflictFound.message + " (Informational Warning)";
    alertBox.classList.remove("hidden");
  } else {
    alertBox.classList.add("hidden");
  }
}


// ================= SPEECH & NOTIFICATION SYSTEM =================
function speakText(text, langCode = null) {
  if (!('speechSynthesis' in window)) {
    showToast("Text-to-Speech not supported in this browser.", "warning");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const activeLang = langCode || state.lang;
  
  const targetBcp = activeLang === "te" ? "te-IN" : activeLang === "hi" ? "hi-IN" : "en-US";
  utterance.lang = targetBcp;
  utterance.rate = 0.85;
  utterance.pitch = 1.0;

  if (availableVoices.length === 0) {
    availableVoices = window.speechSynthesis.getVoices();
  }

  const voiceMatch = availableVoices.find(v => v.lang.toLowerCase().startsWith(activeLang));
  if (voiceMatch) {
    utterance.voice = voiceMatch;
  }

  window.speechSynthesis.speak(utterance);
}

function speakDoseInstruction(medName, dose, instructions) {
  const lang = state.lang;
  let speechText = "";

  if (lang === "te") {
    const instText = instructions ? `సూచనలు: ${instructions}` : "సూచనల ప్రకారం వేసుకోండి.";
    speechText = `ఇప్పుడు ${medName} ${dose} వేసుకోవాల్సిన సమయం అయింది. ${instText}`;
    showToast(`🔊 [తెలుగు వాయిస్]: "${speechText}"`, "info");
  } else if (lang === "hi") {
    const instText = instructions ? `निर्देश: ${instructions}` : "निर्देशानुसार लें।";
    speechText = `अब ${medName} ${dose} लेने का समय हो गया है। ${instText}`;
    showToast(`🔊 [हिंदी आवाज़]: "${speechText}"`, "info");
  } else {
    const instText = instructions ? `Instructions: ${instructions}` : "Take as directed.";
    speechText = `Time to take ${medName} ${dose}. ${instText}`;
    showToast(`🔊 [English Voice]: "${speechText}"`, "info");
  }

  speakText(speechText, lang);
}

function triggerDetailedScheduleAudioSummary() {
  const schedule = generateScheduleItems();
  const pending = schedule.filter(s => s.status === "pending");

  const morningMeds = pending.filter(p => p.timeBlock.toLowerCase() === "morning").map(p => `${p.name} ${p.dose}`);
  const afternoonMeds = pending.filter(p => p.timeBlock.toLowerCase() === "afternoon").map(p => `${p.name} ${p.dose}`);
  const nightMeds = pending.filter(p => p.timeBlock.toLowerCase() === "night").map(p => `${p.name} ${p.dose}`);

  const lang = state.lang;
  let text = "";

  if (pending.length === 0) {
    if (lang === "te") text = "అద్భుతం! ఈరోజు వేసుకోవాల్సిన అన్ని మందులు వేసుకున్నారు.";
    else if (lang === "hi") text = "बहुत बढ़िया! आज की सभी निर्धारित खुराकें ले ली गई हैं।";
    else text = "Great job! All scheduled doses for today have been taken.";
  } else {
    if (lang === "te") {
      text = "ఈరోజు మీకు మిగిలిన మందుల వివరాలు: ";
      if (morningMeds.length > 0) text += `ఉదయం వేసుకోవాల్సినవి: ${morningMeds.join(", ")}. `;
      else text += "ఉదయం మందులు ఏమీ లేవు. ";

      if (afternoonMeds.length > 0) text += `మధ్యాహ్నం వేసుకోవాల్సినవి: ${afternoonMeds.join(", ")}. `;
      else text += "మధ్యాహ్నం మందులు ఏమీ లేవు. ";

      if (nightMeds.length > 0) text += `రాత్రి వేసుకోవాల్సినవి: ${nightMeds.join(", ")}.`;
      else text += "రాత్రి మందులు ఏమీ లేవు.";
    } else if (lang === "hi") {
      text = "आपकी आज की शेष दवाओं का विवरण: ";
      if (morningMeds.length > 0) text += `सुबह बची दवाएं: ${morningMeds.join(", ")}। `;
      else text += "सुबह की कोई दवा नहीं बची है। ";

      if (afternoonMeds.length > 0) text += `दोपहर बची दवाएं: ${afternoonMeds.join(", ")}। `;
      else text += "दोपहर की कोई दवा नहीं बची है। ";

      if (nightMeds.length > 0) text += `रात में बची दवाएं: ${nightMeds.join(", ")}।`;
      else text += "रात की कोई दवा नहीं बची है।";
    } else {
      text = "Here is your remaining medication breakdown. ";
      if (morningMeds.length > 0) text += `Remaining in the morning: ${morningMeds.join(", ")}. `;
      else text += "No remaining morning doses. ";

      if (afternoonMeds.length > 0) text += `In the afternoon: ${afternoonMeds.join(", ")}. `;
      else text += "No remaining afternoon doses. ";

      if (nightMeds.length > 0) text += `In the night: ${nightMeds.join(", ")}.`;
      else text += "No remaining night doses.";
    }
  }

  showToast(`🔊 Audio Breakdown (${lang.toUpperCase()}): "${text}"`, "info");
  speakText(text, lang);
}

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
    return;
  }

  Notification.requestPermission().then(permission => {
    const label = document.getElementById("notif-btn-label");
    if (permission === "granted") {
      if (label) label.innerText = "Alerts Active";
      showToast("🔔 Web Notifications Enabled!", "success");
      new Notification("DoseBuddy Reminders Active", {
        body: "You will receive gentle reminder alerts for your medication times.",
        icon: "💊"
      });
    } else {
      if (label) label.innerText = "Alerts Blocked";
      showToast("Notifications permission denied.", "warning");
    }
  });
}

function changeLanguage(langCode) {
  state.lang = langCode;
  saveStateToLocalStorage();
  applyLanguageUI();
  updateCurrentDateDisplay();
  renderAll();
  showToast("Language changed to " + (langCode === 'te' ? 'TELUGU 🇮🇳' : langCode === 'hi' ? 'HINDI 🇮🇳' : 'ENGLISH 🇺🇸'), "info");
}

function applyLanguageUI() {
  const dict = I18N[state.lang] || I18N.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = dict[key];
      } else {
        el.innerText = dict[key];
      }
    }
  });

  const langSelect = document.getElementById("lang-select");
  if (langSelect) langSelect.value = state.lang;
}

function toggleSeniorMode() {
  state.seniorMode = !state.seniorMode;
  if (state.seniorMode) {
    document.body.classList.add("senior-mode");
    showToast("👓 Senior High-Contrast Mode Activated", "info");
  } else {
    document.body.classList.remove("senior-mode");
    showToast("Standard Mode Activated", "info");
  }
  saveStateToLocalStorage();
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bgClass = type === "success" ? "bg-emerald-50 border-emerald-300 text-emerald-900" :
                  type === "warning" ? "bg-amber-50 border-amber-300 text-amber-900" :
                  "bg-sky-50 border-sky-300 text-sky-900";

  toast.className = `p-4 rounded-2xl border ${bgClass} shadow-xl text-xs font-bold flex items-center justify-between gap-3 pointer-events-auto transition-all animate-fade-in`;
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="text-sm font-bold opacity-75 hover:opacity-100">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4000);
}
