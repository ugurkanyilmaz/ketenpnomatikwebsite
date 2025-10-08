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
          className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed"
        >
          Keten Pnömatik, pnömatik ve elektrikli endüstriyel el aletleri sektöründe 
          uzmanlaşmış bir firma olarak faaliyet göstermektedir. Dünya markalarının 
          yetkili distribütörlüğünü yaparak, endüstriyel üretim tesisleri, otomotiv yan sanayi, 
          mobilya imalatı ve metal işleme sektörlerine yüksek kaliteli ürünler ve profesyonel 
          teknik destek sunuyoruz. Müşteri memnuniyetini ve iş sürekliliğini ön planda tutarak, 
          ürün tedarikinden satış sonrası hizmetlere kadar her aşamada yanınızdayız.
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
          className="prose prose-lg text-neutral-700 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kimiz, Ne Yapıyoruz?</h2>
          <p className="mb-4">
            Keten Pnömatik olarak, endüstriyel üretim süreçlerinde kritik öneme sahip pnömatik ve 
            elektrikli el aletleri konusunda kapsamlı çözümler sunuyoruz. APAC, Kolver ve Hiyoki 
            gibi dünya çapında tanınan markaların Türkiye distribütörüyüz. Bu markaların geniş 
            ürün yelpazesini müşterilerimize en uygun koşullarda tedarik ediyor, teknik danışmanlık 
            ve satış sonrası destek hizmetleri sağlıyoruz.
          </p>
          <p className="mb-4">
            Faaliyet alanımız sadece ürün satışı ile sınırlı değildir. Montaj hatları için özel 
            tork kontrol sistemlerinden, havalı vidalama ve taşlama aletlerine, hassas ölçüm 
            cihazlarından otomasyon ekipmanlarına kadar geniş bir yelpazede hizmet veriyoruz. 
            Her projede müşteri ihtiyaçlarını detaylı analiz ediyor, en uygun ürün ve sistem 
            önerilerini sunuyoruz.
          </p>
          <p>
            Deneyimli teknik ekibimiz, kurulum aşamasından devreye alma sürecine, operatör 
            eğitimlerinden periyodik bakıma kadar tüm süreçlerde yanınızda. Yedek parça tedariki, 
            arıza giderme ve kalibrasyon hizmetleriyle üretim süreçlerinizin kesintisiz devam 
            etmesini sağlıyoruz. Amacımız, sadece ürün satmak değil, müşterilerimizin üretim 
            verimliliğini artıran uzun vadeli çözüm ortağı olmaktır.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Değerlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Müşteri Odaklılık</h3>
              <p className="text-sm text-neutral-700">
                Her projeyi müşteri ihtiyaçlarını tam anlamak ve en doğru çözümü sunmak üzerine kuruyoruz.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Teknik Uzmanlık</h3>
              <p className="text-sm text-neutral-700">
                Deneyimli teknik ekibimiz ile karmaşık endüstriyel uygulamalarda profesyonel destek sağlıyoruz.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">Güvenilirlik</h3>
              <p className="text-sm text-neutral-700">
                Orijinal ürünler, zamanında teslimat ve kesintisiz destek ile iş ortaklarımızın yanındayız.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200"
          >
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Vizyonumuz
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Endüstriyel el aletleri ve otomasyon ekipmanları sektöründe Türkiye'nin öncü distribütörü olmak. 
              Yenilikçi ürünler, kapsamlı teknik destek ve müşteri memnuniyeti odaklı hizmet anlayışı ile 
              sektöre değer katmaya devam etmek.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-indigo-200"
          >
            <div className="text-4xl mb-4">💎</div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">
              Misyonumuz
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Dünya standartlarında kaliteli ürünleri Türkiye sanayisine ulaştırmak. Teknik danışmanlık, 
              eğitim ve satış sonrası hizmetlerle müşterilerimizin üretim verimliliğini artırmak. 
              Sürekli gelişim ve müşteri odaklı yaklaşımla uzun vadeli iş ortaklıkları kurmak.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
