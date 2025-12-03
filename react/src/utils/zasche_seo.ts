import { initGtag, sendPageView } from './google_codes'

const SITE_DOMAIN = 'https://www.ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'
const DEFAULT_IMAGE = `${SITE_DOMAIN}/weblogo.jpg`

export type ZaschePageKey =
    | 'manipulatorler_home'
    | 'category_manipulatorler'
    | 'category_kaldirma'
    | 'category_asmavinc'
    | 'category_ozelcozumler'

interface PageOpts {
    title?: string
    description?: string
    keywords?: string
    image?: string
    video?: string
    path?: string
    products?: Array<{
        name: string
        url: string
        image: string
        description?: string
    }>
}

// --- Core SEO Builder ---

function buildBase(
    title: string,
    description: string,
    keywords: string,
    path: string,
    image: string = DEFAULT_IMAGE,
    video?: string,
    products?: PageOpts['products']
) {
    const canonical = `${SITE_DOMAIN}${path}`
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

    const structuredData: any = {
        '@context': 'https://schema.org',
        '@graph': [
            // Organization
            {
                '@type': 'Organization',
                '@id': `${SITE_DOMAIN}/#organization`,
                'name': SITE_NAME,
                'url': SITE_DOMAIN,
                'logo': {
                    '@type': 'ImageObject',
                    'url': DEFAULT_IMAGE
                },
                'contactPoint': {
                    '@type': 'ContactPoint',
                    'telephone': '+90 (262) 643 43 39',
                    'contactType': 'customer service',
                    'areaServed': 'TR',
                    'availableLanguage': 'Turkish'
                }
            },
            // WebSite
            {
                '@type': 'WebSite',
                '@id': `${SITE_DOMAIN}/#website`,
                'url': SITE_DOMAIN,
                'name': SITE_NAME,
                'publisher': { '@id': `${SITE_DOMAIN}/#organization` }
            },
            // WebPage
            {
                '@type': 'WebPage',
                '@id': `${canonical}#webpage`,
                'url': canonical,
                'name': title,
                'description': description,
                'inLanguage': 'tr-TR',
                'isPartOf': { '@id': `${SITE_DOMAIN}/#website` },
                'primaryImageOfPage': {
                    '@type': 'ImageObject',
                    'url': image.startsWith('http') ? image : `${SITE_DOMAIN}${image}`
                }
            },
            // BreadcrumbList
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonical}#breadcrumb`,
                'itemListElement': buildBreadcrumbs(path, title)
            }
        ]
    }

    // Add ItemList if products are present
    if (products && products.length > 0) {
        structuredData['@graph'].push({
            '@type': 'ItemList',
            'itemListElement': products.map((prod, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'url': prod.url.startsWith('http') ? prod.url : `${SITE_DOMAIN}${prod.url}`,
                'name': prod.name,
                'image': prod.image.startsWith('http') ? prod.image : `${SITE_DOMAIN}${prod.image}`,
                ...(prod.description && { 'description': prod.description })
            }))
        })
    }

    // Add VideoObject if video is present
    if (video) {
        structuredData['@graph'].push({
            '@type': 'VideoObject',
            'name': title,
            'description': description,
            'thumbnailUrl': image.startsWith('http') ? image : `${SITE_DOMAIN}${image}`,
            'uploadDate': new Date().toISOString(),
            'contentUrl': video.startsWith('http') ? video : `${SITE_DOMAIN}${video}`,
            'embedUrl': video.startsWith('http') ? video : `${SITE_DOMAIN}${video}`
        })
    }

    return {
        title: fullTitle,
        meta: [
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
            { name: 'robots', content: 'index, follow, max-image-preview:large' },
            { name: 'googlebot', content: 'index, follow' },

            // Open Graph
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: SITE_NAME },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: canonical },
            { property: 'og:image', content: image.startsWith('http') ? image : `${SITE_DOMAIN}${image}` },
            { property: 'og:locale', content: 'tr_TR' },

            // Twitter
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image.startsWith('http') ? image : `${SITE_DOMAIN}${image}` },
        ],
        link: [
            { rel: 'canonical', href: canonical }
        ],
        structuredData: structuredData
    }
}

// --- Page Specific Logic ---

export function buildZascheSEO(key: ZaschePageKey, opts?: PageOpts) {
    const path = zaschePageKeyToPath(key)

    switch (key) {
        case 'manipulatorler_home':
            return buildBase(
                opts?.title || 'ZASCHE Manipülatörler | Endüstriyel Yük Taşıma ve Ergonomi Çözümleri',
                opts?.description || 'Zasche manipülatör sistemleri ile üretim hattınızda iş güvenliğini ve verimliliği artırın. 50kg\'dan 500kg\'a kadar yükler için ağırlıksız taşıma teknolojisi. Ergonomik kaldırma çözümleri.',
                opts?.keywords || 'zasche manipülatör, endüstriyel manipülatör, yük taşıma sistemleri, ergonomik kaldırma, ağırlıksız taşıma, pnömatik manipülatör, elektrikli manipülatör, vakumlu kaldırıcı',
                path,
                opts?.image || '/maniplatorler.jpg',
                opts?.video || '/zasche_videos/maniplatorler.mp4',
                opts?.products
            )

        case 'category_manipulatorler':
            return buildBase(
                opts?.title || 'Endüstriyel Manipülatörler | Pnömatik ve Elektrikli Taşıma Kolları',
                opts?.description || 'Hassas montaj ve taşıma için Zasche manipülatör kolları. Esnek, güvenli ve ergonomik endüstriyel çözümlerimizi keşfedin. Üretim hızınızı artırın.',
                opts?.keywords || 'manipülatör kol, pnömatik kol, endüstriyel robot kol, taşıma manipülatörü, montaj manipülatörü, zasche türkiye, yük dengeleyici',
                path,
                opts?.image || '/maniplatorler.jpg',
                opts?.video || '/zasche_videos/maniplatorler.mp4',
                opts?.products
            )

        case 'category_kaldirma':
            return buildBase(
                opts?.title || 'Kaldırma Ekipmanları ve Halatlı Dengeleyiciler | Hassas Yük Kontrolü',
                opts?.description || 'Zasche kaldırma ekipmanları ve halatlı dengeleyiciler ile yüklerinizi parmak ucu hassasiyetiyle yönetin. Güvenli, hızlı ve ergonomik kaldırma sistemleri.',
                opts?.keywords || 'kaldırma ekipmanları, halatlı dengeleyici, yük dengeleyici, balancer, endüstriyel kaldırma, hassas yük taşıma, zasche lifting',
                path,
                opts?.image || '/kaldirma_sistemleri.jpg',
                opts?.video || '/zasche_videos/kaldirma_ekipmanlari.mp4',
                opts?.products
            )

        case 'category_asmavinc':
            return buildBase(
                opts?.title || 'Asma Vinç Sistemleri | Modüler Alüminyum ve Çelik Ray Sistemleri',
                opts?.description || 'Hafif ve modüler asma vinç sistemleri ile çalışma alanınızı optimize edin. Alüminyum ve çelik ray seçenekleriyle esnek tavan vinç çözümleri.',
                opts?.keywords || 'asma vinç, tavan vinci, hafif vinç sistemi, alüminyum ray sistemi, modüler vinç, kbk sistem, endüstriyel ray, zasche crane',
                path,
                opts?.image || '/asmavincsistemleri.jpg',
                opts?.video || '/zasche_videos/asma.mp4',
                opts?.products
            )

        case 'category_ozelcozumler':
            return buildBase(
                opts?.title || 'Özel Taşıma Çözümleri | Sektöre Özel Manipülatör Tasarımları',
                opts?.description || 'Standart dışı yükleriniz için özel tasarlanmış manipülatör ve tutucu çözümleri. Otomotiv, gıda, kimya ve daha fazlası için size özel mühendislik.',
                opts?.keywords || 'özel manipülatör, özel tutucu, gripper tasarımı, özel kaldırma aparatı, sektörel çözümler, mühendislik çözümleri, zasche custom',
                path,
                opts?.image || '/ozelcozumler.jpg',
                opts?.video || '/zasche_videos/ozelcozumler.mp4',
                opts?.products
            )

        default:
            return buildBase(
                'ZASCHE Endüstriyel Çözümler',
                'Zasche endüstriyel manipülatör ve kaldırma sistemleri.',
                'zasche, manipülatör, kaldırma',
                path,
                undefined,
                undefined,
                opts?.products
            )
    }
}

// --- Helpers ---

export function applyZascheSEO(seoData: any) {
    // 1. Set Title
    document.title = seoData.title

    // 2. Clear Old Tags
    const oldTags = document.querySelectorAll('[data-zasche-seo="true"]')
    oldTags.forEach(tag => tag.remove())

    // 3. Inject Meta Tags
    seoData.meta.forEach((meta: any) => {
        const el = document.createElement('meta')
        el.setAttribute('data-zasche-seo', 'true')
        Object.keys(meta).forEach(key => el.setAttribute(key, meta[key]))
        document.head.appendChild(el)
    })

    // 4. Inject Links
    seoData.link.forEach((link: any) => {
        const el = document.createElement('link')
        el.setAttribute('data-zasche-seo', 'true')
        Object.keys(link).forEach(key => el.setAttribute(key, link[key]))
        document.head.appendChild(el)
    })

    // 5. Inject Structured Data
    if (seoData.structuredData) {
        const el = document.createElement('script')
        el.setAttribute('data-zasche-seo', 'true')
        el.setAttribute('type', 'application/ld+json')
        el.textContent = JSON.stringify(seoData.structuredData)
        document.head.appendChild(el)
    }

    // 6. Initialize Google Codes
    initGtag()
    sendPageView()
}

function zaschePageKeyToPath(key: ZaschePageKey): string {
    switch (key) {
        case 'manipulatorler_home': return '/kategoriler/manipulatorler'
        case 'category_manipulatorler': return '/kategoriler/manipulatorler/manipulatorler'
        case 'category_kaldirma': return '/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler'
        case 'category_asmavinc': return '/kategoriler/manipulatorler/asma-vinc-sistemleri'
        case 'category_ozelcozumler': return '/kategoriler/manipulatorler/ozel-ekipmanlar'
        default: return '/kategoriler/manipulatorler'
    }
}

function buildBreadcrumbs(path: string, title: string) {
    const items = [
        { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': SITE_DOMAIN },
        { '@type': 'ListItem', 'position': 2, 'name': 'Kategoriler', 'item': `${SITE_DOMAIN}/kategoriler` },
    ]

    if (path.includes('/manipulatorler')) {
        items.push({ '@type': 'ListItem', 'position': 3, 'name': 'Manipülatörler', 'item': `${SITE_DOMAIN}/kategoriler/manipulatorler` })
    }

    // If it's a sub-page, add the final item
    if (path !== '/kategoriler/manipulatorler') {
        items.push({ '@type': 'ListItem', 'position': 4, 'name': title.split('|')[0].trim(), 'item': `${SITE_DOMAIN}${path}` })
    }

    return items
}
