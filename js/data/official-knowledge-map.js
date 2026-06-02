export const CORE_SUBJECT_CODES = ['math', 'vie', 'eng', 'it', 'sci'];
export const OTHER_SUBJECT_CODES = ['histgeo', 'music', 'art', 'ethics', 'tech', 'life', 'pe'];
export const ALL_SUBJECT_CODES = [...CORE_SUBJECT_CODES, ...OTHER_SUBJECT_CODES];

export const LONG_RANGE_STUDY_POLICY = {
  sourceSets: ['chan-troi-sang-tao', 'ket-noi-tri-thuc', 'family-and-friends-4', 'hoc10-official', 'science-extension'],
  targetMinutes: {
    am: 120,
    pm: 100,
    total: 220,
  },
  moduleTargets: {
    am: 14,
    pm: 10,
    total: 24,
  },
  estimatedMinutesBySubject: {
    math: 11,
    vie: 10,
    eng: 10,
    sci: 10,
    it: 9,
    histgeo: 9,
    music: 8,
    art: 8,
    ethics: 8,
    tech: 9,
    life: 8,
    pe: 8,
  },
  enrichmentSlotMap: {
    am: [6],
    pm: [],
  },
};

export const OFFICIAL_GRADE4_KNOWLEDGE_MAP = {
  math: {
    label: 'Toán',
    sourceSets: ['chan-troi-sang-tao', 'ket-noi-tri-thuc', 'hoc10-official'],
    books: ['Toán 4 tập 1', 'Toán 4 tập 2'],
    strands: [
      { key: 'numbers-place-value', title: 'Số tự nhiên và giá trị chữ số', concepts: ['đọc viết số lớn', 'so sánh số', 'làm tròn số', 'cấu tạo số'] },
      { key: 'operations', title: 'Bốn phép tính và biểu thức', concepts: ['cộng trừ số lớn', 'nhân chia', 'thứ tự thực hiện phép tính', 'tính nhẩm chiến lược'] },
      { key: 'fractions-decimals', title: 'Phân số và số thập phân', concepts: ['phân số bằng nhau', 'so sánh phân số', 'số thập phân cơ bản', 'liên hệ phân số-thập phân'] },
      { key: 'measurement', title: 'Đo lường', concepts: ['độ dài', 'khối lượng', 'diện tích', 'thời gian', 'tiền Việt Nam', 'đổi đơn vị'] },
      { key: 'geometry', title: 'Hình học', concepts: ['góc', 'đường thẳng', 'hình vuông', 'hình chữ nhật', 'chu vi', 'diện tích'] },
      { key: 'data-problem-solving', title: 'Dữ liệu và bài toán có lời văn', concepts: ['bảng số liệu', 'biểu đồ tranh', 'trung bình cộng', 'bài toán nhiều bước'] },
    ],
  },
  vie: {
    label: 'Tiếng Việt',
    sourceSets: ['chan-troi-sang-tao', 'ket-noi-tri-thuc', 'hoc10-official'],
    books: ['Tiếng Việt 4 tập 1', 'Tiếng Việt 4 tập 2'],
    strands: [
      { key: 'reading', title: 'Đọc hiểu', concepts: ['chi tiết chính', 'nhân vật', 'trình tự sự việc', 'bài học rút ra', 'thông tin trong văn bản'] },
      { key: 'vocabulary', title: 'Mở rộng vốn từ', concepts: ['từ đồng nghĩa', 'từ trái nghĩa', 'từ theo chủ điểm', 'thành ngữ đơn giản'] },
      { key: 'grammar', title: 'Luyện từ và câu', concepts: ['danh từ', 'động từ', 'tính từ', 'câu kể', 'trạng ngữ', 'dấu câu'] },
      { key: 'writing', title: 'Tập làm văn', concepts: ['quan sát', 'lập dàn ý', 'kể chuyện', 'miêu tả', 'viết thư', 'đoạn văn ngắn'] },
    ],
  },
  eng: {
    label: 'English',
    sourceSets: ['family-and-friends-4', 'hoc10-official'],
    books: ['Tiếng Anh 4', 'Family & Friends 4'],
    strands: [
      { key: 'vocabulary', title: 'Vocabulary themes', concepts: ['jobs', 'places', 'food', 'daily routines', 'weather', 'school things', 'animals'] },
      { key: 'grammar', title: 'Grammar patterns', concepts: ['be', 'have got', 'present simple', 'can/can not', 'there is/there are', 'question forms'] },
      { key: 'skills', title: 'Listening-speaking-reading', concepts: ['short dialogue', 'matching', 'reading gist', 'sentence ordering', 'phonics'] },
    ],
  },
  it: {
    label: 'Tin học',
    sourceSets: ['chan-troi-sang-tao', 'ket-noi-tri-thuc', 'hoc10-official'],
    books: ['Tin học 4'],
    strands: [
      { key: 'digital-basics', title: 'Thiết bị số cơ bản', concepts: ['bộ phận máy tính', 'thiết bị vào ra', 'tư thế sử dụng', 'bảo quản'] },
      { key: 'files-folders', title: 'Tệp và thư mục', concepts: ['mở lưu tệp', 'thư mục chứa gì', 'sắp xếp tệp', 'tìm kiếm tệp'] },
      { key: 'safe-internet', title: 'An toàn số', concepts: ['mật khẩu', 'thông tin cá nhân', 'thời gian màn hình', 'cư xử văn minh'] },
      { key: 'logic', title: 'Tư duy thuật toán', concepts: ['thứ tự bước', 'lệnh lặp', 'điều kiện đơn giản', 'sửa lỗi'] },
    ],
  },
  sci: {
    label: 'Khoa học',
    sourceSets: ['hoc10-official', 'science-extension'],
    books: ['Khoa học 4', 'Tài liệu khoa học mở rộng'],
    strands: [
      { key: 'earth-space', title: 'Trái Đất và không gian', concepts: ['Mặt Trời', 'Mặt Trăng', 'hành tinh', 'ngày đêm', 'phương hướng'] },
      { key: 'life-science', title: 'Sinh vật', concepts: ['thực vật', 'động vật', 'cơ thể người', 'môi trường sống'] },
      { key: 'matter-energy', title: 'Vật chất và năng lượng', concepts: ['nước', 'âm thanh', 'ánh sáng', 'nhiệt', 'điện an toàn'] },
      { key: 'earth-environment', title: 'Thời tiết và môi trường', concepts: ['mây mưa', 'gió', 'biển', 'bảo vệ môi trường'] },
    ],
  },
  histgeo: {
    label: 'Lịch sử và Địa lí',
    sourceSets: ['chan-troi-sang-tao', 'ket-noi-tri-thuc', 'hoc10-official'],
    books: ['Lịch sử và Địa lí 4'],
    strands: [
      { key: 'maps-directions', title: 'Bản đồ và phương hướng', concepts: ['kí hiệu bản đồ', 'phương hướng', 'vị trí trên bản đồ'] },
      { key: 'regions-vietnam', title: 'Các vùng của Việt Nam', concepts: ['đồng bằng', 'miền núi', 'biển đảo', 'thành phố lớn'] },
      { key: 'history-figures', title: 'Nhân vật và sự kiện lịch sử', concepts: ['anh hùng dân tộc', 'truyền thống giữ nước', 'di tích lịch sử'] },
      { key: 'community-livelihood', title: 'Con người và hoạt động sống', concepts: ['nghề nghiệp', 'chợ', 'giao thông', 'bảo tồn di sản'] },
    ],
  },
  music: {
    label: 'Âm nhạc',
    sourceSets: ['chan-troi-sang-tao', 'ket-noi-tri-thuc', 'hoc10-official'],
    books: ['Âm nhạc 4'],
    strands: [
      { key: 'rhythm', title: 'Nhịp điệu', concepts: ['phách', 'nhịp 2/4', 'tiết tấu ngắn', 'gõ đệm'] },
      { key: 'melody', title: 'Giai điệu', concepts: ['cao thấp', 'nhanh chậm', 'to nhỏ', 'đoạn nhạc vui buồn'] },
      { key: 'instrument', title: 'Nhạc cụ', concepts: ['trống', 'đàn', 'sáo', 'cách nghe phân biệt âm sắc'] },
    ],
  },
  art: {
    label: 'Mĩ thuật',
    sourceSets: ['chan-troi-sang-tao', 'ket-noi-tri-thuc', 'hoc10-official'],
    books: ['Mĩ thuật 4'],
    strands: [
      { key: 'elements', title: 'Yếu tố tạo hình', concepts: ['đường nét', 'mảng hình', 'màu nóng lạnh', 'họa tiết'] },
      { key: 'practice', title: 'Thực hành sáng tạo', concepts: ['vẽ theo quan sát', 'xé dán', 'trang trí', 'làm sản phẩm thủ công'] },
      { key: 'art-appreciation', title: 'Cảm thụ nghệ thuật', concepts: ['nhìn tranh', 'miêu tả hình ảnh', 'nói cảm xúc', 'tôn trọng khác biệt'] },
    ],
  },
  ethics: {
    label: 'Đạo đức',
    sourceSets: ['chan-troi-sang-tao', 'ket-noi-tri-thuc', 'hoc10-official'],
    books: ['Đạo đức 4'],
    strands: [
      { key: 'self-management', title: 'Tự quản bản thân', concepts: ['trung thực', 'giữ lời hứa', 'biết xin lỗi', 'chăm chỉ'] },
      { key: 'relationships', title: 'Quan hệ với người khác', concepts: ['lễ phép', 'hợp tác', 'tôn trọng khác biệt', 'biết cảm ơn'] },
      { key: 'community', title: 'Trách nhiệm cộng đồng', concepts: ['giữ của công', 'bảo vệ môi trường', 'giúp đỡ người khác'] },
    ],
  },
  tech: {
    label: 'Công nghệ',
    sourceSets: ['hoc10-official'],
    books: ['Công nghệ 4'],
    strands: [
      { key: 'tools-safety', title: 'Dụng cụ và an toàn', concepts: ['kéo', 'hồ dán', 'quy tắc an toàn', 'dọn gọn sau khi làm'] },
      { key: 'making', title: 'Làm sản phẩm đơn giản', concepts: ['gấp', 'cắt', 'lắp', 'theo quy trình từng bước'] },
      { key: 'design-thinking', title: 'Thiết kế đơn giản', concepts: ['quan sát nhu cầu', 'chọn vật liệu', 'thử và sửa'] },
    ],
  },
  life: {
    label: 'Hoạt động trải nghiệm',
    sourceSets: ['hoc10-official'],
    books: ['Hoạt động trải nghiệm 4'],
    strands: [
      { key: 'self-care', title: 'Tự phục vụ', concepts: ['sắp xếp góc học tập', 'lập kế hoạch ngày', 'giữ vệ sinh cá nhân'] },
      { key: 'social', title: 'Giao tiếp và hợp tác', concepts: ['lắng nghe', 'chia việc', 'nói lời tích cực', 'giải quyết mâu thuẫn'] },
      { key: 'community', title: 'Kết nối cộng đồng', concepts: ['biết ơn', 'tham gia việc chung', 'yêu quê hương'] },
    ],
  },
  pe: {
    label: 'Giáo dục thể chất',
    sourceSets: ['hoc10-official'],
    books: ['Giáo dục thể chất 4'],
    strands: [
      { key: 'movement', title: 'Vận động cơ bản', concepts: ['chạy', 'bật nhảy', 'giữ thăng bằng', 'phối hợp tay chân'] },
      { key: 'healthy-habits', title: 'Thói quen khỏe mạnh', concepts: ['khởi động', 'uống nước', 'thở đều', 'nghỉ đúng lúc'] },
      { key: 'team-play', title: 'Chơi cùng bạn', concepts: ['tuân luật', 'an toàn khi chơi', 'cổ vũ bạn'] },
    ],
  },
};

export function getDailyEnrichmentSubjects(dayNumber) {
  const ring = ['histgeo', 'music', 'art', 'ethics', 'tech', 'life', 'pe'];
  const first = ring[(dayNumber - 1) % ring.length];
  const second = ring[(dayNumber + 2) % ring.length];
  const third = ring[(dayNumber + 4) % ring.length];
  return [first, second, third];
}

export function getSubjectEstimatedMinutes(subject) {
  return LONG_RANGE_STUDY_POLICY.estimatedMinutesBySubject[subject] || 9;
}
