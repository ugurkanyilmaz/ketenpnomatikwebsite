import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Newsletter from '../components/Newsletter'
import { motion, useScroll, useSpring } from 'framer-motion'
import useShouldAnimate from '../hooks/useShouldAnimate'
import DistributorSections from '../components/DistributorSections'
import SectionHeader from '../components/SectionHeader'
import { ScrollToTopLink } from '../components/ScrollToTopLink'
import { useSiteImage } from '../hooks/useSiteImages'
import { useEffect } from 'react'
import { applyPageSEO } from '../utils/other_seo'

export default function HomePage() {
  useEffect(() => {
    applyPageSEO('home')
  }, [])
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 })
  const shouldAnimate = useShouldAnimate()
  const M: any = shouldAnimate
    ? motion
    : {
      div: (p: any) => <div {...p} />,
      section: (p: any) => <section {...p} />,
      a: (p: any) => <a {...p} />,
    }

  // Fetch dynamic images
  const { image: electricProfessionalImg } = useSiteImage('home_electric_professional')
  const { image: electricIndustrialImg } = useSiteImage('home_electric_industrial')
  const { image: batteryProfessionalImg } = useSiteImage('home_battery_professional')
  const { image: batteryIndustrialImg } = useSiteImage('home_battery_industrial')
  const { image: pneumaticProfessionalImg } = useSiteImage('home_pneumatic_professional')
  const { image: pneumaticIndustrialImg } = useSiteImage('home_pneumatic_industrial')
  const { image: customSolutionsImg } = useSiteImage('home_custom_solutions')
  const { image: process1Img } = useSiteImage('home_process_1')
  const { image: process2Img } = useSiteImage('home_process_2')
  const { image: process3Img } = useSiteImage('home_process_3')
  const { image: process4Img } = useSiteImage('home_process_4')
  const { image: manipulatorImg } = useSiteImage('home_manipulator')
  return (
    <div className="home-page">
      {/* Scroll Progress Bar */}
      <M.div style={shouldAnimate ? { scaleX } : undefined} className="fixed left-0 right-0 top-0 h-1 origin-left bg-primary z-[100]" />
      <Hero />

      {/* Ürünlerimiz header now sits above the Elektrikli section */}

      {/* Elektrikli Ürünlerimiz - Çapraz düzen */}
      <M.section
        className="bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto px-4 pt-12">
          <SectionHeader title="Ürünlerimiz" subtitle="Havalı, Akülü, Elektrikli ürünler" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Başlık */}
          <div className="mb-10 text-center">
            <p className="text-gray-600 mb-2 text-base md:text-lg">İhtiyacınıza uygun elektrikli çözümler</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Elektrikli Ürünlerimiz</h2>
          </div>

          {/* Çapraz Düzen: Sol üstte foto/altta açıklama, Sağ üstte açıklama/altta foto */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 lg:divide-x-2 lg:divide-gray-200">
            {/* Sol: Profesyonel - Üstte Foto, Altta Açıklama */}
            <M.div
              className="lg:pr-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Fotoğraf Üstte */}
              <div className="mb-6 w-full" style={{ aspectRatio: '2/1' }}>
                <img
                  src={electricProfessionalImg?.image_path || "/professional_banner.png"}
                  alt={electricProfessionalImg?.alt_text || "Profesyonel Elektrikli ürünler"}
                  className="rounded-xl w-full h-full object-cover shadow-lg"
                  loading="lazy"
                />
              </div>

              {/* Açıklama Altta */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">Profesyonel</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  Hassas işlemler için tork ayarlı tornavidalar ve kömürsüz motorlu çözümler. Ergonomik tasarım ile uzun süreli kullanım konforu.
                </p>
                <ScrollToTopLink
                  className="btn btn-block btn-outline-blue"
                  to="/kategoriler/profesyonel/elektrikli-sikicilar"
                  style={{ fontWeight: 600 }}
                >
                  Profesyonel Elektrikli Seriler
                </ScrollToTopLink>
              </div>
            </M.div>

            {/* Sağ: Endüstriyel - Üstte Açıklama, Altta Foto */}
            <M.div
              className="lg:pl-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Açıklama Üstte */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--p)' }}>Endüstriyel</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  7/24 vardiya şartlarında kullanılabilecek endüstriyel elektrikli ürünlerimiz. Yüksek dayanıklılık ve kesintisiz performans.
                </p>
                <ScrollToTopLink
                  className="btn btn-block"
                  to="/kategoriler/endustriyel/kolver-elektrikli-tornavidalar"
                  style={{
                    backgroundColor: 'var(--p)',
                    borderColor: 'var(--pf)',
                    color: 'var(--pc)',
                    fontWeight: '600',
                  }}
                >
                  Endüstriyel Elektrikli Seriler
                </ScrollToTopLink>
              </div>

              {/* Fotoğraf Altta */}
              <div className="w-full" style={{ aspectRatio: '2/1' }}>
                <img
                  src={electricIndustrialImg?.image_path || "/endus.jpg"}
                  alt={electricIndustrialImg?.alt_text || "Endüstriyel Elektrikli ürünler"}
                  className="rounded-xl w-full h-full object-cover shadow-lg"
                  loading="lazy"
                />
              </div>
            </M.div>
          </div>
        </div>
      </M.section>

      {/* Akülü Ürünlerimiz - Çapraz düzen */}
      <motion.section
        className="bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Başlık */}
          <div className="mb-10 text-center">
            <p className="text-gray-600 mb-2 text-base md:text-lg">Hafif, güçlü ve uzun ömürlü</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Akülü Ürünlerimiz</h2>
          </div>

          {/* Çapraz Düzen: Sol üstte foto/altta açıklama, Sağ üstte açıklama/altta foto */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 lg:divide-x-2 lg:divide-gray-300">
            {/* Sol: Profesyonel - Üstte Foto, Altta Açıklama */}
            <motion.div
              className="lg:pr-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Fotoğraf Üstte */}
              <div className="mb-6 w-full" style={{ aspectRatio: '2/1' }}>
                <img
                  src={batteryProfessionalImg?.image_path || "/professional_banner.png"}
                  alt={batteryProfessionalImg?.alt_text || "Profesyonel Akülü ürünler"}
                  className="rounded-xl w-full h-full object-cover shadow-lg"
                  loading="lazy"
                />
              </div>

              {/* Açıklama Altta */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">Profesyonel</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  Hafif ve ergonomik tasarım ile uzun ömürlü bataryalar. Hareket özgürlüğü ile profesyonel işlerinizi kesintisiz tamamlayın.
                </p>
                <ScrollToTopLink
                  className="btn btn-block btn-outline-blue"
                  to="/kategoriler/profesyonel/akulu-montaj-aletleri"
                  style={{ fontWeight: 600 }}
                >
                  Profesyonel Akülü Seriler
                </ScrollToTopLink>
              </div>
            </motion.div>

            {/* Sağ: Endüstriyel - Üstte Açıklama, Altta Foto */}
            <motion.div
              className="lg:pl-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Açıklama Üstte */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--p)' }}>Endüstriyel</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  7/24 vardiya şartlarında yüksek güç ve dayanıklılık. Ağır sanayi uygulamaları için güçlü akülü çözümler.
                </p>
                <ScrollToTopLink
                  className="btn btn-block"
                  to="/kategoriler/endustriyel/akulu-montaj-aletleri"
                  style={{
                    backgroundColor: 'var(--p)',
                    borderColor: 'var(--pf)',
                    color: 'var(--pc)',
                    fontWeight: '600',
                  }}
                >
                  Endüstriyel Akülü Seriler
                </ScrollToTopLink>
              </div>

              {/* Fotoğraf Altta */}
              <div className="w-full" style={{ aspectRatio: '2/1' }}>
                <img
                  src={batteryIndustrialImg?.image_path || "/endus.jpg"}
                  alt={batteryIndustrialImg?.alt_text || "Endüstriyel Akülü ürünler"}
                  className="rounded-xl w-full h-full object-cover shadow-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>


      {/* Havalı Ürünlerimiz - Çapraz düzen */}
      <motion.section
        className="bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Başlık */}
          <div className="mb-10 text-center">
            <p className="text-gray-600 mb-2 text-base md:text-lg">Yüksek dayanım ve verimlilik</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Havalı Ürünlerimiz</h2>
          </div>

          {/* Çapraz Düzen: Sol üstte foto/altta açıklama, Sağ üstte açıklama/altta foto */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 lg:divide-x-2 lg:divide-gray-200">
            {/* Sol: Profesyonel - Üstte Foto, Altta Açıklama */}
            <motion.div
              className="lg:pr-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Fotoğraf Üstte */}
              <div className="mb-6 w-full" style={{ aspectRatio: '2/1' }}>
                <img
                  src={pneumaticProfessionalImg?.image_path || "/professional_banner.png"}
                  alt={pneumaticProfessionalImg?.alt_text || "Profesyonel Havalı ürünler"}
                  className="rounded-xl w-full h-full object-cover shadow-lg"
                  loading="lazy"
                />
              </div>

              {/* Açıklama Altta */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">Profesyonel</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  Hassas işlemler için tork ayarlı pnömatik tornavidalar ve hafif perçin makineleri. Ergonomik ve güvenilir profesyonel çözümler.
                </p>
                <ScrollToTopLink
                  className="btn btn-block btn-outline-blue"
                  to="/kategoriler/profesyonel/havali-el-aletleri"
                  style={{ fontWeight: 600 }}
                >
                  Profesyonel Havalı Seriler
                </ScrollToTopLink>
              </div>
            </motion.div>

            {/* Sağ: Endüstriyel - Üstte Açıklama, Altta Foto */}
            <motion.div
              className="lg:pl-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Açıklama Üstte */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--p)' }}>Endüstriyel</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  7/24 vardiya şartlarında kullanılabilecek endüstriyel havalı ürünlerimiz. Ağır hizmet tipi uygulamalar için yüksek dayanıklılık ve kesintisiz performans.
                </p>
                <ScrollToTopLink
                  className="btn btn-block"
                  to="/kategoriler/endustriyel/havali-montaj-aletleri"
                  style={{
                    backgroundColor: 'var(--p)',
                    borderColor: 'var(--pf)',
                    color: 'var(--pc)',
                    fontWeight: '600',
                  }}
                >
                  Endüstriyel Havalı Seriler
                </ScrollToTopLink>
              </div>

              {/* Fotoğraf Altta */}
              <div className="w-full" style={{ aspectRatio: '2/1' }}>
                <img
                  src={pneumaticIndustrialImg?.image_path || "/endus.jpg"}
                  alt={pneumaticIndustrialImg?.alt_text || "Endüstriyel Havalı ürünler"}
                  className="rounded-xl w-full h-full object-cover shadow-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Özel Çözümler - Custom Solutions */}
      <motion.section
        className="bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-neutral-600 mb-2 text-base md:text-lg">Sizin için özel tasarlanmış çözümler</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Özel Çözümler</h2>
            <p className="mt-3 text-gray-700 text-base md:text-lg">
              Standart ürünlerimizin ötesinde, işletmenizin kendine özgü ihtiyaçlarına yönelik kişiselleştirilmiş çözümler sunuyoruz. Üretim hattınıza tam entegre olacak, verimliliğinizi artıracak ve işletme maliyetlerinizi düşürecek özel sistemler tasarlıyoruz. Uzman ekibimiz, projenizin her aşamasında yanınızda.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href="/iletisim"
              >
                İletişime Geç
              </a>
              <a
                className="btn btn-outline"
                href="/demo-talebi"
                style={{
                  borderColor: 'var(--p)',
                  color: 'var(--p)',
                }}
              >
                Demo Talebi
              </a>
            </div>
          </div>
          <motion.div
            className="order-1 lg:order-none"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={customSolutionsImg?.image_path || "/placeholder.png"}
              alt={customSolutionsImg?.alt_text || "Özel çözümler"}
              className="rounded-box shadow-xl w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Manipülatörler Section */}
      <motion.section
        className="bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          {/* Image Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={manipulatorImg?.image_path || "/placeholder.png"}
              alt={manipulatorImg?.alt_text || "Manipülatörler"}
              className="rounded-box shadow-xl w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Text Right */}
          <div>
            <p className="text-neutral-600 mb-2 text-base md:text-lg">Ergonomik ve Güvenli Taşıma</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Manipülatörler</h2>
            <p className="mt-3 text-gray-700 text-base md:text-lg">
              Yüklerinizi ağırlıksız hissederek taşıyın. Endüstriyel manipülatörlerimiz ile iş güvenliğini artırın, operatör yorgunluğunu azaltın ve verimliliği maksimize edin. Her türlü yük için özel tutucu tasarımları.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href="/kategoriler/manipulatorler"
              >
                İncele
              </a>
              <a
                className="btn btn-outline"
                href="/iletisim"
                style={{
                  borderColor: 'var(--p)',
                  color: 'var(--p)',
                }}
              >
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Hizmetlerimiz - move to second */}
      <motion.section
        className="bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Hizmetlerimiz</h2>
            <p className="mt-3 text-gray-700">
              Satıştan kurulum ve bakıma kadar; tüm süreçlerde yanınızdayız.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Satış',
                desc: 'İhtiyaca özel ürün ve seri önerileri',
                href: '/kategoriler',
              },
              {
                title: 'Teknik Servis',
                desc: 'Hızlı arıza tespiti ve onarım',
                href: '/teknik-servis',
              },
              {
                title: 'Yedek Parça',
                desc: 'Orijinal ve garantili parça temini',
                href: '/iletisim',
              },
              {
                title: 'Demo Talebi',
                desc: 'Saha denemesi ve eğitim',
                href: '/demo-talebi',
              },
            ].map((s) => (
              <motion.a
                key={s.title}
                href={s.href}
                className="card bg-white border border-base-300 shadow-sm hover:shadow-xl transition-shadow"
                whileHover={{ y: -4 }}
              >
                <div className="card-body">
                  <h3 className="card-title">{s.title}</h3>
                  <p className="text-gray-700">{s.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Distribütörlük - move to third */}
      {/* Each distributor block now has its own background in DistributorSections */}
      <DistributorSections />

      {/* Süreç - Nasıl Çalışıyoruz (Blog tarzı bloklar) */}
      <section>
        {/* 1. İhtiyaç Analizi - Light background */}
        <motion.div
          className="bg-white py-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionHeader title="Nasıl Çalışıyoruz?" subtitle="Satıştan kurulum ve bakıma kadar; tüm süreçlerde yanınızdayız." />
          <div className="max-w-7xl mx-auto px-4 pb-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={process1Img?.image_path || "/technical_service_banner.png"} alt={process1Img?.alt_text || "İhtiyaç analizi"}
                  className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
              </motion.div>
              <div>
                <div className="badge badge-primary mb-3">1. Adım</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">İhtiyaç Analizi</h3>
                <p className="mt-3 text-gray-700">Uygulamanızın gereksinimlerini dinliyor, doğru güç, tork ve devir kombinasyonunu belirliyoruz.</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <motion.a href="/sss" className="rounded-box border border-base-300 bg-base-100 p-4 text-sm hover:shadow-md" whileHover={{ y: -3 }}>SSS</motion.a>
                  <motion.a href="/hakkimizda" className="rounded-box border border-base-300 bg-base-100 p-4 text-sm hover:shadow-md" whileHover={{ y: -3 }}>Hakkımızda</motion.a>
                  <motion.a href="/iletisim" className="rounded-box border border-base-300 bg-base-100 p-4 text-sm hover:shadow-md" whileHover={{ y: -3 }}>İletişim</motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Ürün/Seri Seçimi - Dark background */}
        <motion.div
          className="bg-[#e0e0e0] py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="badge badge-primary mb-3">2. Adım</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Ürün / Seri Seçimi</h3>
                <p className="mt-3 text-gray-700">Seriler arasında doğru eşleşmeyi yapar, elektrikli veya havalı seçenekleri kullanım senaryonuza göre öneririz.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn btn-outline btn-sm" href="/kategoriler/profesyonel">Elektrikli Seriler</a>
                  <a className="btn btn-outline btn-sm" href="/kategoriler/endustriyel">Havalı Seriler</a>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={process2Img?.image_path || "/keten_banner.jpg"} alt={process2Img?.alt_text || "Ürün/Seri seçimi"}
                  className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 3. Kurulum & Eğitim - Light background */}
        <motion.div
          className="bg-white py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={process3Img?.image_path || "/technical_service_banner.png"} alt={process3Img?.alt_text || "Kurulum ve eğitim"}
                  className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
              </motion.div>
              <div>
                <div className="badge badge-primary mb-3">3. Adım</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Kurulum & Eğitim</h3>
                <p className="mt-3 text-gray-700">Sahada devreye alma, operatör eğitimi ve güvenlik kontrolleri ile kullanıma hazır teslim ederiz.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn btn-outline btn-sm" href="/demo-talebi">Demo Talebi</a>
                  <a className="btn btn-outline btn-sm" href="/teknik-servis">Teknik Servis</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Servis & Takip - Dark background */}
        <motion.div
          className="bg-[#e0e0e0] py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="badge badge-primary mb-3">4. Adım</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Servis & Takip</h3>
                <p className="mt-3 text-gray-700">Periyodik bakım hatırlatmaları, hızlı parça temini ve yerinde servis ile iş sürekliliğinizi koruruz.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn btn-outline btn-sm" href="/teknik-servis">Servis Talebi</a>
                  <a className="btn btn-outline btn-sm" href="/iletisim">Bize Ulaşın</a>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={process4Img?.image_path || "/professional_banner.png"} alt={process4Img?.alt_text || "Servis ve takip"}
                  className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Neden Keten Pnömatik? */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Benefits />
      </motion.div>

      {/* Removed: Çalıştığımız Markalar, Müşteri Görüşleri, and CTA sections per request */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Newsletter />
      </motion.div>
    </div>
  )
}

// page SEO is applied inside the HomePage component via useEffect

