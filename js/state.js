/**
 * MEUW ACADEMY — state.js
 * LocalStorage state management with multi-profile support
 */

import { normalizeText } from './utils.js';

const STORAGE_KEY = 'meoAcademy_v2';
const CURRENT_VERSION = 2;

function createDeviceId() {
  return `device_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// === Default state template for a new profile ===
function createDefaultProfile(id, name = 'Méo', avatarColor = '#EC4899') {
  return {
    id,
    name,
    avatarColor,
    createdAt: new Date().toISOString().split('T')[0],
    currentDay: 1,
    currentWeek: 1,
    xpToday: 0,
    xpTotal: 0,
    streak: 0,
    lastPlayDate: null,
    streakShieldsRemaining: 3,
    completedModules: {},
    knowledgeLedger: {
      topicKeys: [],
      questionSignatures: [],
      explanationSignatures: [],
      lessonSignatures: [],
      recentSessions: [],
    },
    earnedBadges: [],
    gallery: [],
    settings: {
      parentPin: '1234',
      soundOn: true,
      speechEnabled: true,
      breakReminderMins: 45,
      theme: 'default',
    },
    stats: {
      totalTimeMs: 0,
      longestStreakEver: 0,
      mathModulesCompleted: 0,
      engModulesCompleted: 0,
      sciModulesCompleted: 0,
      readModulesCompleted: 0,
      drawingsCreated: 0,
      speechSubmitted: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      maxXPinDay: 0,
    },
  };
}

// === Root state structure ===
function createRootState() {
  const defaultProfileId = `profile_${Date.now()}`;
  return {
    version: CURRENT_VERSION,
    activeProfile: defaultProfileId,
    profiles: {
      [defaultProfileId]: createDefaultProfile(defaultProfileId),
    },
    pinLockUntil: null,   // timestamp if PIN locked out
    pinAttempts: 0,
    syncMeta: {
      deviceId: createDeviceId(),
      localUpdatedAt: new Date().toISOString(),
      account: null,
      lastSyncedAt: null,
    },
  };
}

// ============================================
// STORAGE READ / WRITE
// ============================================
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createRootState();
    const parsed = JSON.parse(raw);
    // Migration: add missing fields
    return migrateState(parsed);
  } catch (e) {
    console.warn('[State] Failed to load state, resetting:', e);
    return createRootState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('[State] Failed to save state:', e);
    // Try to free up space by truncating gallery
    if (state.profiles) {
      const activeId = state.activeProfile;
      if (state.profiles[activeId]?.gallery?.length > 20) {
        state.profiles[activeId].gallery = state.profiles[activeId].gallery.slice(-20);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (_) {}
      }
    }
  }
}

function migrateState(state) {
  if (!state.version || state.version < CURRENT_VERSION) {
    // Future migrations go here
  }
  // Ensure all required fields exist
  if (!state.profiles) state.profiles = {};
  if (!state.syncMeta) {
    state.syncMeta = {
      deviceId: createDeviceId(),
      localUpdatedAt: new Date().toISOString(),
      account: null,
      lastSyncedAt: null,
    };
  }
  if (!state.syncMeta.deviceId) state.syncMeta.deviceId = createDeviceId();
  if (!state.syncMeta.localUpdatedAt) state.syncMeta.localUpdatedAt = new Date().toISOString();
  if (state.syncMeta.account === undefined) state.syncMeta.account = null;
  if (state.syncMeta.lastSyncedAt === undefined) state.syncMeta.lastSyncedAt = null;
  if (!state.activeProfile || !state.profiles[state.activeProfile]) {
    const id = Object.keys(state.profiles)[0] || `profile_${Date.now()}`;
    if (!state.profiles[id]) {
      state.profiles[id] = createDefaultProfile(id);
    }
    state.activeProfile = id;
  }
  // Ensure settings exist on each profile
  for (const id in state.profiles) {
    const p = state.profiles[id];
    if (!p.settings) p.settings = createDefaultProfile(id).settings;
    if (!p.stats)    p.stats    = createDefaultProfile(id).stats;
    if (!p.gallery)  p.gallery  = [];
    if (!p.earnedBadges) p.earnedBadges = [];
    if (!p.completedModules) p.completedModules = {};
    if (!p.knowledgeLedger) p.knowledgeLedger = createDefaultProfile(id).knowledgeLedger;
    if (!Array.isArray(p.knowledgeLedger.topicKeys)) p.knowledgeLedger.topicKeys = [];
    if (!Array.isArray(p.knowledgeLedger.questionSignatures)) p.knowledgeLedger.questionSignatures = [];
    if (!Array.isArray(p.knowledgeLedger.explanationSignatures)) p.knowledgeLedger.explanationSignatures = [];
    if (!Array.isArray(p.knowledgeLedger.lessonSignatures)) p.knowledgeLedger.lessonSignatures = [];
    if (!Array.isArray(p.knowledgeLedger.recentSessions)) p.knowledgeLedger.recentSessions = [];
    if (p.streakShieldsRemaining === undefined) p.streakShieldsRemaining = 3;
  }
  return state;
}

// ============================================
// STATE SINGLETON
// ============================================
let _state = loadState();

function getState() { return _state; }

function getActiveProfile() {
  return _state.profiles[_state.activeProfile];
}

function getProfile(profileId) {
  return _state.profiles[profileId] || null;
}

function commit() {
  _state.syncMeta = _state.syncMeta || {};
  _state.syncMeta.localUpdatedAt = new Date().toISOString();
  saveState(_state);
}

function commitSyncMetadata() {
  saveState(_state);
}

function buildQuestionLedgerSignature(question) {
  const blankAnswers = Array.isArray(question?.blanks)
    ? question.blanks.map(blank => blank?.answer || '').join('|')
    : '';
  return normalizeText([
    question?.type || '',
    question?.question || '',
    question?.answer || question?.ans || blankAnswers,
  ].join('|'));
}

// ============================================
// PROFILE MANAGEMENT
// ============================================
function listProfiles() {
  return Object.values(_state.profiles).sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
}

function switchProfile(profileId) {
  if (!_state.profiles[profileId]) throw new Error(`Profile ${profileId} not found`);
  _state.activeProfile = profileId;
  commit();
}

function createProfile({ name, avatarColor } = {}) {
  const profileCount = Object.keys(_state.profiles).length;
  if (profileCount >= 5) throw new Error('Tối đa 5 hồ sơ');
  const id = `profile_${Date.now()}`;
  _state.profiles[id] = createDefaultProfile(id, name, avatarColor);
  commit();
  return id;
}

function deleteProfile(profileId, pin) {
  if (!validatePin(pin)) throw new Error('PIN không đúng');
  if (Object.keys(_state.profiles).length <= 1) throw new Error('Không thể xóa hồ sơ cuối cùng');
  delete _state.profiles[profileId];
  if (_state.activeProfile === profileId) {
    _state.activeProfile = Object.keys(_state.profiles)[0];
  }
  commit();
}

function updateProfileName(name) {
  getActiveProfile().name = name;
  commit();
}

// ============================================
// XP SYSTEM
// ============================================
function addXP(amount) {
  const profile = getActiveProfile();
  profile.xpToday = (profile.xpToday || 0) + amount;
  profile.xpTotal = (profile.xpTotal || 0) + amount;

  // Update max XP in a day
  if (profile.xpToday > (profile.stats.maxXPinDay || 0)) {
    profile.stats.maxXPinDay = profile.xpToday;
  }

  commit();
  return profile.xpTotal;
}

function getXPToday() {
  return getActiveProfile().xpToday || 0;
}

function getXPTotal() {
  return getActiveProfile().xpTotal || 0;
}

function getLevel() {
  const xp = getXPTotal();
  if (xp < 500)   return { level: 1, title: 'Thám Tử Nhí',     emoji: '🐾', next: 500 };
  if (xp < 2000)  return { level: 2, title: 'Nhà Khám Phá',    emoji: '🔭', next: 2000 };
  if (xp < 5000)  return { level: 3, title: 'Học Giả',         emoji: '🎓', next: 5000 };
  if (xp < 10000) return { level: 4, title: 'Nhà Khoa Học',    emoji: '🌟', next: 10000 };
  return           { level: 5, title: 'Thiên Tài Mùa Hè',   emoji: '👑', next: Infinity };
}

// ============================================
// STREAK SYSTEM
// ============================================
function updateStreak() {
  const profile = getActiveProfile();
  const today = new Date().toISOString().split('T')[0];
  const last = profile.lastPlayDate;

  if (last === today) return profile.streak; // already updated today

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (last === yesterday) {
    // Consecutive day
    profile.streak = (profile.streak || 0) + 1;
  } else if (last && last < yesterday) {
    // Missed a day — check for shield
    if (profile.streakShieldsRemaining > 0) {
      profile.streakShieldsRemaining -= 1;
      profile.streak = (profile.streak || 0) + 1;
    } else {
      profile.streak = 1; // reset
    }
  } else {
    // First day or gap too large
    profile.streak = 1;
  }

  profile.lastPlayDate = today;
  profile.xpToday = 0; // reset daily XP

  // Track longest streak
  if (profile.streak > (profile.stats.longestStreakEver || 0)) {
    profile.stats.longestStreakEver = profile.streak;
  }

  commit();
  return profile.streak;
}

function getStreak() {
  return getActiveProfile().streak || 0;
}

function useStreakShield() {
  const profile = getActiveProfile();
  if (profile.streakShieldsRemaining > 0) {
    profile.streakShieldsRemaining -= 1;
    commit();
    return true;
  }
  return false;
}

// ============================================
// MODULE TRACKING
// ============================================
function markModuleComplete(moduleId, { score, total, timeMs, xp, ...extra } = {}) {
  const profile = getActiveProfile();
  const previous = profile.completedModules[moduleId] || {};
  profile.completedModules[moduleId] = {
    ...previous,
    ...extra,
    score: score ?? total,
    total: total ?? 1,
    timeMs: timeMs ?? 0,
    xp: xp ?? 0,
    completedAt: new Date().toISOString(),
  };

  // Update subject stats
  const subject = moduleId.split('_')[1]?.split('-')[1] || '';
  const statMap = {
    'math': 'mathModulesCompleted',
    'mathx': 'mathModulesCompleted',
    'eng': 'engModulesCompleted',
    'engs': 'engModulesCompleted',
    'sci': 'sciModulesCompleted',
    'read': 'readModulesCompleted',
    'draw': 'drawingsCreated',
  };
  const statKey = statMap[subject];
  if (statKey) profile.stats[statKey] = (profile.stats[statKey] || 0) + 1;

  // Update total time
  profile.stats.totalTimeMs = (profile.stats.totalTimeMs || 0) + timeMs;

  commit();

  // Check streak update
  updateStreak();
}

function isModuleComplete(moduleId) {
  return !!getActiveProfile().completedModules[moduleId];
}

function getModuleData(moduleId) {
  return getActiveProfile().completedModules[moduleId] || null;
}

function getKnowledgeLedger() {
  return getActiveProfile().knowledgeLedger || createDefaultProfile('temp').knowledgeLedger;
}

function recordKnowledgeExposure(moduleData, context = {}) {
  if (!moduleData) return;
  const profile = getActiveProfile();
  const ledger = profile.knowledgeLedger || (profile.knowledgeLedger = createDefaultProfile(profile.id, profile.name, profile.avatarColor).knowledgeLedger);
  const pushUnique = (arr, value, maxSize) => {
    if (!value) return;
    const filtered = arr.filter(item => item !== value);
    filtered.push(value);
    if (filtered.length > maxSize) filtered.splice(0, filtered.length - maxSize);
    arr.splice(0, arr.length, ...filtered);
  };

  pushUnique(ledger.topicKeys, moduleData.topicKey || moduleData.title || moduleData.id, 3000);

  if (context.dayId || context.session) {
    const recent = {
      dayId: context.dayId ?? null,
      session: context.session ?? null,
      moduleId: moduleData.id,
      topicKey: moduleData.topicKey || moduleData.title || moduleData.id,
      recordedAt: new Date().toISOString(),
    };
    ledger.recentSessions = [...ledger.recentSessions.filter(item => item.moduleId !== moduleData.id), recent].slice(-3000);
  }

  (moduleData.lessonBlocks || []).forEach(block => {
    const signature = normalizeText([
      block.teacherName || '',
      block.title || '',
      ...(block.points || []),
      block.example || '',
    ].join('|'));
    pushUnique(ledger.lessonSignatures, signature, 12000);
  });

  (moduleData.questions || []).forEach(q => {
    const questionSignature = buildQuestionLedgerSignature(q);
    pushUnique(ledger.questionSignatures, questionSignature, 50000);

    const explanationSignature = normalizeText(q.explanation || '');
    if (explanationSignature) {
      pushUnique(ledger.explanationSignatures, explanationSignature, 50000);
    }
  });

  commit();
}

function getCurrentDay() {
  return getActiveProfile().currentDay || 1;
}

function setCurrentDay(day) {
  getActiveProfile().currentDay = Math.max(1, Math.min(84, day));
  commit();
}

function advanceDay() {
  const profile = getActiveProfile();
  const todayDate = new Date().toISOString().split('T')[0];
  
  if (!profile.dayUnlockedOn) profile.dayUnlockedOn = {};
  
  // If they already unlocked a day today, do not advance. They must practice instead.
  if (profile.dayUnlockedOn[profile.currentDay] === todayDate) {
    return false; // Time-gated
  }
  
  profile.currentDay = Math.min(90, (profile.currentDay || 1) + 1);
  profile.currentWeek = Math.ceil(profile.currentDay / 7);
  profile.dayUnlockedOn[profile.currentDay] = todayDate;
  commit();
  return true;
}

// ============================================
// GALLERY
// ============================================
const GALLERY_MAX = 50;

function saveDrawing({ src, day, title }) {
  const profile = getActiveProfile();
  if (!profile.gallery) profile.gallery = [];

  // Remove oldest if at limit
  if (profile.gallery.length >= GALLERY_MAX) {
    profile.gallery.shift();
  }

  profile.gallery.push({
    id: `drawing_${Date.now()}`,
    src,
    day: day || profile.currentDay,
    title: title || `Ngày ${profile.currentDay}`,
    savedAt: new Date().toISOString(),
  });

  profile.stats.drawingsCreated = (profile.stats.drawingsCreated || 0) + 1;
  commit();

  // Award XP for saving
  addXP(30);
}

function getGallery() {
  return [...(getActiveProfile().gallery || [])].reverse(); // newest first
}

function deleteDrawing(drawingId) {
  const profile = getActiveProfile();
  profile.gallery = (profile.gallery || []).filter(d => d.id !== drawingId);
  commit();
}

// ============================================
// SPEECH TRACKING
// ============================================
function recordSpeechSubmit() {
  const profile = getActiveProfile();
  profile.stats.speechSubmitted = (profile.stats.speechSubmitted || 0) + 1;
  addXP(15); // speech XP
  commit();
}

// ============================================
// BADGES
// ============================================
function hasBadge(badgeId) {
  return (getActiveProfile().earnedBadges || []).includes(badgeId);
}

function awardBadge(badgeId) {
  const profile = getActiveProfile();
  if (!profile.earnedBadges) profile.earnedBadges = [];
  if (profile.earnedBadges.includes(badgeId)) return false; // already has it
  profile.earnedBadges.push(badgeId);
  commit();
  return true; // newly awarded
}

function checkAndAwardBadges() {
  const profile = getActiveProfile();
  const newBadges = [];

  const streak = profile.streak || 0;
  const day = profile.currentDay || 1;
  const xp = profile.xpTotal || 0;
  const drawings = profile.stats.drawingsCreated || 0;
  const speeches = profile.stats.speechSubmitted || 0;
  const mathPerfect = profile.stats.mathModulesCompleted || 0;

  const checks = [
    // Streak badges
    { id: 'day1',        condition: day >= 1,                   name: 'Ngày Đầu Tiên',        emoji: '🌟' },
    { id: 'streak3',     condition: streak >= 3,                name: 'Bộ Ba Ngày',           emoji: '🔥' },
    { id: 'streak7',     condition: streak >= 7,                name: '1 Tuần Không Nghỉ',    emoji: '🏆' },
    { id: 'streak14',    condition: streak >= 14,               name: '2 Tuần Không Nghỉ',    emoji: '💎' },
    { id: 'streak30',    condition: streak >= 30,               name: '1 Tháng Không Nghỉ',   emoji: '👑' },
    // Achievement
    { id: 'math5',       condition: mathPerfect >= 5,           name: 'Phù Thủy Toán',        emoji: '🔢' },
    { id: 'speaker10',   condition: speeches >= 10,             name: 'Speaker ⭐',            emoji: '🗣️' },
    { id: 'artist5',     condition: drawings >= 5,              name: 'Họa Sĩ Nhí',           emoji: '🎨' },
    // Weekly
    { id: 'week1',       condition: day > 7,                    name: 'Chinh Phục Tuần 1',    emoji: '🐾' },
    { id: 'week2',       condition: day > 14,                   name: 'Người Khám Phá Biển',  emoji: '🐠' },
    { id: 'week3',       condition: day > 21,                   name: 'Nhà Khoa Học Rừng',    emoji: '🦋' },
    { id: 'month1',      condition: day > 28,                   name: 'Hoàn Thành Tháng 1',   emoji: '📖' },
    { id: 'week5',       condition: day > 35,                   name: 'Nhà Địa Chất Nhí',     emoji: '🌋' },
    { id: 'week6',       condition: day > 42,                   name: 'Nhà Dự Báo Thời Tiết', emoji: '⛈️' },
    { id: 'week7',       condition: day > 49,                   name: 'Bảo Vệ Nguồn Nước',    emoji: '💧' },
    { id: 'month2',      condition: day > 56,                   name: 'Hoàn Thành Tháng 2',   emoji: '🌍' },
    { id: 'week9',       condition: day > 63,                   name: 'Nhà Vật Lý Ánh Sáng',  emoji: '🌈' },
    { id: 'week10',      condition: day > 70,                   name: 'Kỹ Sư Nhí',            emoji: '⚙️' },
    { id: 'week11',      condition: day > 77,                   name: 'Nhà Phát Minh Điện',   emoji: '⚡' },
    { id: 'month3',      condition: day >= 84,                  name: 'Nhà Bác Học Mùa Hè',   emoji: '👑' },
    // Special
    { id: 'night_owl',   condition: isNightOwl(),               name: 'Cú Đêm',              emoji: '🌙' },
    { id: 'early_bird',  condition: isEarlyBird(),              name: 'Chim Sớm',             emoji: '☀️' },
  ];

  for (const check of checks) {
    if (check.condition && !hasBadge(check.id)) {
      if (awardBadge(check.id)) {
        newBadges.push({ id: check.id, name: check.name, emoji: check.emoji });
      }
    }
  }

  return newBadges; // return newly awarded badges for UI to show
}

function isNightOwl() {
  const h = new Date().getHours();
  return h >= 20;
}

function isEarlyBird() {
  const h = new Date().getHours();
  return h < 7;
}

// ============================================
// SETTINGS
// ============================================
function getSetting(key) {
  return getActiveProfile().settings?.[key];
}

function setSetting(key, value) {
  const profile = getActiveProfile();
  if (!profile.settings) profile.settings = {};
  profile.settings[key] = value;
  commit();
}

// ============================================
// PIN MANAGEMENT
// ============================================
function validatePin(pin) {
  // Check lockout
  if (_state.pinLockUntil && Date.now() < _state.pinLockUntil) {
    const remaining = Math.ceil((_state.pinLockUntil - Date.now()) / 1000);
    throw new Error(`Đợi ${remaining} giây`);
  }

  const correctPin = getSetting('parentPin') || '1234';
  if (pin === correctPin) {
    _state.pinAttempts = 0;
    _state.pinLockUntil = null;
    commit();
    return true;
  }

  _state.pinAttempts = (_state.pinAttempts || 0) + 1;
  if (_state.pinAttempts >= 3) {
    _state.pinLockUntil = Date.now() + 5 * 60 * 1000; // 5 minutes
    _state.pinAttempts = 0;
    commit();
    throw new Error('Sai quá 3 lần. Khóa 5 phút!');
  }
  commit();
  return false;
}

function changePin(oldPin, newPin) {
  if (!validatePin(oldPin)) throw new Error('PIN cũ không đúng');
  if (!/^\d{4}$/.test(newPin)) throw new Error('PIN phải là 4 chữ số');
  setSetting('parentPin', newPin);
}

function isPinLocked() {
  return _state.pinLockUntil && Date.now() < _state.pinLockUntil;
}

// ============================================
// IMPORT / EXPORT
// ============================================
function exportJSON() {
  return JSON.stringify(_state, null, 2);
}

function importJSON(jsonString) {
  try {
    const imported = JSON.parse(jsonString);
    if (!imported.profiles || !imported.activeProfile) {
      throw new Error('Dữ liệu không hợp lệ');
    }
    _state = migrateState(imported);
    commit();
    return true;
  } catch (e) {
    throw new Error(`Import thất bại: ${e.message}`);
  }
}

function getSyncMeta() {
  return _state.syncMeta || {};
}

function getLocalUpdatedAt() {
  return getSyncMeta().localUpdatedAt || null;
}

function setAccountSession(session = {}) {
  const { userId, email } = session || {};
  _state.syncMeta = _state.syncMeta || {};
  _state.syncMeta.account = userId ? {
    userId,
    email: email || '',
    linkedAt: new Date().toISOString(),
  } : null;
  commitSyncMetadata();
}

function markSynced() {
  _state.syncMeta = _state.syncMeta || {};
  _state.syncMeta.lastSyncedAt = new Date().toISOString();
  commitSyncMetadata();
}

function resetProfile() {
  const profile = getActiveProfile();
  const id = profile.id;
  const name = profile.name;
  const avatarColor = profile.avatarColor;
  _state.profiles[id] = createDefaultProfile(id, name, avatarColor);
  commit();
}

function resetLearningProgress() {
  const profile = getActiveProfile();
  profile.currentDay = 1;
  profile.currentWeek = 1;
  profile.completedModules = {};
  profile.dayUnlockedOn = {};
  commit();
}

function resetCurrentDayProgress(moduleIds) {
  const profile = getActiveProfile();
  if (!moduleIds || !Array.isArray(moduleIds)) return;
  
  for (let id of moduleIds) {
    if (profile.completedModules[id]) {
      delete profile.completedModules[id];
    }
  }
  commit();
}

// ============================================
// ANSWER TRACKING (for accuracy stats)
// ============================================
function recordAnswer(correct) {
  const profile = getActiveProfile();
  profile.stats.totalAnswered = (profile.stats.totalAnswered || 0) + 1;
  if (correct) {
    profile.stats.totalCorrect = (profile.stats.totalCorrect || 0) + 1;
  }
  commit();
}

function getAccuracyRate() {
  const stats = getActiveProfile().stats;
  const total = stats.totalAnswered || 0;
  if (total === 0) return 0;
  return Math.round((stats.totalCorrect / total) * 100);
}

// ============================================
// EXPORT
// ============================================
export const State = {
  // Profile
  listProfiles,
  switchProfile,
  createProfile,
  deleteProfile,
  updateProfileName,
  getActiveProfile,
  getProfile,

  // XP & Level
  addXP,
  getXPToday,
  getXPTotal,
  getLevel,

  // Streak
  updateStreak,
  getStreak,
  useStreakShield,

  // Modules
  markModuleComplete,
  isModuleComplete,
  getModuleData,
  getCurrentDay,
  setCurrentDay,
  advanceDay,

  // Gallery
  saveDrawing,
  getGallery,
  deleteDrawing,

  // Speech
  recordSpeechSubmit,

  // Badges
  hasBadge,
  awardBadge,
  checkAndAwardBadges,

  // Settings
  getSetting,
  setSetting,

  // PIN
  validatePin,
  changePin,
  isPinLocked,

  // Stats
  recordAnswer,
  getAccuracyRate,
  getKnowledgeLedger,
  recordKnowledgeExposure,

  // Import/Export
  exportJSON,
  importJSON,
  getSyncMeta,
  getLocalUpdatedAt,
  setAccountSession,
  markSynced,
  resetProfile,
  resetLearningProgress,
  resetCurrentDayProgress,

  // Raw access (use sparingly)
  getState,
  commit,
};

export default State;
