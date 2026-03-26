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
  img_main: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1600&q=80',
  img_secondary: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=80',
  img_tertiary: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=1600&q=80'
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" aria-label="Hero">
      {/* Background carousel */}
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === slide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content – centered */}
      <div className="relative w-full max-w-4xl mx-auto px-4 text-center text-white py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white px-5 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
          {banner.badge_text}
        </div>

        {/* Main heading */}
        <p className="text-lg md:text-xl font-semibold text-white/80 mb-2 tracking-wide uppercase">
          {banner.tagline}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-xl">
          {banner.country}
        </h1>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-1.5 rounded-full text-sm font-medium">
            Nhật Bản · Hàn Quốc · Đài Loan
          </span>
          <span className="bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-1.5 rounded-full text-sm font-medium">
            Hỗ trợ hồ sơ & visa A–Z
          </span>
        </div>

        {/* Description */}
        <p className="text-white/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          {banner.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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
            className="bg-white/15 backdrop-blur-sm hover:bg-white/25 border border-white/40 text-white px-8 py-3.5 rounded-full font-bold text-base transition-all duration-300"
          >
            Tìm hiểu thêm
          </a>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/20">
          {[
            { num: banner.stat1_num, label: banner.stat1_label },
            { num: banner.stat2_num, label: banner.stat2_label },
            { num: banner.stat3_num, label: banner.stat3_label }
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-orange-400">{s.num}</div>
              <div className="text-xs text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slide ? 'w-8 h-2.5 bg-orange-400' : 'w-2.5 h-2.5 bg-white/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}
