# Katkı rehberi

Bu proje **MIT lisanslı, açık bir şablon**. Forkla, değiştir, kendi dükkanına uyarla,
istersen geri katkı ver.

## Katkı biçimleri

1. **Hata raporu / öneri** → GitHub Issues
2. **Düzeltme / yeni özellik** → Pull Request
3. **İyi bir örnek site** → README'ye "Kullananlar" listesi eklemek (PR)

## PR kuralları

- Commit'ler [Conventional Commits](https://www.conventionalcommits.org/) formatında:
  `feat:`, `fix:`, `docs:`, `chore:`, `style:`
- Bir commit = bir mantıksal değişiklik.
- Body'de **neden** değiştiğini yaz.
- Davranış değişiyorsa ilgili `docs/` dosyasını da güncelle.
- Görsel değişiyorsa ekran görüntüsü eklemesi iyi olur.

## Kod tarzı

- 2 boşluk girinti
- Türkçe yorum, İngilizce değişken adı karışımı kabul edilir (mevcut tarz bu)
- Renk hex'leri yerine CSS token'ları (`var(--amber)`)
- Gereksiz dependency **eklemeyin** — projenin temel iddiası sıfır bağımlılık.
  Site çalışırken hiçbir bağımlılık yok; `package.json` yalnızca geliştirme araçları
  (`scripts/`, `tests/`) içindir.

## Test

```bash
python3 -m http.server 8000
npm test          # node tests/security-tests.js
node --check js/site.js js/content.js
```

Kontrol listesi:

- [ ] Menü render oluyor, arama çalışıyor
- [ ] Sepete ekle → WhatsApp linki doğru
- [ ] Gece/gündüz düğmesi çalışıyor
- [ ] Mobilde (500 px) üst bar taşmıyor
- [ ] `node --check js/site.js js/content.js` hatasız
- [ ] `npm test` (`tests/security-tests.js`) tüm testleri geçiyor

## Yeni özellik eklerken

- Sıfır bağımlılık ilkesini koru.
- Erişilebilirliği düşün (`aria-label`, klavye erişimi).
- `prefers-reduced-motion` durumunda animasyon kapansın.
- Tema (gece/gündüz) iki tarafta da okunur olsun.
