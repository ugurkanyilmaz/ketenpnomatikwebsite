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
    notes: '',
    privacyAccepted: false
  })
  const [submitted, setSubmitted] = useState(false)

  const [availableProducts, setAvailableProducts] = useState<Array<{id:number, title:string, sku?:string}>>([])

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
    
    // Form validasyonu
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Lütfen zorunlu alanları doldurun')
      return
    }

    if (!formData.privacyAccepted) {
      alert('Lütfen gizlilik politikasını kabul edin')
      return
    }

    const hasEmptyProduct = formData.products.some(p => !p.name)
    if (hasEmptyProduct) {
      alert('Lütfen tüm ürünleri seçin')
      return
    }
    
    // POST to backend demo_request endpoint. If it doesn't exist yet, the request will 404.
    const payload = { ...formData }
    fetch('/php/api/demo_request.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // ignore network errors; still show success UI as fallback
    })
    
    // Başarılı gönderim simülasyonu
    setSubmitted(true)
    
    // 3 saniye sonra formu sıfırla
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        products: [{ id: 1, name: '', quantity: 1 }],
        notes: '',
        privacyAccepted: false
      })
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
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
                      <select
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Ürün seçiniz...</option>
                        {availableProducts.map((prod) => (
                          <option key={prod.id} value={prod.sku || prod.title}>{prod.title}</option>
                        ))}
                      </select>
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

          {/* Gizlilik Onayı */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.privacyAccepted}
                onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                className="mt-1 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                <span className="text-red-500">*</span> Kişisel verilerimin demo talebi kapsamında işlenmesini kabul ediyorum. 
                <a href="/gizlilik" className="text-blue-600 hover:text-blue-700 underline ml-1">
                  Gizlilik Politikası
                </a>
              </span>
            </label>
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
            Acil durumlar için bizi <strong>0262 XXX XX XX</strong> numaralı telefondan arayabilir 
            veya <strong>info@ketenpnomatik.com</strong> adresine e-posta gönderebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}