# Phase 01 Runtime Hardening Plan

**Date**: 15-06-26  
**Complexity**: COMPLEX (Single phase within a phase program)  
**Status**: ✅ VERIFIED

## Overview

Pha 01 xử lý những lỗi chắc chắn nhất và dễ chứng minh nhất trong runtime và script audit: bug đổi tên hồ sơ, debug log lọt vào runtime curriculum, và việc script audit nội dung chưa headless-safe. Đây là pha nền vì nếu không xử lý lane này trước, mọi phase sau sẽ tiếp tục bị nhiễu bởi tín hiệu giả và độ tin cậy thấp.

## Context and Goals

Nguồn chính:

- `process/context/all-context.md`
- `process/context/tests/all-tests.md`
- `process/general-plans/reports/APP_AUDIT_2026-06-15.md`

Mục tiêu:

- sửa bug `updateProfileName`
- bỏ `console.log('ORDER 11:', ...)` trong runtime curriculum
- làm `scripts/audit_content_quality.mjs` chạy sạch hơn trong môi trường Node/headless

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

Tăng độ đúng và độ sạch của lane runtime/audit cơ sở, để các phase sau dựa trên tín hiệu test sạch hơn và bề mặt profile không còn bug rõ ràng.

## Dependencies

- Không phụ thuộc phase trước.
- Phụ thuộc vào báo cáo audit hiện tại là nguồn sự thật cho finding.

## What This Green Check Proves

Khi phase này xanh, ta biết rằng:

- bề mặt đổi tên hồ sơ không còn lỗi biến sai hiển nhiên
- runtime curriculum không còn log debug nổi bật đã biết
- script audit nội dung không còn phun lỗi môi trường headless kiểu `localStorage is not defined`

Nó **không** chứng minh rằng toàn bộ app đã mượt hoặc sạch hoàn toàn.

## Test Procedure

1. Chạy `node --check` cho các file vừa sửa.
2. Chạy lại `node scripts/audit_content_quality.mjs`.
3. Chạy lại `node scripts/verify_long_range_schedule.mjs --days 30`.
4. Smoke check local bề mặt profile/rename bằng HTTP local nếu lane profile bị chạm.

## Verification Queries

- So sánh output script trước/sau:
  - không còn spam `localStorage is not defined`
  - không còn `ORDER 11`
- Xác nhận function `updateProfileName` dùng `newName` đúng như contract của hàm

## Blocker Rules

Đánh dấu `🚧 BLOCKED` nếu:

- sửa lane này kéo theo phát hiện schema/profile breakage rộng hơn dự kiến
- script audit phụ thuộc vào refactor lớn của state/runtime vượt khỏi scope pha

## Acceptance Criteria

- `js/state.js` không còn bug gán sai biến trong `updateProfileName`
- `js/data/fresh-curriculum.js` không còn debug log `ORDER 11`
- `scripts/audit_content_quality.mjs` chạy sạch hơn rõ rệt trong Node/headless
- không phát sinh syntax error ở các file bị đụng

## Implementation Checklist

- [x] Research lại các line được audit nêu trong `js/state.js`, `js/data/fresh-curriculum.js`, `scripts/audit_content_quality.mjs`
- [x] Chốt đúng phạm vi sửa nhỏ nhất cho từng finding
- [x] Sửa bug rename profile
- [x] Bỏ debug log runtime curriculum
- [x] Thêm stub hoặc cơ chế headless-safe cần thiết cho script audit nội dung
- [x] Chạy syntax check cho file vừa sửa
- [x] Chạy lại audit script liên quan
- [x] Ghi report phase với output trước/sau

## Touchpoints

- `js/state.js`
- `js/data/fresh-curriculum.js`
- `scripts/audit_content_quality.mjs`
- `scripts/verify_long_range_schedule.mjs`
- `process/features/app-hardening/reports/PHASE_01_RUNTIME_HARDENING_REPORT_15-06-26.md`

## Public Contracts

- Contract đổi tên hồ sơ: hàm rename phải áp đúng tên mới vào active profile
- Contract audit script: script kiểm tra nội dung phải chạy được trong Node mà không sinh lỗi môi trường giả tạo dễ thấy

## Blast Radius

- profile state helper
- curriculum generation log surface
- content audit script

## Verification Evidence

- output `node --check ...`
- output `node scripts/audit_content_quality.mjs`
- output `node scripts/verify_long_range_schedule.mjs --days 30`
- phase report ghi rõ before/after

## Update Process Notes

Thực thi đã hoàn tất đúng 3 finding trong scope và đã qua script verification.

Trạng thái hiện tại đã nâng `✅ VERIFIED` vì:

- đã có manual UI smoke cho rename profile theo xác nhận của người dùng
- đã có user confirmation để chuyển phase

Report hiện tại:

- `process/features/app-hardening/reports/PHASE_01_RUNTIME_HARDENING_REPORT_15-06-26.md`

## Resume and Execution Handoff

Khi bước vào EXECUTE:

1. đọc `process/context/all-context.md`
2. đọc `process/context/tests/all-tests.md`
3. đọc `process/general-plans/reports/APP_AUDIT_2026-06-15.md`
4. chỉ sửa đúng 3 finding đã nêu, không lan sang cleanup repo hoặc hardening auth

## Next Step

ENTER RESEARCH MODE cho phase 01 này. Sau research summary, dừng để chốt scope sửa trước khi ENTER EXECUTE MODE.
