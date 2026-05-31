# MEUW ACADEMY — BUILD PLAN & EXECUTION ORDER

## GOAL
Build Méo Academy as a complete, deployable web app that passes the `/goal` instruction: fully functional, all 84 days of content, beautiful UI, deploy to GitHub + Vercel.

---

## PHASE 0: SETUP (Day 0)

### 0.1 Project initialization
- [ ] Init git repo: `méo-academy`
- [ ] Create `.gitignore`
- [ ] Create `README.md` with setup instructions
- [ ] Create `vercel.json` for SPA routing

### 0.2 Base HTML shell
- [ ] `index.html` — SPA shell, viewport meta, font preloads, PWA meta
- [ ] `manifest.json` — PWA manifest with app name, icons, colors

### 0.3 CSS foundation
- [ ] `css/base.css` — CSS reset, all variables from DESIGN_SYSTEM.md
- [ ] `css/animations.css` — All @keyframes from DESIGN_SYSTEM.md
- [ ] `css/components.css` — All reusable UI components
- [ ] `css/mascot.css` — Mascot states and transitions
- [ ] `css/question-types.css` — Question-specific styles
- [ ] `css/responsive.css` — Breakpoints (mobile/tablet/desktop)

---

## PHASE 1: CORE SYSTEMS (Days 1–3)

### 1.1 State Management (`js/state.js`)
- [ ] LocalStorage read/write with schema from TECHNICAL_SPEC.md
- [ ] Multi-profile CRUD (create, read, switch, list)
- [ ] XP system (add, calculate, level check)
- [ ] Streak logic (update daily, shield usage)
- [ ] Badge checking system
- [ ] Gallery management (save, load, limit 50)
- [ ] Export/import JSON
- [ ] Settings management

### 1.2 Router (`js/router.js`)
- [ ] Hash-based SPA routing
- [ ] Route registration: dashboard, session, lesson, gallery, badges, profile, parent
- [ ] History management (back button works)
- [ ] Route guards (parent PIN check)
- [ ] Transition animations between routes

### 1.3 Utilities (`js/utils.js`)
- [ ] Date formatting (Vietnamese: "thứ Hai, 15 tháng 6")
- [ ] Number formatting (1.400.000 style)
- [ ] Random pick from array (for mascot dialogue)
- [ ] Shuffle array (for quiz options)
- [ ] Time elapsed calculator
- [ ] Deep clone object

---

## PHASE 2: MASCOT & AUDIO (Days 2–4)

### 2.1 Mascot SVGs (`assets/mascot/`)
Create 9 SVG files (each ~2KB):
- [ ] `méo-idle.svg` — tail sway + blink animation
- [ ] `méo-happy.svg` — jump animation
- [ ] `méo-excited.svg` — spin + scale
- [ ] `méo-encouraging.svg` — head shake
- [ ] `méo-thinking.svg` — float + thinking dots
- [ ] `méo-reading.svg` — glasses + book accessory
- [ ] `méo-drawing.svg` — beret + pencil accessory
- [ ] `méo-sleeping.svg` — ZZZ animation
- [ ] `méo-celebrating.svg` — confetti burst

### 2.2 Mascot Controller (`js/mascot.js`)
- [ ] State machine (9 states)
- [ ] `setState(state, duration)` method
- [ ] `react(event)` method with event map
- [ ] `say(message, duration)` method for speech bubbles
- [ ] Auto-return to idle after timed states
- [ ] Event listener: `mascot` CustomEvent

### 2.3 Audio Engine (`js/audio.js`)
- [ ] Web Audio API context management (lazy init on first user gesture)
- [ ] All 6 sound effects: correct, wrong, complete, click, badge, streak
- [ ] Volume control
- [ ] Sound on/off toggle respecting settings
- [ ] Safari audio context resume

### 2.4 Confetti System (`js/confetti.js`)
- [ ] Canvas overlay creation
- [ ] Particle physics (gravity, wind, spin)
- [ ] `burst(options)` method
- [ ] `streamFrom(x, y, duration)` method
- [ ] `stop()` cleanup method
- [ ] Performance: requestAnimationFrame, cleanup when off-screen

---

## PHASE 3: QUESTION TYPES (Days 4–8)

Build each question type as standalone JS module. Each must:
- Accept the schema from TECHNICAL_SPEC.md
- Dispatch `mascot` CustomEvent on answer
- Dispatch `xp:add` CustomEvent with amount
- Call callback on complete

### 3.1 MultipleChoice (`modules/question-types/MultipleChoice.js`)
- [ ] 4-option grid layout (2×2 on mobile, 2×2 on tablet, 1×4 on desktop question column)
- [ ] SVG illustration area (from inline SVG string or svgKey lookup)
- [ ] Click → highlight selected
- [ ] Submit → correct/wrong feedback (sound + mascot + animation)
- [ ] Explanation box slide-down on wrong
- [ ] Next button reveal
- [ ] XP flash animation on correct

### 3.2 FillBlank (`modules/question-types/FillBlank.js`)
- [ ] Multi-blank support (1–3 blanks)
- [ ] Number input with appropriate keyboard type
- [ ] Field-by-field validation
- [ ] Hint button (-5 XP from bonus)
- [ ] Correct field: green border
- [ ] Wrong field: red + shake + reveal correct after 2 tries
- [ ] Numeric tolerance option (for decimal answers)

### 3.3 DragMatch (`modules/question-types/DragMatch.js`)
- [ ] 2-column layout (left: drag source, right: drop target)
- [ ] HTML5 Drag & Drop API
- [ ] Touch fallback: tap-to-select + tap-to-match
- [ ] Drop zone highlight on drag-over
- [ ] Match correct: both cards turn green + lock
- [ ] Match wrong: cards shake + return to origin
- [ ] Complete all → celebration

### 3.4 InteractiveSVG (`modules/question-types/InteractiveSVG.js`)
- [ ] SVG injection into DOM
- [ ] Event binding by `data-action` attribute
- [ ] Action types: click-remove, click-toggle, slider-change
- [ ] Effect types: multiply-icon, shrink, grow, color-change, fade
- [ ] Optional follow-up question after interaction
- [ ] Reset button to try again

### 3.5 SpeechPractice (`modules/question-types/SpeechPractice.js`)
- [ ] Web Speech API wrapper (Chrome only)
- [ ] Record button with pulse animation
- [ ] Real-time transcript display
- [ ] Word count tracker
- [ ] Minimum word threshold
- [ ] Text textarea fallback (always available)
- [ ] Submit grants XP regardless of content (encourage participation)
- [ ] Language: en-US | vi-VN switching

### 3.6 DrawingCanvas (`modules/question-types/DrawingCanvas.js`)
- [ ] HTML5 Canvas with pointer events (mouse + touch + stylus)
- [ ] Tool: pen (pressure-sensitive width on stylus if available)
- [ ] Tool: eraser
- [ ] Color picker: 12 swatches + custom color input
- [ ] Brush size slider (3 sizes: thin/medium/thick)
- [ ] Undo/redo stack (20 levels)
- [ ] Clear button (with confirmation)
- [ ] Reference SVG overlay toggle (40% opacity)
- [ ] Step-by-step guide panel (collapsible)
- [ ] Save to gallery: compress JPEG 0.7, save to localStorage
- [ ] Responsive canvas sizing (600×450 desktop, 500×375 tablet)

### 3.7 ColorFill (`modules/question-types/ColorFill.js`)
- [ ] SVG outline injection
- [ ] Click region detection by `data-region` attribute
- [ ] Fill SVG paths with selected palette color
- [ ] Suggested color validation (glow effect if matching)
- [ ] Méo claps when region matches suggested color
- [ ] Free coloring mode (no validation)
- [ ] 12-color palette (configurable per exercise)
- [ ] Undo last fill
- [ ] Save to gallery

### 3.8 MiniQuiz (`modules/question-types/MiniQuiz.js`)
- [ ] Question array renderer (using MC and other types)
- [ ] Progress counter "1 / 4"
- [ ] No time limit (stress-free)
- [ ] Score tracking
- [ ] End screen: score-dependent mascot reaction + message
- [ ] Review wrong answers (show correct answer + explanation)
- [ ] XP calculation: per-correct + completion bonus

---

## PHASE 4: MODULE SCREENS (Days 8–12)

### 4.1 Dashboard (`modules/dashboard.js`)
- [ ] Header: logo, streak badge, settings button
- [ ] Hero: mascot (idle, animated) + greeting + day info
- [ ] XP progress bar with level display
- [ ] Morning session card list (6–8 modules with status)
- [ ] Afternoon session card list (4–6 modules with status)
- [ ] Continue button (jump to first incomplete module)
- [ ] Badges preview strip
- [ ] Gallery preview strip
- [ ] Daily XP target progress
- [ ] Break reminder toast (after 45 minutes)

### 4.2 Session View (`modules/session.js`)
- [ ] Module list for AM or PM
- [ ] Status indicators: ✓ complete, ▶ current, ○ locked (if sequential)
- [ ] Module card with: icon, title, XP value, estimated time
- [ ] Click → navigate to lesson
- [ ] Back button to dashboard

### 4.3 Lesson Orchestrator (`modules/lesson.js`)
- [ ] Load day+module data from curriculum
- [ ] Intro screen: mascot + lesson title + first illustration + Méo's greeting
- [ ] Question sequence renderer (delegates to question type modules)
- [ ] XP tracking per question
- [ ] Progress dots/counter
- [ ] Completion screen: XP earned + confetti + badge check
- [ ] Navigation: back (with confirmation if in progress)
- [ ] Auto-save progress to state on each question

### 4.4 Profile Selector (`modules/profile.js`)
- [ ] List existing profiles (avatar circle with initials/color)
- [ ] Select profile → switch active profile
- [ ] Create new profile form (name + color picker)
- [ ] Delete profile (with PIN confirmation)
- [ ] Max 5 profiles

### 4.5 Parent Dashboard (`modules/parent.js`)
- [ ] PIN entry modal (4-digit, 3 attempts, 5-min lock)
- [ ] Tab 1: Today's stats (time, modules, XP, subject breakdown)
- [ ] Tab 2: History (calendar view, XP chart, badges, gallery)
- [ ] Tab 3: Settings (all settings from TECHNICAL_SPEC.md)
- [ ] SVG charts (bar chart, line chart — no libraries)
- [ ] Calendar heat map (green/yellow/empty days)
- [ ] Export JSON button
- [ ] Import JSON button (with validation)

### 4.6 Gallery (`modules/gallery.js`)
- [ ] Grid of saved drawings
- [ ] Lightbox: click to view full size
- [ ] Drawing title + day label
- [ ] Delete drawing (with confirmation)
- [ ] Share: native share API or download as PNG

### 4.7 Badge Collection (`modules/badges.js`)
- [ ] Grid of all 28 badges
- [ ] Earned: full color + unlock date
- [ ] Locked: grayscale + condition text
- [ ] Badge detail modal: description + how to earn

---

## PHASE 5: CURRICULUM DATA (Days 12–20)

### 5.1 Month 1 Data (`data/curriculum-m1.js`)
Build detailed data for all 28 days:
- [ ] Days 1–7: Wild Africa (from MEUW_ACADEMY_SPEC.md + CURRICULUM_84_DAYS.md)
- [ ] Days 8–14: Ocean & Sea creatures
- [ ] Days 15–21: Rainforest & Insects
- [ ] Days 22–28: Review + Project + Festival
- Each day: 6–8 modules, each with full question arrays
- All SVG illustrations as inline strings

### 5.2 Month 2 Data (`data/curriculum-m2.js`)
- [ ] Days 29–35: Volcanoes & Geology
- [ ] Days 36–42: Weather & Climate
- [ ] Days 43–49: Rivers & Water
- [ ] Days 50–56: Review + Vietnam map project + Festival

### 5.3 Month 3 Data (`data/curriculum-m3.js`)
- [ ] Days 57–63: Light & Color
- [ ] Days 64–70: Forces & Motion
- [ ] Days 71–77: Electricity & Technology
- [ ] Days 78–84: Olympics + Graduation book + Ceremony

### 5.4 SVG Illustrations (`assets/illustrations/`)
Create inline SVG for each major lesson:
- [ ] 20+ unique SVG scenes (reused across days)
- [ ] Africa savanna, food chain, ocean zones, butterfly, volcano, etc.
- [ ] Interactive SVG variants (with data-action attributes)
- [ ] Color outline SVGs for ColorFill exercises (10+)
- [ ] Reference SVGs for drawing steps (15+ animals/objects)

---

## PHASE 6: GAMIFICATION (Days 18–20)

### 6.1 Badge System
- [ ] Badge definitions: all 28 badges with conditions
- [ ] Badge check runs after each module completion
- [ ] Badge award screen (zoom + sound + mascot celebrating)
- [ ] Badge unlock notification (toast, non-blocking)

### 6.2 XP Level System
- [ ] Level thresholds: 5 levels from CONSTITUTION.md
- [ ] Level-up celebration (confetti burst + Méo excited)
- [ ] Level indicator in dashboard

### 6.3 Streak System
- [ ] Daily streak update on first module completion
- [ ] Streak shield usage (3 per month)
- [ ] Streak display in header
- [ ] Streak milestone badges (3, 7, 14, 30 days)

### 6.4 Adventure Mode (Day 5 weekly)
- [ ] Map view with 5 stops
- [ ] Méo walking animation between stops
- [ ] Boss battle (multi-step question)
- [ ] Victory screen: weekly badge

---

## PHASE 7: POLISH & PWA (Days 20–22)

### 7.1 Service Worker (`sw.js`)
- [ ] Cache first strategy for app shell
- [ ] Cache on access for curriculum data
- [ ] Offline fallback page
- [ ] Update notification (new version available)

### 7.2 PWA Setup
- [ ] `manifest.json` with all required fields
- [ ] App icons (generated SVG-based, multiple sizes)
- [ ] Theme color: #7C3AED (purple)
- [ ] Install prompt handling

### 7.3 Performance
- [ ] Lazy load curriculum modules (only current day + 2 ahead)
- [ ] Compress gallery images (JPEG 0.7)
- [ ] CSS will-change for animated elements
- [ ] `requestAnimationFrame` for confetti
- [ ] Defer non-critical scripts

### 7.4 Final Polish
- [ ] Loading skeleton screens
- [ ] Error boundaries (friendly error messages)
- [ ] Empty states (no gallery items, no badges yet)
- [ ] Print stylesheet for diploma
- [ ] Favicon using Méo icon

---

## PHASE 8: DEPLOY (Day 22–23)

### 8.1 GitHub
- [ ] Create public repo: `méo-academy`
- [ ] Push all code
- [ ] Create GitHub Actions workflow (optional: check HTML validity)
- [ ] Set up GitHub Pages (optional backup)
- [ ] README with: demo link, screenshots, features list, local setup

### 8.2 Vercel
- [ ] Connect GitHub repo to Vercel
- [ ] Configure `vercel.json` (SPA routing rewrites)
- [ ] Set production domain: `méo-academy.vercel.app`
- [ ] Test full app on production URL

### 8.3 Cross-device Testing
- [ ] Chrome desktop (primary)
- [ ] Chrome on Android
- [ ] Chrome on iPad
- [ ] Safari iOS (speech API fallback check)
- [ ] Firefox (speech API fallback check)

---

## VERIFICATION CHECKLIST

### Day 1 Full Playthrough Test
- [ ] Start fresh (clear localStorage)
- [ ] Complete all 8 modules of Day 1
- [ ] Verify XP correctly tallied (~370 XP)
- [ ] Verify badge "Ngày đầu tiên" awarded
- [ ] Gallery drawing saved correctly
- [ ] Refresh page → progress preserved
- [ ] Parent PIN entry works
- [ ] Audio plays (correct/wrong/complete)
- [ ] Mascot transitions correctly

### Week 1 Test
- [ ] Days 1–7 accessible and completable
- [ ] Streak increments daily
- [ ] Weekly badge awarded on Day 7
- [ ] Gallery has multiple drawings
- [ ] XP progress toward "Nhà Khám Phá" level

### Full App Test
- [ ] Profile creation and switching
- [ ] All 8 question types render and function
- [ ] Offline: disconnect network → still works
- [ ] Graduation day (Day 84) accessible in test mode
- [ ] Diploma printable
- [ ] Export/import state JSON round-trip

---

## NOTES FOR /GOAL EXECUTION

When the `/goal` command runs, it should:

1. **Read first:** CONSTITUTION.md, TECHNICAL_SPEC.md, DESIGN_SYSTEM.md, CURRICULUM_84_DAYS.md
2. **Build order:** Strictly follow Phase 0–8 above
3. **Quality gate per phase:** Don't proceed to next phase without completing current
4. **Content:** When generating curriculum data, follow the spirit of MEUW_ACADEMY_SPEC.md — creative, contextual, never boring
5. **SVG art:** Méo mascot and illustrations should be hand-crafted SVG, cute chibi style, expressive
6. **No shortcuts:** Don't use placeholder data — all 84 days need real content
7. **Test after each major feature:** Run mental walkthrough before moving on
8. **Commit granularly:** feat: → feature complete, content: → curriculum data, fix: → bugfix
