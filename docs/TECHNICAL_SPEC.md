# MEUW ACADEMY — TECHNICAL SPECIFICATION v1.0

## STACK & ARCHITECTURE

### Technology Choices
```
Language:    Vanilla JS (ES2020+, no transpilation needed for target browsers)
Styling:     Pure CSS (CSS Variables, Flexbox, Grid)
Fonts:       Google Fonts (Fredoka One + Nunito) — preconnect for speed
Icons:       Inline SVG only
Assets:      SVG only (no PNG/JPG — keeps bundle tiny, scales perfectly)
Audio:       Web Audio API (zero external files)
Speech:      Web Speech API (Chrome only, text fallback on others)
Storage:     localStorage (primary), with JSON export/import
Deploy:      GitHub Pages + Vercel (static, no server)
```

### File Structure (Complete)
```
meuw-academy/
├── index.html                     # Shell, SPA routing anchor
├── manifest.json                  # PWA manifest
├── sw.js                         # Service Worker (offline)
├── css/
│   ├── base.css                  # Reset, CSS variables, typography
│   ├── components.css            # Reusable UI components
│   ├── animations.css            # All @keyframes definitions
│   ├── mascot.css               # Mascot states and animations
│   ├── question-types.css       # Question type specific styles
│   └── responsive.css           # Breakpoints: tablet, mobile
├── js/
│   ├── app.js                   # Main entry point, router, init
│   ├── state.js                 # State management (localStorage)
│   ├── router.js                # SPA router (hash-based)
│   ├── mascot.js                # Mascot animation controller
│   ├── audio.js                 # Web Audio API sound engine
│   ├── speech.js                # Speech Recognition wrapper + fallback
│   ├── confetti.js              # Particle celebration system
│   └── utils.js                 # Helpers: date, math, strings
├── modules/
│   ├── dashboard.js             # Home screen renderer
│   ├── session.js               # Morning/afternoon session view
│   ├── lesson.js                # Lesson + question orchestrator
│   ├── question-types/
│   │   ├── MultipleChoice.js    # Type 1: MC with illustration
│   │   ├── FillBlank.js         # Type 2: Fill in blank
│   │   ├── DragMatch.js         # Type 3: Drag & drop matching
│   │   ├── InteractiveSVG.js    # Type 4: Interactive SVG exercises
│   │   ├── SpeechPractice.js    # Type 5: Speech / text input
│   │   ├── DrawingCanvas.js     # Type 6: Full drawing tool
│   │   ├── ColorFill.js         # Type 7: Color-by-number fill
│   │   └── MiniQuiz.js          # Type 8: End-of-day quiz
│   ├── profile.js               # Multi-profile selector
│   └── parent.js                # Parent dashboard (PIN protected)
├── data/
│   ├── curriculum-m1.js         # Month 1: Animal Kingdom (Days 1–28)
│   ├── curriculum-m2.js         # Month 2: Earth & Nature (Days 29–56)
│   ├── curriculum-m3.js         # Month 3: Science & Invention (Days 57–84)
│   └── curriculum-bonus.js      # Review days, special events
└── assets/
    ├── mascot/
    │   ├── meow-idle.svg
    │   ├── meow-happy.svg
    │   ├── meow-excited.svg
    │   ├── meow-encouraging.svg
    │   ├── meow-thinking.svg
    │   ├── meow-reading.svg
    │   ├── meow-drawing.svg
    │   ├── meow-sleeping.svg
    │   └── meow-celebrating.svg
    ├── icons/
    │   ├── math.svg, english.svg, science.svg
    │   ├── reading.svg, drawing.svg, quiz.svg
    │   └── badge-*.svg (28 badges)
    └── illustrations/
        └── [lesson-specific SVGs, named by day-subject]
```

---

## STATE MANAGEMENT

### localStorage Schema
```javascript
// Key: `meuwAcademy_v2`
{
  "version": 2,
  "activeProfile": "profile_001",
  "profiles": {
    "profile_001": {
      "id": "profile_001",
      "name": "Meuw",
      "avatarColor": "#EC4899",
      "createdAt": "2025-06-01",
      "currentDay": 1,
      "currentWeek": 1,
      "xpToday": 0,
      "xpTotal": 0,
      "streak": 0,
      "lastPlayDate": null,
      "streakShieldsRemaining": 3,
      "completedModules": {
        // "d1_m1-math": { xp, score, total, timeMs, completedAt }
      },
      "earnedBadges": [],
      "gallery": [
        // { src: "data:image/jpeg;base64,...", day, title, savedAt }
      ],
      "settings": {
        "parentPin": "1234",
        "soundOn": true,
        "speechEnabled": true,
        "breakReminderMins": 45,
        "theme": "default"
      },
      "stats": {
        "totalTimeMs": 0,
        "longestStreakEver": 0,
        "mathModulesCompleted": 0,
        "engModulesCompleted": 0,
        "sciModulesCompleted": 0,
        "drawingsCreated": 0,
        "speechSubmitted": 0
      }
    }
  }
}
```

### State API (state.js)
```javascript
const State = {
  // Core getters
  getProfile(profileId),
  getActiveProfile(),
  getCurrentDay(),
  
  // Module tracking
  markModuleComplete(moduleId, { score, total, timeMs }),
  isModuleComplete(moduleId),
  
  // XP system
  addXP(amount),
  getXPToday(),
  
  // Streak
  updateStreak(),
  useStreakShield(),
  
  // Gallery
  saveDrawing({ src, day, title }),
  getGallery(),
  
  // Badges
  checkAndAwardBadges(),
  hasBadge(badgeId),
  
  // Settings
  getSetting(key),
  setSetting(key, value),
  
  // Import/Export
  exportJSON(),
  importJSON(jsonString),
  
  // Profile management
  createProfile({ name, avatarColor }),
  switchProfile(profileId),
  listProfiles(),
};
```

---

## ROUTING (router.js)

Hash-based SPA routing. No server needed.

```javascript
// Routes:
//   #/              → Dashboard
//   #/session/am    → Morning session list
//   #/session/pm    → Afternoon session list
//   #/lesson/{dayId}/{moduleId}  → Lesson player
//   #/gallery       → Drawing gallery
//   #/badges        → Badge collection
//   #/profile       → Profile selector
//   #/parent        → Parent dashboard (PIN required)

const Router = {
  navigate(route),       // Push to history
  replace(route),        // Replace (no back)
  back(),
  onRoute(route, handler), // Register handler
  currentRoute(),
};
```

---

## CURRICULUM DATA FORMAT

### Module Structure
```javascript
// Each module in curriculum data:
{
  id: "d1_m1-math",          // day{N}_module-subject
  day: 1,
  session: "am",             // "am" | "pm"
  subject: "math",           // math | english | science | reading | drawing | quiz
  title: "Số tự nhiên lớn trong tự nhiên",
  xpMax: 50,
  duration: 15,              // estimated minutes
  
  lesson: {
    intro: {
      type: "illustration",  // illustration | story | interactive
      svgKey: "d1-savanna",  // maps to assets/illustrations/
      text: "Có 1.400.000 con voi châu Phi...",
      interactiveConfig: {}  // optional
    }
  },
  
  questions: [
    {
      id: "d1_m1-math_q1",
      type: "multiple-choice", // See 8 types below
      xp: 10,
      // ... type-specific fields
    }
  ],
  
  mascotLines: {
    intro: "Hôm nay mình học về số khổng lồ! 🐘",
    correct: ["Xuất sắc! 🌟", "Đỉnh quá! 🔥", "Meuw cũng không nghĩ ra đâu! 😸"],
    wrong: ["Ủa? Thử lại nhé! 💪", "Sắp đúng rồi! 🤏", "Đọc lại đề một lần nữa nhé!"],
    complete: "Tuyệt vời! Module hoàn thành! 🎉",
  }
}
```

### Question Type Schemas

**Type 1: Multiple Choice**
```javascript
{
  type: "multiple-choice",
  xp: 10,
  svgKey: "d1-africa-map",      // optional illustration
  question: "Số 1.400.000 đọc là gì?",
  options: [
    "Một trăm bốn mươi nghìn",
    "Một triệu bốn trăm nghìn",  // correct
    "Mười bốn triệu",
    "Một nghìn bốn trăm"
  ],
  correctIndex: 1,
  explanation: "1.400.000 = 1 triệu + 4 trăm nghìn. Đọc từ trái sang phải!"
}
```

**Type 2: Fill in Blank**
```javascript
{
  type: "fill-blank",
  xp: 15,
  svgKey: "d1-lion-prides",
  question: "3 đàn sư tử: 12, 9, và 15 con. Tổng cộng ___ con. Mỗi con cần 5kg thịt/ngày → cần ___ kg/ngày",
  blanks: [
    { label: "Tổng số sư tử", answer: 36, unit: "con", tolerance: 0 },
    { label: "Tổng thịt cần", answer: 180, unit: "kg/ngày", tolerance: 0 }
  ],
  hint: "Cộng 3 đàn lại trước, rồi nhân với 5!",
  hintXPCost: 5
}
```

**Type 3: Drag Match**
```javascript
{
  type: "drag-match",
  xp: 15,
  title: "Nối từ tiếng Anh với nghĩa tiếng Việt",
  pairs: [
    { left: "elephant 🐘", right: "con voi" },
    { left: "crocodile 🐊", right: "cá sấu" },
    { left: "penguin 🐧", right: "chim cánh cụt" },
    { left: "flamingo 🦩", right: "hồng hạc" }
  ]
}
```

**Type 4: Interactive SVG**
```javascript
{
  type: "interactive-svg",
  xp: 20,
  svgKey: "d1-food-chain",
  interactionType: "click-remove", // click-remove | drag-handles | color-fill | slider
  question: "Click xóa ếch. Điều gì xảy ra với chuỗi thức ăn?",
  interactions: [
    {
      elementId: "frog",
      action: "click-remove",
      effects: [
        { elementId: "grasshopper", effect: "multiply", factor: 2 },
        { elementId: "snake", effect: "shrink", factor: 0.5 }
      ]
    }
  ],
  followUpQuestion: {
    type: "multiple-choice",
    question: "Khi ếch biến mất, điều gì xảy ra với châu chấu?",
    options: ["Giảm", "Tăng mạnh", "Không đổi", "Biến mất luôn"],
    correctIndex: 1,
    explanation: "Không có kẻ thù → châu chấu sinh sôi mất kiểm soát!"
  }
}
```

**Type 5: Speech Practice**
```javascript
{
  type: "speech",
  xp: 15,
  prompt: "Describe this elephant in English! Say at least 2 sentences.",
  svgKey: "d1-elephant-close",
  sampleAnswer: "An elephant is a very large animal. It has a long trunk, big ears, and four strong legs.",
  minWords: 5,
  language: "en-US",   // "en-US" | "vi-VN"
  fallbackEnabled: true  // always true — text textarea as fallback
}
```

**Type 6: Drawing Canvas**
```javascript
{
  type: "drawing",
  xp: 30,
  title: "Vẽ chân dung sư tử",
  referenceKey: "ref-lion",   // SVG to show as overlay
  steps: [
    { stepNum: 1, instruction: "Vẽ hình tròn lớn cho đầu", thumbnailKey: "lion-step1" },
    { stepNum: 2, instruction: "Vẽ bờm xung quanh", thumbnailKey: "lion-step2" },
    { stepNum: 3, instruction: "Thêm mắt, mũi, miệng", thumbnailKey: "lion-step3" },
    { stepNum: 4, instruction: "Vẽ thân và chân", thumbnailKey: "lion-step4" },
    { stepNum: 5, instruction: "Tô màu theo ý thích!", thumbnailKey: "lion-step5" },
  ],
  palette: ["#F59E0B", "#D97706", "#92400E", "#FDE68A", "#1F2937", "#EC4899", "#FFFFFF"],
  challenge: "Thử vẽ sư tử đang đội vương miện! 👑",
  saveToGallery: true
}
```

**Type 7: Color Fill**
```javascript
{
  type: "color-fill",
  xp: 20,
  title: "Tô màu cánh bướm",
  svgKey: "outline-butterfly",
  character: "butterfly",
  regions: [
    { id: "wing-top-left", label: "Cánh trên trái", suggestedColor: "#8B5CF6" },
    { id: "wing-top-right", label: "Cánh trên phải", suggestedColor: "#8B5CF6" },
    { id: "body", label: "Thân", suggestedColor: "#1F2937" },
    { id: "antenna", label: "Râu", suggestedColor: "#374151" }
  ],
  palette: ["#EF4444","#F59E0B","#10B981","#3B82F6","#8B5CF6","#EC4899","#1F2937","#FFFFFF"],
  freeColoring: true,  // can use any color, not just suggested
  saveToGallery: true
}
```

**Type 8: Mini Quiz**
```javascript
{
  type: "mini-quiz",
  xp: 40,
  title: "⚡ Quiz tổng kết Ngày 1",
  timeLimit: null,       // no timer — stress free
  questions: [
    // Array of 4-6 questions from types 1-3
  ],
  endScreenMessages: {
    perfect: "Meuw hoàn hảo! 🌟 Em là thiên tài!",
    good: "Tuyệt vời! Gần hoàn hảo rồi! 🔥",
    ok: "Cố lên! Ôn lại nhé, ngày mai sẽ tốt hơn! 💪"
  }
}
```

---

## MASCOT SYSTEM (mascot.js)

### SVG Architecture
Each mascot SVG has semantic IDs for JS animation control:
```svg
<svg id="mascot" class="mascot mascot-idle" viewBox="0 0 120 140">
  <g id="mascot-body">
    <g id="mascot-tail"><path id="tail-curve" .../></g>
    <g id="mascot-torso"><ellipse id="torso-shape" .../></g>
    <g id="mascot-head">
      <circle id="head-base" .../>
      <g id="mascot-face">
        <circle id="eye-left" .../>
        <circle id="eye-right" .../>
        <ellipse id="nose" .../>
        <path id="mouth" .../>
        <g id="whiskers">...</g>
      </g>
      <g id="mascot-ears">
        <polygon id="ear-left" .../>
        <polygon id="ear-right" .../>
      </g>
    </g>
    <g id="mascot-paws">
      <ellipse id="paw-left" .../>
      <ellipse id="paw-right" .../>
    </g>
  </g>
  <!-- Accessories (shown/hidden per state) -->
  <g id="acc-glasses" style="display:none">...</g>  <!-- reading state -->
  <g id="acc-beret" style="display:none">...</g>    <!-- drawing state -->
  <g id="acc-zzz" style="display:none">...</g>      <!-- sleeping state -->
</svg>
```

### State Machine
```javascript
class MascotController {
  states = ['idle','happy','excited','encouraging','thinking',
            'reading','drawing','sleeping','celebrating'];
  
  // Map events to states
  eventMap = {
    'answer:correct':   { state: 'happy',       duration: 1500 },
    'answer:wrong':     { state: 'encouraging', duration: 1500 },
    'module:complete':  { state: 'celebrating', duration: 3000 },
    'lesson:start':     { state: 'thinking',    duration: 800  },
    'module:drawing':   { state: 'drawing',     duration: null },
    'module:reading':   { state: 'reading',     duration: null },
    'streak:break':     { state: 'sleeping',    duration: null },
    'badge:earned':     { state: 'celebrating', duration: 3000 },
  };
  
  setState(state, duration)
  react(event)               // Consult eventMap
  say(message)               // Show speech bubble
  clearSpeech()
}
```

### Speech Bubbles
Meuw's dialogue lines (per module in curriculum data):
- `intro`: greeting at lesson start
- `correct[]`: random pick on correct answer (≥3 variations)
- `wrong[]`: random pick on wrong answer (≥3 variations, never repeat consecutive)
- `hint`: when hint is requested
- `complete`: module completion message

---

## AUDIO SYSTEM (audio.js)

All sounds synthesized via Web Audio API — no files to load.

```javascript
const AudioFX = {
  correct:  () => chord([523, 659, 784], 0.15),      // C-E-G upward
  wrong:    () => descend([400, 300], 0.2),            // soft drop
  complete: () => fanfare([523, 659, 784, 1047], 0.1),// scale up
  click:    () => blip(800, 0.05),                    // short UI blip
  badge:    () => fanfare([784,1047,1319,1568], 0.1), // triumphant
  streak:   () => chord([659, 784, 1047], 0.12),      // warm chord
  confetti: () => blip(1200, 0.03),                   // sparkle
};

// Respect user settings: AudioFX only fires if state.getSetting('soundOn')
```

---

## DRAWING CANVAS SYSTEM (DrawingCanvas.js)

### Canvas Features
```javascript
class DrawingCanvas {
  // State
  isDrawing = false;
  currentTool = 'pen';    // 'pen' | 'eraser'
  currentColor = '#1F2937';
  brushSize = 4;
  undoStack = [];          // max 20 levels
  redoStack = [];
  
  // Reference overlay
  referenceOpacity = 0;   // 0 = hidden, 0.4 = default when toggled
  referenceImage = null;  // SVG as Image element
  
  // Methods
  init(canvasEl, width, height)
  setTool(tool)
  setColor(hex)
  setBrushSize(px)
  undo()
  redo()
  clear()
  toggleReference()
  saveAsDataURL()         // JPEG 0.7 quality for storage
  saveToGallery(title)
  
  // Touch support
  // Uses pointer events for unified mouse/touch/stylus handling
}
```

### Responsive Canvas Sizing
```javascript
// Laptop: 600×450px canvas
// iPad: 500×375px canvas  
// Mobile: 320×240px (simplified toolbar)
```

---

## CONFETTI SYSTEM (confetti.js)

```javascript
class ConfettiSystem {
  // Canvas overlay, z-index: 9999
  // Particle physics: gravity + wind
  
  burst(options = {}) {
    // options: { count, colors, origin, duration }
    // Default: 80 particles, meow palette colors, center-top, 3s
  }
  
  streamFrom(x, y, durationMs) {
    // Continuous stream for celebrations
  }
  
  stop()
}

// Color palette for confetti:
const MEOW_CONFETTI = ['#7C3AED','#EC4899','#F59E0B','#10B981','#3B82F6','#EF4444','#FBBF24'];
```

---

## PARENT DASHBOARD (parent.js)

### PIN Flow
1. Click "Phụ huynh" → PIN modal appears
2. Enter 4-digit PIN → validates against `state.getSetting('parentPin')`
3. Success → render dashboard; Fail (3 attempts) → lock 5 minutes

### Dashboard Tabs

**Tab 1: Hôm nay**
- Study time (formatted: "1 giờ 23 phút")
- Modules completed vs total
- XP earned
- Per-subject performance bars
- Meuw mood indicator (based on session quality)

**Tab 2: Lịch sử**
- Monthly calendar (green = full day, yellow = partial, empty = skipped)
- Weekly XP line chart (SVG, no library)
- Badge timeline
- Gallery thumbnail strip

**Tab 3: Cài đặt**
- PIN change form
- Toggle: sound, speech recognition, break reminder
- Adjust current day (for catch-up or advance)
- Session time blocks (optional lock)
- Export report button (JSON)
- Import/restore button

---

## PERFORMANCE OPTIMIZATIONS

### Lazy Loading
```javascript
// Only load current day + 2 days ahead
// curriculum-m1.js exports: getDayData(dayNum)
// On day 5, loads days 5, 6, 7 only

async function loadDayData(dayNum) {
  const module = dayNum <= 28 ? 'm1' : dayNum <= 56 ? 'm2' : 'm3';
  const { getDayData } = await import(`./data/curriculum-${module}.js`);
  return getDayData(dayNum);
}
```

### SVG Sprite Strategy
- Each SVG stored inline in JS curriculum data as template strings
- No external SVG fetch requests
- SVGs < 3KB each, compressed with careful path optimization

### LocalStorage Limits
- Gallery images compressed to JPEG 0.7 quality before save
- Maximum 50 gallery images (oldest overwritten with warning)
- Curriculum data: not stored, generated on the fly

---

## OFFLINE / PWA (sw.js)

```javascript
// Cache strategy:
// - App shell (HTML, CSS, JS): Cache First
// - Google Fonts: Cache First (after first load)
// - Curriculum data: Cache on first access
// - Gallery images: LocalStorage (separate)

const CACHE_VERSION = 'meuw-v1';
const APP_SHELL = ['/', '/index.html', '/css/', '/js/', '/assets/'];
```

---

## DEPLOYMENT

### GitHub Setup
```bash
# Repo: meuw-academy (public)
# Structure: all files at root (no build step needed)
git init
git remote add origin https://github.com/{user}/meuw-academy.git
git add .
git commit -m "feat: initial Meuw Academy app"
git push -u origin main
```

### Vercel Config
```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" }
      ]
    }
  ]
}
```

### GitHub Actions (optional CI)
```yaml
# .github/workflows/deploy.yml
# Lint HTML, validate JSON curriculum, check file sizes
# Auto-deploy preview on PR, production on main push
```

---

## TESTING CHECKLIST

### Per Question Type
- [ ] Renders correctly on Chrome desktop
- [ ] Touch events work on iPad (pointer events)
- [ ] Keyboard navigation (Tab, Enter, Arrow keys)
- [ ] Screen reader accessible (ARIA labels)
- [ ] Correct XP awarded
- [ ] Mascot reacts appropriately
- [ ] Sound plays (when enabled)
- [ ] State saved to localStorage

### Per Day Release
- [ ] All 6-8 modules load without error
- [ ] Day can be completed start-to-finish
- [ ] XP correctly tallied
- [ ] Badge awarded if applicable
- [ ] Progress saved across page refresh

### Full App
- [ ] Works offline after first load
- [ ] Parent PIN works
- [ ] Gallery saves and loads
- [ ] Streak logic correct
- [ ] Profile switching works
- [ ] Export/import JSON round-trip
