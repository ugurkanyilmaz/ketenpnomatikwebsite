/**
 * Article SEO Helper - Generates comprehensive meta tags and structured data
 * for article/category pages
 */

export interface ArticleSEOData {
  id: number
  tier: string
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

const SITE_DOMAIN = 'https://www.ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'
const SITE_LOGO = `${SITE_DOMAIN}/ketenlogoson.fw_.png`
const DEFAULT_IMAGE = `${SITE_DOMAIN}/keten_banner.jpg`

/**
 * Builds complete head metadata for article pages
 */
export function buildArticleSEO(article: ArticleSEOData) {
  // Meta Title - used for <title> tag
  const pageTitle = article.meta_title || article.title || 'Ürün Kategorisi'
  
  // Meta Description - used for <meta name="description">
  const metaDescription = article.meta_description || `${article.title} kategorisine ait ürünler ve detaylı bilgiler.`
  
  // Schema Description - used for Schema.org structured data only
  const schemaDescription = article.schema_description || metaDescription
  
  // Meta Keywords - used for <meta name="keywords">
  const metaKeywords = article.keywords || `${article.title}, pnömatik, endüstriyel, alet`
  
  const pageImage = article.main_img ? `${SITE_DOMAIN}${article.main_img}` : DEFAULT_IMAGE
  
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
      
      // If present, the CollectionPage entry (may be augmented later with products)
      // Note: primary CollectionPage is already included above to reduce duplication.
      
  // BreadcrumbList (ensure current page is included)
  buildBreadcrumbs(article, canonicalUrl)
    ]
  }
}

/**
 * Builds breadcrumb structured data based on tier
 */
function buildBreadcrumbs(article: ArticleSEOData, canonicalUrl: string) {
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
      'name': 'Kategoriler',
      'item': `${SITE_DOMAIN}/kategoriler`
    }
  ]

  let position = 3
  
  if (article.tier === 'parent') {
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position,
      'name': article.title,
      'item': canonicalUrl
    })
  } else if (article.tier === 'child' && article.parent_id) {
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position++,
      'name': 'Ana Kategori',
      'item': `${SITE_DOMAIN}/kategoriler/${article.parent_id}`
    })
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position,
      'name': article.title,
      'item': canonicalUrl
    })
  } else if (article.tier === 'subchild' && article.parent_id && article.child_id) {
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position++,
      'name': 'Ana Kategori',
      'item': `${SITE_DOMAIN}/kategoriler/${article.parent_id}`
    })
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position++,
      'name': 'Alt Kategori',
      'item': `${SITE_DOMAIN}/kategoriler/${article.parent_id}/${article.child_id}`
    })
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position,
      'name': article.title,
      'item': canonicalUrl
    })
  }

  // Ensure current page is present as the last breadcrumb if not already
  const last = breadcrumbs[breadcrumbs.length - 1]
  if (!last || last.item !== canonicalUrl) {
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': breadcrumbs.length + 1,
      'name': article.title,
      'item': canonicalUrl
    })
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    'itemListElement': breadcrumbs
  }
}

/**
 * Apply SEO data to document head (for React components)
 */
export function applySEOToHead(seoData: ReturnType<typeof buildArticleSEO>) {
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

// Apply Article SEO and optionally inject product list into CollectionPage JSON-LD
export function applyArticleSEOWithProducts(article: ArticleSEOData, products?: Array<any>) {
  const seo = buildArticleSEO(article)

  if (products && products.length > 0 && seo && seo.structuredData) {
    try {
      const graph = seo.structuredData['@graph'] || []

      // Map products to ListItem entries
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
          const mi = String(p.main_img)
          image = mi.startsWith('http') ? mi : `${origin}${mi}`
        }

        const productObj: any = {
          '@type': 'Product',
          'name': p.title || sku,
          'url': productUrl,
          'sku': sku
        }
        if (image) productObj.image = image

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

      seo.structuredData['@graph'] = graph
    } catch (err) {
      // Non-fatal: if injection fails, still apply SEO with base structured data
      // eslint-disable-next-line no-console
      console.error('Failed to inject products into article structuredData', err)
    }
  }

  applySEOToHead(seo)
}
