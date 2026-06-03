# Teacher Pedagogy Framework

Updated: `2026-06-03`

## Purpose

This note turns official teacher-training materials into a reusable lesson design doctrine for Meuw Academy.

The goal is **not** to copy SGK lessons mechanically.

The goal is:

- keep the knowledge core aligned with SGK and official teacher guidance
- turn lessons into short, playful, habit-forming learning flows
- let `Gâu tiên sinh` behave like a useful teacher, not a random mascot

## Official inputs used

Primary teacher-training lane:

- [Tập huấn NXBGD](https://taphuan.nxbgd.vn/tap-huan/)
- local extracted corpus:
  - [official-text manifest](F:/projects/meuw_academy/docs/research/official-sources/notes/official-text/manifest.json)
  - [official-text README](F:/projects/meuw_academy/docs/research/official-sources/notes/official-text/README.md)

Representative source pages:

- [Tiếng Việt 4, tập một - Tập huấn](https://taphuan.nxbgd.vn/tap-huan/chi-tiet-sach/tieng-viet-4-tap-mot-939811319.939811319)
- [Toán 4, tập một - Tập huấn](https://taphuan.nxbgd.vn/tap-huan/chi-tiet-sach/toan-4-tap-mot-940238180.940238180)
- [Tin học 4 - Tập huấn](https://taphuan.nxbgd.vn/tap-huan/chi-tiet-sach/tin-hoc-4-940020933.940020933)

## Pedagogy extracted from the training materials

Repeated patterns across official materials:

1. `Khởi động / Chia sẻ`
   - activate prior knowledge
   - create a concrete reason to learn the topic

2. `Khám phá`
   - expose the key idea, structure, or model
   - not too much theory, just enough to unlock the task

3. `Luyện tập`
   - guided practice with close support
   - focus on one skill at a time

4. `Vận dụng`
   - use the knowledge in a simple realistic task
   - connect the lesson to life, habit, or personal action

This maps very well to a children’s app if compressed into short blocks.

## Meuw lesson doctrine

Each module should feel like:

1. `Warm-up block`
   - short
   - playful
   - tells the child what kind of mission this is

2. `Theory block by Gâu tiên sinh`
   - short
   - directly relevant
   - rooted in SGK or official teacher materials
   - no lecturing, no fluff

3. `Source-backed reading/view block` when needed
   - for reading-heavy or SGK-sensitive topics
   - exact SGK pages if full text is not yet machine-readable

4. `Practice`
   - questions generated from the knowledge core
   - not copied blindly from PPTX

5. `Review access during practice`
   - learner can reopen the reading or theory inline

## Subject-specific guidance

### Toán

- Warm-up should help identify the mathematical job:
  - đọc số
  - tìm quy luật
  - tính phân số
  - nhận ra hình hay biểu đồ
- Theory should explain:
  - what the concept means
  - what the child must notice before calculating
- Practice should avoid random arithmetic when the lesson is conceptual

### Tiếng Việt

- Reading lessons must start from the text itself
- Child should know whether the mission is:
  - tìm ý chính
  - tìm chi tiết
  - nhận biết từ/câu/dấu câu
  - viết theo mẫu
- Theory should avoid abstract grammar overload
- Evidence in the text matters more than guessing

### English

- Main program anchor: `Family & Friends 4`
- `Explore Our World` teacher/media packs can support interactivity, pacing, and extra classroom technique, but should not replace the main English knowledge map
- Theory should present:
  - what the pattern is for
  - the sentence frame
  - one concrete example
- Vocabulary should be tied to use:
  - job + workplace
  - routine + time
  - place + action
- Practice should favor short meaningful sentences over isolated labels when possible

## Implementation rule for the app

The app should no longer think of `lessonBlocks` as only a single theory card.

Default flow should be:

- `warm-up`
- `theory`
- `reading-page` if needed
- `questions`

This can be implemented without changing the current screen architecture because the lesson screen already supports multiple `lessonBlocks` before questions.

## Guardrails

- Do not claim exact SGK full text unless it is truly machine-readable.
- Use `Hành Trang Số` page images as the exact-source lane when needed.
- Use `official-text` teacher/training corpus for short theory and pedagogical framing.
- Keep `science` lane untouched unless a change is clearly beneficial and verified.
