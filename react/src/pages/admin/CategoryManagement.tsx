import { useEffect, useState } from 'react'
import { Edit, Trash2, Plus, Upload, Search } from 'lucide-react'

interface Category {
  id: number
  parent: string
  child: string
  subchild: string
  title: string
  title_subtext: string
  about: string
  featured: string
  info: string
  summary: string
  usable_areas: string
  main_image: string
  img1: string
  video_url: string
  meta_title: string
  meta_desc: string
  schema_desc: string
  meta_keywords: string
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [filterParent, setFilterParent] = useState('')
  const [filterChild, setFilterChild] = useState('')
  const [sortBy, setSortBy] = useState<'id' | 'parent' | 'title'>('id')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const res = await fetch('/php/api/articles_find.php')
      const data = await res.json()
      setCategories(data.items || [])
    } catch (err) {
      console.error('Failed to load categories:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return
    
    try {
      const res = await fetch('/php/api/articles_delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ id })
      })
      
      const data = await res.json()
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Silme başarısız')
      }
      
      await loadCategories()
      alert('Kategori başarıyla silindi!')
    } catch (err) {
      console.error('Failed to delete category:', err)
      alert('Silme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    }
  }

  const handleSave = async (category: Partial<Category>) => {
    try {
      // Use bulk upload endpoint for single item
      const res = await fetch('/php/api/articles_bulk_upload_json.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify([category])
      })
      
      if (!res.ok) throw new Error('Save failed')
      
      await loadCategories()
      setShowModal(false)
      setEditingCategory(null)
      alert('Kategori kaydedildi!')
    } catch (err) {
      console.error('Failed to save category:', err)
      alert('Kaydetme başarısız!')
    }
  }

  const handleBulkUpload = async (file: File) => {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      const res = await fetch('/php/api/articles_bulk_upload_json.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(data)
      })
      
      if (!res.ok) throw new Error('Upload failed')
      
      const result = await res.json()
      alert(`Yükleme tamamlandı!\nEklenen: ${result.inserted}\nGüncellenen: ${result.updated}\nAtlanan: ${result.skipped}`)
      
      await loadCategories()
      setShowBulkUpload(false)
    } catch (err) {
      console.error('Failed to upload:', err)
      alert('Yükleme başarısız!')
    }
  }

  // Get unique parents and children for filters
  const uniqueParents = Array.from(new Set(categories.map(c => c.parent).filter(Boolean)))
  const uniqueChildren = Array.from(new Set(
    categories
      .filter(c => !filterParent || c.parent === filterParent)
      .map(c => c.child)
      .filter(Boolean)
  ))

  const filteredCategories = categories
    .filter(cat => {
      // Search filter
      const searchMatch = !searchTerm || 
        cat.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.parent?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.child?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.subchild?.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Parent filter
      const parentMatch = !filterParent || cat.parent === filterParent
      
      // Child filter
      const childMatch = !filterChild || cat.child === filterChild
      
      return searchMatch && parentMatch && childMatch
    })
    .sort((a, b) => {
      if (sortBy === 'id') return (a.id || 0) - (b.id || 0)
      if (sortBy === 'parent') return (a.parent || '').localeCompare(b.parent || '', 'tr')
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '', 'tr')
      return 0
    })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kategori Yönetimi</h1>
          <p className="text-base-content/60">{categories.length} kategori bulundu</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkUpload(true)}
            className="btn btn-secondary"
          >
            <Upload size={20} />
            Toplu Yükle
          </button>
          <button
            onClick={() => {
              setEditingCategory(null)
              setShowModal(true)
            }}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Yeni Kategori
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body p-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                <input
                  type="text"
                  placeholder="Kategori ara..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-control">
              <select
                className="select select-bordered"
                value={filterParent}
                onChange={(e) => {
                  setFilterParent(e.target.value)
                  setFilterChild('')
                }}
              >
                <option value="">Tüm Parent'lar</option>
                {uniqueParents.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            
            <div className="form-control">
              <select
                className="select select-bordered"
                value={filterChild}
                onChange={(e) => setFilterChild(e.target.value)}
                disabled={!filterParent}
              >
                <option value="">Tüm Child'lar</option>
                {uniqueChildren.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-base-content/60">Sıralama:</span>
              <div className="btn-group">
                <button
                  className={`btn btn-sm ${sortBy === 'id' ? 'btn-active' : 'btn-ghost'}`}
                  onClick={() => setSortBy('id')}
                >
                  ID
                </button>
                <button
                  className={`btn btn-sm ${sortBy === 'parent' ? 'btn-active' : 'btn-ghost'}`}
                  onClick={() => setSortBy('parent')}
                >
                  Parent
                </button>
                <button
                  className={`btn btn-sm ${sortBy === 'title' ? 'btn-active' : 'btn-ghost'}`}
                  onClick={() => setSortBy('title')}
                >
                  Başlık
                </button>
              </div>
            </div>
            
            {(searchTerm || filterParent || filterChild) && (
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setSearchTerm('')
                  setFilterParent('')
                  setFilterChild('')
                }}
              >
                Filtreleri Temizle
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Parent</th>
                  <th>Child</th>
                  <th>Subchild</th>
                  <th>Başlık</th>
                  <th>İçerik Durumu</th>
                  <th className="text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <span className="loading loading-spinner loading-lg"></span>
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-base-content/60">
                      {searchTerm || filterParent || filterChild ? 
                        'Filtreye uygun kategori bulunamadı' : 
                        'Henüz kategori eklenmemiş'
                      }
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat) => (
                    <tr key={cat.id} className="hover">
                      <td className="font-mono text-sm">{cat.id}</td>
                      <td>
                        <div className="badge badge-sm badge-outline">{cat.parent}</div>
                      </td>
                      <td>
                        <div className="badge badge-sm badge-ghost">{cat.child}</div>
                      </td>
                      <td className="max-w-xs truncate">{cat.subchild}</td>
                      <td className="font-medium max-w-xs truncate">
                        {cat.title || <span className="text-base-content/40 italic">Başlık yok</span>}
                      </td>
                      <td>
                        <div className="flex gap-1 flex-wrap">
                          {cat.about && <div className="badge badge-success badge-xs" title="Hakkında mevcut">H</div>}
                          {cat.featured && <div className="badge badge-info badge-xs" title="Özellikler mevcut">Ö</div>}
                          {cat.main_image && <div className="badge badge-warning badge-xs" title="Resim mevcut">R</div>}
                          {cat.video_url && <div className="badge badge-error badge-xs" title="Video mevcut">V</div>}
                          {cat.meta_title && <div className="badge badge-primary badge-xs" title="SEO mevcut">S</div>}
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => {
                              setEditingCategory(cat)
                              setShowModal(true)
                            }}
                            className="btn btn-sm btn-ghost tooltip tooltip-left"
                            data-tip="Düzenle"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => {
                              // Copy category data to clipboard
                              navigator.clipboard.writeText(JSON.stringify(cat, null, 2))
                              alert('Kategori verisi panoya kopyalandı!')
                            }}
                            className="btn btn-sm btn-ghost tooltip tooltip-left"
                            data-tip="JSON Kopyala"
                          >
                            <Upload size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="btn btn-sm btn-ghost text-error tooltip tooltip-left"
                            data-tip="Sil"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          {!loading && filteredCategories.length > 0 && (
            <div className="p-4 border-t flex justify-between items-center">
              <div className="text-sm text-base-content/60">
                Toplam {filteredCategories.length} kategori gösteriliyor
                {categories.length !== filteredCategories.length && (
                  <span> ({categories.length} toplam)</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    const json = JSON.stringify(filteredCategories, null, 2)
                    const blob = new Blob([json], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `kategoriler_${new Date().toISOString().split('T')[0]}.json`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                >
                  <Upload size={16} />
                  JSON İndir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setShowModal(false)
            setEditingCategory(null)
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

function CategoryModal({
  category,
  onClose,
  onSave
}: {
  category: Category | null
  onClose: () => void
  onSave: (cat: Partial<Category>) => void
}) {
  const [formData, setFormData] = useState<Partial<Category>>(
    category || {
      parent: '',
      child: '',
      subchild: '',
      title: '',
      title_subtext: '',
      about: '',
      featured: '',
      info: '',
      summary: '',
      usable_areas: '',
      main_image: '',
      img1: '',
      video_url: '',
      meta_title: '',
      meta_desc: '',
      schema_desc: '',
      meta_keywords: ''
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.parent || !formData.child || !formData.subchild) {
      alert('Parent, Child ve Subchild alanları zorunludur!')
      return
    }
    onSave(formData)
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">
          {category ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Parent *</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.parent}
                onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Child *</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.child}
                onChange={(e) => setFormData({ ...formData, child: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Subchild *</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.subchild}
                onChange={(e) => setFormData({ ...formData, subchild: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Başlık</span></label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Alt Başlık</span></label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.title_subtext}
              onChange={(e) => setFormData({ ...formData, title_subtext: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Hakkında</span></label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Öne Çıkan Özellikler (her satır bir özellik)</span></label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.value })}
              placeholder="- Özellik 1&#10;- Özellik 2"
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Seri Bilgileri (her satır bir bilgi)</span></label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={formData.info}
              onChange={(e) => setFormData({ ...formData, info: e.target.value })}
              placeholder="- Bilgi 1&#10;- Bilgi 2"
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Seri Özeti (; ile ayırın)</span></label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Özellik 1; Özellik 2; Özellik 3"
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Kullanım Alanları (virgül veya yeni satır ile ayırın)</span></label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={formData.usable_areas}
              onChange={(e) => setFormData({ ...formData, usable_areas: e.target.value })}
              placeholder="Otomotiv Servisleri, Endüstriyel Montaj"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Ana Görsel URL</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.main_image}
                onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">İkinci Görsel URL</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.img1}
                onChange={(e) => setFormData({ ...formData, img1: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Video URL</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                placeholder="https://youtube.com/embed/..."
              />
            </div>
          </div>

          <div className="divider">SEO Bilgileri</div>

          <div className="form-control">
            <label className="label"><span className="label-text">Meta Title</span></label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Meta Description</span></label>
            <textarea
              className="textarea textarea-bordered h-20"
              value={formData.meta_desc}
              onChange={(e) => setFormData({ ...formData, meta_desc: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Schema Description</span></label>
            <textarea
              className="textarea textarea-bordered h-20"
              value={formData.schema_desc}
              onChange={(e) => setFormData({ ...formData, schema_desc: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Meta Keywords (virgül ile ayırın)</span></label>
            <textarea
              className="textarea textarea-bordered h-20"
              value={formData.meta_keywords}
              onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
            />
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

function BulkUploadModal({
  onClose,
  onUpload
}: {
  onClose: () => void
  onUpload: (file: File) => void
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/json') {
      setSelectedFile(file)
    } else {
      alert('Lütfen geçerli bir JSON dosyası seçin!')
    }
  }

  const handleSubmit = () => {
    if (!selectedFile) {
      alert('Lütfen bir dosya seçin!')
      return
    }
    onUpload(selectedFile)
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Toplu Kategori Yükleme</h3>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">JSON Dosyası Seçin</span>
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
          <label className="label">
            <span className="label-text-alt">
              Dosya formatı: category_upload.json ile aynı formatta olmalı
            </span>
          </label>
        </div>

        {selectedFile && (
          <div className="alert alert-info mt-4">
            <span>Seçilen dosya: {selectedFile.name}</span>
          </div>
        )}

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            İptal
          </button>
          <button onClick={handleSubmit} className="btn btn-primary" disabled={!selectedFile}>
            <Upload size={20} />
            Yükle
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}
