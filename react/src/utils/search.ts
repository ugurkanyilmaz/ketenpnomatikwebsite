// Small normalization utilities used by header search to match PHP slug rules
export function slugifyForApi(text: string) {
  let s = String(text || '')
  s = s.toLowerCase()
  // Turkish char mapping similar to server-side makeSlug/textToSlug
  s = s.replace(/ı/g, 'i')
  s = s.replace(/ş/g, 's')
  s = s.replace(/ğ/g, 'g')
  s = s.replace(/ü/g, 'u')
  s = s.replace(/ö/g, 'o')
  s = s.replace(/ç/g, 'c')
  s = s.replace(/İ/g, 'i')
  s = s.replace(/Ş/g, 's')
  s = s.replace(/Ğ/g, 'g')
  s = s.replace(/Ü/g, 'u')
  s = s.replace(/Ö/g, 'o')
  s = s.replace(/Ç/g, 'c')
  // Replace non-alnum with hyphen
  s = s.replace(/[^a-z0-9]+/g, '-')
  s = s.replace(/^-+|-+$/g, '')
  return s
}

export function normalizeForMatch(text: string) {
  return (text || '').toLowerCase()
}
