import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function DistributorSections() {
  return (
    <section aria-label="Distribütörlük bölümleri">
      {/* Kolver - dark background */}
      <div className="bg-slate-800 py-8">
        <SectionHeader title="Distribütörlük" subtitle="Yetkili olduğumuz markalar ve sunduğumuz çözümler" dark />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-10 items-center"
        >
          <div>
            <div className="badge badge-primary mb-4">Distribütörlük</div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Resmi Kolver Distribütörü</h2>
          <p className="mt-5 text-gray-300 leading-relaxed text-lg">
            Keten Pnömatik, Kolver markasının Türkiye’deki yetkili distribütörüdür. Endüstriyel
            montaj hatları için yüksek hassasiyetli elektrikli tork çözümleri sunar; kurulum, eğitim
            ve satış sonrası teknik destekle süreci uçtan uca yönetir.
          </p>
          <ul className="mt-6 space-y-2 text-gray-300">
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Yetkili stok ve hızlı tedarik</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Doğru tork ve proses seçimi danışmanlığı</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Garanti kapsamı ve orijinal yedek parça</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="/iletisim" className="btn btn-primary">Teklif Al</a>
            <a href="/demo-talebi" className="btn btn-outline">Demo Talep Et</a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src="/keten_banner.jpg"
            alt="Kolver resmi distribütör görseli"
            className="rounded-box shadow-xl w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
      </div>

  {/* APAC - light gray background */}
  <div className="bg-gray-100 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="max-w-7xl mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-10 items-center"
      >
        <motion.div
          className="order-1 lg:order-none"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src="/professional_banner.png"
            alt="APAC resmi distribütör görseli"
            className="rounded-box shadow-xl w-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div>
          <div className="badge badge-secondary mb-4">Distribütörlük</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Resmi APAC Distribütörü</h2>
          <p className="mt-5 text-gray-700 leading-relaxed text-lg">
            APAC ürünlerinde resmi distribütör olarak; geniş ürün gamını rekabetçi teslim süreleriyle
            sunuyoruz. Uygulamanıza en uygun çözümleri belirleyip, saha kurulumu ve eğitimle destekliyoruz.
          </p>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Geniş ürün yelpazesi ve alternatifler</li>
            <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Hızlı servis ve yedek parça erişimi</li>
            <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Saha devreye alma ve kullanıcı eğitimi</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="/kategoriler" className="btn btn-secondary">Ürünleri İncele</a>
            <a href="/iletisim" className="btn btn-outline">Bilgi Al</a>
          </div>
        </div>
      </motion.div>
      </div>

      {/* HIYOKI - dark background */}
      <div className="bg-slate-800 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="max-w-7xl mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-10 items-center"
      >
        <div className="text-left">
          <div className="badge badge-secondary mb-4">Distribütörlük</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Resmi Hiyoki Distribütörü</h2>
          <p className="mt-5 text-gray-300 leading-relaxed text-lg">
            Hiyoki ölçüm ve test çözümlerinde yetkili distribütör olarak uzman ölçüm cihazları ve saha desteği sağlıyoruz.
            Üretim ve Ar-Ge süreçlerinizde hassas sonuçlara ulaşmanız için doğru ürün seçimi ve devreye alma desteği sunuyoruz.
          </p>
          <ul className="mt-6 space-y-2 text-gray-300">
            <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Hassas ölçüm cihazları
            </li>
            <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Uygulama danışmanlığı ve eğitim
            </li>
            <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Satış sonrası teknik destek
            </li>
          </ul>
          <div className="mt-6 flex gap-3 justify-start">
            <a href="/kategoriler" className="btn btn-secondary">Ürünleri İncele</a>
            <a href="/iletisim" className="btn btn-outline">Bilgi Al</a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src="/endus.jpg"
            alt="Hiyoki resmi distribütör görseli"
            className="rounded-box shadow-xl w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
      </div>
    </section>
  )
}
