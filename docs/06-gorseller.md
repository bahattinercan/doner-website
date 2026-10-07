# 6 · Görseller

## 6.1 Mevcut asset'ler

| Dosya | Tür | Boyut | Ağırlık | Kullanım |
|---|---|---|---|---|
| `assets/logo.svg` | SVG | 64×64 viewBox | ~1.2 KB | Üst bar (32 px), footer |
| `assets/favicon.svg` | SVG | 64×64 | ~1 KB | Sekme simgesi |
| `assets/doner.svg` | SVG | 320×460 | ~2 KB | Yedek illüstrasyon |

| `docs/preview.jpg` | JPEG | 1400×900 | ~140 KB | README + `og:image` |

---

## 6.2 Menü illüstrasyonları (SVG sprite)

29 sembol `site.js` içindeki `ART_SPRITE` string'indedir:

```html
<symbol id="art-durum" viewBox="0 0 64 48">…</symbol>
```

**Neden gömülü?** Harici dosyaya `<use href="assets/x.svg#id">` Chrome'da güvenilir
değil (test edildi: boş render). Bu yüzden sprite `injectSprite()` ile DOM'a eklenir
ve `<use href="#art-durum">` şeklinde **aynı belge içinden** referans verilir.

Kullanım:

```html
<div class="mi-art">
  <svg viewBox="0 0 64 48" aria-hidden="true"><use href="#art-durum"/></svg>
</div>
```

Sembol paleti: `durum, porsiyon, sandvic, pide, lahmacun, borek, corba, salata, humus,
biber, patates, sogan, turshu, pilav, lavas, misir, kunefe, baklava, sutlac, kazandibi,
sekerpare, ayran, salgam, limonata, soda, su, maden, cay, kahve`.

Yeni sembol eklemek:

```html
<symbol id="art-makarna" viewBox="0 0 64 48">
  <path d="…" fill="#e9b255"/>
</symbol>
```

ardından `ART_KEYS`'a `["makarna", "makarna"]` yaz.

---

## 6.3 Gerçek fotoğraf kullanmak

1. Fotoğrafı `assets/menu/` altına koy: `assets/menu/kunefe.jpg`
2. Ürüne ekle:
   ```js
   { name: "Künefe", price: 190, img: "assets/menu/kunefe.jpg" }
   ```
3. İllüstrasyon otomatik devre dışı kalır.

Önerilen özellikler:

| Ölçü | Neden |
|---|---|
| 640×480 (4:3) | Kart genişliğine oturur, `object-fit` ile kesilir |
| q70–75 progressive JPEG | ~60–90 KB |
| `alt` metni | Erişilebilirlik + SEO (otomatik üretilir) |

Optimize etmek için (Node + sharp kuruluysa):

```bash
sharp -i assets/menu/kunefe.jpg -o assets/menu/kunefe.jpg -quality 72
```

---

## 6.4 Hero görselini değiştirme

`assets/doner-photo.jpg` (640×960) hero ve hikâye bölümünde kullanılıyor.
Kendi fotoğrafını koymak için aynı adla üzerine yazmak yeterli — kod değişikliği gerekmez.

Ürün fotoğrafları `assets/menu/` klasöründe duruyor ve `content.js`'te ilgili ürüne
`img` alanı ile bağlanmış durumda:

`index.html` içinde:

```html
<img src="assets/doner-photo.jpg" alt="Odun ateşinde dönen tandır dana döner" width="640" height="960">
```

`.hero-photo img` kuralı 340×460 px'lik bir alan tanımlar; `object-fit: cover` ile
otomatik kırpılır. En az **640 px genişlik** önerilir.

---

## 6.5 Lisans

Sitede **üçüncü parti stok görsel yoktur**. Logo, favicon, SVG illüstrasyon ve
ürün fotoğrafları projeye aittir (MIT). Yine de yayına almadan önce ürün
fotoğraflarını **kendi dükkânının çekimleriyle** değiştirmen önerilir — menü
fotoğrafları örnek amaçlıdır. Detay: [CREDITS.md](../CREDITS.md).
