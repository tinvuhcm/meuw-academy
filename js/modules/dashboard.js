/**
 * MEUW ACADEMY — dashboard.js
 * Main Dashboard Screen
 */

import { el, formatDateVI, formatToday, formatModuleDisplayTitle, getGreetingLine, getSubjectConfig } from '../utils.js';
import { getCurriculumDay, getCurriculumDaySkeleton } from '../data/curriculum-loader.js';
import State from '../state.js';
import Router from '../router.js';
import Audio from '../audio.js';
import { Mascot } from '../mascot.js';
import { getCurriculumDay } from '../data/curriculum-loader.js';
import { getScheduledModulesForProfileDay } from '../schedule-calendar.js';

export function renderDashboard() {
  State.syncDailyProgress();
  const currentDay = State.getCurrentDay();
  const currentPlan = State.getStudyPlanForDayNumber(currentDay);
  const container = el('div', { class: 'page-container dashboard-container' });

  // 1. App Header
  const header = el('header', { class: 'app-header' });
  const activeProfile = State.getActiveProfile();
  const kidName = activeProfile?.name || 'Méo';
  const kidColor = activeProfile?.avatarColor || '#7C3AED'; // favourite colour → header accent

  // Left: avatar + kid name → tap goes to kid profile
  const headerLeft = el('div', { class: 'header-left' });
  const kidBtn = el('button', {
    class: 'logo-link cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity',
    title: `Hồ sơ của ${kidName}`,
  });
  kidBtn.innerHTML = `
    <img src="assets/images/mascot_avatar.png" alt="${kidName}"
      class="w-10 h-10 object-cover rounded-full border-2 shadow-sm"
      style="border-color: ${kidColor}" />
    <span class="logo-text font-display font-bold text-xl" style="color: ${kidColor}">${kidName}</span>
  `;
  kidBtn.addEventListener('click', () => { Audio.click(); Router.navigate('/profile'); });
  headerLeft.appendChild(kidBtn);

  // Right: BGM, SFX, streak, parent (gear)
  const headerRight = el('div', { class: 'header-right flex items-center gap-4' });

  const streakBox = el('div', { class: 'streak-badge cursor-pointer', title: 'Chuỗi ngày học' });
  streakBox.innerHTML = `<span class="fire">🔥</span><span>${State.getStreak()}</span>`;
  streakBox.addEventListener('click', () => Router.navigate('/challenges'));

  const bgmBtn = el('button', { class: 'header-btn text-2xl bg-white border border-border shadow-sm rounded-full w-10 h-10 flex-center', title: 'Nhạc Nền' });
  bgmBtn.innerHTML = State.getSetting('bgmOn') !== false ? '🎵' : '🔇';
  bgmBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isBgmOn = State.getSetting('bgmOn') !== false;
    State.setSetting('bgmOn', !isBgmOn);
    bgmBtn.innerHTML = !isBgmOn ? '🎵' : '🔇';
    Audio.updateBGM();
    Audio.click();
  });

  const sfxBtn = el('button', { class: 'header-btn text-2xl bg-white border border-border shadow-sm rounded-full w-10 h-10 flex-center', title: 'Hiệu Ứng' });
  sfxBtn.innerHTML = State.getSetting('soundOn') !== false ? '🔔' : '🔕';
  sfxBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isSfxOn = State.getSetting('soundOn') !== false;
    State.setSetting('soundOn', !isSfxOn);
    sfxBtn.innerHTML = !isSfxOn ? '🔔' : '🔕';
    Audio.click();
  });

  // Gear → parent panel directly (no dropdown)
  const parentBtn = el('button', {
    class: 'header-btn text-2xl bg-white border border-border shadow-sm rounded-full w-10 h-10 flex-center',
    title: 'Phụ huynh',
  }, '⚙️');
  parentBtn.addEventListener('click', () => { Audio.click(); Router.navigate('/parent'); });

  const switchProfileBtn = el('button', {
    class: 'header-btn text-xl bg-white border border-border shadow-sm rounded-full w-10 h-10 flex-center',
    title: 'Đổi người học',
  }, '👥');
  switchProfileBtn.addEventListener('click', () => { Audio.click(); Router.navigate('/profiles'); });

  headerRight.appendChild(switchProfileBtn);
  headerRight.appendChild(bgmBtn);
  headerRight.appendChild(sfxBtn);
  headerRight.appendChild(streakBox);
  headerRight.appendChild(parentBtn);

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
  const greetingText = el('h1', { class: 'hero-greeting font-display text-3xl md:text-4xl text-text mb-2' }, getGreetingLine(kidName));
  const dayText = el('p', { class: 'hero-day-info text-text-muted text-lg font-bold' }, `${formatToday()} • Ngày thứ ${currentDay} • ${currentPlan.shortLabel}`);
  
  // XP Progress
  const levelData = State.getLevel();
  const xpToday = State.getXPToday();
  const xpTotal = State.getXPTotal();
  const xpTarget = 300; // daily target
  
  const levelDisplay = el('div', { class: 'mt-4 flex flex-col gap-2' });
  const levelHeader = el('div', { class: 'flex-between text-sm font-bold' });
  levelHeader.innerHTML = `<span class="text-méo-purple">${levelData.emoji} Cấp ${levelData.level}: ${levelData.title}</span><span class="text-text-muted">${xpTotal} ⭐</span>`;
  
  const progressBg = el('div', { class: 'progress-bar-bg' });
  const pct = levelData.next === Infinity ? 100 : Math.min(100, (xpTotal / levelData.next) * 100);
  progressBg.innerHTML = `<div class="progress-bar-fill" style="width: ${pct}%"></div>`;
  
  levelDisplay.appendChild(levelHeader);
  levelDisplay.appendChild(progressBg);

  greetingArea.appendChild(greetingText);
  greetingArea.appendChild(dayText);
  greetingArea.appendChild(levelDisplay);
  
  hero.appendChild(mascotArea);
  hero.appendChild(greetingArea);
  container.appendChild(hero);

  // 3. Daily Modules Overview (Nhiệm vụ hôm nay)
  const dayData = getCurriculumDay(currentDay);
  const scheduledModules = dayData
    ? getScheduledModulesForProfileDay(State.getActiveProfile(), currentDay, dayData.modules || []).allModules
    : [];
  const modulesSection = el('section', { class: 'mb-8' });
  modulesSection.appendChild(el('h2', { class: 'font-display text-2xl mb-4' }, 'Nhiệm vụ hôm nay'));

  if (!dayData || scheduledModules.length === 0) {
    const emptyBox = el('div', { class: 'text-center text-text-muted p-8 border-2 border-dashed border-border rounded-2xl' });
    emptyBox.innerHTML = '<h3>Chưa có dữ liệu bài học cho ngày này!</h3><p class="text-sm mt-2">Vui lòng quay lại sau.</p>';
    modulesSection.appendChild(emptyBox);
  } else {
    // Session cards
    const amModules = scheduledModules.filter(m => m.session === 'am');
    const pmModules = scheduledModules.filter(m => m.session === 'pm');

    const sessionGrid = el('div', { class: 'grid gap-4 md:grid-cols-2' });
    
    if (amModules.length > 0) {
      sessionGrid.appendChild(createSessionCard('Buổi sáng', '☀️', amModules, 'am', currentDay));
    }
    if (pmModules.length > 0) {
      sessionGrid.appendChild(createSessionCard('Buổi chiều', '🌙', pmModules, 'pm', currentDay));
    }

    modulesSection.appendChild(sessionGrid);
  }
  container.appendChild(modulesSection);

  const roadmapSection = createRoadmapSection(currentDay);
  container.appendChild(roadmapSection);

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
  
  // Library & Knowledge Cards Strip
  const learningResourcesGrid = el('div', { class: 'grid gap-4 md:grid-cols-2 w-full mb-8' });

  const libraryStrip = el('div', { class: 'relative overflow-hidden bg-blue-50 rounded-2xl p-4 md:p-6 border border-blue-400 shadow-sm flex items-center justify-between' });
  libraryStrip.innerHTML = `
    <div class="flex-1">
      <h3 class="font-display text-2xl text-blue-500 mb-2">Thư viện SGK</h3>
      <p class="text-text mb-4 text-sm">Đọc sách giáo khoa trực tuyến.</p>
      <button class="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 shadow-md border-0" id="db-library-btn">Vào thư viện</button>
    </div>
    <div class="w-24 h-24 hidden lg:block shrink-0 text-6xl flex-center">📚</div>
  `;

  const cardsStrip = el('div', { class: 'relative overflow-hidden bg-orange-50 rounded-2xl p-4 md:p-6 border border-orange-400 shadow-sm flex items-center justify-between' });
  cardsStrip.innerHTML = `
    <div class="flex-1 pr-2">
      <h3 class="font-display text-2xl text-orange-500 mb-2">Bộ Sưu Tập Thẻ</h3>
      <p class="text-text mb-4 text-sm">Xem lại các Thẻ Kiến Thức đã sưu tầm.</p>
      <button class="btn btn-primary bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 shadow-md border-0" id="db-cards-btn">Xem thẻ</button>
    </div>
    <div class="w-40 h-28 md:w-64 md:h-36 shrink-0 flex-center overflow-hidden rounded-xl shadow-md border-2 border-orange-200">
      <img src="assets/images/collection_cover.jpg" class="w-full h-full object-cover" alt="Card Collection" />
    </div>
  `;

  learningResourcesGrid.appendChild(libraryStrip);
  learningResourcesGrid.appendChild(cardsStrip);
  container.appendChild(learningResourcesGrid);
  
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

    const libBtn = libraryStrip.querySelector('#db-library-btn');
    if (libBtn) libBtn.addEventListener('click', () => Router.navigate('/library'));

    const cardsBtn = cardsStrip.querySelector('#db-cards-btn');
    if (cardsBtn) cardsBtn.addEventListener('click', () => Router.navigate('/knowledge-cards'));
    
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

function createSessionCard(title, emoji, modules, sessionId, dayNumber) {
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
    
    const text = el('span', { class: isCompleted ? 'text-text-soft line-through' : 'text-text' }, formatModuleDisplayTitle(m));
    
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
    Router.navigate(`/session/${dayNumber}/${sessionId}`);
  });

  card.appendChild(btn);
  return card;
}

function createRoadmapSection(currentDay) {
  const section = el('section', { class: 'mb-8' });
  section.appendChild(el('h2', { class: 'font-display text-2xl mb-2' }, 'Lộ trình học tập'));

  const strip = el('div', { class: 'roadmap-strip flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory' });
  // 1. Roadmap - Hiển thị 7 ngày gần nhất (bao gồm hôm nay)
  const roadmapContainer = document.getElementById('roadmap-container');
  roadmapContainer.innerHTML = '';
  
  for (let d = Math.max(1, currentDay - 6); d <= currentDay; d++) {
    const dayData = d === currentDay ? getCurriculumDay(d) : getCurriculumDaySkeleton(d);
    const card = createRoadmapCard(d, dayData, currentDay);
    strip.appendChild(card);
  }

  section.appendChild(strip);
  return section;
}

function createRoadmapCard(dayNumber, dayData, currentDay) {
  const allModules = dayData?.modules || [];
  const totalModules = allModules.length;
  let completedCount = 0;
  let passedCount = 0;
  allModules.forEach(m => {
    const data = State.getModuleData(m.id);
    if (!data) return;
    completedCount++;
    const score = Number(data.score ?? data.total ?? 1);
    const total = Number(data.total ?? 1);
    if (Number.isFinite(score) && Number.isFinite(total) && total > 0 && score / total >= 0.8) {
      passedCount++;
    }
  });
  const isPassed = totalModules > 0
    && completedCount / totalModules >= 0.8
    && passedCount / totalModules >= 0.8;

  const isToday = dayNumber === currentDay;
  const isPast = dayNumber < currentDay;
  const isFuture = dayNumber > currentDay;

  const statusClass = isToday
    ? 'border-méo-purple bg-méo-purple-lt text-méo-purple'
    : isPast
      ? (isPassed ? 'border-correct bg-correct-bg text-correct-dk' : 'border-warning bg-warning-bg text-warning')
      : 'border-border bg-bg-2 text-text-muted';

  const card = el('button', {
    class: `card min-w-[100px] md:min-w-[110px] text-center flex flex-col items-center gap-2 snap-start transition-all ${
      isToday ? 'border-2 shadow-md -translate-y-1' : 'border hover:-translate-y-1'
    } ${statusClass}`,
  });
  
  // Day title
  card.innerHTML = `<div class="font-display text-lg">Ngày ${dayNumber}</div>`;
  
  // Custom unique icon per day (31 variations)
  const DAY_ICONS = [
    '🐰', '🦊', '🐼', '🦁', '🐯', '🐸', '🐙', '🐢', '🦕', '🦄', 
    '🌟', '🌙', '🪐', '🚀', '🛸', '🌍', '🍄', '🍀', '🌻', '🌵', 
    '🍎', '🍉', '🍓', '🍕', '🍦', '🎈', '🎁', '💎', '🔮', '🎨', '🧸'
  ];
  const dayIcon = DAY_ICONS[(dayNumber - 1) % DAY_ICONS.length];
  
  const iconRow = el('div', { class: 'text-3xl my-1 hover:scale-110 transition-transform' }, dayIcon);
  card.appendChild(iconRow);

  // Progress bar + count label
  const pct = totalModules > 0 ? Math.round(completedCount / totalModules * 100) : 0;
  const barColor = isFuture ? 'bg-border' : isPassed ? 'bg-correct' : 'bg-current opacity-70';
  const progressWrap = el('div', { class: 'w-full flex flex-col items-center gap-0.5' });
  const progressBar = el('div', { class: 'w-full h-1.5 bg-white/50 rounded-full overflow-hidden' });
  progressBar.innerHTML = `<div class="h-full rounded-full ${barColor}" style="width:${Math.max(pct, completedCount > 0 ? 5 : 0)}%"></div>`;
  const countLabel = el('div', { class: 'text-[10px] font-bold opacity-70' }, `${completedCount}/${totalModules}`);
  progressWrap.appendChild(progressBar);
  progressWrap.appendChild(countLabel);
  card.appendChild(progressWrap);

  card.addEventListener('click', () => {
    Audio.click();
    showDayDetailModal(dayNumber, currentDay);
  });

  return card;
}

function showDayDetailModal(dayNumber, currentDay) {
  const overlay = el('div', { class: 'fixed inset-0 bg-black/50 z-50 flex-center p-4 animate-fade-in' });
  const modal = el('div', { class: 'bg-white rounded-3xl w-full max-w-sm max-h-[80vh] flex flex-col overflow-hidden shadow-xl animate-pop-in relative' });
  
  const header = el('div', { class: 'bg-méo-purple p-4 text-center' });
  header.innerHTML = `<h3 class="font-display text-2xl text-white">Lộ trình Ngày ${dayNumber}</h3>`;
  
  const closeBtn = el('button', { class: 'absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 text-white flex-center hover:bg-black/40 transition-colors' }, '✕');
  closeBtn.addEventListener('click', () => overlay.remove());
  header.appendChild(closeBtn);
  modal.appendChild(header);

  const content = el('div', { class: 'p-4 overflow-y-auto' });
  
  // Hiển thị skeleton text tạm trong lúc chờ tải dữ liệu đầy đủ
  content.innerHTML = `<div class="text-center p-4 opacity-50"><div class="spinner inline-block mb-2"></div><p>Đang chuẩn bị lộ trình...</p></div>`;
  modal.appendChild(content);
  overlay.appendChild(modal);
  
  // Close on outside click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  
  document.body.appendChild(overlay);

  // Defer the heavy curriculum generation so the modal animation doesn't stutter
  setTimeout(() => {
    const realDayData = getCurriculumDay(dayNumber);
    const scheduledModules = getScheduledModulesForProfileDay(State.getActiveProfile(), dayNumber, realDayData.modules || []).allModules;
    
    const amModules = scheduledModules.filter(m => m.session === 'am');
    const pmModules = scheduledModules.filter(m => m.session === 'pm');

    let html = '';
    
    if (amModules.length > 0) {
      html += `<div class="mb-2"><span class="font-bold text-sm bg-bg-2 px-3 py-1 rounded-full text-méo-purple">☀️ Sáng (${amModules.length} bài)</span></div><div class="mb-4">`;
      amModules.forEach(m => {
        const isCompleted = State.isModuleComplete(m.id);
        html += `<div class="text-sm ml-2 p-2 border-l-2 ${isCompleted ? 'border-correct text-correct line-through' : 'border-border text-text'} mb-2 bg-surface rounded-r-lg flex items-center gap-2"><span class="w-5 h-5 flex-center rounded-full text-xs ${isCompleted ? 'bg-correct text-white' : 'bg-bg-2 text-text-muted shrink-0'}">${isCompleted ? '✓' : '•'}</span> ${formatModuleDisplayTitle(m, false)}</div>`;
      });
      html += `</div>`;
    }
    
    if (pmModules.length > 0) {
      html += `<div class="mb-2"><span class="font-bold text-sm bg-bg-2 px-3 py-1 rounded-full text-méo-purple">🌙 Chiều (${pmModules.length} bài)</span></div><div>`;
      pmModules.forEach(m => {
        const isCompleted = State.isModuleComplete(m.id);
        html += `<div class="text-sm ml-2 p-2 border-l-2 ${isCompleted ? 'border-correct text-correct line-through' : 'border-border text-text'} mb-2 bg-surface rounded-r-lg flex items-center gap-2"><span class="w-5 h-5 flex-center rounded-full text-xs ${isCompleted ? 'bg-correct text-white' : 'bg-bg-2 text-text-muted shrink-0'}">${isCompleted ? '✓' : '•'}</span> ${formatModuleDisplayTitle(m, false)}</div>`;
      });
      html += `</div>`;
    }
    
    if (dayNumber === currentDay) {
      html += `<button class="btn btn-primary w-full mt-4" id="modal-learn-now">Học ngay! 🚀</button>`;
    } else if (dayNumber < currentDay) {
      html += `<button class="btn btn-outline text-méo-purple border-méo-purple w-full mt-4" id="modal-review">Ôn lại 🔄</button>`;
    }

    content.innerHTML = html;
    
    if (dayNumber === currentDay) {
      const learnNowBtn = content.querySelector('#modal-learn-now');
      if (learnNowBtn) {
        learnNowBtn.addEventListener('click', () => {
          Audio.click();
          overlay.remove();
          const firstUncompleted = scheduledModules.find(m => !State.isModuleComplete(m.id));
          if (firstUncompleted) {
            window.dispatchEvent(new CustomEvent('meuw:navigate', { detail: { page: 'lesson', data: { moduleId: firstUncompleted.id, day: currentDay } } }));
          } else {
            window.dispatchEvent(new CustomEvent('meuw:navigate', { detail: { page: 'session' } }));
          }
        });
      }
    } else if (dayNumber < currentDay) {
      const reviewBtn = content.querySelector('#modal-review');
      if (reviewBtn) {
        reviewBtn.addEventListener('click', () => {
          Audio.click();
          overlay.remove();
          window.dispatchEvent(new CustomEvent('meuw:navigate', { detail: { page: 'session', data: { day: dayNumber } } }));
        });
      }
    }
  }, 50);
}
