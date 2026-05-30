/**
 * MEUW ACADEMY — mascot.js
 * Meuw mascot animation controller
 * Listens for 'mascot' CustomEvent and manages state/speech bubbles
 */

import { randomPick, createNonRepeatPicker } from './utils.js';

// ============================================
// MASCOT STATE MACHINE
// ============================================

const VALID_STATES = [
  'idle', 'happy', 'excited', 'encouraging',
  'thinking', 'reading', 'drawing', 'sleeping', 'celebrating'
];

const EVENT_MAP = {
  'answer:correct':   { state: 'happy',       duration: 1500 },
  'answer:wrong':     { state: 'encouraging', duration: 1500 },
  'module:complete':  { state: 'celebrating', duration: 3000 },
  'module:start':     { state: 'thinking',    duration: 800  },
  'module:drawing':   { state: 'drawing',     duration: null },
  'module:reading':   { state: 'reading',     duration: null },
  'streak:break':     { state: 'sleeping',    duration: null },
  'badge:earned':     { state: 'celebrating', duration: 3000 },
  'level:up':         { state: 'celebrating', duration: 4000 },
  'quiz:perfect':     { state: 'excited',     duration: 3000 },
};

// Default dialogue for each event (module data can override)
const DEFAULT_DIALOGUES = {
  'answer:correct': [
    '🌟 Xuất sắc!',
    '🔥 Đỉnh quá!',
    '💪 Tuyệt vời!',
    '🎉 Meuw cũng không nghĩ ra đâu!',
    '✨ Hoàn hảo!',
    '🚀 Siêu giỏi!',
  ],
  'answer:wrong': [
    '🤔 Ủa? Thử lại nhé!',
    '💙 Không sao, sắp đúng rồi!',
    '🌈 Đọc lại đề một lần nữa nhé!',
    '💡 Nghĩ kỹ hơn nha!',
  ],
  'module:complete': [
    '🎉 Tuyệt vời! Module hoàn thành!',
    '🌟 Em giỏi quá! Meuw tự hào lắm!',
    '🚀 Xong rồi! Tiếp tục nào!',
  ],
  'badge:earned': [
    '🏆 Huy hiệu mới! Meuw vỗ tay cho em!',
    '🌟 Ghê quá! Em xứng đáng lắm!',
  ],
  'level:up': [
    '🎊 LÊN CẤP RỒI! Meuw xoay tròn đây!',
    '👑 Em ngày càng giỏi hơn! Cấp mới!',
  ],
};

class MascotController {
  constructor() {
    this.elements = []; // All mascot SVG elements on page
    this.speechBubbles = []; // All speech bubble elements
    this.currentState = 'idle';
    this._stateTimer = null;
    this._speechTimer = null;
    this._pickers = {};

    // Create non-repeating pickers for dialogue
    for (const [key, lines] of Object.entries(DEFAULT_DIALOGUES)) {
      this._pickers[key] = createNonRepeatPicker(lines);
    }

    // Listen for mascot events
    window.addEventListener('mascot', (e) => {
      const { event, message, customLines, duration } = e.detail || {};
      this.react(event, message, customLines, duration);
    });
  }

  // ============================================
  // REGISTRATION (find mascot elements)
  // ============================================

  /**
   * Register mascot elements on the current page
   * Call after each route render
   */
  register() {
    this.elements = [...document.querySelectorAll('[data-mascot]')];
    this.speechBubbles = [...document.querySelectorAll('[data-speech-bubble]')];
    this.setState('idle');
  }

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  /**
   * Set mascot state
   * @param {string} state - one of VALID_STATES
   * @param {number|null} duration - ms to hold, then return to idle (null = stay)
   */
  setState(state, duration = null) {
    if (!VALID_STATES.includes(state)) {
      console.warn('[Mascot] Invalid state:', state);
      return;
    }

    clearTimeout(this._stateTimer);
    this.currentState = state;

    // Apply class to all registered mascot elements
    this.elements.forEach(el => {
      // Remove all state classes
      VALID_STATES.forEach(s => el.classList.remove(`mascot-${s}`));
      el.classList.add(`mascot-${state}`);
    });

    // Auto-return to idle if duration set
    if (duration !== null) {
      this._stateTimer = setTimeout(() => {
        this.setState('idle');
      }, duration);
    }
  }

  /**
   * React to a game event
   * @param {string} event - event name from EVENT_MAP
   * @param {string|null} message - optional override message
   * @param {string[]|null} customLines - optional custom dialogue lines pool
   * @param {number|null} duration - optional override duration
   */
  react(event, message = null, customLines = null, duration = null) {
    const config = EVENT_MAP[event];
    if (!config) return;

    const stateDuration = duration ?? config.duration;
    this.setState(config.state, stateDuration);

    // Show dialogue
    if (message) {
      this.say(message, Math.min(stateDuration || 2000, 3000));
    } else if (customLines?.length) {
      this.say(randomPick(customLines), Math.min(stateDuration || 2000, 3000));
    } else if (this._pickers[event]) {
      this.say(this._pickers[event](), Math.min(stateDuration || 2000, 2500));
    }
  }

  // ============================================
  // SPEECH BUBBLES
  // ============================================

  /**
   * Show a speech bubble with a message
   * @param {string} text - text to display (can include emoji)
   * @param {number} duration - ms to show (0 = permanent until clearSpeech)
   */
  say(text, duration = 2500) {
    clearTimeout(this._speechTimer);

    this.speechBubbles.forEach(bubble => {
      bubble.textContent = text;
      bubble.style.display = 'block';
      bubble.classList.add('bubble-in');

      // Remove animation class after it plays
      setTimeout(() => bubble.classList.remove('bubble-in'), 400);
    });

    if (duration > 0) {
      this._speechTimer = setTimeout(() => this.clearSpeech(), duration);
    }
  }

  /**
   * Clear all speech bubbles
   */
  clearSpeech() {
    this.speechBubbles.forEach(bubble => {
      bubble.style.display = 'none';
      bubble.textContent = '';
    });
  }

  /**
   * Say a quick blurb and return to previous state
   */
  sayQuick(text, durationMs = 1500) {
    const prevState = this.currentState;
    this.say(text, durationMs);
    // Don't change mascot state for quick messages
  }

  // ============================================
  // CONVENIENCE METHODS
  // ============================================

  correct(customLines = null) {
    this.react('answer:correct', null, customLines);
  }

  wrong(customLines = null) {
    this.react('answer:wrong', null, customLines);
  }

  complete(message = null) {
    this.react('module:complete', message);
  }

  startLesson(introMessage = null) {
    this.setState('thinking', 800);
    if (introMessage) {
      setTimeout(() => this.say(introMessage, 3000), 900);
    }
  }

  startDrawing() {
    this.setState('drawing');
    setTimeout(() => this.say('Vẽ thật đẹp nhé! 🎨', 2000), 300);
  }

  startReading() {
    this.setState('reading');
    setTimeout(() => this.say('Đọc kỹ từng câu nhé! 📖', 2000), 300);
  }

  showSleeping(message = 'Nghỉ ngơi 10 phút nhé! ☕') {
    this.setState('sleeping');
    this.say(message, 0); // permanent until manual clear
  }

  celebrate(message = null) {
    this.react('module:complete', message);
  }

  // ============================================
  // PARTICLE EFFECTS (star bursts near mascot)
  // ============================================

  burstParticles() {
    const mascotEl = this.elements[0];
    if (!mascotEl) return;

    const rect = mascotEl.getBoundingClientRect();
    const particles = ['⭐', '✨', '🌟', '💫', '⚡'];

    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'reaction-particle';
      particle.textContent = randomPick(particles);
      particle.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 60) + 'px';
      particle.style.top = (rect.top + (Math.random() * rect.height / 2)) + 'px';
      particle.style.animationDelay = (Math.random() * 0.3) + 's';
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1200);
    }
  }
}

// ============================================
// SINGLETON EXPORT
// ============================================
const Mascot = new MascotController();
export { Mascot };
export default Mascot;

// ============================================
// HELPER: Dispatch mascot event from anywhere
// ============================================

/**
 * Trigger mascot reaction
 * @example triggerMascot('answer:correct', { customLines: ['Amazing!'] })
 */
export function triggerMascot(event, options = {}) {
  window.dispatchEvent(new CustomEvent('mascot', {
    detail: { event, ...options }
  }));
}
