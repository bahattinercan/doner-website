/* ============================================================
   TANDIR DÖNER — davranış: sepet, arama, tema, animasyon, render
   İçerik verisi content.js içinde (SITE + MENU).
   ============================================================ */

/* ---------- yardımcı ---------- */

const TL = (n) => n.toLocaleString("tr-TR") + " ₺";

/* HTML'e gömülen dinamik metinlerin kaçışı. Tüm innerHTML sink'leri bu
   helper'tan geçmek zorunda: içerik (content.js) veya localStorage (sepet)
   tırnak/etiket kırarak handler enjekte edemesin.
   Not: tarayıcı attribute değerlerindeki entity'leri geri çözer, yani
   data-item round-trip'i bozulmaz. */
const esc = (value) =>
  String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/* localStorage her ortamda erişilebilir değildir (gizli mod, gömülü iframe,
   tarayıcı kısıtı). Tüm okuma/yazmalar bu iki kapıdan geçer: erişilemezse
   tercih yalnızca o sayfa için geçerli kalır ve site çalışmaya devam eder. */
const lsGet = (key) => {
  try { return localStorage.getItem(key); } catch (err) { return null; }
};
const lsSet = (key, value) => {
  try { localStorage.setItem(key, value); } catch (err) { /* sessiz: gizli mod */ }
};

/* href'lere yalnızca http(s)/tel/mailto kabul edilir — javascript: gibi
   şemalar content.js'i düzenleyen biri için XSS kapısıdır. */
const safeHref = (href) => {
  const s = String(href || "").trim();
  return /^(https?:|tel:|mailto:)/i.test(s) ? s : "#";
};

const waNumber = () => String(SITE.whatsapp || "").replace(/\D/g, "");
const BASKET_ICON = `<svg class="icon icon-basket" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14M6.5 8l2 9.5h7l2-9.5M9 4.5v3.5M15 4.5v3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CLOSE_ICON = `<svg class="icon icon-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

// Ürün adına göre illüstrasyon seçilir. Gerçek fotoğraf kullanmak için ürüne img alanı eklenir.
// Ürüne img alanı eklendiğinde (ör. "assets/menu/kunefe-generated.jpg") SVG yerine fotoğraf kullanılır.
const ART_SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true">
  <!-- Tandır Döner menü ikonları — düz (flat) illüstrasyonlar.
     Gerçek fotoğraf kullanmak için MENU içindeki ürüne img alanı eklenir
     (ör. img: "assets/menu/kunefe-generated.jpg"); SVG otomatik olarak devre dışı kalır. -->

  <symbol id="art-durum" viewBox="0 0 64 48">
    <g transform="rotate(-16 32 24)">
      <rect x="12" y="14" width="40" height="20" rx="10" fill="#e9b255"/>
      <path d="M22 14v20M34 14v20" stroke="#b9853f" stroke-width="2"/>
    </g>
    <circle cx="26" cy="20" r="2.4" fill="#6b7a5b"/>
    <circle cx="36" cy="26" r="2.4" fill="#b4534a"/>
  </symbol>

  <symbol id="art-porsiyon" viewBox="0 0 64 48">
    <ellipse cx="32" cy="26" rx="25" ry="15" fill="#f4ead9"/>
    <ellipse cx="32" cy="26" rx="18" ry="10" fill="#e9b255"/>
    <path d="M17 22h30M17 26h30M17 30h30" stroke="#b9853f" stroke-width="2"/>
  </symbol>

  <symbol id="art-sandvic" viewBox="0 0 64 48">
    <path d="M10 14h44l-6 22H16z" fill="#e9b255"/>
    <path d="M16 22h32M16 28h32" stroke="#b9853f" stroke-width="2"/>
    <circle cx="24" cy="18" r="2" fill="#6b7a5b"/>
  </symbol>

  <symbol id="art-pide" viewBox="0 0 64 48">
    <path d="M10 16h44l-6 16H16z" fill="#e9b255"/>
    <path d="M16 21h32l-4 9H20z" fill="#f4ead9"/>
    <circle cx="26" cy="24" r="2.2" fill="#b4534a"/>
    <circle cx="36" cy="22" r="2.2" fill="#6b7a5b"/>
  </symbol>

  <symbol id="art-lahmacun" viewBox="0 0 64 48">
    <circle cx="32" cy="24" r="20" fill="#e9b255"/>
    <circle cx="32" cy="24" r="15" fill="#b4534a"/>
    <circle cx="26" cy="20" r="2" fill="#6b7a5b"/>
    <circle cx="38" cy="28" r="2" fill="#6b7a5b"/>
    <circle cx="34" cy="18" r="1.6" fill="#f4ead9"/>
  </symbol>

  <symbol id="art-borek" viewBox="0 0 64 48">
    <path d="M12 34 32 12l20 22z" fill="#e9b255"/>
    <path d="M20 30l12-14 12 14" stroke="#b9853f" stroke-width="2" fill="none"/>
    <circle cx="32" cy="26" r="2.4" fill="#f4ead9"/>
  </symbol>

  <symbol id="art-corba" viewBox="0 0 64 48">
    <path d="M12 22a20 20 0 0 0 40 0z" fill="#e9b255"/>
    <path d="M12 22h40" stroke="#b9853f" stroke-width="2"/>
    <path d="M22 12c2-4 4-4 6-8M34 12c2-4 4-4 6-8" stroke="#6b7a5b" stroke-width="2" fill="none"/>
    <circle cx="26" cy="28" r="2" fill="#b4534a"/>
  </symbol>

  <symbol id="art-salata" viewBox="0 0 64 48">
    <path d="M12 24a20 20 0 0 0 40 0z" fill="#f4ead9"/>
    <path d="M16 20c6-8 14-8 20-4 6-6 12-2 12 4" stroke="#6b7a5b" stroke-width="2.5" fill="none"/>
    <circle cx="24" cy="26" r="3" fill="#b4534a"/>
    <circle cx="36" cy="28" r="3" fill="#b4534a"/>
  </symbol>

  <symbol id="art-humus" viewBox="0 0 64 48">
    <path d="M14 22a18 18 0 0 0 36 0z" fill="#f4ead9"/>
    <path d="M20 20c4-4 12-4 16 0" stroke="#e9b255" stroke-width="3" fill="none"/>
    <circle cx="32" cy="26" r="2.5" fill="#6b7a5b"/>
  </symbol>

  <symbol id="art-biber" viewBox="0 0 64 48">
    <path d="M14 12c10 2 16 10 14 22-8 4-16-6-14-22z" fill="#b4534a"/>
    <path d="M36 14c10 2 14 10 12 20-8 4-14-6-12-20z" fill="#6b7a5b"/>
    <path d="M14 12l4-4M36 14l4-4" stroke="#6b7a5b" stroke-width="2"/>
  </symbol>

  <symbol id="art-patates" viewBox="0 0 64 48">
    <path d="M14 18h36l-4 18H18z" fill="#e9b255"/>
    <path d="M20 18v18M28 18v18M36 18v18" stroke="#b9853f" stroke-width="2"/>
    <path d="M12 14h40" stroke="#b9853f" stroke-width="2"/>
  </symbol>

  <symbol id="art-sogan" viewBox="0 0 64 48">
    <circle cx="22" cy="24" r="9" fill="none" stroke="#e9b255" stroke-width="4"/>
    <circle cx="42" cy="20" r="7" fill="none" stroke="#b9853f" stroke-width="4"/>
    <circle cx="36" cy="32" r="6" fill="none" stroke="#6b7a5b" stroke-width="4"/>
  </symbol>

  <symbol id="art-turshu" viewBox="0 0 64 48">
    <rect x="18" y="12" width="28" height="28" rx="6" fill="#f4ead9"/>
    <rect x="22" y="8" width="20" height="6" rx="3" fill="#6b7a5b"/>
    <path d="M24 20c4 2 4 8 0 10M34 18c4 2 4 8 0 10" stroke="#6b7a5b" stroke-width="2.5" fill="none"/>
  </symbol>

  <symbol id="art-pilav" viewBox="0 0 64 48">
    <path d="M12 30c6-14 34-14 40 0z" fill="#e9b255"/>
    <circle cx="24" cy="24" r="2" fill="#f4ead9"/>
    <circle cx="32" cy="22" r="2" fill="#f4ead9"/>
    <circle cx="40" cy="24" r="2" fill="#f4ead9"/>
    <path d="M12 30h40" stroke="#b9853f" stroke-width="2"/>
  </symbol>

  <symbol id="art-lavas" viewBox="0 0 64 48">
    <ellipse cx="32" cy="30" rx="22" ry="6" fill="#e9b255"/>
    <ellipse cx="32" cy="24" rx="20" ry="6" fill="#f4ead9"/>
    <ellipse cx="32" cy="18" rx="18" ry="6" fill="#e9b255"/>
  </symbol>

  <symbol id="art-misir" viewBox="0 0 64 48">
    <path d="M22 10c12 0 18 8 16 20-6 8-16 6-18-4z" fill="#e9b255"/>
    <path d="M24 14h14M24 20h14M24 26h14" stroke="#b9853f" stroke-width="2"/>
    <path d="M22 10c-6 4-8 12-4 18" stroke="#6b7a5b" stroke-width="2.5" fill="none"/>
  </symbol>

  <symbol id="art-kunefe" viewBox="0 0 64 48">
    <path d="M12 30a20 20 0 0 1 40 0z" fill="#e9b255"/>
    <path d="M16 24c8-8 24-8 32 0" stroke="#b9853f" stroke-width="2" fill="none"/>
    <circle cx="24" cy="26" r="2.4" fill="#6b7a5b"/>
    <circle cx="34" cy="24" r="2.4" fill="#6b7a5b"/>
    <circle cx="42" cy="28" r="2.4" fill="#6b7a5b"/>
  </symbol>

  <symbol id="art-baklava" viewBox="0 0 64 48">
    <path d="M12 24 22 12l10 12-10 12z" fill="#e9b255"/>
    <path d="M26 24 36 12l10 12-10 12z" fill="#b9853f"/>
    <path d="M40 24 50 12l10 12-10 12z" fill="#e9b255"/>
    <circle cx="22" cy="24" r="2" fill="#6b7a5b"/>
    <circle cx="36" cy="24" r="2" fill="#6b7a5b"/>
  </symbol>

  <symbol id="art-sutlac" viewBox="0 0 64 48">
    <path d="M18 14h28l-4 22H22z" fill="#f4ead9"/>
    <path d="M22 20h20" stroke="#b4534a" stroke-width="3"/>
    <ellipse cx="32" cy="14" rx="14" ry="4" fill="#f4ead9"/>
  </symbol>

  <symbol id="art-kazandibi" viewBox="0 0 64 48">
    <ellipse cx="32" cy="26" rx="22" ry="12" fill="#f4ead9"/>
    <path d="M14 30c8 6 28 6 36 0" stroke="#b9853f" stroke-width="3" fill="none"/>
    <circle cx="32" cy="22" r="3" fill="#b4534a"/>
  </symbol>

  <symbol id="art-sekerpare" viewBox="0 0 64 48">
    <circle cx="20" cy="26" r="8" fill="#e9b255"/>
    <circle cx="34" cy="22" r="8" fill="#b9853f"/>
    <circle cx="46" cy="28" r="7" fill="#e9b255"/>
    <circle cx="20" cy="22" r="2" fill="#6b7a5b"/>
  </symbol>

  <symbol id="art-ayran" viewBox="0 0 64 48">
    <path d="M22 8h20l-3 32H25z" fill="#f4ead9"/>
    <path d="M22 16h20" stroke="#6b7a5b" stroke-width="2"/>
    <ellipse cx="32" cy="8" rx="10" ry="3" fill="#f4ead9"/>
  </symbol>

  <symbol id="art-salgam" viewBox="0 0 64 48">
    <path d="M22 8h20l-3 32H25z" fill="#b4534a"/>
    <ellipse cx="32" cy="8" rx="10" ry="3" fill="#b4534a"/>
    <path d="M26 20h12" stroke="#f4ead9" stroke-width="2"/>
  </symbol>

  <symbol id="art-limonata" viewBox="0 0 64 48">
    <path d="M22 8h20l-3 32H25z" fill="#e9b255"/>
    <circle cx="42" cy="14" r="6" fill="#f4ead9"/>
    <path d="M36 14h12" stroke="#b9853f" stroke-width="2"/>
  </symbol>

  <symbol id="art-soda" viewBox="0 0 64 48">
    <path d="M28 6h8v8l6 6v18H22V20l6-6z" fill="#6b7a5b"/>
    <rect x="28" y="2" width="8" height="4" rx="2" fill="#e9b255"/>
    <path d="M24 30h16" stroke="#f4ead9" stroke-width="2"/>
  </symbol>

  <symbol id="art-su" viewBox="0 0 64 48">
    <path d="M26 6h12v6l4 6v22H22V18l4-6z" fill="#f4ead9"/>
    <rect x="28" y="2" width="8" height="4" rx="2" fill="#6b7a5b"/>
    <path d="M24 28h16" stroke="#6b7a5b" stroke-width="2"/>
  </symbol>

  <symbol id="art-maden" viewBox="0 0 64 48">
    <path d="M26 6h12v6l4 6v22H22V18l4-6z" fill="#f4ead9"/>
    <circle cx="28" cy="26" r="2" fill="#e9b255"/>
    <circle cx="34" cy="30" r="2" fill="#e9b255"/>
    <circle cx="32" cy="22" r="1.6" fill="#e9b255"/>
  </symbol>

  <symbol id="art-cay" viewBox="0 0 64 48">
    <path d="M24 10h16l-4 26H28z" fill="#b4534a"/>
    <path d="M22 12h20" stroke="#f4ead9" stroke-width="2"/>
    <path d="M20 18c4 4 8 4 12 0" stroke="#e9b255" stroke-width="2" fill="none"/>
  </symbol>

  <symbol id="art-kahve" viewBox="0 0 64 48">
    <path d="M20 16h24v12a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6z" fill="#f4ead9"/>
    <path d="M44 18a6 6 0 0 1 0 10" stroke="#f4ead9" stroke-width="2.5" fill="none"/>
    <ellipse cx="32" cy="38" rx="18" ry="4" fill="#e9b255"/>
    <path d="M26 12c2-4 4-4 6-8M34 12c2-4 4-4 6-8" stroke="#6b7a5b" stroke-width="2" fill="none"/>
  </symbol>
</svg>`;

const ART_KEYS = [
  ["dürüm", "durum"], ["porsiyon", "porsiyon"], ["çeyrek", "porsiyon"],
  ["sandviç", "sandvic"], ["burger", "sandvic"], ["pide", "pide"],
  ["lahmacun", "lahmacun"], ["börek", "borek"], ["çorba", "corba"],
  ["salata", "salata"], ["humus", "humus"], ["haydari", "humus"],
  ["biber", "biber"], ["patates", "patates"], ["soğan", "sogan"],
  ["turşu", "turshu"], ["pilav", "pilav"], ["lavaş", "lavas"],
  ["mısır", "misir"], ["künefe", "kunefe"], ["baklava", "baklava"],
  ["sütlaç", "sutlac"], ["kazandibi", "kazandibi"], ["şekerpare", "sekerpare"],
  ["ayran", "ayran"], ["şalgam", "salgam"], ["limonata", "limonata"],
  ["soda", "soda"], ["maden", "maden"], ["su", "su"], ["çay", "cay"],
  ["kahve", "kahve"],
];

function artFor(item) {
  if (item.img) {
    /* src yalnızca gerçek bir yol/scheme olabilir: javascript:/data: gibi
       değerler content.js'i düzenleyen biri için XSS/veri sızıntısı kapısıdır. */
    const src = String(item.img).trim();
    if (/^(https?:\/\/|\/|\.\/|assets\/|images\/)/i.test(src)) {
      return `<img src="${esc(src)}" alt="${esc(item.name)}" loading="lazy">`;
    }
  }
  const n = item.name.toLowerCase();
  const key = ART_KEYS.find(([w]) => n.includes(w))?.[1] || "porsiyon";
  return `<svg viewBox="0 0 64 48" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#art-${key}"/></svg>`;
}

function injectSprite() {
  if (document.getElementById("menu-art-sprite")) return;
  const wrap = document.createElement("div");
  wrap.id = "menu-art-sprite";
  wrap.style.display = "none";
  wrap.innerHTML = ART_SPRITE;
  document.body.appendChild(wrap);
}
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function isOpenNow() {
  const now = new Date();
  const idx = (now.getDay() + 6) % 7; // Pazartesi = 0
  const h = SITE.hours[idx];
  if (!h) return { open: false, text: "Açılış saati bilgisi bulunmuyor.", day: "", time: "", idx: 0 };
  const [oh, om] = h.open.split(":").map(Number);
  const [ch, cm] = h.close.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const isOpen = cur >= oh * 60 + om && cur < ch * 60 + cm;
  return {
    open: isOpen,
    text: isOpen ? `Şu an açık · ${h.close}'e kadar` : `Kapalı · ${h.open}'te açılıyor`,
    day: h.day,
    time: `${h.open} – ${h.close}`,
    idx,
  };
}

/* ---------- sipariş sepeti (localStorage'da kalır, WhatsApp'a gider) ---------- */

const CART_KEY = "tandir-cart";
const THEME_KEY = "tandir-theme";
const MAX_QTY = 20; // ürün başına maksimum adet

const order = loadOrder();
let orderOpen = false;

function loadOrder() {
  try {
    const raw = lsGet(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    /* Sepet kullanıcı/veri kaynaklı: şekil, adet ve fiyat burada doğrulanır.
       name bir string, price bir sayı, qty 1..MAX_QTY aralığına sıkıştırılır. */
    return parsed
      .filter((o) => o && typeof o.name === "string" && Number(o.price) > 0)
      .slice(0, MENU.length) // sepet en fazla ürün sayısı kadar satır tutabilir
      .map((o) => ({
        name: o.name.slice(0, 80),
        price: Number(o.price),
        qty: Math.min(MAX_QTY, Math.max(1, Math.floor(Number(o.qty)) || 1)),
      }));
  } catch (err) {
    return [];
  }
}

function saveOrder() {
  try {
    lsSet(CART_KEY, JSON.stringify(order));
  } catch (err) {
    /* localStorage kapalıysa sepet sadece bu sayfa için çalışır */
  }
}

function cartCount() {
  return order.reduce((s, o) => s + o.qty, 0);
}

function orderText() {
  const lines = order.map((o) => `${o.qty} × ${o.name} — ${TL(o.price * o.qty)}`);
  const total = order.reduce((s, o) => s + o.price * o.qty, 0);
  return `${SITE.name} sipariş:\n${lines.join("\n")}\nToplam: ${TL(total)}`;
}

function waLink() {
  return `https://wa.me/${waNumber()}?text=${encodeURIComponent(orderText())}`;
}

function renderOrder() {
  const panel = document.getElementById("order");
  if (!panel) return;
  const counter = document.getElementById("cart-count");
  if (counter) {
    counter.textContent = cartCount();
    counter.classList.remove("is-pop");
    void counter.offsetWidth;
    counter.classList.add("is-pop");
  }
  if (!orderOpen) {
    panel.hidden = true;
    return;
  }
  panel.hidden = false;
  const total = order.reduce((s, o) => s + o.price * o.qty, 0);
  panel.querySelector(".order-items").innerHTML = order.length
    ? order
        .map(
          (o) =>
            `<li><span>${o.qty} × ${esc(o.name)}</span><b>${TL(o.price * o.qty)}</b>` +
            `<div class="qty-controls">` +
            `<button class="qty" data-name="${esc(o.name)}" data-op="dec" aria-label="${esc(o.name)} adetini azalt">−</button>` +
            `<button class="qty" data-name="${esc(o.name)}" data-op="inc" aria-label="${esc(o.name)} adetini arttır">+</button>` +
            `</div></li>`
        )
        .join("")
    : '<li class="empty">Sepet henüz boş. Menüden ürün ekleyebilirsiniz.</li>';
  panel.querySelector(".order-send").hidden = !order.length;
  panel.querySelector(".order-clear").hidden = !order.length;
  panel.querySelectorAll(".qty").forEach((b) =>
    b.addEventListener("click", () => {
      const found = order.find((o) => o.name === b.dataset.name);
      if (!found) return;
      if (b.dataset.op === "inc") {
        if (found.qty >= MAX_QTY) {
          toast(`${found.name} için maksimum adet ${MAX_QTY}.`);
          return;
        }
        found.qty += 1;
      } else {
        found.qty -= 1;
        if (found.qty <= 0) order.splice(order.indexOf(found), 1);
      }
      renderOrder();
      saveOrder();
    })
  );
  const totalEl = panel.querySelector(".order-total");
  if (totalEl) totalEl.innerHTML = `<span>Toplam</span><b>${TL(total)}</b>`;
  panel.querySelector(".order-send").href = waLink();
}

function toast(message) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => {
    t.classList.add("is-out");
    setTimeout(() => t.remove(), 320);
  }, 2200);
}

function addToOrder(item, qty = 1) {
  const found = order.find((o) => o.name === item.name);
  const current = found ? found.qty : 0;
  const add = Math.min(qty, MAX_QTY - current);
  if (add <= 0) {
    toast(`${item.name} için maksimum adet ${MAX_QTY}.`);
    return;
  }
  if (found) found.qty += add;
  else order.push({ name: item.name, price: item.price, qty: add });
  orderOpen = true;
  renderOrder();
  saveOrder();
  toast(`${item.name} sepete eklendi${add > 1 ? ` × ${add}` : ""}.`);
}

/* ---------- ürün detay modalı ---------- */

let modalItem = null;
let modalQty = 1;

function findItem(name) {
  for (const group of MENU) {
    const item = group.items.find((i) => i.name === name);
    if (item) return { item, group };
  }
  return null;
}

function renderModalQty() {
  const num = document.getElementById("modal-qty");
  if (num) num.textContent = modalQty;
  const dec = document.getElementById("modal-dec");
  if (dec) dec.disabled = modalQty <= 1;
}

function openItemModal(name) {
  const found = findItem(name);
  if (!found) return;
  const modal = document.getElementById("item-modal");
  if (!modal) return;
  const { item, group } = found;
  modalItem = item;
  modalQty = 1;

  modal.querySelector("#modal-art").innerHTML = artFor(item);
  modal.querySelector("#modal-cat").textContent = group.category;
  modal.querySelector("#modal-title").textContent = item.name;
  modal.querySelector("#modal-desc").textContent = item.desc || "Bu ürün hakkında bilgi bulunmuyor.";
  modal.querySelector("#modal-tags").innerHTML = (item.tags || []).map((t) => `<span>${esc(t)}</span>`).join("");
  modal.querySelector("#modal-price").textContent = TL(item.price);
  modal.querySelector("#modal-note").textContent =
    (group.note ? group.note + " " : "") + "Fiyatlara KDV dahildir.";

  const side = MENU.find((g) => g.category === "Yan Ürünler");
  const pairs = (side ? side.items : []).filter((i) => i.name !== item.name).slice(0, 3);
  modal.querySelector("#modal-pairs").innerHTML = pairs.length
    ? `<b>Yan ürün önerileri</b><div class="pair-list">` + pairs.map((p) => `<button class="pair" data-item="${esc(p.name)}">${esc(p.name)} · ${TL(p.price)}</button>`).join("") + `</div>`
    : "";

  renderModalQty();
  modal.hidden = false;
  const close = modal.querySelector(".modal-close");
  if (close) close.focus();
}

function closeItemModal() {
  const modal = document.getElementById("item-modal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modalItem = null;
  modalQty = 1;
}

function initModal() {
  if (document.getElementById("item-modal")) return;

  const modal = document.createElement("div");
  modal.id = "item-modal";
  modal.className = "modal";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modal-title");
  modal.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-card">
      <button class="modal-close" data-close aria-label="Detayları kapat">${CLOSE_ICON}</button>
      <div class="modal-art" id="modal-art"></div>
      <div class="modal-body">
        <p class="modal-cat" id="modal-cat"></p>
        <h3 class="modal-title" id="modal-title"></h3>
        <p class="modal-desc" id="modal-desc"></p>
        <div class="modal-tags" id="modal-tags"></div>
        <div class="modal-foot">
          <span class="modal-price" id="modal-price"></span>
          <div class="modal-qty">
            <button class="qty" id="modal-dec" aria-label="Adet azalt">−</button>
            <span class="modal-qty-num" id="modal-qty">1</span>
            <button class="qty" id="modal-inc" aria-label="Adet arttır">+</button>
          </div>
          <button class="btn btn-primary" id="modal-add">Sepete ekle</button>
        </div>
        <p class="modal-note" id="modal-note"></p>
        <div class="modal-pairs" id="modal-pairs"></div>
        <div class="modal-actions">
          <a class="btn btn-outline" href="${esc(safeHref(SITE.phoneHref))}">Telefonla sipariş</a>
          <a class="btn btn-outline" href="https://wa.me/${waNumber()}" target="_blank" rel="noopener">WhatsApp ile yaz</a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeItemModal));
  modal.querySelector("#modal-dec").addEventListener("click", () => {
    modalQty = Math.max(1, modalQty - 1);
    renderModalQty();
  });
  modal.querySelector("#modal-inc").addEventListener("click", () => {
    if (modalQty >= MAX_QTY) {
      toast(`${modalItem.name} için sınır ${MAX_QTY}. O kadarını telefonda konuşalım.`);
      return;
    }
    modalQty += 1;
    renderModalQty();
  });
  modal.querySelector("#modal-add").addEventListener("click", () => {
    if (!modalItem) return;
    addToOrder(modalItem, modalQty);
    closeItemModal();
  });
  modal.querySelector("#modal-pairs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-item]");
    if (btn) openItemModal(btn.dataset.item);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeItemModal();
  });
}

/* ---------- menü render ---------- */

function renderMenu(target, filter = "", category = "Tümü") {
  const el = document.getElementById(target);
  if (!el) return;
  const q = filter.trim().toLowerCase();
  let count = 0;
  let n = 0;

  el.innerHTML = MENU
    .filter((group) => category === "Tümü" || group.category === category)
    .map((group) => {
      const items = group.items.filter(
        (i) => !q || i.name.toLowerCase().includes(q) || (i.desc || "").toLowerCase().includes(q)
      );
      if (!items.length) return "";
      count += items.length;
      return `
        <section class="menu-group reveal">
          <h3>${esc(group.category)}</h3>
          ${group.note ? `<p class="group-note">${esc(group.note)}</p>` : ""}
          ${items.length > 3 ? `<p class="scroll-hint">Yana kaydırın</p>` : ""}
          <ul class="menu-list">
            ${items
              .map(
                (i) => `
                <li class="menu-item" data-item="${esc(i.name)}" style="--d:${n++ % 8}">
                  <div class="mi-art">${artFor(i)}</div>
                  <div class="mi-main">
                    <div class="mi-name"><button class="mi-open" data-item="${esc(i.name)}">${esc(i.name)}</button></div>
                    ${i.desc ? `<div class="mi-desc">${esc(i.desc)}</div>` : ""}
                    ${i.tags ? `<div class="mi-tags">${i.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
                  </div>
                  <div class="mi-foot">
                    <span class="mi-price">${TL(i.price)}</span>
                    <button class="mi-add" data-add="${esc(i.name)}" data-label="Sepete ekle" aria-label="${esc(i.name)} sepete ekle">
                      ${BASKET_ICON}<span class="mi-add-label">Sepete ekle</span>
                    </button>
                  </div>
                </li>`
              )
              .join("")}
          </ul>
        </section>`;
    })
    .join("");

  if (!count) el.innerHTML = `<p class="empty">“${esc(filter)}” için sonuç bulunamadı.</p>`;

  const counter = document.getElementById("menu-count");
  if (counter) counter.textContent = `${count} ürün`;
}

function renderPreview(target) {
  const el = document.getElementById(target);
  if (!el) return;
  const all = MENU.flatMap((g) => g.items);
  const featured = all.filter((i) => i.tags && i.tags.length);
  const list = (featured.length ? featured : all).slice(0, 6);

  el.innerHTML = list
    .map(
      (i, idx) => `
      <article class="preview-card reveal" data-item="${esc(i.name)}" style="--d:${idx % 6}">
        <div class="mi-art">${artFor(i)}</div>
        <div class="preview-name"><button class="mi-open" data-item="${esc(i.name)}">${esc(i.name)}</button></div>
        <div class="preview-desc">${esc(i.desc || "")}</div>
        <div class="preview-foot">
          <span class="preview-price">${TL(i.price)}</span>
          <button class="mi-add" data-add="${esc(i.name)}" data-label="Sepet" aria-label="${esc(i.name)} sepete ekle">
            ${BASKET_ICON}<span class="mi-add-label">Sepet</span>
          </button>
        </div>
      </article>`
    )
    .join("");
}

function wireMenuButtons() {
  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = MENU.flatMap((g) => g.items).find((i) => i.name === btn.dataset.add);
      if (!item) return;
      addToOrder(item);
      const label = btn.querySelector(".mi-add-label");
      btn.classList.add("is-added");
      if (label) label.textContent = "Eklendi";
      setTimeout(() => {
        btn.classList.remove("is-added");
        if (label) label.textContent = btn.dataset.label || "Sepete ekle";
      }, 900);
    });
  });

  // ürüne tıklayınca detay modalı açılır (sepet butonu hariç)
  document.querySelectorAll(".menu-item, .preview-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-add]")) return;
      openItemModal(card.dataset.item);
    });
  });
}

/* ---------- clickjacking koruması ---------- */

/* GitHub Pages özel header veremediği için frame-ancestors verilemiyor
   (meta CSP'de frame-ancestors desteklenmez). Sayfa başka bir site içine
   gömülürse etkileşimli içerik kapatılır, uyarı gösterilir. */
function guardFraming() {
  if (window.top === window.self) return;
  document.documentElement.classList.add("is-framed");
  const warn = document.createElement("div");
  warn.className = "framed-warning";
  warn.textContent = "Bu sayfa başka bir site içinde gösteriliyor. Sipariş ve sepet için sayfayı doğrudan açın.";
  document.body.prepend(warn);
}

/* ---------- üçüncü taraf yüklemeleri (KVKK rızası) ---------- */

let consentGiven = false;

function hasConsent() {
  if (consentGiven) return true;
  return lsGet("tandir-consent") === "ok";
}

/* Rıza verilmeden Google Maps iframe'i yüklenmez: embed kendi çerezlerini
   koyduğu için "çerez kullanılmaz" iddiası ancak kapıya bağlanınca doğru olur. */
function loadThirdParty() {
  if (!hasConsent()) return;
  const map = document.getElementById("map");
  if (map && !map.src && map.dataset.src) map.src = map.dataset.src;
  const note = document.querySelector(".map-note");
  if (note) note.hidden = true;
}

/* ---------- sayfa içi dolgular ---------- */

function fillStatic() {
  /* data-site = metin, data-href-site = href. İki yerde de yalnızca SITE'te
   gerçekten tanımlı anahtarlar kullanılır (prototip erişimini kapatır). */
  document.querySelectorAll("[data-site]").forEach((el) => {
    const key = el.dataset.site;
    if (Object.prototype.hasOwnProperty.call(SITE, key)) el.textContent = SITE[key];
  });
  document.querySelectorAll("[data-href-site]").forEach((el) => {
    const key = el.dataset.hrefSite;
    if (Object.prototype.hasOwnProperty.call(SITE, key)) el.href = safeHref(SITE[key]);
  });
  /* fab / CTA WhatsApp linkleri: numara tek yerden (SITE.whatsapp) gelir,
   HTML'de hardcoded numara kalmaz. Numara boşsa telefon linkine düşer. */
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const n = waNumber();
    el.href = n ? `https://wa.me/${n}` : safeHref(SITE.phoneHref);
  });
  const s = isOpenNow();
  document.querySelectorAll(".status").forEach((el) => {
    const text = el.querySelector(".status-text");
    if (text) text.textContent = s.text;
    el.classList.add(s.open ? "is-open" : "is-closed");
  });

  const todayDay = document.getElementById("today-day");
  const todayTime = document.getElementById("today-time");
  if (todayDay) todayDay.textContent = s.day || "—";
  if (todayTime) todayTime.textContent = s.time || "—";

  document.querySelectorAll("[data-hours]").forEach((el) => {
    el.innerHTML = SITE.hours
      .map((h, i) => `<tr class="${i === s.idx ? "is-today" : ""}"><td>${esc(h.day)}</td><td>${esc(h.open)} – ${esc(h.close)}</td></tr>`)
      .join("");
  });

  // harita: adres tek yerden (SITE.mapsQuery) gelir
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;
  document.querySelectorAll("[data-maps-link]").forEach((a) => { a.href = mapsUrl; });
  const map = document.getElementById("map");
  if (map) map.dataset.src = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;
}

/* ---------- tema (gece / gündüz) ---------- */

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.setAttribute("aria-label", theme === "dark" ? "Gündüz moduna geç" : "Gece moduna geç");
  }
}

function initTheme() {
  const saved = lsGet(THEME_KEY);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (systemDark ? "dark" : "light"));

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    lsSet(THEME_KEY, next);
  });

  // kullanıcı sistem tercihini değiştirirse ve elle seçim yoksa takip et
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!lsGet(THEME_KEY)) applyTheme(e.matches ? "dark" : "light");
  });
}

/* ---------- animasyonlar ---------- */

let activeCategory = "Tümü";

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window) || reduceMotion) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el, i) => {
    if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", String(i % 6));
    io.observe(el);
  });
}

function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  if (!("IntersectionObserver" in window) || reduceMotion) {
    els.forEach((el) => { el.textContent = el.dataset.count + (el.dataset.suffix || ""); });
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const el = entry.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const duration = 900;
        const step = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
}

function initScrollFx() {
  const bar = document.getElementById("scroll-progress");
  const topbar = document.querySelector(".topbar");
  const fab = document.getElementById("fab");
  const photo = document.querySelector(".hero-photo");

  const onScroll = () => {
    const y = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = total > 0 ? `${(y / total) * 100}%` : "0%";
    if (topbar) topbar.classList.toggle("is-scrolled", y > 12);
    if (fab) fab.classList.toggle("is-visible", y > 260);
    if (photo && !reduceMotion) photo.style.transform = `translateY(${Math.min(y * 0.05, 24)}px)`;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initTicker() {
  const ticker = document.getElementById("ticker");
  if (!ticker) return;

  if (lsGet("tandir-ticker") === "off") {
    ticker.remove();
    return;
  }

  const track = document.getElementById("ticker-track");
  if (track) {
    const group = SITE.ticker
      .map((text) => `<span>${esc(text)}</span><span class="sep">◆</span>`)
      .join("");
    track.innerHTML = group + group; // iki tur: marquee kesintisiz dönsün
  }

  const close = document.getElementById("ticker-close");
  if (close) {
    close.addEventListener("click", () => {
      ticker.remove();
      lsSet("tandir-ticker", "off");
    });
  }
}

/* ---------- gizlilik / çerez uyarısı (KVKK) ---------- */

function initConsent() {
  const note = document.getElementById("cookie-note");
  if (!note) return;

  const saved = lsGet("tandir-consent");
  if (saved === "ok") {
    consentGiven = true;
    note.remove();
    loadThirdParty();
    return;
  }

  const btn = document.getElementById("cookie-ok");
  if (btn) {
    btn.addEventListener("click", () => {
      consentGiven = true;
      lsSet("tandir-consent", "ok");
      note.remove();
      loadThirdParty();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  guardFraming();
  injectSprite();
  initTheme();
  fillStatic();
  initConsent();
  initModal();

  // mobil menü
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", nav.classList.contains("is-open"));
    });
  }

  // menü sayfası: arama + kategori filtreleri
  const search = document.getElementById("menu-search");
  if (search) {
    renderMenu("menu");
    search.addEventListener("input", () => renderMenu("menu", search.value, activeCategory));

    const chips = document.getElementById("menu-chips");
    if (chips) {
      chips.innerHTML = ["Tümü", ...MENU.map((g) => g.category)]
        .map((c, i) => `<button class="chip${i === 0 ? " is-active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
        .join("");
      chips.querySelectorAll(".chip").forEach((b) =>
        b.addEventListener("click", () => {
          chips.querySelectorAll(".chip").forEach((x) => x.classList.remove("is-active"));
          b.classList.add("is-active");
          activeCategory = b.dataset.cat;
          renderMenu("menu", search.value, activeCategory);
        })
      );
    }
  }

  // ana sayfa vitrin menüsü
  if (document.getElementById("menu-preview")) renderPreview("menu-preview");

  wireMenuButtons();
  renderOrder();
  initTicker();

  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      orderOpen = !orderOpen;
      renderOrder();
    });
  }
  const orderClose = document.getElementById("order-close");
  if (orderClose) {
    orderClose.addEventListener("click", () => {
      orderOpen = false;
      renderOrder();
    });
  }

  const clear = document.getElementById("order-clear");
  if (clear) {
    clear.addEventListener("click", () => {
      order.length = 0;
      saveOrder();
      renderOrder();
      toast("Sepet temizlendi.");
    });
  }

  initReveal();
  initCounters();
  initScrollFx();
});
