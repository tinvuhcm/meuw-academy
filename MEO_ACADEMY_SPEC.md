# MEUW ACADEMY — Product Specification v1.0

> Ứng dụng học hè cho bé Méo (Vũ Hoàng Khả Minh, còn gọi là Minh Méo), 9 tuổi, chuẩn bị lên lớp 4  
> Tech lead: Claude Code | Product owner: DS. Mèo
> Thời gian học: 2h sáng + 1.5h chiều, 5–6 ngày/tuần, 3 tháng hè (có thể mở rộng

\---

## 1\. TRIẾT LÝ THIẾT KẾ — HỌC TỪ NHỮNG APP TỐT NHẤT THẾ GIỚI

### Tham khảo: Duolingo + Prodigy Math + Khan Academy Kids

|Nguyên tắc|Duolingo làm gì|Méo Academy áp dụng|
|-|-|-|
|**Play first**|Cho chơi ngay, không cần tài khoản|Mở app → vào bài học luôn, không màn hình chào dài|
|**Chunked learning**|Bài 5–10 câu, hoàn thành < 5 phút|Mỗi module ≤ 15 phút, không kéo dài|
|**Animated mascot**|Duo owl phản ứng theo kết quả|Méo (con mèo chibi) phản ứng: vui/buồn/ngạc nhiên/vỗ tay|
|**Failure is safe**|Sai → animation nhẹ nhàng, không đỏ chói|Sai → Méo "Ủa? Thử lại nhé!" không đáng sợ|
|**Micro-reward**|Confetti, sound, XP flash|Confetti, particle effect, nhạc nhẹ khi đúng|
|**Visual learning**|Hình ảnh trong mỗi câu hỏi|**Bắt buộc**: mỗi bài học có ≥ 1 SVG minh họa hoặc animation|
|**Streak psychology**|Streak = lý do quay lại ngày mai|Streak + "Méo đang chờ em!" notification vibe|
|**Không phải sách giáo khoa**|Tình huống thực tế, hài hước|Toán qua câu chuyện, Anh văn qua hội thoại, không thuộc lòng|

### Nguyên tắc UX cốt lõi

* **Màu sắc sống động, tươi sáng** — KHÔNG dark theme (trẻ em ≠ developer)
* **Chữ to, khoảng cách rộng** — dễ đọc trên laptop 13–15"
* **Mỗi màn hình có 1 focal point** — không nhồi thông tin
* **Animation có ý nghĩa** — không phải decoration thuần túy
* **Sound feedback** — âm thanh nhẹ nhàng cho đúng/sai/hoàn thành

\---

## 2\. KIẾN TRÚC KỸ THUẬT

### Stack

```
méo-academy/
├── index.html              # Shell, nav, routing
├── css/
│   ├── base.css            # Reset, variables, typography
│   ├── components.css      # Buttons, cards, badges, mascot
│   ├── animations.css      # Keyframes, transitions
│   └── responsive.css      # Tablet + mobile
├── js/
│   ├── app.js              # Router, state management, localStorage
│   ├── mascot.js           # Méo animation controller
│   ├── audio.js            # Sound effects (Web Audio API)
│   ├── speech.js           # Speech recognition wrapper
│   ├── drawing.js          # Canvas drawing tool
│   └── confetti.js         # Celebration particle system
├── modules/
│   ├── dashboard.js        # Trang chủ
│   ├── session.js          # Danh sách module buổi sáng/chiều
│   ├── lesson.js           # Lesson renderer (lesson + questions)
│   ├── question-types.js   # 8 loại câu hỏi (xem mục 4)
│   ├── drawing-canvas.js   # Interactive vẽ + tô màu
│   └── parent.js           # Parent panel
├── data/
│   ├── curriculum-m1.js    # Tháng 1: Vương quốc Động vật (ngày 1–28)
│   ├── curriculum-m2.js    # Tháng 2: Trái Đất \\\& Thiên nhiên (ngày 29–56)
│   ├── curriculum-m3.js    # Tháng 3: Khoa học \\\& Phát minh (ngày 57–84)
│   └── curriculum-bonus.js # Ngày review cuối tháng (3, 6, 9)
└── assets/
    ├── mascot/             # SVG Méo các trạng thái
    ├── icons/              # Module icons SVG
    ├── illustrations/      # SVG minh họa cho bài học
    └── sounds/             # .mp3 files (correct, wrong, complete, streak)
```

### State Management (localStorage key: `meoAcademy\\\_v2`)

```json
{
  "currentDay": 1,
  "currentWeek": 1,
  "xpToday": 0,
  "xpTotal": 0,
  "streak": 0,
  "lastPlayDate": "2025-06-15",
  "completedModules": { "d1\\\_m1-math": { "xp": 65, "score": 3, "total": 3, "time": 840 } },
  "earnedBadges": \\\["day1", "streak3"],
  "gallery": \\\[ { "src": "data:image/...", "day": 1, "title": "Sư tử" } ],
  "settings": { "parentPin": "1234", "soundOn": true, "breakReminder": true }
}
```

\---

## 3\. GIAO DIỆN — DESIGN SYSTEM

### Color Palette

```css
:root {
  /\\\* Primary \\\*/
  --meo-purple:    #7C3AED;
  --meo-purple-lt: #EDE9FE;
  --meo-pink:      #EC4899;
  --meo-pink-lt:   #FCE7F3;

  /\\\* Module colors \\\*/
  --math-color:     #F59E0B;   /\\\* Amber — Toán \\\*/
  --eng-color:      #3B82F6;   /\\\* Blue — English \\\*/
  --sci-color:      #10B981;   /\\\* Emerald — Khoa học \\\*/
  --read-color:     #8B5CF6;   /\\\* Violet — Đọc \\\*/
  --draw-color:     #EF4444;   /\\\* Red — Vẽ \\\*/
  --quiz-color:     #F97316;   /\\\* Orange — Quiz \\\*/

  /\\\* Semantic \\\*/
  --correct:  #22C55E;
  --wrong:    #EF4444;
  --warning:  #F59E0B;

  /\\\* Neutrals \\\*/
  --bg:       #F8F7FF;
  --surface:  #FFFFFF;
  --border:   #E5E7EB;
  --text:     #1F2937;
  --text-muted: #6B7280;
}
```

### Typography

```css
/\\\* Display font: Fredoka One (tròn, thân thiện, trẻ em nhưng không baby) \\\*/
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One\\\&family=Nunito:wght@400;500;600;700;800\\\&display=swap');

--font-display: 'Fredoka One', cursive;   /\\\* Headers, module titles \\\*/
--font-body:    'Nunito', sans-serif;      /\\\* Body text, buttons \\\*/

/\\\* Sizes — ưu tiên to để dễ đọc \\\*/
--text-hero:  2.5rem;
--text-title: 1.5rem;
--text-body:  1rem;         /\\\* Tối thiểu — không nhỏ hơn \\\*/
--text-label: 0.85rem;
```

### Mascot: Méo 🐱

**Méo là trái tim của app — xuất hiện ở mọi interaction quan trọng**

Thiết kế: con mèo chibi đơn giản vẽ bằng SVG, 4 màu chính, style rounded/cute

Méo có **8 trạng thái**:

|State|Trigger|Animation|
|-|-|-|
|`idle`|Màn hình chờ|Tail sway nhẹ nhàng, blink|
|`happy`|Trả lời đúng|Jump + star particles|
|`excited`|Hoàn thành module|Spin + confetti|
|`encouraging`|Trả lời sai|Shake head nhẹ, vẫy tay|
|`thinking`|Đang load câu hỏi|Paw on chin, dots...|
|`reading`|Bài đọc hiểu|Đeo kính, cầm sách|
|`drawing`|Module vẽ|Cầm bút, beret|
|`sleeping`|Streak break reminder|Ngủ gật, zzzz|
|`celebrating`|Huy hiệu mới|Fireworks, confetti|

File: `assets/mascot/méo-\\\[state].svg` — mỗi file tự animate bằng CSS `@keyframes`

### Layout Dashboard

```
┌──────────────────────────────────────────────────────┐
│  MEUW ACADEMY 🐱         \\\[🔥 3]  \\\[⚙ Phụ huynh]     │
├──────────────────────────────────────────────────────┤
│                                                      │
│  \\\[Méo: idle animation]  Chào Méo! 🌟                │
│                         Ngày 5 — Tuần 2              │
│                         XP: ████████░░ 320/400       │
│                                                      │
├─────────────────────────┬────────────────────────────┤
│ 🌅 BUỔI SÁNG            │ 🌆 BUỔI CHIỀU              │
│ ─────────────────────── │ ─────────────────────────  │
│ ✅ 🔢 Toán              │ ⬜ 🎨 Vẽ                   │
│ ✅ 🇬🇧 English           │ ⬜ 🧮 Toán nâng cao        │
│ ⬜ 🔬 Khoa học           │ ⬜ 🗣️ English nói           │
│ ⬜ 📖 Đọc hiểu           │ ⬜ ⚡ Mini Quiz             │
│                         │                            │
│ \\\[▶ Tiếp tục — Câu 3/4] │ \\\[▶ Bắt đầu]               │
├──────────────┬──────────┴────────────────────────────┤
│ 🏅 HUY HIỆU  │ 🎨 GALLERY PREVIEW                   │
│ 🌟 🔥 🏆     │ \\\[thumb] \\\[thumb] \\\[thumb] → Xem hết    │
└──────────────┴──────────────────────────────────────-┘
```

\---

## 4\. CÁC LOẠI CÂU HỎI / ACTIVITY — CHI TIẾT KỸ THUẬT

### Type 1: Multiple Choice (có hình minh họa)

```
Component: MultipleChoice
Props: { question, illustration, options\\\[4], correctIndex, explanation, points }

Layout:
  \\\[SVG Illustration — 200px height, animated nếu có]
  Question text (font-size: 1.1rem)
  \\\[Button A] \\\[Button B]
  \\\[Button C] \\\[Button D]

Behavior:
  - Click → highlight selected
  - Submit → 
    correct: button turns green + checkmark + sound "ding" + Méo jumps + XP flash
    wrong: button turns red + shake animation + correct answer highlights green 
           + Méo shakes head + explanation box slides down
  - Next button appears after answer
```

### Type 2: Fill in the Blank (số học)

```
Component: FillBlank
Props: { question, blanks\\\[{ label, answer, unit }], hint, points }

Layout:
  \\\[SVG Illustration — contextual]
  Question text
  \\\[Label: \\\_\\\_\\\_\\\_\\\_ unit] (input field, number keyboard)
  \\\[Kiểm tra ✓ button]
  \\\[💡 Gợi ý] (collapsible, -5 XP if used)

Behavior:
  - Validate on submit, field by field
  - Correct field: green border + checkmark
  - Wrong field: red border + shake + show correct answer after 2 tries
```

### Type 3: Drag \& Drop Matching

```
Component: DragMatch
Props: { title, leftItems\\\[], rightItems\\\[], pairs\\\[] }

Layout:
  2 columns: Left (drag source) | Right (drop target)
  Items are styled cards, draggable
  Drop zones glow when item dragged over

Behavior:
  - Drag từ trái → thả vào phải
  - Match đúng: cả hai card turn green, lock in place
  - Match sai: shake + return to origin
  - Complete all → celebrate
  
Mobile fallback: tap left → tap right (select + match)
```

### Type 4: Interactive SVG (Toán hình học)

```
Component: InteractiveSVG
Props: { svgContent, interactions\\\[], question, answer }

Ví dụ — Bài toán chu vi:
  SVG: Hình chữ nhật có thể resize bằng drag handles
  Học sinh kéo → số liệu thay đổi realtime
  "Chu vi = \\\_\\\_\\\_" → tính theo kích thước đang chọn
  
Ví dụ — Chuỗi thức ăn:
  SVG: các sinh vật có thể click để xóa
  Xóa 1 sinh vật → animation domino effect
  Câu hỏi: "Điều gì xảy ra tiếp theo?"

Ví dụ — Phân số:
  SVG: hình tròn/hình chữ nhật chia phần
  Tô màu số phần tương ứng với phân số
```

### Type 5: Speech Practice (có transcript realtime)

```
Component: SpeechPractice
Props: { prompt, sampleAnswer, minWords, language: 'vi'|'en' }

Layout:
  Prompt text (lớn, rõ)
  \\\[Méo: thinking state]
  \\\[🎤 Bắt đầu nói] button — pulse animation khi recording
  \\\[Transcript box] — text xuất hiện realtime khi nói
  \\\[✍️ Hoặc gõ vào đây] — textarea fallback
  Word count counter: "8 / 10 từ"
  \\\[Gửi] button (enable khi đủ minWords)

Browser: Chrome (Web Speech API)
Language switch: vi-VN | en-US tùy module
```

### Type 6: Drawing Canvas (Vẽ có hướng dẫn)

```
Component: DrawingCanvas
Props: { title, referenceImage, steps\\\[], colors\\\[], challenge }

Layout:
  \\\[Reference SVG] — semi-transparent overlay có thể toggle on/off
  \\\[Canvas 500x400] — mouse/touch drawing
  Toolbar: \\\[Bút] \\\[Tẩy] \\\[Màu sắc palette] \\\[Độ dày] \\\[Undo] \\\[Clear]
  Steps panel: step-by-step instructions với thumbnail SVG từng bước
  \\\[📸 Lưu vào Gallery] button
  \\\[🏆 Thử thách thêm] expandable

Canvas features:
  - Touch support (stylus/finger trên iPad)
  - Undo/redo stack (10 levels)
  - Save as dataURL → localStorage gallery
  - Reference image overlay toggle (semi-transparent, 40% opacity)
```

### Type 7: Color-by-Number / Tô màu (có sẵn outline)

```
Component: ColorFill
Props: { svgOutline, colorMap, palette\\\[] }
Nhân vật: Conan, Poca Poca, Chibi, nét vẽ: tóc, váy, dáng người, gương mặt, tay, chân...
Layout:
  SVG outline của hình (animal, plant, shape...)
  Click vào vùng → tô màu theo palette đang chọn
  Palette: 12 màu cơ bản + undo
  Khi tô đúng màu theo số → glow effect + Méo claps
  \\\[Lưu Gallery] khi hoàn thành

Implementation: SVG path fills, click detection bằng `data-region` attribute
```

### Type 8: Mini Quiz (tổng kết ngày)

```
Component: MiniQuiz
Props: { questions\\\[4-6], timeLimit: null }  // không có timer (stress-free)

Layout:
  Question counter: "1 / 4"
  \\\[Méo: idle]
  Question + illustration
  Multiple choice options
  Progress bar (số câu đã làm)

End screen:
  Score: 4/4 → Méo: celebrating + confetti
  Score: 3/4 → Méo: happy + "Gần hoàn hảo!"
  Score: ≤ 2/4 → Méo: encouraging + "Cố lên! Ôn lại nhé"
  Xem lại đáp án sai + giải thích
```

\---

## 5\. MASCOT MÉOCAT — IMPLEMENTATION GUIDE

### SVG Structure (mỗi file \~2KB)

```svg
<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- Body group — dễ animate toàn bộ -->
  <g id="body" transform="translate(60,70)">
    <!-- Ears -->
    <polygon id="ear-left" points="-30,-45 -45,-65 -15,-55" fill="#F472B6"/>
    <polygon id="ear-right" points="30,-45 45,-65 15,-55" fill="#F472B6"/>
    <!-- Head: hình tròn lớn -->
    <circle id="head" r="38" fill="#FBBF24"/>
    <!-- Face features -->
    <circle id="eye-left" cx="-13" cy="-5" r="8" fill="#1F2937"/>
    <circle id="eye-right" cx="13" cy="-5" r="8" fill="#1F2937"/>
    <!-- Highlights -->
    <circle cx="-10" cy="-8" r="3" fill="white"/>
    <circle cx="16" cy="-8" r="3" fill="white"/>
    <!-- Nose -->
    <ellipse cx="0" cy="8" rx="5" ry="3" fill="#EC4899"/>
    <!-- Mouth: W shape -->
    <path d="M -8 15 Q -4 20 0 15 Q 4 20 8 15" stroke="#1F2937" fill="none" stroke-width="2"/>
    <!-- Whiskers -->
    <line x1="-38" y1="5" x2="-18" y2="8" stroke="#9CA3AF" stroke-width="1.5"/>
    <!-- Body: pear shape -->
    <ellipse id="torso" cx="0" cy="55" rx="28" ry="35" fill="#FDE68A"/>
    <!-- Tail -->
    <path id="tail" d="M 25 75 Q 55 60 50 40 Q 45 20 30 30" 
          stroke="#F472B6" stroke-width="8" fill="none" stroke-linecap="round"/>
    <!-- Paws -->
    <ellipse cx="-22" cy="85" rx="12" ry="8" fill="#FBBF24"/>
    <ellipse cx="22" cy="85" rx="12" ry="8" fill="#FBBF24"/>
  </g>
</svg>
```

### CSS Animations cho từng state

```css
/\\\* idle: tail sway + occasional blink \\\*/
@keyframes tail-sway {
  0%,100% { transform: rotate(0deg); transform-origin: 25px 75px; }
  50% { transform: rotate(15deg); transform-origin: 25px 75px; }
}
@keyframes blink {
  0%,96%,100% { scaleY(1) }
  98% { scaleY(0.1) }
}
#tail { animation: tail-sway 2s ease-in-out infinite; }
#eye-left, #eye-right { animation: blink 4s infinite; }

/\\\* happy: jump \\\*/
@keyframes jump {
  0%,100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
}
.mascot-happy #body { animation: jump 0.5s ease; }

/\\\* celebrating: spin + scale pulse \\\*/
@keyframes celebrate {
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-10deg) scale(1.1); }
  75% { transform: rotate(10deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}
.mascot-celebrating #body { animation: celebrate 0.6s ease 3; }

/\\\* encouraging: head shake \\\*/
@keyframes headshake {
  0%,100% { transform: translateX(0); }
  20%,60% { transform: translateX(-8px); }
  40%,80% { transform: translateX(8px); }
}
.mascot-encouraging #head { animation: headshake 0.5s ease; }
```

### JS Controller

```javascript
// mascot.js
class MascotController {
  constructor(element) {
    this.el = element;
    this.currentState = 'idle';
  }

  setState(state, duration = null) {
    this.el.className = `mascot mascot-${state}`;
    this.currentState = state;
    if (duration) {
      setTimeout(() => this.setState('idle'), duration);
    }
  }

  react(event) {
    switch(event) {
      case 'correct':      this.setState('happy', 1500); break;
      case 'wrong':        this.setState('encouraging', 1500); break;
      case 'complete':     this.setState('celebrating', 3000); break;
      case 'loading':      this.setState('thinking'); break;
      case 'drawing':      this.setState('drawing'); break;
      case 'reading':      this.setState('reading'); break;
      case 'streak-break': this.setState('sleeping'); break;
    }
  }
}
```

\---

## 6\. SOUND DESIGN

```javascript
// audio.js — Web Audio API (không cần file external)
const AudioFX = {
  correct: () => playTone(\\\[523, 659, 784], \\\[0, 0.1, 0.2], 0.15),   // C-E-G chord
  wrong:   () => playTone(\\\[400, 300], \\\[0, 0.15], 0.2),              // descending
  complete:() => playTone(\\\[523, 659, 784, 1047], \\\[0,.1,.2,.3], 0.1), // scale up
  click:   () => playTone(\\\[800], \\\[0], 0.05),                         // short click
  badge:   () => playTone(\\\[784,1047,1319,1568], \\\[0,.08,.16,.24], 0.1) // fanfare
};

function playTone(freqs, times, duration) {
  const ctx = new AudioContext();
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime + times\\\[i]);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + times\\\[i] + duration);
    osc.start(ctx.currentTime + times\\\[i]);
    osc.stop(ctx.currentTime + times\\\[i] + duration + 0.1);
  });
}
```

\---

## 7\. CURRICULUM — 3 THÁNG ĐẦY ĐỦ

### THÁNG 1: VƯƠNG QUỐC ĐỘNG VẬT (Tuần 1–4, Ngày 1–28)

**Alignment với chương trình lớp 4 Bộ GDĐT:**

* Toán: Số tự nhiên lớn, phân số, hình học cơ bản, đo lường
* Tiếng Việt: Đọc hiểu, diễn đạt, mở rộng vốn từ
* Khoa học: Sinh vật và môi trường sống
* Tiếng Anh: Từ vựng chủ đề, câu mô tả, hội thoại

\---

#### TUẦN 1: Động vật hoang dã châu Phi

**NGÀY 1 — "Vua của thảo nguyên"**

*Buổi sáng:*

**Module M1-MATH** | Toán — Số tự nhiên lớn trong tự nhiên | 50 XP

```
Bài học:
  - Illustration: SVG của thảo nguyên với pop-up số lượng từng loài (animated counter)
  - "Có 1.400.000 con voi châu Phi, 20.000 con sư tử, và 700.000 con ngựa vằn"
  - Học đọc số lớn: cấu trúc triệu / nghìn / trăm

Câu hỏi 1 (MC + illustration):
  \\\[SVG: Bản đồ châu Phi với icon từng loài và số liệu]
  Hỏi: "Số 1.400.000 đọc là gì?"
  Options: A. Một trăm bốn mươi nghìn  B. Một triệu bốn trăm nghìn ✓
           C. Mười bốn triệu            D. Một nghìn bốn trăm

Câu hỏi 2 (Fill blank + interactive):
  \\\[SVG: 3 đàn sư tử có thể đếm — đàn 1: 12 con, đàn 2: 9 con, đàn 3: 15 con]
  "Tổng: \\\_\\\_\\\_ con. Mỗi con cần 5kg thịt/ngày. Cần: \\\_\\\_\\\_ kg/ngày"
  Answer: 36 | 180

Câu hỏi 3 (MC + animation):
  \\\[SVG: Đàn cá heo — animated swim, số thay đổi khi click]
  "248 → thêm 37 → bớt 15 = \\\_\\\_\\\_?"
  Options: 260 | 270 ✓ | 285 | 300
```

**Module M1-ENG** | English — Wild Animals | 50 XP

```
Bài học — Vocabulary cards (flip animation):
  Mỗi card: \\\[Front: Emoji + Word + Phonetic] → \\\[Back: Vietnamese + Example sentence]
  6 words: elephant 🐘, leopard 🐆, chimpanzee 🐒, crocodile 🐊, flamingo 🦩, penguin 🐧

  \\\* Thêm tính năng: click icon 🔊 → Web Speech API đọc to từ vựng (text-to-speech)

Câu hỏi 1 (Drag \\\& Drop Match):
  Left: elephant, crocodile, penguin, flamingo
  Right: con voi, cá sấu, chim cánh cụt, hồng hạc (random order)

Câu hỏi 2 (Speech Practice — EN):
  \\\[Photo-realistic SVG của con voi]
  Prompt: "Describe this elephant in English! Say at least 2 sentences."
  Sample: "An elephant is a very large animal. It has a long trunk, big ears, and four strong legs."
  Language: en-US | minWords: 5
```

**Module M1-SCI** | Khoa học — Chuỗi thức ăn | 50 XP

```
Bài học — Interactive SVG:
  \\\[SVG: Chuỗi thức ăn động] Cỏ → Châu chấu → Ếch → Rắn → Đại bàng
  Mỗi sinh vật có icon cute, kết nối bằng arrow animation (flow)
  Hover → tooltip tên loài + vai trò

  \\\[Interactive demo]: Click "Xóa Ếch" → 
    animation: ếch fade out → châu chấu nhân đôi (x2 icon xuất hiện) 
             → rắn nhỏ lại (shrink) → toàn chuỗi rung lắc
  Học sinh xem → "Điều gì xảy ra?"

Câu hỏi 1 (MC — phân tích):
  "Nếu số lượng ếch giảm mạnh, điều gì xảy ra?"
  \\\[SVG: 4 scenarios để chọn — mỗi scenario là 1 hình nhỏ]

Câu hỏi 2 (Speech — VN):
  "Nếu con người săn hết sư tử, điều gì xảy ra với ngựa vằn và cỏ?"
  Méo: \\\[reading state] gợi ý "Nghĩ theo chuỗi thức ăn nhé!"
```

**Module M1-READ** | Đọc hiểu — Chú voi Ellie | 50 XP

```
Bài học — Illustrated story:
  \\\[SVG Scene: Rừng châu Phi, voi nhỏ đứng trước dòng sông]
  
  Text: "Trong rừng già Châu Phi..." (paragraph 1)
  \\\[SVG Scene: Dòng sông bí ẩn]
  Text: "Một hôm, Ellie phát hiện..." (paragraph 2)
  \\\[SVG Scene: Thác nước ẩn sau sương mù]
  Text: "Hành trình dẫn chú đến..." (paragraph 3)

  \\\* Mỗi paragraph có 1 illustration nhỏ bên cạnh

Câu hỏi 1 (MC): Phân tích nguyên nhân sự kiện
Câu hỏi 2 (Open text + speech): Cảm nhận về nhân vật Ellie
```

*Buổi chiều:*

**Module A1-DRAW** | Vẽ — Chân dung sư tử | 30 XP

```
Layout 2 cột:
  \\\[Trái: Steps panel]              \\\[Phải: Drawing Canvas]
  ─────────────────────            ─────────────────────
  Bước 1: \\\[Thumbnail SVG]          \\\[Canvas 500x400]
  "Vẽ hình tròn lớn"               Toolbar:
  ─────────────────────            \\\[🖊 Bút] \\\[⬡ Tẩy]
  Bước 2: \\\[Thumbnail SVG]          \\\[Màu palette 12 màu]
  "Vẽ bờm xung quanh"              \\\[─ Độ dày]
  ─────────────────────            \\\[↩ Undo] \\\[🗑 Clear]
  ...                              
  \\\[Toggle reference overlay]       \\\[📸 Lưu Gallery]

Reference SVG: Sư tử từng bước vẽ — khi toggle ON thì hiện 40% opacity overlay
\\\* Bước thumbnail phải là SVG thực sự minh họa kết quả của bước đó
```

**Module A1-MATHX** | Toán nâng cao — Hình học tự nhiên | 60 XP

```
Bài học:
  \\\[SVG: Tổ ong với animation — hexagon cells fill lần lượt]
  Interactive: Drag slider "Số ô" → số ô thay đổi → diện tích tổ thay đổi
  "Tại sao ong dùng hình lục giác?" → click để reveal giải thích
  \\\[SVG: So sánh hình vuông vs lục giác — waste space visualization]

Câu hỏi 1 (MC + interactive SVG):
  \\\[SVG: Tổ ong có thể đếm ô]
  "48 ô, mỗi ô 2 viên mật. Muốn gấp đôi lượng mật, cần bao nhiêu ô?"

Câu hỏi 2 (Interactive geometry):
  \\\[SVG: Mạng nhện có cạnh có thể drag để thay đổi]
  "Kéo cạnh = 12cm → Tính chu vi và diện tích"
  Số tự động tính realtime khi kéo
```

**Module A1-ENGS** | English Speaking — My Favourite Animal | 40 XP

```
Layout:
  \\\[Méo: excited state]
  Prompt 1: "What is your favourite animal and why?"
  \\\[Microphone button — animated pulse khi recording]
  \\\[Transcript box — realtime text]
  Word counter: "0 / 10 từ"
  
  Prompt 2: "If you could be any animal for one day, which one?"
  (Tương tự)
```

**Module A1-QUIZ** | ⚡ Mini Quiz — Ngày 1 | 40 XP

```
4 câu hỏi ôn lại nội dung ngày 1:
  - 1 câu Toán (số lớn)
  - 1 câu English (vocabulary)  
  - 1 câu Khoa học (chuỗi thức ăn)
  - 1 câu Tổng hợp

End screen:
  4/4: Méo celebrating + "Méo hoàn hảo! 🌟" + confetti
  3/4: Méo happy + "Tuyệt vời! Gần hoàn hảo rồi"
  ≤2/4: Méo encouraging + "Ngày mai ôn lại nhé!" + link xem lại câu sai
```

\---

**NGÀY 2 — "Bạch tuộc thiên tài"**

*Buổi sáng:*

**M2-MATH** | Phân số trong tự nhiên | 50 XP

```
Bài học:
  \\\[SVG: Hình tròn chia phần — interactive color-fill]
  Học sinh tô màu 3/4 hình tròn = "3/4 của 12 con báo săn được..."
  Fraction bar visual: \\\[███░] = 3/4

  \\\[SVG: Đàn cá heo 20 con — click để chọn 1/4]
  Animation: selected fish highlight

Câu hỏi 1 (Interactive fraction):
  \\\[SVG: Tộc báo 12 con — có thể click chọn]
  "Báo thành công 3/4 số lần. Click chọn số con bắt được"
  
Câu hỏi 2 (Fill blank):
  \\\[SVG: Đàn chim 240 con chia 3 nhóm — animated split]

Câu hỏi 3 (MC + fraction comparison SVG):
  \\\[SVG: 2 thanh fraction bar so sánh 3/5 vs 4/7]
```

**M2-ENG** | Animal Adjectives | 50 XP

```
Vocabulary (6 words): fierce, graceful, nocturnal, venomous, endangered, camouflage
\\\* Mỗi từ có: ví dụ câu + illustration SVG (con thú minh họa tính chất)
\\\* fierce: sư tử gầm — roar animation
\\\* graceful: hạc bay — smooth fly animation  
\\\* nocturnal: cú mèo nhắm mắt ban ngày, mở mắt ban đêm — toggle animation
```

**M2-SCI** | Sự thích nghi | 50 XP

```
Bài học:
  \\\[SVG: Lạc đà trong sa mạc — click bướu → giải thích: "Mỡ dự trữ, không phải nước!"]
  \\\[SVG: Gấu Bắc Cực — click lông → giải thích: "Trong suốt, không phải trắng!"]
  \\\[SVG: Tắc kè hoa đổi màu — animated color change]
  
  Exploration mode: "Click vào từng con vật để khám phá bí mật!"

Câu hỏi 1 (MC): Phân tích tiến hóa
Câu hỏi 2 (Speech): Sáng tạo đặc điểm thích nghi
```

**M2-READ** | Bạch tuộc thiên tài | 50 XP

```
Story format với illustration:
  \\\[SVG: Bạch tuộc với brain anatomy — 1/3 não, 2/3 xúc tu highlighted]
  Animation: các neuron sáng lên theo từng xúc tu

  \\\[SVG: Bạch tuộc mở hũ thủy tinh — step by step animation]
  \\\[SVG: Bạch tuộc phun nước vào bóng đèn]
```

*Buổi chiều:*

**A2-DRAW** | Vẽ — Bạch tuộc phong cách | 30 XP

```
Reference SVG: Bạch tuộc từng bước
Bước 1 thumbnail: chỉ đầu oval
Bước 2 thumbnail: đầu + 2 mắt
Bước 3 thumbnail: + 8 xúc tu cơ bản
Bước 4 thumbnail: + giác hút
Bước 5 thumbnail: + background
Bước 6 thumbnail: version hoàn chỉnh tô màu

Challenge: "Vẽ bạch tuộc đang cầm sách và đeo kính!"
Color palette mở rộng: nhiều màu sáng tạo vì bạch tuộc đổi màu được
```

**A2-MATHX** | Logic \& Pattern | 60 XP

```
Bài học:
  \\\[SVG: Dãy số với pattern visual — hình vuông lớn dần]
  \\\[SVG: Fibonacci spiral trong thiên nhiên — vỏ ốc, cánh hoa]
  
Câu hỏi 1 (Interactive pattern):
  \\\[SVG: Dãy số với ? box — học sinh điền hoặc chọn]
  
Câu hỏi 2 (Multi-step với SVG):
  \\\[SVG: Đàn thỏ nhân đôi — animated growth]
```

\---

**NGÀY 3 — "Cuộc đua của cá hồi"**
*(Tương tự cấu trúc ngày 1–2, topic: di cư, đo lường, habitats)*

\---

**NGÀY 4 — "Voi châu Á vs châu Phi"**

*Focus: So sánh, phân tích, critical thinking*

**M4-MATH** | So sánh số lớn | 50 XP

```
Bài học:
  \\\[SVG: Bản đồ thế giới với counter đếm số voi từng vùng — animated]
  Voi châu Phi: 415.000 con | Voi châu Á: 40.000 con
  \\\[SVG: Bar chart so sánh — grow animation]

Câu hỏi: So sánh, tính hiệu, tính tỉ lệ
```

**M4-ENG** | Comparing animals | 50 XP

```
\\\[SVG: Voi châu Phi vs châu Á side-by-side với labels]
Học: bigger/smaller/taller/heavier/more/less
Practice: sentence builder — drag words to form comparison sentences
```

\---

**NGÀY 5 — Ngày tự do sáng tạo**

*Buổi sáng: Ôn tập tuần bằng quiz game — Prodigy-style*

```
Format: Méo đang trên hành trình xuyên thảo nguyên
  Gặp "quái vật" (animal puzzle) → trả lời đúng → tiếp tục hành trình
  Map progress: 5 điểm dừng, mỗi điểm 1 câu hỏi từ tuần này
  Boss battle: câu hỏi khó nhất của tuần (multi-step)
  Victory: Huy hiệu "Chinh phục tuần 1" 🏆
```

*Buổi chiều: Dự án sáng tạo*

```
"Vẽ con vật tưởng tượng của em"
  - Kết hợp đặc điểm của ít nhất 3 con vật thực
  - Viết (hoặc nói) tên + 3 đặc điểm thích nghi của nó
  - Lưu vào Gallery với tên và mô tả
```

\---

**NGÀY 6 — "Đại dương bí ẩn"**

**M6-SCI** | Áp suất nước sâu | 50 XP

```
Bài học:
  \\\[SVG: Cắt dọc đại dương — animated depth zones]
  0–200m: Sunlight zone (cá đầy màu sắc)
  200–1000m: Twilight zone (bioluminescence animation)
  1000m+: Midnight zone (cá không mắt, hình kỳ lạ)
  
  Interactive: Drag slider "Độ sâu" → áp suất tăng → sinh vật thay đổi
  "Ở 1000m, áp suất gấp 100 lần mặt đất — tương đương 100 con voi đứng trên ngón tay!"
```

\---

**NGÀY 7 — Review + Badge Day**

*Chỉ buổi sáng (nhẹ nhàng):*

```
Weekly Festival:
  - Quiz tổng hợp 10 câu (tất cả chủ đề tuần 1)
  - Mini game: "Sắp xếp chuỗi thức ăn" — drag \\\& drop
  - Portfolio review: xem lại Gallery, chọn tranh đẹp nhất
  - Badge ceremony: Méo trao huy hiệu "Tuần 1: Nhà Thám Hiểm Châu Phi" 🌍
```

\---

#### TUẦN 2: Đại dương \& Sinh vật biển (Ngày 8–14)

**Chủ đề xuyên suốt:** San hô, cá, áp suất, hải lưu
**Toán focus:** Phân số nâng cao, số thập phân cơ bản, biểu đồ
**English focus:** Describing emotions, weather, sea vocabulary
**Vẽ:** Cảnh biển, cá nhiều màu, san hô

*\[Structure: tương tự tuần 1, 7 ngày x 8 modules/ngày]*

**Ngày highlight:**

* Ngày 8: "Rạn san hô đang khóc" — environmental theme
* Ngày 9: "Vua mực khổng lồ" — Giant Squid deep sea
* Ngày 10: Toán — số thập phân qua nhiệt độ nước biển
* Ngày 11: English — kể chuyện "Một ngày của chú cá hề Nemo"
* Ngày 12: Khoa học — hải lưu và khí hậu (interactive SVG map)
* Ngày 13: Vẽ — cảnh dưới nước với kỹ thuật layering
* Ngày 14: Review + Badge "Người khám phá đại dương" 🐠

\---

#### TUẦN 3: Rừng nhiệt đới \& Côn trùng (Ngày 15–21)

**Chủ đề:** Amazon, đa dạng sinh học, côn trùng
**Toán focus:** Nhân chia có dư, hình học — diện tích, chu vi
**English focus:** Directions, describing habitat, compound sentences
**Vẽ:** Butterfly patterns, rừng layers, mandala từ cánh bướm

**Ngày highlight:**

* Ngày 15: "Mê cung Amazon" — toán đường đi, diện tích rừng
* Ngày 16: "Loài kiến thông minh hơn em nghĩ" — social insects
* Ngày 17: English — Giving directions in a rainforest
* Ngày 18: Interactive — Vẽ hoa văn cánh bướm đối xứng (mirror tool)
* Ngày 19: Khoa học — Quang hợp interactive (ánh sáng → năng lượng)
* Ngày 20: Toán — Diện tích rừng Amazon bị phá (số lớn, chart)
* Ngày 21: Review + Badge "Nhà khoa học rừng xanh" 🦋

\---

#### TUẦN 4: Review Tháng 1 + Dự án lớn (Ngày 22–28)

* Ngày 22–24: Ôn tập hệ thống tất cả kiến thức tháng 1
* Ngày 25–27: **Dự án "Sách ảnh động vật của Méo"**

  * Chọn 5 con vật yêu thích từ tháng 1
  * Vẽ chân dung từng con (Drawing canvas)
  * Viết mô tả 5 câu (tiếng Việt + 2 câu tiếng Anh)
  * App render thành "sách ảnh" có thể lật trang (CSS flip animation)
* Ngày 28: **Festival tháng 1** — Huy hiệu "Vua/Nữ hoàng Vương quốc Động vật" 👑

\---

### THÁNG 2: TRÁI ĐẤT \& THIÊN NHIÊN (Ngày 29–56)

**Chủ đề lớn theo tuần:**

* Tuần 5 (Ngày 29–35): **Núi lửa \& Địa chất** 🌋
* Tuần 6 (Ngày 36–42): **Thời tiết \& Khí hậu** ⛈️
* Tuần 7 (Ngày 43–49): **Sông ngòi \& Nước** 💧
* Tuần 8 (Ngày 50–56): **Review + Dự án Tháng 2** 🌍

**Toán focus Tháng 2 (Lớp 4):**

* Số thập phân: đọc, viết, so sánh
* Phép tính với số thập phân (cộng, trừ)
* Thống kê: biểu đồ cột, biểu đồ đường
* Đo lường: km², ha, ml, lít

**English focus Tháng 2:**

* Weather descriptions \& forecast
* Cause and effect sentences ("Because of...", "As a result...")
* Reading comprehension — informational text
* Writing: short paragraphs with topic sentence

**Khoa học focus:** Địa lý tự nhiên, chu trình nước, khí hậu biến đổi

**Vẽ focus Tháng 2:** Cảnh thiên nhiên, perspective basics, màu nước (simulate)

\---

#### Tuần 5: Núi lửa \& Địa chất (Ngày 29–35)

**Ngày 29 — "Núi lửa thức giấc"**

**M29-MATH** | Số thập phân trong tự nhiên | 50 XP

```
Bài học:
  \\\[SVG: Nhiệt kế đo nhiệt độ dung nham — animated mercury rise]
  Dung nham: 1200.5°C | Điểm nóng chảy vàng: 1064.2°C
  \\\[SVG: Number line với decimal points]
  
  Interactive: Drag số vào đúng vị trí trên number line

Câu hỏi 1 (Interactive number line):
  \\\[SVG: Number line 1000–1300] "Đặt 1200.5 và 1064.2 lên số line"
  
Câu hỏi 2 (Compare decimals):
  \\\[SVG: 2 nhiệt kế side-by-side] So sánh các cặp số thập phân
```

**M29-SCI** | Cấu trúc Trái Đất | 50 XP

```
Bài học:
  \\\[SVG: Trái Đất cắt dọc — animated cross-section]
  Layer 1: Vỏ (crust) — click → "Dày 30–70km"
  Layer 2: Manti (mantle) — animated convection currents
  Layer 3: Nhân ngoài (outer core) — liquid metal swirl
  Layer 4: Nhân trong (inner core) — solid, glowing
  
  "Kéo slider thời gian: 200 triệu năm trước → Pangaea → hiện tại"
  \\\[SVG: Continental drift animation]
```

**A29-DRAW** | Vẽ — Núi lửa phun trào | 30 XP

```
Reference: Núi lửa với dung nham chảy
Kỹ thuật mới: gradient màu (đỏ → cam → vàng) cho hiệu ứng nhiệt
Steps:
  1. Outline núi hình tam giác không đều
  2. Miệng núi + khói cuộn
  3. Dung nham chảy xuống — đường cong lượn
  4. Bầu trời đêm + ash clouds
  5. Village nhỏ ở xa (perspective đơn giản)
  6. Tô màu: gradient đỏ-cam cho dung nham
```

\---

**Ngày 30 — "Đất vàng, đất đỏ"**
*(Thổ nhưỡng, khoáng sản, tại sao đất khác màu)*

**Ngày 31 — "Động đất!"**
*(Seismic waves, Richter scale — toán số thập phân)*

**Ngày 32 — "Kim cương và than đá"**
*(Carbon forms, pressure \& time, toán đơn vị đo)*

**Ngày 33 — "Grand Canyon — Lịch sử được viết trên đá"**
*(Geological time, erosion, reading informational text)*

**Ngày 34 — "Vẽ cảnh núi — Perspective 101"**
*(Buổi chiều dài hơn cho vẽ: 1-point perspective, mountains)*

**Ngày 35 — Review + Badge "Nhà địa chất nhí" 🌋**

\---

#### Tuần 6: Thời tiết \& Khí hậu (Ngày 36–42)

**Ngày 36 — "Tại sao có gió?"**
*(Convection, high/low pressure — animated SVG)*

**M36-MATH** | Biểu đồ thống kê | 50 XP

```
Bài học:
  \\\[SVG: Interactive bar chart — nhiệt độ 12 tháng TPHCM]
  Hover → hiện giá trị
  Click tháng → highlight

  Build-your-own-chart: cho data, học sinh kéo cột lên đúng chiều cao

Câu hỏi:
  - Đọc biểu đồ: "Tháng nào nóng nhất?"
  - So sánh: "Chênh lệch nhiệt độ tháng 4 và tháng 12?"
  - Vẽ biểu đồ đường từ data cho sẵn (interactive)
```

**M36-ENG** | Weather forecast | 50 XP

```
\\\[SVG: Weather map animation — fronts moving]
Learn: sunny ☀️, cloudy ⛅, rainy 🌧️, stormy ⛈️, windy 💨
Practice: "Today in Hanoi, it is... The temperature is..."
Speech: "Give a weather forecast for tomorrow!"
```

**Ngày 37 — "Siêu bão — Ăn mày đại dương"**
*(Typhoon formation, energy, reading radar maps)*

**Ngày 38 — "Tuyết rơi ở đâu? Sương mù là gì?"**
*(Water vapor, condensation — interactive simulation)*

**Ngày 39 — "Biến đổi khí hậu — Chuyện của chúng ta"**
*(Age-appropriate climate change, cause \& effect)*

**M39-SCI** | Greenhouse effect | 50 XP

```
\\\[SVG: Animated greenhouse effect]
Sun rays → Earth → some bounce back → CO2 traps heat → temperature rises
Interactive: Slider "CO2 level" → xem nhiệt độ tăng
"Click vào từng nguồn phát thải — xem % đóng góp"
\\\[SVG: Pie chart animated]
```

**Ngày 40 — Toán: Số liệu khí hậu (số thập phân + biểu đồ)**

**Ngày 41 — Vẽ: Bốn mùa trong một tranh**

**Ngày 42 — Review + Badge "Nhà dự báo thời tiết" ⛈️**

\---

#### Tuần 7: Sông ngòi \& Nước (Ngày 43–49)

**Focus:** Chu trình nước, sông Mêkông, lũ lụt, nước sạch
**Toán:** Thể tích, đo lường lỏng, % (intro)
**English:** Cause/effect writing, water vocabulary
**Vẽ:** Sông \& cầu (perspective), waterfall

**Ngày 43 — "Vòng đời của một giọt nước"**

```
\\\[SVG Animation chạy liên tục]:
Ocean → Evaporation (molecules rise) → Cloud formation → Rain → River → Ocean
Click bất kỳ điểm → zoom in + giải thích chi tiết
"Giọt nước này có thể đã từng trong cơ thể khủng long!"
```

**Ngày 44 — "Sông Mêkông — Mẹ của chúng ta"**
*(Cửu Long, lũ, phù sa, nông nghiệp — địa lý Việt Nam)*

**Ngày 45 — Toán: Thể tích nước**

```
\\\[SVG: Bình chứa nước 3D — interactive fill]
Kéo slider → nước dâng lên → số liệu thay đổi
"Hồ Hoàn Kiếm chứa \\\_\\\_\\\_\\\_ lít nước?"
```

**Ngày 46 — "Nước sạch — Cuộc khủng hoảng thầm lặng"**

**Ngày 47 — English: Water cycle story**

**Ngày 48 — Vẽ: Thác nước + Kỹ thuật tạo hiệu ứng nước chảy**

**Ngày 49 — Review + Badge "Người bảo vệ nguồn nước" 💧**

\---

#### Tuần 8: Review Tháng 2 + Dự án (Ngày 50–56)

* Ngày 50–52: Ôn tập + quiz game
* Ngày 53–55: **Dự án "Bản đồ thiên nhiên của Việt Nam"**

  * Vẽ outline bản đồ Việt Nam (có template SVG)
  * Điền các đặc điểm địa lý: núi, sông, biển
  * Vẽ icon các loài đặc trưng từng vùng
  * Viết chú thích tiếng Anh
* Ngày 56: **Festival Tháng 2** + Badge "Người khám phá Trái Đất" 🌍

\---

### THÁNG 3: KHOA HỌC \& PHÁT MINH (Ngày 57–84)

**Chủ đề lớn theo tuần:**

* Tuần 9 (Ngày 57–63): **Ánh sáng \& Màu sắc** 🔆
* Tuần 10 (Ngày 64–70): **Lực \& Chuyển động** ⚙️
* Tuần 11 (Ngày 71–77): **Điện \& Công nghệ** ⚡
* Tuần 12 (Ngày 78–84): **Review + Grand Finale** 🚀

**Toán focus Tháng 3 (Lớp 4):**

* Phép nhân/chia số có nhiều chữ số
* Phân số: phép cộng, trừ cùng mẫu số
* Bài toán có lời văn nhiều bước
* Góc — đo góc, phân loại góc

**English focus Tháng 3:**

* Science vocabulary (experiment, hypothesis, result...)
* Describing a process (First... Then... Finally...)
* Reading: science articles for kids
* Writing: simple experiment report

\---

#### Tuần 9: Ánh sáng \& Màu sắc (Ngày 57–63)

**Ngày 57 — "Ánh sáng trắng — bí mật 7 màu"**

**M57-SCI** | Tán xạ ánh sáng | 50 XP

```
Bài học:
  \\\[SVG: Lăng kính + tia sáng → rainbow — animated]
  Mỗi màu có bước sóng khác nhau: gradient thực tế
  Interactive: Xoay lăng kính → rainbow di chuyển
  "Tại sao bầu trời xanh? Tại sao hoàng hôn đỏ?"
  \\\[SVG: Scatter diagram — blue light scatters most]

Câu hỏi:
  1. \\\[Interactive]: Kéo "Góc mặt trời" → xem màu bầu trời thay đổi
  2. \\\[MC]: Màu nào có bước sóng dài nhất?
  3. \\\[Speech]: "Giải thích tại sao cầu vồng xuất hiện sau mưa"
```

**A57-DRAW** | Vẽ — Cầu vồng \& Hình học ánh sáng | 30 XP

```
Kỹ thuật: gradient, blending màu
Steps: vẽ cầu vồng đúng thứ tự màu với kỹ thuật layering
Challenge: vẽ cảnh mưa + nắng + cầu vồng + làng nhỏ bên dưới
```

**M57-MATH** | Đo góc (Geometry) | 50 XP

```
Bài học:
  \\\[SVG: Protractor interactive]
  Drag góc → đọc số độ → phân loại: nhọn/vuông/tù/bẹt
  "Ánh sáng phản xạ: góc tới = góc phản xạ"
  \\\[SVG: Laser bouncing off mirrors — học sinh đặt gương để dẫn tia sáng]

Câu hỏi 1 (Interactive protractor):
  "Đo góc này bằng thước đo góc ảo"
  
Câu hỏi 2 (Puzzle):
  \\\[SVG: Laser puzzle — đặt gương ở đúng vị trí để chiếu đèn vào target]
```

**Ngày 58 — "Camera và Mắt người"**
*(Lens, focal length, how vision works — tiếng Anh: eye anatomy)*

**Ngày 59 — Toán: Phân số — Cộng trừ cùng mẫu**
*(Ứng dụng: pha màu sơn — "Trộn 1/4 đỏ + 2/4 vàng = 3/4 cam")*

**Ngày 60 — "Màu sắc và cảm xúc — Nghệ thuật \& Khoa học"**
*(Color psychology, warm/cool colors, làm palette cho chính mình)*

**Ngày 61 — English: Describing colors \& art**

**Ngày 62 — Vẽ: Tranh ánh sáng và bóng tối (chiaroscuro intro)**

**Ngày 63 — Review + Badge "Nhà vật lý ánh sáng" 🌈**

\---

#### Tuần 10: Lực \& Chuyển động (Ngày 64–70)

**Ngày 64 — "Tại sao quả táo rơi xuống?"**

**M64-SCI** | Gravity \& Forces | 50 XP

```
Bài học:
  \\\[SVG: Newton under apple tree — animated apple falling]
  Interactive: Drag "Mass" slider → xem speed of fall
  "Trên Mặt Trăng, quả táo rơi chậm hơn 6 lần"
  \\\[SVG: Moon vs Earth gravity comparison — side by side animated drop]

Câu hỏi 1 (Interactive simulation):
  "Thả quả bóng từ 10m. Trên Trái Đất mất 1.4 giây. Trên Mặt Trăng mất bao lâu?"
  \\\[SVG: Side-by-side timer + falling ball]

Câu hỏi 2 (MC + illustration):
  "Tại sao phi hành gia trên ISS không bị rơi?"
```

**Ngày 65 — "Bánh răng và Máy móc đơn giản"**
*(Lever, pulley, wheel — interactive machines)*

**Ngày 66 — Toán: Bài toán nhiều bước (velocity, time, distance)**

**Ngày 67 — "Tại sao máy bay bay được?"**
*(Bernoulli, lift, drag — paper airplane science)*

**Ngày 68 — English: Describing processes (How does a rocket work?)**

**Ngày 69 — Vẽ: Thiết kế phương tiện tương lai**
*(Freeform invention drawing — rocket car, submarine plane...)*

**Ngày 70 — Review + Badge "Kỹ sư nhí" ⚙️**

\---

#### Tuần 11: Điện \& Công nghệ (Ngày 71–77)

**Ngày 71 — "Điện là gì? Electron đi đâu?"**

**M71-SCI** | Electricity basics | 50 XP

```
Bài học:
  \\\[SVG: Circuit diagram interactive]
  Thành phần: Battery, Wire, Bulb, Switch
  Click switch → bulb sáng lên (animated glow)
  Add/remove components → circuit breaks or works
  
  "Nối mạch đúng để bóng đèn sáng!"
  \\\[Puzzle: 3 mức độ khó — thêm nhiều bulb, parallel vs series]
```

**Ngày 72 — "Pin Mặt Trời — Năng lượng tương lai"**

**Ngày 73 — Toán: % (giới thiệu) qua pin năng lượng**
*("Pin 80% — nghĩa là gì?" → visual battery bar)*

**Ngày 74 — "Internet hoạt động như thế nào?"**
*(Packets, servers — ẩn dụ thư từ/bưu điện)*

**Ngày 75 — English: Technology vocabulary + How-to writing**

**Ngày 76 — Vẽ: Thiết kế app ước mơ (wireframe style)**
*(Sketch UI của app yêu thích tưởng tượng — pen tool trên canvas)*

**Ngày 77 — Review + Badge "Nhà phát minh điện" ⚡**

\---

#### Tuần 12: Grand Finale (Ngày 78–84)

**Ngày 78–80: Ôn tập tổng hợp 3 tháng**

```
Game format: "Méo's Science Olympics"
  3 vòng thi:
  - Vòng 1: Vương quốc Động vật (tuần 1–4)
  - Vòng 2: Trái Đất (tuần 5–8)  
  - Vòng 3: Khoa học (tuần 9–11)
  
  Mỗi vòng: 8 câu hỏi, 60 giây/câu (không bắt buộc — tùy chọn timer)
  Mascot Méo: Đội cổ vũ + phản ứng realtime
```

**Ngày 81–83: Dự án tốt nghiệp — "Cuốn sách khoa học của Méo"**

```
Nội dung tự chọn từ 3 chủ đề yêu thích nhất của 3 tháng

Format mỗi chương:
  - Tiêu đề + illustration tự vẽ (từ Gallery)
  - Mô tả 5 câu tiếng Việt
  - 2 câu tiếng Anh "Fun facts"
  - 1 bài toán liên quan tự đặt (và tự giải!)

App render: "flip book" có thể lật trang, share PDF
```

**Ngày 84: 🎓 GRADUATION DAY**

```
Màn hình đặc biệt:
  \\\[Full-screen animation: Méo đội mũ tốt nghiệp, confetti toàn màn hình]
  
  Diplôme (có thể in ra):
    "Chứng nhận Méo đã hoàn thành
     Chương trình Hè Méo Academy 2025
     84 ngày · 672 modules · \\\[Tổng XP] điểm"
  
  Huy hiệu cuối: 👑 "Nhà Bác Học Mùa Hè"
  
  Gallery final: slideshow tất cả tranh vẽ 3 tháng
  
  Stats summary:
    - Môn giỏi nhất (highest avg score)
    - Ngày kỷ lục (most XP in a day)
    - Streak dài nhất
    - Tổng số từ tiếng Anh đã học
```

\---

## 8\. GAMIFICATION SYSTEM — CHI TIẾT

### XP \& Leveling

```
Mỗi câu đúng: 10 XP
Mỗi module hoàn thành: bonus theo độ khó (30–60 XP)
Perfect score (100%): x1.5 multiplier
First attempt (không dùng hint): +5 XP bonus
Speech submitted: 15 XP (không chấm đúng/sai — khuyến khích thử)
Drawing saved: 30 XP

Daily target: 400 XP
Weekly target: 2000 XP

Level system:
  0–500 XP:    🐾 Thám Tử Nhí
  500–2000:    🔭 Nhà Khám Phá
  2000–5000:   🎓 Học Giả
  5000–10000:  🌟 Nhà Khoa Học
  10000+:      👑 Thiên Tài
```

### Huy hiệu đầy đủ (28 huy hiệu)

```
Hành trình:
  🌟 Ngày đầu tiên         — Complete day 1
  🔥 Bộ ba ngày            — 3-day streak
  🏆 1 tuần không nghỉ     — 7-day streak
  💎 2 tuần không nghỉ     — 14-day streak
  👑 1 tháng không nghỉ    — 30-day streak

Thành tích học:
  🔢 Phù thủy toán          — 5 module Toán perfect score
  🇬🇧 English Star           — 5 module English perfect
  🔬 Nhà khoa học           — 5 module Khoa học perfect
  📖 Mọt sách               — 5 module Đọc hiểu perfect
  🗣️ Speaker                — 10 speech activities submitted
  🎨 Họa sĩ nhí             — 5 tranh lưu Gallery

Tuần/Tháng:
  🐾 Chinh phục T1          — Complete week 1
  🐠 Người khám phá biển    — Complete week 2
  🦋 Nhà khoa học rừng      — Complete week 3
  📖 Hoàn thành Tháng 1     — Complete all 28 days
  🌋 Nhà địa chất           — Complete week 5
  ⛈️ Nhà dự báo             — Complete week 6
  💧 Bảo vệ nguồn nước      — Complete week 7
  🌍 Hoàn thành Tháng 2     — Complete all 56 days
  🌈 Vật lý ánh sáng        — Complete week 9
  ⚙️ Kỹ sư nhí              — Complete week 10
  ⚡ Nhà phát minh          — Complete week 11
  🚀 Hoàn thành Tháng 3     — Complete all 84 days

Đặc biệt:
  💡 Tự sáng tạo            — Tự đặt câu hỏi cho quiz
  🌙 Cú đêm                 — Học sau 20:00
  ☀️ Chim sớm               — Học trước 7:00
  🎯 Perfectionist          — 10 quiz liên tiếp 100%
  👑 Nhà Bác Học Mùa Hè     — Complete tất cả 84 ngày
```

### Break Timer \& Wellbeing

```javascript
// Nhắc nghỉ sau mỗi 45 phút học liên tục
// Toast notification nhẹ nhàng, không block UI
// Méo: sleeping state với message "Nghỉ ngơi 10 phút nhé! ☕"
// "Snooze 5 phút" button
// Timer tự reset sau khi break
```

\---

## 9\. PARENT DASHBOARD — ĐẦY ĐỦ

### Màn hình phụ huynh (sau PIN)

**Tab 1: Báo cáo hôm nay**

```
- Thời gian học thực tế (tracked)
- Modules hoàn thành / tổng
- XP kiếm được
- Môn nào mạnh/yếu hôm nay (based on score)
- Méo đang ở trạng thái nào (mood indicator vui)
```

**Tab 2: Tiến trình tổng quan**

```
- Calendar view: màu ngày học (xanh = full, vàng = partial, trắng = chưa học)
- Biểu đồ XP theo tuần (line chart)
- Huy hiệu đã đạt
- Gallery preview
```

**Tab 3: Cài đặt**

```
- Đổi PIN
- Bật/tắt âm thanh
- Bật/tắt speech recognition
- Cho phép / không cho phép "hôm nay mệt"
- Điều chỉnh ngày hiện tại (advance/retreat)
- Đặt giờ học (lock app ngoài giờ — optional)
- Export báo cáo PDF (tháng)
```

\---

## 10\. TECHNICAL IMPLEMENTATION NOTES

### Performance (cho laptop + iPad Air cũ)

```
- SVG animation: prefer CSS @keyframes over JS setInterval
- Canvas: requestAnimationFrame only when drawing
- Images: SVG only (không dùng PNG/JPG để tránh load)
- Lazy load curriculum data: chỉ load data ngày hiện tại + 2 ngày tiếp
- LocalStorage: compress gallery images trước khi lưu (canvas.toDataURL('image/jpeg', 0.7))
- No external JS libraries: pure vanilla JS (trừ Canvas API)
```

### Browser Support

```
- Chrome 90+: full support (target primary)
- Safari iOS 15+: speech limited, fallback to text
- Firefox: no Speech API → full text fallback
```

### Offline Support

```
- Service Worker: cache app shell + curriculum data
- Hoạt động offline hoàn toàn sau lần load đầu
- Gallery lưu localStorage (no cloud needed)
```

\---

## 11\. FILE SIZE BUDGET

```
index.html:         20KB
css/ (tất cả):      30KB
js/ (core):         40KB
js/ (modules):      30KB
data/ (3 tháng):    200KB (JSON text, no binary)
assets/mascot/:     15KB (8 SVG files × \\\~2KB)
assets/icons/:      10KB
assets/illustrations/: 50KB (SVG, reused across days)
assets/sounds/:     0KB (generated via Web Audio API)
─────────────────────────
TOTAL:              \\\~395KB (load nhanh, no server needed)
```

\---

## 12\. HANDOFF TO CLAUDE CODE

### Priority build order:

1. **Core shell** (index.html + base CSS + router + state)
2. **Mascot system** (SVG Méo + animation controller)
3. **Question types** (8 types, progressive implementation)
4. **Dashboard** (hero + session cards + stats)
5. **Drawing canvas** (với reference overlay)
6. **Curriculum data** Tháng 1 đầy đủ (28 ngày × 8 modules)
7. **Parent dashboard**
8. **Curriculum data** Tháng 2 \& 3
9. **Sound system**
10. **Offline/PWA**

### Conventions:

* Component: `ComponentName.js` export default function
* Data: `curriculum-m1.js` export const DAYS\_M1 = \[...]
* CSS classes: BEM — `.lesson\\\_\\\_question`, `.lesson\\\_\\\_question--correct`
* Events: CustomEvent cho mascot reactions: `dispatchEvent(new CustomEvent('mascot', {detail: 'correct'}))`

### Testing checklist mỗi module:

* \[ ] Chrome desktop: full functionality
* \[ ] Chrome mobile: touch events
* \[ ] Keyboard navigation
* \[ ] LocalStorage save/load cycle
* \[ ] Speech API graceful fallback
* \[ ] 100% offline after first load

