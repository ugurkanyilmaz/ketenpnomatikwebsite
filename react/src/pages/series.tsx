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
        <style>{`
          /* 300px card grid: auto-fill on small, force 4 columns on wide screens */
          .card-grid-300 { grid-template-columns: repeat(auto-fill, 300px); justify-content: start; }
          @media (min-width: 1200px) { .card-grid-300 { grid-template-columns: repeat(4, 300px); } }
        `}</style>
        <p className="mt-2 text-base-content/70">Bu kategori altındaki serileri inceleyin.</p>

        {catData && catData.series.length > 0 ? (
          <div className="mt-6">
              <div className="grid gap-5 card-grid-300 justify-items-center">
              {catData.series.map((s) => {
                // Get main_image for this subchild from the imageMap
                const mainImage = subchildImages[s.title]
                const imageUrl = mainImage || `https://picsum.photos/seed/${s.id}/800/600`

                return (
                  <Link
                    key={s.id}
                    to={`/kategoriler/${tierKey}/${categoryId}/${encodeURIComponent(s.title)}`}
                    className="group block rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 border-2 bg-transparent w-full"
                    style={{ borderColor: 'rgba(255,140,66,0.18)', width: 300, maxWidth: 300 }}
                  >
                    <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
                      <img
                        src={imageUrl}
                        alt={`${s.title} - Seri Görseli`}
                        title={s.title}
                        width={300}
                        height={225}
                        className="absolute inset-0 w-full h-full object-contain bg-gray-50"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${s.id}/800/600` }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                      <div className="absolute left-3 bottom-3 text-white">
                        <div className="text-sm font-semibold drop-shadow-md">{s.title}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
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