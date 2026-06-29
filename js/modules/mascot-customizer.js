import { el } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { comboKeyFromEquipped, CUSTOMIZER_ITEMS_META, MASCOT_COMBO_ASSETS } from '../data/mascot-assets.js';
import { generateAvatarHTML } from '../generators.js';

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
  const preview = el('div', { class: 'relative w-64 h-64 bg-meo-purple-lt rounded-full overflow-hidden flex-center mb-8 shadow-inner border-4 border-meo-purple' });
  const avatarWrapper = el('div', { class: 'w-56 h-56' });
  
  const profile = State.getActiveProfile();
  if (!profile.equippedAccessories) profile.equippedAccessories = [];
  
  const itemsMeta = CUSTOMIZER_ITEMS_META;
  
  avatarWrapper.innerHTML = generateAvatarHTML('meo', profile.equippedAccessories, 'idle');
  preview.appendChild(avatarWrapper);

  const actionRow = el('div', { class: 'flex flex-wrap justify-center gap-3 mb-6' });
  const clearBtn = el('button', { class: 'btn btn-outline' }, 'Gỡ hết đồ đang đeo');
  clearBtn.disabled = profile.equippedAccessories.length === 0;
  clearBtn.addEventListener('click', () => {
    profile.equippedAccessories = [];
    State.commit();
    Router.navigate('/customizer');
  });
  actionRow.appendChild(clearBtn);
  
  // Controls
  const controls = el('div', { class: 'grid gap-4 md:grid-cols-3 w-full max-w-2xl' });
  
  const purchased = profile.purchasedItems || [];
  
  if (purchased.length === 0) {
    controls.innerHTML = `<div class="col-span-3 text-center text-text-muted italic">Bạn chưa mua phụ kiện nào. Hãy ghé Cửa hàng nhé!</div>`;
  } else {
    purchased.forEach(id => {
      const isEquipped = profile.equippedAccessories.includes(id);
      const card = el('div', { class: 'card text-center p-4 hover:bg-bg-2 border-2 ' + (isEquipped ? 'border-correct bg-correct-bg' : 'border-border') });
      card.innerHTML = `
        <img src="${itemsMeta[id]?.src}" class="h-16 object-contain mx-auto mb-2" />
        <div class="font-bold text-sm mb-3">${isEquipped ? '✓ Đang dùng' : 'Có trong tủ đồ'}</div>
      `;

      const btnRow = el('div', { class: 'flex gap-2 justify-center' });
      const equipBtn = el('button', { class: `btn ${isEquipped ? 'btn-secondary' : 'btn-cta'} text-sm` }, isEquipped ? 'Đang đeo' : 'Đeo món này');
      equipBtn.disabled = isEquipped;
      equipBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (!profile.equippedAccessories.includes(id)) {
          const itemSlot = itemsMeta[id]?.slot;
          // Bỏ món đồ cũ cùng slot
          if (itemSlot) {
            profile.equippedAccessories = profile.equippedAccessories.filter(
              existingId => itemsMeta[existingId]?.slot !== itemSlot
            );
          }
          profile.equippedAccessories.push(id);
          // Giới hạn tối đa 3 món đồ
          if (profile.equippedAccessories.length > 3) {
            profile.equippedAccessories.shift(); // Xóa món cũ nhất
          }
          State.commit();
          Router.navigate('/customizer');
        }
      });
      btnRow.appendChild(equipBtn);

      if (isEquipped) {
        const removeBtn = el('button', { class: 'btn btn-outline text-sm' }, 'Gỡ ra');
        removeBtn.addEventListener('click', event => {
          event.stopPropagation();
          profile.equippedAccessories = profile.equippedAccessories.filter(x => x !== id);
          State.commit();
          Router.navigate('/customizer');
        });
        btnRow.appendChild(removeBtn);
      }

      card.appendChild(btnRow);
      controls.appendChild(card);
    });
  }
  
  container.appendChild(header);
  container.appendChild(preview);
  container.appendChild(actionRow);
  container.appendChild(controls);
  return container;
}


