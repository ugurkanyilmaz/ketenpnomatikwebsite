import { useState } from 'react'
import { Plus, Edit, Trash2, Package } from 'lucide-react'

interface Product {
  id: number
  series_id: number
  sku: string
  title: string
  description: string
  price: number
  specs: {
    model: string
    torque: string
    air: string
    weight: string
  }
}

// Mock series data
const mockSeries = [
  { id: 1, slug: 'seri-apac', title: 'APAC Serisi' },
  { id: 2, slug: 'seri-impactx', title: 'ImpactX Serisi' },
  { id: 3, slug: 'seri-hiyoki', title: 'Hiyoki Serisi' },
]

// Mock products
const mockProducts: Product[] = [
  {
    id: 1,
    series_id: 1,
    sku: 'APAC-200',
    title: 'APAC-200 Havalı Montaj Aleti',
    description: 'Yüksek tork kapasiteli profesyonel montaj aleti',
    price: 2500,
    specs: { model: 'APAC-200', torque: '200 Nm', air: '90 L/dk', weight: '1.4 kg' }
  },
  {
    id: 2,
    series_id: 1,
    sku: 'APAC-400',
    title: 'APAC-400 Havalı Montaj Aleti',
    description: 'Orta sınıf endüstriyel montaj çözümü',
    price: 3200,
    specs: { model: 'APAC-400', torque: '400 Nm', air: '140 L/dk', weight: '1.7 kg' }
  },
  {
    id: 3,
    series_id: 2,
    sku: 'IX-500',
    title: 'ImpactX-500 Darbeli Somun Sökme',
    description: 'Yüksek performanslı darbeli somun sökme aleti',
    price: 4500,
    specs: { model: 'ImpactX-500', torque: '500 Nm', air: '120 L/dk', weight: '1.6 kg' }
  }
]

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [filterSeries, setFilterSeries] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return
    setProducts(products.filter(p => p.id !== id))
    alert('Ürün silindi (mock)!')
  }

  const handleSave = (product: Product) => {
    if (product.id) {
      // Update
      setProducts(products.map(p => p.id === product.id ? product : p))
      alert('Ürün güncellendi (mock)!')
    } else {
      // Add
      const newProduct = { ...product, id: Math.max(...products.map(p => p.id), 0) + 1 }
      setProducts([...products, newProduct])
      alert('Ürün eklendi (mock)!')
    }
    setShowModal(false)
    setEditingProduct(null)
  }

  const filteredProducts = filterSeries
    ? products.filter(p => p.series_id === filterSeries)
    : products

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ürün Yönetimi</h1>
          <p className="text-base-content/60">{products.length} ürün (mock veri)</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null)
            setShowModal(true)
          }}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Yeni Ürün
        </button>
      </div>

      {/* Info Alert */}
      <div className="alert alert-info mb-6">
        <Package size={24} />
        <div>
          <h3 className="font-bold">Mock Veri Kullanımda</h3>
          <div className="text-sm">
            Bu sayfa şu anda mock verilerle çalışmaktadır. Gerçek ürün veritabanı bağlandığında
            tüm CRUD işlemleri otomatik olarak çalışacaktır.
          </div>
        </div>
      </div>

      {/* Series Filter */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body p-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Seri Filtresi</span></label>
            <select
              className="select select-bordered"
              value={filterSeries || ''}
              onChange={(e) => setFilterSeries(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">Tüm Seriler</option>
              {mockSeries.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const series = mockSeries.find(s => s.id === product.series_id)
          return (
            <div key={product.id} className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="badge badge-primary badge-sm mb-2">{series?.title}</div>
                <h3 className="card-title text-lg">{product.title}</h3>
                <p className="text-sm text-base-content/60 line-clamp-2">{product.description}</p>
                
                <div className="divider my-2"></div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-base-content/60">SKU:</span>
                    <p className="font-mono">{product.sku}</p>
                  </div>
                  <div>
                    <span className="text-base-content/60">Fiyat:</span>
                    <p className="font-semibold">{product.price.toLocaleString('tr-TR')} ₺</p>
                  </div>
                  <div>
                    <span className="text-base-content/60">Tork:</span>
                    <p>{product.specs.torque}</p>
                  </div>
                  <div>
                    <span className="text-base-content/60">Ağırlık:</span>
                    <p>{product.specs.weight}</p>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => {
                      setEditingProduct(product)
                      setShowModal(true)
                    }}
                    className="btn btn-sm btn-ghost"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-sm btn-ghost text-error"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          series={mockSeries}
          onClose={() => {
            setShowModal(false)
            setEditingProduct(null)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

function ProductModal({
  product,
  series,
  onClose,
  onSave
}: {
  product: Product | null
  series: { id: number; title: string }[]
  onClose: () => void
  onSave: (product: Product) => void
}) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      series_id: 0,
      sku: '',
      title: '',
      description: '',
      price: 0,
      specs: { model: '', torque: '', air: '', weight: '' }
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.series_id || !formData.sku || !formData.title) {
      alert('Seri, SKU ve Başlık alanları zorunludur!')
      return
    }
    onSave(formData as Product)
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">
          {product ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Seri *</span></label>
            <select
              className="select select-bordered"
              value={formData.series_id}
              onChange={(e) => setFormData({ ...formData, series_id: parseInt(e.target.value) })}
              required
            >
              <option value={0}>Seçin...</option>
              {series.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">SKU *</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="APAC-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Fiyat (₺)</span></label>
              <input
                type="number"
                className="input input-bordered"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                placeholder="2500"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Başlık *</span></label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="APAC-200 Havalı Montaj Aleti"
              required
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Açıklama</span></label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ürün açıklaması..."
            />
          </div>

          <div className="divider">Teknik Özellikler</div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Model</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.specs?.model}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  specs: { ...formData.specs!, model: e.target.value }
                })}
                placeholder="APAC-200"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Maks. Tork</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.specs?.torque}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  specs: { ...formData.specs!, torque: e.target.value }
                })}
                placeholder="200 Nm"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Hava Tüketimi</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.specs?.air}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  specs: { ...formData.specs!, air: e.target.value }
                })}
                placeholder="90 L/dk"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Ağırlık</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.specs?.weight}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  specs: { ...formData.specs!, weight: e.target.value }
                })}
                placeholder="1.4 kg"
              />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              İptal
            </button>
            <button type="submit" className="btn btn-primary">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}
