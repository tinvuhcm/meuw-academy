# Phase 03 Sync Auth Hardening Plan

**Date**: 15-06-26  
**Complexity**: COMPLEX (Single phase within a phase program)  
**Status**: ✅ VERIFIED

## Overview

Pha 03 siết các điểm yếu rõ nhất của bề mặt phụ huynh/tài khoản/đồng bộ, nhưng vẫn giữ nguyên mô hình offline-first + Supabase như hiện tại. Đây là hardening có giới hạn, không mở thành một cuộc tái thiết auth system.

## Context and Goals

Nguồn chính:

- `process/context/all-context.md`
- `process/context/sync-auth/all-sync-auth.md`
- `process/context/tests/all-tests.md`
- `process/general-plans/reports/APP_AUDIT_2026-06-15.md`

Mục tiêu:

- giảm sự yếu kém của PIN mặc định
- rà hành vi overwrite/upload/download sync
- tạo đường xác minh thực tế cho setup Supabase hiện hành

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

Nâng mặt bằng an toàn của parent/account/sync lên mức phù hợp hơn cho app có thể chia sẻ cộng đồng.

## Dependencies

- Nên chạy sau phase 01.
- Có thể chạy song song logic với phase 02, nhưng theo program này vẫn giữ tuần tự.

## What This Green Check Proves

Khi phase này xanh, ta biết rằng:

- parent control không còn yếu như mặc định hiện tại
- flow sync overwrite có guard rõ ràng hơn
- có checklist/manual path rõ để xác minh Supabase setup thật

## Test Procedure

1. Manual test parent PIN flow
2. Manual test sign in / sign up / upload / download / sign out
3. Review error path khi chưa cấu hình Supabase
4. Review doc/setup checklist cho production/staging

## Verification Queries

- xác nhận hành vi PIN mới
- xác nhận upload/download không ghi đè mù mà thiếu guard
- xác nhận doc setup phản ánh đúng table/policy cần có

## Blocker Rules

Đánh dấu `🚧 BLOCKED` nếu:

- cần thay đổi schema Supabase production mà chưa có quyền hoặc chưa có môi trường xác minh
- phát hiện vấn đề RLS thực tế nhưng không thể kiểm chứng an toàn trong repo hiện tại

## Acceptance Criteria

- parent PIN không còn dựa vào mặc định yếu như trước mà không có guard
- sync flow có warning/confirm/logic rõ ràng hơn ở điểm ghi đè dữ liệu
- có checklist xác minh môi trường Supabase thật

## Implementation Checklist

- [x] Research bề mặt `js/state.js`, `js/modules/parent.js`, `js/modules/account-sync.js`
- [x] Chốt hardening nhỏ nhất đủ giá trị
- [x] Sửa hoặc bổ sung guard cho parent PIN
- [x] Rà và chỉnh các điểm overwrite sync nếu cần
- [x] Cập nhật doc/checklist Supabase verification
- [x] Chạy manual verification path
- [x] Ghi report phase

## Touchpoints

- `js/state.js`
- `js/modules/parent.js`
- `js/modules/account-sync.js`
- `docs/SUPABASE_SETUP.md`
- `process/features/app-hardening/reports/PHASE_03_SYNC_AUTH_HARDENING_REPORT_15-06-26.md`

## Public Contracts

- Mô hình account vẫn giữ `1 account = 1 bé`, email + password, offline-first có account.
- Không biến sync thành server-authoritative flow.

## Blast Radius

- parent UI
- account sync logic
- PIN and settings behavior
- Supabase setup doc

## Verification Evidence

- manual test log cho parent/account flows
- diff doc setup
- report mô tả guard mới và kết quả test

## Resume and Execution Handoff

Khi bước vào EXECUTE:

1. đọc `process/context/sync-auth/all-sync-auth.md`
2. đọc audit report
3. giữ nguyên mô hình offline-first, tránh mở rộng lane thành refactor auth lớn

## Update Process Notes

Thực thi hardening đã hoàn tất và đã có report:

- `process/features/app-hardening/reports/PHASE_03_SYNC_AUTH_HARDENING_REPORT_15-06-26.md`

Trạng thái hiện tại đã nâng `✅ VERIFIED`, vì:

- đã có manual test cho PIN flow và cloud sync flow
- đã có xác nhận người dùng rằng lane mới hoạt động đúng

## Next Step

Bước kế tiếp hợp lệ:

- `ENTER RESEARCH MODE` cho `process/features/app-hardening/active/PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md`
