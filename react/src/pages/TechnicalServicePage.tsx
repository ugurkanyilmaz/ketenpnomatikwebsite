import { useEffect } from 'react'
import { applyPageSEO } from '../utils/other_seo'

export default function TechnicalServicePage() {
  useEffect(() => {
    applyPageSEO('technical_service')
  }, [])
  return (
  <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Hero Section - fullscreen */}
      <header
        className="w-full h-[60vh] md:h-[70vh] relative bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('/technical_service_banner.png')" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">Keten Teknik Servis | Havalı- Elektrikli Aletler Tamiri</h1>
      </header>

          {/* Main Content */}
          <main className="w-full max-w-7xl mx-auto px-6 py-12">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold">Keten Teknik Servis | Havalı- Elektrikli Aletler Tamiri</h1>
              <p className="text-neutral-600 mt-2">Her markadan Tüm Havalı - Elektrikli aletler için yetkili teknik servis, bakım ve orijinal yedek parça desteği.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2 space-y-6">
                <h2 className="text-2xl font-semibold">Hizmetlerimiz</h2>
                <ul className="list-disc list-inside text-neutral-700 space-y-2">
                  <li>Periyodik bakım ve kontrol</li>
                  <li>Arıza tespiti ve onarım</li>
                  <li>Orijinal yedek parça temini</li>
                  <li>Garanti içi / garanti dışı servis işlemleri</li>
                  <li>Montaj, eğitim ve saha desteği</li>
                  <li>Yerinde tork ölçüm ve kalibrasyon hizmeti</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6">Nasıl gönderirsiniz?</h3>
                <p className="text-neutral-700">Ürünü kargo ile servise gönderebilir veya yetkili servise bırakabilirsiniz. Lütfen ürün ile birlikte fatura/servis formu ekleyiniz. Daha hızlı işleme almak için önceden <a href="/iletisim" className="text-brand-orange underline">iletişime</a> geçerek kayıt oluşturun.</p>

                <h3 className="text-xl font-semibold mt-6">Servis Ücreti & Süre</h3>
                <p className="text-neutral-700">Arıza tespitinden sonra onarım maliyeti ve süre bilgisi tarafınıza iletilir. Onay vermeniz halinde işlem başlatılır.</p>
              </div>

              <aside className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <h4 className="text-lg font-semibold">İletişim & Adres</h4>
                <p className="text-neutral-700 mt-2">Keten Teknik Servis Merkezi</p>
                <address className="not-italic text-neutral-700 mt-2">Yenikent, Mehmet Akif Ersoy Cad. No:52<br />41400 Gebze/Kocaeli</address>

                <div className="mt-4">
                  <a href="tel:+905414526058" className="block font-semibold text-brand-orange">+90 (541) 452 60 58</a>
                  <a href="tel:+902626434339" className="block font-semibold text-brand-orange mt-1">+90 (262) 643 43 39 <span className="text-[11px] text-neutral-600">(PBX)</span></a>
                  <a href="mailto:info@ketenpnomatik.com.tr" className="block mt-1 text-neutral-700">info@ketenpnomatik.com.tr</a>
                </div>

                <div className="mt-6">
                  <h5 className="font-semibold">Çalışma Saatleri</h5>
                  <p className="text-neutral-700">Hafta içi: 08:00 - 18:00<br />Cumartesi: 08:00 - 13:00</p>
                </div>
              </aside>
            </section>
          </main>
    </div>
  );
}


