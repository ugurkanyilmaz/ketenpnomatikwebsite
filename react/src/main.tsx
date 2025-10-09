import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initGtag } from './utils/google_codes'

// Small, early-running script to keep animations off until we're sure they
// should run. We start with `data-no-animations` present on <html> to avoid
// CSS transitions/animations during initial paint; remove it when allowed.
function shouldEnableAnimations() {
  if (typeof window === 'undefined') return true
  const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mq && mq.matches) return false
  return window.innerWidth >= 768
}

function syncNoAnimationsAttribute() {
  try {
    const root = document.documentElement
    if (shouldEnableAnimations()) {
      root.removeAttribute('data-no-animations')
    } else {
      root.setAttribute('data-no-animations', 'true')
    }
  } catch (err) {
    // be defensive in case document isn't ready
    /* noop */
  }
}

// run immediately before React mounts
syncNoAnimationsAttribute()

// keep in sync (resize + prefers-reduced-motion changes)
if (typeof window !== 'undefined') {
  const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
  const onResize = () => syncNoAnimationsAttribute()
  const onReduceChange = () => syncNoAnimationsAttribute()
  window.addEventListener('resize', onResize)
  if (mq) {
    if ((mq as any).addEventListener) (mq as any).addEventListener('change', onReduceChange)
    else (mq as any).addListener(onReduceChange)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Initialize Google Tag (injects gtag.js and initial config)
initGtag()

// Insert canonical link tag based on env or current origin so dev (localhost)
// and production (ketenpnomatik.com) each show the correct canonical URL.
try {
  const siteUrl = (import.meta.env.VITE_SITE_URL as string) || (typeof window !== 'undefined' ? window.location.origin : '')
  if (siteUrl) {
    const link = document.querySelector('link[rel="canonical"]') || document.createElement('link')
    link.setAttribute('rel', 'canonical')
    link.setAttribute('href', siteUrl)
    if (!document.head.contains(link)) document.head.appendChild(link)
  }
} catch (err) {
  /* ignore in environments without DOM */
}
