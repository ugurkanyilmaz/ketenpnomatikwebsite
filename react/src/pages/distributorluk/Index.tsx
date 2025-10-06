import { Link } from 'react-router-dom'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { motion } from 'framer-motion'

export default function DistributorlukIndex() {
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
            <p className="mt-4 text-gray-700">
              Yüksek hassasiyetli elektrikli tork çözümleri ile montaj hatlarında kalite standartlarını yükseltir.
              Kurulum, eğitim ve satış sonrası destekle uçtan uca hizmet sağlıyoruz.
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
          >
            <img src="/professional_banner.png" alt="Kolver" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </motion.div>
        </motion.section>
      </div>

      {/* APAC section - Dark slate background */}
      <div className="bg-slate-800 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          id="apac"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/keten_banner.jpg" alt="APAC" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </motion.div>
          <div className="text-right">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">APAC</h2>
            <p className="mt-4 text-gray-300">
              Geniş ürün yelpazesi ve rekabetçi teslim süreleriyle endüstriyel uygulamalar için güvenilir çözümler.
            </p>
            <div className="mt-6 flex justify-end">
              <ScrollToTopLink to="/hakkimizda/apac" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
        </motion.section>
      </div>

  {/* Hiyoki section - Light gray background */}
  <div className="bg-gray-100 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="hiyoki"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className="text-left">
            <div className="badge badge-secondary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Hiyoki</h2>
            <p className="mt-4 text-gray-700">
              Elektriksel ölçüm ve test çözümleri ile üretim ve Ar-Ge süreçlerinde güvenilir sonuçlar.
              Uygulamanıza uygun ürün seçiminden devreye almaya kadar yanınızdayız.
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
          >
            <img src="/endus.jpg" alt="Hioki" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </motion.div>
        </motion.section>
      </div>

      {/* Hakkımızda - Dark slate background */}
      <div className="bg-slate-800 py-16">
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Keten Pnömatik Hakkında</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Endüstriyel montaj, ölçüm ve pnömatik sistemlerde uçtan uca çözümler sunuyoruz. Yetkili distribütörlüğünü
              yaptığımız markalarla; ürün seçimi, projelendirme, kurulum, eğitim ve satış sonrası destek süreçlerinin
              tamamında yanınızdayız.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-gray-200">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Uzman ekip ile keşif, projelendirme ve devreye alma</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Stoktan hızlı tedarik ve rekabetçi teslim süreleri</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Eğitim, bakım ve satış sonrası teknik destek</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/iletisim" className="btn btn-primary">Bize Ulaşın</Link>
              <Link to="/demo-talebi" className="btn btn-ghost text-white">Demo Talebi</Link>
            </div>
          </div>
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/technical_service_banner.png" alt="Keten Pnömatik" className="rounded-box shadow-xl w-full object-cover" loading="lazy" />
          </motion.div>
        </motion.section>
      </div>

  {/* Misyon & Vizyon - Light background */}
  <div className="bg-gray-100 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <div className="badge badge-primary mb-3">Misyon</div>
              <h3 className="text-2xl font-bold text-gray-900">Güvenilir ve Uçtan Uca Çözüm</h3>
              <p className="mt-3 text-gray-700">Müşterilerimizin verimliliğini artıran, üretim kalitesini yükselten ve bakım maliyetlerini azaltan çözümler sunmak.</p>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <div className="badge badge-secondary mb-3">Vizyon</div>
              <h3 className="text-2xl font-bold text-gray-900">Sürdürülebilir Teknoloji Ortağı</h3>
              <p className="mt-3 text-gray-700">Endüstride güvenilirlik, hız ve teknik uzmanlık denilince akla gelen ilk çözüm ortağı olmak.</p>
            </div>
          </div>
        </motion.section>
      </div>

  {/* İstatistikler - Light background */}
  <div className="bg-gray-100">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-7xl mx-auto px-4 pb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
              <div className="text-3xl font-extrabold text-gray-900">10+ </div>
              <div className="text-sm text-gray-500">Yıl Tecrübe</div>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
              <div className="text-3xl font-extrabold text-gray-900">250+ </div>
              <div className="text-sm text-gray-500">Proje</div>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
              <div className="text-3xl font-extrabold text-gray-900">150+ </div>
              <div className="text-sm text-gray-500">Müşteri</div>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
              <div className="text-3xl font-extrabold text-gray-900">5000+ </div>
              <div className="text-sm text-gray-500">Stok Ürün</div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Değerlerimiz - Dark background */}
      <div className="bg-slate-800 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-7xl mx-auto px-4"
        >
          <h3 className="text-3xl font-extrabold text-white mb-8">Değerlerimiz</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Güven', desc: 'Söz verdiğimiz gibi teslim ederiz.' },
              { title: 'Hız', desc: 'Stoktan hızlı tedarik ve servis.' },
              { title: 'Uzmanlık', desc: 'Eğitimli ve sertifikalı ekip.' },
              { title: 'Destek', desc: 'Devreye alma ve sonrası teknik destek.' },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="rounded-2xl border border-slate-700/70 bg-slate-900/40 p-6 text-white"
              >
                <div className="text-xl font-bold mb-2">{v.title}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

  {/* İletişim CTA - Light background */}
  <div className="bg-gray-100 py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="rounded-2xl border border-base-300 bg-base-100 p-8 grid lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Projenizi birlikte şekillendirelim</h3>
              <p className="mt-2 text-gray-700">Uygulamanıza uygun ürün seçimi, projelendirme ve devreye alma için bizimle iletişime geçin.</p>
            </div>
            <div className="flex gap-3 lg:justify-end">
              <Link to="/iletisim" className="btn btn-primary">İletişim</Link>
              <Link to="/demo-talebi" className="btn btn-ghost">Demo Talebi</Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
