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
  return {
    type: 'multiple-choice',
    question,
    options: [answer, ...others.slice(0, 3)],
    answer,
    explanation,
  };
}

// ─── Skill-specific question banks ─────────────────────────────────────────────

const QUESTION_BANKS = {

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
      'Trong câu "Cô giáo dạy chúng tôi môn Toán", có mấy danh từ?',
      '3 danh từ: cô giáo, chúng tôi, Toán',
      ['1 danh từ: cô giáo', '2 danh từ: cô giáo, Toán', '4 danh từ: cô, giáo, chúng, Toán'],
      'Cô giáo (người), chúng tôi (người/nhóm người), Toán (tên môn học) đều là danh từ.'
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
  ],

  // ── Đọc hiểu (generic, dùng cho mọi bài đọc) ──────────────────────────
  'doc-hieu': [
    makeQ(
      'Cô giáo cho đọc bài "Cánh cò trắng muốt". Sau khi đọc xong, cô hỏi: "Hình ảnh con cò trong bài gợi em nghĩ đến điều gì?" Em trả lời tốt nhất là:',
      'Liên hệ với những gì bài đọc miêu tả và suy nghĩ của chính mình về hình ảnh đó',
      ['Đọc lại nguyên đoạn bài', 'Nói tên tác giả bài thơ', 'Đếm số lần từ "con cò" xuất hiện'],
      'Câu hỏi "gợi em nghĩ đến điều gì?" là câu hỏi suy nghĩ sâu — cần nối hình ảnh trong bài với hiểu biết và cảm xúc của chính em.'
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
      'Em đang đọc bài thơ "Mẹ vắng nhà ngày bão". Cô hỏi "Ý chính của bài thơ là gì?" Em suy nghĩ thế nào?',
      'Đọc cả bài, tìm chủ đề lặp lại nhiều nhất — đó thường là ý chính mà tác giả muốn gửi gắm',
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
      'Em đọc xong bài và cô hỏi "Câu nào là câu chủ đề của đoạn 2?" Em sẽ làm gì để tìm?',
      'Đọc lại đoạn 2, tìm câu bao quát được ý của tất cả các câu còn lại trong đoạn',
      ['Chọn câu dài nhất', 'Chọn câu có nhiều tính từ nhất', 'Chọn câu cuối cùng vì câu chủ đề luôn ở cuối'],
      'Câu chủ đề là câu nêu ý khái quát nhất của đoạn — không nhất thiết ở đầu hay cuối. Hãy đọc từng câu và hỏi "câu này bao quát được toàn đoạn không?"'
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
  if (skillType === 'Đọc' || skillType === 'Nói và nghe') return QUESTION_BANKS['doc-hieu'];
  if (skillType === 'Nói và nghe') return QUESTION_BANKS['noi-nghe'];
  if (skillType === 'Viết') return QUESTION_BANKS['doan-van-y-kien'];

  return null;
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
  const source = topic.knttSource || {};
  const rawSkill = String(source.skill || '');
  // e.g. "Luyện từ và câu: Danh từ" → skillType="Luyện từ và câu", skill="Danh từ"
  // e.g. "Đọc: Thi nhạc" → skillType="Đọc", skill="Thi nhạc"
  const skillType = rawSkill.split(':')[0].trim();
  const skill = rawSkill.replace(/^[^:]+:\s*/, '').trim();

  const bank = pickBank(skill, skillType);
  if (!bank || bank.length === 0) return [];

  // Shuffle bank for variety; pick first `count` questions
  const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}|vie`);
  return shuffled.slice(0, Math.max(6, Math.min(count, shuffled.length)));
}
