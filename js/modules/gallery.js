/**
 * MEUW ACADEMY — gallery.js
 * Art Gallery Screen
 */

import { el } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { Audio } from '../audio.js';

export function renderGallery() {
  const container = el('div', { class: 'page-container gallery-container' });

  // 1. Header
  const header = el('div', { class: 'flex-between mb-8' });
  const title = el('h1', { class: 'font-display text-3xl text-meuw-purple' }, 'Phòng tranh của Meuw 🎨');
  
  const backBtn = el('button', { class: 'btn btn-outline text-sm' }, '← Quay lại');
  backBtn.addEventListener('click', () => { Audio.click(); Router.back(); });
  
  header.appendChild(backBtn);
  header.appendChild(title);
  header.appendChild(el('div', { style: 'width: 80px' })); // spacer
  container.appendChild(header);

  // 2. Gallery Grid
  const gallery = State.getGallery();
  
  if (gallery.length === 0) {
    const empty = el('div', { class: 'text-center py-20 text-text-muted font-bold' });
    empty.innerHTML = `
      <div class="text-6xl mb-4">🖼️</div>
      <p>Phòng tranh đang trống.<br/>Hãy tham gia các bài học Vẽ để có tác phẩm nhé!</p>
    `;
    container.appendChild(empty);
    return container;
  }

  const grid = el('div', { class: 'gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6' });

  gallery.forEach(item => {
    const card = el('div', { class: 'card p-2 card-hover cursor-pointer' });
    const imgWrap = el('div', { class: 'aspect-video rounded-lg overflow-hidden border border-border mb-2 relative bg-white flex-center' });
    const img = el('img', { src: item.src, class: 'w-full h-full object-contain' });
    imgWrap.appendChild(img);
    
    const info = el('div', { class: 'flex-between px-1' });
    info.innerHTML = `
      <div class="truncate text-sm font-bold text-text">${item.title}</div>
      <div class="text-xs text-text-muted whitespace-nowrap">Ngày ${item.day}</div>
    `;

    card.appendChild(imgWrap);
    card.appendChild(info);

    card.addEventListener('click', () => {
      Audio.click();
      showLightbox(item);
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);

  return container;
}

function showLightbox(item) {
  const overlay = el('div', { class: 'modal-overlay' });
  const modal = el('div', { class: 'bg-surface rounded-xl p-4 md:p-6 w-full max-w-3xl relative mx-4 shadow-2xl' });
  
  const closeBtn = el('div', { class: 'modal-close z-10' }, '✕');
  closeBtn.addEventListener('click', () => { Audio.click(); overlay.remove(); });
  modal.appendChild(closeBtn);

  const imgWrap = el('div', { class: 'bg-white rounded-lg border border-border flex-center overflow-hidden min-h-[300px]' });
  const img = el('img', { src: item.src, class: 'max-w-full max-h-[70vh] object-contain' });
  imgWrap.appendChild(img);

  const info = el('div', { class: 'flex-between mt-4' });
  info.innerHTML = `
    <div>
      <h3 class="font-display text-2xl">${item.title}</h3>
      <p class="text-text-muted font-bold">Vẽ vào Ngày ${item.day}</p>
    </div>
  `;

  // Actions
  const actions = el('div', { class: 'flex gap-2' });
  
  const dlBtn = el('button', { class: 'btn btn-primary text-sm' }, '💾 Tải về');
  dlBtn.addEventListener('click', () => {
    Audio.click();
    const a = document.createElement('a');
    a.href = item.src;
    a.download = `Meuw_Ngay${item.day}_${item.title.replace(/\s+/g, '_')}.jpg`;
    a.click();
  });

  const delBtn = el('button', { class: 'btn btn-outline text-wrong border-wrong text-sm' }, '🗑️ Xóa');
  delBtn.addEventListener('click', () => {
    Audio.click();
    if (confirm('Em có chắc muốn xóa tác phẩm này không?')) {
      State.deleteDrawing(item.id);
      overlay.remove();
      Router.replace('/gallery');
    }
  });

  actions.appendChild(dlBtn);
  actions.appendChild(delBtn);
  info.appendChild(actions);

  modal.appendChild(imgWrap);
  modal.appendChild(info);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
