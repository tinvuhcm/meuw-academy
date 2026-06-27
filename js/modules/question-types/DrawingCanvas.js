import { el, canvasToJPEG, showConfirmDialog } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';
import Router from '../../router.js';

export function renderDrawingCanvas(q, onComplete) {
  const container = el('div', { class: 'question-wrapper drawing-wrapper w-full' });

  // 1. Title
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl mb-4' }, q.question);
  container.appendChild(title);

  // Layout Container - Studio Mode
  const layout = el('div', { class: 'drawing-layout studio-mode relative w-full h-[65vh] min-h-[500px] border-4 border-méo-purple rounded-2xl overflow-hidden shadow-xl bg-gray-200 select-none' });

  // Scrollable container for pan
  const scrollWrap = el('div', { class: 'absolute inset-0 w-full h-full overflow-auto custom-scrollbar', style: 'touch-action: pan-x pan-y;' });

  // 2. Canvas
  let zoomLevel = 1;
  const canvasWrap = el('div', { class: 'relative', style: 'width: 1240px; height: 877px; margin: 0 auto; transform-origin: top left;' });
  const canvas = el('canvas', { class: 'drawing-canvas w-full h-full cursor-crosshair block', style: 'transform-origin: top left; transition: transform 0.1s;' });
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  // Must set actual width/height
  canvas.width = 1240;
  canvas.height = 877; // Roughly A4 ratio landscape
  
  // Fill white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvasWrap.appendChild(canvas);
  scrollWrap.appendChild(canvasWrap);
  layout.appendChild(scrollWrap);

  // If coloring mode, load background image
  if (q.coloringBg) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      // Draw centered/scaled to fit
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
      saveState(); // Save initial state with bg
    };
    img.src = q.coloringBg;
  }

  // 3. Floating Toolbars
  
  let currentColor = '#000000';
  let currentTool = 'pen'; // 'pen', 'eraser', 'fill'
  let currentSize = 5;

  const topBar = el('div', { class: 'absolute top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md border-b-2 border-border flex-between px-4 z-10' });
  
  const rightTopActions = el('div', { class: 'flex gap-2' });
  const zoomOutBtn = el('button', { class: 'btn btn-icon bg-blue-100 text-lg p-2 rounded-full hover:bg-blue-200' }, '➖');
  const zoomInBtn = el('button', { class: 'btn btn-icon bg-blue-100 text-lg p-2 rounded-full hover:bg-blue-200' }, '➕');
  const undoBtn = el('button', { class: 'btn btn-icon bg-gray-100 text-lg p-2 rounded-full hover:bg-gray-200', style: 'margin-left: 10px;' }, '↩️');
  const clearBtn = el('button', { class: 'btn btn-icon bg-red-100 text-red-500 text-lg p-2 rounded-full hover:bg-red-200' }, '🗑️');
  
  rightTopActions.appendChild(zoomOutBtn);
  rightTopActions.appendChild(zoomInBtn);
  rightTopActions.appendChild(undoBtn);
  rightTopActions.appendChild(clearBtn);

  // Zoom logic
  function updateZoom() {
    canvas.style.transform = `scale(${zoomLevel})`;
    canvasWrap.style.width = `${1240 * zoomLevel}px`;
    canvasWrap.style.height = `${877 * zoomLevel}px`;
  }
  zoomInBtn.addEventListener('click', () => { zoomLevel = Math.min(3, zoomLevel + 0.2); updateZoom(); });
  zoomOutBtn.addEventListener('click', () => { zoomLevel = Math.max(0.2, zoomLevel - 0.2); updateZoom(); });
  
  const centerTopActions = el('div', { class: 'font-display text-méo-purple' }, q.coloringBg ? 'Méo Studio: Bé Tô Màu' : 'Méo Studio: Bé Tập Vẽ');

  topBar.appendChild(centerTopActions);
  topBar.appendChild(rightTopActions);
  
  layout.appendChild(topBar);

  // Left Toolbar (Tools & Sizes)
  const leftBar = el('div', { class: 'absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 backdrop-blur-md border-2 border-border p-2 rounded-2xl flex flex-col gap-4 shadow-lg z-10' });
  
  const toolsGroup = el('div', { class: 'flex flex-col gap-2' });
  const penBtn = createToolBtn('✏️', 'Bút chì (Bấm đúp để chọn bút)');
  const eraserBtn = createToolBtn('🧼', 'Cục tẩy');
  const fillBtn = createToolBtn('🪣', 'Thùng sơn (Tô màu vùng)');
  const panBtn = createToolBtn('🖐️', 'Bàn tay (Di chuyển tranh)');
  
  penBtn.classList.add('ring-4', 'ring-méo-purple', 'bg-méo-purple-lt');
  
  function createToolBtn(icon, title) {
    const b = el('button', { class: 'w-12 h-12 text-2xl rounded-xl flex-center transition-all bg-gray-100 hover:bg-gray-200', title });
    b.innerHTML = icon;
    return b;
  }

  penBtn.addEventListener('click', () => setTool('pen', penBtn));
  eraserBtn.addEventListener('click', () => setTool('eraser', eraserBtn));
  fillBtn.addEventListener('click', () => setTool('fill', fillBtn));
  panBtn.addEventListener('click', () => setTool('pan', panBtn));

  toolsGroup.appendChild(panBtn);
  toolsGroup.appendChild(penBtn);
  toolsGroup.appendChild(eraserBtn);
  toolsGroup.appendChild(fillBtn);

  const divider = el('div', { class: 'w-full h-1 bg-border rounded-full' });

  const sizesGroup = el('div', { class: 'flex flex-col items-center gap-3' });
  const sizes = [ { val: 2, s: 'w-2 h-2' }, { val: 8, s: 'w-4 h-4' }, { val: 20, s: 'w-6 h-6' } ];
  const sizeBtns = [];
  sizes.forEach(sz => {
    const b = el('button', { class: `w-10 h-10 flex-center rounded-full hover:bg-gray-100 ${sz.val === 8 ? 'bg-gray-200' : ''}` });
    b.innerHTML = `<div class="${sz.s} bg-gray-800 rounded-full"></div>`;
    b.addEventListener('click', () => {
      Audio.click();
      currentSize = sz.val;
      sizeBtns.forEach(btn => btn.classList.remove('bg-gray-200'));
      b.classList.add('bg-gray-200');
    });
    sizeBtns.push(b);
    sizesGroup.appendChild(b);
  });

  leftBar.appendChild(toolsGroup);
  leftBar.appendChild(divider);
  leftBar.appendChild(sizesGroup);

  layout.appendChild(leftBar);

  // Right Toolbar (Palette)
  const rightBar = el('div', { class: 'absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 backdrop-blur-md border-2 border-border p-3 rounded-3xl flex flex-col gap-2 shadow-lg z-10' });
  
  const colors = [
    '#000000', '#EF4444', '#F97316', '#FCD34D', '#22C55E', 
    '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', 
    '#8B4513', '#FFFFFF'
  ];
  
  const colorBtns = [];
  colors.forEach(c => {
    const btn = el('button', { class: 'w-10 h-10 rounded-full border-2 border-gray-200 shadow-sm transition-transform hover:scale-110', style: `background-color: ${c}` });
    if (c === '#000000') btn.classList.add('ring-4', 'ring-offset-2', 'ring-méo-purple');
    btn.addEventListener('click', () => {
      Audio.click();
      currentColor = c;
      colorBtns.forEach(b => b.classList.remove('ring-4', 'ring-offset-2', 'ring-méo-purple'));
      btn.classList.add('ring-4', 'ring-offset-2', 'ring-méo-purple');
      // If currently eraser, switch back to pen
      if (currentTool === 'eraser') setTool('pen', penBtn);
    });
    colorBtns.push(btn);
    rightBar.appendChild(btn);
  });

  layout.appendChild(rightBar);
  container.appendChild(layout);

  // Submit Buttons
  const bottomActions = el('div', { class: 'flex gap-4 mt-6' });
  
  // If it's a coloring page practice, they can download
  if (q.coloringBg) {
    const downloadBtn = el('button', { class: 'btn btn-outline flex-1' }, '⬇️ Lưu máy (JPG)');
    downloadBtn.addEventListener('click', () => {
      Audio.click();
      const a = document.createElement('a');
      a.download = `Méo_Tô_Màu_${Date.now()}.jpg`;
      a.href = canvasToJPEG(canvas, 0.9);
      a.click();
    });
    bottomActions.appendChild(downloadBtn);
  }

  const submitBtn = el('button', { class: 'btn btn-cta flex-1' }, 'Lưu & Hoàn thành');
  bottomActions.appendChild(submitBtn);
  container.appendChild(bottomActions);

  // 4. Drawing & Logic
  let isDrawing = false;
  let isPanning = false;
  let startPanX = 0;
  let startPanY = 0;
  let startScrollLeft = 0;
  let startScrollTop = 0;
  let lastX = 0;
  let lastY = 0;
  
  const history = [];
  function saveState() {
    if (history.length > 20) history.shift();
    history.push(canvas.toDataURL());
  }
  setTimeout(saveState, 100);

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    // getBoundingClientRect already accounts for transform: scale(), 
    // so we just divide the rect width to get scale relative to original.
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  // Flood Fill algorithm
  function floodFill(startX, startY, fillColorHex) {
    startX = Math.floor(startX);
    startY = Math.floor(startY);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    const w = canvas.width;
    const h = canvas.height;
    
    const idx = (startY * w + startX) * 4;
    const tR = data[idx], tG = data[idx+1], tB = data[idx+2], tA = data[idx+3];
    
    const fillR = parseInt(fillColorHex.substr(1,2), 16);
    const fillG = parseInt(fillColorHex.substr(3,2), 16);
    const fillB = parseInt(fillColorHex.substr(5,2), 16);
    
    if (tR === fillR && tG === fillG && tB === fillB) return;
    
    const matchColor = (pos) => {
      const r = data[pos], g = data[pos+1], b = data[pos+2], a = data[pos+3];
      // simple tolerance for anti-aliasing around black lines
      return Math.abs(r - tR) < 30 && Math.abs(g - tG) < 30 && Math.abs(b - tB) < 30 && a > 200;
    };
    
    const colorPixel = (pos) => {
      data[pos] = fillR; data[pos+1] = fillG; data[pos+2] = fillB; data[pos+3] = 255;
    };
    
    const stack = [[startX, startY]];
    
    while (stack.length) {
      const [cx, cy] = stack.pop();
      let p = (cy * w + cx) * 4;
      let y1 = cy;
      
      while (y1 >= 0 && matchColor(p)) {
        y1--; p -= w * 4;
      }
      p += w * 4; y1++;
      
      let reachL = false;
      let reachR = false;
      
      while (y1 < h && matchColor(p)) {
        colorPixel(p);
        if (cx > 0) {
          if (matchColor(p - 4)) {
            if (!reachL) { stack.push([cx - 1, y1]); reachL = true; }
          } else if (reachL) reachL = false;
        }
        if (cx < w - 1) {
          if (matchColor(p + 4)) {
            if (!reachR) { stack.push([cx + 1, y1]); reachR = true; }
          } else if (reachR) reachR = false;
        }
        y1++; p += w * 4;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function startPosition(e) {
    if (e.target.closest('button')) return; // ignore UI clicks
    
    if (currentTool === 'pan') {
      isPanning = true;
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      startPanX = clientX;
      startPanY = clientY;
      startScrollLeft = scrollWrap.scrollLeft;
      startScrollTop = scrollWrap.scrollTop;
      if (canvas) canvas.style.cursor = 'grabbing';
      return;
    }

    if (e.touches && e.touches.length > 1) return; // Allow native 2-finger zoom/pan
    e.preventDefault();
    const coords = getCoords(e);
    
    if (currentTool === 'fill') {
      Audio.click(); // plop sound
      floodFill(coords.x, coords.y, currentColor);
      saveState();
      return;
    }

    isDrawing = true;
    lastX = coords.x;
    lastY = coords.y;
    draw(e);
  }

  function endPosition() {
    if (isPanning) {
      isPanning = false;
      if (canvas && currentTool === 'pan') canvas.style.cursor = 'grab';
      return;
    }
    if (!isDrawing) return;
    isDrawing = false;
    ctx.beginPath();
    saveState();
  }

  function draw(e) {
    if (isPanning) {
      e.preventDefault();
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      const dx = clientX - startPanX;
      const dy = clientY - startPanY;
      scrollWrap.scrollLeft = startScrollLeft - dx;
      scrollWrap.scrollTop = startScrollTop - dy;
      return;
    }
    if (!isDrawing || currentTool === 'fill') return;
    e.preventDefault();
    const coords = getCoords(e);

    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (currentTool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
    } else {
      ctx.strokeStyle = currentColor;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    lastX = coords.x;
    lastY = coords.y;
  }

  canvasWrap.addEventListener('mousedown', startPosition);
  window.addEventListener('mouseup', endPosition);
  canvasWrap.addEventListener('mousemove', draw);
  
  canvasWrap.addEventListener('touchstart', startPosition, { passive: false });
  window.addEventListener('touchend', endPosition);
  canvasWrap.addEventListener('touchmove', draw, { passive: false });

  function setTool(tool, btnEl) {
    Audio.click();
    currentTool = tool;
    penBtn.classList.remove('ring-4', 'ring-méo-purple', 'bg-méo-purple-lt');
    eraserBtn.classList.remove('ring-4', 'ring-méo-purple', 'bg-méo-purple-lt');
    fillBtn.classList.remove('ring-4', 'ring-méo-purple', 'bg-méo-purple-lt');
    panBtn.classList.remove('ring-4', 'ring-méo-purple', 'bg-méo-purple-lt');
    btnEl.classList.add('ring-4', 'ring-méo-purple', 'bg-méo-purple-lt');
    
    if (tool === 'eraser') canvas.style.cursor = 'cell';
    else if (tool === 'fill') canvas.style.cursor = 'pointer';
    else if (tool === 'pan') canvas.style.cursor = 'grab';
    else canvas.style.cursor = 'crosshair';
  }

  undoBtn.addEventListener('click', () => {
    Audio.click();
    if (history.length > 1) {
      history.pop(); // Remove current state
      const imgData = history[history.length - 1];
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = imgData;
    }
  });

  clearBtn.addEventListener('click', async () => {
    if (await showConfirmDialog({
      title: 'Xóa toàn bộ bản vẽ?',
      message: 'Thao tác này sẽ xóa nét vẽ hiện tại trên khung tô màu.',
      tone: 'warning',
      confirmText: 'Xóa tranh',
      cancelText: 'Giữ lại',
    })) {
      Audio.click();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // redraw bg if exists
      if (q.coloringBg) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;
          ctx.drawImage(img, x, y, w, h);
          saveState();
        };
        img.src = q.coloringBg;
      } else {
        saveState();
      }
    }
  });

  triggerMascot('module:drawing');

  submitBtn.addEventListener('click', async () => {
    Audio.click();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang lưu...';
    
    const imgData = canvasToJPEG(canvas, 0.8);
    State.saveDrawing({
      src: imgData,
      title: q.drawingTitle || (q.coloringBg ? 'Tranh Tô Màu' : 'Tác phẩm của Méo')
    });

    Audio.correct();
    triggerMascot('answer:correct', { customLines: ['Tranh em vẽ đẹp quá! Đã lưu vào bộ sưu tập nhé! 🎨'] });

    window.toast?.('Đã lưu tranh vào phòng tranh.', 'success');

    try {
      onComplete(true, q.xp || 20);
    } catch (error) {
      console.error('[DrawingCanvas] Failed to complete after save:', error);
      if (q.coloringBg) {
        Router.replace('/coloring?saved=1');
        return;
      }
      submitBtn.disabled = false;
      submitBtn.textContent = 'Lưu & Hoàn thành';
    }
  });

  return container;
}
