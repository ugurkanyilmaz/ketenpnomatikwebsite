import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { fetchTiers, type Tier } from '../utils/api'

interface CategoryPhoto {
  id: number
  parent: string
  child: string
  photo_url: string
  alt_text: string
  display_order: number
}

export default function Subcategories() {
  const { tier } = useParams()
  const [tiers, setTiers] = useState<Tier[] | null>(null)
  const [categoryPhotos, setCategoryPhotos] = useState<CategoryPhoto[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    
    // Load category structure
    fetchTiers()
      .then((t) => { if (active) setTiers(t) })
      .catch((e) => { if (active) setError(String(e?.message || e)) })
    
    // Load category photos
    fetch('/php/api/category_photos_list.php')
      .then(res => res.json())
      .then(data => {
        if (active && data.success && data.photos) {
          console.log('📸 Loaded category photos:', data.photos)
          setCategoryPhotos(data.photos)
        }
      })
      .catch(err => console.error('Failed to load category photos:', err))
    
    return () => { active = false }
  }, [])

  const tierData = useMemo(() => {
    console.log('Finding tier:', tier, 'Available tiers:', tiers?.map(t => t.id))
    return tiers?.find(t => t.id === (tier || 'endustriyel'))
  }, [tiers, tier])

  console.log('tierData:', tierData, 'children count:', tierData?.children?.length)

  // Function to get photo for a child category
  const getPhotoForChild = (childTitle: string) => {
    if (!tierData) return null
    
    // Find photo matching parent + child
    const photo = categoryPhotos.find(p => 
      p.parent === tierData.title && p.child === childTitle
    )
    
    console.log(`🖼️ Looking for photo: parent="${tierData.title}", child="${childTitle}"`, photo ? 'FOUND' : 'NOT FOUND')
    
    return photo
  }

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="breadcrumbs text-sm py-4"><ul><li><Link to="/">Ana sayfa</Link></li><li><Link to="/kategoriler">Kategoriler</Link></li><li>{tierData?.title || 'Kategori'}</li></ul></div>
        <h1 className="text-3xl font-bold">{tierData?.title || 'Kategori'}</h1>
        {error && <div className="alert alert-error mt-4">{error}</div>}
        {!tiers && !error && <div className="mt-6">Yükleniyor...</div>}
        {tiers && !tierData && <div className="alert alert-warning mt-4">Kategori bulunamadı: {tier}</div>}
        {tierData && tierData.children && tierData.children.length > 0 && (
        <div className="grid gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {tierData.children.map((s) => {
            const photo = getPhotoForChild(s.title)
            const imageUrl = photo?.photo_url || `https://picsum.photos/seed/${s.id}/800/600`
            
            const item = (
              <div className="group relative block rounded-box overflow-hidden shadow hover:shadow-lg transition-shadow">
                <img
                  src={imageUrl}
                  alt={`${s.title} - Alt Kategori Görseli`}
                  title={s.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to mock if custom photo fails
                    e.currentTarget.src = `https://picsum.photos/seed/${s.id}/800/600`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-300/70 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <div className="badge badge-primary badge-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">İncele</div>
                  <div className="text-lg font-semibold">{s.title}</div>
                  <div className="text-base-content/70">{s.subchildren?.length ? `${s.subchildren.length} seri` : 'Alt kategoriler yakında'}</div>
                </div>
              </div>
            )
            return (
              <Link key={s.id} to={`/kategoriler/${tier}/${s.id}`}>{item}</Link>
            )
          })}
        </div>
        )}
      </div>
    </section>
  )
}
