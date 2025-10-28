import React, { useState } from 'react'
import { useSiteImages } from '../../hooks/useSiteImages'
import type { SiteImage } from '../../hooks/useSiteImages'

const SECTIONS: { key: string; label: string; count?: number }[] = [
  // from user's request mapping to seeded keys in setup_db.php
  { key: 'home_hero_1', label: 'Ana sayfa - Hero 1' },
  { key: 'home_hero_2', label: 'Ana sayfa - Hero 2' },
  { key: 'home_hero_3', label: 'Ana sayfa - Hero 3' },

  // Missing homepage product sections (added so admin can edit these images)
  { key: 'home_electric', label: 'Ana sayfa - Elektrikli Ürünlerimiz' },
  { key: 'home_battery', label: 'Ana sayfa - Akülü Ürünlerimiz' },
  { key: 'home_pneumatic', label: 'Ana sayfa - Havalı Ürünlerimiz' },

  { key: 'home_process_1', label: 'Ana sayfa - Nasıl Çalışıyoruz 1' },
  { key: 'home_process_2', label: 'Ana sayfa - Nasıl Çalışıyoruz 2' },
  { key: 'home_process_3', label: 'Ana sayfa - Nasıl Çalışıyoruz 3' },
  { key: 'home_process_4', label: 'Ana sayfa - Nasıl Çalışıyoruz 4' },

  { key: 'about_hero', label: 'Hakkımızda - Ana Hero' },
  { key: 'about_kolver', label: 'Hakkımızda - Kolver' },
  { key: 'about_apac', label: 'Hakkımızda - APAC' },
  { key: 'about_hiyoki', label: 'Hakkımızda - Hiyoki' },
  { key: 'about_service', label: 'Hakkımızda - Servis' },

  // New brands - Hakkımızda index
  { key: 'about_hawanox', label: 'Hakkımızda - Hawanox' },
  { key: 'about_asa', label: 'Hakkımızda - ASA' },
  { key: 'about_delta_regis', label: 'Hakkımızda - Delta Regis' },

  // Details pages (3 photos each)
  { key: 'kolver_section_1', label: 'Kolver detay 1' },
  { key: 'kolver_section_2', label: 'Kolver detay 2' },
  { key: 'kolver_section_3', label: 'Kolver detay 3' },

  { key: 'apac_section_1', label: 'APAC detay 1' },
  { key: 'apac_section_2', label: 'APAC detay 2' },
  { key: 'apac_section_3', label: 'APAC detay 3' },

  { key: 'hiyoki_section_1', label: 'Hiyoki detay 1' },
  { key: 'hiyoki_section_2', label: 'Hiyoki detal 2' },
  { key: 'hiyoki_section_3', label: 'Hiyoki detay 3' },

  // New brand detail pages (3 photos each)
  { key: 'hawanox_section_1', label: 'Hawanox detay 1' },
  { key: 'hawanox_section_2', label: 'Hawanox detay 2' },
  { key: 'hawanox_section_3', label: 'Hawanox detay 3' },

  { key: 'asa_section_1', label: 'ASA detay 1' },
  { key: 'asa_section_2', label: 'ASA detay 2' },
  { key: 'asa_section_3', label: 'ASA detay 3' },

  { key: 'delta_regis_section_1', label: 'Delta Regis detay 1' },
  { key: 'delta_regis_section_2', label: 'Delta Regis detay 2' },
  { key: 'delta_regis_section_3', label: 'Delta Regis detay 3' },
]

  function ImageRow({ sectionKey, image, onUpload, onUpdateAlt, onDelete }: {
  sectionKey: string
  image: SiteImage | null
  onUpload: (file: File, alt?: string) => Promise<void>
  onUpdateAlt: (sectionKey: string, alt: string) => Promise<void>
  onDelete: () => Promise<void>
}) {
  const [uploading, setUploading] = useState(false)
  const [alt, setAlt] = useState(image?.alt_text ?? '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  React.useEffect(() => setAlt(image?.alt_text ?? ''), [image])

  return (
    <div className="border rounded p-3 flex gap-4 items-center">
      <div style={{ width: 180, height: 100, flex: '0 0 180px' }}>
        {image ? (
          // image_path is relative to public
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.image_path} alt={image.alt_text ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="bg-gray-100 text-sm text-gray-600 flex items-center justify-center h-full">No image</div>
        )}
      </div>

      <div className="flex-1">
        <div className="mb-2 text-sm text-gray-700">Key: {image?.section_key ?? '(not present)'}</div>
        <div className="flex gap-2 items-center">
          <input type="file" accept="image/*" onChange={e => {
            const f = e.target.files?.[0]
            setSelectedFile(f ?? null)
          }} />

          <button
            className="bg-indigo-600 text-white px-3 py-1 rounded"
            onClick={async () => {
              if (!selectedFile) return alert('Lütfen yüklemek için bir dosya seçin')
              setUploading(true)
              try {
                await onUpload(selectedFile, alt)
                setSelectedFile(null)
              } catch (err) {
                console.error(err)
                alert('Upload failed: ' + (err instanceof Error ? err.message : String(err)))
              } finally {
                setUploading(false)
              }
            }}
          >
            Upload
          </button>

          <input className="border px-2 py-1" value={alt} onChange={e => setAlt(e.target.value)} placeholder="Alt text" />
          <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={async () => {
            // preserve existing image fields when sending alt update
            const payload = {
              alt_text: alt,
              image_path: image?.image_path ?? undefined,
              width: image?.width ?? undefined,
              height: image?.height ?? undefined
            }
            try {
              console.log('Saving alt for', sectionKey, '->', payload.alt_text)
              await onUpdateAlt(sectionKey, payload.alt_text ?? '')
            } catch (err) {
              console.error(err)
              alert('Alt metin kaydedilemedi: ' + (err instanceof Error ? err.message : String(err)))
            }
          }}>Save alt</button>

          {image && <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={async () => {
            try {
              await onDelete()
            } catch (err) {
              console.error(err)
              alert('Silme başarısız: ' + (err instanceof Error ? err.message : String(err)))
            }
          }}>Delete</button>}
        </div>
        {uploading && <div className="text-xs text-gray-500 mt-2">Uploading...</div>}
      </div>
    </div>
  )
}

export default function SiteImagesAdmin() {
  const { images, loading, error, refetch, uploadImage, updateImage, deleteImage } = useSiteImages()
  const [working, setWorking] = useState<string | null>(null)

  const findImage = (key: string) => images.find(i => i.section_key === key) ?? null

  const handleUpload = async (sectionKey: string, file: File, alt?: string) => {
    setWorking(sectionKey)
    try {
      await uploadImage(sectionKey, file, alt)
      await refetch()
    } catch (err) {
      console.error(err)
      alert('Yükleme başarısız: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setWorking(null)
    }
  }

  const handleUpdateAlt = async (sectionKey: string, alt: string) => {
    setWorking(sectionKey)
    try {
      const existing = findImage(sectionKey)
      const payload: Partial<SiteImage> = {
        alt_text: alt,
        image_path: existing?.image_path ?? undefined,
        width: existing?.width ?? undefined,
        height: existing?.height ?? undefined
      }
      await updateImage(sectionKey, payload)
      await refetch()
    } catch (err) {
      console.error(err)
      alert('Alt metin kaydedilemedi: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setWorking(null)
    }
  }

  const handleDelete = async (sectionKey: string) => {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return
    setWorking(sectionKey)
    try {
      await deleteImage(sectionKey)
      await refetch()
    } catch (err) {
      console.error(err)
      alert('Silme başarısız: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setWorking(null)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Site Görselleri Yönetimi</h1>
      <p className="text-sm text-gray-600">Aşağıdaki anahtarlar için görselleri görüntüleyip değiştirebilirsiniz.</p>

      <div className="space-y-3">
        {SECTIONS.map(s => (
          <div key={s.key}>
            <h3 className="text-sm font-medium mb-2">{s.label}</h3>
            <ImageRow
              sectionKey={s.key}
              image={findImage(s.key)}
              onUpload={(file, alt) => handleUpload(s.key, file, alt)}
              onUpdateAlt={(sectionKey, alt) => handleUpdateAlt(sectionKey, alt)}
              onDelete={() => handleDelete(s.key)}
            />
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => refetch()} disabled={loading || !!working}>
          Yenile
        </button>
        {loading && <span className="ml-3 text-sm text-gray-500">Yükleniyor...</span>}
        {error && <div className="text-sm text-red-600 mt-2">Hata: {error}</div>}
      </div>
    </div>
  )
}
