import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Newsletter from '../components/Newsletter'
import { motion, useScroll, useSpring } from 'framer-motion'
import DistributorSections from '../components/DistributorSections'
import SectionHeader from '../components/SectionHeader'

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 })
  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 h-1 origin-left bg-primary z-[100]" />
    <Hero />

  {/* Ürünlerimiz header now sits above the Elektrikli section */}

    {/* Elektrikli Ürünlerimiz - Blog Layout (Görsel solda, metin sağda) */}
      <motion.section
        className="bg-slate-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto px-4 pt-12">
          <SectionHeader title="Ürünlerimiz" subtitle="Havalı, Akülü, Elektrikli ürünler" dark />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            className="order-1 lg:order-none"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/professional_banner.png" alt="Elektrikli ürünler"
                 className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </motion.div>
          <div>
            <p className="text-gray-300 mb-2 text-base md:text-lg">İhtiyacınıza uygun elektrikli çözümler</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Elektrikli Ürünlerimiz</h2>
            <p className="mt-3 text-gray-300 text-base md:text-lg">
              İşinizin kritik noktalarında maksimum hassasiyet ve kontrol sizinle olsun. Elektrikli alet serimiz, tork ayarlı tornavidalar dahil olmak üzere, şebeke gücünden aldığı kesintisiz enerji ile en zorlu montaj ve üretim işlemlerinizi hatasız tamamlamanızı sağlar. Dayanıklı ve ergonomik çözümlerimizle tanışın.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn"
                href="/kategoriler/profesyonel"
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  backgroundColor: '#facc15',
                  borderColor: '#eab308',
                  color: '#1f2937',
                }}
              >
                Profesyonel Seriler
              </a>
              <a
                className="btn btn-outline"
                href="/kategoriler"
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  borderColor: '#facc15',
                  color: '#facc15',
                }}
              >
                Tüm Kategoriler
              </a>
            </div>
            {/* Alt seri kutuları */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'Akülü Vidalama', href: '/kategoriler/profesyonel' },
                { title: 'Elektrikli Taşlama', href: '/kategoriler/profesyonel' },
                { title: 'Matkap & Delici', href: '/kategoriler/profesyonel' },
              ].map((s, i) => (
                <motion.a
                  key={s.title}
                  href={s.href}
                  className="rounded-box bg-gray-800 p-4 text-sm font-semibold hover:shadow-md"
                  style={{
                    color: '#facc15',
                    borderColor: '#facc15',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  {s.title}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
    </motion.section>

    {/* Akülü section */}
      <motion.section
        className="bg-gray-100"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-neutral-600 mb-2 text-base md:text-lg">Hafif, güçlü ve uzun ömürlü</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Akülü Ürünlerimiz</h2>
            <p className="mt-3 text-gray-700 text-base md:text-lg">Çalışma alanınız neresi olursa olsun, performansınızdan ödün vermeyin. Akülü ürün serimiz, hafifliği, uzun ömürlü bataryaları ve yüksek gücü tek bir çatıda birleştirir. Şarj endişesi yaşamadan, aletlerimizin sunduğu tam hareket özgürlüğü ile en zorlu projelerinizi dahi kesintisiz tamamlayın. Dayanıklı ve güçlü çözümlerimizle tanışın, iş akışınızı şimdi kablolardan bağımsız hale getirin.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn"
                href="/kategoriler/profesyonel"
                style={{
                  backgroundColor: '#c1121f',
                  borderColor: '#9b0f1a',
                  color: '#ffffff',
                }}
              >
                Akülü Seriler
              </a>
              <a
                className="btn btn-outline"
                href="/kategoriler"
                style={{
                  borderColor: '#facc15',
                  color: '#facc15',
                }}
              >
                Tüm Kategoriler
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'Akülü Vidalama', href: '/kategoriler/profesyonel' },
                { title: 'Akülü Taşlama', href: '/kategoriler/profesyonel' },
                { title: 'Akülü Matkap', href: '/kategoriler/profesyonel' },
              ].map((s, i) => (
                <motion.a
                  key={s.title}
                  href={s.href}
                  className="rounded-box bg-base-100 p-4 text-sm font-semibold hover:shadow-md"
                  style={{
                    color: '#c1121f',
                    borderColor: '#c1121f',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  {s.title}
                </motion.a>
              ))}
            </div>
          </div>
          <motion.div
            className="order-1 lg:order-none"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/professional_banner.png" alt="Akülü ürünler"
                 className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </motion.section>

      {/* Havalı Ürünlerimiz */}
      <motion.section
        className="bg-slate-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/endus.jpg" alt="Havalı ürünler"
                 className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </motion.div>
          <div className="text-right">
            <p className="text-gray-300 mb-2 text-base md:text-lg">Yüksek dayanım ve verimlilik</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Havalı Ürünlerimiz</h2>
              <p className="mt-3 text-gray-300 text-base md:text-lg text-justify leading-relaxed max-w-prose mx-auto">
                Pnömatik aletler, ağır hizmet tipi kullanımlarda bile tutarlı ve güvenilir performans sunar. Darbelere ve sürekli kullanıma dayanıklı yapıları ile uzun yıllar hizmet ederken, servis kolaylıkları ile de operasyonel devamlılığınızı korur. İşletmenizin verimliliğini ve dayanıklılığını artıracak çözümler bu kategoride.
              </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <a className="btn btn-info" href="/kategoriler/endustriyel">Endüstriyel Seriler</a>
              <a
                className="btn btn-outline"
                href="/kategoriler"
                style={{
                  borderColor: '#facc15',
                  color: '#facc15',
                }}
              >
                Tüm Kategoriler
              </a>
            </div>
            {/* Alt seri kutuları */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-end">
              {[
                { title: 'Darbeli Somun Sökme', href: '/kategoriler/endustriyel' },
                { title: 'Pnömatik Zımpara', href: '/kategoriler/endustriyel' },
                { title: 'Kompresörler', href: '/kategoriler/endustriyel' },
                { title: 'Hortum & Bağlantılar', href: '/kategoriler/endustriyel' },
              ].map((s, i) => (
                <motion.a
                  key={s.title}
                  href={s.href}
                  className="rounded-box bg-gray-800 p-4 text-sm hover:shadow-md"
                  style={{ color: '#60a5fa', borderColor: '#60a5fa', borderWidth: '1px', borderStyle: 'solid', fontWeight: '600' }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  {s.title}
                </motion.a>
              ))}
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
                <img src="/technical_service_banner.png" alt="İhtiyaç analizi"
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
          className="bg-slate-800 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="badge badge-primary mb-3">2. Adım</div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Ürün / Seri Seçimi</h3>
                <p className="mt-3 text-gray-300">Seriler arasında doğru eşleşmeyi yapar, elektrikli veya havalı seçenekleri kullanım senaryonuza göre öneririz.</p>
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
                <img src="/keten_banner.jpg" alt="Ürün/Seri seçimi"
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
                <img src="/technical_service_banner.png" alt="Kurulum ve eğitim"
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
          className="bg-slate-800 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="badge badge-primary mb-3">4. Adım</div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Servis & Takip</h3>
                <p className="mt-3 text-gray-300">Periyodik bakım hatırlatmaları, hızlı parça temini ve yerinde servis ile iş sürekliliğinizi koruruz.</p>
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
                <img src="/professional_banner.png" alt="Servis ve takip"
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
    </>
  )
}
