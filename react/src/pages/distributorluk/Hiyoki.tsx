import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'

export default function Hiyoki() {
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
            <div className="badge badge-secondary mb-3">Yetkili Distribütör</div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Hiyoki Ölçüm ve Test Çözümleri</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">Üretim ve Ar-Ge süreçleri için güvenilir, hassas ve tekrarlanabilir ölçüm.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ScrollToTopLink to="/iletisim" className="btn btn-primary">Teklif Al</ScrollToTopLink>
              <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost text-white">Demo Talebi</ScrollToTopLink>
            </div>
          </div>
          <div>
            <img src="/endus.jpg" alt="Hiyoki ölçüm çözümleri" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
        </div>
      </motion.section>

      {/* İçerik */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <img src="/professional_banner.png" alt="Hiyoki uygulama" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Uygulama Danışmanlığı</h3>
            <p className="mt-3 text-gray-700">Test yöntemleri, cihaz seçimi ve entegrasyonlarda yol haritası sunuyoruz.</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Devreye Alma ve Eğitim</h3>
            <p className="mt-3 text-gray-700">Saha kurulumları ve eğitimlerle doğru kullanım ve sürdürülebilir kalite sağlayın.</p>
          </div>
          <div>
            <img src="/keten_banner.jpg" alt="Hiyoki eğitim ve destek" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
              <h3 className="text-2xl font-extrabold text-gray-900">İhtiyacınıza uygun çözümü birlikte seçelim</h3>
              <p className="mt-2 text-gray-700">Laboratuvar, üretim ve kalibrasyon uygulamalarınız için bize yazın.</p>
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
