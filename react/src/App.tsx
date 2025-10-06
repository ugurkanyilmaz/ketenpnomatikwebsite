import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home_page'
import Categories_page from './pages/categories_page'
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
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'


function App() {
  return (
    <div data-theme="keten" className="min-h-dvh flex flex-col bg-base-100 text-base-content">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hakkimizda" element={<Hakkimizda />}>
            <Route index element={<DistributorlukIndex />} />
            <Route path="kolver" element={<Kolver />} />
            <Route path="hiyoki" element={<Hiyoki />} />
            <Route path="apac" element={<Apac />} />
          </Route>

          <Route path="/kategoriler" element={<Categories_page />} />
          <Route path="/urunler" element={<Urunler />} />
          <Route path="/kategoriler/:tier" element={<Subcategories />} />
          <Route path="/kategoriler/:tier/:categoryId" element={<Series />} />
          <Route path="/kategoriler/:tier/:categoryId/:seriesId" element={<Article />} />
          <Route path="/seri/:seriesId" element={<Article />} />
          <Route path="/urun/:productId" element={<ProductDetails />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="/demo-talebi" element={<DemoRequestPage />} />
          <Route path="/teknik-servis" element={<TechnicalServicePage />} />
          <Route path="/sss" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          {/* PDF routes temporarily disabled */}
          {/* <Route path="/katalog" element={<PdfViewer />} /> */}
          {/* <Route path="/pdf" element={<PdfViewer />} /> */}
          {/* <Route path="/simple-pdf" element={<SimplePdfViewer />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
