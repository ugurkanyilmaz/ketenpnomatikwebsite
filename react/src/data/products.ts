export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
};

export const featuredProducts: Product[] = [
  {
    id: "impact-1",
    name: '1/2" Darbeli Somun Sökme - 800Nm',
    price: 3799,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1621340776314-97718d6b977b?q=80&w=1200&auto=format&fit=crop",
    badge: "Yeni",
  },
  {
    id: "compressor-1",
    name: "50L Sessiz Hava Kompresörü",
    price: 12499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1625566412851-7ebae17f8e7b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "hose-1",
    name: "10m Takviyeli Hava Hortumu",
    price: 549,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1607920591413-0b2eb7bc01db?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "fittings-1",
    name: "Hızlı Bağlantı Seti (10 Parça)",
    price: 329,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1560179406-1c7f943b5096?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cylinder-1",
    name: "Pnömatik Silindir Ø32x100",
    price: 1799,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1596625820723-3b1088187d1b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "accessory-1",
    name: "Hava Tabancası - Ayarlı",
    price: 229,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1600428835000-c7a71f443791?q=80&w=1200&auto=format&fit=crop",
  },
];


