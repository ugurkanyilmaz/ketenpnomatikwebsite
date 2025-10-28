import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { useSectionImages } from '../../hooks/useSectionImages'
import { useEffect } from 'react'
import { useScrollTopOnMount } from '../../hooks/useScrollTopOnMount'
import { applyPageSEO } from '../../utils/other_seo'

export default function DeltaRegis() {
  const { images, hero: brandHero, showcase: brandShowcase } = useSectionImages('delta_regis_section', 'about_delta_regis')
  useScrollTopOnMount()
  useEffect(() => {
    applyPageSEO('about_deltaregis')
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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Delta Regis(ABD)</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              Delta Regis Tools Inc., kökleri ve merkezi Amerika Birleşik Devletleri'nde (ABD) bulunan, tork kontrol sistemleri alanında global çapta tanınan bir Amerikan üreticisidir. Florida, Fort Pierce'taki ana merkezinde tasarlanan ve geliştirilen her bir Delta Regis ürünü, Amerikan mühendisliğinin getirdiği kalite, dayanıklılık ve yenilikçilik standartlarını taşır.
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
              <img src={brandHero.image_path} alt={brandHero.alt_text || 'Delta Regis Ürünleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Delta Regis Hakkında</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🎯 Hassasiyet ve Doğruluk</h3>
              <p className="text-gray-700">
                Delta Regis, elektronik montaj hatları için tork kontrollü vidalama çözümleri sunar.
                ±%1 hassasiyetinde tork kontrolü ile kusursuz montaj kalitesi garantiler.
                Her işlem tam kaydedilir ve raporlanabilir.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">📊 Dijital Dönüşüm</h3>
              <p className="text-gray-700">
                Endüstri 4.0 uyumlu sistemler, üretim verilerinizi gerçek zamanlı takip eder.
                MES/ERP entegrasyonu ile tam izlenebilirlik sağlar. Kalite kontrol ve raporlama otomasyonu sunar.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            {/* Sadece showcase varsa göster */}
            {brandShowcase?.image_path ? (
              <img src={brandShowcase.image_path} alt={brandShowcase.alt_text || 'Delta Regis Çözümleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
            ) : null}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">İleri Teknoloji</h3>
            <p className="mt-3 text-gray-700">
              Delta Regis sistemleri, elektronik ve beyaz eşya montajında yeni standartlar belirler.
              Mikro işlemcili kontrol sistemleri ile her operasyon kusursuz gerçekleşir.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Hassas tork kontrolü (±%1)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">İzlenebilirlik ve veri kaydı</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Endüstri 4.0 entegrasyonu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Uygulama Alanları</h3>
            <p className="mt-3 text-gray-700">
              Elektronik montaj, beyaz eşya ve otomotiv elektroniklerinde hassas vidalama.
              Kritik uygulamalarda %100 kalite güvencesi sağlar.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">±%1</div>
                <div className="text-sm text-gray-600">Tork Doğruluğu</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600">İşlem Kaydı</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">Real-time</div>
                <div className="text-sm text-gray-600">Veri İzleme</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">Smart</div>
                <div className="text-sm text-gray-600">Üretim Yönetimi</div>
              </div>
            </div>
          </div>
          <div>
            {images?.[2]?.image_path ? (
              <img src={images[2].image_path} alt={images[2]?.alt_text || 'Delta Regis Uygulamalar'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
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
              <h3 className="text-2xl font-extrabold text-gray-900">Hassas montaj çözümleri için bizi arayın</h3>
              <p className="mt-2 text-gray-700">Tork kontrolü, izlenebilirlik ve entegrasyon için uzman ekibimizle iletişime geçin.</p>
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