# Meuw Academy Handoff Checkpoint

Updated: `2026-06-03 (session 2)`
Repo branch at handoff: `master`
Commit: `bb69bd1` — SGK-first lesson depth

## Summary of Changes This Session

### 1. Vietnamese Question Generator (`js/data/vie-question-generator.js`) — NEW

Real TV4 KNTT grammar questions for all 29 Luyện từ và câu skill types.

Banks implemented:
- Danh từ (danh từ chung, danh từ riêng)
- Động từ
- Tính từ
- Câu / Chủ ngữ / Vị ngữ
- Trạng ngữ (thời gian, nơi chốn, nguyên nhân, phương tiện)
- Dấu gạch ngang, Dấu ngoặc kép
- Nhân hóa
- Đoạn văn và câu chủ đề
- Đọc hiểu (generic for Đọc lessons)
- Nói và nghe, Viết / ý kiến

These replace the weak `generateKnttLessonQuestions` for all `vie` KNTT topics.

### 2. kntt-topics.js — Enhanced

- `buildKnttNonMathTopics`: vie topics now use `generateVietnameseQuestions`
- `buildFullReadingPageBlock`: multi-page reading blocks with `inferLessonEndPage`
- `buildSourcePageRefs`: source page span for theory blocks
- `buildSourceTheoryBlock`: SGK-sourced theory with page citation
- `buildTheoryPoints/buildTheoryExample`: skill/subject-specific content

### 3. official-theory-snippets.js — Extended

Added SGK-based theory snippets for:
- Động từ, Tính từ
- Trạng ngữ
- Câu / Chủ ngữ / Vị ngữ
- Nhân hóa

### 4. lesson.js — Major Upgrade

- `openLessonReviewModal`: unified review modal for any lesson content
- `renderReviewTheoryBlock`: modal rendering for theory blocks
- `renderReviewReadingBlock`: modal rendering for reading-page blocks
- `openSourcePagesModal`: dedicated SGK page viewer popup
- Review button shows for ALL lessons: "Xem lại bài đọc" OR "Xem lại bài học"
- `reviewableLessonBlocks`: all blocks with reviewable content
- `getLessonBlockMeta`: badge/role/hint per block type
- FillBlank non-math: `_maxAttempts: 1` (1 attempt then reveal for vocab)

### 5. lesson-blocks.js — New Rule for Bài đọc

Added dedicated rule: `vie Bài đọc` modules get "Đọc kỹ bài trước" block instead of generic fallback.

### 6. PPTX Lane Restriction

- `PPTX_SUBJECTS` now only `['sci']` in fresh-curriculum.js
- vie, histgeo, art, tech, it are SGK-first

## What Still Needs Work

Priority:
1. **Tin học** — Need `generateItQuestions` with real thao tác/công dụng questions
2. **Lịch sử & Địa lí** — Need `generateHistgeoQuestions` with địa danh/nhân vật/sự kiện
3. **English** — More FF4 units and sentence-pattern generators
4. **Corpus depth** — Toán generators are good; vie is now solid; others need depth

## Verified Before Commit

- `node --check` passed for all modified JS files
- `git push origin master` succeeded (commit `bb69bd1`)
- Vercel auto-deploys from master → production will update automatically

## Read Order for Next Agent

1. `docs/HANDOFF_CHECKPOINT_2026-06-03b.md` (this file)
2. `docs/HANDOFF_BACKLOG_2026-06-03.md`
3. `js/data/vie-question-generator.js` — understand the question bank structure
4. `js/data/kntt-topics.js` — understand how generators wire in
