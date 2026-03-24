import { useState, useEffect } from 'react';
import api from '../lib/api';

const defaultBanner = {
  badge_text: 'Vươn tầm thế hệ trẻ Việt',
  country: 'AUSTRALIA',
  tagline: 'Du học',
  description: 'Với phương châm "Vươn tầm thế hệ trẻ Việt", ABS hỗ trợ học sinh, sinh viên trong suốt quá trình du học Úc – từ lựa chọn trường, xin visa đến tìm kiếm việc làm tại Úc.',
  cta_text: 'Tư vấn ngay',
  scholarship_pct: '20',
  scholarship_label: 'Du học Úc',
  stat1_num: '20+', stat1_label: 'Năm kinh nghiệm',
  stat2_num: '5000+', stat2_label: 'Du học sinh',
  stat3_num: '100%', stat3_label: 'Cam kết việc làm',
  img_main: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
  img_secondary: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&q=80',
  img_tertiary: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&q=80'
};

export default function Hero() {
  const [banner, setBanner] = useState(defaultBanner);

  useEffect(() => {
    api.get('/api/settings/banner')
      .then(r => { if (r.data?.data && Object.keys(r.data.data).length > 0) setBanner(r.data.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24" aria-label="Hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-300 to-orange-300" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-200/30 rounded-full blur-2xl" />

      {/* Floating clouds */}
      <div className="absolute top-32 left-1/4 opacity-60">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="white">
          <ellipse cx="60" cy="40" rx="55" ry="20"/>
          <ellipse cx="45" cy="30" rx="30" ry="22"/>
          <ellipse cx="75" cy="28" rx="25" ry="20"/>
        </svg>
      </div>
      <div className="absolute top-40 right-1/3 opacity-40">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="white">
          <ellipse cx="40" cy="28" rx="36" ry="13"/>
          <ellipse cx="30" cy="20" rx="20" ry="15"/>
          <ellipse cx="52" cy="18" rx="18" ry="14"/>
        </svg>
      </div>

      {/* Plane */}
      <div className="absolute top-36 right-1/4 animate-bounce-slow opacity-80">
        <svg width="60" height="60" viewBox="0 0 64 64" fill="white">
          <path d="M59.5,28.5l-18-4.5L24,6H18l8,18H10L6,18H2l4,14L2,46h4l4-6h16l-8,18h6l17.5-18l18-4.5c2.5-0.5,4.5-2.7,4.5-5.2 C64,31.2,62,29,59.5,28.5z"/>
        </svg>
      </div>

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
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Cam kết 100% việc làm
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Hỗ trợ toàn diện A–Z
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
                href="#contact"
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

          {/* Right content – student images + scholarship badge */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Scholarship badge */}
            <div className="absolute top-0 right-0 z-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-4 shadow-2xl text-center animate-bounce-slow">
              <div className="text-3xl font-black">{banner.scholarship_pct}%</div>
              <div className="text-xs font-bold">HỌC BỔNG</div>
              <div className="text-xs opacity-80">{banner.scholarship_label}</div>
            </div>

            {/* Main student image */}
            <div className="relative z-10">
              <div className="w-72 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img
                  src={banner.img_main}
                  alt="Du học sinh Úc"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Secondary image */}
              <div className="absolute -bottom-8 -right-10 w-44 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20">
                <img
                  src={banner.img_secondary}
                  alt="Sinh viên vui vẻ"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Third image */}
              <div className="absolute -top-6 -left-10 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20">
                <img
                  src={banner.img_tertiary}
                  alt="Sinh viên tốt nghiệp"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* IDP badge */}
            <div className="absolute bottom-20 left-0 z-30 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm">IDP</div>
              <div>
                <div className="text-xs font-semibold text-gray-700">Đối tác chính thức</div>
                <div className="text-xs text-gray-400">IDP Education</div>
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
