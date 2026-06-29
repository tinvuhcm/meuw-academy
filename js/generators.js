import { CUSTOMIZER_ITEMS_META, MEO_STATE_ASSETS, GAU_STATE_ASSETS } from './data/mascot-assets.js';

/**
 * Sinh chuỗi HTML để render Avatar Mascot với phụ kiện (overlay).
 * Giới hạn tối đa 3 phụ kiện, lọc theo slot để không bị đè (ví dụ không đội 2 mũ).
 * @param {string} character 'meo' hoặc 'gau'
 * @param {string[]} equippedAccessoryIds Mảng ID phụ kiện đang trang bị
 * @param {string} baseState Trạng thái biểu cảm (idle, happy...). Tạm thời luôn dùng idle cho avatar có phụ kiện.
 * @returns {string} HTML string
 */
export function generateAvatarHTML(character, equippedAccessoryIds = [], baseState = 'idle') {
  // Lấy danh sách phụ kiện hợp lệ
  const selected = [];
  const usedSlots = new Set();
  
  // Đảo ngược mảng để ưu tiên phụ kiện được trang bị sau cùng (mới nhất)
  const reversed = [...equippedAccessoryIds].reverse();
  for (const id of reversed) {
    const meta = CUSTOMIZER_ITEMS_META[id];
    if (meta && meta.render === 'overlay' && !usedSlots.has(meta.slot)) {
      selected.push({ id, meta });
      usedSlots.add(meta.slot);
      if (selected.length === 3) break; // Tối đa 3 phụ kiện
    }
  }
  
  // Đảo lại thứ tự ban đầu để render
  selected.reverse();
  
  const stateAssets = character === 'gau' ? GAU_STATE_ASSETS : MEO_STATE_ASSETS;
  const baseImg = stateAssets[baseState] || stateAssets.idle || (character === 'gau' 
    ? 'assets/images/gau-lun-teacher-avatar.png' 
    : 'assets/images/mascot_avatar.png');
  
  let html = `<div class="relative w-full h-full flex items-center justify-center">`;
  html += `<img src="${baseImg}" class="absolute inset-0 w-full h-full object-contain z-0" />`;
  
  selected.forEach(({ meta }) => {
    // Tọa độ gốc dựa trên canvas 256x256
    const [x, y, w, h] = meta.box;
    const left = (x / 256) * 100;
    const top = (y / 256) * 100;
    const width = (w / 256) * 100;
    const height = (h / 256) * 100;
    
    html += `<img src="${meta.src}" class="absolute z-10 drop-shadow-md pointer-events-none" style="left: ${left}%; top: ${top}%; width: ${width}%; height: ${height}%; opacity: ${meta.opacity || 1};" />`;
  });
  
  html += `</div>`;
  return html;
}

/**
 * Sinh chuỗi HTML (phần ruột) cho Thẻ kiến thức
 * @param {Object} card Dữ liệu thẻ
 * @returns {string} HTML string
 */
export function generateKnowledgeCardHTML(card) {
  const rarityEmoji = {
    'Thường': '⭐',
    'Hiếm': '🌟',
    'Cực hiếm': '👑',
    'rare': '🌟',
    'epic': '💎',
    'legendary': '👑',
  }[card.rarity] || '⭐';

  const isSuperRare = card.rarity === 'Cực hiếm' || card.rarity === 'legendary';
  const cardColor = card.color || 'bg-blue-500';

  let html = `
    <!-- Lớp hiệu ứng lấp lánh (Shine) -->
    <div class="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-3xl">
      <div class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] group-hover:animate-shine"></div>
    </div>
  `;

  // Băng rôn "Siêu cấp" cho thẻ Cực hiếm
  if (isSuperRare) {
    html += `
      <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden z-30">
        <div class="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 text-yellow-900 font-bold text-[10px] uppercase py-1 shadow-md transform rotate-45 translate-x-4 translate-y-2 text-center w-24 animate-pulse">Siêu cấp</div>
      </div>
    `;
  }

  // Khu vực hình ảnh
  html += `
    <div class="relative aspect-[3/4] w-full bg-bg-2 overflow-hidden border-b-4 border-black/5 z-10 flex items-center justify-center text-7xl ${cardColor} text-white group-hover:scale-105 transition-transform duration-700">
  `;
  
  if (card.image) {
    html += `<img src="${card.image}" class="w-full h-full object-contain bg-black" />`;
  } else {
    html += `${card.emoji || '✨'}`;
  }

  if (card.type) {
    html += `<div class="absolute top-3 left-3 bg-black/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-white/20 z-10">${card.type}</div>`;
  }

  html += `</div>`; // End img wrapper

  // Khu vực thông tin
  html += `
    <div class="p-5 flex flex-col flex-1 bg-gradient-to-b from-white to-yellow-50/50 z-10 relative">
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-100/50 via-transparent to-transparent"></div>
      <h3 class="font-display text-xl mb-2 text-text group-hover:text-yellow-600 transition-colors drop-shadow-sm">${card.title}</h3>
      <p class="text-sm text-text-muted flex-1 line-clamp-2 relative z-10">${card.desc}</p>
      
      <div class="mt-3 pt-3 border-t border-border flex items-center justify-between relative z-10">
        <span class="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md shadow-sm border border-yellow-300">${rarityEmoji} ${card.rarity}</span>
        <span class="text-xs font-bold text-méo-purple animate-pulse">Mở xem ✨</span>
      </div>
    </div>
  `;

  return html;
}

// Gắn vào window để dễ debug
if (typeof window !== 'undefined') {
  window.AppGenerators = { generateAvatarHTML, generateKnowledgeCardHTML };
}
