import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Image, Package, LogOut } from 'lucide-react'
import { useAuth } from '../../utils/auth'

export default function AdminLayout() {
  const location = useLocation()
  const auth = useAuth()
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/kategoriler', icon: FileText, label: 'Kategoriler' },
    { path: '/admin/kategori-fotograflari', icon: Image, label: 'Kategori Fotoğrafları' },
    { path: '/admin/site-gorselleri', icon: Image, label: 'Site Görselleri' },
    { path: '/admin/urunler', icon: Package, label: 'Ürünler' },
      { path: '/admin/bloglar', icon: FileText, label: 'Blog Yönetimi' },
  ]

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-lg">
        <div className="p-6 border-b border-base-300">
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          <p className="text-sm text-base-content/60 mt-1">Ketenpnomatik.com</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = item.exact 
                ? location.pathname === item.path
                : isActive(item.path)
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-base-200'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-base-300 flex items-center gap-3">
          <button
            onClick={() => { auth.logout() }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
          >
            <LogOut size={20} />
            <span>Çıkış</span>
          </button>
          <Link
            to="/"
            className="ml-auto flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
          >
            <span>Siteye Dön</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
