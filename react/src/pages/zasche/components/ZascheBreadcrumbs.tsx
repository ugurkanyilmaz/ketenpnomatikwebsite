import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import type { ZascheProduct } from '../../../data/zascheProducts'

interface ZascheBreadcrumbsProps {
    product: ZascheProduct;
}

export default function ZascheBreadcrumbs({ product }: ZascheBreadcrumbsProps) {
    const categoryMap: Record<string, { name: string, url: string }> = {
        'kaldirma': { name: 'Kaldırma Ekipmanları', url: '/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler' },
        'manipulatorler': { name: 'Manipülatörler', url: '/kategoriler/manipulatorler/manipulatorler' },
        'asmavinc': { name: 'Asma Vinç Sistemleri', url: '/kategoriler/manipulatorler/asma-vinc-sistemleri' },
        'ozelcozumler': { name: 'Özel Ekipmanlar', url: '/kategoriler/manipulatorler/ozel-ekipmanlar' }
    }

    const category = product.categoryId ? categoryMap[product.categoryId] : null

    return (
        <nav className="bg-gray-100 py-3 px-4 border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                <Link to="/" className="flex items-center hover:text-primary transition-colors">
                    <Home className="w-4 h-4 mr-1" />
                    Ana Sayfa
                </Link>

                <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />

                <Link to="/kategoriler/manipulatorler" className="hover:text-primary transition-colors">
                    Zasche Handling
                </Link>

                {category && (
                    <>
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
                        <Link to={category.url} className="hover:text-primary transition-colors">
                            {category.name}
                        </Link>
                    </>
                )}

                <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />

                <span className="font-medium text-gray-900 truncate">
                    {product.title}
                </span>
            </div>
        </nav>
    )
}
