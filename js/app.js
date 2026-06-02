/**
 * MEUW ACADEMY — app.js
 * Main Entry Point
 */

import State from './state.js';
import Router from './router.js';
import Audio from './audio.js';
import Mascot from './mascot.js';

// Module View imports
import { renderDashboard } from './modules/dashboard.js';
import { renderSession } from './modules/session.js';
import { renderLesson } from './modules/lesson.js';
import { renderProfile } from './modules/profile.js';
import { renderParent } from './modules/parent.js';
import { renderGallery } from './modules/gallery.js';
import { renderBadges } from './modules/badges.js';
import { renderShop } from './modules/shop.js';
import { renderChallenges } from './modules/challenges.js';
import { renderCustomizer } from './modules/mascot-customizer.js';
import { renderPractice } from './modules/practice.js';
import { renderColoringLibrary } from './modules/coloring.js';
import { initAccountAutoSync } from './modules/account-auto-sync.js';

// Toast System
let toastTimeout;
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ️'}</span> ${message}`;
  
  container.appendChild(toast);

  // Wait, apply entering transition via CSS
  setTimeout(() => {
    toast.classList.add('toast-exiting');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

window.toast = showToast; // expose globally for easy access

const MANDATORY_STUDY_MINUTES = 30;
const MANDATORY_BREAK_SECONDS = 5 * 60;
let activeStudySeconds = 0;
let breakSecondsRemaining = 0;
let studyTicker = null;
let breakOverlay = null;

function isStudyRoute() {
  const hash = window.location.hash || '#/';
  return hash.startsWith('#/lesson/') || hash === '#/practice' || hash.startsWith('#/practice?');
}

function ensureBreakOverlay() {
  if (breakOverlay) return breakOverlay;
  breakOverlay = document.createElement('div');
  breakOverlay.className = 'fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4';
  breakOverlay.innerHTML = `
    <div class="card max-w-lg w-full text-center p-8 border-4 border-warning">
      <div class="text-5xl mb-4">🧃</div>
      <h2 class="font-display text-3xl text-warning-dk mb-3">Đến giờ nghỉ 5 phút</h2>
      <p class="font-bold text-text mb-4">Méo đã học liên tục 30 phút rồi. Mình nghỉ mắt, đứng dậy đi lại và uống nước nhé.</p>
      <div data-break-countdown class="text-4xl font-display text-méo-purple mb-3">05:00</div>
      <div class="text-sm text-text-muted">Sau khi đếm ngược xong, app sẽ mở lại để học tiếp.</div>
    </div>
  `;
  return breakOverlay;
}

function updateBreakCountdown() {
  const el = breakOverlay?.querySelector('[data-break-countdown]');
  if (!el) return;
  const mins = String(Math.floor(breakSecondsRemaining / 60)).padStart(2, '0');
  const secs = String(breakSecondsRemaining % 60).padStart(2, '0');
  el.textContent = `${mins}:${secs}`;
}

function startMandatoryBreak() {
  breakSecondsRemaining = MANDATORY_BREAK_SECONDS;
  activeStudySeconds = 0;
  document.body.appendChild(ensureBreakOverlay());
  updateBreakCountdown();
  Audio.breakReminder();
  Mascot.sayQuick('Nghỉ 5 phút rồi mình học tiếp nhé!', 5000);
}

function endMandatoryBreak() {
  breakSecondsRemaining = 0;
  breakOverlay?.remove();
  window.toast('Nghỉ xong rồi. Mình vào học tiếp nhé!', 'success');
}

function initStudyBreakGuard() {
  if (studyTicker) return;
  studyTicker = window.setInterval(() => {
    if (breakSecondsRemaining > 0) {
      breakSecondsRemaining -= 1;
      updateBreakCountdown();
      if (breakSecondsRemaining <= 0) {
        endMandatoryBreak();
      }
      return;
    }

    if (!isStudyRoute()) {
      activeStudySeconds = 0;
      return;
    }

    if (document.visibilityState !== 'visible') return;

    activeStudySeconds += 1;
    if (activeStudySeconds >= MANDATORY_STUDY_MINUTES * 60) {
      startMandatoryBreak();
    }
  }, 1000);
}

// App Mount
const APP_ROOT = document.getElementById('app');

function mount(element) {
  APP_ROOT.innerHTML = '';
  APP_ROOT.appendChild(element);
  Mascot.register(); // find and attach mascot SVGs in the new DOM
}

// Router Registration
Router.on('/', () => {
  mount(renderDashboard());
});

Router.on('/session/:dayId/:sessionId', (params) => {
  mount(renderSession(params));
});

Router.on('/lesson/:dayId/:moduleId', (params) => {
  mount(renderLesson(params));
});

Router.on('/profile', () => {
  mount(renderProfile());
});

Router.on('/parent', () => {
  mount(renderParent());
});

Router.on('/gallery', () => {
  mount(renderGallery());
});

Router.on('/badges', () => {
  mount(renderBadges());
});

Router.on('/shop', () => {
  mount(renderShop());
});

Router.on('/challenges', () => {
  mount(renderChallenges());
});

Router.on('/customizer', () => {
  mount(renderCustomizer());
});

Router.on('/practice', () => {
  mount(renderPractice());
});

Router.on('/coloring', () => {
  mount(renderColoringLibrary());
});

// Route Guards (Global)
Router.beforeEach((path) => {
  // If no profile exists except default and it's not setup yet, might force profile creation
  return true;
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  State.syncDailyProgress();
  initAccountAutoSync();
  // Init Audio on first click
  Audio.init();
  initStudyBreakGuard();

  // Remove loading screen and init router
  setTimeout(() => {
    Router.init();
  }, 500);
});
