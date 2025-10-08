import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { fetchArticleRows } from '../utils/api'
import { buildArticleSEO, applySEOToHead, type ArticleSEOData } from '../utils/article_seo'
import { getUniqueCategoriesFromAreas } from '../data/usableAreasMapping'
import { Car, Factory, Settings, Cpu, HardHat, Armchair, Plane, Wrench, PartyPopper, Home, Package, Hammer } from 'lucide-react'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Car, Factory, Settings, Cpu, HardHat, Armchair, Plane, Wrench, PartyPopper, Home, Package, Hammer
}

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
  meta_description: string
  meta_title: string
  schema_description: string
  keywords: string
}

export default function Article() {
  const { seriesId, tier, categoryId } = useParams()
  const [catRows, setCatRows] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [relatedSeries, setRelatedSeries] = useState<any[]>([])

  useEffect(() => {
    if (!tier || !categoryId || !seriesId) {
      setLoading(false)
      return
    }
    
    setLoading(true)
    console.log('[Article] Fetching data with params:', { parent: tier, child: categoryId, subchild: seriesId })
    
    fetchArticleRows({ parent: tier, child: categoryId, subchild: seriesId })
      .then((res) => { 
        console.log('[Article] Received data:', res)
        setCatRows(res.items)
        setLoading(false)
      })
      .catch((err) => {
        console.error('[Article] Failed to fetch:', err)
        setLoading(false)
      })
  }, [tier, categoryId, seriesId])

  // Fetch products with same subcategory
  useEffect(() => {
    if (!seriesId) return
    
    setProductsLoading(true)
    fetch(`/php/api/products.php?subchild=${encodeURIComponent(seriesId)}`)
      .then(res => res.json())
      .then(data => {
        console.log('[Article] Products fetched:', data)
        if (data.success && data.products) {
          setProducts(data.products)
        }
        setProductsLoading(false)
      })
      .catch(err => {
        console.error('[Article] Failed to fetch products:', err)
        setProductsLoading(false)
      })
  }, [seriesId])

  // Fetch related series (other subchildren in the same child category)
  useEffect(() => {
    if (!tier || !categoryId) return
    
    fetchArticleRows({ parent: tier, child: categoryId })
      .then((res) => {
        console.log('[Article] Related series fetched:', res)
        // Filter out current series and limit to 6
        const filtered = res.items
          .filter((item: any) => item.subchild_id !== seriesId)
          .slice(0, 6)
        setRelatedSeries(filtered)
      })
      .catch((err) => {
        console.error('[Article] Failed to fetch related series:', err)
      })
  }, [tier, categoryId, seriesId])

  const cat = useMemo(() => {
    const result = (catRows && catRows[0]) || null
    console.log('[Article] Current cat data:', result)
    return result
  }, [catRows])

  // Apply SEO when category data is available
  useEffect(() => {
    if (!cat) return

    const seoData: ArticleSEOData = {
      id: cat.id || 0,
      tier: tier || 'parent',
      parent_id: tier,
      child_id: categoryId,
      subchild_id: seriesId,
      title: cat.title || 'Kategori',
      meta_title: cat.meta_title,
      meta_description: cat.meta_desc,  // Database field: meta_desc
      schema_description: cat.schema_desc,  // Database field: schema_desc
      keywords: cat.meta_keywords,  // Database field: meta_keywords
      main_img: cat.main_image,
      created_at: cat.created_at,
      updated_at: cat.updated_at
    }

    const seo = buildArticleSEO(seoData)
    applySEOToHead(seo)
  }, [cat, tier, categoryId, seriesId])

  // Show loading state
  if (loading) {
    return (
      <section className="bg-base-100">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </section>
    )
  }

  // Show error if no data
  if (!cat) {
    return (
      <section className="bg-base-100">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="breadcrumbs text-sm py-4">
            <ul>
              <li><Link to="/">Ana sayfa</Link></li>
              <li><Link to="/kategoriler">Kategoriler</Link></li>
              <li>Bulunamadı</li>
            </ul>
          </div>
          <div className="alert alert-warning">
            Bu kategori bulunamadı. Lütfen <Link to="/kategoriler" className="link">kategorilere</Link> geri dönün.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="breadcrumbs text-sm py-4">
          <ul>
            <li><Link to="/">Ana sayfa</Link></li>
            <li><Link to="/kategoriler">Kategoriler</Link></li>
            <li>Seri</li>
          </ul>
        </div>

        {/* Hero Banner */}
        <div className="hero rounded-box overflow-hidden shadow mb-10">
          <img
            src={cat.main_image && cat.main_image.trim() !== '' ? cat.main_image : `https://picsum.photos/seed/${seriesId}/1200/400`}
            alt={`${cat.title} - Kategori Görseli`}
            title={cat.title}
            className="h-64 w-full object-cover"
          />
          <div className="hero-overlay bg-black/50" />
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold">{cat.title}</h1>
              <p className="mt-4">{cat.title_subtext || 'Kategori detayları'}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column: spans 2 on large screens */}
          <main className="lg:col-span-3">
            <article className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">{cat.title} Hakkında:</h2>
              <div className="whitespace-pre-line">
                {cat.about || 'Bu kategori; profesyonel kullanımlar için test edilmiş, dayanıklı malzeme yapısı ve ergonomik tasarımı ile öne çıkar.'}
              </div>
            </article>

            {/* Ekstra Görsel + Callout */}
            <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
              <img
                src={cat?.img1 && cat.img1.trim() !== '' ? cat.img1 : `https://picsum.photos/seed/${seriesId}-hero/600/400`}
                alt={`${cat.title} - Ürün Detay Görseli`}
                title={cat.title}
                className="rounded-box shadow"
              />
              <div className="flex flex-col items-stretch gap-4 w-full">
                {/* Independent decorative block above the card (orange) */}
                <div className="w-full py-1">
                  <svg className="w-full h-8" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10 C20 0 40 0 60 10 C80 20 100 10 100 10 L100 0 L0 0 Z" fill="#f97316" />
                  </svg>
                </div>

                {/* Filled feature card using blackwood1.jpg as background with dark overlay */}
                <div className="card relative overflow-hidden shadow-2xl" style={{ border: '3px solid #00FF00' }}>
                  {/* Background image */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: "url('/blackwood1.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />

                  <div className="card-body p-6 relative" style={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>
                    <h3 className="card-title">Öne Çıkan Özellikler</h3>
                    <div className="text-sm whitespace-pre-line mt-2">
                      {cat?.featured || 'Uzun ömürlü ve dayanıklı malzeme\nDüşük titreşim, yüksek tork\nProfesyonel kullanım için ideal'}
                    </div>
                  </div>
                </div>
                {/* Independent decorative block below the card (orange) */}
                <div className="w-full py-1">
                  <svg className="w-full h-8" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 C20 10 40 10 60 0 C80 -10 100 0 100 0 L100 10 L0 10 Z" fill="#f97316" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Teknik Özellikler + Sağdaki Kartlar */}
            <div className="mt-10 grid lg:grid-cols-3 gap-6">
              {/* Sol: Tablo */}
              <div className="lg:col-span-2">
                {/* Seri Bilgileri: ayrı bir kart içinde bullet list olarak göster */}
                {cat?.info && (
                <div className="card bg-base-200 shadow mb-6">
                  <div className="card-body">
                    <h3 className="card-title">Seri Bilgileri</h3>
                    <ul className="list-disc pl-5 mt-2 text-sm text-black/80">
                      {cat.info.split('\n').filter((line: string) => line.trim()).map((line: string, idx: number) => (
                        <li key={idx}>{line.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                )}

                <h2 className="text-2xl font-bold mb-4">Teknik Özellikler</h2>
                {productsLoading ? (
                  <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                ) : products.length > 0 ? (
                  (() => {
                    // Count visible columns
                    const visibleFeatures = Array.from({ length: 11 }, (_, i) => i + 1).filter((num) => {
                      return products.some(p => {
                        const val = p[`feature${num}` as keyof Product]
                        return val && String(val).trim() !== '' && String(val).toUpperCase() !== 'NULL'
                      })
                    })
                    const totalColumns = visibleFeatures.length + 2 // +2 for SKU and Detay columns
                    
                    // Dynamic font size based on column count
                    let textSize = 'text-sm'
                    if (totalColumns > 8) textSize = 'text-xs'
                    if (totalColumns > 10) textSize = 'text-[10px]'
                    
                    return (
                      <div className="rounded-lg shadow-xl overflow-hidden border border-base-300 w-full">
                        <div className="w-full">
                          <table className={`w-full ${textSize}`} style={{ tableLayout: 'auto' }}>
                            <thead>
                              <tr className="bg-neutral text-neutral-content">
                                <th className="font-bold px-1 py-3 text-left" style={{ minWidth: '80px' }}>Model (SKU)</th>
                                {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => {
                              // Check if at least one product has this feature filled
                              const hasFeature = products.some(p => {
                                const featureValue = p[`feature${num}` as keyof Product]
                                return featureValue && String(featureValue).trim() !== '' && String(featureValue).toUpperCase() !== 'NULL'
                              })
                              
                              if (!hasFeature) return null
                              
                              // Get the feature name (text before ":")
                              const firstProduct = products.find(p => {
                                const val = p[`feature${num}` as keyof Product]
                                return val && String(val).trim() !== '' && String(val).toUpperCase() !== 'NULL'
                              })
                              const featureText = firstProduct?.[`feature${num}` as keyof Product] as string || ''
                              const featureName = featureText.includes(':') 
                                ? featureText.split(':')[0].trim() 
                                : `Özellik ${num}`
                              
                              return <th key={num} className="font-bold px-1 py-3 text-left">{featureName}</th>
                            })}
                            <th className="px-1 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="bg-base-100">
                          {products.map((product, idx) => (
                            <tr key={product.id} className={`hover:bg-primary/5 transition-colors border-b border-base-200 ${idx % 2 === 0 ? 'bg-base-50' : 'bg-white'}`}>
                              <td className="font-semibold px-1 py-3 text-primary">{product.sku}</td>
                              {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => {
                                const hasFeature = products.some(p => {
                                  const val = p[`feature${num}` as keyof Product]
                                  return val && String(val).trim() !== '' && String(val).toUpperCase() !== 'NULL'
                                })
                                
                                if (!hasFeature) return null
                                
                                const featureValue = product[`feature${num}` as keyof Product] as string || ''
                                // Extract value part (text after ":")
                                const displayValue = featureValue.includes(':')
                                  ? featureValue.split(':').slice(1).join(':').trim()
                                  : featureValue
                                
                                return (
                                  <td key={num} className="px-1 py-3 text-base-content/80">{displayValue || '-'}</td>
                                )
                              })}
                              <td className="px-1 py-3">
                                <Link to={`/urun/${product.sku}`} className="btn btn-primary btn-xs whitespace-nowrap shadow-sm hover:shadow-md transition-shadow">
                                  Detay
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                    )
                  })()
                ) : (
                  <div className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Bu seri için henüz ürün eklenmemiş.</span>
                  </div>
                )}
              </div>

              {/* Sağ: Seri Özeti + Destek */}
              <div className="space-y-6">
                <div className="card bg-base-200 shadow">
                  <div className="card-body text-black">
                    <h3 className="card-title">Seri Özeti</h3>
                    <ul className="list-disc pl-5 mt-2 text-sm text-black/80">
                      {cat?.summary ? (
                        cat.summary.split(';').filter((item: string) => item.trim()).map((item: string, idx: number) => (
                          <li key={idx}>{item.trim()}</li>
                        ))
                      ) : (
                        <>
                          <li>Yüksek tork ve verimlilik</li>
                          <li>Düşük titreşim ve gürültü</li>
                          <li>Ergonomik ve dayanıklı gövde</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="card bg-base-200 shadow">
                  <div className="card-body text-black">
                    <h3 className="card-title">Destek</h3>
                    <p className="text-sm text-black/80">
                      Teknik belgeler ve kullanım kılavuzları için bizimle iletişime geçin.
                    </p>
                    <div className="mt-3">
                      <a href="/iletisim" className="btn btn-primary btn-sm">İletişim</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 - Uygulama Alanları */}
            {cat?.usable_areas && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Nerelerde Kullanılır?</h2>
              <div
                className="grid gap-6"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}
              >
                {getUniqueCategoriesFromAreas(cat.usable_areas).map((category) => {
                  const IconComponent = iconMap[category.icon]
                  return (
                    <div key={category.id} className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="card-body p-6 text-center">
                        <div className="flex justify-center mb-3">
                          {IconComponent && <IconComponent size={48} className="text-primary" />}
                        </div>
                        <h3 className="font-bold text-lg text-black">{category.title}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            )}

            {/* Nasıl Kullanılır? */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Nasıl Kullanılır?</h2>
              {cat?.video_url && cat.video_url.trim() !== '' ? (
                <div className="aspect-video rounded-box overflow-hidden shadow">
                  <iframe
                    className="w-full h-full"
                    src={cat.video_url}
                    title="Çalışma Videosu"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="card bg-gradient-to-br from-warning/10 to-warning/5 shadow-lg border-2 border-warning/20">
                  <div className="card-body text-center">
                    <div className="flex justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Çalışma Videosu Yakında Eklenecek</h3>
                    <p className="text-base-content/70 mb-4">
                      Bu ürünün çalışma videosunu izlemek ve daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <Link to="/iletisim" className="btn btn-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        İletişime Geç
                      </Link>
                      <Link to="/demo-talep" className="btn btn-outline btn-warning">
                        Demo Talep Et
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Demo Talep bölümü */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Demo Talep</h2>
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                    <div className="text-base text-black/80 whitespace-pre-line">
                    Türkiye'nin her yerindeki uzman satış temsilcilerimizden demo talep edin, ürünlerimizi kendi çalışma alanınızda, tamamen size özel bir sunumla, uygulamalı olarak deneyimleyin.

Aklınızdaki tüm soruları yanıtlayacak, size özel çözümleri keşfetmenize rehberlik edecek ve ürünlerimizin gerçek potansiyelini ilk elden görmenizi sağlayacağız.
                    </div>
                  <div className="mt-4 w-full flex justify-center">
                    <Link to="/demo-talep" className="btn btn-primary">Demo Talep Et</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 - İndirilebilir Belgeler */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">İndirilebilir Belgeler</h2>
              <div className="flex gap-4 flex-wrap">
                <a href="/docs/catalog.pdf" className="btn btn-outline btn-sm">Katalog</a>
                <a href="/docs/manual.pdf" className="btn btn-outline btn-sm">Kullanım Kılavuzu</a>
                <a href="/docs/warranty.pdf" className="btn btn-outline btn-sm">Garanti Belgesi</a>
              </div>
            </div>

            {/* İlgili Seriler */}
            {relatedSeries.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Aynı Kategorideki Diğer Seriler
                  {categoryId && <span className="text-lg font-normal text-base-content/60 ml-2">({categoryId})</span>}
                </h2>
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-4 pb-4">
                    {relatedSeries.map((series) => (
                      <Link
                        key={series.id}
                        to={`/kategoriler/${tier}/${categoryId}/${series.subchild_id}`}
                        className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-80"
                      >
                        <figure className="aspect-video bg-base-300">
                          {series.main_image && series.main_image.trim() !== '' ? (
                            <img
                              src={series.main_image}
                              alt={`${series.title} - Seri Görseli`}
                              title={series.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `https://picsum.photos/seed/${series.subchild_id}/400/200`
                              }}
                            />
                          ) : (
                            <img
                              src={`https://picsum.photos/seed/${series.subchild_id}/400/200`}
                              alt={`${series.title} - Seri Görseli`}
                              title={series.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </figure>
                        <div className="card-body">
                          <h3 className="card-title text-lg">{series.title}</h3>
                          {series.paragraph && (
                            <p className="text-sm text-base-content/70 line-clamp-2">
                              {series.paragraph}
                            </p>
                          )}
                          <div className="card-actions justify-end mt-2">
                            <button className="btn btn-primary btn-sm">İncele</button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
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
    </section>
  )
}
