/**
 * MEUW ACADEMY — profile.js
 * Kid Settings Dashboard
 */

import { el, animateClass, formatMinutes } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { Audio } from '../audio.js';

export function renderProfile() {
  const container = el('div', { class: 'page-container flex flex-col items-center min-h-[80vh] p-4 md:p-8' });

  const title = el('h1', { class: 'font-display text-4xl text-méo-purple mb-8 text-center' }, 'Cài đặt Hồ Sơ');
  container.appendChild(title);

  const profile = State.getActiveProfile();
  
  // Two column grid for desktop
  const grid = el('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl' });

  // Left Column: Customization
  const leftCol = el('div', { class: 'flex flex-col gap-6' });
  
  // 1. Profile Customization Card
  const customCard = el('div', { class: 'card p-6 flex flex-col items-center' });
  const avatar = el('div', { class: 'w-24 h-24 rounded-full flex-center text-4xl font-display text-white mb-4 shadow-lg transition-colors' });
  avatar.style.backgroundColor = profile.avatarColor || '#EC4899';
  avatar.textContent = (profile.name || 'Bé').charAt(0).toUpperCase();
  
  const nameInput = el('input', { 
    class: 'input-field text-center font-bold text-xl mb-4', 
    value: profile.name,
    placeholder: 'Tên của bé'
  });

  const colorGroup = el('div', { class: 'input-group w-full' });
  colorGroup.innerHTML = '<label class="input-label text-center block mb-2">Màu yêu thích</label>';
  const colors = ['#EC4899', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#06B6D4'];
  let selectedColor = profile.avatarColor || colors[0];
  
  const palette = el('div', { class: 'flex justify-center gap-3' });
  const colorBtns = [];
  colors.forEach(c => {
    const btn = el('button', { class: 'w-10 h-10 rounded-full cursor-pointer transition-transform' });
    btn.style.backgroundColor = c;
    if (c === selectedColor) btn.style.border = '3px solid #1F2937';
    
    btn.addEventListener('click', () => {
      Audio.click();
      selectedColor = c;
      avatar.style.backgroundColor = c;
      colorBtns.forEach(b => b.style.border = 'none');
      btn.style.border = '3px solid #1F2937';
    });
    
    colorBtns.push(btn);
    palette.appendChild(btn);
  });
  
  colorGroup.appendChild(palette);
  
  const saveBtn = el('button', { class: 'btn btn-primary w-full mt-6' }, 'Lưu thông tin');
  saveBtn.addEventListener('click', () => {
    Audio.click();
    const newName = nameInput.value.trim();
    if (newName) {
      State.updateActiveProfile({ name: newName, avatarColor: selectedColor });
      window.toast('Đã cập nhật hồ sơ!', 'success');
      avatar.textContent = newName.charAt(0).toUpperCase();
    } else {
      animateClass(nameInput, 'shake', 400);
    }
  });

  customCard.appendChild(avatar);
  customCard.appendChild(nameInput);
  customCard.appendChild(colorGroup);
  customCard.appendChild(saveBtn);
  leftCol.appendChild(customCard);

  // 2. Audio Settings Card
  const audioCard = el('div', { class: 'card p-6' });
  const audioTitle = el('h3', { class: 'font-display text-xl mb-4 text-text' }, 'Âm thanh');
  
  const bgmToggle = createToggleRow('Nhạc nền (BGM)', State.getSetting('bgmOn') !== false, (val) => {
    State.setSetting('bgmOn', val);
    Audio.updateBGM();
    Audio.click();
  });
  
  const sfxToggle = createToggleRow('Hiệu ứng âm thanh', State.getSetting('soundOn') !== false, (val) => {
    State.setSetting('soundOn', val);
    Audio.click();
  });

  audioCard.appendChild(audioTitle);
  audioCard.appendChild(bgmToggle);
  audioCard.appendChild(sfxToggle);
  leftCol.appendChild(audioCard);
  
  grid.appendChild(leftCol);

  // Right Column: Learning Dashboard
  const rightCol = el('div', { class: 'flex flex-col gap-6' });
  
  // Dashboard Today
  const todayStats = State.getTodayStats(); // We need to create this helper or compute here
  const todayCard = el('div', { class: 'card p-6 border-l-4 border-méo-pink' });
  todayCard.innerHTML = `
    <h3 class="font-display text-xl mb-4 text-méo-pink">Hôm nay</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="stat-box text-center p-4 bg-bg rounded-xl">
        <div class="text-3xl font-display text-text mb-1">${todayStats.modulesDone}</div>
        <div class="text-sm text-text-muted">Bài đã học</div>
      </div>
      <div class="stat-box text-center p-4 bg-bg rounded-xl">
        <div class="text-3xl font-display text-warning mb-1">${todayStats.xpEarned}</div>
        <div class="text-sm text-text-muted">XP nhận được</div>
      </div>
      <div class="stat-box text-center p-4 bg-bg rounded-xl">
        <div class="text-2xl font-display text-correct mb-1">${todayStats.accuracy}%</div>
        <div class="text-sm text-text-muted">Độ chính xác</div>
      </div>
      <div class="stat-box text-center p-4 bg-bg rounded-xl">
        <div class="text-2xl font-display text-eng-color mb-1">${formatMinutes(todayStats.timeSpent)}</div>
        <div class="text-sm text-text-muted">Thời gian học</div>
      </div>
    </div>
  `;
  rightCol.appendChild(todayCard);

  // Dashboard Lifetime
  const lifeStats = State.getLifetimeStats(); // We need to compute this
  const lifeCard = el('div', { class: 'card p-6 border-l-4 border-méo-purple' });
  lifeCard.innerHTML = `
    <h3 class="font-display text-xl mb-4 text-méo-purple">Sự nghiệp học tập</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="stat-box text-center p-4 bg-bg rounded-xl">
        <div class="text-3xl font-display text-text mb-1">${lifeStats.totalModules}</div>
        <div class="text-sm text-text-muted">Tổng bài học</div>
      </div>
      <div class="stat-box text-center p-4 bg-bg rounded-xl">
        <div class="text-3xl font-display text-warning mb-1">${profile.xpTotal}</div>
        <div class="text-sm text-text-muted">Tổng XP</div>
      </div>
      <div class="stat-box text-center p-4 bg-bg rounded-xl">
        <div class="text-2xl font-display text-correct mb-1">${lifeStats.accuracy}%</div>
        <div class="text-sm text-text-muted">Độ chính xác trung bình</div>
      </div>
      <div class="stat-box text-center p-4 bg-bg rounded-xl">
        <div class="text-2xl font-display text-eng-color mb-1">${formatMinutes(lifeStats.totalTime)}</div>
        <div class="text-sm text-text-muted">Tổng thời gian</div>
      </div>
    </div>
  `;
  rightCol.appendChild(lifeCard);
  
  grid.appendChild(rightCol);
  
  container.appendChild(grid);

  // Back Button
  const backBtn = el('button', { class: 'btn btn-outline mt-12' }, 'Quay lại Home');
  backBtn.addEventListener('click', () => { Audio.click(); Router.back(); });
  container.appendChild(backBtn);

  return container;
}

function createToggleRow(label, initialValue, onChange) {
  const row = el('div', { class: 'flex justify-between items-center py-3 border-b border-border last:border-0' });
  const span = el('span', { class: 'text-text font-bold' }, label);
  
  const toggle = el('button', { 
    class: `w-12 h-6 rounded-full relative transition-colors ${initialValue ? 'bg-méo-purple' : 'bg-gray-300'}` 
  });
  const knob = el('div', { 
    class: `w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${initialValue ? 'translate-x-6' : 'translate-x-0.5'}` 
  });
  toggle.appendChild(knob);

  let state = initialValue;
  toggle.addEventListener('click', () => {
    state = !state;
    toggle.className = `w-12 h-6 rounded-full relative transition-colors ${state ? 'bg-méo-purple' : 'bg-gray-300'}`;
    knob.className = `w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${state ? 'translate-x-6' : 'translate-x-0.5'}`;
    onChange(state);
  });

  row.appendChild(span);
  row.appendChild(toggle);
  return row;
}
