// Local head-updater to keep behavior consistent with other SEO helpers
// (we used to import applySEOToHead from blog_seo but product/article pages
// use their own implementations — provide the same here to avoid mismatches)

const SITE_DOMAIN = 'https://www.ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'
const DEFAULT_IMAGE = 'https://ketenpnomatik.com/weblogo.jpg'

function absUrl(p?: string) {
  if (!p) return DEFAULT_IMAGE
  if (p.startsWith('http')) return p
  return `${SITE_DOMAIN}${p}`
}

// Note: Ensure your top-level HTML has <html lang="tr">. If your app mounts into
// a static index.html (public/index.html / react/index.html) add lang there.
// As a fallback we offer a non-invasive runtime setter below (won't overwrite a
// pre-existing lang attribute): call ensureHtmlLang() during app startup if needed.

export function ensureHtmlLang(lang = 'tr') {
  try {
    const html = document.documentElement
    if (!html.getAttribute('lang')) html.setAttribute('lang', lang)
  } catch (e) {
    // ignore server-side or non-DOM environments
  }
}

type PageKey =
  | 'home'
  | 'contact'
  | 'technical_service'
  | 'about'
  | 'about_apac'
  | 'about_hiyoki'
  | 'about_kolver'
  | 'about_hawanox'
  | 'about_deltaregis'
  | 'about_asa'
  | 'categories'
  | 'products'

interface PageOpts {
  title?: string
  description?: string
  keywords?: string
  path?: string
  image?: string
}

function buildBase(pageTitle: string, desc: string, keywords: string, path: string, image?: string) {
  // Use plain site name for homepage titles (avoid "Ana Sayfa | SITE_NAME")
  const isHomeish = !pageTitle || pageTitle.toLowerCase().includes('ana sayfa') || pageTitle === SITE_NAME
  // If caller provided a full title that already contains the site name, avoid appending it twice.
  const title = isHomeish ? SITE_NAME : pageTitle.includes(SITE_NAME) ? pageTitle : `${pageTitle} | ${SITE_NAME}`
  const canonical = `${SITE_DOMAIN}${path}`
  // Choose OG/Twitter friendly title (don't append site suffix for OG)
  const ogTitle = isHomeish ? SITE_NAME : pageTitle
  const meta = [
    { name: 'description', content: desc },
    { name: 'keywords', content: keywords },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { name: 'googlebot', content: 'index, follow' },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
  { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: desc },
    { property: 'og:url', content: canonical },
  { property: 'og:image', content: absUrl(image) },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: ogTitle },
    { name: 'twitter:description', content: desc },
  { name: 'twitter:image', content: absUrl(image) },
  ]

  const link = [{ rel: 'canonical', href: canonical }]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'url': canonical,
    // Keep WebPage.name concise to avoid repeating brand twice in some defaults
    'name': pageTitle && pageTitle.includes(SITE_NAME) ? pageTitle.replace(new RegExp(`\\s*\\|?\\s*${SITE_NAME}`, 'i'), '').trim() : pageTitle,
    // description for schema; keep same as meta description by default
    'description': desc,
    'inLanguage': 'tr-TR',
  'primaryImageOfPage': { '@type': 'ImageObject', 'url': absUrl(image), 'width': 1200, 'height': 630 }
  }

  return { title, meta, link, structuredData }
}

function buildPageSEO(key: PageKey, opts?: PageOpts) {
  const path = opts?.path || pageKeyToPath(key)
  switch (key) {
    case 'home':
      return buildBase(
        opts?.title || 'Keten Pnömatik | Endüstriyel Havalı ve Elektrikli El Aletlerinde Uzman',
        opts?.description || 'Keten Pnömatik, endüstriyel üretim alanlarına yönelik havalı ve elektrikli el aletleri, montaj çözümleri ve teknik servis hizmetleri sunar. Kolver, Apac ve Hiyoki gibi dünya markalarının yetkili satıcısı olarak, kalite, dayanıklılık ve güvenilir servis desteğini bir arada bulabilirsiniz. Profesyonel montaj ve bakım çözümlerinde yüksek performanslı ürünlerimizle yanınızdayız.',
        opts?.keywords || 'havalı el aletleri, pnömatik el aletleri, endüstriyel montaj sistemleri, kolver, apac, hiyoki, teknik servis, endüstriyel ekipman, tork ölçüm cihazı, profesyonel aletler',
        path,
        opts?.image,
      )

    case 'contact':
      return buildBase(
        opts?.title || 'Keten Pnömatik ile Hemen İletişime Geçin | Teklif, Demo ve Teknik Destek',
        opts?.description || 'Bize ulaşın — teklif, demo talebi veya teknik destek için iletişim bilgilerimizi kullanın.',
        opts?.keywords || 'iletişim, teklif, demo, teknik destek, Keten Pnömatik',
        path,
        opts?.image,
      )

    case 'technical_service':
      return buildBase(
        opts?.title || 'Keten Teknik Servis | Kolver, Apac ve Hiyoki Yetkili Servis Merkezi',
        opts?.description || 'Her markadan tüm havalı ve elektrikli aletler için yetkili teknik servis, bakım ve orijinal yedek parça desteği. Keten Teknik Servis Merkezi olarak Kolver, Apac ve Hiyoki dahil tüm profesyonel el aletlerinde hızlı arıza tespiti, garanti içi ve garanti dışı onarım, yerinde tork ölçüm ve kalibrasyon hizmetleri sunuyoruz. Ürünlerinizi kargo ile gönderebilir veya servise elden teslim edebilirsiniz. Onayınızdan sonra en kısa sürede işlemler tamamlanır.',
        opts?.keywords || 'teknik servis, havalı el aletleri servisi, elektrikli alet servisi, kolver teknik servis, apac servis, hiyoki servis, bakım, onarım, kalibrasyon, yedek parça, keten teknik servis, gebze teknik servis, endüstriyel servis',
        path,
        opts?.image,
      )

    case 'about':
      return buildBase(
        opts?.title || 'Keten Pnömatik Hakkında | Endüstriyel Çözümler ve Teknik Uzmanlık',
        opts?.description || 'Keten Pnömatik olarak endüstriyel sektörlerde güvenilir, yenilikçi ve uzun ömürlü çözümler sunuyoruz. Yılların deneyimi ve güçlü marka iş birlikleriyle müşterilerimize sadece ürün değil, komple sistem çözümleri sunmaktayız. Satış, servis, bakım ve teknik danışmanlık hizmetlerimizle üretim süreçlerinizi daha verimli hale getiriyoruz.',
        opts?.keywords || 'keten pnömatik, hakkımızda, endüstriyel firma, havalı el aletleri distribütörü, teknik servis, montaj sistemleri, endüstriyel çözüm ortağı, endüstriyel üretim',
        path,
        opts?.image,
      )

    case 'about_apac':
      return buildBase(
        opts?.title || 'APAC Distribütörü Türkiye | Keten Pnömatik ile Yüksek Performanslı Havalı Aletler',
        opts?.description || 'Apac, dayanıklılığı ve ergonomik tasarımıyla endüstriyel havalı el aletleri alanında güvenilir bir markadır. Keten Pnömatik, Apac ürünlerinin satış ve teknik servisinde yetkili merkezdir. Atölye, otomotiv ve sanayi uygulamaları için yüksek performanslı çözümler sunar.',
        opts?.keywords || 'apac, apac türkiye, apac el aletleri, apac distribütör, havalı alet, endüstriyel ekipman, apac servis, apac teknik servis',
        path,
        opts?.image,
      )

    case 'about_hiyoki':
      return buildBase(
        opts?.title || 'Hiyoki | Endüstriyel Ölçüm Sistemleri ve Tork Kontrollü El Aletleri',
        opts?.description || 'Hiyoki, en zorlu endüstriyel ortamlar ve kritik montaj hatları için üstün kaliteli, premium ölçüm sistemleri ve tork kontrollü el aletleri sunar. 24/7 kesintisiz çalışma, ±0.02% hassasiyet ve uzun ömürlü performans ile üretim sürekliliğini garanti altına alır.',
        opts?.keywords || 'hiyoki, endüstriyel ölçüm sistemleri, tork ölçüm cihazı, elektrikli sıkıcı, pnömatik el aletleri, endüstriyel dayanıklılık, tork kontrolü, kalibrasyon hizmeti, teknik destek, üretim hatları',
        path,
        opts?.image,
      )

    case 'about_kolver':
      return buildBase(
        opts?.title || 'Kolver Tork Kontrol Tornavidaları | Endüstriyel Montajda Maksimum Hassasiyet',
        opts?.description || 'Kolver, elektrikli tork ayarlı tornavidalarıyla endüstriyel montaj süreçlerinde yüksek hassasiyet, güvenilirlik ve verimlilik sağlar. Keten Pnömatik olarak, Kolver’in Türkiye’deki yetkili satış ve servis merkezidir. Profesyonel montaj hatlarında optimum performans, uzun ömür ve kararlı tork değerleriyle üretim kalitesini artıran çözümler sunuyoruz.',
        opts?.keywords || 'kolver, kolver türkiye, kolver elektrikli tornavida, tork ayarlı tornavida, kolver tork kontrol, elektrikli montaj tornavida, kolver distribütör, endüstriyel montaj sistemi, kolver servis',
        path,
        opts?.image,
      )

    case 'categories':
      return buildBase(
        opts?.title || 'Endüstriyel Ürün Kategorileri | Havalı, Elektrikli ve Ölçüm Cihazları – Keten Pnömatik',
        opts?.description || 'Havalı el aletlerinden tork ölçüm cihazlarına, montaj sistemlerinden bakım ekipmanlarına kadar geniş ürün kategorilerimizi keşfedin. Her ihtiyaca özel endüstriyel çözümleri tek çatı altında sunuyoruz.',
        opts?.keywords || 'havalı el aletleri kategorileri, montaj sistemleri, ölçüm cihazları, kalibrasyon, endüstriyel ekipman, pnömatik ürünler, el aletleri',
        path || '/kategoriler',
        opts?.image,
      )

    case 'products':
      return buildBase(
        opts?.title || 'Kolver, Apac, ASA, ve Hiyoki Ürünleri | Dayanıklı ve Profesyonel Endüstriyel Aletler',
        opts?.description || 'Kolver, Apac, ASA ve Hiyoki markalarının havalı, elektrikli ve ölçüm ekipmanlarını tek platformda bulabilirsiniz. Tüm ürünlerimiz orijinal, dayanıklı ve profesyonel kullanım için tasarlanmıştır. Endüstriyel üretimde kalite ve verimlilik sağlayan çözümlerimizle tanışın.',
        opts?.keywords || 'kolver ürünleri, apac ürünleri, asa ürünleri, hiyoki ürünleri, havalı alet, endüstriyel ekipman, tork anahtarı, elektrikli el aleti, ölçüm cihazı, pnömatik sistem',
        path || '/urunler',
        opts?.image,
      )
    
    case 'about_hawanox':
      return buildBase(
        opts?.title || 'Hawanox Havalı Yağ Pompaları ve Gres Pompaları | Güvenilir Yağlama Çözümleri',
        opts?.description || 'Hawanox, endüstriyel yağlama sistemleri ve ekipmanları alanında uzmanlaşmış bir markadır. Havalı yağ pompaları, gres pompaları ve diğer yağlama ürünleriyle güvenilir ve verimli çözümler sunar. Keten Pnömatik, Hawanox ürünlerinin satış ve teknik servis desteğini sağlamaktadır.',
        opts?.keywords || 'hawanox, hawanox türkiye, hawanox yağ pompası, hawanox gres pompası, havalı yağlama, yağlama ekipmanları, hawanox distribütör, hawanox servis',
        path,
        opts?.image,
      )

    case 'about_deltaregis':
      return buildBase(
       opts?.title || 'Delta Regis | Tork Kontrollü Vidalama Sistemleri ve Endüstri 4.0 Çözümleri',
       opts?.description || 'Delta Regis Tools Inc. (ABD), elektronik montaj hatları için ±%1 hassasiyetli tork kontrollü vidalama çözümleri sunar. Endüstri 4.0 uyumlu sistemleriyle üretim verilerini gerçek zamanlı takip eder, kalite kontrol ve raporlama otomasyonu sağlar.',
       opts?.keywords || 'delta regis, tork kontrollü vidalama, endüstri 4.0, dijital tork sistemi, elektronik montaj, tork kontrolü, üretim izlenebilirliği, MES entegrasyonu, endüstriyel otomasyon, fort pierce',
       path,
       opts?.image,
      )

    case 'about_asa':
      return buildBase(
       opts?.title || 'ASA | Ergonomik Montaj ve Endüstriyel Proses Çözümleri',
       opts?.description || 'ASA, otomotiv, elektronik ve genel endüstride kullanılan ergonomik ve güvenilir montaj çözümleri sunar. Operatör konforu, üretim sürekliliği ve uzun ömürlü bileşenleriyle kesintisiz performans sağlar.',
       opts?.keywords || 'asa, montaj çözümleri, endüstriyel proses ekipmanları, ergonomik el aletleri, otomotiv montaj hattı, endüstriyel otomasyon, verimli üretim, dayanıklı ekipman, kullanıcı dostu sistemler',
       path,
       opts?.image,
      )

    default:
      return buildBase(opts?.title || SITE_NAME, opts?.description || '', opts?.keywords || SITE_NAME, path || '/', opts?.image)
  }
}

// Enhance structuredData per page key to include schema.org graph entries
function enhanceStructuredDataForKey(key: PageKey, base: any, opts?: PageOpts) {
  const canonical = base.link?.[0]?.href || `${SITE_DOMAIN}${pageKeyToPath(key)}`
  // Normalize canonical: ensure trailing slash for root
  const normalizedCanonical = canonical.endsWith('/') ? canonical : canonical === SITE_DOMAIN ? `${SITE_DOMAIN}/` : canonical
  const image = (opts && opts.image) || base.meta.find((m: any) => m.name === 'twitter:image' || m.property === 'og:image')?.content || DEFAULT_IMAGE
  const desc = base.meta.find((m: any) => m.name === 'description')?.content || ''
  const pageTitle = base.title || SITE_NAME

  const webPage = {
    '@type': 'WebPage',
    'url': normalizedCanonical,
    'name': pageTitle,
    'description': desc,
    'inLanguage': 'tr-TR',
    'primaryImageOfPage': { '@type': 'ImageObject', 'url': image, 'width': 1200, 'height': 630 }
  }

  const organization = {
    '@type': 'Organization',
    'name': SITE_NAME,
    'url': SITE_DOMAIN,
    'logo': { '@type': 'ImageObject', 'url': DEFAULT_IMAGE, 'width': 520, 'height': 480 },
    // Placeholder contact info - DO NOT ship fake numbers. Remove telephone or set to real value.
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+90 (262) 643 43 39',
      'contactType': 'customer service',
      'areaServed': 'TR'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Gebze',
      'addressCountry': 'TR'
    }
    ,
    'sameAs': [
      'https://www.facebook.com/ketenpnomatik',
      'https://www.linkedin.com/company/ketenpnomatik',
      'https://www.instagram.com/ketenpnomatik'
    ]
  }

  // Add social profiles (sameAs) - improves Knowledge Panel detection
  // included below as part of the Organization graph entry

  // Build @graph array depending on page key
  let graph: any[] = []

  switch (key) {
    case 'home':
      graph = [
        // WebSite entry with potentialAction for site search
        {
          '@type': 'WebSite',
          'url': SITE_DOMAIN,
          'name': SITE_NAME,
          'description': desc,
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${SITE_DOMAIN}/ara?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        },
        organization,
        webPage
      ]
      break

    case 'contact':
      graph = [
        webPage,
        organization,
        {
          '@type': 'ContactPoint',
          'contactType': 'customer support',
          'description': desc
        }
      ]
      break

    case 'technical_service':
      graph = [
        webPage,
        organization,
        {
          '@type': 'Service',
          'name': pageTitle,
          'description': desc,
          'provider': { '@type': 'Organization', 'name': SITE_NAME, 'url': SITE_DOMAIN }
        }
      ]
      break

    case 'about':
      graph = [
        webPage,
        organization
      ]
      break

    case 'about_apac':
    case 'about_hiyoki':
    case 'about_kolver':
      // For brand/distributor pages include Brand entity
      const brandName = pageTitle.replace(/ —.*$/,'')
      const brand = {
        '@type': 'Brand',
        'name': brandName,
        'description': desc,
        'logo': { '@type': 'ImageObject', 'url': image }
      }
      graph = [webPage, organization, brand]
      break

    case 'categories':
    case 'products':
      graph = [
        webPage,
        organization,
        {
          '@type': 'CollectionPage',
          'name': pageTitle,
          'description': desc,
          'url': canonical
        }
      ]
      break

    default:
    graph = [webPage, organization]
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

// Wrap buildPageSEO so it injects enhanced structuredData before returning
const originalBuildPageSEO = buildPageSEO
export function buildPageSEOWithSchema(key: PageKey, opts?: PageOpts) {
  const seo = originalBuildPageSEO(key, opts) as any
  seo.structuredData = enhanceStructuredDataForKey(key, seo, opts)
  return seo
}

export function applyPageSEOWithSchema(key: PageKey, opts?: PageOpts) {
  const seo = buildPageSEOWithSchema(key, opts)
  applySEOToHead(seo as any)
}

export default { buildPageSEO: buildPageSEOWithSchema, applyPageSEO: applyPageSEOWithSchema }

function pageKeyToPath(key: PageKey) {
  switch (key) {
    case 'home':
      return '/' 
    case 'contact':
      return '/iletisim'
    case 'technical_service':
      return '/teknik-servis'
    case 'about':
      return '/hakkimizda'
    case 'about_apac':
      return '/hakkimizda/apac'
    case 'about_hiyoki':
      return '/hakkimizda/hiyoki'
    case 'about_kolver':
      return '/hakkimizda/kolver'
    case 'categories':
      return '/kategoriler'
    case 'products':
      return '/urunler'
    default:
      return '/'
  }
}

// expose schema-enabled versions under the original names for backward compatibility
export { buildPageSEOWithSchema as buildPageSEO, applyPageSEOWithSchema as applyPageSEO }

// Apply SEO data to document head (for React components)
export function applySEOToHead(seoData: any) {
  // Set title
  if (seoData?.title) document.title = seoData.title

  // Remove old meta tags
  const oldMetas = document.querySelectorAll('meta[data-seo="true"]')
  oldMetas.forEach((meta) => meta.remove())

  const oldLinks = document.querySelectorAll('link[data-seo="true"]')
  oldLinks.forEach((link) => link.remove())

  const oldScripts = document.querySelectorAll('script[data-seo="true"]')
  oldScripts.forEach((script) => script.remove())

  // Add new meta tags
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

  // Add canonical link
  ;(seoData.link || []).forEach((linkData: any) => {
    // remove any existing canonical links (static or dynamic) to avoid duplicates
    const existingCanonicals = Array.from(document.querySelectorAll('link[rel="canonical"]'))
    existingCanonicals.forEach((l) => {
      // normalize hrefs: treat presence/absence of trailing slash as same
      try {
        const href = l.getAttribute('href') || ''
        const normalizedHref = href.endsWith('/') ? href : href === SITE_DOMAIN ? `${SITE_DOMAIN}/` : href
        const newHref = (linkData.href || '').endsWith('/') ? linkData.href : linkData.href === SITE_DOMAIN ? `${SITE_DOMAIN}/` : linkData.href
        if (normalizedHref === newHref) {
          l.remove()
        } else {
          // if different canonical found, still remove to ensure single canonical kept
          l.remove()
        }
      } catch (e) {
        l.remove()
      }
    })

    // Append canonical
    if (linkData.href) {
      // avoid adding exact duplicate
      const exists = Array.from(document.querySelectorAll('link[rel="canonical"]').values()).some((el: Element) => el.getAttribute('href') === linkData.href)
      if (!exists) {
        const link = document.createElement('link')
        link.setAttribute('data-seo', 'true')
        link.setAttribute('rel', linkData.rel || 'canonical')
        link.setAttribute('href', linkData.href)
        document.head.appendChild(link)
      }
    }
  })

  // Add structured data
  if (seoData.structuredData) {
    const script = document.createElement('script')
    script.setAttribute('data-seo', 'true')
    script.setAttribute('type', 'application/ld+json')
    script.textContent = JSON.stringify(seoData.structuredData, null, 2)
    document.head.appendChild(script)
  }

  // Global head additions and structuredData enrichment (non-invasive)
  try {
  const canonicalHref = (seoData.link || []).find((l: any) => l.rel === 'canonical')?.href || (typeof window !== 'undefined' ? `${SITE_DOMAIN}${window.location.pathname}` : SITE_DOMAIN)

    // http-equiv content-language
    const httpLang = document.createElement('meta')
    httpLang.setAttribute('data-seo', 'true')
    httpLang.setAttribute('http-equiv', 'content-language')
    httpLang.setAttribute('content', 'tr')
    document.head.appendChild(httpLang)

    // Robots
    const robots = document.createElement('meta')
    robots.setAttribute('data-seo', 'true')
    robots.setAttribute('name', 'robots')
    robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    document.head.appendChild(robots)

    // Sitemap
    const sitemap = document.createElement('link')
    sitemap.setAttribute('data-seo', 'true')
    sitemap.setAttribute('rel', 'sitemap')
    sitemap.setAttribute('type', 'application/xml')
    sitemap.setAttribute('href', 'https://www.ketenpnomatik.com/sitemap.xml')
    document.head.appendChild(sitemap)

    // preconnect / dns-prefetch
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

    // favicons
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
    // ignore non-browser environments
  }

  // Enrich structuredData: add Organization details and BreadcrumbList if missing
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
