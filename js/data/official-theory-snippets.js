const TOAN_SOURCE = 'Nguồn chính thức: Giới thiệu SGK Toán 4 (Cánh Diều), Hoc10';
const ENGLISH_SOURCE = 'Nguồn chính: Family & Friends 4; tư liệu hỗ trợ chính thức: teacher/support assets từ Hoc10 và Tập huấn';
const VIE_SOURCE = 'Nguồn chính thức: Tài liệu tập huấn SGK Tiếng Việt 4 (Cánh Diều), Hoc10';

function clean(text) {
  return String(text || '').trim();
}

export function getOfficialMathTheory({ title = '', op = '' } = {}) {
  const t = clean(title).toLowerCase();
  const ruleMap = [
    // ── Trung bình cộng ─────────────────────────────────────────────────────
    {
      match: /average|trung bình cộng/,
      points: [
        'Trung bình cộng = Tổng các số ÷ Số lượng các số.',
        'Nó cho biết "mức đại diện" chung — như điểm trung bình của một học sinh qua nhiều bài kiểm tra.',
        'Bước làm: (1) Cộng tất cả các số. (2) Đếm có bao nhiêu số. (3) Chia tổng cho số lượng đó.',
      ],
      example: 'Ví dụ: điểm 3 bài: 8, 6, 7. Tổng = 8+6+7 = 21. Số lượng = 3. Trung bình = 21÷3 = 7 điểm.',
    },
    // ── Phân số ─────────────────────────────────────────────────────────────
    {
      match: /phân số|frac/,
      points: [
        'Phân số a/b: mẫu số b = chia thành b phần bằng nhau; tử số a = lấy a phần.',
        'So sánh: cùng mẫu → tử lớn hơn thì phân số lớn hơn. Cùng tử → mẫu nhỏ hơn thì phân số lớn hơn.',
        'Rút gọn: chia cả tử và mẫu cho cùng một số (ước chung) để được phân số đơn giản hơn.',
      ],
      example: 'Ví dụ: 6/8 rút gọn = 3/4 (chia cả 6 và 8 cho 2). So sánh: 3/5 > 2/5 (cùng mẫu, tử lớn hơn).',
    },
    // ── Chu vi ──────────────────────────────────────────────────────────────
    {
      match: /chu vi/,
      points: [
        'Chu vi = tổng độ dài tất cả các cạnh bao quanh hình.',
        'Hình vuông cạnh a: C = a × 4. Hình chữ nhật dài l, rộng w: C = (l + w) × 2.',
        'Chú ý đơn vị! Nếu các cạnh có đơn vị khác nhau, đổi về cùng đơn vị trước khi tính.',
      ],
      example: 'Ví dụ: sân trường hình chữ nhật dài 50 m, rộng 30 m. Chu vi = (50+30)×2 = 80×2 = 160 m.',
    },
    // ── Diện tích ───────────────────────────────────────────────────────────
    {
      match: /diện tích/,
      points: [
        'Diện tích = phần mặt phẳng bên trong hình (khác với chu vi là đường bao xung quanh).',
        'Hình vuông cạnh a: S = a × a. Hình chữ nhật dài l, rộng w: S = l × w.',
        'Đơn vị diện tích: cm², m², dm²... Đừng nhầm giữa cm (dài) và cm² (diện tích).',
      ],
      example: 'Ví dụ: phòng học dài 8 m, rộng 6 m → diện tích = 8×6 = 48 m². Cần 48 m² gạch để lát nền.',
    },
    // ── Hình học / Góc ──────────────────────────────────────────────────────
    {
      match: /góc|vuông góc|song song|hình thoi|hình bình hành/,
      points: [
        'Góc được tạo bởi 2 tia chung gốc. Góc vuông = 90°. Góc nhọn < 90°. Góc tù > 90° và < 180°.',
        'Hai đường thẳng vuông góc cắt nhau tạo ra 4 góc vuông. Hai đường song song không cắt nhau dù kéo dài.',
        'Dùng ê-ke để vẽ góc vuông và kiểm tra vuông góc; dùng thước để kiểm tra song song.',
      ],
      example: 'Ví dụ: 4 góc trong hình chữ nhật đều là góc vuông (90°). Hình bình hành có 2 cặp cạnh song song.',
    },
    // ── Hình học (generic) ──────────────────────────────────────────────────
    {
      match: /geo|hình học/,
      points: [
        'Hình học lớp 4: nhận dạng hình, đặc điểm từng loại, tính chu vi và diện tích.',
        'Chu vi = đường bao xung quanh. Diện tích = phần mặt phẳng bên trong.',
        'Khi làm bài hình học, vẽ hình và ghi số đo cụ thể vào từng cạnh trước khi tính.',
      ],
      example: 'Ví dụ: hình vuông cạnh 7 cm → chu vi = 7×4 = 28 cm; diện tích = 7×7 = 49 cm².',
    },
    // ── Biểu đồ / Thống kê ──────────────────────────────────────────────────
    {
      match: /data-chart|biểu đồ|thống kê|bảng số liệu/,
      points: [
        'Biểu đồ cột: cột cao hơn = số lớn hơn. Đọc trục dọc (con số) và trục ngang (đối tượng).',
        '3 bước đọc biểu đồ: (1) Đọc tên biểu đồ. (2) Xác định giá trị từng cột. (3) So sánh, tính toán.',
        'Hay gặp: tính tổng, tính hiệu, tìm cột cao nhất/thấp nhất, tính trung bình cộng từ biểu đồ.',
      ],
      example: 'Ví dụ: biểu đồ điểm kiểm tra: cột Toán = 9, cột Văn = 7 → Toán cao hơn Văn 9-7 = 2 điểm.',
    },
    // ── Biểu thức / Thứ tự ──────────────────────────────────────────────────
    {
      match: /expression|biểu thức|thứ tự phép tính/,
      points: [
        'Quy tắc thứ tự: (1) trong ngoặc, (2) nhân và chia, (3) cộng và trừ. Đừng làm ngược!',
        'Nếu chỉ có cùng loại phép tính (vd chỉ có +, -): làm từ trái sang phải.',
        'Mẹo kiểm tra: thay số vào biểu thức và đọc lại từng bước có đúng thứ tự không.',
      ],
      example: 'Ví dụ: 5 + 3 × (12 - 4) = 5 + 3 × 8 = 5 + 24 = 29. Ngoặc trước → nhân → cộng.',
    },
    // ── Đo lường / Đơn vị ───────────────────────────────────────────────────
    {
      match: /measurement|đơn vị|đo lường/,
      points: [
        'Bảng chuyển đổi quan trọng: 1 km = 1 000 m; 1 m = 10 dm = 100 cm; 1 kg = 1 000 g; 1 lít = 1 000 ml.',
        'Quy tắc khi tính với đo lường: đổi về CÙNG ĐƠN VỊ trước, sau đó mới cộng, trừ, nhân, chia.',
        'Ước lượng để tự kiểm tra: kết quả có "hợp lý" về kích thước, trọng lượng, thể tích không?',
      ],
      example: 'Ví dụ: 1 km 500 m + 2 km 300 m = 1 500 m + 2 300 m = 3 800 m = 3 km 800 m.',
    },
    // ── Tiền ────────────────────────────────────────────────────────────────
    {
      match: /tiền|đồng|money/,
      points: [
        'Bài toán tiền thường hỏi: giá mỗi món, tổng tiền phải trả, hoặc tiền thừa.',
        'Tiền thừa = Tiền đưa - Tiền phải trả. Tổng tiền = giá × số lượng.',
        'Đọc kỹ đề: "1 quyển 3 000 đồng, mua 4 quyển" → 4 × 3 000 = 12 000 đồng.',
      ],
      example: 'Ví dụ: mua 3 cái bánh 5 000 đồng/cái, trả 20 000 đồng → thừa = 20 000 - 15 000 = 5 000 đồng.',
    },
    // ── Đồng hồ / Giờ phút ──────────────────────────────────────────────────
    {
      match: /đồng hồ|giờ phút|xem giờ|clock/,
      points: [
        '1 giờ = 60 phút. Khi phút ≥ 60: trừ 60 phút và cộng thêm 1 giờ.',
        'Tính thời gian kết thúc = giờ bắt đầu + thời gian. Tính thời gian kéo dài = giờ kết thúc - giờ bắt đầu.',
        'Đọc giờ trên đồng hồ: kim ngắn (giờ), kim dài (phút). 1 khoảng giữa 2 số = 5 phút.',
      ],
      example: 'Ví dụ: bắt đầu 7 giờ 45 phút, học 1 giờ 30 phút → kết thúc = 7 giờ 45 phút + 1 giờ 30 phút = 9 giờ 15 phút.',
    },
    // ── Giá trị chữ số / Số lớn ─────────────────────────────────────────────
    {
      match: /place-value|số tự nhiên|giá trị chữ số|hàng|lớp|so sánh số|số lớn|100 000|1 000 000/,
      points: [
        'Giá trị chữ số phụ thuộc vị trí: hàng đơn vị (1), chục (10), trăm (100), nghìn (1 000), chục nghìn (10 000), trăm nghìn (100 000).',
        'So sánh: đếm chữ số (nhiều hơn = lớn hơn). Nếu bằng chữ số: so từng hàng từ TRÁI sang PHẢI.',
        'Làm tròn đến hàng nào: nhìn hàng liền sau — ≥ 5 thì làm tròn lên, < 5 thì làm tròn xuống.',
      ],
      example: 'Ví dụ: trong 352 847, chữ số 5 ở hàng chục nghìn → giá trị 50 000. Làm tròn đến hàng nghìn: 353 000.',
    },
    // ── Số chẵn / Lẻ ────────────────────────────────────────────────────────
    {
      match: /parity|số chẵn|số lẻ/,
      points: [
        'Số chẵn: chia hết cho 2, chữ số cuối là 0, 2, 4, 6 hoặc 8.',
        'Số lẻ: không chia hết cho 2, chữ số cuối là 1, 3, 5, 7 hoặc 9.',
        'Chỉ cần nhìn CHỮ SỐ CUỐI để xác định chẵn hay lẻ — không cần chia thật sự.',
      ],
      example: 'Ví dụ: 2 048 → chữ số cuối 8 → chẵn. 3 751 → chữ số cuối 1 → lẻ. Tổng hai số chẵn luôn là số chẵn.',
    },
    // ── Tìm x / Thành phần ──────────────────────────────────────────────────
    {
      match: /missing|tìm x|thành phần|ẩn số/,
      points: [
        'Để tìm x, dùng phép tính ngược: x + b = c → x = c - b; x - b = c → x = c + b.',
        'x × b = c → x = c ÷ b; x ÷ b = c → x = c × b.',
        'Sau khi tìm x, KIỂM TRA bằng cách thay lại vào bài toán ban đầu.',
      ],
      example: 'Ví dụ: x × 6 = 54 → x = 54 ÷ 6 = 9. Kiểm tra: 9 × 6 = 54 ✓',
    },
    // ── Gấp / Giảm ──────────────────────────────────────────────────────────
    {
      match: /double-half|gấp|giảm đi|nhiều hơn|ít hơn/,
      points: [
        '"Gấp n lần" = NHÂN n. "Giảm n lần" = CHIA n. "Nhiều hơn n" = CỘNG n. "Ít hơn n" = TRỪ n.',
        'Đọc kỹ đề: "gấp" và "nhiều hơn" là hai khái niệm KHÁC NHAU!',
        '6 gấp 3 lần = 18; 6 nhiều hơn 3 = 9. Nhầm thường xảy ra ở đây!',
      ],
      example: 'Ví dụ: Con bò nặng 240 kg, gấp 3 lần con dê → con dê nặng 240÷3 = 80 kg. (Không phải 240-3=237 kg!)',
    },
    // ── Bài toán có lời văn ─────────────────────────────────────────────────
    {
      match: /word-problem|lời văn/,
      points: [
        'Quy trình 4 bước: (1) Đọc kỹ — biết gì? tìm gì? (2) Tóm tắt. (3) Chọn phép tính. (4) Tính + ghi đáp số.',
        'Đáp số phải có đơn vị (người, kg, m, đồng...). Thiếu đơn vị = bị trừ điểm!',
        'Kiểm tra bằng cách đọc lại đề và xem đáp số có "hợp lý" về kích thước và đơn vị không.',
      ],
      example: 'Ví dụ: "32 HS chia đều 4 tổ" → Biết: 32, 4 tổ. Tìm: số HS/tổ. Phép: 32÷4=8. Đáp: 8 học sinh.',
    },
    // ── Nhân / Chia ─────────────────────────────────────────────────────────
    {
      match: /\*|nhân|chia|bảng nhân|bảng chia/,
      points: [
        'Nhân một số với 10, 100, 1 000: thêm 1, 2, 3 chữ số 0 vào bên phải.',
        'Chia một số cho 10, 100: bỏ đi 1, 2 chữ số 0 từ bên phải.',
        'Nhân/chia nhiều chữ số: đặt tính dọc, thực hiện từ hàng đơn vị, chú ý "nhớ" khi tính.',
      ],
      example: 'Ví dụ: 36 × 25 = 36 × 100 ÷ 4 = 3 600 ÷ 4 = 900. (Nhân 25 = nhân 100 rồi chia 4 cho nhanh.)',
    },
    // ── Làm tròn ────────────────────────────────────────────────────────────
    {
      match: /rounding|làm tròn/,
      points: [
        'Làm tròn đến hàng nào: nhìn chữ số NGAY SAU hàng đó. Nếu ≥ 5 → tăng lên 1; nếu < 5 → giữ nguyên.',
        'Các chữ số sau hàng làm tròn đều đổi thành 0.',
        'Mục đích: ước lượng nhanh, kiểm tra bài, biểu diễn số xấp xỉ.',
      ],
      example: 'Ví dụ: 4 782 làm tròn đến hàng trăm → chữ số hàng chục = 8 ≥ 5 → 4 800. Hai chữ số sau = 00.',
    },
    // ── Tính nhẩm nhanh ─────────────────────────────────────────────────────
    {
      match: /quick|nhẩm/,
      points: [
        'Mẹo nhẩm: tách số tròn trước → 47 + 38 = 47 + 3 + 35 = 50 + 35 = 85.',
        'Tính nhanh × 9 = × 10 rồi trừ đi 1 lần: 47 × 9 = 470 - 47 = 423.',
        'Tính nhanh × 5 = ÷ 2 rồi × 10: 64 × 5 = 64 ÷ 2 × 10 = 32 × 10 = 320.',
      ],
      example: 'Ví dụ: 198 + 46 = 200 + 44 = 244 (dời 2 từ 46 sang 198 để được số tròn 200, trừ 2 từ 46).',
    },
    // ── Cộng / Trừ ──────────────────────────────────────────────────────────
    {
      match: /\+|cộng|trừ/,
      points: [
        'Đặt tính thẳng hàng: đơn vị dưới đơn vị, chục dưới chục, trăm dưới trăm.',
        'Khi cộng: nếu tổng ≥ 10 thì "nhớ" 1 sang hàng tiếp theo. Khi trừ: nếu số bị trừ nhỏ hơn thì "mượn" 1 từ hàng cao hơn.',
        'Kiểm tra cộng bằng phép trừ (A+B=C → C-B=A). Kiểm tra trừ bằng phép cộng.',
      ],
      example: 'Ví dụ: 5 006 - 1 348 → hàng đơn vị: 6-8 không được, mượn 1 chục → 16-8=8. Hàng chục: 0-1-4 không được, mượn tiếp...',
    },
  ];

  const found = ruleMap.find(rule => rule.match.test(`${t}|${op}`));
  if (!found) return null;
  return { ...found, sourceLabel: TOAN_SOURCE };
}

export function getOfficialEnglishTheory(topicKey = '') {
  const key = clean(topicKey);
  const map = {
    'eng:ff4-jobs': {
      points: [
        'Chủ đề nghề nghiệp ở lớp 4 thường đi cùng nơi làm việc và việc làm tiêu biểu của mỗi nghề.',
        'Con nên học nghề theo cụm câu hỏi: What is the job? Where does he or she work?',
        'Khi trả lời, cố gắng nói thành câu ngắn hoàn chỉnh chứ không chỉ nói một từ.',
      ],
      example: 'Ví dụ: My mother is a doctor. She works in a hospital.',
    },
    'eng:ff4-present-simple': {
      points: [
        'Hiện tại đơn dùng để nói về thói quen, việc lặp lại hằng ngày hoặc sự thật quen thuộc.',
        'Với he hoặc she, động từ khẳng định thường thêm s hoặc es.',
        'Trong câu hỏi và câu phủ định, con nhớ quay về động từ nguyên mẫu sau do hoặc does.',
      ],
      example: 'Ví dụ: He walks to school. Does he walk to school? Yes, he does.',
    },
    'eng:ff4-be-have': {
      points: [
        'Động từ be giúp con nói về người, trạng thái hoặc đặc điểm.',
        'Have got giúp con nói ai có cái gì hoặc có đặc điểm gì.',
        'Con nên để ý chủ ngữ để chọn đúng am, is, are hoặc have got, has got.',
      ],
      example: 'Ví dụ: She is friendly. She has got a blue bag.',
    },
    'eng:ff4-reading-short': {
      points: [
        'Bài đọc ngắn lớp 4 thường rất ngắn nên con cần tìm đúng tên người, thời gian và hoạt động chính.',
        'Đọc câu hỏi trước sẽ giúp con biết cần tìm ý chính hay chi tiết.',
        'Nếu chưa chắc, quay lại đúng câu trong đoạn đọc để kiểm tra bằng chứng.',
      ],
      example: 'Ví dụ: nếu câu hỏi hỏi “How does Mai go to school?”, con tìm lại câu có từ go to school.',
    },
    'eng:ff4-classroom': {
      points: [
        'Classroom language là các câu lệnh và lời nhắc quen thuộc trong tiết học.',
        'Con nên nghe cả cụm từ như open your book, work in pairs, be quiet.',
        'Hiểu các câu này sẽ giúp con theo kịp hoạt động học trên lớp.',
      ],
      example: 'Ví dụ: Open your book nghĩa là mở sách ra, còn Work in pairs là làm việc theo cặp.',
    },
    'eng:ff4-routines': {
      points: [
        'Chủ đề sinh hoạt hằng ngày giúp con nói về thời gian và việc làm quen thuộc mỗi ngày.',
        'Học theo thứ tự buổi sáng, đi học, buổi chiều, buổi tối sẽ dễ nhớ hơn.',
        'Con nên tập nói cả câu có thời gian để dùng được ngay trong giao tiếp.',
      ],
      example: 'Ví dụ: I get up at six o’clock and go to school at seven.',
    },
    'eng:ff4-subjects': {
      points: [
        'Tên môn học thường đi cùng hoạt động quen thuộc của môn đó.',
        'Con có thể liên hệ Science với quan sát, Art với vẽ, Music với hát và nghe nhạc.',
        'Khi nói về sở thích, con có thể dùng mẫu: My favorite subject is ...',
      ],
      example: 'Ví dụ: My favorite subject is Science because I like experiments.',
    },
    'eng:ff4-feelings': {
      points: [
        'Từ chỉ cảm xúc giúp con nói về bản thân và phản ứng của mình trong các tình huống hằng ngày.',
        'Con nên gắn từ với nét mặt hoặc một tình huống thật để nhớ lâu hơn.',
        'Khi nói thành câu, con có thể dùng I feel ... hoặc She feels ...',
      ],
      example: 'Ví dụ: I feel excited on my birthday, but I feel tired after running.',
    },
  };

  const found = map[key];
  return found ? { ...found, sourceLabel: ENGLISH_SOURCE } : null;
}

export function getOfficialVietnameseTheory({ skillType = '', title = '' } = {}) {
  const skill = clean(skillType);
  const t = clean(title).toLowerCase();

  if (/danh từ/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Ở lớp 4, kiến thức tiếng Việt được dạy để con nhận biết và vận dụng vào đọc, viết, nói, nghe.',
        'Danh từ là từ gọi tên sự vật như người, con vật, đồ vật, hiện tượng hoặc khái niệm.',
        'Con nên đặt từ vào câu để kiểm tra xem nó có đang làm nhiệm vụ gọi tên hay không.',
      ],
      example: 'Ví dụ: trong câu “Lan đọc sách”, từ “Lan” và “sách” đều là danh từ.',
    };
  }

  if (/câu chủ đề|đoạn văn/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Tiếng Việt 4 rèn cho con tìm ý chính rồi mới trả lời hoặc viết tiếp.',
        'Câu chủ đề là câu nêu ý khái quát nhất của cả đoạn văn.',
        'Các câu còn lại thường làm rõ cho ý chính bằng chi tiết, ví dụ hoặc lời giải thích.',
      ],
      example: 'Ví dụ: muốn tìm câu chủ đề, con xem câu nào bao quát được toàn bộ đoạn.',
    };
  }

  if (/dấu gạch ngang/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Kiến thức tiếng Việt lớp 4 không học theo kiểu nhớ định nghĩa khô cứng mà học để dùng đúng trong câu.',
        'Dấu gạch ngang có thể dùng để đánh dấu lời nói của nhân vật hoặc đánh dấu các ý trong đoạn liệt kê.',
        'Con cần nhìn vị trí của dấu câu trong ngữ cảnh để hiểu đúng tác dụng của nó.',
      ],
      example: 'Ví dụ: khi một nhân vật bắt đầu nói, dấu gạch ngang thường đứng ở đầu dòng lời thoại.',
    };
  }

  if (/động từ/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Động từ là từ chỉ hoạt động (chạy, viết, hát) hoặc trạng thái (ngủ, đứng) của người, vật.',
        'Muốn tìm động từ, con hỏi: ai đang làm gì? ai đang ở trạng thái nào?',
        'Động từ thường đứng sau chủ ngữ và có thể đi kèm các từ đang, sẽ, đã để chỉ thời gian.',
      ],
      example: 'Ví dụ: "Gió thổi nhẹ" — "thổi" là động từ chỉ hoạt động của gió.',
    };
  }

  if (/tính từ|tình từ/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Tính từ là từ chỉ đặc điểm, tính chất của người, vật, hiện tượng như màu sắc, hình dạng, phẩm chất.',
        'Muốn tìm tính từ, con hỏi: nó thế nào? màu gì? ra sao?',
        'Tính từ thường đứng sau danh từ để mô tả hoặc đứng sau từ rất, khá để tăng mức độ.',
      ],
      example: 'Ví dụ: "Bầu trời xanh thẳm" — "xanh thẳm" là tính từ mô tả màu sắc của bầu trời.',
    };
  }

  if (/trạng ngữ/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Trạng ngữ là thành phần phụ của câu, bổ sung thông tin về thời gian, nơi chốn, nguyên nhân, mục đích hoặc phương tiện.',
        'Trạng ngữ thường đứng ở đầu câu và được ngăn cách bằng dấu phẩy.',
        'Muốn tìm trạng ngữ, con hỏi: hành động xảy ra khi nào? ở đâu? vì sao? để làm gì?',
      ],
      example: 'Ví dụ: "Sáng sớm, em tập thể dục." — "Sáng sớm" là trạng ngữ chỉ thời gian.',
    };
  }

  if (/chủ ngữ|vị ngữ|hai thành phần/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Câu đầy đủ thường có hai thành phần chính: chủ ngữ (ai? cái gì?) và vị ngữ (làm gì? thế nào?).',
        'Chủ ngữ thường là danh từ hoặc cụm danh từ đứng ở đầu câu.',
        'Vị ngữ thường là động từ hoặc tính từ, cho biết chủ ngữ làm gì hoặc có đặc điểm gì.',
      ],
      example: 'Ví dụ: "Gió thổi mạnh." — Chủ ngữ: Gió; Vị ngữ: thổi mạnh.',
    };
  }

  if (/nhân hóa/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Nhân hóa là biện pháp tu từ dùng từ ngữ chỉ người để miêu tả sự vật, con vật.',
        'Nhân hóa giúp sự vật trở nên gần gũi, sinh động như có tâm hồn, cảm xúc.',
        'Có thể nhân hóa bằng cách gọi tên (chú chim), hỏi thăm, hoặc gán hành động/cảm xúc của người.',
      ],
      example: 'Ví dụ: "Chú gió ơi, chú đi đâu thế?" — gọi gió bằng "chú" và hỏi như hỏi người.',
    };
  }

  if (skill === 'Đọc') {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Bài đọc lớp 4 thường yêu cầu con không chỉ nhớ chi tiết mà còn biết suy luận và rút ra ý nghĩa.',
        'Con nên đọc chậm, gạch nhẹ từ khóa và tự hỏi đoạn này nói chủ yếu về điều gì.',
        'Khi trả lời, hãy quay lại đúng câu hoặc đúng đoạn làm bằng chứng.',
      ],
      example: 'Ví dụ: nếu câu hỏi hỏi về nhân vật, con tìm lại câu nói rõ việc làm hoặc lời nói của nhân vật ấy.',
    };
  }

  if (skill === 'Viết') {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Tiếng Việt 4 rèn viết theo quy trình: hiểu yêu cầu, tìm ý, sắp xếp ý rồi mới viết thành câu.',
        'Con không cần viết thật dài, nhưng cần viết đúng ý và rõ ràng.',
        'Khi xong bài, con nên đọc lại để xem các câu đã nối với nhau mạch lạc chưa.',
      ],
      example: 'Ví dụ: trước khi viết đoạn văn, con có thể nói miệng ý chính của từng câu trước.',
    };
  }

  return null;
}

const IT_SOURCE = 'Nguồn: SGK Tin học 4 (KNTT), Hoc10 tập huấn GV';
const HISTGEO_SOURCE = 'Nguồn: SGK Lịch sử và Địa lí 4 (KNTT)';

/**
 * Get SGK-based theory for Tin học 4 topics.
 * Wired in by kntt-topics.js buildSourceTheoryBlock for it entries.
 */
export function getOfficialItTheory({ title = '' } = {}) {
  const t = clean(title).toLowerCase();

  if (/phần cứng|phần mềm|hardware|software/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Máy tính gồm hai phần: phần cứng (hardware) là các bộ phận vật lý như màn hình, bàn phím, chuột, CPU.',
        'Phần mềm (software) là các chương trình chạy trên máy như hệ điều hành, Word, trò chơi — không sờ vào được.',
        'Hai phần này phối hợp với nhau để máy tính hoạt động và giúp ích cho người dùng.',
      ],
      example: 'Ví dụ: bàn phím là phần cứng (con sờ vào được); Microsoft Word là phần mềm (con dùng để soạn thảo).',
    };
  }

  if (/gõ bàn phím|luyện gõ|typing/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Gõ bàn phím đúng cách giúp con gõ nhanh hơn và bảo vệ cổ tay, vai, lưng.',
        'Đặt tay ở hàng cơ bản: ngón trỏ trái trên F, ngón trỏ phải trên J — mỗi ngón chịu trách nhiệm một nhóm phím.',
        'Nhìn màn hình, không nhìn bàn phím khi gõ là kỹ năng quan trọng cần luyện tập.',
      ],
      example: 'Ví dụ: Shift + chữ thường = chữ hoa; Ctrl+S = lưu file; Ctrl+Z = hoàn tác.',
    };
  }

  if (/tìm kiếm|internet|trang web/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Internet là mạng máy tính toàn cầu, kết nối hàng tỉ người và thiết bị với nhau.',
        'Muốn tìm kiếm thông tin, con dùng công cụ tìm kiếm (Google) và gõ từ khóa ngắn gọn, chính xác.',
        'Khi đọc thông tin trên mạng, cần kiểm tra độ tin cậy của nguồn và không chia sẻ thông tin cá nhân.',
      ],
      example: 'Ví dụ: thay vì gõ "tôi muốn biết sông dài nhất Việt Nam là gì", hãy gõ "sông dài nhất Việt Nam".',
    };
  }

  if (/tệp|thư mục|file|folder|lưu trữ/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Tệp (file) là đơn vị lưu trữ dữ liệu: văn bản (.docx), ảnh (.jpg), bài hát (.mp3)...',
        'Thư mục (folder) giúp nhóm các tệp liên quan lại, giống như tủ hồ sơ nhiều ngăn.',
        'Sắp xếp tệp có tổ chức (đặt tên rõ ràng, phân loại vào thư mục) giúp con dễ tìm lại về sau.',
      ],
      example: 'Ví dụ: tạo thư mục "Toán 4" → thư mục con "Bài tập" và "Ôn tập" → đặt tệp đúng chỗ.',
    };
  }

  if (/đạo đức|pháp luật|bản quyền|an toàn|văn hóa.*số/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Sử dụng phần mềm có bản quyền là tôn trọng công sức người tạo ra và tuân thủ pháp luật.',
        'Trên Internet, con cần bảo vệ thông tin cá nhân: không chia sẻ địa chỉ, số điện thoại cho người lạ.',
        'Khi gặp nội dung không phù hợp, con nên tắt ngay và báo cho cha mẹ hoặc thầy cô.',
      ],
      example: 'Ví dụ: phần mềm miễn phí hợp pháp (như Google Docs, LibreOffice) là lựa chọn tốt thay cho phần mềm lậu.',
    };
  }

  if (/trình chiếu|slide|powerpoint|hiệu ứng/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Bài trình chiếu (presentation) giúp trình bày ý tưởng có hình ảnh, màu sắc rõ ràng trước người xem.',
        'Mỗi trang gọi là slide; nên dùng ít chữ, nhiều ý chính và hình ảnh minh họa phù hợp.',
        'Hiệu ứng chuyển trang giúp bài sinh động hơn — chọn vừa phải, không quá rườm rà.',
      ],
      example: 'Ví dụ: tiêu đề slide dùng chữ to (36-40pt), nội dung dùng gạch đầu dòng ngắn gọn, không quá 5-6 dòng/slide.',
    };
  }

  if (/soạn thảo|văn bản|word|chỉnh sửa văn/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Phần mềm soạn thảo văn bản (Word, Google Docs) giúp nhập, chỉnh sửa và định dạng tài liệu.',
        'Các phím tắt quan trọng: Ctrl+S (lưu), Ctrl+B (đậm), Ctrl+I (nghiêng), Ctrl+Z (hoàn tác).',
        'Lưu tệp thường xuyên để tránh mất dữ liệu khi mất điện hoặc máy gặp sự cố.',
      ],
      example: 'Ví dụ: viết bài xong, con nhấn Ctrl+S để lưu, rồi đọc lại từ đầu để kiểm tra lỗi chính tả.',
    };
  }

  if (/lập trình|chơi với máy|scratch/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Lập trình là viết các lệnh để máy tính thực hiện theo ý muốn — như ra lệnh cho một người trợ lý.',
        'Lập trình trực quan (Scratch) dùng khối lệnh màu sắc, kéo thả — không cần nhớ câu lệnh phức tạp.',
        'Tư duy lập trình giúp con chia bài toán khó thành các bước nhỏ, giải quyết từng bước một.',
      ],
      example: 'Ví dụ: "Con mèo đi 5 bước, rồi quay phải 90°, rồi nói Xin chào!" — đây là một chương trình đơn giản.',
    };
  }

  // Generic IT fallback
  return {
    sourceLabel: IT_SOURCE,
    points: [
      'Tin học lớp 4 giúp con học cách dùng máy tính một cách an toàn, hiệu quả và có đạo đức.',
      'Quan trọng nhất: hiểu rõ một thao tác dùng để làm gì, rồi mới thực hành — đừng bấm thử liên tục mà không biết mục đích.',
      'An toàn thông tin và đạo đức khi dùng máy tính là kỹ năng quan trọng suốt cuộc đời.',
    ],
    example: 'Ví dụ: trước khi xóa một tệp, con nên kiểm tra đây có phải tệp quan trọng không và có thể phục hồi từ Thùng rác không.',
  };
}

/**
 * Get SGK-based theory for Lịch sử và Địa lí 4 topics.
 */
export function getOfficialHistgeoTheory({ title = '', unit = '' } = {}) {
  const t = clean(title).toLowerCase();
  const u = clean(unit).toLowerCase();

  if (/sông hồng|văn minh.*hồng|hồng.*văn minh/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Sông Hồng bắt nguồn từ Vân Nam (Trung Quốc), chảy vào Việt Nam qua Lào Cai, đổ ra biển ở Nam Định và Thái Bình.',
        'Nước sông màu đỏ do phù sa sét đỏ — phù sa này bồi đắp tạo nên Đồng bằng Bắc Bộ màu mỡ.',
        'Văn minh sông Hồng là cái nôi của dân tộc Việt: nông nghiệp lúa nước, trống đồng Đông Sơn, các làng nghề thủ công.',
      ],
      example: 'Ví dụ: nhờ phù sa sông Hồng, Đồng bằng Bắc Bộ là vùng đất nông nghiệp màu mỡ, nuôi sống hàng chục triệu người.',
    };
  }

  if (/thăng long|hà nội|văn miếu|quốc tử giám|hồ gươm|hồ hoàn kiếm/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Thăng Long (nay là Hà Nội) được vua Lý Thái Tổ chọn làm kinh đô năm 1010 vì vị trí trung tâm, đất rộng, cao ráo.',
        'Văn Miếu - Quốc Tử Giám (thành lập 1070-1076) là trường đại học đầu tiên của Việt Nam.',
        'Hồ Hoàn Kiếm gắn với truyền thuyết vua Lê Lợi trả gươm thần cho Rùa Vàng sau khi đánh đuổi giặc Minh.',
      ],
      example: 'Ví dụ: mỗi năm vào tháng 3 âm lịch, học sinh cả nước hướng về Phú Thọ để nhớ ơn các Vua Hùng dựng nước.',
    };
  }

  if (/đền hùng|hùng vương/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Đền Hùng ở tỉnh Phú Thọ là nơi thờ các Vua Hùng — những người dựng nên nhà nước đầu tiên của Việt Nam.',
        'Lễ giỗ Tổ Hùng Vương (10/3 âm lịch) là ngày Quốc giỗ, nhắc nhở con cháu nhớ về cội nguồn.',
        '"Dù ai đi ngược về xuôi / Nhớ ngày giỗ Tổ mùng mười tháng ba" — câu ca dao nổi tiếng về truyền thống uống nước nhớ nguồn.',
      ],
      example: 'Ví dụ: câu chuyện Lạc Long Quân và Âu Cơ sinh ra 100 người con — 50 xuống biển, 50 lên núi — giải thích nguồn gốc cộng đồng người Việt.',
    };
  }

  if (/tây nguyên|cồng chiêng/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Tây Nguyên là cao nguyên rộng lớn, đất đỏ bazan màu mỡ, rất phù hợp trồng cà phê, cao su và hồ tiêu.',
        'Đây là vùng sinh sống của nhiều dân tộc thiểu số (Ê Đê, Mnông, Ba Na, Gia Rai...) với văn hóa cồng chiêng độc đáo.',
        'Lễ hội cồng chiêng Tây Nguyên được UNESCO công nhận là Di sản văn hóa phi vật thể thế giới năm 2005.',
      ],
      example: 'Ví dụ: cồng chiêng vang lên trong các lễ cúng thần, đám cưới, lễ mừng lúa mới — là "tiếng nói của tâm hồn" dân tộc Tây Nguyên.',
    };
  }

  if (/nam bộ|mê kông|cửu long|đồng bằng nam/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Đồng bằng Nam Bộ được bồi đắp bởi phù sa sông Mê Kông — vựa lúa lớn nhất Việt Nam, chiếm hơn 50% sản lượng lúa cả nước.',
        'Vùng sông nước Nam Bộ có hệ thống kênh rạch chằng chịt, chợ nổi và cuộc sống gắn liền với thuyền, ghe.',
        'TP. Hồ Chí Minh là đô thị lớn nhất Việt Nam, trung tâm kinh tế - thương mại phía Nam.',
      ],
      example: 'Ví dụ: chợ nổi Cái Răng (Cần Thơ) là nơi mua bán trên sông, người dùng sào treo mẫu hàng để khách dễ nhận biết.',
    };
  }

  // Generic histgeo fallback
  return {
    sourceLabel: HISTGEO_SOURCE,
    points: [
      'Mỗi vùng địa lý Việt Nam có đặc điểm thiên nhiên, dân cư và văn hóa riêng biệt — tạo nên sự đa dạng phong phú của đất nước.',
      'Khi học địa lý, con hãy gắn kiến thức với bản đồ: xác định vị trí, vùng giáp ranh và đặc điểm nổi bật.',
      'Khi học lịch sử, con hãy nhớ: ai? ở đâu? khi nào? kết quả gì? — bốn câu hỏi giúp con nắm chắc sự kiện.',
    ],
    example: 'Ví dụ: Đền Hùng ở Phú Thọ (ai: Vua Hùng; ở đâu: Phú Thọ; khi nào: hàng nghìn năm trước; kết quả: lập nước Văn Lang).',
  };
}
