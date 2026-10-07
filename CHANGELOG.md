# Değişiklik günlüğü

## v1.2.4 — dosya düzeni

- **Klasörler**: `styles.css` → `css/`, `content.js` + `site.js` → `js/`, `assets/fonts.css` →
  `css/fonts.css` (`url()` yolları `../assets/fonts/`); `docs/` içindeki geliştirme araçları
  `scripts/` ve `tests/`'e taşındı — `docs/` artık yalnızca markdown
- **CI**: `security-check.yml` yeni yolları kullanıyor (`js/*.js`, `node tests/security-tests.js`);
  `tests/security-tests.js` dosyaları `__dirname` üzerinden okuyor, CWD'ye bağımlı değil
- **package.json**: `sharp` geliştirme bağımlılığı ve `npm test` / `npm run fonts` /
  `npm run images` script'leri eklendi (`node_modules` vardı ama `package.json` yoktu)
- **.gitattributes**: satır sonu (`text=auto eol=lf`) ve binary kuralları eklendi
- Beş HTML sayfasındaki `stylesheet`/`script` referansları ve dokümanlardaki dosya yolları
  yeni düzenle eşitlendi

## v1.2.3 — dokümantasyon doğrulaması

- **Gerçek veriyle eşitleme**: README ve `docs/` içindeki sayılar güncellendi
  (5 sayfa, 42 ürün fotoğrafı, 13 şerit yazısı, ~960 satır JS / ~1950 satır CSS,
  kırılımlara 560 px eklendi), `SITE`/`MENU` için yanlış dosya atıfları
  (`site.js` → `content.js`) düzeltildi
- **Yazı tipi tutarlılığı**: fontlar self-hosted olduğu halde "Google Fonts'tan geliyor"
  diyen cümleler kaldırıldı; `gizlilik.html` içindeki kendi kendine çelişen ifade düzeltildi
- **CSP**: `vercel.json` ve `netlify.toml`'daki gereksiz `fonts.googleapis.com` /
  `fonts.gstatic.com` izinleri kaldırıldı, `_headers` ile aynı hizaya getirildi;
  `docs/08`'deki nginx örneği de temizlendi
- **CI**: `.github/workflows/security-check.yml`'deki kopuk yinelenen adlandırma
  satırı (adım adı, `run`'ı olmadan) silindi — dosya Actions'ta hatalı parse ediliyordu
- **docs/06**: `sharp` bir CLI değil; doğru Node snippet'i yazıldı, asset tablosuna
  hero fotoğrafı ve self-hosted font satırları eklendi
- **docs/07 / docs/08**: OG etiketlerinin beş sayfada da olduğu, harita `title`'ının
  eklendiği, hero'nun ~115 KB olduğu, hikâye görselinin zaten `lazy` olduğu düzeltildi;
  nginx CSP örneğinden font izinleri çıkarıldı, `_headers` dosyası anıldı
- **docs/01 / docs/09 / docs/10**: `DOMContentLoaded` listesindeki yinelenen `initModal()`
  satırı kaldırıldı, modal arıza satırları ve 560 px kırılımı eklendi, `SITE` atfı
  `content.js`'e düzeltildi
- **gizlilik.html / contact.html**: "Google Fonts üçüncü taraftır" çelişkisi giderildi,
  harita yorumundaki `site.js` atfı `content.js` oldu

### Sağlamlık & performans

- **localStorage kapıları**: `site.js`'e `lsGet()` / `lsSet()` helper'ları eklendi; tema,
  şerit ve rıza okumaları artık try/catch'siz doğrudan `localStorage`'a dokunmuyor.
  Böylece "localStorage kapalıysa site çalışmaya devam eder" iddiası gerçekten doğru.
- **Menü fotoğrafları**: 42 görsel 640 px / q72 progressive JPEG'e indirildi
  (4.75 MB → 2.22 MB, %53 azalma). Yeniden üretmek için `scripts/optimize-menu-images.js`.
- **`og:image`**: `docs/preview.jpg` → `assets/preview.jpg` taşındı; 5 sayfadaki
  `og:image` / `twitter:image` ve README bağlantıları güncellendi.

## v1.2.2 — güvenlik sertleştirme (2026-10-07)

- **HTML kaçışı**: `site.js` içine `esc()` helper'ı eklendi; sepet, menü, modal, arama
  sonucu, kategori çipleri, kayan şerit ve saat tablosu gibi tüm `innerHTML` dolguları
  artık kaçışlı yazılıyor (tırnak kırıp `onerror` enjekte etme yolu kapandı)
- **Sepet doğrulaması**: `loadOrder()` `localStorage`'tan gelen kayıtları şekil kontrolünden
  geçiriyor (`name` string, `price` sayı, `qty` 1–20 aralığına sıkıştırılıyor)
- **href filtreleri**: `safeHref()` yalnızca `http(s):`, `tel:`, `mailto:` kabul ediyor;
  WhatsApp numarası `waNumber()` ile sadece rakamlara indirgeniyor
- **CSP**: beş sayfaya da `Content-Security-Policy` meta etiketi ve `referrer` politikası eklendi
- **Harita rızası**: `contact.html`'deki Maps iframe'i artık `src` yerine `data-src` taşıyor;
  iframe yalnızca çerez uyarısı onaylandığında yükleniyor (KVKK tutarlılığı)
- **Gizlilik metni**: "çerez kullanılmaz" ifadesi üçüncü taraf harita embed'i
  (Google Maps) açıklanacak şekilde düzeltildi
- **Yayına alma**: `vercel.json` ve `netlify.toml` güvenlik header'ları; `docs/08` içine
  nginx header örneği eklendi
- **İçerik**: `docs/menu-image-prompts.json` içindeki yerel makine yolları
  `images/raw/<id>.png` biçimine çevrildi; ham görseller `.gitignore`'a alındı
- **İletişim linkleri tek kaynak**: `tel:` ve `wa.me` linkleri HTML'de hardcoded kalmıyor;
  `data-href-site="phoneHref|email|instagram"` ve `data-wa` nitelikleriyle `SITE`'ten
  besleniyor (JS çalışmazsa mevcut href düşüyor, yani no-JS bozulmuyor). `gizlilik.html`
  "Ara" linkinin metnini bozan `data-site="phoneHref"` hatası giderildi
- **CSP sertleştirme**: `img-src`'ten gereksiz `data:` kaldırıldı, `form-action 'self'` eklendi;
  Maps iframe'inden `allow="geolocation"` alındı; `Permissions-Policy: geolocation=(), camera=(), microphone=()` header'ı eklendi
- **Girdi filtreleri**: `artFor()` yalnızca geçerli görsel yollarını kabul ediyor
  (`javascript:`/`data:` reddediliyor), `fillStatic()` yalnızca `SITE`'te gerçekten tanımlı
  anahtarları okuyor (prototip erişimi kapalı), `loadOrder()` fiyatı `> 0` şartına bağladı
- **Dokümantasyon**: `docs/10-uyarlama-rehberi.md`'deki örnek kimlik
  (`instagram.com/denizpide`, `info@denizpide.com`) gerçek bir işletmeye benzemesin diye
  `ornek@example.com` olarak değiştirildi

## v1.2.1 — 2026-10-07 (metin tonu)

- **Metin tonu**: site genelindeki espri ve sohbet cümleleri kurumsal, bilgi odaklı dille
  yeniden yazıldı (slogan, tanıtım, kayan şerit, 42 ürün açıklaması, kategori notları,
  açılış saatleri notları, gizlilik metni, sepet/toast ve modal yazıları)
- **Kategori adları**: "Fırından" → "Fırın Ürünleri", "Yanında İyi Gider" → "Yan Ürünler",
  ana sayfa "Vitrinden" → "Öne Çıkan Ürünler"
- **Ürün adı**: "Yönüm Dürüm" → "Kıyım Dürüm" (görsel dosya adı değişmedi)
- **Arayüz metinleri**: "Yanına ne alırız?" → "Yan ürün önerileri", sepet boş mesajı,
  arama sonucu mesajı, adet üst sınırı uyarısı ve durum yazıları sadeleştirildi
- **Dokümantasyon**: `README.md` ve `docs/` içindeki örnek metinler yeni içerikle eşitlendi

## v1.2.0 — ürün detay modalı + metin revizyonu

- **Ürün detay modalı**: ürün kartına/adına tıklayınca `#item-modal` açılır
  (kategori, tam açıklama, etiket, fiyat, adet seçimi, sepete ekle, "yanına ne alırız?",
  telefon & WhatsApp bağlantıları). `role="dialog"`, `aria-modal`, Esc / arka plan
  tıklaması ile kapanma.
- **Sepet adedi artırma**: `−` ve `+` düğmeleri, üst sınır 20 adet (aşınca toast uyarısı)
- **Toplam satırı**: "Toplam" etiketi solda, tutar sağa hizalı
- **"Sepeti temizle" → çöp kutusu simgesi** (aynı satırda, WhatsApp düğmesinin solunda;
  sepet boşken gizlenir)
- **Modal hizaları**: adet kontrolü tek parça (sayı kutularla aynı yükseklikte, adet 1 iken
  `−` pasif), "Sepete ekle" ve aksiyon düğmeleri satır genişliğini dolduruyor (ölü boşluk
  yok), "Yanına ne alırız?" etiketi ayrı satırda, kapatma düğmesi fotoğrafta okunur koyu
  zeminli, gövde 10 px ritimli grid
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
