import { useEffect, useState } from 'react'
import { Image as ImageIcon, Plus, Trash2, Upload } from 'lucide-react'

interface CategoryPhoto {
  id: number
  parent: string
  child: string
  photo_url: string
  alt_text: string
  display_order: number
}

export default function CategoryPhotosManagement() {
  const [photos, setPhotos] = useState<CategoryPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<CategoryPhoto | null>(null)
  const [selectedParent, setSelectedParent] = useState('')
  const [selectedChild, setSelectedChild] = useState('')
  const [parents, setParents] = useState<string[]>([])
  const [children, setChildren] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'order' | 'parent' | 'recent'>('order')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    loadCategories()
    // Load all photos (we'll need a new endpoint for this)
    loadPhotos()
  }, [])

  const loadCategories = async () => {
    try {
      // Get all categories from database to match exactly with saved photos
      const res = await fetch('/php/api/categories_find.php')
      const data = await res.json()
      
      const parentSet = new Set<string>()
      
      data.items?.forEach((item: any) => {
        if (item.parent) parentSet.add(item.parent)
      })
      
      setParents(Array.from(parentSet).sort())
      console.log('🏷️ Available parents:', Array.from(parentSet))
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  const loadPhotos = async () => {
    try {
      const res = await fetch('/php/api/category_photos_list.php')
      const data = await res.json()
      console.log('📸 Loaded photos:', data)
      console.log('📊 Photo count:', data.photos?.length || 0)
      setPhotos(data.photos || [])
    } catch (err) {
      console.error('Failed to load photos:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadChildrenForParent = async (parent: string) => {
    try {
      // Get children from database to match exactly with saved photos
      const res = await fetch('/php/api/categories_find.php')
      const data = await res.json()
      
      const childSet = new Set<string>()
      data.items?.forEach((item: any) => {
        if (item.parent === parent && item.child) {
          childSet.add(item.child)
        }
      })
      
      const childList = Array.from(childSet).sort()
      setChildren(childList)
      console.log(`🏷️ Children for ${parent}:`, childList)
    } catch (err) {
      console.error('Failed to load children:', err)
    }
  }

  const handleSave = async (photo: Partial<CategoryPhoto>) => {
    try {
      console.log('💾 Saving photo:', photo)
      const res = await fetch('/php/api/category_photos_bulk_upload.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify([photo])
      })
      
      const result = await res.json()
      console.log('✅ Save result:', result)
      
      if (!res.ok) throw new Error('Save failed')
      
      await loadPhotos()
      setShowModal(false)
      setEditingPhoto(null)
      alert(`Fotoğraf kaydedildi!\nEklenen: ${result.inserted}\nGüncellenen: ${result.updated}`)
    } catch (err) {
      console.error('❌ Failed to save photo:', err)
      alert('Kaydetme başarısız!')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) return
    
    try {
      const res = await fetch('/php/api/category_photos_delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ id })
      })
      
      const data = await res.json()
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Silme başarısız')
      }
      
      await loadPhotos()
      alert('Fotoğraf başarıyla silindi!')
    } catch (err) {
      console.error('Failed to delete photo:', err)
      alert('Silme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    }
  }

  const filteredPhotos = photos
    .filter(photo => {
      console.log('🔍 Filtering photo:', { 
        photoId: photo.id,
        photoParent: photo.parent, 
        photoChild: photo.child,
        selectedParent, 
        selectedChild,
        parentMatch: !selectedParent || photo.parent === selectedParent,
        childMatch: !selectedChild || photo.child === selectedChild
      })
      
      if (selectedParent && photo.parent !== selectedParent) {
        console.log(`❌ Parent mismatch: "${photo.parent}" !== "${selectedParent}"`)
        return false
      }
      if (selectedChild && photo.child !== selectedChild) {
        console.log(`❌ Child mismatch: "${photo.child}" !== "${selectedChild}"`)
        return false
      }
      console.log(`✅ Photo ${photo.id} passed filter`)
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'order') return (a.display_order || 0) - (b.display_order || 0)
      if (sortBy === 'parent') return (a.parent || '').localeCompare(b.parent || '', 'tr')
      if (sortBy === 'recent') return (b.id || 0) - (a.id || 0)
      return 0
    })

  console.log('🖼️ Total photos:', photos.length)
  console.log('🖼️ Filtered photos:', filteredPhotos.length)
  console.log('🔍 Selected filters:', { selectedParent, selectedChild })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kategori Fotoğrafları</h1>
          <p className="text-base-content/60">
            {photos.length} fotoğraf •{' '}
            {Array.from(new Set(photos.map(p => p.parent))).length} parent •{' '}
            {Array.from(new Set(photos.map(p => `${p.parent}:${p.child}`))).length} kategori
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const json = JSON.stringify(photos, null, 2)
              const blob = new Blob([json], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `kategori_fotograflari_${new Date().toISOString().split('T')[0]}.json`
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="btn btn-secondary btn-outline"
            disabled={photos.length === 0}
          >
            <Upload size={20} />
            JSON İndir
          </button>
          <button
            onClick={() => {
              setEditingPhoto(null)
              setShowModal(true)
            }}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Fotoğraf Ekle
          </button>
        </div>
      </div>

      {/* Filters & View Options */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body p-4">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Parent Filtresi</span></label>
              <select
                className="select select-bordered"
                value={selectedParent}
                onChange={(e) => {
                  setSelectedParent(e.target.value)
                  setSelectedChild('')
                  if (e.target.value) {
                    loadChildrenForParent(e.target.value)
                  } else {
                    setChildren([])
                  }
                }}
              >
                <option value="">Tüm Parent'lar</option>
                {parents.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Child Filtresi</span></label>
              <select
                className="select select-bordered"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                disabled={!selectedParent}
              >
                <option value="">Tüm Child'lar</option>
                {children.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-base-content/60">Sıralama:</span>
              <div className="btn-group">
                <button
                  className={`btn btn-sm ${sortBy === 'order' ? 'btn-active' : 'btn-ghost'}`}
                  onClick={() => setSortBy('order')}
                >
                  Sıra
                </button>
                <button
                  className={`btn btn-sm ${sortBy === 'parent' ? 'btn-active' : 'btn-ghost'}`}
                  onClick={() => setSortBy('parent')}
                >
                  Parent
                </button>
                <button
                  className={`btn btn-sm ${sortBy === 'recent' ? 'btn-active' : 'btn-ghost'}`}
                  onClick={() => setSortBy('recent')}
                >
                  En Yeni
                </button>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <span className="text-sm text-base-content/60">Görünüm:</span>
              <div className="btn-group">
                <button
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-active' : 'btn-ghost'}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid Görünüm"
                >
                  <ImageIcon size={16} />
                </button>
                <button
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-active' : 'btn-ghost'}`}
                  onClick={() => setViewMode('list')}
                  title="Liste Görünüm"
                >
                  ☰
                </button>
              </div>
            </div>
            
            {(selectedParent || selectedChild) && (
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setSelectedParent('')
                  setSelectedChild('')
                  setChildren([])
                }}
              >
                Filtreleri Temizle
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Photos Display */}
      {loading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon size={64} className="mx-auto text-base-content/20 mb-4" />
          <p className="text-base-content/60 mb-2">
            {selectedParent || selectedChild ? 'Filtreye uygun fotoğraf bulunamadı' : 'Henüz fotoğraf eklenmemiş'}
          </p>
          {photos.length > 0 && (
            <div className="alert alert-info inline-flex max-w-xl mt-4">
              <div>
                <p className="font-semibold">Debug Bilgisi:</p>
                <p className="text-sm">Toplam {photos.length} fotoğraf yüklendi ama filtre nedeniyle görünmüyor.</p>
                <p className="text-sm mt-1">Yüklenen fotoğraflar:</p>
                <ul className="text-xs text-left mt-2 space-y-1">
                  {photos.slice(0, 5).map(p => (
                    <li key={p.id}>ID: {p.id}, Parent: "{p.parent}", Child: "{p.child}"</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary btn-sm mt-4"
          >
            {selectedParent || selectedChild ? 'Yeni Fotoğraf Ekle' : 'İlk Fotoğrafı Ekle'}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
              <figure className="aspect-video bg-base-200">
                <img
                  src={photo.photo_url}
                  alt={photo.alt_text}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Resim+Yüklenemedi'
                  }}
                />
              </figure>
              <div className="card-body p-4">
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="badge badge-sm badge-outline">{photo.parent}</div>
                    <span className="text-xs">•</span>
                    <div className="badge badge-sm badge-ghost">{photo.child}</div>
                  </div>
                  {photo.alt_text && (
                    <p className="text-xs text-base-content/60 truncate italic">"{photo.alt_text}"</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-base-content/40">
                    <span>ID: {photo.id}</span>
                    <span>•</span>
                    <span>Sıra: {photo.display_order || 0}</span>
                  </div>
                </div>
                <div className="card-actions justify-between mt-3">
                  <button
                    onClick={() => {
                      setEditingPhoto(photo)
                      setShowModal(true)
                    }}
                    className="btn btn-sm btn-ghost tooltip tooltip-bottom"
                    data-tip="Düzenle"
                  >
                    <Upload size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="btn btn-sm btn-ghost text-error tooltip tooltip-bottom"
                    data-tip="Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Önizleme</th>
                    <th>Parent</th>
                    <th>Child</th>
                    <th>Alt Text</th>
                    <th>Sıra</th>
                    <th>URL</th>
                    <th className="text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPhotos.map((photo) => (
                    <tr key={photo.id} className="hover">
                      <td>
                        <div className="avatar">
                          <div className="w-16 h-12 rounded">
                            <img
                              src={photo.photo_url}
                              alt={photo.alt_text}
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/80x60?text=?'
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-sm badge-outline">{photo.parent}</div>
                      </td>
                      <td>
                        <div className="badge badge-sm badge-ghost">{photo.child}</div>
                      </td>
                      <td className="max-w-xs truncate text-sm">{photo.alt_text || <span className="text-base-content/40 italic">-</span>}</td>
                      <td className="font-mono text-sm">{photo.display_order || 0}</td>
                      <td className="max-w-xs truncate text-xs font-mono text-base-content/60">{photo.photo_url}</td>
                      <td className="text-right">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => {
                              setEditingPhoto(photo)
                              setShowModal(true)
                            }}
                            className="btn btn-sm btn-ghost tooltip tooltip-left"
                            data-tip="Düzenle"
                          >
                            <Upload size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(photo.id)}
                            className="btn btn-sm btn-ghost text-error tooltip tooltip-left"
                            data-tip="Sil"
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
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <PhotoModal
          photo={editingPhoto}
          parents={parents}
          onClose={() => {
            setShowModal(false)
            setEditingPhoto(null)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

function PhotoModal({
  photo,
  parents,
  onClose,
  onSave
}: {
  photo: CategoryPhoto | null
  parents: string[]
  onClose: () => void
  onSave: (photo: Partial<CategoryPhoto>) => void
}) {
  const [formData, setFormData] = useState<Partial<CategoryPhoto>>(
    photo || {
      parent: '',
      child: '',
      photo_url: '',
      alt_text: '',
      display_order: 0
    }
  )
  const [children, setChildren] = useState<string[]>([])

  useEffect(() => {
    if (formData.parent) {
      loadChildrenForParent(formData.parent)
    }
  }, [formData.parent])

  const loadChildrenForParent = async (parent: string) => {
    try {
      // Get children from database to match exactly
      const res = await fetch('/php/api/categories_find.php')
      const data = await res.json()
      
      const childSet = new Set<string>()
      data.items?.forEach((item: any) => {
        if (item.parent === parent && item.child) {
          childSet.add(item.child)
        }
      })
      
      setChildren(Array.from(childSet).sort())
    } catch (err) {
      console.error('Failed to load children:', err)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.parent || !formData.child || !formData.photo_url) {
      alert('Parent, Child ve Fotoğraf URL alanları zorunludur!')
      return
    }
    onSave(formData)
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">
          {photo ? 'Fotoğraf Düzenle' : 'Yeni Fotoğraf Ekle'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Parent *</span></label>
            <select
              className="select select-bordered"
              value={formData.parent}
              onChange={(e) => {
                setFormData({ ...formData, parent: e.target.value, child: '' })
              }}
              required
            >
              <option value="">Seçin...</option>
              {parents.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Child *</span></label>
            <select
              className="select select-bordered"
              value={formData.child}
              onChange={(e) => setFormData({ ...formData, child: e.target.value })}
              disabled={!formData.parent || children.length === 0}
              required
            >
              <option value="">Seçin...</option>
              {children.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Fotoğraf URL *</span></label>
            <input
              type="url"
              className="input input-bordered"
              value={formData.photo_url}
              onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Alt Text</span></label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.alt_text}
              onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
              placeholder="Fotoğraf açıklaması"
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Sıra</span></label>
            <input
              type="number"
              className="input input-bordered"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
            />
          </div>

          {formData.photo_url && (
            <div className="form-control">
              <label className="label"><span className="label-text">Önizleme</span></label>
              <img
                src={formData.photo_url}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Ge%C3%A7ersiz+URL'
                }}
              />
            </div>
          )}

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              İptal
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={20} />
              Kaydet
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}
