import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { useSectionImages } from '../../hooks/useSectionImages'
import { useEffect } from 'react'
import { applyPageSEO } from '../../utils/other_seo'

export default function Hawanox() {
  const { images, hero: brandHero, showcase: brandShowcase } = useSectionImages('hawanox_section', 'about_hawanox')
  useEffect(() => {
    applyPageSEO('about_hawanox')
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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Hawanox</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              Hawanox, endüstriyel uygulamalar için güvenilir pnömatik ve elektrikli ekipman çözümleri sunar.
              Ürün gamı üretim hatlarında yüksek verim ve dayanıklılık sağlar.
              Otomotiv yan sanayi, elektronik montaj ve genel endüstride tercih edilen kaliteli çözümler.
            </p>
            <div className="mt-6">
              <div className="mt-4 flex gap-3">
                <ScrollToTopLink to="/iletisim" className="btn btn-primary">İletişim</ScrollToTopLink>
                <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost text-white">Demo Talep Et</ScrollToTopLink>
              </div>
            </div>
          </div>
          <div>
            <img src={brandHero?.image_path || '/keten_banner.jpg'} alt={brandHero?.alt_text || 'Hawanox Ürünleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hawanox Hakkında</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">💪 Endüstriyel Dayanıklılık</h3>
              <p className="text-gray-700">
                Hawanox ürünleri, otomotiv, elektronik ve genel endüstride üretim kalitesini artıran çözümler sunar.
                Ağır sanayi koşullarında yıllarca kesintisiz çalışmak üzere tasarlanmıştır.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🔧 Geniş Ekosistem</h3>
              <p className="text-gray-700">
                Zengin aksesuar ve yedek parça desteği ile uzun ömürlü kullanım garantisi.
                Her türlü endüstriyel uygulama için uygun çözümler ve hızlı servis imkanı.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <img src={(images[1]?.image_path) || brandShowcase?.image_path || '/professional_banner.png'} alt={brandShowcase?.alt_text || 'Hawanox Çözümleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Yüksek Performans</h3>
            <p className="mt-3 text-gray-700">
              Hawanox ekipmanları, maksimum verimlilik için optimize edilmiştir.
              Düşük enerji tüketimi, yüksek güç ve uzun ömür bir arada sunulur.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Dayanıklı endüstriyel tasarım</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Yüksek verim, düşük bakım</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Geniş aksesuar ve yedek parça ekosistemi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Her Sektöre Uygun</h3>
            <p className="mt-3 text-gray-700">
              Otomotiv yan sanayi, elektronik montaj ve genel endüstride güvenilir çözümler.
              Esnek konfigürasyon seçenekleri ile her uygulamaya özel sistemler.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">10 Yıl+</div>
                <div className="text-sm text-gray-600">Ürün Ömrü</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">-50%</div>
                <div className="text-sm text-gray-600">Bakım Süresi</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">+35%</div>
                <div className="text-sm text-gray-600">Verimlilik</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Ürün Çeşidi</div>
              </div>
            </div>
          </div>
          <div>
            <img src={(images[2]?.image_path) || '/endus.jpg'} alt="Hawanox Uygulamalar" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
              <h3 className="text-2xl font-extrabold text-gray-900">Güvenilir ekipmanlar için doğru adres</h3>
              <p className="mt-2 text-gray-700">Ürün seçimi, uygulama analizi ve teknik destek için uzman ekibimizle iletişime geçin.</p>
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