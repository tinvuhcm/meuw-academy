# Ngữ Cảnh Lập Kế Hoạch

Đây là file vào cửa chuẩn của nhóm ngữ cảnh lập kế hoạch cho Meuw Academy.

Hãy dùng file này sau `process/context/all-context.md` khi tác vụ cần cân form plan, kiểm tra quy ước lập kế hoạch, hoặc xem ví dụ plan triển khai.

## Phạm Vi

Nhóm này bao phủ:

- cách quyết định SIMPLE hay COMPLEX cho repo này
- nơi plan nên được lưu (`general-plans` hay `features`)
- các form plan tham chiếu đi kèm theo harness

Nhóm này không bao phủ:

- nội dung chi tiết của active plan đang chạy
- execution report
- các backlog note rời rạc trong `docs/`

## Đọc Khi Nào

Đọc file này khi:

- tạo plan triển khai mới
- quyết định xem một lane nội dung có đủ lớn để tách sang feature folder riêng không
- nối lại một plan cũ và cần kiểm tra form của nó còn khớp protocol hiện tại không

## Định Tuyến Nhanh

- dùng `process/development-protocols/references/example-simple-prd.md` để cân một plan hẹp hoặc làm trong một phiên
- dùng `process/development-protocols/references/example-complex-prd.md` để cân công việc nhiều pha hoặc rủi ro cao
- dùng `process/development-protocols/phase-programs.md` khi lane là mở rộng khối lớp lớn hoặc chương trình hướng tới cộng đồng

## Ghi Chú Lập Kế Hoạch Riêng Của Repo

- Dùng `process/features/content-curriculum/` cho các lane curriculum lớn và mở rộng khối lớp.
- Dùng `process/features/learning/` cho thay đổi lớn ở luồng học hoặc kiến trúc session.
- Dùng `process/features/dashboard-settings/` cho phụ huynh, hồ sơ, tài khoản, và settings.
- Dùng `process/features/extra/` cho gallery, phụ kiện mascot, thẻ kiến thức, tô màu, hoặc reward loop phụ.
- Giữ các việc cắt ngang repo trong `process/general-plans/`.

## Source Paths

- `process/development-protocols/references/example-simple-prd.md`
- `process/development-protocols/references/example-complex-prd.md`
- `process/development-protocols/phase-programs.md`
- `process/development-protocols/plan-lifecycle.md`

## Khi Nào Cần Cập Nhật

Hãy cập nhật nhóm này khi:

- quy tắc lưu plan thay đổi
- ownership của feature folder thay đổi
- harness cập nhật contract của example plan
