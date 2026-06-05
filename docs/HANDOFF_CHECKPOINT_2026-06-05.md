# Meuw Academy Handoff Checkpoint

Updated: `2026-06-05 (session 10 — auto-unlock + module-ID + wrong-subject fixes)`
Repo branch: `master`
Latest commit: `e2de1ee`

## What Works in Production Right Now

### Bug Fixes This Session

#### Bug 1 — Auto-unlock next day never fired (FIXED)

**Root cause:** `getCurriculumModulesForDay()` in `state.js` generated PM module IDs
using the OVERALL array index instead of the per-session index.

Example for Day 2 (14 AM + 10 PM modules):
- Overall index 14 (first PM module) → generated ID: `d2-pm-15` ✗
- Raw data ID (used by lesson completion): `d2-pm-1` ✓

`getDayProgress()` checked for IDs like `d2-pm-15` in `completedModules`,
never found PM completions → `completionRate` capped at 58% (14/24) for any
day → never hit the 80% threshold → next day never auto-unlocked.

**Fix (`state.js`):** Replace overall-index ID generation with a regex that
replaces the template-day prefix in the raw ID:
```js
id: module.id
  ? module.id.replace(/^d\d+/, `d${dayNumber}`)
  : `d${dayNumber}-${module.session}-1`,
```
Same fix applied to `synthesizeDaySkeleton()` in `curriculum-loader.js`
(used for days > 84 that loop back to earlier templates).

---

#### Bug 2 — Completed module shows wrong subject (FIXED, two-part)

**Part A — Wrong subject on re-render (`fresh-curriculum.js`):**

After completing module `d2-pm-5` (which materialized as English), the
completion record stored `curriculumTopicKey: 'eng:phonics'`. On re-render,
`materializeDayCurriculum` used:
```js
const subjectOrder = forcedTopicKey ? [module.subject] : ...;
```
`module.subject` is the RAW/TEMPLATE subject (e.g. `sci`), not the
materialized one (e.g. `eng`). `'eng:phonics'` not found in `sci` catalog →
fell through to a random sci topic → module appeared as a different subject.

**Fix:** When `forcedTopicKey` is set, resolve the correct subject by:
1. Checking `completed.curriculumSubject` (stored with new code)
2. Falling back to searching all catalog subjects for the topicKey
3. Last resort: template subject

Also added `curriculumSubject: moduleData.subject` to `markModuleComplete()`
call in `lesson.js` so future renders use the fast path.

**Part B — Session list and lesson render different content (FIXED, `curriculum-loader.js`):**

`materializeDayCurriculum()` ran fresh on every `getCurriculumDay()` call.
Between the session-list render and the lesson render, `syncDailyProgress()`
could commit state changes (updating `dayUnlockedOn`), dispatching
`meuw:state-committed`. This subtly changed the ledger state / topic
selection → session slot showed "Toán" but lesson loaded "Khoa học"
for the same module ID.

**Fix:** Cache `getCurriculumDay(day)` results per day number. Cache is
cleared on every `meuw:state-committed` event, ensuring:
- Session render → result cached
- User clicks module → lesson uses **same cached result**
- After completion → state commits → cache cleared → next session re-render
  uses `forcedTopicKey` to lock the completed module's subject

## Commits This Session

- `b440137`: Fix module ID mismatch and wrong-subject-after-completion bugs
- `e2de1ee`: Fix Bug 2 root cause: cache getCurriculumDay to ensure session=lesson content

## Files Changed This Session

- `js/state.js`: `getCurriculumModulesForDay()` — use `id.replace(/^d\d+/, ...)` instead of overall-index ID generation
- `js/data/curriculum-loader.js`: `synthesizeDaySkeleton()` same fix + `getCurriculumDay()` day-level cache with `meuw:state-committed` invalidation
- `js/data/fresh-curriculum.js`: `materializeDayCurriculum()` — `forcedSubject` catalog lookup instead of `module.subject` for completed modules
- `js/modules/lesson.js`: `markModuleComplete()` — add `curriculumSubject: moduleData.subject`

## Architecture: How Module IDs Work

```
Raw data (M1_DATA, M2_DATA, M3_DATA):
  day2.modules[14].id = 'd2-pm-1'   ← hard-coded per-session index
  day2.modules[15].id = 'd2-pm-2'
  ...

getCurriculumModulesForDay (state.js) — used by getDayProgress():
  id = module.id.replace(/^d\d+/, `d${dayNumber}`)
  → 'd2-pm-1' (correct ✓)

getCurriculumDay (curriculum-loader.js) — used by session + lesson:
  Calls materializeDayCurriculum(), result cached per day per state epoch.
  Returns same module IDs from raw data, subjects overridden by topic selection.

When module is completed:
  markModuleComplete(moduleData.id, { curriculumTopicKey, curriculumSubject, ... })
  
On next getCurriculumDay() (cache cleared by state commit):
  forcedTopicKey + forcedSubject → topic and subject are locked for completed slots
```

## Architecture: getCurriculumDay Cache

```
_dayCache = {}  (module-level, resets on page reload)

window.addEventListener('meuw:state-committed', () => {
  // Clear all cached days
});

getCurriculumDay(day):
  if (_dayCache[day]) return _dayCache[day];   ← HIT: same content as session
  // ... materialize + enrich ...
  _dayCache[day] = enriched;                   ← MISS: cache for next call
  return enriched;
```

Cache lifecycle per lesson:
1. Session renders → `getCurriculumDay(2)` materializes + caches
2. User clicks → lesson calls `getCurriculumDay(2)` → returns cache (identical)
3. Lesson completes → `markModuleComplete()` → `commit()` → `meuw:state-committed` → cache cleared
4. Session re-renders → `getCurriculumDay(2)` re-materializes with `forcedTopicKey` for completed slot

## Previous Sessions

See `docs/HANDOFF_CHECKPOINT_2026-06-04d.md` for sessions 1-9 details.
