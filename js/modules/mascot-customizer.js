import { el } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';

export function renderCustomizer() {
  const container = el('div', { class: 'page-container p-6 flex flex-col items-center' });
  
  const header = el('div', { class: 'w-full flex-between mb-6' });
  const backBtn = el('button', { class: 'btn btn-outline' }, '← Quay lại');
  backBtn.addEventListener('click', () => Router.navigate('/'));
  
  const title = el('h1', { class: 'font-display text-3xl' }, 'Trang Trí Méo');
  
  header.appendChild(backBtn);
  header.appendChild(title);
  header.appendChild(el('div', { class: 'w-24' })); // spacer
  
  // Mascot Preview Area
  const preview = el('div', { class: 'relative w-64 h-64 bg-meo-purple-lt rounded-full flex-center mb-8 shadow-inner border-4 border-meo-purple' });
  
  const baseImg = el('img', { src: 'assets/images/mascot_avatar.png', class: 'w-48 h-48 object-contain absolute z-10' });
  preview.appendChild(baseImg);
  
  const profile = State.getActiveProfile();
  if (!profile.equippedAccessories) profile.equippedAccessories = [];
  
  // Equip items visual rendering
  const itemsMeta = {
    'acc_sunglasses': { src: 'assets/mascot/accessories/accessory_sunglasses_1780213487126.png', class: 'absolute z-20 w-32 top-[80px] left-[65px]' },
    'acc_crown': { src: 'assets/mascot/accessories/accessory_crown_1780213501375.png', class: 'absolute z-20 w-24 top-[10px] left-[85px]' },
    'acc_wand': { src: 'assets/mascot/accessories/accessory_wand_1780213517410.png', class: 'absolute z-20 w-24 top-[100px] left-[160px]' }
  };
  
  profile.equippedAccessories.forEach(id => {
    if (itemsMeta[id]) {
      const img = el('img', { src: itemsMeta[id].src, class: itemsMeta[id].class });
      preview.appendChild(img);
    }
  });
  
  // Controls
  const controls = el('div', { class: 'grid gap-4 md:grid-cols-3 w-full max-w-2xl' });
  
  const purchased = profile.purchasedItems || [];
  
  if (purchased.length === 0) {
    controls.innerHTML = `<div class="col-span-3 text-center text-text-muted italic">Bạn chưa mua phụ kiện nào. Hãy ghé Cửa hàng nhé!</div>`;
  } else {
    purchased.forEach(id => {
      const isEquipped = profile.equippedAccessories.includes(id);
      const card = el('div', { class: 'card text-center p-4 cursor-pointer hover:bg-bg-2 border-2 ' + (isEquipped ? 'border-correct bg-correct-bg' : 'border-border') });
      card.innerHTML = `
        <img src="${itemsMeta[id]?.src}" class="h-16 object-contain mx-auto mb-2" />
        <div class="font-bold text-sm">${isEquipped ? '✓ Đang dùng' : 'Sử dụng'}</div>
      `;
      card.addEventListener('click', () => {
        if (isEquipped) {
          profile.equippedAccessories = profile.equippedAccessories.filter(x => x !== id);
        } else {
          profile.equippedAccessories.push(id);
        }
        State.commit();
        Router.navigate('/customizer'); // re-render
      });
      controls.appendChild(card);
    });
  }
  
  container.appendChild(header);
  container.appendChild(preview);
  container.appendChild(controls);
  return container;
}
