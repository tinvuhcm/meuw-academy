# Phase 02 Repo Deploy Hygiene Plan

**Date**: 15-06-26  
**Complexity**: COMPLEX (Single phase within a phase program)  
**Status**: ✅ VERIFIED

## Overview

Pha 02 dọn bề mặt repo và deploy: gom artefact thử nghiệm, chuẩn hóa file canonical, và giảm rủi ro đẩy lên Vercel những thứ không phục vụ runtime. Đây là pha vệ sinh cấu trúc và vận hành, không phải refactor kiến trúc ứng dụng.

## Context and Goals

Nguồn chính:

- `process/context/all-context.md`
- `process/context/platform/all-platform.md`
- `process/general-plans/reports/APP_AUDIT_2026-06-15.md`

Mục tiêu:

- xác định artefact root-level nào là rác thật, artefact nào cần archive
- chuẩn hóa doc/spec canonical
- thêm `.vercelignore` nếu cần để hạn chế artefact không phục vụ runtime

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

Giảm noise ở root repo, giảm nhầm lẫn source-of-truth, và làm sạch bề mặt deploy.

## Dependencies

- Nên chạy sau phase 01 để script/audit output sạch hơn.

## What This Green Check Proves

Khi phase này xanh, ta biết rằng:

- root repo gọn hơn và rõ file canonical hơn
- deploy surface ít artefact rác hơn
- cấu hình ignore cho Vercel phản ánh ý định deploy rõ ràng hơn

## Test Procedure

1. `git status --short`
2. review tree root trước/sau
3. `git diff --check`
4. review `.vercelignore` nếu được thêm

## Verification Queries

- danh sách file root trước/sau
- các artefact được move/archive/delete có ghi lý do trong report
- `.vercelignore` loại đúng nhóm file không phục vụ runtime

## Blocker Rules

Đánh dấu `🚧 BLOCKED` nếu:

- không phân biệt được file nào còn đang có giá trị vận hành
- việc dọn file có nguy cơ làm mất nguồn nghiên cứu hoặc tài sản cần cho curriculum

## Acceptance Criteria

- có quyết định rõ với nhóm file trace/test/spec trùng ở root
- nếu thêm `.vercelignore`, file đó phản ánh đúng bề mặt runtime thực
- `git diff --check` sạch sau cleanup

## Implementation Checklist

- [x] Research từng nhóm artefact root-level và phân loại: giữ, archive, move, xóa
- [x] Chốt spec/doc canonical cần giữ
- [x] Thực hiện cleanup hẹp nhất có thể
- [x] Thêm hoặc cập nhật `.vercelignore` nếu cần
- [x] Chạy review tree root và diff hygiene
- [x] Ghi report phase với danh sách trước/sau

## Touchpoints

- repo root
- `.vercelignore`
- `docs/`
- `scripts/`
- `process/features/app-hardening/reports/PHASE_02_REPO_DEPLOY_HYGIENE_REPORT_15-06-26.md`

## Public Contracts

- Bề mặt runtime public của app không được gãy vì cleanup repo.
- Các doc canonical phải được giữ đường dẫn rõ ràng hoặc có redirect/handoff rõ trong report.

## Blast Radius

- file root-level
- cấu hình deploy packaging
- docs/spec tham chiếu

## Verification Evidence

- output `git status --short`
- output `git diff --check`
- danh sách artefact trước/sau trong phase report

## Resume and Execution Handoff

Khi bước vào EXECUTE:

1. đọc `process/context/all-context.md`
2. đọc `process/context/platform/all-platform.md`
3. đọc báo cáo audit tổng thể
4. xử lý cleanup có kiểm soát, tránh xóa bừa các file nghiên cứu

## Update Process Notes

Thực thi cleanup đã hoàn tất và đã có report:

- `process/features/app-hardening/reports/PHASE_02_REPO_DEPLOY_HYGIENE_REPORT_15-06-26.md`

Trạng thái hiện tại đã nâng `✅ VERIFIED`, vì:

- cleanup/archive đã hoàn tất đúng scope
- đã có xác nhận của người dùng rằng cleanup/deploy intent là phù hợp

## Next Step

Bước kế tiếp hợp lệ:

- `ENTER RESEARCH MODE` cho `process/features/app-hardening/active/PHASE_03_SYNC_AUTH_HARDENING_PLAN_15-06-26.md`
