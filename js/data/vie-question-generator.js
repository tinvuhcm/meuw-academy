/**
 * MEUW ACADEMY — vie-question-generator.js
 *
 * Generates real Vietnamese (Tiếng Việt 4 KNTT) questions from SGK content.
 *
 * Priority order: Luyện từ và câu → Viết → Đọc → Nói và nghe
 *
 * Questions are crafted from actual SGK TV4 (KNTT) lesson content:
 * - Real examples drawn from the textbook
 * - Child-friendly phrasing
 * - All multiple-choice with 4 options, exactly 1 correct answer
 * - No PPTX/OCR content used here
 */

import { KNTT_LESSON_POOL } from './kntt-lesson-pool.js';

function stableHash(input) {
  let hash = 2166136261;
  const text = String(input || '');
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function createRng(seedInput) {
  let seed = stableHash(seedInput) || 123456789;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function seededShuffle(list, seedInput) {
  const arr = [...list];
  const rng = createRng(seedInput);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeQ(question, answer, others, explanation) {
  const uniqueOthers = others.filter((opt, i, arr) => opt !== answer && arr.indexOf(opt) === i);
  return {
    type: 'multiple-choice',
    question,
    options: [answer, ...uniqueOthers].slice(0, 4),
    answer,
    explanation,
  };
}

// ─── Skill-specific question banks ─────────────────────────────────────────────

const QUESTION_BANKS = {

  // ── Specific Reading Lessons ─────────────────────────────────────────────
  'vie:bai-2-doc-thi-nhac': [
    makeQ(
      'Trong bài "Thi nhạc", Ve sầu trình bày bản nhạc gì?',
      'Bản nhạc "Mùa hè"',
      ['Khúc nhạc "Bình minh"', 'Bản nhạc "Mùa thu"', 'Bản nhạc "Mùa xuân"'],
      'Ve sầu đã trình bày bản nhạc "Mùa hè" đầy tự tin với âm thanh trong sáng, réo rắt.'
    ),
    makeQ(
      'Gà trống biểu diễn khúc nhạc gì trong buổi thi?',
      'Khúc nhạc "Bình minh"',
      ['Bản nhạc "Mùa hè"', 'Bản nhạc "Mùa thu"', 'Bản nhạc "Mùa xuân"'],
      'Gà trống biểu diễn khúc nhạc "Bình minh" với tiết tấu nhanh, khỏe khoắn.'
    ),
    makeQ(
      'Dế mèn thể hiện bản nhạc về mùa nào?',
      'Mùa thu',
      ['Mùa hè', 'Mùa xuân', 'Mùa đông'],
      'Dế mèn thể hiện bản nhạc "Mùa thu" nhẹ nhàng và trang nhã.'
    ),
    makeQ(
      'Họa mi mang đến bản nhạc gì cho buổi thi?',
      'Bản nhạc "Mùa xuân"',
      ['Bản nhạc "Mùa hè"', 'Bản nhạc "Mùa thu"', 'Khúc nhạc "Bình minh"'],
      'Họa mi mang đến bản nhạc "Mùa xuân" réo rắt, say đắm.'
    ),
    makeQ(
      'Các học trò của thầy giáo Vàng Anh đang tham gia cuộc thi gì?',
      'Thi tốt nghiệp âm nhạc',
      ['Thi kể chuyện', 'Thi múa', 'Thi vẽ tranh'],
      'Văn bản kể về buổi thi tốt nghiệp âm nhạc của các học trò thầy giáo Vàng Anh.'
    ),
    makeQ(
      'Bài đọc "Thi nhạc" ca ngợi điều gì?',
      'Sự sáng tạo và cá tính riêng của mỗi người',
      ['Sự chăm chỉ học thuộc lòng', 'Tình bạn giữa các loài chim', 'Sự vâng lời thầy giáo'],
      'Câu chuyện khuyến khích mỗi cá nhân hãy tự tin thể hiện phong cách, tài năng riêng của mình.'
    ),
  ],
  
  'vie:bai-3-doc-anh-em-sinh-doi': [
    makeQ(
      'Hai anh em sinh đôi trong câu chuyện tên là gì?',
      'Long và Khánh',
      ['Hùng và Dũng', 'Nam và Hải', 'Tuấn và Tú'],
      'Câu chuyện kể về hai anh em sinh đôi là Long và Khánh.'
    ),
    makeQ(
      'Vì sao Long cảm thấy khó chịu lúc đầu?',
      'Vì Long hay bị mọi người nhận nhầm là anh Khánh',
      ['Vì Khánh học giỏi hơn Long', 'Vì Khánh không chịu chơi với Long', 'Vì Khánh thường xuyên lấy đồ chơi của Long'],
      'Long khó chịu vì mọi người hay nhầm lẫn hai anh em do ngoại hình giống nhau.'
    ),
    makeQ(
      'Long đã làm gì để khác với anh Khánh?',
      'Cố gắng làm mọi thứ khác anh từ cách ăn mặc, kiểu tóc đến dáng đi',
      ['Chuyển sang học lớp khác', 'Không bao giờ nói chuyện với anh', 'Bắt anh Khánh phải thay đổi kiểu tóc'],
      'Long cố gắng thay đổi cách ăn mặc, kiểu tóc và dáng đi để mọi người không nhận nhầm.'
    ),
    makeQ(
      'Sự việc gì đã giúp Long nhận ra bạn bè không nhầm lẫn hai anh em?',
      'Một hội thao của trường',
      ['Một buổi thi hát', 'Một tiết học Toán', 'Một chuyến dã ngoại'],
      'Trong một hội thao của trường, Long nhận ra bạn bè vẫn phân biệt được hai anh em qua tính cách và khả năng riêng.'
    ),
    makeQ(
      'Thông điệp chính của bài đọc "Anh em sinh đôi" là gì?',
      'Mỗi người đều là một cá thể độc lập với những đặc điểm, tính cách riêng',
      ['Anh em sinh đôi luôn phải giống hệt nhau', 'Anh em sinh đôi không nên học cùng lớp', 'Anh em phải luôn nhường nhịn nhau'],
      'Câu chuyện giúp hiểu rằng dù ngoại hình giống nhau, mỗi người vẫn có tính cách và giá trị riêng biệt.'
    ),
  ],

  // ── Danh từ / Danh từ chung, danh từ riêng ──────────────────────────────
  'danh-tu': [
    makeQ(
      'Trong câu "Lan đọc sách ở thư viện", từ nào là danh từ?',
      'Lan, sách, thư viện',
      ['đọc', 'ở', 'đọc, ở'],
      'Danh từ dùng để gọi tên người, đồ vật hoặc nơi chốn: Lan (người), sách (đồ vật), thư viện (nơi chốn).'
    ),
    makeQ(
      'Nhóm nào gồm toàn danh từ?',
      'học sinh, bút chì, công viên',
      ['chạy, nhảy, hát', 'đẹp, vui, thông minh', 'và, nhưng, hoặc'],
      'Học sinh (người), bút chì (đồ vật), công viên (nơi chốn) — cả ba đều là danh từ.'
    ),
    makeQ(
      'Từ nào KHÔNG phải là danh từ?',
      'vui vẻ',
      ['con mèo', 'bàn học', 'Hà Nội'],
      '"Vui vẻ" là tính từ chỉ đặc điểm, không phải danh từ. Con mèo, bàn học, Hà Nội đều gọi tên sự vật hoặc địa danh.'
    ),
    makeQ(
      'Danh từ riêng trong câu "Bạn Mai ở Hà Nội" là gì?',
      'Mai, Hà Nội',
      ['bạn', 'ở', 'bạn, ở'],
      'Danh từ riêng là tên riêng của người (Mai) hoặc địa danh (Hà Nội), phải viết hoa chữ cái đầu mỗi tiếng.'
    ),
    makeQ(
      'Câu nào dưới đây dùng danh từ riêng đúng cách viết?',
      '"Bé Minh đi học ở trường Nguyễn Du."',
      ['"Bé minh đi học ở trường nguyễn du."', '"bé Minh đi học ở Trường nguyễn du."', '"Bé Minh đi học ở Trường nguyễn Du."'],
      'Danh từ riêng (tên người: Minh; tên trường: Nguyễn Du) phải viết hoa chữ cái đầu mỗi tiếng.'
    ),
    makeQ(
      'Muốn nhận biết danh từ, ta thường hỏi câu hỏi nào?',
      '"Ai? Cái gì? Con gì?"',
      ['"Làm gì? Thế nào?"', '"Ở đâu? Khi nào?"', '"Bao nhiêu? Mấy lần?"'],
      'Danh từ trả lời câu hỏi "Ai? Cái gì? Con gì?" vì danh từ dùng để gọi tên sự vật.'
    ),
    makeQ(
      'Từ nào là danh từ chung?',
      'con sông',
      ['sông Hồng', 'Hà Nội', 'Minh'],
      '"Con sông" là danh từ chung vì chỉ loại sự vật chung. "Sông Hồng", "Hà Nội", "Minh" là danh từ riêng.'
    ),
    makeQ(
      'Trong câu "Bạn Lan học môn Toán", có mấy danh từ?',
      '2 danh từ: Lan, Toán',
      ['1 danh từ: Lan', '3 danh từ: bạn, Lan, Toán', '4 danh từ: bạn, Lan, học, Toán'],
      'Lan là tên người, Toán là tên môn học nên đều là danh từ.'
    ),
    makeQ(
      'Từ nào dưới đây là danh từ chỉ đơn vị?',
      'con, chiếc, quyển',
      ['chạy, nhảy, bơi', 'đẹp, vui, cao', 'và, hay, nhưng'],
      'Danh từ chỉ đơn vị đứng trước danh từ khác để đếm: con mèo, chiếc bàn, quyển sách.'
    ),
  ],

  // ── Động từ ─────────────────────────────────────────────────────────────
  'dong-tu': [
    makeQ(
      'Trong câu "Gió thổi nhẹ", từ nào là động từ?',
      'thổi',
      ['gió', 'nhẹ', 'gió nhẹ'],
      '"Thổi" là hoạt động của gió, nên đây là động từ. "Gió" là danh từ, "nhẹ" là tính từ.'
    ),
    makeQ(
      'Nhóm nào gồm toàn động từ?',
      'đọc, viết, nghe',
      ['bút, vở, sách', 'cao, đẹp, vui', 'sân, lớp, trường'],
      'Đọc, viết, nghe đều là hoạt động — đây là ba động từ chỉ hoạt động học tập quen thuộc.'
    ),
    makeQ(
      'Từ nào KHÔNG phải là động từ?',
      'màu đỏ',
      ['đi', 'đứng', 'nhảy'],
      '"Màu đỏ" là cụm từ chỉ đặc điểm/màu sắc, không chỉ hoạt động hay trạng thái.'
    ),
    makeQ(
      'Động từ trong câu "Bố tưới cây mỗi sáng" là gì?',
      'tưới',
      ['Bố', 'cây', 'mỗi sáng'],
      '"Tưới" là hoạt động của bố. "Bố" và "cây" là danh từ; "mỗi sáng" chỉ thời gian.'
    ),
    makeQ(
      'Muốn tìm động từ trong câu, ta thường hỏi câu hỏi nào?',
      '"Làm gì? Làm thế nào?"',
      ['"Ai? Cái gì?"', '"Ở đâu? Khi nào?"', '"Bao nhiêu? Mấy?"'],
      'Động từ trả lời câu hỏi "làm gì?" (hoạt động) hoặc "thế nào?" (trạng thái).'
    ),
    makeQ(
      'Từ nào chỉ TRẠNG THÁI, không chỉ hoạt động?',
      'ngủ',
      ['chạy', 'nhảy', 'hát'],
      '"Ngủ" là trạng thái của người hoặc vật. Chạy, nhảy, hát đều chỉ hoạt động rõ ràng.'
    ),
    makeQ(
      'Trong câu "Em bé đang cười rất vui", động từ là gì?',
      'cười',
      ['em bé', 'vui', 'rất'],
      '"Cười" là hoạt động của em bé. "Em bé" là danh từ, "vui" và "rất" bổ sung ý nghĩa.'
    ),
    makeQ(
      'Câu nào dùng động từ để chỉ hoạt động học tập?',
      '"Nam đọc sách và ghi chép bài."',
      ['"Nam rất thông minh và chăm chỉ."', '"Quyển sách của Nam rất đẹp."', '"Lớp Nam có 35 học sinh."'],
      '"Đọc" và "ghi chép" là hai động từ chỉ hoạt động học tập cụ thể.'
    ),
    makeQ(
      'Từ nào vừa có thể là động từ, vừa có thể là danh từ?',
      'học',
      ['chạy', 'nhảy', 'múa'],
      '"Học" có thể là động từ (Em đang học) hoặc danh từ (Chuyện học hành). Chạy, nhảy, múa thường chỉ là động từ.'
    ),
  ],

  // ── Tính từ ─────────────────────────────────────────────────────────────
  'tinh-tu': [
    makeQ(
      'Từ nào là tính từ trong câu "Con mèo trắng ngủ trên chiếc ghế mềm"?',
      'trắng, mềm',
      ['con mèo', 'ngủ', 'chiếc ghế'],
      '"Trắng" chỉ màu sắc, "mềm" chỉ đặc điểm — cả hai đều là tính từ.'
    ),
    makeQ(
      'Nhóm nào gồm toàn tính từ?',
      'đỏ, cao, thông minh',
      ['chạy, đứng, ngồi', 'bàn, ghế, sách', 'và, hay, nhưng'],
      'Đỏ (màu sắc), cao (kích thước), thông minh (phẩm chất) — đây là ba tính từ.'
    ),
    makeQ(
      'Tính từ trong câu "Bầu trời hôm nay xanh thẳm" là gì?',
      'xanh thẳm',
      ['bầu trời', 'hôm nay', 'là'],
      '"Xanh thẳm" mô tả đặc điểm màu sắc của bầu trời — đây là tính từ.'
    ),
    makeQ(
      'Muốn tìm tính từ trong câu, ta thường hỏi câu hỏi nào?',
      '"Thế nào? Như thế nào?"',
      ['"Ai? Cái gì?"', '"Làm gì?"', '"Ở đâu? Khi nào?"'],
      'Tính từ trả lời câu hỏi "thế nào?" vì nó chỉ đặc điểm, tính chất của người hoặc vật.'
    ),
    makeQ(
      'Từ nào KHÔNG phải là tính từ?',
      'học',
      ['xinh', 'vui', 'nhanh'],
      '"Học" là động từ chỉ hoạt động. Xinh, vui, nhanh đều là tính từ chỉ đặc điểm.'
    ),
    makeQ(
      'Trong câu "Cô ấy hát rất hay", tính từ là gì?',
      'hay',
      ['cô ấy', 'hát', 'rất'],
      '"Hay" mô tả đặc điểm của việc hát — đây là tính từ. "Rất" là từ bổ nghĩa thêm cho tính từ.'
    ),
    makeQ(
      'Câu nào dùng tính từ để tả cảnh thiên nhiên?',
      '"Dòng sông uốn lượn hiền hòa dưới ánh nắng vàng rực."',
      ['"Con sông chảy qua làng."', '"Người ta bơi thuyền trên sông."', '"Sông có nhiều cá tôm."'],
      '"Hiền hòa" và "vàng rực" là hai tính từ mô tả đặc điểm của sông và ánh nắng.'
    ),
    makeQ(
      'Tính từ "khổng lồ" bổ sung ý nghĩa gì cho danh từ?',
      'Kích thước — rất to lớn',
      ['Màu sắc — màu xanh đậm', 'Âm thanh — tiếng ồn lớn', 'Tốc độ — di chuyển nhanh'],
      '"Khổng lồ" là tính từ chỉ kích thước cực lớn, bổ nghĩa cho danh từ đứng trước hoặc sau nó.'
    ),
    makeQ(
      'Câu nào có dùng tính từ so sánh?',
      '"Con voi to hơn con ngựa."',
      ['"Con voi uống nước."', '"Con voi là động vật."', '"Con voi sống ở rừng.'],
      '"To hơn" là tính từ ở dạng so sánh hơn, so sánh kích thước của hai con vật.'
    ),
  ],

  // ── Câu / Hai thành phần chính (Chủ ngữ - Vị ngữ) ──────────────────────
  'cau-chu-ngu-vi-ngu': [
    makeQ(
      'Câu "Gió thổi mạnh" có chủ ngữ là gì?',
      'Gió',
      ['thổi', 'mạnh', 'thổi mạnh'],
      'Chủ ngữ trả lời câu hỏi "Ai?" hoặc "Cái gì?". Gió là thứ đang thực hiện hành động thổi.'
    ),
    makeQ(
      'Vị ngữ trong câu "Con chim hót líu lo" là gì?',
      'hót líu lo',
      ['con chim', 'chim', 'líu lo'],
      'Vị ngữ cho biết chủ ngữ làm gì hoặc như thế nào. "Hót líu lo" cho biết con chim đang làm gì.'
    ),
    makeQ(
      'Câu nào có đủ chủ ngữ và vị ngữ?',
      '"Bé Lan ngủ ngon."',
      ['"Bé Lan đang..."', '"Ngủ rất ngon."', '"Rất ngon giấc."'],
      '"Bé Lan" là chủ ngữ (ai?), "ngủ ngon" là vị ngữ (làm gì? thế nào?). Câu đủ hai thành phần chính.'
    ),
    makeQ(
      'Chủ ngữ thường trả lời cho câu hỏi nào?',
      '"Ai? Cái gì? Con gì?"',
      ['"Làm gì? Thế nào?"', '"Ở đâu? Khi nào?"', '"Vì sao? Để làm gì?"'],
      'Chủ ngữ là thành phần nêu tên người, vật hoặc hiện tượng — trả lời câu hỏi "Ai/Cái gì/Con gì?"'
    ),
    makeQ(
      'Vị ngữ thường trả lời cho câu hỏi nào?',
      '"Làm gì? Là gì? Thế nào?"',
      ['"Ai? Cái gì?"', '"Ở đâu? Khi nào?"', '"Bao nhiêu? Mấy?"'],
      'Vị ngữ cho biết chủ ngữ làm gì, là gì, hoặc có đặc điểm gì.'
    ),
    makeQ(
      'Câu "Mặt trời mọc đằng đông" có vị ngữ là gì?',
      'mọc đằng đông',
      ['mặt trời', 'đằng đông', 'mọc'],
      '"Mặt trời" là chủ ngữ; "mọc đằng đông" là vị ngữ cho biết mặt trời đang làm gì và ở đâu.'
    ),
    makeQ(
      'Trong câu "Những con chim đang hót trên cành cây.", chủ ngữ là gì?',
      'Những con chim',
      ['đang hót', 'trên cành cây', 'cành cây'],
      '"Những con chim" trả lời câu hỏi "Ai/Cái gì đang hót?" — đây là chủ ngữ.'
    ),
    makeQ(
      'Câu "Bầu trời trong xanh." có vị ngữ chỉ gì?',
      'Đặc điểm của chủ ngữ',
      ['Hoạt động của chủ ngữ', 'Nơi chốn xảy ra', 'Thời gian xảy ra'],
      '"Trong xanh" mô tả tính chất của bầu trời — vị ngữ chỉ đặc điểm, không phải hành động.'
    ),
    makeQ(
      'Câu nào vị ngữ là cụm danh từ?',
      '"Bố em là kỹ sư."',
      ['"Bố em đang làm việc."', '"Bố em về nhà rồi."', '"Bố em cười to lắm."'],
      '"Là kỹ sư" là vị ngữ dùng cụm "là + danh từ" để nêu nghề nghiệp của chủ ngữ.'
    ),
  ],

  // ── Trạng ngữ ────────────────────────────────────────────────────────────
  'trang-ngu': [
    makeQ(
      'Trong câu "Sáng sớm, em tập thể dục.", trạng ngữ là gì?',
      'Sáng sớm',
      ['em', 'tập thể dục', 'em tập'],
      '"Sáng sớm" chỉ thời gian xảy ra hành động — đây là trạng ngữ chỉ thời gian.'
    ),
    makeQ(
      'Trạng ngữ bổ sung ý nghĩa gì cho câu?',
      'Thời gian, nơi chốn, nguyên nhân, mục đích, phương tiện của hành động',
      ['Tên của chủ ngữ', 'Nội dung của vị ngữ', 'Số lượng danh từ trong câu'],
      'Trạng ngữ mở rộng câu bằng cách bổ sung thông tin về hoàn cảnh xảy ra hành động.'
    ),
    makeQ(
      'Trong câu "Vì trời mưa, chúng tôi ở lại trong nhà.", trạng ngữ chỉ gì?',
      'Nguyên nhân',
      ['Thời gian', 'Nơi chốn', 'Mục đích'],
      '"Vì trời mưa" cho biết lý do/nguyên nhân chúng tôi ở lại — đây là trạng ngữ chỉ nguyên nhân.'
    ),
    makeQ(
      'Trạng ngữ thường đứng ở đâu trong câu?',
      'Đầu câu, cuối câu hoặc giữa câu (thường đứng đầu câu)',
      ['Luôn đứng ở giữa câu', 'Luôn đứng ở cuối câu', 'Đứng ngay sau vị ngữ'],
      'Trạng ngữ linh hoạt về vị trí, nhưng thường đứng ở đầu câu, ngăn cách với phần còn lại bằng dấu phẩy.'
    ),
    makeQ(
      'Câu nào có trạng ngữ chỉ nơi chốn?',
      '"Ở công viên, các bạn nhỏ đang chơi đùa vui vẻ."',
      ['"Sáng nay, chúng em đi học sớm."', '"Vì muốn giỏi, em học rất chăm."', '"Em học bằng bút chì."'],
      '"Ở công viên" chỉ địa điểm xảy ra hành động — đây là trạng ngữ chỉ nơi chốn.'
    ),
    makeQ(
      'Trong câu "Em dùng bút chì để vẽ.", trạng ngữ chỉ gì?',
      'Phương tiện',
      ['Thời gian', 'Nơi chốn', 'Nguyên nhân'],
      '"Bằng bút chì" / "dùng bút chì" chỉ công cụ/phương tiện thực hiện hành động.'
    ),
    makeQ(
      'Câu nào có trạng ngữ chỉ mục đích?',
      '"Em học chăm để đạt điểm cao."',
      ['"Em học chăm vì thích học."', '"Em học ở trường."', '"Em học từ sáng sớm."'],
      '"Để đạt điểm cao" chỉ mục đích của việc học chăm — đây là trạng ngữ chỉ mục đích.'
    ),
    makeQ(
      'Trạng ngữ "bằng xe đạp" trong câu bổ sung ý nghĩa gì?',
      'Phương tiện đi lại',
      ['Thời gian đi', 'Nơi đến', 'Nguyên nhân đi'],
      '"Bằng xe đạp" chỉ phương tiện — cách thức thực hiện hành động di chuyển.'
    ),
    makeQ(
      'Câu nào KHÔNG có trạng ngữ?',
      '"Bé Hoa ngủ ngon."',
      ['"Buổi tối, Bé Hoa ngủ ngon."', '"Bé Hoa ngủ ngon ở nhà."', '"Vì mệt, Bé Hoa ngủ ngon."'],
      '"Bé Hoa ngủ ngon." chỉ có chủ ngữ và vị ngữ, không có thành phần bổ sung hoàn cảnh nào.'
    ),
  ],

  // ── Dấu gạch ngang ───────────────────────────────────────────────────────
  'dau-gach-ngang': [
    makeQ(
      'Dấu gạch ngang trong đoạn hội thoại dùng để làm gì?',
      'Đánh dấu lời nói trực tiếp của nhân vật',
      ['Chỉ ý kiến của tác giả', 'Liệt kê các ý', 'Chú thích tên riêng'],
      'Khi một nhân vật bắt đầu nói, dấu gạch ngang đứng ở đầu dòng để đánh dấu lời thoại đó.'
    ),
    makeQ(
      'Dấu gạch ngang còn được dùng để làm gì ngoài đánh dấu lời thoại?',
      'Đánh dấu các ý liệt kê hoặc giải thích thêm',
      ['Kết thúc câu', 'Tách hai câu ghép', 'Đánh dấu từ mượn'],
      'Dấu gạch ngang có thể dùng để đánh dấu các ý trong đoạn liệt kê, hoặc giải thích thêm trong ngoặc.'
    ),
    makeQ(
      'Trong đoạn sau, dấu gạch ngang dùng để làm gì?\n— Bạn tên gì? — Mình là Hoa.',
      'Đánh dấu lời nói của nhân vật trong hội thoại',
      ['Liệt kê sự vật', 'Giải thích thêm ý nghĩa', 'Tách đoạn văn'],
      'Hai dấu gạch ngang ở đầu mỗi câu đánh dấu lời của hai nhân vật khác nhau trong cuộc hội thoại.'
    ),
    makeQ(
      'Khi viết đoạn hội thoại, dấu gạch ngang thường đứng ở đâu?',
      'Đầu dòng, trước lời nói của nhân vật',
      ['Cuối câu, sau dấu chấm', 'Giữa hai từ', 'Trước tên nhân vật'],
      'Trong đoạn hội thoại, dấu gạch ngang luôn đứng ở đầu dòng mới, ngay trước lời nhân vật.'
    ),
    makeQ(
      'Trong đoạn liệt kê dưới đây, dấu gạch ngang dùng để làm gì?\n"Rừng cung cấp cho ta:\n— Gỗ để xây nhà.\n— Oxy để thở.\n— Thuốc chữa bệnh."',
      'Đánh dấu từng ý trong đoạn liệt kê',
      ['Đánh dấu lời thoại nhân vật', 'Nối hai từ ghép', 'Kết thúc đoạn văn'],
      'Dấu gạch ngang đứng đầu mỗi dòng trong đoạn liệt kê để đánh dấu từng mục riêng biệt.'
    ),
    makeQ(
      'Câu nào dùng dấu gạch ngang để giải thích thêm?',
      '"Hà Nội — thủ đô của Việt Nam — nằm bên sông Hồng."',
      ['"— Bạn tên gì?"', '"Hà Nội; thủ đô Việt Nam."', '"Hà Nội (thủ đô) nằm bên sông Hồng."'],
      'Hai dấu gạch ngang bao quanh cụm "thủ đô của Việt Nam" để chú thích thêm về Hà Nội ngay trong câu.'
    ),
    makeQ(
      'Dấu gạch ngang có mấy công dụng chính?',
      '3 công dụng: lời thoại, liệt kê, giải thích thêm',
      ['1 công dụng: chỉ đánh dấu lời thoại', '2 công dụng: lời thoại và nối từ', '4 công dụng: lời thoại, liệt kê, giải thích, kết câu'],
      'Dấu gạch ngang có 3 công dụng chính: đánh dấu lời thoại đầu dòng, đánh dấu ý trong đoạn liệt kê, và giải thích thêm trong câu.'
    ),
    makeQ(
      'Từ nào mô tả đúng dấu gạch ngang (—)?',
      'Dài hơn dấu gạch nối (-)',
      ['Ngắn hơn dấu gạch nối', 'Bằng dấu gạch nối', 'Giống dấu gạch chân'],
      'Dấu gạch ngang (—) dài hơn dấu gạch nối (-). Dấu gạch nối nối từ ghép, dấu gạch ngang dùng cho lời thoại và liệt kê.'
    ),
  ],

  // ── Dấu ngoặc kép ────────────────────────────────────────────────────────
  'dau-ngoac-kep': [
    makeQ(
      'Dấu ngoặc kép dùng để làm gì?',
      'Đánh dấu lời nói được trích dẫn nguyên văn hoặc tên tác phẩm, từ ngữ đặc biệt',
      ['Đánh dấu lời hội thoại trực tiếp ở đầu dòng', 'Liệt kê sự vật', 'Kết thúc câu hỏi'],
      'Dấu ngoặc kép dùng khi trích dẫn nguyên văn, nêu tên tác phẩm, hay dùng từ theo nghĩa đặc biệt.'
    ),
    makeQ(
      'Câu nào dùng dấu ngoặc kép đúng cách?',
      '"Bài thơ \\"Quê hương\\" rất hay."',
      ['"Bài thơ— Quê hương —rất hay."', '"Bài thơ (Quê hương) rất hay."', '"Bài thơ. Quê hương. rất hay."'],
      'Tên tác phẩm thường được đặt trong dấu ngoặc kép để phân biệt với nội dung xung quanh.'
    ),
    makeQ(
      'Dấu ngoặc kép khác dấu gạch ngang ở điểm nào?',
      'Ngoặc kép trích dẫn nguyên văn; gạch ngang đánh dấu lời thoại đầu dòng',
      ['Cả hai đều dùng để liệt kê ý', 'Cả hai dùng cho tên riêng', 'Không có sự khác biệt'],
      'Ngoặc kép thường đặt quanh một đoạn trích hoặc tên; gạch ngang đứng đầu dòng trước lời hội thoại.'
    ),
    makeQ(
      'Câu nào dùng dấu ngoặc kép để chỉ từ theo nghĩa đặc biệt?',
      '"Con mèo được gọi là \"thám tử\" của nhà vì hay sục sạo mọi ngóc ngách."',
      ['"Con mèo nhảy lên bàn."', '"Con mèo, chú chó và con thỏ đang chơi."', '"— Con mèo đói rồi.'],
      'Dấu ngoặc kép quanh "thám tử" cho thấy từ này dùng theo nghĩa bóng/hài hước, không phải nghĩa đen.'
    ),
    makeQ(
      'Tên bài thơ "Quê hương" được đặt trong dấu ngoặc kép. Điều này có ý nghĩa gì?',
      'Xác định đây là tên tác phẩm văn học',
      ['Chỉ từ dùng nghĩa bóng', 'Đánh dấu lời nhân vật nói', 'Tách đoạn văn'],
      'Tên tác phẩm (sách, truyện, bài thơ, bài hát...) thường được đặt trong dấu ngoặc kép hoặc in nghiêng.'
    ),
    makeQ(
      'Có mấy công dụng chính của dấu ngoặc kép?',
      '3 công dụng: trích dẫn nguyên văn, tên tác phẩm, từ dùng nghĩa đặc biệt',
      ['1 công dụng: chỉ trích dẫn lời nói', '2 công dụng: trích dẫn và nêu tên người', '4 công dụng: trích dẫn, tên người, tên vật, địa danh'],
      'Dấu ngoặc kép dùng để: (1) trích dẫn nguyên văn, (2) nêu tên tác phẩm, (3) dùng từ theo nghĩa đặc biệt/hài hước.'
    ),
    makeQ(
      'Đặt câu dùng dấu ngoặc kép đúng cách nhất là câu nào?',
      '"Bác Hồ nói: \\"Non sông Việt Nam có trở nên tươi đẹp hay không là do các cháu mai sau.\\"',
      ['"Bác Hồ nói — non sông Việt Nam có trở nên tươi đẹp..."', '"Bác Hồ nói (non sông Việt Nam có trở nên tươi đẹp...)"', '"Bác Hồ nói. Non sông Việt Nam có trở nên tươi đẹp..."'],
      'Khi trích dẫn nguyên văn lời nói hoặc văn bản, ta đặt phần trích dẫn trong dấu ngoặc kép.'
    ),
    makeQ(
      'Trường hợp nào KHÔNG cần dùng dấu ngoặc kép?',
      'Kể lại ý chính của câu nói (không trích nguyên văn)',
      ['Trích dẫn nguyên văn câu nói của ai đó', 'Nêu tên một bài thơ nổi tiếng', 'Dùng từ theo nghĩa hài hước'],
      'Khi chỉ kể lại ý chính (tóm tắt), không cần ngoặc kép. Chỉ dùng ngoặc kép khi giữ nguyên từng chữ gốc.'
    ),
  ],

  // ── Biện pháp nhân hóa ───────────────────────────────────────────────────
  'nhan-hoa': [
    makeQ(
      'Nhân hóa là gì?',
      'Dùng từ ngữ chỉ người để miêu tả hoặc nói về sự vật, con vật',
      ['Dùng từ so sánh để tả màu sắc', 'Liệt kê nhiều sự vật cùng lúc', 'Lặp lại nhiều lần một từ'],
      'Nhân hóa là biện pháp tu từ gán cho sự vật/con vật những hành động, cảm xúc, tính cách của người.'
    ),
    makeQ(
      'Câu nào có sử dụng biện pháp nhân hóa?',
      '"Chú gió ơi, chú đi đâu thế?"',
      ['"Gió thổi rất mạnh hôm nay."', '"Cây cối rung lên vì gió."', '"Mùa thu gió se lạnh."'],
      '"Chú gió" dùng từ xưng hô của người để gọi gió, và câu hỏi cũng như hỏi người — đây là nhân hóa.'
    ),
    makeQ(
      'Biện pháp nhân hóa có tác dụng gì?',
      'Làm cho sự vật trở nên gần gũi, sinh động, giàu cảm xúc hơn',
      ['Làm cho câu văn ngắn gọn hơn', 'Giúp liệt kê sự vật chính xác hơn', 'Làm rõ nguồn gốc sự vật'],
      'Nhân hóa khiến thiên nhiên, đồ vật trở nên có "hồn", giúp người đọc cảm nhận được vẻ đẹp và sự thân thiết.'
    ),
    makeQ(
      'Trong câu "Cô mây trắng lơ lửng trên bầu trời xanh.", từ nào thể hiện nhân hóa?',
      '"Cô mây"',
      ['"trắng"', '"lơ lửng"', '"bầu trời xanh"'],
      '"Cô" là từ dùng để gọi người, được dùng cho mây — đây là cách nhân hóa sự vật bằng từ xưng hô.'
    ),
    makeQ(
      'Câu nào dùng nhân hóa bằng cách gán cảm xúc của người cho sự vật?',
      '"Cây bàng đứng buồn nhìn mùa đông về."',
      ['"Cây bàng có lá rất to."', '"Mùa đông cây bàng rụng lá."', '"Cây bàng trồng ở sân trường."'],
      '"Đứng buồn" gán cảm xúc buồn bã của người cho cây bàng — đây là cách nhân hóa bằng cảm xúc.'
    ),
    makeQ(
      'Tác dụng chính của nhân hóa trong thơ văn là gì?',
      'Làm cho thiên nhiên, đồ vật trở nên sinh động và gần gũi với con người',
      ['Làm cho câu văn khó hiểu hơn', 'Giúp so sánh hai sự vật với nhau', 'Giúp liệt kê nhiều sự vật hơn'],
      'Nhân hóa khiến thiên nhiên và đồ vật trở nên có "tâm hồn", cảm xúc — người đọc dễ đồng cảm và cảm thấy gần gũi hơn.'
    ),
    makeQ(
      'Câu "Ông mặt trời thức dậy từ sớm để soi sáng cho mọi người." dùng nhân hóa theo cách nào?',
      'Dùng từ xưng hô ("ông") và gán hành động của người ("thức dậy", "soi sáng cho mọi người")',
      ['Chỉ dùng từ xưng hô "ông"', 'Chỉ gán hành động "thức dậy"', 'Không có nhân hóa, chỉ là miêu tả bình thường'],
      'Nhân hóa kép: "ông" (xưng hô như người) + "thức dậy" (hành động của người) + "soi sáng cho mọi người" (mục đích như người có tình cảm).'
    ),
    makeQ(
      'Từ nào KHÔNG phải từ nhân hóa trong câu "Chị gió hát, anh mây múa, em mưa vỗ tay."?',
      'Không có — tất cả đều là nhân hóa',
      ['"hát"', '"múa"', '"vỗ tay"'],
      '"Chị gió", "anh mây", "em mưa" dùng từ xưng hô của người; "hát", "múa", "vỗ tay" là hành động của người — toàn bộ câu đều dùng nhân hóa.'
    ),
  ],

  // ── Câu chủ đề / Đoạn văn ───────────────────────────────────────────────
  'doan-van-cau-chu-de': [
    makeQ(
      'Câu chủ đề là gì?',
      'Câu nêu ý chính, bao quát nội dung của cả đoạn văn',
      ['Câu đầu tiên của đoạn văn', 'Câu dài nhất trong đoạn', 'Câu có nhiều tính từ nhất'],
      'Câu chủ đề không nhất thiết ở đầu đoạn; nó là câu nêu khái quát ý chính nhất của cả đoạn.'
    ),
    makeQ(
      'Các câu còn lại trong đoạn văn có nhiệm vụ gì so với câu chủ đề?',
      'Làm rõ, bổ sung bằng chi tiết, ví dụ hoặc lí lẽ',
      ['Mâu thuẫn với câu chủ đề', 'Lặp lại câu chủ đề', 'Đổi sang chủ đề khác'],
      'Các câu triển khai dùng chi tiết, ví dụ cụ thể để giải thích và làm rõ ý của câu chủ đề.'
    ),
    makeQ(
      'Muốn tìm câu chủ đề, ta làm thế nào?',
      'Đọc cả đoạn, tìm câu bao quát được toàn bộ nội dung các câu còn lại',
      ['Chọn câu ngắn nhất', 'Chọn câu đầu tiên', 'Chọn câu cuối cùng'],
      'Câu chủ đề là câu mà nếu bỏ đi, ta không còn biết đoạn văn nói về gì — nó mang ý nghĩa bao quát nhất.'
    ),
    makeQ(
      'Đoạn văn nào có câu chủ đề rõ ràng?',
      '"Hà Nội có nhiều điểm du lịch đẹp. Hồ Hoàn Kiếm nổi tiếng với tháp Rùa. Văn Miếu là trường đại học đầu tiên của Việt Nam."',
      ['"Trời hôm nay đẹp. Mây trắng bay. Nắng vàng chiếu."', '"Bạn An học giỏi. Bạn Nam học giỏi. Bạn Hoa cũng học giỏi."', '"Em thích mèo. Mèo hay chơi. Mèo rất đáng yêu."'],
      'Câu đầu "Hà Nội có nhiều điểm du lịch đẹp" là câu chủ đề; hai câu sau nêu ví dụ cụ thể.'
    ),
    makeQ(
      'Câu chủ đề thường ở vị trí nào trong đoạn văn?',
      'Có thể ở đầu, cuối hoặc giữa — thường ở đầu đoạn',
      ['Luôn ở câu đầu tiên', 'Luôn ở câu cuối cùng', 'Luôn ở giữa đoạn'],
      'Câu chủ đề linh hoạt về vị trí, nhưng thường đứng đầu đoạn để định hướng cho người đọc.'
    ),
    makeQ(
      'Đoạn văn không có câu chủ đề rõ ràng thường như thế nào?',
      'Các câu tản mạn, khó xác định được ý chính',
      ['Ngắn hơn các đoạn khác', 'Dùng nhiều tính từ hơn', 'Có nhiều nhân vật hơn'],
      'Khi thiếu câu chủ đề, người đọc phải tự suy luận ý chính từ tổng hợp các câu — đoạn văn trở nên khó hiểu hơn.'
    ),
    makeQ(
      'Để viết một đoạn văn tốt, sau câu chủ đề cần thêm gì?',
      'Các câu giải thích, ví dụ cụ thể hoặc lí do hỗ trợ cho ý chính',
      ['Chỉ cần một câu kết', 'Lặp lại câu chủ đề nhiều lần', 'Chuyển sang chủ đề mới'],
      'Câu chủ đề nêu ý chính; các câu sau phát triển ý bằng chi tiết, dẫn chứng hoặc giải thích để làm sáng tỏ.'
    ),
    makeQ(
      'Câu nào KHÔNG thể làm câu chủ đề cho đoạn văn về "lợi ích của đọc sách"?',
      '"Quyển sách này có bìa màu đỏ."',
      ['"Đọc sách giúp ta mở rộng kiến thức."', '"Sách là người bạn tốt nhất của con người."', '"Đọc sách rèn luyện khả năng tập trung và tư duy."'],
      '"Quyển sách này có bìa màu đỏ" chỉ mô tả đặc điểm một cuốn sách cụ thể, không bao quát được lợi ích của đọc sách.'
    ),
  ],

  // ── Viết / Đoạn văn nêu ý kiến ─────────────────────────────────────────
  'doan-van-y-kien': [
    makeQ(
      'Đoạn văn nêu ý kiến cần có gì?',
      'Ý kiến rõ ràng và lí do thuyết phục',
      ['Chỉ cần liệt kê sự việc', 'Chỉ cần kể chuyện hay', 'Chỉ cần tả cảnh đẹp'],
      'Để thuyết phục người đọc, đoạn văn nêu ý kiến phải có ý kiến rõ ràng và ít nhất một lí do hợp lí.'
    ),
    makeQ(
      'Khi viết đoạn văn nêu ý kiến, bước nào nên làm trước?',
      'Xác định rõ ý kiến của mình rồi mới tìm lí do',
      ['Viết ngay vào giấy', 'Trang trí cho đẹp', 'Đếm số câu trước'],
      'Quy trình viết: hiểu yêu cầu → xác định ý kiến → tìm lí do → viết câu → đọc lại.'
    ),
    makeQ(
      'Câu nào là ý kiến, không phải lí do?',
      '"Em nghĩ mỗi người đều nên học một nhạc cụ."',
      ['"Vì học nhạc giúp não phát triển."', '"Nhạc cụ thường được bán ở cửa hàng âm nhạc."', '"Có nhiều loại nhạc cụ như đàn, trống, sáo."'],
      '"Em nghĩ..." trực tiếp nêu quan điểm, đây là ý kiến. Các câu còn lại là lí do, sự thật hoặc thông tin.'
    ),
    makeQ(
      'Một đoạn văn nêu ý kiến tốt cần có mấy phần?',
      '2 phần: ý kiến rõ ràng và lí do thuyết phục',
      ['1 phần: kể chuyện hay', '3 phần: mở bài, thân bài, kết bài như bài văn dài', '4 phần: ý kiến, lí do, ví dụ, kết luận riêng biệt'],
      'Đoạn văn ngắn nêu ý kiến cần (1) ý kiến rõ ràng và (2) ít nhất một lí do hợp lí. Thêm ví dụ cụ thể sẽ thuyết phục hơn.'
    ),
    makeQ(
      'Từ nào thường dùng để bắt đầu phần lí do trong đoạn văn nêu ý kiến?',
      '"Vì", "bởi vì", "lí do là"',
      ['"Tuy nhiên", "mặc dù"', '"Thứ nhất", "thứ hai" (chỉ dùng trong bài văn dài)', '"Nhưng", "còn"'],
      '"Vì", "bởi vì", "lí do là" là các từ nối dùng để đưa ra lí do hỗ trợ cho ý kiến đã nêu.'
    ),
    makeQ(
      'Câu kết nào phù hợp nhất để kết thúc đoạn văn nêu ý kiến?',
      'Câu nhắc lại ý kiến và khẳng định lại lập trường',
      ['Câu kể một câu chuyện mới', 'Câu đặt câu hỏi không có trả lời', 'Câu liệt kê thêm sự kiện'],
      'Câu kết của đoạn nêu ý kiến nên tóm tắt lại quan điểm, giúp người đọc nhớ rõ lập trường của người viết.'
    ),
    makeQ(
      'Khi nào cần viết đoạn văn nêu ý kiến thay vì kể chuyện?',
      'Khi muốn thuyết phục người khác tin vào quan điểm của mình',
      ['Khi muốn tả một phong cảnh đẹp', 'Khi muốn kể lại sự kiện theo thứ tự thời gian', 'Khi muốn giải thích cách làm một việc gì đó'],
      'Văn nêu ý kiến dùng để bày tỏ quan điểm và thuyết phục; tả cảnh, kể chuyện, hướng dẫn dùng các kiểu văn khác.'
    ),
    makeQ(
      'Câu "Em thích mùa hè vì được nghỉ học và đi chơi." có ý kiến và lí do chưa?',
      'Có đủ: ý kiến ("thích mùa hè") và lí do ("được nghỉ học và đi chơi")',
      ['Chỉ có ý kiến, chưa có lí do', 'Chỉ có lí do, chưa có ý kiến', 'Chưa có cả hai, chỉ là câu thông tin'],
      '"Em thích mùa hè" là ý kiến; "vì được nghỉ học và đi chơi" là lí do hỗ trợ — đoạn ngắn nhưng đủ cấu trúc.'
    ),
  ],

  // ── Luyện chính tả / Từ ngữ ─────────────────────────────────────────────
  'chinh-ta': [
    makeQ(
      'Chữ nào viết đúng chính tả?',
      'chăm chỉ',
      ['chăm chỉ', 'chăng chỉ', 'chăm chỉ'],  // fallback — will be overridden by specific lessons
      '"Chăm chỉ" viết với "ch" vì đây là từ ghép đúng chính tả quen dùng.'
    ),
    makeQ(
      'Phân biệt "tr" và "ch": từ nào viết đúng?',
      'trường học',
      ['chường học', 'truờng học', 'truong học'],
      '"Trường" viết với "tr", không viết "ch". Một số từ hay nhầm: trời, trắng, trâu đều bắt đầu bằng "tr".'
    ),
    makeQ(
      'Phân biệt "s" và "x": từ nào viết đúng?',
      'xanh lá',
      ['sanh lá', 'zanh lá', 'sxanh lá'],
      '"Xanh" viết với "x". Một cách nhớ: các màu sắc như xanh, xám đều viết với "x".'
    ),
    makeQ(
      'Phân biệt "d", "gi" và "r": từ nào viết đúng?',
      'ra đi',
      ['da đi', 'gia đi', 'rra đi'],
      '"Ra" viết với "r". Lưu ý: "ra, rừng, rộng" viết "r"; "da, danh, dân" viết "d"; "gia, giải, giáo" viết "gi".'
    ),
    makeQ(
      'Từ nào viết đúng chính tả?',
      'kết quả',
      ['kết qủa', 'kết quã', 'két quả'],
      '"Kết quả" viết với dấu hỏi (ả). Lưu ý phân biệt dấu hỏi (ả) và dấu ngã (ã).'
    ),
    makeQ(
      'Phân biệt "l" và "n": nhóm từ nào viết đúng?',
      'lúa nếp, nông dân, làng quê',
      ['núa nếp, lông dân, làng quê', 'lúa nếp, lông dân, nàng quê', 'núa nếp, nông dân, nàng quê'],
      '"L" và "n" hay bị nhầm trong giọng nói địa phương. Tra từ điển hoặc nhớ mặt chữ khi không chắc.'
    ),
    makeQ(
      'Câu nào viết đúng chính tả (phân biệt "c" và "k")?',
      '"Khi học bài, em cần kiên nhẫn và cẩn thận."',
      ['"Chi học bài, em cần kiên nhẫn và cẩn thận."', '"Khi học bài, em cần kien nhẫn và cẩn thận."', '"Khi học bài, em cần kiên nhẫn và cẫn thận."'],
      '"K" đứng trước "i, ê, e"; "c" đứng trước các âm còn lại. "Kiên" và "khi" dùng "k"; "cần" và "cẩn" dùng "c".'
    ),
    makeQ(
      'Từ nào dưới đây viết SAI chính tả?',
      'giải thíc',
      ['giải thích', 'khoa học', 'thành thật'],
      '"Giải thíc" sai — phải viết "giải thích" (có chữ h). Đây là lỗi chính tả thường gặp khi bỏ sót phụ âm cuối.'
    ),
  ],

  // ── Đọc hiểu (generic, dùng cho mọi bài đọc) ──────────────────────────
  'doc-hieu': [
    makeQ(
      'Khi gặp câu hỏi về một hình ảnh đẹp trong bài đọc, con nên làm gì?',
      'Liên hệ với chi tiết bài đọc miêu tả và suy nghĩ của chính mình về hình ảnh đó',
      ['Đọc lại nguyên đoạn mà không suy nghĩ', 'Chỉ nói tên tác giả', 'Chỉ đếm số lần một từ xuất hiện'],
      'Câu hỏi về hình ảnh đẹp cần con nối chi tiết trong bài với điều con cảm nhận hoặc liên tưởng được.'
    ),
    makeQ(
      'Em đọc một đoạn văn và gặp từ "trung du" không biết nghĩa. Em nên làm gì TRƯỚC TIÊN?',
      'Đọc lại cả câu và đoạn xung quanh từ đó để đoán nghĩa từ ngữ cảnh',
      ['Bỏ qua và đọc tiếp', 'Hỏi ngay bạn bên cạnh', 'Đặt từ điển ra tra ngay'],
      'Ngữ cảnh xung quanh thường giúp hiểu nghĩa từ mới. Ví dụ: "Vùng trung du nằm giữa núi và đồng bằng" — từ ngữ cảnh ta biết trung du là vùng đất ở giữa.'
    ),
    makeQ(
      'Bài đọc kể về bạn nhỏ giúp bà xách nước. Câu hỏi "Vì sao bạn nhỏ giúp bà?" thuộc loại câu hỏi nào?',
      'Câu hỏi về nguyên nhân — cần tìm câu trong bài nói lý do bạn nhỏ hành động như vậy',
      ['Câu hỏi đoán mò không cần đọc bài', 'Câu hỏi về nhân vật phụ', 'Câu hỏi về địa điểm'],
      'Câu hỏi "vì sao/tại sao" hỏi về nguyên nhân. Cần quay lại bài tìm câu hoặc đoạn văn giải thích lý do hành động của nhân vật.'
    ),
    makeQ(
      'Khi Gâu tiên sinh hỏi "Ý chính của bài thơ là gì?", con nên suy nghĩ thế nào?',
      'Đọc cả bài, tìm chủ đề lặp lại nhiều nhất hoặc thông điệp chính mà tác giả muốn gửi gắm',
      ['Chép nguyên câu đầu bài thơ', 'Nói điều mình thích nhất trong bài', 'Đếm số khổ thơ'],
      'Ý chính là thông điệp mà toàn bộ bài muốn truyền đạt. Thường là điều được nhắc đến nhiều lần hoặc được nêu rõ ở cuối bài.'
    ),
    makeQ(
      'Bài đọc viết: "Gió ơi, gió thổi đi đâu / Mang theo hương bưởi qua cầu tặng ai". Đây là biện pháp tu từ nào?',
      'Nhân hóa — gió được hỏi thăm như người, có hành động "mang" và "tặng"',
      ['So sánh', 'Điệp từ', 'Liệt kê'],
      'Nhân hóa gán hoạt động/cảm xúc của người cho sự vật/hiện tượng. Ở đây gió được hỏi thăm, được tặng hương — như đang nói chuyện với người.'
    ),
    makeQ(
      'Đọc xong bài, nếu Gâu tiên sinh hỏi "Câu nào là câu chủ đề của đoạn 2?", con sẽ làm gì để tìm?',
      'Đọc lại đoạn 2, tìm câu bao quát được ý của tất cả các câu còn lại trong đoạn',
      ['Chọn câu dài nhất', 'Chọn câu có nhiều tính từ nhất', 'Chọn câu cuối cùng vì câu chủ đề luôn ở cuối'],
      'Câu chủ đề là câu nêu ý khái quát nhất của đoạn — không nhất thiết ở đầu hay cuối. Hãy đọc từng câu và hỏi "câu này bao quát được toàn đoạn không?"'
    ),
    makeQ(
      'Khi đọc bài có nhiều đoạn, con nên đọc như thế nào để hiểu nhanh nhất?',
      'Đọc câu đầu mỗi đoạn để nắm ý chính, rồi đọc kỹ đoạn cần thiết',
      ['Đọc từng chữ từ đầu đến cuối mà không dừng lại', 'Chỉ đọc đoạn đầu và đoạn cuối', 'Đọc từ cuối lên đầu'],
      'Đọc lướt câu chủ đề mỗi đoạn giúp nắm cấu trúc bài nhanh, rồi đọc kỹ phần trả lời cho câu hỏi cụ thể.'
    ),
    makeQ(
      'Bài đọc tả con sông quê. Câu hỏi: "Em có cảm xúc gì khi đọc đoạn cuối bài?" — đây là kiểu câu hỏi gì?',
      'Câu hỏi cảm thụ — cần liên hệ bài đọc với cảm xúc và trải nghiệm của chính mình',
      ['Câu hỏi tìm thông tin trong bài', 'Câu hỏi về ngữ pháp', 'Câu hỏi về tác giả'],
      'Câu hỏi cảm thụ không có đáp án duy nhất đúng trong bài — cần liên hệ bài đọc với cảm xúc, kỷ niệm, hoặc suy nghĩ của bản thân.'
    ),
  ],

  // ── Nói và nghe ─────────────────────────────────────────────────────────
  'noi-nghe': [
    makeQ(
      'Khi nghe bạn trình bày, con nên làm gì?',
      'Nhìn vào bạn, lắng nghe và không nói chen',
      ['Nghĩ về chuyện khác', 'Nói chuyện với bạn bên cạnh', 'Nhìn xuống bàn'],
      'Lắng nghe tích cực: nhìn người nói, gật đầu để thể hiện sự chú ý, không làm việc riêng.'
    ),
    makeQ(
      'Khi trình bày trước lớp, con nên làm gì để nói rõ ràng hơn?',
      'Nói rõ từng từ, không nói quá nhanh, nhìn vào thính giả',
      ['Nói thật to và thật nhanh', 'Đọc nguyên văn từ giấy không nhìn lên', 'Nói nhỏ cho khiêm tốn'],
      'Nói rõ ràng, nhịp độ vừa phải, và thỉnh thoảng nhìn vào người nghe giúp thính giả theo dõi được.'
    ),
    makeQ(
      'Trước khi kể chuyện hoặc phát biểu, con cần chuẩn bị gì?',
      'Nhớ ý chính mình muốn nói và thứ tự các ý',
      ['Học thuộc lòng từng chữ', 'Chuẩn bị nhiều đồ dùng trực quan', 'Không cần chuẩn bị gì'],
      'Biết ý chính và sắp xếp ý theo thứ tự hợp lí giúp con nói mạch lạc và tự tin hơn.'
    ),
    makeQ(
      'Khi bạn trình bày xong, con muốn hỏi thêm thì nên làm thế nào?',
      'Giơ tay xin phép, đợi được mời, rồi hỏi lịch sự và rõ ràng',
      ['Hỏi ngay lập tức khi bạn vừa dừng lại', 'Nói nhỏ hỏi bạn ngồi cạnh', 'Chờ đến cuối giờ mới hỏi'],
      'Hỏi thêm sau bài trình bày là tốt, nhưng cần giơ tay, được mời mới hỏi — đây là phép lịch sự trong lớp học.'
    ),
    makeQ(
      'Khi nói chuyện, điều gì giúp người nghe hiểu mình hơn?',
      'Nói rõ ràng, mạch lạc, dùng ví dụ cụ thể',
      ['Nói thật nhiều và thật nhanh', 'Dùng nhiều từ khó để trông có vẻ giỏi', 'Chỉ dùng cử chỉ, không cần lời'],
      'Giao tiếp hiệu quả cần: ngôn từ rõ ràng, ý được sắp xếp theo thứ tự, và ví dụ cụ thể để người nghe dễ hình dung.'
    ),
    makeQ(
      'Điều nào KHÔNG nên làm khi tham gia thảo luận nhóm?',
      'Nói liên tục, không để bạn khác có cơ hội phát biểu',
      ['Lắng nghe ý kiến của bạn', 'Đồng ý hoặc không đồng ý lịch sự', 'Đặt câu hỏi để hiểu rõ hơn'],
      'Thảo luận nhóm cần sự bình đẳng — mỗi người nói và lắng nghe theo lượt. Độc chiếm lời nói sẽ làm nhóm mất đoàn kết.'
    ),
    makeQ(
      'Khi không đồng ý với ý kiến của bạn, con nên nói thế nào?',
      '"Mình nghĩ khác một chút, vì..." rồi nêu lí do',
      ['Im lặng và không nói gì', '"Bạn sai rồi!" rồi nói ý kiến của mình', '"Ý kiến đó tệ lắm, không đúng đâu."'],
      'Bất đồng ý kiến là bình thường, nhưng cần bày tỏ lịch sự: dùng "mình nghĩ...", "theo mình..." và nêu lí do cụ thể.'
    ),
    makeQ(
      'Sau khi nghe bài kể chuyện, câu hỏi "Nhân vật yêu thích của em là ai? Vì sao?" yêu cầu con làm gì?',
      'Chọn một nhân vật, nêu tên và giải thích lí do em thích nhân vật đó',
      ['Kể lại toàn bộ câu chuyện', 'Chỉ nêu tên nhân vật', 'Kể về một nhân vật khác không có trong truyện'],
      'Câu hỏi "vì sao" yêu cầu con đưa ra lí do cụ thể — không chỉ nêu tên mà cần giải thích đặc điểm, hành động nào của nhân vật làm em ấn tượng.'
    ),
  ],
};

// ─── Skill → bank key mapping ───────────────────────────────────────────────

const SKILL_TO_BANK = {
  'Danh từ': 'danh-tu',
  'Danh từ chung, danh từ riêng': 'danh-tu',
  'Luyện tập về danh từ': 'danh-tu',
  'Luyện tập về danh từ, động từ, tình từ': 'danh-tu',
  'Động từ': 'dong-tu',
  'Luyện tập về động từ': 'dong-tu',
  'Tính từ': 'tinh-tu',
  'Luyện tập về tính từ': 'tinh-tu',
  'Câu': 'cau-chu-ngu-vi-ngu',
  'Hai thành phần chính của câu': 'cau-chu-ngu-vi-ngu',
  'Luyện tập về chủ ngữ': 'cau-chu-ngu-vi-ngu',
  'Luyện tập về vị ngữ': 'cau-chu-ngu-vi-ngu',
  'Luyện tập về hai thành phần chính của câu': 'cau-chu-ngu-vi-ngu',
  'Trạng ngữ': 'trang-ngu',
  'Trạng ngữ chỉ thời gian, nơi chốn': 'trang-ngu',
  'Trạng ngữ chỉ nguyên nhân, mục đích': 'trang-ngu',
  'Trạng ngữ chỉ phương tiện': 'trang-ngu',
  'Dấu gạch ngang': 'dau-gach-ngang',
  'Luyện tập về dấu gạch ngang': 'dau-gach-ngang',
  'Dấu ngoặc kép': 'dau-ngoac-kep',
  'Dấu ngoặc đơn': 'dau-ngoac-kep',
  'Luyện tập về dấu câu': 'dau-gach-ngang',
  'Biện pháp nhân hóa': 'nhan-hoa',
  'Luyện tập về biện pháp nhân hóa': 'nhan-hoa',
};

const WRITING_SKILLS = new Set([
  'Tìm hiểu đoạn văn và câu chủ đề',
  'Câu chủ đề',
  'Đoạn văn nêu ý kiến',
  'Luyện tập viết đoạn văn nêu ý kiến',
  'Viết đoạn văn nêu ý kiến',
]);

function pickBank(skill, skillType) {
  const s = String(skill || '').trim().replace(/^Luyện từ và câu:\s*/i, '');

  // Exact match first
  if (SKILL_TO_BANK[s]) return QUESTION_BANKS[SKILL_TO_BANK[s]];

  // Fuzzy match
  if (/danh từ/i.test(s)) return QUESTION_BANKS['danh-tu'];
  if (/động từ/i.test(s)) return QUESTION_BANKS['dong-tu'];
  if (/tính từ|tình từ/i.test(s)) return QUESTION_BANKS['tinh-tu'];
  if (/câu|chủ ngữ|vị ngữ/i.test(s)) return QUESTION_BANKS['cau-chu-ngu-vi-ngu'];
  if (/trạng ngữ/i.test(s)) return QUESTION_BANKS['trang-ngu'];
  if (/gạch ngang|dấu câu/i.test(s)) return QUESTION_BANKS['dau-gach-ngang'];
  if (/ngoặc kép|ngoặc đơn/i.test(s)) return QUESTION_BANKS['dau-ngoac-kep'];
  if (/nhân hóa/i.test(s)) return QUESTION_BANKS['nhan-hoa'];
  if (/câu chủ đề|đoạn văn và câu/i.test(s)) return QUESTION_BANKS['doan-van-cau-chu-de'];
  if (/ý kiến/i.test(s) || WRITING_SKILLS.has(s)) return QUESTION_BANKS['doan-van-y-kien'];
  if (/chính tả|lựa chọn từ ngữ|từ ngữ/i.test(s)) return QUESTION_BANKS['chinh-ta'];

  // skillType fallback
  if (skillType === 'Nói và nghe') return QUESTION_BANKS['noi-nghe'];
  if (skillType === 'Đọc') return QUESTION_BANKS['doc-hieu'];
  if (skillType === 'Viết') return QUESTION_BANKS['doan-van-y-kien'];

  return null;
}



function buildLanguageSkillQuestions(topic, count = 8, seedInput = '') {
  // Mechanism: To ensure reading, writing, and speaking lessons have useful, relevant knowledge,
  // we pull grammar/vocabulary questions from the EXACT "Luyện từ và câu" (Grammar) 
  // or "Chính tả" (Spelling) topics taught in the SAME lesson or unit.
  
  let relatedGrammarBanks = [];
  
  if (topic.knttSource) {
    const viePool = KNTT_LESSON_POOL.vie || [];
    
    // 1. Try to find Grammar/Spelling topics in the SAME Lesson (e.g. "Bài 13: Con vẹt xanh")
    const sameLessonTopics = viePool.filter(t => t.source?.lesson === topic.knttSource.lesson && t.skillType === 'Luyện từ và câu');
    
    // 2. If no grammar in the same lesson, broaden to the SAME Unit (e.g. "TRẢI NGHIỆM VÀ KHÁM PHÁ")
    const searchTopics = sameLessonTopics.length > 0 ? sameLessonTopics : viePool.filter(t => t.source?.unit === topic.knttSource.unit && t.skillType === 'Luyện từ và câu');
    
    // Collect questions from those related grammar banks
    for (const t of searchTopics) {
      const rawSkill = String(t.source?.skill || '');
      const sType = rawSkill.split(':')[0].trim();
      const skillName = rawSkill.replace(/^[^:]+:\s*/, '').trim();
      const bankQuestions = pickBank(skillName, sType);
      if (bankQuestions) {
        relatedGrammarBanks.push(...bankQuestions);
      }
    }
  }
  
  // 3. Fallback if the unit has NO grammar topics at all (rare, but just in case),
  // we fall back to core vocabulary/spelling banks to ensure "hữu ích có kiến thức".
  if (relatedGrammarBanks.length === 0) {
    relatedGrammarBanks = [
      ...QUESTION_BANKS['chinh-ta'],
      ...QUESTION_BANKS['danh-tu'],
      ...QUESTION_BANKS['dong-tu'],
      ...QUESTION_BANKS['tinh-tu']
    ];
  }
  
  
  const shuffled = seededShuffle(relatedGrammarBanks, `${seedInput}|${topic.topicKey}|language-mechanism`);
  return shuffled.slice(0, Math.max(6, Math.min(count, shuffled.length)));
}

/**
 * Main export: generate Vietnamese (TV4 KNTT) questions for a given topic.
 *
 * @param {object} topic   - Catalog topic with knttSource, subject, topicKey
 * @param {number} count   - Desired number of questions
 * @param {string} seedInput - Seed for deterministic shuffle
 * @returns {Array}          - Array of MCQ question objects
 */
export function generateVietnameseQuestions(topic, count = 8, seedInput = '') {
  // 1. If we have a specific hand-crafted question bank for this exact topic (e.g. reading lessons), use it!
  if (topic.topicKey && QUESTION_BANKS[topic.topicKey]) {
    const bank = QUESTION_BANKS[topic.topicKey];
    const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}`);
    return shuffled.slice(0, Math.max(1, Math.min(count, shuffled.length)));
  }

  const source = topic.knttSource || {};
  const rawSkill = String(source.skill || '');
  // e.g. "Luyện từ và câu: Danh từ" → skillType="Luyện từ và câu", skill="Danh từ"
  // e.g. "Đọc: Thi nhạc" → skillType="Đọc", skill="Thi nhạc"
  const skillType = rawSkill.split(':')[0].trim();
  const skill = rawSkill.replace(/^[^:]+:\s*/, '').trim();

  if (skillType === 'Đọc' || skillType === 'Viết' || skillType === 'Nói và nghe') {
    return buildLanguageSkillQuestions(topic, count, seedInput);
  }

  const bank = pickBank(skill, skillType);
  if (!bank || bank.length === 0) return [];

  // Shuffle bank for variety; pick first `count` questions
  const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}|vie`);
  return shuffled.slice(0, Math.max(6, Math.min(count, shuffled.length)));
}
