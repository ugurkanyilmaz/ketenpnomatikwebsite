import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { applyPageSEO } from '../../utils/other_seo'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { motion } from 'framer-motion'
import { useSiteImage } from '../../hooks/useSiteImages'

export default function DistributorlukIndex() {
  useEffect(() => {
    applyPageSEO('about_apac', { title: 'Distribütörlüklerimiz | Keten Pnömatik', description: 'Keten Pnömatik yetkili distribütörlüklerimiz ve markalarımızı keşfedin.' })
  }, [])
  const { image: kolverImg } = useSiteImage('about_kolver')
  const { image: apacImg } = useSiteImage('about_apac')
  const { image: hiyokiImg } = useSiteImage('about_hiyoki')
  const { image: hawanoxImg } = useSiteImage('about_hawanox')
  const { image: asaImg } = useSiteImage('about_asa')
  const { image: deltaRegisImg } = useSiteImage('about_delta_regis')
  const { image: serviceImg } = useSiteImage('about_service')
  return (
    <div>
  {/* Kolver section - Light gray background */}
  <div className="bg-gray-100 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          id="kolver"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className="text-left">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Kolver</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              İtalyan marka Kolver, elektrikli tork kontrol sistemleri ile otomotiv, havacılık ve elektronik sektörlerinde 
              hassas montaj çözümleri sunar. ±%1 tork hassasiyeti ve Industry 4.0 uyumlu sistemleri ile üretim hatlarınızda 
              sıfır hata hedefine ulaşmanızı sağlar.
            </p>
            <div className="mt-6 flex justify-start">
              <ScrollToTopLink to="/hakkimizda/kolver" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img src={kolverImg?.image_path || '/professional_banner.png'} alt={kolverImg?.alt_text || 'Kolver Elektrikli Tork Sistemleri'} className="rounded-box shadow-xl w-full object-contain" loading="lazy" />
          </motion.div>
        </motion.section>
      </div>

      {/* Hawanox section - Dark slate background */}
      <div className="bg-slate-800 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          id="hawanox"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img src={hawanoxImg?.image_path || '/keten_banner.jpg'} alt={hawanoxImg?.alt_text || 'Hawanox Ürünleri'} className="rounded-box shadow-xl w-full object-contain" loading="lazy" />
          </motion.div>
          <div className="text-right">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Hawanox</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Hawanox ürün yelpazesi, günlük operasyonlarınızın taleplerine yanıt verecek şekilde tasarlanmış, yüksek performanslı ve uygun fiyatlı akülü el aletleri ve montaj ekipmanlarından oluşur. Kalite ve maliyet dengesini mükemmel bir şekilde kurarak, işletmelerin verimliliklerini artırmalarını ve aynı zamanda operasyonel giderlerini optimize etmelerini sağlar.
            </p>
            <div className="mt-6 flex justify-end">
              <ScrollToTopLink to="/hakkimizda/hawanox" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ASA section - Light gray background */}
      <div className="bg-gray-100 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          id="asa"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className="text-left">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">ASA</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              ASA Enterprise Co., Ltd., 1978 yılında Tayvan'ın teknoloji ve üretim merkezi olan Taipei'de kuruldu. Dört yılı aşkın süredir endüstriyel montaj çözümlerine odaklanan ASA, basit bir el aleti üreticisinden öte, hassasiyetli elektrikli ve pnömatik tornavida sistemlerinin küresel bir lideri haline gelmiştir. Markamız, özellikle yüksek hacimli üretim ve kritik montaj hatlarında gereken milimetrik tork kontrolü ve tekrarlanabilirlik uzmanlığı ile tanınır.
            </p>
            <div className="mt-6 flex justify-start">
              <ScrollToTopLink to="/hakkimizda/asa" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img src={asaImg?.image_path || '/endus.jpg'} alt={asaImg?.alt_text || 'ASA Ürünleri'} className="rounded-box shadow-xl w-full object-contain" loading="lazy" />
          </motion.div>
        </motion.section>
      </div>

      {/* Delta Regis section - Dark slate background */}
      <div className="bg-slate-800 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          id="delta-regis"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img src={deltaRegisImg?.image_path || '/professional_banner.png'} alt={deltaRegisImg?.alt_text || 'Delta Regis Ürünleri'} className="rounded-box shadow-xl w-full object-contain" loading="lazy" />
          </motion.div>
          <div className="text-right">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Delta Regis</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Delta Regis Tools Inc., endüstriyel montaj ve üretim süreçlerinde güvenilirliği ve hassasiyeti temsil eden, Amerika merkezli lider bir markadır. 20 yılı aşkın süredir, dünya çapındaki üretim tesislerinin en zorlu gereksinimlerini karşılamak üzere tasarlanmış tork kontrollü elektrikli el aletleri, tork ölçüm cihazları ve aksesuarları sunar.
            </p>
            <div className="mt-6 flex justify-end">
              <ScrollToTopLink to="/hakkimizda/delta-regis" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
        </motion.section>
      </div>
  {/* APAC section - Light background (changed to white per request) */}
  <div className="bg-gray-100 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          id="apac"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className="text-left order-2 lg:order-1">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">APAC</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Tayvanlı marka APAC, 40 yılı aşkın tecrübesi ile pnömatik el aletleri ve endüstriyel güç aletlerinde 
              dünya çapında tanınan bir üreticidir. Havalı vidalama, taşlama, delme, zımparalama ve kesme uygulamaları 
              için 500'den fazla model ile geniş bir ürün portföyü sunar.
            </p>
            <div className="mt-6 flex justify-start">
              <ScrollToTopLink to="/hakkimizda/apac" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
          <motion.div
            className="order-1 lg:order-2 flex items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={apacImg?.image_path || '/keten_banner.jpg'} alt={apacImg?.alt_text || 'APAC Pnömatik El Aletleri'} className="rounded-box shadow-xl w-full object-contain" loading="lazy" />
          </motion.div>
        </motion.section>
      </div>

  {/* Hiyoki section - Dark background (changed to grey per request) */}
  <div className="bg-slate-800 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="hiyoki"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className="text-left">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Hiyoki</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Hiyoki, endüstriyel üretimde uzlaşmaz kalite ve maksimum dayanıklılık arayan tesisler için tasarlanmış premium bir markadır. Ürünlerimiz, sadece en yüksek standartları karşılamakla kalmaz, aynı zamanda zorlu 7/24 operasyonel taleplere dayanacak şekilde üstün mühendislikle üretilmiştir.
            </p>
            <div className="mt-6 flex justify-start">
              <ScrollToTopLink to="/hakkimizda/hiyoki" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img src={hiyokiImg?.image_path || '/endus.jpg'} alt={hiyokiImg?.alt_text || 'Hiyoki Ölçüm Cihazları'} className="rounded-box shadow-xl w-full object-contain" loading="lazy" />
          </motion.div>
        </motion.section>
      </div>

  {/* Hakkımızda - Light background (changed to white per request) */}
  <div className="bg-gray-100 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="hakkimizda"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center"
        >
          <div className="order-2 lg:order-1 text-left">
            <div className="badge badge-primary mb-3">Hakkımızda</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Keten Pnömatik Hakkında</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Endüstriyel montaj, ölçüm ve pnömatik sistemlerde uçtan uca çözümler sunuyoruz. Yetkili distribütörlüğünü
              yaptığımız markalarla; ürün seçimi, projelendirme, kurulum, eğitim ve satış sonrası destek süreçlerinin
              tamamında yanınızdayız.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-gray-700">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Uzman ekip ile keşif, projelendirme ve devreye alma</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Stoktan hızlı tedarik ve rekabetçi teslim süreleri</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Eğitim, bakım ve satış sonrası teknik destek</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/iletisim" className="btn btn-primary">Bize Ulaşın</Link>
              <Link to="/demo-talebi" className="btn btn-ghost">Demo Talebi</Link>
            </div>
          </div>
          <motion.div
            className="order-1 lg:order-2 flex items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={serviceImg?.image_path || '/technical_service_banner.png'} alt={serviceImg?.alt_text || 'Keten Pnömatik Teknik Servis'} className="rounded-box shadow-xl w-full object-contain" loading="lazy" />
          </motion.div>
        </motion.section>
      </div>

  {/* Misyon & Vizyon - Dark background (changed to grey per request) */}
  <div className="bg-slate-800 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">
              <div className="badge badge-primary mb-3">Misyon</div>
              <h3 className="text-2xl font-bold text-white">Güvenilir ve Uçtan Uca Çözüm</h3>
              <p className="mt-3 text-gray-300">Müşterilerimizin verimliliğini artıran, üretim kalitesini yükselten ve bakım maliyetlerini azaltan çözümler sunmak.</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">
              <div className="badge badge-secondary mb-3">Vizyon</div>
              <h3 className="text-2xl font-bold text-white">Sürdürülebilir Teknoloji Ortağı</h3>
              <p className="mt-3 text-gray-300">Endüstride güvenilirlik, hız ve teknik uzmanlık denilince akla gelen ilk çözüm ortağı olmak.</p>
            </div>
          </div>
        </motion.section>
      </div>

  {/* İstatistikler - unified light background */}
  <div className="bg-gray-100 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-7xl mx-auto px-4 pb-12"
        >
          <h3 className="text-3xl font-extrabold text-gray-900 mb-8">Tecrübemiz</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-gray-900">28+</div>
              <div className="text-sm text-gray-600">Yıl Tecrübe</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-gray-900">1000+</div>
              <div className="text-sm text-gray-600">Proje</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-gray-900">5000+</div>
              <div className="text-sm text-gray-600">Müşteri</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-gray-900">10000+</div>
              <div className="text-sm text-gray-600">Stok Ürün</div>
            </div>
          </div>
        </motion.section>
      </div>

  {/* Değerlerimiz - unified light background */}
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
            ] as Array<{title:string;desc:string}>).map((v, i) => {
              const styles = [
                'bg-blue-50 border-blue-100 text-blue-900',
                'bg-amber-50 border-amber-100 text-amber-900',
                'bg-emerald-50 border-emerald-100 text-emerald-900',
                'bg-indigo-50 border-indigo-100 text-indigo-900',
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
                  <div className="text-xl font-bold mb-2">{v.title}</div>
                  <p className="text-sm leading-relaxed text-neutral-700">{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>
      </div>

  {/* İletişim CTA - Dark background */}
  <div className="bg-slate-800 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="rounded-2xl overflow-hidden p-1 bg-gradient-to-r from-primary/80 to-secondary/80 shadow-2xl">
            <div className="rounded-2xl bg-slate-900/90 backdrop-blur-sm p-10 grid lg:grid-cols-3 gap-6 items-center text-white">
              <div className="lg:col-span-2">
                <h3 className="text-3xl md:text-4xl font-extrabold">Projenizi birlikte şekillendirelim</h3>
                <p className="mt-3 text-gray-200 max-w-xl">Uygulamanıza uygun ürün seçimi, projelendirme ve devreye alma için bizimle iletişime geçin.</p>
              </div>
              <div className="flex gap-3 lg:justify-end">
                <Link to="/iletisim" className="btn btn-primary btn-lg shadow-lg">İletişim</Link>
                <Link to="/demo-talebi" className="btn btn-ghost btn-lg text-white border-white/30">Demo Talebi</Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
