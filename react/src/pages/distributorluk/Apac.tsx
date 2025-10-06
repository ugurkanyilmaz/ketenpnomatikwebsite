import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'

export default function Apac() {
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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">APAC Endüstriyel Çözümler</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              Geniş ürün gamı, rekabetçi teslim ve güvenilir servis ile uygulamanıza uygun, sürdürülebilir çözümler.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ScrollToTopLink to="/iletisim" className="btn btn-primary">Teklif Al</ScrollToTopLink>
              <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost text-white">Demo Talebi</ScrollToTopLink>
            </div>
          </div>
          <div>
            <img src="/keten_banner.jpg" alt="APAC ürün gamı" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
            <img src="/professional_banner.png" alt="APAC hızlı tedarik" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Hızlı ve Şeffaf Tedarik</h3>
            <p className="mt-3 text-gray-700">Yetkili stoklar ve net teslim süreleri ile operasyonlarınız kesintisiz sürsün.</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Geniş Ürün Yelpazesi</h3>
            <p className="mt-3 text-gray-700">Birçok uygulama için doğru alternatifi birlikte belirleyelim; kurulum ve eğitim desteği ile tamamlayalım.</p>
          </div>
          <div>
            <img src="/endus.jpg" alt="APAC saha desteği" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
              <h3 className="text-2xl font-extrabold text-gray-900">Sorununuzu paylaşın, çözüm önerelim</h3>
              <p className="mt-2 text-gray-700">Uygulama analizi, ürün seçimi ve devreye alma için iletişime geçin.</p>
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
