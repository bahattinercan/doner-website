# 9 · Sorun giderme

## 9.1 Belirti → neden → çözüm

| Belirti | Olası neden | Çözüm |
|---|---|---|
| Sepet paneli açılmıyor | Panel `×` ile kapatıldı (`orderOpen=false`) | Üst bardaki sepet düğmesine bas |
| Sepet rozeti 0 kalıyor | `localStorage` kapalı (gizli mod) | Tarayıcı ayarını aç; site yine çalışır |
| "Şu an açık" rozeti yanlış | `SITE.hours` sırası Pazartesi→Pazar değil | Sırayı düzelt; saatler `HH:MM` |
| Fiyat `285 ₺` değil `285` | `price` string girildi | Sayı yaz: `price: 285` |
| Arama sonuç vermiyor | `desc` yok, isim farklı yazılıyor | Arama küçük harfle yapılır; `desc` ekle |
| Ürün kartında görsel yok | Ad, `ART_KEYS`'a uymuyor | `img` ver veya `ART_KEYS`'a anahtar ekle |
| Kayan şerit yok | Daha önce × ile kapatıldı | `localStorage.removeItem("tandir-ticker")` |
| Site koyu açılıyor | Sistem `prefers-color-scheme: dark` | Düğmeyle değiştir; tercih kaydedilir |
| Harita boş | `file://` ile açıldı | HTTP sunucu kullan (`python3 -m http.server 8000`) |
| Menü kartları kesiliyor | Şerit yatay kaydırmalı | Trackpad/parmak ile yana kaydır; scrollbar amber'dir |
| Buton yazısı görünmüyor | Butona renk verilmemiş (sistem `ButtonText` alıyor) | CSS'te `color: var(--text)` ekle |
| Logo/hero boyutu bozuk | `.logo img`, `.hero-photo img` kuralları | İlgili CSS kuralını ayarla |
| Animasyonlar çalışmıyor | `prefers-reduced-motion: reduce` açık | Sistem ayarını değiştir (bu bilinçli bir davranış) |

---

## 9.2 Hızlı teşhis snippet'leri

Tarayıcı konsoluna (F12) yapıştır:

```js
// tema & sepet durumu
document.documentElement.dataset.theme;
JSON.parse(localStorage.getItem("tandir-cart") || "[]");
localStorage.getItem("tandir-ticker");

// bugünün saat hesabı
isOpenNow();

// menü render'ı
renderMenu("menu", "", "Tümü");

// sprite yüklü mü
document.querySelectorAll("#menu-art-sprite symbol").length;   // 29 olmalı
```

---

## 9.3 Headless Chrome ile görsel test

```bash
# ana sayfa (gece temasıyla)
chrome --headless=new --screenshot=shot.png --window-size=1400,900 index.html

# mobil görünüm
chrome --headless=new --screenshot=mobile.png --window-size=500,900 index.html

# gündüz teması için geçici kopya oluştur:
sed 's|<meta name="viewport"|<script>localStorage.setItem("tandir-theme","light")</script>\n  <meta name="viewport"|' index.html > /tmp/light.html
```

---

## 9.4 Sık yapılan hatalar

1. **Fiyatı string yazmak** → toplam bozulur.
2. **Saatleri karışık sırayla vermek** → rozet yanlış gün gösterir.
3. **Aynı ürünü iki farklı adla iki kez tanımlamak** → sepette iki satır olur.
4. **Harici SVG'ye `<use href="…">` ile referans vermek** → Chrome render etmez.
5. **Yeni butona renk vermemek** → koyu temada görünmez.
6. **Fotoğrafı `assets/` dışına koymak** → yol yanlış olur.
