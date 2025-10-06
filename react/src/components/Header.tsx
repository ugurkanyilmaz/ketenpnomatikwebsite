import { ScrollToTopLink } from './ScrollToTopLink'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-800 border-b border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar px-0 min-h-16">
          <div className="navbar-start gap-2">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 text-white rounded-box w-56">
          <li><ScrollToTopLink to="/" className="w-full inline-block px-3 py-2 rounded hover:bg-[#808080]">Ana Sayfa</ScrollToTopLink></li>
          <li><ScrollToTopLink to="/hakkimizda" className="w-full inline-block px-3 py-2 rounded hover:bg-[#808080]">Hakkımızda</ScrollToTopLink></li>
          <li><ScrollToTopLink to="/kategoriler" className="w-full inline-block px-3 py-2 rounded hover:bg-[#808080]">Kategoriler</ScrollToTopLink></li>
          <li><ScrollToTopLink to="/iletisim" className="w-full inline-block px-3 py-2 rounded hover:bg-[#808080]">İletişim</ScrollToTopLink></li>
          <li><ScrollToTopLink to="/teknik-servis" className="w-full inline-block px-3 py-2 rounded hover:bg-[#808080]">Teknik Servis</ScrollToTopLink></li>
                </ul>
            </div>
            <ScrollToTopLink to="/" aria-label="Keten Pnömatik" className="flex items-center gap-2">
              <img src="/ketenlogoson.fw_.png" alt="Keten Pnömatik" className="h-8 md:h-10 w-auto" />
            </ScrollToTopLink>
          </div>
          <div className="navbar-center hidden lg:flex mr-6">
            <ul className="menu menu-horizontal px-1 gap-1">
              <li className="h-full"><ScrollToTopLink to="/" className="-mt-px h-full flex items-center w-full px-4 text-white hover:bg-[#808080]">Ana Sayfa</ScrollToTopLink></li>
              <li className="h-full"><ScrollToTopLink to="/hakkimizda" className="-mt-px h-full flex items-center w-full px-4 text-white hover:bg-[#808080]">Hakkımızda</ScrollToTopLink></li>
              <li className="h-full"><ScrollToTopLink to="/kategoriler" className="-mt-px h-full flex items-center w-full px-4 text-white hover:bg-[#808080]">Kategoriler</ScrollToTopLink></li>
              <li className="h-full"><ScrollToTopLink to="/iletisim" className="-mt-px h-full flex items-center w-full px-4 text-white hover:bg-[#808080]">İletişim</ScrollToTopLink></li>
              <li className="h-full"><ScrollToTopLink to="/teknik-servis" className="-mt-px h-full flex items-center w-full px-4 text-white hover:bg-[#808080]">Teknik Servis</ScrollToTopLink></li>
            </ul>
          </div>
          <div className="navbar-end gap-4 ml-auto justify-end translate-x-8 lg:translate-x-12">
            <div className="form-control hidden md:block">
              <input type="text" placeholder="Ara: darbeli tabanca, kompresör..." className="input input-bordered w-64 md:w-64 lg:w-72 rounded-full bg-slate-700 text-white border-slate-600" />
            </div>
            <ScrollToTopLink to="/demo-talebi" className="btn btn-primary rounded-full">Demo Talebi</ScrollToTopLink>
            <ScrollToTopLink to="/sss" className="btn btn-ghost rounded-full text-white">SSS</ScrollToTopLink>
          </div>
        </div>
      </div>
    </header>
  );
}


