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
  // Init Audio on first click
  Audio.init();

  // Handle Break Reminder
  const breakMins = State.getSetting('breakReminderMins') || 45;
  if (breakMins > 0) {
    setInterval(() => {
      // Only remind if actively playing (not idle for long)
      Audio.breakReminder();
      window.toast(`Em đã học ${breakMins} phút rồi. Đứng lên vươn vai nhé!`, 'info');
      if (document.querySelector('.mascot-container')) {
        Mascot.sayQuick('Nghỉ ngơi mắt một chút nhé! 👀', 4000);
      }
    }, breakMins * 60 * 1000);
  }

  // Remove loading screen and init router
  setTimeout(() => {
    Router.init();
  }, 500);
});
