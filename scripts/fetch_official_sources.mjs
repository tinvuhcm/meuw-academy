import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const officialRoot = path.join(repoRoot, "docs", "research", "official-sources");
const notesDir = path.join(officialRoot, "notes");
const downloadsDir = path.join(officialRoot, "downloads");
const rawDir = path.join(notesDir, "raw");

const HOC10_API = "https://api.hoc10.vn/api";
const HOC10_MEDIA = "https://hoc10.monkeyuni.net/";
const GRADE_ID = 7;

const SUBJECTS = [
  { id: 32, slug: "tieng-viet", title: "Tieng Viet", bookshelfSlug: "tieng-viet" },
  { id: 33, slug: "toan", title: "Toan", bookshelfSlug: "toan" },
  { id: 34, slug: "dao-duc", title: "Dao duc", bookshelfSlug: "dao-duc" },
  { id: 36, slug: "am-nhac", title: "Am nhac", bookshelfSlug: "am-nhac" },
  { id: 37, slug: "mi-thuat", title: "Mi thuat", bookshelfSlug: "mi-thuat" },
  { id: 38, slug: "giao-duc-the-chat", title: "Giao duc the chat", bookshelfSlug: "giao-duc-the-chat" },
  { id: 39, slug: "tieng-anh", title: "Tieng Anh", bookshelfSlug: "tieng-anh" },
  { id: 40, slug: "hoat-dong-trai-nghiem", title: "Hoat dong trai nghiem", bookshelfSlug: "hoat-dong-trai-nghiem" },
  { id: 41, slug: "tin-hoc", title: "Tin hoc", bookshelfSlug: "tin-hoc" },
  { id: 69, slug: "cong-nghe", title: "Cong nghe", bookshelfSlug: "cong-nghe" },
  { id: 77, slug: "khoa-hoc", title: "Khoa hoc", bookshelfSlug: "khoa-hoc" },
  { id: 78, slug: "lich-su-va-dia-li", title: "Lich su va Dia li", bookshelfSlug: "lich-su-va-dia-li" },
];

const DOC_TYPES = new Map([
  [1, "pdf"],
  [4, "docx"],
  [5, "pptx"],
  [6, "zip"],
]);

const BOOK_TYPES = [
  { id: 1, slug: "sgk", title: "Sach giao khoa" },
  { id: 3, slug: "sgv", title: "Sach giao vien" },
  { id: 5, slug: "vbt", title: "Vo bai tap" },
];

function getArgValue(flag, fallback) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx === process.argv.length - 1) {
    return fallback;
  }
  return process.argv[idx + 1];
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function safeName(input) {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 140);
}

async function ensureDirs() {
  await fs.mkdir(notesDir, { recursive: true });
  await fs.mkdir(downloadsDir, { recursive: true });
  await fs.mkdir(rawDir, { recursive: true });
  await fs.writeFile(path.join(downloadsDir, ".gitkeep"), "", { flag: "a" });
  await fs.writeFile(path.join(rawDir, ".gitkeep"), "", { flag: "a" });
}

async function fetchJson(url) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(30000),
    headers: {
      Accept: "application/json",
      "User-Agent": "meuw-academy-official-source-capture/1.0",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(30000),
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "meuw-academy-official-source-capture/1.0",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.text();
}

function absolutizeHoc10Url(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return new URL(url, HOC10_MEDIA).href;
}

async function fetchWorksheetIndex(subject) {
  const url = `${HOC10_API}/list-work-sheet?grade_id=${GRADE_ID}&subject_id=${subject.id}&status=1&page=1&limit=200`;
  const json = await fetchJson(url);
  const rows = json?.data?.data || [];
  return rows.map((row) => ({
    ...row,
    url: absolutizeHoc10Url(row.url),
    thumb: absolutizeHoc10Url(row.thumb),
  }));
}

async function fetchSlideIndex(subject) {
  const url = `${HOC10_API}/list-slide?grade_id=${GRADE_ID}&subject_id=${subject.id}&status=1&page=1&limit=400`;
  const json = await fetchJson(url);
  const rows = json?.data?.data || [];
  return rows.map((row) => ({
    ...row,
    url: absolutizeHoc10Url(row.url),
    thumb: absolutizeHoc10Url(row.thumb),
  }));
}

async function fetchBookIndex(bookType) {
  const url = `${HOC10_API}/list-book?grade_id=${GRADE_ID}&book_type_id=${bookType.id}`;
  const json = await fetchJson(url);
  const rows = json?.data?.list_book || [];
  return rows.map((row) => ({
    ...row,
    thumb: absolutizeHoc10Url(row.thumb),
    readerUrl: row.link_html ? `https://www.hoc10.vn/doc-sach/${row.link_html}` : null,
  }));
}

function decodeHtml(value = "") {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value = "") {
  return decodeHtml(String(value).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  const output = [];
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(item);
  }
  return output;
}

async function fetchHoc10BookshelfHtml(subject) {
  const url = `https://www.hoc10.vn/tu-sach/${subject.bookshelfSlug}/lop-4/`;
  const html = await fetchText(url);
  const rawPath = path.join(rawDir, `hoc10-bookshelf-${subject.slug}-lop4.html`);
  await fs.writeFile(rawPath, html);
  return { url, html, rawPath };
}

function parseHoc10Bookshelf(subject, html, sourceUrl) {
  const sectionTitles = [
    "Sách giáo khoa",
    "Sách bài tập",
    "Sách giáo viên",
    "Tiết dạy minh họa",
    "Bài giảng PowerPoint",
    "Học liệu điện tử",
    "Giới thiệu, tập huấn SGK",
  ];
  const positions = sectionTitles
    .map((title) => ({ title, index: html.indexOf(`>${title}<`) }))
    .filter((entry) => entry.index >= 0)
    .sort((a, b) => a.index - b.index);

  const sections = positions.map((entry, index) => {
    const end = index + 1 < positions.length ? positions[index + 1].index : html.length;
    const chunk = html.slice(entry.index, end);
    const imgMatches = [...chunk.matchAll(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/g)].map(match => ({
      coverUrl: absolutizeHoc10Url(match[1]),
      alt: stripTags(match[2]),
    }));
    const headingMatches = [...chunk.matchAll(/<h4[^>]*title="([^"]*)"[^>]*>(.*?)<\/h4>/g)].map(match => ({
      title: stripTags(match[1] || match[2]),
    }));
    const actionLabels = [...chunk.matchAll(/>(Xem ngay|Đọc thử|Xem nhanh)<\/(?:div|span|a)>/g)].map(match => match[1]);
    const cards = [];
    const cardCount = Math.max(imgMatches.length, headingMatches.length, actionLabels.length);
    for (let cardIndex = 0; cardIndex < cardCount; cardIndex++) {
      const image = imgMatches[cardIndex] || {};
      const heading = headingMatches[cardIndex] || {};
      const actionLabel = actionLabels[cardIndex] || null;
      if (!image.coverUrl && !heading.title && !actionLabel) continue;
      cards.push({
        title: heading.title || null,
        coverUrl: image.coverUrl || null,
        alt: image.alt || null,
        actionLabel,
      });
    }

    return {
      title: entry.title,
      cards: uniqueBy(cards, item => `${item.title || ""}|${item.coverUrl || ""}|${item.actionLabel || ""}`),
    };
  });

  return {
    subject,
    sourceUrl,
    sections,
    rawHtmlLength: html.length,
    summary: {
      totalSections: sections.length,
      totalCards: sections.reduce((sum, section) => sum + section.cards.length, 0),
      sectionTitles: sections.map(section => section.title),
    },
  };
}

function summarizeBooks(rows) {
  const summary = {
    total: rows.length,
    bySubjectId: {},
    freeOrPreviewable: 0,
  };
  for (const row of rows) {
    const key = String(row.subject_id);
    summary.bySubjectId[key] = (summary.bySubjectId[key] || 0) + 1;
    if (row.is_blocked === 0 || row.readerUrl) {
      summary.freeOrPreviewable += 1;
    }
  }
  return summary;
}

function groupBooksBySubject(bookRows) {
  return SUBJECTS.map((subject) => {
    const rows = bookRows.filter((row) => row.subject_id === subject.id);
    return {
      subject,
      rows,
      summary: summarizeBooks(rows),
    };
  });
}

function summarizeDocs(rows) {
  const summary = {
    total: rows.length,
    byType: {},
    downloadableStudyDocs: 0,
  };
  for (const row of rows) {
    const key = String(row.type_document);
    summary.byType[key] = (summary.byType[key] || 0) + 1;
    if (DOC_TYPES.has(row.type_document)) {
      summary.downloadableStudyDocs += 1;
    }
  }
  return summary;
}

async function downloadFile(url, targetFile) {
  try {
    await fs.access(targetFile);
    return "skipped_existing";
  } catch {}
  const res = await fetch(url, {
    signal: AbortSignal.timeout(120000),
    headers: {
      "User-Agent": "meuw-academy-official-source-capture/1.0",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  await fs.mkdir(path.dirname(targetFile), { recursive: true });
  await fs.writeFile(targetFile, Buffer.from(arrayBuffer));
}

async function downloadWorksheetDocs(subject, rows) {
  const subjectDir = path.join(downloadsDir, "hoc10", "lop4", subject.slug, "worksheets");
  const manifest = [];
  for (const row of rows) {
    if (!DOC_TYPES.has(row.type_document) || !row.url) {
      continue;
    }
    const ext = DOC_TYPES.get(row.type_document);
    const fileName = `${String(row.order_index ?? "x").padStart(2, "0")}_${safeName(row.worksheet_title)}.${ext}`;
    const targetFile = path.join(subjectDir, fileName);
    let status = "downloaded";
    let error = null;
    try {
      status = await downloadFile(row.url, targetFile);
    } catch (downloadError) {
      status = "failed";
      error = String(downloadError.message || downloadError);
    }
    manifest.push({
      worksheet_title: row.worksheet_title,
      type_document: row.type_document,
      url: row.url,
      status,
      error,
      saved_as: path.relative(repoRoot, targetFile),
    });
  }
  return manifest;
}

function buildRegistry(hoc10WorkSheets, hoc10Slides, hoc10Books, hoc10Bookshelves) {
  return {
    updated_at: new Date().toISOString(),
    school_policy: {
      grade: "lop-4",
      official_school_sources: [
        {
          id: "hanhtrangso-nxbgd",
          name: "Hanh Trang So - Nha xuat ban Giao duc",
          base_url: "https://hanhtrangso.nxbgd.vn/",
          role: "official_sgk_reference",
          status: "frontend-mapped-auth-blocked",
          notes: [
            "Frontend config and API routes were captured from official site assets.",
            "Public API extraction is currently blocked by 401 without the site bootstrap auth flow.",
            "Keep as official source of truth for SGK lineage and book-set validation.",
          ],
        },
        {
          id: "hoc10",
          name: "Hoc10",
          base_url: "https://www.hoc10.vn/",
          api_base: HOC10_API,
          media_base: HOC10_MEDIA,
          role: "official_downloadable_research_corpus",
          notes: [
            "Public API exposes SGK, SGV, VBT, worksheet docs and slide metadata for lop 4.",
            "The list-book endpoint is the primary SGK registry lane for Hoc10.",
            "Direct PDF, DOCX, PPTX and ZIP URLs are available in worksheet payloads.",
            "Slide decks are exposed as PPTX URLs in list-slide payloads.",
            "Bookshelf HTML exposes SGK/SBT/SGV presence even when direct downloadable SGK files are not public in the worksheet API.",
          ],
        },
      ],
      app_policy: {
        use_for_school_subjects: ["toan", "tieng-viet", "tieng-anh", "tin-hoc"],
        use_for_science_extension: ["khoa-hoc"],
        disallowed_school_source_policy: "Do not introduce new SGK aggregation sources without explicit user approval.",
      },
    },
    hoc10: {
      book_collections: hoc10Books.map((entry) => ({
        book_type: entry.bookType,
        summary: entry.summary,
      })),
      worksheet_subjects: hoc10WorkSheets.map((entry) => ({
        subject: entry.subject,
        summary: entry.summary,
      })),
      slide_subjects: hoc10Slides.map((entry) => ({
        subject: entry.subject,
        total: entry.rows.length,
      })),
      bookshelf_subjects: hoc10Bookshelves.map((entry) => ({
        subject: entry.subject,
        summary: entry.summary,
        status: entry.status,
        error: entry.error,
      })),
    },
  };
}

async function main() {
  const downloadDocs = getArgValue("--download-docs", "true") !== "false";
  const fetchSlides = getArgValue("--fetch-slides", "true") !== "false";
  await ensureDirs();

  const hoc10WorkSheets = [];
  const hoc10Slides = [];
  const hoc10Books = [];
  const hoc10Bookshelves = [];
  const downloadManifest = [];

  for (const bookType of BOOK_TYPES) {
    const rows = await fetchBookIndex(bookType);
    hoc10Books.push({
      bookType,
      rows: groupBooksBySubject(rows),
      summary: summarizeBooks(rows),
    });
  }

  for (const subject of SUBJECTS) {
    const worksheetRows = await fetchWorksheetIndex(subject);
    hoc10WorkSheets.push({
      subject,
      rows: worksheetRows,
      summary: summarizeDocs(worksheetRows),
    });

    if (downloadDocs) {
      const manifest = await downloadWorksheetDocs(subject, worksheetRows);
      downloadManifest.push({ subject, files: manifest });
    }

    if (fetchSlides) {
      const slideRows = await fetchSlideIndex(subject);
      hoc10Slides.push({ subject, rows: slideRows });
    }

    try {
      const bookshelfPage = await fetchHoc10BookshelfHtml(subject);
      hoc10Bookshelves.push({
        status: "captured",
        error: null,
        ...parseHoc10Bookshelf(subject, bookshelfPage.html, bookshelfPage.url),
      });
    } catch (error) {
      hoc10Bookshelves.push({
        subject,
        sourceUrl: `https://www.hoc10.vn/tu-sach/${subject.bookshelfSlug}/lop-4/`,
        status: "failed",
        error: String(error.message || error),
        sections: [],
        rawHtmlLength: 0,
        summary: {
          totalSections: 0,
          totalCards: 0,
          sectionTitles: [],
        },
      });
    }
  }

  const registry = buildRegistry(hoc10WorkSheets, hoc10Slides, hoc10Books, hoc10Bookshelves);

  await fs.writeFile(
    path.join(notesDir, "official-source-registry.json"),
    JSON.stringify(registry, null, 2)
  );
  await fs.writeFile(
    path.join(notesDir, "hoc10-lop4-worksheet-index.json"),
    JSON.stringify(
      hoc10WorkSheets.map((entry) => ({
        subject: entry.subject,
        summary: entry.summary,
        rows: entry.rows,
      })),
      null,
      2
    )
  );
  await fs.writeFile(
    path.join(notesDir, "hoc10-lop4-slide-index.json"),
    JSON.stringify(
      hoc10Slides.map((entry) => ({
        subject: entry.subject,
        total: entry.rows.length,
        rows: entry.rows,
      })),
      null,
      2
    )
  );
  await fs.writeFile(
    path.join(notesDir, "hoc10-lop4-book-index.json"),
    JSON.stringify(
      hoc10Books.map((entry) => ({
        book_type: entry.bookType,
        summary: entry.summary,
        subjects: entry.rows,
      })),
      null,
      2
    )
  );
  await fs.writeFile(
    path.join(notesDir, "hoc10-lop4-bookshelf-index.json"),
    JSON.stringify(hoc10Bookshelves, null, 2)
  );
  await fs.writeFile(
    path.join(notesDir, "hoc10-download-manifest.json"),
    JSON.stringify(downloadManifest, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
