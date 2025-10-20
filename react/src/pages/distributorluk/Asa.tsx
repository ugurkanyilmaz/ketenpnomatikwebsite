import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { useSectionImages } from '../../hooks/useSectionImages'
import { useEffect } from 'react'
import { applyPageSEO } from '../../utils/other_seo'

export default function Asa() {
  const { images, hero: brandHero, showcase: brandShowcase } = useSectionImages('asa_section', 'about_asa')
  useEffect(() => {
    applyPageSEO('about_asa')
  }, [])
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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">ASA</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              ASA, endüstriyel prosesler ve montaj çözümleri için güvenilir ekipmanlar sunar. 
              Ergonomi ve süreklilik odaklı tasarımları ile üretim hatlarında maksimum verimlilik sağlar.
              Otomotiv, elektronik ve genel endüstride tercih edilen premium çözümler sunar.
            </p>
            <div className="mt-6">
              <div className="mt-4 flex gap-3">
                <ScrollToTopLink to="/iletisim" className="btn btn-primary">İletişim</ScrollToTopLink>
                <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost text-white">Demo Talep Et</ScrollToTopLink>
              </div>
            </div>
          </div>
          <div>
            {brandHero?.image_path ? (
              <img src={brandHero.image_path} alt={brandHero.alt_text || 'ASA Ürünleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
            ) : null}
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
        <div className="prose max-w-none mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">ASA Hakkında</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🏭 Endüstriyel Uzmanlık</h3>
              <p className="text-gray-700">
                ASA çözümleri, otomasyon ve montaj hatlarında güvenilir, verimli ve kullanıcı dostu uygulamalar sağlar.
                Yılların deneyimi ile geliştirilmiş sistemler, üretim süreçlerinizi optimize eder.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">👷 Ergonomi Önceliği</h3>
              <p className="text-gray-700">
                Operatör sağlığı ve konforu ön planda tutularak tasarlanan ASA ürünleri, 
                iş güvenliğini artırırken üretkenliği maksimize eder. Ergonomik çözümlerle yorgunluğu azaltır.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            {/* Sadece showcase varsa göster */}
            {brandShowcase?.image_path ? (
              <img src={brandShowcase.image_path} alt={brandShowcase.alt_text || 'ASA Çözümleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
            ) : null}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Güvenilir Performans</h3>
            <p className="mt-3 text-gray-700">
              ASA ekipmanları, kesintisiz üretim için tasarlanmıştır. 
              Uzun ömürlü bileşenler ve kolay bakım ile operasyonel maliyetleri düşürür.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Ergonomik ve güvenli kullanım</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Uzun ömürlü bileşenler</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Endüstriyel entegrasyon kolaylığı</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Kapsamlı Çözümler</h3>
            <p className="mt-3 text-gray-700">
              Montaj hatları, otomasyon ve bakım süreçleri için ideal ekipmanlar.
              Her sektörün özel ihtiyaçlarına yönelik özelleştirilmiş sistemler sunuyoruz.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">%99.8</div>
                <div className="text-sm text-gray-600">Çalışma Süresi</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">-40%</div>
                <div className="text-sm text-gray-600">Bakım Maliyeti</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Kesintisiz Üretim</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">+30%</div>
                <div className="text-sm text-gray-600">Verimlilik Artışı</div>
              </div>
            </div>
          </div>
          <div>
            {images?.[2]?.image_path ? (
              <img src={images[2].image_path} alt={images[2]?.alt_text || 'ASA Uygulamalar'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
            ) : null}
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
              <p className="mt-2 text-gray-700">Ürün seçimi, entegrasyon ve devreye alma için uzman ekibimizle iletişime geçin.</p>
            </div>
            <div className="flex gap-3 lg:justify-end">
              <ScrollToTopLink to="/iletisim" className="btn btn-primary">İletişim</ScrollToTopLink>
              <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost">Demo Talep Et</ScrollToTopLink>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}