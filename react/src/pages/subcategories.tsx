import { Link, useParams } from 'react-router-dom'

const data: Record<string, { title: string; subs: { id: string; title: string; leaf?: boolean }[] }> = {
  endustriyel: {
    title: 'Endüstriyel',
    subs: [
      { id: 'kompresorler', title: 'Kompresörler' },
      { id: 'darbeli-somun-sokme', title: 'Darbeli Somun Sökme' },
      { id: 'hortumlar', title: 'Hortumlar' },
      { id: 'baglanti-elemanlari', title: 'Bağlantı Elemanları' },
    ],
  },
  profesyonel: {
    title: 'Profesyonel',
    subs: [
      { id: 'kompresorler', title: 'Kompresörler' },
      { id: 'pistol-grease', title: 'Hava Tabancaları' },
    ],
  },
}

export default function Subcategories() {
  const { tier } = useParams()
  const tierData = data[tier || 'endustriyel']

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="breadcrumbs text-sm py-4"><ul><li><Link to="/">Ana sayfa</Link></li><li><Link to="/kategoriler">Kategoriler</Link></li><li>{tierData.title}</li></ul></div>
        <h1 className="text-3xl font-bold">{tierData.title}</h1>
        <div className="grid gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {tierData.subs.map((s) => {
            const item = (
              <div className="group relative block rounded-box overflow-hidden shadow hover:shadow-lg transition-shadow">
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
                  <div className="text-base-content/70">{s.leaf ? 'Seri detayları ve teknik tablo' : 'Alt kategoriler yakında'}</div>
                </div>
              </div>
            )
            return (
              <Link key={s.id} to={`/kategoriler/${tier}/${s.id}`}>{item}</Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
