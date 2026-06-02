/**
 * Crawl Hanh Trang So (hanhtrangso.nxbgd.vn) for Lop 4 book catalog,
 * structured chapter/lesson index, and page images.
 *
 * Phase 1 (requires Bearer token — run first, expires in ~3h):
 *   node scripts/crawl_hanhtrangso.mjs --phase catalog --token <JWT>
 *   → saves notes/hts-lop4-catalog.json + notes/hts-lop4-book-indexes.json
 *
 * Phase 2 (no token needed — CDN is public):
 *   node scripts/crawl_hanhtrangso.mjs --phase images [--book-id 11384] [--concurrency 4]
 *   → downloads page JPGs to downloads/hts/lop4/<bookSlug>/pages/
 *
 * Dry run:
 *   node scripts/crawl_hanhtrangso.mjs --phase images --dry-run
 */

import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const notesDir = path.join(repoRoot, "docs", "research", "official-sources", "notes");
const downloadsRoot = path.join(repoRoot, "docs", "research", "official-sources", "downloads", "hts", "lop4");

const HTS_API = "https://apihanhtrangso.nxbgd.vn:8080/api";
const HTS_CDN = "https://cdnelearning.nxbgd.vn/uploads/books";

const CATALOG_FILE = path.join(notesDir, "hts-lop4-catalog.json");
const INDEXES_FILE = path.join(notesDir, "hts-lop4-book-indexes.json");

// Book series IDs found in HTS
// 3 = Kết nối tri thức với cuộc sống (KNTT)
// 4 = Chân trời sáng tạo (CTST)
const TARGET_SERIES = [3, 4];

function getArg(flag, fallback) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx === process.argv.length - 1) return fallback;
  return process.argv[idx + 1];
}
function hasFlag(flag) {
  return process.argv.includes(flag);
}

async function apiGet(endpoint, token) {
  const res = await fetch(`${HTS_API}/${endpoint}`, {
    signal: AbortSignal.timeout(30_000),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${endpoint}`);
  return res.json();
}

async function apiPost(endpoint, body, token) {
  const res = await fetch(`${HTS_API}/${endpoint}`, {
    method: "POST",
    signal: AbortSignal.timeout(30_000),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} POST ${endpoint}`);
  return res.json();
}

function isLop4Book(name) {
  if (!name) return false;
  const n = name.toLowerCase();
  // Match " 4 " or " 4 -" or end with " 4" — avoid lop1,2,3,5
  return / 4[ -]/.test(n) || n.endsWith(" 4");
}

// ─── PHASE 1: Catalog ────────────────────────────────────────────────────────

async function phaseCatalog(token) {
  console.log("\n── Phase 1: Catalog ─────────────────────────────────────────");
  await fs.mkdir(notesDir, { recursive: true });

  // Get full book list (no class filter — classId seems unreliable)
  console.log("Fetching full book list...");
  const listResp = await apiPost("book/book-list", {
    book_type: [],
    classes: [],
    levels: [],
    subjects: [],
    pageSize: 500,
    pageIndex: 1,
  }, token);

  if (listResp.status !== "success") {
    throw new Error("book-list failed: " + JSON.stringify(listResp.errors));
  }

  const allBooks = [];
  for (const series of listResp.data || []) {
    const seriesId = series.bookTypeId;
    const seriesName = series.name;
    if (!TARGET_SERIES.includes(seriesId)) continue;

    for (const group of series.bookGroups || []) {
      const groupName = group.name; // "Sách giáo khoa" | "Sách bổ trợ" | "Sách giáo viên"
      for (const book of group.books || []) {
        if (!isLop4Book(book.name)) continue;
        allBooks.push({
          bookId: book.bookId,
          name: book.name,
          slug: book.slug,
          seriesId,
          seriesName,
          groupName,
          subjectName: book.subjectName,
          classId: book.classId,
          className: book.className,
          imageUrl: book.imageUrl,
        });
      }
    }
  }

  console.log(`Found ${allBooks.length} Lop 4 books across KNTT + CTST`);
  allBooks.forEach(b => console.log(`  [${b.bookId}] ${b.seriesName} / ${b.groupName} / ${b.name}`));

  await fs.writeFile(CATALOG_FILE, JSON.stringify({ updated_at: new Date().toISOString(), books: allBooks }, null, 2));
  console.log(`\nCatalog saved → ${path.relative(repoRoot, CATALOG_FILE)}`);

  // Fetch detailed index for each book
  console.log("\nFetching book indexes (chapters/lessons)...");
  const bookIndexes = [];

  for (const book of allBooks) {
    try {
      const detail = await apiGet(`book/${book.bookId}`, token);
      if (detail.status !== "success") {
        console.warn(`  ⚠ ${book.name}: API returned status=${detail.status}`);
        bookIndexes.push({ ...book, error: "api-failed", bookIndexs: [], fileName: null, totalPage: 0 });
        continue;
      }
      const d = detail.data;
      bookIndexes.push({
        ...book,
        fileName: d.fileName,
        totalPage: d.totalPage,
        limitPage: d.limitPage,
        canDownload: d.canDownload,
        subjectId: d.subjectId,
        classId: d.classId,
        className: d.className,
        bookIndexs: d.bookIndexs || [],
        pageImageUrl: d.fileName
          ? `${HTS_CDN}/${d.fileName}-{pageNo}.jpg`
          : null,
        cdnBase: HTS_CDN,
      });

      const chapterCount = (d.bookIndexs || []).length;
      const lessonCount = (d.bookIndexs || []).reduce((s, c) => s + (c.bookIndexChilds || []).length, 0);
      console.log(`  ✓ [${book.bookId}] ${book.name} — ${chapterCount} chapters, ${lessonCount} lessons, ${d.totalPage} pages`);
    } catch (err) {
      console.error(`  ✗ [${book.bookId}] ${book.name}: ${err.message}`);
      bookIndexes.push({ ...book, error: String(err.message), bookIndexs: [], fileName: null, totalPage: 0 });
    }
    await new Promise(r => setTimeout(r, 300)); // gentle rate limit
  }

  await fs.writeFile(INDEXES_FILE, JSON.stringify({
    updated_at: new Date().toISOString(),
    total: bookIndexes.length,
    books: bookIndexes,
  }, null, 2));
  console.log(`\nBook indexes saved → ${path.relative(repoRoot, INDEXES_FILE)}`);

  // Summary
  const ok = bookIndexes.filter(b => !b.error);
  const err = bookIndexes.filter(b => b.error);
  const totalPages = ok.reduce((s, b) => s + (b.totalPage || 0), 0);
  console.log(`\n── Summary ──────────────────────────────────────────────────`);
  console.log(`  Books indexed  : ${ok.length}`);
  console.log(`  Errors         : ${err.length}`);
  console.log(`  Total pages    : ${totalPages}`);
  console.log(`  CDN images     : public (no auth needed for Phase 2)`);
  console.log(`─────────────────────────────────────────────────────────────\n`);
}

// ─── PHASE 2: Images ─────────────────────────────────────────────────────────

async function pLimit(tasks, concurrency) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < tasks.length) {
      const i = index++;
      results[i] = await tasks[i]();
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

async function downloadImage(url, targetFile, retries = 2) {
  try {
    await fs.access(targetFile);
    const s = await fs.stat(targetFile);
    if (s.size > 1000) return { status: "skipped", bytes: s.size };
  } catch {}

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(60_000),
        headers: { "User-Agent": "meuw-academy-hts-capture/1.0" },
      });
      if (res.status === 404) return { status: "not_found" };
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) return { status: "empty", bytes: buf.length };
      await fs.mkdir(path.dirname(targetFile), { recursive: true });
      await fs.writeFile(targetFile, buf);
      return { status: "downloaded", bytes: buf.length };
    } catch (err) {
      if (attempt === retries) return { status: "failed", error: String(err.message || err) };
      await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
}

async function phaseImages(filterBookId, filterSeries, concurrency, dryRun) {
  console.log("\n── Phase 2: Page Images ─────────────────────────────────────");
  const indexesData = JSON.parse(await fs.readFile(INDEXES_FILE, "utf8"));
  let books = indexesData.books.filter(b => b.fileName && b.totalPage > 0);

  // Series filter: 3=KNTT, 4=CTST
  if (filterSeries === "kntt") {
    books = books.filter(b => b.seriesId === 3);
    console.log(`Series filter: KNTT only (seriesId=3)`);
  } else if (filterSeries === "ctst") {
    books = books.filter(b => b.seriesId === 4);
    console.log(`Series filter: CTST only (seriesId=4)`);
  }

  if (filterBookId) {
    books = books.filter(b => String(b.bookId) === String(filterBookId));
    if (books.length === 0) {
      console.error(`No book found with bookId=${filterBookId}`);
      process.exitCode = 1;
      return;
    }
  }

  console.log(`Processing ${books.length} book(s) | Concurrency: ${concurrency} | Dry run: ${dryRun}`);

  const allTasks = [];
  for (const book of books) {
    const bookSlug = book.slug || `book-${book.bookId}`;
    const pagesDir = path.join(downloadsRoot, bookSlug, "pages");

    for (let page = 1; page <= book.totalPage; page++) {
      const url = `${HTS_CDN}/${book.fileName}-${page}.jpg`;
      const fileName = `p${String(page).padStart(3, "0")}.jpg`;
      const targetFile = path.join(pagesDir, fileName);
      allTasks.push({ book, page, url, targetFile, relPath: path.relative(repoRoot, targetFile) });
    }
  }

  console.log(`Total page images: ${allTasks.length}`);
  if (dryRun) {
    allTasks.slice(0, 5).forEach(t => console.log(`  [dry] ${t.relPath}`));
    if (allTasks.length > 5) console.log(`  ... and ${allTasks.length - 5} more`);
    return;
  }

  const manifest = [];
  let done = 0;
  let downloaded = 0, skipped = 0, failed = 0, notFound = 0;

  const downloadTasks = allTasks.map(task => async () => {
    const result = await downloadImage(task.url, task.targetFile);
    manifest.push({ ...task, book: undefined, bookId: task.book.bookId, bookName: task.book.name, ...result });
    done++;
    if (result.status === "downloaded") {
      downloaded++;
      if (downloaded % 50 === 0 || done <= 5)
        console.log(`  ✓ [${done}/${allTasks.length}] ${task.book.name} p${task.page} (${Math.round(result.bytes/1024)}KB)`);
    } else if (result.status === "failed") {
      failed++;
      console.error(`  ✗ [${done}/${allTasks.length}] FAILED ${task.book.name} p${task.page}: ${result.error}`);
    } else if (result.status === "not_found") {
      notFound++;
      if (notFound <= 3) console.warn(`  · [${done}/${allTasks.length}] 404 ${task.book.name} p${task.page}`);
    } else {
      skipped++;
    }
  });

  await pLimit(downloadTasks, concurrency);

  const manifestFile = path.join(notesDir, "hts-image-download-manifest.json");
  await fs.writeFile(manifestFile, JSON.stringify({
    generated_at: new Date().toISOString(),
    summary: { total: allTasks.length, downloaded, skipped, not_found: notFound, failed },
    files: manifest,
  }, null, 2));

  console.log(`\n── Done ─────────────────────────────────────────────────────`);
  console.log(`  Downloaded : ${downloaded}`);
  console.log(`  Skipped    : ${skipped}`);
  console.log(`  Not found  : ${notFound}`);
  console.log(`  Failed     : ${failed}`);
  console.log(`  Manifest   : ${path.relative(repoRoot, manifestFile)}`);
  console.log(`─────────────────────────────────────────────────────────────\n`);

  if (failed > 0) process.exitCode = 1;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const phase = getArg("--phase", "catalog");
  const token = getArg("--token", "");
  const filterBookId = getArg("--book-id", null);
  const filterSeries = getArg("--series", null); // "kntt" or "ctst"
  const concurrency = Math.max(1, parseInt(getArg("--concurrency", "4"), 10));
  const dryRun = hasFlag("--dry-run");

  if (phase === "catalog") {
    if (!token) {
      console.error("ERROR: --token <JWT> is required for phase catalog.");
      console.error("Usage: node scripts/crawl_hanhtrangso.mjs --phase catalog --token eyJ...");
      process.exitCode = 1;
      return;
    }
    await phaseCatalog(token);
  } else if (phase === "images") {
    await phaseImages(filterBookId, filterSeries, concurrency, dryRun);
  } else {
    console.error(`Unknown phase: ${phase}. Use --phase catalog or --phase images`);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
