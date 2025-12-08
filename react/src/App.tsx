import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { sendPageView } from './utils/google_codes'
import { AuthProvider } from './utils/auth'
const RequireAuth = lazy(() => import('./pages/admin/RequireAuth'))
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const HomePage = lazy(() => import('./pages/home_page'))
const Categories_page = lazy(() => import('./pages/categories_page'))

// Lazy load Zasche pages
const ManiplatorlerPage = lazy(() => import('./pages/zasche/ManiplatorlerPage'))
const ZascheManipulatorlerPage = lazy(() => import('./pages/zasche/ZascheManipulatorlerPage'))
const ZascheKaldirmaEkipmanlariPage = lazy(() => import('./pages/zasche/ZascheKaldirmaEkipmanlariPage'))
const ZascheAsmaVincPage = lazy(() => import('./pages/zasche/ZascheAsmaVincPage'))
const ZascheOzelEkipmanlarPage = lazy(() => import('./pages/zasche/ZascheOzelEkipmanlarPage'))
const ZascheProductDetail = lazy(() => import('./pages/zasche/ZascheProductDetail'))

const Subcategories = lazy(() => import('./pages/subcategories'))
const Series = lazy(() => import('./pages/series'))
const Article = lazy(() => import('./pages/article'))
const ProductDetails = lazy(() => import('./pages/product_details'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const DemoRequestPage = lazy(() => import('./pages/DemoRequestPage'))
const TechnicalServicePage = lazy(() => import('./pages/TechnicalServicePage'))
const Urunler = lazy(() => import('./pages/urunler'))
// About page removed; using Distributorluk as Hakkımızda
const FAQ = lazy(() => import('./pages/FAQ'))
const Hakkimizda = lazy(() => import('./pages/Hakkimizda'))
const DistributorlukIndex = lazy(() => import('./pages/distributorluk/Index'))
const Kolver = lazy(() => import('./pages/distributorluk/Kolver'))
const Hiyoki = lazy(() => import('./pages/distributorluk/Hiyoki'))
const Apac = lazy(() => import('./pages/distributorluk/Apac'))
const Hawanox = lazy(() => import('./pages/distributorluk/Hawanox'))
const Asa = lazy(() => import('./pages/distributorluk/Asa'))
const DeltaRegis = lazy(() => import('./pages/distributorluk/DeltaRegis'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))


// Admin Pages
// Admin Pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const CategoryManagement = lazy(() => import('./pages/admin/CategoryManagement'))
const CategoryPhotos = lazy(() => import('./pages/admin/CategoryPhotos'))
const SiteImagesAdmin = lazy(() => import('./pages/admin/SiteImagesAdmin'))
const ProductManagement = lazy(() => import('./pages/admin/ProductManagement'))
const BlogManagement = lazy(() => import('./pages/admin/BlogManagement'))
const DemoRequestsAdmin = lazy(() => import('./pages/admin/DemoRequests'))


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
