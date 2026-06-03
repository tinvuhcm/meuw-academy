/**
 * MEUW ACADEMY — remaining-subjects-generator.js
 *
 * Generates questions for Âm nhạc, Đạo đức, HĐTN, Giáo dục thể chất, Mĩ thuật.
 *
 * Pedagogy framework applied (from NXBGD teacher training guide, 2023):
 *   Stage 1 — Mở đầu: Situational warm-up, connect to daily life
 *   Stage 2 — Khám phá: Discovery questions, "what do you notice?"
 *   Stage 3 — Luyện tập: Apply the concept in a clear context
 *   Stage 4 — Vận dụng: Real-world scenario, creative extension
 *
 * Design principles:
 *   - Questions feel like SITUATIONS, not definitions ("Bé An đang...", "Em đang...")
 *   - Connect to child's actual daily life (family, school, friends, nature)
 *   - Options are plausible choices, not just right/wrong traps
 *   - Language is warm, encouraging, first-person friendly
 */

function stableHash(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function createRng(seed) {
  let s = stableHash(String(seed)) || 123456789;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function seededShuffle(list, seed) {
  const arr = [...list];
  const rng = createRng(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function q(question, answer, others, explanation) {
  return { type: 'multiple-choice', question, options: [answer, ...others.slice(0, 3)], answer, explanation };
}

// ════════════════════════════════════════════════════════════════════════════
// ÂM NHẠC 4 (Music)
// KNTT units: Ký hiệu ghi nhạc, Hình nốt, Nhạc cụ, Bài hát, Thường thức âm nhạc
// ════════════════════════════════════════════════════════════════════════════

const MUSIC_BANKS = {

  'ki-hieu-ghi-nhac': [
    q('Em đang nhìn bản nhạc và thấy dòng kẻ với các nốt nhạc. Khuông nhạc thường có mấy dòng kẻ?',
      '5 dòng kẻ',
      ['3 dòng kẻ', '4 dòng kẻ', '7 dòng kẻ'],
      'Khuông nhạc gồm 5 dòng kẻ ngang song song tạo thành 4 khe. Nốt nhạc đặt trên dòng hoặc trong khe.'),
    q('Khoá Sol dùng để làm gì trong bản nhạc?',
      'Xác định vị trí nốt Sol trên dòng 2, giúp đọc tên các nốt nhạc còn lại',
      ['Chỉ tốc độ nhanh hay chậm của bài', 'Biểu thị số nhịp trong một ô nhịp', 'Chỉ số lượng nhạc cụ cùng chơi'],
      'Khoá Sol đặt ở đầu khuông nhạc, uốn quanh dòng 2. Từ đó ta biết: dòng 2 = Sol, suy ra vị trí các nốt Đô, Rê, Mi, Fa, La, Si.'),
    q('Em nghe giáo viên hát "Đô - Rê - Mi - Fa - Sol - La - Si - Đô". Đây là gì?',
      'Thang âm Đô trưởng — 7 nốt nhạc cơ bản tăng dần từ thấp đến cao',
      ['Tên 7 ngày trong tuần theo nhạc', 'Chuỗi âm thanh ngẫu nhiên không có thứ tự', 'Lời bài hát thiếu nhi'],
      'Thang âm (scale) là chuỗi 7 nốt nhạc sắp xếp theo độ cao tăng dần. "Đô Rê Mi..." quen thuộc từ bộ phim The Sound of Music.'),
    q('Nhìn vào bản nhạc, em thấy dấu lặng (dấu nghỉ). Dấu lặng có nghĩa là gì?',
      'Không chơi/hát trong khoảng thời gian đó — tạo khoảng lặng có chủ đích',
      ['Bài hát kết thúc tại đây', 'Chơi to hơn một chút', 'Lặp lại đoạn nhạc từ đầu'],
      'Dấu lặng là phần im lặng có tính toán trong âm nhạc. Im lặng cũng là một phần của âm nhạc — tạo cảm giác ngưng nghỉ, chờ đợi.'),
    q('Em muốn biết bài hát chơi nhanh hay chậm. Em tìm thông tin đó ở đâu trong bản nhạc?',
      'Ký hiệu tốc độ (tempo) ghi ở đầu bài — thường là chữ Ý như Allegro (nhanh), Andante (chậm)',
      ['Nhìn số lượng nốt nhạc để đoán', 'Đếm số dòng kẻ trên khuông', 'Nhìn khoá Sol'],
      'Tốc độ (tempo) thường ghi bằng chữ Ý hoặc số nhịp/phút (BPM). Allegro ≈ nhanh; Andante ≈ đi bộ nhàn hạ; Largo ≈ rất chậm.'),
  ],

  'noi-nhac-hat-nhac-cu': [
    q('Em đang học bài hát "Chuông gió leng keng". Nhịp điệu đều đặn của bài giúp ích gì cho người hát?',
      'Giúp người hát giữ đúng tốc độ và hát đồng đều cùng các bạn',
      ['Giúp bài hát kết thúc nhanh hơn', 'Giúp người nghe ngủ ngon', 'Không ảnh hưởng gì đến việc hát'],
      'Nhịp điệu (rhythm) là xương sống của âm nhạc. Giữ đúng nhịp giúp nhiều người có thể hát/chơi cùng nhau đồng bộ.'),
    q('Gâu tiên sinh hỏi: "Nhạc cụ nào phát ra âm thanh khi được gõ?" Em trả lời:',
      'Trống, thanh phách, xylophone (mộc cầm)',
      ['Đàn guitar, đàn violin', 'Sáo, kèn harmonica', 'Đàn piano điện tử'],
      'Nhạc cụ gõ (percussion) phát âm khi bị gõ hoặc đập: trống các loại, thanh phách, triangl, maracas, xylophone...'),
    q('Đàn tranh là nhạc cụ truyền thống Việt Nam. Người chơi đàn tranh làm như thế nào?',
      'Dùng ngón tay hoặc móng tay gảy vào các dây đàn',
      ['Thổi hơi vào ống đàn', 'Kéo cung (vĩ) qua các dây', 'Gõ búa vào các thanh phím'],
      'Đàn tranh (zither) có 16-17 dây. Người chơi gảy dây bằng ngón tay đeo móng giả. Đây là nhạc cụ tiêu biểu của văn hóa Việt Nam.'),
    q('Em nghe bài "Lí ngựa ô" và cảm thấy giai điệu vui tươi, nhộn nhịp. Điều gì tạo ra cảm giác đó?',
      'Kết hợp của tốc độ nhanh, nhịp điệu vui và giai điệu có cao độ thay đổi linh hoạt',
      ['Chỉ vì bài có nhiều lời ca', 'Vì bài hát rất dài', 'Vì bài sử dụng toàn nốt trắng (nốt dài)'],
      'Cảm xúc trong âm nhạc đến từ nhiều yếu tố: tốc độ (nhanh → vui/hồi hộp), điệu (trưởng → sáng), nhịp điệu (đều/không đều).'),
    q('Hình thức biểu diễn nào dưới đây là hát đơn ca?',
      'Một người hát độc lập, không có người hát cùng',
      ['Hai người hát đối đáp với nhau', 'Cả lớp cùng hát một bài', 'Một nhóm 4-5 người hát hòa âm'],
      'Đơn ca = solo: 1 người hát. Song ca = duo: 2 người. Tốp ca: nhóm nhỏ. Hợp xướng (choir): cả tập thể lớn.'),
    q('Em đang tập gõ phách theo nhịp bài hát. Tại sao việc này quan trọng?',
      'Giúp em cảm nhận và giữ đúng nhịp — nền tảng để hát và chơi nhạc cụ chính xác',
      ['Để gây tiếng ồn vui tai', 'Thay thế hoàn toàn việc hát', 'Chỉ dành cho người không biết hát'],
      'Cảm nhận nhịp (beat) là kỹ năng nền tảng của âm nhạc. Gõ phách giúp cơ thể "cảm" nhịp trước khi tai và miệng theo kịp.'),
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// ĐẠO ĐỨC 4 (Ethics)
// Situational ethics — "what would you do if..." approach
// ════════════════════════════════════════════════════════════════════════════

const ETHICS_BANKS = {

  'biet-on': [
    q('Bác thợ hồ đã xây ngôi trường đẹp cho em học. Cách em thể hiện lòng biết ơn tốt nhất là gì?',
      'Giữ gìn trường sạch đẹp, học tập tốt để không phụ công người xây trường',
      ['Không cần làm gì vì bác được trả tiền công rồi', 'Chỉ cần nói cảm ơn một lần', 'Vẽ lên tường trường cho đẹp thêm'],
      'Biết ơn người lao động không chỉ là lời nói — mà còn là hành động giữ gìn thành quả lao động của họ.'),
    q('Em nhìn thấy bạn viết bậy lên bàn học. Em sẽ làm gì?',
      'Nhẹ nhàng nói với bạn rằng bàn ghế do công nhân làm ra và thầy cô mua cho cả lớp, không nên viết bậy',
      ['Báo cáo ngay với giáo viên', 'Im lặng vì không phải việc của mình', 'Viết bậy thêm vào cho vui'],
      'Nhắc nhở bạn nhẹ nhàng trước là cách ứng xử tôn trọng bạn. Giữ gìn tài sản chung là trách nhiệm của tất cả mọi người.'),
  ],

  'cam-thong-giup-do': [
    q('Trên đường đi học, em thấy một bạn nhỏ bị vấp ngã và đang khóc. Em sẽ làm gì?',
      'Dừng lại, hỏi thăm bạn có sao không và giúp bạn đứng dậy hoặc gọi người lớn nếu bạn bị thương nặng',
      ['Đi nhanh qua vì đang vội đến trường', 'Chụp ảnh lại cho vui rồi mới giúp', 'Chờ người khác giúp trước rồi mình mới tham gia'],
      'Cảm thông là biết đặt mình vào vị trí của người khác. Khi thấy ai cần giúp, hành động ngay là điều đúng đắn.'),
    q('Bạn thân của em vừa bị mất đồ và đang rất buồn. Em không có đồ cho bạn mượn. Em có thể làm gì?',
      'Ngồi cạnh bạn, lắng nghe bạn kể chuyện và nói những lời động viên chân thành',
      ['Nói "Thôi bỏ đi, buồn làm gì" để bạn hết buồn nhanh', 'Kể chuyện vui để bạn quên đi', 'Không làm gì vì không giúp được về vật chất'],
      'Đôi khi không cần cho vật chất — lắng nghe và đồng cảm còn quý hơn. Sự có mặt và quan tâm chân thành giúp ích rất nhiều.'),
    q('Nhà bạn Minh bị lũ lụt, bạn phải nghỉ học 2 tuần. Khi gặp lại, em nên nói gì với Minh?',
      '"Mình rất vui vì bạn đã quay lại. Bạn có cần mình giúp ôn lại bài trong thời gian vắng không?"',
      ['"Sao mà nghỉ lâu thế, lười quá vậy?"', '"Nhà bạn bị lũ à? Nghe hay đấy!"', '"Thôi, học đi không thì thi rớt"'],
      'Cảm thông là biết nhận ra hoàn cảnh khó khăn của người khác và phản ứng với sự tử tế, không phán xét.'),
  ],

  'yeu-lao-dong': [
    q('Mẹ đang bận nấu cơm và trông em bé. Em có thể làm gì để giúp mẹ?',
      'Tự dọn bàn học của mình, rửa bát đũa hoặc ru em ngủ nếu có thể',
      ['Ngồi xem phim vì mẹ đã lo hết rồi', 'Đòi mẹ mua đồ ăn ngoài cho nhẹ gánh', 'Chơi game và không làm phiền mẹ là tốt nhất'],
      'Yêu lao động bắt đầu từ những việc nhỏ trong gia đình. Phụ giúp mẹ không chỉ giảm gánh nặng mà còn giúp em trưởng thành hơn.'),
    q('Gâu tiên sinh hỏi "Tại sao em cần học cách làm việc nhà?" Em trả lời tốt nhất là:',
      '"Vì trong gia đình mỗi người đều có trách nhiệm, và biết làm việc nhà giúp em tự lập sau này"',
      ['"Vì cô yêu cầu em phải học"', '"Để mẹ không phải la em nữa"', '"Em không thích nhưng phải học thôi"'],
      'Lao động không chỉ là nghĩa vụ — đó là cách xây dựng sự tự tin, cảm giác có ích và kỹ năng sống quan trọng.'),
  ],

  'ton-trong-tai-san': [
    q('Em mượn quyển sách của bạn về đọc. Sáng hôm sau em phát hiện sách bị mèo nhà cắn rách một góc. Em làm gì?',
      'Nói thật với bạn, xin lỗi và hỏi bạn muốn mình bồi thường như thế nào (mua sách mới hoặc sửa lại)',
      ['Giấu đi và nói sách vẫn còn nguyên', 'Mua băng dán lại và không nói gì', 'Trả sách và đổ lỗi cho mèo nhà bạn'],
      'Tôn trọng tài sản của người khác có nghĩa là nhận trách nhiệm khi có sự cố. Nói thật và đề xuất giải pháp là cách xử lý trưởng thành.'),
    q('Em đang đợi xe buýt và thấy có người vừa đánh rơi ví tiền. Em làm gì?',
      'Nhặt ví lên, gọi to hoặc chạy theo để trả lại cho người đó',
      ['Nhặt ví vào túi vì người kia đã đi rồi', 'Bỏ mặc vì không phải việc của mình', 'Đứng nhìn xem có người khác nhặt không'],
      'Tôn trọng tài sản người khác không chỉ là không lấy — còn là chủ động trả lại khi thấy người khác bị mất.'),
    q('Trên bàn học ở trường, em thấy có ai đó để quên đồ dùng học tập. Em nên làm gì?',
      'Giữ lại cẩn thận và nộp cho giáo viên hoặc thông báo để tìm lại chủ sở hữu',
      ['Dùng tạm vì chủ nhân đã quên mất rồi', 'Bỏ vào thùng rác vì không biết của ai', 'Đem về nhà cho em em dùng'],
      'Đồ vật có chủ nhân. Việc giữ lại và nộp cho giáo viên là cách đúng để vật được trả về tay chủ nhân của nó.'),
  ],

  'bao-ve-cua-cong': [
    q('Em và các bạn chơi xong ở sân chơi trường. Trước khi về, em cần làm gì?',
      'Nhặt rác, xếp lại đồ chơi và đảm bảo sân chơi sạch sẽ như lúc đến',
      ['Về nhanh vì đã mệt rồi', 'Chờ bác lao công dọn vì đó là việc của bác', 'Chỉ cần nhặt rác của riêng mình'],
      'Của công là tài sản chung, ai cũng có trách nhiệm giữ gìn — không chỉ tránh làm hỏng mà còn chủ động bảo vệ.'),
    q('Em thấy vòi nước ở nhà vệ sinh trường chảy liên tục dù không ai dùng. Em làm gì?',
      'Vặn kín vòi nước và báo với giáo viên để sửa chữa kịp thời',
      ['Bỏ qua vì không phải vòi nhà mình', 'Chụp ảnh đăng lên mạng xã hội', 'Chờ người khác xử lý'],
      'Nước là tài nguyên công cộng quý giá. Tiết kiệm và bảo vệ của công là trách nhiệm của mọi công dân từ nhỏ.'),
  ],

  'quan-he-ban-be': [
    q('Em vừa đến trường mới và chưa quen ai. Em nên làm gì để kết bạn?',
      'Chủ động chào hỏi, tự giới thiệu tên và hỏi thăm các bạn gần mình',
      ['Ngồi một mình và chờ bạn đến bắt chuyện trước', 'Tỏ ra mình giỏi nhất để bạn ngưỡng mộ', 'Mang quà ngon đến để mời bạn'],
      'Tình bạn bắt đầu từ sự chủ động, chân thành. Một nụ cười và lời chào đơn giản thường đủ để mở ra một tình bạn tốt.'),
    q('Em và bạn thân đang mâu thuẫn vì hiểu lầm nhau. Em cảm thấy tức giận. Em nên làm gì?',
      'Dành thời gian bình tĩnh, rồi nói chuyện thẳng thắn với bạn để hiểu rõ hơn về nhau',
      ['Nói xấu bạn với những người khác', 'Không bao giờ nói chuyện với bạn nữa', 'Tức ngay và đánh nhau để giải quyết'],
      'Hiểu lầm là điều bình thường trong tình bạn. Quan trọng là biết bình tĩnh và dũng cảm nói chuyện để giải quyết.'),
    q('Bạn em rủ em nói dối thầy cô về một chuyện nhỏ. Em từ chối thì bạn giận. Em cảm thấy khó xử. Em nên làm gì?',
      'Giải thích với bạn rằng em không thể nói dối vì đó là điều sai, dù bạn có giận',
      ['Đồng ý nói dối để giữ tình bạn', 'Nói dối thầy cô lần này rồi hứa lần sau không làm nữa', 'Bỏ bạn ngay lập tức không giải thích'],
      'Tình bạn thật sự không đòi hỏi phải làm điều sai. Bạn tốt sẽ hiểu và tôn trọng khi em giải thích rõ ràng, chân thành.'),
  ],

  'quyen-tre-em': [
    q('Em và các bạn trong lớp đang thảo luận. Bạn A nói to át hết. Em muốn chia sẻ ý kiến. Em có quyền gì?',
      'Quyền được bày tỏ ý kiến và lắng nghe — em có thể đề nghị được phát biểu',
      ['Không có quyền vì bạn A đang nói', 'Chỉ được nói nếu người lớn gọi tên', 'Im lặng vì ý kiến của mình ít quan trọng hơn'],
      'Mọi trẻ em đều có quyền bày tỏ ý kiến theo Công ước Quốc tế về Quyền Trẻ em. Em có thể giơ tay xin phát biểu.'),
    q('Trẻ em có bổn phận (nghĩa vụ) gì đối với gia đình?',
      'Vâng lời cha mẹ, giúp đỡ việc nhà và học tập tốt',
      ['Chỉ có quyền, không có nghĩa vụ gì', 'Chỉ cần học giỏi, không cần làm việc nhà', 'Làm bất cứ điều gì mình thích'],
      'Quyền và nghĩa vụ luôn đi đôi. Trẻ em có quyền được yêu thương, học tập — nhưng cũng có nghĩa vụ với gia đình và xã hội.'),
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// HOẠT ĐỘNG TRẢI NGHIỆM 4 (Experiential Activities)
// ════════════════════════════════════════════════════════════════════════════

const LIFE_BANKS = {

  'ban-than-va-gia-dinh': [
    q('Em muốn hiểu mình hơn. Bước đầu tiên để tự hiểu bản thân là gì?',
      'Quan sát những gì mình thích, giỏi và những điều mình muốn cải thiện',
      ['Hỏi người khác mình là ai', 'Xem thật nhiều phim hoạt hình', 'So sánh mình với bạn bè'],
      'Tự hiểu bản thân (self-awareness) bắt đầu từ việc chú ý đến cảm xúc, sở thích và điểm mạnh của chính mình.'),
    q('Em và anh/chị hay tranh giành đồ chơi. Cách giải quyết nào tốt nhất?',
      'Ngồi lại nói chuyện, chia sẻ đồ chơi theo lượt hoặc cùng nhau chơi',
      ['Khóc to để người lớn giải quyết hộ', 'Giấu đồ chơi đi để anh/chị không dùng được', 'Tặng luôn đồ chơi để tránh mâu thuẫn'],
      'Mâu thuẫn trong gia đình bình thường và có thể giải quyết. Nói chuyện thẳng thắn giúp hai bên hiểu nhau hơn và tìm ra cách chơi vui cùng nhau.'),
    q('Mỗi người trong gia đình đều có cảm xúc khác nhau. Khi thấy bố mệt sau ngày làm việc, em nên làm gì?',
      'Không quấy rầy bố, hỏi thăm nhẹ nhàng và tự làm bài tập trước khi cần bố giúp',
      ['Xin bố mua ngay thứ mình muốn khi bố vừa về', 'Bật tivi to để bố vui', 'Bắt bố kể chuyện ngay dù bố mệt'],
      'Nhận biết cảm xúc của người thân và phản ứng phù hợp là kỹ năng quan trọng giúp gia đình hạnh phúc hơn.'),
  ],

  'truong-hoc-va-ban-be': [
    q('Em vừa gia nhập một câu lạc bộ mới ở trường. Tuần đầu em chưa quen ai. Em sẽ làm gì?',
      'Quan sát hoạt động của nhóm, hỏi thăm một người gần nhất và đề nghị giúp đỡ việc gì đó cụ thể',
      ['Không tham gia hoạt động gì cho đến khi được mời', 'Ngay lập tức chỉ huy mọi người', 'Bỏ câu lạc bộ vì không hợp'],
      'Hòa nhập cần thời gian. Quan sát trước, rồi tham gia dần dần là cách thông minh để tạo dựng vị trí trong nhóm mới.'),
    q('Em và nhóm bạn đang làm dự án chung. Một bạn không làm phần của mình. Em nên xử lý thế nào?',
      'Hỏi thăm bạn xem có vấn đề gì không, rồi cùng tìm cách phân chia lại công việc hợp lý',
      ['Tự làm hết phần của bạn mà không nói gì', 'Mách giáo viên ngay lập tức', 'Loại bạn ra khỏi nhóm'],
      'Làm việc nhóm cần sự đồng thuận và linh hoạt. Hỏi thăm trước giúp biết nguyên nhân và tìm giải pháp tốt hơn.'),
  ],

  'cong-dong-xa-hoi': [
    q('Xóm của em có một buổi dọn dẹp vệ sinh chung. Em chưa đủ lớn để làm việc nặng. Em có thể đóng góp gì?',
      'Nhặt rác nhỏ, mang nước cho người lớn, cổ vũ và tham gia cùng tinh thần tập thể',
      ['Không làm gì vì mình còn nhỏ', 'Đứng xem mà không tham gia', 'Chỉ dọn phần sân nhà mình'],
      'Tham gia cộng đồng không cần phải làm việc lớn. Mỗi đóng góp nhỏ đều có giá trị khi làm với tinh thần tập thể.'),
    q('Em muốn bảo vệ môi trường. Hành động nào em có thể làm ngay hôm nay?',
      'Phân loại rác, tắt điện khi không dùng, nhắc nhở bạn bè không xả rác bừa bãi',
      ['Chờ đến lớn rồi sẽ làm việc lớn hơn', 'Chỉ cần chia sẻ bài về môi trường trên mạng', 'Bảo vệ môi trường là việc của người lớn'],
      'Bảo vệ môi trường bắt đầu từ những hành động nhỏ mỗi ngày. Mỗi người, kể cả trẻ em, đều có thể tạo ra sự thay đổi.'),
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// GIÁO DỤC THỂ CHẤT 4 (Physical Education)
// ════════════════════════════════════════════════════════════════════════════

const PE_BANKS = {
  'van-dong': [
    q('Trước khi chơi thể thao hoặc vận động mạnh, em cần làm gì?',
      'Khởi động (warm-up) ít nhất 5-10 phút để cơ thể quen với vận động và tránh chấn thương',
      ['Uống thật nhiều nước trước khi vận động', 'Chạy thật nhanh ngay từ đầu', 'Không cần chuẩn bị gì'],
      'Khởi động làm nóng cơ bắp, tăng tuần hoàn máu và chuẩn bị khớp xương. Bỏ qua khởi động dễ gây bong gân, chuột rút.'),
    q('Em chơi bóng đá được 30 phút và cảm thấy rất khát. Em nên làm gì?',
      'Nghỉ ngắn, uống nước từng ngụm nhỏ, không uống quá nhiều một lúc',
      ['Uống nước có gas để lấy lại sức nhanh', 'Tiếp tục chơi không uống vì đang hứng', 'Uống nguyên 1 chai nước to một lúc'],
      'Uống nước từng ngụm nhỏ trong khi vận động là đúng. Uống nhiều một lúc khi đang vận động có thể gây khó chịu dạ dày.'),
    q('Em học chạy cự ly ngắn (sprint). Kỹ thuật xuất phát tốt cần điều kiện gì?',
      'Người chúi về trước, hai chân đặt đúng vị trí, tập trung chờ hiệu lệnh',
      ['Đứng thẳng và chờ thật lâu', 'Nhảy lên cao trước khi chạy', 'Nhìn vào đích đến từ trước khi chạy'],
      'Xuất phát tốt trong chạy ngắn: ngồi thấp, chúi người về trước, đẩy mạnh 2 chân khi nghe hiệu lệnh để có gia tốc ban đầu.'),
    q('Sau khi vận động mạnh, em cảm thấy thở gấp và tim đập nhanh. Điều này có nghĩa là gì?',
      'Bình thường — tim và phổi đang hoạt động mạnh để cung cấp đủ oxy cho cơ bắp',
      ['Em đang bị bệnh tim và cần đi gặp bác sĩ ngay', 'Em đang không vận động đúng cách', 'Em cần dừng lại và nằm nghỉ ngay'],
      'Tim đập nhanh và thở mạnh sau vận động là phản ứng bình thường. Sau vài phút nghỉ ngơi, nhịp tim và hơi thở sẽ trở về bình thường.'),
    q('Em đang chơi cầu lông với bạn và cảm thấy đau ở bắp chân (chuột rút). Em nên làm gì?',
      'Dừng lại, ngồi xuống, duỗi thẳng chân và nhẹ nhàng massage vùng bị chuột rút',
      ['Tiếp tục chơi vì chuột rút sẽ tự hết', 'Đấm mạnh vào bắp chân cho hết đau', 'Uống ngay một cốc nước muối đặc'],
      'Chuột rút do cơ co rút đột ngột. Dừng vận động, duỗi cơ và massage nhẹ giúp cơ giãn ra và giảm đau.'),
    q('Học giáo dục thể chất giúp ích gì cho em ngoài việc tập thể dục?',
      'Rèn tinh thần đồng đội, tính kỷ luật, công bằng trong thể thao và khả năng chịu đựng khó khăn',
      ['Chỉ giúp cơ thể khỏe mạnh, không có lợi ích gì khác', 'Giúp em thắng tất cả các trò chơi', 'Không có lợi ích gì nếu em không thích thể thao'],
      'Thể thao dạy ta nhiều kỹ năng sống: chấp nhận thất bại, tôn trọng đối thủ, hợp tác trong đội và kiên trì luyện tập.'),
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// MĨ THUẬT 4 (Visual Arts)
// Observation-first, creative exploration approach
// ════════════════════════════════════════════════════════════════════════════

const ART_BANKS = {
  'my-thuat': [
    q('Em nhìn vào một bức tranh phong cảnh và thấy bầu trời, núi và sông. Phần nào trông "gần" nhất với mắt em?',
      'Phần ở phía dưới của tranh — vì trong tranh, vật ở thấp hơn thường trông gần hơn',
      ['Phần ở trên cùng vì cao hơn', 'Phần nào có màu sắc sáng nhất', 'Phần nào được vẽ to nhất'],
      'Trong mĩ thuật, vật ở THẤP hơn trong khung tranh thường trông GẦN hơn — đây là cách thể hiện xa gần (phối cảnh) cơ bản.'),
    q('Gâu tiên sinh gợi em pha màu đỏ và màu vàng. Kết quả sẽ là màu gì?',
      'Màu cam',
      ['Màu xanh lá', 'Màu tím', 'Màu nâu'],
      'Đỏ + vàng = Cam. Đây là màu nhị cấp (secondary color). Đỏ + Xanh lam = Tím. Xanh lam + vàng = Xanh lá.'),
    q('Em quan sát một quả cam và muốn vẽ cho giống thật. Điều quan trọng nhất để vẽ tròn tự nhiên là gì?',
      'Quan sát kỹ vùng sáng, bóng và nơi ánh sáng chiếu vào quả cam để tạo cảm giác khối 3D',
      ['Vẽ đường tròn thật tròn bằng compa', 'Tô màu cam thật đều và sáng', 'Viết chữ "quả cam" ở bên cạnh để người xem hiểu'],
      'Bóng và ánh sáng (shading) là chìa khóa để vẽ vật thể trông có khối, không phẳng lép. Ánh sáng làm sáng một bên, bóng tối bên kia tạo cảm giác tròn.'),
    q('Em muốn bức tranh của mình trông sinh động và thu hút. Cách nào KHÔNG nên làm?',
      'Dùng tất cả màu sắc có thể, mỗi màu một ít để tranh nhiều màu',
      ['Chọn một màu chủ đạo và dùng các màu bổ sung hài hòa', 'Để một vùng trắng hoặc ít chi tiết để mắt được nghỉ', 'Nhấn mạnh một điểm trung tâm để thu hút ánh nhìn'],
      'Dùng quá nhiều màu ngẫu nhiên làm tranh "loạn mắt". Bức tranh đẹp cần có sự hài hòa: một màu chủ đạo, điểm nhấn rõ ràng và khoảng trống hợp lý.'),
    q('Em đang học về nghệ thuật dân gian Việt Nam. Tranh Đông Hồ nổi tiếng với điều gì?',
      'Tranh in mộc bản (khắc gỗ) với màu sắc tươi sáng và chủ đề dân dã, gần gũi đời sống nông dân',
      ['Tranh vẽ bằng máy tính hiện đại', 'Tranh sơn dầu theo phong cách châu Âu', 'Tranh mực đen trắng theo phong cách Nhật Bản'],
      'Tranh Đông Hồ (Bắc Ninh) là di sản văn hóa dân gian. Nghệ nhân khắc mộc bản gỗ, rồi in từng màu lên giấy dó phủ điệp — tạo nên vẻ óng ánh đặc trưng.'),
    q('Khi làm thủ công (origami, gấp giấy), điều quan trọng nhất để sản phẩm đẹp là gì?',
      'Gấp cẩn thận theo từng bước, đường gấp thẳng và phẳng',
      ['Dùng giấy thật đắt tiền', 'Gấp thật nhanh để xong sớm', 'Dùng kéo cắt bớt các phần thừa sau khi gấp'],
      'Origami cần sự kiên nhẫn và chính xác. Một đường gấp lệch ở bước đầu sẽ ảnh hưởng đến toàn bộ sản phẩm.'),
  ],
};

// ─── Dispatch functions ──────────────────────────────────────────────────────

export function generateMusicQuestions(topic, count = 8, seedInput = '') {
  const t = String(topic.knttSource?.lesson || topic.title || '').toLowerCase();
  const bank =
    /kí hiệu|hình nốt|khuông|nốt nhạc|thang âm/.test(t)
      ? MUSIC_BANKS['ki-hieu-ghi-nhac']
      : MUSIC_BANKS['noi-nhac-hat-nhac-cu'];
  const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}|music`);
  return shuffled.slice(0, Math.max(4, Math.min(count, shuffled.length)));
}

export function generateEthicsQuestions(topic, count = 8, seedInput = '') {
  const t = String(topic.knttSource?.lesson || topic.title || '').toLowerCase();
  let bank;
  if (/biết ơn|lao động.*biết/.test(t)) bank = ETHICS_BANKS['biet-on'];
  else if (/cảm thông|giúp đỡ|khó khăn/.test(t)) bank = ETHICS_BANKS['cam-thong-giup-do'];
  else if (/yêu lao động/.test(t)) bank = ETHICS_BANKS['yeu-lao-dong'];
  else if (/tài sản|tôn trọng.*tài/.test(t)) bank = ETHICS_BANKS['ton-trong-tai-san'];
  else if (/của công|bảo vệ.*công/.test(t)) bank = ETHICS_BANKS['bao-ve-cua-cong'];
  else if (/bạn bè|quan hệ|thiết lập|duy trì/.test(t)) bank = ETHICS_BANKS['quan-he-ban-be'];
  else if (/quyền|bổn phận|trẻ em/.test(t)) bank = ETHICS_BANKS['quyen-tre-em'];
  else {
    // Combine all banks for generic ethics
    bank = [
      ...ETHICS_BANKS['cam-thong-giup-do'].slice(0, 2),
      ...ETHICS_BANKS['bao-ve-cua-cong'].slice(0, 2),
      ...ETHICS_BANKS['quan-he-ban-be'].slice(0, 2),
    ];
  }
  const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}|ethics`);
  return shuffled.slice(0, Math.max(4, Math.min(count, shuffled.length)));
}

export function generateLifeQuestions(topic, count = 8, seedInput = '') {
  const t = String(topic.knttSource?.lesson || topic.title || '').toLowerCase();
  let bank;
  if (/gia đình|bản thân|bố mẹ/.test(t)) bank = LIFE_BANKS['ban-than-va-gia-dinh'];
  else if (/trường|bạn bè|nhóm|câu lạc bộ/.test(t)) bank = LIFE_BANKS['truong-hoc-va-ban-be'];
  else bank = [
    ...LIFE_BANKS['ban-than-va-gia-dinh'].slice(0, 2),
    ...LIFE_BANKS['truong-hoc-va-ban-be'].slice(0, 2),
    ...LIFE_BANKS['cong-dong-xa-hoi'],
  ];
  const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}|life`);
  return shuffled.slice(0, Math.max(4, Math.min(count, shuffled.length)));
}

export function generatePeQuestions(topic, count = 8, seedInput = '') {
  const shuffled = seededShuffle(PE_BANKS['van-dong'], `${seedInput}|${topic.topicKey}|pe`);
  return shuffled.slice(0, Math.max(4, Math.min(count, shuffled.length)));
}

export function generateArtQuestions(topic, count = 8, seedInput = '') {
  const shuffled = seededShuffle(ART_BANKS['my-thuat'], `${seedInput}|${topic.topicKey}|art`);
  return shuffled.slice(0, Math.max(4, Math.min(count, shuffled.length)));
}
