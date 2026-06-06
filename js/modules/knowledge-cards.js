import { el } from '../utils.js';
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

  // Demo cards with better images
  const demoCards = [
    { id: 'math-1', title: 'Bảng Cửu Chương 9', desc: 'Bí kíp học thuộc nhanh bằng 10 ngón tay!', type: 'Toán', emoji: '📐', color: 'bg-math-color', image: 'assets/images/card_001_math.png', rarity: 'Siêu cấp' }, 
    { id: 'sci-1', title: 'Vòng Đời Của Bướm', desc: 'Từ quả trứng nhỏ xíu nở ra chú sâu, nhộng và hóa thành bướm xinh đẹp.', type: 'Khoa học', emoji: '🦋', color: 'bg-sci-color', image: 'assets/images/card_002_sci.jpg', rarity: 'Cực hiếm' }, 
    { id: 'geo-1', title: 'Thủ đô Hà Nội', desc: 'Hồ Gươm và Tháp Rùa huyền thoại ngàn năm văn hiến.', type: 'Lịch sử - Địa lí', emoji: '🐢', color: 'bg-wrong', image: 'assets/images/card_003_geo.jpg', rarity: 'Phổ biến' }, 
  ];

  demoCards.forEach(card => {
    // Flashy blink blink card wrapper
    const cardEl = el('button', { class: 'text-left bg-white rounded-3xl overflow-hidden border-2 border-transparent shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-yellow-400 transition-all group flex flex-col relative focus:outline-none' });
    
    // Add the "blink blink" sweeping shine effect
    const shine = el('div', { class: 'absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-3xl' });
    shine.innerHTML = `<div class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] group-hover:animate-shine"></div>`;
    cardEl.appendChild(shine);
    
    // Rarity spark
    if (card.rarity === 'Cực hiếm') {
      const spark = el('div', { class: 'absolute top-0 right-0 w-16 h-16 overflow-hidden z-30' });
      spark.innerHTML = `<div class="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 text-yellow-900 font-bold text-[10px] uppercase py-1 shadow-md transform rotate-45 translate-x-4 translate-y-2 text-center w-24 animate-pulse">Siêu cấp</div>`;
      cardEl.appendChild(spark);
    }
    
    // Image area
    const imgWrapper = el('div', { class: 'relative aspect-[3/4] w-full bg-bg-2 overflow-hidden border-b-4 border-black/5 z-10' });
    if (card.image) {
      imgWrapper.innerHTML = `<img src="${card.image}" class="w-full h-full object-contain bg-black group-hover:scale-105 transition-transform duration-700" />`;
    } else {
      imgWrapper.innerHTML = `<div class="w-full h-full flex-center text-7xl ${card.color} text-white group-hover:scale-110 transition-transform duration-500">${card.emoji}</div>`;
    }
    
    // Type badge
    const badge = el('div', { class: `absolute top-3 left-3 ${card.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm bg-opacity-90 border border-white/20 z-10` }, card.type);
    imgWrapper.appendChild(badge);
    
    cardEl.appendChild(imgWrapper);
    
    // Info area
    const info = el('div', { class: 'p-5 flex flex-col flex-1 bg-gradient-to-b from-white to-yellow-50/50 z-10 relative' });
    
    // Add blink blink stars in background of info
    info.innerHTML = `
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-100/50 via-transparent to-transparent"></div>
      <h3 class="font-display text-xl mb-2 text-text group-hover:text-yellow-600 transition-colors drop-shadow-sm">${card.title}</h3>
      <p class="text-sm text-text-muted flex-1 line-clamp-2 relative z-10">${card.desc}</p>
    `;
    
    const viewHint = el('div', { class: 'mt-3 pt-3 border-t border-border flex items-center justify-between relative z-10' });
    viewHint.innerHTML = `
      <span class="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md shadow-sm border border-yellow-200">${card.rarity}</span>
      <span class="text-xs font-bold text-méo-purple animate-pulse">Mở xem ✨</span>
    `;
    info.appendChild(viewHint);

    cardEl.appendChild(info);

    // On Click: Open detailed beautiful modal
    cardEl.addEventListener('click', () => {
      Audio.play('sparkle');
      openCardDetailModal(card);
    });

    grid.appendChild(cardEl);
  });

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
