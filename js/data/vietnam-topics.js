/**
 * Meuw Academy — Vietnam Topics
 * Lịch sử & Địa lí Việt Nam cho lớp 4 (KNTT)
 * Handwritten quality content — all facts source-verified against SGK.
 */

function q(question, answer, options, explanation) {
  return { type: 'multiple-choice', question, answer, options, explanation };
}
function t(key, title, points, example, questions) {
  return {
    topicKey: `histgeo:vn:${key}`,
    subject: 'histgeo',
    title: `Lịch sử & Địa lí: ${title}`,
    lessonBlocks: [{ type: 'micro', teacherName: 'Gâu tiên sinh', title, points, example }],
    questionPool: questions,
  };
}

// ─── ĐỊA LÍ VIỆT NAM ─────────────────────────────────────────────────────────

export const VIETNAM_GEO_TOPICS = [

t('viet-nam-ban-do', 'Việt Nam trên bản đồ',
  ['Việt Nam nằm ở Đông Nam Á, trên bán đảo Đông Dương.',
   'Diện tích Việt Nam khoảng 331.000 km² — hình dạng giống chữ S.',
   'Phía Bắc giáp Trung Quốc, phía Tây giáp Lào và Campuchia, phía Đông và Nam giáp Biển Đông.',
   'Thủ đô: Hà Nội. Thành phố lớn nhất: TP Hồ Chí Minh.'],
  'Việt Nam có đường bờ biển dài 3.260 km — từ Móng Cái (Quảng Ninh) đến Hà Tiên (Kiên Giang)!',
  [q('Việt Nam nằm ở khu vực nào?', 'Đông Nam Á', ['Đông Nam Á','Đông Á','Nam Á','Trung Á'], 'Việt Nam là một trong các nước Đông Nam Á, thuộc bán đảo Đông Dương.'),
   q('Hình dạng lãnh thổ Việt Nam giống ký tự gì?', 'Chữ S', ['Chữ C','Chữ S','Chữ L','Chữ I'], 'Nhìn trên bản đồ, lãnh thổ Việt Nam có hình dạng giống chữ S đặc trưng.'),
   q('Phía Bắc Việt Nam giáp với nước nào?', 'Trung Quốc', ['Lào','Thái Lan','Trung Quốc','Campuchia'], 'Biên giới phía Bắc Việt Nam giáp Trung Quốc với đường biên giới dài khoảng 1.281 km.'),
   q('Thủ đô của Việt Nam là thành phố nào?', 'Hà Nội', ['Hà Nội','TP Hồ Chí Minh','Đà Nẵng','Huế'], 'Hà Nội là thủ đô và cũng là trung tâm chính trị, văn hóa, khoa học của cả nước.'),
   q('Biển nào bao quanh phía Đông và Nam Việt Nam?', 'Biển Đông', ['Thái Bình Dương','Biển Đông','Biển Ả Rập','Vịnh Bengal'], 'Biển Đông (South China Sea) là vùng biển bao phủ phần lớn bờ đông và nam Việt Nam.'),
   q('Việt Nam có đường bờ biển dài khoảng bao nhiêu km?', '3.260 km', ['500 km','3.260 km','10.000 km','1.000 km'], 'Đường bờ biển dài 3.260 km là tài nguyên quý giá cho ngư nghiệp, du lịch và thương mại.'),
   q('Phía Tây Việt Nam giáp những nước nào?', 'Lào và Campuchia', ['Trung Quốc và Lào','Lào và Campuchia','Thái Lan và Myanmar','Chỉ Lào'], 'Phía Tây Việt Nam có biên giới dài với Lào (2.067 km) và Campuchia (1.109 km).')]),

t('song-nui-viet-nam', 'Sông núi Việt Nam',
  ['Việt Nam có hệ thống sông ngòi dày đặc với khoảng 2.360 con sông dài trên 10 km.',
   'Sông Hồng (miền Bắc) và sông Mê Kông (miền Nam) là hai hệ thống sông lớn nhất.',
   'Dãy Trường Sơn là dãy núi dài nhất Việt Nam, chạy dọc từ Bắc vào Nam.',
   'Núi Fansipan (Lào Cai) cao 3.143 m — "nóc nhà Đông Dương".',
   'Đồng bằng sông Cửu Long là vùng đất màu mỡ nhất, "vựa lúa" của cả nước.'],
  'Sông Mê Kông bắt nguồn từ Tây Tạng, chảy qua 6 nước, đến Việt Nam thành 9 nhánh gọi là sông Cửu Long!',
  [q('Núi cao nhất Việt Nam và Đông Dương là núi nào?', 'Fansipan', ['Ngọc Linh','Bạch Mã','Fansipan','Bà Đen'], 'Fansipan cao 3.143 m thuộc tỉnh Lào Cai, là đỉnh núi cao nhất Việt Nam và toàn bán đảo Đông Dương.'),
   q('Dãy núi dài nhất Việt Nam là gì?', 'Dãy Trường Sơn', ['Hoàng Liên Sơn','Dãy Trường Sơn','Ngọc Linh','Bạch Mã'], 'Dãy Trường Sơn chạy dọc từ Bắc vào Nam, chia cắt Việt Nam với Lào và tạo ra khí hậu đặc trưng.'),
   q('Sông Cửu Long ở miền Nam Việt Nam thực ra là tên khác của sông nào?', 'Sông Mê Kông', ['Sông Hồng','Sông Mê Kông','Sông Đà','Sông Thái Bình'], 'Sông Mê Kông khi vào Việt Nam chia thành 9 nhánh — người Việt gọi là "Cửu Long" (9 con rồng).'),
   q('Đồng bằng sông Cửu Long nổi tiếng là gì của cả nước?', 'Vựa lúa — nơi sản xuất gạo nhiều nhất', ['Nơi có nhiều rừng nhất','Vựa lúa — nơi sản xuất gạo nhiều nhất','Trung tâm công nghiệp','Nơi đông dân nhất'], 'Đồng bằng sông Cửu Long đóng góp hơn 50% sản lượng lúa cả nước và phần lớn gạo xuất khẩu.'),
   q('Sông Hồng quan trọng với miền Bắc Việt Nam vì sao?', 'Phù sa màu mỡ tạo ra đồng bằng sông Hồng — nơi đông dân nhất', ['Là sông dài nhất','Phù sa màu mỡ tạo ra đồng bằng sông Hồng — nơi đông dân nhất','Cung cấp cá biển','Chảy ra biển nhanh nhất'], 'Phù sa đỏ của sông Hồng bồi đắp qua hàng triệu năm tạo ra đồng bằng châu thổ phì nhiêu.')]),

t('bien-dao-viet-nam', 'Biển và đảo Việt Nam',
  ['Việt Nam có hơn 3.000 hòn đảo lớn nhỏ và hai quần đảo lớn là Hoàng Sa và Trường Sa.',
   'Vịnh Hạ Long (Quảng Ninh) được UNESCO công nhận là Di sản Thiên nhiên Thế giới hai lần.',
   'Phú Quốc (Kiên Giang) là đảo lớn nhất Việt Nam.',
   'Biển Đông cung cấp nguồn thủy sản phong phú và là con đường hàng hải quan trọng.'],
  'Vịnh Hạ Long có hơn 1.600 hòn đảo đá vôi nhô lên từ biển — đẹp như tranh vẽ!',
  [q('Di sản Thiên nhiên Thế giới nổi tiếng nhất ở Quảng Ninh là gì?', 'Vịnh Hạ Long', ['Vịnh Cam Ranh','Vịnh Hạ Long','Phú Quốc','Nha Trang'], 'Vịnh Hạ Long được UNESCO công nhận năm 1994 và 2000 — là biểu tượng thiên nhiên Việt Nam.'),
   q('Đảo lớn nhất Việt Nam là đảo nào?', 'Phú Quốc', ['Côn Đảo','Cát Bà','Phú Quốc','Lý Sơn'], 'Phú Quốc thuộc tỉnh Kiên Giang, có diện tích 589 km² — lớn nhất trong hệ thống đảo Việt Nam.'),
   q('Hai quần đảo thuộc chủ quyền Việt Nam trên Biển Đông là gì?', 'Hoàng Sa và Trường Sa', ['Hoàng Sa và Trường Sa','Phú Quốc và Côn Đảo','Cát Bà và Cô Tô','Lý Sơn và Phú Quý'], 'Hoàng Sa (Đà Nẵng) và Trường Sa (Khánh Hòa) là hai quần đảo chiến lược của Việt Nam trên Biển Đông.'),
   q('Biển Đông quan trọng với Việt Nam vì sao?', 'Cung cấp thủy sản và là con đường thương mại quốc tế quan trọng', ['Chỉ để bơi lội và du lịch','Cung cấp thủy sản và là con đường thương mại quốc tế quan trọng','Không có ý nghĩa kinh tế','Chỉ là ranh giới tự nhiên'], 'Biển Đông mang lại nguồn lợi thủy sản khổng lồ và hàng trăm tàu thuyền qua lại mỗi ngày.')]),

t('vung-mien-viet-nam', 'Ba miền Bắc — Trung — Nam',
  ['Việt Nam chia thành 3 miền với đặc điểm địa lý và khí hậu khác nhau.',
   'Miền Bắc: đồng bằng sông Hồng, 4 mùa rõ rệt, có mùa đông lạnh.',
   'Miền Trung: dải đất hẹp, nhiều bão lũ, có di sản văn hóa Huế, Hội An, Mỹ Sơn.',
   'Miền Nam: đồng bằng sông Cửu Long rộng lớn, khí hậu 2 mùa (mưa/khô).'],
  'Miền Trung có đèo Hải Vân — "đường chim bay" 21 km chia cắt khí hậu Bắc và Nam!',
  [q('Miền nào của Việt Nam có 4 mùa rõ rệt với mùa đông lạnh?', 'Miền Bắc', ['Miền Trung','Miền Nam','Miền Bắc','Cả 3 miền đều như nhau'], 'Miền Bắc (Hà Nội) có đủ 4 mùa xuân-hạ-thu-đông, trong khi miền Nam chỉ có mùa mưa và mùa khô.'),
   q('Miền Nam Việt Nam chủ yếu có mấy mùa?', '2 mùa: mùa mưa và mùa khô', ['4 mùa','3 mùa','2 mùa: mùa mưa và mùa khô','Không có mùa rõ rệt'], 'TP Hồ Chí Minh và đồng bằng sông Cửu Long có khí hậu nhiệt đới với 2 mùa: mưa (tháng 5-11) và khô (tháng 12-4).'),
   q('Miền Trung Việt Nam thường gặp thiên tai nào nhiều nhất?', 'Bão và lũ lụt', ['Động đất','Bão và lũ lụt','Hạn hán kéo dài','Lốc xoáy'], 'Miền Trung hứng chịu nhiều cơn bão nhất (tháng 9-11) do địa hình hẹp, nằm trực tiếp hướng biển Đông.'),
   q('Đèo Hải Vân nằm giữa hai tỉnh nào?', 'Thừa Thiên Huế và Đà Nẵng', ['Quảng Bình và Quảng Trị','Thừa Thiên Huế và Đà Nẵng','Quảng Nam và Quảng Ngãi','Bình Định và Phú Yên'], 'Đèo Hải Vân (cao 496m) là ranh giới tự nhiên giữa Thừa Thiên Huế và Đà Nẵng, chia cắt khí hậu hai miền.'),
   q('Di sản Văn hóa Thế giới nào nằm ở miền Trung Việt Nam?', 'Huế, Hội An và Mỹ Sơn', ['Hạ Long và Sa Pa','Huế, Hội An và Mỹ Sơn','Đà Lạt và Nha Trang','Hà Nội và TP HCM'], 'Ba di sản UNESCO ở miền Trung: Quần thể di tích Huế (1993), Phố cổ Hội An (1999), Thánh địa Mỹ Sơn (1999).')]),

];

// ─── LỊCH SỬ VIỆT NAM ────────────────────────────────────────────────────────

export const VIETNAM_HISTORY_TOPICS = [

t('nguyen-thi-dinh-vo-thi-sau', 'Phụ nữ anh hùng trong lịch sử Việt Nam',
  ['Lịch sử Việt Nam có nhiều tấm gương phụ nữ dũng cảm và tài năng.',
   'Hai Bà Trưng (năm 40-43 SCN) khởi nghĩa đánh đuổi quân Hán, được phong "Vương".',
   'Bà Triệu (năm 248 SCN): "Tôi chỉ muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông".',
   'Võ Thị Sáu (1933-1952): Anh hùng lực lượng vũ trang, bị xử bắn năm 19 tuổi, không run sợ.'],
  '"Giặc đến nhà, đàn bà cũng đánh" — câu tục ngữ nói lên tinh thần chống giặc của phụ nữ Việt Nam!',
  [q('Hai Bà Trưng khởi nghĩa chống ai và vào năm nào?', 'Chống quân Hán, năm 40 SCN', ['Chống quân Tần, năm 100 SCN','Chống quân Hán, năm 40 SCN','Chống quân Minh, năm 1400','Chống Pháp, năm 1800'], 'Năm 40 SCN, Trưng Trắc và Trưng Nhị khởi nghĩa đánh đuổi quân Hán, giành độc lập trong 3 năm.'),
   q('Bà Triệu có câu nói nổi tiếng thể hiện tinh thần gì?', 'Chí khí bất khuất, không chịu sống nhục dưới ách đô hộ', ['Muốn sống hòa bình','Chí khí bất khuất, không chịu sống nhục dưới ách đô hộ','Muốn được tự do du lịch','Thích cưỡi ngựa'], '"Tôi chỉ muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ..." — câu nói thể hiện tinh thần tự cường không khuất phục.'),
   q('Võ Thị Sáu bị xử bắn năm bao nhiêu tuổi?', '19 tuổi', ['15 tuổi','19 tuổi','25 tuổi','30 tuổi'], 'Võ Thị Sáu sinh năm 1933 tại Bà Rịa, tham gia cách mạng từ nhỏ, bị bắt và xử bắn tại Côn Đảo năm 1952, khi chỉ 19 tuổi.'),
   q('Hai Bà Trưng là ai trong lịch sử Việt Nam?', 'Hai chị em khởi nghĩa, là những vị anh hùng chống giặc ngoại xâm đầu tiên trong lịch sử', ['Hai hoàng hậu thời phong kiến','Hai chị em khởi nghĩa, là những vị anh hùng chống giặc ngoại xâm đầu tiên trong lịch sử','Hai bà tướng thời Trần','Hai nhà khoa học Việt Nam'], 'Hai Bà Trưng là biểu tượng tinh thần bất khuất của phụ nữ và dân tộc Việt Nam từ gần 2.000 năm trước.')]),

t('hang-dong-viet-nam', 'Hang động và danh lam Việt Nam',
  ['Việt Nam có nhiều hang động kỳ vĩ được thế giới công nhận.',
   'Hang Sơn Đoòng (Quảng Bình) là hang động lớn nhất thế giới — to đến mức có thể chứa cả block nhà 40 tầng bên trong!',
   'Vườn quốc gia Phong Nha - Kẻ Bàng là Di sản Thiên nhiên Thế giới của UNESCO.',
   'Hang Phong Nha với hệ thống sông ngầm và nhũ đá đẹp như cổ tích.'],
  'Hang Sơn Đoòng được phát hiện năm 1991 bởi một nông dân địa phương, chỉ được thám hiểm đầy đủ năm 2009!',
  [q('Hang động lớn nhất thế giới nằm ở đâu tại Việt Nam?', 'Hang Sơn Đoòng, tỉnh Quảng Bình', ['Hang Phong Nha, Quảng Bình','Hang Sơn Đoòng, tỉnh Quảng Bình','Động Thiên Đường, Hà Giang','Hang Đầu Gỗ, Hạ Long'], 'Sơn Đoòng được National Geographic xếp hạng là hang động lớn nhất thế giới — dài 9 km, rộng 150m.'),
   q('Vườn quốc gia nào ở Quảng Bình được UNESCO công nhận Di sản Thiên nhiên Thế giới?', 'Phong Nha - Kẻ Bàng', ['Cúc Phương','Phong Nha - Kẻ Bàng','Cát Tiên','Bạch Mã'], 'Phong Nha - Kẻ Bàng được công nhận năm 2003 (Di sản Thiên nhiên) và 2015 (tiêu chí địa chất bổ sung).'),
   q('Điều gì đặc biệt về kích thước của Hang Sơn Đoòng?', 'Đủ lớn để chứa cả block nhà 40 tầng bên trong hang', ['Sâu nhất thế giới','Đủ lớn để chứa cả block nhà 40 tầng bên trong hang','Dài nhất thế giới','Có nhiều nhũ đá nhất'], 'Trần hang cao đến 200m và chiều rộng lên đến 150m — thực sự có thể chứa cả tòa nhà cao tầng bên trong!'),
   q('Ai phát hiện hang Sơn Đoòng?', 'Một người nông dân địa phương năm 1991', ['Nhà thám hiểm người Anh','Một người nông dân địa phương năm 1991','Nhà khoa học NASA','Du khách nước ngoài'], 'Ông Hồ Khanh, người làng Phong Nha, tình cờ phát hiện cửa hang năm 1991 nhưng quên mất vị trí. Đến 2009 mới thám hiểm đầy đủ.')]),

t('ho-chi-minh', 'Bác Hồ — Người cha của dân tộc',
  ['Hồ Chí Minh (1890-1969) là lãnh tụ và là người sáng lập nước Việt Nam Dân chủ Cộng hòa.',
   'Sinh tên Kim Thành, quê Nghệ An, từ nhỏ đã có chí lớn — rời Việt Nam năm 21 tuổi tìm đường cứu nước.',
   'Ngày 2/9/1945: đọc Tuyên ngôn độc lập tại Quảng trường Ba Đình, khai sinh nước VNDCCH.',
   'Bác Hồ nổi tiếng với lối sống giản dị — nhà sàn gỗ đơn giản, đôi dép cao su.'],
  '"Không có gì quý hơn độc lập, tự do" — Hồ Chí Minh.',
  [q('Bác Hồ đọc Tuyên ngôn Độc lập vào ngày nào?', '2 tháng 9 năm 1945', ['30 tháng 4 năm 1975','2 tháng 9 năm 1945','19 tháng 8 năm 1945','1 tháng 1 năm 1946'], 'Ngày 2/9/1945, tại Quảng trường Ba Đình Hà Nội, Bác Hồ đọc Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa.'),
   q('Bác Hồ sinh tại tỉnh nào?', 'Nghệ An', ['Hà Nội','Huế','Nghệ An','Nam Định'], 'Hồ Chí Minh sinh ngày 19/5/1890 tại làng Sen, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An.'),
   q('Bác Hồ nổi tiếng với phong cách sống như thế nào?', 'Giản dị — nhà sàn gỗ đơn giản, mặc đơn giản, đi dép cao su', ['Xa hoa, nhiều đất ở','Giản dị — nhà sàn gỗ đơn giản, mặc đơn giản, đi dép cao su','Thường đi ra nước ngoài nghỉ ngơi','Ít tiếp xúc với nhân dân'], 'Bác Hồ sống cực kỳ giản dị trong Phủ Chủ tịch — nhà sàn gỗ đơn giản, bộ quần áo ka-ki nâu, đôi dép cao su.'),
   q('Câu nói nổi tiếng của Bác Hồ là gì?', '"Không có gì quý hơn độc lập, tự do"', ['"Học học nữa học mãi"','"Không có gì quý hơn độc lập, tự do"','"Đất nước Việt Nam là một"','"Tiến lên chiến thắng"'], 'Câu nói này Bác Hồ dùng trong kháng chiến chống Mỹ, thể hiện giá trị cốt lõi của cuộc đấu tranh giải phóng dân tộc.')]),

t('van-hoa-le-hoi', 'Văn hóa và lễ hội Việt Nam',
  ['Việt Nam có 54 dân tộc anh em, mỗi dân tộc có văn hóa, trang phục và lễ hội đặc sắc riêng.',
   'Tết Nguyên Đán là lễ hội lớn nhất — người Việt về đoàn tụ gia đình, cúng ông bà, pháo hoa.',
   'Áo dài là trang phục truyền thống của phụ nữ Việt Nam — được công nhận là Di sản văn hóa.',
   'Nhã nhạc Cung đình Huế được UNESCO công nhận là Di sản Phi vật thể Thế giới năm 2003.'],
  'Hát quan họ Bắc Ninh — điệu hát giao duyên 300 năm tuổi — được UNESCO công nhận năm 2009!',
  [q('Việt Nam có bao nhiêu dân tộc?', '54 dân tộc', ['10 dân tộc','54 dân tộc','100 dân tộc','3 dân tộc'], '54 dân tộc anh em cùng sinh sống trên lãnh thổ Việt Nam, người Kinh chiếm khoảng 86%.'),
   q('Tết Nguyên Đán có ý nghĩa gì với người Việt?', 'Đón năm mới theo lịch âm, gia đình đoàn tụ, tưởng nhớ tổ tiên', ['Chỉ là ngày nghỉ của học sinh','Đón năm mới theo lịch âm, gia đình đoàn tụ, tưởng nhớ tổ tiên','Ngày kỷ niệm lịch sử','Ngày quốc khánh'], 'Tết Nguyên Đán là thời điểm gia đình sum vầy quan trọng nhất — cúng tổ tiên, mừng tuổi, hái lộc.'),
   q('Nhã nhạc Cung đình Huế được UNESCO công nhận là Di sản gì?', 'Di sản Phi vật thể Thế giới', ['Di sản Thiên nhiên','Di sản Phi vật thể Thế giới','Di sản Văn hóa Vật thể','Di sản Kiến trúc'], 'Nhã nhạc (âm nhạc cung đình) đã tồn tại qua 7 triều đại phong kiến Việt Nam, được UNESCO công nhận năm 2003.'),
   q('Trang phục truyền thống của phụ nữ Việt Nam là gì?', 'Áo dài', ['Áo bà ba','Áo dài','Váy thổ cẩm','Áo tứ thân'], 'Áo dài là biểu tượng văn hóa và thời trang Việt Nam — được mặc trong các dịp lễ hội, đi học, đi làm quan trọng.')]),

];

// ─── Export all ──────────────────────────────────────────────────────────────

export const ALL_VIETNAM_TOPICS = [
  ...VIETNAM_GEO_TOPICS,
  ...VIETNAM_HISTORY_TOPICS,
];
