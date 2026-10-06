# Tandır Döner — restoran websitesi

Sıfır bağımlılık, build adım yok. Doğrudan açılır: `index.html`'i tarayıcıda aç, ya da:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Sayfalar
| Dosya | İçerik |
|---|---|
| `index.html` | Hero, vitrin menüsü, açılış saatleri |
| `menu.html` | Tüm menü + arama, sipariş sepeti |
| `about.html` | Hikâye / nasıl yapıyoruz |
| `contact.html` | Adres, telefon, WhatsApp, harita, saatler |
| `styles.css` | Tüm tasarım (renk paleti `:root` içinde) |
| `site.js` | **Tüm içerik verisi burada** |

## Menü değiştirmek
Her şey `site.js` içinde:

```js
const SITE = { name, slogan, phone, whatsapp, address, hours, ... };
const MENU = [
  { category: "Dönerler", items: [
    { name: "Tandır Dürüm", desc: "...", price: 285, tags: ["Çok satan"] },
  ]},
];
```

- Ürün eklemek: ilgili `items` dizisine bir satır ekle.
- Fiyatı değiştirmek: `price` sayısı (₺ otomatik eklenir).
- Yeni kategori: yeni bir `{ category: "...", items: [...] }` bloğu.
- Etiket: `tags: ["Çok satan"]` → ilk etiket amber, diğerleri yeşil görünür.

Saatler `hours` dizisinde; Pazartesi → Pazar sırasıyla. "Şu an açık / kapalı" rozeti bu saatlerden otomatik hesaplanıyor.

## Sipariş
Menüdeki **Sipariş** butonları sağ alttaki listeye ekliyor, "WhatsApp ile gönder"
linki seçilen ürünleri ve toplamı hazır mesaj olarak `wa.me`'ye gönderiyor.
Kendi numaran: `SITE.whatsapp = "905321234567"` (ülke koduyla, boşluksuz).

## Özelleştirme
- **İsim/marka:** `site.js` → `SITE.name`, sonra `index.html`, `menu.html`, `about.html`,
  `contact.html` içindeki `<span>Tandır Döner>` yazımlarını ve `<title>` etiketlerini değiştir.
- **Renkler:** `styles.css` → `:root` bloğu (`--amber`, `--red`, `--ink`).
- **Fotoğraf koymak:** `assets/` içine jpg koyup hero'daki `<img src="assets/doner.svg">` yerine
  kendi fotoğrafını ver. Gerçek ürün fotoğrafları menü kartlarında da kullanılabilir.
- **Harita:** `contact.html`'deki iframe adresini kendi adresinle değiştir
  (`https://www.google.com/maps?q=ADRES&output=embed`).

## Yayına almak
Statik site olduğu için herhangi bir statik host çalışır. En kolayı (önceki projelerdeki gibi):

```bash
vercel deploy --prod --yes
```

Netlify / Cloudflare Pages / GitHub Pages de aynı şekilde, build adımı olmadan çalışır.
