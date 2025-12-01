import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ZoomIn } from 'lucide-react'
import ZascheHeader from '../../../components/ZascheHeader'
import zashceLogo from '../zashceLogo.svg'

interface ImageItem {
    id: number;
    src: string;
    title: string;
}

// Başlangıç havuzu - Teleskopik Sistemler için güncellendi
const INITIAL_POOL: ImageItem[] = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    src: `https://placehold.co/400x500/${['e2e8f0', 'cbd5e1', '94a3b8', '64748b'][i % 4]}/1e293b?text=Teleskopik+Sistem+Uygulama+${i + 1}`,
    title: `Uygulama Örneği ${i + 1}`
}));

export default function TelescopicPage() {
    // Ana Galeri State'i
    const [activeImage, setActiveImage] = useState(0)
    const images = [
        "https://placehold.co/600x800/e2e8f0/1e293b?text=Teleskopik+Sistem+Main",
        "https://placehold.co/600x800/e2e8f0/1e293b?text=Teleskopik+Sistem+Detay+1",
        "https://placehold.co/600x800/e2e8f0/1e293b?text=Teleskopik+Sistem+Detay+2",
        "https://placehold.co/600x800/e2e8f0/1e293b?text=Teleskopik+Sistem+Detay+3"
    ]

    // Dinamik Uygulama Örnekleri State'i
    const [displayedApps, setDisplayedApps] = useState<ImageItem[]>(INITIAL_POOL.slice(0, 4));
    const pool1 = useRef<ImageItem[]>(INITIAL_POOL.slice(4));
    const pool2 = useRef<ImageItem[]>([]);
    const [lightboxImage, setLightboxImage] = useState<ImageItem | null>(null);

    // Havuzdan resim seçme fonksiyonu
    const getNextImage = useCallback((currentImage: ImageItem) => {
        if (pool1.current.length === 0) {
            pool1.current = [...pool2.current];
            pool2.current = [];
            pool1.current.sort(() => Math.random() - 0.5);
        }

        if (pool1.current.length === 0) return currentImage;

        const randomIndex = Math.floor(Math.random() * pool1.current.length);
        const newImage = pool1.current[randomIndex];

        pool1.current.splice(randomIndex, 1);
        pool2.current.push(currentImage);

        return newImage;
    }, []);

    useEffect(() => {
        const timeouts = [null, null, null, null] as (ReturnType<typeof setTimeout> | null)[];
        const isMounted = { current: true };

        const scheduleUpdate = (slotIndex: number) => {
            if (!isMounted.current) return;

            const delay = Math.random() * 2000 + 3000;

            timeouts[slotIndex] = setTimeout(() => {
                setDisplayedApps(prev => {
                    const newApps = [...prev];
                    const oldApp = newApps[slotIndex];
                    newApps[slotIndex] = getNextImage(oldApp);
                    return newApps;
                });
                scheduleUpdate(slotIndex);
            }, delay);
        };

        [0, 1, 2, 3].forEach(i => {
            const startDelay = Math.random() * 2000 + 500;
            timeouts[i] = setTimeout(() => scheduleUpdate(i), startDelay);
        });

        return () => {
            isMounted.current = false;
            timeouts.forEach(t => {
                if (t) clearTimeout(t)
            });
        };
    }, [getNextImage]);

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <ZascheHeader backgroundImage="/ZASCHE_Panorama_03_header.jpg" logo={zashceLogo} />

            {/* Hero Section */}
            <motion.section
                className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(https://placehold.co/1920x1080/1a1a1a/ffffff?text=Teleskopik+Kaldirma+Sistemleri)` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
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
                        className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Teleskopik Kaldırma Sistemleri
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-200 font-light max-w-3xl mx-auto"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Düşük tavanlı alanlar ve yüksek tork gereksinimleri için ideal çözüm.
                    </motion.p>
                </div>
            </motion.section>

            {/* Description Section with Gallery */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Kompakt ve <span className="text-primary">Güçlü Tasarım</span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Teleskopik kaldırma cihazlarımız, içten veya dıştan çalışan zincirlere sahip elektrikli vinçler ile manevra kabiliyeti sağlar. 1500 kg'a kadar ağır yükleri ve 5000 Nm'ye kadar büyük torkları karşılamak için tasarlanmıştır.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Özellikle düşük tavan yüksekliğine sahip alanlar (low headroom) için tek veya çift teleskopik seçenekleri mevcuttur. İhtiyaca göre kare kolonlu (TV serisi) veya yuvarlak kolonlu (TR serisi) olarak yapılandırılabilir.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Esnek Entegrasyon</h3>
                            <p className="text-gray-600">
                                Sistemlerimiz, bir ray sistemiyle entegre edilerek hareketli hale getirilebildiği gibi, Z-K2 ağır hizmet tipi pivot kol ile zemine sabitlenerek de kullanılabilir.
                            </p>
                        </div>
                    </motion.div>

                    {/* Gallery Component */}
                    <motion.div
                        className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px]"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Büyük Resim */}
                        <div className="flex-1 min-h-[300px] lg:h-full bg-gray-100 rounded-xl overflow-hidden shadow-lg relative group">
                            <img
                                src={images[activeImage]}
                                alt="Teleskopik Sistem Detay"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Küçük Resimler */}
                        <div className="w-full lg:w-24 flex flex-row lg:flex-col gap-4 h-24 lg:h-full overflow-x-auto lg:overflow-y-auto lg:pr-1 custom-scrollbar">
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`flex-shrink-0 w-24 h-24 lg:w-full lg:h-auto lg:aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Application Examples Section */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Uygulama Örnekleri</h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Teleskopik kaldırma sistemlerinin endüstriyel sahadaki kullanım senaryoları.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayedApps.map((app, i) => (
                            <motion.div
                                key={`${app.id}-${i}`}
                                className="group relative rounded-xl overflow-hidden shadow-md aspect-[4/5] cursor-pointer bg-gray-200"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                onClick={() => setLightboxImage(app)}
                            >
                                <img
                                    src={app.src}
                                    alt={app.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-medium">{app.title}</p>
                                    <ZoomIn className="absolute top-4 right-4 text-white w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-50"
                            onClick={() => setLightboxImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={lightboxImage.src}
                            alt={lightboxImage.title}
                            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-8 left-0 right-0 text-center text-white pointer-events-none">
                            <h3 className="text-xl font-bold">{lightboxImage.title}</h3>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Features & Specs */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">01</span>
                                Tasarım Varyasyonları
                            </h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Asma vinç veya raylı sistemde hareketli (Tavana monte)</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Ağır hizmet tipi pivot kol ile zemine monte</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Kare (TV) veya Yuvarlak (TR) teleskop profili</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">02</span>
                                Kontrol Seçenekleri
                            </h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Hassas yukarı/aşağı kontrol</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Tutucu güvenlik bırakma (safety release)</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Yük düşmesine karşı güvenlik özellikleri</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">03</span>
                                Özellikler / Faydalar
                            </h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Elektro-pnömatik frenler</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Konum tarama (Positioning scanning)</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>X/Y ekseninde tahrik ünitesi (Travel drive)</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Kompakt yapı ile alandan tasarruf</li>
                            </ul>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-4 font-bold text-gray-900">Temel Ünite</th>
                                    <th className="p-4 font-bold text-gray-900">Yük Kapasitesi [kg]</th>
                                    <th className="p-4 font-bold text-gray-900">Strok [mm]</th>
                                    <th className="p-4 font-bold text-gray-900">Yük Flanşı Torku [Nm]</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { unit: 'Z-TR (Yuvarlak)', load: '475', stroke: 1800, torque: 750 },
                                    { unit: 'Z-TV (Kare)', load: '1000', stroke: 2000, torque: 1500 },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-primary">{row.unit}</td>
                                        <td className="p-4">{row.load}</td>
                                        <td className="p-4">{row.stroke}</td>
                                        <td className="p-4">{row.torque}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-4 bg-gray-50 text-sm text-gray-500 border-t border-gray-200">
                            Özel tasarımlar talep üzerine mevcuttur.
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Diğer Manipülatör Çözümleri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link
                            to="/kategoriler/manipulatorler/manipulatorler/mafsalli-kollar"
                            className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-primary"
                        >
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Mafsallı Kollar</h3>
                            <p className="text-gray-400 text-sm mb-4">Ergonomik ve geniş erişimli kaldırma yardımcıları.</p>
                            <span className="text-primary text-sm font-semibold flex items-center gap-2">
                                İncele
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>

                        <Link
                            to="/kategoriler/manipulatorler/manipulatorler/paralelogram-manipulatorler"
                            className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-primary"
                        >
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Paralelogram Manipülatörler</h3>
                            <p className="text-gray-400 text-sm mb-4">Ağır yükler için rijit ve dengeli kaldırma.</p>
                            <span className="text-primary text-sm font-semibold flex items-center gap-2">
                                İncele
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>

                        <Link
                            to="/kategoriler/manipulatorler/manipulatorler/kaldirma-eksenleri"
                            className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-primary"
                        >
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Kaldırma Eksenleri</h3>
                            <p className="text-gray-400 text-sm mb-4">Dikey hareketler için hassas lineer eksenler.</p>
                            <span className="text-primary text-sm font-semibold flex items-center gap-2">
                                İncele
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}