# 1 · Mimari

## 1.1 Dosyaların rolü

| Dosya | Rol | Değiştirirken dikkat |
|---|---|---|
| `index.html` | Hero, "neden buraya geliyorsun", vitrin, saat paneli, CTA | Vitrin/sepet paneli `id`'leri `site.js` tarafından kullanılıyor |
| `menu.html` | Arama + kategori chip'leri + tüm menü + sepet paneli | `#menu`, `#menu-search`, `#menu-count` |
| `about.html` | Hikâye, üretim tarzı, fotoğraf | `.story-img` |
| `contact.html` | Adres, telefon, harita iframe'i, saatler | `#map` iframe'i |
| `styles.css` | Tüm tasarım: tokenlar, layout, animasyon, tema override'ları | `:root` + `html[data-theme="dark"]` |
| `content.js` | **Dükkân ayarları**: `SITE` + `MENU` | Ürün/fiyat/saat burada |
| `site.js` | Davranış: sepet, arama, tema, animasyon, render | `ART_SPRITE`, `ART_KEYS` burada |
| `assets/` | Logo, favicon, hero illüstrasyonu, (gelecekte) ürün fotoğrafları | İsimler sabit; üzerine yazmak yeterli |

> İlke: **veri → `content.js`, görünüm → `styles.css`, iskelet → `*.html`,**
> **davranış → `site.js`.**
> Ürün/fiyat/saat değişimi için HTML'e dokunmak gerekmez.

---

## 1.2 Sayfa iskeleti

Her sayfada ortak parçalar:

```html
<header class="topbar">
  <div class="topbar-inner">
    <a class="logo" href="index.html">…</a>
    <button class="burger" aria-expanded="false">Menü ≡</button>
    <nav class="nav-links">…</nav>
    <button class="theme-toggle" id="theme-toggle">…ay/güneş SVG…</button>
    <button class="cart-btn" id="cart-btn">…sepet SVG… <span id="cart-count">0</span></button>
    <a class="cta-call" href="tel:…">Ara</a>
  </div>
  <div class="scroll-progress" id="scroll-progress"></div>
</header>

<main class="wrap"> …sayfa içeriği… </main>

<div class="order" id="order" hidden>   <!-- sepet paneli -->
  <h4>Sipariş listesi</h4>
  <button class="order-close" id="order-close">×</button>
  <ul class="order-items"></ul>
  <div class="order-total"></div>
  <a class="order-send" href="#">WhatsApp ile gönder</a>
  <button class="order-clear" id="order-clear">Sepeti temizle</button>
</div>

<a class="fab" id="fab" href="https://wa.me/…">WhatsApp ile sipariş</a>
```

`index.html`'de ek olarak:

```html
<div class="ticker" id="ticker">
  <div class="ticker-track" id="ticker-track"></div>
  <button class="ticker-close" id="ticker-close">×</button>
</div>
```

---

## 1.3 `site.js` çalışma sırası (content.js önce yüklenir)

```
content.js yüklenir → SITE, MENU tanımlanır
site.js yüklenir
  ├─ TL, BASKET_ICON, ART_SPRITE, ART_KEYS tanımlanır
  ├─ artFor(), injectSprite()
  ├─ reduceMotion, isOpenNow()
  ├─ CART_KEY / THEME_KEY, order = loadOrder(), orderOpen = false
  ├─ sepet fonksiyonları (loadOrder, saveOrder, renderOrder, addToOrder…)
  ├─ render fonksiyonları (renderMenu, renderPreview, wireMenuButtons, fillStatic)
  ├─ tema (applyTheme, initTheme)
  └─ animasyonlar (initReveal, initCounters, initScrollFx, initTicker)

DOMContentLoaded
  ├─ injectSprite()          → SVG semboller DOM'a eklenir
  ├─ initTheme()             → localStorage / sistem tercihi uygulanır
  ├─ fillStatic()            → data-site, status, today, data-hours, harita
  ├─ burger menü            → .nav-links.is-open
  ├─ arama + chip'ler      → renderMenu("menu", …)
  ├─ renderPreview("preview") (varsa)
  ├─ wireMenuButtons()       → [data-add] tıklamaları
  ├─ renderOrder()           → sepet rozeti + panel durumu
  ├─ initTicker()            → şerit (kapalıysa kaldırılır)
  ├─ initReveal()            → IntersectionObserver
  ├─ initCounters()          → data-count sayaçları
  └─ initScrollFx()          → progress bar, topbar, FAB, hero paralaks
```

---

## 1.4 `data-*` sözleşmesi

| Attribute | Nerede | Ne yapar |
|---|---|---|
| `data-site="phone"` | metin elemanları | `SITE[key]` ile doldurulur |
| `data-hours` | `<tbody>` | Saat tablosunu `SITE.hours`'tan üretir, bugünü `is-today` yapar |
| `data-maps-link` | `<a>` | `SITE.mapsQuery` ile Google Maps linki |
| `data-add="Ürün adı"` | buton | Ürünü sepete ekler |
| `data-count="2004"` | `<b>` | Görünürken 0'dan sayar |
| `data-suffix="+"` | sayaçla birlikte | Sayının sonuna eklenir |
| `data-label="Sepet"` | `.mi-add` | Buton etiketi ("Eklendi" sonrası geri döner) |

## 1.5 Kritik `id`'ler

| `id` | Amaç | Yoksa ne olur |
|---|---|---|
| `theme-toggle` | Tema düğmesi | Tema yine çalışır, düğme olmaz |
| `cart-btn` | Sepet panelini aç/kapat | Panel sadece ürün eklenince açılır |
| `cart-count` | Adet rozeti | Rozet güncellenmez |
| `order` / `order-close` / `order-clear` | Sepet paneli | Sepet çalışmaz |
| `menu` / `menu-search` / `menu-count` | Menü sayfası | Menü render edilmez |
| `preview` | Ana sayfa vitrini | Vitrin boş kalır |
| `ticker` / `ticker-track` / `ticker-close` | Kayan şerit | Şerit olmaz |
| `scroll-progress` | Üst bar ilerleme çubuğu | Çubuk görünmez |
| `fab` | WhatsApp butonu | Buton görünmez |
| `map` | Harita iframe'i | Harita boş kalır |
| `today-day` / `today-time` | "Bugün" kutusu | Kutu boş kalır |

---

## 1.6 CSS katmanları

```
1. :root tokenları            (gündüz)
2. @media (prefers-color-scheme: dark)  (sistem tercihi, kullanıcı seçmediyse)
3. html[data-theme="dark"]    (kesin seçim — en güçlü katman)
4. Bileşen stilleri
5. @media (max-width: 900 / 860 / 640)
6. @media (prefers-reduced-motion: reduce)
```

Tema düğmesi `html` elementine `data-theme` yazar; bu yüzden **kesin seçim**,
sistem tercihinden her zaman önceliklidir.

---

## 1.7 Performans notları

- Tek JS dosyası, `defer` ile yüklenir; render'lar DOM hazırken yapılır.
- Sprite gömülüdür → ekstra HTTP isteği yoktur.
- Harici `<use href="…svg#id">` Chrome'da güvenilir olmadığı için sprite **DOM'a enjekte** edilir.
- Animasyonlar `IntersectionObserver` ile yalnızca görünürken tetiklenir.
- Scroll handler `passive: true` ile okunur.
- Fotoğraf progressive JPEG; hero'da 320 CSS px gösterilir.
