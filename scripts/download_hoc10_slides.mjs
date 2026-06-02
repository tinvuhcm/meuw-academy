/**
 * Download all Hoc10 Lop4 PPTX slide decks.
 *
 * Source index: docs/research/official-sources/notes/hoc10-lop4-slide-index.json
 * Output:       docs/research/official-sources/downloads/hoc10/lop4/<subject>/slides/<file>.pptx
 *
 * Usage:
 *   node scripts/download_hoc10_slides.mjs
 *   node scripts/download_hoc10_slides.mjs --subject toan
 *   node scripts/download_hoc10_slides.mjs --subject tieng-viet --dry-run
 *   node scripts/download_hoc10_slides.mjs --concurrency 4
 */

import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const indexFile = path.join(
  repoRoot,
  "docs",
  "research",
  "official-sources",
  "notes",
  "hoc10-lop4-slide-index.json"
);
const downloadsRoot = path.join(
  repoRoot,
  "docs",
  "research",
  "official-sources",
  "downloads",
  "hoc10",
  "lop4"
);
const manifestFile = path.join(
  repoRoot,
  "docs",
  "research",
  "official-sources",
  "notes",
  "hoc10-slide-download-manifest.json"
);

function getArg(flag, fallback) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx === process.argv.length - 1) return fallback;
  return process.argv[idx + 1];
}
function hasFlag(flag) {
  return process.argv.includes(flag);
}

function safeName(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 160);
}

/** Limit how many fetches run at once to avoid hammering the CDN. */
async function pLimit(tasks, concurrency) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < tasks.length) {
      const i = index++;
      results[i] = await tasks[i]();
    }
  }
  const workers = Array.from({ length: concurrency }, worker);
  await Promise.all(workers);
  return results;
}

async function downloadFile(url, targetFile, retries = 2) {
  try {
    await fs.access(targetFile);
    const stat = await fs.stat(targetFile);
    if (stat.size > 0) return { status: "skipped", bytes: stat.size };
  } catch {}

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(120_000),
        headers: { "User-Agent": "meuw-academy-slide-capture/1.0" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.mkdir(path.dirname(targetFile), { recursive: true });
      await fs.writeFile(targetFile, buf);
      return { status: "downloaded", bytes: buf.length };
    } catch (err) {
      if (attempt === retries) return { status: "failed", error: String(err.message || err) };
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
}

async function main() {
  const filterSubject = getArg("--subject", null);
  const concurrency = Math.max(1, parseInt(getArg("--concurrency", "3"), 10));
  const dryRun = hasFlag("--dry-run");

  const index = JSON.parse(await fs.readFile(indexFile, "utf8"));

  const subjects = filterSubject
    ? index.filter((s) => s.subject.slug === filterSubject)
    : index;

  if (subjects.length === 0) {
    console.error(`No subjects matched. Available: ${index.map((s) => s.subject.slug).join(", ")}`);
    process.exitCode = 1;
    return;
  }

  // Collect all download tasks
  const tasks = [];
  for (const entry of subjects) {
    const { subject, rows } = entry;
    if (!rows || rows.length === 0) continue;
    const subjectDir = path.join(downloadsRoot, subject.slug, "slides");

    for (const row of rows) {
      if (!row.url || !row.url.endsWith(".pptx")) continue;

      // Build filename: <order_grade_week>-<week_id>-<safeName(title)>.pptx
      const weekPad = String(row.week_id ?? "0").padStart(2, "0");
      const orderPad = String(row.order ?? "0").padStart(3, "0");
      const fileName = `w${weekPad}_i${orderPad}_${safeName(row.title)}.pptx`;
      const targetFile = path.join(subjectDir, fileName);

      tasks.push({
        subject: subject.slug,
        title: row.title,
        week_id: row.week_id,
        url: row.url,
        targetFile,
        relPath: path.relative(repoRoot, targetFile),
      });
    }
  }

  console.log(
    `\nHoc10 slide downloader — ${tasks.length} slides across ${subjects.length} subject(s)`
  );
  console.log(`Concurrency: ${concurrency} | Dry run: ${dryRun}\n`);

  if (dryRun) {
    for (const t of tasks) console.log(`  [dry] ${t.relPath}`);
    return;
  }

  const manifest = [];
  let done = 0;
  let failed = 0;
  let skipped = 0;

  const downloadTasks = tasks.map((task) => async () => {
    const result = await downloadFile(task.url, task.targetFile);
    const entry = { ...task, ...result };
    manifest.push(entry);
    done++;
    if (result.status === "failed") {
      failed++;
      console.error(`  ✗ [${done}/${tasks.length}] FAILED ${task.subject}/${task.title}`);
      console.error(`      ${result.error}`);
    } else if (result.status === "skipped") {
      skipped++;
      if (done % 20 === 0)
        console.log(`  · [${done}/${tasks.length}] ${skipped} skipped so far...`);
    } else {
      const kb = Math.round(result.bytes / 1024);
      console.log(`  ✓ [${done}/${tasks.length}] ${task.subject} / ${task.title} (${kb} KB)`);
    }
    return entry;
  });

  await pLimit(downloadTasks, concurrency);

  // Write manifest
  const summary = {
    generated_at: new Date().toISOString(),
    total: tasks.length,
    downloaded: manifest.filter((e) => e.status === "downloaded").length,
    skipped: manifest.filter((e) => e.status === "skipped").length,
    failed: manifest.filter((e) => e.status === "failed").length,
    by_subject: {},
  };
  for (const e of manifest) {
    if (!summary.by_subject[e.subject]) {
      summary.by_subject[e.subject] = { downloaded: 0, skipped: 0, failed: 0 };
    }
    summary.by_subject[e.subject][e.status] =
      (summary.by_subject[e.subject][e.status] || 0) + 1;
  }

  await fs.writeFile(manifestFile, JSON.stringify({ summary, files: manifest }, null, 2));

  console.log(`\n──────────────────────────────────────────`);
  console.log(`Done.`);
  console.log(`  Downloaded : ${summary.downloaded}`);
  console.log(`  Skipped    : ${summary.skipped}`);
  console.log(`  Failed     : ${summary.failed}`);
  console.log(`  Manifest   : ${path.relative(repoRoot, manifestFile)}`);
  console.log(`──────────────────────────────────────────\n`);

  if (summary.failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
