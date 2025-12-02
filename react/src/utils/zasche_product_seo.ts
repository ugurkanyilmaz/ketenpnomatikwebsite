import { zascheProducts } from '../data/zascheProducts'
import { applyZascheSEO } from './zasche_seo'
import { normalizeImageUrl } from './seo_utils'

const SITE_DOMAIN = 'https://www.ketenpnomatik.com'
const SITE_NAME = 'Keten Pnömatik'

export function buildZascheProductSEO(productId: string) {
    const product = zascheProducts.find(p => p.id === productId)

    if (!product) return null

    const title = product.seo?.title || product.title
    const description = product.seo?.description || product.heroDescription || product.mainDescription.paragraphs[0].substring(0, 160)

    const pageTitle = product.seo?.title ? `${product.seo.title}` : `${title} - Zasche Handling | ${SITE_NAME}`

    const canonicalUrl = product.link
        ? `${SITE_DOMAIN}${product.link}`
        : `${SITE_DOMAIN}/urun/${productId}`

    const imageUrl = normalizeImageUrl(product.gallery.main)

    // Category Mapping for Breadcrumbs
    const categoryMap: Record<string, { name: string, url: string }> = {
        'kaldirma': { name: 'Kaldırma Ekipmanları', url: '/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler' },
        'manipulatorler': { name: 'Manipülatörler', url: '/kategoriler/manipulatorler/manipulatorler' },
        'asmavinc': { name: 'Asma Vinç Sistemleri', url: '/kategoriler/manipulatorler/asma-vinc-sistemleri' },
        'ozelcozumler': { name: 'Özel Ekipmanlar', url: '/kategoriler/manipulatorler/ozel-ekipmanlar' }
    }

    const category = product.categoryId ? categoryMap[product.categoryId] : null

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": SITE_DOMAIN
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Zasche Handling",
                "item": `${SITE_DOMAIN}/kategoriler/manipulatorler`
            },
            ...(category ? [{
                "@type": "ListItem",
                "position": 3,
                "name": category.name,
                "item": `${SITE_DOMAIN}${category.url}`
            }] : []),
            {
                "@type": "ListItem",
                "position": category ? 4 : 3,
                "name": product.title,
                "item": canonicalUrl
            }
        ]
    }

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": title,
        "image": imageUrl,
        "description": product.seo?.schemaDescription || description,
        "brand": {
            "@type": "Brand",
            "name": "Zasche Handling"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Zasche Handling"
        },
        "offers": {
            "@type": "Offer",
            "url": canonicalUrl,
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": SITE_NAME
            }
        }
    }

    let fullDescription = description
    if (product.specs && !product.seo?.description) {
        const specs = Object.entries(product.specs)
            .map(([key, val]) => `${key}: ${val}`)
            .join(', ')
        fullDescription += ` (${specs})`
    }

    const keywords = product.seo?.keywords
        ? product.seo.keywords.join(', ')
        : `${title}, zasche, manipülatör, kaldırma, taşıma, ergonomi, ${product.subtitle || ''}`

    return {
        title: pageTitle,
        meta: [
            { name: 'description', content: fullDescription },
            { name: 'keywords', content: keywords },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: fullDescription },
            { property: 'og:image', content: imageUrl },
            { property: 'og:url', content: canonicalUrl },
            { property: 'og:type', content: 'product' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: pageTitle },
            { name: 'twitter:description', content: fullDescription },
            { name: 'twitter:image', content: imageUrl }
        ],
        link: [
            { rel: 'canonical', href: canonicalUrl }
        ],
        structuredData: [productSchema, breadcrumbSchema]
    }
}

export function applyZascheProductSEO(seoData: any) {
    if (!seoData) return
    applyZascheSEO(seoData)
}
