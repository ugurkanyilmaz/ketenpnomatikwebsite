export type Tier = {
  id: string
  title: string
  children: { id: string; title: string; subchildren: { id: string; title: string }[] }[]
}

const API_BASE = '/php/api'
export const API_BASE_URL = API_BASE

export async function fetchTiers(): Promise<Tier[]> {
  const res = await fetch(`${API_BASE}/articles.php`)
  if (!res.ok) throw new Error('Failed to load articles')
  const json = await res.json()
  return json.tiers as Tier[]
}

export async function fetchArticleRows(filters: { parent?: string; child?: string; subchild?: string } = {}) {
  const qs = new URLSearchParams()
  if (filters.parent) qs.set('parent', filters.parent)
  if (filters.child) qs.set('child', filters.child)
  if (filters.subchild) qs.set('subchild', filters.subchild)
  const res = await fetch(`${API_BASE}/articles_find.php?${qs.toString()}`)
  if (!res.ok) throw new Error('Failed to load articles data')
  return res.json() as Promise<{ items: any[] }>
}

export async function fetchProducts(opts: { limit?: number; q?: string } = {}) {
  const qs = new URLSearchParams()
  if (opts.limit) qs.set('limit', String(opts.limit))
  if (opts.q) qs.set('q', opts.q)
  const res = await fetch(`${API_BASE}/products.php?${qs.toString()}`)
  if (!res.ok) throw new Error('Failed to load products')
  return res.json() as Promise<{ success: boolean; count: number; products: any[] }>
}
