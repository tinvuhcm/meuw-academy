import { el } from '../utils.js';
import { generateKnowledgeCardHTML } from '../generators.js';
import State from '../state.js';
import Router from '../router.js';
import Audio from '../audio.js';

export function renderKnowledgeCards() {
  const container = el('div', { class: 'space-y-8 animate-fade-in pb-12' });

  // Header
  const topNav = el('div', { class: 'flex items-center gap-4 mb-4' });
  const backBtn = el('button', { class: 'btn btn-outline border-border bg-white rounded-full w-12 h-12 flex-center shadow-sm hover:bg-bg-2' }, '←');
  backBtn.addEventListener('click', () => { Router.navigate('/'); });
  topNav.appendChild(backBtn);
  container.appendChild(topNav);

  const header = el('header', { class: 'mb-8 flex justify-between items-center bg-gradient-to-r from-orange-400 to-red-400 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden' });
  header.innerHTML = `
    <div class="relative z-10">
      <h1 class="font-display text-3xl mb-2 flex items-center gap-3">Bộ Sưu Tập Thẻ 🏆</h1>
      <p class="opacity-90 text-sm font-bold">Thành tích kiến thức đáng tự hào của Méo!</p>
    </div>
    <div class="absolute right-0 bottom-0 opacity-20 text-8xl -mb-4 -mr-4 transform rotate-12">🌟</div>
  `;
  container.appendChild(header);

  // Grid
  const grid = el('div', { class: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' });

  const earnedCards = State.getActiveProfile().earnedCards || [];

  if (earnedCards.length === 0) {
    const emptyBox = el('div', { class: 'col-span-full text-center p-12 bg-white rounded-3xl border-2 border-dashed border-border' });
    emptyBox.innerHTML = `
      <div class="text-6xl mb-4 opacity-50">🎴</div>
      <h2 class="font-display text-2xl text-text-muted mb-2">Chưa có thẻ nào</h2>
      <p class="text-text-muted">Bé hãy học bài chăm chỉ để thu thập thẻ kiến thức nhé!</p>
      <button class="btn btn-primary mt-6" onclick="window.location.hash='/'">Đi học ngay</button>
    `;
    grid.appendChild(emptyBox);
  } else {
    earnedCards.forEach(card => {
      // Flashy blink blink card wrapper
      const cardEl = el('button', { class: 'text-left bg-white rounded-3xl overflow-hidden border-2 border-transparent shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-yellow-400 transition-all group flex flex-col relative focus:outline-none' });
      
      cardEl.innerHTML = generateKnowledgeCardHTML(card);

    // On Click: Open detailed beautiful modal
    cardEl.addEventListener('click', () => {
      Audio.play('sparkle');
      openCardDetailModal(card);
    });

    grid.appendChild(cardEl);
    });
  }

  container.appendChild(grid);
  return container;
}

function openCardDetailModal(card) {
  const overlay = el('div', { class: 'fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in' });
  
  // Confetti effect inside overlay
  for (let i = 0; i < 30; i++) {
    const conf = el('div', { class: 'absolute w-3 h-3 rounded-full opacity-70 animate-bounce' });
    conf.style.backgroundColor = ['#F59E0B', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6'][Math.floor(Math.random()*5)];
    conf.style.left = `${Math.random() * 100}%`;
    conf.style.top = `${-10 + Math.random() * -20}%`;
    conf.style.animationDuration = `${1 + Math.random() * 2}s`;
    conf.style.animationDelay = `${Math.random() * 0.5}s`;
    overlay.appendChild(conf);
  }

  const modal = el('div', { class: 'bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-pop-in relative transform transition-transform border-4 border-white' });
  
  // Close button
  const closeBtn = el('button', { class: 'absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 text-white flex-center hover:bg-black/60 transition-colors backdrop-blur-md' }, '✕');
  closeBtn.addEventListener('click', () => overlay.remove());
  modal.appendChild(closeBtn);

  // Big Image
  const imgWrapper = el('div', { class: 'relative h-96 w-full bg-black' });
  if (card.image) {
    imgWrapper.innerHTML = `<img src="${card.image}" class="w-full h-full object-contain" />`;
  } else {
    imgWrapper.innerHTML = `<div class="w-full h-full flex-center text-8xl ${card.color} text-white">${card.emoji}</div>`;
  }
  
  // Gradient overlay for text readability
  imgWrapper.innerHTML += `<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>`;
  
  const headerContent = el('div', { class: 'absolute bottom-4 left-4 right-4 text-white' });
  headerContent.innerHTML = `
    <div class="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-2 border border-white/30 uppercase tracking-wide shadow-sm">${card.type}</div>
    <h2 class="font-display text-3xl leading-tight shadow-black drop-shadow-md">${card.title}</h2>
  `;
  imgWrapper.appendChild(headerContent);
  modal.appendChild(imgWrapper);

  // Description body
  const body = el('div', { class: 'p-6 bg-gradient-to-b from-white to-orange-50/30' });
  body.innerHTML = `
    <p class="text-text leading-relaxed text-lg mb-6">${card.desc}</p>
    
    <div class="bg-orange-100 border border-orange-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
      <div class="text-2xl mt-0.5">💡</div>
      <div>
        <h4 class="font-bold text-orange-800 text-sm mb-1">Góc hiểu biết</h4>
        <p class="text-sm text-orange-900">Bé đã trả lời xuất sắc câu hỏi liên quan để nhận được tấm thẻ đặc biệt này!</p>
      </div>
    </div>
  `;

  // Share button
  const shareBtn = el('button', { class: 'btn btn-primary w-full py-4 text-lg font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex justify-center items-center gap-2 transform hover:scale-[1.02] transition-transform' });
  shareBtn.innerHTML = `<span>📤</span> <span>Khoe thành tích ngay!</span>`;
  shareBtn.addEventListener('click', async () => {
    Audio.play('click');
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Thẻ Kiến Thức: ${card.title}`,
          text: `Méo vừa mở khóa thẻ kiến thức "${card.title}" siêu đỉnh! Cùng xem thành tích học tập này nhé! 🌟`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      window.toast('Tính năng chia sẻ đang tạm khóa trên thiết bị này.', 'warning');
    }
  });
  body.appendChild(shareBtn);

  modal.appendChild(body);
  overlay.appendChild(modal);

  // Close on outside click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}
