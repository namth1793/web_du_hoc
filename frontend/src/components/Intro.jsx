const services = [
  {
    title: 'Xuất khẩu lao động',
    items: ['Tư vấn chương trình làm việc tại nước ngoài', 'Hỗ trợ hồ sơ, visa', 'Cơ hội việc làm ổn định'],
    color: 'from-orange-400 to-rose-400',
    bg: 'bg-orange-50',
  },
  {
    title: 'Du học',
    items: ['Tư vấn chọn trường, ngành', 'Hỗ trợ hồ sơ, xin visa', 'Định hướng lộ trình học tập'],
    color: 'from-blue-400 to-cyan-400',
    bg: 'bg-blue-50',
  },
  {
    title: 'Đào tạo & tuyển sinh',
    items: ['Đào tạo ngoại ngữ', 'Định hướng trước khi đi', 'Hỗ trợ kỹ năng cần thiết'],
    color: 'from-green-400 to-teal-400',
    bg: 'bg-green-50',
  },
  {
    title: 'Việc làm trong nước',
    items: ['Kết nối doanh nghiệp', 'Giới thiệu việc làm', 'Hỗ trợ sau đào tạo'],
    color: 'from-purple-400 to-violet-400',
    bg: 'bg-purple-50',
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
              <div className={`w-2 h-10 rounded-full bg-gradient-to-b ${s.color} mb-5`} />
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
