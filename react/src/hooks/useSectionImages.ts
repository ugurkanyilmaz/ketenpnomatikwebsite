import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../utils/api'
import type { SiteImage } from './useSiteImages'

export function useSectionImages(prefix: string, fallbackBaseKey?: string) {
  const [images, setImages] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      try {
        const ts = Date.now()
        const res = await fetch(`${API_BASE_URL}/site_images.php?prefix=${encodeURIComponent(prefix)}&_t=${ts}`)
        if (!res.ok) throw new Error('Failed to load section images')
        const data: SiteImage[] = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setImages(data)
        } else if (fallbackBaseKey) {
          // fallback to base key
          const res2 = await fetch(`${API_BASE_URL}/site_images.php?section_key=${encodeURIComponent(fallbackBaseKey)}&_t=${ts}`)
          if (res2.ok) {
            const single: SiteImage = await res2.json()
            setImages([single])
          }
        }
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [prefix, fallbackBaseKey])

  // helper pickers
  const hero = images.find(i => i.section_key.endsWith('_hero')) ?? images[0] ?? null
  const showcase = images.find(i => i.section_key.endsWith('_showcase')) ?? images[1] ?? images[0] ?? null

  return { images, hero, showcase, loading, error }
}
