/* ============================================================
   TANDIR DÖNER — davranış: sepet, arama, tema, animasyon, render
   İçerik verisi content.js içinde (SITE + MENU).
   ============================================================ */

/* ---------- yardımcı ---------- */

const TL = (n) => n.toLocaleString("tr-TR") + " ₺";
const BASKET_ICON = `<svg class="icon icon-basket" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14M6.5 8l2 9.5h7l2-9.5M9 4.5v3.5M15 4.5v3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Ürün adına göre illüstrasyon seçiyor. Gerçek fotoğraf vermek istersen
// ürüne img: "assets/menu/kunefe.jpg" yaz — o zaman SVG yerine fotoğraf kullanılır.
const ART_SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true">
  <!-- Tandır Döner menü ikonları — düz (flat) illüstrasyonlar.
     Gerçek fotoğraf kullanmak istersen: MENU içindeki ürüne
     img: "assets/menu/kunefe.jpg" yaz, SVG otomatik devre dışı kalır. -->

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
  if (item.img) return `<img src="${item.img}" alt="${item.name}">`;
  const n = item.name.toLowerCase();
  const key = ART_KEYS.find(([w]) => n.includes(w))?.[1] || "porsiyon";
  return `<svg viewBox="0 0 64 48" aria-hidden="true"><use href="#art-${key}"/></svg>`;
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
  if (!h) return { open: false, text: "Saat bilgisi yok", day: "", time: "", idx: 0 };
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

const order = loadOrder();
let orderOpen = false;

function loadOrder() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((o) => o && o.name && Number(o.price)) : [];
  } catch (err) {
    return [];
  }
}

function saveOrder() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(order));
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
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(orderText())}`;
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
            `<li><span>${o.qty} × ${o.name}</span><b>${TL(o.price * o.qty)}</b>` +
            `<button class="qty" data-name="${o.name}" data-qty="${o.qty - 1}" aria-label="Azalt">−</button></li>`
        )
        .join("")
    : '<li class="empty">Sepet henüz boş — menüden ürün ekle.</li>';
  panel.querySelector(".order-send").hidden = !order.length;
  panel.querySelectorAll(".qty").forEach((b) =>
    b.addEventListener("click", () => {
      const q = Number(b.dataset.qty);
      const found = order.find((o) => o.name === b.dataset.name);
      if (!found) return;
      if (q <= 0) order.splice(order.indexOf(found), 1);
      else found.qty = q;
      renderOrder();
      saveOrder();
    })
  );
  panel.querySelector(".order-total").textContent = TL(total);
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

function addToOrder(item) {
  const found = order.find((o) => o.name === item.name);
  if (found) found.qty += 1;
  else order.push({ name: item.name, price: item.price, qty: 1 });
  orderOpen = true;
  renderOrder();
  saveOrder();
  toast(`${item.name} sepete eklendi`);
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
          <h3>${group.category}</h3>
          ${group.note ? `<p class="group-note">${group.note}</p>` : ""}
          ${items.length > 3 ? `<p class="scroll-hint">Yana kaydır</p>` : ""}
          <ul class="menu-list">
            ${items
              .map(
                (i) => `
                <li class="menu-item" style="--d:${n++ % 8}">
                  <div class="mi-art">${artFor(i)}</div>
                  <div class="mi-main">
                    <div class="mi-name">${i.name}</div>
                    ${i.desc ? `<div class="mi-desc">${i.desc}</div>` : ""}
                    ${i.tags ? `<div class="mi-tags">${i.tags.map((t) => `<span>${t}</span>`).join("")}</div>` : ""}
                  </div>
                  <div class="mi-foot">
                    <span class="mi-price">${TL(i.price)}</span>
                    <button class="mi-add" data-add="${i.name}" data-label="Sepete ekle" aria-label="${i.name} sepete ekle">
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

  if (!count) el.innerHTML = `<p class="empty">“${filter}” için sonuç yok.</p>`;

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
      <article class="preview-card reveal" style="--d:${idx % 6}">
        <div class="mi-art">${artFor(i)}</div>
        <div class="preview-name">${i.name}</div>
        <div class="preview-desc">${i.desc || ""}</div>
        <div class="preview-foot">
          <span class="preview-price">${TL(i.price)}</span>
          <button class="mi-add" data-add="${i.name}" data-label="Sepet" aria-label="${i.name} sepete ekle">
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
}

/* ---------- sayfa içi dolgular ---------- */

function fillStatic() {
  document.querySelectorAll("[data-site]").forEach((el) => {
    el.textContent = SITE[el.dataset.site];
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
      .map((h, i) => `<tr class="${i === s.idx ? "is-today" : ""}"><td>${h.day}</td><td>${h.open} – ${h.close}</td></tr>`)
      .join("");
  });

  // harita: adres tek yerden (SITE.mapsQuery) gelir
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;
  document.querySelectorAll("[data-maps-link]").forEach((a) => { a.href = mapsUrl; });
  const map = document.getElementById("map");
  if (map) map.src = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;
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
  const saved = localStorage.getItem(THEME_KEY);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (systemDark ? "dark" : "light"));

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* yoksay */ }
  });

  // kullanıcı sistem tercihini değiştirirse ve elle seçim yoksa takip et
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? "dark" : "light");
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

  if (localStorage.getItem("tandir-ticker") === "off") {
    ticker.remove();
    return;
  }

  const track = document.getElementById("ticker-track");
  if (track) {
    const group = SITE.ticker
      .map((text) => `<span>${text}</span><span class="sep">◆</span>`)
      .join("");
    track.innerHTML = group + group; // iki tur: marquee kesintisiz dönsün
  }

  const close = document.getElementById("ticker-close");
  if (close) {
    close.addEventListener("click", () => {
      ticker.remove();
      try { localStorage.setItem("tandir-ticker", "off"); } catch (err) { /* yoksay */ }
    });
  }
}

/* ---------- gizlilik / çerez uyarısı (KVKK) ---------- */

function initConsent() {
  const note = document.getElementById("cookie-note");
  if (!note) return;

  let saved = null;
  try { saved = localStorage.getItem("tandir-consent"); } catch (err) { /* localStorage kapalı */ }
  if (saved === "ok") {
    note.remove();
    return;
  }

  const btn = document.getElementById("cookie-ok");
  if (btn) {
    btn.addEventListener("click", () => {
      try { localStorage.setItem("tandir-consent", "ok"); } catch (err) { /* yoksay */ }
      note.remove();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectSprite();
  initTheme();
  fillStatic();
  initConsent();

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
        .map((c, i) => `<button class="chip${i === 0 ? " is-active" : ""}" data-cat="${c}">${c}</button>`)
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
      toast("Sepet temizlendi");
    });
  }

  initReveal();
  initCounters();
  initScrollFx();
});
