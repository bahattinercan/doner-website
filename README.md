# 🌗 Tandır Döner — Mahalle Dönercisi Websitesi

[![HTML5 + CSS3 + JS](https://img.shields.io/badge/HTML5%20%2B%20CSS3%20%2B%20JS-14110d?style=flat-square)](#özellikler)
![bağımlılık: 0](https://img.shields.io/badge/ba%C4%9F%C4%B1ml%C4%B1l%C4%B1k-0-brightgreen?style=flat-square)
![build adımı: yok](https://img.shields.io/badge/build%20ad%C4%B1m%C4%B1-yok-brightgreen?style=flat-square)
[![gece modu](https://img.shields.io/badge/gece%20modu-var-e9b255?style=flat-square)](#tema-gece--gündüz)
[![mobil öncelikli](https://img.shields.io/badge/mobil%20%C3%B6ncelikli-responsive-e9b255?style=flat-square)](#tasarım-sistemi)
[![sipariş: WhatsApp](https://img.shields.io/badge/sipari%C5%9F-WhatsApp-e9b255?style=flat-square)](#sepet--sipariş-akışı)

Mahalle dönercisi için **sıfır bağımlılıklı, build adımı olmayan** tanıtım + menü sitesi.
Dosyaları tarayıcıya sür, çalışır. Ürün, fiyat, saat ve tema değişikliği için
programlama bilmesine gerek yok — her şey `site.js` içindeki veri bloklarında.

![Site önizleme](docs/preview.jpg)

---

## İçindekiler

- [Özellikler](#özellikler)
- [Detaylı dokümantasyon](#detaylı-dokümantasyon)
- [Proje yapısı](#proje-yapısı)
- [Nasıl çalıştırılır](#nasıl-çalıştırılır)
- [İçerik yönetimi](#içerik-yönetimi)
- [Sepet & sipariş akışı](#sepet--sipariş-akışı)
- [Tema (gece / gündüz)](#tema-gece--gündüz)
- [Tasarım sistemi](#tasarım-sistemi)
- [Animasyonlar](#animasyonlar)
- [Görseller](#görseller)
- [SEO & erişilebilirlik](#seo--erişilebilirlik)
- [localStorage anahtarları](#localstorage-anahtarları)
- [Yayına alma](#yayına-alma)
- [Kendi dükkanına uyarlama checklist'i](#kendi-dükkanına-uyarlama-checklisti)
- [Sık sorulanlar / sorun giderme](#sık-sorulanlar--sorun-giderme)
- [Yol haritası](#yol-haritası)
- [Katkı & commit kuralları](#katkı--commit-kuralları)
- [Lisans](#lisans)

---

## Detaylı dokümantasyon

Bu README özet düzeyindedir. Sistemin nasıl çalıştığı, nerelere dokunabileceğin ve
nelere dikkat etmen gerektiği **`docs/`** klasörinde anlatılıyor:

| Doküman | Konu |
|---|---|
| [docs/README.md](docs/README.md) | Dokümantasyon indeksi + hızlı erişim tablosu |
| [01 · Mimari](docs/01-mimari.md) | Dosya rolleri, sayfa iskeleti, `site.js` akışı, `data-*` sözleşmesi |
| [02 · İçerik yönetimi](docs/02-icerik-yonetimi.md) | `SITE`, `MENU`, şerit, saatler, görsel seçimi |
| [03 · Sepet & sipariş](docs/03-sepet-ve-siparis.md) | Sepet modeli, kalıcılık, WhatsApp mesajı, kenar durumlar |
| [04 · Tema](docs/04-tema.md) | Gece/gündüz çözümleme sırası, token override'ları |
| [05 · Tasarım sistemi](docs/05-tasarim-sistemi.md) | Renk tokenları, tipografi, bileşen envanteri, animasyonlar |
| [06 · Görseller](docs/06-gorseller.md) | SVG sprite, logo/favicon, fotoğraf optimizasyonu, lisans |
| [07 · SEO & erişilebilirlik](docs/07-seo-ve-erisilebilirlik.md) | JSON-LD, meta, OG, a11y checklist'i |
| [08 · Yayına alma](docs/08-yayina-alma.md) | Vercel/Netlify/Cloudflare/Pages, domain, cache |
| [09 · Sorun giderme](docs/09-sorun-giderme.md) | Belirti → neden → çözüm, debug snippet'leri |
| [10 · Uyarlama rehberi](docs/10-uyarlama-rehberi.md) | Siteyi başka bir dükkana çevirme adımları |

---

## Özellikler

| Özellik                    | Açıklama                                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **4 sayfa**                | Ana sayfa, Menü, Hakkımızda, İletişim                                                          |
| **Menü arama**             | Ürün adı + açıklamada anlık filtre (sayfa yenilemeden), kategori chip'leri                     |
| **Yatay menü şeritleri**   | Vitrin ve her kategori tek satırda, `scroll-snap` ile yana kaydırılabilir                      |
| **Ürün illüstrasyonları**  | Her kartta düz (flat) SVG çizim — 29 sembol, adıma göre otomatik seçilir                       |
| **Sipariş sepeti**         | Üst barda sepet düğmesi (simge + adet rozeti), sağ altta panel, adet azalt, toplam, temizle    |
| **Kalıcı sepet**           | Sepet `localStorage`'da durur; sayfa yenilense de, sayfalar arası geçişte de korunur           |
| **WhatsApp sipariş**       | Sepeti tek tıkla `wa.me` üzerinden hazır mesaj olarak gönderir + sağ altta WhatsApp FAB        |
| **Açık / kapalı rozeti**   | Saatlerden otomatik hesaplanır, yeşil/kırmızı nokta ile gösterilir                             |
| **Gece modu**              | Üst bardaki ay/güneş düğmesi; tercih kaydedilir, seçilmezse sistem ayarı esas alınır           |
| **Açılış saatleri paneli** | "Bugün" kutusu, bugünün satırının vurgulanması, notlar, yol tarifi butonu                      |
| **Kayan şerit**            | `SITE.ticker` yazıları; × ile kapatılabilir, tercihi kalıcı                                    |
| **İstatistik sayaçları**   | Görünürken 0'dan sayan rakamlar (`data-count`)                                                 |
| **Mobil uyumlu**           | 900 / 860 / 640 px kırılımları, hamburger menü, tek kolon hero                                 |
| **SEO**                    | Sayfa başlıkları, meta description, `schema.org/Restaurant` JSON-LD, Open Graph + Twitter Card |
| **Erişilebilirlik**        | `aria-label`, `aria-expanded`, `prefers-reduced-motion`, focus outline, `color-scheme`         |
| **Türkçe para formatı**    | `285` yaz, `285 ₺` olarak çıkar (`toLocaleString("tr-TR")`)                                    |
| **Kısa URL dostu**         | Build yok, framework yok → CDN'de ~40 KB HTML/CSS/JS + SVG                                     |

---

## Proje yapısı

```
doner-website/
├── index.html          # Hero, "neden buraya geliyorsun", vitrin, açılış saatleri
├── menu.html           # Tüm menü + arama + kategori chip'leri + sepet
├── about.html          # Hikâye, üretim tarzı
├── contact.html        # Adres, telefon, WhatsApp, harita iframe, saatler
├── styles.css          # Tek tasarım dosyası (tokenlar :root içinde, koyu tema override'ı altta)
├── site.js             # TÜM İÇERİK VERİSİ: SITE, MENU, ART_SPRITE + sepet/tema/render mantığı
├── assets/
│   ├── logo.svg           # Üst bar logosu: tandır + şiş + köz (64×64 viewBox)
│   ├── favicon.svg        # Sekme simgesi: koyu rozet içinde aynı işaret
│   ├── doner-photo.jpg    # Hero + hikâye fotoğrafı (640×1137, ~172 KB)
│   └── doner.svg          # Eski SVG illüstrasyon (yedek, kullanımda değil)
├── docs/
│   ├── README.md               # Dokümantasyon ana sayfası (indeks)
│   ├── 01-mimari.md            # Dosyaların rolü, sayfa iskeleti, site.js akışı
│   ├── 02-icerik-yonetimi.md   # SITE, MENU, ticker, hours, illüstrasyonlar
│   ├── 03-sepet-ve-siparis.md  # Sepet modeli, kalıcılık, WhatsApp
│   ├── 04-tema.md              # Gece/gündüz çözümleme, token override'ları
│   ├── 05-tasarim-sistemi.md   # Tokenlar, tipografi, bileşenler, animasyonlar
│   ├── 06-gorseller.md         # SVG sprite, logo, fotoğraf optimizasyonu
│   ├── 07-seo-ve-erisilebilirlik.md
│   ├── 08-yayina-alma.md       # Deploy, domain, cache
│   ├── 09-sorun-giderme.md     # Belirti → neden → çözüm
│   ├── 10-uyarlama-rehberi.md   # Başka dükkana uyarlama adımları
│   └── preview.jpg             # README ekran görüntüsü (1400×900)
├── screenshots/           # Yerel test ekran görüntüleri (gitignore'da)
├── README.md
└── .gitignore
```

> **Kural:** İçerik `site.js`'te, tasarım `styles.css`'te, iskelet `*.html`'de.
> Ürün / fiyat / saat / şerit değiştirmek için sadece `site.js`'e dokunman yeterli.

---

## Nasıl çalıştırılır

Build yok, paket yok. İstediğinden birini seç:

```bash
# 1) Yerel sunucu (önerilen)
python3 -m http.server 8000      # http://localhost:8000

# 2) Node varsa
npx serve .

# 3) En basit: index.html'i çift tıklayıp tarayıcıda aç
```

> `file://` ile açarsan harita iframe'i çalışmayabilir. Yayına alırken mutlaka
> bir HTTP sunucusu kullan.

Hızlı doğrulama (Chrome kuruluysa):

```bash
chrome --headless=new --screenshot=shot.png --window-size=1400,900 index.html
```

---

## İçerik yönetimi

### 1) Dükkan bilgileri — `SITE`

```js
const SITE = {
  name: "Tandır Döner",
  slogan: "Ateşte dönen, tabakta eriyen.",
  intro: "Her gün taze çekilen et, odun ateşinde dönen tandır…",
  phone: "+90 532 123 45 67",
  phoneHref: "tel:+905321234567",
  whatsapp: "905321234567", // ülke kodlu, boşluksuz
  address: "İstiklal Caddesi No: 12, Beyoğlu / İstanbul",
  mapsQuery: "İstiklal Caddesi 12 Beyoğlu İstanbul",
  instagram: "https://instagram.com/",
  email: "info@tandirdoner.com",
  ticker: ["Odun ateşinde döner", "Her gün taze çekilen et" /* … 12 yazı */],
  hours: [
    { day: "Pazartesi", open: "10:00", close: "23:00" },
    // … Pazar'a kadar 7 satır
  ],
};
```

Sayfalarda `data-site="phone"`, `data-site="address"` gibi attribute'lar bu nesneden
otomatik doldurulur — telefon numarasını bir kez değiştirince **tüm sayfalarda** güncellenir.

### 2) Menü — `MENU`

```js
const MENU = [
  {
    category: "Dönerler",
    note: "Tüm dönerler lavaş dürüm veya porsiyon olarak gelir.", // opsiyonel alt not
    items: [
      { name: "Tandır Dürüm", desc: "…", price: 285, tags: ["Çok satan"] },
      { name: "Adana Dürüm", desc: "…", price: 300, tags: ["Acı sever"] },
    ],
  },
  // …
];
```

| Alan       | Zorunlu | Not                                                              |
| ---------- | ------- | ---------------------------------------------------------------- |
| `category` | ✅      | Kategori başlığı (amber çizgili)                                 |
| `note`     | ❌      | Kategori altına küçük gri not                                    |
| `name`     | ✅      | Ürün adı (illüstrasyon buna göre seçilir)                        |
| `desc`     | ❌      | Açıklama (aramada da aranır)                                     |
| `price`    | ✅      | Sayı; `₺` otomatik eklenir                                       |
| `tags`     | ❌      | İlk etiket amber, diğerleri yeşil görünür                        |
| `img`      | ❌      | Gerçek fotoğraf yolu; verilirse illüstrasyon yerine o kullanılır |

**Mevcut menü: 6 kategori, 42 ürün**

| Kategori          | Ürün | Fiyat aralığı |
| ----------------- | ---- | ------------- |
| Dönerler          | 10   | 175 – 420 ₺   |
| Fırından          | 4    | 165 – 330 ₺   |
| Başlangıçlar      | 7    | 90 – 135 ₺    |
| Yanında İyi Gider | 7    | 40 – 150 ₺    |
| Tatlılar          | 5    | 110 – 190 ₺   |
| İçecekler         | 9    | 20 – 80 ₺     |

`tags` verilen ürünler ana sayfadaki **Vitrinden** bölümüne otomatik girer.

### 3) Kayan şerit — `SITE.ticker`

```js
ticker: ["Odun ateşinde döner", "Cuma & cumartesi 24:00'a kadar", "Son şiş bitince ocak kapanır", …]
```

Şeridin sağındaki **×** onu kapatır ve tercih `localStorage`'da
`tandir-ticker = "off"` olarak kalır. Geri getirmek için o anahtarı sil.

### 4) Açılış saatleri

`SITE.hours` yedi günü **Pazartesi → Pazar** sırasıyla tutar. Sayfa:

- bugünün satırını `tr.is-today` ile amber vurgular,
- panelin solunda "Bugün / gün / saat" kutusunu doldurur,
- açık/kapalı rozetini saatlerden hesaplar.

Not satırları ("Son sipariş…", "Resmî tatiller…") `index.html` içinde düzenlenir.

### 5) Menü görselleri — illüstrasyonlar

Her ürün kartının üstünde düz (flat) bir illüstrasyon var. **29 sembol**
`site.js` içindeki `ART_SPRITE` string'inde durur ve sayfa açıldığında DOM'a enjekte
edilir; görsel ürün adına göre otomatik seçilir (`dürüm → durum`, `çorba → corba`,
`kahve → kahve` …).

Gerçek fotoğraf kullanmak istersen ürüne `img` yaz, illüstrasyon otomatik devre dışı kalır:

```js
{ name: "Künefe", desc: "…", price: 190, img: "assets/menu/kunefe.jpg" }
```

Fotoğrafları `assets/menu/` altına koyman yeterli. Yeni illüstrasyon eklemek için
`ART_SPRITE`'a `<symbol id="art-xxx" viewBox="0 0 64 48">…</symbol>` ekle ve
`ART_KEYS` listesine anahtarını yaz.

> Not: Harici SVG'ye `<use href="assets/x.svg#id">` Chrome'da güvenilir çalışmadığı
> için sprite sayfaya gömülüdür — ekstra dosya/istek yoktur.

---

## Sepet & sipariş akışı

```
Menüde "Sepete ekle" tıkla
        │
        ▼
  order[] dizisi güncellenir (aynı ürün → adet artar) + localStorage
        │
        ▼
  Sağ alttaki sepet paneli açılır (adet, toplam, − ile azalt, "Sepeti temizle")
        │
        ▼
  "WhatsApp ile gönder" → wa.me/<numara>?text=<hazır mesaj>
```

- Üst bardaki **sepet düğmesi** (sepet simgesi + adet rozeti) paneli açar/kapatır.
- Panelin sağ üstündeki **×** de kapatır.
- Sepet boşken panel açılırsa "Sepet henüz boş — menüden ürün ekle." görünür.

Gönderilen mesaj formatı:

```
Tandır Döner sipariş:
2 × Tandır Dürüm — 570 ₺
1 × Ayran — 45 ₺
Toplam: 615 ₺
```

---

## Tema (gece / gündüz)

- Üst bardaki düğme **ay / güneş simgesi**dir; hangi simgenin görüneceğini CSS karar verir.
- Kullanıcı seçim yapmadıysa `prefers-color-scheme` takip edilir.
- Seçim `localStorage["tandir-theme"]` = `"light" | "dark"` olarak kaydedilir,
  sonraki sayfa ziyaretlerinde korunur.
- Koyu palet tek yerden gelir: `html[data-theme="dark"]` içinde `--ink`, `--cream`,
  `--paper`, `--text`, `--line`, `--amber-deep` ve gölgeler değişir.
- `color-scheme: light dark` sayesinde input/scrollbar da temaya uyar.
- İletişim sayfasındaki harita iframe'i koyu temada `invert + hue-rotate` ile karartılır
  (istemeyen o CSS kuralını silebilir).

---

## Tasarım sistemi

Renkler `styles.css` → `:root` bloğunda tek yerde tanımlıdır.

| Token          | Gündüz    | Gece      | Kullanım                            |
| -------------- | --------- | --------- | ----------------------------------- |
| `--ink`        | `#14110d` | `#0d0b08` | Üst bar, footer, sepet paneli       |
| `--ink-2`      | `#1d1712` | `#16130f` | Koyu yüzeyler, şerit                |
| `--ink-3`      | `#2a2219` | `#221c15` | Üçüncül yüzey                       |
| `--cream`      | `#f6f0e4` | `#12100c` | Sayfa arka planı                    |
| `--paper`      | `#fffaf3` | `#1b1611` | Kartlar, menü satırları             |
| `--text`       | `#14110d` | `#f2ead9` | Metin rengi (butonlar dahil)        |
| `--amber`      | `#e9b255` | `#e9b255` | Marka rengi: butonlar, vurgular     |
| `--amber-deep` | `#c78429` | `#f0c079` | Hover, kategori çizgisi, ilk etiket |
| `--red`        | `#a83a2c` | —         | "Kapalı" durumu                     |
| `--green`      | `#6fbf72` | —         | "Eklendi" durumu                    |
| `--olive`      | `#6b7a5b` | —         | İkincil etiketler (Vejetaryen)      |
| `--muted`      | `#8d8478` | `#9a9084` | Açıklama metinleri                  |
| `--line`       | `#e2d7c6` | `#2c241b` | Kenarlıklar, ayırıcılar             |
| `--radius`     | `16px`    | —         | Kart köşeleri                       |
| `--max`        | `1120px`  | —         | İçerik genişliği                    |

Tipografi: başlıklar **Fraunces** (serif), gövde **Inter** — Google Fonts'tan gelir;
internet yoksa `Georgia` / `system-ui`'ye düşer.

Kırılma noktaları: **900 px** (iletişim/saat paneli tek kolon), **860 px** (hero tek kolon),
**640 px** (hamburger menü).

---

## Animasyonlar

| Animasyon            | Nerede                         | Nasıl                                                                |
| -------------------- | ------------------------------ | -------------------------------------------------------------------- |
| **Scroll reveal**    | Kartlar, story, vitrin, harita | `IntersectionObserver` → `.reveal.is-in`, `--d` ile kademeli gecikme |
| **Ken Burns**        | Hero fotoğrafı                 | `kenburns` 22 s, sürekli ileri-geri zoom                             |
| **Köz parçacıkları** | Hero arka planı                | `.embers i` — 5 amber nokta, farklı gecikmelerle yükselir            |
| **Kayan şerit**      | Hero altındaki ticker          | `SITE.ticker`, `marquee` 34 s (hover'da 16 s), × ile kapatılabilir   |
| **Sayaçlar**         | İstatistik kartları            | `data-count` / `data-suffix`, göründüğünde 0'dan sayılır             |
| **Menü satırları**   | Menü sayfası                   | Her kart `--d` index'iyle sırayla yükselir                           |
| **Sepet & toast**    | Menü / vitrin                  | "Eklendi" rozeti, sağ altta sepet, sol altta bildirim                |
| **Üst bar**          | Tüm sayfalar                   | Scroll ilerleme çubuğu + `is-scrolled` koyulaşması                   |
| **Logo**             | Üst bar                        | `sway` ile hafif salınım, hover'da yükselme                          |
| **Kaydırma ipucu**   | Kategori şeritleri             | "Yana kaydır →" oku hafifçe hareket eder                             |

> `prefers-reduced-motion: reduce` durumunda tüm animasyonlar kapanır, reveal öğleri
> görünür halde kalır.

---

## Görseller

| Dosya                    | Boyut           | Ağırlık | Nerelerde                                                |
| ------------------------ | --------------- | ------- | -------------------------------------------------------- |
| `assets/doner-photo.jpg` | 640 × 1137      | ~172 KB | Hero (320 px'e ölçeklenir), Hakkımızda (300 × 340 kesim) |
| `assets/logo.svg`        | 64 × 64 viewBox | ~1.2 KB | Tüm sayfalarda üst bar (32 px)                           |
| `assets/favicon.svg`     | 64 × 64         | ~1 KB   | Sekme simgesi (`rel="icon"`)                             |
| `assets/doner.svg`       | 320 × 320       | 1.7 KB  | Yedek illüstrasyon (kullanılmıyor)                       |
| `docs/preview.jpg`       | 1400 × 900      | ~140 KB | README önizlemesi + `og:image`                           |

Fotoğraf progressive JPEG (mozjpeg, q75). Hero'da 320 CSS px gösterildiği için 2x DPR
ekranlara yakın çözünürlük veriyor.

> ⚠️ **Lisans uyarısı:** `doner-photo.jpg` Yandex görsel aramasından alındı, dükkana
> ait değil. Gerçek yayına geçerken **kendi çektiğin fotoğraf** ile değiştir
> (`assets/doner-photo.jpg` üzerine aynı adla yaz, kod değişikliği gerekmez).

---

## SEO & erişilebilirlik

- `index.html` içinde `application/ld+json` ile **`schema.org/Restaurant`** verisi
  (isim, mutfak, telefon, adres) → Google'ın "yerel işletme" paneli için hazır.
- Her sayfada `lang="tr"`, `viewport`, sayfaya özel `<title>` ve `meta description`.
- **Open Graph + Twitter Card**: `og:image` → `docs/preview.jpg` (1400×900),
  `og:title`, `og:description`, `og:image:alt`, `twitter:card = summary_large_image`.
  Yayına alınırken `og:image`'i tam domainle yaz: `https://siteniz.com/docs/preview.jpg`.
- Hamburger butonu `aria-expanded` durumunu takip ediyor.
- Arama inputu `type="search"` + `aria-label`; sepet/tema düğmelerinde `aria-label`.
- `prefers-reduced-motion: reduce` durumunda kaydırma ve animasyonlar kapanır.
- `color-scheme: light dark` ile native form/scrollbar temaya uyar.

**Yapılacak:** gerçek adres/telefon girildikten sonra JSON-LD'yi de güncelle
(şu an örnek veri yazılı).

---

## localStorage anahtarları

| Anahtar         | Ne tutar                         | Nasıl sıfırlanır                    |
| --------------- | -------------------------------- | ----------------------------------- |
| `tandir-cart`   | Sepet: `[{name, price, qty}, …]` | "Sepeti temizle" düğmesi            |
| `tandir-theme`  | `"light"` / `"dark"`             | Anahtarı sil → sistem ayarına döner |
| `tandir-ticker` | `"off"` ise kayan şerit gizlidir | Anahtarı sil → şerit geri gelir     |

> `localStorage` kapalıysa (gizli mod) sepet sadece o sayfa için çalışır, site bozulmaz.

Tarayıcı konsolundan temizlemek için:

```js
localStorage.removeItem("tandir-cart");
localStorage.removeItem("tandir-theme");
localStorage.removeItem("tandir-ticker");
```

---

## Yayına alma

Statik site → herhangi bir statik host çalışır. Build adımı olmadığı için hepsi
"dosyaları koy, çık" şeklinde:

### Vercel (en hızlı)

```bash
vercel deploy --prod --yes
```

### Netlify

```bash
netlify deploy --prod --dir .
```

### Cloudflare Pages

Repo'yu bağla, build komutu **yok** → "Static" seç, çıktı kök dizin.

### GitHub Pages

```bash
gh pages setup        # veya Settings → Pages → main branch / root
```

### Kendi sunucun

```bash
python3 -m http.server 8000     # veya nginx ile /var/www/doner
```

Yayına almadan önce:

1. `og:image` ve JSON-LD'yi gerçek domain/adresle güncelle.
2. `doner-photo.jpg`'yi kendi fotoğrafınla değiştir.
3. Harita iframe'ini `SITE.mapsQuery` üzerinden doğrula.

---

## Kendi dükkanına uyarlama checklist'i

- [ ] `site.js` → `SITE.name`, `slogan`, `intro`
- [ ] `SITE.phone`, `SITE.phoneHref`, `SITE.whatsapp` (gerçek numara)
- [ ] `SITE.address` + `SITE.mapsQuery`
- [ ] `SITE.hours` — bayram/ramazan istisnaları
- [ ] `SITE.ticker` — kendi sloganların
- [ ] `MENU` — ürün adları, açıklamalar, güncel fiyatlar
- [ ] `MENU` ürünlerine `img` ile gerçek fotoğraflar
- [ ] `index.html`, `menu.html`, `about.html`, `contact.html` içindeki `<title>` metinleri
- [ ] `contact.html`'deki harita iframe'i: `https://www.google.com/maps?q=ADRES&output=embed`
- [ ] Footer'daki Instagram linki ve e-posta
- [ ] Renkler: `styles.css` → `:root` (gündüz) ve `html[data-theme="dark"]` (gece)
- [ ] JSON-LD ve `og:image` güncellemesi

---

## Sık sorulanlar / sorun giderme

| Sorun                              | Neden / Çözüm                                                                            |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| Sepet paneli açılmıyor             | Üst bardaki sepet düğmesine bas; panel `×` ile kapatılmış olabilir                       |
| Sepet sayfa yenilenince kayboluyor | `localStorage` kapalı olabilir (gizli mod / tarayıcı ayarı)                              |
| "Şu an açık" rozeti yanlış         | `SITE.hours` sırası Pazartesi → Pazar olmalı; saatler `HH:MM` formatında                 |
| Fiyat `285 ₺` değil `285` çıkıyor  | `price` string değil **sayı** olmalı                                                     |
| Arama sonuç vermiyor               | Arama isim + açıklamada küçük harf arar; `desc` yoksa sadece isim aranır                 |
| Ürün kartında görsel yok           | Ad, `ART_KEYS` eşleşmesine uymuyor; `img` alanı ver veya `ART_KEYS`'a anahtar ekle       |
| Kayan şerit görünmüyor             | Daha önce × ile kapatılmış olabilir → `localStorage.removeItem("tandir-ticker")`         |
| Site koyu açılıyor                 | Sistem `prefers-color-scheme: dark` kullanıyor; düğmeyle değiştir, tercih kaydedilir     |
| Harita boş geliyor                 | `file://` ile açma; HTTP sunucu kullan. Adresi değiştirmek için `SITE.mapsQuery` yeterli |
| Menü kartları kesiliyor gibi       | Şerit yatay kaydırmalıdır; kaydırma çubuğu veya parmak/trackpad ile yana git             |

---

## Yol haritası

- [x] Scroll reveal + hero animasyonları (ken burns, köz, ticker, sayaçlar)
- [x] Sepetin `localStorage` ile kalıcı olması
- [x] Gece modu (sistem tercihi + üst bar düğmesi)
- [x] Kayan şeridin düzenlenebilir ve kapatılabilir olması
- [x] Ürün illüstrasyonları (29 flat SVG)
- [x] Vitrin ve menü şeritlerinin yana kaydırılabilir olması
- [x] `og:image` / Twitter Card etiketleri ve favicon
- [ ] Gerçek ürün fotoğrafları (dürüm, porsiyon, künefe) + `sharp` optimizasyonu
- [ ] QR menü (masaya basılı QR → `menu.html`)
- [ ] Menü verisinin Google Sheets / CSV'den okunması (deploy'sız fiyat güncelleme)
- [ ] KVKK / çerez bildirimi
- [ ] Instagram galerisi
- [ ] Gerçek adresin Google Maps linki

---

## Katkı & commit kuralları

- Repo: `bahattinercan/doner-website`
- Commit'ler [Conventional Commits](https://www.conventionalcommits.org/) formatında:
  `feat: …`, `fix: …`, `chore: …`, `docs: …`
- Bir commit = bir mantıksal değişiklik. Menü fiyat değişikliği ile CSS değişikliğini ayır.
- Body'de **neden** değiştiğini yaz; ne'yi zaten diff söylüyor.

Örnek:

```
feat: sepet düğmesi üst barda, vitrin ve menü yatay kaydırılabilir

- üst barda sepet simgesi + adet rozeti; tema düğmesiyle yeri değiştirildi
- ürün satırlarındaki "Sipariş" butonu sepet ikonlu "Sepete ekle" oldu
- vitrin ve kategori şeritleri scroll-snap ile yana kaydırılabilir
```

---

## Lisans

Özel kullanım. Site içeriği ve görseller dükkana aittir; kaynak kodu yalnızca
işletme sahibi tarafından kullanılabilir.
