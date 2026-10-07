/* docs/security-tests.js — XSS/kaçış testleri
   Gerçek DOM yok: site.js, küçük bir DOM shim'i içinde çalıştırılır ve
   üretilen HTML çıktılar kontrol edilir.
   Çalıştırma: node docs/security-tests.js
*/
const fs = require("node:fs");

const content = fs.readFileSync("content.js", "utf8");
const site = fs.readFileSync("site.js", "utf8");

const shim = `
  const store = {};
  const localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = v; },
  };
  const els = {};
  const makeEl = (id) => ({
    id,
    innerHTML: "",
    textContent: "",
    hidden: true,
    dataset: {},
    style: { setProperty() {}, getPropertyValue: () => "" },
    classList: { add() {}, remove() {}, contains: () => false },
    querySelector: () => makeEl("sub"),
    querySelectorAll: () => [],
    addEventListener() {},
    setAttribute() {},
    focus() {},
    href: "",
    src: "",
  });
  const document = {
    getElementById: (id) => (els[id] = els[id] || makeEl(id)),
    querySelector: (s) => makeEl(s),
    querySelectorAll: () => [],
    createElement: () => makeEl("created"),
    body: { appendChild() {}, prepend() {} },
    addEventListener() {},
    documentElement: { dataset: {}, classList: { add() {} }, scrollHeight: 0 },
  };
  const window = { top: null, self: null, scrollY: 0, matchMedia: () => ({ matches: false, addEventListener() {} }) };
  const performance = { now: () => 0 };
  const IntersectionObserver = class { observe() {} unobserve() {} };
  const requestAnimationFrame = () => {};
  const setTimeout = () => 0;
`;

const tests = `
  let failures = 0;
  const check = (name, ok) => {
    console.log((ok ? "PASS" : "FAIL") + " · " + name);
    if (!ok) failures++;
  };
  const PAYLOAD = 'X" onerror="alert(1)" src="y';

  /* 1) Menü render kaçışı */
  MENU[0].items[0].name = PAYLOAD;
  MENU[0].items[0].desc = "<script>alert(1)</script>";
  MENU[0].note = PAYLOAD;
  renderMenu("menu");
  const menuHtml = els.menu.innerHTML;
  check("ürün adı attribute kırması engelleniyor", !menuHtml.includes('onerror="alert(1)"'));
  check("açıklama etiket enjeksiyonu engelleniyor", !menuHtml.includes("<script>alert(1)</script>"));
  check("kategori notu kaçışlı", menuHtml.includes("&quot;"));

  /* 2) Arama sonucu kaçışı */
  renderMenu("menu", PAYLOAD);
  check("arama boş sonucu kaçışlı", !els.menu.innerHTML.includes('onerror="alert(1)"'));

  /* 3) Sepet normalizasyonu (localStorage kaynaklı) */
  localStorage.setItem("tandir-cart", JSON.stringify([
    { name: PAYLOAD, price: "1e999", qty: 999999 },
    { name: "Geçerli Ürün", price: 100, qty: 3 },
    null,
    { name: 123, price: 50 },
    { name: "Fiyatsız", price: 0 },
  ]));
  const cart = loadOrder();
  check("geçersiz kayıtlar eleniyor", cart.length === 2);
  check("qty MAX_QTY'ye sıkıştırılıyor", cart[0].qty === 20);
  order.length = 0;
  order.push(...cart);
  renderOrder();
  check("sepet render kaçışlı", !els.order.innerHTML.includes('onerror="alert(1)"'));

  /* 4) href şeması */
  check("javascript: href reddediliyor", safeHref("javascript:alert(1)") === "#");
  check("data: href reddediliyor", safeHref("data:text/html,<script>alert(1)</script>") === "#");
  check("tel: kabul ediliyor", safeHref("tel:+905555555555") === "tel:+905555555555");

  /* 5) görsel kaynağı doğrulaması */
  check("javascript: img reddediliyor", !artFor({ img: "javascript:alert(1)", name: "test" }).includes("<img"));
  check("normal img kabul ediliyor", artFor({ img: "assets/menu/kunefe-generated.jpg", name: "Künefe" }).includes("<img"));

  /* 6) WhatsApp numarası */
  check("wa numarası yalnızca rakam", waNumber() === "905555555555");

  /* 7) harita rıza kapısı */
  check("rıza yokken harita yüklenmiyor", (() => { const m = document.getElementById("map"); loadThirdParty(); return !m.src; })());

  console.log(failures ? "\\nTESTLER BAŞARISIZ (" + failures + ")" : "\\nTüm testler geçti");
  process.exitCode = failures ? 1 : 0;
`;

new Function(shim + "\n" + content + "\n" + site + "\n" + tests)();
