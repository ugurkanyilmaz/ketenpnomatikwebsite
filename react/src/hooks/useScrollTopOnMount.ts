import { useEffect } from 'react'

// Scroll to top instantly when a page/component mounts. Use this in pages that
// should start at the top on first render (detail pages, modals, etc.).
export function useScrollTopOnMount() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    // behavior: 'auto' is immediate (non-smooth)
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    } catch (err) {
      // fallback for very old browsers
      window.scrollTo(0, 0)
    }
  }, [])
}
