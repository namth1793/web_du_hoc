const services = [
  {
    title: 'Xuất khẩu lao động',
    items: ['Tư vấn chương trình làm việc tại nước ngoài', 'Hỗ trợ hồ sơ, visa', 'Cơ hội việc làm ổn định'],
    color: 'from-orange-400 to-rose-400',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    title: 'Du học',
    items: ['Tư vấn chọn trường, ngành', 'Hỗ trợ hồ sơ, xin visa', 'Định hướng lộ trình học tập'],
    color: 'from-blue-400 to-cyan-400',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
      </svg>
    ),
  },
  {
    title: 'Đào tạo & tuyển sinh',
    items: ['Đào tạo ngoại ngữ', 'Định hướng trước khi đi', 'Hỗ trợ kỹ năng cần thiết'],
    color: 'from-green-400 to-teal-400',
    bg: 'bg-green-50',
    iconColor: 'text-green-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Việc làm trong nước',
    items: ['Kết nối doanh nghiệp', 'Giới thiệu việc làm', 'Hỗ trợ sau đào tạo'],
    color: 'from-purple-400 to-violet-400',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
];

export default function Intro() {
  return (
    <section id="intro" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Dịch vụ của HCIT
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Dịch vụ chính</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            HCIT cung cấp đa dạng dịch vụ hỗ trợ toàn diện từ du học, xuất khẩu lao động đến đào tạo và việc làm trong nước
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((s, i) => (
            <div key={i} className={`rounded-3xl p-7 ${s.bg} border border-white shadow-sm hover:shadow-md transition-shadow animate-on-scroll`}>
              <div className={`${s.iconColor} mb-5`}>{s.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* About HCIT strip */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative animate-on-scroll">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80"
                alt="Du học sinh Hàn Quốc"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl p-5 shadow-2xl">
              <div className="text-3xl font-black leading-none">100%</div>
              <div className="text-sm font-semibold mt-1 opacity-90">Cam kết Visa</div>
            </div>
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black text-xs">HCIT</div>
              <div className="text-xs font-semibold text-gray-600">Du học & XKLĐ</div>
            </div>
          </div>

          <div className="space-y-6 animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              Về HCIT
            </div>

            <h3 className="text-3xl font-bold text-gray-800 leading-snug">
              Đồng hành cùng học viên với cam kết <span className="text-orange-500">uy tín & chất lượng</span>
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Công ty Cổ phần Cung ứng Xuất khẩu lao động Công thương Hà Nội (HCIT., JSC) hoạt động trong lĩnh vực du học và xuất khẩu lao động, có giấy phép hoạt động hợp pháp được cấp bởi cơ quan chức năng tại Việt Nam.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Với nhiều năm kinh nghiệm và mạng lưới hợp tác với các trường học quốc tế, doanh nghiệp nước ngoài tại Nhật Bản, Hàn Quốc, Đài Loan, HCIT tự hào là cầu nối tin cậy giúp học viên Việt Nam vươn tầm quốc tế.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="/lien-he"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Tư vấn miễn phí →
              </a>
              <a
                href="/gioi-thieu/gioi-thieu-chung"
                className="border border-orange-200 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
