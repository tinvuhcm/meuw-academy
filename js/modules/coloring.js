import { el, animateClass } from '../utils.js';
import { triggerMascot } from '../mascot.js';
import { Audio } from '../audio.js';
import Router from '../router.js';
import { renderDrawingCanvas } from './question-types/DrawingCanvas.js';

const COLORING_PAGES = [
  {
    id: 'space',
    title: 'Phi Hành Gia Méo',
    src: 'assets/images/coloring/space.png'
  },
  {
    id: 'animal',
    title: 'Sư Tử Con Tronge Rừng',
    src: 'assets/images/coloring/animal.png'
  }
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

  const grid = el('div', { class: 'grid grid-cols-2 md:grid-cols-3 gap-6' });

  COLORING_PAGES.forEach(page => {
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

    grid.appendChild(card);
  });

  container.appendChild(grid);

  triggerMascot('greeting', { customLines: ['Chào mừng đến với Xưởng Tô Màu!', 'Em có thể tô màu trên máy hoặc tải về in ra giấy đó nha!'] });

  return container;
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
      // Go back to library
      Router.navigate('/coloring');
    }
  });

  // Inject a custom back button into the view
  const studioBackBtn = el('button', { class: 'btn btn-outline text-sm absolute top-4 left-4 z-50 bg-white/90 shadow-md' }, '🔙 Trở về thư viện');
  studioBackBtn.addEventListener('click', () => {
    Audio.click();
    if(confirm('Chưa lưu tranh, em có chắc muốn thoát?')) {
      Router.navigate('/coloring');
    }
  });
  
  canvasView.style.position = 'relative';
  canvasView.appendChild(studioBackBtn);

  rootContainer.appendChild(canvasView);
}
