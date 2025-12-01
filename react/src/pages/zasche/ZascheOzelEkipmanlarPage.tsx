import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ZascheHeader from '../../components/ZascheHeader'
import panoramaImage from './ZASCHE_Panorama_03.jpg'
import zashceLogo from './zashceLogo.svg'

export default function ZascheOzelEkipmanlarPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <ZascheHeader backgroundImage={panoramaImage} logo={zashceLogo} />

            {/* Hero Section */}
            <motion.section
                className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(https://placehold.co/1920x1080/1a1a1a/ffffff?text=Ozel+Ekipmanlar)` }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.span
                        className="block text-primary font-bold tracking-widest uppercase mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        ZASCHE HANDLING
                    </motion.span>
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Özel Ekipmanlar
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Spesifik ihtiyaçlar için özelleştirilmiş taşıma çözümleri.
                    </motion.p>
                </div>
            </motion.section>

            {/* Rich Content Section */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Size Özel <span className="text-primary">Çözümler</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Standart ürünlerin ötesinde, üretim süreçlerinize özel olarak tasarlanmış taşıma ve tutma ekipmanları sunuyoruz.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Karmaşık geometrili parçalar, yüksek sıcaklıklı ortamlar veya özel hijyen gereksinimleri için mühendislik harikası çözümler geliştiriyoruz. Sizin probleminiz, bizim çözümümüzdür.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                'Müşteri ihtiyaçlarına özel tasarım',
                                'Karmaşık parçalar için özel tutucular',
                                'Entegre otomasyon çözümleri',
                                'Zorlu ortam koşullarına dayanıklılık',
                                'Tam kapsamlı mühendislik desteği'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Zasche Special Equipment Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full object-cover"
                        ></iframe>
                    </motion.div>
                </div>
            </section>

            {/* Sub-products Grid */}
            <section className="py-24 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ürün Çeşitleri</h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Takım Taşıma / Takım Panelleri', desc: 'Montaj hatları için alet ve ekipman taşıma sistemleri.' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                                    <img
                                        src={`https://placehold.co/800x600/e2e8f0/1e293b?text=${encodeURIComponent(item.title)}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#ff8c42] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Navigation Footer */}
            <div className="bg-white py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <Link
                        to="/kategoriler/manipulatorler"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium text-lg group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Tüm Kategorilere Dön
                    </Link>
                </div>
            </div>
        </div>
    )
}
