# 2 · İçerik yönetimi

Tüm içerik `content.js`'in başındaki iki blokta durur: `SITE` ve `MENU`.
Bir de yardımcı veri: `ART_KEYS` (illüstrasyon eşleşmeleri).

---

## 2.1 `SITE` — dükkan bilgileri

```js
const SITE = {
  name:      "Tandır Döner",
  slogan:    "Odun ateşinde, her gün taze döner.",
  intro:     "Et her sabah kendi mutfağımızda hazırlanır, lavaş günlük açılır…",
  phone:     "+90 555 555 55 55",
  phoneHref: "tel:+905555555555",
  whatsapp:  "905555555555",
  address:   "İstiklal Caddesi No: 12, Beyoğlu / İstanbul",
  mapsQuery: "İstiklal Caddesi 12 Beyoğlu İstanbul",
  instagram: "https://instagram.com/",
  email:     "ornek@example.com",
  ticker: [ … 13 yazı … ],
  hours:    [ … 7 satır … ],
};
```

| Alan                 | Kullanıldığı yer                     | Not                                        |
| -------------------- | ------------------------------------ | ------------------------------------------ |
| `name`               | Başlıklar, footer, JSON-LD           |                                            |
| `slogan`             | Hero altındaki italik satır          |                                            |
| `intro`              | Hero paragrafı                       |                                            |
| `phone`              | Görünen metin                        | `data-site="phone"`                        |
| `phoneHref`          | `tel:` linki                         | Numara değişince **iki** alanı da değiştir |
| `whatsapp`           | `wa.me/<no>` ve sipariş linki        | Boşluksuz, ülke kodlu                      |
| `address`            | Görünen adres                        |                                            |
| `mapsQuery`          | Harita iframe'i + "Yol tarifi" linki | Tek noktadan değişir                       |
| `instagram`, `email` | Footer                               |                                            |
| `ticker`             | Kayan şerit                          | Aşağıda                                    |
| `hours`              | Saat paneli + açık/kapalı rozeti     | Aşağıda                                    |

`fillStatic()` şu attribute'ları otomatik doldurur:

```html
<span data-site="phone"></span>
<span data-site="address"></span>
<a data-maps-link href="#">Yol tarifi</a>
```

---

## 2.2 `MENU` — kategoriler ve ürünler

```js
const MENU = [
  {
    category: "Dönerler",
    note: "Tüm dönerler lavaş dürüm veya porsiyon olarak gelir.",
    items: [
      { name: "Tandır Dürüm", desc: "Odun ateşinde dönen dana tandır…", price: 285, tags: ["Çok satan"] },
      { name: "Adana Dürüm",  desc: "Acılı kıyım, çift lavaş…",        price: 300, tags: ["Acılı"] },
    ],
  },
  …
];
```

| Alan       | Zorunlu | Davranış                                                     |
| ---------- | ------- | ------------------------------------------------------------ |
| `category` | ✅      | Chip'te ve `<h3>`'te görünür                                 |
| `note`     | ❌      | Başlık altına gri not                                        |
| `name`     | ✅      | Kart başlığı; arama ve illüstrasyon seçimi buna göre yapılır |
| `desc`     | ❌      | Açıklama; aramada da aranır                                  |
| `price`    | ✅      | **Sayı** olmalı; `₺` otomatik eklenir                        |
| `tags`     | ❌      | İlk etiket amber, diğerleri yeşil; vitrine alma kriteri      |
| `img`      | ❌      | Verilirse illüstrasyon yerine fotoğraf kullanılır            |

### Kategori sırası

Chip'ler `MENU` dizisinin sırasını takip eder. Yeni kategori eklemek için
`MENU`'ya yeni nesne ekle — chip otomatik çıkar.

### Vitrin (ana sayfa)

`renderPreview()` `tags`'ı olan ürünleri alır; hiç yoksa ilk ürünleri. En fazla **6** kart gösterilir.
Yani vitrine çıkmak isteyen ürünün `tags` alanı dolu olmalı.

### Arama ve filtre

`renderMenu(target, filter, category)`:

- `filter` ürün adı **veya** açıklamada küçük harf araması yapar,
- `category` `"Tümü"` ise tüm kategoriler gösterilir.
- Sonuç yoksa: `“kelime” için sonuç bulunamadı.`

---

## 2.3 Kayan şerit — `SITE.ticker`

```js
ticker: [
  "Odun ateşinde döner",
  "Cuma ve cumartesi 24:00'a kadar açığız",
  "Günlük üretim tamamlandığında satış kapanır",
];
```

- Her yazının ardına `◆` ayracı konur.
- Şerit **iki kez** basılır (marquee kesintisiz dönsün).
- Sağ üstteki **×** şeridi DOM'dan kaldırır ve `localStorage["tandir-ticker"] = "off"` yazar.
- Geri getirmek: `localStorage.removeItem("tandir-ticker")`.

Yazı sayısı arttıkça tur süresi uzar; CSS'te `marquee` 34 s (hover'da 16 s).

---

## 2.4 Açılış saatleri — `SITE.hours`

```js
hours: [
  { day: "Pazartesi", open: "10:00", close: "23:00" },
  …
  { day: "Pazar",     open: "11:00", close: "23:00" },
]
```

**Kural:** sıralama **Pazartesi → Pazar**. `isOpenNow()` şu hesabı yapar:

```js
const idx = (new Date().getDay() + 6) % 7; // Pazartesi = 0 … Pazar = 6
```

- `open ≤ şimdi < close` → açık.
- `24:00` kapanış geçerlidir (gece yarısına kadar).
- Panel:
  - sol kutu: `#today-day`, `#today-time`
  - tablo: bugünün satırı `tr.is-today`
  - rozet: `.status` → `is-open` / `is-closed`

Not satırları ("Son sipariş…", "Resmî tatiller…") sabit metindir; `index.html`'de düzenlenir.

---

## 2.5 Ürün görselleri

### Otomatik illüstrasyon (yedek)

Şu an 42 ürünün **tamamında** `img` tanımlı, dolayısıyla kartlarda fotoğraf görünüyor.
`img` yoksa ya da yolu geçersizse `artFor(item)` ürün adını küçük harfe çevirip
`ART_KEYS` listesinde arar:

```js
const ART_KEYS = [
  ["dürüm", "durum"], ["porsiyon", "porsiyon"], ["çeyrek", "porsiyon"],
  ["pide", "pide"], ["lahmacun", "lahmacun"], ["börek", "borek"],
  ["çorba", "corba"], ["salata", "salata"], ["humus", "humus"],
  ["biber", "biber"], ["patates", "patates"], ["turşu", "turshu"],
  ["pilav", "pilav"], ["lavaş", "lavas"], ["mısır", "misir"],
  ["künefe", "kunefe"], ["baklava", "baklava"], ["sütlaç", "sutlac"],
  ["ayran", "ayran"], ["şalgam", "salgam"], ["çay", "cay"], ["kahve", "kahve"],
  …
];
```

Eşleşme yoksa `porsiyon` simgesi kullanılır.

### Yeni illüstrasyon ekleme

1. `ART_SPRITE` içine sembol ekle:
   ```html
   <symbol id="art-makarna" viewBox="0 0 64 48">…</symbol>
   ```
2. `ART_KEYS`'a yaz: `["makarna", "makarna"]`

### Gerçek fotoğraf

```js
{ name: "Künefe", price: 190, img: "assets/menu/kunefe-generated.jpg" }
```

`img` varsa SVG kullanılmaz; `<img src="…" alt="Künefe" loading="lazy">` basılır.
Fotoğraflar `assets/menu/` klasöründe durmalı. Mevcut set **640 px genişlik**,
progressive JPEG, q72 (kartlar `object-fit: cover` ile kırpıyor).

> `artFor()` yalnızca `http(s)://`, `/`, `./`, `assets/` veya `images/` ile başlayan
> yolları kabul eder; `javascript:` ve `data:` gibi değerler reddedilir.

---

## 2.6 Değiştirilemeyecek şeyler (dikkat)

- `MENU` içindeki `name` değerleri sepetin kimliğidir; ürün adı değişirse **sepette eski ad** kalabilir.
- `hours` sırası bozulursa rozet yanlış hesaplanır.
- `price` string girilirse `₺` eklenmez ve toplam hatalı olur.
- `ART_SPRITE` içindeki `id`'ler `art-` ön ekiyle başlamalı.
- `img` alanı dışarıdan geliyorsa güvenli bir yol olmalı; `artFor()` şema kontrolü yapıyor.
