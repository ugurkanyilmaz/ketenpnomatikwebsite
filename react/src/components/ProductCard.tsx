import type { Product } from "../data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { name, image, price, rating, badge } = product;
  return (
    <div className="card card-compact bg-base-100 border border-base-200 rounded-box overflow-hidden shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md group">
      <figure className="aspect-square overflow-hidden bg-base-200">
        <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      </figure>
      <div className="card-body gap-2">
        <div className="flex items-start justify-between">
          <h3 className="card-title text-base leading-snug">{name}</h3>
          {badge && <div className="badge badge-secondary badge-sm">{badge}</div>}
        </div>
        <div className="flex items-center gap-1 text-warning">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${i < Math.round(rating) ? '' : 'opacity-20'}`}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-lg font-bold">{price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
          <button className="btn btn-primary btn-sm">Sepete Ekle</button>
        </div>
      </div>
    </div>
  );
}


