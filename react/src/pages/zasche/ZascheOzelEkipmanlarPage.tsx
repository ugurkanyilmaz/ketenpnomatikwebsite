import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Weight, MoveVertical } from 'lucide-react'
import ZascheHeader from '../../components/ZascheHeader'
import zashceLogo from './zashceLogo.svg'
import { zascheProducts } from '../../data/zascheProducts'

import { buildZascheSEO, applyZascheSEO } from '../../utils/zasche_seo'
import { useEffect } from 'react'

export default function ZascheOzelEkipmanlarPage() {
    useEffect(() => {
        const products = zascheProducts.filter(p => p.categoryId === 'ozelcozumler')
        const seoProducts = products.map(p => ({
            name: p.title,
            url: p.link || '',
            image: p.gallery.thumbnails[0] || '',
            description: p.heroDescription
        }))
        applyZascheSEO(buildZascheSEO('category_ozelcozumler', { products: seoProducts }))
    }, [])

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
                            Özel Ekipmanlar
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-600 max-w-3xl mx-auto"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Spesifik ihtiyaçlar için özelleştirilmiş taşıma çözümleri.
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
                            <video
                                width="100%"
                                height="100%"
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                                className="absolute inset-0 w-full h-full object-cover"
                            >
                                <source src="/zasche_videos/ozelcozumler.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sub-products Grid */}
            <section id="products" className="py-24 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ürün Çeşitleri</h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                id: 'semi-auto',
                                title: 'Yarı Otomasyon',
                                subtitle: 'Semi-automation',
                                heroDescription: 'İlk bakışta tersine gibi görünse de, bazı üreticiler tam otomasyon yerine yarı otomatik çözümlerden daha fazla fayda sağlayabilir. Yarı otomasyonda süreç kararlılığı, hassas pozisyonlama ve yüksek hareket hızları gibi otomasyon avantajlarını insan operatörün beceri ve sezgisiyle birleştiririz.',
                                specs: {},
                                gallery: { thumbnails: [] }
                            } as unknown as import('../../data/zascheProducts').ZascheProduct,
                            ...zascheProducts.filter(p => p.categoryId === 'ozelcozumler')
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-md"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                            >
                                {item.link && (
                                    <Link
                                        to={item.link}
                                        className="absolute inset-0 z-20"
                                        aria-label={item.title}
                                    />
                                )}
                                <div className="aspect-[4/3] bg-white relative overflow-hidden p-4">
                                    <img
                                        src={item.gallery?.thumbnails?.[0] || `https://placehold.co/800x600/e2e8f0/1e293b?text=${encodeURIComponent(item.title)}`}
                                        alt={item.title}
                                        className="w-full h-full object-contain transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <h4 className="text-lg font-medium text-gray-500 mb-4">{item.subtitle}</h4>
                                    )}
                                    <p className="text-gray-600 leading-relaxed mb-6 flex-1">{item.heroDescription}</p>

                                    <div className="space-y-3 border-t border-gray-100 pt-6">
                                        {item.specs?.load && (
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <Weight className="w-5 h-5 text-primary" />
                                                <span className="font-medium">max. {item.specs.load}</span>
                                            </div>
                                        )}
                                        {item.specs?.lift && (
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <MoveVertical className="w-5 h-5 text-primary" />
                                                <span className="font-medium">max. {item.specs.lift}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                                            Ürünü Görüntüle
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
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
                                image: '/maniplatorler.jpg'
                            },
                            {
                                title: 'Kaldırma Ekipmanları',
                                link: '/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler',
                                image: '/kaldirma_sistemleri.jpg'
                            },
                            {
                                title: 'Asma Vinç Sistemleri',
                                link: '/kategoriler/manipulatorler/asma-vinc-sistemleri',
                                image: '/asmavincsistemleri.jpg'
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
                                        loading="lazy"
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
