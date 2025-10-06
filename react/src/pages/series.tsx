import { Link, useParams } from 'react-router-dom'

type SeriesItem = { id: string; title: string; desc?: string }

const tierTitles: Record<string, string> = {
  endustriyel: 'Endüstriyel',
  profesyonel: 'Profesyonel',
}

// Series grouped by tier -> categoryId
const seriesByCategory: Record<string, Record<string, { categoryTitle: string; series: SeriesItem[] }>> = {
  endustriyel: {
    'darbeli-somun-sokme': {
      categoryTitle: 'Darbeli Somun Sökme',
      series: [
        { id: 'seri-impactx', title: 'ImpactX Serisi', desc: 'Yüksek tork, ağır hizmet' },
        { id: 'seri-apac', title: 'APAC Serisi', desc: 'Dayanıklı gövde, endüstriyel performans' },
      ],
    },
    kompresorler: {
      categoryTitle: 'Kompresörler',
      series: [],
    },
    hortumlar: {
      categoryTitle: 'Hortumlar',
      series: [],
    },
    'baglanti-elemanlari': {
      categoryTitle: 'Bağlantı Elemanları',
      series: [],
    },
  },
  profesyonel: {
    'pistol-grease': {
      categoryTitle: 'Hava Tabancaları',
      series: [
        { id: 'seri-hiyoki-500', title: 'Hiyoki-500 Serisi', desc: 'Kompakt, dengeli tork' },
        { id: 'seri-proline', title: 'ProLine Serisi', desc: 'Günlük kullanım için ideal' },
      ],
    },
    kompresorler: {
      categoryTitle: 'Kompresörler',
      series: [],
    },
  },
}

export default function Series() {
  const { tier, categoryId } = useParams()

  const tierKey = tier || 'endustriyel'
  const tierTitle = tierTitles[tierKey] || 'Kategori'
  const catData = seriesByCategory[tierKey]?.[categoryId || '']

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
            {catData.series.map((s) => (
              /* route updated to nested structure: /kategoriler/:tier/:categoryId/:seriesId */
              <Link
                key={s.id}
                to={`/kategoriler/${tierKey}/${categoryId}/${s.id}`}
                className="group relative block rounded-box overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src={'https://picsum.photos/seed/' + s.id + '/800/600'}
                  alt={s.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-300/70 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <div className="badge badge-primary badge-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">İncele</div>
                  <div className="text-lg font-semibold">{s.title}</div>
                  {s.desc && <div className="text-base-content/70">{s.desc}</div>}
                </div>
              </Link>
            ))}
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