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
  const logo = el('div', { class: 'logo-link cursor-pointer flex items-center gap-2' });
  logo.innerHTML = `<img src="assets/images/mascot_avatar.png" alt="Méo Logo" class="w-10 h-10 object-cover rounded-full border-2 border-méo-purple shadow-sm" /><span class="logo-text font-display font-bold text-xl text-méo-purple">Méo</span>`;
  logo.addEventListener('click', () => Router.navigate('/'));
  
  headerLeft.appendChild(logo);

  const headerRight = el('div', { class: 'header-right flex items-center gap-4' });
  
  const streakBox = el('div', { class: 'streak-badge cursor-pointer', title: 'Chuỗi ngày học' });
  streakBox.innerHTML = `<span class="fire">🔥</span><span>${State.getStreak()}</span>`;
  streakBox.addEventListener('click', () => Router.navigate('/challenges'));
  
  const settingsWrapper = el('div', { class: 'relative' });
  const settingsBtn = el('button', { class: 'header-btn text-2xl bg-white border border-border shadow-sm rounded-full w-10 h-10 flex-center', title: 'Cài đặt' }, '⚙️');
  const dropdown = el('div', { class: 'absolute right-0 top-12 bg-white border border-border rounded-xl shadow-lg w-48 hidden flex-col overflow-hidden z-50' });
  
  const profileLink = el('button', { class: 'w-full text-left px-4 py-3 font-bold hover:bg-bg-2 border-b border-border text-méo-purple flex items-center gap-2' });
  profileLink.innerHTML = `<span class="text-xl">🧑</span> Hồ sơ của Méo`;
  profileLink.addEventListener('click', () => { dropdown.classList.add('hidden'); Router.navigate('/profile'); });
  
  const parentLink = el('button', { class: 'w-full text-left px-4 py-3 font-bold hover:bg-bg-2 text-warning flex items-center gap-2' });
  parentLink.innerHTML = `<span class="text-xl">👨‍👩‍👦</span> Phụ huynh`;
  parentLink.addEventListener('click', () => { dropdown.classList.add('hidden'); Router.navigate('/parent'); });
  
  dropdown.appendChild(profileLink);
  dropdown.appendChild(parentLink);
  
  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
    dropdown.classList.toggle('flex');
  });
  
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
    dropdown.classList.remove('flex');
  });

  settingsWrapper.appendChild(settingsBtn);
  settingsWrapper.appendChild(dropdown);
  
  headerRight.appendChild(streakBox);
  headerRight.appendChild(settingsWrapper);
  
  header.appendChild(headerLeft);
  header.appendChild(headerRight);
  
  // App Header must be inserted *outside* page-container, but for SPA simplicity
  // we'll append it before container in the main app layout. Here we just return it.
  
  // 2. Hero Section (Mascot + Greeting)
  const hero = el('section', { class: 'dashboard-hero flex flex-col md:flex-row items-center gap-6 bg-gradient-hero rounded-3xl p-6 md:p-10 shadow-sm mb-8 relative overflow-hidden' });
  
  const mascotArea = el('div', { class: 'hero-mascot-area w-48 h-48 md:w-64 md:h-64 relative shrink-0 z-10' });
  mascotArea.innerHTML = `
    <div class="mascot-container" data-mascot>
      <!-- SVG will be injected by Mascot.register() -->
    </div>
    <div class="speech-bubble" data-speech-bubble></div>
  `;
  
  const greetingArea = el('div', { class: 'hero-greeting-area flex-1 text-center md:text-left z-10' });
  const greetingText = el('h1', { class: 'hero-greeting font-display text-3xl md:text-4xl text-text mb-2' }, getGreetingLine());
  const dayText = el('p', { class: 'hero-day-info text-text-muted text-lg font-bold' }, `${formatToday()} • Ngày thứ ${State.getCurrentDay()}`);
  
  // XP Progress
  const levelData = State.getLevel();
  const xpToday = State.getXPToday();
  const xpTotal = State.getXPTotal();
  const xpTarget = 300; // daily target
  
  const levelDisplay = el('div', { class: 'mt-4 flex flex-col gap-2' });
  const levelHeader = el('div', { class: 'flex-between text-sm font-bold' });
  levelHeader.innerHTML = `<span class="text-méo-purple">${levelData.emoji} Cấp ${levelData.level}: ${levelData.title}</span><span class="text-text-muted">${xpTotal} ⭐</span>`;
  
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

  // Shop & Challenges
  const extraStrip = el('div', { class: 'grid gap-4 md:grid-cols-3 w-full mb-8' });
  
  const shopBtn = el('button', { class: 'btn btn-primary bg-gradient-brand text-white font-bold p-4 flex flex-col items-center justify-center gap-2' });
  shopBtn.innerHTML = `<img src="assets/images/meo_happy_sticker_1780213430564.png" class="h-12 object-contain" />🛒 Cửa hàng`;
  shopBtn.addEventListener('click', () => Router.navigate('/shop'));
  
  const chalBtn = el('button', { class: 'btn btn-primary bg-correct text-white font-bold p-4 flex flex-col items-center justify-center gap-2' });
  chalBtn.innerHTML = `<img src="assets/images/meo_celebrating_sticker_1780213464815.png" class="h-12 object-contain" />🎯 Thử thách`;
  chalBtn.addEventListener('click', () => Router.navigate('/challenges'));
  
  const custBtn = el('button', { class: 'btn btn-outline text-méo-purple border-méo-purple font-bold p-4 flex flex-col items-center justify-center gap-2 bg-white' });
  custBtn.innerHTML = `<img src="assets/images/mascot_avatar.png" class="h-12 object-contain" />🎩 Trang trí Méo`;
  custBtn.addEventListener('click', () => Router.navigate('/customizer'));

  extraStrip.appendChild(chalBtn);
  extraStrip.appendChild(shopBtn);
  extraStrip.appendChild(custBtn);
  
  // Practice & Coloring Strip
  const bottomGrid = el('div', { class: 'grid gap-4 md:grid-cols-2 w-full mb-8' });

  const practiceStrip = el('div', { class: 'relative overflow-hidden bg-méo-purple-lt rounded-2xl p-4 md:p-6 border border-méo-purple shadow-sm flex items-center justify-between' });
  practiceStrip.innerHTML = `
    <div class="flex-1">
      <h3 class="font-display text-2xl text-méo-purple mb-2">Phòng Ôn Tập</h3>
      <p class="text-text mb-4 text-sm">Luyện lại kiến thức hoặc thi Vô Hạn!</p>
      <button class="btn btn-primary font-bold px-6 shadow-md" id="db-practice-btn">Vào Luyện Tập</button>
    </div>
    <div class="w-24 h-24 hidden lg:block shrink-0">
      <img src="assets/images/meo_thinking_sticker_1780213451318.png" class="w-full h-full object-contain" />
    </div>
  `;

  const coloringStrip = el('div', { class: 'relative overflow-hidden bg-pink-50 rounded-2xl p-4 md:p-6 border border-pink-400 shadow-sm flex items-center justify-between' });
  coloringStrip.innerHTML = `
    <div class="flex-1">
      <h3 class="font-display text-2xl text-pink-500 mb-2">Xưởng Tô Màu</h3>
      <p class="text-text mb-4 text-sm">Tranh tô màu siêu đẹp để chơi và in ấn!</p>
      <button class="btn bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 shadow-md border-none" id="db-coloring-btn">Vào Tô Màu</button>
    </div>
    <div class="w-24 h-24 hidden lg:block shrink-0">
      <div class="text-6xl flex-center w-full h-full">🎨</div>
    </div>
  `;
  
  bottomGrid.appendChild(practiceStrip);
  bottomGrid.appendChild(coloringStrip);

  // Bind events
  setTimeout(() => {
    const pBtn = practiceStrip.querySelector('#db-practice-btn');
    if (pBtn) pBtn.addEventListener('click', () => Router.navigate('/practice'));
    
    const cBtn = coloringStrip.querySelector('#db-coloring-btn');
    if (cBtn) cBtn.addEventListener('click', () => Router.navigate('/coloring'));
    
    // Set mascot state to relaxed
    Mascot.setState('relaxed');
  }, 0);

  stripsSection.appendChild(galleryStrip);
  stripsSection.appendChild(badgeStrip);
  container.appendChild(stripsSection);
  container.appendChild(extraStrip);
  container.appendChild(bottomGrid);

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
    Router.navigate(`/session/${State.getCurrentDay()}/${sessionId}`);
  });

  card.appendChild(btn);
  return card;
}
