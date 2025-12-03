import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import panoramaImage from './ZASCHE_Panorama_03.jpg'
import zashceLogo from './zashceLogo.svg'
import ZascheHeader from '../../components/ZascheHeader'
import { sectors } from '../../data/sectoredata'
import { buildZascheSEO, applyZascheSEO } from '../../utils/zasche_seo'

export default function ManiplatorlerPage() {
    useEffect(() => {
        applyZascheSEO(buildZascheSEO('manipulatorler_home'))
    }, [])

    const [selectedSector, setSelectedSector] = useState<typeof sectors[0] | null>(null)
    const [hoveredSector, setHoveredSector] = useState<number | null>(null)
    const location = useLocation()

    useEffect(() => {
        if (location.hash === '#products') {
            const element = document.getElementById('products')
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        }
    }, [location])

    const marketIcons = ['🚗', '⚡', '🏗️', '🧪', '🖨️', '⚙️', '📦', '🔧', '🪵', '🔩', '🧵', '🔬']

    // Helper to check if mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    return (
        <div className="bg-base-100">
            {/* ZASCHE Header */}
            <ZascheHeader backgroundImage={panoramaImage} logo={zashceLogo} />

            {/* Hero Section - Desktop Full Width, Mobile Compact Card */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Desktop: Full Width Hero */}
                <div className="hidden md:block relative w-full h-[400px]">
                    <img
                        src={panoramaImage}
                        alt="Manipülatörler - ZASCHE Panorama"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />
                    {/* Overlay gradient */}
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

                {/* Mobile: Compact Card Style */}
                <div className="md:hidden bg-gradient-to-br from-gray-900 to-gray-800 py-6">
                    <div className="px-4 space-y-4">
                        {/* Image Card with proper aspect ratio */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative aspect-[16/9]">
                                <img
                                    src={panoramaImage}
                                    alt="Manipülatörler - ZASCHE Panorama"
                                    className="w-full h-full object-cover object-center"
                                    loading="eager"
                                />
                                {/* Subtle gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold text-white leading-tight">
                                Manipülatörler
                            </h1>
                            <p className="text-base text-white/90">
                                Endüstriyel otomasyon için güçlü ve hassas çözümler
                            </p>
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
                                    src="/mannedir.jpg"
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
                                Manipülatör Nedir?
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
                                    src="/maniplatorler.jpg"
                                    alt="Manipülatörler"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />

                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    Manipülatörler
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    Endüstriyel yük taşıma ve pozisyonlama için ergonomik çözümler.
                                </p>
                                <div className="mt-4 flex items-center text-[#ff8c42] font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
                                    src="/kaldirma_sistemleri.jpg"
                                    alt="Kaldırma Ekipmanları"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    Kaldırma Ekipmanları
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    Hassas ve güvenli yük kaldırma için gelişmiş sistemler.
                                </p>
                                <div className="mt-4 flex items-center text-[#ff8c42] font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
                                    src="/asmavincsistemleri.jpg"
                                    alt="Asma Vinç Sistemleri"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    Asma Vinç Sistemleri
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    Esnek ve modüler tavan vinç çözümleri.
                                </p>
                                <div className="mt-4 flex items-center text-[#ff8c42] font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
                                    src="/ozelcozumler.jpg"
                                    alt="Özel Ekipmanlar"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    Özel Ekipmanlar
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    Spesifik ihtiyaçlar için özelleştirilmiş taşıma çözümleri.
                                </p>
                                <div className="mt-4 flex items-center text-[#ff8c42] font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
                className="bg-white py-16 overflow-visible"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-4 overflow-visible">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Hizmet Verdiğimiz Sektörler
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Manipülatörlerimiz birçok endüstride güvenle kullanılmaktadır
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-visible">
                        {sectors.map((sector, index) => (
                            <div key={sector.title} className="relative">
                                <motion.div
                                    className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 relative cursor-pointer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                    whileHover={{ y: -5 }}
                                    onMouseEnter={() => !isMobile && setHoveredSector(index)}
                                    onMouseLeave={() => !isMobile && setHoveredSector(null)}
                                    onClick={() => setSelectedSector(sector)}
                                >
                                    <div className="card-body items-center text-center p-6">
                                        <div className="text-4xl mb-3">{marketIcons[index]}</div>
                                        <h3 className="card-title text-base font-semibold text-gray-800">
                                            {sector.title}
                                        </h3>
                                    </div>
                                </motion.div>

                                {/* Hover Tooltip Bubble - Desktop Only */}
                                <AnimatePresence>
                                    {hoveredSector === index && !isMobile && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: index < 4 ? -10 : 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: index < 4 ? -10 : 10 }}
                                            transition={{ duration: 0.3 }}
                                            className={`absolute left-1/2 -translate-x-1/2 ${index < 4 ? 'top-full mt-3' : 'bottom-full mb-3'
                                                } w-[350px] max-w-[90vw] z-[9999]`}
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-primary/50">
                                                {/* Image Section */}
                                                <div className="h-36 overflow-hidden relative">
                                                    <img
                                                        src={sector.image}
                                                        alt={sector.title}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                                                    <h4 className="absolute bottom-3 left-4 text-white font-bold text-lg">
                                                        {sector.title}
                                                    </h4>
                                                </div>

                                                {/* Content Section */}
                                                <div className="p-4 max-h-52 overflow-y-auto custom-scrollbar">
                                                    <p className="text-gray-200 text-sm leading-relaxed">
                                                        {sector.description}
                                                    </p>
                                                </div>

                                                {/* Decorative Glow Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none rounded-2xl" />
                                            </div>

                                            {/* Decorative Arrow pointing to card */}
                                            <div className={`absolute left-1/2 -translate-x-1/2 ${index < 4 ? 'bottom-full -mb-1' : 'top-full -mt-1'
                                                }`}>
                                                <div className={`w-0 h-0 ${index < 4
                                                    ? 'border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-900'
                                                    : 'border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-900'
                                                    }`} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Mobile Modal for Sector Details */}
            <AnimatePresence>
                {selectedSector && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSector(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-3 right-3 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                                onClick={() => setSelectedSector(null)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="h-48 relative">
                                <img
                                    src={selectedSector.image}
                                    alt={selectedSector.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                                    {selectedSector.title}
                                </h3>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 leading-relaxed">
                                    {selectedSector.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
