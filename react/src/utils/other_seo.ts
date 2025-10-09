import { applySEOToHead } from './blog_seo'

const SITE_DOMAIN = 'https://ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'
const DEFAULT_IMAGE = `${SITE_DOMAIN}/keten_banner.jpg`

type PageKey =
  | 'home'
  | 'contact'
  | 'technical_service'
  | 'about'
  | 'about_apac'
  | 'about_hiyoki'
  | 'about_kolver'
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
  const title = `${pageTitle} | ${SITE_NAME}`
  const canonical = `${SITE_DOMAIN}${path}`
  const meta = [
    { name: 'description', content: desc },
    { name: 'keywords', content: keywords },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { name: 'googlebot', content: 'index, follow' },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: desc },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: image || DEFAULT_IMAGE },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: desc },
    { name: 'twitter:image', content: image || DEFAULT_IMAGE },
  ]

  const link = [{ rel: 'canonical', href: canonical }]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'url': canonical,
    'name': pageTitle,
    // description for schema; keep same as meta description by default
    'description': desc,
    'inLanguage': 'tr-TR',
    'primaryImageOfPage': { '@type': 'ImageObject', 'url': image || DEFAULT_IMAGE }
  }

  return { title, meta, link, structuredData }
}

function buildPageSEO(key: PageKey, opts?: PageOpts) {
  const path = opts?.path || pageKeyToPath(key)
  switch (key) {
    case 'home':
      return buildBase(
        opts?.title || 'Ana Sayfa',
        opts?.description || 'Keten Pnömatik, endüstriyel üretim alanlarına yönelik havalı ve elektrikli el aletleri, montaj çözümleri ve teknik servis hizmetleri sunar. Kolver, Apac ve Hiyoki gibi dünya markalarının yetkili satıcısı olarak, kalite, dayanıklılık ve güvenilir servis desteğini bir arada bulabilirsiniz. Profesyonel montaj ve bakım çözümlerinde yüksek performanslı ürünlerimizle yanınızdayız.',
        opts?.keywords || 'havalı el aletleri, pnömatik el aletleri, endüstriyel montaj sistemleri, kolver, apac, hiyoki, teknik servis, endüstriyel ekipman, tork ölçüm cihazı, profesyonel aletler',
        path,
        opts?.image,
      )

    case 'contact':
      return buildBase(
        opts?.title || 'İletişim',
        opts?.description || 'Bize ulaşın — teklif, demo talebi veya teknik destek için iletişim bilgilerimizi kullanın.',
        opts?.keywords || 'iletişim, teklif, demo, teknik destek, Keten Pnömatik',
        path,
        opts?.image,
      )

    case 'technical_service':
      return buildBase(
        opts?.title || 'Teknik Servis',
        opts?.description || 'Her markadan tüm havalı ve elektrikli aletler için yetkili teknik servis, bakım ve orijinal yedek parça desteği. Keten Teknik Servis Merkezi olarak Kolver, Apac ve Hiyoki dahil tüm profesyonel el aletlerinde hızlı arıza tespiti, garanti içi ve garanti dışı onarım, yerinde tork ölçüm ve kalibrasyon hizmetleri sunuyoruz. Ürünlerinizi kargo ile gönderebilir veya servise elden teslim edebilirsiniz. Onayınızdan sonra en kısa sürede işlemler tamamlanır.',
        opts?.keywords || 'teknik servis, havalı el aletleri servisi, elektrikli alet servisi, kolver teknik servis, apac servis, hiyoki servis, bakım, onarım, kalibrasyon, yedek parça, keten teknik servis, gebze teknik servis, endüstriyel servis',
        path,
        opts?.image,
      )

    case 'about':
      return buildBase(
        opts?.title || 'Hakkımızda',
        opts?.description || 'Keten Pnömatik olarak endüstriyel sektörlerde güvenilir, yenilikçi ve uzun ömürlü çözümler sunuyoruz. Yılların deneyimi ve güçlü marka iş birlikleriyle müşterilerimize sadece ürün değil, komple sistem çözümleri sunmaktayız. Satış, servis, bakım ve teknik danışmanlık hizmetlerimizle üretim süreçlerinizi daha verimli hale getiriyoruz.',
        opts?.keywords || 'keten pnömatik, hakkımızda, endüstriyel firma, havalı el aletleri distribütörü, teknik servis, montaj sistemleri, endüstriyel çözüm ortağı, endüstriyel üretim',
        path,
        opts?.image,
      )

    case 'about_apac':
      return buildBase(
        opts?.title || 'APAC — Distribütörlük',
        opts?.description || 'Apac, dayanıklılığı ve ergonomik tasarımıyla endüstriyel havalı el aletleri alanında güvenilir bir markadır. Keten Pnömatik, Apac ürünlerinin satış ve teknik servisinde yetkili merkezdir. Atölye, otomotiv ve sanayi uygulamaları için yüksek performanslı çözümler sunar.',
        opts?.keywords || 'apac, apac türkiye, apac el aletleri, apac distribütör, havalı alet, endüstriyel ekipman, apac servis, apac teknik servis',
        path,
        opts?.image,
      )

    case 'about_hiyoki':
      return buildBase(
        opts?.title || 'Hiyoki — Ölçüm Cihazları',
        opts?.description || 'Hiyoki, elektriksel test ve ölçüm çözümleriyle global ölçekte tanınan bir markadır. Keten Pnömatik olarak Hiyoki ürünlerinin satış ve teknik servis desteğini sunuyoruz. Ölçüm cihazlarında doğruluk, dayanıklılık ve güvenilir performansla endüstride fark yaratmaktadır.',
        opts?.keywords || 'hiyoki, hiyoki türkiye, hiyoki ölçüm cihazı, test cihazı, elektrik ölçüm, hiyoki distribütör, hiyoki servis',
        path,
        opts?.image,
      )

    case 'about_kolver':
      return buildBase(
        opts?.title || 'Kolver — Tork Kontrol Sistemleri',
        opts?.description || 'Kolver, elektrikli tork ayarlı tornavidalarıyla endüstriyel montaj süreçlerinde yüksek hassasiyet, güvenilirlik ve verimlilik sağlar. Keten Pnömatik olarak, Kolver’in Türkiye’deki yetkili satış ve servis merkezidir. Profesyonel montaj hatlarında optimum performans, uzun ömür ve kararlı tork değerleriyle üretim kalitesini artıran çözümler sunuyoruz.',
        opts?.keywords || 'kolver, kolver türkiye, kolver elektrikli tornavida, tork ayarlı tornavida, kolver tork kontrol, elektrikli montaj tornavida, kolver distribütör, endüstriyel montaj sistemi, kolver servis',
        path,
        opts?.image,
      )

    case 'categories':
      return buildBase(
        opts?.title || 'Kategoriler',
        opts?.description || 'Havalı el aletlerinden tork ölçüm cihazlarına, montaj sistemlerinden bakım ekipmanlarına kadar geniş ürün kategorilerimizi keşfedin. Her ihtiyaca özel endüstriyel çözümleri tek çatı altında sunuyoruz.',
        opts?.keywords || 'havalı el aletleri kategorileri, montaj sistemleri, ölçüm cihazları, kalibrasyon, endüstriyel ekipman, pnömatik ürünler, el aletleri',
        path || '/kategoriler',
        opts?.image,
      )

    case 'products':
      return buildBase(
        opts?.title || 'Ürünler',
        opts?.description || 'Kolver, Apac ve Hiyoki markalarının havalı, elektrikli ve ölçüm ekipmanlarını tek platformda bulabilirsiniz. Tüm ürünlerimiz orijinal, dayanıklı ve profesyonel kullanım için tasarlanmıştır. Endüstriyel üretimde kalite ve verimlilik sağlayan çözümlerimizle tanışın.',
        opts?.keywords || 'kolver ürünleri, apac ürünleri, hiyoki ürünleri, havalı alet, endüstriyel ekipman, tork anahtarı, elektrikli el aleti, ölçüm cihazı, pnömatik sistem',
        path || '/urunler',
        opts?.image,
      )

    default:
      return buildBase(opts?.title || SITE_NAME, opts?.description || '', opts?.keywords || SITE_NAME, path || '/', opts?.image)
  }
}

// Enhance structuredData per page key to include schema.org graph entries
function enhanceStructuredDataForKey(key: PageKey, base: any, opts?: PageOpts) {
  const canonical = base.link?.[0]?.href || `${SITE_DOMAIN}${pageKeyToPath(key)}`
  const image = (opts && opts.image) || base.meta.find((m: any) => m.name === 'twitter:image' || m.property === 'og:image')?.content || DEFAULT_IMAGE
  const desc = base.meta.find((m: any) => m.name === 'description')?.content || ''
  const pageTitle = base.title || SITE_NAME

  const webPage = {
    '@type': 'WebPage',
    'url': canonical,
    'name': pageTitle,
    'description': desc,
    'inLanguage': 'tr-TR',
    'primaryImageOfPage': { '@type': 'ImageObject', 'url': image }
  }

  const organization = {
    '@type': 'Organization',
    'name': SITE_NAME,
    'url': SITE_DOMAIN,
    'logo': { '@type': 'ImageObject', 'url': DEFAULT_IMAGE }
  }

  // Build @graph array depending on page key
  let graph: any[] = []

  switch (key) {
    case 'home':
      graph = [
        { '@type': 'WebSite', 'url': SITE_DOMAIN, 'name': SITE_NAME, 'description': desc },
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
