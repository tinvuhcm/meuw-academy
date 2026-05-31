/**
 * MEUW ACADEMY — profile.js
 * Profile Selector & Creator
 */

import { el, animateClass } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { Audio } from '../audio.js';

export function renderProfile() {
  const container = el('div', { class: 'page-container flex flex-col items-center justify-center min-h-[80vh]' });

  const title = el('h1', { class: 'font-display text-4xl text-meuw-purple mb-8 text-center' }, 'Ai đang học vậy ta?');
  container.appendChild(title);

  const profiles = State.listProfiles();
  const activeId = State.getActiveProfile().id;

  const list = el('div', { class: 'profile-list grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl w-full' });

  // 1. Existing Profiles
  profiles.forEach(p => {
    const card = el('div', { class: 'card card-hover flex flex-col items-center p-6 cursor-pointer text-center' });
    if (p.id === activeId) {
      card.classList.add('border-meuw-purple', 'bg-meuw-purple-lt');
      card.style.borderWidth = '3px';
    }

    const avatar = el('div', { class: 'w-20 h-20 rounded-full flex-center text-3xl font-display text-white mb-4 shadow-md' });
    avatar.style.backgroundColor = p.avatarColor || '#EC4899';
    avatar.textContent = p.name.charAt(0).toUpperCase();

    const name = el('h3', { class: 'font-bold text-lg text-text' }, p.name);
    const level = el('div', { class: 'text-sm text-text-muted mt-1' }, `Cấp ${Math.floor(p.xpTotal / 500) + 1} • ${p.xpTotal} ⭐`);

    card.appendChild(avatar);
    card.appendChild(name);
    card.appendChild(level);

    card.addEventListener('click', () => {
      Audio.click();
      if (p.id !== activeId) {
        State.switchProfile(p.id);
      }
      Router.navigate('/');
    });

    list.appendChild(card);
  });

  // 2. Add New Profile Button
  if (profiles.length < 5) {
    const addCard = el('div', { class: 'card card-hover flex flex-col items-center p-6 cursor-pointer border-dashed border-2 bg-transparent justify-center min-h-[180px]' });
    
    const plusIcon = el('div', { class: 'w-16 h-16 rounded-full border-2 border-border flex-center text-3xl text-text-muted mb-4' }, '+');
    const text = el('h3', { class: 'font-bold text-text-muted' }, 'Thêm người học');

    addCard.appendChild(plusIcon);
    addCard.appendChild(text);

    addCard.addEventListener('click', () => {
      Audio.click();
      showCreateModal(container);
    });

    list.appendChild(addCard);
  }

  container.appendChild(list);

  // Back Button
  const backBtn = el('button', { class: 'btn btn-outline mt-12' }, 'Quay lại');
  backBtn.addEventListener('click', () => { Audio.click(); Router.back(); });
  container.appendChild(backBtn);

  return container;
}

function showCreateModal(parent) {
  const overlay = el('div', { class: 'modal-overlay' });
  const modal = el('div', { class: 'modal-card' });

  const closeBtn = el('div', { class: 'modal-close' }, '✕');
  closeBtn.addEventListener('click', () => {
    Audio.click();
    overlay.remove();
  });
  modal.appendChild(closeBtn);

  const title = el('h2', { class: 'font-display text-2xl mb-6 text-center' }, 'Tạo hồ sơ mới');
  modal.appendChild(title);

  // Name Input
  const nameGroup = el('div', { class: 'input-group' });
  nameGroup.innerHTML = '<label class="input-label">Tên người học</label>';
  const nameInput = el('input', { class: 'input-field', type: 'text', placeholder: 'Ví dụ: Meuw' });
  nameGroup.appendChild(nameInput);
  modal.appendChild(nameGroup);

  // Color Selector
  const colorGroup = el('div', { class: 'input-group mt-4' });
  colorGroup.innerHTML = '<label class="input-label">Màu yêu thích</label>';
  const colors = ['#EC4899', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#06B6D4'];
  let selectedColor = colors[0];
  
  const palette = el('div', { class: 'flex gap-3 mt-2' });
  const btns = [];
  colors.forEach(c => {
    const btn = el('button', { class: 'w-10 h-10 rounded-full cursor-pointer transition-transform' });
    btn.style.backgroundColor = c;
    if (c === selectedColor) btn.style.border = '3px solid #1F2937';
    
    btn.addEventListener('click', () => {
      Audio.click();
      selectedColor = c;
      btns.forEach(b => b.style.border = 'none');
      btn.style.border = '3px solid #1F2937';
    });
    
    btns.push(btn);
    palette.appendChild(btn);
  });
  colorGroup.appendChild(palette);
  modal.appendChild(colorGroup);

  // Error Message
  const errorMsg = el('div', { class: 'text-wrong text-sm font-bold mt-2 h-5 text-center' });
  modal.appendChild(errorMsg);

  // Submit Button
  const submitBtn = el('button', { class: 'btn btn-cta w-full mt-6' }, 'Tạo ngay');
  submitBtn.addEventListener('click', () => {
    Audio.click();
    const name = nameInput.value.trim();
    if (!name) {
      errorMsg.textContent = 'Vui lòng nhập tên!';
      animateClass(nameInput, 'shake', 400);
      return;
    }
    
    try {
      State.createProfile({ name, avatarColor: selectedColor });
      overlay.remove();
      // Reload profile page
      Router.replace('/profile');
    } catch (e) {
      errorMsg.textContent = e.message;
    }
  });
  modal.appendChild(submitBtn);

  overlay.appendChild(modal);
  parent.appendChild(overlay);

  // Focus input on load
  setTimeout(() => nameInput.focus(), 100);
}
