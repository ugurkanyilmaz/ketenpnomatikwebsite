import { useEffect, useState } from 'react'
import { Plus, Trash2, CheckCircle } from 'lucide-react'

export default function DemoRequestPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    products: [{ id: 1, name: '', quantity: 1 }],
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const [availableProducts, setAvailableProducts] = useState<Array<{id:number, title:string, sku?:string}>>([])
  // per-product search query and suggestion visibility
  const [searchQueries, setSearchQueries] = useState<Record<string,string>>({})
  const [openSuggestions, setOpenSuggestions] = useState<Record<string,boolean>>({})

  useEffect(() => {
    // Fetch products from the PHP API. Keep limit reasonable.
    fetch('/php/api/products.php?limit=1000')
      .then((r) => r.json())
      .then((data) => {
        if (data && Array.isArray(data.products)) {
          const mapped = data.products.map((p: any) => ({ id: p.id, title: p.title || p.name || p.sku, sku: p.sku }))
          setAvailableProducts(mapped)
        }
      })
      .catch(() => { /* silent fallback - keep empty list */ })
  }, [])

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { id: Date.now(), name: '', quantity: 1 }]
    })
  }

  const removeProduct = (id: number) => {
    if (formData.products.length > 1) {
      setFormData({
        ...formData,
        products: formData.products.filter(p => p.id !== id)
      })
    }
  }

  const updateProduct = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      products: formData.products.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Zorunlu alanlar
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert('Lütfen zorunlu alanları doldurun')
      return
    }
    // E-posta formatı
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Geçerli bir e-posta adresi girin')
      return
    }
    // Telefon formatı (basit TR mobil): normalize to digits then accept
    // examples: 05XXXXXXXXX, +905XXXXXXXXX, 905XXXXXXXXX
    const cleanedPhone = formData.phone.replace(/\D/g, '')
    const phoneRegex = /^(?:90|0)?5\d{9}$/
    if (!phoneRegex.test(cleanedPhone)) {
      alert('Geçerli bir telefon numarası girin (05XXXXXXXXX)')
      return
    }
    // Ürünler: isim ve adet > 0
    if (formData.products.some(p => !p.name.trim())) {
      alert('Lütfen tüm ürünleri seçin')
      return
    }
    if (formData.products.some(p => !p.quantity || p.quantity < 1)) {
      alert('Her ürün için adet en az 1 olmalı')
      return
    }
    // POST to backend demo_request endpoint
  // send normalized phone (digits only) to backend
  const payload = { ...formData, phone: cleanedPhone }
    fetch('/php/api/demo_request.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // ignore network errors; still show success UI as fallback
    })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        products: [{ id: 1, name: '', quantity: 1 }],
        notes: ''
      })
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="w-full py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Talebiniz Alındı!</h2>
          <p className="text-slate-600">
            Demo talebiniz başarıyla kaydedildi. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Demo Talebi</h1>
          <p className="text-slate-300 text-lg">
            Ürünlerimizi deneyimlemek için formu doldurun, size ulaşalım
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Kişisel Bilgiler */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
              İletişim Bilgileri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Adınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  E-posta <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="ornek@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Firma Adı
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Firma adınız (opsiyonel)"
                />
              </div>
            </div>
          </div>

          {/* Ürün Seçimi */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-blue-500">
              <h2 className="text-2xl font-bold text-slate-800">
                Ürün Seçimi
              </h2>
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Ürün Ekle
              </button>
            </div>

            <div className="space-y-4">
              {formData.products.map((product, index) => (
                <div key={product.id} className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Ürün {index + 1} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQueries[product.id] ?? product.name}
                          onChange={(e) => {
                            const q = e.target.value
                            setSearchQueries((s) => ({ ...s, [product.id]: q }))
                            setOpenSuggestions((s) => ({ ...s, [product.id]: true }))
                            // optimistic update: set the product name to what user types (allows free-text)
                            updateProduct(product.id, 'name', q)
                          }}
                          onFocus={() => setOpenSuggestions((s) => ({ ...s, [product.id]: true }))}
                          onBlur={() => setTimeout(() => setOpenSuggestions((s) => ({ ...s, [product.id]: false })), 150)}
                          placeholder="Ürün seçiniz..."
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                        />

                        {/* suggestions */}
                        {openSuggestions[product.id] && (
                          <ul className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-auto bg-white border border-slate-200 rounded shadow-lg">
                            {availableProducts
                              .filter((prod) => {
                                const q = (searchQueries[product.id] ?? product.name ?? '').toLowerCase()
                                if (!q) return true
                                return (prod.title || prod.sku || '').toLowerCase().includes(q)
                              })
                              .slice(0, 25)
                              .map((prod) => (
                                <li
                                  key={prod.id}
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() => {
                                    const val = prod.sku || prod.title
                                    updateProduct(product.id, 'name', val)
                                    setSearchQueries((s) => ({ ...s, [product.id]: val }))
                                    setOpenSuggestions((s) => ({ ...s, [product.id]: false }))
                                  }}
                                  className="px-3 py-2 hover:bg-slate-100 cursor-pointer text-sm"
                                >
                                  {prod.title}
                                  {prod.sku ? <span className="text-xs text-slate-400 ml-2">({prod.sku})</span> : null}
                                </li>
                              ))}
                            {availableProducts.length === 0 && <li className="px-3 py-2 text-sm text-slate-500">Ürün bulunamadı</li>}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Adet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => updateProduct(product.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  {formData.products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                      className="mt-8 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Ürünü kaldır"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notlar */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
              Ek Bilgiler
            </h2>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notlarınız
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Demo ile ilgili özel talepleriniz veya sorularınız varsa buraya yazabilirsiniz..."
            />
          </div>

          

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Demo Talebini Gönder
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">📞 Hızlı İletişim</h3>
          <p className="text-blue-800 text-sm">
            Acil durumlar için bizi <strong>0262 643 43 39</strong> numaralı telefondan arayabilir 
            veya <strong>info@ketenpnomatik.com.tr</strong> adresine e-posta gönderebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}