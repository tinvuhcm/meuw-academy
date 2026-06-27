import { el, animateClass, showConfirmDialog } from '../utils.js';
import { triggerMascot } from '../mascot.js';
import { Audio } from '../audio.js';
import Router from '../router.js';
import { renderDrawingCanvas } from './question-types/DrawingCanvas.js';

const COLORING_PAGES = [
  { id: 'dinosaur', title: 'Khủng Long Nhỏ', src: 'assets/images/coloring/dinosaur.png' },
  { id: 'astronaut', title: 'Phi Hành Gia Méo', src: 'assets/images/coloring/astronaut.png' },
  { id: 'castle', title: 'Lâu Đài Cổ Tích', src: 'assets/images/coloring/castle.png' },
  { id: 'car', title: 'Siêu Xe Tốc Độ', src: 'assets/images/coloring/car.png' },
  { id: 'unicorn', title: 'Kỳ Lân Mộng Mơ', src: 'assets/images/coloring/unicorn.png' },
  { id: 'submarine', title: 'Tàu Ngầm Đại Dương', src: 'assets/images/coloring/submarine.png' },
  { id: 'robot', title: 'Robot Thân Thiện', src: 'assets/images/coloring/robot.png' },
  { id: 'mermaid', title: 'Nàng Tiên Cá', src: 'assets/images/coloring/mermaid.png' },
  { id: 'farm', title: 'Nông Trại Vui Vẻ', src: 'assets/images/coloring/farm.png' },
  { id: 'train', title: 'Tàu Hỏa Tu Tu', src: 'assets/images/coloring/train.png' }
];

export function renderColoringLibrary() {
  const container = el('div', { class: 'page-container coloring-container max-w-4xl w-full mx-auto p-4' });

  const header = el('div', { class: 'flex-between mb-6' });
  const title = el('h1', { class: 'font-display text-3xl text-méo-purple' }, '🎨 Xưởng Tô Màu');
  
  const backBtn = el('button', { class: 'btn btn-outline text-sm py-2 px-4' }, '🏠 Về Trang Chủ');
  backBtn.addEventListener('click', () => {
    Audio.click();
    Router.navigate('/');
  });

  header.appendChild(title);
  header.appendChild(backBtn);
  container.appendChild(header);

  // Daily Featured Logic
  const todayNum = new Date().getDate();
  const index1 = (todayNum * 3) % COLORING_PAGES.length;
  const index2 = (todayNum * 7 + 1) % COLORING_PAGES.length;
  const featured = [COLORING_PAGES[index1], COLORING_PAGES[index2]];
  
  const featuredSection = el('div', { class: 'mb-8' });
  featuredSection.innerHTML = '<h2 class="font-display text-2xl mb-4 text-pink-500">✨ Tranh mới hôm nay</h2>';
  const featuredGrid = el('div', { class: 'grid grid-cols-2 gap-6' });
  
  featured.forEach(page => {
    const card = createColoringCard(page, container);
    card.classList.add('border-2', 'border-pink-300', 'bg-pink-50');
    featuredGrid.appendChild(card);
  });
  
  featuredSection.appendChild(featuredGrid);
  container.appendChild(featuredSection);

  const allSection = el('div', { class: 'mb-8' });
  allSection.innerHTML = '<h2 class="font-display text-2xl mb-4">Thư viện tranh</h2>';
  const grid = el('div', { class: 'grid grid-cols-2 md:grid-cols-3 gap-6' });

  COLORING_PAGES.forEach(page => {
    grid.appendChild(createColoringCard(page, container));
  });

  allSection.appendChild(grid);
  container.appendChild(allSection);

  triggerMascot('greeting', { customLines: ['Chào mừng đến với Xưởng Tô Màu!', 'Em có thể tô màu trên máy hoặc tải về in ra giấy đó nha!'] });

  return container;
}

function createColoringCard(page, container) {
  const card = el('div', { class: 'coloring-card card p-2 cursor-pointer transition-transform hover:scale-105' });
  
  const imgWrap = el('div', { class: 'w-full aspect-[1/1.414] bg-white rounded-lg overflow-hidden border-2 border-border mb-2 relative flex-center' });
  const img = el('img', { src: page.src, class: 'w-full h-full object-contain' });
  imgWrap.appendChild(img);

    const info = el('div', { class: 'text-center font-bold text-sm h-10 flex-center' }, page.title);

    // Hover overlay with actions
    const overlay = el('div', { class: 'absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-3' });
    
    const colorBtn = el('button', { class: 'btn btn-cta text-sm py-2 px-4' }, '🖌️ Tô Màu Ngay');
    colorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      Audio.click();
      openStudio(page, container);
    });

    const dlBtn = el('button', { class: 'btn btn-secondary text-sm py-2 px-4' }, '⬇️ Tải để In');
    dlBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      Audio.click();
      const a = document.createElement('a');
      a.href = page.src;
      a.download = `To_Mau_${page.id}.png`;
      a.click();
    });

    overlay.appendChild(colorBtn);
    overlay.appendChild(dlBtn);
    imgWrap.appendChild(overlay);

    card.appendChild(imgWrap);
    card.appendChild(info);
    
    // Tap on mobile opens studio
    card.addEventListener('click', () => {
      Audio.click();
      openStudio(page, container);
    });

    return card;
}

function openStudio(page, rootContainer) {
  rootContainer.innerHTML = ''; // clear library
  
  // Create mock question object for DrawingCanvas
  const q = {
    type: 'drawing',
    question: `Đang tô màu: ${page.title}`,
    drawingTitle: `Tranh Tô Màu - ${page.title}`,
    coloringBg: page.src,
    xp: 20
  };

  const canvasView = renderDrawingCanvas(q, (success, xp) => {
    if (success) {
      // Re-mount the coloring library directly into the app root so the
      // studio exits immediately after a successful save.
      const appRoot = rootContainer.closest('#app');
      const freshLibrary = renderColoringLibrary();
      if (appRoot) {
        appRoot.innerHTML = '';
        appRoot.appendChild(freshLibrary);
        window.scrollTo(0, 0);
      } else {
        rootContainer.innerHTML = '';
        rootContainer.appendChild(freshLibrary);
      }
    }
  });

  // Inject a custom back button into the view
  const studioBackBtn = el('button', { class: 'btn btn-outline text-sm absolute top-4 left-4 z-50 bg-white/90 shadow-md' }, '🔙 Trở về thư viện');
  studioBackBtn.addEventListener('click', async () => {
    Audio.click();
    if (await showConfirmDialog({
      title: 'Rời xưởng tô màu?',
      message: 'Nếu chưa bấm "Lưu & Hoàn thành", tranh hiện tại có thể chưa được lưu vào phòng tranh.',
      tone: 'warning',
      confirmText: 'Rời khỏi',
      cancelText: 'Ở lại tô tiếp',
    })) {
      Router.navigate('/coloring');
    }
  });
  
  canvasView.style.position = 'relative';
  canvasView.appendChild(studioBackBtn);

  rootContainer.appendChild(canvasView);
}
