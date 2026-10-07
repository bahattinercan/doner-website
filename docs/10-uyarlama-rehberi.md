# 10 · Uyarlama rehberi

Bu siteyi başka bir dükkana (kahvaltıcı, pideci, tatlıcı…) uyarlamak için adım adım.

---

## Adım 1 — Metinleri değiştir

`site.js` → `SITE`:

```js
const SITE = {
  name:      "Deniz Pide",
  slogan:    "Odun fırınında, ince hamur.",
  intro:     "Her akşam taze açılan hamur…",
  phone:     "+90 312 555 55 55",
  phoneHref: "tel:+903125555555",
  whatsapp:  "903125555555",
  address:   "Cumhuriyet Cd. No: 4, Karşıyaka / İzmir",
  mapsQuery: "Cumhuriyet Caddesi 4 Karşıyaka İzmir",
  instagram: "https://instagram.com/",
  email:     "ornek@example.com",
  ticker: ["Hamur her sabah açılır", "Fırın 18:00'de kapanır"],
  hours: [ /* 7 satır */ ],
};
```

Ayrıca `<title>` ve üst bar logo metni:

```html
<title>Deniz Pide — Odun Fırınında Pide</title>
<span class="logo-word">Deniz <em>Pide</em></span>
```

---

## Adım 2 — Kategorileri ve ürünleri değiştir

```js
const MENU = [
  { category: "Pideler", note: "İçine istediğiniz malzemeyi seçebilirsiniz.", items: [ … ] },
  { category: "Çorbalar", items: [ … ] },
];
```

İpucu:
- Vitrine çıkmak isteyen ürüne `tags: ["Çok satan"]` ver.
- Yeni kategori = yeni chip, otomatik çıkar.

---

## Adım 3 — Görseller

| Ne | Nasıl |
|---|---|
| Logo | `assets/logo.svg`'yi değiştir (64×64 viewBox önerilir) |
| Favicon | `assets/favicon.svg`'yi değiştir |
| Hero fotoğrafı | `assets/doner-photo.jpg` üzerine yaz (≥640 px) |
| Ürün fotoğrafları | `assets/menu/*-generated.jpg` + ürüne `img: "assets/menu/x-generated.jpg"` |
| İllüstrasyonlar | `ART_SPRITE`'a yeni `<symbol>` ekle, `ART_KEYS`'a yaz |

---

## Adım 4 — Renkler

`styles.css` → `:root`:

```css
:root {
  --ink:       #101418;
  --cream:     #f4f6f8;
  --paper:     #ffffff;
  --amber:     #d9822b;      /* marka rengin */
  --amber-deep:#b4661f;
  --olive:     #3f6b52;
}
html[data-theme="dark"] { /* koyu varyantlar */ }
```

Marka rengini değiştirmek **butonlar, chip'ler, vurgular, rozetler** dahil her yere
otomatik yansır.

---

## Adım 5 — Saatler ve notlar

`index.html` içindeki not satırlarını değiştir:

```html
<ul class="hours-notes">
  <li>Son sipariş 22:30</li>
  <li>Resmî tatillerde kapalıyız</li>
</ul>
```

---

## Adım 6 — SEO

- Her sayfanın `<title>` ve `meta description`'ı
- JSON-LD: `@type` gerekirse `Bakery` / `CafeOrCoffeeShop` yap
- `og:image` → kendi ekran görüntün veya ürün fotoğrafı

---

## Adım 7 — Test

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Kontrol listesi:
- [ ] Menüde tüm ürünler görünüyor
- [ ] Sepete ekle → WhatsApp mesajı doğru
- [ ] Gece/gündüz düğmesi çalışıyor
- [ ] Mobilde (500 px) üst bar taşmıyor
- [ ] Harita doğru adresi gösteriyor

---

## Ek özellik fikirleri

| Özellik | Nasıl |
|---|---|
| QR menü | Masaya basılı QR → `menu.html` |
| Gerçek galeri | `about.html`'e `<img>` grid'i |
| Fiyat güncelleme | `MENU`'yu bir JSON dosyasından `fetch` et |
| Çoklu şube | `SITE.branches` dizisi + harita pin'leri |
| Çerez bildirimi | Küçük bir `.cookie-banner` + kabul butonu |
