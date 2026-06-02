# Meuw Academy Handoff Checkpoint

Updated: `2026-06-02 18:52:04 +07:00`  
Repo head at writing: `30fc044`

## Purpose

This file is the handoff checkpoint for continuing work in `F:\projects\meuw_academy`.

It is written so another agent such as Claude or Antigravity can continue without re-discovering:

- the current app architecture
- the official source policy
- what is already working
- what is only partially complete
- the highest-priority backlog

## Current product state

The app is now a static SPA with runtime-generated curriculum and a year-scale scheduler.

Core characteristics:

- Static SPA, no build step
- Hash router
- Local-first state with Supabase account sync
- Lesson-first flow supported
- Runtime curriculum materialization on top of a fixed seed curriculum
- Long-range study calendar through the school year

Key files:

- [F:/projects/meuw_academy/index.html](F:/projects/meuw_academy/index.html)
- [F:/projects/meuw_academy/js/app.js](F:/projects/meuw_academy/js/app.js)
- [F:/projects/meuw_academy/js/router.js](F:/projects/meuw_academy/js/router.js)
- [F:/projects/meuw_academy/js/state.js](F:/projects/meuw_academy/js/state.js)
- [F:/projects/meuw_academy/js/schedule-calendar.js](F:/projects/meuw_academy/js/schedule-calendar.js)
- [F:/projects/meuw_academy/js/data/curriculum-loader.js](F:/projects/meuw_academy/js/data/curriculum-loader.js)
- [F:/projects/meuw_academy/js/data/fresh-curriculum.js](F:/projects/meuw_academy/js/data/fresh-curriculum.js)
- [F:/projects/meuw_academy/js/data/official-knowledge-map.js](F:/projects/meuw_academy/js/data/official-knowledge-map.js)
- [F:/projects/meuw_academy/js/modules/dashboard.js](F:/projects/meuw_academy/js/modules/dashboard.js)
- [F:/projects/meuw_academy/js/modules/session.js](F:/projects/meuw_academy/js/modules/session.js)
- [F:/projects/meuw_academy/js/modules/lesson.js](F:/projects/meuw_academy/js/modules/lesson.js)
- [F:/projects/meuw_academy/js/modules/parent.js](F:/projects/meuw_academy/js/modules/parent.js)
- [F:/projects/meuw_academy/js/modules/account-sync.js](F:/projects/meuw_academy/js/modules/account-sync.js)
- [F:/projects/meuw_academy/js/modules/account-auto-sync.js](F:/projects/meuw_academy/js/modules/account-auto-sync.js)

## Official source policy

The canonical school-source policy is already constrained. Do not broaden it unless the user explicitly approves.

Approved official sources:

- `https://hanhtrangso.nxbgd.vn/`
- `https://www.hoc10.vn/`

Reference files:

- [F:/projects/meuw_academy/docs/research/official-sources/README.md](F:/projects/meuw_academy/docs/research/official-sources/README.md)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/official-source-registry.json](F:/projects/meuw_academy/docs/research/official-sources/notes/official-source-registry.json)

Important policy decisions already made:

- For school subjects, do not add random SGK aggregator sources.
- Use Chân Trời Sáng Tạo and Kết Nối Tri Thức together as knowledge input, not as a requirement to mirror either book literally.
- English follows Family & Friends 4 plus official downloadable teacher/support assets.
- Science remains intentionally broader than SGK and may use vetted extension sources.

## Official-source crawl status

### Hoc10

Hoc10 is currently the main usable official-source research lane.

Artifacts already present:

- [F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-lop4-book-index.json](F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-lop4-book-index.json)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-lop4-worksheet-index.json](F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-lop4-worksheet-index.json)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-lop4-slide-index.json](F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-lop4-slide-index.json)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-download-manifest.json](F:/projects/meuw_academy/docs/research/official-sources/notes/hoc10-download-manifest.json)

Current known totals:

- `34` official Hoc10 book rows in `SGK / SGV / VBT`
- `64` downloaded research files under `docs/research/official-sources/downloads/hoc10/lop4`
- `14` local `.zip` files already downloaded, especially important in the English lane

Note:

- ZIP files are considered valid high-value research corpus and must not be ignored.

### Hành Trang Số

Hành Trang Số is approved and should remain in the official source set, but extraction is not complete.

Current state:

- frontend/route map captured
- useful raw files saved under `notes/raw`
- public bulk extraction still blocked by bootstrap/auth flow

Relevant raw captures:

- [F:/projects/meuw_academy/docs/research/official-sources/notes/raw/hanhtrangso-home.html](F:/projects/meuw_academy/docs/research/official-sources/notes/raw/hanhtrangso-home.html)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/raw/hanhtrangso-sach-dien-tu.html](F:/projects/meuw_academy/docs/research/official-sources/notes/raw/hanhtrangso-sach-dien-tu.html)
- [F:/projects/meuw_academy/docs/research/official-sources/notes/raw/hanhtrangso-app.js](F:/projects/meuw_academy/docs/research/official-sources/notes/raw/hanhtrangso-app.js)

## Knowledge map checkpoint

The current canonical structured map is:

- [F:/projects/meuw_academy/docs/research/official-sources/notes/knowledge-map-lop4.json](F:/projects/meuw_academy/docs/research/official-sources/notes/knowledge-map-lop4.json)

Current size:

- `12` subjects / subject groups
- `43` strands
- `182` concepts

Current concept counts by subject:

- `math`: `28`
- `vie`: `21`
- `eng`: `18`
- `it`: `16`
- `sci`: `18`
- `histgeo`: `14`
- `music`: `12`
- `art`: `12`
- `ethics`: `11`
- `tech`: `11`
- `life`: `10`
- `pe`: `11`

Interpretation:

- The map is broad enough to drive a long-range schedule.
- It is not yet deep enough to claim rich, full-year content coverage in every subject.
- The main gap is depth at `unit / lesson / skill` level, especially outside the major core subjects.

## Runtime schedule checkpoint

The long-range scheduler is already implemented.

Canonical plan artifact:

- [F:/projects/meuw_academy/docs/research/official-sources/notes/year-study-plan-2026-2027.json](F:/projects/meuw_academy/docs/research/official-sources/notes/year-study-plan-2026-2027.json)

Current schedule rules already encoded:

- Program starts from `2026-06-02`
- Total runtime plan: `355` days
- Before school resumes: split `AM/PM`
- From `2026-09-07`, weekdays during school term become `1 merged block / 2h`
- Weekends and configured special full-study dates remain split
- Current totals:
  - `178` split days
  - `177` merged days

Implementation files:

- [F:/projects/meuw_academy/js/schedule-calendar.js](F:/projects/meuw_academy/js/schedule-calendar.js)
- [F:/projects/meuw_academy/js/state.js](F:/projects/meuw_academy/js/state.js)

## Runtime curriculum checkpoint

The app no longer stops at 90 days.

Current behavior:

- Seed curriculum still comes from month files
- Days beyond the seed set are synthesized
- Materialization then re-plans modules using the long-range subject policy and knowledge ledger

Relevant files:

- [F:/projects/meuw_academy/js/data/curriculum-loader.js](F:/projects/meuw_academy/js/data/curriculum-loader.js)
- [F:/projects/meuw_academy/js/data/fresh-curriculum.js](F:/projects/meuw_academy/js/data/fresh-curriculum.js)
- [F:/projects/meuw_academy/js/data/lesson-blocks.js](F:/projects/meuw_academy/js/data/lesson-blocks.js)

Important verification already achieved:

- sampled `120` days: `duplicateQuestions = 0`
- sampled `120` days: `underTargetDays = 0`
- day `91+` works at runtime

Still true:

- question-level freshness is much better than before
- topic-family repetition is still too high
- the engine needs a finer map than broad subject-family topics

## Sync/account checkpoint

Current sync model:

- `1 account = 1 bé`
- Supabase email/password
- local-first
- parent chooses whether to upload local or download cloud
- JSON backup/restore remains available

Relevant files:

- [F:/projects/meuw_academy/js/modules/account-sync.js](F:/projects/meuw_academy/js/modules/account-sync.js)
- [F:/projects/meuw_academy/js/modules/account-auto-sync.js](F:/projects/meuw_academy/js/modules/account-auto-sync.js)
- [F:/projects/meuw_academy/js/modules/parent.js](F:/projects/meuw_academy/js/modules/parent.js)
- [F:/projects/meuw_academy/docs/SUPABASE_SETUP.md](F:/projects/meuw_academy/docs/SUPABASE_SETUP.md)

Recent bugfix state:

- Removed hard reload loop causing production flicker
- Prevented automatic local overwrite of cloud when local is merely newer
- Added parent control to unlock a target study day manually
- Added manual unlock persistence so daily sync does not drag the profile back to Day 1/2 after manual unlock

## UI/content correctness checkpoint

Recently fixed:

- session card / lesson mismatch bug
- previously a card could show one subject and the lesson could resolve another
- root cause was different runtime sources used by session list vs lesson loader
- fix was to make session/dashboard derive from the same materialized day modules

Relevant files:

- [F:/projects/meuw_academy/js/modules/session.js](F:/projects/meuw_academy/js/modules/session.js)
- [F:/projects/meuw_academy/js/modules/dashboard.js](F:/projects/meuw_academy/js/modules/dashboard.js)
- [F:/projects/meuw_academy/js/modules/lesson.js](F:/projects/meuw_academy/js/modules/lesson.js)

Lesson mascot state:

- lesson-first blocks use `Gâu tiên sinh`
- `Méo` remains the main app mascot elsewhere

## What is working well enough now

- production app is stable enough to continue daily study
- long-range school-year scheduling exists
- knowledge map foundation exists
- official-source policy is locked
- parent can recover with JSON backup/restore
- parent can manually unlock study day if progress/sync is out of alignment
- sampled runtime freshness at question level is acceptable for the first major span

## What is not complete yet

These items are partially complete, not done:

- deep curriculum extraction from official book/unit/lesson structure
- full-year dense pool for all core subjects
- strong pool depth for secondary subjects
- low topic repetition at display level
- robust cross-device progress reconciliation beyond simple parent-controlled overwrite
- richer formative lesson-first pedagogy for all newly introduced concepts

## Priority backlog

### Priority 1: deepen official curriculum corpus

Move from broad concept coverage to real unit/lesson/skill coverage.

Target structure:

- `subject`
- `book set`
- `unit`
- `lesson`
- `skill`
- `lesson block`
- `practice pool`

Immediate subjects:

- `Toán`
- `Tiếng Việt`
- `English`
- `Tin học`

Then expand:

- `Lịch sử và Địa lí`
- `Mĩ thuật`
- `Âm nhạc`
- `Đạo đức`
- `Công nghệ`
- `Hoạt động trải nghiệm`
- `Giáo dục thể chất`

### Priority 2: reduce topic repetition

Current issue:

- question duplication is improved
- topic-family repetition is still high because many runtime titles still come from broad recurring families

Needed:

- finer `topicKey` granularity
- more unit-specific titles
- more lesson-specific branch generation

### Priority 3: exploit downloaded official corpus better

Current corpus contains teacher docs, PPT/PPTX, DOCX, PDF, ZIP bundles, but much of it has not yet been converted into structured lesson/practice data.

Needed:

- extract unit/lesson signals from downloaded files
- use them to enrich knowledge map
- especially use English ZIP/PPT/audio/teacher-pack lane more deeply

### Priority 4: improve source ingestion for Hành Trang Số

Needed:

- solve or safely work around the bootstrap/auth-blocked extraction path
- use it as reference/validation against Hoc10
- do not replace Hoc10 with random third-party SGK mirrors

## Medium-priority backlog

- improve cloud conflict UX beyond raw parent confirmation dialogs
- add stronger audit trail around local vs cloud progress origin
- support more nuanced “multi-answer” practice authoring where pedagogy requires it
- continue improving lesson-first micro-theory for concept introductions
- continue transparency and mascot/combo asset cleanup

## Known constraints

- This repo uses static files and no build step.
- Large research binaries stay local under `docs/research/official-sources/downloads/` and should stay out of git except placeholders/metadata.
- Runtime curriculum quality depends heavily on `fresh-curriculum.js`, so changes there can easily disturb content stability.
- Do not reintroduce deprecated Firebase Cloud ID / Sync Code flows.

## Recommended next work order

1. Deepen structured extraction from official school sources into `unit / lesson / skill`.
2. Use that deeper structure to expand runtime pool for `Toán / Tiếng Việt / English / Tin học`.
3. Extend the same pipeline to secondary subjects so the `Khác` lane becomes genuinely useful.
4. Re-run long-range verification on a broader horizon after pool depth improves.
5. Only after curriculum depth improves, continue polishing advanced pedagogy/UI features.

## Safe verification checklist

When continuing work, verify these before shipping:

- `node --check` on touched JS files
- local app returns `200` on `http://127.0.0.1:4173/#/`
- session card subject matches lesson subject/title
- manual unlock survives `syncDailyProgress()`
- no production flicker/refresh loop
- no accidental regression in parent backup/restore

## Helpful commands

Refresh official-source metadata:

```powershell
node scripts/fetch_official_sources.mjs
```

Rebuild knowledge map artifact:

```powershell
node scripts/build_knowledge_map.mjs
```

Rebuild long-range study plan artifact:

```powershell
node scripts/build_year_schedule_blueprint.mjs
```

Verify long-range runtime sample:

```powershell
node scripts/verify_long_range_schedule.mjs --days 120
```

## Final handoff summary

This project is past the prototype stage for scheduling and runtime generation, but not yet past the content-depth stage.

The next agent should not spend time reinventing sync, scheduling, or source policy.
The biggest remaining value is to convert the official corpus into a much denser, finer-grained knowledge base that can sustain the year-long plan with less topic repetition and better lesson-first pedagogy.
