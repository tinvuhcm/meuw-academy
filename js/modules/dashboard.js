/**
 * MEUW ACADEMY — dashboard.js
 * Main Dashboard Screen
 */

import { el, formatDateVI, formatToday, formatModuleDisplayTitle, getGreetingLine, getSubjectConfig } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
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
  
  const headerLeft = el('div', { class: 'header-left' });
  const logo = el('div', { class: 'logo-link cursor-pointer flex items-center gap-2' });
  logo.innerHTML = `<img src="assets/images/mascot_avatar.png" alt="Méo Logo" class="w-10 h-10 object-cover rounded-full border-2 border-méo-purple shadow-sm" /><span class="logo-text font-display font-bold text-xl text-méo-purple">Méo</span>`;
  logo.addEventListener('click', () => Router.navigate('/'));
  
  headerLeft.appendChild(logo);

  const headerRight = el('div', { class: 'header-right flex items-center gap-4' });
  
  const streakBox = el('div', { class: 'streak-badge cursor-pointer', title: 'Chuỗi ngày học' });
  streakBox.innerHTML = `<span class="fire">🔥</span><span>${State.getStreak()}</span>`;
  streakBox.addEventListener('click', () => Router.navigate('/challenges'));
  
  // Quick Audio Toggles
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
  
  headerRight.appendChild(bgmBtn);
  headerRight.appendChild(sfxBtn);
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

  // 3. Daily Modules Overview (Duolingo Style Learning Path)
  const dayData = getCurriculumDay(currentDay);
  const scheduledModules = dayData
    ? getScheduledModulesForProfileDay(State.getActiveProfile(), currentDay, dayData.modules || []).allModules
    : [];
    
  const modulesSection = el('section', { class: 'mb-12 relative flex flex-col items-center py-8 bg-surface rounded-3xl shadow-sm border border-border' });
  modulesSection.appendChild(el('h2', { class: 'font-display text-2xl mb-8 text-center text-text' }, `Lộ trình Ngày ${currentDay}`));

  if (!dayData || scheduledModules.length === 0) {
    const emptyBox = el('div', { class: 'text-center text-text-muted p-8' });
    emptyBox.innerHTML = '<h3>Chưa có dữ liệu bài học cho ngày này!</h3>';
    modulesSection.appendChild(emptyBox);
  } else {
    const pathContainer = el('div', { class: 'relative w-full max-w-sm flex flex-col items-center gap-12 pb-8' });
    
    // Draw an SVG curve behind the nodes
    const svgLayer = el('div', { class: 'absolute top-0 bottom-0 left-0 right-0 pointer-events-none flex justify-center', style: 'z-index: 0;' });
    svgLayer.innerHTML = `
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <path d="M 50%,0 C 70%,20% 70%,40% 50%,50% C 30%,60% 30%,80% 50%,100%" fill="none" stroke="#E5E7EB" stroke-width="12" stroke-linecap="round" />
      </svg>
    `;
    // Note: A true responsive SVG path connecting exact node coordinates is complex, 
    // we'll use a thick straight line for simplicity and reliability across screen sizes.
    svgLayer.innerHTML = `
      <div class="w-4 h-full bg-border rounded-full absolute left-1/2 -translate-x-1/2"></div>
    `;
    pathContainer.appendChild(svgLayer);

    // Nodes
    let firstIncompleteFound = false;

    scheduledModules.forEach((m, idx) => {
      const isCompleted = State.isModuleComplete(m.id);
      const conf = getSubjectConfig(m.subject);
      
      const isCurrentNode = !isCompleted && !firstIncompleteFound;
      if (isCurrentNode) firstIncompleteFound = true;

      const nodeWrapper = el('div', { class: 'relative z-10 w-full flex items-center', style: `z-index: 10; justify-content: ${idx % 2 === 0 ? 'flex-start' : 'flex-end'}; padding: 0 10%;` });
      
      // Node Button
      const btnSize = isCurrentNode ? 'w-24 h-24' : 'w-20 h-20';
      const bounceClass = isCurrentNode ? 'animate-bounce' : '';
      const borderClass = isCurrentNode ? 'border-4 border-méo-purple shadow-xl' : (isCompleted ? 'border-4 border-correct shadow-md' : 'border-4 border-border shadow-sm bg-bg-2 opacity-80');
      const bgClass = isCompleted ? 'bg-correct' : (isCurrentNode ? 'bg-white' : 'bg-bg-2');
      
      const nodeBtn = el('button', { 
        class: `${btnSize} rounded-full flex flex-col items-center justify-center transition-all ${borderClass} ${bgClass} ${bounceClass}`,
        style: isCurrentNode ? 'transform-origin: bottom center;' : ''
      });
      
      const icon = el('span', { class: 'text-3xl' }, conf.emoji);
      nodeBtn.appendChild(icon);

      // Current node label
      if (isCurrentNode) {
        const label = el('div', { class: 'absolute -top-10 bg-white border-2 border-border px-3 py-1 rounded-xl text-sm font-bold shadow-md whitespace-nowrap text-méo-purple' });
        label.innerHTML = 'Học ngay! <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-border rotate-45"></div>';
        nodeBtn.appendChild(label);
      } else if (isCompleted) {
        const check = el('div', { class: 'absolute -top-2 -right-2 bg-correct text-white w-8 h-8 rounded-full flex-center font-bold shadow-sm' }, '✓');
        nodeBtn.appendChild(check);
      }

      nodeBtn.addEventListener('click', () => {
        Audio.click();
        Router.navigate(`/lesson/${currentDay}/${m.id}`);
      });

      // Module Title
      const titleWrapper = el('div', { class: 'absolute w-32 text-center', style: `top: 100%; mt-2` });
      titleWrapper.innerHTML = `<span class="text-xs font-bold ${isCompleted ? 'text-correct line-through' : 'text-text-muted'}">${formatModuleDisplayTitle(m, false)}</span>`;
      
      const innerWrap = el('div', { class: 'relative flex-center flex-col' });
      innerWrap.appendChild(nodeBtn);
      innerWrap.appendChild(titleWrapper);

      nodeWrapper.appendChild(innerWrap);
      pathContainer.appendChild(nodeWrapper);
    });

    modulesSection.appendChild(pathContainer);
    
    // Day Completion State
    if (!firstIncompleteFound && scheduledModules.length > 0) {
      const doneBox = el('div', { class: 'mt-8 text-center bg-correct-bg border-2 border-correct rounded-2xl p-6 w-full max-w-sm z-10 relative' });
      doneBox.innerHTML = `
        <div class="text-4xl mb-2">🎉</div>
        <h3 class="font-display text-xl text-correct-dk mb-1">Xuất sắc!</h3>
        <p class="text-sm font-bold text-correct">Bé đã hoàn thành ngày hôm nay.</p>
      `;
      modulesSection.appendChild(doneBox);
    }
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
  section.appendChild(el('p', { class: 'text-sm text-text-muted mb-4' }, 'Timeline gọn để xem nhanh hôm nay đang ở đâu và sắp tới học gì.'));

  const strip = el('div', { class: 'roadmap-strip flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory' });
  const startDay = Math.max(1, currentDay - 2);
  const endDay = Math.min(State.getMaxLearningDays(), currentDay + 8);

  for (let day = startDay; day <= endDay; day++) {
    const dayData = getCurriculumDay(day);
    if (!dayData) continue;
    strip.appendChild(createRoadmapCard(day, dayData, currentDay));
  }

  section.appendChild(strip);
  return section;
}

function createRoadmapCard(dayNumber, dayData, currentDay) {
  const progress = State.getDayProgress(dayNumber);
  const studyDate = State.getStudyDateForDayNumber(dayNumber);
  const plan = State.getStudyPlanForDayNumber(dayNumber);
  const isToday = dayNumber === currentDay;
  const isPast = dayNumber < currentDay;
  const isFuture = dayNumber > currentDay;
  const statusLabel = isToday ? 'Hôm nay' : isPast ? (progress.isPassed ? 'Đã hoàn thành' : 'Cần ôn lại') : 'Sắp mở';
  const statusClass = isToday
    ? 'text-méo-purple bg-méo-purple-lt border-méo-purple'
    : isPast
      ? (progress.isPassed ? 'text-correct-dk bg-correct-bg border-correct' : 'text-warning bg-warning-bg border-warning')
      : 'text-text-muted bg-bg-2 border-border';

  const card = el('button', {
    class: `card min-w-[130px] md:min-w-[150px] text-left flex flex-col gap-3 snap-start transition-all ${
      isToday ? 'border-2 border-méo-purple shadow-md -translate-y-1' : 'hover:-translate-y-1'
    }`,
  });
  const titleRow = el('div', { class: 'flex-between gap-3 items-start' });
  titleRow.innerHTML = `
    <div>
      <div class="font-display text-xl">Ngày ${dayNumber}</div>
      <div class="text-xs text-text-muted">${formatDateVI(studyDate)} • ${plan.shortLabel}</div>
    </div>
    <span class="text-xs font-bold px-3 py-1 rounded-full border ${statusClass}">${statusLabel}</span>
  `;
  card.appendChild(titleRow);

  const progressBar = el('div', { class: 'w-full h-2 bg-bg-2 rounded-full overflow-hidden' });
  progressBar.innerHTML = `<div class="h-full rounded-full ${isFuture ? 'bg-border' : progress.isPassed ? 'bg-correct' : 'bg-méo-purple'}" style="width:${Math.max(8, Math.round(progress.completedModules / Math.max(progress.totalModules, 1) * 100))}%"></div>`;
  card.appendChild(progressBar);

  const summary = el('div', { class: 'text-xs text-text-muted flex flex-col gap-1' });
  summary.appendChild(el('div', {}, `${progress.completedModules}/${progress.totalModules} bài`));
  summary.appendChild(el('div', {}, isFuture ? 'Bấm để xem trước' : dayData.title || 'Lộ trình trong ngày'));
  card.appendChild(summary);

  const subjectRow = el('div', { class: 'flex flex-wrap gap-1' });
  const scheduledModules = getScheduledModulesForProfileDay(State.getActiveProfile(), dayNumber, dayData.modules || []).allModules;
  const subjectLabels = [...new Set(scheduledModules.slice(0, 4).map(module => getSubjectConfig(module.subject).emoji))];
  subjectLabels.forEach(label => {
    subjectRow.appendChild(el('span', { class: 'text-base' }, label));
  });
  if (scheduledModules.length > 4) {
    subjectRow.appendChild(el('span', { class: 'text-xs text-text-muted font-bold' }, `+${scheduledModules.length - 4}`));
  }
  card.appendChild(subjectRow);

  card.addEventListener('click', () => {
    Router.navigate(`/session/${dayNumber}/${plan.mode === 'merged' ? 'day' : 'am'}`);
  });

  return card;
}
