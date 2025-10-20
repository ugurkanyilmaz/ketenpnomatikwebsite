import { motion } from 'framer-motion'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { useSectionImages } from '../../hooks/useSectionImages'
import { useEffect } from 'react'
import { applyPageSEO } from '../../utils/other_seo'

export default function Hiyoki() {
  const { images, hero: hiyokiHero, showcase: hiyokiShowcase } = useSectionImages('hiyoki_section', 'about_hiyoki')
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
          {/* Image on left for larger screens, stacked above on small screens */}
          <div className="order-1 lg:order-none">
            {hiyokiHero?.image_path ? (
              <img src={hiyokiHero.image_path} alt={hiyokiHero.alt_text || 'Hiyoki Ölçüm Çözümleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
            ) : null}
          </div>
          <div className="order-0 lg:order-none">
            <div className="mb-3" style={{ display: 'inline-block', padding: '0.25rem 0.6rem', borderRadius: '9999px', background: 'linear-gradient(90deg,#ff8c42,#f97316)', color: '#fff', fontWeight: 600 }}>Yetkili Distribütör</div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Hiyoki</h1>
            <p className="mt-4 text-gray-300 max-w-3xl">
              Hiyoki, en zorlu endüstriyel ortamlar ve kritik montaj hatları için üstün kaliteli, premium aletler sunar. Ürünlerimiz, üç vardiya süren yoğun çalışma döngülerinde bile tutarlı tork performansı ve benzersiz dayanıklılık sağlamak üzere tasarlanmıştır. Kaliteden ödün vermeyen mühendislikle, üretim sürekliliğinizi ve yatırımınızın uzun ömrünü garanti altına alın.
            </p>
            <div className="mt-6">
              <div className="mt-4 flex gap-3">
                <ScrollToTopLink to="/iletisim" className="btn btn-primary">İletişim</ScrollToTopLink>
                <ScrollToTopLink to="/demo-talebi" className="btn btn-ghost text-white">Demo Talep Et</ScrollToTopLink>
              </div>
            </div>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hiyoki Hakkında</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🎯 Ağır Görevde Üstün Performans</h3>
              <p className="text-gray-700">
                Hiyoki endüstriyel aletler, 7/24 operasyonların gerektirdiği sertliğe ve güvenilirliğe sahiptir. Her bir ürün, minimum duruş süresiyle maksimum verimlilik sunmak üzere, en yüksek standartlarda üretilmiştir. Gerçek premium kaliteyi deneyimleyin; üretiminiz asla aksamasın.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">⚡ Hassasiyet ve Güvenilirlik</h3>
              <p className="text-gray-700">
                Hiyoki ürünleri, yüksek doğruluk ve tekrarlanabilirlik sunar. 
                Kritik işlemlerde güvenilir sonuçlar elde ederek, kalite kontrolünüzü garanti altına alır.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            {/* Sadece showcase varsa göster */}
            {hiyokiShowcase?.image_path ? (
              <img src={hiyokiShowcase.image_path} alt={hiyokiShowcase.alt_text || 'Hiyoki Ölçüm Sistemleri'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
            ) : null}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Kesintisiz Üretim Gücü</h3>
            <p className="mt-3 text-gray-700">
              Hiyoki endüstriyel aletler, 7/24 operasyonların gerektirdiği sertliğe ve güvenilirliğe sahiptir. 
              Birinci sınıf bileşenler sayesinde minimum duruş süresiyle maksimum verimlilik sunar.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Endüstriyel dayanıklılık</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Yüksek Performans</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Uzun cihaz ömrü</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div className="order-1 lg:order-none">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Geniş Uygulama Yelpazesi</h3>
            <p className="mt-3 text-gray-700">
              Hiyoki, en zorlu montaj ve üretim gereksinimlerinize uygun, hem yüksek hızlı tork kontrollü elektrikli sıkıcıları hem de ağır hizmet uygulamaları için sağlam pnömatik (havalı) el aletlerini (darbeli somun sıkma, pnömatik tornavidalar) kapsayan geniş ve premium bir ürün gamı sunar; böylece her alanda üstün mühendislik ve kesintisiz performans garantisi verir.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">25+</div>
                <div className="text-sm text-gray-600">Yıllık Deneyim</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">±0.02%</div>
                <div className="text-sm text-gray-600">Ölçüm Hassasiyeti</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Kesintisiz Çalışma</div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">400+</div>
                <div className="text-sm text-gray-600">Projede Kullanım</div>
              </div>
            </div>
          </div>
          <div>
            {images?.[2]?.image_path ? (
              <img src={images[2].image_path} alt={images[2]?.alt_text || 'Hiyoki Uygulamalar'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
            ) : null}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mt-10">
          <div>
            {/* Sadece images[3] varsa göster (fallback yok) */}
            {images?.[3]?.image_path ? (
              <img src={images[3].image_path} alt={images[3]?.alt_text || 'Hiyoki Teknik Destek'} className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
            ) : null}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Kapsamlı Satış Sonrası Destek</h3>
            <p className="mt-3 text-gray-700">
              Hiyoki ürünleri için teknik destek, eğitim ve kalibrasyon hizmetleri sunuyoruz.
              Doğru kullanım ve düzenli bakım ile cihazlarınızın ömrünü uzatın, ölçüm doğruluğunu koruyun.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Akredite kalibrasyon laboratuvarı</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Teknik eğitim ve danışmanlık</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-gray-700">Hızlı yedek parça temini</span>
              </li>
            </ul>
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
              <h3 className="text-2xl font-extrabold text-gray-900">İhtiyacınıza uygun ölçüm çözümünü birlikte seçelim</h3>
              <p className="mt-2 text-gray-700">Laboratuvar, üretim hattı ve kalibrasyon uygulamalarınız için uzman ekibimizle görüşün.</p>
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