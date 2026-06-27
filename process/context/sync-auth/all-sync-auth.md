# Ngữ Cảnh Sync Và Auth

Đây là file vào cửa chuẩn của nhóm ngữ cảnh sync-auth cho Meuw Academy.

Hãy dùng file này sau `process/context/all-context.md` khi tác vụ liên quan tới hồ sơ, local state, phụ huynh, tài khoản, hoặc cloud backup.

## Phạm Vi

Nhóm này bao phủ:

- local state nhiều hồ sơ trong `js/state.js`
- hành vi PIN phụ huynh và settings
- các luồng import/export và reset
- đăng nhập tài khoản bằng Supabase email/password và cloud backup ở chế độ tùy chọn

Nhóm này không bao phủ:

- luật sinh nội dung bài học
- các concern deploy/runtime mang tính chung
- plan triển khai riêng theo feature

## Đọc Khi Nào

Đọc file này khi:

- thay đổi schema hồ sơ hoặc cách lưu tiến độ
- sửa các control tài khoản trong dashboard phụ huynh
- làm việc trên cloud backup, restore, hoặc hành vi conflict
- debug login/session/sync

## Định Tuyến Nhanh

- dùng `js/state.js` làm nguồn sự thật thật sự cho profiles, tiến độ, PIN, sync metadata, import/export, và unlock state
- dùng `js/modules/parent.js` cho UI phụ huynh/tài khoản/sync mà người dùng nhìn thấy
- dùng `js/modules/account-sync.js` cho hành vi Supabase auth và save/load
- dùng `js/modules/account-auto-sync.js` cho upload nền và hydrate từ cloud
- dùng `docs/SUPABASE_SETUP.md` cho cấu trúc bảng/policy Supabase mong muốn và quy tắc conflict

## Source Paths

- `js/state.js`
- `js/modules/parent.js`
- `js/modules/account-sync.js`
- `js/modules/account-auto-sync.js`
- `js/supabase-config.js`
- `docs/SUPABASE_SETUP.md`

## Khi Nào Cần Cập Nhật

Hãy cập nhật nhóm này khi:

- policy tài khoản thay đổi
- chiến lược xử lý conflict của sync thay đổi
- hình thức tích hợp Supabase thay đổi
- schema hồ sơ local thay đổi đáng kể

## Ghi Chú Chuẩn

- Trong lúc học, nguồn sự thật của runtime vẫn là local-first.
- Account sync dùng cho đăng nhập và cloud backup, không phải để biến app thành sản phẩm server-driven.
- Hướng đã chốt là một tài khoản cho một bé, email + password, offline-first nhưng có hỗ trợ account.
