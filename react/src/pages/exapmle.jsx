import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ brand, title, description, seriesCount, gradient, icon }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-64 overflow-hidden">
      {/* Sol taraf - Görsel Alan */}
      <div className={`w-2/5 ${gradient} flex items-center justify-center p-8 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="text-7xl z-10">{icon}</div>
      </div>
      
      {/* Sağ taraf - İçerik */}
      <div className="card-body w-3/5 justify-center p-6">
        <div className="badge badge-primary badge-outline mb-2">{brand}</div>
        <h2 className="card-title text-xl font-bold leading-tight">{title}</h2>
        <p className="text-base-content/70 text-sm line-clamp-2">{description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <div className="badge badge-lg badge-ghost">{seriesCount} Seri</div>
          <button className="btn btn-primary btn-sm gap-2 group">
            Detaylar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroBanner = ({ title, description, image }) => {
  return (
    <div className="hero min-h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary via-secondary to-accent relative">
      <div className="hero-overlay bg-opacity-20"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
        }}></div>
      </div>
      <div className="hero-content text-center text-neutral-content z-10">
        <div className="max-w-3xl">
          <div className="mb-6 text-8xl">{image}</div>
          <h1 className="mb-5 text-6xl font-extrabold drop-shadow-lg">{title}</h1>
          <p className="mb-8 text-xl opacity-95 drop-shadow-md leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const TechnicalSpecs = () => {
  return (
    <div className="bg-base-200 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">Önerilen Boyutlar</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-primary">Yatay Kart Boyutları</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-l-4 border-primary pl-4 py-2">
                <span className="font-semibold">Genişlik:</span>
                <span>380-420px</span>
              </li>
              <li className="flex justify-between border-l-4 border-primary pl-4 py-2">
                <span className="font-semibold">Yükseklik:</span>
                <span>240-280px (h-64 ~ 256px)</span>
              </li>
              <li className="flex justify-between border-l-4 border-primary pl-4 py-2">
                <span className="font-semibold">Aspect Ratio:</span>
                <span>3:2 veya 16:10</span>
              </li>
              <li className="flex justify-between border-l-4 border-primary pl-4 py-2">
                <span className="font-semibold">Tailwind Class:</span>
                <span className="badge badge-accent">h-64</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-secondary">Hero Banner Boyutları</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-l-4 border-secondary pl-4 py-2">
                <span className="font-semibold">Genişlik:</span>
                <span>1200-1400px (full width)</span>
              </li>
              <li className="flex justify-between border-l-4 border-secondary pl-4 py-2">
                <span className="font-semibold">Yükseklik:</span>
                <span>500-600px</span>
              </li>
              <li className="flex justify-between border-l-4 border-secondary pl-4 py-2">
                <span className="font-semibold">Aspect Ratio:</span>
                <span>21:9 (sinematik)</span>
              </li>
              <li className="flex justify-between border-l-4 border-secondary pl-4 py-2">
                <span className="font-semibold">Tailwind Class:</span>
                <span className="badge badge-accent">min-h-[550px]</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const products = [
    {
      brand: 'KOLVER',
      title: 'Dijital Ve Mekanik Tork Ölçüm Aletleri',
      description: 'Yüksek hassasiyet ve dayanıklılık sunan profesyonel tork ölçüm sistemleri',
      seriesCount: 11,
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
      icon: '🔧'
    },
    {
      brand: 'APAD',
      title: 'Havalı Montaj Aletleri',
      description: 'Endüstriyel montaj işlemleri için güçlü ve verimli havalı takım serisi',
      seriesCount: 32,
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
      icon: '⚡'
    },
    {
      brand: 'KOLVER',
      title: 'Kolver Elektrikli Torklular',
      description: 'Hassas tork kontrolü ve ergonomik tasarımıyla üstün performans',
      seriesCount: 9,
      gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      icon: '🔌'
    },
    {
      brand: 'HIYOKI',
      title: 'Akülü Montaj Aletleri',
      description: 'Kablosuz özgürlük ve güçlü performansı bir arada sunan çözümler',
      seriesCount: 13,
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      icon: '🔋'
    },
    {
      brand: 'KOLVER',
      title: 'Kolver Elektrikli Tornavida',
      description: 'Hassas montaj işlemleri için mükemmel tork kontrolü sağlayan sistemler',
      seriesCount: 5,
      gradient: 'bg-gradient-to-br from-orange-500 to-amber-600',
      icon: '🛠️'
    },
    {
      brand: 'BETA UTENSILI',
      title: 'Delta Registon Kontrolü Sıkıcılar',
      description: 'Profesyonel sıkma işlemleri için yüksek performanslı delta kontrol sistemleri',
      seriesCount: 8,
      gradient: 'bg-gradient-to-br from-indigo-500 to-violet-600',
      icon: '⚙️'
    },
    {
      brand: 'HIYOKI',
      title: 'Wireless Dijital Tork Ölçüm Cihazları',
      description: 'Kablosuz teknoloji ile hassas ölçüm ve veri aktarımı imkanı',
      seriesCount: 4,
      gradient: 'bg-gradient-to-br from-blue-500 to-sky-600',
      icon: '📡'
    },
    {
      brand: 'HAVANO',
      title: 'Vida Sunucular',
      description: 'Otomatik vida besleme sistemleri ile montaj verimliliğini artırın',
      seriesCount: 3,
      gradient: 'bg-gradient-to-br from-slate-600 to-gray-700',
      icon: '📦'
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Endüstriyel Ürün Kataloğu</h1>
          <p className="text-lg text-base-content/70">Modern yatay kart tasarımı ve hero banner örneği</p>
        </div>

        {/* Ürün Kartları */}
        <div className="grid lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* Hero Banner Örneği */}
        <HeroBanner 
          title="HY-TM Serisi Dijital Torkmetre"
          description="HY-TM Serisi Dijital Torkmetre, yüksek hassasiyet ve dayanıklılık sunar. Kullanıcı dostu tasarımıyla endüstriyel tork ölçüm aletleri arasında öne çıkar."
          image="🔧"
        />

        {/* Teknik Özellikler */}
        <TechnicalSpecs />

        {/* Uygulama Notları */}
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h3 className="font-bold">Kullanım Notları</h3>
            <div className="text-sm">
              <p>• Kartlar responsive tasarımdır: mobilde tek sütun, tablette ve üstünde iki sütun</p>
              <p>• Hero banner için gerçek ürün görselleri kullanırken boyut oranlarını koruyun</p>
              <p>• Kartlardaki gradientler DaisyUI tema renklerine uyumlu olacak şekilde ayarlanabilir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}