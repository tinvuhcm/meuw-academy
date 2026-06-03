# Meuw Academy Handoff Checkpoint

Updated: `2026-06-03 (session 4 — ALL subjects complete)`
Repo branch: `master`
Commit: `7eb9f0f` — Complete SGK-first generators for all subjects

## ALL SUBJECT GENERATORS NOW SGK-FIRST

| Subject | Generator | Q Style |
|---------|-----------|---------|
| math | generateMathQuestions | Op-based computation |
| vie | generateVietnameseQuestions | Grammar rules + situational reading |
| sci | science-world.js + PPTX(sci) | Curated + PPTX (OK) |
| eng | buildEnglishUnit (FF4) | Vocabulary + spelling |
| it | generateItQuestions | Task-based, "what does this do?" |
| histgeo | generateHistgeoQuestions | Facts + historical context |
| tech | generateTechQuestions | Process-based, hands-on |
| **music** | **generateMusicQuestions** | Notation, instruments, performance |
| **ethics** | **generateEthicsQuestions** | **Situational: "what would you do?"** |
| **life (HĐTN)** | **generateLifeQuestions** | **Scenario: family/school/community** |
| **pe** | **generatePeQuestions** | **Practical: warm-up, technique, safety** |
| **art** | **generateArtQuestions** | **Observation: color, perspective, craft** |

## Pedagogy Framework Applied

From NXBGD teacher training guide (2023), stored locally:
`docs/research/official-sources/notes/official-text/hoc10/`

**4-stage model** (from toan/tieng-viet teacher training):
1. **Mở đầu** — Warm-up: connect to prior knowledge, create curiosity
   → Implemented via `buildPlayfulWarmupBlock` in lesson-blocks.js
2. **Hình thành kiến thức** — Form new knowledge: Gâu tiên sinh theory block
   → Implemented via `buildSourceTheoryBlock` / `getOfficialXxxTheory`
3. **Luyện tập, thực hành** — Practice: apply to exercises
   → Implemented via subject-specific question generators
4. **Vận dụng, trải nghiệm** — Apply to real life
   → Implemented via situational questions (especially ethics/life/HĐTN)

**Vật chất → Tư duy → Thực tiễn** (Lenin's epistemological principle used in VN education):
- Start concrete (reading page images, warm-up scenario)
- Move to abstract (grammar rules, historical facts)
- Return to practice (situational questions, "what would you do?")

## Question Design Principles

**DO:**
- "Bé An đang... Em sẽ làm gì?" (situational)
- "Cô giáo hỏi... Em trả lời tốt nhất là:" (pedagogical context)
- "Em nhìn vào bức tranh và thấy..." (observation-first)
- Show actual poem/sentence excerpts for questions

**AVOID:**
- "Danh từ là gì?" (pure definition recall)
- "Chọn đáp án đúng về..." (no context)

## Lesson Display Architecture

```
Module → lessonBlocks
  [0] Warm-up (flowStage: 'warmup') — "Khởi động bài học"
  [1] Theory (flowStage: 'theory') — Gâu tiên sinh SGK content  
  [2] Reading page (flowStage: 'reading') — HTS CDN images [vie Đọc only]

During practice:
  Button: "📖 Xem lại bài đọc" OR "📘 Xem lại bài học"
  Opens: openLessonReviewModal with all blocks
```

## What Remains (Non-critical)

- Full text layer for vie Đọc lessons: HTS images shown (page-backed). OCR quality not trustworthy for canonical text.
- More FF4 English units (english-topics.js is a good base, can expand)
- music/pe/art questions could be further deepened with more specific lesson content

## Files Summary

New generators created this session:
- `js/data/remaining-subjects-generator.js` — music/ethics/life/pe/art
- `js/data/vie-question-generator.js` (upgraded Đọc hiểu section)

All generators wired in:
- `js/data/kntt-topics.js` — 9 subject-specific generators

Teacher training materials available locally (read during this session):
- `docs/research/official-sources/notes/official-text/hoc10/{subject}/02-tl-tap-huan-*.json`
- Contains full pedagogy framework (4-stage model, philosophy)
- NOTE: these are Cánh Diều series, but GDPT 2018 curriculum is the same
- Pedagogical principles are directly applicable to KNTT content
