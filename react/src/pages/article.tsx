import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { fetchCategoryRows } from '../api'
import { getUniqueCategoriesFromAreas } from '../data/usableAreasMapping'
import { Car, Factory, Settings, Cpu, HardHat, Armchair, Plane, Wrench, PartyPopper, Home, Package, Hammer } from 'lucide-react'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Car, Factory, Settings, Cpu, HardHat, Armchair, Plane, Wrench, PartyPopper, Home, Package, Hammer
}

const seriesInfo: Record<
  string,
  {
    title: string
    description: string
    table: {
      model: string
      torque: string
      air: string
      weight: string
      productId: string
    }[]
  }
> = {
  'seri-apac': {
    title: 'APAC Serisi',
    description:
      'APAC serisi; dayanıklılık ve verimlilik odaklı, endüstriyel uygulamalarda yüksek performans sağlar.',
    table: [
      { model: 'APAC-200', torque: '200 Nm', air: '90 L/dk', weight: '1.4 kg', productId: 'apac-200' },
      { model: 'APAC-400', torque: '400 Nm', air: '140 L/dk', weight: '1.7 kg', productId: 'apac-400' },
      { model: 'APAC-600', torque: '600 Nm', air: '190 L/dk', weight: '2.0 kg', productId: 'apac-600' },
    ],
  },
  'seri-impactx': {
    title: 'ImpactX Darbeli Somun Sökme Serisi',
    description:
      'Ağır hizmet endüstriyel kullanım için yüksek tork, dayanıklı gövde ve düşük titreşim. Uzun ömürlü performans için tasarlandı.',
    table: [
      { model: 'ImpactX-500', torque: '500 Nm', air: '120 L/dk', weight: '1.6 kg', productId: 'impactx-500' },
      { model: 'ImpactX-800', torque: '800 Nm', air: '180 L/dk', weight: '1.9 kg', productId: 'impactx-800' },
      { model: 'ImpactX-1000', torque: '1000 Nm', air: '220 L/dk', weight: '2.2 kg', productId: 'impactx-1000' },
    ],
  },
}

export default function Article() {
  const { seriesId, tier, categoryId } = useParams()
  const [catRows, setCatRows] = useState<any[] | null>(null)

  const key = typeof seriesId === 'string' && seriesId.length ? seriesId : 'seri-impactx'
  const info = seriesInfo[key] ?? seriesInfo['seri-impactx']

  useEffect(() => {
    if (!tier || !categoryId || !seriesId) return
    console.log('[Article] Fetching data with params:', { parent: tier, child: categoryId, subchild: seriesId })
    fetchCategoryRows({ parent: tier, child: categoryId, subchild: seriesId })
      .then((res) => { 
        console.log('[Article] Received data:', res)
        setCatRows(res.items) 
      })
      .catch((err) => {
        console.error('[Article] Failed to fetch:', err)
      })
  }, [tier, categoryId, seriesId])

  const cat = useMemo(() => {
    const result = (catRows && catRows[0]) || null
    console.log('[Article] Current cat data:', result)
    return result
  }, [catRows])

  if (!info) {
    return (
      <section className="bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="breadcrumbs text-sm py-4">
            <ul>
              <li><Link to="/">Ana sayfa</Link></li>
              <li><Link to="/kategoriler">Kategoriler</Link></li>
              <li>Seri bulunamadı</li>
            </ul>
          </div>
          <div className="alert alert-warning">
            Bu seri bulunamadı. Lütfen <Link to="/kategoriler" className="link">kategorilere</Link> geri dönün.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="breadcrumbs text-sm py-4">
          <ul>
            <li><Link to="/">Ana sayfa</Link></li>
            <li><Link to="/kategoriler">Kategoriler</Link></li>
            <li>Seri</li>
          </ul>
        </div>

        {/* Hero Banner */}
        <div className="hero rounded-box overflow-hidden shadow mb-10">
          <img
            src={cat?.main_image && cat.main_image.trim() !== '' ? cat.main_image : `https://picsum.photos/seed/${seriesId}/1200/400`}
            alt={cat?.title || info.title}
            className="h-64 w-full object-cover"
          />
          <div className="hero-overlay bg-black/50" />
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold">{cat?.title || info.title}</h1>
              <p className="mt-4">{cat?.title_subtext || info.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column: spans 2 on large screens */}
          <main className="lg:col-span-3">
            <article className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">{cat?.title || info.title} Hakkında:</h2>
              <div className="whitespace-pre-line">
                {(cat?.about || 'Bu seri; profesyonel kullanımlar için test edilmiş, dayanıklı malzeme yapısı ve ergonomik tasarımı ile öne çıkar.')}
              </div>
            </article>

            {/* Ekstra Görsel + Callout */}
            <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
              <img
                src={cat?.img1 && cat.img1.trim() !== '' ? cat.img1 : `https://picsum.photos/seed/${seriesId}-hero/600/400`}
                alt="Ürün görseli"
                className="rounded-box shadow"
              />
              <div className="flex flex-col items-stretch gap-4 w-full">
                {/* Independent decorative block above the card (orange) */}
                <div className="w-full py-1">
                  <svg className="w-full h-8" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10 C20 0 40 0 60 10 C80 20 100 10 100 10 L100 0 L0 0 Z" fill="#f97316" />
                  </svg>
                </div>

                {/* Filled feature card using blackwood1.jpg as background with dark overlay */}
                <div className="card relative overflow-hidden shadow-2xl" style={{ border: '3px solid #00FF00' }}>
                  {/* Background image */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: "url('/blackwood1.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />

                  <div className="card-body p-6 relative" style={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>
                    <h3 className="card-title">Öne Çıkan Özellikler</h3>
                    <div className="text-sm whitespace-pre-line mt-2">
                      {cat?.featured || 'Uzun ömürlü ve dayanıklı malzeme\nDüşük titreşim, yüksek tork\nProfesyonel kullanım için ideal'}
                    </div>
                  </div>
                </div>
                {/* Independent decorative block below the card (orange) */}
                <div className="w-full py-1">
                  <svg className="w-full h-8" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 C20 10 40 10 60 0 C80 -10 100 0 100 0 L100 10 L0 10 Z" fill="#f97316" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Teknik Özellikler + Sağdaki Kartlar */}
            <div className="mt-10 grid lg:grid-cols-3 gap-6">
              {/* Sol: Tablo */}
              <div className="lg:col-span-2">
                {/* Seri Bilgileri: ayrı bir kart içinde bullet list olarak göster */}
                {cat?.info && (
                <div className="card bg-base-200 shadow mb-6">
                  <div className="card-body">
                    <h3 className="card-title">Seri Bilgileri</h3>
                    <ul className="list-disc pl-5 mt-2 text-sm text-black/80">
                      {cat.info.split('\n').filter((line: string) => line.trim()).map((line: string, idx: number) => (
                        <li key={idx}>{line.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                )}

                <h2 className="text-2xl font-bold mb-4">Teknik Özellikler</h2>
                <div className="overflow-x-auto rounded-box border border-base-200 shadow">
                  <table className="table">
                    <thead className="bg-base-200">
                      <tr>
                        <th>Model</th>
                        <th>Maks. Tork</th>
                        <th>Hava Tüketimi</th>
                        <th>Ağırlık</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {info.table.map((row) => (
                        <tr key={row.model}>
                          <td className="font-medium">{row.model}</td>
                          <td>{row.torque}</td>
                          <td>{row.air}</td>
                          <td>{row.weight}</td>
                          <td>
                            <Link to={`/urun/${row.productId}`} className="btn btn-primary btn-xs">Ürün Detayı</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sağ: Seri Özeti + Destek */}
              <div className="space-y-6">
                <div className="card bg-base-200 shadow">
                  <div className="card-body text-black">
                    <h3 className="card-title">Seri Özeti</h3>
                    <ul className="list-disc pl-5 mt-2 text-sm text-black/80">
                      {cat?.summary ? (
                        cat.summary.split(';').filter((item: string) => item.trim()).map((item: string, idx: number) => (
                          <li key={idx}>{item.trim()}</li>
                        ))
                      ) : (
                        <>
                          <li>Yüksek tork ve verimlilik</li>
                          <li>Düşük titreşim ve gürültü</li>
                          <li>Ergonomik ve dayanıklı gövde</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="card bg-base-200 shadow">
                  <div className="card-body text-black">
                    <h3 className="card-title">Destek</h3>
                    <p className="text-sm text-black/80">
                      Teknik belgeler ve kullanım kılavuzları için bizimle iletişime geçin.
                    </p>
                    <div className="mt-3">
                      <a href="/iletisim" className="btn btn-primary btn-sm">İletişim</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 - Uygulama Alanları */}
            {cat?.usable_areas && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Nerelerde Kullanılır?</h2>
              <div
                className="grid gap-6"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}
              >
                {getUniqueCategoriesFromAreas(cat.usable_areas).map((category) => {
                  const IconComponent = iconMap[category.icon]
                  return (
                    <div key={category.id} className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="card-body p-6 text-center">
                        <div className="flex justify-center mb-3">
                          {IconComponent && <IconComponent size={48} className="text-primary" />}
                        </div>
                        <h3 className="font-bold text-lg text-black">{category.title}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            )}

            {/* Nasıl Kullanılır? */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Nasıl Kullanılır?</h2>
              {cat?.video_url && cat.video_url.trim() !== '' ? (
                <div className="aspect-video rounded-box overflow-hidden shadow">
                  <iframe
                    className="w-full h-full"
                    src={cat.video_url}
                    title="Çalışma Videosu"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="card bg-gradient-to-br from-warning/10 to-warning/5 shadow-lg border-2 border-warning/20">
                  <div className="card-body text-center">
                    <div className="flex justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Çalışma Videosu Yakında Eklenecek</h3>
                    <p className="text-base-content/70 mb-4">
                      Bu ürünün çalışma videosunu izlemek ve daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <Link to="/iletisim" className="btn btn-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        İletişime Geç
                      </Link>
                      <Link to="/demo-talep" className="btn btn-outline btn-warning">
                        Demo Talep Et
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Demo Talep bölümü */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Demo Talep</h2>
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                    <div className="text-base text-black/80 whitespace-pre-line">
                    Türkiye'nin her yerindeki uzman satış temsilcilerimizden demo talep edin, ürünlerimizi kendi çalışma alanınızda, tamamen size özel bir sunumla, uygulamalı olarak deneyimleyin.

Aklınızdaki tüm soruları yanıtlayacak, size özel çözümleri keşfetmenize rehberlik edecek ve ürünlerimizin gerçek potansiyelini ilk elden görmenizi sağlayacağız.
                    </div>
                  <div className="mt-4 w-full flex justify-center">
                    <Link to="/demo-talep" className="btn btn-primary">Demo Talep Et</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 - İndirilebilir Belgeler */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">İndirilebilir Belgeler</h2>
              <div className="flex gap-4 flex-wrap">
                <a href="/docs/catalog.pdf" className="btn btn-outline btn-sm">Katalog</a>
                <a href="/docs/manual.pdf" className="btn btn-outline btn-sm">Kullanım Kılavuzu</a>
                <a href="/docs/warranty.pdf" className="btn btn-outline btn-sm">Garanti Belgesi</a>
              </div>
            </div>

            {/* İlgili Seriler / Önerilen Ürünler */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">İlgili Seriler</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="card bg-base-200 shadow">
                  <figure>
                    <img src="https://picsum.photos/seed/apac/400/200" alt="APAC Serisi" />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">APAC Serisi</h3>
                    <Link to="/seri/seri-apac" className="btn btn-primary btn-sm">İncele</Link>
                  </div>
                </div>
                <div className="card bg-base-200 shadow">
                  <figure>
                    <img src="https://picsum.photos/seed/impactx/400/200" alt="ImpactX Serisi" />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">ImpactX Serisi</h3>
                    <Link to="/seri/seri-impactx" className="btn btn-primary btn-sm">İncele</Link>
                  </div>
                </div>
                <div className="card bg-base-200 shadow">
                  <figure>
                    <img src="https://picsum.photos/seed/placeholder/400/200" alt="Yeni Seri" />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">Yakında</h3>
                    <button className="btn btn-disabled btn-sm">Çok Yakında</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
