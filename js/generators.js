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

  // Map base Tailwind bg colors to rich dark gradient backgrounds for the cards
  let bgGradient = 'from-slate-900 via-stone-800 to-neutral-900';
  if (card.color) {
    if (card.color.includes('purple')) bgGradient = 'from-purple-950 via-purple-800 to-fuchsia-900';
    else if (card.color.includes('blue')) bgGradient = 'from-slate-900 via-blue-900 to-cyan-900';
    else if (card.color.includes('green')) bgGradient = 'from-green-950 via-emerald-800 to-green-900';
    else if (card.color.includes('yellow')) bgGradient = 'from-amber-950 via-yellow-700 to-orange-900';
    else if (card.color.includes('pink') || card.color.includes('red')) bgGradient = 'from-rose-950 via-pink-800 to-red-900';
  }

  // Generate a bunch of CSS stars/sparkles for the background
  let sparkles = '';
  for(let i=0; i<15; i++) {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const size = 2 + Math.floor(Math.random() * 4);
    const delay = Math.random() * 3;
    sparkles += `<div class="absolute bg-white rounded-full opacity-60 animate-pulse" style="top: ${top}%; left: ${left}%; width: ${size}px; height: ${size}px; animation-delay: ${delay}s; box-shadow: 0 0 ${size*2}px #fff;"></div>`;
  }

  let html = `
    <div class="relative w-full aspect-[731/1024] rounded-xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-méo-purple/50">
      
      <!-- Lớp Nền Thẻ -->
      <div class="absolute inset-0 z-0 bg-gradient-to-br ${bgGradient}">
        ${sparkles}
        <div class="absolute inset-0 bg-black/20"></div>
      </div>

      <!-- Nội Dung Thẻ -->
      <!-- Padding được canh chỉnh để vừa khít bên trong khung vàng (chừa viền ngoài) -->
      <div class="absolute inset-0 z-10 flex flex-col p-[12%] pb-[15%] pt-[14%]">
        
        <!-- Tiêu đề -->
        <div class="text-center shrink-0 mt-4">
          <h3 class="font-display text-xl md:text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-300 to-yellow-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style="-webkit-text-stroke: 0.5px rgba(100,50,0,0.5); filter: drop-shadow(0 4px 4px rgba(0,0,0,0.6)); line-height: 1.2;">
            ${card.title}
          </h3>
        </div>

        <!-- Hình Ảnh / Emoji Trung Tâm -->
        <div class="flex-1 flex items-center justify-center w-full min-h-0 relative">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
          ${card.image 
            ? `<img src="${card.image}" class="max-w-full max-h-[80%] object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] z-10 hover:scale-110 transition-transform duration-500" />` 
            : `<div class="text-7xl md:text-8xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] animate-pulse-slow z-10 hover:scale-110 transition-transform duration-500">${card.emoji || rarityEmoji || '✨'}</div>`
          }
        </div>

        <!-- Góc Hiểu Biết -->
        <div class="w-full bg-black/60 border border-yellow-500/40 rounded-xl p-3 flex items-start gap-3 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.5)] shrink-0 z-10 mb-4">
           <div class="text-3xl filter drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] shrink-0 animate-bounce-slow">💡</div>
           <div class="text-left flex-1 min-w-0">
             <div class="text-yellow-400 font-bold text-[10px] md:text-xs uppercase mb-0.5 tracking-wider">Góc hiểu biết</div>
             <div class="text-white text-xs md:text-sm leading-snug line-clamp-3">${card.desc}</div>
           </div>
        </div>

      </div>

      <!-- Khung Vàng Tráng Lệ Trùm Lên Cùng -->
      <img src="assets/images/card_template.png" class="absolute inset-0 w-full h-full object-fill z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
      
      <!-- Hiệu ứng Shine quét qua -->
      <div class="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-xl">
        <div class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:animate-shine"></div>
      </div>

    </div>
  `;

  return html;
}

// Gắn vào window để dễ debug
if (typeof window !== 'undefined') {
  window.AppGenerators = { generateAvatarHTML, generateKnowledgeCardHTML };
}
