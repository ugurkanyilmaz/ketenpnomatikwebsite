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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Kolver Elektrikli Tork Çözümleri</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              Montaj hatlarında yüksek hassasiyet, tekrar edilebilirlik ve tam izlenebilirlik için tasarlandı. ERP/MES entegrasyonlarına uygun,
              proses güvenliği sağlayan ileri seviye tork kontrol sistemleri.
            </p>
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

      {/* Öne çıkan özellikler */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Neden Kolver?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Hassas Tork Kontrolü',
              desc: 'Hatalı sıkma risklerini azaltan, izlenebilir ve raporlanabilir proses kontrolü.',
            },
            {
              title: 'Ergonomik ve Hızlı',
              desc: 'Operatör konforu ve çevrim süresi hedefleri için optimize edilmiş tasarım.',
            },
            {
              title: 'Uçtan Uca Destek',
              desc: 'Kurulum, eğitim, yedek parça ve yetkili servis ile tam destek.',
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
            <img src="/keten_banner.jpg" alt="Kolver ergonomi" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Ergonomi ve Verimlilik</h3>
            <p className="mt-3 text-gray-700">
              Uzun vardiyalarda dahi operatör yorgunluğunu azaltır, hat içi akışı hızlandırır. Uygulamanıza özel aparat ve askı sistemleri ile
              esnek çözümler sunarız.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Kurulum, Eğitim ve Destek</h3>
            <p className="mt-3 text-gray-700">
              Saha devreye alma, operatör eğitimleri ve hızlı yedek parça temini ile kullanım süresini maksimize ederiz. Garanti kapsamında yetkili
              servis desteği sunuyoruz.
            </p>
          </div>
          <div>
            <img src="/endus.jpg" alt="Kolver satış sonrası destek" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
