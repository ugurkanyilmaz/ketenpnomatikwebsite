import { slugifyForApi } from '../../utils/search'

export interface ZascheSubProduct {
    title: string
    slug: string
    description?: string
    image?: string
}

export interface ZascheCategory {
    title: string
    slug: string
    description: string
    longDescription: string
    heroImage: string
    videoUrl?: string
    features: string[]
    subProducts: ZascheSubProduct[]
}

export const zascheCategories: ZascheCategory[] = [
    {
        title: 'Manipülatörler',
        slug: slugifyForApi('Manipülatörler'),
        description: 'Endüstriyel yük taşıma ve pozisyonlama için ergonomik çözümler.',
        longDescription: 'ZASCHE manipülatörleri, üretim hatlarında ve montaj istasyonlarında operatörlerin ağır yükleri zahmetsizce ve hassas bir şekilde taşımasını sağlar. Ergonomik tasarımı sayesinde iş kazalarını azaltır, verimliliği artırır ve çalışan sağlığını korur. İster pnömatik ister elektrikli olsun, her türlü yük için özelleştirilebilir çözümler sunuyoruz.',
        heroImage: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Manipulatorler',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
        features: [
            'Ağırlıksız yük taşıma hissi',
            'Yüksek hassasiyetli pozisyonlama',
            'Operatör yorgunluğunu minimize eden ergonomi',
            'Geniş çalışma alanı ve esnek hareket kabiliyeti',
            'Farklı yük tipleri için değiştirilebilir tutucular'
        ],
        subProducts: [
            {
                title: 'Mafsallı Kollar',
                slug: slugifyForApi('Mafsallı Kollar'),
                description: 'Geniş erişim alanı sağlayan çok eklemli kol sistemleri.'
            },
            {
                title: 'Paralelogram Manipülatörler',
                slug: slugifyForApi('Paralelogram Manipülatörler'),
                description: 'Ağır yükler için rijit ve dengeli kaldırma çözümü.'
            },
            {
                title: 'Kaldırma Eksenleri',
                slug: slugifyForApi('Kaldırma Eksenleri'),
                description: 'Dikey hareketler için hassas lineer eksenler.'
            },
            {
                title: 'Teleskopik Kaldırma Cihazları',
                slug: slugifyForApi('Teleskopik Kaldırma Cihazları'),
                description: 'Düşük tavanlı alanlar için kompakt çözümler.'
            },
            {
                title: 'İstifleme Vinçleri',
                slug: slugifyForApi('İstifleme Vinçleri'),
                description: 'Depolama ve istifleme işlemleri için optimize edilmiş vinçler.'
            },
            {
                title: 'Zemin Kılavuzlu Taşıma Cihazları',
                slug: slugifyForApi('Zemin Kılavuzlu Taşıma Cihazları'),
                description: 'Zemine monte raylar üzerinde hareket eden mobil sistemler.'
            }
        ]
    },
    {
        title: 'Kaldırma Ekipmanları / Halatlı Dengeleyiciler',
        slug: slugifyForApi('Kaldırma Ekipmanları / Halatlı Dengeleyiciler'),
        description: 'Hassas ve güvenli yük kaldırma için gelişmiş sistemler.',
        longDescription: 'Halatlı dengeleyicilerimiz, yüklerin "yüzer" modda taşınmasına olanak tanır. Bu sayede operatör, yükü elleriyle doğrudan yönlendirebilir ve milimetrik hassasiyetle yerleştirebilir. Hızlı, sessiz ve güvenli çalışma prensibiyle montaj hatlarının vazgeçilmezidir.',
        heroImage: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Kaldirma+Ekipmanlari',
        features: [
            'Yüksek kaldırma hızları',
            'Hassas "yüzer" mod kontrolü',
            'Programlanabilir yük sınırları',
            'Kullanıcı dostu kontrol kolları',
            'Entegre güvenlik özellikleri'
        ],
        subProducts: [
            {
                title: 'Elektrikli Halatlı Vinç',
                slug: slugifyForApi('Elektrikli Halatlı Vinç'),
                description: 'Güçlü ve dayanıklı elektrikli kaldırma üniteleri.'
            },
            {
                title: 'Pnömatik Halatlı Dengeleyiciler',
                slug: slugifyForApi('Pnömatik Halatlı Dengeleyiciler'),
                description: 'Hava gücüyle çalışan, patlamaya dayanıklı (ATEX) seçenekli dengeleyiciler.'
            },
            {
                title: 'Elektrikli Halatlı Dengeleyiciler',
                slug: slugifyForApi('Elektrikli Halatlı Dengeleyiciler'),
                description: 'Akıllı kontrol sistemlerine sahip servo motorlu dengeleyiciler.'
            }
        ]
    },
    {
        title: 'Asma Vinç Sistemleri',
        slug: slugifyForApi('Asma Vinç Sistemleri'),
        description: 'Esnek ve modüler tavan vinç çözümleri.',
        longDescription: 'ZASCHE asma vinç sistemleri, alüminyum veya çelik profillerden oluşan modüler yapısıyla her türlü bina yapısına uyum sağlar. Düşük sürtünmeli raylar, yüklerin minimum kuvvetle yatayda hareket ettirilmesine olanak tanır. Mevcut sistemlere kolayca entegre edilebilir ve genişletilebilir.',
        heroImage: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Asma+Vinc+Sistemleri',
        features: [
            'Modüler ve genişletilebilir yapı',
            'Düşük sürtünmeli, sessiz hareket',
            'Kolay montaj ve bakım',
            'Geniş açıklıklarda bile yüksek stabilite',
            'Manuel veya elektrikli yürütme seçenekleri'
        ],
        subProducts: [
            {
                title: 'Çelik Üstyapı / Vinç Destek Yapısı',
                slug: slugifyForApi('Çelik Üstyapı / Vinç Destek Yapısı'),
                description: 'Asma vinç sistemlerini kurmak için gereken çelik konstrüksiyon yapılarıdır. Uzman mühendislerimiz ve sertifikalı kaynak personelimizle, projenize özel planlama ve uygulama hizmeti sunuyoruz.'
            },
            {
                title: 'Hafif Vinç Sistemleri',
                slug: slugifyForApi('Hafif Vinç Sistemleri'),
                description: 'Tek veya çift kirişli hafif vinç sistemleri; manipülatörler ve kaldırma ekipmanlarımızla birleştirilerek kapsamlı ve modüler bir taşıma sistemi oluşturur.'
            },
            {
                title: 'Pergel Vinçler',
                slug: slugifyForApi('Pergel Vinçler'),
                description: 'Duvar veya zemin montajlı, geniş erişim menziline sahip ergonomik döner vinçler. Halatlı dengeleyiciler veya zincirli vinçlerle kombine edilerek basit taşıma operasyonlarını yönetir.'
            }
        ]
    },
    {
        title: 'Özel Ekipmanlar',
        slug: slugifyForApi('Özel Ekipmanlar'),
        description: 'Spesifik ihtiyaçlar için özelleştirilmiş taşıma çözümleri.',
        longDescription: 'Standart ürünlerin ötesinde, üretim süreçlerinize özel olarak tasarlanmış taşıma ve tutma ekipmanları sunuyoruz. Karmaşık geometrili parçalar, yüksek sıcaklıklı ortamlar veya özel hijyen gereksinimleri için mühendislik harikası çözümler geliştiriyoruz.',
        heroImage: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Ozel+Ekipmanlar',
        features: [
            'Müşteri ihtiyaçlarına özel tasarım',
            'Karmaşık parçalar için özel tutucular',
            'Entegre otomasyon çözümleri',
            'Zorlu ortam koşullarına dayanıklılık',
            'Tam kapsamlı mühendislik desteği'
        ],
        subProducts: [
            {
                title: 'Takım Taşıma / Takım Panelleri',
                slug: slugifyForApi('Takım Taşıma / Takım Panelleri'),
                description: 'Ergonomik iş istasyonları için optimize edilmiş, kablo dağınıklığını önleyen ve iş güvenliğini artıran özel takım panelleri ve taşıma sistemleri.'
            }
        ]
    }
]