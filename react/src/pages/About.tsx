import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text"
        >
          Hakkımızda
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto"
        >
          Keten Pnömatik, havalı ve elektrikli el aletlerinde uzmanlaşmış
          teknik servis, satış ve yedek parça hizmetleri sunar. Müşteri
          memnuniyetini ön planda tutarak hızlı ve güvenilir çözümler
          sağlıyoruz.
        </motion.p>
      </header>

      {/* Content */}
      <section className="space-y-12">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg text-neutral-700 max-w-3xl mx-auto"
        >
          <p>
            Kurumsal tecrübemiz ve yetkili servis altyapımız ile her marka için
            bakım-onarım, orijinal yedek parça temini ve eğitim hizmetleri
            veriyoruz. Amacımız, müşterilerimizin iş sürekliliğini kesintisiz
            desteklemektir.
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-100 rounded-2xl shadow-lg p-8 border border-neutral-200"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Vizyonumuz
            </h2>
            <p className="text-neutral-600">
              Sektöründe güvenilir, yenilikçi ve müşteri odaklı çözümler sunan
              bir servis sağlayıcısı olmak.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-100 rounded-2xl shadow-lg p-8 border border-neutral-200"
          >
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Misyonumuz
            </h2>
            <p className="text-neutral-600">
              Kaliteli teknik servis, orijinal parça ve zamanında müdahale ile
              müşterilerimizin ekipmanlarını en iyi performansta tutmak.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
