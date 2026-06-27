# Phase 05 Content Duplication Audit Plan

**Date**: 15-06-26  
**Complexity**: COMPLEX (Single phase within a phase program)  
**Status**: ⏳ PLANNED

## Overview

Pha 05 tập trung vào mức lặp nội dung và edge cases của hệ sinh curriculum/learning/sync. Đây là pha kết luận chất lượng chiều sâu hơn, dùng dữ liệu audit và scenario review để quyết định đâu là lỗi thật cần sửa tiếp và đâu là sự lặp có chủ đích chấp nhận được.

## Context and Goals

Nguồn chính:

- `process/context/all-context.md`
- `process/context/content-curriculum/all-content-curriculum.md`
- `process/context/tests/all-tests.md`
- `process/general-plans/reports/APP_AUDIT_2026-06-15.md`

Mục tiêu:

- hiểu vì sao `duplicateQuestions` và `duplicateTopics` đang cao
- tách lặp hợp lệ khỏi lặp không mong muốn
- dùng edge-case audit để kiểm tra lane learning + sync + curriculum

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

Chốt một bức tranh trung thực về độ lặp, edge case, và lane follow-up cần có cho nội dung học.

## Dependencies

- Nên chạy sau phase 01 vì script audit cần sạch hơn.
- Có thể phụ thuộc output cleanup/report của phase 02 nếu file nghiên cứu được di chuyển.

## What This Green Check Proves

Khi phase này xanh, ta biết rằng:

- đã có phán quyết rõ ràng về mức lặp hiện tại
- đã có scenario map cho các edge case quan trọng của learning/sync/content
- nếu còn việc lớn, nó đã được tách thành plan/backlog rõ ràng thay vì để mơ hồ

## Test Procedure

1. rerun `node scripts/audit_content_quality.mjs`
2. rerun `node scripts/verify_long_range_schedule.mjs --days 30` hoặc phạm vi phù hợp hơn
3. review sample nội dung trùng
4. chạy scenario review cho learning, sync, content

## Verification Queries

- số liệu duplicateQuestions / duplicateTopics trước và sau nếu có thay đổi
- phân loại lặp hợp lệ vs lặp lỗi
- danh sách edge case mức cao cần follow-up

## Blocker Rules

Đánh dấu `🚧 BLOCKED` nếu:

- không thể phân biệt lặp hợp lệ và lặp lỗi mà không cần một research lane lớn hơn
- sample runtime hiện tại chưa đủ để kết luận trung thực

## Acceptance Criteria

- có report phase kết luận rõ mức lặp hiện tại
- có scenario map hoặc risk map cho learning/sync/content
- nếu cần chương trình tiếp theo, đã có backlog/plan follow-up rõ ràng

## Implementation Checklist

- [ ] Research các nguồn gây duplicate trong `js/data/*` và script audit
- [ ] Chốt phương pháp phân loại lặp hợp lệ vs lỗi
- [ ] Chạy lại script audit liên quan
- [ ] Làm scenario review cho learning, sync, content
- [ ] Viết report phase với kết luận và follow-up nếu cần

## Touchpoints

- `js/data/`
- `scripts/audit_content_quality.mjs`
- `scripts/verify_long_range_schedule.mjs`
- tài liệu nghiên cứu nguồn chính thống
- `process/features/app-hardening/reports/PHASE_05_CONTENT_DUPLICATION_AUDIT_REPORT_15-06-26.md`

## Public Contracts

- Không tự ý “giảm trùng” bằng cách phá vỡ logic học hoặc làm sai chương trình.
- Mọi kết luận về chất lượng nội dung phải ưu tiên trung thực hơn là đẹp số.

## Blast Radius

- content generation
- audit scripts
- future roadmap của curriculum

## Verification Evidence

- output script audit
- sample content review
- scenario table hoặc report kết luận

## Resume and Execution Handoff

Khi bước vào EXECUTE:

1. đọc `process/context/content-curriculum/all-content-curriculum.md`
2. đọc báo cáo audit tổng thể
3. giữ ranh giới lane này là audit/kết luận, không mặc định lao thẳng vào refactor curriculum lớn

## Next Step

Sau phase 04, ENTER RESEARCH MODE cho phase 05 này và chốt cách đo/phân loại duplicate trước khi thực thi audit sâu hơn.
