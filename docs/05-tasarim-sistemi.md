# 5 · Tasarım sistemi

## 5.1 Renk tokenları

`css/styles.css` içinde `:root`'ta tanımlıdır. Kural: **hex yazma, token kullan.**

| Token                      | Gündüz                       | Gece      | Kullanım                            |
| -------------------------- | ---------------------------- | --------- | ----------------------------------- |
| `--ink`                    | `#14110d`                    | `#0d0b08` | Üst bar, footer, sepet paneli       |
| `--ink-2`                  | `#1d1712`                    | `#16130f` | Koyu yüzeyler, şerit zemin          |
| `--ink-3`                  | `#2a2219`                    | `#221c15` | Üçüncül yüzey                       |
| `--cream`                  | `#f6f0e4`                    | `#12100c` | Sayfa zemini                        |
| `--paper`                  | `#fffaf3`                    | `#1b1611` | Kartlar, menü satırları             |
| `--text`                   | `#14110d`                    | `#f2ead9` | Metin (butonlar dahil)              |
| `--on-dark`                | `#f6f0e4`                    | `#f6f0e4` | Koyu zemin üstündeki metin          |
| `--amber`                  | `#e9b255`                    | `#e9b255` | Marka rengi: CTA, aktif nav, rozet  |
| `--amber-deep`             | `#c78429`                    | `#f0c079` | Hover, kategori çizgisi, ilk etiket |
| `--amber-soft`             | `#f3c470`                    | `#f5d091` | Yumuşak vurgular                    |
| `--red`                    | `#a83a2c`                    | —         | "Kapalı" durumu                     |
| `--green`                  | `#6fbf72`                    | —         | "Eklendi" durumu                    |
| `--olive`                  | `#6b7a5b`                    | —         | İkincil etiketler                   |
| `--muted`                  | `#8d8478`                    | `#9a9084` | Açıklama/gri metin                  |
| `--line`                   | `#e2d7c6`                    | `#2c241b` | Kenarlık, ayırıcı                   |
| `--radius`                 | `16px`                       | —         | Kart köşeleri                       |
| `--max`                    | `1120px`                     | —         | İçerik genişliği                    |
| `--ease`                   | `cubic-bezier(.2,.7,.2,1)`   | —         | Tüm geçişler                        |
| `--font-display`           | `Fraunces, Georgia, Times`   | —         | Başlıklar, fiyat, logo              |
| `--font-body`              | `Inter, Segoe UI, system-ui` | —         | Gövde, UI, butonlar                 |
| `--shadow-sm` / `--shadow` | hafif                        | yoğun     | Kart gölgeleri                      |

---

## 5.2 Tipografi

| Kullanım               | Font                 | Fallback            |
| ---------------------- | -------------------- | ------------------- |
| Başlıklar, fiyat, logo | **Fraunces** (serif) | Georgia, Times      |
| Gövde, UI, butonlar    | **Inter**            | Segoe UI, system-ui |

İki yazı tipi de `assets/fonts/` içinde **self-hosted**'dır (`css/fonts.css`);
sayfa hiçbir üçüncü tarafa font isteği atmaz. woff2 yüklenemezse fallback devreye girer.
Yenilemek için: `npm run fonts` (`scripts/prepare-fonts.mjs`).

---

## 5.3 Layout

- `.wrap` → `max-width: var(--max)`, padding 20 px.
- Hero: iki kolon (metin + fotoğraf), 860 px altında tek kolon.
- Vitrin ve menü: **yatay şerit** (`display:flex; overflow-x:auto; scroll-snap-type:x mandatory`).
- Kartlar: `--paper` zemin, `--line` kenarlık, `--radius` köşe, hover'da 2–4 px yükselme.

Kırılımlar:

| Genişlik | Ne değişir                                                |
| -------- | --------------------------------------------------------- |
| ≤ 900 px | Saat paneli / iletişim tek kolon                          |
| ≤ 860 px | Hero tek kolon, fotoğraf küçülür                          |
| ≤ 640 px | Hamburger menü, sepet tam genişlik                        |
| ≤ 560 px | Ürün modalı daralır (görsel yüksekliği ve başlık küçülür) |

---

## 5.4 Bileşen envanteri

| Bileşen       | Sınıflar                                                                                                                               | Not                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Üst bar       | `.topbar`, `.topbar-inner`, `.scroll-progress`                                                                                         | `is-scrolled` scroll'da koyulaşır              |
| Logo          | `.logo`, `.logo-mark`, `.logo-word`                                                                                                    | `sway` animasyonu                              |
| Navigasyon    | `.nav-links`, `.burger`                                                                                                                | Mobilde `is-open`                              |
| Tema düğmesi  | `.theme-toggle`, `.icon-moon`, `.icon-sun`                                                                                             | Simge CSS ile değişir                          |
| Sepet düğmesi | `.cart-btn`, `.cart-count`                                                                                                             | Rozet `is-pop` ile güncellenir                 |
| Butonlar      | `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`                                                                                   | Renkler token'dan                              |
| Hero          | `.hero`, `.hero-copy`, `.hero-art`, `.hero-photo`, `.embers`, `.hero-badge`                                                            | Ken Burns + köz                                |
| Şerit         | `.ticker`, `.ticker-track`, `.ticker-close`                                                                                            | × ile kapatılır                                |
| İstatistik    | `.stats`, `.stat`                                                                                                                      | `data-count` sayacı                            |
| Vitrin        | `.preview`, `.preview-card`, `.mi-art`                                                                                                 | 6 kart, yana kaydırma                          |
| Saatler       | `.hours-panel`, `.hours-today`, `.hours-table`, `.hours-notes`                                                                         | `tr.is-today` vurgusu                          |
| Menü          | `.menu-toolbar`, `.chips`, `.chip`, `.menu-group`, `.menu-list`, `.menu-item`                                                          | `.mi-main`, `.mi-foot`, `.mi-price`, `.mi-add` |
| Sepet paneli  | `.order`, `.order-close`, `.order-items`, `.qty`, `.order-total`, `.order-send`, `.order-clear`                                        | Sabit sağ alt                                  |
| Bildirim      | `.toast`                                                                                                                               | Sol alt                                        |
| Ürün modalı   | `.modal`, `.modal-backdrop`, `.modal-card`, `.modal-art`, `.modal-body`, `.modal-foot`, `.modal-qty`, `.modal-pairs`, `.modal-actions` | JS ile oluşturulur, Esc ile kapanır            |
| WhatsApp FAB  | `.fab`                                                                                                                                 | Scroll 260 px sonrası görünür                  |
| Footer        | `.footer-inner`, `.footer-brand`                                                                                                       |                                                |

---

## 5.5 Animasyonlar

| Ad                | Tetik                                   | Süre                      |
| ----------------- | --------------------------------------- | ------------------------- |
| Scroll reveal     | `IntersectionObserver` (threshold 0.12) | `--d` index'iyle kademeli |
| Ken Burns         | Hero fotoğrafı                          | 22 s döngü                |
| Köz parçacıkları  | `.embers i`                             | 5 nokta, farklı gecikme   |
| Marquee           | `.ticker-track`                         | 34 s (hover 16 s)         |
| Sayaç             | `data-count`                            | 900 ms, kübik ease-out    |
| Menü kartı girişi | `riseIn`                                | `--d × 50 ms` gecikme     |
| Sepet rozeti      | `popIn`                                 | 0.3 s                     |
| Kaydırma ipucu    | `nudge`                                 | 2.4 s döngü               |

`prefers-reduced-motion: reduce` durumunda: animasyonlar kapanır, reveal öğleri
doğrudan görünür, sayaçlar anında hedef değere ulaşır, yumuşak kaydırma devre dışı kalır.

---

## 5.6 Yeni stil eklerken

1. Token varsa onu kullan (`var(--amber)`), hex yazma.
2. Koyu tema için `html[data-theme="dark"]` override'ı gerekip gerekmediğini kontrol et.
3. `prefers-reduced-motion` davranışını düşün.
4. Mobil kırılımda (`640 px`) nasıl göründüğüne bak.
