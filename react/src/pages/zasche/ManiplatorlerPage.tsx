import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import panoramaImage from './ZASCHE_Panorama_03.jpg'
import zashceLogo from './zashceLogo.svg'
import ZascheHeader from '../../components/ZascheHeader'

export default function ManiplatorlerPage() {
    return (
        <div className="bg-base-100">
            {/* ZASCHE Header */}
            <ZascheHeader backgroundImage={panoramaImage} logo={zashceLogo} />

            {/* Hero Section with Panoramic Image */}
            <motion.section
                className="relative w-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative w-full" style={{ height: '400px' }}>
                    <img
                        src={panoramaImage}
                        alt="Manipülatörler - ZASCHE Panorama"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />
                    {/* Overlay gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Hero Text */}
                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-white mb-2"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                Manipülatörler
                            </motion.h1>
                            <motion.p
                                className="text-lg text-white/90"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                Endüstriyel otomasyon için güçlü ve hassas çözümler
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.section>



            {/* Manipülatörler Nedir Section */}
            <motion.section
                className="bg-white py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        {/* Left: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="rounded-xl overflow-hidden shadow-xl">
                                <img
                                    src="https://placehold.co/800x600/1a56db/white?text=Manipulator"
                                    alt="Manipülatör Sistemi"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>

                        {/* Right: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Manipülatörler Nedir?
                            </h2>
                            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                                <p>
                                    Manipülatörler, endüstriyel üretim süreçlerinde ağır yüklerin hassas bir şekilde
                                    taşınması, konumlandırılması ve montajı için kullanılan gelişmiş kaldırma ve
                                    dengeleme sistemleridir.
                                </p>
                                <p>
                                    ZASCHE manipülatörleri, operatör güvenliğini maksimuma çıkarırken, üretim
                                    verimliliğini artıran ergonomik çözümler sunar. Pnömatik veya elektrik tahrikli
                                    sistemler sayesinde, ağır parçalar neredeyse ağırlıksız hale gelir ve operatör
                                    minimum çaba ile hassas montaj işlemlerini gerçekleştirebilir.
                                </p>
                                <div className="pt-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Avantajlar:</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary mt-1">✓</span>
                                            <span>Ergonomik çalışma ortamı ve operatör güvenliği</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary mt-1">✓</span>
                                            <span>Yüksek hassasiyet ve tekrarlanabilirlik</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary mt-1">✓</span>
                                            <span>Üretim verimliliğinde artış</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary mt-1">✓</span>
                                            <span>Özelleştirilebilir ve modüler yapı</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Virtual Showroom Iframe */}
            <motion.section
                className="bg-gray-50 py-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sanal Showroom</h2>
                        <p className="text-gray-600">
                            360° sanal tur ile ürünlerimizi keşfedin
                        </p>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-2xl relative group">
                        <iframe
                            src="https://www.zasche.de/virtual_Showroom/en/"
                            width="100%"
                            height="700"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="ZASCHE Virtual Showroom"
                            className="w-full"
                        />
                        {/* Overlay Button to hijack Zasche contact button */}
                        <Link
                            to="/iletisim"
                            className="absolute bottom-4 right-4 z-10 btn btn-primary shadow-lg gap-2"
                            style={{ minWidth: '140px' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            İletişime Geç
                        </Link>
                    </div>
                </div>
            </motion.section>

            {/* Products Section */}
            <section id="products" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ürünlerimiz</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            İhtiyacınıza uygun manipülatör ve kaldırma çözümlerini keşfedin
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link
                            to="/kategoriler/manipulatorler/manipulatorler"
                            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                                <img
                                    src="https://placehold.co/1920x1080/1a1a1a/ffffff?text=Manipulatorler"
                                    alt="Manipülatörler"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    Manipülatörler
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    Endüstriyel yük taşıma ve pozisyonlama için ergonomik çözümler.
                                </p>
                                <div className="mt-4 flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    İncele
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler"
                            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                                <img
                                    src="https://placehold.co/1920x1080/1a1a1a/ffffff?text=Kaldirma+Ekipmanlari"
                                    alt="Kaldırma Ekipmanları"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    Kaldırma Ekipmanları
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    Hassas ve güvenli yük kaldırma için gelişmiş sistemler.
                                </p>
                                <div className="mt-4 flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    İncele
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/kategoriler/manipulatorler/asma-vinc-sistemleri"
                            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                                <img
                                    src="https://placehold.co/1920x1080/1a1a1a/ffffff?text=Asma+Vinc+Sistemleri"
                                    alt="Asma Vinç Sistemleri"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    Asma Vinç Sistemleri
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    Esnek ve modüler tavan vinç çözümleri.
                                </p>
                                <div className="mt-4 flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    İncele
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/kategoriler/manipulatorler/ozel-ekipmanlar"
                            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                                <img
                                    src="https://placehold.co/1920x1080/1a1a1a/ffffff?text=Ozel+Ekipmanlar"
                                    alt="Özel Ekipmanlar"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    Özel Ekipmanlar
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    Spesifik ihtiyaçlar için özelleştirilmiş taşıma çözümleri.
                                </p>
                                <div className="mt-4 flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    İncele
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Markets We Serve Section */}
            <motion.section
                className="bg-white py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Hizmet Verdiğimiz Sektörler
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Manipülatörlerimiz birçok endüstride güvenle kullanılmaktadır
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Otomotiv', icon: '🚗' },
                            { name: 'Elektrikli Mobilite', icon: '⚡' },
                            { name: 'İnşaat ve Zemin', icon: '🏗️' },
                            { name: 'Kimyasal', icon: '🧪' },
                            { name: 'Baskı', icon: '🖨️' },
                            { name: 'Döküm', icon: '⚙️' },
                            { name: 'Lojistik', icon: '📦' },
                            { name: 'Makine İmalatı', icon: '🔧' },
                            { name: 'Ahşap / Mobilya', icon: '🪵' },
                            { name: 'Metal İşleme', icon: '🔩' },
                            { name: 'Tekstil', icon: '🧵' },
                            { name: 'Temiz Oda', icon: '🔬' }
                        ].map((market, index) => (
                            <motion.div
                                key={market.name}
                                className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-base-200"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="card-body items-center text-center p-6">
                                    <div className="text-4xl mb-3">{market.icon}</div>
                                    <h3 className="card-title text-base font-semibold text-gray-800">
                                        {market.name}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    )
}
