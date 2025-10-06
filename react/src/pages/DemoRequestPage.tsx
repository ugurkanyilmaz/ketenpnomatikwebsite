import { useMemo, useState } from 'react'
import { featuredProducts } from '../data/products'

export default function DemoRequestPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>('')

  const selectedProduct = useMemo(() => featuredProducts.find(p => p.id === selectedProductId), [selectedProductId])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Demo Talebi</h1>
        <p className="text-base-content/70">Demo talep etmek istediğiniz ürünü seçin ve iletişim bilgilerinizi bırakın. En kısa sürede sizinle iletişime geçelim.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-3">
          <label className="form-control w-full">
            <div className="label"><span className="label-text">Ürün seçin</span></div>
            <select className="select select-bordered" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
              <option value="">Ürün seçiniz...</option>
              {featuredProducts.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </label>

          {selectedProduct && (
            <div className="card card-bordered bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-base">Seçilen Ürün</h2>
                <div className="flex items-center gap-4">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-24 h-24 object-cover rounded" />
                  <div>
                    <p className="font-medium">{selectedProduct.name}</p>
                    <p className="text-sm text-base-content/70">ID: {selectedProduct.id}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="form-control">
              <div className="label"><span className="label-text">Ad Soyad</span></div>
              <input type="text" className="input input-bordered" placeholder="Adınız Soyadınız" required />
            </label>
            <label className="form-control">
              <div className="label"><span className="label-text">Telefon</span></div>
              <input type="tel" className="input input-bordered" placeholder="05xx xxx xx xx" required />
            </label>
          </div>
          <label className="form-control">
            <div className="label"><span className="label-text">E-posta</span></div>
            <input type="email" className="input input-bordered" placeholder="mail@ornek.com" />
          </label>
          <label className="form-control">
            <div className="label"><span className="label-text">Firma Adı</span></div>
            <input type="text" className="input input-bordered" placeholder="Firmanız" />
          </label>
          <label className="form-control">
            <div className="label"><span className="label-text">Açıklama</span></div>
            <textarea className="textarea textarea-bordered" rows={4} placeholder="Demo talebinizle ilgili notlar"></textarea>
          </label>

          <div className="w-full flex justify-center md:justify-center">
            <button type="button" className="btn btn-primary w-full md:w-auto">Talep Gönder</button>
          </div>
        </form>
      </div>
    </div>
  )
}


