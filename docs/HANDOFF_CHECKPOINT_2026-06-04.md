# Meuw Academy Handoff Checkpoint

Updated: `2026-06-04 (session 6 — auto-unlock + session UX)`
Repo branch: `master`
Latest commit: `be7e4a1`

## What Works in Production Right Now

### Auto-Unlock System — Completion-Driven (NEW)

Previously: day N+1 only unlocked when the **calendar date** reached N+1.
Now: day N+1 unlocks **immediately** when the child completes ≥80% of day N's modules.

**How it works (`state.js` — `syncDailyProgress`):**
```
autoTargetDay = clampDay(sequentialPassedDays + 1)  ← no calendar cap
```
`sequentialPassedDays` = number of consecutively passed days (each ≥80% completion).
When this advances, `currentDay` advances and the child sees the next day's content.

**Unlock threshold:** `DAILY_PASS_THRESHOLD = 0.8` (80% of all modules in the day).

**UI notifications:**
- `lesson.js` `showCompletion()`: detects `newDay > prevDay`, shows "🔓 Ngày X đã mở khóa!" banner + changes "Tiếp tục" → "Học ngày X →"
- `session.js` done box: shows "Ngày X đã mở!" card with one-tap link when next day is accessible
- Done box also shows contextual subtitles: suggests other session if only AM or PM done

### Question Quality — 0 garbage items (days 1-365)

Content audit (`scripts/audit_content_quality.mjs 1 365`): **0 findings**.

### Lesson Blocks — Theory-first, SGK-sourced

(unchanged from session 5 — see HANDOFF_CHECKPOINT_2026-06-03e.md)

### Reading Experience (vie Đọc lessons)

- HTS CDN images load with correct page offset (+1)
- "Xem lại bài đọc" button opens full-screen SGK viewer with zoom +/-
- Review button shows for ALL lesson types

### Exploratory Science — Every Session

Every AM + PM session contains at least 2 exploratory science topics.
The `sci-world` virtual subject slot guarantees this.

### Parent Dashboard — Progress Banner (NEW)

Stats tab now shows:
- Current day number
- Sequential days passed / total program days
- Progress percentage bar
- Explanation of the ≥80% auto-unlock rule (so parents understand the system)

## Architecture Summary

```
Daily schedule:
  AM session: math, vie, eng, sci-world, math, vie, eng, sci, math, sci, eng, math, vie, sci
  PM session: math, eng, vie, sci-world, math, eng, vie, sci, math, sci
  sci-world slot = guaranteed exploratory science (extended lane)

Lesson flow:
  [0] Theory block (mini/micro) — SGK-sourced content
  [1] Reading page (reading-page) — HTS CDN images [Đọc lessons only]

Day unlock flow:
  complete module → markModuleComplete → syncDailyProgress
  → if sequentialPassedDays advanced → currentDay advances
  → lesson.js shows unlock banner + routes to new day
  → session.js done box shows unlock card on next render

Day unlock conditions:
  getDayProgress(N).isPassed = totalModules > 0
    AND completionRate ≥ 0.8 (DAILY_PASS_THRESHOLD)
    AND passRate ≥ 0.8
```

## Files Changed This Session (session 6)

- `js/state.js`: `syncDailyProgress` — removed `Math.min(calendarDay, ...)` cap from `autoTargetDay`; loop now fills `dayUnlockedOn` up to `targetDay` (not capped by `calendarDay`)
- `js/modules/lesson.js`: `showCompletion()` — added `prevDay`/`newDay` detection; unlock banner; "Học ngày X →" button CTA
- `js/modules/session.js`: done box — contextual subtitle (AM→suggest PM, etc.); "Ngày X đã mở!" unlock card
- `js/modules/parent.js`: stats tab — progress banner with `currentDay`, `sequentialPassedDays`, `%` bar, auto-unlock explanation

## Commits This Session

- `e6e41d7`: Auto-unlock next day when previous day is completed
- `ce3932e`: Parent stats: add progress banner showing current day + auto-unlock rule
- `be7e4a1`: Session done box: contextual subtitle + suggest other session

## Verifying Deployment

After any deployment, run:
```
node scripts/audit_content_quality.mjs 1 60
```
Should return `"totalFindings": 0`.

## Previous Sessions

See `docs/HANDOFF_CHECKPOINT_2026-06-03e.md` for session 1-5 details.
