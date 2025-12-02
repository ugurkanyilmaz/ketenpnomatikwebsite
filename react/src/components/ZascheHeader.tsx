import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function ZascheHeader({ backgroundImage, logo }: { backgroundImage?: string; logo?: string }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                        <Link
                            to="/kategoriler/manipulatorler#products"
                            className="text-white hover:text-primary transition-colors font-medium"
                        >
                            Ürünlerimiz
                        </Link>
                        <Link
                            to="/iletisim"
                            className="text-white hover:text-primary transition-colors font-medium"
                        >
                            İletişim
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            className="btn btn-ghost btn-sm text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-700 bg-gray-900/95 backdrop-blur-sm"
                    >
                        <div className="px-4 py-4 space-y-4">
                            <Link
                                to="/kategoriler/manipulatorler"
                                className="block text-white hover:text-primary transition-colors font-medium text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Manipülatörler
                            </Link>
                            <Link
                                to="/kategoriler/manipulatorler#products"
                                className="block text-white hover:text-primary transition-colors font-medium text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Ürünlerimiz
                            </Link>
                            <Link
                                to="/iletisim"
                                className="block text-white hover:text-primary transition-colors font-medium text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                İletişim
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
