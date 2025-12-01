import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ZascheHeader({ backgroundImage, logo }: { backgroundImage?: string; logo?: string }) {
    return (
        <motion.div
            className="sticky top-0 z-50 border-b border-gray-700 shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gray-900/90"></div>

            <div className="relative max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* ZASCHE Logo */}
                    <Link to="/kategoriler/manipulatorler" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img
                            src={logo || "/src/pages/zasche/zaschelogo.svg"}
                            alt="ZASCHE Logo"
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Navigation Menu */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/kategoriler/manipulatorler"
                            className="text-white hover:text-primary transition-colors font-medium"
                        >
                            Manipülatörler
                        </Link>
                        <a
                            href="#products"
                            className="text-white hover:text-primary transition-colors font-medium"
                        >
                            Ürünlerimiz
                        </a>
                        <Link
                            to="/iletisim"
                            className="text-white hover:text-primary transition-colors font-medium"
                        >
                            İletişim
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="btn btn-ghost btn-sm text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
