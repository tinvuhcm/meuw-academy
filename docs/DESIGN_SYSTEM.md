# MEUW ACADEMY — DESIGN SYSTEM & UI GUIDE

## PHILOSOPHY
> "Bé gái 10 tuổi, mạnh mẽ và tếu táo — UI phải match tính cách đó"
> Không cute baby. Không pastel nhạt nhẽo. Phải WOW, tươi sáng, có năng lượng.

---

## COLOR PALETTE

### Primary Brand Colors
```css
:root {
  /* === Brand === */
  --meo-purple:    #7C3AED;   /* Primary — confident, creative */
  --meo-purple-lt: #EDE9FE;   /* Purple tint backgrounds */
  --meo-pink:      #EC4899;   /* Accent — energetic, fun */
  --meo-pink-lt:   #FCE7F3;   /* Pink tint backgrounds */
  
  /* === Module Colors === */
  --math-color:     #F59E0B;   /* Amber — sharp, precise */
  --math-color-lt:  #FEF3C7;
  --eng-color:      #3B82F6;   /* Blue — clear, communicative */
  --eng-color-lt:   #DBEAFE;
  --sci-color:      #10B981;   /* Emerald — nature, discovery */
  --sci-color-lt:   #D1FAE5;
  --read-color:     #8B5CF6;   /* Violet — imaginative */
  --read-color-lt:  #EDE9FE;
  --draw-color:     #EF4444;   /* Red — expressive, bold */
  --draw-color-lt:  #FEE2E2;
  --quiz-color:     #F97316;   /* Orange — challenge, energy */
  --quiz-color-lt:  #FFEDD5;
  
  /* === Semantic === */
  --correct:        #22C55E;
  --correct-bg:     #DCFCE7;
  --wrong:          #EF4444;
  --wrong-bg:       #FEE2E2;
  --warning:        #F59E0B;
  --warning-bg:     #FEF3C7;
  --info:           #3B82F6;
  --info-bg:        #DBEAFE;
  
  /* === Background & Surface === */
  --bg:             #F8F7FF;   /* Slightly purple-tinted white */
  --bg-2:           #F3F2FF;   /* Secondary background */
  --surface:        #FFFFFF;
  --surface-2:      #FAFAFA;
  --border:         #E5E7EB;
  --border-strong:  #D1D5DB;
  
  /* === Text === */
  --text:           #1F2937;
  --text-soft:      #374151;
  --text-muted:     #6B7280;
  --text-xmuted:    #9CA3AF;
  --text-on-brand:  #FFFFFF;
  
  /* === Gradients === */
  --gradient-brand: linear-gradient(135deg, #7C3AED, #EC4899);
  --gradient-math:  linear-gradient(135deg, #F59E0B, #EF4444);
  --gradient-sci:   linear-gradient(135deg, #10B981, #3B82F6);
  --gradient-eng:   linear-gradient(135deg, #3B82F6, #8B5CF6);
  --gradient-sky:   linear-gradient(180deg, #E0F2FE 0%, #F8F7FF 100%);
  
  /* === Shadows === */
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:   0 4px 12px rgba(0,0,0,0.10);
  --shadow-lg:   0 8px 24px rgba(0,0,0,0.12);
  --shadow-card: 0 2px 8px rgba(124, 58, 237, 0.08);
  --shadow-hover:0 8px 20px rgba(124, 58, 237, 0.15);
  
  /* === Spacing === */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* === Border Radius === */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl:32px;
  --radius-full: 9999px;
  
  /* === Transitions === */
  --transition-fast:   all 0.15s ease;
  --transition-normal: all 0.25s ease;
  --transition-slow:   all 0.4s ease;
  --transition-bounce: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## TYPOGRAPHY

### Font Stack
```css
/* Display: Fredoka One — tròn, thân thiện, có cá tính */
/* Body: Nunito — dễ đọc, friendly, weight linh hoạt */

@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;500;600;700;800;900&display=swap');

:root {
  --font-display: 'Fredoka One', cursive;
  --font-body:    'Nunito', system-ui, sans-serif;
  
  /* Scale */
  --text-6xl: 3.75rem;   /* 60px — graduation screen */
  --text-5xl: 3rem;      /* 48px — hero titles */
  --text-4xl: 2.25rem;   /* 36px — dashboard hero */
  --text-3xl: 1.875rem;  /* 30px — module titles */
  --text-2xl: 1.5rem;    /* 24px — card titles */
  --text-xl:  1.25rem;   /* 20px — lesson headers */
  --text-lg:  1.125rem;  /* 18px — important body */
  --text-base:1rem;      /* 16px — body text (minimum) */
  --text-sm:  0.875rem;  /* 14px — labels, hints */
  --text-xs:  0.75rem;   /* 12px — badges, fine print */
  
  /* Weights */
  --fw-normal: 400;
  --fw-medium: 500;
  --fw-semi:   600;
  --fw-bold:   700;
  --fw-extra:  800;
  --fw-black:  900;
  
  /* Line Heights */
  --lh-tight:  1.2;
  --lh-snug:   1.375;
  --lh-normal: 1.5;
  --lh-relaxed:1.625;
  --lh-loose:  2;
}
```

### Typography Usage
```
Display (Fredoka One): 
  - App name "MEUW ACADEMY"
  - Module titles on cards
  - Mascot speech bubbles
  - Badge names
  - Numbers (XP, streak)

Body (Nunito):
  - Question text (≥16px, 700 weight for questions)
  - Option buttons (18px, 600 weight)
  - Explanation text (16px, 500 weight)
  - Labels (14px, 600 weight)
  - Parent dashboard (16px, 400-600 weight)
```

---

## COMPONENT LIBRARY

### Buttons

#### Primary Button (Answer Option)
```css
.btn-option {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  background: var(--surface);
  border: 2.5px solid var(--border);
  border-radius: var(--radius-xl);
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: var(--fw-bold);
  color: var(--text);
  cursor: pointer;
  transition: var(--transition-bounce);
  box-shadow: var(--shadow-sm);
}

.btn-option:hover {
  border-color: var(--meo-purple);
  background: var(--meo-purple-lt);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.btn-option.selected {
  border-color: var(--meo-purple);
  background: var(--meo-purple-lt);
}

.btn-option.correct {
  border-color: var(--correct);
  background: var(--correct-bg);
  animation: correct-pulse 0.5s ease;
}

.btn-option.wrong {
  border-color: var(--wrong);
  background: var(--wrong-bg);
  animation: shake 0.4s ease;
}
```

#### CTA Button (Check / Next)
```css
.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-2xl);
  background: var(--gradient-brand);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
  transition: var(--transition-bounce);
}

.btn-cta:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
}

.btn-cta:disabled {
  background: var(--border);
  color: var(--text-muted);
  box-shadow: none;
  transform: none;
  cursor: not-allowed;
}
```

#### Hint Button
```css
.btn-hint {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  background: var(--warning-bg);
  color: var(--warning);
  border: 1.5px solid var(--warning);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--fw-bold);
  cursor: pointer;
  transition: var(--transition-fast);
}
```

---

### Cards

#### Module Card (Session List)
```css
.module-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--surface);
  border-radius: var(--radius-xl);
  border: 2px solid var(--border);
  cursor: pointer;
  transition: var(--transition-bounce);
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}

/* Left color stripe per subject */
.module-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--module-color, var(--meo-purple));
}

.module-card:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--module-color, var(--meo-purple));
}

.module-card.completed {
  background: var(--bg-2);
  opacity: 0.85;
}

.module-card.completed::after {
  content: '✓';
  position: absolute;
  right: var(--space-lg);
  color: var(--correct);
  font-size: var(--text-2xl);
  font-weight: var(--fw-black);
}
```

#### Lesson Card (Question Container)
```css
.lesson-card {
  background: var(--surface);
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-lg);
  border: 2px solid transparent;
  max-width: 680px;
  margin: 0 auto;
  animation: slide-up 0.3s ease;
}
```

#### Badge Card
```css
.badge-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-lg);
  background: var(--surface);
  border-radius: var(--radius-xl);
  border: 2px solid var(--border);
  text-align: center;
  transition: var(--transition-bounce);
}

.badge-card.earned {
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  border-color: var(--warning);
}

.badge-card.locked {
  filter: grayscale(1);
  opacity: 0.5;
}

.badge-icon {
  font-size: 3rem;
  line-height: 1;
}
```

---

### Progress Components

#### XP Progress Bar
```css
.xp-bar {
  height: 12px;
  background: var(--border);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.xp-bar-fill {
  height: 100%;
  background: var(--gradient-brand);
  border-radius: var(--radius-full);
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

/* Shimmer effect */
.xp-bar-fill::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 2s infinite;
}
```

#### Streak Counter
```css
.streak-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  border-radius: var(--radius-full);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: #92400E;
  border: 2px solid #F59E0B;
}

.streak-flame {
  animation: flame-pulse 1.5s ease-in-out infinite;
}
```

#### Question Progress Dots
```css
.question-dots {
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
  transition: var(--transition-normal);
}

.dot.done { background: var(--correct); transform: scale(1.1); }
.dot.current { background: var(--meo-purple); transform: scale(1.3); animation: dot-pulse 1s ease infinite; }
.dot.wrong-done { background: var(--wrong); }
```

---

### Mascot Speech Bubble
```css
.speech-bubble {
  position: relative;
  background: var(--surface);
  border: 2px solid var(--meo-purple-lt);
  border-radius: var(--radius-xl);
  padding: var(--space-md) var(--space-lg);
  max-width: 280px;
  box-shadow: var(--shadow-md);
  font-family: var(--font-display);
  font-size: var(--text-base);
  color: var(--text);
  animation: bubble-in 0.3s var(--transition-bounce);
}

/* Arrow pointing to mascot */
.speech-bubble::before {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 24px;
  border: 8px solid transparent;
  border-top-color: var(--meo-purple-lt);
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -9px;
  left: 25px;
  border: 7px solid transparent;
  border-top-color: var(--surface);
}
```

---

## LAYOUT SYSTEM

### Dashboard Layout
```
┌─────────────────────────────────────────────┐
│ HEADER (sticky)                             │
│ [Logo] MEUW ACADEMY     [🔥 streak] [⚙]    │
├─────────────────────────────────────────────┤
│ HERO SECTION                                │
│ [Méo idle animated]  "Chào Méo! 🌟"        │
│                      Ngày 5 | Tuần 2        │
│                      [████████░░] 320/400 XP│
│                      Level: 🔭 Nhà Khám Phá │
├──────────────┬──────────────────────────────┤
│ 🌅 BUỔI SÁNG│ 🌆 BUỔI CHIỀU               │
│              │                              │
│ [Module Card]│ [Module Card]                │
│ [Module Card]│ [Module Card]                │
│ [Module Card]│ [Module Card]                │
│ [Module Card]│ [Module Card]                │
│              │                              │
│ [▶ Continue] │ [▶ Start]                    │
├──────────────┴──────────────────────────────┤
│ BADGES & GALLERY (collapsible)              │
│ [badge][badge][badge] ... → See all         │
│ [thumb][thumb][thumb] → Gallery             │
└─────────────────────────────────────────────┘
```

### Lesson Layout (Desktop)
```
┌─────────────────────────────────────────────┐
│ [← Back]  [Module Title]    [❓/❸] [XP: 20]│
├────────────────────────┬────────────────────┤
│                        │                    │
│    MASCOT AREA         │   QUESTION CARD    │
│    [Méo animated]      │                    │
│    [Speech bubble]     │   [Illustration]   │
│                        │                    │
│                        │   Question text    │
│                        │                    │
│                        │   [Option A]       │
│                        │   [Option B]       │
│                        │   [Option C]       │
│                        │   [Option D]       │
│                        │                    │
│                        │   [Check ✓]        │
├────────────────────────┴────────────────────┤
│ [● ● ○ ○]  Question 2 of 4                 │
└─────────────────────────────────────────────┘
```

### Lesson Layout (Tablet/iPad)
```
┌────────────────────────────┐
│ [←] Module Title    [1/4]  │
├────────────────────────────┤
│ [Méo small] [Speech bubble]│
├────────────────────────────┤
│   QUESTION CARD            │
│   [Illustration 160px]     │
│   Question text            │
│   [Option A]               │
│   [Option B]               │
│   [Option C]               │
│   [Option D]               │
│   [Check ✓]                │
├────────────────────────────┤
│ [● ● ○ ○]                  │
└────────────────────────────┘
```

---

## ANIMATION KEYFRAMES

```css
/* === Entry Animations === */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes bubble-in {
  from { opacity: 0; transform: scale(0.8) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes card-appear {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* === Feedback Animations === */
@keyframes correct-pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%,60% { transform: translateX(-8px); }
  40%,80% { transform: translateX(8px); }
}

@keyframes bounce-in {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

/* === Mascot Animations === */
@keyframes tail-sway {
  0%,100% { transform: rotate(0deg); }
  50%     { transform: rotate(15deg); }
}

@keyframes blink {
  0%,95%,100% { transform: scaleY(1); }
  97%          { transform: scaleY(0.1); }
}

@keyframes jump {
  0%,100% { transform: translateY(0); }
  40%     { transform: translateY(-20px); }
  60%     { transform: translateY(-10px); }
}

@keyframes celebrate-spin {
  0%   { transform: rotate(0) scale(1); }
  25%  { transform: rotate(-10deg) scale(1.1); }
  75%  { transform: rotate(10deg) scale(1.1); }
  100% { transform: rotate(0) scale(1); }
}

@keyframes head-shake {
  0%,100% { transform: translateX(0) rotate(0); }
  20%,60% { transform: translateX(-6px) rotate(-5deg); }
  40%,80% { transform: translateX(6px) rotate(5deg); }
}

@keyframes thinking-float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-8px); }
}

/* === UI Animations === */
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}

@keyframes dot-pulse {
  0%,100% { transform: scale(1.3); opacity: 1; }
  50%     { transform: scale(1.6); opacity: 0.7; }
}

@keyframes flame-pulse {
  0%,100% { transform: scale(1); }
  50%     { transform: scale(1.1) rotate(3deg); }
}

@keyframes xp-flash {
  0%   { opacity: 0; transform: translateY(0) scale(0.5); }
  50%  { opacity: 1; transform: translateY(-20px) scale(1.2); }
  100% { opacity: 0; transform: translateY(-40px) scale(1); }
}

@keyframes badge-unlock {
  0%   { transform: scale(0) rotate(-180deg); opacity: 0; }
  60%  { transform: scale(1.2) rotate(10deg); opacity: 1; }
  80%  { transform: scale(0.9) rotate(-5deg); }
  100% { transform: scale(1) rotate(0); }
}
```

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile: ≤ 480px */
/* Tablet: 481px – 1024px (iPad target) */
/* Desktop: ≥ 1025px (Laptop target) */

@media (max-width: 480px) {
  /* Simplified toolbar for drawing */
  /* Stack 2-column → 1-column */
  /* Smaller mascot */
}

@media (min-width: 481px) and (max-width: 1024px) {
  /* iPad landscape: 2-column dashboard */
  /* iPad portrait: 1-column with larger touch targets */
  /* Touch-friendly: min tap target 44×44px */
  /* No hover effects (they feel broken on touch) */
}

@media (min-width: 1025px) {
  /* Full layout with mascot sidebar */
  /* Hover states enabled */
  /* Desktop canvas size */
}
```

---

## SPECIAL SCREENS

### Celebration Screen (Module Complete)
```
Background: animated gradient pulse (purple → pink → purple)
Center: Méo celebrating + confetti particles
Text: Module title + XP earned (animated counter)
Badges: if earned, zoom in sequence
Button: "Tiếp tục →" appears after 2 seconds
Duration: 3–5 seconds (can skip with tap)
```

### XP Flash Effect
```
Position: absolute, centered on check button
Text: "+10 XP" in Fredoka One, brand purple
Animation: float up + fade out (1s)
```

### Error State (Friendly)
```
No modal. Instead:
- Inline: red border + shake on wrong field
- Toast: Méo says something funny ("Ủa? Thử lại nhé! 🤔")
- Never: scary red modal, "WRONG!", game over screens
```

---

## ACCESSIBILITY

```
Color contrast: All text meets WCAG AA (4.5:1 minimum)
Touch targets: Minimum 44×44px for all interactive elements
Focus styles: Custom purple focus ring (not default browser blue)
ARIA labels: All icon-only buttons have aria-label
Alt text: All SVG illustrations have meaningful aria-label
Keyboard: Tab order logical, Enter/Space activate buttons
```

---

## MASCOT SIZE GUIDE

| Context | Size | State typically shown |
|---------|------|-----------------------|
| Dashboard hero | 120×140px | idle |
| Lesson sidebar (desktop) | 100×116px | varies |
| Lesson top (tablet) | 60×70px | varies |
| Speech bubble context | 48×56px | thinking/happy |
| Badge ceremony | 160×186px | celebrating |
| Graduation day | 240×280px | celebrating |
