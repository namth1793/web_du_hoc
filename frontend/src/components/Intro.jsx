export default function Intro() {
  return (
    <section id="intro" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title animate-on-scroll">Du học Australia với ABS</h2>
        <p className="section-subtitle animate-on-scroll">
          Đồng hành cùng bạn trên hành trình chinh phục giấc mơ du học
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-10">
          {/* Left – Video/image block */}
          <div className="relative animate-on-scroll">
            {/* Main image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Phong cảnh Sydney Australia"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  aria-label="Xem video giới thiệu"
                  className="group w-16 h-16 bg-white/90 hover:bg-orange-500 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-orange-500 group-hover:text-white ml-1 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Floating card – Du học A to Z */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl p-5 shadow-2xl">
              <div className="text-3xl font-black leading-none">A→Z</div>
              <div className="text-sm font-semibold mt-1 opacity-90">Hỗ trợ toàn diện</div>
              <div className="text-xs opacity-75 mt-0.5">Du học Tập 3</div>
            </div>

            {/* IDP partner badge */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-xs">IDP</div>
              <div className="text-xs font-semibold text-gray-600">Đối tác IDP</div>
            </div>
          </div>

          {/* Right – Content */}
          <div className="space-y-6 animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Về ABS Du Học
            </div>

            <h3 className="text-3xl font-bold text-gray-800 leading-snug">
              Tự hào là đơn vị có hơn <span className="text-orange-500">8 năm kinh nghiệm</span> hoạt động trong lĩnh vực tư vấn du học
            </h3>

            <p className="text-gray-600 leading-relaxed">
              ABS tự hào là đơn vị có hơn 8 năm kinh nghiệm hoạt động trong lĩnh vực tư vấn du học. Chúng tôi đã giúp hàng nghìn học sinh, sinh viên Việt Nam đến học tập Úc và các quốc gia khác trên thế giới.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Với phương châm <strong className="text-orange-500">"Vươn Tầm Thế Hệ Trẻ Việt"</strong>, ABS hỗ trợ đồng hành cùng du học sinh trong suốt quá trình học tập. Quá đó, định hình cùng những du học sinh nhận ra giá trị của bản thân đóng góp tốt nhất để nâng cao chất lượng nguồn nhân lực và phát triển bền vững.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎓', text: 'Hỗ trợ xin học bổng' },
                { icon: '✈️', text: 'Tư vấn visa nhanh' },
                { icon: '🏠', text: 'Hỗ trợ chỗ ở tại Úc' },
                { icon: '💼', text: 'Kết nối việc làm' }
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="#contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Tư vấn miễn phí →
              </a>
              <a
                href="#intro"
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
