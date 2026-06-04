/**
 * MEUW ACADEMY — tech-question-generator.js
 *
 * Generates Công nghệ 4 (KNTT) questions from SGK content.
 *
 * Units:
 *   1. Công nghệ và đời sống (Bài 1-6): Hoa và cây cảnh trong chậu
 *   2. Thủ công kĩ thuật (Bài 7-12): Lắp ghép mô hình + đồ chơi dân gian
 *
 * Pedagogy: học qua thực hành, quy trình an toàn, vật liệu cụ thể.
 * Source: SGK Công nghệ 4 KNTT (NXBGD).
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

  // ── Bài 1-2: Lợi ích và các loại hoa, cây cảnh ────────────────────────
  'hoa-cay-canh': [
    q('Hoa và cây cảnh trong nhà mang lại lợi ích gì?',
      'Làm đẹp không gian sống, cải thiện không khí và tạo cảm giác thư giãn',
      ['Chỉ dùng để bán kiếm tiền', 'Thay thế rau xanh trong bữa ăn', 'Chỉ để làm màu sắc trong ảnh chụp'],
      'Cây xanh và hoa trong nhà giúp lọc không khí, giảm căng thẳng, làm đẹp góc học tập và phòng khách.'),
    q('Loại cây nào thường trồng trong chậu để trang trí trong nhà?',
      'Cây sen đá, cây lưỡi hổ, cây trầu bà',
      ['Cây lúa nước', 'Cây mía đường', 'Cây thông rừng'],
      'Cây sen đá, lưỡi hổ, trầu bà, kim tiền... là các loại phổ biến trồng chậu trong nhà vì dễ chăm sóc và chịu được ít ánh sáng.'),
    q('Điều kiện cơ bản để hoa và cây cảnh phát triển tốt là gì?',
      'Ánh sáng vừa đủ, tưới nước đúng lượng và đất có dinh dưỡng',
      ['Chỉ cần tưới nước thật nhiều mỗi ngày', 'Không cần ánh sáng, để trong tủ', 'Chỉ cần đặt gần cửa sổ mà không cần tưới'],
      'Mỗi loại cây có nhu cầu khác nhau, nhưng nhìn chung cần: ánh sáng (tự nhiên/đèn), nước vừa phải, đất thoáng khí.'),
    q('Tại sao nên trồng cây cảnh trong chậu thay vì trực tiếp xuống đất trong nhà?',
      'Chậu giúp kiểm soát lượng nước, di chuyển dễ dàng và giữ nhà gọn cảng',
      ['Vì cây sẽ chết nếu trồng xuống đất', 'Vì trong nhà không có ánh sáng', 'Vì chậu làm cây lớn nhanh hơn'],
      'Trồng chậu giúp điều tiết nước, tránh rễ cây làm hỏng sàn nhà, dễ di chuyển vào/ra theo mùa.'),
    q('Hoa hồng môn thường được trồng trong nhà vì lý do gì?',
      'Lá xanh bóng và hoa có màu sắc sặc sỡ, sống tốt trong bóng râm',
      ['Có thể ăn được lá', 'Làm thuốc chữa bệnh', 'Cây cao to để lấy gỗ'],
      'Hoa hồng môn là cây cảnh nội thất được ưa chuộng nhờ hoa màu đỏ/hồng hình tim rất đẹp và dễ sống trong nhà.'),
    q('Khi chọn cây cảnh để bàn học, em nên chọn loại cây như thế nào?',
      'Cây nhỏ gọn, chịu bóng tốt và không có gai nhọn nguy hiểm',
      ['Cây leo thật dài khắp phòng', 'Cây có mùi hương quá nồng', 'Cây cần phơi nắng 8 tiếng mỗi ngày'],
      'Góc học tập cần gọn gàng. Chọn cây nhỏ như sen đá, cẩm nhung sẽ giúp em thư giãn mà không chiếm chỗ hay gây xước tay.'),
    q('Việc tự tay chăm sóc một chậu cây cảnh giúp em rèn luyện đức tính gì?',
      'Sự kiên nhẫn, tỉ mỉ và tình yêu thiên nhiên',
      ['Sự nóng vội', 'Sức mạnh cơ bắp', 'Khả năng tính nhẩm'],
      'Cây cần thời gian để lớn lên. Quan sát và chăm sóc cây mỗi ngày giúp em rèn sự kiên nhẫn và sống chậm lại.'),
  ],

  // ── Bài 3-4: Vật liệu, dụng cụ và gieo hạt ────────────────────────────
  'trong-cay-chau': [
    q('Vật liệu nào cần có khi trồng cây cảnh trong chậu?',
      'Đất trồng, chậu, hạt giống hoặc cây giống, phân bón',
      ['Chỉ cần nước và ánh sáng', 'Cát biển và muối', 'Giấy và keo dán'],
      'Để trồng cây trong chậu cần: chậu phù hợp, đất tơi xốp giàu dinh dưỡng, hạt giống/cây giống và phân bón.'),
    q('Khi gieo hạt, cần làm gì để hạt nảy mầm tốt?',
      'Gieo đúng độ sâu, giữ ẩm đất và để nơi có ánh sáng vừa đủ',
      ['Tưới nước thật nhiều mỗi giờ', 'Để hạt ở nơi tối hoàn toàn', 'Gieo lên trên mặt đất không phủ đất'],
      'Hạt cần ẩm (không úng), không quá sâu (vùi 2-3 lần kích thước hạt) và ánh sáng nhẹ giúp nảy mầm.'),
    q('Dụng cụ nào hay dùng khi trồng cây cảnh trong chậu?',
      'Xẻng nhỏ, bình tưới nước, bao tay, khay ươm giống',
      ['Búa, đinh và kéo cắt kim loại', 'Máy tính và bút bi', 'Rổ tre và dao phay'],
      'Xẻng nhỏ để trộn đất; bình tưới để kiểm soát lượng nước; bao tay để bảo vệ da tay khi tiếp xúc đất, phân.'),
    q('Tại sao cần có lỗ thoát nước ở đáy chậu?',
      'Để nước dư thừa thoát ra, tránh cây bị úng rễ',
      ['Để cây hút thêm dinh dưỡng từ đất bên dưới', 'Để chậu trở nên nhẹ hơn', 'Để sâu bọ chui vào giúp cây'],
      'Đất ngập nước lâu làm rễ cây thiếu oxy, dẫn đến thối rễ. Lỗ thoát nước giúp tránh úng ngập.'),
    q('Trước khi cho đất vào chậu để trồng cây, em nên lót dưới đáy chậu thứ gì?',
      'Một lớp sỏi hoặc đá vụn nhỏ',
      ['Một lớp túi nilon kín', 'Một tờ giấy báo', 'Một nắm muối hạt'],
      'Lót sỏi/đá nhỏ ở đáy chậu giúp nước thừa thoát ra dễ dàng qua lỗ thoát nước mà không làm trôi đất đi.'),
    q('Phân bón có tác dụng gì đối với hoa và cây cảnh?',
      'Cung cấp chất dinh dưỡng để cây lớn nhanh, lá xanh và ra nhiều hoa',
      ['Làm cho đất cứng lại', 'Tiêu diệt côn trùng có hại', 'Giúp chậu cây nhẹ hơn'],
      'Cây giống như con người cần thức ăn. Phân bón chính là nguồn thức ăn bổ sung khi đất trong chậu cạn kiệt dinh dưỡng.'),
    q('Khi thao tác với đất và phân bón, em cần chú ý an toàn thế nào?',
      'Đeo găng tay, dùng xẻng nhỏ và rửa tay sạch bằng xà phòng sau khi làm xong',
      ['Dùng tay trần bốc phân bón', 'Lau tay vào quần áo', 'Ngửi thử xem phân bón có mùi gì'],
      'Đất và phân bón chứa nhiều vi khuẩn. Đeo găng tay và vệ sinh sạch sẽ giúp bảo vệ sức khỏe của em.'),
  ],

  // ── Bài 5-6: Trồng và chăm sóc cây ──────────────────────────────────
  'cham-soc-cay': [
    q('Tần suất tưới nước phù hợp cho cây cảnh trong chậu là bao nhiêu?',
      'Tùy loại cây: kiểm tra đất còn ẩm không rồi tưới, không tưới theo lịch cố định cho mọi cây',
      ['Tưới nước 10 lần mỗi ngày', 'Chỉ tưới một lần mỗi tháng', 'Không cần tưới nước nếu có ánh sáng'],
      'Mỗi loại cây có nhu cầu nước khác nhau. Quy tắc chung: cắm ngón tay vào đất 2-3 cm — nếu đất khô thì tưới.'),
    q('Dấu hiệu nào cho thấy cây đang thiếu nước?',
      'Lá héo, cuộn lại hoặc chuyển vàng; đất quá khô và nứt nẻ',
      ['Lá mọc rất xanh và to', 'Hoa nở rộ nhiều hơn bình thường', 'Đất ướt sũng và chảy nước'],
      'Cây thiếu nước sẽ báo hiệu bằng lá héo, mềm, cong xuống. Ngược lại, tưới quá nhiều làm lá vàng, rễ thối.'),
    q('Cần làm gì để cây trong chậu phát triển tốt lâu dài?',
      'Bón phân định kỳ, tỉa lá vàng, thay chậu lớn hơn khi cây lớn',
      ['Chỉ cần mua chậu mới mỗi tuần', 'Đặt cây trong tủ lạnh để bảo quản', 'Để cây tự lo không cần chăm sóc'],
      'Cây cần chăm sóc định kỳ: bón phân mỗi 1-2 tháng, tỉa cành lá xấu, thay chậu khi rễ đầy.'),
    q('Thời điểm tưới nước tốt nhất cho cây trong ngày là lúc nào?',
      'Sáng sớm hoặc chiều mát',
      ['Giữa trưa nắng gắt', 'Đúng 12 giờ đêm', 'Bất cứ lúc nào cũng được'],
      'Tưới lúc trưa nắng làm nước bốc hơi nhanh và cây dễ bị "sốc nhiệt". Sáng sớm hoặc chiều mát giúp cây hấp thụ nước tốt nhất.'),
    q('Tỉa bỏ lá vàng, cành khô có tác dụng gì cho cây cảnh?',
      'Giúp cây thông thoáng, phòng ngừa sâu bệnh và tập trung dinh dưỡng nuôi chồi mới',
      ['Làm cây nhanh chết hơn', 'Để cây mất đi vẻ đẹp tự nhiên', 'Để lá rụng xuống làm phân bón ngay lập tức'],
      'Lá vàng, úa là nơi nấm bệnh dễ phát triển. Việc cắt tỉa giúp cây gọn gàng, khỏe mạnh và thẩm mỹ hơn.'),
    q('Làm thế nào để vệ sinh lá cây cảnh trồng trong nhà (như cây lưỡi hổ, trầu bà)?',
      'Dùng khăn mềm ẩm lau nhẹ nhàng bề mặt lá',
      ['Dùng bàn chải chà mạnh', 'Xịt xà phòng giặt quần áo lên lá', 'Dùng giấy nhám chà cho bóng'],
      'Bụi bám trên lá làm giảm khả năng quang hợp (hấp thụ ánh sáng) của cây. Lau lá nhẹ nhàng bằng khăn ẩm giúp cây "thở" tốt hơn.'),
    q('Bắt sâu, nhổ cỏ dại trong chậu nhằm mục đích gì?',
      'Tránh để cỏ dại tranh giành dinh dưỡng với cây và ngăn sâu phá hoại lá',
      ['Để làm thức ăn cho động vật nuôi', 'Để làm cảnh cho đẹp chậu', 'Để cỏ dại bảo vệ rễ cây'],
      'Cỏ dại hút nước và chất màu của đất rất nhanh. Nhổ cỏ thường xuyên giúp chậu cây sạch sẽ và dồn sức nuôi cây chính.'),
  ],

  // ── Bài 7-9: Lắp ghép mô hình kĩ thuật ──────────────────────────────
  'lap-ghep-mo-hinh': [
    q('Trước khi lắp ghép mô hình kĩ thuật, bước nào quan trọng nhất?',
      'Đọc kỹ hướng dẫn và sắp xếp các bộ phận theo đúng thứ tự trước khi lắp',
      ['Lắp ghép ngay mà không cần đọc hướng dẫn', 'Dùng keo dán thay các ốc vít', 'Cắt bớt các chi tiết thừa'],
      'Đọc hướng dẫn trước giúp con biết cần bao nhiêu chi tiết, thứ tự lắp và những điểm cần chú ý.'),
    q('Mô hình bập bênh hoạt động theo nguyên lý gì?',
      'Đòn bẩy — khi một đầu bị nén xuống, đầu kia nhướng lên',
      ['Bánh răng quay tròn tạo lực', 'Nam châm hút đẩy hai đầu', 'Động cơ điện quay tự động'],
      'Bập bênh là đòn bẩy với điểm tựa ở giữa. Vật nặng hơn đầu nào thì đầu đó sẽ hạ xuống.'),
    q('Khi lắp ghép mô hình, cần chú ý điều gì về an toàn?',
      'Không dùng tay bẻ mạnh chi tiết nhựa; cẩn thận với ốc vít nhọn; dọn dẹp sau khi xong',
      ['Cắm điện ngay khi chưa lắp xong để kiểm tra', 'Để chi tiết nhỏ gần em bé', 'Dùng kéo sắc để cắt chi tiết nhựa'],
      'Các chi tiết nhỏ nguy hiểm cho em bé. Ốc vít có thể sắc. Không bẻ mạnh làm gãy chi tiết nhựa.'),
    q('Sau khi lắp ghép xong mô hình, con cần làm gì?',
      'Kiểm tra xem mô hình có hoạt động đúng không và các chi tiết có bị lỏng không',
      ['Ngay lập tức tháo ra và lắp lại', 'Sơn toàn bộ mô hình bằng sơn dầu', 'Để mô hình trong tủ lạnh'],
      'Kiểm tra: mô hình chuyển động đúng chưa? Có chi tiết lỏng/thiếu không? Cần xiết chặt ốc vít hay không?'),
    q('Khi sử dụng bộ lắp ghép mô hình kĩ thuật, chi tiết nào thường dùng để kết nối các bộ phận lại với nhau?',
      'Ốc và vít',
      ['Keo dính 502', 'Băng dính hai mặt', 'Dây thun'],
      'Trong các bộ mô hình kĩ thuật, người ta dùng ốc vít và cờ lê, tua vít để liên kết các thanh thẳng, thanh chữ U chắc chắn với nhau.'),
    q('Để tháo hoặc vặn chặt ốc vít, em cần sử dụng dụng cụ gì?',
      'Tua vít và cờ lê',
      ['Kéo và dao rọc giấy', 'Búa và đinh', 'Tay trần không cần dụng cụ'],
      'Tua vít dùng để vặn đầu vít, cờ lê dùng để giữ chặt đai ốc (ê-cu) ở mặt kia. Dùng đúng dụng cụ giúp không bị đau tay và ốc chặt hơn.'),
    q('Khi hoàn thành việc lắp ghép và chơi xong, em nên làm việc gì để bảo quản đồ dùng?',
      'Tháo rời cẩn thận, phân loại chi tiết và cất gọn gàng vào hộp',
      ['Quăng bừa bãi ra sàn nhà', 'Vứt chung với rác', 'Nhét tất cả vào cặp đi học'],
      'Kĩ năng kĩ thuật không chỉ là biết lắp mà còn là biết giữ gìn dụng cụ, không làm mất các chi tiết nhỏ để lần sau còn dùng được.'),
  ],

  // ── Bài 10-12: Đồ chơi dân gian và thủ công ──────────────────────────
  'thu-cong-do-choi': [
    q('Đồ chơi dân gian Việt Nam được làm từ vật liệu gì?',
      'Tre, nứa, giấy, vải, gỗ — vật liệu tự nhiên, thân thiện với môi trường',
      ['Nhựa tổng hợp và pin điện', 'Kim loại và thủy tinh', 'Bê tông và sắt thép'],
      'Đồ chơi truyền thống như con tò he (đất nặn), đèn lồng (giấy, tre), chong chóng (giấy) dùng vật liệu tự nhiên, thân thiện.'),
    q('Khi làm đèn lồng, bước nào cần làm trước?',
      'Cắt và dán khung đèn, rồi mới bọc giấy màu bên ngoài',
      ['Bọc giấy màu trước, rồi mới tạo khung', 'Đốt nến trước để thử độ sáng', 'Vẽ hoa văn trước khi có khung'],
      'Quy trình làm đèn lồng: tạo khung (tre/giấy cứng) → bọc giấy hoặc vải mỏng → trang trí → lắp phần cầm.'),
    q('Chuồn chuồn thăng bằng hoạt động dựa trên nguyên lý gì?',
      'Trọng tâm thấp — khi trọng tâm nằm dưới điểm tựa, vật sẽ tự cân bằng mà không ngã',
      ['Cánh vỗ tạo lực nâng', 'Nam châm hút với bề mặt', 'Lò xo đàn hồi'],
      'Chuồn chuồn thăng bằng có trọng tâm dưới điểm tựa (mỏ chuồn chuồn). Khi nghiêng, lực hấp dẫn kéo nó về vị trí cân bằng.'),
    q('Giá trị của đồ chơi dân gian với trẻ em là gì?',
      'Giúp trẻ học kỹ năng thủ công, hiểu văn hóa truyền thống và phát triển tư duy sáng tạo',
      ['Chỉ để trưng bày, không để chơi', 'Thay thế hoàn toàn đồ chơi điện tử', 'Chỉ dành cho người lớn sưu tầm'],
      'Làm đồ chơi dân gian giúp trẻ rèn tay, hiểu lịch sử văn hóa, học từ cha ông và phát huy sáng tạo riêng.'),
    q('Tò he là món đồ chơi dân gian nổi tiếng được làm từ nguyên liệu chính nào?',
      'Bột gạo nặn thành hình các con vật, nhân vật có nhiều màu sắc',
      ['Nhựa đúc sẵn', 'Đất sét nung trong lò', 'Giấy vụn và hồ dán'],
      'Tò he là nghệ thuật nặn bột (thường là bột gạo nếp pha tẻ) nhuộm màu tự nhiên, có thể ăn được, rất phổ biến ở Bắc Bộ.'),
    q('Chiếc chong chóng giấy quay được khi gặp gió là nhờ điều gì?',
      'Nhờ thiết kế các cánh giấy cong tạo lực đẩy khi gió thổi qua',
      ['Nhờ lắp pin và động cơ nhỏ', 'Nhờ nam châm hút', 'Nhờ lực hấp dẫn của Trái Đất'],
      'Chong chóng là món đồ chơi áp dụng nguyên lý khí động học đơn giản: gió tác động lên bề mặt cong đẩy nó xoay quanh trục.'),
    q('Khi làm đồ thủ công cắt dán, em cần lưu ý điều gì khi sử dụng kéo và dao dọc giấy?',
      'Cầm cẩn thận, cắt đúng đường nét, tuyệt đối không dùng để đùa nghịch với bạn',
      ['Có thể vung vẩy tùy thích', 'Dùng để cắt quần áo', 'Cắt thật nhanh để xong sớm'],
      'An toàn lao động là bài học số một trong thủ công. Các vật sắc nhọn phải được kiểm soát cẩn thận.'),
  ],
};

function pickBank(lessonTitle) {
  const t = String(lessonTitle || '').toLowerCase();
  if (/lợi ích|hoa.*cây|cây.*hoa|loại hoa|loại cây/.test(t)) return BANKS['hoa-cay-canh'];
  if (/vật liệu|dụng cụ|gieo hạt|chậu|trồng/.test(t)) return BANKS['trong-cay-chau'];
  if (/chăm sóc|tưới|bón phân|phát triển/.test(t)) return BANKS['cham-soc-cay'];
  if (/lắp ghép|mô hình|bập bênh|rô-bốt|robot/.test(t)) return BANKS['lap-ghep-mo-hinh'];
  if (/đồ chơi|dân gian|đèn lồng|chuồn chuồn|thủ công/.test(t)) return BANKS['thu-cong-do-choi'];
  // Fallback: mix
  return [...BANKS['hoa-cay-canh'].slice(0, 3), ...BANKS['lap-ghep-mo-hinh'].slice(0, 3)];
}

export function generateTechQuestions(topic, count = 8, seedInput = '') {
  const source = topic.knttSource || {};
  const lessonTitle = source.lesson || topic.title || '';
  const bank = pickBank(lessonTitle);
  if (!bank || !bank.length) return [];
  const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}|tech`);
  return shuffled.slice(0, Math.max(6, Math.min(count, shuffled.length)));
}
