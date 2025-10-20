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

  // No temporary mock data — page will wait for real API-provided children.

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

  // Only render actual children returned from the API. If there are none,
  // render nothing so the page waits for real data.
  const displayChildren = tierData?.children || []

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="breadcrumbs text-sm py-4"><ul><li><Link to="/">Ana sayfa</Link></li><li><Link to="/kategoriler">Kategoriler</Link></li><li>{tierData?.title || 'Kategori'}</li></ul></div>
        <h1 className="text-3xl font-bold">{tierData?.title || 'Kategori'}</h1>
        <style>{`
          .card-grid-300 { grid-template-columns: repeat(auto-fill, 300px); justify-content: start; }
          @media (min-width: 1200px) { .card-grid-300 { grid-template-columns: repeat(4, 300px); } }
        `}</style>
        {error && <div className="alert alert-error mt-4">{error}</div>}
        {!tiers && !error && <div className="mt-6">Yükleniyor...</div>}
        {tiers && !tierData && <div className="alert alert-warning mt-4">Kategori bulunamadı: {tier}</div>}
  {displayChildren && displayChildren.length > 0 && (
    <div className="grid gap-7 mt-6 card-grid-300 justify-items-center">
      {displayChildren.map((s) => {
        const photo = getPhotoForChild(s.title)
        const title = s.title
        const desc = s.subchildren?.length ? `${s.subchildren.length} seri` : 'Alt kategoriler yakında'

        return (
          <Link key={s.id} to={`/kategoriler/${tier}/${s.id}`}>
            <div style={{ width: 300, maxWidth: 300 }}>
              <div className="rounded-lg overflow-hidden shadow-lg">
                {photo && photo.photo_url ? (
                  <div style={{ position: 'relative', width: '100%', paddingTop: '50%' }}>
                    <img src={photo.photo_url} alt={photo.alt_text || title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ) : (
                  // No dynamic photo: show a neutral empty box (no placeholder image)
                  <div style={{ width: '100%', paddingTop: '50%' }} className="bg-base-200 flex items-center justify-center">
                    <span className="text-base-content/40">&nbsp;</span>
                  </div>
                )}

                <div className="p-4 bg-base-100">
                  <div className="text-lg font-semibold">{title}</div>
                  <div className="text-sm text-base-content/70 mt-1">{desc}</div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )}
      </div>
    </section>
  )
}
