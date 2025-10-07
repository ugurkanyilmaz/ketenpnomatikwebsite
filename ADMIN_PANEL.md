# Admin Panel Kullanım Kılavuzu

## Erişim
Admin panele şu URL'den ulaşabilirsiniz:
```
http://localhost:5173/admin
```

## Özellikler

### 📊 Dashboard
- Kategori sayısı istatistiği (veritabanından gerçek veri)
- Fotoğraf ve ürün sayısı (şimdilik 0, ileride entegre edilecek)
- Hızlı erişim butonları
- Canlı siteye dönüş linki

### 📁 Kategori Yönetimi (`/admin/kategoriler`) - TAM FONKSİYONEL
**Mevcut Özellikler:**
- ✅ Tüm kategorileri listeleme (veritabanından)
- ✅ **Gelişmiş Arama:** Başlık, parent, child, subchild alanlarında arama
- ✅ **Gelişmiş Filtreleme:** Parent ve child bazlı cascading filtre
- ✅ **Sıralama:** ID, Parent, Başlık'a göre sıralama
- ✅ **İçerik Durumu Göstergesi:** Her kategorinin hangi içeriklere sahip olduğunu gösteren badge'ler (H:Hakkında, Ö:Özellikler, R:Resim, V:Video, S:SEO)
- ✅ Yeni kategori ekleme (tüm 17 alan)
- ✅ Kategori düzenleme (tüm alanlar düzenlenebilir)
- ✅ Bulk JSON yükleme (categories_bulk_upload_json.php)
- ✅ Silme işlevi (categories_delete.php)
- ✅ **JSON Kopyala:** Kategori verisini panoya kopyalama
- ✅ **JSON İndir:** Filtrelenmiş kategorileri JSON olarak indirme
- ✅ **Zebra Tablo:** Daha okunaklı tablo görünümü

**Kategori Alanları:**
- Parent, Child, Subchild (hiyerarşi)
- Title, Title Subtext
- About, Featured, Info, Summary
- Usable Areas (virgülle ayrılmış)
- Images (virgülle ayrılmış URL'ler)
- Video URL
- SEO Meta (title, description, keywords)

**Bulk Upload:**
1. JSON dosyası seç (örnek: `/upload_folders/category_upload.json`)
2. "Yükle ve Kaydet" butonuna tıkla
3. Sonuç istatistiklerini kontrol et

### 🖼️ Kategori Fotoğrafları (`/admin/kategori-fotograflari`) - TAM FONKSİYONEL
**Mevcut Özellikler:**
- ✅ Tüm fotoğrafları listeleme (category_photos_list.php)
- ✅ **İstatistikler:** Toplam fotoğraf, parent ve kategori sayısı
- ✅ **Gelişmiş Filtreleme:** Parent ve child bazlı cascading filtre
- ✅ **Sıralama:** Display order, Parent, En yeni'ye göre sıralama
- ✅ **İki Görünüm Modu:**
  - Grid: Fotoğraf kartları ile görsel görünüm
  - Liste: Detaylı tablo görünümü
- ✅ Yeni fotoğraf ekleme (parent, child, URL, alt text, sıra)
- ✅ **Fotoğraf Düzenleme:** Tüm alanları düzenleyebilme
- ✅ Fotoğraf önizleme (modal ve liste görünümünde)
- ✅ Alt text desteği
- ✅ Display order (sıralama) yönetimi
- ✅ Silme işlevi (category_photos_delete.php)
- ✅ **JSON İndir:** Tüm fotoğrafları JSON olarak indirme
- ✅ Hata yönetimi (resim yüklenemezse placeholder)

**Kullanım:**
1. Parent kategorisi seç
2. Child kategorisi seç (parent'a göre filtrelenir)
3. Fotoğraf URL'i gir
4. Display order belirle
5. Kaydet

### 📦 Ürün Yönetimi (`/admin/urunler`)
**Mevcut Özellikler:**
- ✅ Mock ürün listesi (3 örnek)
- ✅ Seri bazlı filtreleme (APAC, ImpactX, Hiyoki)
- ✅ Ürün ekleme/düzenleme/silme (mock veri)
- ⏳ Veritabanı entegrasyonu (ürünler hazır olunca)

**Ürün Alanları:**
- Series (seçmeli)
- SKU
- Title
- Description
- Price
- Specs: Model, Torque, Air Consumption, Weight

**Not:** Bu sayfa şu anda mock veri kullanıyor. Ürünler veritabanına eklenince API'ye bağlanacak.

## ✅ Yeni Eklenen Özellikler (Tam Fonksiyonel)

### PHP Endpoints:
1. ✅ **Kategori Silme:** `categories_delete.php`
   - Method: POST/DELETE
   - Parameter: category_id (JSON body)
   - Return: success, message, deleted_category
   - Error Codes: 404 (not found), 500 (delete failed)
   
2. ✅ **Fotoğraf Listeleme:** `category_photos_list.php`
   - Method: GET
   - Parameters: parent (optional), child (optional)
   - Return: success, count, photos[]
   - Filtreleme: Parent, Child veya tüm fotoğraflar
   
3. ✅ **Fotoğraf Silme:** `category_photos_delete.php`
   - Method: POST/DELETE
   - Parameter: photo_id (JSON body)
   - Return: success, message, deleted_photo
   - Error Codes: 404 (not found), 500 (delete failed)

### Dashboard İyileştirmeleri:
- ✅ Gerçek kategori sayısı (veritabanından)
- ✅ Gerçek fotoğraf sayısı (category_photos_list.php)
- ✅ Doğru route linkleri (/admin/kategoriler, /admin/kategori-fotograflari, /admin/urunler)

## Eksik Özellikler (TODO)

### Temizlik:
- `article.tsx` dosyasındaki console.log ifadeleri kaldırılmalı

## Teknik Detaylar

### Stack:
- React 18 + TypeScript
- React Router v6 (nested routes)
- DaisyUI + Tailwind CSS
- Lucide React Icons
- PHP 8.2.12 + SQLite backend

### Dosya Yapısı:
```
react/src/pages/admin/
├── AdminLayout.tsx       # Sidebar navigasyon wrapper
├── Dashboard.tsx         # İstatistikler ve hızlı erişim
├── CategoryManagement.tsx # Kategori CRUD + bulk upload
├── CategoryPhotos.tsx    # Fotoğraf yönetimi
└── ProductManagement.tsx # Ürün CRUD (mock)
```

### API Endpoints:
**Kategori Yönetimi:**
- **GET** `/php/api/categories.php` - Kategori listesi (tier yapısı)
- **GET** `/php/api/categories_find.php?parent=X&child=Y` - Filtrelenmiş kategoriler
- **POST** `/php/api/categories_bulk_upload_json.php` - Kategori kaydetme (bulk veya single)
- **POST** `/php/api/categories_delete.php` - Kategori silme (JSON: {id})

**Fotoğraf Yönetimi:**
- **GET** `/php/api/category_photos_list.php?parent=X&child=Y` - Fotoğraf listesi (opsiyonel filtre)
- **POST** `/php/api/category_photos_bulk_upload.php` - Fotoğraf kaydetme
- **POST** `/php/api/category_photos_delete.php` - Fotoğraf silme (JSON: {id})

## Güvenlik Notları
⚠️ **Önemli:** Admin panel şu anda kimlik doğrulama (authentication) içermiyor. Production'a çıkmadan önce:
1. Login sistemi ekleyin
2. Session yönetimi ekleyin
3. CSRF koruması ekleyin
4. Admin yetkisi kontrolü ekleyin

## Sorun Giderme

### Admin panele erişemiyorum:
- Vite dev sunucusunun çalıştığından emin olun (`npm run dev`)
- URL'nin doğru olduğundan emin olun: `http://localhost:5173/admin`

### Kategoriler yüklenmiyor:
- PHP sunucusunun çalıştığından emin olun (port 9000)
- Browser console'da API hatalarını kontrol edin
- `/php/api/categories.php` endpoint'inin erişilebilir olduğundan emin olun

### Bulk upload çalışmıyor:
- JSON formatının doğru olduğundan emin olun
- Örnek dosya: `/upload_folders/category_upload.json`
- PHP sunucusunun dosya yükleme izinlerini kontrol edin

### ~~Fotoğraflar görünmüyor~~ ✅ ÇÖZÜLDÜ:
- ✅ Fotoğraf listeleme endpoint'i eklendi: `category_photos_list.php`
- ✅ Fotoğraflar şimdi tam olarak yönetilebiliyor

## Geliştirme Notları

### Yeni Özellik Eklemek İçin:
1. Yeni sayfa oluştur: `react/src/pages/admin/YeniSayfa.tsx`
2. `AdminLayout.tsx`'e menü öğesi ekle
3. `App.tsx`'e route ekle
4. Gerekli PHP endpoint'lerini oluştur

### Stil Rehberi:
- DaisyUI komponentleri kullanın (card, modal, button, badge, etc.)
- Lucide React ikonlarını tercih edin
- Tailwind utility classes kullanın
- Responsive tasarım için mobile-first yaklaşım

## Gelecek Güncellemeler
- [ ] Login/Authentication sistemi
- [ ] Article (blog yazısı) yönetimi
- [ ] Ürün veritabanı entegrasyonu
- [ ] Seri (series) yönetimi
- [ ] Toplu düzenleme özellikleri
- [ ] Dosya/resim yükleme sistemi
- [ ] Aktivite log sistemi
- [ ] Kullanıcı yönetimi
