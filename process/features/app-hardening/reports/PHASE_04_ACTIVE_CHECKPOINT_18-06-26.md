# Phase 04 Active Checkpoint

**Date**: 18-06-26  
**Feature**: `app-hardening`  
**Selected Plan**: [PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md](/F:/projects/meuw_academy/process/features/app-hardening/active/PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md)  
**Umbrella Plan**: [APP_HARDENING_PROGRAM_PLAN_15-06-26.md](/F:/projects/meuw_academy/process/features/app-hardening/active/APP_HARDENING_PROGRAM_PLAN_15-06-26.md)  
**Current Status**: `Phase 04 = 🔨 CODE DONE`, chưa `✅ VERIFIED`

## Mục Đích

Checkpoint này dùng để handoff cho Gemini / Claude / Codex khác tiếp tục đúng lane đang active mà không cần đọc lại toàn bộ chat history.

## Read Order

1. [process/context/all-context.md](/F:/projects/meuw_academy/process/context/all-context.md)
2. [APP_HARDENING_PROGRAM_PLAN_15-06-26.md](/F:/projects/meuw_academy/process/features/app-hardening/active/APP_HARDENING_PROGRAM_PLAN_15-06-26.md)
3. [PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md](/F:/projects/meuw_academy/process/features/app-hardening/active/PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md)
4. [PHASE_04_PERFORMANCE_UX_SMOOTHING_REPORT_15-06-26.md](/F:/projects/meuw_academy/process/features/app-hardening/reports/PHASE_04_PERFORMANCE_UX_SMOOTHING_REPORT_15-06-26.md)
5. File checkpoint này

## Điều Đã Xác Nhận Trước Đó

- Phase 01, 02, 03 đã `✅ VERIFIED`
- Phase 04 đã thay phần lớn native `confirm()` / `alert()` ở `lesson`, `gallery`, `parent` bằng modal nội bộ
- Manual test trước đó đã pass các lane:
  - lesson leave modal
  - gallery delete modal
  - parent local/cloud modal flows
- Ràng buộc an toàn dữ liệu đã được xác nhận:
  - không đụng account thật `tinvu.hcm@gmail.com`
  - chỉ dùng `tinvu.hcm1@gmail.com` cho cloud test

## Vấn Đề Còn Active

Hai bug vẫn đang là lane mở của Phase 04:

1. Mobile lesson:
   - mascot Gâu tiên sinh và khối tiến trình còn che nội dung bài học
   - ảnh lỗi đã được user cung cấp trong chat

2. Coloring studio:
   - lưu tranh thực tế thành công nhưng UX hoàn tất chưa đúng
   - đã từng xuất hiện native confirm kiểu "Chưa lưu tranh, em có chắc muốn thoát?"
   - user báo fix trước đó chưa có hiệu lực trên runtime đang thấy

## Các File Runtime Đang Chạm Tới Ở Lane Này

- [js/modules/lesson.js](/F:/projects/meuw_academy/js/modules/lesson.js)
- [css/responsive.css](/F:/projects/meuw_academy/css/responsive.css)
- [js/modules/coloring.js](/F:/projects/meuw_academy/js/modules/coloring.js)
- [js/modules/question-types/DrawingCanvas.js](/F:/projects/meuw_academy/js/modules/question-types/DrawingCanvas.js)

## Patch Gần Nhất Đã Có Trong Worktree

Lane lesson mobile:
- chuyển sticky sidebar sang class desktop-only `lesson-sidebar-desktop-sticky`
- thêm class `lesson-mascot-shell`
- ép mobile CSS về `position: static`, mascot nhỏ ~`56px`, bubble không overlay

Lane coloring:
- thay confirm native ở nút trở về thư viện bằng `showConfirmDialog()`
- sau khi save, remount trực tiếp `renderColoringLibrary()`
- thêm toast lưu thành công
- thêm fallback `Router.replace('/coloring?saved=1')` nếu callback hoàn tất bị vấp
- thay confirm native nút xóa canvas bằng modal nội bộ

## Điểm Quan Trọng Khi Resume

- Có dấu hiệu tab `localhost` của user đang giữ JS/CSS cũ hoặc state cũ:
  - chuỗi native confirm trong ảnh user không còn tồn tại trong source hiện tại
  - browser nội bộ của Codex ở phiên trước bị policy chặn reload trực tiếp `localhost`, nên chưa verify runtime bằng automation
- Vì vậy, agent kế tiếp phải phân biệt rõ:
  - lỗi code thật
  - với lỗi tab stale / hard-refresh chưa ăn

## Manual Retest Ưu Tiên

Theo đúng thứ tự:

1. Hard refresh tab app bằng `Ctrl+Shift+R`
2. Vào lại `#/lesson/1/d1-pm-4`
3. Xác nhận mascot và tiến trình không che text bài học
4. Vào `#/coloring`
5. Mở một tranh bất kỳ
6. Bấm `Lưu & Hoàn thành`
7. Kỳ vọng:
   - hiện toast thành công
   - quay về thư viện tô màu
   - không còn native confirm
8. Bấm `Trở về thư viện` trước khi lưu
9. Kỳ vọng:
   - hiện modal nội bộ
   - không còn dialog native của trình duyệt

## Trạng Thái Git / Worktree Khi Handoff

Theo `vc-watzup` lúc tạo checkpoint:

- branch hiện tại: `master`
- worktree: `dirty`
- selected plan được chốt tường minh là `process/features/app-hardening/active/PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md`

Lưu ý:
- worktree có nhiều thay đổi khác ngoài riêng Phase 04
- agent tiếp theo không được tự ý revert những thay đổi không do mình tạo

## Next Valid State

1. verify lại runtime sau hard refresh
2. nếu 2 bug đã hết:
   - cập nhật report Phase 04
   - nâng Phase 04 lên `✅ VERIFIED`
   - quay về umbrella và chuẩn bị `ENTER RESEARCH MODE` cho Phase 05
3. nếu 1 trong 2 bug còn:
   - tiếp tục ở `ENTER EXECUTE MODE` cho đúng selected plan hiện tại
   - không nhảy sang Phase 05

## Safety Constraints

- Không ảnh hưởng việc học bình thường của bé trên production `https://meuwacademy.vercel.app/`
- Không dùng account `tinvu.hcm@gmail.com` cho test
- Chỉ test cloud bằng `tinvu.hcm1@gmail.com`
- Không tự ý reset hoặc ghi đè cloud data production
