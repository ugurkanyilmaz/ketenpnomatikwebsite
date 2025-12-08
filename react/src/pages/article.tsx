import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { fetchArticleRows } from '../utils/api'
import { applyArticleSEOWithProducts, type ArticleSEOData } from '../utils/article_seo'
import { getUniqueCategoriesFromAreas, type UsableAreaCategory } from '../data/usableAreasMapping'
import { Car, Factory, Settings, Cpu, HardHat, Armchair, Plane, Wrench, PartyPopper, Home, Package, Hammer } from 'lucide-react'
import { convertToYouTubeEmbed, isYouTubeUrl } from '../utils/youtube'

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

interface ArticleCategory {
  id: number
  parent: string
  child: string
  subchild: string
  subchild_id?: string | number
  title: string
  title_subtext: string
  about: string
  featured: string
  info: string
  summary: string
  usable_areas: string
  more: string
  main_image: string
  img1: string
  video_url: string
  meta_title: string
  meta_desc: string
  schema_desc: string
  meta_keywords: string
  created_at?: string
  updated_at?: string
}

export default function Article() {
  const { seriesId, tier, categoryId } = useParams()
  const navigate = useNavigate()
  // helper: decode slug and make human-friendly label
  const humanize = (s?: string | null) => {
    if (!s) return ''
    try {
      const decoded = decodeURIComponent(String(s))
      // replace hyphens/underscores with space, collapse multiple spaces
      const spaced = decoded.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
      // Title case each word
      return spaced.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    } catch (e) {
      const fallback = String(s).replace(/[-_]+/g, ' ')
      return fallback
    }
  }
  const [catRows, setCatRows] = useState<ArticleCategory[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [relatedSeries, setRelatedSeries] = useState<ArticleCategory[]>([])

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
  }, [seriesId, catRows])

  useEffect(() => {
    if (!tier || !categoryId) return

    fetchArticleRows({ parent: tier, child: categoryId })
      .then((res) => {
        console.log('[Article] Related series fetched:', res)
        const filtered = res.items
          .filter((item: ArticleCategory) => {
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

  const cat = useMemo<ArticleCategory | null>(() => {
    const result = (catRows && catRows[0]) || null
    console.log('[Article] Current cat data:', result)
    return result
  }, [catRows])

  // Return a usable src or empty string; also accept malformed inputs and sanitize them
  const getImgOrFallback = (raw: any, fallback: string) => {
    try {
      if (!raw) return fallback
      let s = String(raw).trim()
      if (s === '' || s.toUpperCase() === 'NULL') return fallback

      // Remove backslash-escapes from JSON-encoded values
      s = s.replace(/\\\//g, '/')
      s = s.replace(/\\/g, '')

      // collapse duplicate protocols like https://https://
      s = s.replace(/^(https?:\/\/)+/i, (m) => m.replace(/(https?:\/\/)+/i, '$1'))

      // If it looks like a protocol-relative path
      if (s.startsWith('//')) s = 'https:' + s

      // If still doesn't start with http and starts with '/', prefix canonical host
      if (!/^https?:\/\//i.test(s) && s.startsWith('/')) {
        // Some APIs return paths like '/uploads/products/...' (missing the '/react/public' segment)
        // Normalize those to the cPanel-visible path used on the site: '/react/public/uploads/...'
        if (s.includes('/uploads/') && s.indexOf('/react/public') === -1) {
          s = 'https://www.ketenpnomatik.com' + '/react/public' + s.replace(/^\/+/, '/')
        } else {
          s = 'https://www.ketenpnomatik.com' + s
        }
      }

      // If hostname is ketenpnomatik.* force canonical host
      try {
        const u = new URL(s)
        if (u.hostname && u.hostname.endsWith('ketenpnomatik.com')) {
          // Ensure the path uses the cPanel-visible '/react/public' prefix when dealing with uploads
          let path = u.pathname || '/'
          if (path.includes('/uploads/') && path.indexOf('/react/public') === -1) {
            // insert '/react/public' before the first '/uploads/' segment
            path = '/react/public' + path.replace(/^\/+/, '/')
          }
          s = 'https://www.ketenpnomatik.com' + path + u.search + u.hash
        }
      } catch (e) {
        // ignore URL parse errors
      }

      // final sanity check
      if (!s || s.toUpperCase() === 'NULL') return fallback
      return s
    } catch (e) {
      return fallback
    }
  }

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
      video_url: cat.video_url,
      created_at: cat.created_at,
      updated_at: cat.updated_at
    }

    applyArticleSEOWithProducts(seoData, products)
  }, [cat, products, tier, categoryId, seriesId])



  // Build exact feature label columns for desktop table.
  // For each product.featureN that contains a colon, we take the exact left-hand side
  // (trimmed) as the column label. If a feature string has no colon, we fall back to
  // the header `Özellik X`. IMPORTANT: do NOT normalize similar labels — different
  // spellings or whitespace produce distinct columns per your requirement.
  const desktopFeatureColumns = useMemo(() => {
    const labels: string[] = []
    const addLabel = (label: string) => {
      if (!labels.includes(label)) labels.push(label)
    }

    for (const p of products) {
      for (let i = 1; i <= 11; i++) {
        const raw = p[`feature${i}` as keyof Product] as unknown as string
        if (!raw) continue
        const v = String(raw).trim()
        if (v === '' || v.toUpperCase() === 'NULL') continue
        const parts = v.split(':')
        if (parts.length > 1) {
          const label = parts[0].trim()
          addLabel(label)
        } else {
          addLabel(`Özellik ${i}`)
        }
      }
    }

    return labels
  }, [products])

  // (usable areas are derived inline where needed via getUniqueCategoriesFromAreas)

  // --- NEW: client-side mobile detection ---
  const [isMobile, setIsMobile] = useState<boolean>(false)
  useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // --- NEW: compact mobile view using same data (minimal, mobile-friendly) ---
  const MobileArticle = ({ cat, products, relatedSeries }: { cat: ArticleCategory; products: Product[]; relatedSeries: ArticleCategory[] }) => {
    return (
      <section className="bg-base-100">
        <div className="max-w-xl mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">{cat.title}</h1>
            <p className="text-sm text-muted mt-1">{cat.title_subtext}</p>
          </div>

          {/* Öne Çıkan Özellikler - mobile */}
          <div className="mb-4">
            <div className="card bg-base-200 shadow">
              <div className="card-body p-3">
                <h3 className="font-semibold mb-2">Öne Çıkan Özellikler</h3>
                <div className="text-sm whitespace-pre-line">{cat.featured || 'Öne çıkan özellikler burada gösterilecektir.'}</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <img
              src={getImgOrFallback(cat.main_image, `https://picsum.photos/seed/${seriesId}/800/300`)}
              alt={cat.title}
              className="w-full h-auto rounded object-cover"
              style={{ maxHeight: 220 }}
              loading="lazy"
            />
          </div>

          {/* Destek - mobile */}
          <div className="mb-4">
            <div className="card bg-base-200 shadow">
              <div className="card-body p-3">
                <h3 className="font-semibold mb-2">Destek</h3>
                <p className="text-sm">Teknik belgeler ve kullanım kılavuzları için bizimle iletişime geçin.</p>
                <div className="mt-3">
                  <Link to="/iletisim" className="btn btn-primary btn-sm">İletişim</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Seri Bilgileri</h2>
            <div className="text-sm whitespace-pre-line">{cat.info || cat.about}</div>
          </div>

          {/* Nasıl Kullanılır? - mobile (video if present, otherwise CTA card) */}
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Nasıl Kullanılır?</h2>
            {cat.video_url && cat.video_url.trim() !== '' ? (
              <div className="rounded-box overflow-hidden shadow">
                {isYouTubeUrl(cat.video_url) ? (
                  <iframe className="w-full" style={{ minHeight: 180 }} src={convertToYouTubeEmbed(cat.video_url)} title="Çalışma Videosu" allowFullScreen></iframe>
                ) : (
                  <video className="w-full" style={{ minHeight: 180 }} controls preload="metadata" src={getImgOrFallback(cat.video_url, cat.video_url)} />
                )}
              </div>
            ) : (
              <div className="card bg-warning/10 shadow">
                <div className="card-body p-3 text-center">
                  <p className="text-sm mb-3">Çalışma videosu yakında eklenecek. Detaylı bilgi için iletişime geçin.</p>
                  <Link to="/iletisim" className="btn btn-warning btn-sm">İletişime Geç</Link>
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Ürünler</h2>
            {products.length === 0 ? (
              <div className="alert alert-info">Bu seri için henüz ürün eklenmemiş.</div>
            ) : (
              (() => {
                // Helper function to extract torque value for sorting
                const extractTorqueValue = (product: Product): number | null => {
                  for (let i = 1; i <= 11; i++) {
                    const raw = product[`feature${i}` as keyof Product] as unknown as string
                    if (!raw) continue
                    const v = String(raw).trim()
                    if (v === '' || v.toUpperCase() === 'NULL') continue

                    const lowerV = v.toLowerCase()
                    if (lowerV.includes('tork')) {
                      const parts = v.split(':')
                      const valuePart = parts.length > 1 ? parts[1] : v

                      // Remove common units and clean the string
                      const cleanValue = valuePart.replace(/\s*(nm|NM|Nm)\s*/gi, ' ').trim()

                      // Match range patterns like: "1,0 - 3.58", "0,2 – 1.22", "1.080 - 2.000"
                      const rangeMatch = cleanValue.match(/(\d+[.,]?\d*)\s*[-–—]\s*(\d+[.,]?\d*)/)
                      if (rangeMatch) {
                        const numStr = rangeMatch[1].replace(',', '.')
                        const num = parseFloat(numStr)
                        if (!isNaN(num)) return num
                      }

                      // Try to extract any number (including decimals with comma or dot, and thousands with dot)
                      // Match patterns like: 1.080, 1,086, 105, 2.714, etc.
                      const singleMatch = cleanValue.match(/(\d+(?:[.,]\d+)*)/)
                      if (singleMatch) {
                        // Handle both European (1.080,5) and standard (1,080.5) formats
                        let numStr = singleMatch[1]

                        // If there's a dot followed by 3 digits, it's likely a thousands separator
                        if (/\d+\.\d{3}/.test(numStr)) {
                          numStr = numStr.replace('.', '') // Remove thousands separator
                        }

                        // Replace comma with dot for decimal point
                        numStr = numStr.replace(',', '.')

                        const num = parseFloat(numStr)
                        if (!isNaN(num)) return num
                      }
                    }
                  }
                  return null
                }

                // Sort products by torque value
                const sortedProducts = [...products].sort((a, b) => {
                  const torqueA = extractTorqueValue(a)
                  const torqueB = extractTorqueValue(b)

                  if (torqueA === null && torqueB === null) return 0
                  if (torqueA === null) return 1
                  if (torqueB === null) return -1

                  return torqueA - torqueB
                })

                return sortedProducts.map(p => (
                  <div key={p.id} className="card mb-3">
                    <div className="card-body p-3 flex gap-3 items-start">
                      <img src={getImgOrFallback(p.main_img, `https://picsum.photos/seed/${encodeURIComponent(p.sku)}/120/90`)} alt={p.sku} className="w-20 h-14 object-contain rounded" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{p.sku}</div>
                        <div className="text-xs text-base-content/70 mt-1 line-clamp-3">
                          {p.paragraph || p.description || '-'}
                        </div>
                        <div className="mt-2">
                          <Link to={`/urun/${p.sku}`} className="btn btn-primary btn-sm">Detay</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              })()
            )}
          </div>

          {/* Aynı Kategorideki Diğer Seriler - mobile */}
          {relatedSeries && relatedSeries.length > 0 && (
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Aynı Kategorideki Diğer Seriler</h2>
              <div className="flex gap-3 overflow-x-auto py-2">
                {relatedSeries.map((s) => {
                  const key = s.subchild_id ?? s.subchild ?? s.id ?? s.title
                  const img = getImgOrFallback(s.main_image, `https://picsum.photos/seed/${encodeURIComponent(String(key))}/300/180`)
                  return (
                    <Link key={key} to={`/kategoriler/${tier}/${categoryId}/${encodeURIComponent(String(key))}`} className="card w-[200px] shrink-0">
                      <div className="card-body p-2">
                        <img src={img} alt={s.title} className="w-full h-28 object-cover rounded mb-2" />
                        <div className="text-sm font-medium truncate">{s.title}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {cat.usable_areas && (() => {
            const areas = getUniqueCategoriesFromAreas(cat.usable_areas)
            const containerClass = areas.length === 3
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
            return (
              <>
                {/* Daha Fazla Bilgi Section - Mobile */}
                {cat.more && cat.more.trim() !== '' && (
                  <div className="mb-6">
                    <h2 className="font-semibold mb-3">Daha Fazla Bilgi</h2>
                    <div className="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg border border-primary/20">
                      <div className="card-body p-4">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-base-content/80 whitespace-pre-line leading-relaxed">
                            {cat.more}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 sm:mt-12 px-2 sm:px-0">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Nerelerde Kullanılır?</h2>
                  <div className={containerClass}>
                    {areas.map((area: UsableAreaCategory) => {
                      const Icon = iconMap[area.icon] ?? null
                      return (
                        <div
                          key={area.id}
                          className="flex flex-col items-center justify-center text-center p-6 bg-[#f8f7ff] rounded-2xl shadow-sm transition hover:shadow-md"
                        >
                          {Icon && <Icon className="w-10 h-10 text-primary mb-2" />}
                          <div className="font-medium">{area.title}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )
          })()}

          <div className="text-center mt-6">
            <Link to="/kategoriler" className="btn btn-outline btn-sm">Kategorilere Dön</Link>
          </div>
        </div>
      </section>
    )
  }

  // Render mobile simplified view early
  // NOTE: mobile rendering must happen after loading / not-found checks
  // (moved below to avoid using `cat` when it's null)

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
          <div className="breadcrumbs text-sm py-4 overflow-x-auto">
            <ul className="flex flex-wrap">
              <li><Link to="/">Ana sayfa</Link></li>
              <li><Link to="/kategoriler">Kategoriler</Link></li>
              {/* Show partial path even when cat is null */}
              <li>{tier ? humanize(tier) : 'Kategori'}</li>
              <li className="whitespace-nowrap">{categoryId ? humanize(categoryId) : 'Alt Kategori'}</li>
            </ul>
          </div>
          <div className="alert alert-warning">
            Bu kategori bulunamadı. Lütfen <Link to="/kategoriler" className="link">kategorilere</Link> geri dönün.
          </div>
        </div>
      </section>
    )
  }

  // Safe place to render mobile view (cat and loading are valid)
  if (isMobile) {
    return <MobileArticle cat={cat} products={products} relatedSeries={relatedSeries} />
  }

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="breadcrumbs text-sm py-4">
          <ul>
            <li><Link to="/">Ana sayfa</Link></li>
            <li><Link to="/kategoriler">Kategoriler</Link></li>
            {/* tier (e.g. endustriyel) */}
            {tier ? (
              <li>
                <Link to={`/kategoriler/${encodeURIComponent(String(tier))}/`}>
                  {humanize(tier)}
                </Link>
              </li>
            ) : null}
            {/* categoryId (e.g. kolver-elektrikli-tornavidalar) */}
            {categoryId ? (
              <li>
                <Link to={`/kategoriler/${encodeURIComponent(String(tier))}/${encodeURIComponent(String(categoryId))}/`}>
                  {humanize(categoryId)}
                </Link>
              </li>
            ) : null}
            {/* current article / series */}
            <li className="whitespace-nowrap">
              {(() => {
                const lastSegment = cat.subchild ?? cat.title ?? seriesId ?? ''
                return (
                  <Link to={`/kategoriler/${encodeURIComponent(String(tier))}/${encodeURIComponent(String(categoryId))}/${encodeURIComponent(String(lastSegment))}`}>
                    {humanize(String(lastSegment))}
                  </Link>
                )
              })()}
            </li>
          </ul>
        </div>

        {/* Use the shared HeroBanner for article header */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-10">
          <div>
            <img
              src={getImgOrFallback(cat.main_image, `https://picsum.photos/seed/${seriesId}/600/450`)}
              alt={`${cat.title} - Kategori Görseli`}
              title={cat.title}
              className="w-full h-auto rounded-box shadow object-cover"
              loading="lazy"
              onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${seriesId}/600/450` }}
              style={{ maxHeight: 450, width: '100%', objectFit: 'cover' }}
            />
            <div className="-mt-20 relative">
              <div className="bg-black/60 backdrop-blur-sm rounded-t-3xl p-6 text-white max-w-3xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold">{cat.title}</h1>
                <p className="mt-2 text-sm md:text-base text-white/90">{cat.title_subtext || 'Kategori detayları'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <main className="lg:col-span-3">
            <article className="prose max-w-none px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{cat.title} Hakkında:</h2>
              <div className="whitespace-pre-line text-sm sm:text-base">
                {cat.about || 'Bu kategori; profesyonel kullanımlar için test edilmiş, dayanıklı malzeme yapısı ve ergonomik tasarımı ile öne çıkar.'}
              </div>
            </article>

            <div className="mt-6 sm:mt-8 grid md:grid-cols-2 gap-4 sm:gap-6 items-start px-2 sm:px-0">
              {/* Simplified image container: make image larger and fill the box (responsive) */}
              {/* Secondary image box: show on mobile or when cat.img1 exists; hide on desktop when missing */}
              {(isMobile || (cat?.img1 && String(cat.img1).trim() !== '' && String(cat.img1).toUpperCase() !== 'NULL')) && (
                <div className="w-full px-2 sm:px-0">
                  <div className="w-full max-w-[420px] mx-auto">
                    <img
                      src={getImgOrFallback(cat?.img1, `https://picsum.photos/seed/${seriesId}-hero/420/315`)}
                      alt={`${cat.title} - Ürün Detay Görseli`}
                      title={cat.title}
                      className="w-auto mx-auto h-auto object-cover rounded-box shadow max-w-full"
                      loading="lazy"
                      style={{ display: 'block' }}
                      onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${seriesId}-hero/420/315` }}
                    />
                  </div>
                </div>
              )}

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
                  <div className="rounded-lg shadow-xl border border-base-300 w-full">
                    {/* Responsive table wrapper: allows horizontal scroll on small screens but keeps desktop layout */}
                    <div className="w-full table-wrapper">
                      <table className={`w-full text-sm article-table-responsive`} style={{ tableLayout: 'fixed' }}>
                        <thead>
                          <tr className="bg-neutral text-neutral-content">
                            <th className="font-bold px-2 py-3 text-left" style={{ minWidth: '60px' }}>Görsel</th>
                            <th className="font-bold px-2 py-3 text-left" style={{ minWidth: '120px' }}>Model (SKU)</th>
                            {desktopFeatureColumns.map((label, colIdx) => (
                              <th key={colIdx} className="font-bold px-2 py-3 text-left">{label}</th>
                            ))}
                            <th className="px-2 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="bg-base-100">
                          {(() => {
                            // Helper function to extract torque value
                            const extractTorqueValue = (product: Product): number | null => {
                              for (let i = 1; i <= 11; i++) {
                                const raw = product[`feature${i}` as keyof Product] as unknown as string
                                if (!raw) continue
                                const v = String(raw).trim()
                                if (v === '' || v.toUpperCase() === 'NULL') continue

                                const lowerV = v.toLowerCase()
                                if (lowerV.includes('tork')) {
                                  const parts = v.split(':')
                                  const valuePart = parts.length > 1 ? parts[1] : v

                                  // Remove common units and clean the string
                                  const cleanValue = valuePart.replace(/\s*(nm|NM|Nm)\s*/gi, ' ').trim()

                                  // Match range patterns like: "1,0 - 3.58", "0,2 – 1.22", "1.080 - 2.000"
                                  const rangeMatch = cleanValue.match(/(\d+[.,]?\d*)\s*[-–—]\s*(\d+[.,]?\d*)/)
                                  if (rangeMatch) {
                                    const numStr = rangeMatch[1].replace(',', '.')
                                    const num = parseFloat(numStr)
                                    if (!isNaN(num)) return num
                                  }

                                  // Try to extract any number (including decimals with comma or dot, and thousands with dot)
                                  // Match patterns like: 1.080, 1,086, 105, 2.714, etc.
                                  const singleMatch = cleanValue.match(/(\d+(?:[.,]\d+)*)/)
                                  if (singleMatch) {
                                    // Handle both European (1.080,5) and standard (1,080.5) formats
                                    let numStr = singleMatch[1]

                                    // If there's a dot followed by 3 digits, it's likely a thousands separator
                                    if (/\d+\.\d{3}/.test(numStr)) {
                                      numStr = numStr.replace('.', '') // Remove thousands separator
                                    }

                                    // Replace comma with dot for decimal point
                                    numStr = numStr.replace(',', '.')

                                    const num = parseFloat(numStr)
                                    if (!isNaN(num)) return num
                                  }
                                }
                              }
                              return null
                            }

                            const getGroup = (sku: string) => {
                              const s = sku.toUpperCase();
                              if (s.includes('PS')) return 'Bas-Çalıştır (Push-to-Start)';
                              return 'Levye Tetik (Lever Start)';
                            };

                            // Group products
                            const groupedProducts = (() => {
                              const groups: Record<string, Product[]> = {
                                'Bas-Çalıştır (Push-to-Start)': [],
                                'Levye Tetik (Lever Start)': []
                              };

                              products.forEach(p => {
                                const g = getGroup(p.sku);
                                if (!groups[g]) groups[g] = [];
                                groups[g].push(p);
                              });

                              // Sort within groups
                              Object.keys(groups).forEach(key => {
                                groups[key].sort((a, b) => {
                                  const torqueA = extractTorqueValue(a)
                                  const torqueB = extractTorqueValue(b)

                                  if (torqueA === null && torqueB === null) return 0
                                  if (torqueA === null) return 1
                                  if (torqueB === null) return -1

                                  return torqueA - torqueB
                                });
                              });

                              return groups;
                            })();

                            // Order of groups to render
                            const groupOrder = ['Bas-Çalıştır (Push-to-Start)', 'Levye Tetik (Lever Start)'];

                            return groupOrder.map(groupName => {
                              if (groupedProducts[groupName].length === 0) return null;

                              return (
                                <>
                                  {/* Group Header */}
                                  <tr key={`group-${groupName}`} className="bg-base-200">
                                    <td colSpan={3 + desktopFeatureColumns.length} className="px-3 py-2 font-bold text-gray-700 border-b border-base-300">
                                      {groupName}
                                    </td>
                                  </tr>

                                  {/* Products in this group */}
                                  {groupedProducts[groupName].map((product, idx) => (
                                    <tr
                                      key={product.id}
                                      className={`hover:bg-primary/5 transition-colors border-b border-base-200 ${idx % 2 === 0 ? 'bg-base-50' : 'bg-white'} cursor-pointer`}
                                      role="button"
                                      tabIndex={0}
                                      onClick={() => navigate(`/urun/${product.sku}`)}
                                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/urun/${product.sku}`) }}
                                    >
                                      <td className="px-2 py-2 align-top">
                                        <img
                                          src={getImgOrFallback(product.main_img, `https://picsum.photos/seed/${encodeURIComponent(product.sku)}/80/60`)}
                                          alt={product.sku}
                                          className="w-20 h-14 object-contain rounded"
                                          loading="lazy"
                                          onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(product.sku)}/80/60` }}
                                          style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                      </td>
                                      <td className="font-semibold px-2 py-3 text-primary truncate max-w-[160px]">{product.sku}</td>
                                      {desktopFeatureColumns.map((label, colIdx) => {
                                        let cellVal = ''
                                        for (let i = 1; i <= 11; i++) {
                                          const raw = product[`feature${i}` as keyof Product] as unknown as string || ''
                                          if (!raw) continue
                                          const v = String(raw).trim()
                                          if (v === '' || v.toUpperCase() === 'NULL') continue
                                          const parts = v.split(':')
                                          const lhs = parts.length > 1 ? parts[0].trim() : `Özellik ${i}`
                                          if (lhs === label) {
                                            cellVal = parts.length > 1 ? parts.slice(1).join(':').trim() : ''
                                            break
                                          }
                                        }
                                        return (
                                          <td key={colIdx} className="px-2 py-3 text-base-content/80 break-words">{cellVal || '-'}</td>
                                        )
                                      })}
                                      <td className="px-2 py-3">
                                        <Link to={`/urun/${product.sku}`} onClick={(e) => e.stopPropagation()} className="btn btn-primary btn-xs whitespace-nowrap shadow-sm hover:shadow-md transition-shadow">
                                          Detay
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              );
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
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

            {cat?.usable_areas && (() => {
              const areas = getUniqueCategoriesFromAreas(cat.usable_areas)
              const containerClass = areas.length === 3
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
              return (
                <>
                  {/* Daha Fazla Bilgi Section - Desktop */}
                  {cat.more && cat.more.trim() !== '' && (
                    <div className="mt-8 sm:mt-12 px-2 sm:px-0">
                      <h2 className="text-xl sm:text-2xl font-bold mb-4">Daha Fazla Bilgi</h2>
                      <div className="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg border border-primary/20">
                        <div className="card-body p-6">
                          <div className="prose prose-base max-w-none">
                            <p className="text-base-content/80 whitespace-pre-line leading-relaxed text-justify">
                              {cat.more}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 sm:mt-12 px-2 sm:px-0">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Nerelerde Kullanılır?</h2>
                    <div className={containerClass}>
                      {areas.map((area: UsableAreaCategory) => {
                        const Icon = iconMap[area.icon] ?? null
                        return (
                          <div
                            key={area.id}
                            className="flex flex-col items-center justify-center text-center p-6 bg-[#f8f7ff] rounded-2xl shadow-sm transition hover:shadow-md"
                          >
                            {Icon && <Icon className="w-10 h-10 text-primary mb-2" />}
                            <div className="font-medium">{area.title}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )
            })()}

            <div className="mt-8 sm:mt-12 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Nasıl Kullanılır?</h2>
              {cat?.video_url && cat.video_url.trim() !== '' ? (
                <div className="aspect-video rounded-box overflow-hidden shadow">
                  {isYouTubeUrl(cat.video_url) ? (
                    <iframe
                      className="w-full h-full"
                      src={convertToYouTubeEmbed(cat.video_url)}
                      title="Çalışma Videosu"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video className="w-full h-full" controls preload="metadata" src={getImgOrFallback(cat.video_url, cat.video_url)} />
                  )}
                </div>
              ) : (
                <div className="card bg-gradient-to-br from-warning/10 to-warning/5 shadow-lg border-2 border-warning/20">
                  <div className="card-body text-center p-4 sm:p-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

                {/* Compact centered grid: responsive card widths with min-width to avoid overflow issues */}
                <div style={{ position: 'relative' }}>
                  <div className="flex gap-4 overflow-x-auto py-2 px-2 touch-pan-x related-snap">
                    {relatedSeries.map((series) => {
                      const seriesKey = series.subchild_id ?? series.subchild ?? series.id ?? series.title
                      const seriesKeyEncoded = encodeURIComponent(String(seriesKey))
                      const imgSeed = series.subchild_id ?? series.id ?? seriesKey
                      const linkKey = series.id ?? seriesKey
                      const imgUrl = getImgOrFallback(series.main_image, `https://picsum.photos/seed/${encodeURIComponent(String(imgSeed))}/300/225`)

                      return (
                        <div key={linkKey} style={{ scrollSnapAlign: 'center', flex: '0 0 auto', minWidth: 220, maxWidth: 320 }}>
                          <Link to={`/kategoriler/${tier}/${categoryId}/${seriesKeyEncoded}`} className="block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-200 transform hover:-translate-y-1" style={{ width: '100%', maxWidth: '100%' }}>
                            <div style={{ width: '100%', display: 'block' }}>
                              <img src={imgUrl} alt={`${series.title} - Seri Görseli`} title={series.title} className="w-full h-auto object-cover" onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(String(imgSeed))}/300/225` }} />
                            </div>
                            <div className="p-3 bg-base-100 text-center">
                              <div className="text-sm font-semibold truncate">{series.title}</div>
                            </div>
                          </Link>
                        </div>
                      )
                    })}
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
        /* Responsive table tweaks */
        .touch-pan-x {
          -webkit-overflow-scrolling: touch; /* smooth scrolling on iOS */
        }

        /* table wrapper: scroll on small, visible on desktop */
        .table-wrapper { overflow-x: auto; }
        .article-table-responsive { min-width: 720px; }
        @media (min-width: 1024px) {
          .table-wrapper { overflow: visible; }
          .article-table-responsive { min-width: 0; table-layout: auto; }
        }

        /* Responsive table: allow horizontal scroll on small screens */
        .article-table-responsive {
          border-collapse: collapse;
          width: 100%;
        }

        .article-table-responsive th,
        .article-table-responsive td {
          white-space: normal !important;
          word-break: break-word !important;
          vertical-align: top;
          padding: 0.5rem 0.5rem;
          hyphens: auto;
          overflow-wrap: anywhere;
        }

        /* On larger screens use a fixed table layout so the table adapts to container width */
        @media (min-width: 1024px) {
          /* overridden above: desktop shows full table, allow normal table layout */
          .article-table-responsive th:first-child,
          .article-table-responsive td:first-child { width: 12%; min-width: 120px; }
        }

        /* Mobile table tweaks: reduce padding and font-size, keep horizontal scroll */
        @media (max-width: 767px) {
          .article-table-responsive { font-size: 12px; }
          .article-table-responsive th, .article-table-responsive td { padding: 0.25rem 0.5rem; }
          .article-table-responsive img { width: 64px !important; height: 48px !important; }
          .article-table-responsive td .btn { padding: 0.25rem 0.5rem; font-size: 11px; }
        }

        /* Usable areas responsive grid */
        .usable-areas-grid {
          grid-template-columns: 1fr;
          justify-items: center;
        }
        .usable-areas-card {
          width: 100%;
          max-width: 420px;
        }

        @media (min-width: 768px) {
          /* On tablet & up: show two columns fixed width */
          .usable-areas-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
            justify-content: center;
            justify-items: center;
          }
          .usable-areas-card { max-width: 320px; }
        }

        @media (min-width: 1024px) {
          /* On desktop keep desired fixed 320px cards */
          .usable-areas-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 320px));
            justify-content: center;
          }
          .usable-areas-card { max-width: 320px; }
        }

        /* related-snap improvements */
        .related-snap {
          scroll-snap-type: x mandatory;
        }

      `}</style>
    </section>
  )
}
