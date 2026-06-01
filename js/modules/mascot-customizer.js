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
  const canvas = el('canvas', { width: 256, height: 256, class: 'w-56 h-56 object-contain' });
  preview.appendChild(canvas);
  
  const profile = State.getActiveProfile();
  if (!profile.equippedAccessories) profile.equippedAccessories = [];
  
  const itemsMeta = {
    'acc_sunglasses': { src: 'assets/mascot/accessories/accessory_sunglasses_1780213487126.png', render: 'base' },
    'acc_crown': { src: 'assets/mascot/accessories/accessory_crown_1780213501375.png', render: 'base' },
    'acc_wand': { src: 'assets/mascot/accessories/accessory_wand_1780213517410.png', render: 'overlay', box: [138, 82, 92, 92] },
    'acc_lollipop': { src: 'assets/images/store/lollipop.png', render: 'overlay', box: [18, 116, 72, 72] },
    'acc_milktea': { src: 'assets/images/store/milktea.png', render: 'overlay', box: [172, 126, 58, 58] },
    'acc_tophat': { src: 'assets/images/store/tophat.png', render: 'overlay', box: [78, 6, 100, 100] },
    'acc_cape': { src: 'assets/images/store/cape.png', render: 'base' },
    'acc_headphones': { src: 'assets/images/store/headphones.png', render: 'base' },
    'acc_batman': { src: 'assets/images/store/batman.png', render: 'base' },
    'acc_spiderman': { src: 'assets/images/store/spiderman.png', render: 'overlay', box: [0, 112, 256, 90], opacity: 0.8 },
    'acc_console': { src: 'assets/images/store/console.png', render: 'overlay', box: [92, 154, 76, 76] }
  };

  renderMascotCanvas(canvas, profile.equippedAccessories, itemsMeta);
  
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

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function renderMascotCanvas(canvas, equippedIds, itemsMeta) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const baseVariantId = [...equippedIds].reverse().find(id => itemsMeta[id]?.render === 'base');
  const baseSrc = baseVariantId ? itemsMeta[baseVariantId].src : 'assets/images/mascot_avatar.png';
  const base = await loadImage(baseSrc);
  ctx.drawImage(base, 16, 16, 224, 224);

  for (const id of equippedIds) {
    const meta = itemsMeta[id];
    if (!meta || meta.render !== 'overlay') continue;
    const [x, y, w, h] = meta.box;
    const img = await loadImage(meta.src);
    ctx.save();
    ctx.globalAlpha = meta.opacity || 1;
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
  }
}
