// Utilities to inject Google gtag and send page_view events
// Using the GTAG ID provided by the user
const GTAG_ID = 'G-3RME03B90R'

export function initGtag() {
  if (typeof window === 'undefined') return
  // Avoid injecting multiple times
  if ((window as any).__gtag_initialized) return
  ;(window as any).__gtag_initialized = true

  // Insert gtag.js script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`
  document.head.appendChild(script)

  // Initialize dataLayer and gtag function
  const inline = document.createElement('script')
  // Use the exact initialization snippet provided by the user
  inline.innerHTML = `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\n\ngtag('config', '${GTAG_ID}');`
  document.head.appendChild(inline)
}

export function sendPageView(url?: string) {
  if (typeof window === 'undefined') return
  const gtag = (window as any).gtag
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', { page_path: url || window.location.pathname })
  } else {
    // If gtag isn't ready yet, push to dataLayer as fallback
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ event: 'page_view', page_path: url || window.location.pathname })
  }
}

export default { initGtag, sendPageView }
