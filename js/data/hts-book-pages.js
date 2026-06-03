/**
 * HTS Book Page CDN URL Templates
 * Auto-generated from hts-image-download-manifest.json
 * 
 * URL format: ${template}-${pageNo}.jpg
 * CDN is publicly accessible (no auth needed).
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
 * Get CDN URL for a specific page of a book.
 * @param {number} bookId  - HTS bookId from KNTT_LESSON_POOL source
 * @param {number} pageNo  - page number (1-based)
 * @returns {string|null}
 */
export function getBookPageUrl(bookId, pageNo) {
  const template = HTS_BOOK_CDN_TEMPLATES[bookId];
  if (!template || !pageNo) return null;
  return `${template}-${pageNo}.jpg`;
}

export function getBookPageUrls(bookId, startPage, endPage) {
  if (!bookId || !startPage) return [];
  const from = Number(startPage);
  const to = Number(endPage || startPage);
  if (!Number.isFinite(from) || !Number.isFinite(to) || to < from) return [];
  const pages = [];
  for (let page = from; page <= to; page++) {
    const url = getBookPageUrl(bookId, page);
    if (url) pages.push(url);
  }
  return pages;
}
