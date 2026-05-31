import { el } from './utils.js';

export function createScratchpad() {
  const container = el('div', { class: 'scratchpad-container mt-4 flex flex-col gap-2' });
  
  const toggleBtn = el('button', { class: 'btn btn-outline text-sm self-start flex items-center gap-2' });
  toggleBtn.innerHTML = '<span>📝</span> Mở bảng nháp';
  
  const canvasWrapper = el('div', { class: 'scratchpad-wrapper hidden relative border-2 border-dashed border-méo-purple rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm' });
  
  const canvas = el('canvas', { class: 'scratchpad-canvas w-full touch-none cursor-crosshair' });
  // Set fixed resolution for drawing clarity
  canvas.width = 600;
  canvas.height = 300;
  
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#7C3AED'; // Méo Purple
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function getPos(evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX = evt.clientX;
    let clientY = evt.clientY;
    
    if (evt.touches && evt.touches.length > 0) {
      clientX = evt.touches[0].clientX;
      clientY = evt.touches[0].clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function startPos(e) {
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX, lastY);
    ctx.stroke();
    e.preventDefault();
  }

  function draw(e) {
    if (!isDrawing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
    e.preventDefault();
  }

  function endPos() {
    isDrawing = false;
  }

  // Mouse events
  canvas.addEventListener('mousedown', startPos);
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', endPos);
  
  // Touch events
  canvas.addEventListener('touchstart', startPos, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  window.addEventListener('touchend', endPos);
  
  const clearBtn = el('button', { class: 'absolute top-2 right-2 btn btn-icon bg-surface border-2 border-border text-xs px-2 py-1' }, '🗑️ Xóa nháp');
  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  canvasWrapper.appendChild(canvas);
  canvasWrapper.appendChild(clearBtn);

  toggleBtn.addEventListener('click', () => {
    if (canvasWrapper.classList.contains('hidden')) {
      canvasWrapper.classList.remove('hidden');
      toggleBtn.innerHTML = '<span>❌</span> Đóng bảng nháp';
    } else {
      canvasWrapper.classList.add('hidden');
      toggleBtn.innerHTML = '<span>📝</span> Mở bảng nháp';
    }
  });

  container.appendChild(toggleBtn);
  container.appendChild(canvasWrapper);

  return container;
}
