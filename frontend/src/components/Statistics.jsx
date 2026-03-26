import { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 1200, suffix: '+', label: 'Học viên đã và đang theo học tại HCIT' },
  { value: 100, suffix: '%', label: 'Học viên đỗ visa theo cam kết của HCIT' },
  { value: 680, suffix: '+', label: 'Học viên đã bay ra nước ngoài học tập & làm việc' },
  { value: 100, suffix: '%', label: 'Học viên hài lòng về dịch vụ tư vấn của HCIT' }
];

function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(stat.value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="text-center text-white"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="stat-number text-orange-400 mb-1">
        {visible ? count.toLocaleString() : '0'}
        {stat.suffix}
      </div>
      <p className="text-sm text-white/70 max-w-[180px] mx-auto leading-relaxed">{stat.label}</p>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1600&q=80"
          alt="Du học sinh Hàn Quốc"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gray-900/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Lý do chọn HCIT</h2>
          <p className="text-white/60 max-w-lg mx-auto">
            Những con số thực tế minh chứng cho chất lượng dịch vụ và uy tín của HCIT trong nhiều năm qua.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
