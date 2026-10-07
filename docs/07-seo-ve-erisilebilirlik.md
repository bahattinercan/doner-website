# 7 · SEO & erişilebilirlik

## 7.1 Yapılandırılmış veri (JSON-LD)

`index.html` içinde:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Tandır Döner",
  "servesCuisine": "Turkish",
  "telephone": "+905555555555",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "İstiklal Caddesi No: 12",
    "addressLocality": "Beyoğlu",
    "addressRegion": "İstanbul",
    "addressCountry": "TR"
  }
}
```

Gerçek yayına geçerken eklemeye değer:

```json
"image": "https://siteniz.com/assets/doner-photo.jpg",
"url": "https://siteniz.com",
"openingHours": ["Mo-Th 10:00-23:00", "Fr-Sa 10:00-24:00", "Su 11:00-23:00"],
"priceRange": "₺₺",
"geo": { "@type": "GeoCoordinates", "latitude": 41.03, "longitude": 29.00 }
```

Doğrulama: https://validator.schema.org/

---

## 7.2 Meta etiketleri

| Etiket                                                                  | Nerede                  | Not                                          |
| ----------------------------------------------------------------------- | ----------------------- | -------------------------------------------- |
| `<title>`                                                               | Her sayfa               | Sayfaya özel                                 |
| `meta description`                                                      | Her sayfa               | 150–160 karakter ideal                       |
| `og:title`, `og:description`, `og:type`, `og:site_name`                 | **Her sayfa** (5 sayfa) |                                              |
| `og:image` + width/height/alt                                           | **Her sayfa**           | `assets/preview.jpg` → kendi domain'ine taşı |
| `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` | **Her sayfa**           |                                              |
| `link rel="icon"`                                                       | Her sayfa               | `assets/favicon.svg`                         |

`og:url` her sayfada tanımlı (demo domain üzerinden; kendi domain'ine taşırken
`https://siteniz.com/...` şeklinde değiştir). Beş sayfanın tamamında `og:title`,
`og:image` ve `twitter:*` etiketleri mevcut — paylaşım kartları görselsiz görünmez.

---

## 7.3 Erişilebilirlik checklist'i

| Kontrol                                     | Durum                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| `lang="tr"`                                 | ✅ tüm sayfalar                                                                |
| Hamburger `aria-expanded`                   | ✅ JS güncelliyor                                                              |
| Arama inputu `type="search"` + `aria-label` | ✅                                                                             |
| Tema/sepet düğmelerinde `aria-label`        | ✅                                                                             |
| Dekoratif SVG'lerde `aria-hidden="true"`    | ✅                                                                             |
| Ürün görsellerinde `alt`                    | ✅ (ad otomatik)                                                               |
| `prefers-reduced-motion`                    | ✅ animasyonlar kapanır                                                        |
| Focus outline                               | ✅ amber outline                                                               |
| Kontrast                                    | ✅ koyu metin/açık zemin (gece modunda tersi)                                  |
| Klavye ile sepet erişimi                    | ✅ düğmeler gerçek `<button>`                                                  |
| Gizlilik uyarısı                            | ✅ `role="dialog"` + `aria-label`, tek tıkla kapatılır                         |
| Harita iframe'i                             | ✅ `title="Konum haritası"` + `referrerpolicy`                                 |
| Ürün modalı                                 | ✅ `role="dialog"`, `aria-modal`, Esc ile kapanma, kapatma düğmesine odaklanma |

---

## 7.4 Performans (Core Web Vitals'a notlar)

- **LCP:** hero fotoğrafı ~115 KB (640×960). Hero için `loading="lazy"` mantıklı değil
  (LCP adayı o); Hakkımızda'daki hikâye görseli zaten `loading="lazy"` taşıyor.
- **CLS:** scroll reveal animasyonları yükseklik değiştirmiyor; şerit sabit yükseklikte.
- **Fonts:** self-hosted (`css/fonts.css` + `assets/fonts/` içinde 4 woff2, ~254 KB) → üçüncü tarafa istek yok,
  `font-display: swap` ile fallback çalışıyor.
- **JS:** `js/content.js` + `js/site.js`, `defer`, ~960 satır.
- **Menü fotoğrafları:** 42 × ~43–64 KB ≈ 2.2 MB, 640 px progressive JPEG. Kartlar
  `loading="lazy"` yüklüyor; yine de kendi fotoğraflarınla değiştirmek LCP'yi düşürür.

Hız ölçümü:

```bash
chrome --headless=new --dump-dom index.html > /dev/null
```

Daha iyisi: PageSpeed Insights / Lighthouse.

---

## 7.5 Gizlilik & KVKK

Site statik olduğu için sunucu tarafında hiçbir ziyaret verisi toplamaz:

- **Çerez yok**, analitik/reklam scripti yok.
- `localStorage`'da tutulanlar: `tandir-cart`, `tandir-theme`, `tandir-ticker`, `tandir-consent`.
- Sipariş listesi WhatsApp'a **kullanıcının cihazından** gönderilir; site isim,
  telefon veya adres vermez.
- Üçüncü taraf: yalnızca iletişim sayfasındaki Google Maps embed'i — kendi gizlilik
  politikasına tabidir ve **gizlilik bandı onaylanmadan yüklenmez**. Yazı tipleri
  self-hosted; Google Fonts'a istek gitmiyor.

Kullanıcıya bunu anlatmak için her sayfada kapatılabilir bir **gizlilik bandı**
(`.cookie-note`) ve ayrıntılı bir **`gizlilik.html`** sayfası var. Bandı kapatmak
`tandir-consent = "ok"` yazar; geri getirmek için anahtarı sil.

Kendi işletmen için yayına alırken `gizlilik.html`'i kendi KVKK metinlerinle
genişlet (ver sorumlusu, başvuru yolları, saklama süreleri vb.).
