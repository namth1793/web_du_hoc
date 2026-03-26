import { useState, useEffect } from 'react';
import api from '../lib/api';

const defaultBanner = {
  badge_text: 'Trung tâm Xúc tiến Du học HCIT',
  country: 'CAM KẾT VISA 100%',
  tagline: 'TUYỂN SINH DU HỌC',
  description: 'HCIT đồng hành cùng học sinh, sinh viên Việt Nam trên con đường chinh phục ước mơ du học Nhật Bản, Hàn Quốc, Đài Loan và xuất khẩu lao động với cam kết tỷ lệ visa 100%.',
  cta_text: 'Đăng ký ngay',
  scholarship_pct: '100',
  scholarship_label: 'Cam kết Visa',
  stat1_num: '1200+', stat1_label: 'Học viên theo học',
  stat2_num: '680+', stat2_label: 'Học viên đã bay',
  stat3_num: '100%', stat3_label: 'Tỷ lệ đỗ visa',
  img_main: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80',
  img_secondary: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80',
  img_tertiary: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=300&q=80'
};

export default function Hero() {
  const [banner, setBanner] = useState(defaultBanner);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    api.get('/api/settings/banner')
      .then(r => { if (r.data?.data && Object.keys(r.data.data).length > 0) setBanner(r.data.data); })
      .catch(() => {});
  }, []);

  const slides = [banner.img_main, banner.img_secondary, banner.img_tertiary].filter(Boolean);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => setSlide(p => (p + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24" aria-label="Hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-300 to-orange-300" />

      <div className="relative max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="text-white space-y-5 animate-on-scroll">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
              {banner.badge_text}
            </div>

            {/* Main heading */}
            <div>
              <p className="text-xl md:text-2xl font-semibold opacity-90 mb-1">{banner.tagline}</p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none drop-shadow-lg">
                {banner.country}
              </h1>
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  Nhật Bản · Hàn Quốc · Đài Loan
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  Hỗ trợ hồ sơ &amp; visa A–Z
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg max-w-md leading-relaxed">
              {banner.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/lien-he"
                className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                {banner.cta_text}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#intro"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/40 text-white px-8 py-3.5 rounded-full font-bold text-base transition-all duration-300"
              >
                Tìm hiểu thêm
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              {[
                { num: banner.stat1_num, label: banner.stat1_label },
                { num: banner.stat2_num, label: banner.stat2_label },
                { num: banner.stat3_num, label: banner.stat3_label }
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black">{s.num}</div>
                  <div className="text-xs text-white/80 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content – carousel */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Scholarship badge */}
            <div className="absolute top-0 right-0 z-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-4 shadow-2xl text-center">
              <div className="text-3xl font-black">{banner.scholarship_pct}%</div>
              <div className="text-xs font-bold">HỌC BỔNG</div>
              <div className="text-xs opacity-80">{banner.scholarship_label}</div>
            </div>

            {/* Carousel */}
            <div className="relative z-10 w-72 h-96">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 relative">
                {slides.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Slide ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      i === slide
                        ? 'opacity-100 translate-x-0'
                        : i < slide
                          ? 'opacity-0 -translate-x-full'
                          : 'opacity-0 translate-x-full'
                    }`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
                {/* Dot indicators */}
                {slides.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlide(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === slide ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/60'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick info badge */}
            <div className="absolute bottom-20 left-0 z-30 bg-white rounded-2xl px-4 py-3 shadow-xl space-y-1 min-w-[200px]">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-orange-500 font-bold">Web</span>
                <span className="font-semibold">hcit.com.vn</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-orange-500 font-bold">DC</span>
                <span>Số 6, Trịnh Văn Bô, Nam Từ Liêm</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-orange-500 font-bold">ĐT</span>
                <a href="tel:0966198186" className="font-bold text-orange-500">0966 198 186</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"/>
        </svg>
      </div>
    </section>
  );
}
