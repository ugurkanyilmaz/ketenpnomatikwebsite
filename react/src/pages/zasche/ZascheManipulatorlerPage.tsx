import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Weight, MoveVertical, Radius, RotateCw } from 'lucide-react'
import ZascheHeader from '../../components/ZascheHeader'
import zashceLogo from './zashceLogo.svg'
import { zascheProducts } from '../../data/zascheProducts'

const products = [
    {
        id: 1,
        title: 'Mafsallı Kollar',
        subtitle: 'Articulated arms',
        description: 'Makine operatörleri için ergonomik bir yardımcı olan mafsallı kollarım ız, halatlı dengeleyicilerle donatılmış olup sütun, kolon veya tavana monte edilebilir.',
        link: '/kategoriler/manipulatorler/manipulatorler/mafsalli-kollar',
        productId: 'mafsalli-kollar',
        specs: {
            load: '160 kg',
            lift: '2000 mm',
            reach: '4000 mm'
        }
    },
    {
        id: 2,
        title: 'Paralelogram Manipülatörler',
        subtitle: 'Parallelogram manipulators',
        description: 'Pnömatik vinçler ve paralelogram yapısının birleşimi olan bu seri, yükleri ağırlıksızmış gibi hissettiren ve mükemmel dengeleme sağlayan bir çözümdür.',
        link: '/kategoriler/manipulatorler/manipulatorler/paralelogram-manipulatorler',
        productId: 'paralelogram-manipulatorler',
        specs: {
            load: '350 kg',
            lift: '1600 mm',
            reach: '3500 mm'
        }
    },
    {
        id: 3,
        title: 'Kaldırma Eksenleri',
        subtitle: 'Lifting axes',
        description: '1000 kg\'a kadar kaldırma kapasitesine sahip kaldırma eksenlerimiz, rijit ve eksantrik yüklemeler için idealdir. Zincirli vinç sistemleriyle entegre edilebilir.',
        link: '/kategoriler/manipulatorler/manipulatorler/kaldirma-eksenleri',
        productId: 'kaldirma-eksenleri',
        specs: {
            load: '1000 kg',
            lift: '1200 mm',
            torque: '2500 Nm'
        }
    },
    {
        id: 4,
        title: 'Teleskopik Kaldırma Cihazları',
        subtitle: 'Telescopic lifting devices',
        description: 'Teleskopik kaldırma cihazları, iç veya dış hareketli zincir mekanizmasına sahip elektrikli vinçler yardımıyla dikey hareket sağlar.',
        link: '/kategoriler/manipulatorler/manipulatorler/teleskopik-kaldirma',
        productId: 'teleskopik-kaldirma',
        specs: {
            load: '1500 kg',
            lift: '2000 mm',
            torque: '5000 Nm'
        }
    },
    {
        id: 5,
        title: 'İstifleme Vinçleri',
        subtitle: 'Stacker crane',
        description: 'Tavan veya zemin montajlı seçenekleri bulunan istifleme vinçlerimiz, ulaşılması zor noktalara erişim ve geniş hareket aralığı gerektiren işlemler için tasarlanmıştır.',
        link: '/kategoriler/manipulatorler/manipulatorler/istifleme-vincleri',
        productId: 'istifleme-vincleri',
        specs: {
            load: '500 kg',
            lift: '3000 mm',
            torque: '2500 Nm'
        }
    },
    {
        id: 6,
        title: 'Zemin Kılavuzlu Taşıma Cihazları',
        subtitle: 'Floor-guided handling devices',
        description: 'Zemin kılavuzlu taşıma cihazlarımız, yüksek kaldırma kapasitesi sunan özel mobil çözümlerdir. Esneklik gerektiren zorlu taşıma operasyonları için idealdir.',
        link: '/kategoriler/manipulatorler/manipulatorler/zemin-kilavuzlu-tasima',
        productId: 'zemin-kilavuzlu-tasima',
        specs: {
            load: '200 kg',
            lift: '800 mm',
            torque: '1500 Nm'
        }
    }
]

export default function ZascheManipulatorlerPage() {
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
                            Manipülatörler
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-600 max-w-3xl mx-auto"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Endüstriyel yük taşıma ve pozisyonlama için ergonomik çözümler.
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
                                Yüklerinizi <span className="text-primary">Hafifletin</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                ZASCHE manipülatörleri, üretim hatlarında ve montaj istasyonlarında operatörlerin ağır yükleri zahmetsizce ve hassas bir şekilde taşımasını sağlar.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Ergonomik tasarımı sayesinde iş kazalarını azaltır, verimliliği artırır ve çalışan sağlığını korur. İster pnömatik ister elektrikli olsun, her türlü yük için özelleştirilebilir çözümler sunuyoruz.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Ergonomik ve güvenli kullanım</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Yüksek hassasiyetli pozisyonlama</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Geniş çalışma yarıçapı</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Düşük bakım gereksinimi</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Modüler ve özelleştirilebilir yapı</span>
                                </div>
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
                                title="Zasche Manipulator Video"
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
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={product.link}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                            >
                                <div className="aspect-[4/3] bg-white relative overflow-hidden p-4">
                                    <img
                                        src={zascheProducts.find(p => p.id === product.productId)?.gallery.thumbnails[0] || `https://placehold.co/800x600/e2e8f0/1e293b?text=${encodeURIComponent(product.title)}`}
                                        alt={product.title}
                                        className="w-full h-full object-contain transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                        {product.title}
                                    </h3>
                                    <h4 className="text-lg font-medium text-gray-500 mb-4">
                                        {product.subtitle}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                                        {product.description}
                                    </p>

                                    <div className="space-y-3 border-t border-gray-100 pt-6">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Weight className="w-5 h-5 text-primary" />
                                            <span className="font-medium">max. {product.specs.load}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <MoveVertical className="w-5 h-5 text-primary" />
                                            <span className="font-medium">max. {product.specs.lift}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700">
                                            {product.specs.reach ? (
                                                <>
                                                    <Radius className="w-5 h-5 text-primary" />
                                                    <span className="font-medium">max. {product.specs.reach}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <RotateCw className="w-5 h-5 text-primary" />
                                                    <span className="font-medium">max. {product.specs.torque}</span>
                                                </>
                                            )}
                                        </div>
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
                                title: 'Kaldırma Ekipmanları',
                                link: '/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler',
                                image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Kaldirma+Ekipmanlari'
                            },
                            {
                                title: 'Asma Vinç Sistemleri',
                                link: '/kategoriler/manipulatorler/asma-vinc-sistemleri',
                                image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Asma+Vinc+Sistemleri'
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
