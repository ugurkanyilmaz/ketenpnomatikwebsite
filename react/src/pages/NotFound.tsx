import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-bounce">
                <Search size={80} className="text-primary/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sayfa Bulunamadı
        </h2>
        <p className="text-base-content/60 text-lg mb-8">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          <br />
          URL'yi kontrol edin veya ana sayfaya dönün.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/" className="btn btn-primary btn-lg gap-2">
            <Home size={20} />
            Ana Sayfa
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline btn-lg gap-2"
          >
            <ArrowLeft size={20} />
            Geri Dön
          </button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-base-300">
          <p className="text-sm text-base-content/60 mb-4">Popüler Sayfalar:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/kategoriler" className="badge badge-lg badge-outline hover:badge-primary transition-colors">
              Kategoriler
            </Link>
            <Link to="/urunler" className="badge badge-lg badge-outline hover:badge-primary transition-colors">
              Ürünler
            </Link>
            <Link to="/hakkimizda" className="badge badge-lg badge-outline hover:badge-primary transition-colors">
              Hakkımızda
            </Link>
            <Link to="/iletisim" className="badge badge-lg badge-outline hover:badge-primary transition-colors">
              İletişim
            </Link>
            <Link to="/blog" className="badge badge-lg badge-outline hover:badge-primary transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
