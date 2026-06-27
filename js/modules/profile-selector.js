import { el, animateClass } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { Audio } from '../audio.js';

export function renderProfileSelector() {
  const container = el('div', { class: 'page-container flex flex-col items-center justify-center min-h-[80vh] p-4' });
  const title = el('h1', { class: 'font-display text-4xl text-méo-purple mb-8 text-center' }, 'Ai đang học?');
  
  const profilesContainer = el('div', { class: 'flex flex-wrap justify-center gap-6 max-w-4xl' });
  
  const profiles = State.listProfiles();
  
  profiles.forEach(p => {
    const pCard = el('button', { class: 'group flex flex-col items-center transition-transform hover:scale-110 cursor-pointer' });
    
    const avatar = el('div', { class: 'w-24 h-24 rounded-full flex-center text-4xl font-display text-white mb-3 shadow-lg border-4 border-transparent group-hover:border-méo-purple' });
    avatar.style.backgroundColor = p.avatarColor || '#EC4899';
    avatar.textContent = (p.name || 'Bé').charAt(0).toUpperCase();
    
    const name = el('span', { class: 'font-bold text-lg text-text group-hover:text-méo-purple transition-colors' }, p.name);
    
    pCard.appendChild(avatar);
    pCard.appendChild(name);
    
    pCard.addEventListener('click', () => {
      Audio.click();
      State.switchProfile(p.id);
      Router.navigate('/');
    });
    
    profilesContainer.appendChild(pCard);
  });
  
  // Nút thêm hồ sơ (tối đa 5)
  if (profiles.length < 5) {
    const addCard = el('button', { class: 'group flex flex-col items-center transition-transform hover:scale-110 cursor-pointer' });
    const addIcon = el('div', { class: 'w-24 h-24 rounded-full flex-center text-4xl text-text-muted bg-gray-200 mb-3 shadow-sm border-4 border-dashed border-gray-300 group-hover:border-méo-purple group-hover:text-méo-purple transition-colors' });
    addIcon.textContent = '+';
    const addText = el('span', { class: 'font-bold text-lg text-text-muted group-hover:text-méo-purple transition-colors' }, 'Thêm bé');
    
    addCard.appendChild(addIcon);
    addCard.appendChild(addText);
    
    addCard.addEventListener('click', () => {
      Audio.click();
      const newName = prompt('Nhập tên của bé:');
      if (newName && newName.trim() !== '') {
        const colors = ['#EC4899', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#06B6D4'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        State.createProfile({ name: newName.trim(), avatarColor: randomColor });
        Router.navigate('/profiles'); // reload
      }
    });
    
    profilesContainer.appendChild(addCard);
  }
  
  container.appendChild(title);
  container.appendChild(profilesContainer);
  
  return container;
}
