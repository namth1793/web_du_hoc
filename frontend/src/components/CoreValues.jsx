const values = [
  {
    title: 'Tầm nhìn',
    color: 'from-yellow-400 to-orange-400',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    desc: 'HCIT quyết tâm trở thành đơn vị hàng đầu trong lĩnh vực du học và xuất khẩu lao động tại Việt Nam, kết nối hàng nghìn học viên với cơ hội quốc tế mỗi năm.',
    highlight: 'Đơn vị hàng đầu'
  },
  {
    title: 'Sứ mệnh',
    color: 'from-blue-400 to-cyan-400',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'Kết nối học viên Việt Nam với cơ hội quốc tế tại Nhật Bản, Hàn Quốc, Đài Loan thông qua dịch vụ tư vấn chuyên nghiệp, minh bạch và tận tâm.',
    highlight: 'Kết nối quốc tế'
  },
  {
    title: 'Giá trị cốt lõi',
    color: 'from-pink-400 to-rose-400',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    desc: 'Uy tín – Chất lượng – Đồng hành. HCIT cam kết hỗ trợ học viên từ A đến Z, từ chuẩn bị hồ sơ, xin visa cho đến khi nhập học và ổn định cuộc sống.',
    highlight: 'Uy tín & Chất lượng'
  }
];

export default function CoreValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title animate-on-scroll">Giá trị của chúng tôi</h2>
        <p className="section-subtitle animate-on-scroll">
          Những giá trị cốt lõi định hướng mọi hoạt động của HCIT
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`card-hover animate-on-scroll rounded-3xl p-8 border-2 ${v.bg} ${v.border} flex flex-col gap-5`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${v.color} text-white self-start`}>
                {v.highlight}
              </span>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>

              <div className="mt-auto">
                <a href="/lien-he" className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 group">
                  Tìm hiểu thêm
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
