import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5009;
const ADMIN_PASSWORD = 'admin123';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'abduhoc.db'));

// ─── SCHEMA ──────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    section TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    cover_image TEXT DEFAULT '',
    excerpt TEXT DEFAULT '',
    content TEXT DEFAULT '',
    author TEXT DEFAULT 'Admin',
    published_at TEXT DEFAULT (datetime('now','localtime')),
    is_published INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, phone TEXT, email TEXT, message TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );
`);

// ─── SEED ────────────────────────────────────────────────────────────────────

const seedArticles = [
  // Du học - Nhật Bản
  { section:'du-hoc', subcategory:'nhat-ban', title:'Chương trình du học Nhật Bản 2025 – Học bổng lên đến 50%', cover_image:'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', excerpt:'Cơ hội vàng cho sinh viên Việt Nam với hàng loạt học bổng hấp dẫn từ chính phủ Nhật Bản và các trường đại học hàng đầu.', content:`<h2>Tổng quan về chương trình</h2><p>Năm 2025, Nhật Bản tiếp tục mở rộng cơ hội du học với nhiều chương trình học bổng hấp dẫn dành riêng cho sinh viên Việt Nam. Học bổng MEXT của chính phủ Nhật Bản có thể tài trợ lên đến 100% học phí cùng trợ cấp sinh hoạt hàng tháng.</p><h2>Điều kiện tham gia</h2><ul><li>Tốt nghiệp THPT loại khá trở lên</li><li>JLPT N4 trở lên (hoặc IELTS 5.5+ cho chương trình dạy bằng tiếng Anh)</li><li>Độ tuổi từ 17-35</li></ul><h2>Hồ sơ cần chuẩn bị</h2><p>Hồ sơ bao gồm: Bằng tốt nghiệp, bảng điểm, chứng chỉ ngoại ngữ, thư giới thiệu và bài luận cá nhân bằng tiếng Nhật.</p>` },
  { section:'du-hoc', subcategory:'nhat-ban', title:'Điều kiện xin visa du học Nhật Bản mới nhất 2025', cover_image:'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80', excerpt:'Hướng dẫn chi tiết quy trình xin visa du học Nhật Bản với những thay đổi mới nhất từ Đại sứ quán Nhật Bản tại Việt Nam.', content:`<h2>Thay đổi chính sách visa 2025</h2><p>Đại sứ quán Nhật Bản tại Hà Nội và TP.HCM đã cập nhật một số quy định mới về hồ sơ xin visa du học từ đầu năm 2025, nhằm đơn giản hóa thủ tục cho sinh viên Việt Nam.</p><h2>Hồ sơ bắt buộc</h2><ul><li>Giấy tiếp nhận nhập học (COE) từ trường</li><li>Hộ chiếu còn hiệu lực tối thiểu 6 tháng</li><li>Ảnh thẻ 4x3 nền trắng</li><li>Chứng minh tài chính (tối thiểu 150 triệu VNĐ)</li></ul><p>Thời gian xử lý visa thường từ 5-7 ngày làm việc.</p>` },
  { section:'du-hoc', subcategory:'nhat-ban', title:'Top 10 trường đại học Nhật Bản tốt nhất cho sinh viên Việt Nam', cover_image:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', excerpt:'Danh sách các trường đại học hàng đầu Nhật Bản phù hợp với sinh viên Việt Nam, kèm thông tin học phí và chuyên ngành thế mạnh.', content:`<h2>Tiêu chí đánh giá</h2><p>Danh sách được xây dựng dựa trên: xếp hạng QS World, tỷ lệ việc làm sau tốt nghiệp, chính sách hỗ trợ sinh viên quốc tế và mức học phí hợp lý.</p><h2>Top 5 trường hàng đầu</h2><ol><li><strong>Đại học Tokyo (UTokyo)</strong> – Số 1 Nhật Bản, thế mạnh: KHKT, Y dược</li><li><strong>Đại học Kyoto</strong> – Nghiên cứu khoa học cơ bản xuất sắc</li><li><strong>Đại học Osaka</strong> – Công nghệ và Kinh doanh quốc tế</li><li><strong>Đại học Tohoku</strong> – Kỹ thuật và Khoa học vật liệu</li><li><strong>Đại học Nagoya</strong> – Kỹ thuật ô tô và Cơ khí</li></ol>` },

  // Du học - Hàn Quốc
  { section:'du-hoc', subcategory:'han-quoc', title:'Du học Hàn Quốc 2025 – Cơ hội vàng cho sinh viên Việt Nam', cover_image:'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80', excerpt:'Hàn Quốc đang trở thành điểm đến du học lý tưởng với nền giáo dục chất lượng cao, chi phí hợp lý và nhiều cơ hội việc làm hấp dẫn.', content:`<h2>Tại sao chọn du học Hàn Quốc?</h2><p>Hàn Quốc hiện là một trong những điểm đến du học phổ biến nhất tại châu Á, đặc biệt với làn sóng Hallyu (văn hóa Hàn) đang lan rộng toàn cầu. Nền kinh tế phát triển và nhiều tập đoàn lớn như Samsung, Hyundai, LG tạo ra cơ hội việc làm hấp dẫn sau tốt nghiệp.</p><h2>Chi phí du học</h2><ul><li>Học phí đại học: 3-7 triệu won/năm (~60-140 triệu VNĐ)</li><li>Chi phí sinh hoạt: 700.000 - 1.000.000 won/tháng</li><li>Học bổng GKS lên đến 100%</li></ul>` },
  { section:'du-hoc', subcategory:'han-quoc', title:'Chi phí du học Hàn Quốc và các khoản cần chuẩn bị', cover_image:'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&q=80', excerpt:'Phân tích chi tiết tất cả các khoản chi phí khi du học Hàn Quốc từ học phí, sinh hoạt phí đến các chi phí phát sinh khác.', content:`<h2>Tổng chi phí ước tính</h2><p>Tùy theo thành phố và lối sống, tổng chi phí du học Hàn Quốc dao động từ 300-500 triệu VNĐ/năm bao gồm tất cả chi phí.</p><h2>Các khoản chi phí chính</h2><ul><li><strong>Học phí:</strong> 40-140 triệu VNĐ/năm</li><li><strong>Ký túc xá:</strong> 15-25 triệu VNĐ/kỳ</li><li><strong>Ăn uống:</strong> 5-8 triệu VNĐ/tháng</li><li><strong>Đi lại:</strong> 1-2 triệu VNĐ/tháng</li><li><strong>Bảo hiểm y tế:</strong> bắt buộc ~500.000 VNĐ/tháng</li></ul>` },
  { section:'du-hoc', subcategory:'han-quoc', title:'Học tiếng Hàn từ đầu: Lộ trình 6 tháng chuẩn bị du học', cover_image:'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=800&q=80', excerpt:'Lộ trình học tiếng Hàn hiệu quả từ đầu trong 6 tháng để đạt đủ điều kiện ngôn ngữ cho chương trình du học Hàn Quốc.', content:`<h2>Mục tiêu ngôn ngữ</h2><p>Để du học Hàn Quốc, hầu hết các trường yêu cầu TOPIK II (cấp độ 3-4) hoặc bằng chứng nhận hoàn thành chương trình tiếng Hàn tại trường ngôn ngữ trong nước.</p><h2>Lộ trình 6 tháng</h2><ul><li><strong>Tháng 1-2:</strong> Học Hangul, từ vựng cơ bản, ngữ pháp A1</li><li><strong>Tháng 3-4:</strong> Luyện hội thoại, ngữ pháp A2-B1, TOPIK I</li><li><strong>Tháng 5-6:</strong> Ôn thi TOPIK II, luyện đề, kỹ năng viết</li></ul>` },

  // Du học - Đài Loan
  { section:'du-hoc', subcategory:'dai-loan', title:'Du học Đài Loan – Thiên đường học bổng châu Á 2025', cover_image:'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80', excerpt:'Đài Loan ngày càng thu hút sinh viên quốc tế nhờ học bổng hào phóng, chi phí thấp và nền giáo dục kỹ thuật hàng đầu châu Á.', content:`<h2>Điểm mạnh của giáo dục Đài Loan</h2><p>Đài Loan nổi tiếng với các chương trình đào tạo về Kỹ thuật, CNTT, Bán dẫn và Khoa học ứng dụng. TSMC - tập đoàn chip lớn nhất thế giới đặt trụ sở tại đây, tạo cơ hội việc làm khổng lồ.</p><h2>Các học bổng tiêu biểu</h2><ul><li>Học bổng chính phủ ICDF: toàn phần, bao gồm vé máy bay</li><li>Học bổng MOE: 15.000-20.000 NTD/tháng</li><li>Học bổng trường: miễn 50-100% học phí</li></ul>` },
  { section:'du-hoc', subcategory:'dai-loan', title:'Top 5 trường đại học hàng đầu Đài Loan năm 2025', cover_image:'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80', excerpt:'Điểm danh 5 trường đại học tốt nhất Đài Loan với thông tin chuyên ngành thế mạnh, học phí và điều kiện nhập học.', content:`<h2>Bảng xếp hạng 2025</h2><ol><li><strong>Đại học Quốc gia Đài Loan (NTU)</strong> – Top 1, mọi ngành</li><li><strong>Đại học Công nghệ Quốc gia Đài Loan (NTUST)</strong> – Kỹ thuật, Thiết kế</li><li><strong>Đại học Thành Công Quốc gia (NCKU)</strong> – Kỹ thuật, Y dược</li><li><strong>Đại học Trung Chính Quốc gia (NCCU)</strong> – Kinh tế, Luật, Ngôn ngữ</li><li><strong>Đại học Sun Yat-sen Quốc gia (NSYSU)</strong> – Kinh doanh, Biển đảo</li></ol>` },
  { section:'du-hoc', subcategory:'dai-loan', title:'Visa du học Đài Loan: Hướng dẫn chi tiết A-Z', cover_image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', excerpt:'Toàn bộ quy trình xin visa du học Đài Loan từ chuẩn bị hồ sơ, nộp đơn đến khi nhận visa, cập nhật mới nhất năm 2025.', content:`<h2>Loại visa du học Đài Loan</h2><p>Sinh viên Việt Nam cần xin visa loại F (Visitor Visa) trước, sau đó chuyển đổi thành ARC (Alien Resident Certificate) sau khi nhập học.</p><h2>Hồ sơ cần chuẩn bị</h2><ul><li>Thư nhập học từ trường</li><li>Hộ chiếu còn hạn ít nhất 6 tháng</li><li>Bằng tốt nghiệp và bảng điểm có công chứng</li><li>Chứng minh tài chính (tối thiểu 100 triệu VNĐ)</li><li>Ảnh thẻ nền trắng</li></ul>` },

  // Du học - Đức
  { section:'du-hoc', subcategory:'duc', title:'Du học Đức miễn học phí – Giấc mơ không còn xa 2025', cover_image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80', excerpt:'Đức là quốc gia hiếm hoi miễn hoàn toàn học phí đại học cho sinh viên quốc tế. Đây là cơ hội không thể bỏ lỡ.', content:`<h2>Tại sao Đức miễn học phí?</h2><p>Chính phủ Đức tin rằng giáo dục là quyền cơ bản của con người. Hầu hết các trường đại học công lập Đức không thu học phí từ sinh viên quốc tế, chỉ thu phí học kỳ nhỏ (150-250 EUR/kỳ) cho phương tiện đi lại.</p><h2>Điều kiện nhập học</h2><ul><li>Bằng tốt nghiệp THPT tương đương Abitur Đức</li><li>Tiếng Đức B2-C1 (hoặc IELTS 6.5+ cho chương trình tiếng Anh)</li><li>Chứng minh tài chính: 934 EUR/tháng (theo quy định 2025)</li></ul>` },
  { section:'du-hoc', subcategory:'duc', title:'Điều kiện du học Đức và các hồ sơ cần chuẩn bị đầy đủ', cover_image:'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80', excerpt:'Hướng dẫn chi tiết tất cả hồ sơ cần có để xin nhập học và visa du học Đức, bao gồm các giấy tờ cần công chứng và dịch thuật.', content:`<h2>Hồ sơ nhập học</h2><ul><li>Đơn đăng ký qua cổng Uni-Assist hoặc trực tiếp trường</li><li>Bằng tốt nghiệp THPT + bảng điểm (bản gốc + dịch thuật công chứng tiếng Đức)</li><li>Chứng chỉ tiếng Đức DSH/TestDaF hoặc IELTS/TOEFL</li><li>Thư động lực (Motivationsschreiben)</li><li>Thư giới thiệu (2 thư từ giáo viên/giảng viên)</li></ul>` },
  { section:'du-hoc', subcategory:'duc', title:'Cuộc sống du học sinh tại Đức – Những điều bạn cần biết', cover_image:'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80', excerpt:'Chia sẻ thực tế về cuộc sống, chi phí sinh hoạt, văn hóa làm thêm và cơ hội việc làm dành cho du học sinh Việt Nam tại Đức.', content:`<h2>Chi phí sinh hoạt tại Đức</h2><p>Trung bình một sinh viên cần khoảng 850-1200 EUR/tháng tùy thành phố. Munich và Hamburg có chi phí cao hơn Berlin hay Leipzig.</p><h2>Quyền làm thêm</h2><p>Sinh viên Đức được phép làm thêm 120 ngày toàn thời gian hoặc 240 ngày bán thời gian mỗi năm. Lương tối thiểu 12,41 EUR/giờ (2025).</p><h2>Văn hóa và hội nhập</h2><p>Người Đức nổi tiếng đúng giờ và thẳng thắn. Tham gia các câu lạc bộ (Verein) là cách tốt nhất để hội nhập vào cộng đồng địa phương.</p>` },

  // XKLĐ - Nhật Bản
  { section:'xuat-khau-lao-dong', subcategory:'nhat-ban', title:'Đơn hàng xuất khẩu lao động Nhật Bản tháng 4/2025 – Tuyển gấp', cover_image:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', excerpt:'Cập nhật các đơn hàng lao động Nhật Bản mới nhất tháng 4/2025 với mức lương hấp dẫn, đơn hàng chính quy, ưu tiên xuất cảnh sớm.', content:`<h2>Các đơn hàng đang tuyển</h2><table style="width:100%; border-collapse:collapse;"><tr><th>Ngành</th><th>SL</th><th>Lương cơ bản</th><th>Vùng</th></tr><tr><td>Cơ khí chế tạo</td><td>50</td><td>180.000 yên</td><td>Aichi</td></tr><tr><td>Thực phẩm</td><td>30</td><td>160.000 yên</td><td>Osaka</td></tr><tr><td>Xây dựng</td><td>40</td><td>200.000 yên</td><td>Tokyo</td></tr><tr><td>Nông nghiệp</td><td>20</td><td>150.000 yên</td><td>Hokkaido</td></tr></table><h2>Quyền lợi</h2><ul><li>Bao ăn ở hoặc phụ cấp nhà ở</li><li>Bảo hiểm xã hội đầy đủ</li><li>Tăng ca từ 1.25-1.5 lần lương cơ bản</li></ul>` },
  { section:'xuat-khau-lao-dong', subcategory:'nhat-ban', title:'Điều kiện tham gia xuất khẩu lao động Nhật Bản 2025', cover_image:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', excerpt:'Tổng hợp đầy đủ các yêu cầu về độ tuổi, sức khỏe, trình độ học vấn và tiếng Nhật để tham gia chương trình lao động Nhật Bản.', content:`<h2>Yêu cầu cơ bản</h2><ul><li><strong>Độ tuổi:</strong> 18-35 tuổi (một số đơn hàng đến 40)</li><li><strong>Sức khỏe:</strong> Tốt, không mắc bệnh lây nhiễm, không xăm hình</li><li><strong>Học vấn:</strong> Tốt nghiệp THCS trở lên</li><li><strong>Tiếng Nhật:</strong> N4 trở lên (ưu tiên N3)</li><li><strong>Hộ khẩu:</strong> Không thuộc vùng cấm xuất cảnh</li></ul><h2>Quy trình đăng ký</h2><ol><li>Nộp hồ sơ và phỏng vấn sơ tuyển</li><li>Học tiếng Nhật 3-6 tháng</li><li>Phỏng vấn trực tiếp với chủ sử dụng</li><li>Khám sức khỏe và làm visa</li><li>Xuất cảnh</li></ol>` },
  { section:'xuat-khau-lao-dong', subcategory:'nhat-ban', title:'Lương và phúc lợi thực tế của lao động Việt Nam tại Nhật Bản', cover_image:'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80', excerpt:'Thực tế về thu nhập, phúc lợi và cuộc sống của người lao động Việt Nam đang làm việc tại Nhật Bản theo chương trình thực tập sinh.', content:`<h2>Thu nhập thực tế</h2><p>Lương cơ bản theo quy định tối thiểu của Nhật là 1.000-1.100 yên/giờ (tùy vùng). Cộng với tăng ca, thu nhập thực tế thường đạt 180.000-250.000 yên/tháng (~30-42 triệu VNĐ).</p><h2>Các khoản khấu trừ</h2><ul><li>Tiền ăn: ~30.000 yên/tháng</li><li>Tiền nhà: ~20.000 yên/tháng</li><li>Bảo hiểm: ~15.000 yên/tháng</li></ul><h2>Tiết kiệm ước tính</h2><p>Trung bình có thể tiết kiệm 100.000-150.000 yên/tháng (~17-25 triệu VNĐ), tương đương khoảng 1,2-1,5 tỷ sau 3 năm.</p>` },

  // XKLĐ - Hàn Quốc
  { section:'xuat-khau-lao-dong', subcategory:'han-quoc', title:'Tuyển dụng lao động Hàn Quốc ngành điện tử tháng 4/2025', cover_image:'https://images.unsplash.com/photo-1581092795360-fd1ca981d65c?w=800&q=80', excerpt:'Tuyển lao động phổ thông và lành nghề làm việc tại các nhà máy điện tử Samsung, LG tại Hàn Quốc với mức lương 35-50 triệu VNĐ/tháng.', content:`<h2>Thông tin tuyển dụng</h2><ul><li><strong>Ngành:</strong> Lắp ráp điện tử, kiểm tra chất lượng (QC)</li><li><strong>Số lượng:</strong> 100 người</li><li><strong>Lương:</strong> 2.000.000 - 2.800.000 KRW/tháng</li><li><strong>Thời gian hợp đồng:</strong> 3-4 năm 10 tháng</li><li><strong>Vùng làm việc:</strong> Gyeonggi, Chungnam</li></ul><h2>Quyền lợi</h2><ul><li>Nhà ở miễn phí tại ký túc xá công ty</li><li>Tăng ca thêm 1,5x lương</li><li>Bảo hiểm 4 loại đầy đủ</li><li>Vé máy bay lượt về chi trả</li></ul>` },
  { section:'xuat-khau-lao-dong', subcategory:'han-quoc', title:'Chương trình EPS – Cách đăng ký đi làm việc tại Hàn Quốc 2025', cover_image:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80', excerpt:'Hướng dẫn đầy đủ về chương trình cấp phép lao động EPS (Employment Permit System) của Hàn Quốc dành cho người lao động Việt Nam.', content:`<h2>EPS là gì?</h2><p>EPS (Employment Permit System) là chương trình lao động hợp pháp do chính phủ Hàn Quốc quản lý, cho phép lao động nước ngoài làm việc tại Hàn Quốc trong tối đa 4 năm 10 tháng.</p><h2>Quy trình đăng ký EPS</h2><ol><li>Đăng ký thi TOPIK tiếng Hàn (tối thiểu đạt 80/200 điểm)</li><li>Đăng ký tham gia tại Trung tâm lao động ngoài nước (COLAB)</li><li>Qua sơ tuyển hồ sơ của phía Hàn Quốc</li><li>Phỏng vấn và ký hợp đồng</li><li>Khám sức khỏe, học định hướng</li><li>Xuất cảnh</li></ol>` },
  { section:'xuat-khau-lao-dong', subcategory:'han-quoc', title:'Thu nhập thực tế của lao động Việt Nam tại Hàn Quốc 2025', cover_image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', excerpt:'Phân tích chi tiết thu nhập, chi phí sinh hoạt và mức tiết kiệm thực tế của người lao động Việt Nam đang làm việc tại Hàn Quốc.', content:`<h2>Lương tối thiểu 2025</h2><p>Lương tối thiểu Hàn Quốc năm 2025 là 10.030 KRW/giờ (~190.000 VNĐ). Làm 8h/ngày, 5 ngày/tuần, lương tháng tối thiểu đạt khoảng 2.096.270 KRW (~38 triệu VNĐ).</p><h2>Thu nhập thực tế với tăng ca</h2><p>Với tăng ca đều đặn, nhiều lao động đạt 2.500.000 - 3.000.000 KRW/tháng (45-54 triệu VNĐ). Sau khi trừ chi phí ăn ở khoảng 400.000-600.000 KRW, có thể tiết kiệm 2.000.000 KRW/tháng.</p>` },

  // XKLĐ - Đài Loan
  { section:'xuat-khau-lao-dong', subcategory:'dai-loan', title:'Đơn hàng nhà máy điện tử Đài Loan tháng 4/2025 – Lương cao', cover_image:'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80', excerpt:'Tuyển lao động làm việc tại các nhà máy điện tử, sản xuất tại Đài Loan với mức lương cạnh tranh và đơn hàng ổn định dài hạn.', content:`<h2>Thông tin đơn hàng</h2><ul><li><strong>Công việc:</strong> Lắp ráp linh kiện điện tử, vận hành máy CNC</li><li><strong>Số lượng:</strong> 80 người (40 nam, 40 nữ)</li><li><strong>Lương:</strong> 25.250 NTD/tháng cơ bản (tăng ca thêm)</li><li><strong>Khu vực:</strong> Tân Bắc, Đào Viên, Tân Trúc</li><li><strong>Hợp đồng:</strong> 3 năm, gia hạn tối đa 6 năm</li></ul>` },
  { section:'xuat-khau-lao-dong', subcategory:'dai-loan', title:'Điều kiện tuyển dụng lao động Đài Loan mới nhất 2025', cover_image:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', excerpt:'Cập nhật đầy đủ điều kiện sức khỏe, độ tuổi, hồ sơ và quy trình xuất cảnh đi lao động Đài Loan theo quy định mới nhất.', content:`<h2>Điều kiện chung</h2><ul><li>Độ tuổi: 18-40 tuổi</li><li>Sức khỏe tốt, không bệnh mãn tính</li><li>Không xăm trổ quá lớn</li><li>Không tiền án tiền sự</li><li>Chưa từng vi phạm hợp đồng tại Đài Loan</li></ul><h2>Hồ sơ cần chuẩn bị</h2><ul><li>CMND/CCCD, hộ khẩu gốc</li><li>Bằng tốt nghiệp THCS trở lên</li><li>Giấy khám sức khỏe (theo mẫu)</li><li>Ảnh thẻ 3x4 nền trắng (6 ảnh)</li><li>Lý lịch tư pháp</li></ul>` },
  { section:'xuat-khau-lao-dong', subcategory:'dai-loan', title:'Hành trang cần chuẩn bị trước khi đi Đài Loan làm việc', cover_image:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', excerpt:'Những thứ cần chuẩn bị về tâm lý, kỹ năng, vật dụng và kiến thức pháp luật để có một chuyến xuất cảnh thuận lợi và thành công.', content:`<h2>Chuẩn bị tâm lý</h2><p>Đài Loan có múi giờ giống Việt Nam, khí hậu tương tự miền Nam. Người Đài Loan thân thiện với người Việt. Tuy nhiên cần chuẩn bị tâm lý xa nhà dài hạn (3-6 năm).</p><h2>Kỹ năng cần học trước</h2><ul><li>Tiếng Hoa cơ bản (giao tiếp tối thiểu)</li><li>Kỹ năng nghề theo đơn hàng</li><li>Quy tắc an toàn lao động</li></ul><h2>Giấy tờ mang theo</h2><p>Hộ chiếu, visa, hợp đồng lao động bản tiếng Việt, số hotline đường dây hỗ trợ lao động Việt Nam tại Đài Loan: 1955.</p>` },

  // XKLĐ - Châu Úc
  { section:'xuat-khau-lao-dong', subcategory:'chau-uc', title:'Visa 482 Úc – Cơ hội định cư cho lao động có tay nghề 2025', cover_image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', excerpt:'Visa 482 (Tạm thời thiếu kỹ năng) là cánh cửa rộng mở cho lao động Việt Nam muốn định cư lâu dài tại Úc với mức lương hàng đầu thế giới.', content:`<h2>Visa 482 là gì?</h2><p>Visa Tài trợ tạm thời kỹ năng (Subclass 482) cho phép người lao động nước ngoài làm việc tại Úc từ 2-4 năm và có thể chuyển đổi thành thường trú nhân (PR).</p><h2>Ngành nghề đang thiếu</h2><ul><li>Điều dưỡng và chăm sóc sức khỏe</li><li>Xây dựng và cơ khí</li><li>CNTT và kỹ thuật phần mềm</li><li>Chế biến thực phẩm</li><li>Vận tải và logistics</li></ul><h2>Lương tối thiểu</h2><p>Lương tối thiểu khi có visa 482: AUD 70.000/năm (~1,1 tỷ VNĐ/năm).</p>` },
  { section:'xuat-khau-lao-dong', subcategory:'chau-uc', title:'Các ngành nghề thiếu lao động tại Úc năm 2025', cover_image:'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', excerpt:'Danh sách chi tiết các ngành nghề Úc đang thiếu lao động nghiêm trọng, cùng yêu cầu bằng cấp và mức lương hấp dẫn.', content:`<h2>Danh sách ngành nghề hot 2025</h2><p>Chính phủ Úc công bố danh sách thiếu hụt nghiêm trọng (Critical Skills) bao gồm:</p><ul><li><strong>Y tế:</strong> Bác sĩ gia đình, Điều dưỡng ICU, Dược sĩ</li><li><strong>Xây dựng:</strong> Thợ điện, Thợ ống nước, Kỹ sư xây dựng</li><li><strong>Giáo dục:</strong> Giáo viên mầm non, Giáo viên STEM</li><li><strong>CNTT:</strong> Lập trình viên, An ninh mạng, Cloud architect</li><li><strong>Nông nghiệp:</strong> Kỹ sư nông nghiệp, Công nhân thu hoạch</li></ul>` },
  { section:'xuat-khau-lao-dong', subcategory:'chau-uc', title:'Thu nhập và điều kiện làm việc tại Úc cho lao động Việt Nam', cover_image:'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80', excerpt:'Chia sẻ thực tế về mức lương, môi trường làm việc, luật lao động và chất lượng cuộc sống của người lao động Việt Nam tại Úc.', content:`<h2>Lương tối thiểu Úc 2025</h2><p>Mức lương tối thiểu quốc gia Úc là AUD 24,10/giờ (~375.000 VNĐ). Làm full-time 38h/tuần, thu nhập tối thiểu ~AUD 47.564/năm.</p><h2>Quyền lợi lao động</h2><ul><li>4 tuần nghỉ phép có lương/năm</li><li>10 ngày nghỉ ốm có lương/năm</li><li>Superannuation (quỹ hưu trí): chủ nhân đóng 11,5% lương</li><li>Môi trường làm việc an toàn, bình đẳng</li></ul><h2>Chi phí sinh hoạt</h2><p>Sydney và Melbourne đắt hơn, nhưng mức lương cũng cao hơn. Tiết kiệm trung bình AUD 1.500-2.500/tháng là hoàn toàn khả thi.</p>` },

  // Tin tức - Tuyển sinh
  { section:'tin-tuc', subcategory:'tuyen-sinh', title:'Thông báo tuyển sinh khóa du học Nhật Bản tháng 5/2025', cover_image:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', excerpt:'ABS Du Học thông báo tuyển sinh khóa chuẩn bị du học Nhật Bản khai giảng tháng 5/2025. Ưu tiên hồ sơ nộp trước 30/4.', content:`<h2>Thông tin khóa học</h2><ul><li><strong>Khai giảng:</strong> 05/05/2025</li><li><strong>Thời lượng:</strong> 6 tháng</li><li><strong>Lịch học:</strong> Tối 2-4-6 hoặc Cuối tuần</li><li><strong>Học phí:</strong> 8.500.000 VNĐ/khóa (trả góp 0%)</li></ul><h2>Nội dung khóa học</h2><ul><li>Tiếng Nhật từ N5 đến N4</li><li>Ôn thi EJU (kỳ thi nhập học đại học Nhật)</li><li>Tư vấn chọn trường và học bổng</li><li>Hỗ trợ làm hồ sơ xin học</li></ul><p><strong>Ưu đãi:</strong> Giảm 1.000.000 VNĐ cho 20 hồ sơ đầu tiên.</p>` },
  { section:'tin-tuc', subcategory:'tuyen-sinh', title:'Tuyển sinh chương trình tiếng Hàn cấp tốc – Khai giảng tháng 6/2025', cover_image:'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=800&q=80', excerpt:'Lớp tiếng Hàn cấp tốc 4 tháng đạt TOPIK II cấp độ 3, cam kết đầu ra hoặc học lại miễn phí. Đăng ký ngay hôm nay!', content:`<h2>Về chương trình</h2><p>Chương trình tiếng Hàn cấp tốc của ABS được thiết kế đặc biệt cho những học viên đã có nền tảng cơ bản và muốn đạt TOPIK II nhanh nhất có thể.</p><h2>Cam kết đầu ra</h2><ul><li>Đạt TOPIK II Level 3 sau 4 tháng</li><li>Hoặc học lại khóa tiếp theo miễn phí</li></ul><h2>Học phí ưu đãi</h2><p>Học phí: 6.000.000 VNĐ. Giảm 15% khi đăng ký nhóm từ 3 người trở lên.</p>` },
  { section:'tin-tuc', subcategory:'tuyen-sinh', title:'ABS mở thêm lớp IELTS 6.5+ chuẩn bị du học Úc và Anh 2025', cover_image:'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80', excerpt:'Mở lớp IELTS mới với cam kết 6.5+ sau 5 tháng. Giáo viên bản ngữ, giáo trình Cambridge, kiểm tra đầu vào miễn phí.', content:`<h2>Tại sao chọn IELTS tại ABS?</h2><ul><li>Giáo viên người Úc và Anh bản ngữ</li><li>Giáo trình Cambridge Academic chính thức</li><li>Lớp học nhỏ tối đa 12 học viên</li><li>Mock test mỗi 2 tuần với phản hồi chi tiết</li></ul><h2>Lộ trình học</h2><p>Tháng 1-2: Nền tảng 4 kỹ năng. Tháng 3-4: Luyện đề và kỹ thuật làm bài. Tháng 5: Mock test toàn diện và thi thử.</p><h2>Chi phí</h2><p>12.000.000 VNĐ/5 tháng. Trả góp 0% qua thẻ tín dụng.</p>` },

  // Tin tức - Khóa học
  { section:'tin-tuc', subcategory:'khoa-hoc', title:'Khai giảng lớp tiếng Nhật N3 – Tháng 4/2025 tại ABS', cover_image:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', excerpt:'Lớp tiếng Nhật N3 chính thức khai giảng với giáo viên người Nhật bản xứ, ưu tiên cho học viên đã có N4 hoặc tương đương.', content:`<h2>Thông tin lớp học</h2><ul><li><strong>Khai giảng:</strong> 15/04/2025</li><li><strong>Giáo viên:</strong> Yamamoto Keiko (người Nhật Bản)</li><li><strong>Thời gian:</strong> Tối T3, T5, T7 - 18:00-20:00</li><li><strong>Sĩ số:</strong> Tối đa 15 học viên/lớp</li><li><strong>Học phí:</strong> 7.000.000 VNĐ/khóa (3 tháng)</li></ul><h2>Đầu ra mong đợi</h2><p>Hoàn thành khóa học, học viên đủ năng lực thi và đạt JLPT N3, sử dụng tiếng Nhật trong môi trường làm việc cơ bản.</p>` },
  { section:'tin-tuc', subcategory:'khoa-hoc', title:'Chương trình đào tạo tiếng Hàn B1 – Cam kết đầu ra TOPIK II', cover_image:'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', excerpt:'ABS ra mắt chương trình tiếng Hàn B1 chuẩn hóa đầu ra TOPIK II level 4, phù hợp cho mục tiêu du học và xuất khẩu lao động.', content:`<h2>Điểm mạnh của khóa học</h2><ul><li>100% cam kết đầu ra TOPIK II level 3-4</li><li>Giáo viên có kinh nghiệm tại Hàn Quốc từ 5 năm trở lên</li><li>Tài liệu học tập được cập nhật theo đề thi mới nhất</li><li>Hỗ trợ luyện thi 1-1 cho học viên yếu</li></ul><h2>Lịch thi TOPIK 2025</h2><p>Kỳ thi TOPIK II tại Việt Nam: Tháng 4, Tháng 7, Tháng 10 năm 2025. ABS đảm bảo học viên sẵn sàng trước kỳ thi ít nhất 1 tháng.</p>` },
  { section:'tin-tuc', subcategory:'khoa-hoc', title:'Khóa học IELTS 6.5+ tại ABS – Lộ trình 6 tháng toàn diện', cover_image:'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', excerpt:'Lộ trình IELTS 6 tháng bài bản: từ 4.5 lên 6.5+, với phương pháp học hiện đại, mentor cá nhân hóa và mock test định kỳ.', content:`<h2>Phương pháp giảng dạy</h2><p>ABS áp dụng phương pháp IELTS Mastery System - kết hợp giữa nền tảng ngữ pháp vững chắc, kỹ năng làm bài thi và tư duy phản xạ ngôn ngữ.</p><h2>Cấu trúc 6 tháng</h2><ul><li><strong>Phase 1 (2 tháng):</strong> Foundation - Nền tảng 4 kỹ năng</li><li><strong>Phase 2 (2 tháng):</strong> Exam Skills - Kỹ thuật làm bài</li><li><strong>Phase 3 (2 tháng):</strong> Intensive Practice - Luyện đề nâng cao</li></ul><h2>Cam kết</h2><p>Đạt 6.5 hoặc hoàn tiền 50% học phí.</p>` },

  // Tin tức - Thị trường
  { section:'tin-tuc', subcategory:'thi-truong', title:'Thị trường lao động Nhật Bản 2025: Cơ hội và thách thức', cover_image:'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80', excerpt:'Phân tích toàn diện thị trường lao động Nhật Bản năm 2025, xu hướng tuyển dụng và cơ hội cho lao động Việt Nam.', content:`<h2>Bức tranh thị trường 2025</h2><p>Nhật Bản tiếp tục thiếu hụt lao động nghiêm trọng với dân số già hóa nhanh. Chính phủ Nhật dự kiến tiếp nhận thêm 820.000 lao động nước ngoài trong 5 năm tới theo chương trình Đặc định kỹ năng (Tokutei Gino).</p><h2>Ngành nghề hot nhất</h2><ul><li>Điều dưỡng và chăm sóc người cao tuổi</li><li>Chế biến thực phẩm</li><li>Xây dựng và cơ khí</li><li>Nông nghiệp và thủy sản</li><li>Lưu trú và nhà hàng</li></ul>` },
  { section:'tin-tuc', subcategory:'thi-truong', title:'Xu hướng du học toàn cầu sau đại dịch – Dự báo 2025-2030', cover_image:'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80', excerpt:'Các xu hướng du học quốc tế đang thay đổi mạnh mẽ sau COVID-19. Đâu là điểm đến và ngành học được ưu tiên trong giai đoạn 2025-2030?', content:`<h2>Những thay đổi lớn hậu COVID</h2><p>Đại dịch đã thay đổi cách nhìn nhận về giáo dục quốc tế. Sinh viên ngày nay ưu tiên sự linh hoạt, giá trị thực tế và khả năng định cư sau tốt nghiệp hơn là thương hiệu trường.</p><h2>Xu hướng nổi bật 2025</h2><ul><li>Du học Đức và Bắc Âu (miễn hoặc học phí thấp) tăng 40%</li><li>Chương trình kết hợp online-offline phổ biến hơn</li><li>Ngành STEM, AI và Y tế dẫn đầu xu hướng chọn ngành</li><li>Đài Loan nổi lên như điểm đến mới của châu Á</li></ul>` },
  { section:'tin-tuc', subcategory:'thi-truong', title:'Ngành nghề hot tại Hàn Quốc dành cho lao động Việt Nam 2025', cover_image:'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80', excerpt:'Điểm danh những ngành nghề đang thiếu hụt nhân lực nghiêm trọng tại Hàn Quốc và cơ hội cho người lao động Việt Nam.', content:`<h2>Bối cảnh thị trường Hàn Quốc</h2><p>Hàn Quốc đang trải qua cuộc khủng hoảng nhân khẩu học với tỷ lệ sinh thấp nhất thế giới (0,72 năm 2023). Điều này tạo ra nhu cầu lao động nước ngoài ngày càng tăng.</p><h2>Top 5 ngành nghề thiếu nhân lực</h2><ol><li><strong>Điện tử và bán dẫn:</strong> Samsung, SK Hynix, LG tuyển dụng liên tục</li><li><strong>Nông nghiệp:</strong> Hàn Quốc phụ thuộc nhiều vào lao động nước ngoài</li><li><strong>Xây dựng:</strong> Thiếu thợ lành nghề từ 2023</li><li><strong>Chăm sóc sức khỏe:</strong> Điều dưỡng, hộ lý người cao tuổi</li><li><strong>Nhà hàng và dịch vụ:</strong> Chuỗi ẩm thực Hàn mở rộng toàn cầu</li></ol>` },

  // Tin tức - Hoạt động
  { section:'tin-tuc', subcategory:'hoat-dong', title:'ABS tổ chức hội thảo du học Nhật Bản thu hút hơn 500 học viên', cover_image:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', excerpt:'Sự kiện hội thảo du học Nhật Bản của ABS ngày 20/3/2025 đã thu hút hơn 500 học viên và phụ huynh tham dự với nhiều thông tin hữu ích.', content:`<h2>Tóm tắt sự kiện</h2><p>Hội thảo "Du học Nhật Bản 2025 - Cơ hội và lộ trình" do ABS Du Học tổ chức ngày 20/3/2025 tại Khách sạn Novotel Đà Nẵng đã thành công vượt mong đợi với hơn 500 người tham dự.</p><h2>Nội dung nổi bật</h2><ul><li>Chia sẻ từ đại diện 5 trường đại học Nhật Bản đối tác</li><li>Phiên Q&A trực tiếp với chuyên gia tư vấn ABS</li><li>Triển lãm thông tin trường và học bổng</li><li>Giao lưu cùng du học sinh Nhật Bản về Việt Nam</li></ul><p>ABS sẽ tổ chức thêm hội thảo tại Hà Nội và TP.HCM vào tháng 4/2025.</p>` },
  { section:'tin-tuc', subcategory:'hoat-dong', title:'Đoàn ABS thăm và ký kết hợp tác với trường đại học Tokyo', cover_image:'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80', excerpt:'Đoàn công tác ABS Du Học đã có chuyến thăm chính thức Nhật Bản và ký kết biên bản hợp tác với Đại học Tokyo và 3 trường đại học khác.', content:`<h2>Chuyến công tác thành công</h2><p>Từ ngày 10-17/3/2025, đoàn công tác gồm 5 thành viên Ban Giám đốc ABS đã có chuyến thăm chính thức Nhật Bản, gặp gỡ đại diện các trường đối tác.</p><h2>Các hợp tác được ký kết</h2><ul><li><strong>Đại học Tokyo:</strong> Chương trình trao đổi sinh viên, học bổng nghiên cứu</li><li><strong>Đại học Waseda:</strong> Ưu tiên xét tuyển sinh viên ABS giới thiệu</li><li><strong>Đại học Ritsumeikan:</strong> Học bổng 30% học phí dành cho 10 sinh viên/năm</li><li><strong>Trường Nhật ngữ Kudan:</strong> Giáo trình độc quyền cho ABS</li></ul>` },
  { section:'tin-tuc', subcategory:'hoat-dong', title:'Lễ tiễn 50 lao động Việt Nam sang Đài Loan làm việc theo chương trình ABS', cover_image:'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80', excerpt:'ABS Du Học long trọng tổ chức lễ tiễn 50 lao động lên đường sang Đài Loan làm việc, đánh dấu đợt xuất cảnh lớn nhất trong quý I/2025.', content:`<h2>Đợt xuất cảnh quý I/2025</h2><p>Sáng ngày 15/3/2025, tại sân bay quốc tế Đà Nẵng, ABS Du Học đã tổ chức lễ tiễn 50 lao động chính thức lên đường sang Đài Loan làm việc theo hợp đồng 3 năm tại các nhà máy điện tử.</p><h2>Chia sẻ từ người lao động</h2><p>"Tôi rất vui và tự hào khi được lên đường hôm nay. Cảm ơn ABS đã hỗ trợ tôi từ khâu hồ sơ đến ngày xuất cảnh" - anh Nguyễn Văn Hùng, 28 tuổi, Quảng Nam chia sẻ.</p><p>ABS cam kết tiếp tục hỗ trợ người lao động trong suốt thời gian làm việc tại nước ngoài qua đường dây hotline 24/7.</p>` }
];

// Seed chỉ khi bảng trống
const count = db.prepare('SELECT COUNT(*) as c FROM articles').get();
if (count.c === 0) {
  const insert = db.prepare(`
    INSERT INTO articles (title, section, subcategory, cover_image, excerpt, content, published_at)
    VALUES (@title, @section, @subcategory, @cover_image, @excerpt, @content, datetime('now','localtime'))
  `);
  const insertMany = db.transaction((articles) => {
    for (const a of articles) insert.run(a);
  });
  insertMany(seedArticles);
  console.log(`✅ Seeded ${seedArticles.length} articles`);
}

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (token !== ADMIN_PASSWORD) return res.status(401).json({ success: false, message: 'Không có quyền truy cập' });
  next();
}

// ─── ARTICLE ROUTES ───────────────────────────────────────────────────────────

app.get('/api/articles', (req, res) => {
  const { section, subcategory } = req.query;
  let sql = 'SELECT * FROM articles WHERE is_published = 1';
  const params = [];
  if (section) { sql += ' AND section = ?'; params.push(section); }
  if (subcategory) { sql += ' AND subcategory = ?'; params.push(subcategory); }
  sql += ' ORDER BY published_at DESC';
  const rows = db.prepare(sql).all(...params);
  res.json({ success: true, data: rows });
});

app.get('/api/articles/all', (req, res) => {
  // Admin: all articles including unpublished
  const { section, subcategory } = req.query;
  let sql = 'SELECT * FROM articles WHERE 1=1';
  const params = [];
  if (section) { sql += ' AND section = ?'; params.push(section); }
  if (subcategory) { sql += ' AND subcategory = ?'; params.push(subcategory); }
  sql += ' ORDER BY published_at DESC';
  const rows = db.prepare(sql).all(...params);
  res.json({ success: true, data: rows });
});

app.get('/api/articles/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  res.json({ success: true, data: row });
});

app.post('/api/articles', requireAdmin, (req, res) => {
  const { title, section, subcategory, cover_image, excerpt, content, is_published } = req.body;
  if (!title || !section || !subcategory) return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc' });
  const result = db.prepare(`
    INSERT INTO articles (title, section, subcategory, cover_image, excerpt, content, is_published, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now','localtime'))
  `).run(title, section, subcategory, cover_image || '', excerpt || '', content || '', is_published ?? 1);
  const newArticle = db.prepare('SELECT * FROM articles WHERE id = ?').get(result.lastInsertRowid);
  res.json({ success: true, data: newArticle });
});

app.put('/api/articles/:id', requireAdmin, (req, res) => {
  const { title, section, subcategory, cover_image, excerpt, content, is_published } = req.body;
  const existing = db.prepare('SELECT id FROM articles WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  db.prepare(`
    UPDATE articles SET title=?, section=?, subcategory=?, cover_image=?, excerpt=?, content=?, is_published=?
    WHERE id=?
  `).run(title, section, subcategory, cover_image || '', excerpt || '', content || '', is_published ?? 1, req.params.id);
  const updated = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  res.json({ success: true, data: updated });
});

app.delete('/api/articles/:id', requireAdmin, (req, res) => {
  const existing = db.prepare('SELECT id FROM articles WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Đã xóa bài viết' });
});

// ─── EXISTING ROUTES ──────────────────────────────────────────────────────────

const events = [
  { id:1, date:'28-03-2025', title:'Học bổng, chuyên ngành đào tạo Trường đại học Curtin Singapore', description:'Cùng tìm hiểu các chương trình học bổng hấp dẫn và chi phí thấp nhất tại Curtin Singapore.', image:'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80' },
  { id:2, date:'09-03-2025', title:'Học bổng du học Singapore trường Đại học Curtin Singapore 2024', description:'Trường Curtin Singapore dành các suất học bổng hấp dẫn cho sinh viên Việt Nam.', image:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80' },
  { id:3, date:'25-03-2025', title:'Hội thảo Tìm hiểu Curtin Singapore - Bộ trưởng Bộ Giáo dục', description:'Hội thảo trực tuyến cùng chuyên gia giáo dục về cơ hội du học tại Singapore 2025.', image:'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80' }
];
const testimonials = [
  { id:1, name:'Trịnh Ngọc Anh', school:'Đại học Luật Hà Nội', ielts:'8.0', quote:'Nhờ sự hỗ trợ tận tình của ABS, em đã đạt IELTS 8.0 và nhận học bổng 20% tại đại học Curtin. Em rất biết ơn đội ngũ ABS.', avatar:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80' },
  { id:2, name:'Nguyễn Đức Thuận', school:'Đại học Luật Hà Nội', ielts:'8.0', quote:'ABS tư vấn rất nhiệt tình, hỗ trợ em từ A đến Z. Nhờ ABS, giấc mơ du học Úc của em đã trở thành hiện thực.', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
  { id:3, name:'Lê Văn Thiện', school:'Đại học Luật Hà Nội', ielts:'8.0', quote:'ABS đã giúp tôi tìm được trường phù hợp và hành trình du học của tôi trở nên dễ dàng hơn rất nhiều.', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80' }
];

app.get('/api/events', (req, res) => res.json({ success: true, data: events }));
app.get('/api/testimonials', (req, res) => res.json({ success: true, data: testimonials }));

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) return res.json({ success: true, token: ADMIN_PASSWORD });
  res.status(401).json({ success: false, message: 'Sai mật khẩu' });
});

app.post('/api/contact', (req, res) => {
  const { name, phone, email, message } = req.body;
  if (!name || !phone) return res.status(400).json({ success: false, message: 'Vui lòng điền họ tên và số điện thoại.' });
  db.prepare('INSERT INTO contacts (name,phone,email,message) VALUES (?,?,?,?)').run(name, phone, email, message);
  res.json({ success: true, message: 'Chúng tôi đã nhận được thông tin. Tư vấn viên sẽ liên hệ bạn sớm nhất!' });
});

app.get('/', (req, res) => res.json({ message: 'ABS Du Học API v2 - port ' + PORT }));

app.listen(PORT, () => console.log(`✅ ABS Du Học Backend running at http://localhost:${PORT}`));
