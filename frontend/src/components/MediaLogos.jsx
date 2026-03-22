const partners = [
  { name: 'Kalmbach Media', abbr: 'K', color: '#1a56db' },
  { name: 'Emerald Group', abbr: 'E', color: '#0e9f6e' },
  { name: 'Kalmbach Media', abbr: 'K', color: '#1a56db' },
  { name: 'Emerald Group', abbr: 'E', color: '#0e9f6e' },
  { name: 'Media Pro', abbr: 'M', color: '#7c3aed' },
  { name: 'Creative', abbr: 'C', color: '#e02424' },
  { name: 'MatBao', abbr: 'MB', color: '#ff6900' },
  { name: 'Dân Trí', abbr: 'DT', color: '#c81e1e' },
  { name: 'Nhân Dân', abbr: 'ND', color: '#c81e1e' },
  { name: 'VietnamNet', abbr: 'VN', color: '#e02424' }
];

const pressMedia = [
  { name: 'Báo Tuổi Trẻ', url: 'https://img.shields.io/badge/Tuổi_Trẻ-FF0000?style=flat&logoColor=white' },
  { name: 'Báo Dân Trí', url: 'https://img.shields.io/badge/Dân_Trí-C81E1E?style=flat&logoColor=white' },
  { name: 'VnExpress', url: 'https://img.shields.io/badge/VnExpress-FF6600?style=flat&logoColor=white' },
  { name: 'Nhân Dân', url: 'https://img.shields.io/badge/Nhân_Dân-C81E1E?style=flat&logoColor=white' },
  { name: 'VietnamNet', url: 'https://img.shields.io/badge/VietnamNet-004799?style=flat&logoColor=white' },
  { name: 'Zing News', url: 'https://img.shields.io/badge/Zing-2563EB?style=flat&logoColor=white' }
];

export default function MediaLogos() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="section-title">Truyền thông nói về chúng tôi</h2>
          <p className="section-subtitle">
            ABS Du Học được các phương tiện truyền thông hàng đầu Việt Nam và quốc tế tin tưởng đưa tin
          </p>
        </div>

        {/* Partner logos grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-12 animate-on-scroll">
          {partners.map((p, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                  style={{ backgroundColor: p.color }}
                >
                  {p.abbr}
                </div>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">{p.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Press coverage */}
        <div className="animate-on-scroll">
          <p className="text-center text-sm text-gray-500 mb-6 font-medium">Được đưa tin bởi</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: '📰 Báo Tuổi Trẻ', bg: 'bg-red-50 text-red-600 border-red-200' },
              { name: '📰 Dân Trí', bg: 'bg-orange-50 text-orange-600 border-orange-200' },
              { name: '📰 VnExpress', bg: 'bg-blue-50 text-blue-600 border-blue-200' },
              { name: '📰 Nhân Dân', bg: 'bg-red-50 text-red-700 border-red-200' },
              { name: '📰 VietnamNet', bg: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
              { name: '📰 Zing News', bg: 'bg-purple-50 text-purple-600 border-purple-200' },
              { name: '📺 VTV', bg: 'bg-green-50 text-green-600 border-green-200' },
              { name: '📺 HTV', bg: 'bg-yellow-50 text-yellow-700 border-yellow-200' }
            ].map(m => (
              <span
                key={m.name}
                className={`px-4 py-2 rounded-full border text-sm font-medium ${m.bg} hover:scale-105 transition-transform cursor-pointer`}
              >
                {m.name}
              </span>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 animate-on-scroll">
          {[
            { icon: '🏆', title: 'Top 10 Đơn vị', subtitle: 'Tư vấn du học uy tín 2024' },
            { icon: '✅', title: 'Được chứng nhận', subtitle: 'Bộ GD&ĐT Việt Nam' },
            { icon: '🌏', title: 'Đối tác chính thức', subtitle: 'IDP Education Australia' },
            { icon: '⭐', title: '4.9/5 đánh giá', subtitle: 'Từ 5000+ học viên' }
          ].map(b => (
            <div key={b.title} className="text-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{b.icon}</div>
              <div className="font-bold text-gray-800 text-sm">{b.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{b.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
