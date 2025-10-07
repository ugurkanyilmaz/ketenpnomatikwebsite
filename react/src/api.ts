export type Tier = {
  id: string
  title: string
  children: { id: string; title: string; subchildren: { id: string; title: string }[] }[]
}

const API_BASE = '/php/api'

export async function fetchTiers(): Promise<Tier[]> {
  const res = await fetch(`${API_BASE}/categories.php`)
  if (!res.ok) throw new Error('Failed to load categories')
  const json = await res.json()
  return json.tiers as Tier[]
}

export async function fetchCategoryRows(filters: { parent?: string; child?: string; subchild?: string } = {}) {
  const qs = new URLSearchParams()
  if (filters.parent) qs.set('parent', filters.parent)
  if (filters.child) qs.set('child', filters.child)
  if (filters.subchild) qs.set('subchild', filters.subchild)
  const res = await fetch(`${API_BASE}/categories_find.php?${qs.toString()}`)
  if (!res.ok) throw new Error('Failed to load categories data')
  return res.json() as Promise<{ items: any[] }>
}
