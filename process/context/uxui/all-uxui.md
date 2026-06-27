# Ngữ Cảnh UX/UI

Đây là file vào cửa chuẩn của nhóm ngữ cảnh UX/UI cho Meuw Academy.

Hãy dùng file này sau `process/context/all-context.md` khi tác vụ liên quan tới design system, tương tác bài học, mascot, hoặc layout responsive.

## Phạm Vi

Nhóm này bao phủ:

- hệ thống giao diện trong `css/`
- pattern tương tác của lesson và dashboard
- hành vi của mascot, speech bubble, và phản hồi cảm xúc
- renderer cho question-type và các bề mặt tương tác thân thiện với cảm ứng

Nhóm này không bao phủ:

- độ đúng của curriculum
- policy tài khoản Supabase hoặc quy tắc lưu sync
- plan triển khai theo từng feature

## Đọc Khi Nào

Đọc file này khi:

- thay đổi layout, styling, hoặc hành vi thị giác
- sửa các module tương tác câu hỏi
- chỉnh độ hiện diện của mascot hoặc UX phản hồi
- tinh chỉnh hành vi tablet/mobile cho màn hình học

## Định Tuyến Nhanh

- dùng `docs/DESIGN_SYSTEM.md` để xem ngôn ngữ hình ảnh và luật component mong muốn
- dùng `css/components.css`, `css/question-types.css`, và `css/responsive.css` cho thay đổi styling cụ thể
- dùng `js/modules/lesson.js` cho cấu trúc màn hình lesson và luồng tương tác lesson-first
- dùng `js/modules/dashboard.js` và `js/modules/session.js` cho UX của dashboard và màn duyệt ngày/session
- dùng `js/mascot.js` và `css/mascot.css` cho phần render mascot và speech bubble

## Source Paths

- `docs/DESIGN_SYSTEM.md`
- `css/base.css`
- `css/animations.css`
- `css/components.css`
- `css/mascot.css`
- `css/question-types.css`
- `css/responsive.css`
- `js/modules/lesson.js`
- `js/modules/dashboard.js`
- `js/modules/session.js`
- `js/modules/question-types/`
- `js/mascot.js`

## Khi Nào Cần Cập Nhật

Hãy cập nhật nhóm này khi:

- design system thay đổi đáng kể
- thêm một loại tương tác câu hỏi lớn mới
- giả định layout cho mobile/tablet/desktop thay đổi
- UX mascot trở thành một mảng sản phẩm rộng hơn với doc sâu riêng

## Ghi Chú Chuẩn

- App này cố ý giàu biểu cảm và hướng tới trẻ nhỏ; bỏ hết phần vui để đổi lấy UI generic thường là hướng sai.
- Hiệu năng vẫn quan trọng: app phải giữ được độ nhẹ và mượt dù giao diện giàu hình ảnh.
