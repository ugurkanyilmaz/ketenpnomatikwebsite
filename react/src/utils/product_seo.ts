/**
 * Product SEO Helper - Generates comprehensive meta tags and structured data
 * for product detail pages with full Schema.org Product markup
 */

export interface ProductSEOData {
  id: number
  sku: string
  url?: string
  title: string
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

const SITE_DOMAIN = 'https://ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'
const SITE_LOGO = `${SITE_DOMAIN}/ketenlogoson.fw_.png`
const DEFAULT_IMAGE = `${SITE_DOMAIN}/keten_banner.jpg`

/**
 * Builds complete head metadata for product pages
 */
export function buildProductSEO(product: ProductSEOData) {
  // Meta Title - used for <title> tag
  const pageTitle = product.meta_title || `${product.title} - ${product.brand || 'Endüstriyel Alet'}`
  
  // Meta Description - used for <meta name="description">
  const metaDescription = product.meta_description || product.description || `${product.title} - ${product.brand} ürün detayları ve özellikleri. SKU: ${product.sku}`
  
  // Schema Description - used for Schema.org structured data only
  const schemaDescription = product.schema_description || metaDescription
  
  // Meta Keywords - used for <meta name="keywords">
  const metaKeywords = product.keywords || `${product.title}, ${product.brand}, ${product.parent}, ${product.child}, ${product.subchild}, pnömatik, endüstriyel`
  
  const pageImage = product.main_img ? `${SITE_DOMAIN}${product.main_img}` : DEFAULT_IMAGE
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
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:retailer_item_id', content: product.sku },
      
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
    .map(img => `${SITE_DOMAIN}${img}`)

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
          'availableLanguage': 'Turkish',
          'telephone': '+90-XXX-XXX-XXXX'
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
        'offers': {
          '@type': 'Offer',
          'url': canonicalUrl,
          'priceCurrency': 'TRY',
          'price': '0', // Fiyat teklifi alınacak, bu yüzden 0
          'priceValidUntil': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 yıl geçerli
          'availability': 'https://schema.org/InStock',
          'itemCondition': 'https://schema.org/NewCondition',
          'seller': {
            '@type': 'Organization',
            '@id': `${SITE_DOMAIN}/#organization`,
            'name': SITE_NAME,
            'url': SITE_DOMAIN
          },
          'hasMerchantReturnPolicy': {
            '@type': 'MerchantReturnPolicy',
            'applicableCountry': 'TR',
            'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
            'merchantReturnDays': 14,
            'returnMethod': 'https://schema.org/ReturnByMail',
            'returnFees': 'https://schema.org/FreeReturn'
          },
          'shippingDetails': {
            '@type': 'OfferShippingDetails',
            'shippingRate': {
              '@type': 'MonetaryAmount',
              'value': '0',
              'currency': 'TRY'
            },
            'shippingDestination': {
              '@type': 'DefinedRegion',
              'addressCountry': 'TR'
            },
            'deliveryTime': {
              '@type': 'ShippingDeliveryTime',
              'handlingTime': {
                '@type': 'QuantitativeValue',
                'minValue': 0,
                'maxValue': 1,
                'unitCode': 'DAY'
              },
              'transitTime': {
                '@type': 'QuantitativeValue',
                'minValue': 2,
                'maxValue': 3,
                'unitCode': 'DAY'
              }
            }
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '5',
          'reviewCount': '1',
          'bestRating': '5',
          'worstRating': '1'
        },
        'additionalProperty': buildProductFeatures(product)
      },
      
      // BreadcrumbList
      buildBreadcrumbs(product, canonicalUrl)
    ]
  }
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
      'item': `${SITE_DOMAIN}/kategoriler/parent`
    })
  }

  if (product.child) {
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position++,
      'name': product.child,
      'item': `${SITE_DOMAIN}/kategoriler/child/${product.parent}`
    })
  }

  if (product.subchild) {
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': position++,
      'name': product.subchild,
      'item': `${SITE_DOMAIN}/kategoriler/subchild/${product.parent}/${product.child}`
    })
  }

  breadcrumbs.push({
    '@type': 'ListItem',
    'position': position,
    'name': product.title,
    'item': canonicalUrl
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
