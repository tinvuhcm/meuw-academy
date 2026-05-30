/**
 * MEUW ACADEMY — confetti.js
 * Canvas-based particle system for celebration effects
 */

let _canvas = null;
let _ctx = null;
let _particles = [];
let _animationId = null;
let _isRunning = false;

// Colors matching brand palette
const COLORS = [
  '#7C3AED', // Purple
  '#EC4899', // Pink
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#FCD34D', // Gold
];

function initCanvas() {
  if (_canvas) return;
  _canvas = document.createElement('canvas');
  _canvas.className = 'confetti-canvas';
  Object.assign(_canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '9999',
  });
  document.body.appendChild(_canvas);
  _ctx = _canvas.getContext('2d');
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}

function resizeCanvas() {
  if (!_canvas) return;
  _canvas.width = window.innerWidth;
  _canvas.height = window.innerHeight;
}

class Particle {
  constructor(x, y, isBurst = false) {
    this.x = x || Math.random() * window.innerWidth;
    this.y = y || (isBurst ? window.innerHeight / 2 : -50);
    this.r = Math.random() * 6 + 4; // radius
    
    // Physics
    this.dx = (Math.random() - 0.5) * (isBurst ? 20 : 6); // Velocity X
    this.dy = isBurst ? (Math.random() * -15 - 5) : (Math.random() * 5 + 2); // Velocity Y
    
    // Appearance
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.tilt = Math.floor(Math.random() * 10) - 10;
    this.tiltAngleInc = (Math.random() * 0.07) + 0.05;
    this.tiltAngle = 0;
    
    // Options
    this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
  }
  
  update() {
    this.tiltAngle += this.tiltAngleInc;
    this.y += (Math.cos(this.tiltAngle) + 1 + this.r / 2) / 2 + this.dy;
    this.x += Math.sin(this.tiltAngle) * 2 + this.dx;
    
    // Friction & Gravity (if burst)
    if (this.dy < 15) this.dy += 0.3; // Gravity
    this.dx *= 0.99; // Air resistance
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.r;
    ctx.strokeStyle = this.color;
    
    const x = this.x + this.tilt;
    if (this.shape === 'circle') {
      ctx.arc(x, this.y, this.r / 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.moveTo(this.x + this.tilt + this.r, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r);
      ctx.stroke();
    }
  }
}

function loop() {
  if (!_isRunning) return;
  
  _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
  
  // Update & Draw
  let activeParticles = 0;
  for (let i = 0; i < _particles.length; i++) {
    const p = _particles[i];
    p.update();
    p.draw(_ctx);
    
    if (p.y < _canvas.height) {
      activeParticles++;
    }
  }
  
  // Stop if all particles are off-screen
  if (activeParticles === 0) {
    stop();
  } else {
    _animationId = requestAnimationFrame(loop);
  }
}

function start() {
  if (!_isRunning) {
    initCanvas();
    _isRunning = true;
    loop();
  }
}

function stop() {
  _isRunning = false;
  if (_animationId) cancelAnimationFrame(_animationId);
  if (_ctx && _canvas) _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
  _particles = [];
}

// ============================================
// PUBLIC API
// ============================================

export const Confetti = {
  /**
   * Fire a burst of confetti from a specific point
   */
  burst(x, y, count = 100) {
    initCanvas();
    const cx = x || window.innerWidth / 2;
    const cy = y || window.innerHeight / 2;
    
    for (let i = 0; i < count; i++) {
      _particles.push(new Particle(cx, cy, true));
    }
    start();
  },
  
  /**
   * Continuous stream from top of screen
   */
  stream(durationMs = 3000, density = 50) {
    initCanvas();
    let elapsed = 0;
    const interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        _particles.push(new Particle(Math.random() * window.innerWidth, -20, false));
      }
      elapsed += 50;
      if (elapsed >= durationMs) {
        clearInterval(interval);
      }
    }, 50);
    
    start();
  },
  
  stop
};

export default Confetti;
