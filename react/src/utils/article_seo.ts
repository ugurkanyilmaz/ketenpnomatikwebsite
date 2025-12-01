/**
 * Article SEO Helper - Generates comprehensive meta tags and structured data
 * for article/category pages
 */

export interface ArticleSEOData {
  id: number
  tier: string
  video_url?: string
  parent_id?: string
  parent_slug?: string
  child_id?: string
  child_slug?: string
  subchild_id?: string
  subchild_slug?: string
  title: string
  slug?: string
  meta_title?: string
  meta_description?: string
  schema_description?: string
  keywords?: string
  main_img?: string
  created_at?: string
  updated_at?: string
}
import { normalizeImageUrl } from './seo_utils'

const SITE_DOMAIN = 'https://www.ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'
const SITE_LOGO = `${SITE_DOMAIN}/weblogo.jpg`
const DEFAULT_IMAGE = `${SITE_DOMAIN}/keten_banner.jpg`

/**
 * Builds complete head metadata for article pages
 */
export function buildArticleSEO(article: ArticleSEOData) {
  // Meta Title - used for <title> tag
  const pageTitle = article.meta_title || article.title || 'Ürün Kategorisi'
  
  // Meta Description - used for <meta name="description">
  const metaDescription = article.meta_description || `${article.title} kategorisine ait ürünler ve detaylı bilgiler.`
  
  const schemaDescription = article.schema_description || metaDescription
  
  // Meta Keywords - used for <meta name="keywords">
  const metaKeywords = article.keywords || `${article.title}, pnömatik, endüstriyel, alet`
  
  const pageImage = article.main_img ? normalizeImageUrl(article.main_img, DEFAULT_IMAGE) : DEFAULT_IMAGE
  
  // Build canonical URL based on tier structure
  const canonicalUrl = buildCanonicalUrl(article)
  
  return {
    title: `${pageTitle} | ${SITE_NAME}`,
    meta: [
      // Basic Meta Tags
      { name: 'description', content: metaDescription },
      { name: 'keywords', content: metaKeywords },
      
      // Open Graph / Facebook
      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: metaDescription },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: pageImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'tr_TR' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: pageImage },
      
      // Additional SEO
      { name: 'author', content: SITE_NAME },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'googlebot', content: 'index, follow' },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ],
    structuredData: buildStructuredData(article, canonicalUrl, pageImage, schemaDescription)
  }
}

/**
 * Builds canonical URL based on tier hierarchy
 */
function buildCanonicalUrl(article: ArticleSEOData): string {
  const tier = article.tier
  
  // Prefer canonical patterns used across the site. Use non-www SITE_DOMAIN.
  // Prefer slugs when available to mirror site's URL structure
  const esc = (s: string) => encodeURIComponent(String(s)).replace(/%20/g, '%20')

  if (tier === 'parent') {
    const seg = String(article.parent_slug || article.slug || article.title || article.id)
    return `${SITE_DOMAIN}/kategoriler/${esc(seg)}`
  } else if (tier === 'child' && article.parent_id) {
    const p = String(article.parent_slug || article.parent_id)
    const c = String(article.child_slug || article.slug || article.title || article.child_id || article.id)
    return `${SITE_DOMAIN}/kategoriler/${esc(p)}/${esc(c)}`
  } else if (tier === 'subchild' && article.parent_id && article.child_id) {
    const p = String(article.parent_slug || article.parent_id)
    const c = String(article.child_slug || article.child_id)
    const s = String(article.subchild_slug || article.slug || article.title || article.subchild_id || article.id)
    return `${SITE_DOMAIN}/kategoriler/${esc(p)}/${esc(c)}/${esc(s)}`
  }

  // Fallback to a slug or encoded title if available
  const fallback = String(article.slug || article.title || article.id)
  return `${SITE_DOMAIN}/kategoriler/${esc(fallback)}`
}

/**
 * Builds Schema.org structured data (JSON-LD)
 */
function buildStructuredData(
  article: ArticleSEOData,
  canonicalUrl: string,
  imageUrl: string,
  description: string
) {
  const now = new Date().toISOString()
  const datePublished = article.created_at || now
  const dateModified = article.updated_at || datePublished

  // Place the primary image before product entries and explicitly reference it from the WebPage
  const graph: any[] = [
    // Website
    {
      '@type': 'WebSite',
      '@id': `${SITE_DOMAIN}/#website`,
      'url': SITE_DOMAIN,
      'name': SITE_NAME,
      'description': 'Endüstriyel pnömatik el aletleri ve ekipmanları',
      'inLanguage': 'tr-TR'
    },

    // Organization
    {
      '@type': 'Organization',
      '@id': `${SITE_DOMAIN}/#organization`,
      'name': SITE_NAME,
      'url': SITE_DOMAIN,
      'logo': {
        '@type': 'ImageObject',
        'url': SITE_LOGO,
        '@id': `${SITE_DOMAIN}/#logo`,
        'width': 520,
        'height': 480
      },
      'image': { '@id': `${SITE_DOMAIN}/#logo` },
      'sameAs': [
        'https://www.facebook.com/ketenpnomatik',
        'https://www.linkedin.com/company/ketenpnomatik',
        'https://www.instagram.com/ketenpnomatik'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Müşteri Hizmetleri',
        'availableLanguage': 'Turkish',
        'telephone': '+90 (262) 643 43 39'
      }
    },

    // Primary Image - ensure this appears early in the graph
    {
      '@type': 'ImageObject',
      '@id': `${canonicalUrl}#primaryimage`,
      'url': imageUrl,
      'contentUrl': imageUrl,
      'width': 1200,
      'height': 630,
      'inLanguage': 'tr-TR'
    },

    // Use WebPage as primary page type for category/article listings.
    // The list of products is exposed as the page's mainEntity (ItemList).
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      'url': canonicalUrl,
      'name': article.meta_title || article.title,
      'description': description,
      'inLanguage': 'tr-TR',
      'isPartOf': { '@id': `${SITE_DOMAIN}/#website` },
      'mainEntity': {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        'itemListElement': []
      },
      'about': { '@id': `${SITE_DOMAIN}/#organization` },
      'primaryImageOfPage': { '@id': `${canonicalUrl}#primaryimage` },
      // also reference primary image via 'image' for compatibility
      'image': { '@id': `${canonicalUrl}#primaryimage` },
      'datePublished': datePublished,
      'dateModified': dateModified
    }
  ]

  // If the article has a video_url, add a VideoObject node and reference it from the WebPage
  if (article.video_url && String(article.video_url).trim() !== '') {
    const videoId = `${canonicalUrl}#video`
    // reference by id from the WebPage node
    try {
      const wp = graph.find(g => g['@type'] === 'WebPage' && g['@id'] === `${canonicalUrl}#webpage`)
      if (wp) wp.video = { '@id': videoId }
    } catch (e) {
      // ignore
    }

    graph.push({
      '@type': 'VideoObject',
      '@id': `${canonicalUrl}#video`,
      'name': article.title,
      'description': description,
      'thumbnailUrl': imageUrl,
      'uploadDate': article.created_at || undefined,
      'contentUrl': article.video_url,
      'embedUrl': article.video_url,
      'inLanguage': 'tr-TR'
    })
  }

  // BreadcrumbList (ensure current page is included)
  graph.push(buildBreadcrumbs(article, canonicalUrl))

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  }
}

/**
 * Builds breadcrumb structured data based on tier
 */
function buildBreadcrumbs(article: ArticleSEOData, canonicalUrl: string) {
  // slugify helper mirrors client-side routing behaviour
  const slugify = (text: string | undefined | null) => {
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

  const breadcrumbs: any[] = [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'Kategoriler', item: `${SITE_DOMAIN}/kategoriler` }
  ]

  let position = 3

  const parentSlug = slugify(article.parent_slug || (article.parent_id ? String(article.parent_id) : undefined))
  const childSlug = slugify(article.child_slug || (article.child_id ? String(article.child_id) : undefined))
  const subchildSlug = slugify(article.subchild_slug || (article.subchild_id ? String(article.subchild_id) : undefined))

  if (article.tier === 'parent') {
    const pUrl = parentSlug ? `${SITE_DOMAIN}/kategoriler/${parentSlug}` : canonicalUrl
    breadcrumbs.push({ '@type': 'ListItem', position, name: article.title, item: pUrl })
  } else if (article.tier === 'child') {
    if (parentSlug) {
      breadcrumbs.push({ '@type': 'ListItem', position: position++, name: article.parent_slug || String(article.parent_id) || 'Ana Kategori', item: `${SITE_DOMAIN}/kategoriler/${parentSlug}` })
    }
    const cUrl = parentSlug && childSlug ? `${SITE_DOMAIN}/kategoriler/${parentSlug}/${childSlug}` : canonicalUrl
    breadcrumbs.push({ '@type': 'ListItem', position, name: article.title, item: cUrl })
  } else if (article.tier === 'subchild') {
    if (parentSlug) {
      breadcrumbs.push({ '@type': 'ListItem', position: position++, name: article.parent_slug || String(article.parent_id) || 'Ana Kategori', item: `${SITE_DOMAIN}/kategoriler/${parentSlug}` })
    }
    if (parentSlug && childSlug) {
      breadcrumbs.push({ '@type': 'ListItem', position: position++, name: article.child_slug || String(article.child_id) || 'Alt Kategori', item: `${SITE_DOMAIN}/kategoriler/${parentSlug}/${childSlug}` })
    }
    const sUrl = parentSlug && childSlug && subchildSlug ? `${SITE_DOMAIN}/kategoriler/${parentSlug}/${childSlug}/${subchildSlug}` : canonicalUrl
    breadcrumbs.push({ '@type': 'ListItem', position, name: article.title, item: sUrl })
  }

  // Ensure current page is present as the last breadcrumb if not already
  const last = breadcrumbs[breadcrumbs.length - 1]
  if (!last || last.item !== canonicalUrl) {
    breadcrumbs.push({ '@type': 'ListItem', position: breadcrumbs.length + 1, name: article.title, item: canonicalUrl })
  }

  return { '@type': 'BreadcrumbList', '@id': `${canonicalUrl}#breadcrumb`, itemListElement: breadcrumbs }
}

/**
 * Apply SEO data to document head (for React components)
 */
export function applySEOToHead(seoData: ReturnType<typeof buildArticleSEO>) {
  // Set title
  if (seoData?.title) document.title = seoData.title

  // Remove old tags
  const oldMetas = document.querySelectorAll('meta[data-seo="true"]')
  oldMetas.forEach(m => m.remove())
  const oldLinks = document.querySelectorAll('link[data-seo="true"]')
  oldLinks.forEach(l => l.remove())
  const oldScripts = document.querySelectorAll('script[data-seo="true"]')
  oldScripts.forEach(s => s.remove())

  ;(seoData.meta || []).forEach((metaData: any) => {
    const meta = document.createElement('meta')
    meta.setAttribute('data-seo', 'true')
    if ('name' in metaData && metaData.name) {
      meta.setAttribute('name', metaData.name)
      meta.setAttribute('content', metaData.content)
    } else if ('property' in metaData && metaData.property) {
      meta.setAttribute('property', metaData.property)
      meta.setAttribute('content', metaData.content)
    }
    document.head.appendChild(meta)
  })

  ;(seoData.link || []).forEach((linkData: any) => {
    if (linkData.href) {
      const link = document.createElement('link')
      link.setAttribute('data-seo', 'true')
      link.setAttribute('rel', linkData.rel || 'canonical')
      link.setAttribute('href', linkData.href)
      document.head.appendChild(link)
    }
  })

  if (seoData.structuredData) {
    const script = document.createElement('script')
    script.setAttribute('data-seo', 'true')
    script.setAttribute('type', 'application/ld+json')
    script.textContent = JSON.stringify(seoData.structuredData, null, 2)
    document.head.appendChild(script)
  }
}

// Enhance apply to include global head assets and structuredData enrichment
export function applyArticleSEOEnhanced(seoData: ReturnType<typeof buildArticleSEO>) {
  // apply basic head changes
  applySEOToHead(seoData)

  try {
  const canonicalHref = (seoData.link || []).find((l: any) => l.rel === 'canonical')?.href || (typeof window !== 'undefined' ? `${SITE_DOMAIN}${window.location.pathname}` : SITE_DOMAIN)

    const httpLang = document.createElement('meta')
    httpLang.setAttribute('data-seo', 'true')
    httpLang.setAttribute('http-equiv', 'content-language')
    httpLang.setAttribute('content', 'tr')
    document.head.appendChild(httpLang)

    const robots = document.createElement('meta')
    robots.setAttribute('data-seo', 'true')
    robots.setAttribute('name', 'robots')
    robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    document.head.appendChild(robots)

    const sitemap = document.createElement('link')
    sitemap.setAttribute('data-seo', 'true')
    sitemap.setAttribute('rel', 'sitemap')
    sitemap.setAttribute('type', 'application/xml')
    sitemap.setAttribute('href', 'https://www.ketenpnomatik.com/sitemap.xml')
    document.head.appendChild(sitemap)

    const pre = document.createElement('link')
    pre.setAttribute('data-seo', 'true')
    pre.setAttribute('rel', 'preconnect')
    pre.setAttribute('href', 'https://www.googletagmanager.com')
    document.head.appendChild(pre)

    const dns = document.createElement('link')
    dns.setAttribute('data-seo', 'true')
    dns.setAttribute('rel', 'dns-prefetch')
    dns.setAttribute('href', 'https://www.googletagmanager.com')
    document.head.appendChild(dns)

    const f32 = document.createElement('link')
    f32.setAttribute('data-seo', 'true')
    f32.setAttribute('rel', 'icon')
    f32.setAttribute('type', 'image/png')
    f32.setAttribute('sizes', '32x32')
  f32.setAttribute('href', '/favicon-32x32.png')
    document.head.appendChild(f32)

    const f16 = document.createElement('link')
    f16.setAttribute('data-seo', 'true')
    f16.setAttribute('rel', 'icon')
    f16.setAttribute('type', 'image/png')
    f16.setAttribute('sizes', '16x16')
  f16.setAttribute('href', '/favicon-16x16.png')
    document.head.appendChild(f16)

  const ico = document.createElement('link')
  ico.setAttribute('data-seo', 'true')
  ico.setAttribute('rel', 'shortcut icon')
  ico.setAttribute('href', '/favicon.ico')
  document.head.appendChild(ico)

  const apple = document.createElement('link')
  apple.setAttribute('data-seo', 'true')
  apple.setAttribute('rel', 'apple-touch-icon')
  apple.setAttribute('href', '/apple-touch-icon.png')
  document.head.appendChild(apple)

  const android192 = document.createElement('link')
  android192.setAttribute('data-seo', 'true')
  android192.setAttribute('rel', 'icon')
  android192.setAttribute('sizes', '192x192')
  android192.setAttribute('href', '/android-chrome-192x192.png')
  document.head.appendChild(android192)

  const android512 = document.createElement('link')
  android512.setAttribute('data-seo', 'true')
  android512.setAttribute('rel', 'icon')
  android512.setAttribute('sizes', '512x512')
  android512.setAttribute('href', '/android-chrome-512x512.png')
  document.head.appendChild(android512)

    const manifest = document.createElement('link')
    manifest.setAttribute('data-seo', 'true')
    manifest.setAttribute('rel', 'manifest')
    manifest.setAttribute('href', '/site.webmanifest')
    document.head.appendChild(manifest)

    const theme = document.createElement('meta')
    theme.setAttribute('data-seo', 'true')
    theme.setAttribute('name', 'theme-color')
    theme.setAttribute('content', '#0b5561')
    document.head.appendChild(theme)

    const alt = document.createElement('link')
    alt.setAttribute('data-seo', 'true')
    alt.setAttribute('rel', 'alternate')
    alt.setAttribute('hreflang', 'tr')
    alt.setAttribute('href', canonicalHref)
    document.head.appendChild(alt)
  } catch (e) {
    // ignore
  }

  // Enrich structuredData
  try {
    if (seoData.structuredData) {
      const graph = seoData.structuredData['@graph'] || []
      const org = graph.find((g: any) => g['@type'] === 'Organization' || (Array.isArray(g['@type']) && g['@type'].includes('Organization')))
      if (org) {
        const o: any = org
        o.founder = o.founder || 'Aşkın Keten'
        o.foundingDate = o.foundingDate || '1998'
        o.numberOfEmployees = o.numberOfEmployees || '25'
        o.paymentAccepted = o.paymentAccepted || 'Nakit, Kredi Kartı, Havale'
        o.openingHours = o.openingHours || 'Mo-Fr 08:00-18:15'
        o.areaServed = o.areaServed || { '@type': 'Country', 'name': 'Turkey' }
      }

      const hasBreadcrumb = graph.some((g: any) => g['@type'] === 'BreadcrumbList')
      if (!hasBreadcrumb) {
  const canonicalHref = (seoData.link || []).find((l: any) => l.rel === 'canonical')?.href || (typeof window !== 'undefined' ? `${SITE_DOMAIN}${window.location.pathname}` : SITE_DOMAIN)
        graph.push({
          '@type': 'BreadcrumbList',
          '@id': `${canonicalHref}#breadcrumb`,
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': 'https://www.ketenpnomatik.com' },
            { '@type': 'ListItem', 'position': 2, 'name': seoData.title || document.title, 'item': canonicalHref }
          ]
        })
      }

      seoData.structuredData['@graph'] = graph
      // update injected script if any
      const existing = document.querySelectorAll('script[data-seo="true"][type="application/ld+json"]')
      existing.forEach(s => s.remove())
      const script = document.createElement('script')
      script.setAttribute('data-seo', 'true')
      script.setAttribute('type', 'application/ld+json')
      script.textContent = JSON.stringify(seoData.structuredData, null, 2)
      document.head.appendChild(script)
    }
  } catch (err) {
    // ignore
  }
}

// Apply Article SEO and optionally inject product list into CollectionPage JSON-LD
export function applyArticleSEOWithProducts(article: ArticleSEOData, products?: Array<any>) {
  const seo = buildArticleSEO(article)

  // Ensure canonical is always the category/article canonical (protect against homepage fallback)
  try {
    const canonicalUrl = buildCanonicalUrl(article)
    seo.link = seo.link || []
    // remove existing canonical(s)
    seo.link = (seo.link as any[]).filter((l: any) => l.rel !== 'canonical')
    // prepend our canonical (ensures it's present and prioritized)
    seo.link.unshift({ rel: 'canonical', href: canonicalUrl })
  } catch (e) {
    // ignore errors building canonical
  }

  if (products && products.length > 0 && seo && seo.structuredData) {
    try {
      const graph = seo.structuredData['@graph'] || []

      // Map products to ListItem entries and include richer Product schema (description, brand, offers)
      const origin = typeof window !== 'undefined' ? window.location.origin : SITE_DOMAIN
      // Deduplicate products by URL/sku to avoid repeated items in JSON-LD
      const seen = new Set<string>()
      const productItems: any[] = []
      products.forEach((p: any, idx: number) => {
        const sku = p.sku || p.id || p.code || String(idx)

        // Prefer an explicit product URL if provided (may be stored as 'url' in DB)
        let productUrl = ''
        if (p.url && String(p.url).trim() !== '') {
          productUrl = String(p.url).startsWith('http') ? String(p.url) : `${origin}${String(p.url)}`
        } else {
          productUrl = `${origin}/urun/${encodeURIComponent(String(sku))}`
        }

        if (seen.has(productUrl)) return
        seen.add(productUrl)

        // Normalize image: skip 'NULL' literal and empty values
        let image: string | undefined = undefined
        if (p.main_img && String(p.main_img).toUpperCase() !== 'NULL') {
          image = normalizeImageUrl(p.main_img, `${origin}/weblogo.jpg`)
        }

        // Build a richer Product entry for ItemList: include description, brand and offers
        const productObj: any = {
          '@type': 'Product',
          'name': p.title || sku,
          'url': productUrl,
          'sku': sku,
          'description': p.description || p.meta_description || undefined,
          'brand': p.brand ? { '@type': 'Brand', 'name': p.brand } : undefined
        }
        if (image) productObj.image = image

        // Offers: include minimal Offer object so ItemList products expose availability/price info
        const offer: any = buildOfferForItemList(p, productUrl)
        if (offer) productObj.offers = offer

        productItems.push({
          '@type': 'ListItem',
          'position': productItems.length + 1,
          'name': p.title || sku,
          'item': productObj
        })
      })

      // Prefer injecting products into the WebPage.mainEntity (ItemList) we create
      // in buildStructuredData. Fall back to existing CollectionPage.about pattern
      // for compatibility with older structuredData shapes.
      const pageId = buildCanonicalUrl(article)
      const pageNode: any = graph.find((g: any) =>
        g['@type'] === 'WebPage' && (
          (g.mainEntity && (g.mainEntity['@type'] === 'ItemList' || g.mainEntity['@id'] === `${pageId}#itemlist`)) ||
          g['@id'] === `${pageId}#webpage`
        )
      )
      if (pageNode) {
        if (!pageNode.mainEntity) pageNode.mainEntity = { '@type': 'ItemList', 'itemListElement': [] }
        pageNode.mainEntity.itemListElement = productItems
      } else {
        const collection = graph.find((g: any) => g['@type'] === 'CollectionPage')
        if (collection) {
          const col: any = collection
          if (!col.about) col.about = { '@type': 'ItemList', 'itemListElement': [] }
          col.about.itemListElement = productItems
        } else {
          const newColl: any = {
            '@type': 'CollectionPage',
            'name': article.title,
            'description': article.schema_description || article.meta_description || '',
            'about': { '@type': 'ItemList', 'itemListElement': productItems }
          }
          graph.push(newColl)
        }
      }

      // Reorder graph: prefer Website, Organization, PrimaryImage, WebPage before product entries
      try {
        const pageId = buildCanonicalUrl(article)
        const preferIds = [
          `${SITE_DOMAIN}/#website`,
          `${SITE_DOMAIN}/#organization`,
          `${pageId}#primaryimage`,
          `${pageId}#webpage`,
          `${pageId}#itemlist`
        ]

        const ordered: any[] = []
        // pull preferred nodes out in order if present
        preferIds.forEach((id) => {
          const idx = graph.findIndex((g: any) => g['@id'] === id)
          if (idx !== -1) {
            ordered.push(graph[idx])
            graph.splice(idx, 1)
          }
        })

        // append remaining nodes (products, collection, breadcrumbs)
        ordered.push(...graph)
        seo.structuredData['@graph'] = ordered
      } catch (e) {
        // fallback to raw graph
        seo.structuredData['@graph'] = graph
      }
    } catch (err) {
      // Non-fatal: if injection fails, still apply SEO with base structured data
      // eslint-disable-next-line no-console
      console.error('Failed to inject products into article structuredData', err)
    }
  }

  applySEOToHead(seo)
}

  /**
   * Build a minimal Offer object for products when injecting into ItemList.
   * Mirrors product page logic but stays lightweight to avoid large payloads.
   */
  function buildOfferForItemList(p: any, productUrl: string) {
    if (!p) return null
  const availability = (() => {
      const a = String(p.availability || '').toLowerCase()
      if (a.includes('in') || a.includes('stok') || a.includes('var')) return 'https://schema.org/InStock'
      if (a.includes('out') || a.includes('yok') || a.includes('tükendi')) return 'https://schema.org/OutOfStock'
      if (a.includes('pre') || a.includes('ön')) return 'https://schema.org/PreOrder'
      if (typeof p.stock === 'number') return p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
      return 'https://schema.org/InStock'
    })()

    // Build a minimal AggregateOffer for ItemList entries but omit price
    const agg: any = {
      '@type': 'AggregateOffer',
      'url': productUrl,
      'offerCount': 1,
      'availability': availability,
      'seller': { '@type': 'Organization', 'name': p.seller_name || SITE_NAME, 'url': p.seller_url || SITE_DOMAIN }
    }

    return agg
  }
