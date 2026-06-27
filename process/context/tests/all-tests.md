# Meuw Academy - Toàn Bộ Kiểm Thử

Cập nhật lần cuối: 2026-06-15

Hãy gắn file này trước khi tác vụ liên quan tới kiểm thử, xác minh, hoặc debug test.

Repo này hiện chưa có test runner chuẩn kiểu `package.json` ở root. Việc xác minh hiện là tổ hợp của:

- script Node/Python có mục tiêu rõ trong `scripts/`
- check cú pháp cho browser modules vừa sửa
- smoke test thủ công trên trình duyệt qua HTTP server local

## Cách File Này Hoạt Động

1. đọc `process/context/all-context.md` trước
2. dùng file này để chọn đường xác minh hẹp nhất
3. ưu tiên check ở mức script hoặc file trước khi chạy kiểm thử trình duyệt thủ công toàn phần

## File Này Bao Phủ Gì

- audit chất lượng nội dung
- script xác minh lịch học và curriculum
- check cú pháp cho file ESM chạy trên trình duyệt
- smoke check thủ công qua HTTP/browser
- các khoảng trống hiện có của bề mặt test

## Đọc Khi Nào

Đọc file này khi bạn cần:

- xác minh một thay đổi liên quan tới sinh nội dung
- xác nhận hành vi lesson/session sau khi sửa runtime files
- kiểm tra xem repo hiện có automated coverage nào trước khi làm QA thủ công

## Định Tuyến Nhanh

- dùng `scripts/audit_content_quality.mjs` khi lỗi bài học/câu hỏi xấu lặp lại hoặc giọng teacher bị lệch
- dùng `scripts/verify_long_range_schedule.mjs` khi có vấn đề ở lịch học, unlock flow, hoặc độ phủ ngày học dài hạn
- đọc trực tiếp `js/state.js`, `js/modules/lesson.js`, và `js/data/curriculum-loader.js` khi debug runtime learning-flow
- đọc `docs/HANDOFF_CHECKPOINT_2026-06-05.md` khi nghi bug liên quan tới module IDs, curriculum cache, hoặc các fix gần đây của learning flow

## Hướng Dẫn Chọn Cách Kiểm Thử Nhanh

### Dùng script audit nội dung khi

- thay đổi đụng vào `js/data/*`
- triệu chứng là wording xấu lặp lại, sư phạm yếu, hoặc nội dung lệch chương trình
- người dùng báo cùng một pattern xấu xuất hiện nhiều lần

### Dùng xác minh lịch học khi

- thay đổi đụng vào `js/state.js`, `js/schedule-calendar.js`, hoặc logic mở ngày
- vấn đề liên quan tới current day, streak/mở ngày, hoặc map curriculum dài hạn

### Dùng `node --check` khi

- thay đổi nằm trong browser module và cần check cú pháp nhanh
- chưa có script chuyên biệt hẹp hơn cho file vừa sửa

### Dùng xác minh thủ công trên trình duyệt khi

- hành vi phụ thuộc vào route mounting, DOM rendering, luồng mascot/UI, touch interaction, hoặc browser API như speech recognition
- thay đổi ảnh hưởng tới lesson flow, dashboard, parent UI, hoặc account sync

## Thứ Tự Xác Minh Mặc Định

Trừ khi tác vụ yêu cầu đường khác rõ ràng:

1. chạy script hẹp nhất hoặc check cú pháp hẹp nhất
2. chạy audit rộng hơn nếu thay đổi đụng vào generator hoặc logic tiến độ học
3. chạy smoke check trình duyệt qua HTTP nếu hành vi UI/runtime bị ảnh hưởng

## Lệnh

| Phạm vi | Runner | Lệnh | Ghi chú |
|---|---|---|---|
| chất lượng nội dung | Node | `node scripts/audit_content_quality.mjs` | chốt chặn chính cho lỗi nội dung sinh ra bị xấu lặp lại |
| lịch học dài hạn | Node | `node scripts/verify_long_range_schedule.mjs` | hữu ích sau khi sửa unlock/schedule/calendar |
| build knowledge map | Node | `node scripts/build_knowledge_map.mjs` | xác minh thiên về rebuild cho thay đổi pipeline nội dung |
| build lesson pool | Node | `node scripts/build_kntt_lesson_pool.mjs` | xác minh lane sinh lesson pool từ nguồn |
| check cú pháp hẹp | Node | `node --check js/app.js` | thay bằng bất kỳ browser module vừa sửa |
| smoke local runtime | Python | `python -m http.server 3000` | sau đó mở `http://localhost:3000` trên trình duyệt |
| smoke local thay thế | VS Code Live Server | Live Server tại root repo | hữu ích khi cần xác minh hành vi browser-only tương tác trực tiếp |

## Ghi Nhớ Nhanh Khi Debug

- App này là browser-native ESM SPA, nên lỗi cú pháp hoặc import path thường chỉ lộ ra rõ sau khi serve qua HTTP.
- `file://` không phải đường xác minh đáng tin cho speech API hoặc các hành vi gần PWA/manifest.
- `js/state.js` là nguồn trung tâm cho profile, tiến độ, logic mở ngày, và sync metadata.
- `js/modules/lesson.js` là nguồn trung tâm cho hành vi runtime "dạy trước rồi luyện".
- `js/modules/parent.js`, `js/modules/account-sync.js`, và `js/modules/account-auto-sync.js` cùng nhau định nghĩa UX tài khoản/sync.
- Doc cũ có nhắc `sw.js`, nhưng checkout hiện tại không có file `sw.js`, nên đừng tốn thời gian debug đăng ký service worker không tồn tại.

## Khoảng Trống Hiện Biết

- Không có `package.json` ở root, nên không có bề mặt `npm test` hay runner chuẩn hóa cho CI trong checkout này.
- Không thấy thiết lập Playwright/Vitest/Jest rõ ràng ở root repo.
- Nhiều thay đổi UI và tương tác vẫn bắt buộc phải xác minh thủ công trên trình duyệt.
- Hành vi speech-recognition phụ thuộc hỗ trợ của trình duyệt và không thể tin hoàn toàn chỉ bằng static analysis.
