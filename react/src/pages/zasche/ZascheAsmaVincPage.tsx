import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ZascheHeader from '../../components/ZascheHeader'
import zashceLogo from './zashceLogo.svg'
import { zascheProducts } from '../../data/zascheProducts'

export default function ZascheAsmaVincPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <ZascheHeader backgroundImage="/ZASCHE_Panorama_03_header.jpg" logo={zashceLogo} />

            {/* Rich Content Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-16">
                        <motion.span
                            className="block text-primary font-bold tracking-widest uppercase mb-4"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            ZASCHE HANDLING
                        </motion.span>
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Asma Vinç Sistemleri
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-600 max-w-3xl mx-auto"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Esnek ve modüler tavan vinç çözümleri.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Modüler <span className="text-primary">Esneklik</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                ZASCHE asma vinç sistemleri, alüminyum veya çelik profillerden oluşan modüler yapısıyla her türlü bina yapısına uyum sağlar.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Düşük sürtünmeli raylar, yüklerin minimum kuvvetle yatayda hareket ettirilmesine olanak tanır. Mevcut sistemlere kolayca entegre edilebilir ve genişletilebilir yapısıyla gelecekteki ihtiyaçlarınıza da cevap verir.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    'Modüler ve genişletilebilir yapı',
                                    'Düşük sürtünmeli, sessiz hareket',
                                    'Kolay montaj ve bakım',
                                    'Geniş açıklıklarda bile yüksek stabilite',
                                    'Manuel veya elektrikli yürütme seçenekleri'
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
                                title="Zasche Crane Systems Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full object-cover"
                            ></iframe>
                        </motion.div>
                    </div>
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
                            {
                                title: 'Çelik Üstyapı / Vinç Destek Yapısı',
                                subtitle: 'Steel superstructure / crane supporting structure',
                                desc: 'Kendi uzman mühendislerimiz ve sertifikalı kaynak ekibimiz, asma vinç sistemlerini çalıştırmak için özel çelik üstyapılar tasarlayıp kurabilir.',
                                link: '/kategoriler/manipulatorler/manipulatorler/celik-ustyapi-vinc-destek-yapisi',
                                productId: 'celik-ustyapi-vinc-destek-yapisi'
                            },
                            {
                                title: 'Hafif Vinç Sistemleri',
                                subtitle: 'Light crane systems',
                                desc: 'Gerektiğinde, tek veya çift kirişli hafif vinç sistemleri, manipülatörler ve kaldırma ekipmanları gibi bileşenlerimizle kombine edilebilir.',
                                link: '/kategoriler/manipulatorler/manipulatorler/hafif-vinc-sistemleri',
                                productId: 'hafif-vinc-sistemleri'
                            },
                            {
                                title: 'Pergel Vinçler',
                                subtitle: 'Slewing cranes',
                                desc: 'Duvara veya zemine monte pergel vinçler, halat dengeleyiciler veya zincirli vinçlerle birleştirilerek basit taşıma operasyonlarını yönetebilir.',
                                link: '/kategoriler/manipulatorler/manipulatorler/pergel-vincler',
                                productId: 'pergel-vincler'
                            }
                        ].map((item, index) => (
                            <Link
                                to={item.link}
                                key={index}
                                onClick={() => window.scrollTo(0, 0)}
                                className="block h-full"
                            >
                                <motion.div
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="aspect-[4/3] bg-white relative overflow-hidden p-4">
                                        <img
                                            src={zascheProducts.find(p => p.id === item.productId)?.gallery.thumbnails[0] || `https://placehold.co/800x600/e2e8f0/1e293b?text=${encodeURIComponent(item.title)}`}
                                            alt={item.title}
                                            className="w-full h-full object-contain transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#ff8c42] transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="text-sm font-medium text-gray-500 mb-4 block uppercase tracking-wider">
                                            {item.subtitle}
                                        </span>
                                        <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                            {item.desc}
                                        </p>
                                        <div
                                            className="inline-flex items-center justify-center w-full py-3 px-6 bg-gray-100 text-gray-900 font-bold rounded-xl group-hover:bg-[#ff8c42] group-hover:text-white transition-all duration-300 group/btn"
                                        >
                                            Ürünü İncele
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Categories Section */}
            <section className="py-24 px-4 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Diğer Kategoriler</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Manipülatörler',
                                link: '/kategoriler/manipulatorler/manipulatorler',
                                image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Manipulatorler'
                            },
                            {
                                title: 'Kaldırma Ekipmanları',
                                link: '/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler',
                                image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Kaldirma+Ekipmanlari'
                            },
                            {
                                title: 'Özel Ekipmanlar',
                                link: '/kategoriler/manipulatorler/ozel-ekipmanlar',
                                image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Ozel+Ekipmanlar'
                            }
                        ].map((category, index) => (
                            <Link
                                key={index}
                                to={category.link}
                                onClick={() => window.scrollTo(0, 0)}
                                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <h3 className="text-2xl font-bold text-white text-center drop-shadow-lg">
                                        {category.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
