import { Link } from 'react-router-dom'
import { Weight, MoveVertical, Radius, RotateCw } from 'lucide-react'
import { zascheProducts } from '../data/products'

interface ZascheRelatedProductsProps {
    currentProductId: number;
}

export default function ZascheRelatedProducts({ currentProductId }: ZascheRelatedProductsProps) {
    // Filter out the current product and take the first 3 remaining ones (or all of them if we want a grid)
    // The user said "Diğer Manipülatör Çözümleri", usually showing 3 is good, but let's show all others since there are only 6 total.
    const relatedProducts = zascheProducts.filter(p => p.id !== currentProductId);

    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Diğer Manipülatör Çözümleri</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={product.link}
                            className="group bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-700 hover:border-primary"
                        >
                            {/* Image Section */}
                            <div className="aspect-[4/3] bg-gray-700 relative overflow-hidden">
                                <img
                                    src={`https://placehold.co/800x600/1e293b/cbd5e1?text=${encodeURIComponent(product.title)}`}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff8c42] transition-colors">
                                    {product.title}
                                </h3>
                                <h4 className="text-sm font-medium text-gray-400 mb-4">
                                    {product.subtitle}
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                    {product.description}
                                </p>

                                {/* Specs */}
                                <div className="space-y-2 border-t border-gray-700 pt-4 mb-6">
                                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                                        <Weight className="w-4 h-4 text-primary" />
                                        <span>max. {product.specs.load}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                                        <MoveVertical className="w-4 h-4 text-primary" />
                                        <span>max. {product.specs.lift}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                                        {product.specs.reach ? (
                                            <>
                                                <Radius className="w-4 h-4 text-primary" />
                                                <span>max. {product.specs.reach}</span>
                                            </>
                                        ) : (
                                            <>
                                                <RotateCw className="w-4 h-4 text-primary" />
                                                <span>max. {product.specs.torque}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="mt-auto pt-4 border-t border-gray-700 text-center">
                                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                                        İncele
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
    )
}
