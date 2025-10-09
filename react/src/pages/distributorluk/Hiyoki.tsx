import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { useSectionImages } from '../../hooks/useSectionImages'
import { useEffect } from 'react'
import { applyPageSEO } from '../../utils/other_seo'

export default function Hiyoki() {
  const { hero: hiyokiHero, showcase: hiyokiShowcase } = useSectionImages('hiyoki_section', 'about_hiyoki')
  useEffect(() => {
    applyPageSEO('about_hiyoki')
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
            <div className="badge badge-secondary mb-3">Yetkili Distribütör</div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Hiyoki Ölçüm Cihazları</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              Hiyoki, elektrikli ölçüm cihazları ve test ekipmanlarında güvenilir çözümler sunar. 
              Elektronik, otomotiv ve endüstriyel sektörlerde hassas ölçüm ihtiyaçları için geniş ürün yelpazesi bulundurur.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ScrollToTopLink to="/iletisim" className="btn btn-primary">Teklif Al</ScrollToTopLink>
              <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost text-white">Demo Talebi</ScrollToTopLink>
            </div>
          </div>
          <div>
            <img src={hiyokiHero?.image_path || '/endus.jpg'} alt={hiyokiHero?.alt_text || 'Hiyoki ölçüm çözümleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Güvenilir Ölçüm Çözümleri</h2>
        <p className="text-gray-700 mb-8 max-w-4xl">
          Hiyoki ölçüm cihazları, hassas test ve analiz gerektiren uygulamalar için profesyonel çözümler sunar. 
          Multimetreler, osiloskoplar, güç analizörleri ve LCR metreler ile kalite kontrol süreçlerinizi destekler.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
          <div>
            <img src={hiyokiShowcase?.image_path || '/professional_banner.png'} alt={hiyokiShowcase?.alt_text || 'Hiyoki Ölçüm Sistemleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Geniş Ürün Yelpazesi</h3>
            <p className="mt-3 text-gray-700">
              Elektronik devre testinden endüstriyel güç ölçümlerine kadar farklı ihtiyaçlar için uygun modeller. 
              Laboratuvar, üretim hattı ve saha uygulamaları için dayanıklı ve hassas cihazlar.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Satış Sonrası Destek</h3>
            <p className="mt-3 text-gray-700">
              Hiyoki ürünleri için teknik destek, eğitim ve kalibrasyon hizmetleri sunuyoruz. 
              Doğru kullanım ve düzenli bakım ile cihazlarınızın ömrünü uzatın.
            </p>
          </div>
          <div>
            <img src={hiyokiShowcase?.image_path || '/keten_banner.jpg'} alt={hiyokiShowcase?.alt_text || 'Hiyoki Teknik Destek'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
