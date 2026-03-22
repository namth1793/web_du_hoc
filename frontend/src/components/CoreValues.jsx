const values = [
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#FEF3C7"/>
        <path d="M32 12 L38 26 L54 28 L43 38 L46 54 L32 46 L18 54 L21 38 L10 28 L26 26 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Tầm nhìn',
    color: 'from-yellow-400 to-orange-400',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    desc: 'ABS quyết tâm xây dựng một hệ sinh thái giáo dục quốc tế toàn diện, nơi mỗi học sinh, sinh viên Việt Nam đều có cơ hội tiếp cận nền giáo dục tiên tiến và việc làm toàn cầu.',
    highlight: 'Xây dựng tương lai bền vững'
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#DBEAFE"/>
        <path d="M20 44 L32 16 L44 44" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 36 L40 36" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="32" cy="50" r="3" fill="#3B82F6"/>
      </svg>
    ),
    title: 'Sứ mệnh',
    color: 'from-blue-400 to-cyan-400',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'Với phương châm "Vươn Tầm Thế Hệ Trẻ Việt", ABS hỗ trợ đồng hành cùng du học sinh trong suốt quá trình học tập. Qua đó, định hình cùng những du học sinh nhận ra giá trị bản thân đóng góp cho xã hội và việc làm lương cao tại Úc.',
    highlight: 'Đồng hành mọi hành trình'
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#FCE7F3"/>
        <path d="M32 20 C26 20 20 26 20 32 C20 38 26 44 32 44 C38 44 44 38 44 32 C44 26 38 20 32 20Z" fill="#EC4899" opacity="0.3"/>
        <path d="M25 32 L29 36 L39 26" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 14 L32 18 M32 46 L32 50 M14 32 L18 32 M46 32 L50 32" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Giá trị cốt lõi',
    color: 'from-pink-400 to-rose-400',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    desc: 'Với đơn vị tập trung vào việc cung cấp 1000 kinh nghiệm chuyên sâu từ hơn 20 năm kinh nghiệm trong ngành tư vấn, chúng tôi cam kết mang đến dịch vụ tốt nhất cho mỗi du học sinh Việt.',
    highlight: 'Chất lượng & Uy tín'
  }
];

export default function CoreValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title animate-on-scroll">Giá trị của chúng tôi</h2>
        <p className="section-subtitle animate-on-scroll">
          Những giá trị cốt lõi định hướng mọi hoạt động của ABS Du Học
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`card-hover animate-on-scroll rounded-3xl p-8 border-2 ${v.bg} ${v.border} flex flex-col gap-5`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} p-3 flex items-center justify-center shadow-lg`}>
                {v.icon}
              </div>

              {/* Badge */}
              <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${v.color} text-white self-start`}>
                {v.highlight}
              </span>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>

              <div className="mt-auto">
                <a href="#contact" className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 group">
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
