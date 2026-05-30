/**
 * MEUW ACADEMY — badges.js
 * Badges Collection Screen
 */

import { el } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { Audio } from '../audio.js';

// Hardcoded full badge list for UI
const ALL_BADGES = [
  // Streak
  { id: 'day1',     name: 'Ngày Đầu Tiên',     emoji: '🌟', desc: 'Hoàn thành ngày học đầu tiên' },
  { id: 'streak3',  name: 'Bộ Ba Ngày',        emoji: '🔥', desc: 'Học 3 ngày liên tiếp' },
  { id: 'streak7',  name: '1 Tuần Không Nghỉ', emoji: '🏆', desc: 'Học 7 ngày liên tiếp' },
  { id: 'streak14', name: '2 Tuần Không Nghỉ', emoji: '💎', desc: 'Học 14 ngày liên tiếp' },
  { id: 'streak30', name: '1 Tháng Không Nghỉ',emoji: '👑', desc: 'Học 30 ngày liên tiếp' },
  // Achievement
  { id: 'math5',    name: 'Phù Thủy Toán',     emoji: '🔢', desc: 'Hoàn thành 5 bài Toán' },
  { id: 'speaker10',name: 'Speaker ⭐',         emoji: '🗣️', desc: 'Làm 10 bài luyện nói' },
  { id: 'artist5',  name: 'Họa Sĩ Nhí',        emoji: '🎨', desc: 'Lưu 5 bức tranh' },
  // Weekly
  { id: 'week1',    name: 'Chinh Phục Tuần 1', emoji: '🐾', desc: 'Vượt qua tuần 1: Châu Phi' },
  { id: 'week2',    name: 'Người Khám Phá Biển',emoji: '🐠', desc: 'Vượt qua tuần 2: Đại dương' },
  { id: 'week3',    name: 'Nhà Khoa Học Rừng', emoji: '🦋', desc: 'Vượt qua tuần 3: Côn trùng' },
  { id: 'month1',   name: 'Hoàn Thành Tháng 1',emoji: '📖', desc: 'Tốt nghiệp Tháng 1' },
  { id: 'week5',    name: 'Nhà Địa Chất Nhí',  emoji: '🌋', desc: 'Vượt qua tuần 5: Địa chất' },
  { id: 'week6',    name: 'Dự Báo Thời Tiết',  emoji: '⛈️', desc: 'Vượt qua tuần 6: Thời tiết' },
  { id: 'week7',    name: 'Bảo Vệ Nguồn Nước', emoji: '💧', desc: 'Vượt qua tuần 7: Nguồn nước' },
  { id: 'month2',   name: 'Hoàn Thành Tháng 2',emoji: '🌍', desc: 'Tốt nghiệp Tháng 2' },
  { id: 'week9',    name: 'Nhà Vật Lý Ánh Sáng',emoji: '🌈', desc: 'Vượt qua tuần 9: Ánh sáng' },
  { id: 'week10',   name: 'Kỹ Sư Nhí',         emoji: '⚙️', desc: 'Vượt qua tuần 10: Cơ khí' },
  { id: 'week11',   name: 'Nhà Phát Minh Điện',emoji: '⚡', desc: 'Vượt qua tuần 11: Điện' },
  { id: 'month3',   name: 'Bác Học Mùa Hè',    emoji: '🎓', desc: 'Hoàn thành toàn bộ khóa học!' },
  // Special
  { id: 'night_owl',name: 'Cú Đêm',           emoji: '🌙', desc: 'Học sau 8h tối' },
  { id: 'early_bird',name: 'Chim Sớm',        emoji: '☀️', desc: 'Học trước 7h sáng' },
];

export function renderBadges() {
  const container = el('div', { class: 'page-container badges-container' });

  // 1. Header
  const header = el('div', { class: 'flex-between mb-8' });
  const title = el('h1', { class: 'font-display text-3xl text-meuw-purple' }, 'Bộ sưu tập Huy hiệu 🏆');
  
  const backBtn = el('button', { class: 'btn btn-outline text-sm' }, '← Quay lại');
  backBtn.addEventListener('click', () => { Audio.click(); Router.back(); });
  
  header.appendChild(backBtn);
  header.appendChild(title);
  header.appendChild(el('div', { style: 'width: 80px' }));
  container.appendChild(header);

  // 2. Stats
  const earnedList = State.getActiveProfile().earnedBadges || [];
  
  const statsBox = el('div', { class: 'card mb-8 p-6 flex items-center justify-between bg-gradient-hero' });
  statsBox.innerHTML = `
    <div>
      <h2 class="font-display text-2xl">Đã thu thập</h2>
      <p class="text-text-muted font-bold">Hãy cố gắng mở khóa tất cả nhé!</p>
    </div>
    <div class="text-4xl font-display text-meuw-purple">
      ${earnedList.length} <span class="text-xl text-text-muted">/ ${ALL_BADGES.length}</span>
    </div>
  `;
  container.appendChild(statsBox);

  // 3. Grid
  const grid = el('div', { class: 'badge-grid grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6' });

  ALL_BADGES.forEach(b => {
    const isEarned = earnedList.includes(b.id);
    const card = el('div', { class: `card flex flex-col items-center text-center p-4 ${isEarned ? 'cursor-pointer card-hover' : 'opacity-60 bg-bg-2'}` });
    
    const iconWrap = el('div', { class: `w-20 h-20 rounded-full flex-center text-4xl mb-3 shadow-sm border-4 ${isEarned ? 'bg-warning-bg border-warning' : 'bg-surface border-border grayscale'}` });
    iconWrap.innerHTML = b.emoji;

    const name = el('div', { class: `font-bold text-sm leading-tight ${isEarned ? 'text-text' : 'text-text-muted'}` }, b.name);
    
    card.appendChild(iconWrap);
    card.appendChild(name);

    if (isEarned) {
      card.addEventListener('click', () => {
        Audio.click();
        showBadgeDetail(b);
      });
    }

    grid.appendChild(card);
  });

  container.appendChild(grid);

  return container;
}

function showBadgeDetail(b) {
  const overlay = el('div', { class: 'modal-overlay' });
  const modal = el('div', { class: 'modal-card text-center' });

  const closeBtn = el('div', { class: 'modal-close' }, '✕');
  closeBtn.addEventListener('click', () => { Audio.click(); overlay.remove(); });
  modal.appendChild(closeBtn);

  modal.innerHTML += `
    <div class="w-32 h-32 rounded-full mx-auto bg-warning-bg border-4 border-warning flex-center text-6xl shadow-brand mb-6 animate-pulse">
      ${b.emoji}
    </div>
    <h2 class="font-display text-3xl text-meuw-purple mb-2">${b.name}</h2>
    <p class="text-lg text-text-muted font-bold">${b.desc}</p>
  `;

  const okBtn = el('button', { class: 'btn btn-cta w-full mt-8' }, 'Tuyệt quá!');
  okBtn.addEventListener('click', () => { Audio.click(); overlay.remove(); });
  modal.appendChild(okBtn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
