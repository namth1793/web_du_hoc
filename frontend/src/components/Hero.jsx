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
  img_main: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=95',
  img_secondary: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=95',
  img_tertiary: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=95'
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
    <section className="relative min-h-screen overflow-hidden" aria-label="Hero">
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
