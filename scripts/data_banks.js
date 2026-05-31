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
        {
            passage: 'Tấm Cám là câu chuyện cổ tích về một cô gái hiền lành tên Tấm. Tấm bị mẹ con cám bắt nạt, phải làm lụng vất vả. Một hôm, Tấm bắt được một con cá Bống nhỏ và lén đem thả xuống giếng để nuôi. Ngày ngày, Tấm đều dành một phần cơm của mình mang ra giếng gọi Bống lên ăn.',
            q: 'Trong truyện Tấm Cám, Tấm dùng con vật gì để nuôi trong giếng?', 
            ans: 'Cá Bống', 
            options: ['Cá Chép', 'Cá Bống', 'Cá Trê', 'Cá Quả']
        },
        {
            passage: 'Thạch Sanh là một chàng trai mồ côi, có sức khỏe phi thường và một cây búa thần. Trong làng có một con chằn tinh hung dữ chuyên bắt người ăn thịt. Lý Thông lừa Thạch Sanh đi nộp mạng thay mình. Nhưng với lòng dũng cảm, Thạch Sanh đã tự mình cầm búa đánh bại chằn tinh, cứu giúp dân làng.',
            q: 'Ai là người đã giúp đỡ Thạch Sanh đánh bại chằn tinh?', 
            ans: 'Tự mình đánh bại', 
            options: ['Lý Thông', 'Công chúa', 'Tự mình đánh bại', 'Nhà vua']
        },
        {
            passage: 'Có hai anh em nhà nọ, người anh tham lam lấy hết tài sản, chỉ chia cho người em một cây khế nhỏ. Người em chăm chỉ chăm sóc cây khế. Khi khế chín, một con chim Phượng Hoàng khổng lồ bay đến ăn khế. Chim hứa sẽ trả vàng cho người em bằng câu nói: "Ăn một quả, trả cục vàng, may túi ba gang, mang đi mà đựng".',
            q: 'Cây khế trong truyện cổ tích "Ăn khế trả vàng" được chim gì đến ăn?', 
            ans: 'Chim Phượng Hoàng', 
            options: ['Chim Đại Bàng', 'Chim Phượng Hoàng', 'Chim Sẻ', 'Chim Bồ Câu']
        },
        {
            passage: 'Vào đời Hùng Vương thứ 6, có một cậu bé tên Gióng, lên ba tuổi mà không biết nói biết cười. Khi giặc Ân sang xâm lược, Gióng bỗng vươn vai lớn nhanh như thổi, trở thành tráng sĩ. Gióng mặc áo giáp sắt, đội nón sắt, cầm roi sắt, và cưỡi trên một con ngựa sắt phun ra lửa để đi đánh giặc.',
            q: 'Nhân vật Thánh Gióng cưỡi con vật gì ra trận?', 
            ans: 'Ngựa sắt', 
            options: ['Voi', 'Trâu', 'Ngựa sắt', 'Rồng']
        }
    ],
    'Cấu tạo câu': [
        {q: 'Chủ ngữ trong câu: "Con mèo đang ngủ trên ghế" là gì?', ans: 'Con mèo', options: ['Con mèo', 'đang ngủ', 'trên ghế', 'mèo đang ngủ']},
        {q: 'Vị ngữ trong câu: "Mặt trời mọc ở đằng Đông" là gì?', ans: 'mọc ở đằng Đông', options: ['Mặt trời mọc', 'ở đằng Đông', 'mọc ở đằng Đông', 'Mặt trời']},
        {q: 'Câu nào sau đây là câu hỏi?', ans: 'Bạn đã làm bài tập chưa?', options: ['Trời hôm nay đẹp quá!', 'Bạn đã làm bài tập chưa?', 'Hãy đi tắm đi.', 'Con chó đang sủa.']}
    ]
};

const SCI_DICT = {
    'Vương Quốc Động Vật': [
        {
            q: 'Động vật nào sau đây chạy nhanh nhất trên cạn?', 
            ans: 'Báo gấm (Cheetah)', 
            options: ['Sư tử', 'Báo gấm (Cheetah)', 'Ngựa vằn', 'Đà điểu'],
            explanation: 'Báo gấm (Cheetah) là quán quân chạy nước rút trên cạn với tốc độ có thể lên tới <b>120 km/h</b>, ngang với một chiếc ô tô chạy trên đường cao tốc!<br/><br/>Bí quyết của chúng là:<br/>- <b>Cột sống siêu dẻo dai:</b> Hoạt động như một chiếc lò xo, giúp sải chân của báo vươn rất dài.<br/>- <b>Móng vuốt không thu lại được:</b> Giống như giày đinh của cầu thủ bóng đá, giúp báo gấm bám chặt vào mặt đất mà không bị trượt.<br/>- <b>Chiếc đuôi dài:</b> Đóng vai trò như một bánh lái để giữ thăng bằng khi chuyển hướng đột ngột ở tốc độ cao.<br/><br/><i>Tuy nhiên, vì chạy quá nhanh nên cơ thể báo gấm tỏa rất nhiều nhiệt, chúng chỉ có thể duy trì tốc độ tối đa trong một thời gian rất ngắn (vài chục giây) trước khi phải nghỉ ngơi.</i>'
        },
        {
            q: 'Cá voi xanh thuộc nhóm động vật nào?', 
            ans: 'Động vật có vú', 
            options: ['Cá', 'Bò sát', 'Động vật có vú', 'Lưỡng cư'],
            explanation: 'Dù có chữ "Cá" trong tên gọi và sống cả đời dưới nước, Cá voi xanh thực chất là <b>Động vật có vú</b>!<br/><br/>Điểm khác biệt giữa cá voi và các loài cá thông thường:<br/>- <b>Thở bằng phổi:</b> Chúng không có mang để thở dưới nước. Cá voi phải ngoi lên mặt nước để hít thở không khí qua một cái lỗ trên đỉnh đầu.<br/>- <b>Đẻ con và cho con bú:</b> Thay vì đẻ trứng, cá voi mẹ đẻ con và nuôi con bằng sữa mẹ.<br/>- <b>Động vật máu nóng:</b> Cơ thể chúng luôn giữ một mức nhiệt độ ổn định, nhờ lớp mỡ cực dày dưới da để chống lại cái lạnh của đại dương.<br/><br/><i>Bạn có biết: Cá voi xanh là loài động vật lớn nhất từng tồn tại trên Trái Đất, lớn hơn cả những con khủng long khổng lồ nhất!</i>'
        },
        {
            q: 'Chim cánh cụt sống nhiều nhất ở đâu?', 
            ans: 'Nam Cực', 
            options: ['Bắc Cực', 'Nam Cực', 'Châu Phi', 'Rừng nhiệt đới'],
            explanation: 'Hầu hết các loài chim cánh cụt sống ở khu vực <b>Nam Bán Cầu</b>, đặc biệt là ở <b>Nam Cực</b> vô cùng giá lạnh.<br/><br/>Để sinh tồn ở nơi lạnh nhất Trái Đất, chim cánh cụt có những "bộ giáp" tự nhiên tuyệt vời:<br/>- <b>Lớp mỡ dày:</b> Đóng vai trò như một chiếc chăn bông ấm áp giữ nhiệt cho cơ thể.<br/>- <b>Lông vũ đan lớp:</b> Những chiếc lông của chúng ngắn, cứng và đan xếp vào nhau rất khít, bên ngoài còn được bôi một lớp dầu giúp chống thấm nước hoàn toàn.<br/>- <b>Khả năng bơi lội:</b> Đôi cánh không thể bay trên trời nhưng lại hoạt động như mái chèo, biến chúng thành những "ngư lôi" siêu tốc dưới nước.<br/><br/><i>Bắc Cực là nhà của Gấu trắng, còn Nam Cực là nhà của Chim cánh cụt. Hai loài này không bao giờ gặp nhau trong tự nhiên đâu!</i>'
        },
        {
            q: 'Loài vật nào được mệnh danh là "Chúa sơn lâm"?', 
            ans: 'Sư tử / Hổ', 
            options: ['Voi', 'Sư tử / Hổ', 'Gấu', 'Báo'],
            explanation: 'Cả <b>Sư tử</b> và <b>Hổ</b> đều được mệnh danh là "Chúa sơn lâm" (Vua của núi rừng) tùy theo từng nền văn hóa.<br/><br/>- <b>Sư tử (Vua sư tử):</b> Có sức mạnh vượt trội và sống theo bầy đàn. Tiếng gầm của một con sư tử đực trưởng thành có thể vang xa tới tận <b>8 km</b>! Tiếng gầm này dùng để đánh dấu lãnh thổ và gọi bầy.<br/>- <b>Hổ:</b> Là loài săn mồi đơn độc lớn nhất họ mèo. Hổ có sức mạnh cơ bắp khủng khiếp và khả năng ngụy trang tuyệt đỉnh nhờ bộ lông vằn.<br/><br/><i>Chúa sơn lâm nhưng lại... ngủ rất nhiều! Sư tử có thể ngủ tới 20 tiếng mỗi ngày để tiết kiệm năng lượng cho việc săn mồi.</i>'
        }
    ],
    'Hệ Mặt Trời': [
        {
            q: 'Hành tinh nào gần Mặt trời nhất?', 
            ans: 'Sao Thủy', 
            options: ['Sao Kim', 'Trái Đất', 'Sao Thủy', 'Sao Hỏa'],
            explanation: '<b>Sao Thủy (Mercury)</b> là hành tinh nhỏ nhất và nằm gần Mặt Trời nhất trong Hệ Mặt Trời.<br/><br/>Vì ở quá gần Mặt Trời và không có bầu khí quyển để giữ nhiệt, Sao Thủy trải qua sự chênh lệch nhiệt độ khủng khiếp nhất:<br/>- <b>Ban ngày:</b> Bị Mặt Trời thiêu đốt, nhiệt độ bề mặt có thể lên tới <b>430 độ C</b> (đủ làm chảy chì!).<br/>- <b>Ban đêm:</b> Do không có không khí giữ ấm, nhiệt độ lại tụt xuống âm <b>-180 độ C</b>.<br/><br/><i>Mặc dù gần Mặt Trời nhất, Sao Thủy vẫn không phải là hành tinh nóng nhất. Danh hiệu đó thuộc về Sao Kim, vì Sao Kim có bầu khí quyển dày đặc tạo ra hiệu ứng nhà kính cực mạnh!</i>'
        },
        {
            q: 'Trái Đất mất bao lâu để quay quanh Mặt trời?', 
            ans: '1 năm (khoảng 365 ngày)', 
            options: ['1 tháng', '1 tuần', '1 năm (khoảng 365 ngày)', '1 thập kỷ'],
            explanation: 'Trái Đất mất khoảng <b>365 ngày và 6 giờ</b> để hoàn thành một vòng quay quanh Mặt Trời. Quãng thời gian này được gọi là một <b>năm</b>.<br/><br/>Vậy 6 giờ lẻ đó đi đâu?<br/>- Mỗi năm chúng ta dư ra 6 giờ, sau 4 năm chúng ta sẽ gom được 24 giờ (tức là trọn vẹn 1 ngày).<br/>- Vì thế, cứ 4 năm một lần, tháng 2 sẽ có 29 ngày thay vì 28 ngày. Năm đó được gọi là <b>Năm Nhuận (366 ngày)</b>.<br/><br/><i>Việc Trái Đất quay quanh Mặt Trời kết hợp với việc trục Trái Đất bị nghiêng chính là nguyên nhân tạo ra 4 mùa Xuân - Hạ - Thu - Đông đấy!</i>'
        },
        {
            q: 'Hành tinh nào được gọi là "Hành tinh Đỏ"?', 
            ans: 'Sao Hỏa', 
            options: ['Sao Mộc', 'Sao Thổ', 'Sao Hỏa', 'Sao Kim'],
            explanation: '<b>Sao Hỏa (Mars)</b> được mệnh danh là "Hành tinh Đỏ" vì khi nhìn từ Trái Đất, nó có màu đỏ rực rất đặc trưng.<br/><br/>Nguyên nhân của màu sắc này là gì?<br/>Bề mặt Sao Hỏa bị bao phủ bởi một lượng lớn <b>Sắt Oxit</b> (chính là thứ rỉ sét mà bạn hay thấy trên những thanh sắt cũ bị bỏ ngoài mưa). Lớp bụi "rỉ sét" này phủ khắp các tảng đá và bay lơ lửng trong bầu khí quyển mỏng manh, khiến cả hành tinh khoác lên mình màu áo đỏ ối.<br/><br/><i>Sao Hỏa là hành tinh được các nhà khoa học nghiên cứu nhiều nhất để tìm kiếm sự sống ngoài Trái Đất, và biết đâu trong tương lai con người có thể lên đó sinh sống!</i>'
        },
        {
            q: 'Mặt trăng có tự phát sáng không?', 
            ans: 'Không, nó phản chiếu ánh sáng Mặt trời', 
            options: ['Có', 'Không, nó phản chiếu ánh sáng Mặt trời', 'Phát sáng vào ban đêm', 'Tùy lúc'],
            explanation: 'Dù ban đêm chúng ta thấy Mặt Trăng rất sáng, nhưng thực chất <b>Mặt Trăng là một khối đá khổng lồ tối thui và không tự phát ra ánh sáng</b>.<br/><br/>Ánh trăng mà chúng ta nhìn thấy chính là <b>ánh sáng của Mặt Trời chiếu vào Mặt Trăng</b>, rồi dội lại (phản chiếu) xuống Trái Đất của chúng ta. Giống như khi bạn dùng đèn pin chiếu vào một tấm gương trong phòng tối vậy.<br/><br/><i>Việc Mặt Trăng xoay quanh Trái Đất làm thay đổi góc chiếu sáng của Mặt Trời, tạo ra các hiện tượng như Trăng Khuyết, Trăng Tròn hay Trăng Non.</i>'
        }
    ],
    'Khoa Học & Phát Minh': [
        {
            q: 'Ai là người phát minh ra bóng đèn sợi đốt?', 
            ans: 'Thomas Edison', 
            options: ['Albert Einstein', 'Isaac Newton', 'Thomas Edison', 'Nikola Tesla'],
            explanation: '<b>Thomas Edison</b> (1847 - 1931) là một nhà khoa học vĩ đại đã hoàn thiện bóng đèn sợi đốt, mang lại ánh sáng cho thế giới vào ban đêm.<br/><br/>Bài học về sự kiên trì:<br/>Để tìm ra vật liệu làm dây tóc bóng đèn (sợi dây nhỏ phát sáng bên trong), Edison và nhóm của ông đã phải thử nghiệm hơn <b>10.000 vật liệu khác nhau</b> (từ râu người, tóc, xơ dừa, đến sợi bông...). Mỗi lần thất bại, ông không hề bỏ cuộc mà nói rằng: <i>"Tôi không thất bại. Tôi chỉ tìm ra 10.000 cách không hoạt động mà thôi!"</i>. Cuối cùng, ông đã thành công với sợi tre được cacbon hóa.<br/><br/><i>Câu nói nổi tiếng của ông: "Thiên tài là 1% cảm hứng và 99% đổ mồ hôi."</i>'
        },
        {
            q: 'Lực nào giữ chúng ta trên mặt đất?', 
            ans: 'Trọng lực', 
            options: ['Lực ma sát', 'Trọng lực', 'Lực từ', 'Khí áp'],
            explanation: '<b>Trọng lực</b> (hay Lực hấp dẫn) là lực kéo vô hình mà một vật thể có khối lượng tạo ra. Trái Đất rất lớn và rất nặng, nên nó có lực hút rất mạnh, liên tục kéo mọi thứ về phía tâm của nó.<br/><br/>Tác dụng của Trọng lực:<br/>- Giữ cho chúng ta đứng vững trên mặt đất, không bị bay lơ lửng vào vũ trụ.<br/>- Kéo quả táo rơi từ trên cây xuống đất (như truyền thuyết về Isaac Newton).<br/>- Giữ cho bầu khí quyển bao quanh Trái Đất, giúp chúng ta có không khí để hít thở.<br/><br/><i>Ở trên Mặt Trăng, trọng lực chỉ yếu bằng 1/6 so với Trái Đất. Nếu bạn nặng 30kg ở Trái Đất, lên Mặt Trăng bạn sẽ nhẹ tâng và chỉ nặng tương đương 5kg, có thể nhảy cao vút dễ dàng!</i>'
        },
        {
            q: 'Nước đóng băng ở bao nhiêu độ C?', 
            ans: '0 độ C', 
            options: ['100 độ C', '50 độ C', '0 độ C', '-10 độ C'],
            explanation: 'Nước tinh khiết sẽ bắt đầu <b>đóng băng (hóa rắn thành đá) ở 0 độ C</b> và <b>sôi (hóa hơi) ở 100 độ C</b>.<br/><br/>Điều kì diệu của băng đá:<br/>Đa số các chất khi lạnh đi sẽ co lại và chìm xuống. Nhưng nước lại có một tính chất vô cùng đặc biệt: khi đóng băng, các phân tử nước giãn ra, làm cho <b>đá nhẹ hơn nước lỏng</b>.<br/><br/><i>Chính vì thế, cục nước đá luôn nổi trong cốc nước của bạn. Và trong tự nhiên, băng đá sẽ nổi trên mặt hồ, tạo thành một tấm chăn cách nhiệt, giúp các loài cá và sinh vật sống an toàn dưới đáy hồ lạnh giá vào mùa đông!</i>'
        }
    ],
    'Cơ thể người': [
        {
            q: 'Cơ quan nào bơm máu đi khắp cơ thể?', 
            ans: 'Trái tim', 
            options: ['Phổi', 'Não', 'Dạ dày', 'Trái tim'],
            explanation: '<b>Trái tim</b> là một "chiếc máy bơm" cơ bắp tuyệt vời nhất thế giới, làm việc không ngừng nghỉ 24/7 kể từ khi bạn sinh ra.<br/><br/>Những con số biết nói về Trái tim:<br/>- Trung bình, trái tim của chúng ta đập khoảng <b>100.000 lần mỗi ngày</b>.<br/>- Tim bơm máu mang theo oxy và chất dinh dưỡng đi qua một hệ thống ống dẫn gọi là mạch máu. Nếu bạn nối tất cả các mạch máu trong cơ thể người lại thành một đường thẳng, nó sẽ dài khoảng <b>100.000 km</b> – đủ để quấn quanh Trái Đất hơn 2 vòng!<br/><br/><i>Hãy bảo vệ trái tim bằng cách ăn nhiều rau xanh, trái cây và chăm chỉ tập thể dục thể thao nhé!</i>'
        },
        {
            q: 'Con người hít khí gì để sống?', 
            ans: 'Oxy', 
            options: ['Carbon Dioxide', 'Oxy', 'Nito', 'Hydro'],
            explanation: 'Con người và động vật cần hít khí <b>Oxy (O2)</b> để tạo ra năng lượng sống, và thở ra khí <b>Carbon Dioxide (CO2 - Khí Cacbonic)</b>.<br/><br/>Nguồn cung cấp Oxy vĩ đại:<br/>- Khí Oxy không tự nhiên sinh ra. Chúng ta phải cảm ơn <b>cây xanh và các loại tảo biển</b>!<br/>- Nhờ quá trình <b>Quang hợp</b>, thực vật "hít" khí CO2 mà chúng ta thở ra, dùng ánh sáng mặt trời để nấu ăn, và "nhả" ra khí Oxy cho chúng ta hít thở. Đây là một vòng tuần hoàn khép kín tuyệt đẹp của tự nhiên.<br/><br/><i>Vì vậy, bảo vệ rừng, không xả rác xuống biển chính là đang bảo vệ "lá phổi xanh" cung cấp sự sống cho toàn nhân loại.</i>'
        },
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
