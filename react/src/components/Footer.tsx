import { IconFacebook, IconWhatsapp, IconSimple } from "../assets/icons/SocialIcons";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-gray-300 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo + açıklama */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Keten <span className="text-primary">Pnömatik</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Endüstriyel pnömatik el aletleri ve ekipmanları
          </p>
        </div>

        {/* Link grupları */}
          <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="flex flex-col gap-2">
            <Link to="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link>
            <Link to="/iletisim" className="hover:text-primary transition-colors">İletişim</Link>
            <Link to="/teknik-servis" className="hover:text-primary transition-colors">Teknik Servis</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/sss" className="hover:text-primary transition-colors">SSS</Link>
            <a className="hover:text-primary transition-colors">İade & Değişim</a>
            <a className="hover:text-primary transition-colors">KVKK</a>
          </div>
        </div>

        {/* Sosyal medya */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Bizi Takip Edin</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <IconFacebook size={20} />
            </a>
            <a href="https://wa.me/905xxxxxxxxx" aria-label="WhatsApp" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <IconWhatsapp size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
              <IconSimple name="instagram" size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-primary transition-colors">
              <IconSimple name="youtube" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Alt kısım */}
      <div className="border-t border-gray-800 py-4 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-2 px-6">
        <span>© {new Date().getFullYear()} Keten Pnömatik</span>
        <span>React · Tailwind · DaisyUI</span>
      </div>
    </footer>
  );
}
