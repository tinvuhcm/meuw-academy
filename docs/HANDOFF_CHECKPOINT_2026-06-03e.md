# Meuw Academy Handoff Checkpoint

Updated: `2026-06-03 (session 5 — production verified)`
Repo branch: `master`
Latest commit: `3ec65d7`

## What Works in Production Right Now

### Question Quality — 0 garbage items on days 1-120

Content audit (`scripts/audit_content_quality.mjs 1 120`): **0 findings**.

All subjects now generate real educational content:

| Subject | Generator | Content type |
|---------|-----------|-------------|
| math | Op-based generators | Computation, problem-solving |
| vie | vie-question-generator.js | Grammar rules, reading strategy |
| sci KNTT | sci-question-generator.js | Actual science facts per topic |
| sci exploratory | science-world.js (37 topics) + science-encyclopedia + additional-science | Wonder-inspiring science |
| eng | FF4 vocabulary + grammar (32 topics) | Vocabulary, patterns, spelling |
| it | it-question-generator.js | Thao tác, công dụng |
| histgeo | histgeo-question-generator.js | Địa danh, nhân vật, sự kiện |
| tech | tech-question-generator.js | Quy trình, dụng cụ |
| music | remaining-subjects-generator.js | Notation, instruments |
| ethics | remaining-subjects-generator.js | Situational: what would you do? |
| life | remaining-subjects-generator.js | Scenario: family/school |
| pe | remaining-subjects-generator.js | Practical: warm-up, technique |
| art | remaining-subjects-generator.js | Observation: color, craft |

**`generateKnttLessonQuestions` is completely removed** from the question pipeline — it was the source of all garbage meta-study questions.

### Lesson Blocks — Theory-first, SGK-sourced

For every module:
- KNTT math: `[theoryBlock]` with op-specific formulas (chu vi, phân số, trung bình cộng...)
- KNTT vie Đọc: `[theoryBlock, readingPageBlock]` — theory + HTS CDN images
- KNTT vie grammar: `[theoryBlock]` — skill-specific SGK content
- KNTT sci: `[theoryBlock, readingPageBlock]` — theory + HTS CDN images
- FF4 English: `[vocabBlock]` — vocabulary intro before questions
- Others: `[theoryBlock]` from enrichLessonBlocks/LESSON_LIBRARY

Theory blocks contain:
- Correct source citation (KNTT SGK, not Cánh Diều)
- Topic-specific formulas and rules
- SGK page references (tr.X-Y)

### Reading Experience (vie Đọc lessons)

- HTS CDN images load with correct page offset (+1, confirmed for book 11382)
- "Xem lại bài đọc" button opens full-screen SGK viewer with zoom +/-
- Review button shows for ALL lesson types ("Xem lại bài học" for theory)
- Zoom: 75/100/125/150/200%, keyboard +/- support

### Exploratory Science — Every Session

Every study session (AM + PM) contains at least 2 exploratory science topics from:
- `science-world.js`: 37 topics (physics, chemistry, biology, universe, anatomy, genetics)
- `science-encyclopedia.js`: 14 topics
- `additional-science-topics.js`: ~15 topics

The `sci-world` virtual subject slot in session patterns guarantees this scheduling.

### Page Numbers — Correct CDN Offset

`hts-book-pages.js`: `getBookPageUrl(bookId, physicalPage)` applies offset +1 (CDN page = physical + 1). Confirmed for book 11382 (TV4 Tập 1).

All 13 KNTT lớp 4 books use offset +1.

## What Is Still Page-Backed (not text-backed)

Vietnamese Đọc reading comprehension questions are generic reading-strategy questions (with lesson title substitution), NOT specific comprehension questions about the text content.

This is intentional: OCR quality from HTS images is not reliable enough to use as canonical text. Students read from the actual SGK images shown via HTS CDN.

The reading questions test:
- Reading strategy ("find evidence in the text")
- Vocabulary in context
- Identifying ý chính (main idea)
- Identifying biện pháp tu từ (rhetorical devices)

This is the best achievable quality without verified machine-readable text.

## Architecture Summary

```
Daily schedule:
  AM session:
    slot 0: math
    slot 1: vie (grammar or reading)
    slot 2: eng (FF4)
    slot 3: sci-world (GUARANTEED exploratory science)
    slot 4: math
    slot 5: sci (any sci topic)
    ...
  PM session:
    slot 0: math
    slot 1: eng
    slot 2: vie
    slot 3: sci-world (GUARANTEED)
    ...

Lesson flow (no warmup since bd7388c):
  [0] Theory block (mini/micro) — SGK-sourced content
  [1] Reading page (reading-page) — HTS CDN images [Đọc lessons only]
  
During practice:
  "📖 Xem lại bài đọc" OR "📘 Xem lại bài học" button → zoom-capable modal
```

## Files Changed This Session (session 5)

- `js/data/fresh-curriculum.js`: sci-world virtual subject, guaranteed per-session slot, fixed minQuestions threshold
- `js/data/sci-question-generator.js` (NEW): Real Khoa học 4 KNTT questions for 12 topic groups
- `js/data/science-world.js`: +10 topics (physics/chemistry/anatomy/universe, total 37)
- `js/data/kntt-topics.js`: sci → generateSciKnttQuestions; generator=null removes garbage fallback

## Commits This Full Engagement

- `bb69bd1`: vie generator + reading blocks + lesson review modal
- `9c667e2`: Fix CDN page offset (+1 for all KNTT books)
- `a40d2bf`: Math theory blocks: topic-specific formulas
- `ef14c2c`: Remove generic/meaningless lesson blocks
- `8f4e17a`: SGK viewer: full-width, zoom +/-, keyboard, scroll
- `448e93f`: Replace garbage meta-questions with real science content
- `4f7369e`: Complete English FF4 grammar coverage (32 topics)
- `bd7388c`: Clean up question voice, remove warmup, add audit script
- `3ec65d7`: Guarantee exploratory sci per session + sci-world slot

## Verifying Deployment

After any deployment, run:
```
node scripts/audit_content_quality.mjs 1 60
```
Should return `"totalFindings": 0`.
