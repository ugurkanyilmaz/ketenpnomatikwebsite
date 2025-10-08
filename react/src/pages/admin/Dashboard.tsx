import { Package, FileText, Image, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Stats {
  categories: number
  photos: number
  products: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ categories: 0, photos: 0, products: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch stats from API
    Promise.all([
      fetch('/php/api/articles.php').then(r => r.json()),
      fetch('/php/api/category_photos_list.php').then(r => r.json()),
      fetch('/php/api/products.php').then(r => r.json())
    ])
      .then(([articlesData, photosData, productsData]) => {
        const categoryCount = articlesData.tiers?.reduce((sum: number, tier: any) => {
          return sum + tier.children.reduce((childSum: number, child: any) => {
            return childSum + (child.subchildren?.length || 0)
          }, 0)
        }, 0) || 0

        setStats({
          categories: categoryCount,
          photos: photosData.count || 0,
          products: productsData.total || 0
        })
      })
      .catch(err => console.error('Failed to fetch stats:', err))
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    { icon: FileText, label: 'Toplam Kategori', value: stats.categories, color: 'bg-blue-500', link: '/admin/kategoriler' },
    { icon: Image, label: 'Kategori Fotoğrafları', value: stats.photos, color: 'bg-green-500', link: '/admin/kategori-fotograflari' },
    { icon: Package, label: 'Ürünler', value: stats.products, color: 'bg-purple-500', link: '/admin/urunler' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-base-content/60">Yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              to={card.link}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base-content/60 text-sm">{card.label}</p>
                    <p className="text-3xl font-bold mt-2">
                      {loading ? '...' : card.value}
                    </p>
                  </div>
                  <div className={`p-4 rounded-full ${card.color} text-white`}>
                    <Icon size={32} />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Hızlı İşlemler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/admin/kategoriler" className="btn btn-primary">
              <FileText size={20} />
              Yeni Kategori Ekle
            </Link>
            <Link to="/admin/kategori-fotograflari" className="btn btn-secondary">
              <Image size={20} />
              Fotoğraf Yükle
            </Link>
            <Link to="/admin/urunler" className="btn btn-accent">
              <Package size={20} />
              Yeni Ürün Ekle
            </Link>
            <Link to="/" className="btn btn-outline">
              <TrendingUp size={20} />
              Siteyi Görüntüle
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
