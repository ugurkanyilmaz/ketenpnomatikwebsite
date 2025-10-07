// Mapping for usable areas to categories with icons
export interface UsableAreaCategory {
  id: string
  title: string
  icon: string // Icon component name from lucide-react
  keywords: string[] // Keywords that map to this category
}

export const usableAreaCategories: UsableAreaCategory[] = [
  {
    id: 'automotive',
    title: 'Otomotiv',
    icon: 'Car',
    keywords: [
      'Otomotiv Servisleri',
      'Otomotiv Montajı',
      'Otomotiv Sanayi',
      'Otomotiv Endüstrisi',
      'Otomotiv sektörü',
      'Otomotiv Uygulamaları',
      'Hizmet Garajları',
      'Lastik Bakım Atölyeleri'
    ]
  },
  {
    id: 'industrial',
    title: 'Endüstriyel Üretim',
    icon: 'Factory',
    keywords: [
      'Endüstriyel Montaj',
      'Endüstriyel Üretim',
      'Endüstriyel Uygulamalar',
      'Endüstriyel Bakım',
      'Endüstriyel Otomasyon',
      'Ağır Sanayi',
      'Sanayi Tesisleri',
      'Üretim Tesisleri'
    ]
  },
  {
    id: 'metalwork',
    title: 'Metal İşleme',
    icon: 'Settings',
    keywords: [
      'Metal İşleme',
      'Metal Kesimi',
      'Metal Yüzeyler',
      'Hassas Metal İşleme',
      'Kalıp üretimi',
      'Mikro Kalıpçılık',
      'Prototip Üretimi',
      'Yüzey Hazırlama'
    ]
  },
  {
    id: 'electronics',
    title: 'Elektronik',
    icon: 'Cpu',
    keywords: [
      'Elektronik Montaj',
      'Elektronik Üretimi',
      'Elektronik Bakım',
      'Elektronik Onarımları',
      'Elektronik Parça Üretimi',
      'Elektronik Üretim',
      'Elektrik ve Elektronik Testleri'
    ]
  },
  {
    id: 'construction',
    title: 'İnşaat & Yapı',
    icon: 'HardHat',
    keywords: [
      'İnşaat Sektörü',
      'İnşaat Projeleri',
      'Elektrik Tesisatı',
      'Elektrik Tesisatları',
      'Su Tesisatı',
      'Elektrik Bakım'
    ]
  },
  {
    id: 'furniture',
    title: 'Mobilya & Ahşap',
    icon: 'Armchair',
    keywords: [
      'Mobilya Üretimi',
      'Mobilya İmalatı',
      'Mobilya Montajı',
      'Mobilya Tamiri',
      'Ahşap İşleme'
    ]
  },
  {
    id: 'marine-aviation',
    title: 'Denizcilik & Havacılık',
    icon: 'Plane',
    keywords: [
      'Gemi Bakım & Tamiri',
      'Gemi İnşaatı',
      'Havacılık',
      'Havacılık Sektörü',
      'Havacılık Bakım',
      'Havacılık Endüstrisi'
    ]
  },
  {
    id: 'machinery',
    title: 'Makine Bakım & Onarım',
    icon: 'Wrench',
    keywords: [
      'Makine Bakımı',
      'Makine Bakım',
      'Makine İmalatı',
      'Makine Onarımları',
      'Makine Bakım & Onarım',
      'Hidrolik Sistemler'
    ]
  },
  {
    id: 'entertainment',
    title: 'Eğlence & Etkinlik',
    icon: 'PartyPopper',
    keywords: [
      'Sirk Performansları',
      'Sirk ve Gösteri Sanatları',
      'Eğlence Endüstrisi',
      'Eğlence Etkinlikleri',
      'Oyun Parkları',
      'Sahne Gösterileri',
      'Akrobatik Eğitim',
      'Spor Salonları'
    ]
  },
  {
    id: 'hobby-home',
    title: 'Hobi & Ev',
    icon: 'Home',
    keywords: [
      'Hobi Atölyeleri',
      'Hobi ve DIY Projeleri',
      'Hobi ve El Sanatları',
      'Ev Bakım ve Onarım',
      'Ev Kullanımı',
      'Atölye Çalışmaları',
      'Sanat ve Tasarım'
    ]
  },
  {
    id: 'logistics',
    title: 'Lojistik & Depolama',
    icon: 'Package',
    keywords: [
      'Lojistik Sektörü',
      'Depo Yönetimi',
      'Paketleme Hizmetleri'
    ]
  },
  {
    id: 'other',
    title: 'Diğer',
    icon: 'Hammer',
    keywords: [
      'Reklamcılık',
      'Eğitim Kurumları',
      'Havalı Alet Uygulamaları'
    ]
  }
]

// Helper function to map a usable area text to its category
export function mapUsableAreaToCategory(areaText: string): UsableAreaCategory | null {
  const trimmed = areaText.trim()
  
  for (const category of usableAreaCategories) {
    if (category.keywords.some(keyword => 
      keyword.toLowerCase() === trimmed.toLowerCase() ||
      trimmed.toLowerCase().includes(keyword.toLowerCase())
    )) {
      return category
    }
  }
  
  return null
}

// Helper function to get unique categories from a list of usable areas
export function getUniqueCategoriesFromAreas(areasText: string): UsableAreaCategory[] {
  const areas = areasText.split(/[,\n]/).map(a => a.trim()).filter(a => a)
  const categoryMap = new Map<string, UsableAreaCategory>()
  
  for (const area of areas) {
    const category = mapUsableAreaToCategory(area)
    if (category && !categoryMap.has(category.id)) {
      categoryMap.set(category.id, category)
    }
  }
  
  return Array.from(categoryMap.values())
}
