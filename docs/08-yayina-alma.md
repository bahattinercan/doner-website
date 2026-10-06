# 8 · Yayına alma

## 8.1 Host seçimi

| Host | Komut | Not |
|---|---|---|
| **Vercel** | `vercel deploy --prod --yes` | En hızlı; otomatik HTTPS |
| **Netlify** | `netlify deploy --prod --dir .` | Sürdürülebilir, deploy logu var |
| **Cloudflare Pages** | Repo bağla → build: **yok** → çıktı: kök | Ücretsiz, hızlı |
| **GitHub Pages** | Settings → Pages → `main` / root | Zaten repo GitHub'da |
| **Kendi sunucu** | `python3 -m http.server 8000` / nginx | En kontrolcü |

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

- [ ] `SITE.phone`, `SITE.whatsapp`, `SITE.address` gerçek
- [ ] `doner-photo.jpg` kendi fotoğrafın
- [ ] Ürünlerde `img` alanı dolduruldu (gerçek fotoğraflar)
- [ ] `og:image` tam domain: `https://siteniz.com/docs/preview.jpg`
- [ ] `og:url` eklendi
- [ ] JSON-LD güncellendi (`openingHours`, `geo`, `image`)
- [ ] Harita iframe'i doğru adresi gösteriyor
- [ ] `docs/preview.jpg` güncel ekran görüntüsü
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

(GDPR/KVKK dostu, çerez banner'ı gerektirmez.)
