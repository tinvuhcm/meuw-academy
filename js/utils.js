/**
 * MEUW ACADEMY — utils.js
 * Shared helper functions
 */

// ============================================
// RANDOM UTILITIES
// ============================================

/**
 * Pick a random item from an array
 */
export function randomPick(arr) {
  if (!arr?.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Pick a random item, avoiding the last picked (no consecutive repeats)
 * Maintains state via closure
 */
export function createNonRepeatPicker(arr) {
  let last = null;
  return function () {
    if (arr.length === 1) return arr[0];
    let pick;
    do {
      pick = randomPick(arr);
    } while (pick === last);
    last = pick;
    return pick;
  };
}

/**
 * Shuffle an array (Fisher-Yates in-place, returns new array)
 */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Random integer between min and max (inclusive)
 */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================
// DATE & TIME
// ============================================

const VI_DAYS = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const VI_MONTHS = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
                   'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'];

/**
 * Format a date as "Thứ Hai, 15 tháng 6"
 */
export function formatDateVI(date = new Date()) {
  const d = new Date(date);
  return `${VI_DAYS[d.getDay()]}, ${d.getDate()} ${VI_MONTHS[d.getMonth()]}`;
}

/**
 * Format today's date as "Thứ Hai, 15 tháng 6"
 */
export function formatToday() {
  return formatDateVI(new Date());
}

/**
 * Format milliseconds as "1 giờ 23 phút" or "45 phút"
 */
export function formatDuration(ms) {
  const totalSec = Math.round(ms / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  if (hours > 0) {
    return minutes > 0 ? `${hours} giờ ${minutes} phút` : `${hours} giờ`;
  }
  if (minutes > 0) {
    return secs > 0 ? `${minutes} phút ${secs} giây` : `${minutes} phút`;
  }
  return `${secs} giây`;
}

/**
 * Format a time as "14:35"
 */
export function formatTime(date = new Date()) {
  const d = new Date(date);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function localDateString(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get today's date string "YYYY-MM-DD"
 */
export function todayString() {
  return localDateString(new Date());
}

/**
 * Check if a date string is today
 */
export function isToday(dateString) {
  return dateString === todayString();
}

// ============================================
// NUMBER FORMATTING
// ============================================

/**
 * Format a number with dots: 1400000 → "1.400.000"
 */
export function formatNumber(n) {
  return n.toLocaleString('vi-VN');
}

/**
 * Format XP: 1234 → "1.234 XP"
 */
export function formatXP(xp) {
  return `${formatNumber(xp)} ⭐`;
}

/**
 * Clamp a value between min and max
 */
export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

/**
 * Calculate percentage, return 0-100 integer
 */
export function percent(value, total) {
  if (!total) return 0;
  return Math.round(clamp((value / total) * 100, 0, 100));
}

/**
 * Round to N decimal places
 */
export function round(n, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Capitalize first letter
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str, maxLen = 50) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + '…';
}

/**
 * Count words in a string
 */
export function wordCount(str) {
  if (!str?.trim()) return 0;
  return str.trim().split(/\s+/).length;
}

/**
 * Normalize text for comparison (lowercase, trim, remove accents)
 */
export function normalizeText(str) {
  if (!str) return '';
  return str.trim().toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// ============================================
// DOM UTILITIES
// ============================================

/**
 * Query selector shorthand
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Query selector all shorthand
 */
export function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

/**
 * Create an element with attributes and optional children
 * @example el('div', { class: 'foo', id: 'bar' }, 'Hello')
 */
export function el(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);

  for (const [key, val] of Object.entries(attrs)) {
    if (key === 'class') {
      element.className = val;
    } else if (key === 'style' && typeof val === 'object') {
      Object.assign(element.style, val);
    } else if (key.startsWith('on') && typeof val === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), val);
    } else if (val !== null && val !== undefined && val !== false) {
      element.setAttribute(key, val);
    }
  }

  for (const child of children) {
    if (child === null || child === undefined) continue;
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      element.appendChild(child);
    } else if (Array.isArray(child)) {
      child.forEach(c => {
        if (c instanceof Node) element.appendChild(c);
      });
    }
  }

  return element;
}

/**
 * Empty a DOM node
 */
export function empty(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/**
 * Set innerHTML safely (only call with trusted strings, never user input)
 */
export function setHTML(node, html) {
  node.innerHTML = html;
}

/**
 * Animate an element with a CSS class, then remove it
 */
export function animateClass(el, className, durationMs = 1000) {
  el.classList.add(className);
  return new Promise(resolve => {
    setTimeout(() => {
      el.classList.remove(className);
      resolve();
    }, durationMs);
  });
}

/**
 * Wait for milliseconds (async sleep)
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce a function
 */
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle a function
 */
export function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// ============================================
// SUBJECT UTILITIES
// ============================================

const SUBJECT_CONFIG = {
  'math':   { label: 'Toán',      icon: '🔢', color: 'var(--math-color)',  colorLt: 'var(--math-color-lt)',  emoji: '🔢' },
  'mathx':  { label: 'Toán+',     icon: '🧮', color: 'var(--math-color)',  colorLt: 'var(--math-color-lt)',  emoji: '🧮' },
  'eng':    { label: 'English',   icon: '🇬🇧', color: 'var(--eng-color)',   colorLt: 'var(--eng-color-lt)',   emoji: '🇬🇧' },
  'engs':   { label: 'Speaking',  icon: '🎤', color: 'var(--eng-color)',   colorLt: 'var(--eng-color-lt)',   emoji: '🎤' },
  'sci':    { label: 'Khoa học',  icon: '🔬', color: 'var(--sci-color)',   colorLt: 'var(--sci-color-lt)',   emoji: '🔬' },
  'read':   { label: 'Đọc hiểu', icon: '📖', color: 'var(--read-color)',  colorLt: 'var(--read-color-lt)',  emoji: '📖' },
  'draw':   { label: 'Vẽ',        icon: '🎨', color: 'var(--draw-color)',  colorLt: 'var(--draw-color-lt)',  emoji: '🎨' },
  'quiz':   { label: 'Quiz',      icon: '⚡', color: 'var(--quiz-color)',  colorLt: 'var(--quiz-color-lt)',  emoji: '⚡' },
  'game':   { label: 'Game',      icon: '🎮', color: 'var(--meo-purple)', colorLt: 'var(--meo-purple-lt)', emoji: '🎮' },
  'create': { label: 'Sáng tạo', icon: '✨', color: 'var(--meo-pink)',   colorLt: 'var(--meo-pink-lt)',   emoji: '✨' },
  'fest':   { label: 'Lễ hội',   icon: '🎉', color: 'var(--meo-purple)', colorLt: 'var(--meo-purple-lt)', emoji: '🎉' },
};

/**
 * Get subject config from module ID like "d1_m1-math" → "math"
 */
export function getSubjectFromModuleId(moduleId) {
  const parts = moduleId?.split('-') || [];
  const subjectKey = parts[parts.length - 1]?.toLowerCase();
  return SUBJECT_CONFIG[subjectKey] || SUBJECT_CONFIG['quiz'];
}

/**
 * Get subject config directly
 */
export function getSubjectConfig(subject) {
  return SUBJECT_CONFIG[subject] || SUBJECT_CONFIG['quiz'];
}

// ============================================
// ANSWER VALIDATION
// ============================================

/**
 * Validate a numeric answer with optional tolerance
 */
export function validateNumericAnswer(userInput, correctAnswer, tolerance = 0) {
  const userNum = parseFloat(String(userInput).replace(',', '.'));
  if (isNaN(userNum)) return false;
  return Math.abs(userNum - correctAnswer) <= tolerance;
}

/**
 * Validate a text answer (trimmed, case-insensitive)
 */
export function validateTextAnswer(userInput, correctAnswer, strict = false) {
  if (strict) {
    return userInput?.trim() === correctAnswer?.trim();
  }
  return normalizeText(userInput) === normalizeText(correctAnswer);
}

// ============================================
// DEEP UTILITIES
// ============================================

/**
 * Deep clone an object (JSON-safe)
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Deep merge objects (b into a)
 */
export function deepMerge(a, b) {
  const result = { ...a };
  for (const key of Object.keys(b)) {
    if (b[key] && typeof b[key] === 'object' && !Array.isArray(b[key])) {
      result[key] = deepMerge(a[key] || {}, b[key]);
    } else {
      result[key] = b[key];
    }
  }
  return result;
}

// ============================================
// EMOJI SCORE RATING
// ============================================

/**
 * Get emoji rating for a score
 */
export function scoreEmoji(correct, total) {
  const pct = (correct / total) * 100;
  if (pct === 100) return '🌟';
  if (pct >= 75) return '😊';
  if (pct >= 50) return '😐';
  return '💪';
}

/**
 * Get score message for mini quiz
 */
export function scoreMessage(correct, total) {
  const pct = (correct / total) * 100;
  if (pct === 100) return 'Hoàn hảo! Em là thiên tài! 🌟';
  if (pct >= 75)   return 'Tuyệt vời! Gần hoàn hảo rồi! 🔥';
  if (pct >= 50)   return 'Không tệ! Cố lên em nhé! 😊';
  return 'Ôn lại nhé! Ngày mai sẽ tốt hơn! 💪';
}

// ============================================
// GREETING ROTATION
// Cycles through varied greetings so it doesn't get boring
// ============================================
const GREETINGS = [
  'Chào Méo', 'Chào em', 'Chào Méo', 'Chào Minh Méo',
  'Méo ơi!',  'Ê Méo!',  'Chào cô bé',
];
let _greetingIndex = -1;

/**
 * Get a rotating greeting — never the same twice in a row
 */
export function getGreeting() {
  let next;
  do { next = Math.floor(Math.random() * GREETINGS.length); }
  while (next === _greetingIndex && GREETINGS.length > 1);
  _greetingIndex = next;
  return GREETINGS[next];
}

/**
 * Full greeting line with emoji: "Chào Méo! 🌟"
 */
export function getGreetingLine() {
  const emojis = ['🌟', '✨', '🐱', '🎉', '💫', '🚀'];
  return `${getGreeting()}! ${randomPick(emojis)}`;
}

// ============================================
// CANVAS / IMAGE UTILITIES
// ============================================

/**
 * Compress a canvas to JPEG data URL
 */
export function canvasToJPEG(canvas, quality = 0.7) {
  return canvas.toDataURL('image/jpeg', quality);
}

/**
 * Get image data URL dimensions
 */
export function getImageDimensions(dataURL) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.src = dataURL;
  });
}
