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
  return { type: 'multiple-choice', question, options: [answer, ...others.slice(0, 3)], answer, explanation };
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
