# Meuw Academy Handoff Checkpoint

Updated: `2026-06-03 14:35:00 +07:00`
Repo branch at handoff: `master`

## Read Order

1. [F:/projects/meuw_academy/docs/HANDOFF_CHECKPOINT_2026-06-03.md](F:/projects/meuw_academy/docs/HANDOFF_CHECKPOINT_2026-06-03.md)
2. [F:/projects/meuw_academy/docs/HANDOFF_BACKLOG_2026-06-03.md](F:/projects/meuw_academy/docs/HANDOFF_BACKLOG_2026-06-03.md)
3. [F:/projects/meuw_academy/docs/research/official-sources/README.md](F:/projects/meuw_academy/docs/research/official-sources/README.md)

## Purpose

This checkpoint is for another coding agent such as Claude or Antigravity to continue work in `F:\projects\meuw_academy` without re-discovering the product direction, runtime truth, official-source policy, or the SGK extraction lane.

## Runtime Truth

Trust the runtime JS files, not the old specs.

Primary runtime files:

- [F:/projects/meuw_academy/index.html](F:/projects/meuw_academy/index.html)
- [F:/projects/meuw_academy/js/app.js](F:/projects/meuw_academy/js/app.js)
- [F:/projects/meuw_academy/js/router.js](F:/projects/meuw_academy/js/router.js)
- [F:/projects/meuw_academy/js/state.js](F:/projects/meuw_academy/js/state.js)
- [F:/projects/meuw_academy/js/schedule-calendar.js](F:/projects/meuw_academy/js/schedule-calendar.js)
- [F:/projects/meuw_academy/js/data/fresh-curriculum.js](F:/projects/meuw_academy/js/data/fresh-curriculum.js)
- [F:/projects/meuw_academy/js/data/official-knowledge-map.js](F:/projects/meuw_academy/js/data/official-knowledge-map.js)
- [F:/projects/meuw_academy/js/modules/dashboard.js](F:/projects/meuw_academy/js/modules/dashboard.js)
- [F:/projects/meuw_academy/js/modules/session.js](F:/projects/meuw_academy/js/modules/session.js)
- [F:/projects/meuw_academy/js/modules/lesson.js](F:/projects/meuw_academy/js/modules/lesson.js)
- [F:/projects/meuw_academy/js/modules/parent.js](F:/projects/meuw_academy/js/modules/parent.js)
- [F:/projects/meuw_academy/js/modules/account-sync.js](F:/projects/meuw_academy/js/modules/account-sync.js)
- [F:/projects/meuw_academy/js/modules/account-auto-sync.js](F:/projects/meuw_academy/js/modules/account-auto-sync.js)

Current product characteristics:

- Static SPA, no build step
- Hash router
- Local-first state with Supabase account sync
- `1 account = 1 bé`
- Lesson-first pedagogy
- Year-scale scheduler, not only 90 days
- Manual JSON backup/restore kept as escape hatch

## Product Direction Already Locked

These decisions are already made and should not be reopened unless the user explicitly changes them:

- `1 account = 1 bé`
- `Email + password`
- `offline-first có account`
- explicit conflict choice before overwriting local or cloud
- keep JSON backup/restore
- `Lesson first!`
- short theory blocks before practice
- science may extend beyond SGK if the source is educationally sound

## Official Source Policy

Only these school-source lanes are approved:

- `https://hanhtrangso.nxbgd.vn/`
- `https://www.hoc10.vn/`

Do not widen school-source crawling to random SGK mirrors or low-quality aggregator sites.

Reference files:

- [F:/projects/meuw_academy/docs/research/official-sources/README.md](F:/projects/meuw_academy/docs/research/official-sources/README.md)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/official-source-registry.json](F:/projects/meuw_academy/docs/research/official-sources/notes/official-source-registry.json)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-lop4-book-index.json](F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-lop4-book-index.json)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/hts-lop4-book-indexes.json](F:/projects/meuw_academy/docs/research/official-sources/notes/hts-lop4-book-indexes.json)

Content policy already chosen by the user:

- Use both `Chân Trời Sáng Tạo` and `Kết Nối Tri Thức` as knowledge input.
- Do not mirror the books mechanically.
- English follows `Family & Friends 4` as the main SGK/program anchor.
- `Explore Our World / Tiếng Anh 4 (Cánh Diều)` is only a support lane for teacher packs, pacing, flash cards, audio, and other helper assets unless the user says otherwise.
- Science remains broader and more exploratory than the SGK lanes.

## Knowledge Map and Schedule State

The app already has a year-scale schedule and a first-pass official knowledge map.

Artifacts:

- [F:/projects/meuw_academy/docs/research/official-sources/notes/knowledge-map-lop4.json](F:/projects/meuw_academy/docs/research/official-sources/notes/knowledge-map-lop4.json)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/year-study-plan-2026-2027.json](F:/projects/meuw_academy/docs/research/official-sources/notes/year-study-plan-2026-2027.json)

What is already true:

- scheduler spans the school year into roughly `2027-05-22`
- weekdays after `2026-09-07` merge into one `2h` study block
- weekends and special off-school days still keep heavier study shape
- day unlock exists for parents
- current-day progress is not supposed to collapse back silently after manual unlock

What is not yet complete:

- subject coverage is still uneven across the year
- topic-family repetition is still higher than ideal
- smaller subjects are in the map, but their pool depth is still much thinner than the main subjects

## SGK Extraction and Lesson Runtime Status

This is the most important current lane.

### What is already working

- `KNTT` lessons are bridged into the runtime catalog through [F:/projects/meuw_academy/js/data/kntt-topics.js](F:/projects/meuw_academy/js/data/kntt-topics.js).
- KNTT lesson topics now carry short SGK-based `Gâu tiên sinh` theory blocks before practice.
- `Tiếng Việt` reading lessons can show actual SGK page images from the `Hành Trang Số` CDN as `reading-page` blocks.
- During practice, the learner can reopen `Xem lại bài học` and `Xem lại bài đọc` inline in the lesson screen.
- Runtime QA from PPTX has been disabled for the SGK-sensitive lanes:
  - `vie`
  - `histgeo`
  - `art`
  - `tech`
  - `it`
- The PPTX runtime lane is currently kept only for `sci`.

Relevant files:

- [F:/projects/meuw_academy/js/data/kntt-topics.js](F:/projects/meuw_academy/js/data/kntt-topics.js)
- [F:/projects/meuw_academy/js/data/kntt-lesson-pool.js](F:/projects/meuw_academy/js/data/kntt-lesson-pool.js)
- [F:/projects/meuw_academy/js/data/hts-book-pages.js](F:/projects/meuw_academy/js/data/hts-book-pages.js)
- [F:/projects/meuw_academy/js/modules/lesson.js](F:/projects/meuw_academy/js/modules/lesson.js)
- [F:/projects/meuw_academy/js/data/fresh-curriculum.js](F:/projects/meuw_academy/js/data/fresh-curriculum.js)

### Important architecture fix already found

A real runtime bug was found in the local branch:

- `mergeSupplemental()` had been dropping `generator` and KNTT metadata while merging topics into the runtime catalog.

This was important because it made topics appear in the schedule but not carry the actual generator/lesson metadata needed by the lesson screen.

### What is true about SGK fidelity right now

Be precise. Do not oversell this lane.

- Exact reading display is currently page-backed, not text-backed.
- The app can show the exact SGK pages for a lesson span from HTS.
- KNTT-generated practice is still mostly metadata-driven from:
  - `book`
  - `unit`
  - `lesson`
  - `skill`
  - `page`
- This is better than PPTX garbage, but it is not yet a full machine-readable SGK corpus.

### OCR and text-extraction status

What has been investigated:

- `tesseract.js` is available in the bundled workspace dependencies.
- Vietnamese OCR model was downloaded locally for testing.
- OCR was tested against HTS page images.

Current conclusion:

- OCR is technically runnable, but current raw quality is not trustworthy enough to treat as canonical SGK full text.
- `hts-lop4-book-indexes.json` appears to provide structure and lineage, not clean lesson text.
- `Hoc10` slide JSON can help as teacher/support guidance, but should not be mistaken for exact SGK text.

Therefore:

- keep the page-backed reading lane
- keep lesson-first short theory blocks
- deepen the subject-specific generators
- keep searching for an official text-layer or reader payload before trusting OCR

## Sync and Progress State

Account sync is already in the repo and should be treated as local-first with explicit conflict handling.

Key files:

- [F:/projects/meuw_academy/js/modules/account-sync.js](F:/projects/meuw_academy/js/modules/account-sync.js)
- [F:/projects/meuw_academy/js/modules/account-auto-sync.js](F:/projects/meuw_academy/js/modules/account-auto-sync.js)
- [F:/projects/meuw_academy/docs/SUPABASE_SETUP.md](F:/projects/meuw_academy/docs/SUPABASE_SETUP.md)

Already true:

- Firebase Cloud ID / Sync Code is gone
- Supabase is the account lane
- JSON backup/restore remains
- manual unlock exists for parents

Guardrail:

- do not silently overwrite local or cloud
- any change touching sync must be verified carefully on cross-device hydration

## Dirty Worktree at Handoff

The tree is not clean. Another agent must not reset it blindly.

Observed modified files:

- [F:/projects/meuw_academy/docs/HANDOFF_CHECKPOINT_2026-06-02.md](F:/projects/meuw_academy/docs/HANDOFF_CHECKPOINT_2026-06-02.md)
- [F:/projects/meuw_academy/js/data/fresh-curriculum.js](F:/projects/meuw_academy/js/data/fresh-curriculum.js)
- [F:/projects/meuw_academy/js/data/kntt-topics.js](F:/projects/meuw_academy/js/data/kntt-topics.js)
- [F:/projects/meuw_academy/js/data/lesson-blocks.js](F:/projects/meuw_academy/js/data/lesson-blocks.js)
- [F:/projects/meuw_academy/js/modules/lesson.js](F:/projects/meuw_academy/js/modules/lesson.js)
- [F:/projects/meuw_academy/js/modules/question-types/FillBlank.js](F:/projects/meuw_academy/js/modules/question-types/FillBlank.js)

Observed untracked items:

- [F:/projects/meuw_academy/docs/HANDOFF_BACKLOG_2026-06-03.md](F:/projects/meuw_academy/docs/HANDOFF_BACKLOG_2026-06-03.md)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-slide-download-manifest.json](F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-slide-download-manifest.json)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/hts-image-download-manifest.json](F:/projects/meuw_academy/docs/research/official-sources/notes/hts-image-download-manifest.json)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/pptx-content/](F:/projects/meuw_academy/docs/research/official-sources/notes/pptx-content/)
- [F:/projects/meuw_academy/js/data/hts-book-pages.js](F:/projects/meuw_academy/js/data/hts-book-pages.js)
- [F:/projects/meuw_academy/scripts/_test_pptx.py](F:/projects/meuw_academy/scripts/_test_pptx.py)
- [F:/projects/meuw_academy/tools/](F:/projects/meuw_academy/tools/)
- [F:/projects/meuw_academy/vie.traineddata](F:/projects/meuw_academy/vie.traineddata)

Do not assume all of these should be committed. Inspect first.

## Verified Facts Before Handoff

These were verified in the local branch before this handoff:

- `node --check` passed for:
  - [F:/projects/meuw_academy/js/data/hts-book-pages.js](F:/projects/meuw_academy/js/data/hts-book-pages.js)
  - [F:/projects/meuw_academy/js/data/kntt-topics.js](F:/projects/meuw_academy/js/data/kntt-topics.js)
  - [F:/projects/meuw_academy/js/modules/lesson.js](F:/projects/meuw_academy/js/modules/lesson.js)
- Sample KNTT reading lessons materialize with SGK page spans such as `tr.12-13` and `tr.55-56`.
- Sample `6` days materialized with `0` modules under `4` questions.
- Duplicate title pattern `Kể chuyện: Kể chuyện: ...` was fixed in the current local lane.

## What Another Agent Should Do Next

Read the backlog file next:

- [F:/projects/meuw_academy/docs/HANDOFF_BACKLOG_2026-06-03.md](F:/projects/meuw_academy/docs/HANDOFF_BACKLOG_2026-06-03.md)

The next major lane is not generic UI polish. It is:

- deepen the official-source lesson corpus
- deepen SGK-aligned generators by `unit / lesson / skill`
- keep the page-backed reading path
- do not fake machine-readable full text until it is real
