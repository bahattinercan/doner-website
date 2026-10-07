# 3 · Sepet & sipariş

## 3.1 Sepet modeli

Bellekteki durum:

```js
const order = [ { name: "Tandır Dürüm", price: 285, qty: 2 }, … ];
let orderOpen = false;   // panel görünür mü
```

- Aynı ürün tekrar eklenirse `qty` artar (ayrı satır oluşmaz).
- Adet `−` ve `+` düğmeleriyle azaltılıp arttırılır; 0'a inince satır silinir. Üst sınır **20 adet** (`MAX_QTY`); aşınca toast uyarısı çıkar.
- Toplam: `Σ price × qty`.

---

## 3.2 Kalıcılık

```js
const CART_KEY = "tandir-cart";
localStorage.setItem(CART_KEY, JSON.stringify(order));
```

| Senaryo                         | Sonuç                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| Sayfa yenilenir                 | Sepet korunur                                                                         |
| Menü → ana sayfa geçişi         | Sepet korunur (rozet her sayfada görünür)                                             |
| "Sepeti temizle"                | `order = []`, rozet 0                                                                 |
| Gizli mod / localStorage kapalı | `try/catch` sayesinde site çalışmaya devam eder, sepet sadece o sayfa için geçerlidir |

Rozeti sıfırlamak:

```js
localStorage.removeItem("tandir-cart");
```

---

## 3.3 Paneli açma / kapatma

| Eylem                                       | Sonuç                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| Üst bardaki **sepet düğmesi** (`#cart-btn`) | `orderOpen`ı ters çevirir → panel açılır/kapanır                          |
| Ürün "Sepete ekle"                          | `orderOpen = true` → panel otomatik açılır                                |
| Panelin **×**'u (`#order-close`)            | `orderOpen = false` → panel kapanır (ürünler silinmez)                    |
| Sepet boş ve panel açılır                   | "Sepet henüz boş. Menüden ürün ekleyebilirsiniz." + WhatsApp butonu gizli |

Rozet her `renderOrder()` çağrısında güncellenir ve `is-pop` animasyonu yeniden tetiklenir
(`void counter.offsetWidth` trick'iyle).

---

## 3.4 WhatsApp'a gönderme

```js
function orderText() {
  const lines = order.map((o) => `${o.qty} × ${o.name} — ${TL(o.price * o.qty)}`);
  const total = order.reduce((s, o) => s + o.price * o.qty, 0);
  return `${SITE.name} sipariş:\n${lines.join("\n")}\nToplam: ${TL(total)}`;
}

function waLink() {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(orderText())}`;
}
```

Örnek çıktı:

```
Tandır Döner sipariş:
2 × Tandır Dürüm — 570 ₺
1 × Ayran — 45 ₺
Toplam: 615 ₺
```

Sağ alttaki **FAB** (WhatsApp butonu) scroll 260 px'ı geçince görünür ve doğrudan
`wa.me/<numara>`'ya gider (sepet mesajı içermez).

---

## 3.5 Ürün detay modalı

Menü/vitrin kartına (adına veya görseline) tıklayınca `#item-modal` açılır. Modal HTML'de
durmaz, `initModal()` tarafından JS ile oluşturulur:

| Bölge                                                    | İçerik                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| `#modal-art`                                             | Ürün fotoğrafı, yoksa SVG illüstrasyon                       |
| `#modal-cat` / `#modal-title` / `#modal-desc`            | Kategori, ad, açıklama                                       |
| `#modal-tags`                                            | Etiketler                                                    |
| `#modal-price` + `#modal-qty` (`−` / `+`) + `#modal-add` | Fiyat, adet seçimi, sepete ekleme                            |
| `#modal-note`                                            | Kategori notu + "Fiyatlara KDV dahildir."                    |
| `#modal-pairs`                                           | "Yan ürün önerileri" (Yan Ürünler kategorisinden en fazla 3) |
| `.modal-actions`                                         | Telefonla sipariş / WhatsApp ile yaz                         |

Kapanma: `×` düğmesi, arka plana tıklama veya **Esc**. Modal `role="dialog"`,
`aria-modal="true"` ve `aria-labelledby="modal-title"` taşır; açılınca kapatma
düğmesine odaklanır.

## 3.6 Bildirim (toast)

Ürün eklenince sol altta kısa bildirim çıkar: `“Tandır Dürüm sepete eklendi”`.
Toast, `prefers-reduced-motion` açık olsa bile çalışır (sadece animasyon kısalır).

---

## 3.7 Kenar durumlar

| Durum                                  | Davranış                                                       |
| -------------------------------------- | -------------------------------------------------------------- |
| Aynı ürün iki kez eklenir              | Tek satır, adet artar                                          |
| Ürün adı `MENU`'da değişir             | Sepette eski ad kalabilir; temizlemek için rozeti sıfırla      |
| Fiyat değişir, sepette ürün duruyordur | Sepette **eski fiyat** yazılıdır; tekrar ekleyince güncellenir |
| `#order` elementı yok                  | `renderOrder()` erken döner, hata vermez                       |
| WhatsApp numarası boş                  | Link bozuk olur → `SITE.whatsapp` dolu olmalı                  |

---

## 3.8 Sepeti test etme (konsol)

```js
// mevcut sepeti gör
JSON.parse(localStorage.getItem("tandir-cart"));

// sepeti doldur
localStorage.setItem(
  "tandir-cart",
  JSON.stringify([
    { name: "Tandır Dürüm", price: 285, qty: 2 },
    { name: "Ayran", price: 45, qty: 1 },
  ]),
);
```

Sayfayı yenilediğinde rozette **3** görülmeli.
