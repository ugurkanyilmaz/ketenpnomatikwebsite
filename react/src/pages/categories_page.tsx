
import { Link } from 'react-router-dom'

export default function Categories_page() {
  // Images are served from the `public/` folder and available at the site root.
  const mainTiers = [
    { id: 'endustriyel', title: 'Endüstriyel', desc: 'Ağır hizmet, 7/24 kullanım', img: '/endustrial_cat_pic..jpg' },
    { id: 'profesyonel', title: 'Profesyonel', desc: 'Atölye ve servisler için', img: '/proffesional_cat_pic.jpg' },
  ]

  const auxiliaryTier = { id: 'yardimci-ekipmanlar', title: 'Yardımcı Ürünler', desc: 'Aksesuarlar ve yedek parçalar', img: '/technical_service_banner.png' }

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="breadcrumbs text-sm py-4"><ul><li><Link to="/">Ana sayfa</Link></li><li>Kategoriler</li></ul></div>
        <h1 className="text-3xl font-bold">Kategoriler</h1>
        <p className="mt-2 text-base-content/70">Endüstriyel, Profesyonel veya Yardımcı Ürünler kategorilerinden birini seçin.</p>
        
        {/* Ana kategoriler - 2'li grid */}
        <div className="grid gap-5 mt-6 sm:grid-cols-2">
          {mainTiers.map((t) => (
            <Link key={t.id} to={`/kategoriler/${t.id}`} className="group relative block rounded-box overflow-hidden shadow hover:shadow-lg transition-shadow">
              <img
                src={t.img}
                alt={t.title}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-300/70 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <div className="badge badge-primary badge-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">İncele</div>
                <div className="text-xl font-semibold">{t.title}</div>
                <div className="text-base-content/80">{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Yardımcı Ürünler - Ortada tek başına */}
        <div className="mt-6 flex justify-center">
          <Link to={`/kategoriler/${auxiliaryTier.id}`} className="group relative block rounded-box overflow-hidden shadow hover:shadow-lg transition-shadow w-full sm:w-2/3 lg:w-1/2">
            <img
              src={auxiliaryTier.img}
              alt={auxiliaryTier.title}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-300/70 to-transparent" />
            <div className="absolute bottom-0 p-4">
              <div className="badge badge-primary badge-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">İncele</div>
              <div className="text-xl font-semibold">{auxiliaryTier.title}</div>
              <div className="text-base-content/80">{auxiliaryTier.desc}</div>
            </div>
          </Link>
        </div>
        {/* "Tümünü Gör" button - moved up and made flashy */}
        <div className="mt-4 mb-8 flex justify-center">
          <Link
            to="/urunler"
            className="rounded-full px-8 py-3 text-lg font-bold bg-gradient-to-r from-primary to-accent text-white shadow-2xl transform transition-transform hover:-translate-y-1 hover:scale-105"
            style={{ boxShadow: '0 14px 40px rgba(0,0,0,0.35)' }}
          >
            Tüm Ürünleri Gör
          </Link>
        </div>
      </div>
    </section>
  )
}
