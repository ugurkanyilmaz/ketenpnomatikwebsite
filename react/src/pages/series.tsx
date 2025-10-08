import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { fetchTiers, type Tier } from '../utils/api'

export default function Series() {
  const { tier, categoryId } = useParams()
  const [tiers, setTiers] = useState<Tier[] | null>(null)
  const [subchildImages, setSubchildImages] = useState<Record<string, string>>({})

  useEffect(() => {
    let active = true
    
    // Load category structure
    fetchTiers()
      .then((t) => { if (active) setTiers(t) })
    
    // Load subchild main_images from articles API
    fetch('/php/api/articles_find.php')
      .then(res => res.json())
      .then(data => {
        if (active && data.items) {
          console.log('📦 API returned items count:', data.items.length)
          const imageMap: Record<string, string> = {}
          data.items.forEach((item: any) => {
            if (item.subchild && item.main_image) {
              console.log(`  ✅ Subchild: "${item.subchild}" (id: "${item.id}") → Image: "${item.main_image}"`)
              // Store by both subchild name and id to match both original and URL-safe values
              imageMap[item.subchild] = item.main_image
              imageMap[item.id] = item.main_image
              // Also store by title if different
              if (item.title && item.title !== item.subchild) {
                imageMap[item.title] = item.main_image
              }
            }
          })
          console.log('🖼️ Final imageMap keys:', Object.keys(imageMap))
          setSubchildImages(imageMap)
        }
      })
      .catch(err => console.error('Failed to load subchild images:', err))
    
    return () => { active = false }
  }, [])

  const tierKey = tier || 'endustriyel'
  const tierTitle = useMemo(() => {
    const t = tiers?.find(tt => tt.id === tierKey)
    return t?.title || 'Kategori'
  }, [tiers, tierKey])

  const catData = useMemo(() => {
    const t = tiers?.find(tt => tt.id === tierKey)
    const c = t?.children.find(cc => cc.id === (categoryId || ''))
    return c ? { categoryTitle: c.title, series: c.subchildren.map(sc => ({ id: sc.id, title: sc.title })) } : undefined
  }, [tiers, tierKey, categoryId])

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="breadcrumbs text-sm py-4">
          <ul>
            <li><Link to="/">Ana sayfa</Link></li>
            <li><Link to="/kategoriler">Kategoriler</Link></li>
            <li><Link to={`/kategoriler/${tierKey}`}>{tierTitle}</Link></li>
            <li>{catData?.categoryTitle || 'Kategori'}</li>
          </ul>
        </div>

        <h1 className="text-3xl font-bold">{catData?.categoryTitle || 'Kategori'}</h1>
        <p className="mt-2 text-base-content/70">Bu kategori altındaki serileri inceleyin.</p>

        {catData && catData.series.length > 0 ? (
          <div className="grid gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {catData.series.map((s) => {
              // Get main_image for this subchild from the imageMap
              const mainImage = subchildImages[s.title]
              const imageUrl = mainImage || `https://picsum.photos/seed/${s.id}/800/600`
              
              console.log(`🎨 Series "${s.title}":`, mainImage ? `main_image=${mainImage}` : 'using mock')
              
              return (
                /* route updated to nested structure: /kategoriler/:tier/:categoryId/:seriesId */
                <Link
                  key={s.id}
                  to={`/kategoriler/${tierKey}/${categoryId}/${encodeURIComponent(s.title)}`}
                  className="group relative block rounded-box overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={imageUrl}
                    alt={`${s.title} - Seri Görseli`}
                    title={s.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to mock if main_image fails
                      e.currentTarget.src = `https://picsum.photos/seed/${s.id}/800/600`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-300/70 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <div className="badge badge-primary badge-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">İncele</div>
                    <div className="text-lg font-semibold">{s.title}</div>
                    {/* desc optional from DB later */}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="alert mt-6">
            <span>Bu kategori için tanımlı seri bulunamadı.</span>
          </div>
        )}
      </div>
    </section>
  )
}