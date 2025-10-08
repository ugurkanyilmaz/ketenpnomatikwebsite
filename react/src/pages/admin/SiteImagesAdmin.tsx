import { useState, useEffect } from 'react'
import { Upload, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { useSiteImages } from '../../hooks/useSiteImages'

interface ImagePreview {
  section_key: string;
  file: File | null;
  preview: string;
  alt_text: string;
}

export default function SiteImagesAdmin() {
  const { images, loading, error, uploadImage, refetch } = useSiteImages()
  const [uploading, setUploading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [editMode, setEditMode] = useState<Record<string, ImagePreview>>({})

  // Kategorilere göre grupla
  const groupedImages = {
    'Ana Sayfa': images.filter(img => img.section_key.startsWith('home_')),
    'Hakkımızda': images.filter(img => img.section_key.startsWith('about_')),
    'Kolver': images.filter(img => img.section_key.startsWith('kolver_')),
    'APAC': images.filter(img => img.section_key.startsWith('apac_')),
    'Hiyoki': images.filter(img => img.section_key.startsWith('hiyoki_')),
    'Teknik Servis': images.filter(img => img.section_key.startsWith('technical_')),
  }

  const handleFileSelect = (sectionKey: string, file: File) => {
    const preview = URL.createObjectURL(file)
    const currentImage = images.find(img => img.section_key === sectionKey)
    
    setEditMode(prev => ({
      ...prev,
      [sectionKey]: {
        section_key: sectionKey,
        file: file,
        preview: preview,
        alt_text: currentImage?.alt_text || ''
      }
    }))
  }

  const handleAltTextChange = (sectionKey: string, altText: string) => {
    setEditMode(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        alt_text: altText
      }
    }))
  }

  const handleUpload = async (sectionKey: string) => {
    const editData = editMode[sectionKey]
    if (!editData?.file) return

    setUploading(sectionKey)
    setMessage(null)

    try {
      await uploadImage(sectionKey, editData.file, editData.alt_text)
      
      // Clear edit mode for this image
      setEditMode(prev => {
        const newState = { ...prev }
        delete newState[sectionKey]
        return newState
      })
      
      setMessage({ type: 'success', text: `${sectionKey} başarıyla güncellendi!` })
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Yükleme başarısız oldu' 
      })
    } finally {
      setUploading(null)
    }
  }

  const handleRefresh = () => {
    refetch()
    setMessage({ type: 'success', text: 'Görseller yenilendi' })
    setTimeout(() => setMessage(null), 2000)
  }

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      Object.values(editMode).forEach(edit => {
        if (edit.preview) URL.revokeObjectURL(edit.preview)
      })
    }
  }, [editMode])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="alert alert-error">
          <AlertCircle />
          <span>{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Site Görselleri</h1>
          <p className="text-base-content/60 mt-1">
            Ana sayfa ve diğer sayfalardaki görselleri buradan yönetebilirsiniz
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="btn btn-outline gap-2"
        >
          <RefreshCw size={18} />
          Yenile
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-6`}>
          {message.type === 'success' ? <CheckCircle /> : <AlertCircle />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Info Card */}
      <div className="card bg-info/10 border border-info/20 mb-6">
        <div className="card-body">
          <h3 className="font-semibold flex items-center gap-2">
            <AlertCircle size={18} />
            Önemli Bilgiler
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Görsel yüklediğinizde, div boyutu otomatik olarak görselin orijinal boyutuna göre ayarlanır</li>
            <li>Maksimum dosya boyutu: 5MB</li>
            <li>Desteklenen formatlar: JPEG, PNG, GIF, WebP</li>
            <li>Alt text SEO için önemlidir, mutlaka doldurun</li>
          </ul>
        </div>
      </div>

      {/* Images by Category */}
      {Object.entries(groupedImages).map(([category, categoryImages]) => (
        categoryImages.length > 0 && (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            
            <div className="grid gap-4">
              {categoryImages.map(image => {
                const isEditing = editMode[image.section_key]
                const isUploadingThis = uploading === image.section_key
                // Add timestamp to bypass browser cache
                const displayImage = isEditing?.preview || `${image.image_path}?t=${new Date(image.updated_at).getTime()}`

                return (
                  <div key={image.section_key} className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Image Preview */}
                        <div>
                          <h3 className="font-semibold mb-2">
                            {image.section_key}
                          </h3>
                          <div className="relative bg-base-200 rounded-lg overflow-hidden">
                            <img
                              src={displayImage}
                              alt={image.alt_text || image.section_key}
                              className="w-full h-auto object-contain"
                              style={{
                                maxHeight: '300px',
                                aspectRatio: image.width && image.height ? `${image.width}/${image.height}` : 'auto'
                              }}
                            />
                            {image.width && image.height && (
                              <div className="absolute bottom-2 right-2 badge badge-neutral">
                                {image.width} × {image.height}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="space-y-4">
                          {/* Alt Text */}
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-semibold">Alt Text</span>
                            </label>
                            <input
                              type="text"
                              value={isEditing?.alt_text ?? image.alt_text ?? ''}
                              onChange={(e) => handleAltTextChange(image.section_key, e.target.value)}
                              className="input input-bordered"
                              placeholder="Görsel açıklaması (SEO için önemli)"
                            />
                          </div>

                          {/* File Upload */}
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-semibold">Yeni Görsel Seç</span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileSelect(image.section_key, file)
                              }}
                              className="file-input file-input-bordered"
                            />
                          </div>

                          {/* Upload Button */}
                          {isEditing && (
                            <button
                              onClick={() => handleUpload(image.section_key)}
                              disabled={isUploadingThis}
                              className="btn btn-primary w-full gap-2"
                            >
                              {isUploadingThis ? (
                                <>
                                  <span className="loading loading-spinner loading-sm"></span>
                                  Yükleniyor...
                                </>
                              ) : (
                                <>
                                  <Upload size={18} />
                                  Görseli Güncelle
                                </>
                              )}
                            </button>
                          )}

                          {/* Info */}
                          <div className="text-sm text-base-content/60 space-y-1">
                            <div>Son güncelleme: {new Date(image.updated_at).toLocaleString('tr-TR')}</div>
                            <div>Dosya: {image.image_path}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      ))}
    </div>
  )
}
