/**
 * MEUW ACADEMY — audio.js
 * Web Audio API sound engine (zero external files)
 */

import State from './state.js';

// Lazy init AudioContext (must be after user gesture on Chrome)
let _ctx = null;

function getCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (_ctx.state === 'suspended') {
    _ctx.resume();
  }
  return _ctx;
}

// ============================================
// LOW-LEVEL TONE GENERATORS
// ============================================

function playTone(freq, startTime, duration, gainValue = 0.3, type = 'sine') {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
  gain.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration + 0.05);
}

function chord(freqs, duration, gain = 0.25) {
  freqs.forEach(freq => playTone(freq, 0, duration, gain));
}

function sequence(notes, duration) {
  // notes: [{freq, start, len, gain}]
  notes.forEach(({ freq, start, len, gain }) => {
    playTone(freq, start, len || duration, gain || 0.25);
  });
}

// ============================================
// SOUND EFFECTS
// ============================================

const SFX = {
  /**
   * Correct answer: rising C-E-G chord, bright
   */
  correct() {
    sequence([
      { freq: 523, start: 0,   len: 0.18 },   // C5
      { freq: 659, start: 0.1, len: 0.18 },   // E5
      { freq: 784, start: 0.2, len: 0.25 },   // G5
    ]);
  },

  /**
   * Wrong answer: descending soft tones
   */
  wrong() {
    sequence([
      { freq: 400, start: 0,    len: 0.15, gain: 0.2 },
      { freq: 320, start: 0.15, len: 0.22, gain: 0.15 },
    ]);
  },

  /**
   * Module complete: 4-note ascending fanfare
   */
  complete() {
    sequence([
      { freq: 523,  start: 0,    len: 0.12 },
      { freq: 659,  start: 0.12, len: 0.12 },
      { freq: 784,  start: 0.24, len: 0.12 },
      { freq: 1047, start: 0.36, len: 0.35, gain: 0.3 },
    ]);
  },

  /**
   * UI click: short blip
   */
  click() {
    playTone(800, 0, 0.04, 0.12, 'square');
  },

  /**
   * Badge earned: triumphant fanfare
   */
  badge() {
    sequence([
      { freq: 784,  start: 0,    len: 0.1 },
      { freq: 1047, start: 0.1,  len: 0.1 },
      { freq: 1319, start: 0.2,  len: 0.1 },
      { freq: 1568, start: 0.3,  len: 0.4, gain: 0.3 },
    ]);
    // Harmony
    setTimeout(() => chord([523, 784, 1047], 0.4, 0.1), 300);
  },

  /**
   * Streak: warm encouraging chord
   */
  streak() {
    chord([659, 784, 1047], 0.3, 0.2);
  },

  /**
   * Confetti sparkle: high short blip
   */
  sparkle() {
    playTone(1200, 0, 0.06, 0.1, 'sine');
  },

  /**
   * Level up: big crescendo fanfare
   */
  levelUp() {
    sequence([
      { freq: 392,  start: 0,    len: 0.1 },
      { freq: 523,  start: 0.1,  len: 0.1 },
      { freq: 659,  start: 0.2,  len: 0.1 },
      { freq: 784,  start: 0.3,  len: 0.1 },
      { freq: 1047, start: 0.4,  len: 0.1 },
      { freq: 1319, start: 0.5,  len: 0.5, gain: 0.35 },
    ]);
    // Rich chord at the end
    setTimeout(() => chord([523, 784, 1047, 1319], 0.5, 0.15), 500);
  },

  /**
   * XP earned: soft rising note
   */
  xpGain() {
    playTone(880, 0, 0.1, 0.12);
    playTone(1046, 0.08, 0.12, 0.1);
  },

  /**
   * Break reminder: gentle chime
   */
  breakReminder() {
    chord([523, 659], 0.5, 0.15);
    setTimeout(() => chord([440, 554], 0.5, 0.1), 600);
  },

  /**
   * Graduation: big orchestral feel
   */
  graduation() {
    const fanfare = [
      { freq: 392, start: 0,    len: 0.15 },
      { freq: 523, start: 0.15, len: 0.15 },
      { freq: 659, start: 0.3,  len: 0.15 },
      { freq: 784, start: 0.45, len: 0.2  },
      { freq: 659, start: 0.65, len: 0.1  },
      { freq: 784, start: 0.75, len: 0.1  },
      { freq: 1047,start: 0.85, len: 0.6, gain: 0.35 },
    ];
    sequence(fanfare);
    setTimeout(() => chord([523, 784, 1047], 0.6, 0.2), 850);
  },
};

// ============================================
// PUBLIC API
// ============================================

/**
 * Check if sound is enabled in settings
 */
function isSoundOn() {
  try {
    return State.getSetting('soundOn') !== false;
  } catch {
    return true;
  }
}

/**
 * Play a sound if enabled
 */
function play(sfxName) {
  if (!isSoundOn()) return;
  try {
    if (SFX[sfxName]) SFX[sfxName]();
    else console.warn('[Audio] Unknown SFX:', sfxName);
  } catch (e) {
    console.warn('[Audio] Playback failed:', e);
  }
}

export const Audio = {
  play,
  correct:  () => play('correct'),
  wrong:    () => play('wrong'),
  complete: () => play('complete'),
  click:    () => play('click'),
  badge:    () => play('badge'),
  streak:   () => play('streak'),
  sparkle:  () => play('sparkle'),
  levelUp:  () => play('levelUp'),
  xpGain:   () => play('xpGain'),
  breakReminder: () => play('breakReminder'),
  graduation:    () => play('graduation'),

  // Initialize context on first user interaction
  init() {
    const events = ['click', 'touchstart', 'keydown'];
    const initOnce = () => {
      getCtx();
      events.forEach(e => document.removeEventListener(e, initOnce));
    };
    events.forEach(e => document.addEventListener(e, initOnce, { once: true }));
  }
};

export default Audio;
