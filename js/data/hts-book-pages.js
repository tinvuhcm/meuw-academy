/**
 * HTS Book Page CDN URL Templates
 * Auto-generated from hts-image-download-manifest.json
 *
 * URL format: ${template}-${cdnPageNo}.jpg
 * CDN is publicly accessible (no auth needed).
 *
 * ── Page number offset ───────────────────────────────────────────────────────
 * Each book's CDN page numbering starts at 1 (= front cover, not physically
 * numbered). Physical printed page 1 → CDN file page 2.
 *
 * Offset = number of non-numbered pages at the front of the book.
 * Confirmed: book 11382 (TV4 Tập 1) — CDN page 90 = physical page 89 → offset 1.
 *
 * Formula: cdnPage = physicalPageNo + BOOK_PAGE_OFFSET[bookId]
 *
 * The KNTT lesson pool stores PHYSICAL page numbers (same as the printed number
 * visible at the bottom of each page, and matching taphuan.nxbgd.vn viewer URLs).
 * Always apply the offset when building CDN URLs.
 */

export const HTS_BOOK_CDN_TEMPLATES = {
  11381: 'https://cdnelearning.nxbgd.vn/uploads/books/11381_20230714105612_-shs-am-nhac-4-kntt-ruot-idt-22.03.2023-min', // Âm nhạc 4
  11382: 'https://cdnelearning.nxbgd.vn/uploads/books/11382_20230714131652_shs_tieng-viet-4_1-idt-19.04.2023-min', // Tiếng Việt 4 - Tập một
  11383: 'https://cdnelearning.nxbgd.vn/uploads/books/11383_20230714130513_shs_tieng-viet-4_tap-2-idt-13.04.2023-min', // Tiếng Việt 4 - Tập hai
  11384: 'https://cdnelearning.nxbgd.vn/uploads/books/11384_20230714130354_shs-toan-4_tap-1_kntt-ruot-idt-21.04.2023-min', // Toán 4 - Tập một
  11385: 'https://cdnelearning.nxbgd.vn/uploads/books/11385_20230714130429_shs-toan-4_tap-2_kntt-ruot-idt-24.05.2023-min', // Toán 4 - Tập hai
  11386: 'https://cdnelearning.nxbgd.vn/uploads/books/11386_20230714130551_shs-dao-duc-4-kntt-ruot-idt-09.02.2023-min', // Đạo đức 4
  11387: 'https://cdnelearning.nxbgd.vn/uploads/books/11387_20230714130654_shs-tin-hoc-4_kntt-ruot-idt-09.02.2023s-min', // Tin học 4
  11388: 'https://cdnelearning.nxbgd.vn/uploads/books/11388_20230714130635_-shs-cong-nghe-4-kntt-ruot-idt-10.02.2023-min', // Công nghệ 4
  11389: 'https://cdnelearning.nxbgd.vn/uploads/books/11389_20230714130752_shs-gdtc-4-kntt-ruot-idt-05.05.2023-min', // Giáo dục thể chất 4
  11390: 'https://cdnelearning.nxbgd.vn/uploads/books/11390_20230714130531_shs-khoa-hoc-4-kntt-ruot-idt-15.06.2023-min', // Khoa học 4
  11391: 'https://cdnelearning.nxbgd.vn/uploads/books/11391_20230714130618_shs-lich-su-va-dia-li-4-kntt-ruot-idt-9.6.2023-min', // Lịch sử và Địa lí 4
  11392: 'https://cdnelearning.nxbgd.vn/uploads/books/11392_20230714130711_shs-mi-thuat-4-kntt-ruot-idt-09.02.2023s-min', // Mĩ thuật 4
  11393: 'https://cdnelearning.nxbgd.vn/uploads/books/11393_20230714130731_shs-hoat-dong-trai-nghiem-4-kntt-ruot-idt-23.03.2023.compressed-min', // Hoạt động và trải nghiệm 4
};

/**
 * Page offset per book: cdnFilePageNo = physicalPageNo + offset.
 *
 * Offset = count of non-physically-numbered pages at the front (cover, etc.).
 * All KNTT lớp 4 textbooks confirmed to have offset = 1 (cover only).
 *
 * If a specific book is found to have a different offset, add an override here:
 *   11384: 2  // Toán 4 if confirmed to have 2 front matter pages, etc.
 *
 * Confirmed via screenshot evidence (2026-06-03):
 *   Book 11382: CDN page 90 = physical page 89 → offset 1 ✓
 */
const BOOK_PAGE_OFFSETS = {
  // Default offset for all KNTT lớp 4 books = 1 (cover page not physically numbered)
  _default: 1,
};

function getOffset(bookId) {
  return BOOK_PAGE_OFFSETS[bookId] ?? BOOK_PAGE_OFFSETS._default;
}

/**
 * Get CDN URL for a specific physical page of a book.
 *
 * @param {number} bookId      - HTS bookId from KNTT_LESSON_POOL source
 * @param {number} physicalPage - Physical page number as printed in the book
 *                               (matches taphuan.nxbgd.vn viewer URL #page=N)
 * @returns {string|null}
 */
export function getBookPageUrl(bookId, physicalPage) {
  const template = HTS_BOOK_CDN_TEMPLATES[bookId];
  if (!template || !physicalPage) return null;
  const cdnPage = Number(physicalPage) + getOffset(bookId);
  return `${template}-${cdnPage}.jpg`;
}

/**
 * Get CDN URLs for a range of physical pages.
 *
 * @param {number} bookId
 * @param {number} startPhysicalPage  - inclusive
 * @param {number} endPhysicalPage    - inclusive
 * @returns {string[]}
 */
export function getBookPageUrls(bookId, startPhysicalPage, endPhysicalPage) {
  if (!bookId || !startPhysicalPage) return [];
  const from = Number(startPhysicalPage);
  const to = Number(endPhysicalPage || startPhysicalPage);
  if (!Number.isFinite(from) || !Number.isFinite(to) || to < from) return [];
  const pages = [];
  for (let page = from; page <= to; page++) {
    const url = getBookPageUrl(bookId, page);
    if (url) pages.push(url);
  }
  return pages;
}
