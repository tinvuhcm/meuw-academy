/**
 * MEUW ACADEMY — curriculum-m1.js
 * Month 1 (Days 1-28)
 */

export const M1_DATA = {
  day1: {
    title: 'Khởi hành tới Châu Phi',
    modules: [
      {
        id: 'd1-am-1',
        session: 'am',
        subject: 'math',
        title: 'Đếm số lượng động vật',
        xp: 50,
        questions: [
          {
            type: 'multiple-choice',
            question: 'Có bao nhiêu chú hươu cao cổ trong hình?',
            illustration: `<svg viewBox="0 0 100 100"><text x="20" y="50" font-size="30">🦒</text><text x="50" y="70" font-size="30">🦒</text><text x="60" y="30" font-size="30">🦒</text></svg>`,
            options: ['1', '2', '3', '4'],
            answer: '3',
            explanation: 'Có 3 chú hươu cao cổ đang đứng ăn lá cây đó em.'
          },
          {
            type: 'fill-blank',
            question: 'Điền số thích hợp:',
            illustration: `<svg viewBox="0 0 100 100"><text x="20" y="50" font-size="30">🐘</text><text x="60" y="50" font-size="30">🐘</text></svg>`,
            blanks: [
              { label: 'Số voi:', type: 'number', answer: '2', unit: 'con' }
            ],
            hint: 'Hãy đếm xem có bao nhiêu bạn voi nhé!'
          }
        ]
      },
      {
        id: 'd1-am-2',
        session: 'am',
        subject: 'eng',
        title: 'Chào hỏi cơ bản',
        xp: 60,
        questions: [
          {
            type: 'drag-match',
            question: 'Ghép từ tiếng Anh với nghĩa tiếng Việt',
            pairs: [
              { id: '1', left: 'Hello', right: 'Xin chào' },
              { id: '2', left: 'Goodbye', right: 'Tạm biệt' },
              { id: '3', left: 'Thank you', right: 'Cảm ơn' }
            ]
          },
          {
            type: 'speech-practice',
            question: 'Nói "Xin chào" bằng tiếng Anh nhé',
            promptText: 'Hãy nói "Hello!" thật to và rõ ràng.',
            sample: 'Hello!',
            lang: 'en',
            minWords: 1
          }
        ]
      },
      {
        id: 'd1-pm-1',
        session: 'pm',
        subject: 'art',
        title: 'Tô màu Vua Sư Tử',
        xp: 80,
        questions: [
          {
            type: 'color-fill',
            question: 'Tô màu cho chú sư tử thật rực rỡ nhé!',
            title: 'Sư tử dũng mãnh',
            svgContent: `
              <svg viewBox="0 0 200 200" width="100%" height="300" style="background:#FFF; border-radius:12px">
                <circle cx="100" cy="100" r="80" stroke="#000" stroke-width="4" data-region="true" />
                <circle cx="100" cy="100" r="50" stroke="#000" stroke-width="4" data-region="true" />
                <circle cx="80" cy="85" r="5" fill="#000" />
                <circle cx="120" cy="85" r="5" fill="#000" />
                <path d="M 90 110 Q 100 120 110 110" stroke="#000" stroke-width="3" fill="none" />
              </svg>
            `,
            palette: ['#FCD34D', '#F59E0B', '#D97706', '#EF4444', '#FFFFFF']
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
        subject: 'sci',
        title: 'Cây cần gì để sống?',
        xp: 50,
        questions: [
          {
            type: 'interactive-svg',
            question: 'Chạm vào những thứ cây cần để lớn lên!',
            instruction: 'Tìm và chạm vào Nước và Mặt Trời.',
            targetActions: 2,
            svgContent: `
              <svg viewBox="0 0 200 200" width="100%" height="250">
                <!-- Tree -->
                <rect x="90" y="100" width="20" height="80" fill="#8B4513" />
                <circle cx="100" cy="80" r="40" fill="#22C55E" />
                
                <!-- Sun -->
                <g data-action="click-grow" data-scale="1.2" style="cursor:pointer; transform-origin: 30px 30px;">
                  <circle cx="30" cy="30" r="20" fill="#FCD34D" />
                </g>
                
                <!-- Rain -->
                <g data-action="click-grow" data-scale="1.2" style="cursor:pointer; transform-origin: 170px 30px;">
                  <path d="M160,20 Q170,10 180,20 Q180,40 170,40 Q160,40 160,20" fill="#3B82F6" />
                </g>

                <!-- Rock (Wrong) -->
                <circle cx="40" cy="170" r="15" fill="#9CA3AF" data-action="click-wrong" style="cursor:pointer" />
              </svg>
            `,
            followUp: {
              question: 'Vậy cây cần Nước và Mặt Trời để làm gì?',
              options: ['Để ngủ ngon', 'Để quang hợp tạo thức ăn', 'Để bơi lội'],
              answer: 'Để quang hợp tạo thức ăn'
            }
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
            question: 'Hãy vẽ một cái cây thật to nhé!',
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
