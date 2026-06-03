# Meuw Academy Backlog Handoff

Updated: `2026-06-03 14:35:00 +07:00`

Read first:

1. [F:/projects/meuw_academy/docs/HANDOFF_CHECKPOINT_2026-06-03.md](F:/projects/meuw_academy/docs/HANDOFF_CHECKPOINT_2026-06-03.md)

## Ground Rules

Do not restart product discovery.

Already locked:

- runtime JS is the source of truth
- official school-source policy is only `Hành Trang Số` and `Hoc10`
- account model is `1 account = 1 bé`
- pedagogy is `Lesson first!`
- science stays broader than SGK

Do not waste time on:

- bringing back Firebase Cloud ID / Sync Code
- adding random SGK mirror websites
- generic redesign without curriculum gain
- pretending OCR output is exact SGK text when it is not

## Priority 1: Build a Real Lesson-Depth Official Corpus

Target structure:

- `subject`
- `book set`
- `unit`
- `lesson`
- `skill`
- `lesson block`
- `practice pool`

Priority order:

1. `Toán`
2. `Tiếng Việt`
3. `English`
4. `Tin học`
5. `Lịch sử và Địa lí`
6. `Mĩ thuật`
7. `Âm nhạc`
8. `Đạo đức`
9. `Công nghệ`
10. `Hoạt động trải nghiệm`
11. `Giáo dục thể chất`

Current truth:

- KNTT lesson bridge exists
- exact reading display is page-backed by HTS
- question generation is still mostly metadata-driven for KNTT
- smaller subjects are still too thin for long-term scheduling

Deliverables expected from this lane:

- denser lesson data under `docs/research/official-sources/notes/`
- or a structured runtime file under `js/data/`
- each subject should be bled down from `topic family` into `unit / lesson / skill`

## Priority 2: Subject-Specific Generator Upgrade

Current generators are not yet deep enough.

Build or improve generators for:

- `Toán`
  - operation-specific
  - concept-specific
  - lesson-specific
  - stronger lesson-first theory for new concepts
- `Tiếng Việt`
  - reading
  - luyện từ và câu
  - viết
  - nói và nghe
- `English`
  - Family & Friends 4 is the main SGK/program anchor
  - Explore Our World assets may support media/teacher guidance only
  - unit vocabulary
  - pattern sentences
  - short dialogue
  - reading and comprehension
- `Tin học`
  - thao tác
  - công dụng
  - quy trình
  - an toàn
- `Lịch sử và Địa lí`
  - địa danh
  - bản đồ
  - đặc điểm
  - nhân vật
  - sự kiện

Guardrails:

- ordinary MCQ should have exactly `1` correct answer
- if multiple answers are correct, the UI must explicitly say so
- explanations must not imply a valid alternative answer is wrong

## Priority 3: Keep SGK Reading Honest

This lane is important because it is easy to fake badly.

Already acceptable:

- show exact SGK pages from HTS as the reading content
- show short useful `Gâu tiên sinh` theory before practice
- let the learner reopen reading/theory inline during practice

Not yet acceptable:

- claiming OCR output is canonical text
- using teacher-slide prose as if it were exact SGK text

Practical next step:

- continue searching for official reader payloads or hidden text-layer APIs
- only if a trustworthy source is found, upgrade from `page-backed` to `text-backed`

## Priority 4: Make the Year Schedule Richer, Not Just Longer

The year-scale scheduler already exists. The weak point is corpus depth.

Do next:

- increase subject balance so `Khác` is educationally valid
- reduce topic-family repetition by splitting to `unit / lesson / skill`
- ensure each day has enough stable modules without forcing repeated families

The schedule should remain:

- long-range
- non-repetitive
- robust against progress sync and manual unlock

## Priority 5: Expand `Khác` with Real School Subjects

`Khác` should become a credible lane, not a dumping ground.

Add credible content for:

- `Lịch sử và Địa lí`
- `Mĩ thuật`
- `Âm nhạc`
- `Đạo đức`
- `Công nghệ`
- `Hoạt động trải nghiệm`
- `Giáo dục thể chất`

Every topic should have:

- clean short title
- short theory block
- enough questions to avoid falling back immediately

## Priority 6: Protect Stable Existing Features

When editing curriculum/runtime lanes, do not break:

- account sync
- parent conflict choice
- manual day unlock
- review popup
- current session/day routing
- backup/restore JSON

Any change touching sync/progress must be treated as high risk.

## Concrete Next Tasks

### Task A

Write or extend a script that converts official-source lineage into a denser lesson dataset for:

- `Toán`
- `Tiếng Việt`
- `Tin học`
- `Lịch sử và Địa lí`

### Task B

Deepen [F:/projects/meuw_academy/js/data/kntt-topics.js](F:/projects/meuw_academy/js/data/kntt-topics.js) so its generators become more lesson-specific and less generic.

### Task C

Investigate official reader payloads for machine-readable text before relying on OCR.

### Task D

Add more credible pools for the smaller subjects so `Khác` becomes stable in the year schedule.

## Verify Before Shipping

Before any release tied to this lane, verify at least:

- no subject card opens a lesson from another subject
- `Xem lại bài đọc` and `Xem lại bài học` work inline without resetting progress
- KNTT topics still materialize enough questions
- SGK-sensitive subjects do not fall back to PPTX garbage
- account sync does not silently overwrite local progress
- manual day unlock still survives progress sync
