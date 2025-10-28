/**
 * Blog SEO Helper - Generates comprehensive meta tags and structured data
 * for blog posts
 */

export interface BlogSEOData {
  id: number
  title: string
  image?: string
  paragraph1?: string
  paragraph2?: string
  paragraph3?: string
  meta_title?: string
  meta_desc?: string
  meta_keywords?: string
  schema_desc?: string
  author?: string
  published_date?: string
  slug?: string
  created_at?: string
  updated_at?: string
}

const SITE_DOMAIN = 'https://www.ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'
const SITE_LOGO = `${SITE_DOMAIN}/weblogo.jpg`
const DEFAULT_IMAGE = `${SITE_DOMAIN}/weblogo.jpg`

function absUrl(p?: string) {
  if (!p) return DEFAULT_IMAGE
  if (p.startsWith('http')) return p
  return `${SITE_DOMAIN}${p}`
}

export function buildBlogSEO(blog: BlogSEOData) {
  const pageTitle = blog.meta_title || blog.title || 'Blog Yazısı'
  const metaDescription = blog.meta_desc || (blog.paragraph1 ? blog.paragraph1.substring(0, 160) + '...' : `${blog.title} hakkında detaylı bilgi.`)
  const schemaDescription = blog.schema_desc || metaDescription
  const metaKeywords = blog.meta_keywords || `${blog.title}, pnömatik, blog, endüstriyel`
  const pageImage = absUrl(blog.image)
  const canonicalUrl = buildCanonicalUrl(blog)
  const publishedDate = blog.published_date || blog.created_at || new Date().toISOString()
  const modifiedDate = blog.updated_at || publishedDate

  return {
    title: `${pageTitle} | ${SITE_NAME}`,
    meta: [
      { name: 'description', content: metaDescription },
      { name: 'keywords', content: metaKeywords },
      { name: 'author', content: blog.author || SITE_NAME },

      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: metaDescription },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: pageImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'tr_TR' },
      { property: 'article:published_time', content: publishedDate },
      { property: 'article:modified_time', content: modifiedDate },
      { property: 'article:author', content: blog.author || SITE_NAME },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: pageImage },

      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'googlebot', content: 'index, follow' },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ],
    structuredData: buildStructuredData(blog, canonicalUrl, pageImage, schemaDescription, publishedDate, modifiedDate)
  }
}

function buildCanonicalUrl(blog: BlogSEOData): string {
  if (blog.slug) return `${SITE_DOMAIN}/blog/${encodeURIComponent(blog.slug)}`
  return `${SITE_DOMAIN}/blog/${encodeURIComponent(String(blog.id))}`
}

function buildStructuredData(
  blog: BlogSEOData,
  canonicalUrl: string,
  imageUrl: string,
  description: string,
  publishedDate: string,
  modifiedDate: string
) {
  const articleBody = [blog.paragraph1, blog.paragraph2, blog.paragraph3].filter(Boolean).join('\n\n')

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_DOMAIN}/#website`,
        'url': SITE_DOMAIN,
        'name': SITE_NAME,
        'description': 'Endüstriyel pnömatik el aletleri ve ekipmanları',
        'inLanguage': 'tr-TR',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${SITE_DOMAIN}/ara?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
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
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'Müşteri Hizmetleri',
          'availableLanguage': 'Turkish',
          'telephone': '+90 (262) 643 43 39'
        },
        'sameAs': [
          'https://www.facebook.com/ketenpnomatik',
          'https://www.linkedin.com/company/ketenpnomatik',
          'https://www.instagram.com/ketenpnomatik'
        ]
      },
      {
        '@type': 'Person',
        '@id': `${SITE_DOMAIN}/#author`,
        'name': blog.author || SITE_NAME,
        'url': SITE_DOMAIN
      },
      {
        '@type': ['WebPage','Blog'],
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': blog.meta_title || blog.title,
        'description': description,
        'inLanguage': 'tr-TR',
        'isPartOf': { '@id': `${SITE_DOMAIN}/#website` },
        'primaryImageOfPage': { '@id': `${canonicalUrl}#primaryimage` },
        'datePublished': publishedDate,
        'dateModified': modifiedDate,
        'breadcrumb': { '@id': `${canonicalUrl}#breadcrumb` }
      },
      {
        '@type': 'ImageObject',
        '@id': `${canonicalUrl}#primaryimage`,
        'url': imageUrl,
        'contentUrl': imageUrl,
        'width': 1200,
        'height': 630,
        'inLanguage': 'tr-TR'
      },
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        'isPartOf': { '@id': `${canonicalUrl}#webpage` },
        'author': { '@id': `${SITE_DOMAIN}/#author` },
        'headline': blog.title,
        'description': description,
        'datePublished': publishedDate,
        'dateModified': modifiedDate,
        'mainEntityOfPage': { '@id': `${canonicalUrl}#webpage` },
        'publisher': { '@id': `${SITE_DOMAIN}/#organization` },
        'image': { '@id': `${canonicalUrl}#primaryimage` },
        'articleBody': articleBody,
        'inLanguage': 'tr-TR',
        'url': canonicalUrl
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': SITE_DOMAIN },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_DOMAIN}/blog` },
          { '@type': 'ListItem', 'position': 3, 'name': blog.title, 'item': canonicalUrl }
        ]
      }
    ]
  }
}

export function applySEOToHead(seoData: ReturnType<typeof buildBlogSEO>) {
  if (seoData?.title) document.title = seoData.title

  const oldMetas = document.querySelectorAll('meta[data-seo="true"]')
  oldMetas.forEach((m) => m.remove())
  const oldLinks = document.querySelectorAll('link[data-seo="true"]')
  oldLinks.forEach((l) => l.remove())
  const oldScripts = document.querySelectorAll('script[data-seo="true"]')
  oldScripts.forEach((s) => s.remove())

  // Add meta tags declared in seoData
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

  // Add link tags declared in seoData (canonical etc.)
  ;(seoData.link || []).forEach((linkData: any) => {
    const existing = Array.from(document.querySelectorAll('link[rel="canonical"]'))
    existing.forEach((l) => l.remove())
    if (linkData.href) {
      const link = document.createElement('link')
      link.setAttribute('data-seo', 'true')
      link.setAttribute('rel', linkData.rel || 'canonical')
      link.setAttribute('href', linkData.href)
      document.head.appendChild(link)
    }
  })

  // Inject extra global head assets (robots, content-language, sitemap, preconnect, favicons, hreflang)
  try {
  const canonicalHref = (seoData.link || []).find((l: any) => l.rel === 'canonical')?.href || (typeof window !== 'undefined' ? `${SITE_DOMAIN}${window.location.pathname}` : SITE_DOMAIN)

    // http-equiv content-language
    const httpLang = document.createElement('meta')
    httpLang.setAttribute('data-seo', 'true')
    httpLang.setAttribute('http-equiv', 'content-language')
    httpLang.setAttribute('content', 'tr')
    document.head.appendChild(httpLang)

    // Robots meta with recommended directives
    const robots = document.createElement('meta')
    robots.setAttribute('data-seo', 'true')
    robots.setAttribute('name', 'robots')
    robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    document.head.appendChild(robots)

    // sitemap link
    const sitemap = document.createElement('link')
    sitemap.setAttribute('data-seo', 'true')
    sitemap.setAttribute('rel', 'sitemap')
    sitemap.setAttribute('type', 'application/xml')
    sitemap.setAttribute('href', 'https://www.ketenpnomatik.com/sitemap.xml')
    document.head.appendChild(sitemap)

    // preconnect + dns-prefetch for Google Tag Manager
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

    // favicons and manifest
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

    // hreflang alternate for Turkish
    const alt = document.createElement('link')
    alt.setAttribute('data-seo', 'true')
    alt.setAttribute('rel', 'alternate')
    alt.setAttribute('hreflang', 'tr')
    alt.setAttribute('href', canonicalHref)
    document.head.appendChild(alt)
  } catch (e) {
    // ignore in non-DOM environments
  }

  // Enrich structuredData with Organization details and BreadcrumbList if missing
  try {
    if (seoData.structuredData) {
      const graph = seoData.structuredData['@graph'] || []

      // Ensure Organization node has extra fields
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

      // Ensure BreadcrumbList exists
      const hasBreadcrumb = graph.some((g: any) => g['@type'] === 'BreadcrumbList')
      if (!hasBreadcrumb) {
        const pageName = seoData.meta?.find((m: any) => m.name === 'description') ? document.title : document.title
  const canonicalHref = (seoData.link || []).find((l: any) => l.rel === 'canonical')?.href || (typeof window !== 'undefined' ? `${SITE_DOMAIN}${window.location.pathname}` : SITE_DOMAIN)
        graph.push({
          '@type': 'BreadcrumbList',
          '@id': `${canonicalHref}#breadcrumb`,
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': 'https://www.ketenpnomatik.com' },
            { '@type': 'ListItem', 'position': 2, 'name': pageName || document.title, 'item': canonicalHref }
          ]
        })
      }

      seoData.structuredData['@graph'] = graph
    }
  } catch (err) {
    // non-fatal
    // eslint-disable-next-line no-console
    console.error('Failed to enrich structuredData', err)
  }

  if (seoData.structuredData) {
    const script = document.createElement('script')
    script.setAttribute('data-seo', 'true')
    script.setAttribute('type', 'application/ld+json')
    script.textContent = JSON.stringify(seoData.structuredData, null, 2)
    document.head.appendChild(script)
  }
}

/* Example usage:
useEffect(() => {
  const seoData = buildBlogSEO(blogPost)
  applySEOToHead(seoData)
}, [blogPost])
*/