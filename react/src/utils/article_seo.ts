/**
 * Article SEO Helper - Generates comprehensive meta tags and structured data
 * for article/category pages
 */

export interface ArticleSEOData {
  id: number
  tier: string
  parent_id?: string
  child_id?: string
  subchild_id?: string
  title: string
  meta_title?: string
  meta_description?: string
  schema_description?: string
  keywords?: string
  main_img?: string
  created_at?: string
  updated_at?: string
}

const SITE_DOMAIN = 'https://ketenpnomatik.com'
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
  
  if (tier === 'parent') {
    return `${SITE_DOMAIN}/kategoriler/parent`
  } else if (tier === 'child' && article.parent_id) {
    return `${SITE_DOMAIN}/kategoriler/child/${article.parent_id}`
  } else if (tier === 'subchild' && article.parent_id && article.child_id) {
    return `${SITE_DOMAIN}/kategoriler/subchild/${article.parent_id}/${article.child_id}`
  }
  
  // Fallback
  return `${SITE_DOMAIN}/seri/${article.id}`
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
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'Müşteri Hizmetleri',
          'availableLanguage': 'Turkish'
        }
      },
      
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': article.meta_title || article.title,
        'description': description,
        'inLanguage': 'tr-TR',
        'isPartOf': { '@id': `${SITE_DOMAIN}/#website` },
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
      
      // CollectionPage (for category listing)
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#collectionpage`,
        'url': canonicalUrl,
        'name': article.title,
        'description': description,
        'inLanguage': 'tr-TR',
        'isPartOf': { '@id': `${SITE_DOMAIN}/#website` },
        'about': {
          '@type': 'ItemList',
          'name': article.title,
          'description': description,
          'itemListElement': [] // Will be populated dynamically with products
        },
        'breadcrumb': { '@id': `${canonicalUrl}#breadcrumb` }
      },
      
      // BreadcrumbList
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
      'item': `${SITE_DOMAIN}/kategoriler/parent`
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
      'item': `${SITE_DOMAIN}/kategoriler/parent`
    })
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position++,
      'name': 'Alt Kategori',
      'item': `${SITE_DOMAIN}/kategoriler/child/${article.parent_id}`
    })
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position,
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
