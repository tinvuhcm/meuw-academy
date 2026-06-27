# Phase 04 Performance UX Smoothing Plan

**Date**: 15-06-26  
**Complexity**: COMPLEX (Single phase within a phase program)  
**Status**: 🔨 CODE DONE

## Overview

Pha 04 nhắm vào perceived performance và cảm giác mượt của app, ưu tiên các điểm dễ thấy với người dùng: dialog blocking, luồng lesson/dashboard/parent, và các phụ thuộc runtime có thể gây chậm. Pha này không hứa hẹn benchmark lớn kiểu re-architecture.

## Context and Goals

Nguồn chính:

- `process/context/all-context.md`
- `process/context/uxui/all-uxui.md`
- `process/context/platform/all-platform.md`
- `process/context/tests/all-tests.md`
- `process/general-plans/reports/APP_AUDIT_2026-06-15.md`

Mục tiêu:

- giảm các điểm thiếu mượt thấy rõ
- ưu tiên thay thế dần native blocking dialog ở các bề mặt quan trọng
- đánh giá xem phụ thuộc Tailwind CDN nên giữ tạm hay thay ở bước nhỏ

## Phase Completion Rules

A phase is NOT complete until:

1. **Integration Test** - Works with other system pieces
2. **Manual Test** - User can perform the action
3. **Data Verification** - Database/state changes confirmed
4. **Error Handling** - Failure cases handled gracefully
5. **User Confirmation** - User says "it works"

Status meanings:
- ⏳ PLANNED - Not started
- 🔨 CODE DONE - Written but not E2E tested
- 🧪 TESTING - Currently being tested
- ✅ VERIFIED - Tested AND confirmed working
- 🚧 BLOCKED - Has issues

After each phase, document:
- [ ] What was tested manually
- [ ] Data verified in DB/state
- [ ] Errors encountered and fixed
- [ ] User confirmation received

## Objective

Làm cho trải nghiệm dùng app bớt thô và ít chặn hơn, đặc biệt ở mobile/tablet.

## Dependencies

- Nên chạy sau phase 01 và 02.

## What This Green Check Proves

Khi phase này xanh, ta biết rằng:

- ít nhất một nhóm điểm gây “khựng” hoặc “thiếu mượt” đã được xử lý có bằng chứng
- app không xấu đi về UX ở các đường học chính

## Test Procedure

1. chạy local HTTP server
2. manual smoke trên dashboard, lesson, parent
3. thử các hành vi có `confirm()` / `alert()` trước và sau nếu lane đó bị đụng
4. xác nhận không phát sinh regression thị giác hoặc logic lớn

## Verification Queries

- liệt kê các điểm blocking dialog đã thay hoặc đã quyết định defer
- ghi lại perceived-performance observations trước/sau
- xác nhận các route chính vẫn vào được và render đúng

## Blocker Rules

Đánh dấu `🚧 BLOCKED` nếu:

- cải tiến UX nhỏ buộc phải kéo theo refactor framework lớn
- không có môi trường trình duyệt phù hợp để xác minh bề mặt quan trọng

## Acceptance Criteria

- có ít nhất một gói cải tiến UX/performance cụ thể, đo được hoặc mô tả được rõ
- không làm gãy lesson/dashboard/parent
- report nêu rõ phần nào đã cải thiện, phần nào còn defer

## Implementation Checklist

- [x] Research các bề mặt blocking dialog và phụ thuộc runtime dễ gây chậm
- [x] Chọn gói cải tiến nhỏ nhất nhưng có tác động rõ
- [x] Implement các cải tiến đã chọn
- [ ] Manual smoke các route chính
- [x] Ghi report phase với before/after

## Touchpoints

- `index.html`
- `js/modules/lesson.js`
- `js/modules/parent.js`
- `js/modules/gallery.js`
- `js/modules/shop.js`
- `js/modules/coloring.js`
- CSS liên quan
- `process/features/app-hardening/reports/PHASE_04_PERFORMANCE_UX_SMOOTHING_REPORT_15-06-26.md`

## Public Contracts

- Trải nghiệm học vẫn phải ưu tiên rõ ràng, thân thiện với trẻ em.
- Không hy sinh luật “dạy trước rồi luyện” để đổi lấy tối ưu bề mặt.

## Blast Radius

- route-level UX
- lesson/parent/dashboard interaction
- một phần platform boot surface nếu chọn lane phụ thuộc CDN

## Verification Evidence

- manual smoke notes
- screenshot/video nếu cần
- report trước/sau cho các điểm UX đã chạm

## Resume and Execution Handoff

Khi bước vào EXECUTE:

1. đọc `process/context/uxui/all-uxui.md`
2. đọc `process/context/platform/all-platform.md`
3. giữ scope nhỏ, không mở lane này thành tái kiến trúc frontend

## Update Process Notes

Thực thi cải tiến UX đã hoàn tất và đã có report:

- `process/features/app-hardening/reports/PHASE_04_PERFORMANCE_UX_SMOOTHING_REPORT_15-06-26.md`

Trạng thái hiện tại giữ ở `🔨 CODE DONE`, chưa nâng `✅ VERIFIED`, vì:

- chưa có manual smoke cho `lesson`, `gallery`, `parent`
- chưa có xác nhận người dùng rằng modal nội bộ cho cảm giác mượt hơn

## Next Step

Chạy manual smoke cho:

- rời bài học trong `lesson`
- xóa tranh trong `gallery`
- các thao tác đã thay dialog trong `parent`
