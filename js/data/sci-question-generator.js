/**
 * MEUW ACADEMY — sci-question-generator.js
 *
 * Real Khoa học 4 (KNTT) questions drawn from actual SGK content.
 * Each bank covers a specific lesson topic with 6-8 MCQ questions.
 *
 * Principle: EVERY question must test actual science knowledge,
 * not meta-study habits. A parent or teacher would genuinely ask these.
 *
 * Source: Khoa học 4, Kết nối tri thức với cuộc sống (KNTT), NXB GD.
 */

function makeQ(question, answer, others, explanation) {
  const uniqueOthers = others.filter((opt, i, arr) => opt !== answer && arr.indexOf(opt) === i);
  const opts = [answer, ...uniqueOthers].slice(0, 4);
  return { type: 'multiple-choice', question, answer, options: opts, explanation };
}

// ─── Lesson question banks ──────────────────────────────────────────────────

const BANKS = {

  // Bài 1: Tính chất của nước
  'tinh-chat-cua-nuoc': [
    makeQ('Nước tinh khiết có màu gì?', 'Không màu, trong suốt',
      ['Màu xanh nhạt', 'Màu trắng đục', 'Có màu tùy ánh sáng'],
      'Nước tinh khiết không có màu, không mùi, không vị — trong suốt và có thể nhìn xuyên qua.'),
    makeQ('Điều gì xảy ra khi đổ nước vào một chiếc cốc?', 'Nước có hình dạng của cốc (lấy hình dạng của vật chứa)',
      ['Nước vẫn giữ hình dạng cũ', 'Nước bốc hơi ngay', 'Nước đặc lại'],
      'Chất lỏng không có hình dạng cố định — nước luôn lấy hình dạng của vật chứa nó.'),
    makeQ('Nước chảy theo hướng nào?', 'Từ cao xuống thấp (chảy xuôi dốc)',
      ['Từ thấp lên cao', 'Theo chiều ngang', 'Theo hướng gió'],
      'Trọng lực kéo nước chảy xuống chỗ thấp hơn — đây là lý do sông chảy ra biển.'),
    makeQ('Tại sao nước được gọi là "dung môi vạn năng"?', 'Nước có thể hòa tan rất nhiều chất: đường, muối, nhiều khoáng chất...',
      ['Nước uống được', 'Nước không màu không mùi', 'Nước có ở khắp nơi'],
      'Nước hòa tan muối, đường, nhiều khí và khoáng chất — quan trọng cho sinh vật sống.'),
    makeQ('Vật nào sau đây tan được trong nước?', 'Muối ăn',
      ['Cát', 'Dầu ăn', 'Đá sỏi'],
      'Muối ăn (NaCl) tan trong nước tạo thành dung dịch mặn. Cát, sỏi, dầu không tan trong nước.'),
    makeQ('Nước sạch có vị gì?', 'Không vị (nhạt)',
      ['Vị ngọt nhẹ', 'Vị mặn', 'Vị chua nhẹ'],
      'Nước tinh khiết không có vị. Nước có vị lạ (mặn, chua, đắng) là dấu hiệu bị nhiễm các chất khác.'),
  ],

  // Bài 2: Sự chuyển thể của nước và vòng tuần hoàn
  'vong-tuan-hoan-nuoc': [
    makeQ('Nước đóng băng ở nhiệt độ nào?', '0°C (0 độ C)',
      ['10°C', '-10°C', '100°C'],
      'Nước chuyển từ lỏng sang rắn (đóng băng) ở đúng 0°C. Dưới 0°C, nước ở trạng thái băng.'),
    makeQ('Nước sôi và bốc hơi ở nhiệt độ nào (ở mực nước biển)?', '100°C',
      ['80°C', '50°C', '120°C'],
      'Ở mực nước biển, nước sôi ở 100°C và chuyển thành hơi nước. Trên núi cao, nước sôi dưới 100°C do áp suất thấp hơn.'),
    makeQ('Mây được hình thành từ đâu?', 'Hơi nước bốc lên, gặp lạnh ngưng tụ thành các hạt nước li ti',
      ['Khói từ núi lửa', 'Không khí bị nén lại', 'Bụi và khí quyển'],
      'Hơi nước từ đại dương, sông hồ bốc lên cao, gặp không khí lạnh, ngưng tụ thành hạt nước li ti tạo thành mây.'),
    makeQ('Vòng tuần hoàn của nước diễn ra như thế nào?', 'Bay hơi → ngưng tụ thành mây → mưa → chảy xuống sông hồ → bay hơi lại',
      ['Mưa → đóng băng → tan chảy → mưa', 'Bay hơi → gió → mưa axit', 'Biển → sông → hồ → biển'],
      'Vòng tuần hoàn nước: nước bốc hơi lên, ngưng tụ thành mây, rơi xuống thành mưa/tuyết, chảy vào sông hồ, rồi lại bốc hơi.'),
    makeQ('Tại sao mặt kính lạnh bị "đổ mồ hôi" khi để trong phòng ấm?', 'Hơi nước trong không khí ấm tiếp xúc với kính lạnh → ngưng tụ thành giọt nước',
      ['Kính thấm nước từ không khí', 'Kính tiết ra nước khi lạnh', 'Không khí ép nước vào kính'],
      'Ngưng tụ: hơi nước gặp bề mặt lạnh → chuyển thành nước lỏng. Tương tự hiện tượng sương buổi sáng.'),
    makeQ('Tuyết là gì?', 'Hơi nước đóng băng thành tinh thể đá nhỏ rơi xuống từ mây',
      ['Mưa rất lạnh', 'Cát trắng từ núi', 'Bọt khí đông đặc'],
      'Tuyết hình thành khi hơi nước trong mây đóng băng trực tiếp thành tinh thể đá (không qua dạng lỏng) rồi rơi xuống.'),
  ],

  // Bài 3: Ô nhiễm và bảo vệ nguồn nước
  'o-nhiem-nuoc': [
    makeQ('Điều nào sau đây gây ô nhiễm nguồn nước?', 'Đổ rác thải công nghiệp xuống sông',
      ['Trồng cây ven sông', 'Vớt rác trên mặt hồ', 'Xây bể lọc nước'],
      'Chất thải công nghiệp chứa kim loại nặng, hóa chất độc hại — rất nguy hiểm cho sinh vật và người dùng nước.'),
    makeQ('Cách nào giúp làm sạch nước đục?', 'Lọc qua cát và sỏi, sau đó đun sôi',
      ['Thêm đường vào nước', 'Để lâu nước tự sạch', 'Khuấy mạnh rồi uống'],
      'Lọc qua cát/sỏi loại bỏ cặn bẩn; đun sôi diệt vi khuẩn. Đây là cách làm sạch nước cơ bản khi không có thiết bị lọc.'),
    makeQ('Tại sao không nên uống nước từ ao hồ chưa qua xử lý?', 'Nước chưa xử lý có thể chứa vi khuẩn, vi rút và các chất độc hại',
      ['Vì nước ao hồ rất lạnh', 'Vì nước ao có vị đắng', 'Vì nước ao không có oxy'],
      'Nước tự nhiên chứa nhiều vi sinh vật gây bệnh (thương hàn, tả, kiết lỵ) và chất ô nhiễm. Phải đun sôi hoặc xử lý trước khi uống.'),
    makeQ('Hành động nào bảo vệ nguồn nước?', 'Dùng thuốc trừ sâu theo đúng hướng dẫn và không đổ xuống nguồn nước',
      ['Tưới cây bằng nước thải sinh hoạt', 'Vứt pin cũ xuống ao', 'Rửa xe máy trực tiếp trên bờ sông'],
      'Thuốc trừ sâu dùng sai lượng và đổ bừa xuống nguồn nước gây ô nhiễm nghiêm trọng, ảnh hưởng chuỗi thức ăn.'),
    makeQ('Nước sinh hoạt ở thành phố được xử lý thế nào trước khi vào nhà?', 'Lọc, khử trùng bằng clo, kiểm tra chất lượng tại nhà máy nước',
      ['Chỉ lọc qua cát', 'Đun sôi rồi làm lạnh', 'Thêm muối và lọc'],
      'Nhà máy nước: lắng cặn → lọc → khử trùng bằng clo → kiểm tra chất lượng → phân phối. Quy trình đảm bảo nước an toàn.'),
  ],

  // Bài 4: Không khí — tính chất và thành phần
  'tinh-chat-khong-khi': [
    makeQ('Không khí xung quanh ta gồm những thành phần chính nào?', 'Khoảng 78% nitơ, 21% oxy và một số khí khác',
      ['100% oxy', '50% oxy và 50% CO₂', '90% oxy và 10% nitơ'],
      'Không khí chủ yếu là nitơ (N₂) ~78% và oxy (O₂) ~21%. Chỉ có ~0.04% là CO₂, nhưng CO₂ rất quan trọng cho quang hợp và điều hòa khí hậu.'),
    makeQ('Khí nào trong không khí cần thiết cho sự hô hấp của người và động vật?', 'Oxy (O₂)',
      ['Nitơ (N₂)', 'CO₂ (khí carbon dioxide)', 'Hơi nước'],
      'Tế bào cơ thể cần oxy để "đốt" chất dinh dưỡng tạo năng lượng. Thiếu oxy 4-6 phút có thể gây tổn thương não vĩnh viễn.'),
    makeQ('Tại sao không khí trong chai kín nặng hơn chai rỗng (không có không khí)?', 'Không khí có khối lượng, dù nhẹ',
      ['Chai kín giữ nhiệt hơn', 'Không khí không có khối lượng', 'Không có sự khác biệt'],
      'Không khí có khối lượng thực (khoảng 1.2 kg mỗi mét khối). Chứng minh: bơm lốp xe → lốp nặng hơn khi có nhiều không khí.'),
    makeQ('Không khí có thể bị nén (ép vào không gian nhỏ hơn) không?', 'Có — không khí có thể bị nén',
      ['Không — không khí không thể nén được', 'Chỉ có oxy mới bị nén', 'Chỉ bị nén khi lạnh'],
      'Khí có thể bị nén (compressed) — đây là nguyên lý của lốp xe, bình khí nén. Không như chất lỏng, chất khí nén được nhiều.'),
    makeQ('Khí gì cây xanh hấp thụ và con người thải ra?', 'CO₂ (khí carbon dioxide)',
      ['O₂ (oxy)', 'N₂ (nitơ)', 'H₂ (hidro)'],
      'Chu trình: người thở ra CO₂ → cây hấp thụ CO₂ để quang hợp → tạo O₂ cho người thở. Mối quan hệ cộng sinh tuyệt vời!'),
  ],

  // Bài 5: Vai trò của không khí
  'vai-tro-khong-khi': [
    makeQ('Điều gì xảy ra nếu đốt một cây nến rồi úp cốc kín lên?', 'Nến tắt vì hết oxy trong cốc',
      ['Nến cháy mạnh hơn', 'Nến cháy bình thường', 'Nến đổi màu'],
      'Cháy cần oxy. Khi úp cốc kín, oxy trong cốc bị dùng hết → lửa tắt. Đây cũng là nguyên lý bình chữa cháy CO₂.'),
    makeQ('Tại sao phi hành gia phải mang bình oxy khi ra ngoài không gian?', 'Ngoài vũ trụ không có không khí chứa oxy để thở',
      ['Để bay nhanh hơn', 'Vì trọng lực không cho thở', 'Vì ngoài vũ trụ quá lạnh để mở miệng'],
      'Ngoài khí quyển Trái Đất là chân không — không có không khí, không có oxy. Không có bình oxy, con người ngất trong 15 giây.'),
    makeQ('Không khí ô nhiễm ảnh hưởng đến sức khỏe thế nào?', 'Gây bệnh đường hô hấp, hen suyễn, ung thư phổi và nhiều bệnh khác',
      ['Chỉ làm hắt hơi nhẹ', 'Không ảnh hưởng nếu ăn đủ dinh dưỡng', 'Chỉ ảnh hưởng người già'],
      'Bụi mịn PM2.5, khí NO₂, SO₂ từ xe cộ và nhà máy xâm nhập sâu vào phổi, gây viêm và tổn thương mô phổi lâu dài.'),
    makeQ('Hành động nào giúp bảo vệ bầu không khí?', 'Đi xe đạp, xe buýt thay vì xe máy; trồng thêm cây xanh',
      ['Đốt rác ngoài trời', 'Dùng than sưởi ấm trong nhà kín', 'Xịt bình xịt nhiều'],
      'Phương tiện dùng nhiên liệu hóa thạch thải CO₂ và bụi mịn. Cây xanh hấp thụ CO₂, giảm nhiệt, cải thiện chất lượng không khí.'),
  ],

  // Bài 6: Gió và bão
  'gio-bao': [
    makeQ('Gió hình thành do nguyên nhân nào?', 'Không khí di chuyển từ vùng áp suất cao đến vùng áp suất thấp',
      ['Trái Đất quay', 'Mặt Trời hút không khí', 'Mây kéo không khí'],
      'Khi mặt trời đốt nóng mặt đất không đều, không khí nóng nhẹ bốc lên → tạo vùng áp thấp → không khí lạnh từ nơi khác tràn vào → tạo gió.'),
    makeQ('Bão hình thành từ đâu?', 'Từ vùng biển nhiệt đới ấm, khi nước bay hơi nhiều tạo vùng áp thấp mạnh',
      ['Từ núi cao', 'Từ cực Bắc', 'Từ chỗ có nhiều cây'],
      'Bão nhiệt đới (typhoon) hình thành trên biển ấm khi hơi nước nóng bốc lên mạnh, tạo vùng áp thấp cực lớn, hút không khí xoáy vào.'),
    makeQ('Khi có bão, cần làm gì để an toàn?', 'Ở trong nhà kiên cố, tránh xa cửa sổ và cây to; tuân theo hướng dẫn của chính quyền',
      ['Ra ngoài để xem bão', 'Trú dưới cây to cho mát', 'Mở cửa sổ cho gió lùa'],
      'Gió bão có thể trên 100 km/h, cuốn đổ cây, vật nặng. Ở trong nhà kiên cố, xa cửa sổ là an toàn nhất.'),
    makeQ('Gió có lợi ích gì?', 'Quay cối xay gió phát điện; làm mát; phát tán hạt giống và phấn hoa',
      ['Gió không có lợi ích', 'Chỉ gây hại cây cối', 'Chỉ dùng để phơi quần áo'],
      'Gió: làm mát người và môi trường; quay tua-bin phát điện (điện gió); giúp thực vật phát tán hạt và thụ phấn; làm lạnh nước biển.'),
  ],

  // Bài 8: Ánh sáng và sự truyền ánh sáng
  'anh-sang-truyen': [
    makeQ('Ánh sáng truyền theo đường nào trong môi trường đồng nhất?', 'Đường thẳng',
      ['Đường cong', 'Đường xoắn ốc', 'Lan ra tất cả hướng nhưng không phải đường thẳng'],
      'Ánh sáng truyền theo đường thẳng trong môi trường đồng nhất — đây là lý do bóng có hình dạng rõ ràng và không bị bẻ cong.'),
    makeQ('Bóng tối hình thành khi nào?', 'Khi vật chắn sáng ngăn ánh sáng đến một vùng phía sau nó',
      ['Khi mắt nhắm lại', 'Khi trời nhiều mây', 'Khi nhiệt độ thấp'],
      'Vật cản quang (opaque object) chặn đường đi thẳng của ánh sáng → tạo vùng không có ánh sáng = bóng tối.'),
    makeQ('Ánh sáng Mặt Trời đến Trái Đất mất bao lâu?', 'Khoảng 8 phút',
      ['1 giây', '1 giờ', '1 ngày'],
      'Ánh sáng di chuyển 300 000 km/giây. Khoảng cách Trái Đất-Mặt Trời ~150 triệu km → mất ~500 giây (~8 phút).'),
    makeQ('Vật nào trong suốt cho ánh sáng đi qua hoàn toàn?', 'Kính trong (thủy tinh sạch)',
      ['Gỗ', 'Tờ giấy trắng dày', 'Tường gạch'],
      'Vật trong suốt (transparent): kính sạch, nước trong — ánh sáng đi qua gần hoàn toàn. Vật mờ đục (opaque): gỗ, kim loại, gạch.'),
    makeQ('Hiện tượng nhật thực xảy ra khi nào?', 'Mặt Trăng đứng giữa Mặt Trời và Trái Đất, che khuất Mặt Trời',
      ['Trái Đất che Mặt Trăng', 'Mặt Trời che Trái Đất', 'Trái Đất quay xa Mặt Trời'],
      'Nhật thực: Mặt Trăng — Trái Đất — Mặt Trời thẳng hàng, Mặt Trăng chắn ánh sáng Mặt Trời. Nguyệt thực ngược lại: Trái Đất ở giữa.'),
  ],

  // Bài 10-11: Âm thanh
  'am-thanh': [
    makeQ('Âm thanh được tạo ra như thế nào?', 'Do vật rung động tạo ra sóng âm lan truyền qua môi trường',
      ['Do không khí chuyển động tự nhiên', 'Do nhiệt độ thay đổi', 'Do ánh sáng va chạm'],
      'Gảy dây đàn, gõ trống, vỗ tay → vật rung động → tạo sóng nén lan qua không khí → tai nghe được âm thanh.'),
    makeQ('Âm thanh có thể truyền qua những môi trường nào?', 'Chất rắn, lỏng và khí — nhưng không qua chân không',
      ['Chỉ qua không khí', 'Chỉ qua nước và không khí', 'Qua tất cả kể cả chân không'],
      'Âm thanh cần môi trường vật chất để truyền. Ngoài vũ trụ (chân không) không có âm thanh — vụ nổ cũng không nghe được!'),
    makeQ('Tại sao đặt tai xuống đường ray tàu hỏa nghe tiếng tàu sớm hơn nghe bằng tai thường?', 'Âm thanh truyền qua chất rắn (ray thép) nhanh hơn qua không khí',
      ['Mắt nhìn xa hơn tai nghe', 'Ray làm khuếch đại âm thanh', 'Không có sự khác biệt'],
      'Tốc độ âm trong thép ~5100 m/s; trong không khí ~340 m/s. Thép dẫn âm nhanh gấp 15 lần không khí!'),
    makeQ('Tiếng ồn ảnh hưởng đến sức khỏe như thế nào?', 'Gây điếc tai, mất ngủ, căng thẳng và ảnh hưởng tim mạch',
      ['Chỉ gây khó chịu nhẹ', 'Không ảnh hưởng sức khỏe', 'Chỉ ảnh hưởng người già'],
      'Tiếng ồn > 85 dB kéo dài gây tổn thương tế bào lông trong ốc tai → mất thính giác. Nhà máy, công trường, nhạc quá to đều nguy hiểm.'),
    makeQ('Cách nào giảm tiếng ồn hiệu quả trong gia đình?', 'Lắp cửa sổ cách âm, dùng thảm và rèm dày',
      ['Nói to hơn để át tiếng ồn', 'Bật quạt để che tiếng ồn', 'Không có cách nào'],
      'Vật liệu xốp, mềm (thảm, rèm, bọt xốp) hấp thụ sóng âm tốt. Kính hai lớp cũng cách âm hiệu quả.'),
  ],

  // Bài 12-13: Nhiệt độ và vật dẫn nhiệt
  'nhiet-do-dan-nhiet': [
    makeQ('Nhiệt truyền từ đâu đến đâu?', 'Từ vật nóng hơn sang vật lạnh hơn cho đến khi cân bằng nhiệt độ',
      ['Từ lạnh sang nóng', 'Nhiệt không di chuyển', 'Tùy thuộc vào màu sắc vật'],
      'Nhiệt luôn chảy từ nóng sang lạnh — nước đá để ra ngoài tan (nóng truyền vào đá); cốc nước nóng nguội dần (nhiệt thoát ra không khí).'),
    makeQ('Vật liệu nào dẫn nhiệt tốt nhất?', 'Kim loại (sắt, đồng, nhôm)',
      ['Gỗ', 'Nhựa', 'Bọt xốp'],
      'Kim loại có nhiều electron tự do → truyền nhiệt nhanh. Đồng, nhôm, sắt dẫn nhiệt tốt — lý do chảo nấu ăn làm bằng kim loại.'),
    makeQ('Tại sao cán chảo thường làm bằng gỗ hoặc nhựa?', 'Gỗ và nhựa dẫn nhiệt kém, tránh bỏng tay khi cầm',
      ['Vì gỗ rẻ hơn', 'Vì gỗ nhẹ hơn kim loại', 'Vì quy định an toàn bắt buộc'],
      'Gỗ và nhựa là vật cách nhiệt tốt (dẫn nhiệt kém) — cầm vào không bị bỏng. Áp dụng khi làm lót ấm, áo rét, phích nước.'),
    makeQ('Mặc áo len dày vào mùa đông giúp ấm như thế nào?', 'Len dẫn nhiệt kém, giữ lớp không khí ấm sát người, ngăn nhiệt cơ thể thoát ra',
      ['Len tự sinh nhiệt', 'Len hút nhiệt từ Mặt Trời', 'Len che gió'],
      'Áo len KHÔNG tạo ra nhiệt — nó GIỮ nhiệt từ cơ thể người không thoát ra ngoài. Lớp không khí trong sợi len chính là lớp cách nhiệt.'),
    makeQ('Nhiệt kế đo nhiệt độ bằng nguyên lý gì?', 'Chất lỏng (thủy ngân/cồn) nở ra khi nóng, co lại khi lạnh',
      ['Đo lực từ của nhiệt', 'Đếm số phân tử chuyển động', 'Màu sắc thay đổi theo nhiệt'],
      'Chất lỏng giãn nở vì nhiệt — khi nhiệt độ tăng, cột chất lỏng dài hơn. Vạch số trên nhiệt kế đọc được nhiệt độ chính xác.'),
  ],

  // Bài 15: Thực vật cần gì để sống
  'thuc-vat-can-gi': [
    makeQ('Thực vật cần những yếu tố nào để sống và phát triển?', 'Ánh sáng, nước, không khí (CO₂), khoáng chất và đất',
      ['Chỉ cần nước và đất', 'Chỉ cần ánh sáng', 'Nước và phân bón hóa học'],
      'Cây cần: ánh sáng (quang hợp), nước (dẫn truyền dưỡng chất), CO₂ (quang hợp), O₂ (hô hấp), khoáng chất (N, P, K...) từ đất.'),
    makeQ('Điều gì xảy ra với cây nếu để hoàn toàn trong bóng tối?', 'Cây không quang hợp được, thiếu thức ăn, lá vàng và cây chết dần',
      ['Cây phát triển nhanh hơn', 'Cây không ảnh hưởng gì', 'Cây chuyển sang hút chất từ đất nhiều hơn'],
      'Không có ánh sáng → không quang hợp → không tạo được đường (thức ăn) → cây "đói" và chết. Lá còn mất diệp lục, trở nên vàng.'),
    makeQ('Rễ cây có vai trò gì?', 'Hút nước và khoáng chất từ đất; giữ cây đứng vững',
      ['Quang hợp tạo thức ăn', 'Hô hấp thải CO₂', 'Dự trữ hạt giống'],
      'Rễ có hai chức năng chính: (1) hút nước và khoáng chất từ đất qua lông rễ; (2) neo cây vào đất, giữ vững trước gió bão.'),
    makeQ('Lá cây có vai trò gì?', 'Quang hợp tạo chất hữu cơ; hô hấp; thoát hơi nước',
      ['Hút nước từ đất', 'Giữ cây đứng vững', 'Hút khoáng chất'],
      'Lá là "nhà máy" của cây: chứa diệp lục để quang hợp, có khí khổng để trao đổi khí và thoát hơi nước điều hòa nhiệt độ.'),
  ],

  // Bài 16: Động vật cần gì để sống
  'dong-vat-can-gi': [
    makeQ('Động vật cần những yếu tố cơ bản nào để sống?', 'Thức ăn, nước uống, không khí (oxy) và môi trường sống phù hợp',
      ['Chỉ cần thức ăn và nước', 'Chỉ cần oxy', 'Thức ăn và ánh sáng'],
      'Mọi động vật cần: thức ăn (năng lượng và chất dinh dưỡng), nước, oxy (hô hấp) và môi trường phù hợp (nhiệt độ, nơi trú ẩn).'),
    makeQ('Tại sao cá chết khi nước bị ô nhiễm nặng?', 'Oxy hòa tan trong nước giảm và chất độc ảnh hưởng mang và cơ thể cá',
      ['Cá không thích nước bẩn về màu sắc', 'Nước bẩn quá nặng cá không bơi được', 'Nhiệt độ nước thay đổi'],
      'Ô nhiễm làm giảm O₂ hòa tan và tạo chất độc. Cá thở bằng mang hút O₂ từ nước — thiếu O₂ và ngộ độc khiến cá chết.'),
    makeQ('Gấu ngủ đông để làm gì?', 'Tiết kiệm năng lượng khi thức ăn khan hiếm và thời tiết lạnh giá',
      ['Vì gấu lười biếng mùa đông', 'Để tích lũy mỡ', 'Vì gấu bị bệnh vào mùa đông'],
      'Ngủ đông (hibernation): nhiệt độ cơ thể, nhịp tim, hô hấp giảm mạnh → tiết kiệm 75% năng lượng. Sống nhờ mỡ tích lũy từ mùa thu.'),
    makeQ('Tại sao động vật ở vùng lạnh thường có lớp mỡ dày hoặc lông dày?', 'Mỡ và lông cách nhiệt, giữ ấm cho cơ thể trong môi trường lạnh',
      ['Vì chúng ăn nhiều hơn', 'Vì lạnh làm lông mọc nhanh', 'Để bơi nhanh hơn'],
      'Cá voi, hải cẩu có lớp mỡ dày (blubber) cách nhiệt. Gấu Bắc Cực, cáo Bắc Cực có lông dày. Thích nghi tiến hóa cho sinh tồn.'),
  ],

  // Bài 19-21: Nấm
  'nam': [
    makeQ('Nấm khác thực vật ở điểm nào quan trọng nhất?', 'Nấm không có diệp lục, không quang hợp được — lấy chất hữu cơ từ môi trường',
      ['Nấm không có rễ', 'Nấm không cần nước', 'Nấm không có tế bào'],
      'Thực vật tự tạo ra thức ăn (tự dưỡng). Nấm không làm được — nó hấp thụ chất hữu cơ từ môi trường (dị dưỡng). Gần với động vật hơn!'),
    makeQ('Nấm độc nguy hiểm ở điểm nào?', 'Chứa chất độc mạnh có thể gây ngộ độc nặng và tử vong',
      ['Chỉ gây ngứa da', 'Gây mùi khó chịu', 'Chỉ độc khi ăn nhiều'],
      'Nấm độc như nấm Amanita phalloides chứa amatoxin — chỉ 1/3 cây đủ giết người. Độc tố tác động đến gan, thận rất nguy hiểm.'),
    makeQ('Làm thế nào để phân biệt nấm ăn được và nấm độc?', 'Không thể chắc chắn bằng mắt thường — cần người có chuyên môn hoặc không ăn nấm mọc hoang',
      ['Nấm đẹp màu sắc là nấm độc', 'Nấm độc thì đắng', 'Nếu không có mùi là ăn được'],
      'KHÔNG có quy tắc dân gian nào đáng tin để phân biệt! Màu, mùi, vị đều không đáng tin cậy. Nguyên tắc an toàn: chỉ ăn nấm mua ở cửa hàng, không ăn nấm mọc hoang.'),
    makeQ('Nấm mốc gây hỏng thực phẩm phát triển tốt trong điều kiện nào?', 'Ẩm ướt, ấm và có nhiều chất hữu cơ (thức ăn)',
      ['Khô ráo và lạnh', 'Nơi có nhiều ánh sáng', 'Nơi có nhiều oxy'],
      'Nấm mốc cần độ ẩm, nhiệt độ ấm (20-30°C) và chất hữu cơ. Bảo quản thực phẩm: giữ khô, lạnh và tránh tiếp xúc không khí.'),
    makeQ('Nấm có ích trong đời sống như thế nào?', 'Làm thức ăn (nấm rơm, nấm hương); làm thuốc (penicillin từ nấm mốc); lên men (rượu, bánh mì)',
      ['Chỉ làm mọc tóc nhanh hơn', 'Không có tác dụng gì', 'Chỉ dùng trang trí'],
      'Nấm ích: thực phẩm (nấm rơm, linh chi), y học (penicillin từ Penicillium), công nghiệp thực phẩm (men bia, bánh mì, tương, phomai).'),
    makeQ('Nấm sinh sản chủ yếu bằng cách nào?', 'Phát tán bào tử (spore) qua không khí',
      ['Đẻ trứng', 'Mọc chồi như thực vật', 'Phân đôi tế bào'],
      'Nấm tạo ra hàng tỉ bào tử nhỏ li ti phát tán qua gió, nước, côn trùng. Mỗi bào tử có thể nảy mầm thành nấm mới khi gặp điều kiện thuận lợi.'),
  ],

  // Bài 23-26: Dinh dưỡng và an toàn thực phẩm
  'dinh-duong-an-toan': [
    makeQ('Vitamin C có nhiều trong thực phẩm nào và có tác dụng gì?', 'Cam, chanh, ổi — giúp tăng sức đề kháng và hấp thu sắt',
      ['Thịt đỏ — tăng cơ bắp', 'Dầu ăn — cung cấp năng lượng', 'Gạo — cung cấp tinh bột'],
      'Vitamin C (ascorbic acid) trong cam, chanh, ổi, rau xanh: tăng miễn dịch, giúp hấp thu sắt, chống oxy hóa. Thiếu gây bệnh scurvy.'),
    makeQ('Tại sao cần ăn đủ chất đạm (protein)?', 'Protein xây dựng và sửa chữa tế bào, cơ bắp; tạo enzym và kháng thể',
      ['Để có màu da đẹp', 'Chỉ cần cho vận động viên', 'Để tiêu hóa tốt'],
      'Protein là "vật liệu xây dựng" của cơ thể — cấu tạo cơ, da, tóc, móng, enzyme, hormone, kháng thể. Thiếu protein còi cọc, giảm miễn dịch.'),
    makeQ('Dấu hiệu nào cho thấy thực phẩm đã bị hỏng?', 'Mùi lạ/khó chịu, màu sắc thay đổi, nổi nấm mốc, có nhớt',
      ['Thực phẩm lạnh hơn bình thường', 'Thực phẩm trông đẹp hơn', 'Thực phẩm không còn mùi'],
      'Thực phẩm hỏng: vi khuẩn và nấm mốc phân hủy protein/chất béo tạo mùi lạ, màu biến đổi, nhớt. KHÔNG ăn dù chỉ 1 phần bị mốc!'),
    makeQ('Ngộ độc thực phẩm thường do nguyên nhân nào?', 'Vi khuẩn (Salmonella, E.coli) hoặc độc tố từ vi khuẩn trong thức ăn không an toàn',
      ['Ăn quá nhiều', 'Ăn thức ăn quá nóng', 'Ăn không đúng giờ'],
      'Salmonella trong trứng sống/gà tái; E.coli trong rau chưa rửa; Staphylococcus trong thực phẩm để quá lâu ở nhiệt độ thường.'),
    makeQ('Tại sao cần rửa tay trước khi ăn?', 'Tay chứa vi khuẩn, virus có thể gây bệnh nếu đưa vào miệng',
      ['Vì phép lịch sự', 'Để thức ăn ngon hơn', 'Để diệt côn trùng trên tay'],
      'Tay tiếp xúc nhiều bề mặt và chứa hàng triệu vi khuẩn. Rửa tay đúng cách với xà phòng 20 giây giảm 99% vi khuẩn, ngăn tiêu chảy, cúm.'),
  ],

  // Bài 27: Phòng tránh đuối nước
  'phong-tranh-duoi-nuoc': [
    makeQ('Biển báo nào cho biết KHÔNG được bơi ở khu vực đó?', 'Biển cấm bơi lội (thường màu đỏ hoặc có hình gạch chéo)',
      ['Biển màu xanh lá', 'Biển có hình sóng', 'Biển có hình người bơi'],
      'Khu vực cấm bơi thường có dòng chảy mạnh, đáy nguy hiểm, ô nhiễm hoặc thiếu cứu hộ. Tuyệt đối tuân theo biển báo để bảo đảm an toàn.'),
    makeQ('Khi thấy người đuối nước, em nên làm gì đầu tiên?', 'Gọi to cầu cứu người lớn và gọi 113/115; KHÔNG nhảy xuống nếu không biết bơi và cứu hộ',
      ['Nhảy xuống kéo người lên ngay', 'Ném điện thoại vào để họ bám', 'Đứng xem và chờ'],
      'Người không biết bơi nhảy xuống cứu người đuối nước = hai người chết! Gọi cứu hộ, ném phao, dùng sào dài, dây thừng — an toàn hơn.'),
    makeQ('Điều kiện nào nguy hiểm nhất khi bơi lội?', 'Bơi một mình ở nơi vắng, nước chảy mạnh hoặc xa bờ không có cứu hộ',
      ['Bơi lúc trời nắng', 'Bơi ở hồ bơi có cứu hộ', 'Bơi cùng bạn bè'],
      'Nguy hiểm nhất: bơi một mình, nơi không có cứu hộ, nước xiết (dòng chảy ngầm), sau khi ăn no, hoặc thời tiết xấu.'),
    makeQ('Tại sao không nên bơi ngay sau khi ăn no?', 'Máu dồn về hệ tiêu hóa, cơ bắp (bao gồm cơ hô hấp) thiếu oxy, dễ chuột rút',
      ['Vì thức ăn làm nặng người', 'Vì bụng no thì không thở được', 'Không có lý do khoa học'],
      'Sau ăn, cơ thể tăng máu đến dạ dày và ruột. Cơ bắp nhận ít máu hơn, dễ chuột rút khi vận động mạnh. Đợi ít nhất 1 giờ sau ăn.'),
  ],

  // Bài 29-30: Chuỗi thức ăn
  'chuoi-thuc-an': [
    makeQ('Chuỗi thức ăn bắt đầu từ đâu?', 'Thực vật (sinh vật sản xuất) — chuyển hóa năng lượng mặt trời thành chất hữu cơ',
      ['Động vật ăn thịt lớn nhất', 'Vi khuẩn phân hủy', 'Nước và đất'],
      'Mọi chuỗi thức ăn bắt đầu từ thực vật (producer). Cây dùng ánh sáng quang hợp tạo đường → nguồn năng lượng cho toàn bộ hệ sinh thái.'),
    makeQ('Trong chuỗi thức ăn: Cỏ → Thỏ → Cáo → Đại bàng, con nào là sinh vật tiêu thụ bậc 1?', 'Thỏ (ăn cỏ trực tiếp)',
      ['Cáo', 'Đại bàng', 'Cỏ'],
      'Sinh vật tiêu thụ bậc 1 (primary consumer) = động vật ăn thực vật trực tiếp. Thỏ ăn cỏ → bậc 1; Cáo ăn thỏ → bậc 2; Đại bàng → bậc 3.'),
    makeQ('Điều gì xảy ra nếu thỏ trong chuỗi thức ăn tuyệt chủng?', 'Cáo và đại bàng thiếu thức ăn, số lượng giảm; cỏ tăng vọt vì không bị ăn',
      ['Cáo và đại bàng tự tìm thức ăn khác', 'Không có ảnh hưởng gì', 'Cỏ cũng tuyệt chủng theo'],
      'Chuỗi thức ăn liên kết chặt chẽ — loại bỏ một mắt xích ảnh hưởng toàn bộ. Đây là lý do bảo tồn đa dạng sinh học rất quan trọng.'),
    makeQ('Vi khuẩn và nấm phân hủy đóng vai trò gì trong chuỗi thức ăn?', 'Phân hủy xác sinh vật thành chất khoáng trả lại cho đất, đóng vòng tuần hoàn vật chất',
      ['Đứng đầu chuỗi thức ăn', 'Chỉ gây hại', 'Không có vai trò'],
      'Vi sinh vật phân hủy (decomposer): biến xác chết thành khoáng chất → cây hấp thụ → động vật ăn → xác chết → lại phân hủy. Vòng tuần hoàn vật chất!'),
    makeQ('Tại sao thực vật được gọi là "nền tảng của mọi chuỗi thức ăn"?', 'Vì chúng là sinh vật duy nhất có thể tạo ra năng lượng từ ánh sáng mặt trời',
      ['Vì chúng nhiều nhất', 'Vì động vật không ăn nhau', 'Vì chúng mọc ở khắp nơi'],
      'Thực vật chuyển đổi năng lượng mặt trời (vô cơ) thành chất hữu cơ — nguồn năng lượng duy nhất nuôi toàn bộ hệ sinh thái. Không có cây xanh, không có sự sống!'),
  ],

};

// ─── Topic → bank key mapping ───────────────────────────────────────────────

function pickBank(topicKey, lessonTitle) {
  const tk = String(topicKey || '').toLowerCase();
  const t  = String(lessonTitle || '').toLowerCase();
  const combined = `${tk} ${t}`;

  if (/tinh-chat-cua-nuoc|tinh chất của nước/.test(combined)) return BANKS['tinh-chat-cua-nuoc'];
  if (/vong-tuan-hoan|chuyen-the|vòng tuần hoàn|chuyển thể/.test(combined)) return BANKS['vong-tuan-hoan-nuoc'];
  if (/o-nhiem|ô nhiễm|bảo vệ nguồn nước|lam sach/.test(combined)) return BANKS['o-nhiem-nuoc'];
  if (/khong-khi.*tinh-chat|tinh-chat.*khong-khi|không khí có ở đâu|thành phần.*không khí/.test(combined)) return BANKS['tinh-chat-khong-khi'];
  if (/vai-tro.*khong-khi|bầu không khí/.test(combined)) return BANKS['vai-tro-khong-khi'];
  if (/gio|bao|gió|bão/.test(combined)) return BANKS['gio-bao'];
  if (/anh-sang.*truyen|truyền ánh sáng|ánh sáng và sự truyền/.test(combined)) return BANKS['anh-sang-truyen'];
  if (/vai-tro.*anh-sang|vai trò.*ánh sáng/.test(combined)) return BANKS['anh-sang-truyen'];
  if (/am-thanh|âm thanh/.test(combined)) return BANKS['am-thanh'];
  if (/nhiet-do|nhiet.*dan|nhiệt độ|dẫn nhiệt|vật dẫn nhiệt/.test(combined)) return BANKS['nhiet-do-dan-nhiet'];
  if (/thuc-vat.*can-gi|thực vật cần gì/.test(combined)) return BANKS['thuc-vat-can-gi'];
  if (/dong-vat.*can-gi|động vật cần gì/.test(combined)) return BANKS['dong-vat-can-gi'];
  if (/cham-soc.*cay|chăm sóc cây/.test(combined)) return BANKS['thuc-vat-can-gi'];
  if (/nam|nấm/.test(combined)) return BANKS['nam'];
  if (/dinh-duong|an-toan|dinh dưỡng|thực phẩm an toàn|chế độ ăn|bệnh liên quan/.test(combined)) return BANKS['dinh-duong-an-toan'];
  if (/duoi-nuoc|đuối nước/.test(combined)) return BANKS['phong-tranh-duoi-nuoc'];
  if (/chuoi-thuc-an|chuỗi thức ăn|vai trò.*thực vật.*chuỗi/.test(combined)) return BANKS['chuoi-thuc-an'];

  return null; // no match — caller should not use generateKnttLessonQuestions
}

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

/**
 * Generate real Khoa học 4 KNTT questions for a given topic.
 * Returns [] if the topic has no specific bank (caller should skip).
 *
 * @param {object} topic     - Catalog topic with topicKey, knttSource
 * @param {number} count     - Questions requested
 * @param {string} seedInput - Deterministic shuffle seed
 * @returns {Array}
 */
export function generateSciKnttQuestions(topic, count = 8, seedInput = '') {
  const topicKey = topic.topicKey || '';
  const lessonTitle = topic.knttSource?.lesson || topic.title || '';

  const bank = pickBank(topicKey, lessonTitle);
  if (!bank || bank.length === 0) return [];

  const shuffled = seededShuffle(bank, `${seedInput}|${topicKey}|sci`);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
