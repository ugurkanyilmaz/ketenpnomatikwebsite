import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { useSectionImages } from '../../hooks/useSectionImages'
import { useEffect } from 'react'
import { applyPageSEO } from '../../utils/other_seo'

export default function Apac() {
  // Use section gallery first (apac_section*), fallback to about_apac
  const { hero: apacHero, showcase: apacShowcase } = useSectionImages('apac_section', 'about_apac')
  useEffect(() => {
    applyPageSEO('about_apac')
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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">APAC - Tayvan</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              1978 yılında Tayvan'da kurulan APAC, pnömatik el aletleri ve endüstriyel güç aletleri konusunda dünya çapında lider bir üreticidir. 
              40 yılı aşkın deneyimi ile otomotiv, elektronik, mobilya ve metal işleme sektörlerinde yüksek kaliteli, dayanıklı ve ergonomik ürünler sunmaktadır.
            </p>
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-2">Ürün Kategorileri:</h3>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-outline text-white border-white/30">Pnömatik Vidalama</span>
                <span className="badge badge-outline text-white border-white/30">Havalı Taşlama</span>
                <span className="badge badge-outline text-white border-white/30">Hava Şarjörleri</span>
                <span className="badge badge-outline text-white border-white/30">Orbital Zımparalar</span>
                <span className="badge badge-outline text-white border-white/30">Havalı Matkap</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="mt-4 flex gap-3">
                <ScrollToTopLink to="/iletisim" className="btn btn-primary">İletişim</ScrollToTopLink>
                <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost text-white">Demo Talep Et</ScrollToTopLink>
              </div>
            </div>
          </div>
          <div>
            <img src={apacHero?.image_path || '/professional_banner.png'} alt={apacHero?.alt_text || 'APAC hero'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">APAC Hakkında</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">📍 Küresel Varlık</h3>
              <p className="text-gray-700">
                APAC ürünleri 80'den fazla ülkede distribütör ağı ile satılmaktadır. ISO 9001 kalite yönetim sistemi 
                sertifikasına sahip olan firma, dünya çapında güvenilir ve kaliteli ürünler sunmaktadır.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🔧 Teknik Mükemmellik</h3>
              <p className="text-gray-700">
                APAC'ın Ar-Ge departmanı sürekli ürün geliştirme ve inovasyon çalışmaları yapmaktadır. 
                Ergonomik tasarım, düşük titreşim, yüksek performans ve uzun ömür markanın temel değerleridir.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <img src={apacShowcase?.image_path || '/keten_banner.jpg'} alt={apacShowcase?.alt_text || 'APAC Pnömatik Aletler'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Endüstriyel Dayanıklılık</h3>
            <p className="mt-3 text-gray-700">
              APAC ürünleri, ağır sanayi koşullarında uzun süreli kullanım için tasarlanmıştır. 
              Yüksek kaliteli malzemeler ve hassas üretim teknikleri ile her ürün maksimum performans sunar.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">7/24 endüstriyel kullanıma uygun</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Düşük bakım maliyeti</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Yüksek verimlilik</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Geniş Ürün Portföyü</h3>
            <p className="mt-3 text-gray-700">
              Vidalama, delme, taşlama, zımparalama ve kesme uygulamaları için kapsamlı çözümler. 
              Her sektörün ihtiyacına özel tasarlanmış 500'den fazla model ile yanınızdayız.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Farklı Model</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">80+</div>
                <div className="text-sm text-gray-600">Ülkede Satış</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">40+</div>
                <div className="text-sm text-gray-600">Yıllık Tecrübe</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">ISO 9001</div>
                <div className="text-sm text-gray-600">Sertifikalı</div>
              </div>
            </div>
          </div>
          <div>
            <img src={apacShowcase?.image_path || '/endus.jpg'} alt={apacShowcase?.alt_text || 'APAC Endüstriyel Uygulamalar'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
              <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost">Demo Talep Et</ScrollToTopLink>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
