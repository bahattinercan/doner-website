# 8 · Yayına alma

## 8.1 Host seçimi

| Host                 | Komut                                    | Not                             |
| -------------------- | ---------------------------------------- | ------------------------------- |
| **Vercel**           | `vercel deploy --prod --yes`             | En hızlı; otomatik HTTPS        |
| **Netlify**          | `netlify deploy --prod --dir .`          | Sürdürülebilir, deploy logu var |
| **Cloudflare Pages** | Repo bağla → build: **yok** → çıktı: kök | Ücretsiz, hızlı                 |
| **GitHub Pages**     | Settings → Pages → `main` / root         | Zaten repo GitHub'da            |
| **Kendi sunucu**     | `python3 -m http.server 8000` / nginx    | En kontrolcü                    |

Build adımı **yoktur**: dosyalar olduğu gibi servis edilir.

---

## 8.2 GitHub Pages örneği

```bash
git push origin main
# GitHub → Settings → Pages → Source: main branch / root → Save
# https://bahattinercan.github.io/doner-website/
```

---

## 8.3 Yayına almadan önce son kontroller

- [ ] `SITE.phone`, `SITE.whatsapp`, `SITE.address` gerçek — varsayılan `+90 555 555 55 55`
      ve `ornek@example.com` örnek değerlerdir; olduğu gibi yayına alırsan ziyaretçiler
      tanımadıkları bir numaraya yönlendirilir
- [ ] Hero görseli kendi fotoğrafın (varsayılan: örnek `assets/doner-photo.jpg`)
- [ ] Ürünlerde `img` alanı dolduruldu (gerçek fotoğraflar)
- [ ] `og:image` tam domain: `https://siteniz.com/assets/preview.jpg`
- [ ] `og:url` eklendi
- [ ] JSON-LD güncellendi (`openingHours`, `geo`, `image`)
- [ ] Harita iframe'i doğru adresi gösteriyor
- [ ] `assets/preview.jpg` güncel ekran görüntüsü
- [ ] Mobilde (500 px) üst bar taşmıyor
- [ ] Gece modunda tüm buton yazıları okunuyor

---

## 8.4 Domain & HTTPS

- Vercel/Netlify/Cloudflare HTTPS'i otomatik verir.
- Özel domain: DNS'te CNAME → host'un verdiği ad.
- `sitemap.xml` ve `robots.txt` eklemek faydalıdır:

```
# robots.txt
User-agent: *
Allow: /
```

---

## 8.5 Cache / güncelleme

Statik host'lar dosyaları cache'ler. Fiyat güncellediğinde görünmüyorsa:

- Vercel/Netlify: yeni deploy otomatik tazeleme yapar.
- Kendi sunucunda: `Cache-Control: max-age=60` gibi kısa bir TTL ver.
- Test: `Ctrl+Shift+R` (sert yenileme).

---

## 8.6 İzleme

Basit bir ziyaret sayacı istenmiyorsa analytics gerekmez; istersen:

```html
<script defer src="https://plausible.io/js/script.js" data-domain="siteniz.com"></script>
```

(GDPR/KVKK dostu, çerez banner'ı gerektirmez.) **Dikkat:** CSP `script-src 'self'` olduğu için
böyle bir script eklersen CSP'ye `https://plausible.io`'u da eklemen gerekir; yoksa
script yüklenmez.

---

## 8.7 Güvenlik başlıkları

Statik sitede de enjekte edilmiş içerik / iframe istismarı riski vardır. Site şu
katmanlarla korunuyor:

| Katman                | Nerede                                                                            |
| --------------------- | --------------------------------------------------------------------------------- |
| HTML kaçışı (`esc()`) | `site.js` — tüm `innerHTML` dolguları (sepet, menü, modal, arama, şerit, saatler) |
| Sepet doğrulaması     | `loadOrder()` — `name` string, `price` sayı, `qty` 1–20                           |
| href şeması           | `safeHref()` — yalnızca `http(s):`, `tel:`, `mailto:`                             |
| CSP                   | Her HTML'de `<meta http-equiv="Content-Security-Policy">`                         |
| Referrer politikası   | `<meta name="referrer">` + host header'ı                                          |
| Harita rızası         | iframe `src` yok; `data-src` üzerinden rıza sonrası yüklenir                      |

GitHub Pages özel header kabul etmediği için CSP **meta etiketiyle** veriliyor
(`frame-ancestors` meta'da çalışmaz). Vercel'e geçersen `vercel.json`, Netlify'ye
geçersen `netlify.toml`, Cloudflare Pages için `_headers` hazır: `X-Content-Type-Options:
nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Strict-Transport-Security`,
`Permissions-Policy` ve header olarak CSP oradan geliyor.

> Yazı tipleri self-hosted olduğu için CSP'de `fonts.googleapis.com` / `fonts.gstatic.com`
> iznine gerek yok; `vercel.json`, `netlify.toml` ve `_headers` buna göre temizlendi.

Kendi sunucunda (nginx) eşdeğer:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https:; frame-src https://www.google.com https://maps.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Permissions-Policy "geolocation=(), camera=(), microphone=()" always;
```
