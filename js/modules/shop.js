import { el } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';

export function renderShop() {
  const container = el('div', { class: 'page-container p-6' });
  
  const header = el('div', { class: 'flex flex-col md:flex-row justify-between mb-8 gap-4' });
  
  const headerLeft = el('div', { class: 'flex-1' });
  const backBtn = el('button', { class: 'btn btn-outline mb-4' }, '← Quay lại');
  backBtn.addEventListener('click', () => Router.navigate('/'));
  const title = el('h1', { class: 'font-display text-3xl' }, 'Cửa Hàng Phụ Kiện');
  headerLeft.appendChild(backBtn);
  headerLeft.appendChild(title);
  
  const headerRight = el('div', { class: 'flex items-center gap-4 bg-warning-bg p-4 rounded-xl border border-warning shadow-sm' });
  headerRight.innerHTML = `
    <img src="assets/images/meo_happy_sticker_1780213430564.png" class="h-16 object-contain" />
    <div>
      <div class="text-sm font-bold text-text-muted">Điểm hiện có</div>
      <div class="font-bold text-2xl text-warning">⭐ ${State.getXPTotal()}</div>
    </div>
  `;
  
  header.appendChild(headerLeft);
  header.appendChild(headerRight);
  
  const content = el('div', { class: 'grid gap-6 md:grid-cols-3' });
  
  const items = [
    { id: 'acc_sunglasses', name: 'Kính râm cực ngầu', price: 3000, img: 'assets/mascot/accessories/accessory_sunglasses_1780213487126.png' },
    { id: 'acc_wand', name: 'Đũa phép thuật', price: 6000, img: 'assets/mascot/accessories/accessory_wand_1780213517410.png' },
    { id: 'acc_crown', name: 'Vương miện Vàng', price: 10000, img: 'assets/mascot/accessories/accessory_crown_1780213501375.png' }
  ];
  
  const profile = State.getActiveProfile();
  if (!profile.purchasedItems) profile.purchasedItems = [];
  
  items.forEach(item => {
    const card = el('div', { class: 'card text-center flex flex-col items-center shadow-sm' });
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="h-32 object-contain mb-4" />
      <h3 class="font-bold text-lg mb-2">${item.name}</h3>
    `;
    
    const isOwned = profile.purchasedItems.includes(item.id);
    const btn = el('button', { 
      class: `btn w-full mt-auto ${isOwned ? 'btn-outline text-correct' : 'btn-primary'}` 
    }, isOwned ? 'Đã sở hữu' : `Mua: ${item.price} ⭐`);
    
    if (!isOwned) {
      btn.addEventListener('click', () => {
        if (State.getXPTotal() >= item.price) {
          if (confirm(`Bạn muốn mua ${item.name} với giá ${item.price} điểm?`)) {
            // Deduct points
            profile.xpTotal -= item.price; // Manually deduct
            profile.purchasedItems.push(item.id);
            State.commit();
            Router.navigate('/shop'); // Refresh
          }
        } else {
          alert('Bạn chưa đủ điểm! Hãy làm bài tập thêm để kiếm điểm nhé.');
        }
      });
    } else {
      btn.addEventListener('click', () => {
        Router.navigate('/customizer');
      });
      btn.textContent = 'Trang bị ngay';
    }
    
    card.appendChild(btn);
    content.appendChild(card);
  });
  
  container.appendChild(header);
  container.appendChild(content);
  return container;
}
