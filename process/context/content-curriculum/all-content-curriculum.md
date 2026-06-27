# Ngữ Cảnh Nội Dung Và Curriculum

Đây là file vào cửa chuẩn của nhóm ngữ cảnh `content-curriculum` cho Meuw Academy.

Hãy dùng file này sau `process/context/all-context.md` khi tác vụ liên quan tới độ đúng của bài học, sinh curriculum, bám nguồn chính thống, hoặc mở rộng theo khối lớp.

## Phạm Vi

Nhóm này bao phủ:

- nội dung bài học và câu hỏi sinh ra trong `js/data/`
- ánh xạ nguồn chính thống và các lesson pool được suy ra
- các lan can chất lượng nội dung như "dạy trước rồi luyện"
- lộ trình từ lớp 4 hiện tại sang lớp 1 đến lớp 5

Nhóm này không bao phủ:

- UI dashboard/profile/account
- cấu hình deploy/runtime chung
- execution report của feature vốn nên nằm ở `process/features/content-curriculum/`

## Đọc Khi Nào

Đọc file này khi:

- sửa curriculum generation, theory blocks, hoặc question banks
- điều tra lỗi nội dung yếu lặp lại hoặc lệch chương trình
- mở rộng độ phủ môn học hoặc chuẩn bị scale sang lớp 1-5
- làm việc với dữ liệu tải về từ nguồn chính thống, manifest, hoặc ghi chú trích xuất

## Định Tuyến Nhanh

- dùng `docs/HANDOFF_BACKLOG_2026-06-03.md` để xem backlog curriculum cấp sản phẩm và mức ưu tiên hiện tại
- dùng `docs/research/official-sources/notes/TEACHER_PEDAGOGY_FRAMEWORK_2026-06-03.md` để xem khung sư phạm đứng sau lane chất lượng bài học
- dùng `js/data/fresh-curriculum.js` cho đường materialize curriculum theo ngày
- dùng `js/data/curriculum-loader.js` cho logic cache và truy xuất dùng chung giữa session và lesson
- dùng `js/data/kntt-topics.js` và `js/data/kntt-lesson-pool.js` cho phần bám nguồn KNTT chính thống
- dùng `scripts/audit_content_quality.mjs` để check regression chất lượng nội dung

## Source Paths

- `docs/HANDOFF_BACKLOG_2026-06-03.md`
- `docs/CURRICULUM_84_DAYS.md`
- `docs/CURRICULUM_90_DAYS.md`
- `docs/research/official-sources/`
- `js/data/`
- `scripts/audit_content_quality.mjs`
- `scripts/build_knowledge_map.mjs`
- `scripts/build_kntt_lesson_pool.mjs`
- `scripts/fetch_official_sources.mjs`

## Khi Nào Cần Cập Nhật

Hãy cập nhật nhóm này khi:

- pipeline sinh curriculum thay đổi đáng kể
- cách thu thập hoặc ánh xạ nguồn chính thống thay đổi
- việc mở rộng vượt ra ngoài lớp 4 trở thành lane triển khai thật
- các luật sư phạm cứng thay đổi

## Ghi Chú Chuẩn

- Khi lỗi nội dung lặp lại, phải sửa generator hoặc source mapping thay vì vá một chuỗi output đơn lẻ.
- Độ đúng của nội dung là yêu cầu sản phẩm, không phải sở thích trình bày.
