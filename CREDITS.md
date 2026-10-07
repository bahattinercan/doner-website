# Kaynaklar & lisans

## Görseller

| Varlık                               | Kimin                                                                        | Lisans               |
| ------------------------------------ | ---------------------------------------------------------------------------- | -------------------- |
| `assets/logo.svg`                    | Bu projenin üretimi                                                          | MIT (kodla birlikte) |
| `assets/favicon.svg`                 | Bu projenin üretimi                                                          | MIT                  |
| `assets/doner.svg`                   | Bu projenin üretimi                                                          | MIT                  |
| `assets/doner-photo.jpg`             | Proje tarafından sağlanan örnek fotoğraf                                     | MIT (örnek)          |
| Menü illüstrasyonları (`ART_SPRITE`) | Bu projenin üretimi                                                          | MIT                  |
| `assets/menu/*-generated.jpg`        | OpenAI yerleşik image_gen ile bu proje için üretilen temsili ürün görselleri | Yapay zekâ üretimi   |
| `docs/preview.jpg`                   | Bu projenin ekran görüntüsü                                                  | MIT                  |

**Stok/üçüncü parti görsel yoktur.** Menüdeki 42 ürün fotoğrafı yapay zekâ ile ayrı ayrı üretilmiştir; gerçek ürün çekimi değildir. Kullanılan istemler `docs/menu-image-prompts.json` dosyasındadır. Yeni menü görselleri 800 px genişlikte JPEG (q85) olarak optimize edilmiştir.

Diğer fotoğraflar projeye ait örnek görsellerdir;
kendi işletmenizin fotoğraflarıyla değiştirmeniz önerilir (bkz. `docs/06-gorseller.md`).
Fotoğraflar `sharp` ile 640 px'e indirilip progressive JPEG (q72–74) olarak optimize edildi.

## Yazı tipleri

| Font         | Kaynak                              | Lisans                    |
| ------------ | ----------------------------------- | ------------------------- |
| **Fraunces** | `assets/fonts/` (self-hosted)       | SIL Open Font License 1.1 |
| **Inter**    | `assets/fonts/` (self-hosted)       | SIL Open Font License 1.1 |

Yazı tipleri Google Fonts'tan **bir kez indirilip repo'ya gömülmüştür**; site çalışırken
hiçbir üçüncü tarafa istek gitmez. Yenilemek için: `node docs/prepare-fonts.js`.
İnternet/woff2 yoksa `Georgia` / `system-ui` fallback'leri devreye giriyor.

## Harita

İletişim sayfasındaki harita Google Maps'in herkese açık embed'idir; kendi adresinizi
`content.js` içindeki `SITE.mapsQuery` ile değiştirirsiniz.

## Kod

Tüm kaynak kodu **MIT** lisanslıdır (bkz. `LICENSE`). Serbestçe kullan, değiştir,
dağıt, ticari projeye koy — telif notunu koruman yeterli.
