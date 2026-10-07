# 7 · SEO & erişilebilirlik

## 7.1 Yapılandırılmış veri (JSON-LD)

`index.html` içinde:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Tandır Döner",
  "servesCuisine": "Turkish",
  "telephone": "+905321234567",
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

| Etiket | Nerede | Not |
|---|---|---|
| `<title>` | Her sayfa | Sayfaya özel |
| `meta description` | Her sayfa | 150–160 karakter ideal |
| `og:title`, `og:description`, `og:type`, `og:site_name` | `index.html` | |
| `og:image` + width/height/alt | `index.html` | `docs/preview.jpg` → domain'e taşı |
| `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` | `index.html` | |
| `link rel="icon"` | Her sayfa | `assets/favicon.svg` |

`og:url` her sayfada tanımlı (demo domain üzerinden; kendi domain'ine taşırken
`https://siteniz.com/...` şeklinde değiştir).

**Öneri:** `menu.html`, `about.html`, `contact.html`'de de en az `og:title` +
`og:image` bulunmalı; paylaşılınca görselsiz görünmesinler.

---

## 7.3 Erişilebilirlik checklist'i

| Kontrol | Durum |
|---|---|
| `lang="tr"` | ✅ tüm sayfalar |
| Hamburger `aria-expanded` | ✅ JS güncelliyor |
| Arama inputu `type="search"` + `aria-label` | ✅ |
| Tema/sepet düğmelerinde `aria-label` | ✅ |
| Dekoratif SVG'lerde `aria-hidden="true"` | ✅ |
| Ürün görsellerinde `alt` | ✅ (ad otomatik) |
| `prefers-reduced-motion` | ✅ animasyonlar kapanır |
| Focus outline | ✅ amber outline |
| Kontrast | ✅ koyu metin/açık zemin (gece modunda tersi) |
| Klavye ile sepet erişimi | ✅ düğmeler gerçek `<button>` |
| Gizlilik uyarısı | ✅ `role="dialog"` + `aria-label`, tek tıkla kapatılır |
| Harita iframe'i | `title` attribute'u eklenmeli (yapılacak) |

---

## 7.4 Performans (Core Web Vitals'a notlar)

- **LCP:** hero fotoğrafı 172 KB. `loading="lazy"` hero için mantıklı değil (LCP),
  ama hikâye görseli `loading="lazy"` alabilir.
- **CLS:** scroll reveal animasyonları yükseklik değiştirmiyor; şerit sabit yükseklikte.
- **Fonts:** `preconnect` + tek CSS isteği. İnternet yoksa fallback çalışıyor.
- **JS:** tek dosya, `defer`, ~810 satır.

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
- Üçüncü taraflar: Google Fonts (yazı tipi) ve iletişim sayfasındaki Google Maps
  embed'i — kendi gizlilik politikalarına tabidir.

Kullanıcıya bunu anlatmak için her sayfada kapatılabilir bir **gizlilik bandı**
(`.cookie-note`) ve ayrıntılı bir **`gizlilik.html`** sayfası var. Bandı kapatmak
`tandir-consent = "ok"` yazar; geri getirmek için anahtarı sil.

Kendi işletmen için yayına alırken `gizlilik.html`'i kendi KVKK metinlerinle
genişlet (ver sorumlusu, başvuru yolları, saklama süreleri vb.).
