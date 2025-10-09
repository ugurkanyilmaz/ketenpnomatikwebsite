import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Mail, Package } from 'lucide-react'
import { buildProductSEO, applySEOToHead, type ProductSEOData } from '../utils/product_seo'

interface Product {
  id: number
  url: string
  parent: string
  child: string
  subchild: string
  title: string
  sku: string
  paragraph: string
  description: string
  brand: string
  feature1: string
  feature2: string
  feature3: string
  feature4: string
  feature5: string
  feature6: string
  feature7: string
  feature8: string
  feature9: string
  feature10: string
  feature11: string
  main_img: string
  p_img1: string
  p_img2: string
  p_img3: string
  p_img4: string
  p_img5: string
  p_img6: string
  p_img7: string
}

export default function ProductDetails() {
  const { sku } = useParams<{ sku: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (sku) {
      loadProduct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku])

  const loadProduct = async () => {
    try {
      setLoading(true)
      console.log('Loading product with SKU:', sku)
      // Fetch the specific product by SKU
      const res = await fetch(`/php/api/products.php?sku=${sku}`)
      const data = await res.json()
      console.log('Product data received:', data)
      
      if (data.success && data.products && data.products.length > 0) {
        const prod = data.products[0]
        console.log('Current product:', prod)
        console.log('Product subchild:', prod.subchild)
        setProduct(prod)
        
        // Apply SEO metadata
        const seoData = buildProductSEO(prod as ProductSEOData)
        applySEOToHead(seoData)
        
        // Load related products from the same subchild (series)
        if (prod.subchild && prod.subchild.trim() !== '') {
          loadRelatedProducts(prod.subchild, prod.id)
        } else {
          console.log('No subchild found for this product')
        }
      } else {
        console.log('No product found')
        setProduct(null)
      }
    } catch (err) {
      console.error('Failed to load product:', err)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  const loadRelatedProducts = async (subchild: string, currentId: number) => {
    try {
      console.log('Loading related products for subchild:', subchild, 'excluding product ID:', currentId)
      // Fetch products with the same subchild directly from API
      const res = await fetch(`/php/api/products.php?subchild=${encodeURIComponent(subchild)}&limit=20`)
      const data = await res.json()
      console.log('Products fetched for subchild:', data)
      
      if (data.success && data.products) {
        // Filter out current product and limit to 6
        const related = data.products
          .filter((p: Product) => p.id !== currentId)
          .slice(0, 6)
        console.log('Related products after filter:', related.length, related)
        setRelatedProducts(related)
      }
    } catch (err) {
      console.error('Failed to load related products:', err)
    }
  }

  if (loading) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center">
        <Package size={64} className="text-base-content/20 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Ürün Bulunamadı</h2>
        <p className="text-base-content/60 mb-4">Aradığınız ürün mevcut değil.</p>
        <Link to="/urunler" className="btn btn-primary">
          Ürünlere Dön
        </Link>
      </div>
    )
  }

  // Collect all product images
  const images = [
    product.main_img,
    product.p_img1,
    product.p_img2,
    product.p_img3,
    product.p_img4,
    product.p_img5,
    product.p_img6,
    product.p_img7,
  ].filter(Boolean)

  // Parse description for bullet points
  const descriptionLines = product.description?.split('\n').filter(Boolean) || []
  const firstLine = descriptionLines[0] || ''
  const bulletPoints = descriptionLines.slice(1).filter(line => line.trim().startsWith('-'))

  // Parse features for technical table
  const features = [
    product.feature1,
    product.feature2,
    product.feature3,
    product.feature4,
    product.feature5,
    product.feature6,
    product.feature7,
    product.feature8,
    product.feature9,
    product.feature10,
    product.feature11,
  ].filter(Boolean)

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-base-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/urunler">Ürünler</Link></li>
              {product.parent && <li>{product.parent}</li>}
              {product.child && <li>{product.child}</li>}
              {product.subchild && <li>{product.subchild}</li>}
              <li className="font-semibold">{product.title}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery - Order: First on mobile, First on desktop */}
          <div className="order-1">
            <div className="flex gap-4">
              {/* Thumbnail Gallery - Left Side */}
              {images.length > 1 && (
                <div className="flex flex-col gap-2 w-20 flex-shrink-0">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-primary scale-95'
                          : 'border-transparent hover:border-base-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} - Görsel ${index + 1}`}
                        title={`${product.title} - Ürün Görseli ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/200x200?text=No+Image'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Main Image - Right Side */}
              <div 
                className={`relative aspect-square bg-base-200 rounded-lg overflow-hidden group flex-1 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
              {images.length > 0 ? (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={`${product.title} - Detaylı Görünüm`}
                    title={product.title}
                    className="w-full h-full object-contain transition-transform duration-200 ease-out"
                    style={
                      isZoomed
                        ? {
                            transform: 'scale(2)',
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }
                        : undefined
                    }
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/800x800?text=No+Image'
                    }}
                  />
                  {/* Navigation Arrows */}
                  {images.length > 1 && !isZoomed && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  {/* Image Counter */}
                  {images.length > 1 && !isZoomed && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-base-100/80 backdrop-blur px-3 py-1 rounded-full text-sm z-10">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                  {/* Zoom Hint */}
                  {!isZoomed && (
                    <div className="absolute top-4 right-4 bg-base-100/80 backdrop-blur px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      🔍 Yakınlaştırmak için fareyi resmin üzerine getirin
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Package size={96} className="text-base-content/20" />
                </div>
              )}
              </div>
            </div>
          </div>

          {/* Product Info - Order: Second on mobile, Second on desktop */}
          <div className="space-y-5 order-2">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{product.title}</h1>

            {/* Price Request Buttons */}
            <div className="card bg-primary/5 border-2 border-primary">
              <div className="card-body p-4">
                <p className="text-sm text-base-content/70 mb-3">
                  Ürün fiyatı ve detaylı bilgi için teklif alın
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`mailto:info@ketenpnomatik.com?subject=Fiyat Teklifi - ${product.title} (${product.sku})`}
                    className="btn btn-primary btn-sm"
                  >
                    <Mail size={18} />
                    Fiyat Teklifi Al
                  </a>
                  <a
                    href={`https://wa.me/905414526058?text=Merhaba, ${encodeURIComponent(product.title)} (SKU: ${product.sku}) ürünü için fiyat teklifi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Fiyat Teklifi Al
                  </a>
                </div>
              </div>
            </div>

            {/* Description */}
            {(firstLine || bulletPoints.length > 0) && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Ürün Açıklaması</h2>
                <div className="prose max-w-none">
                  {firstLine && (
                    <p className="text-base-content/80">
                      {firstLine.includes(',') ? (
                        <>
                          <span className="font-bold">{firstLine.split(',')[0]}</span>
                          {firstLine.substring(firstLine.indexOf(','))}
                        </>
                      ) : (
                        firstLine
                      )}
                    </p>
                  )}
                  {bulletPoints.length > 0 && (
                    <ul className="space-y-2 mt-3">
                      {bulletPoints.map((point, idx) => {
                        const cleanPoint = point.replace(/^-\s*/, '')
                        const hasColon = cleanPoint.includes(':')
                        return (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="flex-1">
                              {hasColon ? (
                                <>
                                  <span className="font-bold">{cleanPoint.split(':')[0]}:</span>
                                  {cleanPoint.substring(cleanPoint.indexOf(':') + 1)}
                                </>
                              ) : (
                                cleanPoint
                              )}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* SKU and Brand - Bottom */}
            <div className="flex items-center justify-between pt-4 border-t border-base-300">
              {product.sku && (
                <p className="text-sm text-base-content/60 font-mono">
                  SKU: {product.sku}
                </p>
              )}
              {product.brand && (
                <div className="badge badge-primary badge-lg">{product.brand}</div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specifications - Centered Section */}
        {features.length > 0 && (
          <div className="mb-12 flex justify-center">
            <div className="card bg-base-200 w-full max-w-4xl">
              <div className="card-body">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Teknik Özellikler</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <tbody>
                      {features.map((feature, idx) => {
                        const parts = feature.split(':')
                        const label = parts[0]?.trim() || `Özellik ${idx + 1}`
                        const value = parts.slice(1).join(':').trim() || feature
                        return (
                          <tr key={idx}>
                            <td className="font-semibold w-2/5">{label}</td>
                            <td>{value}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paragraph - Full Width Section with Multiple Paragraphs */}
        {product.paragraph && (
          <div className="mb-12">
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Detaylı Açıklama</h2>
                <div className="space-y-4">
                  {product.paragraph.split('\n').filter(p => p.trim()).map((para, idx) => (
                    <p key={idx} className="text-base-content/80 leading-relaxed text-lg">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Products Slider */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Aynı Serideki Ürünler
              {product.subchild && <span className="text-lg font-normal text-base-content/60 ml-2">({product.subchild})</span>}
            </h2>
            <div className="relative">
              <div className="overflow-x-auto scrollbar-hide">
                <div className={`flex gap-4 pb-4 ${relatedProducts.length <= 4 ? 'justify-center' : ''}`}>
                  {relatedProducts.map((relProduct) => (
                    <Link
                      key={relProduct.id}
                      to={`/urun/${relProduct.sku}`}
                      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-full md:w-64"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <figure className="aspect-square bg-base-200">
                        {relProduct.main_img ? (
                          <img
                            src={relProduct.main_img}
                            alt={`${relProduct.title} - ${relProduct.brand || 'Ürün Görseli'}`}
                            title={relProduct.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/400x400?text=No+Image'
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <Package size={64} className="text-base-content/20" />
                          </div>
                        )}
                      </figure>
                      <div className="card-body p-4">
                        {relProduct.brand && (
                          <div className="badge badge-primary badge-sm mb-2">
                            {relProduct.brand}
                          </div>
                        )}
                        <h3 className="card-title text-base line-clamp-2 min-h-[3rem]">
                          {relProduct.title}
                        </h3>
                        {relProduct.sku && (
                          <p className="text-xs text-base-content/60 font-mono">
                            SKU: {relProduct.sku}
                          </p>
                        )}
                        <button className="btn btn-primary btn-sm mt-2">
                          Detay
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
