import { Link, useParams } from 'react-router-dom'

export default function ProductDetails() {
  const { productId } = useParams()

  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="breadcrumbs text-sm py-4"><ul><li><Link to="/">Ana sayfa</Link></li><li><Link to="/kategoriler">Kategoriler</Link></li><li>Ürün</li></ul></div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-box border border-base-200 aspect-video bg-base-200" />
          <div>
            <h1 className="text-3xl font-bold">Ürün: {productId}</h1>
            <p className="mt-2 text-base-content/70">Bu sayfada ürün görselleri, açıklaması, teknik özellikler ve sepete ekle butonları yer alacak.</p>
            <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3">
              <div className="w-full md:w-auto">
                <button className="btn btn-primary">Sepete Ekle</button>
              </div>

              {/* Demo request button centered */}
              <div className="w-full md:w-auto flex justify-center md:justify-center">
                <button className="btn btn-outline">Teklif İste</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
