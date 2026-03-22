import { Link, useParams } from 'react-router-dom';
import { GIOI_THIEU_MENU } from '../constants';

const CONTENT = {
  'gioi-thieu-chung': {
    title: 'Giới thiệu chung',
    cover: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    body: `
      <h2>ABS Du Học – Người bạn đồng hành trên hành trình chinh phục thế giới</h2>
      <p>Trung tâm Tư vấn Du học & Xuất khẩu Lao động <strong>ABS</strong> (Academic & Beyond Solutions) được thành lập năm 2012 tại Đà Nẵng. Sau hơn 10 năm hoạt động, ABS đã trở thành một trong những đơn vị tư vấn du học uy tín hàng đầu tại miền Trung và trên cả nước.</p>

      <h2>Thành tựu nổi bật</h2>
      <ul>
        <li>Hơn <strong>5.000 học sinh, sinh viên</strong> được tư vấn thành công đến học tập tại 20+ quốc gia</li>
        <li>Hơn <strong>3.000 người lao động</strong> được đưa sang làm việc tại Nhật Bản, Hàn Quốc, Đài Loan, Úc</li>
        <li>Tỷ lệ đậu visa <strong>trên 98%</strong> qua các năm</li>
        <li>Hơn <strong>200 đối tác trường học</strong> tại Nhật, Hàn, Đài Loan, Đức, Úc, Mỹ, Canada</li>
        <li>Được cấp phép hoạt động xuất khẩu lao động bởi <strong>Bộ Lao động – Thương binh và Xã hội</strong></li>
      </ul>

      <h2>Dịch vụ của ABS</h2>
      <ul>
        <li>Tư vấn du học tại Nhật Bản, Hàn Quốc, Đài Loan, Đức, Úc, Mỹ, Canada</li>
        <li>Xuất khẩu lao động sang Nhật Bản, Hàn Quốc, Đài Loan, Châu Úc</li>
        <li>Luyện thi IELTS, JLPT, TOPIK, EPS-TOPIK</li>
        <li>Dịch vụ hỗ trợ du học sinh (chỗ ở, tài khoản ngân hàng, bảo hiểm)</li>
        <li>Tư vấn định cư sau tốt nghiệp/hết hợp đồng</li>
      </ul>

      <h2>Văn phòng</h2>
      <p><strong>Trụ sở chính:</strong> 123 Nguyễn Văn Linh, Quận Thanh Khê, Đà Nẵng<br/>
      <strong>Chi nhánh Hà Nội:</strong> 456 Giải Phóng, Hoàng Mai, Hà Nội<br/>
      <strong>Chi nhánh TP.HCM:</strong> 789 Điện Biên Phủ, Bình Thạnh, TP.HCM</p>
      <p><strong>Hotline:</strong> 1900 1899 | <strong>Email:</strong> info@absduhoc.edu.vn</p>
    `
  },
  'tam-nhin-su-menh': {
    title: 'Tầm nhìn, Sứ mệnh & Giá trị cốt lõi',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    body: `
      <h2>Tầm nhìn</h2>
      <p>ABS hướng tới trở thành <strong>đơn vị tư vấn du học và xuất khẩu lao động số 1 Việt Nam</strong> vào năm 2030 – nơi mỗi người Việt Nam đều có thể tiếp cận cơ hội học tập và làm việc tốt nhất trên thế giới.</p>

      <h2>Sứ mệnh</h2>
      <p>ABS cam kết <strong>đồng hành thực sự</strong> cùng mỗi học viên và người lao động trong hành trình vươn ra thế giới – từ bước đầu tiên đặt chân lên đất khách đến khi ổn định, trưởng thành và thành công.</p>
      <p>Chúng tôi không chỉ xử lý hồ sơ – chúng tôi <em>thay đổi cuộc đời</em>.</p>

      <h2>Giá trị cốt lõi</h2>
      <ul>
        <li>
          <strong>Tin cậy (Trust):</strong> Mọi cam kết của ABS đều được thực hiện. Không hứa những gì không làm được. Không thu phí những gì không có giá trị.
        </li>
        <li>
          <strong>Tận tâm (Dedication):</strong> Mỗi hồ sơ là một con người – không phải một con số. Đội ngũ ABS luôn lắng nghe, thấu hiểu và tìm giải pháp tốt nhất cho từng cá nhân.
        </li>
        <li>
          <strong>Chuyên nghiệp (Professionalism):</strong> Quy trình minh bạch, đội ngũ được đào tạo bài bản, cập nhật chính sách mới nhất từ các đại sứ quán và cơ quan tiếp nhận lao động.
        </li>
        <li>
          <strong>Đồng hành (Partnership):</strong> Mối quan hệ với học viên không kết thúc sau khi cấp visa – ABS tiếp tục hỗ trợ trong suốt thời gian học tập/làm việc ở nước ngoài.
        </li>
        <li>
          <strong>Phát triển bền vững (Sustainability):</strong> ABS kinh doanh có trách nhiệm, đặt lợi ích của học viên và người lao động lên hàng đầu.
        </li>
      </ul>

      <h2>Cam kết với khách hàng</h2>
      <p>ABS cam kết <strong>hoàn trả 100% phí dịch vụ</strong> nếu trường hợp từ chối visa do lỗi của ABS trong khâu tư vấn hoặc chuẩn bị hồ sơ. Chúng tôi tự tin vào chất lượng dịch vụ vì chúng tôi làm đúng ngay từ đầu.</p>
    `
  },
  'co-cau-to-chuc': {
    title: 'Cơ cấu tổ chức',
    cover: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&q=80',
    body: `
      <h2>Ban Giám đốc</h2>
      <ul>
        <li><strong>Tổng Giám đốc:</strong> Nguyễn Thành Tâm – 15 năm kinh nghiệm trong lĩnh vực giáo dục quốc tế</li>
        <li><strong>Phó Giám đốc phụ trách Du học:</strong> Trần Thị Mai Anh – Thạc sĩ Giáo dục, Đại học Monash (Úc)</li>
        <li><strong>Phó Giám đốc phụ trách XKLĐ:</strong> Lê Quang Minh – Chuyên gia xuất khẩu lao động 12 năm kinh nghiệm</li>
      </ul>

      <h2>Phòng ban chức năng</h2>
      <ul>
        <li><strong>Phòng Tư vấn Du học:</strong> 20 tư vấn viên chuyên sâu theo từng thị trường (Nhật, Hàn, Đài Loan, Đức, Úc, Mỹ)</li>
        <li><strong>Phòng Xuất khẩu Lao động:</strong> 15 chuyên viên phụ trách hồ sơ, phỏng vấn, xuất cảnh</li>
        <li><strong>Trung tâm Ngoại ngữ:</strong> Đội ngũ 30 giáo viên IELTS, JLPT, TOPIK, EPS-TOPIK</li>
        <li><strong>Phòng Hỗ trợ Sau Xuất cảnh:</strong> Hotline 24/7, hỗ trợ xử lý sự cố tại nước ngoài</li>
        <li><strong>Phòng Marketing & Truyền thông:</strong> Quản lý thương hiệu, tổ chức hội thảo, sự kiện</li>
        <li><strong>Phòng Kế toán – Hành chính:</strong> Quản lý tài chính, pháp lý, hợp đồng</li>
      </ul>

      <h2>Mạng lưới đại lý</h2>
      <p>ABS có hệ thống <strong>50+ đại lý được ủy quyền</strong> trên toàn quốc từ Hà Nội đến Cà Mau, giúp học viên và người lao động ở mọi tỉnh thành đều có thể tiếp cận dịch vụ của ABS một cách thuận tiện nhất.</p>

      <h2>Đối tác quốc tế</h2>
      <p>ABS duy trì quan hệ đối tác chính thức với hơn <strong>200 trường đại học, cao đẳng và trung học</strong> tại Nhật Bản, Hàn Quốc, Đài Loan, Đức, Úc, Mỹ, Canada, cùng với <strong>50+ công ty và nhà máy</strong> tiếp nhận lao động tại Nhật, Hàn, Đài Loan, Úc.</p>
    `
  },
  'ho-so-phap-ly': {
    title: 'Hồ sơ pháp lý',
    cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    body: `
      <h2>Giấy phép hoạt động</h2>
      <ul>
        <li><strong>Giấy phép kinh doanh:</strong> Số 0401234567 do Sở Kế hoạch và Đầu tư TP. Đà Nẵng cấp ngày 15/03/2012</li>
        <li><strong>Giấy phép Tư vấn Du học:</strong> Số GP-TVDH-0123 do Bộ Giáo dục và Đào tạo cấp, còn hiệu lực đến 2027</li>
        <li><strong>Giấy phép Xuất khẩu Lao động:</strong> Số 0456/LĐTBXH-GP do Bộ Lao động – Thương binh và Xã hội cấp</li>
        <li><strong>Chứng nhận thành viên VNAS:</strong> Hội đồng Tư vấn Du học Việt Nam</li>
      </ul>

      <h2>Các chứng nhận và giải thưởng</h2>
      <ul>
        <li>Top 10 Đơn vị Tư vấn Du học Uy tín Việt Nam 2022, 2023, 2024 (Hội đồng Kinh doanh & Phát triển Giáo dục)</li>
        <li>Đối tác Vàng của JASSO (Japan Student Services Organization)</li>
        <li>Đối tác chính thức của NIIED (National Institute for International Education, Hàn Quốc)</li>
        <li>Thành viên AIRC (American International Recruitment Council)</li>
        <li>Danh hiệu "Thương hiệu Dịch vụ Xuất sắc" tại Đà Nẵng 2023</li>
      </ul>

      <h2>Cam kết pháp lý</h2>
      <p>ABS hoạt động hoàn toàn trong khuôn khổ pháp luật Việt Nam và quốc tế. Chúng tôi <strong>không thu phí vượt quy định</strong> của Bộ LĐ-TBXH, <strong>không môi giới chui</strong>, <strong>không cam kết sai sự thật</strong> về thị trường lao động hay cơ hội học tập nước ngoài.</p>
      <p>Mọi hợp đồng dịch vụ đều minh bạch, rõ ràng, có đóng dấu xác nhận của ABS và chữ ký của khách hàng trước khi thực hiện bất kỳ dịch vụ nào.</p>

      <h2>Liên hệ kiểm tra thông tin</h2>
      <p>Quý khách có thể kiểm tra tính xác thực của Giấy phép Xuất khẩu Lao động tại cổng thông tin của <a href="https://dolab.gov.vn" target="_blank" rel="noopener noreferrer">Cục Quản lý Lao động ngoài nước (DOLAB)</a>.</p>
    `
  }
};

const SLUGS = [
  { slug: 'gioi-thieu-chung', label: 'Giới thiệu chung' },
  { slug: 'tam-nhin-su-menh', label: 'Tầm nhìn & Sứ mệnh' },
  { slug: 'co-cau-to-chuc', label: 'Cơ cấu tổ chức' },
  { slug: 'ho-so-phap-ly', label: 'Hồ sơ pháp lý' }
];

export default function GioiThieu() {
  const { slug } = useParams();
  const page = CONTENT[slug];

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Trang không tồn tại.</p>
          <Link to="/" className="mt-4 inline-block text-orange-500 hover:underline">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <span className="text-orange-500 font-medium">Giới thiệu</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <span className="text-gray-800 font-semibold">{page.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar nav */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-orange-500 px-4 py-3">
                <h3 className="text-white font-bold text-sm">Giới thiệu ABS</h3>
              </div>
              <nav className="py-2">
                {SLUGS.map(item => (
                  <Link
                    key={item.slug}
                    to={`/gioi-thieu/${item.slug}`}
                    className={`flex items-center gap-2.5 px-4 py-3 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                      item.slug === slug
                        ? 'bg-orange-50 text-orange-600 font-semibold border-l-2 border-l-orange-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.slug === slug ? 'bg-orange-500' : 'bg-gray-300'}`} />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Cover image */}
            <div className="h-56 md:h-72 rounded-2xl overflow-hidden mb-6 shadow-md">
              <img src={page.cover} alt={page.title} className="w-full h-full object-cover" loading="lazy" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
              {/* Title */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-1.5 h-10 bg-orange-500 rounded-full flex-shrink-0" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{page.title}</h1>
              </div>

              {/* Content */}
              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed
                  prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-800 prose-h2:mt-8 prose-h2:mb-3 prose-h2:flex prose-h2:items-center prose-h2:gap-2
                  prose-h2:before:content-[''] prose-h2:before:inline-block prose-h2:before:w-1 prose-h2:before:h-6 prose-h2:before:bg-orange-400 prose-h2:before:rounded-full
                  prose-p:mb-4 prose-p:leading-relaxed
                  prose-ul:mb-4 prose-ul:pl-6 prose-li:mb-2
                  prose-ol:mb-4 prose-ol:pl-6
                  prose-strong:text-orange-600
                  prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: page.body }}
              />
            </div>

            {/* CTA */}
            <div className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-lg">Bạn cần tư vấn?</p>
                <p className="text-orange-100 text-sm">Đội ngũ ABS luôn sẵn sàng hỗ trợ bạn</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a href="tel:19001899"
                  className="bg-white text-orange-600 font-bold px-5 py-2.5 rounded-full text-sm hover:bg-orange-50 transition-colors shadow-md">
                  1900 1899
                </a>
                <Link to="/#contact"
                  className="bg-orange-700 text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-orange-800 transition-colors shadow-md">
                  Đặt lịch tư vấn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
