import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProducts, fetchArticleRows } from '../utils/api'
import { slugifyForApi } from '../utils/search'

// ScrollToTopLink component - small typed anchor wrapper
type ScrollToTopLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  children: ReactNode
}

function ScrollToTopLink({ to, children, className, ...props }: ScrollToTopLinkProps) {
  return (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const prevActiveRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    if (open) {
  prevActiveRef.current = document.activeElement as HTMLElement | null
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
  setTimeout(() => closeBtnRef.current?.focus(), 50)
    }

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
  if (!open && prevActiveRef.current) prevActiveRef.current.focus()
    }
  }, [open])

  return (
    <>
      <button
        aria-label="Menüyü aç"
        className="btn btn-ghost btn-square lg:hidden text-white hover:text-yellow-300 focus:text-yellow-300 focus:ring-2 focus:ring-yellow-300"
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
        />

        <aside
          ref={panelRef}
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-800 text-white p-6 shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between mb-8">
            <ScrollToTopLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <img src="/ketenlogoson.fw_.png" alt="Keten Pnömatik" className="h-8 w-auto" />
            </ScrollToTopLink>
            <button 
              ref={closeBtnRef} 
              className="btn btn-ghost btn-sm btn-square" 
              onClick={() => setOpen(false)} 
              aria-label="Kapat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <ScrollToTopLink 
              to="/" 
              className="px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              Ana Sayfa
            </ScrollToTopLink>
            <ScrollToTopLink 
              to="/hakkimizda" 
              className="px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              Hakkımızda
            </ScrollToTopLink>
            <ScrollToTopLink 
              to="/kategoriler" 
              className="px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              Ürünlerimiz
            </ScrollToTopLink>
            <ScrollToTopLink 
              to="/iletisim" 
              className="px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              İletişim
            </ScrollToTopLink>
            <ScrollToTopLink 
              to="/teknik-servis" 
              className="px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              Teknik Servis
            </ScrollToTopLink>
            <ScrollToTopLink 
              to="/sss" 
              className="px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              SSS
            </ScrollToTopLink>
          </nav>

          <div className="mt-8 space-y-3">
            <SearchInput />
            <a 
              href="/demo-talebi" 
              className="btn btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              Demo Talep Et
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <ScrollToTopLink to="/" aria-label="Keten Pnömatik" className="flex items-center gap-2 flex-shrink-0">
            <img src="/ketenlogoson.fw_.png" alt="Keten Pnömatik" className="h-8 md:h-10 w-auto" />
          </ScrollToTopLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 mx-6">
            <ScrollToTopLink to="/" className="px-4 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors">
              Ana Sayfa
            </ScrollToTopLink>
            <ScrollToTopLink to="/hakkimizda" className="px-4 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors">
              Hakkımızda
            </ScrollToTopLink>
            <ScrollToTopLink to="/kategoriler" className="px-4 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors">
              Ürünlerimiz
            </ScrollToTopLink>
            <ScrollToTopLink to="/iletisim" className="px-4 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors">
              İletişim
            </ScrollToTopLink>
            <ScrollToTopLink to="/teknik-servis" className="px-4 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors">
              Teknik Servis
            </ScrollToTopLink>
          </nav>
          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <SearchInput />
            </div>

            {/* Demo Button - Show on mobile too */}
            <ScrollToTopLink 
              to="/demo-talebi" 
              className="inline-flex btn btn-primary btn-sm md:btn-md rounded-full"
            >
              Demo Talebi
            </ScrollToTopLink>

            {/* SSS - Desktop only */}
            <ScrollToTopLink 
              to="/sss" 
              className="hidden lg:inline-flex btn btn-ghost btn-sm md:btn-md rounded-full text-white"
            >
              SSS
            </ScrollToTopLink>

            {/* Mobile Menu Button */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

function SearchInput() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Array<{ type: 'product'|'article'; title: string; href: string }>>([])
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState<number>(-1)
  const mounted = useRef(true)
  const timer = useRef<number|undefined>(undefined)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  // close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return
      if (e.target instanceof Node && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setHighlight(-1)
      }
    }

    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  useEffect(() => {
    if (!query) {
      setSuggestions([])
      setOpen(false)
      return
    }

    // debounce
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => void doSearch(query), 250)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  async function doSearch(q: string) {
    setLoading(true)
    try {
      const results: Array<{ type: 'product'|'article'; title: string; href: string }> = []

      // products
      try {
        const prodJson = await fetchProducts({ limit: 10, q })
        ;(prodJson.products || []).slice(0, 6).forEach((p: any) => {
          results.push({ type: 'product', title: p.title || p.sku || p.brand || 'Ürün', href: `/urun/${p.sku}` })
        })
      } catch (e) {
        console.warn('Product search failed', e)
      }

      // articles - try slugified parent match first, then fallback to non-slug if no results
      try {
        const artSlug = slugifyForApi(q)
        const artJson = await fetchArticleRows({ parent: artSlug })
        ;(artJson.items || []).slice(0, 6).forEach((a: any) => {
          let href = '/kategoriler'
          if (a.parent && a.child && a.subchild) href = `/kategoriler/${slugifyForApi(a.parent)}/${slugifyForApi(a.child)}/${slugifyForApi(a.subchild)}`
          else if (a.parent && a.child) href = `/kategoriler/${slugifyForApi(a.parent)}/${slugifyForApi(a.child)}`
          else if (a.parent) href = `/kategoriler/${slugifyForApi(a.parent)}`
          results.push({ type: 'article', title: a.title || a.subchild || a.child || a.parent || 'Makale', href })
        })
      } catch (e) {
        console.warn('Article search failed', e)
      }

      if (mounted.current) {
        setSuggestions(results.slice(0, 8))
        setOpen(results.length > 0)
        setHighlight(-1)
      }
    } catch (err) {
      console.error('Search failed', err)
    } finally {
      if (mounted.current) setLoading(false)
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            setOpen(false)
            const target = highlight >= 0 && highlight < suggestions.length ? suggestions[highlight].href : (suggestions[0]?.href)
            if (target) navigate(target)
            else navigate(`/urunler?q=${encodeURIComponent(query)}`)
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (!open && suggestions.length) setOpen(true)
            setHighlight((h) => Math.min(suggestions.length - 1, h + 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlight((h) => Math.max(-1, h - 1))
          } else if (e.key === 'Escape') {
            setOpen(false)
            setHighlight(-1)
          }
        }}
        onFocus={() => { if (suggestions.length) setOpen(true) }}
        type="text"
        placeholder="Ara: darbeli tabanca..."
        className="input input-sm md:input-md input-bordered w-48 lg:w-64 rounded-full bg-slate-700 text-white border-slate-600 placeholder:text-slate-400"
        aria-autocomplete="list"
        aria-controls="header-search-list"
        aria-expanded={open}
        aria-activedescendant={highlight >= 0 ? `search-suggestion-${highlight}` : undefined}
      />

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded shadow-lg z-50">
          {loading && <div className="p-3 text-sm text-gray-600">Aranıyor...</div>}
          {!loading && suggestions.length === 0 && <div className="p-3 text-sm text-gray-600">Sonuç yok</div>}
          <ul id="header-search-list" role="listbox" className="max-h-64 overflow-auto">
            {suggestions.map((s, idx) => (
              <li key={idx} role="option" id={`search-suggestion-${idx}`} aria-selected={highlight === idx}>
                <a
                  href={s.href}
                  className={`block px-3 py-2 ${highlight === idx ? 'bg-slate-100' : 'hover:bg-slate-100'}`}
                  onMouseEnter={() => setHighlight(idx)}
                  onMouseLeave={() => setHighlight(-1)}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                    navigate(s.href)
                  }}
                >
                  <span className="text-sm">{s.title}</span>
                  <span className="ml-2 text-xs opacity-60">{s.type}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}