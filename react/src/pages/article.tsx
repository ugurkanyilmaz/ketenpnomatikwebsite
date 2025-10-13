import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { fetchArticleRows } from '../utils/api'
import { applyArticleSEOWithProducts, type ArticleSEOData } from '../utils/article_seo'
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

    const slugify = (text: string) => {
      if (!text) return ''
      let s = String(text).toLowerCase()
      s = s.replace(/[ıİ]/g, 'i')
      s = s.replace(/[şŞ]/g, 's')
      s = s.replace(/[ğĞ]/g, 'g')
      s = s.replace(/[üÜ]/g, 'u')
      s = s.replace(/[öÖ]/g, 'o')
      s = s.replace(/[çÇ]/g, 'c')
      s = s.replace(/[^a-z0-9]+/g, '-')
      s = s.replace(/(^-|-$)/g, '')
      return s
    }

    const tryFetch = async () => {
      setLoading(true)
      console.log('[Article] Fetch attempt 1 with subchild (raw):', seriesId)
      try {
        let res = await fetchArticleRows({ parent: tier, child: categoryId, subchild: seriesId })
        if (res.items && res.items.length > 0) {
          setCatRows(res.items)
          setLoading(false)
          return
        }

        const decoded = decodeURIComponent(String(seriesId))
        if (decoded && decoded !== seriesId) {
          console.log('[Article] Fetch attempt 2 with decoded title:', decoded)
          res = await fetchArticleRows({ parent: tier, child: categoryId, subchild: decoded })
          if (res.items && res.items.length > 0) {
            setCatRows(res.items)
            setLoading(false)
            return
          }
        }

        const slug = slugify(decoded || String(seriesId))
        if (slug) {
          console.log('[Article] Fetch attempt 3 with slugified value:', slug)
          res = await fetchArticleRows({ parent: tier, child: categoryId, subchild: slug })
          if (res.items && res.items.length > 0) {
            setCatRows(res.items)
            setLoading(false)
            return
          }
        }

        setCatRows([])
        setLoading(false)
      } catch (err) {
        console.error('[Article] Failed to fetch:', err)
        setCatRows([])
        setLoading(false)
      }
    }

    tryFetch()
  }, [tier, categoryId, seriesId])

  useEffect(() => {
    if (!seriesId && !catRows) return

    const slugify = (text: string) => {
      if (!text) return ''
      let s = String(text).toLowerCase()
      s = s.replace(/[ıİ]/g, 'i')
      s = s.replace(/[şŞ]/g, 's')
      s = s.replace(/[ğĞ]/g, 'g')
      s = s.replace(/[üÜ]/g, 'u')
      s = s.replace(/[öÖ]/g, 'o')
      s = s.replace(/[çÇ]/g, 'c')
      s = s.replace(/[^a-z0-9]+/g, '-')
      s = s.replace(/(^-|-$)/g, '')
      return s
    }

    const tryFetchProducts = async () => {
      setProductsLoading(true)
      try {
        const candidates: Array<string | number> = []
        // prefer server-resolved catRows key if available
        if (catRows && catRows.length > 0) {
          const first = catRows[0]
          const key = first.subchild_id ?? first.subchild ?? first.id ?? first.title
          if (key !== undefined && key !== null) candidates.push(String(key))
        }

        // add route-provided values (raw, decoded, slug)
        if (seriesId) {
          candidates.push(seriesId)
          const decoded = decodeURIComponent(String(seriesId))
          if (decoded && decoded !== seriesId) candidates.push(decoded)
          const slug = slugify(decoded || String(seriesId))
          if (slug) candidates.push(slug)
        }

        // dedupe while preserving order
        const seen = new Set<string>()
        const unique = candidates.map(String).filter((c) => {
          if (seen.has(c)) return false
          seen.add(c)
          return true
        })

        let foundProducts: Product[] = []
        for (const cand of unique) {
          if (!cand || String(cand).trim() === '') continue
          console.log('[Article] Trying products fetch with subchild=', cand)
          const res = await fetch(`/php/api/products.php?subchild=${encodeURIComponent(String(cand))}`)
          const data = await res.json()
          if (data && data.success && Array.isArray(data.products) && data.products.length > 0) {
            foundProducts = data.products
            break
          }
        }

        if (foundProducts.length > 0) setProducts(foundProducts)
        else setProducts([])
      } catch (err) {
        console.error('[Article] Failed to fetch products:', err)
        setProducts([])
      } finally {
        setProductsLoading(false)
      }
    }

    tryFetchProducts()
  }, [seriesId])

  useEffect(() => {
    if (!tier || !categoryId) return
    
    fetchArticleRows({ parent: tier, child: categoryId })
      .then((res) => {
        console.log('[Article] Related series fetched:', res)
        const filtered = res.items
          .filter((item: any) => {
            const itemKey = item.subchild_id ?? item.subchild ?? item.id ?? item.title
            return String(itemKey) !== String(seriesId)
          })
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
      meta_description: cat.meta_desc,
      schema_description: cat.schema_desc,
      keywords: cat.meta_keywords,
      main_img: cat.main_image,
      created_at: cat.created_at,
      updated_at: cat.updated_at
    }

    applyArticleSEOWithProducts(seoData, products)
  }, [cat, products, tier, categoryId, seriesId])

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
        <div className="breadcrumbs text-sm py-4">
          <ul>
            <li><Link to="/">Ana sayfa</Link></li>
            <li><Link to="/kategoriler">Kategoriler</Link></li>
            <li>Seri</li>
          </ul>
        </div>

        <div className="hero rounded-box overflow-hidden shadow mb-6 sm:mb-10">
          <div style={{ position: 'relative', paddingBottom: '33.333%', height: 0 }}>
            <img
              src={cat.main_image && cat.main_image.trim() !== '' ? cat.main_image : `https://picsum.photos/seed/${seriesId}/1200/400`}
              alt={`${cat.title} - Kategori Görseli`}
              title={cat.title}
              width={1200}
              height={400}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="hero-overlay bg-black/50" />
          <div className="hero-content text-neutral-content text-center px-4">
            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{cat.title}</h1>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base">{cat.title_subtext || 'Kategori detayları'}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <main className="lg:col-span-3">
            <article className="prose max-w-none px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{cat.title} Hakkında:</h2>
              <div className="whitespace-pre-line text-sm sm:text-base">
                {cat.about || 'Bu kategori; profesyonel kullanımlar için test edilmiş, dayanıklı malzeme yapısı ve ergonomik tasarımı ile öne çıkar.'}
              </div>
            </article>

            <div className="mt-6 sm:mt-8 grid md:grid-cols-2 gap-4 sm:gap-6 items-start px-2 sm:px-0">
              <div style={{ position: 'relative', paddingBottom: '75%', height: 0 }}>
                <img
                  src={cat?.img1 && cat.img1.trim() !== '' ? cat.img1 : `https://picsum.photos/seed/${seriesId}-hero/600/400`}
                  alt={`${cat.title} - Ürün Detay Görseli`}
                  title={cat.title}
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-contain rounded-box shadow"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col items-stretch gap-2 sm:gap-3 w-full">
                <div className="w-full py-0.5 sm:py-1">
                  <svg className="w-full h-4 sm:h-6 md:h-8" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10 C20 0 40 0 60 10 C80 20 100 10 100 10 L100 0 L0 0 Z" fill="#f97316" />
                  </svg>
                </div>

                <div className="card relative overflow-hidden shadow-xl sm:shadow-2xl" style={{ border: '1px solid #00FF00' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: "url('/blackwood1.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />

                  <div className="card-body p-3 sm:p-4 md:p-6 relative" style={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>
                    <h3 className="card-title text-sm sm:text-base md:text-lg">Öne Çıkan Özellikler</h3>
                    <div className="text-xs sm:text-sm whitespace-pre-line mt-1 sm:mt-2">
                      {cat?.featured || 'Uzun ömürlü ve dayanıklı malzeme\nDüşük titreşim, yüksek tork\nProfesyonel kullanım için ideal'}
                    </div>
                  </div>
                </div>
                <div className="w-full py-0.5 sm:py-1">
                  <svg className="w-full h-4 sm:h-6 md:h-8" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 C20 10 40 10 60 0 C80 -10 100 0 100 0 L100 10 L0 10 Z" fill="#f97316" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 grid lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
              <div className="lg:col-span-2">
                {cat?.info && (
                <div className="card bg-base-200 shadow mb-4 sm:mb-6">
                  <div className="card-body p-4 sm:p-6">
                    <h3 className="card-title text-base sm:text-lg">Seri Bilgileri</h3>
                    <ul className="list-disc pl-4 sm:pl-5 mt-2 text-xs sm:text-sm text-black/80">
                      {cat.info.split('\n').filter((line: string) => line.trim()).map((line: string, idx: number) => (
                        <li key={idx}>{line.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                )}

                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Teknik Özellikler</h2>
                {productsLoading ? (
                  <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                ) : products.length > 0 ? (
                  (() => {
                    const visibleFeatures = Array.from({ length: 11 }, (_, i) => i + 1).filter((num) => {
                      return products.some(p => {
                        const val = p[`feature${num}` as keyof Product]
                        return val && String(val).trim() !== '' && String(val).toUpperCase() !== 'NULL'
                      })
                    })
                    const totalColumns = visibleFeatures.length + 2
                    
                    let textSize = 'text-sm'
                    if (totalColumns > 8) textSize = 'text-xs'
                    if (totalColumns > 10) textSize = 'text-[10px]'
                    
                    return (
                      <div className="rounded-lg shadow-xl border border-base-300 w-full">
                        {/* Responsive table wrapper: allows horizontal scroll on small screens but keeps desktop layout */}
                        <div className="w-full overflow-x-auto touch-pan-x -mx-2 px-2">
                          <table className={`w-full ${textSize} article-table-responsive`} style={{ tableLayout: 'fixed' }}>
                            <thead>
                              <tr className="bg-neutral text-neutral-content">
                                <th className="font-bold px-1 py-3 text-left" style={{ minWidth: '80px' }}>Model (SKU)</th>
                                {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => {
                              const hasFeature = products.some(p => {
                                const featureValue = p[`feature${num}` as keyof Product]
                                return featureValue && String(featureValue).trim() !== '' && String(featureValue).toUpperCase() !== 'NULL'
                              })
                              
                              if (!hasFeature) return null
                              
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

              <div className="space-y-4 sm:space-y-6">
                <div className="card bg-base-200 shadow">
                  <div className="card-body text-black p-4 sm:p-6">
                    <h3 className="card-title text-base sm:text-lg">Seri Özeti</h3>
                    <ul className="list-disc pl-4 sm:pl-5 mt-2 text-xs sm:text-sm text-black/80">
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
                  <div className="card-body text-black p-4 sm:p-6">
                    <h3 className="card-title text-base sm:text-lg">Destek</h3>
                    <p className="text-xs sm:text-sm text-black/80">
                      Teknik belgeler ve kullanım kılavuzları için bizimle iletişime geçin.
                    </p>
                    <div className="mt-3">
                      <a href="/iletisim" className="btn btn-primary btn-sm">İletişim</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {cat?.usable_areas && (
            <div className="mt-8 sm:mt-12 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Nerelerde Kullanılır?</h2>
              <div className="grid gap-3 sm:gap-4 md:gap-6 justify-center"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 260px))', justifyContent: 'center' }}>
                {getUniqueCategoriesFromAreas(cat.usable_areas).map((category) => {
                  const IconComponent = iconMap[category.icon]
                  return (
                    <div key={category.id} className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg hover:shadow-xl transition-shadow max-w-[260px] mx-auto">
                      <div className="card-body p-3 sm:p-4 md:p-6 text-center">
                        <div className="flex justify-center mb-2">
                          {IconComponent && <IconComponent className="text-primary w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />}
                        </div>
                        <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-black leading-tight">{category.title}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            )}

            <div className="mt-8 sm:mt-12 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Nasıl Kullanılır?</h2>
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
                  <div className="card-body text-center p-4 sm:p-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Çalışma Videosu Yakında Eklenecek</h3>
                    <p className="text-xs sm:text-sm text-base-content/70 mb-4">
                      Bu ürünün çalışma videosunu izlemek ve daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.
                    </p>
                    <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                      <Link to="/iletisim" className="btn btn-warning btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        İletişime Geç
                      </Link>
                      <Link to="/demo-talep" className="btn btn-outline btn-warning btn-sm">
                        Demo Talep Et
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {relatedSeries.length > 0 && (
              <div className="mt-8 sm:mt-12 px-2 sm:px-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Aynı Kategorideki Diğer Seriler</h2>
                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  {relatedSeries.map((series) => {
                    const seriesKey = series.subchild_id ?? series.subchild ?? series.id ?? series.title
                    const seriesKeyEncoded = encodeURIComponent(String(seriesKey))
                    const imgSeed = series.subchild_id ?? series.id ?? seriesKey
                    const linkKey = series.id ?? seriesKey
                    const imgUrl = series.main_image && series.main_image.trim() !== '' ? series.main_image : `https://picsum.photos/seed/${encodeURIComponent(String(imgSeed))}/300/225`

                    return (
                      <Link
                        key={linkKey}
                        to={`/kategoriler/${tier}/${categoryId}/${seriesKeyEncoded}`}
                        className="group block rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 border-2 bg-transparent w-full"
                        style={{ borderColor: 'rgba(255,140,66,0.18)' }}
                      >
                        <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
                          <img src={imgUrl} alt={`${series.title} - Seri Görseli`} title={series.title} className="absolute inset-0 w-full h-full object-contain bg-gray-50" onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(String(imgSeed))}/300/225` }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                          <div className="absolute left-3 bottom-3 text-white"><div className="text-sm font-semibold drop-shadow-md">{series.title}</div></div>
                        </div>
                      </Link>
                    )
                  })}
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
        /* Responsive table tweaks */
        .touch-pan-x {
          -webkit-overflow-scrolling: touch; /* smooth scrolling on iOS */
        }

        /* Responsive table: mobile keeps horizontal scroll; desktop uses fixed layout and wraps cells */
        .article-table-responsive {
          border-collapse: collapse;
        }

        .article-table-responsive th,
        .article-table-responsive td {
          white-space: normal !important;
          word-break: break-word !important;
          vertical-align: top;
          padding: 0.5rem 0.5rem;
        }

        /* On larger screens use a fixed table layout so the table adapts to container width */
        @media (min-width: 1024px) {
          .article-table-responsive { table-layout: fixed; }
          .article-table-responsive th:first-child,
          .article-table-responsive td:first-child { width: 12%; min-width: 120px; }
          .article-table-responsive th:not(:first-child),
          .article-table-responsive td:not(:first-child) { width: auto; }
        }
      `}</style>
    </section>
  )
}