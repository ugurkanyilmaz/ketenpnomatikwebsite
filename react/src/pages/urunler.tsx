import { useEffect, useState } from 'react'
import { applyPageSEO } from '../utils/other_seo'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, X, Grid3x3, List, Package } from 'lucide-react'

interface Product {
  id: number
  url: string
  parent: string
  child: string
  subchild: string
  title: string
  sku: string
  paragraph: string
  description: string
  brand: string
  main_img: string
  meta_description: string
}

export default function Urunler() {
  useEffect(() => {
    applyPageSEO('products')
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [selectedParent, setSelectedParent] = useState<string>(searchParams.get('parent') || '')
  const [selectedChild, setSelectedChild] = useState<string>(searchParams.get('child') || '')
  const [selectedSubchild, setSelectedSubchild] = useState<string>(searchParams.get('subchild') || '')
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams.get('brand') || '')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    loadProducts()
  }, [])

  // Validate filters when products load
  useEffect(() => {
    if (products.length === 0) return
    
    // Validate child belongs to parent
    if (selectedChild && selectedParent) {
      const validChildren = products.filter(p => p.parent === selectedParent).map(p => p.child)
      if (!validChildren.includes(selectedChild)) {
        setSelectedChild('')
        setSelectedSubchild('')
      }
    }
    
    // Validate subchild belongs to child
    if (selectedSubchild && selectedChild) {
      const validSubchildren = products.filter(p => p.child === selectedChild).map(p => p.subchild)
      if (!validSubchildren.includes(selectedSubchild)) {
        setSelectedSubchild('')
      }
    }
    
    // Validate brand exists in selected categories
    if (selectedBrand) {
      let brandsSource = products
      if (selectedParent) brandsSource = brandsSource.filter(p => p.parent === selectedParent)
      if (selectedChild) brandsSource = brandsSource.filter(p => p.child === selectedChild)
      if (selectedSubchild) brandsSource = brandsSource.filter(p => p.subchild === selectedSubchild)
      const validBrands = brandsSource.map(p => p.brand)
      if (!validBrands.includes(selectedBrand)) {
        setSelectedBrand('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  useEffect(() => {
    filterProducts()
    updateURL()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, searchTerm, selectedParent, selectedChild, selectedSubchild, selectedBrand])

  const updateURL = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('q', searchTerm)
    if (selectedParent) params.set('parent', selectedParent)
    if (selectedChild) params.set('child', selectedChild)
    if (selectedSubchild) params.set('subchild', selectedSubchild)
    if (selectedBrand) params.set('brand', selectedBrand)
    
    setSearchParams(params, { replace: true })
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/php/api/products.php?limit=1000')
      const data = await res.json()
      if (data.success && data.products) {
        setProducts(data.products)
        setFilteredProducts(data.products)
      }
    } catch (err) {
      console.error('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(term) ||
        p.sku?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.paragraph?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term)
      )
    }

    // Parent category filter
    if (selectedParent) {
      filtered = filtered.filter(p => p.parent === selectedParent)
    }

    // Child category filter
    if (selectedChild) {
      filtered = filtered.filter(p => p.child === selectedChild)
    }

    // Subchild (Series) filter
    if (selectedSubchild) {
      filtered = filtered.filter(p => p.subchild === selectedSubchild)
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand === selectedBrand)
    }

    // No sorting - show products as they come from database
    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedParent('')
    setSelectedChild('')
    setSelectedSubchild('')
    setSelectedBrand('')
  }

  // Get unique values for filters (dynamically based on selections)
  const parents = Array.from(new Set(products.map(p => p.parent).filter(Boolean))).sort()
  
  const children = selectedParent 
    ? Array.from(new Set(products.filter(p => p.parent === selectedParent).map(p => p.child).filter(Boolean))).sort()
    : Array.from(new Set(products.map(p => p.child).filter(Boolean))).sort()
  
  const subchildren = selectedChild 
    ? Array.from(new Set(products.filter(p => p.child === selectedChild).map(p => p.subchild).filter(Boolean))).sort()
    : selectedParent
    ? Array.from(new Set(products.filter(p => p.parent === selectedParent).map(p => p.subchild).filter(Boolean))).sort()
    : Array.from(new Set(products.map(p => p.subchild).filter(Boolean))).sort()
  
  // Brands filtered by selected categories
  let brandsSource = products
  if (selectedParent) brandsSource = brandsSource.filter(p => p.parent === selectedParent)
  if (selectedChild) brandsSource = brandsSource.filter(p => p.child === selectedChild)
  if (selectedSubchild) brandsSource = brandsSource.filter(p => p.subchild === selectedSubchild)
  const brands = Array.from(new Set(brandsSource.map(p => p.brand).filter(Boolean))).sort()

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const hasActiveFilters = searchTerm || selectedParent || selectedChild || selectedSubchild || selectedBrand

  return (
  <section className="bg-base-100 w-full py-8">
      {/* Header */}
      <div className="products-hero text-primary-content">
        <div className="max-w-7xl mx-auto px-4 py-12 hero-content">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tüm Ürünler</h1>
          <p className="text-lg opacity-90">
            {loading ? 'Yükleniyor...' : `${filteredProducts.length} ürün bulundu`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and View Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
            <input
              type="text"
              className="input input-bordered w-full pl-10 pr-10"
              placeholder="Ürün adı, SKU, marka veya açıklama ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline md:hidden"
          >
            <Filter size={20} />
            Filtreler
            {hasActiveFilters && (
              <span className="badge badge-primary badge-sm">●</span>
            )}
          </button>

          {/* View Mode Toggle */}
          <div className="btn-group">
            <button
              onClick={() => setViewMode('grid')}
              className={`btn ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`btn ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="card bg-base-200 sticky top-4">
              <div className="card-body p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Filter size={20} />
                    Filtreler
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="btn btn-ghost btn-xs"
                    >
                      Temizle
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Parent Category Filter */}
                  {parents.length > 0 && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Ana Kategori</span>
                      </label>
                      <select
                        className="select select-bordered select-sm w-full"
                        value={selectedParent}
                        onChange={(e) => {
                          setSelectedParent(e.target.value)
                          setSelectedChild('') // Reset child when parent changes
                          setSelectedSubchild('') // Reset subchild when parent changes
                        }}
                      >
                        <option value="">Tümü</option>
                        {parents.map(parent => (
                          <option key={parent} value={parent}>{parent}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Child Category Filter */}
                  {children.length > 0 && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Alt Kategori</span>
                      </label>
                      <select
                        className="select select-bordered select-sm w-full"
                        value={selectedChild}
                        onChange={(e) => {
                          setSelectedChild(e.target.value)
                          setSelectedSubchild('') // Reset subchild when child changes
                        }}
                      >
                        <option value="">Tümü</option>
                        {children.map(child => (
                          <option key={child} value={child}>{child}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Subchild (Series) Filter */}
                  {subchildren.length > 0 && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Seri</span>
                      </label>
                      <select
                        className="select select-bordered select-sm w-full"
                        value={selectedSubchild}
                        onChange={(e) => setSelectedSubchild(e.target.value)}
                      >
                        <option value="">Tümü</option>
                        {subchildren.map(subchild => (
                          <option key={subchild} value={subchild}>{subchild}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Brand Filter */}
                  {brands.length > 0 && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Marka</span>
                      </label>
                      <select
                        className="select select-bordered select-sm w-full"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      >
                        <option value="">Tümü</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Active Filters */}
                  {hasActiveFilters && (
                    <div className="pt-4 border-t border-base-300">
                      <p className="text-sm font-semibold mb-2">Aktif Filtreler:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedParent && (
                          <div className="badge badge-primary gap-1">
                            {selectedParent}
                            <button onClick={() => setSelectedParent('')}>
                              <X size={14} />
                            </button>
                          </div>
                        )}
                        {selectedChild && (
                          <div className="badge badge-primary gap-1">
                            {selectedChild}
                            <button onClick={() => setSelectedChild('')}>
                              <X size={14} />
                            </button>
                          </div>
                        )}
                        {selectedSubchild && (
                          <div className="badge badge-primary gap-1">
                            {selectedSubchild}
                            <button onClick={() => setSelectedSubchild('')}>
                              <X size={14} />
                            </button>
                          </div>
                        )}
                        {selectedBrand && (
                          <div className="badge badge-primary gap-1">
                            {selectedBrand}
                            <button onClick={() => setSelectedBrand('')}>
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Package size={64} className="mx-auto text-base-content/20 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Ürün Bulunamadı</h3>
                <p className="text-base-content/60 mb-4">
                  {hasActiveFilters 
                    ? 'Filtrelere uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.'
                    : 'Henüz ürün eklenmemiş.'}
                </p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="btn btn-primary">
                    Filtreleri Temizle
                  </button>
                )}
              </div>
            ) : viewMode === 'grid' ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {currentProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/urun/${product.sku}`}
                      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <figure className="aspect-square bg-base-200">
                        {product.main_img ? (
                          <img
                            src={product.main_img}
                            alt={`${product.title} - ${product.brand || 'Ürün Görseli'}`}
                            title={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/400x400?text=No+Image'
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <Package size={64} className="text-base-content/20" />
                          </div>
                        )}
                      </figure>
                      <div className="card-body p-4">
                        {product.brand && (
                          <div className="badge badge-primary badge-sm mb-2">{product.brand}</div>
                        )}
                        <h3 className="card-title text-base line-clamp-2 min-h-[3rem]">
                          {product.title}
                        </h3>
                        {product.sku && (
                          <p className="text-xs text-base-content/60 font-mono">
                            SKU: {product.sku}
                          </p>
                        )}
                        {product.paragraph && (
                          <p className="text-sm text-base-content/70 line-clamp-2 mt-2">
                            {product.paragraph}
                          </p>
                        )}
                        <div className="card-actions justify-between items-center mt-4">
                          <div className="text-xs text-base-content/60">
                            {product.parent && <span>{product.parent}</span>}
                          </div>
                          <button className="btn btn-primary btn-sm">
                            Detay
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  {currentProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/urun/${product.sku}`}
                      className="card card-side bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <figure className="w-48 flex-shrink-0 bg-base-200">
                        {product.main_img ? (
                          <img
                            src={product.main_img}
                            alt={`${product.title} - ${product.brand || 'Ürün Görseli'}`}
                            title={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/400x400?text=No+Image'
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <Package size={48} className="text-base-content/20" />
                          </div>
                        )}
                      </figure>
                      <div className="card-body">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {product.brand && (
                              <div className="badge badge-primary badge-sm mb-2">{product.brand}</div>
                            )}
                            <h3 className="card-title text-lg">{product.title}</h3>
                            {product.sku && (
                              <p className="text-sm text-base-content/60 font-mono mt-1">
                                SKU: {product.sku}
                              </p>
                            )}
                          </div>
                          <button className="btn btn-primary btn-sm">
                            Detay
                          </button>
                        </div>
                        {product.paragraph && (
                          <p className="text-sm text-base-content/70 line-clamp-3 mt-2">
                            {product.paragraph}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2">
                          {product.parent && (
                            <span className="badge badge-outline badge-sm">{product.parent}</span>
                          )}
                          {product.child && (
                            <span className="badge badge-outline badge-sm">{product.child}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="join">
                  <button
                    className="join-item btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    «
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        className={`join-item btn ${pageNum === currentPage ? 'btn-active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    className="join-item btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    »
                  </button>
                </div>
              </div>
            )}

            {/* Results Info */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-6 text-sm text-base-content/60">
                {startIndex + 1} - {Math.min(endIndex, filteredProducts.length)} arası gösteriliyor
                (Toplam {filteredProducts.length} ürün)
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
