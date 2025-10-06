import ProductCard from '../components/ProductCard'
import { featuredProducts } from '../data/products'
import SectionHeader from '../components/SectionHeader'

export default function Urunler() {
  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeader title="Tüm Ürünler" subtitle="Tüm kategorilerdeki ürünleri keşfedin" />
        <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
