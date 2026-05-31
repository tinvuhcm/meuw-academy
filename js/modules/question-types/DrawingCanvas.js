/**
 * MEUW ACADEMY — DrawingCanvas.js
 * Question Type: Drawing Canvas (with steps & gallery save)
 */

import { el, sleep, canvasToJPEG } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';

export function renderDrawingCanvas(q, onComplete) {
  const container = el('div', { class: 'question-wrapper drawing-wrapper' });

  // 1. Title
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl' }, q.question);
  container.appendChild(title);

  // Layout Container
  const layout = el('div', { class: 'drawing-layout mt-2' });

  // 2. Steps Panel (Left side on desktop, hidden/inline on mobile)
  let currentStep = 0;
  const stepsData = q.steps || [];
  
  const stepsPanel = el('div', { class: 'drawing-steps-panel' });
  const stepsList = el('div', { class: 'drawing-step-list' });
  
  if (stepsData.length > 0) {
    const stepsHeader = el('div', { class: 'drawing-steps-header' }, 'Hướng dẫn từng bước');
    stepsPanel.appendChild(stepsHeader);
    
    stepsData.forEach((step, idx) => {
      const item = el('div', { class: `drawing-step-item ${idx === 0 ? 'active' : ''}` });
      
      const thumb = el('div', { class: 'drawing-step-thumb bg-white' });
      if (step.svg) thumb.innerHTML = step.svg; // mini preview
      
      const info = el('div', { class: 'drawing-step-info' });
      info.appendChild(el('div', { class: 'drawing-step-num' }, `Bước ${idx + 1}`));
      info.appendChild(el('div', { class: 'drawing-step-text' }, step.instruction));
      
      item.appendChild(thumb);
      item.appendChild(info);
      
      item.addEventListener('click', () => {
        Audio.click();
        setStep(idx);
      });
      
      stepsList.appendChild(item);
    });
    stepsPanel.appendChild(stepsList);
    layout.appendChild(stepsPanel);
  }

  // 3. Canvas Area
  const canvasArea = el('div', { class: 'drawing-canvas-area' });
  
  // Toolbar
  const toolbar = el('div', { class: 'drawing-toolbar' });
  
  const colors = [
    '#000000', '#FFFFFF', '#EF4444', '#F97316', '#FCD34D', '#22C55E', 
    '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#9CA3AF'
  ];
  let currentColor = '#000000';
  let currentTool = 'pen'; // 'pen' or 'eraser'
  let currentSize = 5;

  // Tool buttons
  const toolGroup = el('div', { class: 'flex gap-2' });
  const penBtn = el('button', { class: 'tool-btn active', title: 'Bút vẽ' }, '✏️');
  const eraserBtn = el('button', { class: 'tool-btn', title: 'Cục tẩy' }, '🧼');
  
  penBtn.addEventListener('click', () => { setTool('pen'); });
  eraserBtn.addEventListener('click', () => { setTool('eraser'); });
  
  toolGroup.appendChild(penBtn);
  toolGroup.appendChild(eraserBtn);
  toolbar.appendChild(toolGroup);
  toolbar.appendChild(el('div', { class: 'tool-divider' }));

  // Color Palette
  const palette = el('div', { class: 'color-palette' });
  const colorBtns = [];
  colors.forEach(c => {
    const btn = el('div', { class: 'color-swatch', style: `background-color: ${c}` });
    if (c === currentColor) btn.classList.add('active');
    btn.addEventListener('click', () => {
      Audio.click();
      setTool('pen'); // Auto switch to pen if color selected
      currentColor = c;
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    colorBtns.push(btn);
    palette.appendChild(btn);
  });
  toolbar.appendChild(palette);
  toolbar.appendChild(el('div', { class: 'tool-divider' }));

  // Brush Sizes
  const sizeGroup = el('div', { class: 'brush-size-control' });
  const sizes = [
    { class: 'sm', val: 2 },
    { class: 'md', val: 5 },
    { class: 'lg', val: 12 }
  ];
  const sizeBtns = [];
  
  sizes.forEach(s => {
    const btn = el('div', { class: `brush-size-btn brush-size-${s.class} ${s.val === 5 ? 'active' : ''}` });
    btn.appendChild(el('div', { class: `brush-dot brush-dot-${s.class}` }));
    btn.addEventListener('click', () => {
      Audio.click();
      currentSize = s.val;
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    sizeBtns.push(btn);
    sizeGroup.appendChild(btn);
  });
  toolbar.appendChild(sizeGroup);
  toolbar.appendChild(el('div', { class: 'tool-divider' }));

  // Canvas Wrapper
  const canvasWrap = el('div', { class: 'drawing-canvas-wrapper w-full' });
  const canvas = el('canvas', { class: 'drawing-canvas w-full', width: '600', height: '450' });
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  // Fill white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Reference overlay
  const refOverlay = el('div', { class: 'drawing-reference-overlay flex-center' });
  canvasWrap.appendChild(canvas);
  canvasWrap.appendChild(refOverlay);
  
  // Canvas Actions
  const canvasActions = el('div', { class: 'flex-between mt-2' });
  
  const toggleRefBtn = el('button', { class: 'btn btn-outline text-sm py-1 px-3', style: { display: stepsData.length ? 'block' : 'none' } }, '👁️ Hiện ảnh mẫu');
  let refVisible = false;
  toggleRefBtn.addEventListener('click', () => {
    Audio.click();
    refVisible = !refVisible;
    if (refVisible) {
      refOverlay.classList.add('visible');
      toggleRefBtn.innerHTML = '🙈 Ẩn ảnh mẫu';
    } else {
      refOverlay.classList.remove('visible');
      toggleRefBtn.innerHTML = '👁️ Hiện ảnh mẫu';
    }
  });

  const undoBtn = el('button', { class: 'btn btn-outline text-sm py-1 px-3' }, '↩️ Hoàn tác');
  const clearBtn = el('button', { class: 'btn btn-outline text-sm py-1 px-3 text-wrong border-wrong' }, '🗑️ Xóa hết');

  const rightActions = el('div', { class: 'flex gap-2' });
  rightActions.appendChild(undoBtn);
  rightActions.appendChild(clearBtn);
  
  canvasActions.appendChild(toggleRefBtn);
  canvasActions.appendChild(rightActions);

  canvasArea.appendChild(toolbar);
  canvasArea.appendChild(canvasWrap);
  canvasArea.appendChild(canvasActions);
  
  // Action buttons (Submit)
  const submitBtn = el('button', { class: 'btn btn-cta w-full mt-6' }, 'Lưu & Hoàn thành');
  canvasArea.appendChild(submitBtn);
  
  layout.appendChild(canvasArea);
  container.appendChild(layout);

  // 4. Drawing Logic
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  
  // Undo stack
  const history = [];
  function saveState() {
    if (history.length > 20) history.shift();
    history.push(canvas.toDataURL());
  }
  
  // Initial save
  saveState();

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    // Use natural canvas size vs display size ratio
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

  function startPosition(e) {
    e.preventDefault();
    isDrawing = true;
    const coords = getCoords(e);
    lastX = coords.x;
    lastY = coords.y;
    draw(e);
  }

  function endPosition() {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.beginPath();
    saveState();
  }

  function draw(e) {
    if (!isDrawing) return;
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

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseout', endPosition);

  // Touch
  canvas.addEventListener('touchstart', startPosition, { passive: false });
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchcancel', endPosition);
  canvas.addEventListener('touchmove', draw, { passive: false });

  // 5. Controls Logic
  function setTool(tool) {
    Audio.click();
    currentTool = tool;
    penBtn.classList.toggle('active', tool === 'pen');
    eraserBtn.classList.toggle('active', tool === 'eraser');
    canvasWrap.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
  }

  function setStep(idx) {
    if (idx < 0 || idx >= stepsData.length) return;
    currentStep = idx;
    
    // Update UI list
    const items = stepsList.querySelectorAll('.drawing-step-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });

    // Update overlay
    if (stepsData[idx].svg) {
      refOverlay.innerHTML = stepsData[idx].svg;
      refOverlay.querySelector('svg').style.width = '100%';
      refOverlay.querySelector('svg').style.height = '100%';
    } else {
      refOverlay.innerHTML = '';
    }
    
    // Auto-scroll list if needed
    if (items[idx]) {
      items[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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

  clearBtn.addEventListener('click', () => {
    if (confirm('Em có chắc muốn xóa toàn bộ bản vẽ?')) {
      Audio.click();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  });

  // Init first step
  if (stepsData.length > 0) {
    setStep(0);
    triggerMascot('module:drawing');
  }

  // 6. Submit
  submitBtn.addEventListener('click', async () => {
    Audio.click();
    submitBtn.disabled = true;
    
    // Get image data
    const imgData = canvasToJPEG(canvas, 0.7);
    
    // Save to gallery
    State.saveDrawing({
      src: imgData,
      title: q.drawingTitle || 'Tác phẩm của Méo'
    });

    Audio.correct();
    triggerMascot('answer:correct', { customLines: ['Tranh em vẽ đẹp quá! Đã lưu vào bộ sưu tập nhé! 🎨'] });
    
    await sleep(2000);
    onComplete(true, q.xp || 20); // Drawing gives good XP
  });

  return container;
}
