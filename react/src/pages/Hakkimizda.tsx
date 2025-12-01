import { Outlet, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import useShouldAnimate from '../hooks/useShouldAnimate'
import { useSiteImage } from '../hooks/useSiteImages'
import { applyPageSEO } from '../utils/other_seo'

export default function Hakkimizda() {
  const location = useLocation()
  const path = location.pathname.replace(/\/+$/g, '')
  const isIndex = path === '/hakkimizda'
  useEffect(() => {
    // Apply the generic 'about' SEO only when we're on the main /hakkimizda page.
    // This prevents the parent from overwriting child (e.g. /hakkimizda/apac) SEO when
    // a child route is mounted directly via a deep link.
    if (isIndex) applyPageSEO('about')
  }, [isIndex])
  const shouldAnimate = useShouldAnimate()
  
  // Admin panelinden yönetilebilir görseller
  const { image: aboutHeroImg } = useSiteImage('about_hero')
  const { image: distHeroImg } = useSiteImage('about_distributorluk_hero')
  
  // Galeri görselleri - Admin panelinden yönetilebilir
  // Sol dikey görseller
  const { image: galleryVerticalLeft1 } = useSiteImage('about_gallery_vertical_left_1')
  const { image: galleryVerticalLeft2 } = useSiteImage('about_gallery_vertical_left_2')
  const { image: galleryVerticalLeft3 } = useSiteImage('about_gallery_vertical_left_3')
  // Sağ dikey görseller
  const { image: galleryVerticalRight1 } = useSiteImage('about_gallery_vertical_right_1')
  const { image: galleryVerticalRight2 } = useSiteImage('about_gallery_vertical_right_2')
  const { image: galleryVerticalRight3 } = useSiteImage('about_gallery_vertical_right_3')
  // Yatay görseller
  const { image: galleryHorizontal1 } = useSiteImage('about_gallery_horizontal_1')
  const { image: galleryHorizontal2 } = useSiteImage('about_gallery_horizontal_2')
  const { image: galleryHorizontal3 } = useSiteImage('about_gallery_horizontal_3')
  
  // Otomatik değişen galeri için state
  const [currentVerticalLeft, setCurrentVerticalLeft] = useState(0)
  const [currentVerticalRight, setCurrentVerticalRight] = useState(0)
  const [currentHorizontal, setCurrentHorizontal] = useState(0)
  
  const verticalLeftImages = [galleryVerticalLeft1, galleryVerticalLeft2, galleryVerticalLeft3].filter(img => img?.image_path)
  const verticalRightImages = [galleryVerticalRight1, galleryVerticalRight2, galleryVerticalRight3].filter(img => img?.image_path)
  const horizontalImages = [galleryHorizontal1, galleryHorizontal2, galleryHorizontal3].filter(img => img?.image_path)
  
  // Otomatik değişim efekti
  useEffect(() => {
    if (!isIndex) return
    
    const verticalInterval = setInterval(() => {
      setCurrentVerticalLeft(prev => (prev + 1) % Math.max(verticalLeftImages.length, 1))
    }, 4000)
    
    const verticalRightInterval = setInterval(() => {
      setCurrentVerticalRight(prev => (prev + 1) % Math.max(verticalRightImages.length, 1))
    }, 4500)
    
    const horizontalInterval = setInterval(() => {
      setCurrentHorizontal(prev => (prev + 1) % Math.max(horizontalImages.length, 1))
    }, 5000)
    
    return () => {
      clearInterval(verticalInterval)
      clearInterval(verticalRightInterval)
      clearInterval(horizontalInterval)
    }
  }, [isIndex, verticalLeftImages.length, verticalRightImages.length, horizontalImages.length])
  // (previously loaded Hiyoki images here; now handled in distributorluk Index)
  // Use useSectionImages to fetch brand-specific hero/showcase images when available
  // Order intentionally set so banner buttons prioritize our top partners
  const brandsStatic = [
    { id: "apac", name: "APAC", img: "/apac.jpg", desc: "APAC hakkında açıklama buraya gelecek." },
    { id: "hiyoki", name: "Hiyoki", img: "/hiyoki.jpg", desc: "Hiyoki hakkında açıklama buraya gelecek." },
    { id: "hawanox", name: "Hawanox", img: "/hawanox.jpg", desc: "Hawanox hakkında açıklama." },
    { id: "kolver", name: "Kolver", img: "/kolver.jpg", desc: "Kolver hakkında açıklama buraya gelecek." },
    { id: "asa", name: "ASA", img: "/asa.jpg", desc: "ASA hakkında açıklama." },
    { id: "delta-regis", name: "Delta Regis", img: "/delta_regis.jpg", desc: "Delta Regis hakkında açıklama." },
  ]

  // We intentionally do not show thumbnails in the buttons. Keep hooks removed to avoid
  // unused-variable warnings. If you later want thumbnails, re-enable useSectionImages
  // calls above and use `brandHeroMap` when rendering the buttons.

  return (
    <div className="bg-base-100">
      {/* Keten Pnömatik Hakkında - Hero Section */}
      {isIndex && (
        <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-base-200 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            {aboutHeroImg?.image_path && (
              <img
                src={aboutHeroImg.image_path}
                alt={aboutHeroImg.alt_text || 'Keten Pnömatik'}
                className="w-full h-full object-cover"
                loading="eager"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/30" />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-6">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span className="text-sm font-semibold text-primary">28+ Yıllık Tecrübe</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                  Keten <span className="text-[#f97316]">Pnömatik</span>
                </h1>

                <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed drop-shadow-md font-medium">
                  Endüstriyel montaj, ölçüm ve pnömatik sistemlerde uçtan uca çözümler sunuyoruz
                </p>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 mb-8">
                  <p className="text-lg text-white leading-relaxed mb-6">
                    Yetkili distribütörlüğünü yaptığımız markalarla; ürün seçimi, projelendirme, kurulum, eğitim ve satış sonrası destek süreçlerinin tamamında yanınızdayız.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-white">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg">Uzman ekip ile keşif, projelendirme ve devreye alma</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg">Stoktan hızlı tedarik ve rekabetçi teslim süreleri</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg">Eğitim, bakım ve satış sonrası teknik destek</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/iletisim" className="btn btn-primary btn-lg gap-2 shadow-2xl hover:shadow-primary/50 transition-shadow">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Bize Ulaşın
                  </Link>
                  <Link to="/demo-talebi" className="btn btn-lg gap-2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Demo Talebi
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative gradient removed to avoid white overlay on hero */}
        </section>
      )}

      {/* Misyon & Vizyon - Gri Arkaplan */}
      {isIndex && (
        <div className="bg-gray-100 py-16">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="max-w-7xl mx-auto px-4"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">Misyon & Vizyon</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="badge badge-primary mb-4 text-base">Misyon</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Güvenilir ve Uçtan Uca Çözüm</h3>
                <p className="text-gray-700 leading-relaxed">
                  Müşterilerimizin verimliliğini artıran, üretim kalitesini yükselten ve bakım maliyetlerini azaltan çözümler sunmak.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="badge badge-secondary mb-4 text-base">Vizyon</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Sürdürülebilir Teknoloji Ortağı</h3>
                <p className="text-gray-700 leading-relaxed">
                  Endüstride güvenilirlik, hız ve teknik uzmanlık denilince akla gelen ilk çözüm ortağı olmak.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      )}

      {/* Tecrübemiz - Beyaz Arkaplan */}
      {isIndex && (
        <div className="bg-white py-16">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-7xl mx-auto px-4"
          >
            <h3 className="text-3xl font-extrabold text-gray-900 mb-8">Tecrübemiz</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
                <div className="text-3xl font-extrabold text-gray-900">28+</div>
                <div className="text-sm text-gray-600">Yıl Tecrübe</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
                <div className="text-3xl font-extrabold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Proje</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
                <div className="text-3xl font-extrabold text-gray-900">5000+</div>
                <div className="text-sm text-gray-600">Müşteri</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
                <div className="text-3xl font-extrabold text-gray-900">10000+</div>
                <div className="text-sm text-gray-600">Stok Ürün</div>
              </div>
            </div>
          </motion.section>
        </div>
      )}

      {/* Değerlerimiz - Gri Arkaplan */}
      {isIndex && (
        <div className="bg-gray-100 py-16">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="max-w-7xl mx-auto px-4"
          >
            <h3 className="text-3xl font-extrabold text-gray-900 mb-8">Değerlerimiz</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {([
                { title: 'Güven', desc: 'Söz verdiğimiz gibi teslim ederiz.' },
                { title: 'Hız', desc: 'Stoktan hızlı tedarik ve servis.' },
                { title: 'Uzmanlık', desc: 'Eğitimli ve sertifikalı ekip.' },
                { title: 'Destek', desc: 'Devreye alma ve sonrası teknik destek.' },
              ]).map((v, i) => {
                const styles = [
                  'bg-blue-50 border-blue-100',
                  'bg-amber-50 border-amber-100',
                  'bg-emerald-50 border-emerald-100',
                  'bg-indigo-50 border-indigo-100',
                ]
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                    className={`rounded-2xl border p-6 ${styles[i]} shadow-sm`}
                  >
                    <div className="text-xl font-bold mb-2 text-gray-900">{v.title}</div>
                    <p className="text-sm leading-relaxed text-gray-700">{v.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>
        </div>
      )}

      {/* Galeri - Beyaz Arkaplan */}
      {isIndex && (
        <div className="bg-white py-16">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4"
          >
            <h3 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">İş Yerimizden Görüntüler</h3>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Modern tesisimiz ve profesyonel ekibimizle kaliteli hizmet sunuyoruz
            </p>
            
            {/* Üst Satır - Sol Dikey, Orta Yazı, Sağ Dikey */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Sol Dikey Görsel */}
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <AnimatePresence mode="wait">
                  {verticalLeftImages.length > 0 && verticalLeftImages[currentVerticalLeft] && (
                    <motion.img
                      key={`vertical-left-${currentVerticalLeft}`}
                      src={verticalLeftImages[currentVerticalLeft].image_path}
                      alt={verticalLeftImages[currentVerticalLeft].alt_text || 'Galeri Görseli'}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7 }}
                    />
                  )}
                </AnimatePresence>
                {verticalLeftImages.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">Sol Dikey Görsel</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Orta Yazı Alanı */}
              <div className="flex flex-col justify-center px-4 md:px-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold">İş Ortaklarımız</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Modern Altyapı, Güvenilir Hizmet
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Son teknoloji ekipmanlarımız ve geniş stok alanımız ile müşterilerimize kesintisiz hizmet sunuyoruz.
                  </p>
                </motion.div>
              </div>

              {/* Sağ Dikey Görsel */}
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <AnimatePresence mode="wait">
                  {verticalRightImages.length > 0 && verticalRightImages[currentVerticalRight] && (
                    <motion.img
                      key={`vertical-right-${currentVerticalRight}`}
                      src={verticalRightImages[currentVerticalRight].image_path}
                      alt={verticalRightImages[currentVerticalRight].alt_text || 'Galeri Görseli'}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7 }}
                    />
                  )}
                </AnimatePresence>
                {verticalRightImages.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">Sağ Dikey Görsel</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Alt Satır - Yatay Görsel */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100 mt-4">
              <AnimatePresence mode="wait">
                {horizontalImages.length > 0 && horizontalImages[currentHorizontal] && (
                  <motion.img
                    key={`horizontal-${currentHorizontal}`}
                    src={horizontalImages[currentHorizontal].image_path}
                    alt={horizontalImages[currentHorizontal].alt_text || 'Galeri Görseli'}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </AnimatePresence>
              {horizontalImages.length === 0 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-20 h-20 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Yatay Görsel</p>
                  </div>
                </div>
              )}
              
              {/* Görsel Üzerinde Bilgi Badge */}
              {horizontalImages.length > 0 && (
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-lg">
                  {currentHorizontal + 1} / {horizontalImages.length}
                </div>
              )}
            </div>
          </motion.section>
        </div>
      )}

      {/* İletişim CTA - Modern Tasarım */}
      {isIndex && (
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="max-w-7xl mx-auto px-4"
          >
            <div className="relative rounded-3xl bg-white p-10 md:p-16 shadow-2xl border border-gray-100">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl -z-10" />
              
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-sm font-semibold">Ücretsiz Danışmanlık</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                    Projenizi birlikte 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> şekillendirelim</span>
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Uygulamanıza uygun ürün seçimi, projelendirme ve devreye alma için uzman ekibimizle görüşün. Size özel çözümler sunalım.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link to="/iletisim" className="btn btn-primary btn-lg gap-2 shadow-xl hover:shadow-2xl transition-shadow">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      İletişime Geç
                    </Link>
                    <Link to="/demo-talebi" className="btn btn-outline btn-lg gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Demo Talep Et
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                    <div className="text-4xl font-black text-blue-600 mb-2">28+</div>
                    <div className="text-sm font-semibold text-blue-900">Yıl Tecrübe</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
                    <div className="text-4xl font-black text-amber-600 mb-2">6</div>
                    <div className="text-sm font-semibold text-amber-900">Yetkili Marka</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
                    <div className="text-4xl font-black text-emerald-600 mb-2">24/7</div>
                    <div className="text-sm font-semibold text-emerald-900">Teknik Destek</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                    <div className="text-4xl font-black text-purple-600 mb-2">10K+</div>
                    <div className="text-sm font-semibold text-purple-900">Stok Ürün</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      )}

      {/* Distribütörlük Hero - Modern split design */}
      {isIndex && (
  <section className="relative w-full min-h-[300px] md:min-h-[500px] lg:min-h-[600px] bg-base-200 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {distHeroImg?.image_path && (
            <img
              src={distHeroImg.image_path}
              alt={distHeroImg.alt_text || 'Distribütörlük'}
              className="w-full h-full object-cover"
              loading="eager"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40" />
        </div>

        {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* prepare inner pieces so we can render them either animated or not */}
            {
              (() => {
                const heroInner = (
                  <>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-6">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-primary">Yetkili Distribütör</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                      Distribütörlüğünü Yaptığımız
                      <span className="block text-[#f97316] mt-2">
                        Markalar
                      </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white mb-8 leading-relaxed drop-shadow-md">
                      Yetkili olduğumuz markalar ve sunduğumuz çözümler ile endüstriyel ihtiyaçlarınıza profesyonel yanıtlar sunuyoruz.
                    </p>
                  </>
                )

                const buttonsInner = (
                  <>
                    {brandsStatic.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className="btn btn-lg bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:border-white/50 hover:scale-105 transition-all duration-300 shadow-lg"
                        onClick={() => {
                          const el = document.getElementById(b.id)
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                      >
                        {b.name}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ))}
                  </>
                )

                return (
                  <>
                    {shouldAnimate ? (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        {heroInner}
                      </motion.div>
                    ) : (
                      <div>{heroInner}</div>
                    )}

                    {shouldAnimate ? (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap gap-4">
                        {buttonsInner}
                      </motion.div>
                    ) : (
                      <div className="flex flex-wrap gap-4">{buttonsInner}</div>
                    )}
                  </>
                )
              })()
            }
          </div>
        </div>

          {/* Decorative gradient removed to avoid white overlay on hero */}
        </section>
      )}

        {/* removed inline Hiyoki preview to avoid duplicate Hiyoki sections; Hiyoki is rendered via distributorluk index */}

      {/* Brands are provided by nested routes (Outlet) to avoid duplication */}

      {/* Nested content - no wrapper so sections can control their own backgrounds */}
      <Outlet />
    </div>
  )
}


