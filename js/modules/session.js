/**
 * MEUW ACADEMY — session.js
 * Session View (Lists modules for AM or PM)
 */

import { el, getSubjectConfig } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { getCurriculumDay } from '../data/curriculum-loader.js';
import { Audio } from '../audio.js';

export function renderSession(params) {
  const { dayId, sessionId } = params; // e.g. { dayId: '1', sessionId: 'am' }
  const dayData = getCurriculumDay(parseInt(dayId, 10));
  
  const container = el('div', { class: 'page-container session-container' });

  // 1. Header
  const header = el('header', { class: 'app-header' });
  const backBtn = el('button', { class: 'btn btn-outline text-sm py-1 px-3', title: 'Quay lại' }, '← Về trang chính');
  backBtn.addEventListener('click', () => { Audio.click(); Router.navigate('/'); });
  header.appendChild(backBtn);
  
  const titleText = sessionId === 'am' ? 'Buổi Sáng ☀️' : 'Buổi Chiều 🌙';
  const headerTitle = el('h1', { class: 'font-display text-xl' }, `Ngày ${dayId} • ${titleText}`);
  header.appendChild(headerTitle);
  header.appendChild(el('div', { style: 'width: 100px' })); // spacer
  
  // 2. Content
  if (!dayData) {
    container.appendChild(el('div', { class: 'mt-8 text-center text-text-muted font-bold' }, 'Lỗi: Không tìm thấy dữ liệu ngày học.'));
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(header);
    wrapper.appendChild(container);
    return wrapper;
  }

  const modules = dayData.modules.filter(m => m.session === sessionId);
  const listWrapper = el('div', { class: 'mt-6 max-w-2xl mx-auto flex flex-col gap-4' });

  let foundFirstIncomplete = false;

  modules.forEach((m, idx) => {
    const isCompleted = State.isModuleComplete(m.id);
    const conf = getSubjectConfig(m.subject);
    
    // Determine status
    let statusClass = '';
    let statusIcon = '';
    if (isCompleted) {
      statusClass = 'bg-surface border-border opacity-70';
      statusIcon = '<span class="text-correct font-bold">✓ Xong</span>';
    } else {
      // Unlocked, ready to learn
      statusClass = 'bg-surface border-méo-purple shadow-sm hover:shadow-md transition-all hover:-translate-y-1';
      statusIcon = '<span class="text-méo-purple font-bold">▶ Học ngay</span>';
      foundFirstIncomplete = true;
    }

    const card = el('div', { class: `card flex items-center justify-between p-4 cursor-pointer transition-all ${statusClass}` });
    
    const left = el('div', { class: 'flex items-center gap-4' });
    const iconBox = el('div', { class: 'w-12 h-12 rounded-xl flex-center text-2xl', style: `background-color: ${conf.colorLt}; color: ${conf.color}` });
    iconBox.innerHTML = conf.emoji;
    
    const info = el('div');
    info.appendChild(el('div', { class: 'text-xs font-bold uppercase tracking-wider', style: `color: ${conf.color}` }, conf.label));
    info.appendChild(el('h3', { class: 'font-display text-lg text-text' }, m.title));
    
    left.appendChild(iconBox);
    left.appendChild(info);
    
    const right = el('div', { class: 'flex flex-col items-end gap-1 text-sm font-bold' });
    right.innerHTML = statusIcon;
    right.appendChild(el('span', { class: 'text-warning' }, `~${m.xp || 50} ⭐`));

    card.appendChild(left);
    card.appendChild(right);

    card.addEventListener('click', () => {
      if (isCompleted) {
        // Can optionally allow replay, but for now we just play sound
        Audio.click();
      } else {
        Audio.click();
      }
      Router.navigate(`/lesson/${dayId}/${m.id}`);
    });

    listWrapper.appendChild(card);
  });

  // End screen if all completed
  if (foundFirstIncomplete === false) {
    const doneBox = el('div', { class: 'text-center mt-8 p-6 bg-correct-bg border-2 border-correct rounded-2xl' });
    doneBox.innerHTML = `
      <div class="text-4xl mb-4">🎉</div>
      <h2 class="font-display text-2xl text-correct-dk mb-2">Hoàn thành xuất sắc!</h2>
      <p class="font-bold text-correct">Em đã hoàn thành tất cả nhiệm vụ buổi này.</p>
    `;
    listWrapper.appendChild(doneBox);
  }

  container.appendChild(listWrapper);

  const wrapper = document.createDocumentFragment();
  wrapper.appendChild(header);
  wrapper.appendChild(container);
  return wrapper;
}
