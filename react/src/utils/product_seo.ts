/**
 * Product SEO Helper - Generates comprehensive meta tags and structured data
 * for product detail pages with full Schema.org Product markup
 */

export interface ProductSEOData {
  id: number
  sku: string
  url?: string
  title: string
  // Optional commercial fields (may be absent when price is on request)
  price?: number | string
  price_currency?: string
  stock?: number
  availability?: string
  seller_name?: string
  seller_url?: string
  description?: string
  paragraph?: string
  brand?: string
  parent?: string
  child?: string
  subchild?: string
  main_img?: string
  p_img1?: string
  p_img2?: string
  p_img3?: string
  p_img4?: string
  p_img5?: string
  p_img6?: string
  p_img7?: string
  feature1?: string
  feature2?: string
  feature3?: string
  feature4?: string
  feature5?: string
  feature6?: string
  feature7?: string
  feature8?: string
  feature9?: string
  feature10?: string
  feature11?: string
  meta_title?: string
  meta_description?: string
  schema_description?: string
  keywords?: string
  created_at?: string
  updated_at?: string
}

const SITE_DOMAIN = 'https://www.ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'
// Use weblogo.jpg as site logo for social previews by default (ensure same host as SITE_DOMAIN)
const SITE_LOGO = `${SITE_DOMAIN}/weblogo.jpg`
const DEFAULT_IMAGE = `${SITE_DOMAIN}/weblogo.jpg`


/**
 * Builds complete head metadata for product pages
 */
import { normalizeImageUrl } from './seo_utils'

export function buildProductSEO(product: ProductSEOData) {
  // Meta Title - used for <title> tag
  const pageTitle = product.meta_title || `${product.title} - ${product.brand || 'Endüstriyel Alet'}`
  
  // Meta Description - used for <meta name="description">
  const metaDescription = product.meta_description || product.description || `${product.title} - ${product.brand} ürün detayları ve özellikleri. SKU: ${product.sku}`
  
  // Schema Description - used for Schema.org structured data only
  const schemaDescription = product.schema_description || metaDescription
  
  // Meta Keywords - used for <meta name="keywords">
  const metaKeywords = product.keywords || `${product.title}, ${product.brand}, ${product.parent}, ${product.child}, ${product.subchild}, pnömatik, endüstriyel`
  
  const pageImage = normalizeImageUrl(product.main_img, DEFAULT_IMAGE)
  const canonicalUrl = `${SITE_DOMAIN}/urun/${product.sku}`
  
  return {
    title: `${pageTitle} | ${SITE_NAME}`,
    meta: [
      // Basic Meta Tags
      { name: 'description', content: metaDescription },
      { name: 'keywords', content: metaKeywords },
      
      // Open Graph / Facebook
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: metaDescription },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: pageImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'tr_TR' },
      
      // Product-specific Open Graph
      { property: 'product:brand', content: product.brand || SITE_NAME },
      // Open Graph availability: map to common OG values when possible
      { property: 'product:availability', content: mapOgAvailability(product) },
      { property: 'product:condition', content: 'new' },
      { property: 'product:retailer_item_id', content: product.sku },
      // If price is provided, expose it to OG tags so services that read OG can surface it
      ...(hasNumericPrice(product) ? [
        { property: 'product:price:amount', content: String(product.price) },
        { property: 'product:price:currency', content: (product.price_currency || 'TRY') }
      ] : []),
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: pageImage },
      { name: 'twitter:label1', content: 'Marka' },
      { name: 'twitter:data1', content: product.brand || SITE_NAME },
      { name: 'twitter:label2', content: 'SKU' },
      { name: 'twitter:data2', content: product.sku },
      
      // Additional SEO
      { name: 'author', content: SITE_NAME },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'googlebot', content: 'index, follow' },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ],
    structuredData: buildStructuredData(product, canonicalUrl, pageImage, schemaDescription)
  }
}

/**
 * Builds Schema.org structured data (JSON-LD) with Product markup
 */
function buildStructuredData(
  product: ProductSEOData,
  canonicalUrl: string,
  imageUrl: string,
  description: string
) {
  const now = new Date().toISOString()
  const datePublished = product.created_at || now
  const dateModified = product.updated_at || datePublished

  // Collect all product images
  const productImages = [
    product.main_img,
    product.p_img1,
    product.p_img2,
    product.p_img3,
    product.p_img4,
    product.p_img5,
    product.p_img6,
    product.p_img7
  ]
    .filter(Boolean)
    .map(img => normalizeImageUrl(img as string, DEFAULT_IMAGE))

  return {
    '@context': 'https://schema.org',
    '@graph': [
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
          '@id': `${SITE_DOMAIN}/#logo`
        ,
        'width': 520,
        'height': 480
        },
        'image': { '@id': `${SITE_DOMAIN}/#logo` },
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'Müşteri Hizmetleri',
          'availableLanguage': 'Turkish',
          'telephone': '+90 (262) 643 43 39'
        }
      },
      
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': product.meta_title || product.title,
        'description': description,
        'inLanguage': 'tr-TR',
        'isPartOf': { '@id': `${SITE_DOMAIN}/#website` },
        'about': { '@id': `${canonicalUrl}#product` },
        'primaryImageOfPage': { '@id': `${canonicalUrl}#primaryimage` },
        'datePublished': datePublished,
        'dateModified': dateModified
      },
      
      // Primary Image
      {
        '@type': 'ImageObject',
        '@id': `${canonicalUrl}#primaryimage`,
        'url': imageUrl,
        'contentUrl': imageUrl,
        'width': 1200,
        'height': 630,
        'inLanguage': 'tr-TR'
      },
      
      // Product (Main Schema)
          {
            '@type': 'Product',
            '@id': `${canonicalUrl}#product`,
            'name': product.title,
            'description': description,
            'image': productImages.length > 0 ? productImages : [imageUrl],
            'sku': product.sku,
            'mpn': product.sku, // Manufacturer Part Number
            'brand': {
              '@type': 'Brand',
              'name': product.brand || SITE_NAME
            },
            'manufacturer': {
              '@type': 'Organization',
              'name': product.brand || SITE_NAME
            },
            'url': canonicalUrl,
            'category': buildCategoryPath(product),
            // Build AggregateOffer object per request (price range in TRY)
            'offers': buildAggregateOffer(product, canonicalUrl),
            // intentionally omitting aggregateRating here per requested change
            'additionalProperty': buildProductFeatures(product)
          },
      
      // BreadcrumbList
      buildBreadcrumbs(product, canonicalUrl)
    ]
  }
}

/**
 * Returns true when product.price is a numeric value (number or numeric string)
 */
function hasNumericPrice(product: ProductSEOData): boolean {
  if (product.price === undefined || product.price === null) return false
  if (typeof product.price === 'number') return Number.isFinite(product.price)
  if (typeof product.price === 'string') {
    const n = parseFloat(product.price.replace(',', '.'))
    return !Number.isNaN(n) && Number.isFinite(n)
  }
  return false
}

/**
 * Map product availability/stock to a simple OG-friendly string
 */
function mapOgAvailability(product: ProductSEOData): string {
  if (product.availability) {
    const a = String(product.availability).toLowerCase()
    if (a.includes('in') || a.includes('stok') || a.includes('var')) return 'in stock'
    if (a.includes('out') || a.includes('yok') || a.includes('tükendi')) return 'out of stock'
    if (a.includes('pre') || a.includes('ön')) return 'preorder'
  }
  if (typeof product.stock === 'number') {
    return product.stock > 0 ? 'in stock' : 'out of stock'
  }
  // default fallback
  return 'in stock'
}

/**
 * Map product availability/stock to schema.org availability URL
 */
function mapSchemaAvailability(product: ProductSEOData): string {
  const og = mapOgAvailability(product)
  if (og === 'in stock') return 'https://schema.org/InStock'
  if (og === 'out of stock') return 'https://schema.org/OutOfStock'
  if (og === 'preorder') return 'https://schema.org/PreOrder'
  return 'https://schema.org/InStock'
}

/**
 * Build Offer object for Product structured data. If price is missing, omit price fields
 * and add a short description asking users to contact for price.
 */
/**
 * Build AggregateOffer object with fixed price range per request.
 * User requested: lowPrice = 400 TRY, highPrice = 629710 TRY
 */
function buildAggregateOffer(product: ProductSEOData, canonicalUrl: string) {
  // Build a minimal AggregateOffer but omit any explicit price fields
  // to avoid exposing pricing in structured data.
  const agg: any = {
    '@type': 'AggregateOffer',
    'url': canonicalUrl,
    'offerCount': 1,
    'availability': mapSchemaAvailability(product)
  }

  // Include seller info if available
  if (product.seller_name || product.seller_url) {
    agg.seller = {
      '@type': 'Organization',
      'name': product.seller_name || SITE_NAME,
      'url': product.seller_url || SITE_DOMAIN
    }
  }

  return agg
}

/**
 * Builds category path for product
 */
function buildCategoryPath(product: ProductSEOData): string {
  const parts = [product.parent, product.child, product.subchild].filter(Boolean)
  return parts.join(' > ')
}

/**
 * Builds product features as additionalProperty array
 */
function buildProductFeatures(product: ProductSEOData) {
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
    product.feature11
  ].filter(Boolean)

  return features.map(feature => {
    if (!feature) return null
    
    // Parse feature if it has format "Label: Value"
    const parts = feature.split(':')
    if (parts.length === 2) {
      return {
        '@type': 'PropertyValue',
        'name': parts[0].trim(),
        'value': parts[1].trim()
      }
    }
    return {
      '@type': 'PropertyValue',
      'name': 'Özellik',
      'value': feature
    }
  }).filter(Boolean)
}

/**
 * Builds breadcrumb structured data
 */
function buildBreadcrumbs(product: ProductSEOData, canonicalUrl: string) {
  // Slugify function to convert Turkish characters and make URL-safe
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  const breadcrumbs = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Ana Sayfa',
      'item': SITE_DOMAIN
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Ürünler',
      'item': `${SITE_DOMAIN}/urunler`
    }
  ]

  let position = 3

  if (product.parent) {
    breadcrumbs.push({ 
      '@type': 'ListItem', 
      'position': position++, 
      'name': product.parent, 
      'item': `${SITE_DOMAIN}/kategoriler/${slugify(String(product.parent))}` 
    })
  }

  if (product.child) {
    const p = slugify(String(product.parent))
    const c = slugify(String(product.child))
    breadcrumbs.push({ 
      '@type': 'ListItem', 
      'position': position++, 
      'name': product.child, 
      'item': `${SITE_DOMAIN}/kategoriler/${p}/${c}` 
    })
  }

  if (product.subchild) {
    const p = slugify(String(product.parent))
    const c = slugify(String(product.child))
    const s = slugify(String(product.subchild))
    breadcrumbs.push({ 
      '@type': 'ListItem', 
      'position': position++, 
      'name': product.subchild, 
      'item': `${SITE_DOMAIN}/kategoriler/${p}/${c}/${s}` 
    })
  }

  // Final breadcrumb: product title — point 'item' to the deepest category URL (not the product URL)
  let deepestCategoryUrl = `${SITE_DOMAIN}/urunler`
  try {
    const urlParent = product.parent ? slugify(String(product.parent)) : ''
    const urlChild = product.child ? slugify(String(product.child)) : ''
    const urlSub = product.subchild ? slugify(String(product.subchild)) : ''
    if (urlParent && urlChild && urlSub) deepestCategoryUrl = `${SITE_DOMAIN}/kategoriler/${urlParent}/${urlChild}/${urlSub}`
    else if (urlParent && urlChild) deepestCategoryUrl = `${SITE_DOMAIN}/kategoriler/${urlParent}/${urlChild}`
    else if (urlParent) deepestCategoryUrl = `${SITE_DOMAIN}/kategoriler/${urlParent}`
  } catch (e) {
    // fallback remains
  }

  breadcrumbs.push({
    '@type': 'ListItem',
    'position': position,
    'name': product.title,
    'item': deepestCategoryUrl
  })

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    'itemListElement': breadcrumbs
  }
}

/**
 * Apply SEO data to document head (for React components)
 */
export function applySEOToHead(seoData: ReturnType<typeof buildProductSEO>) {
  // Set title
  document.title = seoData.title
  
  // Remove old meta tags
  const oldMetas = document.querySelectorAll('meta[data-seo="true"]')
  oldMetas.forEach(meta => meta.remove())
  
  const oldLinks = document.querySelectorAll('link[data-seo="true"]')
  oldLinks.forEach(link => link.remove())
  
  const oldScripts = document.querySelectorAll('script[data-seo="true"]')
  oldScripts.forEach(script => script.remove())
  
  // Add new meta tags
  seoData.meta.forEach(metaData => {
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
  
  // Add canonical link
  seoData.link.forEach(linkData => {
    const link = document.createElement('link')
    link.setAttribute('data-seo', 'true')
    link.setAttribute('rel', linkData.rel)
    link.setAttribute('href', linkData.href)
    document.head.appendChild(link)
  })
  
  // Add structured data
  const script = document.createElement('script')
  script.setAttribute('data-seo', 'true')
  script.setAttribute('type', 'application/ld+json')
  script.textContent = JSON.stringify(seoData.structuredData, null, 2)
  document.head.appendChild(script)
}

// Enhanced entry that also injects global head assets and enriches JSON-LD
export function applyProductSEOEnhanced(seoData: ReturnType<typeof buildProductSEO>) {
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

      // Ensure Product node includes 'description', 'brand' and 'offers'
      const productNode = graph.find((g: any) => g['@type'] === 'Product' || (Array.isArray(g['@type']) && g['@type'].includes('Product')))
      if (productNode) {
        const p: any = productNode
        // prefer existing description on Product node, fall back to meta description if present
        p.description = p.description || seoData?.meta?.find((m: any) => m.name === 'description')?.content || undefined
        if (!p.brand) {
          // Add brand as Brand node object
          const brandName = (seoData as any).brand || ((p && p.manufacturer && p.manufacturer.name) ? p.manufacturer.name : undefined) || undefined
          if (brandName) p.brand = { '@type': 'Brand', 'name': brandName }
        }
        if (!p.offers || (typeof p.offers === 'object' && Object.keys(p.offers).length === 0)) {
          // Build a minimal offers object from available fields in seoData
          const offer = findOfferInGraph(graph)
          if (offer) p.offers = offer
          else {
            // fallback: create a lightweight Offer if price info exists in seoData
            const price = (seoData as any)?.meta?.find((m: any) => m.property === 'product:price:amount')?.content || (seoData as any)?.price
            if (price) {
              // Omit explicit price fields in Offer; include availability only
              p.offers = { '@type': 'Offer', 'availability': mapSchemaAvailabilityPlaceholder(p) }
            }
          }
        }
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

// Find a top-level Offer node in the graph (used when Product.offers missing)
function findOfferInGraph(graph: any[]): any | null {
  for (const node of graph) {
    if (!node) continue
    const t = node['@type']
    if (Array.isArray(t) ? t.includes('Offer') : t === 'Offer') return node
    // Sometimes Offer is nested under Product as a direct property object
    if (node['offers']) {
      const o = node['offers']
      if (o['@type'] === 'Offer' || (Array.isArray(o) && (o[0] && o[0]['@type'] === 'Offer'))) return o
    }
  }
  return null
}

// Lightweight availability mapper when only partial data exists on the product node
function mapSchemaAvailabilityPlaceholder(p: any): string {
  try {
    const a = (p && (p.availability || p.stock || p['offers'] && p['offers'].availability)) || ''
    const s = String(a).toLowerCase()
    if (s.includes('in') || s.includes('stok') || s.includes('var')) return 'https://schema.org/InStock'
    if (s.includes('out') || s.includes('yok') || s.includes('tükendi')) return 'https://schema.org/OutOfStock'
    if (s.includes('pre') || s.includes('ön')) return 'https://schema.org/PreOrder'
    if (typeof p?.stock === 'number') return p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
  } catch (e) {
    // ignore
  }
  return 'https://schema.org/InStock'
}
