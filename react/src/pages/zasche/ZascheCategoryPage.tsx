import { motion } from 'framer-motion'
import { useParams, Navigate, Link } from 'react-router-dom'
import { zascheCategories } from './zascheData'
import ZascheHeader from '../../components/ZascheHeader'
import panoramaImage from './ZASCHE_Panorama_03.jpg'
import zashceLogo from './zashceLogo.svg'

export default function ZascheCategoryPage() {
    const { categorySlug } = useParams()
    const category = zascheCategories.find(c => c.slug === categorySlug)

    if (!category) {
        return <Navigate to="/kategoriler/manipulatorler" replace />
    }

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <ZascheHeader backgroundImage={panoramaImage} logo={zashceLogo} />

            {/* Hero Section */}
            <motion.section
                className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Background Image with Parallax Effect (Simulated with fixed attachment or scale) */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${category.heroImage})` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        {category.title}
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {category.description}
                    </motion.p>
                </div>
            </motion.section>

            {/* Content Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ürün Çeşitleri</h2>
                        <div className="w-24 h-1 bg-primary mx-auto" />
                    </div>

                    {/* Product Grid - Masonry/Grid Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.subProducts.map((product, index) => (
                            <motion.div
                                key={product.slug}
                                className="group relative bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-default"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                            >
                                {/* Image Placeholder */}
                                <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                                    <img
                                        src={product.image || `https://placehold.co/800x600/e2e8f0/1e293b?text=${encodeURIComponent(product.title)}`}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                        {product.title}
                                    </h3>
                                    {product.description && (
                                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Navigation Footer */}
            <div className="bg-gray-100 py-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <Link
                        to="/kategoriler/manipulatorler"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium text-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Tüm Kategorilere Dön
                    </Link>
                </div>
            </div>
        </div>
    )
}
