type Category = {
  title: string;
  image: string;
};

const categories: Category[] = [
  {
    title: "Hava Kompresörleri",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Darbeli Somun Sökme",
    image: "https://images.unsplash.com/photo-1598549593824-40e60bc82c68?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Hava Hortumları",
    image: "https://images.unsplash.com/photo-1607920591413-0b2eb7bc01db?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Bağlantı Elemanları",
    image: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pnömatik Silindirler",
    image: "https://images.unsplash.com/photo-1596625820723-3b1088187d1b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Aksesuarlar",
    image: "https://images.unsplash.com/photo-1600428835000-c7a71f443791?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CategoryGrid() {
  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Kategoriler</h2>
          <a href="/kategoriler" className="btn btn-primary btn-sm">Tümünü gör</a>
        </div>
        <div className="grid gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <a key={c.title} className="group block rounded-box overflow-hidden ring-1 ring-base-200 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-base-300">
              {/* Image wrapper enforcing 2:1 aspect ratio (300x150) */}
              <div className="overflow-hidden rounded-t-box" style={{ position: 'relative', width: '100%', paddingTop: '50%' }}>
                <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="p-3">
                <h3 className="text-lg font-semibold">{c.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


