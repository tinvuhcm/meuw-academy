const EN_DICT = {
    'Gia đình': [{en: 'Father', vi: 'Bố'}, {en: 'Mother', vi: 'Mẹ'}, {en: 'Brother', vi: 'Anh/em trai'}, {en: 'Sister', vi: 'Chị/em gái'}, {en: 'Grandfather', vi: 'Ông'}, {en: 'Grandmother', vi: 'Bà'}, {en: 'Uncle', vi: 'Chú/bác'}, {en: 'Aunt', vi: 'Cô/dì'}, {en: 'Cousin', vi: 'Anh chị em họ'}],
    'Động vật hoang dã': [{en: 'Lion', vi: 'Sư tử'}, {en: 'Tiger', vi: 'Con hổ'}, {en: 'Elephant', vi: 'Con voi'}, {en: 'Monkey', vi: 'Con khỉ'}, {en: 'Giraffe', vi: 'Hươu cao cổ'}, {en: 'Zebra', vi: 'Ngựa vằn'}, {en: 'Bear', vi: 'Con gấu'}, {en: 'Snake', vi: 'Con rắn'}, {en: 'Crocodile', vi: 'Cá sấu'}, {en: 'Hippo', vi: 'Hà mã'}, {en: 'Rhino', vi: 'Tê giác'}, {en: 'Kangaroo', vi: 'Chuột túi'}],
    'Trường học': [{en: 'Teacher', vi: 'Giáo viên'}, {en: 'Student', vi: 'Học sinh'}, {en: 'School', vi: 'Trường học'}, {en: 'Classroom', vi: 'Lớp học'}, {en: 'Book', vi: 'Quyển sách'}, {en: 'Pen', vi: 'Cây bút'}, {en: 'Pencil', vi: 'Bút chì'}, {en: 'Eraser', vi: 'Cục tẩy'}, {en: 'Ruler', vi: 'Thước kẻ'}, {en: 'Desk', vi: 'Cái bàn'}],
    'Sở thích': [{en: 'Reading', vi: 'Đọc sách'}, {en: 'Swimming', vi: 'Bơi lội'}, {en: 'Singing', vi: 'Ca hát'}, {en: 'Dancing', vi: 'Nhảy múa'}, {en: 'Drawing', vi: 'Vẽ tranh'}, {en: 'Playing soccer', vi: 'Chơi bóng đá'}, {en: 'Cooking', vi: 'Nấu ăn'}, {en: 'Gaming', vi: 'Chơi game'}, {en: 'Traveling', vi: 'Đi du lịch'}],
    'Trái cây & Rau củ': [{en: 'Apple', vi: 'Quả táo'}, {en: 'Banana', vi: 'Quả chuối'}, {en: 'Orange', vi: 'Quả cam'}, {en: 'Grapes', vi: 'Quả nho'}, {en: 'Watermelon', vi: 'Dưa hấu'}, {en: 'Carrot', vi: 'Củ cà rốt'}, {en: 'Tomato', vi: 'Cà chua'}, {en: 'Potato', vi: 'Khoai tây'}, {en: 'Onion', vi: 'Củ hành'}, {en: 'Cabbage', vi: 'Bắp cải'}],
    'Nghề nghiệp': [{en: 'Doctor', vi: 'Bác sĩ'}, {en: 'Nurse', vi: 'Y tá'}, {en: 'Teacher', vi: 'Giáo viên'}, {en: 'Police', vi: 'Cảnh sát'}, {en: 'Firefighter', vi: 'Lính cứu hỏa'}, {en: 'Farmer', vi: 'Nông dân'}, {en: 'Chef', vi: 'Đầu bếp'}, {en: 'Singer', vi: 'Ca sĩ'}, {en: 'Actor', vi: 'Diễn viên'}],
    'Màu sắc & Hình khối': [{en: 'Red', vi: 'Màu đỏ'}, {en: 'Blue', vi: 'Màu xanh dương'}, {en: 'Green', vi: 'Màu xanh lá'}, {en: 'Yellow', vi: 'Màu vàng'}, {en: 'Black', vi: 'Màu đen'}, {en: 'White', vi: 'Màu trắng'}, {en: 'Circle', vi: 'Hình tròn'}, {en: 'Square', vi: 'Hình vuông'}, {en: 'Triangle', vi: 'Hình tam giác'}],
    'Phương tiện giao thông': [{en: 'Car', vi: 'Xe hơi'}, {en: 'Bus', vi: 'Xe buýt'}, {en: 'Train', vi: 'Tàu hỏa'}, {en: 'Airplane', vi: 'Máy bay'}, {en: 'Bicycle', vi: 'Xe đạp'}, {en: 'Motorcycle', vi: 'Xe máy'}, {en: 'Boat', vi: 'Chiếc thuyền'}, {en: 'Ship', vi: 'Tàu thủy'}, {en: 'Subway', vi: 'Tàu điện ngầm'}],
    'Ôn tập tổng hợp': []
};

const VIE_DICT = {
    'Từ trái nghĩa': [
        {q: 'Từ trái nghĩa với "Nóng" là gì?', ans: 'Lạnh', options: ['Ấm', 'Mát', 'Lạnh', 'Nắng']},
        {q: 'Từ trái nghĩa với "Cao" là gì?', ans: 'Thấp', options: ['To', 'Nhỏ', 'Thấp', 'Gầy']},
        {q: 'Từ trái nghĩa với "Nhanh" là gì?', ans: 'Chậm', options: ['Lẹ', 'Từ từ', 'Chậm', 'Vội']},
        {q: 'Từ trái nghĩa với "Vui" là gì?', ans: 'Buồn', options: ['Tức giận', 'Khóc', 'Buồn', 'Chán']},
        {q: 'Từ trái nghĩa với "Khó" là gì?', ans: 'Dễ', options: ['Rắc rối', 'Dễ', 'Đơn giản', 'Phức tạp']},
        {q: 'Từ trái nghĩa với "Ngày" là gì?', ans: 'Đêm', options: ['Sáng', 'Trưa', 'Chiều', 'Đêm']},
        {q: 'Từ trái nghĩa với "Dày" là gì?', ans: 'Mỏng', options: ['To', 'Nặng', 'Mỏng', 'Nhỏ']},
        {q: 'Từ trái nghĩa với "Đen" là gì?', ans: 'Trắng', options: ['Xám', 'Đỏ', 'Trắng', 'Xanh']},
        {q: 'Từ trái nghĩa với "Xấu" là gì?', ans: 'Đẹp', options: ['Tồi', 'Kém', 'Đẹp', 'Giỏi']}
    ],
    'Chính tả: Phân biệt ch/tr': [
        {q: 'Chọn từ viết ĐÚNG chính tả:', ans: 'Cây tre', options: ['Cây tre', 'Cây che', 'Cây chè', 'Cây trè']},
        {q: 'Chọn từ viết ĐÚNG chính tả:', ans: 'Chăm chỉ', options: ['Trăm chỉ', 'Chăm chỉ', 'Trăm trỉ', 'Chăm trỉ']},
        {q: 'Chọn từ viết SAI chính tả:', ans: 'Con tró', options: ['Con chó', 'Con tró', 'Chăm sóc', 'Trông coi']},
        {q: 'Chọn từ đúng điền vào chỗ trống: "Trời mưa lất phất, con đường đất đỏ trở nên lầy ... "', ans: 'lội', options: ['lội', 'nội', 'nhội', 'nhầy']},
        {q: 'Từ nào sau đây là chỉ hoạt động?', ans: 'Chạy', options: ['Chạy', 'Bàn', 'Đẹp', 'Xanh']}
    ],
    'Đọc hiểu: Chuyện cổ tích': [
        {q: 'Trong truyện Tấm Cám, Tấm dùng con vật gì để nuôi trong giếng?', ans: 'Cá Bống', options: ['Cá Chép', 'Cá Bống', 'Cá Trê', 'Cá Quả']},
        {q: 'Ai là người đã giúp đỡ Thạch Sanh đánh bại chằn tinh?', ans: 'Tự mình đánh bại', options: ['Lý Thông', 'Công chúa', 'Tự mình đánh bại', 'Nhà vua']},
        {q: 'Cây khế trong truyện cổ tích "Ăn khế trả vàng" được chim gì đến ăn?', ans: 'Chim Phượng Hoàng', options: ['Chim Đại Bàng', 'Chim Phượng Hoàng', 'Chim Sẻ', 'Chim Bồ Câu']},
        {q: 'Nhân vật Thánh Gióng cưỡi con vật gì ra trận?', ans: 'Ngựa sắt', options: ['Voi', 'Trâu', 'Ngựa sắt', 'Rồng']}
    ],
    'Cấu tạo câu': [
        {q: 'Chủ ngữ trong câu: "Con mèo đang ngủ trên ghế" là gì?', ans: 'Con mèo', options: ['Con mèo', 'đang ngủ', 'trên ghế', 'mèo đang ngủ']},
        {q: 'Vị ngữ trong câu: "Mặt trời mọc ở đằng Đông" là gì?', ans: 'mọc ở đằng Đông', options: ['Mặt trời mọc', 'ở đằng Đông', 'mọc ở đằng Đông', 'Mặt trời']},
        {q: 'Câu nào sau đây là câu hỏi?', ans: 'Bạn đã làm bài tập chưa?', options: ['Trời hôm nay đẹp quá!', 'Bạn đã làm bài tập chưa?', 'Hãy đi tắm đi.', 'Con chó đang sủa.']}
    ]
};

const SCI_DICT = {
    'Vương Quốc Động Vật': [
        {q: 'Động vật nào sau đây chạy nhanh nhất trên cạn?', ans: 'Báo gấm (Cheetah)', options: ['Sư tử', 'Báo gấm (Cheetah)', 'Ngựa vằn', 'Đà điểu']},
        {q: 'Cá voi xanh thuộc nhóm động vật nào?', ans: 'Động vật có vú', options: ['Cá', 'Bò sát', 'Động vật có vú', 'Lưỡng cư']},
        {q: 'Chim cánh cụt sống nhiều nhất ở đâu?', ans: 'Nam Cực', options: ['Bắc Cực', 'Nam Cực', 'Châu Phi', 'Rừng nhiệt đới']},
        {q: 'Loài vật nào được mệnh danh là "Chúa sơn lâm"?', ans: 'Sư tử / Hổ', options: ['Voi', 'Sư tử / Hổ', 'Gấu', 'Báo']}
    ],
    'Hệ Mặt Trời': [
        {q: 'Hành tinh nào gần Mặt trời nhất?', ans: 'Sao Thủy', options: ['Sao Kim', 'Trái Đất', 'Sao Thủy', 'Sao Hỏa']},
        {q: 'Trái Đất mất bao lâu để quay quanh Mặt trời?', ans: '1 năm (khoảng 365 ngày)', options: ['1 tháng', '1 tuần', '1 năm (khoảng 365 ngày)', '1 thập kỷ']},
        {q: 'Hành tinh nào được gọi là "Hành tinh Đỏ"?', ans: 'Sao Hỏa', options: ['Sao Mộc', 'Sao Thổ', 'Sao Hỏa', 'Sao Kim']},
        {q: 'Mặt trăng có tự phát sáng không?', ans: 'Không, nó phản chiếu ánh sáng Mặt trời', options: ['Có', 'Không, nó phản chiếu ánh sáng Mặt trời', 'Phát sáng vào ban đêm', 'Tùy lúc']}
    ],
    'Khoa Học & Phát Minh': [
        {q: 'Ai là người phát minh ra bóng đèn sợi đốt?', ans: 'Thomas Edison', options: ['Albert Einstein', 'Isaac Newton', 'Thomas Edison', 'Nikola Tesla']},
        {q: 'Lực nào giữ chúng ta trên mặt đất?', ans: 'Trọng lực', options: ['Lực ma sát', 'Trọng lực', 'Lực từ', 'Khí áp']},
        {q: 'Nước đóng băng ở bao nhiêu độ C?', ans: '0 độ C', options: ['100 độ C', '50 độ C', '0 độ C', '-10 độ C']}
    ],
    'Cơ thể người': [
        {q: 'Cơ quan nào bơm máu đi khắp cơ thể?', ans: 'Trái tim', options: ['Phổi', 'Não', 'Dạ dày', 'Trái tim']},
        {q: 'Con người hít khí gì để sống?', ans: 'Oxy', options: ['Carbon Dioxide', 'Oxy', 'Nito', 'Hydro']},
        {
            q: 'Bộ phận nào giúp cơ thể giữ thăng bằng?', 
            ans: 'Tai', 
            options: ['Mắt', 'Tai', 'Chân', 'Mũi'],
            explanation: 'Tai giúp chúng ta giữ thăng bằng nhờ một "máy cảm biến" đặc biệt nằm sâu bên trong tai, gọi là <b>hệ thống tiền đình</b>.<br/><br/>Bé hãy tưởng tượng bên trong tai có một mê cung nhỏ chứa đầy nước và những sợi lông siêu nhỏ:<br/>- <b>Khi bé chuyển động:</b> Lúc bé chạy nhảy, cúi đầu hoặc quay người, dòng nước bên trong tai sẽ sóng sánh và chuyển động theo.<br/>- <b>Sợi lông lay động:</b> Dòng nước chảy làm các sợi lông nhỏ xíu bị nghiêng ngả giống như rặng rong biển dưới đáy biển khi có sóng.<br/>- <b>Báo tin cho não:</b> Các sợi lông này ngay lập tức gửi "tin nhắn" lên bộ não để thông báo sự thay đổi.<br/>- <b>Não giữ thăng bằng:</b> Nhận được tin, não sẽ điều khiển tay chân và các cơ bắp điều chỉnh tư thế ngay lập tức để bé không bị ngã.<br/><br/><i>Một ví dụ vui: Khi bé chơi trò xoay tròn rồi dừng lại, bé sẽ thấy chóng mặt vì dù bé đã đứng yên, dòng nước bên trong tai vẫn đang tiếp tục sóng sánh theo quán tính, làm não bị "hiểu lầm" là bé vẫn đang xoay đấy!</i>'
        }
    ]
};

const IT_DICT = {
    'Máy tính là gì?': [
        {q: 'Phần mềm (Software) là gì?', ans: 'Các chương trình chạy trên máy tính', options: ['Các bộ phận vật lý', 'Màn hình', 'Các chương trình chạy trên máy tính', 'Bàn phím']},
        {q: 'Phần cứng (Hardware) là gì?', ans: 'Các bộ phận sờ được của máy tính', options: ['Trò chơi', 'Các bộ phận sờ được của máy tính', 'Virus máy tính', 'Hệ điều hành']},
        {q: 'CPU được coi là bộ phận gì của máy tính?', ans: 'Bộ não', options: ['Trái tim', 'Bộ não', 'Đôi mắt', 'Đôi tay']}
    ],
    'An toàn trên mạng': [
        {q: 'Mật khẩu (Password) tốt là mật khẩu như thế nào?', ans: 'Dài, khó đoán và bảo mật', options: ['Là tên của bạn', 'Là 123456', 'Dài, khó đoán và bảo mật', 'Viết ra giấy dán lên máy tính']},
        {q: 'Khi người lạ trên mạng hỏi địa chỉ nhà, em nên làm gì?', ans: 'Báo cho bố mẹ', options: ['Cho họ địa chỉ', 'Báo cho bố mẹ', 'Chụp ảnh nhà gửi', 'Hẹn gặp mặt']},
        {q: 'Không nên nhấn vào đâu khi lướt web?', ans: 'Đường link lạ, trúng thưởng', options: ['Trang học tập', 'Đường link lạ, trúng thưởng', 'Website của trường', 'Google']}
    ],
    'Sử dụng chuột và bàn phím': [
        {q: 'Chuột máy tính thường có mấy nút chính?', ans: '2 (Trái, Phải)', options: ['1', '2 (Trái, Phải)', '3', '4']},
        {q: 'Để viết hoa một chữ cái, ta giữ phím gì?', ans: 'Shift', options: ['Ctrl', 'Alt', 'Shift', 'Enter']},
        {q: 'Phím Enter thường dùng để làm gì?', ans: 'Xác nhận hoặc xuống dòng', options: ['Xóa chữ', 'Xác nhận hoặc xuống dòng', 'Tắt máy', 'Chơi game']}
    ]
};

module.exports = {
    EN_DICT,
    VIE_DICT,
    SCI_DICT,
    IT_DICT
};
