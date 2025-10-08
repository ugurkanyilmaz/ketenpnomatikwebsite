import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'

export default function Kolver() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Kolver - İtalya</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              1989 yılında İtalya'da kurulan Kolver, elektrikli tork kontrol sistemleri ve montaj aletleri konusunda dünya lideridir. 
              30 yılı aşkın deneyimi ile otomotiv, havacılık, elektronik ve beyaz eşya sektörlerinde hassas montaj çözümleri sunmaktadır. 
              Industry 4.0 uyumlu sistemleri ile üretim kalitesini ve izlenebilirliği maksimize eder.
            </p>
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-2">Ürün Kategorileri:</h3>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-outline text-white border-white/30">Elektrikli Torque Vidalama</span>
                <span className="badge badge-outline text-white border-white/30">Tork Kontrol Ünitesi</span>
                <span className="badge badge-outline text-white border-white/30">Otomasyon Sistemleri</span>
                <span className="badge badge-outline text-white border-white/30">MES Entegrasyonu</span>
                <span className="badge badge-outline text-white border-white/30">Hata Önleme (Poka-Yoke)</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ScrollToTopLink to="/iletisim" className="btn btn-primary">Teklif Al</ScrollToTopLink>
              <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost text-white">Demo Talebi</ScrollToTopLink>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-300">
              {[
                { k: '±%1', v: 'Tork Doğruluğu' },
                { k: '24/7', v: 'Stabil Çalışma' },
                { k: 'MES', v: 'Entegrasyon' },
                { k: 'ECO', v: 'Enerji Verimi' },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-slate-700/70 bg-slate-900/40 p-4 text-center">
                  <div className="text-lg font-bold text-white">{s.k}</div>
                  <div className="text-xs text-gray-300">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src="/professional_banner.png" alt="Kolver tork çözümleri" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
        </div>
      </motion.section>

      {/* Kolver Hakkında */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="prose max-w-none mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Kolver Hakkında</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🏭 İtalyan Mühendislik Mükemmelliği</h3>
              <p className="text-gray-700">
                Kolver, İtalya'nın Lombardia bölgesinde üretim yapan, küresel çapta tanınan bir tork kontrol sistemleri üreticisidir. 
                Ürünleri BMW, Bosch, Siemens, Airbus gibi dünya devlerinin üretim hatlarında kullanılmaktadır.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🎯 Sıfır Hata Felsefesi</h3>
              <p className="text-gray-700">
                Kolver sistemleri, montaj hatlarında "sıfır hata" hedefine ulaşmak için geliştirilmiştir. 
                Poka-Yoke (hata önleme) sistemleri, her vidalama işlemini kayıt altına alır ve hatalı montajı önler.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Neden Kolver?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: '±%1 Tork Hassasiyeti',
              desc: 'Sertifikalı tork kontrolü ile hatalı sıkma risklerini minimize eder. Her işlem kayıt altında.',
            },
            {
              title: 'Industry 4.0 Uyumlu',
              desc: 'MES, ERP ve SCADA sistemlerine kolayca entegre edilir. Gerçek zamanlı veri toplama ve raporlama.',
            },
            {
              title: 'Uçtan Uca Destek',
              desc: 'Kurulum, eğitim, yedek parça ve yetkili servis ile tam destek. Türkiye\'de yerel teknik ekip.',
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-base-300 bg-base-100 p-6"
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="text-lg font-bold text-gray-900">{f.title}</div>
                  <p className="text-gray-700 mt-1">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Çözüm vitrinleri */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <img src="/keten_banner.jpg" alt="Kolver Ergonomik Tasarım" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Ergonomi ve Verimlilik</h3>
            <p className="mt-3 text-gray-700">
              Kolver vidalama aletleri, operatör konforu için özel olarak tasarlanmıştır. Düşük ağırlık, dengeli yapı ve 
              anti-vibrasyon teknolojisi ile uzun çalışma saatlerinde bile yorgunluk minimize edilir.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Hafif ve dengeli gövde tasarımı</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Anti-vibrasyon sistemi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Esnek askı sistemleri</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Uygulama Alanları</h3>
            <p className="mt-3 text-gray-700">
              Otomotiv yan sanayi, beyaz eşya, elektronik montaj, havacılık ve savunma sanayinde kritik montaj işlemleri için 
              ideal çözümler. Her sektörün özel gereksinimlerine uygun konfigürasyonlar.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">25+</div>
                <div className="text-sm text-gray-600">Yıllık Tecrübe</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-sm text-gray-600">Ülkede Kullanım</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">ISO</div>
                <div className="text-sm text-gray-600">9001 Sertifikalı</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Teknik Destek</div>
              </div>
            </div>
          </div>
          <div>
            <img src="/endus.jpg" alt="Kolver Endüstriyel Uygulamalar" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 py-10 rounded-2xl">
          <div className="grid lg:grid-cols-3 gap-6 items-center rounded-2xl border border-base-300 bg-base-100 p-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-extrabold text-gray-900">Uygulamanıza özel teklif hazırlayalım</h3>
              <p className="mt-2 text-gray-700">Ürün/seri seçimi, proses kurulumu ve entegrasyon için uzman ekibimizle iletişime geçin.</p>
            </div>
            <div className="flex gap-3 lg:justify-end">
              <ScrollToTopLink to="/iletisim" className="btn btn-primary">İletişim</ScrollToTopLink>
              <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost">Demo Talebi</ScrollToTopLink>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
