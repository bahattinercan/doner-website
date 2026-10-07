# Değişiklik günlüğü

## v1.2.0 — ürün detay modalı + metin revizyonu

- **Ürün detay modalı**: ürün kartına/adına tıklayınca `#item-modal` açılır
  (kategori, tam açıklama, etiket, fiyat, adet seçimi, sepete ekle, "yanına ne alırız?",
  telefon & WhatsApp bağlantıları). `role="dialog"`, `aria-modal`, Esc / arka plan
  tıklaması ile kapanma.
- **Sepet adedi artırma**: `−` ve `+` düğmeleri, üst sınır 20 adet (aşınca toast uyarısı)
- **Toplam satırı**: "Toplam" etiketi solda, tutar sağa hizalı
- **"Sepeti temizle" → çöp kutusu simgesi** (aynı satırda, WhatsApp düğmesinin solunda;
  sepet boşken gizlenir)
- **Metin revizyonu**: slogan, tanıtım, kayan şerit, 42 ürün açıklaması, saat notları,
  gizlilik metni ve durum yazıları gerçekçi/esnaf tonunda yeniden yazıldı

## v1.1.0 — 2026-10-07 (halka açılma)

- **GitHub Issues / PR şablonları** (`.github/ISSUE_TEMPLATE/…`, `PULL_REQUEST_TEMPLATE.md`)
- **KVKK / gizlilik**: her sayfada kapatılabilir gizlilik bandı + `gizlilik.html` sayfası
  (`localStorage: tandir-consent`)
- **`og:url` ve sayfa bazlı Open Graph etiketleri** (4 sayfa + gizlilik)
- **Gerçek ürün fotoğrafları**: hero için odun ateşinde tandır fotoğrafı, 7 ürün
  kartı fotoğrafı — hepsi `sharp` ile 640 px, progressive JPEG (q72–74)

## v1.0.0 — 2026-10-07 (ilk açık sürüm)

### Yeni
- **4 sayfalık statik site**: ana sayfa, menü, hakkımızda, iletişim
- **İçerik verisi ayrı dosyada**: `content.js` (`SITE` + `MENU`)
- **Menü arama + kategori filtreleri** (sayfa yenilemeden)
- **Sepet**: üst barda sepet düğmesi (simge + adet rozeti), sağ altta panel,
  adet azalt, toplam, "Sepeti temizle", WhatsApp'a gönderme
- **Kalıcılık**: sepet, tema ve şerit tercihi `localStorage`'da
- **Gece / gündüz modu**: sistem tercihi + düğme ile manuel seçim
- **Açılış saatleri paneli**: "Bugün" kutusu, bugünün satırının vurgulanması, notlar
- **Kayan şerit**: `SITE.ticker`, × ile kapatılabilir
- **Ürün illüstrasyonları**: 29 flat SVG sembol, adıma göre otomatik seçim
- **Vitrin ve menü şeritleri**: yatay kaydırılabilir, `scroll-snap`
- **Animasyonlar**: scroll reveal, Ken Burns, köz parçacıkları, sayaçlar, toast,
  scroll ilerleme çubuğu, logo salınımı
- **SEO**: JSON-LD `Restaurant`, Open Graph, Twitter Card, favicon
- **Erişilebilirlik**: `aria-label`/`aria-expanded`, `prefers-reduced-motion`, focus outline
- **Dokümantasyon**: `docs/` altında 10 bölüm

### Düzeltilenler
- Buton yazılarının koyu temada görünmemesi (renk token'ları eklendi)
- Tema düğmesinin metin yerine simge ile çalışması
- Harici SVG `<use>` referanslarının Chrome'da render edilmemesi (sprite DOM'a enjekte ediliyor)

### Kaldırılan
- Üçüncü parti stok fotoğraf (lisans riski) → yerine kendi SVG illüstrasyonumuz

---

## Sürüm politikası

- **Major**: yapısal değişiklik (ör. framework eklenmesi)
- **Minor**: yeni özellik (yeni sayfa, yeni animasyon)
- **Patch**: hata düzeltmesi, yazım, dokümantasyon

Değişiklikleri `CHANGELOG.md`'e yazmak için:

```bash
git log --oneline --since="1 week ago"
```
