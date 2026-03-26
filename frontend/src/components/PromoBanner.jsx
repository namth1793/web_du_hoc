import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 shadow-2xl animate-on-scroll">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-white/10 rounded-full translate-y-1/2" />

          <div className="relative grid lg:grid-cols-3 gap-0 items-stretch min-h-[220px]">
            <div className="lg:col-span-2 flex flex-col justify-center px-8 py-10 gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-white/30 rounded-full px-3 py-1 text-white font-bold text-sm flex items-center gap-1">
                  🔥 CAM KẾT
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1 text-white text-sm">Tỷ lệ visa 100%</div>
              </div>

              <div>
                <h3 className="text-white text-4xl md:text-5xl font-black leading-tight">
                  Du học & XKLĐ
                </h3>
                <p className="text-white/90 text-xl font-semibold mt-1">
                  Nhật Bản · Hàn Quốc · Đài Loan
                </p>
              </div>

              <p className="text-white/80 text-sm max-w-lg">
                HCIT – Trung tâm Xúc tiến Du học và Xuất khẩu lao động uy tín, có giấy phép hoạt động hợp pháp. Hỗ trợ đầy đủ từ tư vấn, hồ sơ đến visa và sau khi bay.
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  to="/lien-he"
                  className="group bg-white text-orange-500 hover:bg-gray-50 px-7 py-3.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  ĐĂNG KÝ NGAY
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="tel:035.9966.168"
                  className="bg-white/20 hover:bg-white/30 border border-white/40 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  035.9966.168
                </a>
              </div>

              <div className="flex flex-wrap gap-2 mt-1">
                {['Visa 100%', 'Miễn phí tư vấn', 'Hỗ trợ hồ sơ A-Z', 'Có giấy phép XKLĐ'].map(b => (
                  <span key={b} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80"
                alt="Du học sinh Hàn Quốc"
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇰🇷</span>
                  <div>
                    <div className="text-xs font-bold text-gray-800">Seoul, Hàn Quốc</div>
                    <div className="text-xs text-gray-500">Cơ hội du học & việc làm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
