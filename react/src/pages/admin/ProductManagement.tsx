import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Package, Upload, X } from 'lucide-react'

interface Product {
  id?: number
  url: string
  parent: string
  child: string
  subchild: string
  title: string
  sku: string
  paragraph: string
  description: string
  brand: string
  feature1: string
  feature2: string
  feature3: string
  feature4: string
  feature5: string
  feature6: string
  feature7: string
  feature8: string
  feature9: string
  feature10: string
  feature11: string
  main_img: string
  p_img1: string
  p_img2: string
  p_img3: string
  p_img4: string
  p_img5: string
  p_img6: string
  p_img7: string
  meta_description: string
  meta_title: string
  schema_description: string
  keywords: string
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const itemsPerPage = 12

  useEffect(() => {
    loadProducts()
  }, [currentPage, searchTerm, filterBrand])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        limit: String(itemsPerPage),
        offset: String((currentPage - 1) * itemsPerPage)
      })
      if (searchTerm) params.set('q', searchTerm)
      if (filterBrand) params.set('brand', filterBrand)

  const res = await fetch(`/php/api/products.php?${params.toString()}`)
      const data = await res.json()
      setProducts(data.products || [])
      setTotalProducts(data.total || 0)
    } catch (err) {
      console.error('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return
    
    try {
      const res = await fetch('/php/api/products_delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ id })
      })
      
      const data = await res.json()
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Silme başarısız')
      }
      
      await loadProducts()
      alert('Ürün başarıyla silindi!')
    } catch (err) {
      console.error('Failed to delete product:', err)
      alert('Silme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    }
  }

  const handleSave = async (product: Partial<Product>) => {
    try {
      const res = await fetch('/php/api/products_bulk_upload_json.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify([product])
      })
      
      if (!res.ok) throw new Error('Save failed')
      
      await loadProducts()
      setShowModal(false)
      setEditingProduct(null)
      alert('Ürün kaydedildi!')
    } catch (err) {
      console.error('Failed to save product:', err)
      alert('Kaydetme başarısız!')
    }
  }

  const handleBulkUpload = async (file: File) => {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      const res = await fetch('/php/api/products_bulk_upload_json.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(data)
      })
      
      const result = await res.json()
      
      if (!res.ok) throw new Error('Upload failed')
      
      await loadProducts()
      setShowBulkUpload(false)
      alert(`Toplu yükleme tamamlandı!\nEklenen: ${result.inserted}\nGüncellenen: ${result.updated}\nAtlanan: ${result.skipped}`)
    } catch (err) {
      console.error('Bulk upload failed:', err)
      alert('Toplu yükleme başarısız: ' + (err instanceof Error ? err.message : 'JSON hatası'))
    }
  }

  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)))
  const totalPages = Math.ceil(totalProducts / itemsPerPage)

  // Helper: return an array of pages to show (numbers and '...')
  const getVisiblePages = (total: number, current: number, maxButtons = 7) => {
    const pages: Array<number | string> = []
    if (total <= maxButtons) {
      for (let i = 1; i <= total; i++) pages.push(i)
      return pages
    }

    const side = Math.floor((maxButtons - 3) / 2) // buttons beside current
    const left = Math.max(2, current - side)
    const right = Math.min(total - 1, current + side)

    pages.push(1)
    if (left > 2) pages.push('...')

    for (let i = left; i <= right; i++) pages.push(i)

    if (right < total - 1) pages.push('...')
    pages.push(total)

    // Ensure current is visible; if near edges, adjust window
    return pages
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ürün Yönetimi</h1>
          <p className="text-base-content/60">{totalProducts} ürün</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkUpload(true)}
            className="btn btn-secondary btn-outline"
          >
            <Upload size={20} />
            Toplu Yükle
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={async () => {
              try {
                const res = await fetch('/php/api/products.php?limit=1000000')
                if (!res.ok) throw new Error('Export failed')
                const data = await res.json()
                const blob = new Blob([JSON.stringify(data.products || [], null, 2)], { type: 'application/json' })
                const a = document.createElement('a')
                a.href = URL.createObjectURL(blob)
                a.download = `products_export_${new Date().toISOString().split('T')[0]}.json`
                a.click()
                URL.revokeObjectURL(a.href)
              } catch (err) {
                console.error('Export failed', err)
                alert('Dışa aktarma başarısız: ' + (err instanceof Error ? err.message : 'Hata'))
              }
            }}
          >
            <Upload size={20} />
            Export All
          </button>
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
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body p-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Arama</span></label>
              <div className="relative">
                <input
                  type="text"
                  className="input input-bordered w-full pr-10"
                  placeholder="Ürün adı, marka, model, SKU..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                />
                {searchTerm && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs"
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Marka</span></label>
              <select
                className="select select-bordered"
                value={filterBrand}
                onChange={(e) => {
                  setFilterBrand(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value="">Tüm Markalar</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Görünüm</span></label>
              <div className="btn-group w-full">
                <button
                  className={`btn flex-1 ${viewMode === 'grid' ? 'btn-active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button
                  className={`btn flex-1 ${viewMode === 'table' ? 'btn-active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  Tablo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {loading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-base-content/20 mb-4" />
          <p className="text-base-content/60 mb-4">
            {searchTerm || filterBrand ? 'Filtreye uygun ürün bulunamadı' : 'Henüz ürün eklenmemiş'}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary btn-sm"
          >
            İlk Ürünü Ekle
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
              <figure className="aspect-video bg-base-200">
                {product.main_img ? (
                  <img
                    src={product.main_img}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/400x300?text=No+Image'
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Package size={48} className="text-base-content/20" />
                  </div>
                )}
              </figure>
              <div className="card-body p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="card-title text-base line-clamp-2">{product.title}</h3>
                </div>
                {product.brand && (
                  <div className="badge badge-primary badge-sm">{product.brand}</div>
                )}
                {product.description && (
                  <p className="text-sm text-base-content/60 line-clamp-2">{product.description}</p>
                )}
                <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                  {product.sku && (
                    <div>
                      <span className="text-base-content/60">SKU:</span>
                      <p className="font-mono">{product.sku}</p>
                    </div>
                  )}
                  {product.parent && (
                    <div>
                      <span className="text-base-content/60">Kategori:</span>
                      <p className="text-sm">{product.parent}</p>
                    </div>
                  )}
                  {product.child && (
                    <div className="col-span-2">
                      <span className="text-base-content/60">Alt Kategori:</span>
                      <p className="text-sm">{product.child}</p>
                    </div>
                  )}
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
                    onClick={() => handleDelete(product.id!)}
                    className="btn btn-sm btn-ghost text-error"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Görsel</th>
                <th>Başlık</th>
                <th>Marka</th>
                <th>SKU</th>
                <th>Kategori</th>
                <th className="text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="font-mono text-sm">{product.id}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 rounded">
                        {product.main_img ? (
                          <img src={product.main_img} alt={product.title} />
                        ) : (
                          <div className="bg-base-200 flex items-center justify-center">
                            <Package size={20} className="text-base-content/30" />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="max-w-xs">
                    <div className="font-semibold line-clamp-1">{product.title}</div>
                    {product.paragraph && (
                      <div className="text-xs text-base-content/60 line-clamp-1">{product.paragraph}</div>
                    )}
                  </td>
                  <td>{product.brand || <span className="text-base-content/40">-</span>}</td>
                  <td className="text-sm font-mono">
                    {product.sku || <span className="text-base-content/40">-</span>}
                  </td>
                  <td className="text-sm">
                    {product.parent && <div>{product.parent}</div>}
                    {product.child && <div className="text-xs text-base-content/60">{product.child}</div>}
                  </td>
                  <td className="text-right">
                    <div className="flex gap-1 justify-end">
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
                        onClick={() => handleDelete(product.id!)}
                        className="btn btn-sm btn-ghost text-error"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-xl overflow-x-auto">
            <div className="flex items-center gap-2 px-2">
              <button
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                «
              </button>

              {/* Compute a compact set of page buttons with ellipses */}
              {getVisiblePages(totalPages, currentPage, 7).map((p, idx) => (
                <span key={idx}>
                  {p === '...' ? (
                    <span className="px-2 text-sm text-base-content/70">{p}</span>
                  ) : (
                    <button
                      className={`btn btn-sm ${p === currentPage ? 'btn-active' : ''}`}
                      onClick={() => setCurrentPage(Number(p))}
                    >
                      {p}
                    </button>
                  )}
                </span>
              ))}

              <button
                className="btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowModal(false)
            setEditingProduct(null)
          }}
          onSave={handleSave}
        />
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <BulkUploadModal
          onClose={() => setShowBulkUpload(false)}
          onUpload={handleBulkUpload}
        />
      )}
    </div>
  )
}

function ProductModal({
  product,
  onClose,
  onSave
}: {
  product: Product | null
  onClose: () => void
  onSave: (product: Partial<Product>) => void
}) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      url: '',
      parent: '',
      child: '',
      subchild: '',
      title: '',
      sku: '',
      paragraph: '',
      description: '',
      brand: '',
      feature1: '',
      feature2: '',
      feature3: '',
      feature4: '',
      feature5: '',
      feature6: '',
      feature7: '',
      feature8: '',
      feature9: '',
      feature10: '',
      feature11: '',
      main_img: '',
      p_img1: '',
      p_img2: '',
      p_img3: '',
      p_img4: '',
      p_img5: '',
      p_img6: '',
      p_img7: '',
      meta_description: '',
      meta_title: '',
      schema_description: '',
      keywords: ''
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) {
      alert('Başlık alanı zorunludur!')
      return
    }
    onSave(formData)
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">
          {product ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          {/* Categories */}
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <h4 className="font-semibold mb-2">Kategori Bilgileri</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label"><span className="label-text">URL</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="Ürün URL'si"
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Parent (Ana Kategori)</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.parent}
                    onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                    placeholder="Ana kategori"
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Child (Alt Kategori)</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.child}
                    onChange={(e) => setFormData({ ...formData, child: e.target.value })}
                    placeholder="Alt kategori"
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Subchild</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.subchild}
                    onChange={(e) => setFormData({ ...formData, subchild: e.target.value })}
                    placeholder="Alt-alt kategori"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <h4 className="font-semibold mb-2">Temel Bilgiler</h4>
              <div className="space-y-3">
                <div className="form-control">
                  <label className="label"><span className="label-text">Başlık *</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ürün başlığı"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">SKU *</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Ürün kodu (zorunlu)"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Marka</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Marka adı"
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Paragraph (Kısa Açıklama)</span></label>
                  <textarea
                    className="textarea textarea-bordered h-16"
                    value={formData.paragraph}
                    onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })}
                    placeholder="Kısa ürün açıklaması"
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Description (Detaylı Açıklama)</span></label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detaylı ürün açıklaması"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <h4 className="font-semibold mb-2">Özellikler</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                  <div key={num} className="form-control">
                    <label className="label"><span className="label-text text-xs">Özellik {num}</span></label>
                    <input
                      type="text"
                      className="input input-bordered input-sm"
                      value={formData[`feature${num}` as keyof Product] as string || ''}
                      onChange={(e) => setFormData({ ...formData, [`feature${num}`]: e.target.value })}
                      placeholder={`Özellik ${num}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <h4 className="font-semibold mb-2">Görseller</h4>
              <div className="space-y-3">
                <ImageUploadField
                  label="Ana Görsel"
                  value={formData.main_img || ''}
                  onChange={(url) => setFormData({ ...formData, main_img: url })}
                />
                <div className="grid md:grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <ImageUploadField
                      key={num}
                      label={`Görsel ${num}`}
                      value={(formData[`p_img${num}` as keyof Product] as string) || ''}
                      onChange={(url) => setFormData({ ...formData, [`p_img${num}`]: url })}
                      small
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <h4 className="font-semibold mb-2">SEO</h4>
              <div className="space-y-3">
                <div className="form-control">
                  <label className="label"><span className="label-text">Meta Başlık</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    placeholder="Meta başlık"
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Meta Açıklama</span></label>
                  <textarea
                    className="textarea textarea-bordered h-16"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    placeholder="Meta açıklama"
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Schema Açıklama</span></label>
                  <textarea
                    className="textarea textarea-bordered h-16"
                    value={formData.schema_description}
                    onChange={(e) => setFormData({ ...formData, schema_description: e.target.value })}
                    placeholder="Schema.org açıklama"
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Anahtar Kelimeler</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="kelime1, kelime2, kelime3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              İptal
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={20} />
              Kaydet
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}

function BulkUploadModal({
  onClose,
  onUpload
}: {
  onClose: () => void
  onUpload: (file: File) => void
}) {
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('Lütfen bir dosya seçin!')
      return
    }
    onUpload(file)
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Toplu Ürün Yükleme</h3>
        
        <div className="alert alert-info mb-4">
          <Upload size={20} />
          <div className="text-sm">
            <p className="font-semibold">JSON formatında dosya yükleyin</p>
            <p className="text-xs">Dosya bir ürün dizisi içermelidir</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text">JSON Dosyası</span></label>
            <input
              type="file"
              className="file-input file-input-bordered"
              accept=".json"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium">
              Örnek JSON Formatı
            </div>
            <div className="collapse-content">
              <pre className="text-xs bg-base-300 p-2 rounded overflow-x-auto">
{`[
  {
    "URL": "/urunler/ornek-urun",
    "Parent": "Ana Kategori",
    "child": "Alt Kategori",
    "subchild": "",
    "title": "Örnek Ürün",
    "sku": "SKU-001",
    "paragraph": "Kısa açıklama",
    "description": "Detaylı açıklama",
    "brand": "Marka Adı",
    "feature1": "Özellik 1: Değer",
    "feature2": "Özellik 2: Değer",
    "main_img": "https://...",
    "meta_title": "SEO Başlık",
    "meta_description": "SEO Açıklama",
    "keywords": "anahtar,kelime"
  }
]`}
              </pre>
            </div>
          </div>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              İptal
            </button>
            <button type="submit" className="btn btn-primary" disabled={!file}>
              <Upload size={20} />
              Yükle
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}

function ImageUploadField({
  label,
  value,
  onChange,
  small = false
}: {
  label: string
  value: string
  onChange: (url: string) => void
  small?: boolean
}) {
  const [uploading, setUploading] = useState(false)
  const [mode, setMode] = useState<'url' | 'upload'>('url')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Lütfen bir görsel dosyası seçin!')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'dan küçük olmalıdır!')
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch('/php/api/upload_image.php', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (data.success && data.url) {
  const normalized = data.url?.startsWith('http') ? data.url : `https://www.ketenpnomatik.com${data.url}`
        onChange(normalized)
        alert('Görsel başarıyla yüklendi!')
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Görsel yükleme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    } finally {
      setUploading(false)
      // Reset file input
      e.target.value = ''
    }
  }

  return (
    <div className="form-control">
      <label className="label">
        <span className={`label-text ${small ? 'text-xs' : ''}`}>{label}</span>
      </label>

      {/* Mode Toggle */}
      <div className="btn-group btn-group-sm mb-2">
        <button
          type="button"
          className={`btn btn-sm ${mode === 'url' ? 'btn-active' : ''}`}
          onClick={() => setMode('url')}
        >
          URL
        </button>
        <button
          type="button"
          className={`btn btn-sm ${mode === 'upload' ? 'btn-active' : ''}`}
          onClick={() => setMode('upload')}
        >
          Dosya Yükle
        </button>
      </div>

      {mode === 'url' ? (
        <input
          type="url"
          className={`input input-bordered ${small ? 'input-sm' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
        />
      ) : (
        <div className="flex gap-2">
          <input
            type="file"
            className={`file-input file-input-bordered flex-1 ${small ? 'file-input-sm' : ''}`}
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          {uploading && <span className="loading loading-spinner loading-sm"></span>}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="mt-2 relative">
          <img
            src={value}
            alt="Preview"
            className={`rounded border border-base-300 ${small ? 'h-16' : 'h-24'} object-cover`}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x400?text=Broken+Image'
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="btn btn-xs btn-circle btn-error absolute top-1 right-1"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  )
}