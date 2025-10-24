const SITE_CANONICAL = 'https://www.ketenpnomatik.com'

/**
 * Normalize image/path values coming from the API so SEO helpers and page renderers
 * use the same canonical URL. Mirrors the behavior of `getImgOrFallback` used in pages.
 */
export function normalizeImageUrl(raw?: any, fallback = `${SITE_CANONICAL}/weblogo.jpg`) {
  try {
    if (!raw) return fallback
    let s = String(raw).trim()
    if (s === '' || s.toUpperCase() === 'NULL') return fallback

    // Remove backslash escapes
    s = s.replace(/\\\//g, '/').replace(/\\/g, '')

    // collapse duplicate protocols
    s = s.replace(/^(https?:\/\/)+/i, (m) => m.replace(/(https?:\/\/)+/i, '$1'))

    // protocol-relative
    if (s.startsWith('//')) s = 'https:' + s

    // If it starts with '/', prefer canonical host. For uploads, insert '/react/public' prefix
    if (!/^https?:\/\//i.test(s) && s.startsWith('/')) {
      if (s.includes('/uploads/') && s.indexOf('/react/public') === -1) {
        // Prefer canonical host for final URLs but keep '/react/public' path used on server
        return SITE_CANONICAL + '/react/public' + s.replace(/^\/+/, '/')
      }
      return SITE_CANONICAL + s
    }

    // If host is ketenpnomatik.com, normalize to canonical host but keep '/react/public' for uploads
    try {
      const u = new URL(s)
      if (u.hostname && u.hostname.endsWith('ketenpnomatik.com')) {
        let path = u.pathname || '/'
        if (path.includes('/uploads/') && path.indexOf('/react/public') === -1) {
          path = '/react/public' + path.replace(/^\/+/, '/')
        }
        // Normalize to canonical host (www) for consistency in OG and structured data
        return SITE_CANONICAL + path + u.search + u.hash
      }
    } catch (e) {
      // ignore
    }

    return s
  } catch (e) {
    return fallback
  }
}

export default { normalizeImageUrl }
