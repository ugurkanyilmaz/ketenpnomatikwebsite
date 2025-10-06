import { Link, useParams } from 'react-router-dom'

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
  const { seriesId } = useParams()
  const key = typeof seriesId === 'string' && seriesId.length ? seriesId : 'seri-impactx'
  const info = seriesInfo[key] ?? seriesInfo['seri-impactx']

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
            src={`https://picsum.photos/seed/${seriesId}/1200/400`}
            alt={info.title}
            className="h-64 w-full object-cover"
          />
          <div className="hero-overlay bg-black/50" />
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold">{info.title}</h1>
              <p className="mt-4">{info.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column: spans 2 on large screens */}
          <main className="lg:col-span-3">
            <article className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">{info.title} Hakkında:</h2>
              <p>
                Bu seri; profesyonel kullanımlar için test edilmiş, dayanıklı malzeme yapısı ve
                ergonomik tasarımı ile öne çıkar.
              </p>
            </article>

            {/* Ekstra Görsel + Callout */}
            <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
              <img
                src={`https://picsum.photos/seed/${seriesId}-hero/600/400`}
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

                {/* Filled feature card (dark gray) */}
                <div className="card bg-black text-white shadow-2xl overflow-hidden" style={{ backgroundColor: '#000000', border: '3px solid #00FF00' }}>
                  <div className="card-body p-6" style={{ backgroundColor: '#4B4B4B', color: '#ffffff' }}>
                    <h3 className="card-title">Öne Çıkan Özellikler</h3>
                    <ul className="list-disc pl-5 mt-2 text-sm">
                      <li>Uzun ömürlü ve dayanıklı malzeme</li>
                      <li>Düşük titreşim, yüksek tork</li>
                      <li>Profesyonel kullanım için ideal</li>
                    </ul>
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
                <div className="card bg-base-200 shadow mb-6">
                  <div className="card-body">
                    <h3 className="card-title">Seri Bilgileri</h3>
                    <ul className="list-disc pl-5 mt-2 text-sm text-black/80">
                      <li><strong>Seri:</strong> {info.title}</li>
                      <li><strong>Kısa Açıklama:</strong> {info.description}</li>
                      <li><strong>Model Sayısı:</strong> {info.table.length}</li>
                      <li>
                        <strong>Modeller:</strong>
                        <ul className="list-disc pl-5 mt-1 text-sm">
                          {info.table.map((r) => (
                            <li key={r.model}>{r.model} — {r.torque}</li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

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
                    <ul className="list-disc pl-5 text-sm text-black/80">
                      <li>Yüksek tork ve verimlilik</li>
                      <li>Düşük titreşim ve gürültü</li>
                      <li>Ergonomik ve dayanıklı gövde</li>
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
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Nerelerde Kullanılır?</h2>

              {/* Responsive grid: auto-fit columns with minmax so any number of items fits and cards grow */}
              {/**
               * We use an inline style for gridTemplateColumns because Tailwind doesn't provide
               * a utility for repeat(auto-fit, minmax(...)). The min width is increased so cards
               * appear larger; change `minmax(16rem, 1fr)` to adjust sizing.
               */}
              <div
                className="grid gap-6"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}
              >
                {(
                  [
                    {
                      title: 'Otomotiv Servisleri',
                      desc: 'Lastik sökme-takma, motor montajı ve bakım işlemlerinde yaygın kullanım.',
                    },
                    {
                      title: 'Endüstriyel Üretim',
                      desc: 'Ağır montaj hatlarında yüksek tork gerektiren işler için ideal çözüm.',
                    },
                    {
                      title: 'Gemi Bakım & Tamiri',
                      desc: 'Gemi gövde, makina ve hat bakımları için dayanıklı ve güvenilir çözümler sunar.',
                    },
                    {
                      title: 'Uçak Bakım & Tamiri',
                      desc: 'Hassas tolerans ve yüksek güvenlik gerektiren havacılık bakım uygulamaları için uygundur.',
                    },
                  ]
                ).map((loc) => (
                  <div key={loc.title} className="card bg-base-200 shadow">
                    <div className="card-body p-4">
                      <h3 className="card-title text-lg font-semibold m-0">{loc.title}</h3>
                      <p className="text-sm text-black/70 mt-2">{loc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nasıl Kullanılır? */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Nasıl Kullanılır?</h2>
              <div className="aspect-video rounded-box overflow-hidden shadow">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/DRAvzJPUBCY"
                  title="Çalışma Videosu"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Demo Talep bölümü */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Demo Talep</h2>
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                    <p className="text-base text-black/80">
                    Türkiye'nin her yerindeki uzman satış temsilcilerimizden demo talep edin, ürünlerimizi kendi çalışma alanınızda, tamamen size özel bir sunumla, uygulamalı olarak deneyimleyin.<br />
                    Aklınızdaki tüm soruları yanıtlayacak, size özel çözümleri keşfetmenize rehberlik edecek ve ürünlerimizin gerçek potansiyelini ilk elden görmenizi sağlayacağız.
                    </p>
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
