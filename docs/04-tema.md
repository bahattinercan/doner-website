# 4 · Tema (gece / gündüz)

## 4.1 Tema nasıl belirlenir?

Sıra şu şekilde işler (`initTheme()`):

```
1. localStorage["tandir-theme"] var mı?  → onu kullan ("light" | "dark")
2. yoksa → prefers-color-scheme: dark ? "dark" : "light"
3. kullanıcı düğmeye basarsa → seçim uygulanır ve localStorage'a yazılır
4. sistem tercihi değişirse → yalnızca kullanıcı HERHANGİ bir seçim yapmadıysa takip edilir
```

Yani **elle yapılan seçim sistem ayarını yener**.

---

## 4.2 CSS katmanları

```css
:root { /* gündüz tokenları }                                  ← varsayılan
@media (prefers-color-scheme: dark) {
  html:not([data-theme]) { … }                                 ← sistem tercihi
}
html[data-theme="dark"] { … }                                  ← kesin seçim (en güçlü)
```

`html:not([data-theme])` şartı önemlidir: kullanıcı bir seçim yaptıysa
sistem tercihi devreye girmez.

---

## 4.3 Gece değişen tokenlar

| Token          | Gündüz    | Gece       |
| -------------- | --------- | ---------- |
| `--ink`        | `#14110d` | `#0d0b08`  |
| `--ink-2`      | `#1d1712` | `#16130f`  |
| `--ink-3`      | `#2a2219` | `#221c15`  |
| `--cream`      | `#f6f0e4` | `#12100c`  |
| `--paper`      | `#fffaf3` | `#1b1611`  |
| `--text`       | `#14110d` | `#f2ead9`  |
| `--amber-deep` | `#c78429` | `#f0c079`  |
| `--muted`      | `#8d8478` | `#9a9084`  |
| `--line`       | `#e2d7c6` | `#2c241b`  |
| `--shadow*`    | hafif     | koyu/yoğun |

`--amber`, `--red`, `--green`, `--olive` iki temada da aynıdır.

> **Buton renkleri:** `.mi-add`, `.chip` gibi öğeler `color: var(--text)` kullanır.
> Eskiden tanımsız kaldıkları için sistem `ButtonText` rengini alıyor ve koyu temada
> kağıt üstünde görünmez oluyordu. Yeni bir buton eklerken **renk vermeyi unutma**.

---

## 4.4 Düğmenin davranışı

```html
<button class="theme-toggle" id="theme-toggle" aria-label="Gece moduna geç">
  <svg class="icon icon-moon">…</svg>
  <svg class="icon icon-sun">…</svg>
</button>
```

- Gündüz: ay simgesi görünür (tıkla → geceye geç).
- Gece: güneş simgesi görünür (tıkla → gündüze geç).
- Hangi simgenin görüneceğine **CSS** karar verir; JS sadece `aria-label`'ı günceller.

---

## 4.5 Harita iframe'i

Koyu temada Google Maps iframe'i karartılır:

```css
html[data-theme="dark"] .map {
  filter: invert(1) hue-rotate(180deg) brightness(0.95) saturate(0.75);
}
```

Doğal koyu harita istersen bu kuralı sil.

---

## 4.6 Test etme

Tarayıcıda konsol:

```js
localStorage.setItem("tandir-theme", "dark"); // zorla gece
localStorage.removeItem("tandir-theme"); // sistem tercihine dön
document.documentElement.dataset.theme; // şu anki tema
```

Headless Chrome ile gündüz ekran görüntüsü almak için:

```bash
chrome --headless=new --screenshot=shot.png --window-size=1400,900 index.html
```

Headless Chrome, işletim sisteminin tema ayarını okur; koyu tema açık bir Windows'ta
görüntü koyu çıkar. Belirli bir temayı test etmek için sayfaya geçici olarak
`<script>localStorage.setItem("tandir-theme","light")</script>` eklenmiş bir kopya kullan.
