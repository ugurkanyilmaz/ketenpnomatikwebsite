import ProductCard from "./ProductCard";
import { featuredProducts } from "../data/products";

export default function FeaturedSection() {
  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Öne Çıkan Ürünler</h2>
          <a className="link link-primary">Tüm ürünler</a>
        </div>
        <div className="grid gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}


