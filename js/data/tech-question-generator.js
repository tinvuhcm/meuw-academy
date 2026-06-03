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
      'Chậu giúp kiểm soát lượng nước, di chuyển dễ dàng và giữ nhà gọn gàng',
      ['Vì cây sẽ chết nếu trồng xuống đất', 'Vì trong nhà không có ánh sáng', 'Vì chậu làm cây lớn nhanh hơn'],
      'Trồng chậu giúp điều tiết nước, tránh rễ cây làm hỏng sàn nhà, dễ di chuyển vào/ra theo mùa.'),
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
