import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Pnömatik Aletlerin Bakım ve Onarımında Dikkat Edilmesi Gerekenler',
    excerpt: 'Pnömatik aletlerinizin ömrünü uzatmak ve verimliliğini artırmak için düzenli bakım şarttır. Bu yazıda temel bakım adımlarını ve püf noktalarını paylaşıyoruz.',
    content: `
      <h2>Pnömatik Aletlerin Düzenli Bakımının Önemi</h2>
      <p>Pnömatik el aletleri, endüstriyel üretimde yüksek verimlilik ve dayanıklılık sunar. Ancak bu performansı sürdürmek için düzenli bakım şarttır.</p>
      
      <h3>1. Yağlama</h3>
      <p>Pnömatik aletler her kullanımdan önce veya günde en az bir kez hava girişinden birkaç damla pnömatik alet yağı ile yağlanmalıdır. Bu, içerideki hareketli parçaların sürtünmesini azaltır ve ömrünü uzatır.</p>
      
      <h3>2. Hava Temizliği</h3>
      <p>Kompresörden gelen havanın temiz ve kuru olması kritik öneme sahiptir. Nem ve kir, aletin iç parçalarına zarar verebilir. Hava hattına bir filtre ve nem tutucu monte edilmelidir.</p>
      
      <h3>3. Hortum Kontrolü</h3>
      <p>Hava hortumlarında çatlak, delik veya aşınma olup olmadığı düzenli kontrol edilmelidir. Hasarlı hortumlar hem performans kaybına hem de güvenlik sorunlarına yol açabilir.</p>
      
      <h3>4. Vida ve Bağlantı Kontrolü</h3>
      <p>Aletin tüm vidaları ve bağlantı noktaları düzenli olarak kontrol edilmeli ve gerekirse sıkılmalıdır. Gevşek bağlantılar titreşime ve performans kaybına neden olur.</p>
      
      <h3>5. Periyodik Servis</h3>
      <p>Yoğun kullanımda olan aletler yılda en az bir kez yetkili servise götürülmeli ve profesyonel bakım yaptırılmalıdır.</p>
      
      <p><strong>Sonuç:</strong> Düzenli bakım, pnömatik aletlerinizin ömrünü önemli ölçüde uzatır ve iş güvenliğinizi artırır. Bu basit adımları takip ederek hem maliyetlerinizi düşürebilir hem de iş verimliliğinizi artırabilirsiniz.</p>
    `,
    author: 'Ahmet Yılmaz',
    date: '15 Eylül 2025',
    category: 'Bakım & Onarım',
    image: '/technical_service_banner.png'
  },
  {
    id: '2',
    title: 'Elektrikli ve Pnömatik Aletler: Hangisi Sizin İçin Daha Uygun?',
    excerpt: 'Elektrikli ve pnömatik aletler arasındaki farkları, avantajları ve hangi durumda hangisinin tercih edilmesi gerektiğini detaylı olarak inceliyoruz.',
    content: `
      <h2>Elektrikli ve Pnömatik Aletler Karşılaştırması</h2>
      <p>Endüstriyel uygulamalarda elektrikli ve pnömatik aletler arasında seçim yaparken birçok faktörü göz önünde bulundurmalısınız. Bu rehberde her iki alet türünün avantajlarını ve kullanım alanlarını detaylıca inceliyoruz.</p>
      
      <h3>Pnömatik Aletlerin Avantajları</h3>
      <ul>
        <li><strong>Yüksek Güç/Ağırlık Oranı:</strong> Pnömatik aletler, boyutlarına göre çok yüksek güç üretirler ve genellikle elektrikli eşdeğerlerinden daha hafiftir.</li>
        <li><strong>Dayanıklılık:</strong> Basit iç yapıları sayesinde daha az arızalanırlar ve uzun ömürlüdürler.</li>
        <li><strong>Güvenlik:</strong> Elektrik çarpması riski yoktur, ıslak veya nemli ortamlarda güvenle kullanılabilir.</li>
        <li><strong>Sürekli Kullanım:</strong> Aşırı ısınma sorunu olmadan uzun süreler boyunca kesintisiz çalışabilirler.</li>
      </ul>
      
      <h3>Elektrikli Aletlerin Avantajları</h3>
      <ul>
        <li><strong>Taşınabilirlik:</strong> Akülü modeller sayesinde her yerde kullanılabilir, hava hortumu gereksinimi yoktur.</li>
        <li><strong>Kolay Kurulum:</strong> Kompresör ve hava hatları gerektirmez, prize takıp kullanmaya başlayabilirsiniz.</li>
        <li><strong>Sessiz Çalışma:</strong> Pnömatik aletlere göre daha sessiz çalışırlar.</li>
        <li><strong>Hassas Kontrol:</strong> Hız ve tork ayarları daha hassas yapılabilir.</li>
      </ul>
      
      <h3>Hangi Durumda Hangisi?</h3>
      <p><strong>Pnömatik Aletler İçin İdeal:</strong></p>
      <ul>
        <li>Fabrika ve atölye gibi sabit üretim alanları</li>
        <li>Yoğun ve sürekli kullanım gerektiren işler</li>
        <li>Yüksek tork gerektiren uygulamalar</li>
        <li>Nemli veya ıslak ortamlar</li>
      </ul>
      
      <p><strong>Elektrikli Aletler İçin İdeal:</strong></p>
      <ul>
        <li>Mobil kullanım gerektiren işler</li>
        <li>Kompresör altyapısı olmayan alanlar</li>
        <li>Hassas işlemler ve ayar gerektiren uygulamalar</li>
        <li>Gürültü seviyesinin önemli olduğu ortamlar</li>
      </ul>
      
      <p><strong>Sonuç:</strong> Her iki alet türünün de kendine özgü avantajları vardır. İhtiyacınız, kullanım alanınız ve bütçeniz doğrultusunda en uygun seçimi yapmalısınız. Detaylı bilgi ve ürün önerileri için bizimle iletişime geçebilirsiniz.</p>
    `,
    author: 'Mehmet Demir',
    date: '8 Eylül 2025',
    category: 'Karşılaştırma',
    image: '/professional_banner.png'
  }
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SectionHeader title="Blog" subtitle="Endüstriyel aletler hakkında güncel bilgiler ve ipuçları" />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="card bg-white shadow-md hover:shadow-xl transition-shadow">
              <figure>
                <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="badge badge-primary badge-sm">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="card-title text-xl mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Yazar: {post.author}</span>
                  <Link to={`/blog/${post.id}`} className="btn btn-primary btn-sm">
                    Devamını Oku
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
