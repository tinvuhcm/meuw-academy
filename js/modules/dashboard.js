/**
 * MEUW ACADEMY — dashboard.js
 * Main Dashboard Screen
 */

import { el, formatToday, getGreetingLine, getSubjectConfig } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { Mascot } from '../mascot.js';
import { getCurriculumDay } from '../data/curriculum-loader.js';

export function renderDashboard() {
  const container = el('div', { class: 'page-container dashboard-container' });

  // 1. App Header
  const header = el('header', { class: 'app-header' });
  
  const headerLeft = el('div', { class: 'header-left' });
  const logo = el('div', { class: 'logo-link' });
  logo.innerHTML = `<img src="assets/icons/icon.svg" alt="Meuw Logo" width="32" height="32" /><span class="logo-text">Meuw</span>`;
  logo.addEventListener('click', () => Router.navigate('/'));
  
  const profileBtn = el('button', { class: 'header-btn font-bold text-sm', title: 'Hồ sơ' }, State.getActiveProfile().name.charAt(0).toUpperCase());
  profileBtn.style.backgroundColor = State.getActiveProfile().avatarColor;
  profileBtn.style.color = '#FFF';
  profileBtn.addEventListener('click', () => Router.navigate('/profile'));
  
  headerLeft.appendChild(logo);
  headerLeft.appendChild(profileBtn);

  const headerRight = el('div', { class: 'header-right' });
  
  const streakBox = el('div', { class: 'streak-badge cursor-pointer', title: 'Chuỗi ngày học' });
  streakBox.innerHTML = `<span class="fire">🔥</span><span>${State.getStreak()}</span>`;
  streakBox.addEventListener('click', () => Router.navigate('/parent'));
  
  const parentBtn = el('button', { class: 'header-btn', title: 'Khu vực Phụ huynh' }, '⚙️');
  parentBtn.addEventListener('click', () => Router.navigate('/parent'));
  
  headerRight.appendChild(streakBox);
  headerRight.appendChild(parentBtn);
  
  header.appendChild(headerLeft);
  header.appendChild(headerRight);
  
  // App Header must be inserted *outside* page-container, but for SPA simplicity
  // we'll append it before container in the main app layout. Here we just return it.
  
  // 2. Hero Section (Mascot + Greeting)
  const hero = el('section', { class: 'dashboard-hero flex flex-col md:flex-row items-center gap-6 bg-gradient-hero rounded-3xl p-6 md:p-10 shadow-sm mb-8' });
  
  const mascotArea = el('div', { class: 'hero-mascot-area mascot-xl relative shrink-0' });
  mascotArea.innerHTML = `
    <div class="mascot-container" data-mascot>
      <!-- SVG will be injected by Mascot.register() -->
    </div>
    <div class="speech-bubble" data-speech-bubble></div>
  `;
  
  const greetingArea = el('div', { class: 'hero-greeting-area flex-1 text-center md:text-left' });
  const greetingText = el('h1', { class: 'hero-greeting font-display text-4xl text-text mb-2' }, getGreetingLine());
  const dayText = el('p', { class: 'hero-day-info text-text-muted text-lg font-bold' }, `${formatToday()} • Ngày thứ ${State.getCurrentDay()}`);
  
  // XP Progress
  const levelData = State.getLevel();
  const xpToday = State.getXPToday();
  const xpTotal = State.getXPTotal();
  const xpTarget = 300; // daily target
  
  const levelDisplay = el('div', { class: 'mt-4 flex flex-col gap-2' });
  const levelHeader = el('div', { class: 'flex-between text-sm font-bold' });
  levelHeader.innerHTML = `<span class="text-meuw-purple">${levelData.emoji} Cấp ${levelData.level}: ${levelData.title}</span><span class="text-text-muted">${xpTotal} XP</span>`;
  
  const progressBg = el('div', { class: 'progress-bar-bg' });
  const pct = Math.min(100, (xpTotal / levelData.next) * 100);
  progressBg.innerHTML = `<div class="progress-bar-fill" style="width: ${pct}%"></div>`;
  
  levelDisplay.appendChild(levelHeader);
  levelDisplay.appendChild(progressBg);

  greetingArea.appendChild(greetingText);
  greetingArea.appendChild(dayText);
  greetingArea.appendChild(levelDisplay);
  
  hero.appendChild(mascotArea);
  hero.appendChild(greetingArea);
  container.appendChild(hero);

  // 3. Daily Modules Overview
  const dayData = getCurriculumDay(State.getCurrentDay());
  const modulesSection = el('section', { class: 'mb-8' });
  modulesSection.appendChild(el('h2', { class: 'font-display text-2xl mb-4' }, 'Nhiệm vụ hôm nay'));

  if (!dayData) {
    const emptyBox = el('div', { class: 'card text-center text-text-muted p-8' });
    emptyBox.innerHTML = '<h3>Chưa có dữ liệu bài học cho ngày này!</h3>';
    modulesSection.appendChild(emptyBox);
  } else {
    // Split AM and PM
    const amModules = dayData.modules.filter(m => m.session === 'am');
    const pmModules = dayData.modules.filter(m => m.session === 'pm');

    const sessionGrid = el('div', { class: 'session-grid grid gap-4 md:grid-cols-2' });

    // AM Card
    const amCard = createSessionCard('Buổi Sáng', '☀️', amModules, 'am');
    sessionGrid.appendChild(amCard);

    // PM Card
    const pmCard = createSessionCard('Buổi Chiều', '🌙', pmModules, 'pm');
    sessionGrid.appendChild(pmCard);

    modulesSection.appendChild(sessionGrid);
  }
  container.appendChild(modulesSection);

  // 4. Badges & Gallery Strips
  const stripsSection = el('section', { class: 'bottom-strips grid gap-4 md:grid-cols-2 mb-8' });
  
  // Gallery Strip
  const galleryStrip = el('div', { class: 'card card-hover cursor-pointer' });
  galleryStrip.addEventListener('click', () => Router.navigate('/gallery'));
  const galleryTop = el('div', { class: 'flex-between mb-3' });
  galleryTop.innerHTML = `<h3 class="font-display text-xl">Phòng tranh 🎨</h3><span class="text-text-muted text-sm font-bold">Xem tất cả ›</span>`;
  galleryStrip.appendChild(galleryTop);
  
  const recentDrawings = State.getGallery().slice(0, 3);
  const galleryThumbList = el('div', { class: 'flex gap-2' });
  if (recentDrawings.length === 0) {
    galleryThumbList.innerHTML = `<div class="text-sm text-text-muted italic">Chưa có tranh nào.</div>`;
  } else {
    recentDrawings.forEach(d => {
      const img = el('img', { src: d.src, class: 'w-16 h-16 object-cover rounded-md border border-border' });
      galleryThumbList.appendChild(img);
    });
  }
  galleryStrip.appendChild(galleryThumbList);
  
  // Badge Strip
  const badgeStrip = el('div', { class: 'card card-hover cursor-pointer' });
  badgeStrip.addEventListener('click', () => Router.navigate('/badges'));
  const badgeTop = el('div', { class: 'flex-between mb-3' });
  badgeTop.innerHTML = `<h3 class="font-display text-xl">Huy hiệu 🏆</h3><span class="text-text-muted text-sm font-bold">Xem tất cả ›</span>`;
  badgeStrip.appendChild(badgeTop);
  
  const earnedBadges = State.getActiveProfile().earnedBadges || [];
  const badgeThumbList = el('div', { class: 'flex gap-2' });
  if (earnedBadges.length === 0) {
    badgeThumbList.innerHTML = `<div class="text-sm text-text-muted italic">Chưa có huy hiệu nào.</div>`;
  } else {
    const displayBadges = earnedBadges.slice(0, 4);
    // Real implementation would look up emojis from badge config
    displayBadges.forEach(() => {
      const b = el('div', { class: 'w-10 h-10 bg-warning-bg rounded-full flex-center text-xl shadow-sm border border-warning' }, '🌟');
      badgeThumbList.appendChild(b);
    });
  }
  badgeStrip.appendChild(badgeThumbList);

  stripsSection.appendChild(galleryStrip);
  stripsSection.appendChild(badgeStrip);
  container.appendChild(stripsSection);

  // Return a wrapper that includes header and content
  const wrapper = document.createDocumentFragment();
  wrapper.appendChild(header);
  wrapper.appendChild(container);
  return wrapper;
}

function createSessionCard(title, emoji, modules, sessionId) {
  const card = el('div', { class: 'card card-hover flex flex-col justify-between' });
  
  const top = el('div');
  const header = el('div', { class: 'flex-between mb-4 border-b-2 border-border pb-2' });
  header.innerHTML = `<h3 class="font-display text-xl">${emoji} ${title}</h3><span class="text-sm font-bold text-text-muted">${modules.length} bài</span>`;
  top.appendChild(header);

  // Calculate progress
  let completedCount = 0;
  
  const list = el('div', { class: 'flex flex-col gap-2 mb-4' });
  modules.forEach(m => {
    const isCompleted = State.isModuleComplete(m.id);
    if (isCompleted) completedCount++;
    
    const conf = getSubjectConfig(m.subject);
    const item = el('div', { class: 'flex items-center gap-2 text-sm font-bold' });
    
    const icon = el('span', { class: `w-6 h-6 rounded-full flex-center text-xs ${isCompleted ? 'bg-correct text-white' : 'bg-bg-2 text-text-muted'}` });
    icon.innerHTML = isCompleted ? '✓' : conf.emoji;
    
    const text = el('span', { class: isCompleted ? 'text-text-soft line-through' : 'text-text' }, m.title);
    
    item.appendChild(icon);
    item.appendChild(text);
    list.appendChild(item);
  });
  
  top.appendChild(list);
  card.appendChild(top);

  // Button
  const isAllDone = completedCount === modules.length;
  const btn = el('button', { 
    class: `btn w-full ${isAllDone ? 'btn-outline text-correct-dk border-correct' : 'btn-primary'}` 
  }, isAllDone ? 'Hoàn thành!' : (completedCount === 0 ? 'Bắt đầu' : 'Tiếp tục'));

  btn.addEventListener('click', () => {
    if (isAllDone) return; // Do nothing if done, or maybe view summary
    Router.navigate(`/session/${State.getCurrentDay()}/${sessionId}`);
  });

  card.appendChild(btn);
  return card;
}
