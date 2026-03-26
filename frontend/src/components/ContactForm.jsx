import { useState } from 'react';
import api from '../lib/api';

const PROVINCES = ['Hà Nội','Hồ Chí Minh','Đà Nẵng','Hải Phòng','Cần Thơ','An Giang','Bà Rịa-Vũng Tàu','Bắc Giang','Bắc Kạn','Bạc Liêu','Bắc Ninh','Bến Tre','Bình Định','Bình Dương','Bình Phước','Bình Thuận','Cà Mau','Cao Bằng','Đắk Lắk','Đắk Nông','Điện Biên','Đồng Nai','Đồng Tháp','Gia Lai','Hà Giang','Hà Nam','Hà Tĩnh','Hải Dương','Hậu Giang','Hòa Bình','Hưng Yên','Khánh Hòa','Kiên Giang','Kon Tum','Lai Châu','Lâm Đồng','Lạng Sơn','Lào Cai','Long An','Nam Định','Nghệ An','Ninh Bình','Ninh Thuận','Phú Thọ','Phú Yên','Quảng Bình','Quảng Nam','Quảng Ngãi','Quảng Ninh','Quảng Trị','Sóc Trăng','Sơn La','Tây Ninh','Thái Bình','Thái Nguyên','Thanh Hóa','Thừa Thiên Huế','Tiền Giang','Trà Vinh','Tuyên Quang','Vĩnh Long','Vĩnh Phúc','Yên Bái'];

const NEEDS = [
  'Du học Nhật Bản',
  'Du học Hàn Quốc',
  'Du học Đài Loan',
  'Du học Đức',
  'Du học Úc',
  'Xuất khẩu lao động Nhật Bản',
  'Xuất khẩu lao động Hàn Quốc',
  'Xuất khẩu lao động Đài Loan',
  'Đào tạo ngoại ngữ',
  'Tư vấn nghề nghiệp'
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', need: '', province: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post('/api/contact', form);
      setResult({ ok: true, msg: res.data.message });
      setForm({ name: '', phone: '', email: '', address: '', need: '', province: '', message: '' });
    } catch (err) {
      setResult({ ok: false, msg: err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            Tư vấn miễn phí
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Đăng ký tư vấn</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Để lại thông tin, tư vấn viên HCIT sẽ liên hệ bạn trong thời gian sớm nhất
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-on-scroll">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                    Điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="0912 345 678"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Địa chỉ</label>
                <input type="text" name="address" value={form.address} onChange={handleChange}
                  placeholder="Số nhà, đường, quận/huyện..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Nhu cầu của bạn</label>
                  <select name="need" value={form.need} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white">
                    <option value="">-- Chọn nhu cầu --</option>
                    {NEEDS.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Tỉnh thành</label>
                  <select name="province" value={form.province} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white">
                    <option value="">-- Chọn tỉnh thành --</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              {result && (
                <div className={`text-sm px-4 py-3 rounded-xl flex items-center gap-2 ${result.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {result.ok
                    ? <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    : <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                  }
                  {result.msg}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    ĐĂNG KÝ NGAY
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Bằng cách gửi thông tin, bạn đồng ý với <a href="#" className="text-orange-500 hover:underline">Chính sách bảo mật</a> của HCIT
              </p>
            </form>
          </div>

          {/* Right side */}
          <div className="animate-on-scroll space-y-6">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                alt="Sinh viên học tập"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-4xl font-black">100%</div>
                <div className="text-lg font-bold text-orange-200">Cam kết tỷ lệ Visa</div>
                <div className="text-sm text-white/70 mt-1">Nhật Bản · Hàn Quốc · Đài Loan</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4">
              <h3 className="font-bold text-gray-800">Liên hệ trực tiếp</h3>
              {[
                { label: 'Hotline', value: '035.9966.168' },
                { label: 'Hotline KR', value: '010-8324-3185' },
                { label: 'Email', value: 'xkldcongthuong@gmail.com' },
                { label: 'VP tư vấn', value: 'Số 27, Luis VIII, KĐT Luis City, Đại Mỗ, Hà Nội' },
                { label: 'Trụ sở', value: 'Số 56 Vũ Trọng Phụng, Thanh Xuân, Hà Nội' }
              ].map(c => (
                <div key={c.label} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{c.label}</div>
                    <div className="text-sm font-semibold text-gray-700">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { label: 'Facebook', color: 'bg-blue-600', icon: 'f' },
                { label: 'Zalo', color: 'bg-blue-500', icon: 'Z' },
                { label: 'YouTube', color: 'bg-red-600', icon: '▶' },
                { label: 'TikTok', color: 'bg-gray-900', icon: '♪' }
              ].map(s => (
                <button key={s.label} className={`${s.color} text-white w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm hover:opacity-80 transition-opacity shadow-md`} aria-label={s.label}>
                  {s.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
