
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import { X, ZoomIn, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'
import ZascheHeader from '../../components/ZascheHeader'
import ZascheBreadcrumbs from './components/ZascheBreadcrumbs'
import zashceLogo from './zashceLogo.svg'
import { zascheProducts } from '../../data/zascheProducts'
import { buildZascheProductSEO, applyZascheProductSEO } from '../../utils/zasche_product_seo'

interface ImageItem {
    id: number;
    src: string;
    title: string;
}

export default function ZascheProductDetail() {
    const { id } = useParams<{ id: string }>();
    const product = zascheProducts.find(p => p.id === id);

    useEffect(() => {
        if (id) {
            applyZascheProductSEO(buildZascheProductSEO(id))
        }
    }, [id])

    // State hooks must be called unconditionally, so we handle the "not found" case after hooks or use a layout effect?
    // Actually, it's better to return early if not found, but hooks order matters.
    // However, if we redirect, the component unmounts.
    // Let's initialize state with defaults even if product is undefined, then redirect.

    const [activeImage, setActiveImage] = useState(0);

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [lightboxZoom, setLightboxZoom] = useState(1);
    const [lightboxSource, setLightboxSource] = useState<'gallery' | 'examples'>('examples'); // Track which source lightbox is showing

    const openLightbox = (index: number, source: 'gallery' | 'examples' = 'examples') => {
        setLightboxSource(source);
        if (source === 'examples') {
            // Find the index in the full list of images
            const img = displayedApps[index];
            const fullIndex = product?.applicationExamples.images.findIndex(i => i.id === img.id) ?? -1;
            if (fullIndex >= 0) {
                setLightboxIndex(fullIndex);
                setLightboxZoom(1);
            }
        } else {
            // For gallery, use the index directly
            setLightboxIndex(index);
            setLightboxZoom(1);
        }
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
        setLightboxZoom(1);
    };

    const nextLightboxImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null && product) {
            const totalImages = lightboxSource === 'gallery' ? product.gallery.thumbnails.length : product.applicationExamples.images.length;
            setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalImages : null));
            setLightboxZoom(1);
        }
    };

    const prevLightboxImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null && product) {
            const totalImages = lightboxSource === 'gallery' ? product.gallery.thumbnails.length : product.applicationExamples.images.length;
            setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalImages) % totalImages : null));
            setLightboxZoom(1);
        }
    };

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLightboxZoom(prev => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLightboxZoom(prev => Math.max(prev - 0.5, 1));
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;

            if (e.key === 'ArrowRight') nextLightboxImage();
            if (e.key === 'ArrowLeft') prevLightboxImage();
            if (e.key === 'Escape') closeLightbox();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex]);

    // Initialize pool based on product or empty if not found
    const initialPool: ImageItem[] = product ? product.applicationExamples.images : [];

    const [displayedApps, setDisplayedApps] = useState<ImageItem[]>(initialPool.slice(0, 4));
    const pool1 = useRef<ImageItem[]>(initialPool.slice(4));
    const pool2 = useRef<ImageItem[]>([]);
    const selectionLock = useRef<boolean>(false); // Lock to prevent race conditions

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setActiveImage(0);
            const allImages = product.applicationExamples.images;
            setDisplayedApps(allImages.slice(0, 4));
            pool1.current = allImages.slice(4);
            pool2.current = [];
        }
    }, [product]);

    const getNextImage = useCallback((currentImage: ImageItem): ImageItem => {
        // Wait for lock to be released (with timeout to prevent infinite loop)
        let attempts = 0;
        while (selectionLock.current && attempts < 10) {
            attempts++;
            // In a real scenario, we'd use a Promise, but for simplicity we just check
        }

        // Acquire lock
        selectionLock.current = true;

        try {
            // If pool1 is empty, move all from pool2 to pool1 and shuffle
            if (pool1.current.length === 0) {
                pool1.current = [...pool2.current];
                pool2.current = [];
                pool1.current.sort(() => Math.random() - 0.5);
            }

            // Safety check: if still empty, return current image
            if (pool1.current.length === 0) return currentImage;

            // Select random image from pool1
            const randomIndex = Math.floor(Math.random() * pool1.current.length);
            const newImage = pool1.current[randomIndex];

            // Remove from pool1 and add old image to pool2
            pool1.current.splice(randomIndex, 1);
            pool2.current.push(currentImage);

            return newImage;
        } finally {
            // Release lock
            selectionLock.current = false;
        }
    }, []);

    useEffect(() => {
        if (!product) return;

        const timeouts = [null, null, null, null] as (ReturnType<typeof setTimeout> | null)[];
        const isMounted = { current: true };

        const scheduleUpdate = (slotIndex: number) => {
            if (!isMounted.current) return;

            const delay = Math.random() * 2000 + 3000;

            timeouts[slotIndex] = setTimeout(() => {
                setDisplayedApps(prev => {
                    const newApps = [...prev];
                    const oldApp = newApps[slotIndex];
                    if (oldApp) { // Check if oldApp exists
                        newApps[slotIndex] = getNextImage(oldApp);
                    }
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
    }, [getNextImage, product]);

    if (!product) {
        return <Navigate to="/kategoriler/manipulatorler" replace />;
    }

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <ZascheHeader backgroundImage="/ZASCHE_Panorama_03_header.jpg" logo={zashceLogo} />
            <ZascheBreadcrumbs product={product} />

            {/* Product Title Section (Replaces Hero) */}
            <section className="py-16 px-4 bg-gray-50 border-b border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        className="block text-[#ff8c42] font-bold tracking-widest uppercase mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        ZASCHE HANDLING
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Zasche Endüstriyel {product.title}
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {product.heroDescription}
                    </motion.p>
                </div>
            </section>

            {/* Description Section with Gallery */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2
                            className="text-3xl font-bold text-gray-900 mb-6"
                            dangerouslySetInnerHTML={{ __html: product.mainDescription.title.replace('text-primary', 'text-[#ff8c42]') }}
                        />
                        {product.mainDescription.paragraphs.map((p, idx) => (
                            <p key={idx} className="text-gray-600 text-lg leading-relaxed mb-6">
                                {p}
                            </p>
                        ))}

                        <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.mainDescription.highlightBox.title}</h3>
                            <p className="text-gray-600">
                                {product.mainDescription.highlightBox.content}
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
                        <div
                            className="flex-1 min-h-[300px] lg:h-full bg-gray-100 rounded-xl overflow-hidden shadow-lg relative group cursor-pointer"
                            onClick={() => openLightbox(activeImage, 'gallery')}
                        >
                            <img
                                src={activeImage === 0 ? product.gallery.main : product.gallery.thumbnails[activeImage]}
                                alt={`Zasche Endüstriyel ${product.title} - Detay`}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Zoom icon hint */}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        {/* Küçük Resimler */}
                        <div className="w-full lg:w-24 flex flex-row lg:flex-col gap-4 h-24 lg:h-full overflow-x-auto lg:overflow-y-auto lg:pr-1 custom-scrollbar">
                            {product.gallery.thumbnails.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`flex-shrink-0 w-24 h-24 lg:w-full lg:h-auto lg:aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Zasche Endüstriyel ${product.title} - Detay ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Application Examples Section */}
            {product.applicationExamples.images.length > 0 && (
                <section className="py-20 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.applicationExamples.title}</h2>
                            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                                {product.applicationExamples.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            {displayedApps.map((app, i) => (
                                <motion.div
                                    key={`${app.id}-${i}`}
                                    className="group relative rounded-xl overflow-hidden shadow-md w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[4/5] cursor-pointer bg-gray-200"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    onClick={() => openLightbox(i)}
                                >
                                    <img
                                        src={app.src}
                                        alt={`Zasche Endüstriyel ${product.title} - ${app.title}`}
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
            )
            }

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && product && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
                        onClick={closeLightbox}
                    >
                        {/* Controls */}
                        <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
                            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1 backdrop-blur-sm">
                                <button
                                    onClick={handleZoomOut}
                                    className="p-2 text-white hover:text-primary transition-colors hover:bg-white/10 rounded-md"
                                    title="Zoom Out"
                                >
                                    <Minus className="w-6 h-6" />
                                </button>
                                <span className="text-white text-sm font-medium min-w-[3ch] text-center">{Math.round(lightboxZoom * 100)}%</span>
                                <button
                                    onClick={handleZoomIn}
                                    className="p-2 text-white hover:text-primary transition-colors hover:bg-white/10 rounded-md"
                                    title="Zoom In"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>
                            <button
                                className="p-2 text-white hover:text-primary transition-colors bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm"
                                onClick={closeLightbox}
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-primary transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm z-50"
                            onClick={prevLightboxImage}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-primary transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm z-50"
                            onClick={nextLightboxImage}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Image Container */}
                        <div
                            className="relative w-full h-full flex items-center justify-center overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                key={lightboxIndex}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: lightboxZoom, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                                style={{ cursor: lightboxZoom > 1 ? 'grab' : 'default' }}
                                drag={lightboxZoom > 1}
                                dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                            >
                                <img
                                    src={lightboxSource === 'gallery'
                                        ? (lightboxIndex === 0 ? product.gallery.main : product.gallery.thumbnails[lightboxIndex])
                                        : product.applicationExamples.images[lightboxIndex].src
                                    }
                                    alt={lightboxSource === 'gallery'
                                        ? `${product.title} - Galeri ${lightboxIndex + 1}`
                                        : product.applicationExamples.images[lightboxIndex].title
                                    }
                                    className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain select-none"
                                    draggable={false}
                                />
                            </motion.div>
                        </div>

                        <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                            <h3 className="text-xl font-bold text-white drop-shadow-md mb-2">
                                {lightboxSource === 'gallery'
                                    ? `${product.title} - Galeri`
                                    : product.applicationExamples.images[lightboxIndex].title
                                }
                            </h3>
                            <p className="text-gray-300 text-sm">
                                {lightboxIndex + 1} / {lightboxSource === 'gallery' ? product.gallery.thumbnails.length : product.applicationExamples.images.length}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Features & Specs */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    {(product.features.designVariations.length > 0 || product.features.controlOptions.length > 0 || product.features.benefits.length > 0) && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                            {product.features.designVariations.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-[#ff8c42] text-white flex items-center justify-center text-sm">01</span>
                                        Tasarım Varyasyonları
                                    </h3>
                                    <ul className="space-y-2 text-gray-600">
                                        {product.features.designVariations.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#ff8c42] rounded-full"></span>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {product.features.controlOptions.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-[#ff8c42] text-white flex items-center justify-center text-sm">02</span>
                                        Kontrol Seçenekleri
                                    </h3>
                                    <ul className="space-y-2 text-gray-600">
                                        {product.features.controlOptions.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#ff8c42] rounded-full"></span>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {product.features.benefits.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-[#ff8c42] text-white flex items-center justify-center text-sm">03</span>
                                        Özellikler / Faydalar
                                    </h3>
                                    <ul className="space-y-2 text-gray-600">
                                        {product.features.benefits.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#ff8c42] rounded-full"></span>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {product.technicalTable && product.technicalTable.rows.length > 0 ? (
                        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        {product.technicalTable.headers.map((header, idx) => (
                                            <th key={idx} className="p-4 font-bold text-gray-900">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {product.technicalTable.rows.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            {/* We assume the order of keys in row matches headers, or we just map values. 
                                                Since row is an object, order isn't guaranteed, but usually consistent. 
                                                Better to use Object.values(row) or map headers to keys if we had keys.
                                                For simplicity, let's just map Object.values(row) but that's risky.
                                                Actually, let's just iterate over the values.
                                            */}
                                            {Object.values(row).map((val, vIdx) => (
                                                <td key={vIdx} className={`p-4 ${vIdx === 0 ? 'font-medium text-primary' : ''}`}>{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {product.technicalTable.footer && (
                                <div className="p-4 bg-gray-50 text-sm text-gray-500 border-t border-gray-200">
                                    {product.technicalTable.footer}
                                </div>
                            )}
                        </div>
                    ) : (
                        product.technicalTable?.footer && (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Özel Projelendirme</h4>
                                <p className="text-gray-600">
                                    {product.technicalTable.footer}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* Related Products */}
            <section id="products" className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">İlgili Ürünler</h2>
                        <div className="w-24 h-1 bg-[#ff8c42] mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {product.relatedProducts.map((related, idx) => {
                            const fullData = zascheProducts.find(p => p.id === related.id);
                            const imageSrc = fullData ? fullData.gallery.thumbnails[0] : 'https://placehold.co/600x400?text=No+Image';

                            const link = fullData?.link || '#';

                            return (
                                <Link
                                    key={idx}
                                    to={link}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 hover:border-[#ff8c42]/30"
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden p-6">
                                        <img
                                            src={imageSrc}
                                            alt={related.title}
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ff8c42] transition-colors">
                                            {related.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                            {related.description}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-gray-50">
                                            <span className="inline-flex items-center gap-2 text-[#ff8c42] font-bold text-sm group-hover:gap-3 transition-all">
                                                Ürünü İncele
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div >
    )
}
