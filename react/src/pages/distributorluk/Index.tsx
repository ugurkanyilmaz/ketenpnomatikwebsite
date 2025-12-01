import { useEffect } from 'react'
import { applyPageSEO } from '../../utils/other_seo'
import { ScrollToTopLink } from '../../components/ScrollToTopLink'
import { motion } from 'framer-motion'
import { useSiteImage } from '../../hooks/useSiteImages'

export default function DistributorlukIndex() {
  useEffect(() => {
    applyPageSEO('about_apac', { 
      title: 'Distribütörlüklerimiz | Keten Pnömatik', 
      description: 'Keten Pnömatik yetkili distribütörlüklerimiz ve markalarımızı keşfedin.' 
    })
  }, [])
  
  const { image: kolverImg } = useSiteImage('about_kolver')
  const { image: apacImg } = useSiteImage('about_apac')
  const { image: hiyokiImg } = useSiteImage('about_hiyoki')
  const { image: hawanoxImg } = useSiteImage('about_hawanox')
  const { image: asaImg } = useSiteImage('about_asa')
  const { image: deltaRegisImg } = useSiteImage('about_delta_regis')
  
  return (
    <div>
      {/* APAC - Beyaz Arkaplan - Görsel Sağda */}
      <div className="bg-white py-16">
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
            <img 
              src={apacImg?.image_path || '/keten_banner.jpg'} 
              alt={apacImg?.alt_text || 'APAC Pnömatik El Aletleri'} 
              className="rounded-box shadow-xl w-full object-contain" 
              loading="lazy" 
            />
          </motion.div>
        </motion.section>
      </div>

  {/* Hiyoki - Açık Gri Arkaplan - Görsel Solda */}
  <div className="bg-[#e0e0e0] py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="hiyoki"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img 
              src={hiyokiImg?.image_path || '/endus.jpg'} 
              alt={hiyokiImg?.alt_text || 'Hiyoki Ölçüm Cihazları'} 
              className="rounded-box shadow-xl w-full object-contain" 
              loading="lazy" 
            />
          </motion.div>
          <div className="text-left">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Hiyoki</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Hiyoki, endüstriyel üretimde uzlaşmaz kalite ve maksimum dayanıklılık arayan tesisler için tasarlanmış premium bir marka.
              Ürünlerimiz, sadece en yüksek standartları karşılamakla kalmaz, aynı zamanda zorlu 7/24 operasyonel taleplere dayanacak şekilde üstün mühendislikle üretilmiştir.
            </p>
            <div className="mt-6 flex justify-start">
              <ScrollToTopLink to="/hakkimizda/hiyoki" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Hawanox - Beyaz Arkaplan - Görsel Sağda */}
      <div className="bg-white py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          id="hawanox"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className="text-left">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Hawanox</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Hawanox ürün yelpazesi, günlük operasyonlarınızın taleplerine yanıt verecek şekilde tasarlanmış, yüksek performanslı ve uygun fiyatlı akülü el aletleri ve montaj ekipmanlarından oluşur.
              Kalite ve maliyet dengesini mükemmel bir şekilde kurarak, işletmelerin verimliliklerini artırmalarını ve aynı zamanda operasyonel giderlerini optimize etmelerini sağlar.
            </p>
            <div className="mt-6 flex justify-start">
              <ScrollToTopLink to="/hakkimizda/hawanox" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img 
              src={hawanoxImg?.image_path || '/keten_banner.jpg'} 
              alt={hawanoxImg?.alt_text || 'Hawanox Ürünleri'} 
              className="rounded-box shadow-xl w-full object-contain" 
              loading="lazy" 
            />
          </motion.div>
        </motion.section>
      </div>

  {/* Kolver - Açık Gri Arkaplan - Görsel Solda */}
  <div className="bg-[#e0e0e0] py-16">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          id="kolver"
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img 
              src={kolverImg?.image_path || '/professional_banner.png'} 
              alt={kolverImg?.alt_text || 'Kolver Elektrikli Tork Sistemleri'} 
              className="rounded-box shadow-xl w-full object-contain" 
              loading="lazy" 
            />
          </motion.div>
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
        </motion.section>
      </div>

      {/* ASA - Beyaz Arkaplan - Görsel Sağda */}
      <div className="bg-white py-16">
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
              ASA Enterprise Co., Ltd., 1978 yılında Tayvan'ın teknoloji ve üretim merkezi olan Taipei'de kuruldu. Dört yılı aşkın süredir endüstriyel montaj çözümlerine odaklanan ASA, basit bir el aleti üreticisinden öte, hassasiyetli elektrikli ve pnömatik tornavida sistemlerinin küresel bir lideri haline gelmiştir.
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
            <img 
              src={asaImg?.image_path || '/endus.jpg'} 
              alt={asaImg?.alt_text || 'ASA Ürünleri'} 
              className="rounded-box shadow-xl w-full object-contain" 
              loading="lazy" 
            />
          </motion.div>
        </motion.section>
      </div>

  {/* Delta Regis - Açık Gri Arkaplan - Görsel Solda */}
  <div className="bg-[#e0e0e0] py-16">
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
            <img 
              src={deltaRegisImg?.image_path || '/professional_banner.png'} 
              alt={deltaRegisImg?.alt_text || 'Delta Regis Ürünleri'} 
              className="rounded-box shadow-xl w-full object-contain" 
              loading="lazy" 
            />
          </motion.div>
          <div className="text-left">
            <div className="badge badge-primary mb-3">Yetkili Distribütör</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Delta Regis</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Delta Regis Tools Inc., endüstriyel montaj ve üretim süreçlerinde güvenilirliği ve hassasiyeti temsil eden, Amerika merkezli lider bir markadır. 20 yılı aşkın süredir, dünya çapındaki üretim tesislerinin en zorlu gereksinimlerini karşılamak üzere tasarlanmış tork kontrollü elektrikli el aletleri, tork ölçüm cihazları ve aksesuarları sunar.
            </p>
            <div className="mt-6 flex justify-start">
              <ScrollToTopLink to="/hakkimizda/delta-regis" className="btn btn-primary">Detay</ScrollToTopLink>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
