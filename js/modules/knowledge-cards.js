import { el } from '../utils.js';
import Router from '../router.js';

export function renderKnowledgeCards() {
  const container = el('div', { class: 'space-y-8 animate-fade-in pb-12' });

  // Header
  const topNav = el('div', { class: 'flex items-center gap-4 mb-4' });
  const backBtn = el('button', { class: 'btn btn-outline border-border bg-white rounded-full w-12 h-12 flex-center shadow-sm hover:bg-bg-2' }, '←');
  backBtn.addEventListener('click', () => { Router.navigate('/'); });
  topNav.appendChild(backBtn);
  container.appendChild(topNav);

  const header = el('header', { class: 'mb-8 flex justify-between items-center bg-gradient-to-r from-orange-400 to-orange-500 p-6 rounded-3xl text-white shadow-md' });
  header.innerHTML = `
    <div>
      <h1 class="font-display text-3xl mb-2">Bộ Sưu Tập Thẻ 🎴</h1>
      <p class="opacity-90 text-sm">Những thẻ kiến thức thú vị bé đã mở khóa!</p>
    </div>
  `;
  container.appendChild(header);

  // Grid
  const grid = el('div', { class: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' });

  // Demo cards
  const demoCards = [
    { id: 'math-1', title: 'Bảng Cửu Chương 9', desc: 'Bí kíp học thuộc nhanh bằng 10 ngón tay!', type: 'Toán', emoji: '📐', color: 'bg-math-color', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&q=80' },
    { id: 'sci-1', title: 'Vòng Đời Của Bướm', desc: 'Từ trứng đến bướm xinh đẹp.', type: 'Khoa học', emoji: '🦋', color: 'bg-sci-color', image: 'https://images.unsplash.com/photo-1552084117-56a987666449?w=400&q=80' },
    { id: 'geo-1', title: 'Thủ đô Hà Nội', desc: 'Hồ Gươm và Tháp Rùa huyền thoại.', type: 'Lịch sử - Địa lí', emoji: '🐢', color: 'bg-wrong', image: 'https://images.unsplash.com/photo-1599708153386-62b22bb8fa8a?w=400&q=80' },
  ];

  demoCards.forEach(card => {
    const cardEl = el('div', { class: 'bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all group flex flex-col' });
    
    // Image area
    const imgWrapper = el('div', { class: 'relative h-48 w-full bg-bg-2 overflow-hidden' });
    if (card.image) {
      imgWrapper.innerHTML = `<img src="${card.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />`;
    } else {
      imgWrapper.innerHTML = `<div class="w-full h-full flex-center text-6xl ${card.color} text-white">${card.emoji}</div>`;
    }
    
    // Type badge
    const badge = el('div', { class: `absolute top-3 left-3 ${card.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md` }, card.type);
    imgWrapper.appendChild(badge);
    
    cardEl.appendChild(imgWrapper);
    
    // Info area
    const info = el('div', { class: 'p-4 flex flex-col flex-1' });
    info.innerHTML = `
      <h3 class="font-display text-lg mb-2">${card.title}</h3>
      <p class="text-sm text-text-muted flex-1">${card.desc}</p>
    `;
    
    const actions = el('div', { class: 'mt-4 pt-4 border-t border-border flex justify-end' });
    const shareBtn = el('button', { class: 'btn btn-outline border-border text-méo-purple text-sm px-4 py-2 w-full hover:bg-méo-purple-lt' }, '📤 Chia sẻ ngay');
    shareBtn.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: card.title,
            text: `Mình vừa mở khóa thẻ kiến thức "${card.title}" trên Méo Academy! Cùng xem nhé!`,
            url: window.location.href
          });
        } catch (err) {
          console.log('User cancelled share');
        }
      } else {
        window.toast('Trình duyệt của bạn không hỗ trợ chia sẻ trực tiếp.', 'error');
      }
    });
    actions.appendChild(shareBtn);
    info.appendChild(actions);

    cardEl.appendChild(info);
    grid.appendChild(cardEl);
  });

  container.appendChild(grid);
  return container;
}
