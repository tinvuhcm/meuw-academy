# Meuw Academy Handoff Checkpoint

Updated: `2026-06-03 (session 3 — SGK-first completion)`
Repo branch: `master`
Commit: `3ce7389` — Add SGK-first generators for IT, HistGeo, Tech

## Subject Generator Coverage (FINAL)

| Subject | Generator | Status |
|---------|-----------|--------|
| math | generateMathQuestions (op-based, fresh-curriculum.js) | ✅ SGK-first |
| vie | generateVietnameseQuestions (vie-question-generator.js) | ✅ SGK-first |
| sci | science-world.js + PPTX (only subject still using PPTX) | ✅ Good |
| eng | buildEnglishUnit (english-topics.js, FF4 vocab) | ✅ FF4-first |
| it | generateItQuestions (it-question-generator.js) | ✅ SGK-first NEW |
| histgeo | generateHistgeoQuestions (histgeo-question-generator.js) | ✅ SGK-first NEW |
| tech | generateTechQuestions (tech-question-generator.js) | ✅ SGK-first NEW |
| music, life, pe, ethics, art | generateKnttLessonQuestions | ⚠️ Meta-level (smaller subjects) |

## Theory Coverage (Gâu tiên sinh before practice)

| Subject | Source |
|---------|--------|
| math | getOfficialMathTheory (official-theory-snippets.js) |
| vie | getOfficialVietnameseTheory (covers: danh từ, động từ, tính từ, trạng ngữ, câu chủ-vị, nhân hóa, dấu câu, đọc/viết) |
| it | getOfficialItTheory (covers: phần cứng/mềm, bàn phím, Internet, file/folder, đạo đức số, trình chiếu, soạn thảo, lập trình) |
| histgeo | getOfficialHistgeoTheory (covers: Đền Hùng, Thăng Long, sông Hồng, Tây Nguyên, Nam Bộ + generic) |
| eng | getOfficialEnglishTheory (covers: jobs, present simple, routines, classroom, feelings, subjects) |

## Lesson Display (lesson.js)

- Reading lessons (vie Đọc): theory block + reading-page block (HTS CDN images, multi-page)
- Grammar/skill lessons: theory block (Gâu tiên sinh)
- All lessons: "Xem lại bài đọc" / "Xem lại bài học" inline popup during questions
- Source page button (📘 Xem trang SGK thật) in theory block when pages available

## Remaining Gaps

- music, life, pe, ethics, art: still meta-level questions (not critical for core learning)
- English: more FF4 unit vocabulary and sentence patterns needed (english-topics.js is a good base)
- Reading comprehension questions for vie Đọc lessons: HTS images shown but no text-layer yet
- Official text extraction from HTS/hoc10: OCR quality not yet trustworthy (see HANDOFF_CHECKPOINT_2026-06-03b.md)

## Pedagogy Principles Applied (from taphuan.nxbgd.vn / NXBGD teacher guide)

1. **Lesson-first**: Gâu tiên sinh shows theory BEFORE practice questions
2. **Practical connection**: Questions always tie to real-world use cases
3. **Safety & ethics**: IT lessons emphasize an toàn thông tin, đạo đức số
4. **Process-based**: Tech/craft lessons focus on quy trình, not just facts
5. **Regional identity**: HistGeo questions connect to actual địa danh/nhân vật/sự kiện
6. **Review inline**: "Xem lại bài học" available at any point during practice

## Read Order for Next Agent

1. This file
2. docs/HANDOFF_BACKLOG_2026-06-03.md
3. js/data/vie-question-generator.js — pattern for question bank structure
4. js/data/histgeo-question-generator.js — pattern for topic→bank routing
5. js/data/official-theory-snippets.js — where to add new theory blocks
6. js/data/kntt-topics.js — how generators wire into catalog
