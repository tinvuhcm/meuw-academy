/**
 * MEUW ACADEMY — curriculum-m1.js
 * Month 1 (Days 1-28) - ĐỘ KHÓ: LỚP 4 (Bộ GDĐT)
 */

export const M1_DATA = {
  day1: {
    title: 'Khởi hành tới Châu Phi',
    modules: [
      {
        id: 'd1-am-1',
        session: 'am',
        subject: 'math',
        title: 'Số tự nhiên đến lớp triệu',
        xp: 50,
        questions: [
          {
            type: 'multiple-choice',
            question: 'Vườn quốc gia Serengeti có khoảng 1.500.000 linh dương Gnu. Trong số 1.500.000, chữ số 5 thuộc hàng nào, lớp nào?',
            illustration: `<svg viewBox="0 0 200 80"><text x="50%" y="60%" font-size="40" font-weight="bold" fill="#7C3AED" text-anchor="middle">1.500.000</text></svg>`,
            options: [
              'Hàng trăm nghìn, lớp nghìn', 
              'Hàng chục nghìn, lớp nghìn', 
              'Hàng trăm nghìn, lớp triệu',
              'Hàng triệu, lớp triệu'
            ],
            answer: 'Hàng trăm nghìn, lớp nghìn',
            explanation: 'Số 1.500.000 có chữ số 5 đứng ở vị trí thứ 6 từ phải sang trái, tức là hàng trăm nghìn. Hàng trăm nghìn thuộc lớp nghìn em nhé!'
          },
          {
            type: 'fill-blank',
            question: 'Tính tổng đàn voi:',
            illustration: `<svg viewBox="0 0 200 80"><text x="30" y="50" font-size="30">🐘 234.500</text><text x="130" y="50" font-size="30">+ 🐘 123.400</text></svg>`,
            blanks: [
              { label: 'Khu bảo tồn A có 234,500 con voi, khu B có 123,400 con. Tổng cộng có:', type: 'number', answer: '357900', unit: 'con voi' }
            ],
            hint: 'Em hãy đặt tính rồi tính: 234500 + 123400 nhé!'
          }
        ]
      },
      {
        id: 'd1-am-2',
        session: 'am',
        subject: 'eng',
        title: 'Đặc điểm động vật (Flyers)',
        xp: 60,
        questions: [
          {
            type: 'drag-match',
            question: 'Ghép từ vựng bộ phận cơ thể động vật hoang dã (Animal Parts)',
            pairs: [
              { id: '1', left: 'Trunk', right: 'Vòi voi' },
              { id: '2', left: 'Tusk', right: 'Ngà voi' },
              { id: '3', left: 'Mane', right: 'Bờm sư tử' },
              { id: '4', left: 'Scales', right: 'Vảy (cá sấu, rắn)' }
            ]
          },
          {
            type: 'speech-practice',
            question: 'So sánh hơn (Comparative Adjectives)',
            promptText: 'Hãy nói to câu so sánh khối lượng của Voi châu Phi và Voi châu Á:',
            sample: 'The African elephant is heavier than the Asian elephant.',
            lang: 'en',
            minWords: 5
          }
        ]
      },
      {
        id: 'd1-pm-1',
        session: 'pm',
        subject: 'sci',
        title: 'Chuỗi Thức Ăn Cơ Bản',
        xp: 80,
        questions: [
          {
            type: 'interactive-svg',
            question: 'Chuỗi thức ăn: Cỏ ➔ Ngựa Vằn ➔ Sư Tử',
            instruction: 'Em hãy chạm vào "Sinh vật tiêu thụ bậc 1" (Động vật ăn cỏ).',
            targetActions: 1,
            svgContent: `
              <svg viewBox="0 0 300 150" width="100%" height="200" style="background:#FFF; border-radius:12px; font-size:40px">
                <g data-action="click-wrong" style="cursor:pointer">
                  <text x="30" y="80">🌿</text>
                  <text x="30" y="120" font-size="12" font-weight="bold" fill="#1F2937">Sản xuất</text>
                </g>
                <text x="80" y="70" font-size="20">➔</text>
                <g data-action="click-grow" data-scale="1.3" style="cursor:pointer; transform-origin:130px 80px">
                  <text x="110" y="80">🦓</text>
                  <text x="110" y="120" font-size="12" font-weight="bold" fill="#1F2937">Tiêu thụ 1</text>
                </g>
                <text x="180" y="70" font-size="20">➔</text>
                <g data-action="click-wrong" style="cursor:pointer">
                  <text x="220" y="80">🦁</text>
                  <text x="220" y="120" font-size="12" font-weight="bold" fill="#1F2937">Tiêu thụ 2</text>
                </g>
              </svg>
            `,
            followUp: {
              question: 'Nếu tất cả cỏ biến mất, điều gì sẽ xảy ra với sư tử?',
              options: [
                'Sư tử chuyển sang ăn lá cây', 
                'Sư tử sẽ không bị ảnh hưởng gì', 
                'Sư tử sẽ thiếu thức ăn vì ngựa vằn không có cỏ để sống'
              ],
              answer: 'Sư tử sẽ thiếu thức ăn vì ngựa vằn không có cỏ để sống'
            }
          }
        ]
      }
    ]
  },
  day2: {
    title: 'Khám phá Rừng rậm',
    modules: [
      {
        id: 'd2-am-1',
        session: 'am',
        subject: 'math',
        title: 'Tìm số Trung Bình Cộng',
        xp: 50,
        questions: [
          {
            type: 'multiple-choice',
            question: 'Một con báo săn chạy 3 lần để đuổi mồi. Lần 1 tốc độ đạt 105 km/h, lần 2 đạt 110 km/h, lần 3 đạt 115 km/h. Vận tốc trung bình của báo săn là bao nhiêu?',
            illustration: `<div class="text-center text-6xl my-4">🐆💨</div>`,
            options: ['105 km/h', '110 km/h', '115 km/h', '330 km/h'],
            answer: '110 km/h',
            explanation: 'Muốn tìm trung bình cộng, ta tính tổng rồi chia cho số số hạng: (105 + 110 + 115) : 3 = 330 : 3 = 110 km/h.'
          },
          {
            type: 'fill-blank',
            question: 'Lượng mưa trung bình:',
            blanks: [
              { label: 'Rừng Amazon nhận lượng mưa trong 3 tháng lần lượt là 250mm, 300mm và 350mm. Lượng mưa trung bình mỗi tháng là:', type: 'number', answer: '300', unit: 'mm' }
            ],
            hint: 'Tính tổng lượng mưa của 3 tháng rồi chia cho 3 nhé em!'
          }
        ]
      },
      {
        id: 'd2-pm-1',
        session: 'pm',
        subject: 'art',
        title: 'Vẽ một cái cây',
        xp: 80,
        questions: [
          {
            type: 'drawing-canvas',
            question: 'Hãy vẽ một cái cây to và đẹp để thực hành quang hợp nhé!',
            drawingTitle: 'Cây của Meuw',
            steps: [
              {
                instruction: 'Đầu tiên, vẽ thân cây (2 đường thẳng dọc)',
                svg: '<svg viewBox="0 0 100 100"><rect x="40" y="50" width="20" height="40" fill="none" stroke="#000" stroke-width="4"/></svg>'
              },
              {
                instruction: 'Tiếp theo, vẽ tán lá hình tròn hoặc đám mây',
                svg: '<svg viewBox="0 0 100 100"><rect x="40" y="50" width="20" height="40" fill="none" stroke="#000" stroke-width="4"/><circle cx="50" cy="40" r="30" fill="none" stroke="#000" stroke-width="4"/></svg>'
              }
            ]
          }
        ]
      }
    ]
  }
};
