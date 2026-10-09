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
    disclaimerTitle: "à¤šà¤¿à¤•à¤¿à¤¤à¥à¤¸à¤¾ à¤…à¤¸à¥à¤µà¥€à¤•à¤°à¤£:",
    disclaimerBody: "DoseBuddy à¤•à¥‡à¤µà¤² à¤à¤• à¤…à¤¨à¥à¤¸à¥à¤®à¤¾à¤°à¤• à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤¯à¤¹ à¤šà¤¿à¤•à¤¿à¤¤à¥à¤¸à¤¾ à¤¸à¤²à¤¾à¤¹ à¤ªà¥à¤°à¤¦à¤¾à¤¨ à¤¨à¤¹à¥€à¤‚ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤",
    tagline: "à¤¤à¤¾à¤°à¥€à¤– à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤”à¤° à¤•à¤² à¤•à¥€ à¤¦à¤µà¤¾à¤“à¤‚ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤¦à¤µà¤¾ à¤…à¤¨à¥à¤¸à¥à¤®à¤¾à¤°à¤•",
    seniorMode: "à¤µà¤°à¤¿à¤·à¥à¤  à¤¦à¥ƒà¤¶à¥à¤¯",
    enableNotifs: "à¤…à¤²à¤°à¥à¤Ÿ",
    login: "à¤¸à¤¾à¤‡à¤¨ à¤‡à¤¨ / à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¤°",
    tabSchedule: "à¤¦à¥ˆà¤¨à¤¿à¤• à¤¶à¥‡à¤¡à¥à¤¯à¥‚à¤²",
    tabScan: "à¤¸à¥à¤•à¥ˆà¤¨ à¤•à¤°à¥‡à¤‚",
    tabGcal: "à¤—à¥‚à¤—à¤² à¤•à¥ˆà¤²à¥‡à¤‚à¤¡à¤° à¤¸à¤¿à¤‚à¤•",
    tabMeds: "à¤¦à¤µà¤¾à¤à¤‚",
    tabRefill: "à¤°à¤¿à¤«à¤¿à¤² à¤¸à¥à¤Ÿà¥‰à¤•",
    tabSafety: "à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤•à¥‡à¤‚à¤¦à¥à¤°",
    todayOverview: "à¤¦à¤µà¤¾à¤“à¤‚ à¤•à¤¾ à¤µà¤¿à¤µà¤°à¤£",
    adherenceScore: "à¤…à¤¨à¥à¤ªà¤¾à¤²à¤¨ à¤¦à¤°",
    readAloud: "à¤¸à¥à¤¨à¤¾à¤à¤‚",
    readDetailedSchedule: "à¤¶à¥‡à¤· à¤¦à¤µà¤¾à¤“à¤‚ à¤•à¤¾ à¤µà¤¿à¤µà¤°à¤£ à¤¸à¥à¤¨à¥‡à¤‚",
    taken: "à¤²à¥€ à¤—à¤ˆ",
    skip: "à¤›à¥‹à¤¡à¤¼à¥€",
    pending: "à¤†à¤—à¤¾à¤®à¥€",
    hearInstruction: "à¤¨à¤¿à¤°à¥à¤¦à¥‡à¤¶ à¤¸à¥à¤¨à¥‡à¤‚",
    prevDay: "à¤ªà¤¿à¤›à¤²à¤¾ à¤¦à¤¿à¤¨",
    today: "à¤†à¤œ",
    tomorrow: "à¤•à¤²",
    selectDate: "à¤¤à¤¾à¤°à¥€à¤– à¤šà¥à¤¨à¥‡à¤‚:"
  },
  te: {
    disclaimerTitle: "à°µà±ˆà°¦à±à°¯ à°ªà±à°°à°•à°Ÿà°¨ (Disclaimer):",
    disclaimerBody: "DoseBuddy à°•à±‡à°µà°²à°‚ à°”à°·à°§ à°°à°¿à°®à±ˆà°‚à°¡à°°à± à°¸à°¹à°¾à°¯à°•à°‚ à°®à°¾à°¤à±à°°à°®à±‡. à°‡à°¦à°¿ à°µà±ˆà°¦à±à°¯ à°¸à°²à°¹à°¾à°²à°¨à± à°…à°‚à°¦à°¿à°‚à°šà°¦à±. à°Žà°²à±à°²à°ªà±à°ªà±à°¡à±‚ à°®à±€ à°µà±ˆà°¦à±à°¯à±à°¡à°¿à°¤à±‹ à°µà°¿à°µà°°à°¾à°²à°¨à± à°¸à°°à°¿à°šà±‚à°¸à±à°•à±‹à°‚à°¡à°¿.",
    tagline: "à°—à°¤ à°šà°°à°¿à°¤à±à°° à°®à°°à°¿à°¯à± à°°à±‡à°ªà°Ÿà°¿ à°®à°‚à°¦à±à°² à°µà°¿à°µà°°à°¾à°²à°¤à±‹ à°¸à±à°®à°¾à°°à±à°Ÿà± à°ªà±à°°à°¿à°¸à±à°•à±à°°à°¿à°ªà±à°·à°¨à± à°¯à°¾à°ªà±",
    seniorMode: "à°¸à±€à°¨à°¿à°¯à°°à± à°µà±à°¯à±‚",
    enableNotifs: "à°…à°²à°°à±à°Ÿà±â€Œà°²à±",
    login: "à°²à°¾à°—à°¿à°¨à± / à°°à°¿à°œà°¿à°¸à±à°Ÿà°°à±",
    tabSchedule: "à°°à±‹à°œà±à°µà°¾à°°à±€ à°·à±†à°¡à±à°¯à±‚à°²à±",
    tabScan: "à°¸à±à°•à±à°¯à°¾à°¨à± & à°œà±‹à°¡à°¿à°‚à°šà±",
    tabGcal: "à°—à±‚à°—à±à°²à± à°•à±à°¯à°¾à°²à±†à°‚à°¡à°°à± à°¸à°¿à°‚à°•à±",
    tabMeds: "à°®à°‚à°¦à±à°² à°œà°¾à°¬à°¿à°¤à°¾",
    tabRefill: "à°°à±€à°«à°¿à°²à± à°Ÿà±à°°à°¾à°•à°°à±",
    tabSafety: "à°•à±‡à°°à±â€Œà°Ÿà±‡à°•à°°à± & à°­à°¦à±à°°à°¤",
    todayOverview: "à°®à°‚à°¦à±à°² à°µà°¿à°µà°°à°¾à°²à±",
    adherenceScore: "à°®à°‚à°¦à±à°² à°µà°¾à°¡à°•à°‚ à°¶à°¾à°¤à°‚",
    readAloud: "à°šà°¦à°¿à°µà°¿ à°µà°¿à°¨à°¿à°ªà°¿à°‚à°šà±",
    readDetailedSchedule: "à°®à°¿à°—à°¿à°²à°¿à°¨ à°®à°‚à°¦à±à°² à°µà°¿à°µà°°à°¾à°²à± à°µà°¿à°¨à°‚à°¡à°¿",
    taken: "à°µà±‡à°¸à±à°•à±à°¨à±à°¨à°¾à°°à±",
    skip: "à°µà°¦à°¿à°²à±‡à°¶à°¾à°°à±",
    pending: "à°°à°¾à°¬à±‹à°¯à±‡à°µà°¿",
    hearInstruction: "à°¸à±‚à°šà°¨ à°µà°¿à°¨à°‚à°¡à°¿",
    prevDay: "à°¨à°¿à°¨à±à°¨à°Ÿà°¿ à°°à±‹à°œà±",
    today: "à°ˆà°°à±‹à°œà±",
    tomorrow: "à°°à±‡à°ªà±",
    selectDate: "à°¤à±‡à°¦à±€ à°Žà°‚à°šà±à°•à±‹à°‚à°¡à°¿:"
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
  setupClipboardPaste();
  checkBackendOCRStatus();

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
      badgeEl.innerText = "ðŸ”® Tomorrow Preview";
      badgeEl.className = "text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    } else if (state.selectedDate === yesterdayStr) {
      badgeEl.innerText = "â®ï¸ Yesterday History";
      badgeEl.className = "text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    } else if (state.selectedDate < todayStr) {
      badgeEl.innerText = "ðŸ“œ Past History Log";
      badgeEl.className = "text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    } else {
      badgeEl.innerText = "ðŸ”® Future Schedule Preview";
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
    showToast(`ðŸŽ‰ Welcome to DoseBuddy, ${name}! Account Created.`, "success");
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
    const roleBadge = state.currentUser.role === "caregiver" ? "ðŸ‘¨â€âš•ï¸ Admin / Caregiver" : "ðŸ‘´ Patient";
    container.innerHTML = `
      <div class="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs shadow-sm">
        <span class="font-bold text-slate-800">${state.currentUser.name}</span>
        <span class="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-bold">${roleBadge}</span>
        <button onclick="logoutUser()" class="text-rose-500 hover:text-rose-700 font-bold ml-1" title="Logout">ðŸšª</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button id="login-trigger-btn" onclick="openAuthModal()" class="px-3.5 py-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl text-xs font-bold text-sky-700 flex items-center gap-1.5 transition-all shadow-sm">
        <span>ðŸ‘¤</span>
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
          statusMarkup = `<span class="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200">âœ“ Taken in Past</span>`;
        } else if (item.status === "skipped") {
          statusMarkup = `<span class="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200">âœ• Skipped</span>`;
        } else {
          statusMarkup = `<span class="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-200">Not Logged</span>`;
        }
      } else if (isFutureDate) {
        const formattedDate = formatDoseScheduledDate(item.scheduledDate || state.selectedDate);
        statusMarkup = `<span class="text-xs font-bold bg-[#eaf4ee] text-[#2d553b] px-3 py-1.5 rounded-xl border border-[#cbdec7] flex items-center gap-1.5 shadow-xs"><span>🗓️</span> <span>Scheduled for ${formattedDate}</span></span>`;
      } else {
        if (item.status === "taken") {
          statusMarkup = `<div class="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200"><span>âœ“</span> ${dict.taken}</div>`;
        } else if (item.status === "skipped") {
          statusMarkup = `<div class="flex items-center gap-1.5 text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200"><span>âœ•</span> ${dict.skip}</div>`;
        } else {
          statusMarkup = `
            <div class="flex items-center gap-2">
              <button onclick="markDoseStatus('${item.doseId}', 'taken')" class="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-1">
                <span>âœ“</span> ${dict.taken}
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
              <div class="text-xs text-[#2d553b] mt-1 flex items-center gap-1"><span>🗓️</span> Scheduled for <strong>${formatDoseScheduledDate(item.scheduledDate || state.selectedDate)}</strong></div>
            </div>
            ${statusMarkup}
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
            <span>Time: <strong class="text-slate-600">${item.time}</strong></span>
            <button onclick="speakDoseInstruction('${item.name}', '${item.dose}', '${item.instructions}')" class="text-sky-600 hover:underline flex items-center gap-1 font-semibold">
              <span>ðŸ”Š</span> <span>${dict.hearInstruction || 'Hear Instruction'}</span>
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
    subtitleEl.innerText = `${total - (takenCount + skippedCount)} remaining ${dateLabel} â€¢ ${skippedCount} skipped`;
  }
}

function renderPrescriptionsTable() {
  const container = document.getElementById("prescriptions-table-container");
  if (!container) return;

  if (state.medications.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-400 space-y-2">
        <span class="text-3xl">ðŸ’Š</span>
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
              <button onclick="addMedToGoogleCalendar('${med.id}')" class="text-sky-700 hover:underline font-bold">ðŸ—“ï¸ Sync</button>
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
  renderBatchConfirmModal([{
    name: med.name,
    dose: med.dose,
    freq: med.freq || "1-0-1",
    stock: med.stock || 30,
    instructions: med.instructions || ""
  }], id);
}

function openManualAddModal() {
  renderBatchConfirmModal([{
    name: "",
    dose: "500 mg",
    freq: "1-0-1",
    stock: 30,
    instructions: "Take as directed"
  }], null);
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
        <span>âž•</span> <span>Add to GCal</span>
      </button>
    </div>
  `).join("");
}

function addMedToGoogleCalendar(medId) {
  const med = state.medications.find(m => m.id === medId);
  if (!med) return;

  const title = encodeURIComponent(`ðŸ’Š Take ${med.name} ${med.dose}`);
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
  showToast(`ðŸ—“ï¸ Opening Google Calendar event for ${med.name}...`, "success");
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
    const title = `ðŸ’Š Take ${med.name} ${med.dose}`;
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

  showToast("ðŸ“¥ Exported DoseBuddy_Medication_Reminders.ics file!", "success");
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
          ${med.stock <= 5 ? ' âš ï¸ Low Stock Alert!' : ''}
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


// ================= AI SCAN, LIVE CAMERA & OPTICAL EXTRACTION ENGINE =================
let cameraStream = null;
let currentFacingMode = 'environment';
let currentPreviewRotation = 0;
let backendOCRAvailable = false;
let extractionQueue = [];

function checkBackendOCRStatus() {
  const badge = document.getElementById("ocr-engine-badge");
  fetch("http://127.0.0.1:8000/api/health", { method: "GET" })
    .then(res => res.json())
    .then(data => {
      if (data && data.status === "healthy") {
        backendOCRAvailable = true;
        if (badge) {
          badge.innerText = data.gemini_configured ? "ðŸŸ¢ Gemini AI Cloud Ready" : "ðŸŸ¢ Backend Server Connected";
          badge.className = "text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
        }
      }
    })
    .catch(() => {
      backendOCRAvailable = false;
      if (badge) {
        badge.innerText = "âš¡ Browser Tesseract OCR Ready";
        badge.className = "text-[10px] bg-[#f0f6f2] text-[#335542] border border-[#d2e4d8] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
      }
    });
}

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

function setupClipboardPaste() {
  window.addEventListener('paste', (e) => {
    if (e.clipboardData && e.clipboardData.items) {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        const item = e.clipboardData.items[i];
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            handleFile(blob);
            switchTab("tab-scan");
            showToast("ðŸ“‹ Image pasted from clipboard!", "success");
            break;
          }
        }
      }
    }
  });
}

function handleFileSelect(e) {
  if (e.target.files && e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
}

function handleFile(file) {
  state.selectedFile = file;
  currentPreviewRotation = 0;
  const reader = new FileReader();
  reader.onload = (e) => {
    const previewImg = document.getElementById("prescription-preview-img");
    previewImg.src = e.target.result;
    previewImg.style.transform = "rotate(0deg)";
    
    const metaText = document.getElementById("image-meta-text");
    if (metaText && file.name) {
      const sizeKb = Math.round((file.size || 0) / 1024);
      metaText.innerText = `${file.name} (${sizeKb} KB)`;
    }

    document.getElementById("image-preview-container").classList.remove("hidden");
    document.getElementById("process-ocr-btn").disabled = false;
  };
  reader.readAsDataURL(file);
}

function rotatePreviewImage() {
  currentPreviewRotation = (currentPreviewRotation + 90) % 360;
  const previewImg = document.getElementById("prescription-preview-img");
  if (previewImg) {
    previewImg.style.transform = `rotate(${currentPreviewRotation}deg)`;
  }
}

function clearSelectedImage() {
  state.selectedFile = null;
  currentPreviewRotation = 0;
  const previewImg = document.getElementById("prescription-preview-img");
  if (previewImg) previewImg.src = "";
  
  const fileInput = document.getElementById("prescription-file-input");
  if (fileInput) fileInput.value = "";

  document.getElementById("image-preview-container").classList.add("hidden");
  document.getElementById("process-ocr-btn").disabled = true;
  document.getElementById("ocr-progress-box").classList.add("hidden");
}

// ================= LIVE CAMERA VIEW =================
function openCameraModal() {
  const modal = document.getElementById("camera-modal");
  if (!modal) return;
  modal.classList.remove("hidden");

  startCameraStream(currentFacingMode);
}

function closeCameraModal() {
  stopCameraStream();
  const modal = document.getElementById("camera-modal");
  if (modal) modal.classList.add("hidden");
}

function startCameraStream(facingMode = 'environment') {
  stopCameraStream();
  const video = document.getElementById("camera-video-stream");
  if (!video || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast("Camera access not supported on this browser.", "warning");
    return;
  }

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
    audio: false
  })
  .then(stream => {
    cameraStream = stream;
    video.srcObject = stream;
  })
  .catch(err => {
    console.warn("Could not start environment camera, trying default user camera:", err);
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        cameraStream = stream;
        video.srcObject = stream;
      })
      .catch(finalErr => {
        showToast("Camera permission denied or camera unavailable.", "warning");
      });
  });
}

function stopCameraStream() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
}

function toggleCameraFacing() {
  currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
  startCameraStream(currentFacingMode);
  showToast(`Switched camera to ${currentFacingMode === 'environment' ? 'rear' : 'front'} mode`, "info");
}

function captureCameraSnapshot() {
  const video = document.getElementById("camera-video-stream");
  const canvas = document.getElementById("camera-capture-canvas");
  if (!video || !canvas || video.videoWidth === 0) {
    showToast("Camera stream not ready yet.", "warning");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    if (blob) {
      const file = new File([blob], `prescription_cam_${Date.now()}.jpg`, { type: "image/jpeg" });
      handleFile(file);
      closeCameraModal();
      showToast("ðŸ“¸ Prescription photo captured!", "success");
    }
  }, "image/jpeg", 0.95);
}

// ================= OCR DUAL ENGINE (BACKEND AI + BROWSER TESSERACT) =================
async function startAIProcess() {
  const progressBox = document.getElementById("ocr-progress-box");
  const progressBar = document.getElementById("ocr-progress-bar");
  const statusText = document.getElementById("ocr-status-text");
  const percentageText = document.getElementById("ocr-percentage-text");

  progressBox.classList.remove("hidden");
  progressBar.style.width = "15%";
  percentageText.innerText = "15%";
  statusText.innerText = "Initializing Optical Character Extraction...";

  const imgElement = document.getElementById("prescription-preview-img");
  if (!imgElement || !imgElement.src) {
    showToast("Please upload or capture a prescription image first.", "warning");
    return;
  }

  // Attempt 1: Call Backend AI Endpoint if available
  let backendSuccess = false;
  if (state.selectedFile) {
    try {
      statusText.innerText = "Connecting to AI OCR Backend Server...";
      progressBar.style.width = "40%";
      percentageText.innerText = "40%";

      const formData = new FormData();
      formData.append("file", state.selectedFile);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const resp = await fetch("http://127.0.0.1:8000/api/extract", {
        method: "POST",
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        if (data && data.medicines && data.medicines.length > 0) {
          progressBar.style.width = "100%";
          percentageText.innerText = "100%";
          statusText.innerText = "AI Extraction Complete!";
          backendSuccess = true;
          setTimeout(() => {
            handleBatchExtractedMedicines(data.medicines);
          }, 300);
          return;
        }
      }
    } catch (backendErr) {
      console.log("Backend AI API unavailable or timed out, seamlessly falling back to client Tesseract OCR:", backendErr);
    }
  }

  // Attempt 2: Client-side Tesseract.js OCR
  statusText.innerText = "Running Browser Neural OCR engine...";
  if (window.Tesseract && imgElement.src) {
    try {
      const { data: { text } } = await Tesseract.recognize(
        imgElement.src,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              const pct = Math.min(95, Math.round((m.progress || 0) * 100));
              progressBar.style.width = pct + '%';
              percentageText.innerText = pct + '%';
              statusText.innerText = `Recognizing text & dosage patterns (${pct}%)...`;
            }
          }
        }
      );

      progressBar.style.width = "100%";
      percentageText.innerText = "100%";
      statusText.innerText = "Text recognition complete!";
      
      setTimeout(() => {
        parseExtractedTextAndPromptConfirm(text);
      }, 350);
    } catch (err) {
      console.warn("Tesseract OCR fallback error:", err);
      simulateAIExtraction();
    }
  } else {
    simulateAIExtraction();
  }
}

function simulateAIExtraction() {
  const progressBar = document.getElementById("ocr-progress-bar");
  const percentageText = document.getElementById("ocr-percentage-text");
  const statusText = document.getElementById("ocr-status-text");
  let progress = 0;

  const interval = setInterval(() => {
    progress += 25;
    progressBar.style.width = progress + "%";
    percentageText.innerText = progress + "%";
    statusText.innerText = `Analyzing prescription details (${progress}%)...`;

    if (progress >= 100) {
      clearInterval(interval);
      parseExtractedTextAndPromptConfirm("Amoxicillin 500mg - Take 1-0-1 after meals with water");
    }
  }, 200);
}

// Comprehensive Medical Knowledge Base (Generic & Common Brand Names)
const MEDICAL_DRUG_DICTIONARY = [
  // Pain & Fever
  { name: "Paracetamol", aliases: ["dolo", "crocin", "calpol", "tylenol", "acetaminophen", "panadol", "fevamol", "pacimol"], defaultDose: "650 mg", defaultFreq: "1-0-1", instructions: "Take after food for fever or body pain" },
  { name: "Ibuprofen", aliases: ["advil", "motrin", "brufen", "combiflam", "ibugesic"], defaultDose: "400 mg", defaultFreq: "1-0-1", instructions: "Take with milk or immediately after meals" },
  { name: "Diclofenac", aliases: ["voveran", "voltaren", "dynapar"], defaultDose: "50 mg", defaultFreq: "1-0-1", instructions: "Take after food with water" },
  { name: "Aspirin", aliases: ["ecosprin", "disprin", "bayer", "low-dose aspirin"], defaultDose: "81 mg", defaultFreq: "1-0-0", instructions: "Take in the morning with breakfast" },
  { name: "Naproxen", aliases: ["aleve", "naprosyn"], defaultDose: "250 mg", defaultFreq: "1-0-1", instructions: "Take with food" },
  { name: "Tramadol", aliases: ["ultram", "tramazac"], defaultDose: "50 mg", defaultFreq: "0-0-1", instructions: "Take at bedtime as prescribed for severe pain" },

  // Antibiotics & Anti-infectives
  { name: "Amoxicillin", aliases: ["moxikind", "mox", "novamox", "amoxil"], defaultDose: "500 mg", defaultFreq: "1-0-1", instructions: "Take twice daily after meals with full glass of water" },
  { name: "Augmentin (Amoxicillin + Clav)", aliases: ["clavam", "moxikind-cv", "augmentin 625", "amoxyclav"], defaultDose: "625 mg", defaultFreq: "1-0-1", instructions: "Take at the start of a meal to prevent stomach upset" },
  { name: "Azithromycin", aliases: ["azithral", "azee", "zithromax", "azimax"], defaultDose: "500 mg", defaultFreq: "1-0-0", instructions: "Take once daily 1 hour before or 2 hours after meals" },
  { name: "Ciprofloxacin", aliases: ["ciplox", "cifran", "cipro"], defaultDose: "500 mg", defaultFreq: "1-0-1", instructions: "Take 2 hours after meal with plenty of fluids" },
  { name: "Doxycycline", aliases: ["dox", "doxy", "vibramycin"], defaultDose: "100 mg", defaultFreq: "1-0-1", instructions: "Take with full glass of water, do not lie down immediately" },
  { name: "Cefixime", aliases: ["taxim-o", "zifi", "mahacef"], defaultDose: "200 mg", defaultFreq: "1-0-1", instructions: "Take after meals" },
  { name: "Levofloxacin", aliases: ["levoquan", "levomac"], defaultDose: "500 mg", defaultFreq: "1-0-0", instructions: "Take once daily with plenty of water" },

  // Diabetes & Blood Sugar
  { name: "Metformin", aliases: ["glycomet", "glucophage", "obimet", "gluformin"], defaultDose: "500 mg", defaultFreq: "1-1-1", instructions: "Take with meals to prevent stomach discomfort" },
  { name: "Glimepiride", aliases: ["amaryl", "zoryl", "glimy"], defaultDose: "1 mg", defaultFreq: "1-0-0", instructions: "Take immediately before breakfast" },
  { name: "Sitagliptin", aliases: ["januvia", "istavel"], defaultDose: "100 mg", defaultFreq: "1-0-0", instructions: "Take once daily in morning with or without food" },
  { name: "Dapagliflozin", aliases: ["forxiga", "dapa", "oxra"], defaultDose: "10 mg", defaultFreq: "1-0-0", instructions: "Take once daily in morning" },
  { name: "Vildagliptin", aliases: ["galvus", "jalra"], defaultDose: "50 mg", defaultFreq: "1-0-1", instructions: "Take morning and evening" },

  // Blood Pressure & Cholesterol / Heart
  { name: "Atorvastatin", aliases: ["lipitor", "atorva", "storvas", "atocor"], defaultDose: "10 mg", defaultFreq: "0-0-1", instructions: "Take once daily at bedtime" },
  { name: "Rosuvastatin", aliases: ["crestor", "rosuvas", "rosave"], defaultDose: "10 mg", defaultFreq: "0-0-1", instructions: "Take once daily at bedtime" },
  { name: "Amlodipine", aliases: ["amlong", "norvasc", "stamlo"], defaultDose: "5 mg", defaultFreq: "1-0-0", instructions: "Take once daily in the morning" },
  { name: "Telmisartan", aliases: ["telma", "micardis", "telmikind"], defaultDose: "40 mg", defaultFreq: "1-0-0", instructions: "Take once daily with or without food" },
  { name: "Losartan", aliases: ["cozaar", "losar", "repace"], defaultDose: "50 mg", defaultFreq: "1-0-0", instructions: "Take in the morning with water" },
  { name: "Lisinopril", aliases: ["prinivil", "zestril", "lipril"], defaultDose: "10 mg", defaultFreq: "1-0-0", instructions: "Take every morning" },
  { name: "Metoprolol", aliases: ["betaloc", "lopressor", "metolar"], defaultDose: "25 mg", defaultFreq: "1-0-1", instructions: "Take with or immediately after food" },
  { name: "Clopidogrel", aliases: ["plavix", "deplatt", "clopivas"], defaultDose: "75 mg", defaultFreq: "1-0-0", instructions: "Take once daily in morning" },

  // Gastrointestinal & Acidity
  { name: "Pantoprazole", aliases: ["pan-40", "pantop", "pan", "pantocid", "protonix", "pan-d"], defaultDose: "40 mg", defaultFreq: "1-0-0", instructions: "Take 30 minutes before breakfast on an empty stomach" },
  { name: "Omeprazole", aliases: ["omez", "prilosec", "omizac"], defaultDose: "20 mg", defaultFreq: "1-0-0", instructions: "Take once daily before morning meal" },
  { name: "Rabeprazole", aliases: ["razo", "rabicip", "aciphex"], defaultDose: "20 mg", defaultFreq: "1-0-0", instructions: "Take in morning on empty stomach" },
  { name: "Esomeprazole", aliases: ["nexium", "nexpro"], defaultDose: "40 mg", defaultFreq: "1-0-0", instructions: "Take 1 hour before food" },

  // Allergy, Respiratory & Cold
  { name: "Cetirizine", aliases: ["cetzine", "zyrtec", "alerid", "okacet"], defaultDose: "10 mg", defaultFreq: "0-0-1", instructions: "Take at bedtime for allergy relief (may cause drowsiness)" },
  { name: "Levocetirizine", aliases: ["levocet", "xzyzal", "teczine"], defaultDose: "5 mg", defaultFreq: "0-0-1", instructions: "Take once daily at bedtime" },
  { name: "Montelukast", aliases: ["singulair", "montek", "montair", "montair-lc", "montek-lc"], defaultDose: "10 mg", defaultFreq: "0-0-1", instructions: "Take once daily in the evening" },
  { name: "Allegra (Fexofenadine)", aliases: ["allegra", "fexofenadine", "fexova"], defaultDose: "120 mg", defaultFreq: "1-0-0", instructions: "Take with water before food" },

  // Vitamins, Minerals & Supplements
  { name: "Vitamin D3", aliases: ["calcirol", "d-rise", "cholecalciferol", "uprise-d3"], defaultDose: "60000 IU", defaultFreq: "1-0-0", instructions: "Take once weekly/daily with milk after meals" },
  { name: "Calcium + Vit D3", aliases: ["shelcal", "cipcal", "calcium"], defaultDose: "500 mg", defaultFreq: "0-1-0", instructions: "Take with lunch" },
  { name: "Vitamin B-Complex / B12", aliases: ["neurobion", "becosules", "mecobalamin", "optineuron"], defaultDose: "1 tablet", defaultFreq: "1-0-0", instructions: "Take daily in morning after breakfast" },
  { name: "Zincovit (Multivitamin)", aliases: ["zincovit", "multivitamin", "supradyn", "becadexamin"], defaultDose: "1 tablet", defaultFreq: "1-0-0", instructions: "Take with meals" },
  // Bone, Joint & Special Regional Brands
  { name: "Ultrafen-Plus (Diclofenac)", aliases: ["ultrafen", "ultrafen-plus", "ultrafen plus"], defaultDose: "50 mg", defaultFreq: "1-0-1", instructions: "Take after meals with water" },
  { name: "Relentus", aliases: ["relentus"], defaultDose: "1 tablet", defaultFreq: "0-0-1", instructions: "Take at bedtime" },
  { name: "Progut (Probiotic)", aliases: ["progut", "progut 200mg", "progut 200"], defaultDose: "200 mg", defaultFreq: "1-0-1", instructions: "Take before meals" },
  { name: "Ultracal-D (Calcium + Vit D3)", aliases: ["ultracal", "ultracal-d", "ultracal d"], defaultDose: "1 tablet", defaultFreq: "0-1-0", instructions: "Take after lunch with water" },
  { name: "Cartilix (Glucosamine)", aliases: ["cartilix"], defaultDose: "1 tablet", defaultFreq: "1-0-1", instructions: "Take after food with water" },
  { name: "Thyronorm (Levothyroxine)", aliases: ["thyronorm", "eltroxin", "synthroid", "levothyroxine"], defaultDose: "50 mcg", defaultFreq: "1-0-0", instructions: "Take first thing in the morning on empty stomach with water" }
];

function normalizeFrequencyPattern(str) {
  if (!str) return "1-0-1";
  // Convert Bengali numbers & clean spaces
  let s = str.toString().toLowerCase().trim()
    .replace(/১/g, "1").replace(/২/g, "2").replace(/০/g, "0");

  // Handle patterns with plus, minus, slash, dot, colon (e.g. 1+0+1, 1-0-1, 1 0 1, 1/0/1)
  const match = s.match(/([0-2])\s*[\+\-/:,.\s]\s*([0-2])\s*[\+\-/:,.\s]\s*([0-2])/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  // Handle OCR letter confusions like l-0-l, O-0-1, I-I-I
  const cleaned = s.replace(/l|i/gi, "1").replace(/o/gi, "0");
  const match2 = cleaned.match(/([0-2])\s*[\+\-/:,.\s]\s*([0-2])\s*[\+\-/:,.\s]\s*([0-2])/);
  if (match2) {
    return `${match2[1]}-${match2[2]}-${match2[3]}`;
  }

  if (s.includes("thrice") || s.includes("3 times") || s.includes("tid") || s.includes("tds") || s.includes("qds")) return "1-1-1";
  if (s.includes("twice") || s.includes("2 times") || s.includes("bid") || s.includes("bd") || s.includes("morning & night") || s.includes("morning and night") || s.includes("morning and evening")) return "1-0-1";
  if (s.includes("bedtime") || s.includes("night only") || s.includes("at night") || s.includes("hs") || s.includes("evening")) return "0-0-1";
  if (s.includes("morning only") || s.includes("once daily") || s.includes("daily in morning") || s.includes("od") || s.includes("once a day") || s.includes("before breakfast")) return "1-0-0";
  if (s.includes("afternoon") || s.includes("lunch")) return "0-1-0";

  return "1-0-1";
}

function parseExtractedTextAndPromptConfirm(rawText) {
  if (!rawText || !rawText.trim()) {
    showToast("No text recognized in image. Please enter medicine details manually.", "info");
    openManualAddModal();
    return;
  }

  const rawClean = rawText
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-")
    .replace(/(\d)\s*:\s*(\d)\s*:\s*(\d)/g, "$1-$2-$3")
    .replace(/(\d)\s*\.\s*(\d)\s*\.\s*(\d)/g, "$1-$2-$3");

  const lines = rawClean.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 2);
  const detectedMeds = [];
  const addedDrugNames = new Set();

  // ---- PASS 1: Line-by-line scanning ----
  for (const line of lines) {
    const lineLower = line.toLowerCase();

    // Skip non-medicine lines (headers, clinic info, patient metadata)
    if (
      lineLower.startsWith("dr.") || lineLower.startsWith("dr ") ||
      lineLower.includes("clinic") || lineLower.includes("hospital") ||
      lineLower.includes("phone:") || lineLower.includes("tel:") ||
      lineLower.includes("address:") || lineLower.includes("patient name") ||
      lineLower.includes("signature") || lineLower.includes("date:") ||
      lineLower.includes("m.b.b.s") || lineLower.includes("m.d.") ||
      /\b(c\/o|chief complaint|pain|knee|stairs|bony|lesion|x-?ray|mri|physio|exercise|knee cap|address|dhaka|shyamoli|road|block|fax|consultant|center|centre)\b/i.test(lineLower) ||
      /^(name|age|gender|weight|diagnosis|reg\.?\s*no)[:\s]/i.test(lineLower)
    ) { continue; }

    let foundDrug = null;
    for (const drug of MEDICAL_DRUG_DICTIONARY) {
      const matchDrug = drug.name.toLowerCase();
      const matchAliases = drug.aliases || [];
      if (lineLower.includes(matchDrug) || matchAliases.some(alias => lineLower.includes(alias.toLowerCase()))) {
        foundDrug = drug;
        break;
      }
    }

    // Extract dose from this line + next line combined (freq may be on next line)
    const lineIdx = lines.indexOf(line);
    const nextLine = lines[lineIdx + 1] || "";
    const freqCtx = line + " " + nextLine;
    const doseMatch = freqCtx.match(/\b(\d+(?:\.\d+)?\s*(?:mg|mcg|g|ml|iu|tablets?|caps?|capsules?|pills?))\b/i);
    const lineDose = doseMatch ? doseMatch[1].trim() : (foundDrug ? foundDrug.defaultDose : "500 mg");
    const lineFreq = normalizeFrequencyPattern(freqCtx);

    // Extract instructions from context
    let lineInstructions = foundDrug ? foundDrug.instructions : "Take as directed by physician";
    const ctx = freqCtx.toLowerCase();
    if (ctx.includes("after food") || ctx.includes("after meals") || ctx.includes(" pc ")) lineInstructions = "Take after meals with water";
    else if (ctx.includes("before food") || ctx.includes("before meals") || ctx.includes("empty stomach") || ctx.includes(" ac ")) lineInstructions = "Take on an empty stomach before food";
    else if (ctx.includes("bedtime") || ctx.includes("at night") || ctx.includes(" hs ")) lineInstructions = "Take at bedtime with water";
    else if (ctx.includes("sos") || ctx.includes("prn") || ctx.includes("for fever") || ctx.includes("for pain")) lineInstructions = "Take as needed for fever or pain";

    if (foundDrug) {
      if (!addedDrugNames.has(foundDrug.name.toLowerCase())) {
        addedDrugNames.add(foundDrug.name.toLowerCase());
        detectedMeds.push({ name: foundDrug.name, dose: lineDose, freq: lineFreq, stock: 30, instructions: lineInstructions });
      }
    } else {
      // Unknown drug — check if line looks like Rx item (Tab./Cap. prefix or has dose/freq pattern)
      const isRxLine =
        /^(?:\d+[\.\)]\s*)?(?:rx:?\s*|tab\.?\s*|cap\.?\s*|syp\.?\s*|inj\.?\s*|t\.?\s*|c\.?\s*)/i.test(line) ||
        doseMatch !== null ||
        /\b[0-2]\s*[\+\-/:,.\s]\s*[0-2]\s*[\+\-/:,.\s]\s*[0-2]\b/.test(line);

      if (isRxLine) {
        let cleanName = line
          .replace(/^(?:\d+[\.\)]\s*)?(?:rx:?\s*|tab\.?\s*|cap\.?\s*|syp\.?\s*|inj\.?\s*|t\.?\s*|c\.?\s*)/i, "")
          .trim();
        cleanName = cleanName.split(/\b\d+(?:\.\d+)?\s*(?:mg|mcg|g|ml|iu|tab|cap)/i)[0].trim();
        cleanName = cleanName.split(/[-\u2013\u2014(]/)[0].trim();

        if (cleanName.length >= 3 && cleanName.length <= 40 && !cleanName.toLowerCase().includes("signature")) {
          const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
          if (!addedDrugNames.has(capitalized.toLowerCase())) {
            addedDrugNames.add(capitalized.toLowerCase());
            detectedMeds.push({ name: capitalized, dose: lineDose, freq: lineFreq, stock: 30, instructions: lineInstructions });
          }
        }
      }
    }
  }

  // ---- PASS 2: Word-level scan — catches medicines mid-line or in collapsed OCR blobs ----
  if (detectedMeds.length < 2) {
    const fullLower = rawClean.toLowerCase();
    for (const drug of MEDICAL_DRUG_DICTIONARY) {
      if (addedDrugNames.has(drug.name.toLowerCase())) continue;

      const matchDrug = drug.name.toLowerCase();
      const matchAliases = drug.aliases || [];
      let foundPos = fullLower.indexOf(matchDrug);
      if (foundPos === -1) {
        for (const alias of matchAliases) {
          const idx = fullLower.indexOf(alias.toLowerCase());
          if (idx !== -1) { foundPos = idx; break; }
        }
      }

      if (foundPos !== -1) {
        const snippet = rawClean.substring(Math.max(0, foundPos - 15), Math.min(rawClean.length, foundPos + 80));
        const dm = snippet.match(/\b(\d+(?:\.\d+)?\s*(?:mg|mcg|g|ml|iu|tablets?|caps?|pills?))\b/i);
        const d = dm ? dm[1].trim() : drug.defaultDose;
        const f = normalizeFrequencyPattern(snippet);
        const sLow = snippet.toLowerCase();
        let ins = drug.instructions;
        if (sLow.includes("after food") || sLow.includes("after meals")) ins = "Take after meals with water";
        else if (sLow.includes("before food") || sLow.includes("empty stomach")) ins = "Take on an empty stomach before food";
        else if (sLow.includes("bedtime") || sLow.includes("at night")) ins = "Take at bedtime with water";

        addedDrugNames.add(drug.name.toLowerCase());
        detectedMeds.push({ name: drug.name, dose: d, freq: f, stock: 30, instructions: ins });
      }
    }
  }

  // ---- PASS 3: Global dictionary scan (final fallback when 0 results) ----
  if (detectedMeds.length === 0) {
    const fullLower = rawText.toLowerCase();
    for (const drug of MEDICAL_DRUG_DICTIONARY) {
      if (fullLower.includes(drug.name.toLowerCase()) ||
          (drug.aliases && drug.aliases.some(a => fullLower.includes(a.toLowerCase())))) {
        if (!addedDrugNames.has(drug.name.toLowerCase())) {
          addedDrugNames.add(drug.name.toLowerCase());
          detectedMeds.push({ name: drug.name, dose: drug.defaultDose, freq: normalizeFrequencyPattern(rawText), stock: 30, instructions: drug.instructions });
        }
      }
    }
  }

  if (detectedMeds.length === 0) {
    detectedMeds.push({ name: "Prescribed Medication", dose: "500 mg", freq: "1-0-1", stock: 30, instructions: "Take as directed by doctor" });
  }

  renderBatchConfirmModal(detectedMeds);
}

function handleBatchExtractedMedicines(medsList) {
  if (!medsList || medsList.length === 0) {
    showToast("No readable medications identified. Please enter details manually.", "info");
    openManualAddModal();
    return;
  }
  renderBatchConfirmModal(medsList);
}

// ================= BATCH CONFIRMATION MODAL ENGINE =================
function renderBatchConfirmModal(medsList, editingId = null) {
  const container = document.getElementById("confirm-meds-list");
  const countBadge = document.getElementById("confirm-meds-count-badge");
  const saveBtn = document.getElementById("btn-confirm-save-all");
  const saveBtnLabel = document.getElementById("confirm-save-btn-label");
  const modal = document.getElementById("confirm-modal");

  if (!container || !modal) return;

  if (editingId) {
    modal.dataset.editingId = editingId;
  } else {
    delete modal.dataset.editingId;
  }

  const items = Array.isArray(medsList) && medsList.length > 0 ? medsList : [{
    name: "",
    dose: "500 mg",
    freq: "1-0-1",
    stock: 30,
    instructions: "Take as directed"
  }];

  if (countBadge) {
    countBadge.innerText = `${items.length} Medicine${items.length !== 1 ? 's' : ''}`;
  }

  if (saveBtnLabel) {
    saveBtnLabel.innerText = editingId
      ? "Save Updated Medication"
      : items.length > 1
        ? `Confirm & Schedule All (${items.length}) Medicines`
        : "Confirm & Generate Schedule";
  }

  container.innerHTML = items.map((med, idx) => `
    <div class="confirm-med-row bg-[#f8faf9] p-4 rounded-2xl border border-[#e3ece6] space-y-3 relative transition-all shadow-sm">
      <div class="flex items-center justify-between border-b border-[#e3ece6] pb-2.5">
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-[#446b53] text-white text-xs font-bold flex items-center justify-center">${idx + 1}</span>
          <span class="font-bold text-xs text-[#1b2620] uppercase tracking-wider">Medication Item</span>
        </div>
        ${items.length > 1 ? `
          <button onclick="removeMedRowFromModal(this)" class="text-rose-500 hover:text-rose-700 text-xs font-bold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1">
            <span>ðŸ—‘ï¸</span> <span>Remove</span>
          </button>
        ` : ''}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="sm:col-span-2">
          <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Medicine Name *</label>
          <input type="text" value="${escapeHtml(med.name || '')}" placeholder="e.g. Amoxicillin, Dolo 650" oninput="checkModalBatchDrugInteractions()" class="med-row-name w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] font-bold text-sm focus:border-[#446b53] outline-none shadow-sm">
        </div>

        <div>
          <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Dosage Strength *</label>
          <input type="text" value="${escapeHtml(med.dose || '500 mg')}" placeholder="e.g. 500mg, 1 tablet" class="med-row-dose w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] font-bold text-sm focus:border-[#446b53] outline-none shadow-sm">
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Frequency / Daily Pattern</label>
          <select class="med-row-freq w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] font-bold text-xs focus:border-[#446b53] outline-none shadow-sm">
            <option value="1-0-1" ${(med.frequency === '1-0-1' || med.freq === '1-0-1') ? 'selected' : ''}>1 - 0 - 1 (Morning & Night)</option>
            <option value="1-1-1" ${(med.frequency === '1-1-1' || med.freq === '1-1-1') ? 'selected' : ''}>1 - 1 - 1 (Morning, Afternoon, Night)</option>
            <option value="0-0-1" ${(med.frequency === '0-0-1' || med.freq === '0-0-1') ? 'selected' : ''}>0 - 0 - 1 (Night Only - Bedtime)</option>
            <option value="1-0-0" ${(med.frequency === '1-0-0' || med.freq === '1-0-0') ? 'selected' : ''}>1 - 0 - 0 (Morning Only - Breakfast)</option>
            <option value="0-1-0" ${(med.frequency === '0-1-0' || med.freq === '0-1-0') ? 'selected' : ''}>0 - 1 - 0 (Afternoon Only - Lunch)</option>
          </select>
        </div>

        <div>
          <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Pill Stock (Refill Count)</label>
          <input type="number" value="${med.stock || 30}" min="1" class="med-row-stock w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] font-bold text-xs focus:border-[#446b53] outline-none shadow-sm">
        </div>
      </div>

      <div>
        <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Special Instructions</label>
        <input type="text" value="${escapeHtml(med.instructions || 'Take as directed by doctor')}" placeholder="e.g. Take after food with warm water" class="med-row-instructions w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] text-xs focus:border-[#446b53] outline-none shadow-sm">
      </div>
    </div>
  `).join("");

  modal.classList.remove("hidden");
  checkModalBatchDrugInteractions();
}

function addNewBlankMedRowToModal() {
  const container = document.getElementById("confirm-meds-list");
  if (!container) return;

  const currentRows = container.querySelectorAll(".confirm-med-row");
  const newIndex = currentRows.length + 1;

  const rowDiv = document.createElement("div");
  rowDiv.className = "confirm-med-row bg-[#f8faf9] p-4 rounded-2xl border border-[#e3ece6] space-y-3 relative transition-all shadow-sm animate-fade-in";
  rowDiv.innerHTML = `
    <div class="flex items-center justify-between border-b border-[#e3ece6] pb-2.5">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-[#446b53] text-white text-xs font-bold flex items-center justify-center">${newIndex}</span>
        <span class="font-bold text-xs text-[#1b2620] uppercase tracking-wider">Additional Medication</span>
      </div>
      <button onclick="removeMedRowFromModal(this)" class="text-rose-500 hover:text-rose-700 text-xs font-bold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1">
        <span>ðŸ—‘ï¸</span> <span>Remove</span>
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="sm:col-span-2">
        <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Medicine Name *</label>
        <input type="text" placeholder="e.g. Paracetamol 650mg" oninput="checkModalBatchDrugInteractions()" class="med-row-name w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] font-bold text-sm focus:border-[#446b53] outline-none shadow-sm">
      </div>

      <div>
        <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Dosage Strength *</label>
        <input type="text" value="500 mg" placeholder="e.g. 500mg, 1 tablet" class="med-row-dose w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] font-bold text-sm focus:border-[#446b53] outline-none shadow-sm">
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Frequency / Daily Pattern</label>
        <select class="med-row-freq w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] font-bold text-xs focus:border-[#446b53] outline-none shadow-sm">
          <option value="1-0-1" selected>1 - 0 - 1 (Morning & Night)</option>
          <option value="1-1-1">1 - 1 - 1 (Morning, Afternoon, Night)</option>
          <option value="0-0-1">0 - 0 - 1 (Night Only - Bedtime)</option>
          <option value="1-0-0">1 - 0 - 0 (Morning Only - Breakfast)</option>
          <option value="0-1-0">0 - 1 - 0 (Afternoon Only - Lunch)</option>
        </select>
      </div>

      <div>
        <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Pill Stock (Refill Count)</label>
        <input type="number" value="30" min="1" class="med-row-stock w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] font-bold text-xs focus:border-[#446b53] outline-none shadow-sm">
      </div>
    </div>

    <div>
      <label class="block text-[11px] text-[#647b6e] font-bold uppercase mb-1">Special Instructions</label>
      <input type="text" value="Take as directed" placeholder="e.g. Take after meals with water" class="med-row-instructions w-full bg-white border border-[#e3ece6] rounded-xl p-2.5 text-[#1b2620] text-xs focus:border-[#446b53] outline-none shadow-sm">
    </div>
  `;

  container.appendChild(rowDiv);
  updateModalCounterBadge();
}

function removeMedRowFromModal(btn) {
  const row = btn.closest(".confirm-med-row");
  if (row) {
    row.remove();
    updateModalCounterBadge();
    checkModalBatchDrugInteractions();
  }
}

function updateModalCounterBadge() {
  const countBadge = document.getElementById("confirm-meds-count-badge");
  const saveBtnLabel = document.getElementById("confirm-save-btn-label");
  const rows = document.querySelectorAll(".confirm-med-row");
  const count = rows.length;

  if (countBadge) countBadge.innerText = `${count} Medicine${count !== 1 ? 's' : ''}`;
  if (saveBtnLabel) {
    const editingId = document.getElementById("confirm-modal").dataset.editingId;
    saveBtnLabel.innerText = editingId
      ? "Save Updated Medication"
      : count > 1
        ? `Confirm & Schedule All (${count}) Medicines`
        : "Confirm & Generate Schedule";
  }
}

function checkModalBatchDrugInteractions() {
  const alertBox = document.getElementById("modal-interaction-alert");
  const alertText = document.getElementById("modal-interaction-text");
  if (!alertBox || !alertText) return;

  const inputNames = Array.from(document.querySelectorAll(".med-row-name"))
    .map(inp => inp.value.trim().toLowerCase())
    .filter(Boolean);

  const existingNames = state.medications.map(m => m.name.toLowerCase());
  const allNames = [...existingNames, ...inputNames];

  let detectedConflicts = [];
  DRUG_INTERACTION_RULES.forEach(rule => {
    const hasA = allNames.some(n => n.includes(rule.pair[0]));
    const hasB = allNames.some(n => n.includes(rule.pair[1]));
    if (hasA && hasB) {
      detectedConflicts.push(`[${rule.severity}] ${rule.message}`);
    }
  });

  if (detectedConflicts.length > 0) {
    alertText.innerText = detectedConflicts.join(" â€¢ ");
    alertBox.classList.remove("hidden");
  } else {
    alertBox.classList.add("hidden");
  }
}

function closeConfirmModal() {
  document.getElementById("confirm-modal").classList.add("hidden");
}

function saveAllConfirmedMedications() {
  const rows = document.querySelectorAll(".confirm-med-row");
  if (rows.length === 0) {
    closeConfirmModal();
    return;
  }

  const editingId = document.getElementById("confirm-modal").dataset.editingId;
  const newMedsToAdd = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = row.querySelector(".med-row-name").value.trim();
    const dose = row.querySelector(".med-row-dose").value.trim() || "1 dose";
    const freq = row.querySelector(".med-row-freq").value;
    const stock = parseInt(row.querySelector(".med-row-stock").value, 10) || 30;
    const instructions = row.querySelector(".med-row-instructions").value.trim() || "Take as directed";

    if (!name) {
      alert(`Please enter a valid Medicine Name for row #${i + 1}`);
      row.querySelector(".med-row-name").focus();
      return;
    }

    if (editingId && i === 0) {
      const med = state.medications.find(m => m.id === editingId);
      if (med) {
        med.name = name;
        med.dose = dose;
        med.stock = stock;
        med.freq = freq;
        med.instructions = instructions;
      }
    } else {
      newMedsToAdd.push({
        id: "med-" + (Date.now() + i),
        name,
        dose,
        stock,
        freq,
        instructions,
        createdDate: new Date().toISOString()
      });
    }
  }

  if (newMedsToAdd.length > 0) {
    state.medications.push(...newMedsToAdd);
    showToast(`ðŸŽ‰ Scheduled ${newMedsToAdd.length} medication${newMedsToAdd.length !== 1 ? 's' : ''} into your daily routine!`, "success");
  } else if (editingId) {
    showToast(`Updated medication details`, "success");
  }

  saveStateToLocalStorage();
  closeConfirmModal();
  switchTab("tab-schedule");
  renderAll();
}

function escapeHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}


// ================= SAMPLE PRESCRIPTIONS MODAL =================
function openSampleRxModal() {
  const container = document.getElementById("sample-cards-grid");
  if (!container || typeof SAMPLE_PRESCRIPTIONS === "undefined") return;

  container.innerHTML = SAMPLE_PRESCRIPTIONS.map(rx => `
    <div class="bg-[#f8faf9] border border-[#e3ece6] rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-[#a4c4b0] transition-all shadow-sm">
      <div>
        <div class="text-xs text-[#335542] font-bold uppercase">${rx.doctor}</div>
        <div class="font-bold text-[#1b2620] text-base mt-1">${rx.medication} ${rx.dosage}</div>
        <div class="text-xs text-[#647b6e] mt-0.5">Pattern: <span class="text-[#1b2620] font-bold font-mono">${rx.frequency}</span></div>
        <div class="text-xs text-[#647b6e] mt-1 italic">${rx.instructions}</div>
      </div>
      <button onclick="selectSampleRx('${rx.id}')" class="w-full mt-2 py-2 bg-gradient-to-r from-[#446b53] to-[#355d47] hover:from-[#3a5d48] hover:to-[#2b4c39] text-white font-bold text-xs rounded-xl transition-all shadow-sm">
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

  // Show the canvas image as a preview in the scan tab
  const dataUrl = createPrescriptionCanvasImage(rx);
  const previewImg = document.getElementById("prescription-preview-img");
  previewImg.src = dataUrl;
  previewImg.dataset.sampleRxId = rxId; // tag for direct-data path

  switchTab("tab-scan");
  document.getElementById("image-preview-container").classList.remove("hidden");

  // ---- DIRECT DATA PATH (skips lossy OCR) ----
  // If the sample Rx has a structured medicines array, use it directly
  // instead of running Tesseract on the canvas image â€” which routinely
  // drops medicine lines because synthetic canvas fonts confuse OCR.
  if (rx.medicines && rx.medicines.length > 0) {
    const progressBox = document.getElementById("ocr-progress-box");
    const progressBar = document.getElementById("ocr-progress-bar");
    const statusText = document.getElementById("ocr-status-text");
    const percentageText = document.getElementById("ocr-percentage-text");

    progressBox.classList.remove("hidden");
    progressBar.style.width = "100%";
    percentageText.innerText = "100%";
    statusText.innerText = `âœ… Sample Rx loaded â€” ${rx.medicines.length} medicines ready for review`;

    setTimeout(() => {
      renderBatchConfirmModal(rx.medicines);
      showToast(`ðŸ“‹ ${rx.medicines.length} medicines loaded from sample prescription`, "success");
    }, 400);
  } else {
    // Fallback: enable manual OCR button if no structured data
    document.getElementById("process-ocr-btn").disabled = false;
  }
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
    showToast(`ðŸ“± Caregiver Alert Dispatched to ${contact}: Dose skipped (${medName})`, "warning");
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
        <span>âš ï¸</span> <span>[${c.severity} Severity] ${c.message}</span>
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
    const instText = instructions ? `à°¸à±‚à°šà°¨à°²à±: ${instructions}` : "à°¸à±‚à°šà°¨à°² à°ªà±à°°à°•à°¾à°°à°‚ à°µà±‡à°¸à±à°•à±‹à°‚à°¡à°¿.";
    speechText = `à°‡à°ªà±à°ªà±à°¡à± ${medName} ${dose} à°µà±‡à°¸à±à°•à±‹à°µà°¾à°²à±à°¸à°¿à°¨ à°¸à°®à°¯à°‚ à°…à°¯à°¿à°‚à°¦à°¿. ${instText}`;
    showToast(`ðŸ”Š [à°¤à±†à°²à±à°—à± à°µà°¾à°¯à°¿à°¸à±]: "${speechText}"`, "info");
  } else if (lang === "hi") {
    const instText = instructions ? `à¤¨à¤¿à¤°à¥à¤¦à¥‡à¤¶: ${instructions}` : "à¤¨à¤¿à¤°à¥à¤¦à¥‡à¤¶à¤¾à¤¨à¥à¤¸à¤¾à¤° à¤²à¥‡à¤‚à¥¤";
    speechText = `à¤…à¤¬ ${medName} ${dose} à¤²à¥‡à¤¨à¥‡ à¤•à¤¾ à¤¸à¤®à¤¯ à¤¹à¥‹ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤ ${instText}`;
    showToast(`ðŸ”Š [à¤¹à¤¿à¤‚à¤¦à¥€ à¤†à¤µà¤¾à¤œà¤¼]: "${speechText}"`, "info");
  } else {
    const instText = instructions ? `Instructions: ${instructions}` : "Take as directed.";
    speechText = `Time to take ${medName} ${dose}. ${instText}`;
    showToast(`ðŸ”Š [English Voice]: "${speechText}"`, "info");
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
    if (lang === "te") text = "à°…à°¦à±à°­à±à°¤à°‚! à°ˆà°°à±‹à°œà± à°µà±‡à°¸à±à°•à±‹à°µà°¾à°²à±à°¸à°¿à°¨ à°…à°¨à±à°¨à°¿ à°®à°‚à°¦à±à°²à± à°µà±‡à°¸à±à°•à±à°¨à±à°¨à°¾à°°à±.";
    else if (lang === "hi") text = "à¤¬à¤¹à¥à¤¤ à¤¬à¤¢à¤¼à¤¿à¤¯à¤¾! à¤†à¤œ à¤•à¥€ à¤¸à¤­à¥€ à¤¨à¤¿à¤°à¥à¤§à¤¾à¤°à¤¿à¤¤ à¤–à¥à¤°à¤¾à¤•à¥‡à¤‚ à¤²à¥‡ à¤²à¥€ à¤—à¤ˆ à¤¹à¥ˆà¤‚à¥¤";
    else text = "Great job! All scheduled doses for today have been taken.";
  } else {
    if (lang === "te") {
      text = "à°ˆà°°à±‹à°œà± à°®à±€à°•à± à°®à°¿à°—à°¿à°²à°¿à°¨ à°®à°‚à°¦à±à°² à°µà°¿à°µà°°à°¾à°²à±: ";
      if (morningMeds.length > 0) text += `à°‰à°¦à°¯à°‚ à°µà±‡à°¸à±à°•à±‹à°µà°¾à°²à±à°¸à°¿à°¨à°µà°¿: ${morningMeds.join(", ")}. `;
      else text += "à°‰à°¦à°¯à°‚ à°®à°‚à°¦à±à°²à± à°à°®à±€ à°²à±‡à°µà±. ";

      if (afternoonMeds.length > 0) text += `à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚ à°µà±‡à°¸à±à°•à±‹à°µà°¾à°²à±à°¸à°¿à°¨à°µà°¿: ${afternoonMeds.join(", ")}. `;
      else text += "à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚ à°®à°‚à°¦à±à°²à± à°à°®à±€ à°²à±‡à°µà±. ";

      if (nightMeds.length > 0) text += `à°°à°¾à°¤à±à°°à°¿ à°µà±‡à°¸à±à°•à±‹à°µà°¾à°²à±à°¸à°¿à°¨à°µà°¿: ${nightMeds.join(", ")}.`;
      else text += "à°°à°¾à°¤à±à°°à°¿ à°®à°‚à°¦à±à°²à± à°à°®à±€ à°²à±‡à°µà±.";
    } else if (lang === "hi") {
      text = "à¤†à¤ªà¤•à¥€ à¤†à¤œ à¤•à¥€ à¤¶à¥‡à¤· à¤¦à¤µà¤¾à¤“à¤‚ à¤•à¤¾ à¤µà¤¿à¤µà¤°à¤£: ";
      if (morningMeds.length > 0) text += `à¤¸à¥à¤¬à¤¹ à¤¬à¤šà¥€ à¤¦à¤µà¤¾à¤à¤‚: ${morningMeds.join(", ")}à¥¤ `;
      else text += "à¤¸à¥à¤¬à¤¹ à¤•à¥€ à¤•à¥‹à¤ˆ à¤¦à¤µà¤¾ à¤¨à¤¹à¥€à¤‚ à¤¬à¤šà¥€ à¤¹à¥ˆà¥¤ ";

      if (afternoonMeds.length > 0) text += `à¤¦à¥‹à¤ªà¤¹à¤° à¤¬à¤šà¥€ à¤¦à¤µà¤¾à¤à¤‚: ${afternoonMeds.join(", ")}à¥¤ `;
      else text += "à¤¦à¥‹à¤ªà¤¹à¤° à¤•à¥€ à¤•à¥‹à¤ˆ à¤¦à¤µà¤¾ à¤¨à¤¹à¥€à¤‚ à¤¬à¤šà¥€ à¤¹à¥ˆà¥¤ ";

      if (nightMeds.length > 0) text += `à¤°à¤¾à¤¤ à¤®à¥‡à¤‚ à¤¬à¤šà¥€ à¤¦à¤µà¤¾à¤à¤‚: ${nightMeds.join(", ")}à¥¤`;
      else text += "à¤°à¤¾à¤¤ à¤•à¥€ à¤•à¥‹à¤ˆ à¤¦à¤µà¤¾ à¤¨à¤¹à¥€à¤‚ à¤¬à¤šà¥€ à¤¹à¥ˆà¥¤";
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

  showToast(`ðŸ”Š Audio Breakdown (${lang.toUpperCase()}): "${text}"`, "info");
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
      showToast("ðŸ”” Web Notifications Enabled!", "success");
      new Notification("DoseBuddy Reminders Active", {
        body: "You will receive gentle reminder alerts for your medication times.",
        icon: "ðŸ’Š"
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
  showToast("Language changed to " + (langCode === 'te' ? 'TELUGU ðŸ‡®ðŸ‡³' : langCode === 'hi' ? 'HINDI ðŸ‡®ðŸ‡³' : 'ENGLISH ðŸ‡ºðŸ‡¸'), "info");
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
    showToast("ðŸ‘“ Senior High-Contrast Mode Activated", "info");
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
    <button onclick="this.parentElement.remove()" class="text-sm font-bold opacity-75 hover:opacity-100">âœ•</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4000);
}
