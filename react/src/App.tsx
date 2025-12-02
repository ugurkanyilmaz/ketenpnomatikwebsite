import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { sendPageView } from './utils/google_codes'
import { AuthProvider } from './utils/auth'
import RequireAuth from './pages/admin/RequireAuth'
import AdminLogin from './pages/admin/Login'
import HomePage from './pages/home_page'
import Categories_page from './pages/categories_page'

// Lazy load Zasche pages
const ManiplatorlerPage = lazy(() => import('./pages/zasche/ManiplatorlerPage'))
const ZascheManipulatorlerPage = lazy(() => import('./pages/zasche/ZascheManipulatorlerPage'))
const ZascheKaldirmaEkipmanlariPage = lazy(() => import('./pages/zasche/ZascheKaldirmaEkipmanlariPage'))
const ZascheAsmaVincPage = lazy(() => import('./pages/zasche/ZascheAsmaVincPage'))
const ZascheOzelEkipmanlarPage = lazy(() => import('./pages/zasche/ZascheOzelEkipmanlarPage'))
const ZascheProductDetail = lazy(() => import('./pages/zasche/ZascheProductDetail'))

import Subcategories from './pages/subcategories'
import Series from './pages/series'
import Article from './pages/article'
import ProductDetails from './pages/product_details'
import ContactPage from './pages/ContactPage'
import DemoRequestPage from './pages/DemoRequestPage'
import TechnicalServicePage from './pages/TechnicalServicePage'
import Urunler from './pages/urunler'
// About page removed; using Distributorluk as Hakkımızda
import FAQ from './pages/FAQ'
import Hakkimizda from './pages/Hakkimizda'
import DistributorlukIndex from './pages/distributorluk/Index'
import Kolver from './pages/distributorluk/Kolver'
import Hiyoki from './pages/distributorluk/Hiyoki'
import Apac from './pages/distributorluk/Apac'
import Hawanox from './pages/distributorluk/Hawanox'
import Asa from './pages/distributorluk/Asa'
import DeltaRegis from './pages/distributorluk/DeltaRegis'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import NotFound from './pages/NotFound'


// Admin Pages
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import CategoryManagement from './pages/admin/CategoryManagement'
import CategoryPhotos from './pages/admin/CategoryPhotos'
import SiteImagesAdmin from './pages/admin/SiteImagesAdmin'
import ProductManagement from './pages/admin/ProductManagement'
import BlogManagement from './pages/admin/BlogManagement'
import DemoRequestsAdmin from './pages/admin/DemoRequests'


function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    // send page_view on route change
    sendPageView(location.pathname + (location.search || ''))
  }, [location])

  return (
    <AuthProvider>
      <div data-theme="keten" className="min-h-dvh flex flex-col bg-base-100 text-base-content">
        <ScrollToTop />
        {!isAdminRoute && <Header sticky={location.pathname !== '/kategoriler/manipulatorler'} />}
        <main className="flex-1">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          }>
            <Routes>
              {/* Admin Routes - No Header/Footer */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
                <Route index element={<Dashboard />} />
                <Route path="kategoriler" element={<CategoryManagement />} />
                <Route path="kategori-fotograflari" element={<CategoryPhotos />} />
                <Route path="site-gorselleri" element={<SiteImagesAdmin />} />
                <Route path="urunler" element={<ProductManagement />} />
                <Route path="bloglar" element={<BlogManagement />} />
                <Route path="demo-talepleri" element={<DemoRequestsAdmin />} />
              </Route>

              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/hakkimizda" element={<Hakkimizda />}>
                <Route index element={<DistributorlukIndex />} />
                <Route path="kolver" element={<Kolver />} />
                <Route path="hiyoki" element={<Hiyoki />} />
                <Route path="apac" element={<Apac />} />
                <Route path="hawanox" element={<Hawanox />} />
                <Route path="asa" element={<Asa />} />
                <Route path="delta-regis" element={<DeltaRegis />} />
              </Route>

              <Route path="/kategoriler" element={<Categories_page />} />
              <Route path="/kategoriler/manipulatorler" element={<ManiplatorlerPage />} />
              <Route path="/kategoriler/manipulatorler/manipulatorler" element={<ZascheManipulatorlerPage />} />
              <Route path="/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler" element={<ZascheKaldirmaEkipmanlariPage />} />
              <Route path="/kategoriler/manipulatorler/asma-vinc-sistemleri" element={<ZascheAsmaVincPage />} />
              <Route path="/kategoriler/manipulatorler/ozel-ekipmanlar" element={<ZascheOzelEkipmanlarPage />} />

              {/* Product Pages */}
              {/* Product Pages - Generic Route */}
              <Route path="/kategoriler/manipulatorler/manipulatorler/:id" element={<ZascheProductDetail />} />
              <Route path="/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler/:id" element={<ZascheProductDetail />} />
              <Route path="/kategoriler/manipulatorler/asma-vinc-sistemleri/:id" element={<ZascheProductDetail />} />
              <Route path="/kategoriler/manipulatorler/ozel-ekipmanlar/:id" element={<ZascheProductDetail />} />

              {/* Redirect old spelling to new */}
              <Route path="/kategoriler/maniplatorler" element={<Navigate to="/kategoriler/manipulatorler" replace />} />
              {/* Legacy redirects: map old links to new targets */}
              <Route
                path="/kategoriler/endustriyel/kolver-elektrikli-sikicilar/*"
                element={<Navigate to="https://www.ketenpnomatik.com/kategoriler/endustriyel/kolver-elektrikli-tornavidalar/" replace />}
              />
              <Route path="/urunler" element={<Urunler />} />
              <Route path="/kategoriler/:tier" element={<Subcategories />} />
              <Route path="/kategoriler/:tier/:categoryId" element={<Series />} />
              <Route path="/kategoriler/:tier/:categoryId/:seriesId" element={<Article />} />
              <Route path="/seri/:seriesId" element={<Article />} />
              <Route path="/urun/:sku" element={<ProductDetails />} />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/demo-talebi" element={<DemoRequestPage />} />
              <Route path="/teknik-servis" element={<TechnicalServicePage />} />
              <Route path="/sss" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />


              {/* 404 - Catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </AuthProvider>
  )
}

export default App
