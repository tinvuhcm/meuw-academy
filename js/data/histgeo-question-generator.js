/**
 * MEUW ACADEMY — histgeo-question-generator.js
 *
 * Generates real Lịch sử và Địa lí 4 (KNTT) questions from SGK content.
 *
 * Curriculum structure — 5 vùng + địa phương + mở đầu:
 *   Mở đầu: Làm quen phương tiện học tập (Bài 1)
 *   Địa phương em (Bài 2-3)
 *   Trung du & miền núi Bắc Bộ (Bài 4-7, gồm Đền Hùng)
 *   Đồng bằng Bắc Bộ (Bài 8-13, gồm sông Hồng, Thăng Long, Văn Miếu)
 *   Duyên hải miền Trung (Bài 15-19, gồm Cố đô Huế, Phố cổ Hội An)
 *   Tây Nguyên (Bài 20-23, gồm cồng chiêng)
 *   Nam Bộ (Bài 24-28, gồm TP.HCM, Địa đạo Củ Chi)
 *
 * Questions are factual, geography + history, child-appropriate.
 * Source: Lịch sử và Địa lí 4 KNTT (NXBGD).
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
  const uniqueOthers = others.filter((opt, i, arr) => opt !== answer && arr.indexOf(opt) === i);
  return { type: 'multiple-choice', question, options: [answer, ...uniqueOthers].slice(0, 4), answer, explanation };
}

const BANKS = {

  // ── Bài 1: Làm quen với phương tiện học tập ───────────────────────────
  'mo-dau': [
    q('Môn Lịch sử và Địa lí giúp học sinh biết điều gì?',
      'Biết về lịch sử, địa lý, văn hóa của quê hương và đất nước Việt Nam',
      ['Chỉ học cách tính toán số học', 'Học tiếng Anh qua bản đồ', 'Học cách vẽ tranh phong cảnh'],
      'Môn Lịch sử và Địa lí giúp con hiểu về đất nước Việt Nam: địa hình, khí hậu, dân cư, lịch sử và văn hóa của từng vùng.'),
    q('Bản đồ dùng để làm gì trong môn Lịch sử và Địa lí?',
      'Thể hiện vị trí địa lý của các nơi, vùng, sông núi trên mặt phẳng thu nhỏ',
      ['Chỉ dùng để trang trí lớp học', 'Ghi lại các sự kiện lịch sử', 'Đo nhiệt độ thời tiết'],
      'Bản đồ là công cụ quan trọng để biết vị trí các tỉnh thành, sông núi, vùng đất — giúp học địa lý dễ hơn.'),
    q('Lịch sử dạy về điều gì?',
      'Những sự kiện, con người và giai đoạn quan trọng đã xảy ra trong quá khứ',
      ['Cách dự báo thời tiết tương lai', 'Địa hình và khí hậu hiện tại', 'Ngôn ngữ các dân tộc thiểu số'],
      'Lịch sử là môn học về quá khứ — từ các sự kiện lớn (chiến tranh, thống nhất đất nước) đến văn hóa truyền thống.'),
    q('Việc biết đọc bản đồ giúp em điều gì trong cuộc sống?',
      'Tìm đường đi, xác định phương hướng và biết vị trí các địa điểm',
      ['Giúp em bơi lội giỏi hơn', 'Giúp tính toán nhanh hơn', 'Chỉ để trang trí cho đẹp'],
      'Đọc bản đồ là kỹ năng thực tế giúp em không bị lạc đường và hiểu rõ về không gian xung quanh.'),
    q('Quốc gia của chúng ta tên là gì?',
      'Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
      ['Vương quốc Anh', 'Hợp chủng quốc Hoa Kỳ', 'Nước Cộng hòa Pháp'],
      'Tên đầy đủ của nước ta là Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam, hình chữ S nằm ở Đông Nam Á.'),
    q('Em có thể học Lịch sử và Địa lí bằng những cách nào?',
      'Đọc sách, xem bản đồ, đi thực tế bảo tàng hoặc nghe người lớn kể chuyện',
      ['Chỉ bằng cách chép phạt', 'Chỉ bằng cách ngủ thật nhiều', 'Không cần học mà tự biết'],
      'Ngoài sách giáo khoa, việc đi tham quan di tích, bảo tàng hay xem phim tài liệu cũng giúp học tốt môn này.'),
    q('Quốc kỳ của Việt Nam có hình gì?',
      'Cờ đỏ sao vàng năm cánh',
      ['Cờ trắng sao xanh', 'Cờ sọc đỏ trắng', 'Cờ xanh sao trắng'],
      'Cờ đỏ sao vàng là quốc kỳ của Việt Nam, thể hiện sự đoàn kết của toàn dân tộc.'),
  ],

  'dia-phuong-em': [
    q('Khi học về địa phương em, điều nào quan trọng nhất?', 
      'Biết nơi mình sống có đặc điểm thiên nhiên và hoạt động của con người như thế nào',
      ['Chỉ cần nhớ tên một thành phố lớn khác', 'Chỉ học về các nước trên thế giới', 'Không cần liên hệ nơi mình sống'],
      'Bài về địa phương giúp em hiểu chính nơi mình đang sống: cảnh quan, con người, nghề nghiệp và hoạt động quen thuộc.'),
    q('Ví dụ nào gần nhất với việc tìm hiểu địa phương em?',
      'Quan sát sông, đường phố, trường học hoặc chợ quanh nơi mình sống',
      ['Chỉ đọc tên một vùng xa trên bản đồ', 'Chỉ học thuộc lòng năm sinh của vua', 'Chỉ nhìn ảnh nước ngoài'],
      'Muốn hiểu địa phương, em nên bắt đầu từ những nơi, cảnh vật và hoạt động thật gần gũi quanh mình.'),
    q('Khi nói về con người ở địa phương em, em có thể nhắc đến điều gì?',
      'Nghề nghiệp, sinh hoạt và cách mọi người xây dựng cuộc sống ở đó',
      ['Chỉ màu áo của một người bất kì', 'Chỉ tên món ăn ở nơi khác', 'Chỉ chiều cao của núi xa'],
      'Con người ở địa phương hiện lên qua công việc, nếp sống, văn hóa và cách họ gắn với thiên nhiên.'),
    q('Nếu địa phương em có sông hoặc kênh rạch, việc nào là đúng hơn?',
      'Giữ sạch môi trường nước và không xả rác bừa bãi',
      ['Đổ rác xuống cho nước cuốn đi', 'Vẽ bậy lên công trình công cộng', 'Bẻ cây ven đường cho vui'],
      'Tìm hiểu địa phương cũng đi cùng với ý thức giữ gìn môi trường sống xung quanh.'),
    q('Khi Gâu tiên sinh hỏi "Địa phương em có gì đáng quý?", em nên nghĩ theo hướng nào?',
      'Cảnh đẹp, con người, nghề nghiệp hoặc nét văn hóa gần gũi',
      ['Chỉ cần kể một món đồ chơi em thích', 'Chỉ nói về một nước khác', 'Chỉ chép lại câu hỏi'],
      'Bài học này giúp em biết trân trọng những điều tốt đẹp ngay quanh nơi mình sống.'),
    q('Bài về địa phương em muốn con hiểu điều gì?',
      'Yêu nơi mình sống hơn khi hiểu thiên nhiên và con người ở đó',
      ['Địa phương nào cũng giống nhau hoàn toàn', 'Chỉ nơi nổi tiếng mới đáng học', 'Không cần quan sát thực tế'],
      'Hiểu địa phương là bước đầu để yêu quý, giữ gìn và tự hào về nơi em đang sống.'),
    q('Để bảo vệ môi trường địa phương, em có thể làm gì?',
      'Trồng thêm cây xanh và bỏ rác đúng nơi quy định',
      ['Bẻ cành cây trên đường', 'Xả rác ra bờ sông', 'Sơn bậy lên tường nhà'],
      'Hành động nhỏ như nhặt rác, trồng cây giúp địa phương của em luôn xanh, sạch, đẹp.'),
  ],

  // ── Bài 4-6: Trung du và miền núi Bắc Bộ ─────────────────────────────
  'trung-du-mien-nui-bac-bo': [
    q('Vùng Trung du và miền núi Bắc Bộ có đặc điểm địa hình như thế nào?',
      'Địa hình đồi núi, có nhiều dãy núi cao, thung lũng và rừng nguyên sinh',
      ['Đồng bằng rộng lớn, nhiều sông', 'Bờ biển dài, nhiều bãi cát', 'Đất đỏ bazan bằng phẳng'],
      'Đây là vùng có địa hình cao nhất Việt Nam, với nhiều đỉnh núi như Fansipan (cao nhất VN), Hoàng Liên Sơn.'),
    q('Dân tộc thiểu số nào sinh sống chủ yếu ở vùng Trung du và miền núi Bắc Bộ?',
      'Tày, Nùng, Hmông, Dao và nhiều dân tộc khác',
      ['Chăm, Ê Đê, Mnông', 'Khmer, Hoa, Chăm', 'Kinh, Hoa, Chăm'],
      'Vùng núi phía Bắc có đông đảo các dân tộc thiểu số như Tày, Nùng, Hmông, Thái, Dao với văn hóa phong phú đa dạng.'),
    q('Hoạt động kinh tế nổi bật ở vùng Trung du Bắc Bộ là gì?',
      'Trồng chè, trồng rừng và khai thác khoáng sản',
      ['Đánh bắt thủy hải sản', 'Trồng lúa nước đồng bằng', 'Du lịch biển'],
      'Vùng trung du nổi tiếng với chè Thái Nguyên, chè Lào Cai. Vùng này cũng giàu tài nguyên khoáng sản (than, đồng...).'),
    q('Nét văn hóa đặc sắc nào gắn với vùng Trung du và miền núi Bắc Bộ?',
      'Chợ phiên vùng cao, trang phục thổ cẩm nhiều màu sắc của các dân tộc',
      ['Lễ hội cồng chiêng', 'Múa bóng chày', 'Hội đua thuyền trên sông'],
      'Chợ phiên Bắc Hà, Sa Pa... là nét văn hóa độc đáo nơi các dân tộc mặc trang phục truyền thống đến mua bán, giao lưu.'),
    q('Ruộng bậc thang thường thấy ở đâu?',
      'Trên sườn đồi núi dốc ở vùng núi phía Bắc',
      ['Đồng bằng bằng phẳng', 'Dọc bãi biển', 'Trong thành phố lớn'],
      'Đồng bào dân tộc làm ruộng bậc thang ở sườn núi để giữ nước và trồng lúa nước.'),
    q('Nhà sàn của đồng bào miền núi có tác dụng gì?',
      'Tránh thú dữ, chống ẩm thấp và phù hợp với địa hình dốc',
      ['Để bay lên trời', 'Chỉ để trang trí cho đẹp', 'Để làm kho chứa sắt thép'],
      'Nhà sàn là kiến trúc truyền thống thông minh, sàn cao giúp tránh động vật nguy hiểm và giữ không khí thoáng mát.'),
    q('Loại cây ăn quả nào nổi tiếng ở vùng miền núi phía Bắc?',
      'Mận, đào, lê, táo mèo',
      ['Sầu riêng, chôm chôm', 'Dừa nước, thanh long', 'Măng cụt, bòn bon'],
      'Khí hậu lạnh của vùng núi cao Bắc Bộ rất thích hợp trồng các cây ăn quả ôn đới và cận nhiệt.'),
  ],

  // ── Bài 7: Đền Hùng và lễ giỗ Tổ Hùng Vương ──────────────────────────
  'den-hung': [
    q('Đền Hùng ở tỉnh nào của Việt Nam?',
      'Phú Thọ',
      ['Hà Nội', 'Ninh Bình', 'Hải Phòng'],
      'Đền Hùng nằm trên núi Nghĩa Lĩnh, huyện Phong Châu, tỉnh Phú Thọ — là nơi thờ các Vua Hùng dựng nước.'),
    q('Lễ giỗ Tổ Hùng Vương được tổ chức vào ngày nào âm lịch?',
      'Ngày 10 tháng 3 âm lịch',
      ['Ngày 2 tháng 9 dương lịch', 'Ngày 30 tháng 4 dương lịch', 'Ngày 15 tháng 8 âm lịch'],
      '"Dù ai đi ngược về xuôi / Nhớ ngày giỗ Tổ mùng mười tháng ba." Đây là ngày Quốc giỗ, được nghỉ lễ toàn quốc.'),
    q('Các Vua Hùng có công lao gì với dân tộc Việt Nam?',
      'Dựng nước Văn Lang — nhà nước đầu tiên trong lịch sử Việt Nam',
      ['Đánh thắng quân Mông Cổ', 'Thống nhất Nam Bắc', 'Xây dựng kinh đô Thăng Long'],
      'Các Vua Hùng lập ra nhà nước Văn Lang (khoảng 2879 TCN), đặt nền tảng cho dân tộc và nhà nước Việt Nam.'),
    q('Tại sao người Việt Nam gọi Vua Hùng là "Tổ"?',
      'Vì các Vua Hùng là người dựng nên nhà nước đầu tiên và được coi là tổ tiên chung của dân tộc Việt',
      ['Vì Vua Hùng sống lâu nhất trong lịch sử', 'Vì Vua Hùng có nhiều con cháu nhất', 'Vì Vua Hùng đã thống nhất toàn bộ lãnh thổ Việt Nam'],
      'Vua Hùng được coi là tổ tiên chung của người Việt. Câu "Con Lạc cháu Hồng" nhắc về nguồn gốc Lạc Long Quân và Âu Cơ.'),
    q('Khu di tích Đền Hùng nằm trên ngọn núi nào?',
      'Núi Nghĩa Lĩnh',
      ['Núi Bà Đen', 'Núi Ngự Bình', 'Núi Fansipan'],
      'Đền Hùng được xây dựng trên núi Nghĩa Lĩnh (Phú Thọ) qua nhiều triều đại.'),
    q('Bánh chưng, bánh giầy gắn liền với truyền thuyết ở thời Vua Hùng thứ mấy?',
      'Vua Hùng thứ 6 (truyền thuyết Lang Liêu)',
      ['Vua Hùng thứ 1', 'Vua Hùng thứ 18', 'Không gắn với Vua Hùng'],
      'Lang Liêu làm bánh chưng vuông tượng trưng cho Đất, bánh giầy tròn tượng trưng cho Trời để dâng Vua cha.'),
    q('Câu ca dao "Dù ai đi ngược về xuôi..." nhắc nhở điều gì?',
      'Nhắc người dân Việt Nam luôn nhớ về cội nguồn và công ơn Vua Hùng',
      ['Nhắc mọi người đi du lịch nhiều hơn', 'Nhắc nhớ mang quà khi về quê', 'Nhắc đội mũ bảo hiểm khi đi đường'],
      'Câu ca dao là lời dặn dò các thế hệ người Việt luôn ghi nhớ đạo lý "Uống nước nhớ nguồn".'),
  ],

  // ── Bài 8-9: Đồng bằng Bắc Bộ ───────────────────────────────────────
  'dong-bang-bac-bo': [
    q('Vùng Đồng bằng Bắc Bộ được bồi đắp chủ yếu bởi con sông nào?',
      'Sông Hồng và sông Thái Bình',
      ['Sông Mê Kông', 'Sông Thu Bồn', 'Sông Đồng Nai'],
      'Đồng bằng Bắc Bộ (châu thổ sông Hồng) là vùng đất phù sa màu mỡ, được bồi đắp hàng nghìn năm bởi sông Hồng.'),
    q('Nông nghiệp vùng Đồng bằng Bắc Bộ nổi tiếng về sản phẩm gì?',
      'Lúa gạo — đây là vựa lúa lớn thứ hai của Việt Nam',
      ['Cà phê và cao su', 'Chè và trái cây nhiệt đới', 'Muối và thủy hải sản'],
      'Đất phù sa màu mỡ, khí hậu 4 mùa phù hợp trồng lúa. Đồng bằng Bắc Bộ đứng thứ 2 về sản lượng lúa sau Đồng bằng Nam Bộ.'),
    q('Dân số vùng Đồng bằng Bắc Bộ có đặc điểm gì?',
      'Đông dân, mật độ dân số cao nhất cả nước',
      ['Thưa dân, nhiều đất hoang', 'Chủ yếu là dân tộc thiểu số', 'Dân số ít hơn miền Trung'],
      'Đồng bằng Bắc Bộ có mật độ dân số trung bình cao nhất Việt Nam, tập trung đông ở Hà Nội và các tỉnh lân cận.'),
    q('Đồng bằng Bắc Bộ có hình dáng giống hình gì?',
      'Hình tam giác',
      ['Hình vuông', 'Hình tròn', 'Hình chữ S'],
      'Đồng bằng Bắc Bộ có dạng hình tam giác với đỉnh ở Việt Trì (Phú Thọ) và cạnh đáy là đường bờ biển.'),
    q('Để ngăn lũ lụt ở Đồng bằng Bắc Bộ, người dân đã làm gì từ xa xưa?',
      'Đắp đê dọc hai bên bờ sông',
      ['Trồng thật nhiều cây xương rồng', 'Phá bỏ hết nhà cửa', 'Đào ao quanh nhà'],
      'Hệ thống đê sông Hồng dài hàng ngàn km là công trình vĩ đại của người dân để ngăn nước lũ tràn vào đồng ruộng.'),
    q('Loại cây trồng chủ lực của Đồng bằng Bắc Bộ vào mùa đông là gì?',
      'Rau vụ đông (su hào, bắp cải, khoai tây, cà chua)',
      ['Lúa nước', 'Cây cao su', 'Cây chè'],
      'Đồng bằng Bắc Bộ có mùa đông lạnh, rất thích hợp để trồng các loại rau quả ôn đới gọi là "rau vụ đông".'),
    q('Khu vực Đồng bằng Bắc Bộ có địa hình bề mặt như thế nào?',
      'Tương đối bằng phẳng và thấp',
      ['Rất dốc, nhiều núi cao', 'Toàn là sa mạc cát', 'Chỉ có đồi núi thấp'],
      'Địa hình bằng phẳng thuận lợi cho việc làm nhà, xây đường và canh tác nông nghiệp quy mô lớn.'),
  ],

  // ── Bài 10: Văn hóa Đồng bằng Bắc Bộ ────────────────────────────────
  'van-hoa-bac-bo': [
    q('Lễ hội nào gắn liền với văn hóa Đồng bằng Bắc Bộ?',
      'Hội Gióng, hội Đền Hùng, hội chùa Hương',
      ['Lễ hội Kate của người Chăm', 'Hội đua voi Buôn Ma Thuột', 'Lễ hội cồng chiêng Tây Nguyên'],
      'Đồng bằng Bắc Bộ có nhiều lễ hội truyền thống nổi tiếng như hội Gióng (Sóc Sơn), hội chùa Hương (Hà Nội), hội Lim (Bắc Ninh)...'),
    q('Nghề thủ công truyền thống nổi tiếng nào ở Đồng bằng Bắc Bộ?',
      'Gốm Bát Tràng, lụa Vạn Phúc, tranh Đông Hồ',
      ['Dệt thổ cẩm Mường', 'Nghề đúc đồng Tây Nguyên', 'Gốm Chăm Bình Thuận'],
      'Làng nghề truyền thống như Bát Tràng (gốm), Vạn Phúc (lụa tơ tằm), Đông Hồ (tranh dân gian) là niềm tự hào của vùng Bắc Bộ.'),
    q('Quan họ Bắc Ninh là gì?',
      'Hình thức dân ca đặc trưng của vùng Kinh Bắc, được UNESCO công nhận là di sản văn hóa phi vật thể',
      ['Điệu múa truyền thống của dân tộc Tày', 'Bài thơ về sông Hồng', 'Nghề làm giấy thủ công'],
      'Quan họ là dân ca đối đáp (hát giao duyên) đặc sắc của Bắc Ninh - Bắc Giang, được công nhận di sản phi vật thể thế giới năm 2009.'),
    q('Liền anh, liền chị là tên gọi những người tham gia hoạt động văn hóa nào?',
      'Hát Quan họ Bắc Ninh',
      ['Múa cồng chiêng', 'Nhảy sạp', 'Chèo thuyền'],
      'Nam giới hát quan họ gọi là "liền anh", nữ giới gọi là "liền chị". Họ mặc trang phục truyền thống như áo the, nón quai thao.'),
    q('Múa rối nước là nghệ thuật truyền thống bắt nguồn từ đâu?',
      'Đồng bằng Bắc Bộ',
      ['Vùng núi Tây Nguyên', 'Vùng biển Nam Trung Bộ', 'Đồng bằng sông Cửu Long'],
      'Múa rối nước gắn liền với văn hóa lúa nước. Sân khấu chính là mặt nước ao làng, rối được làm bằng gỗ nhẹ.'),
    q('Ngôi chùa nào nổi tiếng ở Đồng bằng Bắc Bộ được xây dựng trên một cột đá?',
      'Chùa Một Cột',
      ['Chùa Thiên Mụ', 'Chùa Bái Đính', 'Chùa Linh Ứng'],
      'Chùa Một Cột (Hà Nội) có kiến trúc độc đáo tựa như đóa hoa sen mọc lên từ mặt nước, xây từ thời Lý.'),
    q('Làng nghề Bát Tràng (Hà Nội) nổi tiếng với sản phẩm gì?',
      'Gốm sứ',
      ['Nón lá', 'Tranh dân gian', 'Lụa tơ tằm'],
      'Gốm Bát Tràng có từ lâu đời, với các sản phẩm tinh xảo như bình hoa, bát đĩa, đồ trang trí được nung từ đất sét.'),
  ],

  // ── Bài 11: Sông Hồng và văn minh sông Hồng ──────────────────────────
  'song-hong': [
    q('Sông Hồng có tên gọi đó vì lý do gì?',
      'Vì nước sông có màu đỏ do phù sa sét đỏ',
      ['Vì hai bờ sông có cây hoa đỏ', 'Vì đây là sông thiêng màu đỏ theo truyền thuyết', 'Vì mặt trời chiếu vào buổi sáng làm sông đỏ'],
      'Sông Hồng (Red River) nước có màu đỏ nâu do mang nhiều phù sa sét đỏ từ thượng nguồn Vân Nam (Trung Quốc) đổ về.'),
    q('Sông Hồng bắt nguồn từ đâu?',
      'Từ tỉnh Vân Nam, Trung Quốc',
      ['Từ miền Trung Việt Nam', 'Từ cao nguyên Tây Nguyên', 'Từ tỉnh Lào Cai, Việt Nam'],
      'Sông Hồng bắt nguồn từ núi cao ở tỉnh Vân Nam (Trung Quốc), chảy qua Lào Cai vào Việt Nam, đổ ra biển tại Nam Định, Thái Bình.'),
    q('Văn minh sông Hồng có nghĩa là gì?',
      'Nền văn hóa, kinh tế và xã hội hình thành và phát triển quanh vùng châu thổ sông Hồng từ hàng nghìn năm trước',
      ['Tên một bộ lạc cổ đại', 'Phong tục thờ cúng sông Hồng', 'Nghề đánh cá trên sông Hồng'],
      'Văn minh sông Hồng là cái nôi của dân tộc Việt: nền nông nghiệp lúa nước, trống đồng Đông Sơn, nghề làm gốm và đan lát phát triển từ đây.'),
    q('Hiện vật tiêu biểu nào đại diện cho nền văn minh sông Hồng cổ đại?',
      'Trống đồng Đông Sơn',
      ['Cột cờ Hà Nội', 'Kinh thành Huế', 'Bản đồ Việt Nam'],
      'Trống đồng Đông Sơn là biểu tượng của trí tuệ, kỹ thuật đúc đồng và văn hóa của người Việt cổ thời Vua Hùng.'),
    q('Hệ thống đê điều ở lưu vực sông Hồng mang lại lợi ích gì lớn nhất?',
      'Ngăn chặn ngập lụt vào mùa mưa lũ, bảo vệ mùa màng và xóm làng',
      ['Làm đường đi lại dễ dàng hơn', 'Tạo ra nhiều cá tôm', 'Giúp sông có nước sạch hơn'],
      'Đê sông Hồng là một kỳ tích của người dân Bắc Bộ, được xây dựng qua hàng ngàn năm để chống lại thiên tai.'),
    q('Ngoài phù sa, sông Hồng còn cung cấp tài nguyên gì rất quan trọng cho nông nghiệp?',
      'Nguồn nước dồi dào để tưới tiêu cho đồng ruộng',
      ['Rất nhiều vàng bạc', 'Đá vôi xây nhà', 'Muối biển'],
      'Nguồn nước ngọt từ sông Hồng được dẫn vào đồng ruộng thông qua hệ thống kênh mương, giúp nông nghiệp phát triển.'),
    q('Mùa lũ của sông Hồng thường diễn ra vào thời gian nào trong năm?',
      'Mùa hạ (từ tháng 6 đến tháng 10)',
      ['Mùa đông', 'Mùa xuân', 'Mùa thu'],
      'Mưa lớn ở thượng nguồn và vùng núi phía Bắc đổ về khiến mực nước sông Hồng dâng cao, dễ gây ngập lụt.'),
  ],

  // ── Bài 12-13: Thăng Long - Hà Nội & Văn Miếu ────────────────────────
  'thang-long-ha-noi': [
    q('Thăng Long là tên cũ của thành phố nào ngày nay?',
      'Hà Nội — thủ đô nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
      ['TP. Hồ Chí Minh', 'Huế', 'Đà Nẵng'],
      'Năm 1010, vua Lý Thái Tổ dời đô từ Hoa Lư về thành Đại La, đặt tên là Thăng Long (rồng bay lên). Năm 1831 đổi tên thành Hà Nội.'),
    q('Ai là người dời đô về Thăng Long năm 1010?',
      'Vua Lý Thái Tổ (Lý Công Uẩn)',
      ['Vua Hùng Vương', 'Vua Trần Nhân Tông', 'Vua Gia Long'],
      'Lý Thái Tổ (Lý Công Uẩn) lên ngôi năm 1009, năm 1010 viết "Chiếu dời đô" và chuyển kinh đô từ Hoa Lư (Ninh Bình) về Thăng Long.'),
    q('Văn Miếu - Quốc Tử Giám là gì?',
      'Trường đại học đầu tiên của Việt Nam, thành lập năm 1076, nơi đào tạo quan lại và nhân tài',
      ['Cung điện vua ở', 'Đền thờ các vị thần bảo hộ Thăng Long', 'Pháo đài quân sự thời Lý'],
      'Văn Miếu (1070) thờ Khổng Tử và các bậc hiền triết. Quốc Tử Giám (1076) là trường đại học đầu tiên của Việt Nam, đào tạo nhân tài cho đất nước.'),
    q('Hồ Gươm (Hoàn Kiếm) gắn với truyền thuyết nào?',
      'Vua Lê Lợi trả kiếm thần cho Rùa thần sau khi đánh đuổi giặc Minh',
      ['Thánh Gióng đánh giặc Ân', 'Sơn Tinh - Thủy Tinh', 'Chử Đồng Tử gặp tiên'],
      'Sau khi đánh thắng quân Minh, Lê Lợi đi thuyền trên hồ thì rùa thần nổi lên đòi lại gươm báu. Từ đó hồ có tên là Hồ Hoàn Kiếm.'),
    q('Hoàng thành Thăng Long là di sản văn hóa gì?',
      'Di sản văn hóa thế giới do UNESCO công nhận, là quần thể di tích gắn với nhiều triều đại phong kiến',
      ['Một công viên giải trí mới xây', 'Tên gọi khác của Hồ Gươm', 'Một khu rừng cấm thời Lý'],
      'Hoàng thành Thăng Long minh chứng cho lịch sử kéo dài hàng ngàn năm từ thời Lý, Trần, Lê...'),
    q('Ở Hà Nội có 36 phố phường, các tên phố thường bắt đầu bằng chữ gì?',
      'Chữ "Hàng" (như Hàng Đào, Hàng Bạc, Hàng Mã)',
      ['Chữ "Đường"', 'Chữ "Phố"', 'Chữ "Làng"'],
      'Khu phố cổ Hà Nội có các con phố chuyên bán một loại hàng hóa, do dân các làng nghề tụ tập lại buôn bán, nên được đặt tên chữ "Hàng".'),
    q('Bia tiến sĩ trong Văn Miếu - Quốc Tử Giám dùng để làm gì?',
      'Ghi danh những người đỗ đạt cao trong các kỳ thi thời phong kiến',
      ['Làm bản đồ quy hoạch kinh thành', 'Ghi chép thơ ca của nhà vua', 'Làm bia chỉ đường'],
      '82 bia đá khắc tên các vị tiến sĩ nhằm tôn vinh sự học và khích lệ nhân tài cho đất nước.'),
  ],

  // ── Bài 15-17: Duyên hải miền Trung ──────────────────────────────────
  'duyen-hai-mien-trung': [
    q('Vùng Duyên hải miền Trung có đặc điểm địa hình như thế nào?',
      'Dải đất hẹp chạy dọc bờ biển, phía tây là dãy Trường Sơn, phía đông là Biển Đông',
      ['Đồng bằng rộng lớn, không có núi', 'Cao nguyên rộng với đất đỏ bazan', 'Đồng bằng ngập nước, nhiều kênh rạch'],
      'Miền Trung "khúc ruột" hẹp, nơi hẹp nhất chỉ khoảng 50 km. Đây là vùng hay gánh thiên tai: bão, lũ, hạn hán.'),
    q('Biển Đông có vai trò gì với vùng Duyên hải miền Trung?',
      'Là nguồn tài nguyên thủy hải sản phong phú và phát triển du lịch biển',
      ['Cung cấp nước ngọt cho sinh hoạt', 'Là ranh giới với nước láng giềng Lào', 'Là nơi trồng lúa nước'],
      'Biển Đông giúp ngư dân đánh bắt cá tôm, phát triển nghề muối và du lịch biển (Đà Nẵng, Nha Trang, Mũi Né...).'),
    q('Văn hóa người Chăm gắn với vùng nào của miền Trung?',
      'Duyên hải miền Trung, đặc biệt ở Bình Thuận, Ninh Thuận và Khánh Hòa',
      ['Tây Nguyên', 'Đồng bằng Bắc Bộ', 'Nam Bộ'],
      'Người Chăm có nền văn hóa lâu đời với đền tháp Chăm (Mỹ Sơn, Tháp Chàm), nghệ thuật dệt thổ cẩm và lễ hội Kate đặc sắc.'),
    q('Thiên tai nào thường xuyên xảy ra ở Duyên hải miền Trung vào mùa mưa?',
      'Bão và lũ lụt',
      ['Động đất mạnh', 'Sóng thần', 'Tuyệt rơi'],
      'Vị trí giáp biển, hẹp và núi dốc làm miền Trung hay phải hứng chịu các cơn bão từ Biển Đông và lũ lụt diện rộng.'),
    q('Gió phơn Tây Nam (thường gọi là gió Lào) mang lại thời tiết gì cho miền Trung vào mùa hè?',
      'Rất khô và nóng',
      ['Lạnh giá và nhiều tuyết', 'Mát mẻ và dễ chịu', 'Mưa rào liên tục'],
      'Gió Lào khô nóng khiến mùa hè ở Duyên hải miền Trung rất khắc nghiệt, gây hạn hán và nguy cơ cháy rừng.'),
    q('Nghề nghiệp phổ biến của người dân ven biển miền Trung là gì?',
      'Đánh bắt, nuôi trồng thủy sản và làm muối',
      ['Khai thác than đá', 'Trồng lúa trên ruộng bậc thang', 'Trồng cây cao su'],
      'Đường bờ biển dài, nước biển mặn thuận lợi cho nghề cá, làm muối (như muối Cà Ná, Sa Huỳnh) và du lịch biển.'),
    q('Dải đồng bằng ven biển miền Trung có đặc điểm gì?',
      'Nhỏ, hẹp và bị chia cắt bởi các dãy núi đâm ngang ra biển',
      ['Rộng lớn và bằng phẳng', 'Là nơi thấp hơn mực nước biển', 'Hoàn toàn là đầm lầy'],
      'Các dãy núi như đèo Ngang, đèo Hải Vân đâm thẳng ra biển chia cắt đồng bằng miền Trung thành nhiều mảnh nhỏ.'),
  ],

  // ── Bài 18-19: Cố đô Huế & Phố cổ Hội An ────────────────────────────
  'hue-hoi-an': [
    q('Cố đô Huế được UNESCO công nhận là gì?',
      'Di sản văn hóa thế giới năm 1993',
      ['Di sản thiên nhiên thế giới', 'Di sản văn hóa phi vật thể', 'Kỳ quan thiên nhiên thế giới'],
      'Quần thể di tích Cố đô Huế (Kinh thành, Lăng tẩm, Đàn Nam Giao...) được UNESCO công nhận di sản văn hóa thế giới năm 1993.'),
    q('Huế từng là kinh đô của triều đại nào?',
      'Triều Nguyễn (1802 - 1945)',
      ['Triều Lý', 'Triều Trần', 'Triều Lê'],
      'Năm 1802, vua Gia Long thống nhất đất nước, đặt kinh đô ở Huế. Triều Nguyễn là triều đại phong kiến cuối cùng của Việt Nam.'),
    q('Phố cổ Hội An có điểm gì đặc biệt?',
      'Là thương cảng sầm uất thế kỷ 16-17, nơi giao thoa văn hóa Việt - Trung - Nhật - Ấn',
      ['Là thành phố công nghiệp hiện đại nhất miền Trung', 'Là nơi có nhiều tháp Chăm nhất', 'Là cảng biển quân sự lớn'],
      'Hội An từng là cảng thương mại quốc tế sầm uất, nay được UNESCO công nhận di sản văn hóa thế giới với khu phố cổ được bảo tồn nguyên vẹn.'),
    q('Sông Hương (Hương Giang) chảy qua thành phố nào?',
      'Thành phố Huế',
      ['Thành phố Đà Nẵng', 'Thành phố Hội An', 'Thành phố Nha Trang'],
      'Sông Hương êm đềm chảy qua lòng thành phố Huế, tạo nên nét đẹp mộng mơ, gắn liền với nhã nhạc và thơ ca.'),
    q('Chùa Cầu (Lai Viễn Kiều) là biểu tượng nổi tiếng của nơi nào?',
      'Phố cổ Hội An',
      ['Cố đô Huế', 'Hoàng thành Thăng Long', 'Tháp Chàm Ninh Thuận'],
      'Chùa Cầu do các thương nhân Nhật Bản xây dựng từ thế kỷ 17, bắc qua một lạch nước nhỏ ở Hội An, in trên tờ tiền 20.000 VNĐ.'),
    q('Nhã nhạc cung đình Huế là gì?',
      'Âm nhạc cung đình chính thức của triều Nguyễn, được biểu diễn trong các dịp lễ lớn',
      ['Nhạc dân ca đường phố của người dân Huế', 'Điệu múa trong các đình làng', 'Bản nhạc dùng trong quân đội'],
      'Nhã nhạc mang ý nghĩa thanh tao, tinh tế. Đây là Di sản văn hóa phi vật thể của thế giới được UNESCO công nhận năm 2003.'),
    q('Món ăn truyền thống nào nổi tiếng ở phố cổ Hội An?',
      'Cao lầu và mì Quảng',
      ['Phở bò', 'Bún chả', 'Bánh đa cua'],
      'Cao lầu có sợi mì vàng ươm, ăn kèm thịt xá xíu và rau sống là đặc sản nổi tiếng chỉ Hội An mới có hương vị chuẩn nhất.'),
  ],

  // ── Bài 20-23: Tây Nguyên ─────────────────────────────────────────────
  'tay-nguyen': [
    q('Tây Nguyên có đặc điểm địa hình như thế nào?',
      'Cao nguyên rộng lớn, đất đỏ bazan màu mỡ, khí hậu mát mẻ',
      ['Đồng bằng sát biển', 'Vùng núi đá vôi', 'Đồng bằng ngập mặn'],
      'Tây Nguyên gồm 5 tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng. Đất đỏ bazan rất phù hợp trồng cà phê, cao su, hồ tiêu.'),
    q('Tây Nguyên nổi tiếng với loại cây công nghiệp nào?',
      'Cà phê — Việt Nam xuất khẩu cà phê lớn thứ 2 thế giới nhờ Tây Nguyên',
      ['Lúa nước', 'Mía đường', 'Chè xanh'],
      'Tây Nguyên trồng cà phê Robusta nổi tiếng, đặc biệt ở Đắk Lắk (Buôn Ma Thuột). VN là nước xuất khẩu cà phê lớn thứ 2 thế giới.'),
    q('Lễ hội cồng chiêng Tây Nguyên có ý nghĩa gì?',
      'Là di sản văn hóa phi vật thể của UNESCO, thể hiện đời sống tinh thần và bản sắc văn hóa các dân tộc Tây Nguyên',
      ['Là lễ hội để cầu mưa trong mùa khô', 'Là buổi triển lãm nhạc cụ cổ đại', 'Là cuộc thi thể thao giữa các làng'],
      'Cồng chiêng gắn với mọi sự kiện quan trọng của đồng bào Tây Nguyên (Ê Đê, Mnông, Ba Na...). UNESCO công nhận là di sản phi vật thể năm 2005.'),
    q('Vào mùa khô, Tây Nguyên thường gặp khó khăn gì nhất?',
      'Thiếu nước nghiêm trọng do nắng nóng kéo dài, nguy cơ cháy rừng',
      ['Lũ lụt ngập trắng các cao nguyên', 'Tuyết rơi dày đặc', 'Sương muối làm chết cây trồng'],
      'Khí hậu Tây Nguyên chia 2 mùa rõ rệt: mùa mưa và mùa khô. Mùa khô kéo dài 6 tháng khiến sông suối cạn kiệt.'),
    q('Nhà rông ở Tây Nguyên có chức năng gì?',
      'Là nhà sinh hoạt cộng đồng của buôn làng, nơi tổ chức lễ hội và bàn việc lớn',
      ['Là nơi ở của vị trưởng làng', 'Là kho chứa cà phê của cả vùng', 'Là bệnh viện của làng'],
      'Nhà rông (đặc biệt của người Ba Na, Gia Rai) có mái ngọn vút cao, được xây ở vị trí trung tâm buôn làng.'),
    q('Đà Lạt - thành phố nổi tiếng của tỉnh Lâm Đồng (Tây Nguyên) có đặc điểm khí hậu gì?',
      'Mát mẻ quanh năm, thích hợp trồng hoa và rau xứ lạnh',
      ['Nắng nóng quanh năm như sa mạc', 'Rất ẩm ướt và hay có bão', 'Có 4 mùa xuân, hạ, thu, đông rõ rệt như miền Bắc'],
      'Nằm trên cao nguyên Lâm Viên cao 1.500m, Đà Lạt có khí hậu ôn đới mát mẻ, được mệnh danh là thành phố ngàn hoa.'),
    q('Thác nước là một đặc trưng cảnh quan của Tây Nguyên. Sự hình thành thác nước chủ yếu do đâu?',
      'Do các dòng sông chảy qua địa hình cao nguyên xếp tầng, có nhiều đứt gãy',
      ['Do con người đắp đập tạo thành', 'Do núi lửa phun trào nước', 'Do nước biển tràn vào'],
      'Địa hình Tây Nguyên không bằng phẳng mà gồm các cao nguyên xếp tầng, tạo ra các độ chênh lớn hình thành nhiều thác nước hùng vĩ (Prenn, Dray Sap...).'),
  ],

  // ── Bài 24-26: Nam Bộ ─────────────────────────────────────────────────
  'nam-bo': [
    q('Đồng bằng Nam Bộ được bồi đắp bởi hệ thống sông nào?',
      'Sông Mê Kông (qua Việt Nam gọi là sông Cửu Long)',
      ['Sông Hồng và sông Thái Bình', 'Sông Thu Bồn và sông Trà Khúc', 'Sông Đồng Nai và sông La Ngà'],
      'Đồng bằng sông Cửu Long (ĐBSCL) là vựa lúa lớn nhất Việt Nam, chiếm hơn 50% sản lượng lúa cả nước, nhờ phù sa màu mỡ của sông Mê Kông.'),
    q('Thực vật đặc trưng của vùng sông nước Nam Bộ là gì?',
      'Rừng ngập mặn (mangrove) và dừa nước, cây mắm, đước',
      ['Thông xanh và pơ mu', 'Tre nứa và cây họ đậu', 'Cây cao su và cà phê'],
      'Rừng ngập mặn U Minh (Cà Mau - Kiên Giang) là hệ sinh thái đặc biệt ven biển Nam Bộ, là nơi sinh sống của nhiều loài chim, cá, tôm.'),
    q('Đặc điểm nổi bật của chợ nổi ở Nam Bộ là gì?',
      'Là khu chợ họp trên sông, người dân mua bán từ thuyền, bán nông sản địa phương',
      ['Họp vào ban đêm trên đất liền', 'Chỉ bán đồ thủ công mỹ nghệ', 'Họp một lần trong năm vào lễ hội'],
      'Chợ nổi Cái Răng (Cần Thơ), Cái Bè (Tiền Giang)... là nét văn hóa độc đáo Nam Bộ. Người bán dùng cây sào treo hàng mẫu trên thuyền để khách nhận biết.'),
    q('Nam Bộ có khí hậu như thế nào?',
      'Khí hậu cận xích đạo nóng ẩm, chia thành hai mùa rõ rệt là mùa mưa và mùa khô',
      ['Khí hậu lạnh giá có tuyết rơi', 'Khí hậu có 4 mùa: xuân, hạ, thu, đông', 'Khí hậu rất khô hạn như sa mạc'],
      'Nắng nóng quanh năm, mùa mưa kéo dài từ tháng 5 đến tháng 11, mùa khô từ tháng 12 đến tháng 4 năm sau.'),
    q('Người dân Nam Bộ sử dụng phương tiện gì là chủ yếu để đi lại trên kênh rạch?',
      'Xuồng, ghe, vỏ lãi',
      ['Ngựa và xe kéo', 'Xe máy', 'Máy bay trực thăng'],
      'Với mạng lưới sông ngòi, kênh rạch chằng chịt, xuồng và ghe là phương tiện vận tải và đi lại quan trọng nhất của người dân miền Tây.'),
    q('Miệt vườn Nam Bộ nổi tiếng về sản phẩm gì?',
      'Các loại trái cây nhiệt đới phong phú (sầu riêng, chôm chôm, măng cụt, bưởi...)',
      ['Trái cây ôn đới (nho, táo, lê)', 'Chè và cà phê', 'Các loại gỗ quý'],
      'Đất đai phù sa màu mỡ và nước ngọt quanh năm giúp Nam Bộ trở thành vựa trái cây lớn nhất cả nước.'),
    q('Nghệ thuật đàn ca tài tử Nam Bộ thường được biểu diễn ở đâu?',
      'Ở khắp nơi: trong miệt vườn, trên sông nước hay tại các dịp lễ hội, đám tiệc',
      ['Chỉ biểu diễn trong cung đình', 'Chỉ biểu diễn trong các nhà hát lớn', 'Chỉ biểu diễn cho khách nước ngoài xem'],
      'Đàn ca tài tử mang tính dân dã, ngẫu hứng, gắn bó sâu sắc với đời sống sinh hoạt của người dân Nam Bộ. UNESCO đã công nhận là di sản văn hóa phi vật thể.'),
  ],

  // ── Bài 27-28: TP. Hồ Chí Minh & Địa đạo Củ Chi ─────────────────────
  'tp-hcm-cu-chi': [
    q('Thành phố Hồ Chí Minh (trước gọi là Sài Gòn) có vị trí như thế nào?',
      'Là thành phố lớn nhất Việt Nam, trung tâm kinh tế - thương mại phía Nam',
      ['Là thủ đô hành chính của Việt Nam', 'Là thành phố ven biển duy nhất của Nam Bộ', 'Là trung tâm công nghiệp duy nhất cả nước'],
      'TP.HCM (9-15 triệu người) là đô thị lớn nhất VN, đóng góp khoảng 20-25% GDP cả nước. Hà Nội là thủ đô; TP.HCM là trung tâm kinh tế.'),
    q('Địa đạo Củ Chi là gì?',
      'Hệ thống đường hầm chiến đấu dài hàng trăm km dưới lòng đất, được đào trong thời kỳ kháng chiến chống Mỹ',
      ['Một con đường giao thông cổ xưa', 'Hầm chứa lương thực thời bình', 'Đường ray tàu điện ngầm Sài Gòn cũ'],
      'Địa đạo Củ Chi (TP.HCM) gồm khoảng 250 km đường hầm 3 tầng, có phòng ngủ, bếp ăn, bệnh xá... giúp quân dân ta chiến đấu trực tiếp ở vùng địch chiếm đóng.'),
    q('Dòng sông lớn nào chảy qua giữa Thành phố Hồ Chí Minh?',
      'Sông Sài Gòn',
      ['Sông Hồng', 'Sông Hương', 'Sông Tiền'],
      'Sông Sài Gòn mang lại cảnh quan đẹp và là tuyến giao thông đường thủy, cảng biển rất quan trọng của thành phố.'),
    q('Chợ nào là biểu tượng giao thương lâu đời và nổi tiếng của TP. Hồ Chí Minh?',
      'Chợ Bến Thành',
      ['Chợ Đồng Xuân', 'Chợ Đông Ba', 'Chợ nổi Cái Răng'],
      'Chợ Bến Thành với biểu tượng tháp đồng hồ ở cửa Nam đã trở thành hình ảnh quen thuộc khi nhắc tới TP.HCM.'),
    q('Thời tiết TP. Hồ Chí Minh có điểm gì đáng chú ý với khách du lịch?',
      'Chỉ có mùa mưa và mùa khô, trời nắng ấm quanh năm',
      ['Mùa đông rất lạnh phải mặc áo len', 'Thường xuyên có bão tuyết', 'Bốn mùa thay đổi trong một tuần'],
      'Sài Gòn không có mùa đông lạnh, nhiệt độ trung bình từ 27-29 độ C.'),
    q('Bến Nhà Rồng gắn liền với sự kiện lịch sử nào của Bác Hồ?',
      'Nơi Bác Hồ (Nguyễn Tất Thành) ra đi tìm đường cứu nước năm 1911',
      ['Nơi Bác Hồ đọc Tuyên ngôn Độc lập', 'Nơi Bác Hồ chỉ huy chiến dịch Điện Biên Phủ', 'Nơi Bác sinh ra'],
      'Ngày 5/6/1911, từ Bến Nhà Rồng (cảng Sài Gòn), người thanh niên Nguyễn Tất Thành đã lên tàu Amiral Latouche Tréville ra đi tìm đường cứu nước.'),
  ],
};

// ─── Lesson title/topicKey → bank key mapping ─────────────────────────────────

function pickBank(topicKey, lessonTitle) {
  const key = String(topicKey || '').toLowerCase();
  const t = String(lessonTitle || '').toLowerCase();

  if (/mo-dau|lam-quen|phuong-tien-hoc-tap/.test(key)) return BANKS['mo-dau'];
  if (/dia-phuong|địa phương|thien-nhien-va-con-nguoi-o-dia-phuong/.test(key) || /địa phương em|thiên nhiên và con người ở địa phương em/.test(t))
    return BANKS['dia-phuong-em'];

  if (/trung-du|mien-nui-bac-bo|bai-4|bai-5/.test(key) || /trung du|miền núi bắc bộ/.test(t))
    return BANKS['trung-du-mien-nui-bac-bo'];

  if (/den-hung|hung-vuong|bai-7/.test(key) || /đền hùng|hùng vương/.test(t))
    return BANKS['den-hung'];

  if (/dong-bang-bac-bo|bai-8|bai-9/.test(key) || /đồng bằng bắc bộ/.test(t))
    return BANKS['dong-bang-bac-bo'];

  if (/van-hoa.*bac-bo|bai-10/.test(key) || /văn hoá.*bắc bộ/.test(t))
    return BANKS['van-hoa-bac-bo'];

  if (/song-hong|van-minh-song-hong|bai-11/.test(key) || /sông hồng/.test(t))
    return BANKS['song-hong'];

  if (/thang-long|ha-noi|van-mieu|quoc-tu-giam|bai-12|bai-13/.test(key) || /thăng long|hà nội|văn miếu/.test(t))
    return BANKS['thang-long-ha-noi'];

  if (/duyen-hai|mien-trung|bai-15|bai-16|bai-17/.test(key) || /duyên hải|miền trung/.test(t))
    return BANKS['duyen-hai-mien-trung'];

  if (/hue|hoi-an|co-do|pho-co|bai-18|bai-19/.test(key) || /huế|hội an/.test(t))
    return BANKS['hue-hoi-an'];

  if (/tay-nguyen|cong-chieng|bai-20|bai-21|bai-22|bai-23/.test(key) || /tây nguyên|cồng chiêng/.test(t))
    return BANKS['tay-nguyen'];

  if (/nam-bo|mekong|bai-24|bai-25|bai-26/.test(key) || /nam bộ/.test(t))
    return BANKS['nam-bo'];

  if (/ho-chi-minh|cu-chi|bai-27|bai-28/.test(key) || /hồ chí minh|củ chi/.test(t))
    return BANKS['tp-hcm-cu-chi'];

  // Fallback: mix of key facts from multiple regions
  return [
    ...BANKS['den-hung'].slice(0, 2),
    ...BANKS['thang-long-ha-noi'].slice(0, 2),
    ...BANKS['tay-nguyen'].slice(0, 2),
    ...BANKS['tp-hcm-cu-chi'].slice(0, 2),
  ];
}

/**
 * Main export: generate Lịch sử và Địa lí 4 KNTT questions.
 */
export function generateHistgeoQuestions(topic, count = 8, seedInput = '') {
  const source = topic.knttSource || {};
  const lessonTitle = source.lesson || topic.title || '';
  const bank = pickBank(topic.topicKey || '', lessonTitle);
  if (!bank || !bank.length) return [];
  const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}|histgeo`);
  return shuffled.slice(0, Math.max(6, Math.min(count, shuffled.length)));
}
