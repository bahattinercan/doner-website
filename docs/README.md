# 📚 Tandır Döner — Dokümantasyon

Bu klasör sitenin **detaylı** teknik rehberini içerir. Kökteki `README.md` hızlı giriş ve
özet tablo içindir; burada ise her sistemin nasıl çalıştığı, nerelere dokunabileceğin ve
nelerin bozulabileceği madde madde anlatılır.

Dosyalar `css/`, `js/`, `assets/`, `scripts/` ve `tests/` klasörlerindedir; aşağıdaki
metinlerdeki `styles.css` / `content.js` / `site.js` ifadeleri bu klasörlerdeki
dosyalara işaret eder. `docs/` yalnızca markdown içerir.

---

## Bölümler

| #   | Doküman                                               | Ne anlatıyor                                                                 |
| --- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | [Mimari](01-mimari.md)                                | Dosyaların rolü, sayfa iskeleti, `site.js` akışı, `data-*` / `id` sözleşmesi |
| 2   | [İçerik yönetimi](02-icerik-yonetimi.md)              | `SITE`, `MENU`, `ticker`, `hours`, illüstrasyon seçimi                       |
| 3   | [Sepet & sipariş](03-sepet-ve-siparis.md)             | Sepet modeli, kalıcılık, WhatsApp mesajı, kenar durumlar                     |
| 4   | [Tema (gece / gündüz)](04-tema.md)                    | Tema çözümleme sırası, token override'ları, test yöntemi                     |
| 5   | [Tasarım sistemi](05-tasarim-sistemi.md)              | Renk tokenları, tipografi, kırılımlar, animasyonlar                          |
| 6   | [Görseller](06-gorseller.md)                          | SVG sprite, logo/favicon, fotoğraf optimizasyonu, lisans                     |
| 7   | [SEO & erişilebilirlik](07-seo-ve-erisilebilirlik.md) | Meta, JSON-LD, Open Graph, a11y checklist'i                                  |
| 8   | [Yayına alma](08-yayina-alma.md)                      | Vercel/Netlify/Cloudflare/Pages, domain, cache, son kontroller               |
| 9   | [Sorun giderme](09-sorun-giderme.md)                  | Belirti → neden → çözüm, debug snippet'leri                                  |
| 10  | [Uyarlama rehberi](10-uyarlama-rehberi.md)            | Siteyi başka bir dükkana çevirme adımları                                    |

---

## 5 dakikada ne değiştirebilirim?

| İstediğin                   | Dosya                    | Nereye                               |
| --------------------------- | ------------------------ | ------------------------------------ |
| Telefon / adres / Instagram | `js/content.js`         | `SITE` nesnesi                       |
| Fiyat / ürün / kategori     | `js/content.js`         | `MENU` dizisi                        |
| Açılış saatleri             | `js/content.js`         | `SITE.hours`                         |
| Kayan şerit yazıları        | `js/content.js`         | `SITE.ticker`                        |
| Renkler                     | `css/styles.css`        | `:root` ve `html[data-theme="dark"]` |
| Ürün fotoğrafı              | `assets/menu/…jpg`       | ürüne `img: "…"` ekle                |
| Hero fotoğrafı              | `assets/doner-photo.jpg` | üzerine aynı adla yaz                |

---

## Hızlı gerçekler

| Bilgi            | Değer                                                                            |
| ---------------- | -------------------------------------------------------------------------------- |
| Sayfa sayısı     | 5 (`index`, `menu`, `about`, `contact`, `gizlilik`)                              |
| Menü             | 6 kategori, 42 ürün                                                              |
| Ürün fotoğrafı   | 42 (`assets/menu/*-generated.jpg`, 640×426)                                      |
| İllüstrasyon     | 29 SVG sembol (`ART_SPRITE`) — `img` yoksa yedek                                 |
| Şerit yazısı     | 13 ifade                                                                         |
| Bağımlılık       | Çalışma zamanında 0; yalnızca geliştirme aracı `sharp` (`package.json`)         |
| JS satır sayısı  | ~960 (`js/site.js`) + 129 (`js/content.js`)                                      |
| CSS satır sayısı | ~1950                                                                            |
| Kalıcı veri      | `localStorage`: `tandir-cart`, `tandir-theme`, `tandir-ticker`, `tandir-consent` |
| Tema             | Gündüz + gece, sistem tercihi fallback'li                                        |

---

## Sözlük

| Terim              | Açıklama                                                                           |
| ------------------ | ---------------------------------------------------------------------------------- |
| **SITE**           | Dükkan bilgileri nesnesi (isim, telefon, adres, saatler, şerit)                    |
| **MENU**           | Kategoriler ve ürünler dizisi                                                      |
| **ART_SPRITE**     | Ürün kartlarında kullanılan SVG sembol koleksiyonu                                 |
| **order**          | Bellekteki sepet dizisi: `{ name, price, qty }`                                    |
| **modal**          | Ürün kartına tıklayınca açılan detay penceresi (`#item-modal`, JS ile oluşturulur) |
| **rozet / status** | "Şu an açık / kapalı" göstergesi                                                   |
| **FAB**            | Sağ altta beliren WhatsApp butonu (floating action button)                         |
| **reveal**         | Scroll'da görünürlükle açılan animasyon sınıfı                                     |

---

## Dokümantasyona katkı

- Bir davranışı değiştirirken ilgili dokümanı da güncelle.
- Kod örneği verirken **gerçek** dosya/alan adlarını kullan.
- Commit formatı: `docs: …` (bkz. kök README → Katkı & commit kuralları).
