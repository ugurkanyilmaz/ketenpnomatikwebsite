import { IconFacebook, IconWhatsapp, IconSimple } from "../assets/icons/SocialIcons";
import { Link } from 'react-router-dom';
import UrwareLogo from './urware.net_logo.png';

export default function Footer() {
  return (
    <footer className="relative bg-slate-800 text-gray-300 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo + açıklama */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Keten <span className="text-primary">Pnömatik</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Endüstriyel Pnömatik El Aletleri Ve Ekipmanları
          </p>
        </div>

        {/* Link grupları */}
          <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="flex flex-col gap-2">
            <Link to="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link>
            <Link to="/iletisim" className="hover:text-primary transition-colors">İletişim</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/sss" className="hover:text-primary transition-colors">SSS</Link>
            <Link to="/teknik-servis" className="hover:text-primary transition-colors">Teknik Servis</Link>
          </div>
        </div>

        {/* Sosyal medya + Katalog */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Bizi Takip Edin</h3>
            <a 
              href="/katalog.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-md gap-2 px-6 py-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Kataloğu Görüntüle
            </a>
          </div>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/ketenpnomatik" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <IconFacebook size={20} />
            </a>
            <a href="https://wa.me/905414526058" aria-label="WhatsApp" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <IconWhatsapp size={20} />
            </a>
            <a href="https://www.instagram.com/ketenpnomatik" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <IconSimple name="instagram" size={20} />
            </a>
            <a href="https://www.youtube.com/@Keten.Pnomatik/" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <IconSimple name="youtube" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Alt kısım */}
      <div className="border-t border-gray-800 py-4 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        <span>© {new Date().getFullYear()} Keten Pnömatik</span>
      </div>

      {/* Urware small watermark logo (bottom-right) */}
      <div className="absolute right-4 md:right-6" style={{ bottom: 2 }}>
        <a href="https://urware.net" target="_blank" rel="noopener noreferrer" title="urwares.net">
          <img
            src={UrwareLogo}
            alt="Urware"
            className="w-8 md:w-10 h-auto opacity-25 hover:opacity-100 transition-opacity duration-200"
            style={{ filter: 'grayscale(20%)', transform: 'translateY(2px)' }}
          />
        </a>
      </div>
    </footer>
  );
}
