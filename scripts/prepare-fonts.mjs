import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const FONT_DIR = path.join(ROOT, "assets", "fonts");
const CSS_FILE = path.join(ROOT, "css", "fonts.css");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
const url = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600&display=swap";

fs.mkdirSync(FONT_DIR, { recursive: true });

const css = await (await fetch(url, { headers: { "User-Agent": UA } })).text();

// Yalnızca latin ve latin-ext blokları (Türkçe karakterler latin-ext'te).
const blocks = css.split("/* ").filter((b) => /^(latin|latin-ext) \*\//.test(b.trim()));
const out = [];
let count = 0;

for (const raw of blocks) {
  const subset = raw.trim().split(" */")[0].trim();
  const family = (raw.match(/font-family: '([^']+)'/) || [])[1];
  const weight = (raw.match(/font-weight: (\d+)/) || [])[1];
  const src = (raw.match(/src: url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/) || [])[1];
  if (!family || !weight || !src) continue;

  const fname = `${family.toLowerCase()}-${weight}-${subset.replace("-", "")}.woff2`;
  const res = await fetch(src, { headers: { "User-Agent": UA } });
  if (!res.ok) { console.log("BAŞARISIZ", src, res.status); continue; }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(FONT_DIR, fname), buf);
  count++;
  out.push(
    `@font-face {\n  font-family: '${family}';\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('../assets/fonts/${fname}') format('woff2');\n}`
  );
}

fs.writeFileSync(
  CSS_FILE,
  "/* Self-hosted yazı tipleri (Google Fonts, OFL lisansı) — üçüncü taraf isteği yok.\n   Üretim: scripts/prepare-fonts.mjs ile yenilenebilir. */\n" + out.join("\n\n") + "\n"
);
console.log("indirilen woff2:", count);
