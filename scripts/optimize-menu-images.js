/*
 * Menü fotoğraflarını küçültür: 640 px genişlik, progressive JPEG, q72.
 * Gereksinim: npm i sharp   (yalnızca geliştirme aracı; site bağımlılığı değil)
 * Çalıştırma:  node scripts/optimize-menu-images.js   (veya: npm run images)
 * Orijinal dosyalar git'te duruyor; geri almak için: git checkout assets/menu
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "..", "assets", "menu");
const WIDTH = 640;
const QUALITY = 72;

async function main() {
  const files = fs.readdirSync(DIR).filter((f) => f.toLowerCase().endsWith(".jpg"));
  let before = 0;
  let after = 0;

  for (const file of files) {
    const full = path.join(DIR, file);
    const sizeBefore = fs.statSync(full).size;
    before += sizeBefore;

    await sharp(full)
      .resize({ width: WIDTH })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(full + ".tmp");

    fs.renameSync(full + ".tmp", full);
    const sizeAfter = fs.statSync(full).size;
    after += sizeAfter;
    console.log(`${file}: ${(sizeBefore / 1024).toFixed(1)} KB -> ${(sizeAfter / 1024).toFixed(1)} KB`);
  }

  console.log(
    `\nToplam: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB ` +
    `(${(100 - (after / before) * 100).toFixed(1)}% azalma)`
  );
}

main().catch((err) => {
  console.error("Hata:", err.message);
  process.exit(1);
});
