import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../utils/api'
import type { SiteImage } from './useSiteImages'

export function useSectionImages(prefix: string, fallbackBaseKey?: string) {
  const [images, setImages] = useState<SiteImage[]>([])
  const [hero, setHero] = useState<SiteImage | null>(null)
  const [showcase, setShowcase] = useState<SiteImage | null>(null)
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
          // Normalize: keep raw array for hero/showcase detection but expose only
          // base section images (those that do NOT end with _hero/_showcase) to callers
          const raw = data


          // hero/showcase detection (case-insensitive)
          const heroImg = raw.find((i: any) => /_hero$/i.test(i.section_key)) ?? raw[0] ?? null
          const showcaseImg = raw.find((i: any) => /_showcase$/i.test(i.section_key)) ?? raw[1] ?? raw[0] ?? null

          // base images: exclude hero/showcase keys
          const baseImages = raw.filter((i: any) => !/_hero$/i.test(i.section_key) && !/_showcase$/i.test(i.section_key))

          // sort baseImages by trailing number (e.g. prefix_1, prefix_2) when present
          baseImages.sort((a: any, b: any) => {
            const na = (a.section_key.match(/_(\d+)$/) || [null, '0'])[1]
            const nb = (b.section_key.match(/_(\d+)$/) || [null, '0'])[1]
            return Number(na) - Number(nb)
          })

          // store hero/showcase in closure variables via state below (we'll set after)
          setImages(baseImages)
          setHero(heroImg)
          setShowcase(showcaseImg)
          // store temporary heroes on a ref-like variable by attaching to set state via closures
          // we'll set external variables after effect finishes (below we also compute helper pickers)
          // For now assign to variables in outer scope by setting placeholder state through a second set call
          // Instead of adding extra state, compute hero/showcase again below from `data` when returning.
          // (so we just set images to baseImages here)
        } else if (fallbackBaseKey) {
          // fallback to base key
          const res2 = await fetch(`${API_BASE_URL}/site_images.php?section_key=${encodeURIComponent(fallbackBaseKey)}&_t=${ts}`)
          if (res2.ok) {
            const single: SiteImage = await res2.json()
            setImages([single])
            setHero(null)
            setShowcase(null)
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

  return { images, hero, showcase, loading, error }
}
