/* ============================================================
   TANDIR DÖNER — site verisi + etkileşim/animasyon
   İçerik: SITE + MENU. Sepet, arama, reveal animasyonları.
   ============================================================ */

const SITE = {
  name: "Tandır Döner",
  slogan: "Ateşte dönen, tabakta eriyen.",
  intro:
    "Her gün taze çekilen et, odun ateşinde dönen tandır, dürümünü saran lavaş. " +
    "Mahallenin 20 yıldır alıştığı dönerci.",
  phone: "+90 532 123 45 67",
  phoneHref: "tel:+905321234567",
  whatsapp: "905321234567",
  address: "İstiklal Caddesi No: 12, Beyoğlu / İstanbul",
  mapsQuery: "İstiklal Caddesi 12 Beyoğlu İstanbul",
  instagram: "https://instagram.com/",
  email: "info@tandirdoner.com",
  // Açılış saatleri: 0 = Pazartesi ... 6 = Pazar
  hours: [
    { day: "Pazartesi", open: "10:00", close: "23:00" },
    { day: "Salı", open: "10:00", close: "23:00" },
    { day: "Çarşamba", open: "10:00", close: "23:00" },
    { day: "Perşembe", open: "10:00", close: "23:00" },
    { day: "Cuma", open: "10:00", close: "24:00" },
    { day: "Cumartesi", open: "10:00", close: "24:00" },
    { day: "Pazar", open: "11:00", close: "23:00" },
  ],
};

const MENU = [
  {
    category: "Dönerler",
    note: "Tüm dönerler lavaş dürüm veya porsiyon olarak gelir.",
    items: [
      { name: "Tandır Dürüm", desc: "Odun ateşinde dönen dana tandır, lavaş, patates, sarımsaklı sos.", price: 285, tags: ["Çok satan"] },
      { name: "Yönüm Dürüm", desc: "İncecik kıyılmış döner, çıtır lavaş, turşu, acı sos.", price: 260 },
      { name: "Porsiyon Döner", desc: "Tabakta döner, yanında pilav ve çoban salata.", price: 320 },
      { name: "Döner Sandviç", desc: "Lavaş yerine ekmek arası, domates ve turşu ile.", price: 210 },
      { name: "Çeyrek Döner", desc: "Küçük porsiyon, yanında patates.", price: 175 },
      { name: "Etli Pide", desc: "Kıymalı döner parçaları, kaşar, közlenmiş biber.", price: 240 },
    ],
  },
  {
    category: "Başlangıçlar",
    items: [
      { name: "Mercimek Çorbası", desc: "Ev yapımı, tereyağlı, limon ile.", price: 95 },
      { name: "Çoban Salata", desc: "Domates, salatalık, biber, nar ekşisi.", price: 120 },
      { name: "Humus", desc: "Nohut ezmesi, zeytinyağı, sıcak lavaş ile.", price: 130, tags: ["Vejetaryen"] },
      { name: "Közlenmiş Biber", desc: "Odun ateşinde közlenmiş, sarımsaklı.", price: 110, tags: ["Vejetaryen"] },
    ],
  },
  {
    category: "Yanında İyi Gider",
    items: [
      { name: "Çıtır Patates", desc: "Elde kesilmiş, tuzlu, kıtır.", price: 110 },
      { name: "Soğan Halkası", desc: "Çıtır pane, acı sos ile.", price: 100 },
      { name: "Turşu Tabağı", desc: "Karışık turşu, ev yapımı.", price: 70 },
      { name: "Pilav", desc: "Tereyağlı bulgur pilavı.", price: 90 },
    ],
  },
  {
    category: "Tatlılar",
    items: [
      { name: "Künefe", desc: "Antep fıstıklı, sıcak şerbetli.", price: 190, tags: ["Çok satan"] },
      { name: "Sütlaç", desc: "Fırında, tarçanlı.", price: 120 },
      { name: "Kazandibi", desc: "Yanık süt tatlısı, fındıklı.", price: 130 },
    ],
  },
  {
    category: "İçecekler",
    items: [
      { name: "Ayran", desc: "Taze, yayla ayranı.", price: 45 },
      { name: "Şalgam", desc: "Acılı veya acısız.", price: 50 },
      { name: "Limonata", desc: "Ev yapımı, nane ile.", price: 60 },
      { name: "Soda", desc: "Koyu / açık.", price: 40 },
      { name: "Çay", desc: "İnce belli, demlenmiş.", price: 25 },
      { name: "Türk Kahvesi", desc: "Köpüklü, lokum ile.", price: 65 },
    ],
  },
];

/* ---------- yardımcı ---------- */

const TL = (n) => n.toLocaleString("tr-TR") + " ₺";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function isOpenNow() {
  const now = new Date();
  const idx = (now.getDay() + 6) % 7; // Pazartesi = 0
  const h = SITE.hours[idx];
  if (!h) return { open: false, text: "Saat bilgisi yok" };
  const [oh, om] = h.open.split(":").map(Number);
  const [ch, cm] = h.close.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const isOpen = cur >= oh * 60 + om && cur < ch * 60 + cm;
  return {
    open: isOpen,
    text: isOpen ? `Şu an açık · ${h.close}'e kadar` : `Kapalı · ${h.open}'te açılıyor`,
  };
}

/* ---------- sipariş sepeti (localStorage'da kalır, WhatsApp'a gider) ---------- */

const CART_KEY = "tandir-cart";
const THEME_KEY = "tandir-theme";

const order = loadOrder();

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
  if (!order.length) {
    panel.hidden = true;
    return;
  }
  panel.hidden = false;
  const total = order.reduce((s, o) => s + o.price * o.qty, 0);
  panel.querySelector(".order-items").innerHTML = order
    .map(
      (o) =>
        `<li><span>${o.qty} × ${o.name}</span><b>${TL(o.price * o.qty)}</b>` +
        `<button class="qty" data-name="${o.name}" data-qty="${o.qty - 1}" aria-label="Azalt">−</button></li>`
    )
    .join("");
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

  const counter = document.getElementById("cart-count");
  if (counter) {
    counter.textContent = cartCount();
    counter.classList.remove("is-pop");
    void counter.offsetWidth;
    counter.classList.add("is-pop");
  }
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
          <ul class="menu-list">
            ${items
              .map(
                (i) => `
                <li class="menu-item" style="--d:${n++ % 8}">
                  <div class="mi-main">
                    <div class="mi-name">${i.name}</div>
                    ${i.desc ? `<div class="mi-desc">${i.desc}</div>` : ""}
                    ${i.tags ? `<div class="mi-tags">${i.tags.map((t) => `<span>${t}</span>`).join("")}</div>` : ""}
                  </div>
                  <div class="mi-price">${TL(i.price)}</div>
                  <button class="mi-add" data-add="${i.name}" aria-label="${i.name} ekle">Sipariş</button>
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
        <div class="preview-name">${i.name}</div>
        <div class="preview-desc">${i.desc || ""}</div>
        <div class="preview-foot">
          <span class="preview-price">${TL(i.price)}</span>
          <button class="mi-add" data-add="${i.name}" aria-label="${i.name} ekle">Sipariş</button>
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
      btn.classList.add("is-added");
      btn.textContent = "Eklendi";
      setTimeout(() => {
        btn.classList.remove("is-added");
        btn.textContent = "Sipariş";
      }, 900);
    });
  });
}

/* ---------- sayfa içi dolgular ---------- */

function fillStatic() {
  document.querySelectorAll("[data-site]").forEach((el) => {
    el.textContent = SITE[el.dataset.site];
  });
  const status = document.getElementById("open-status");
  if (status) {
    const s = isOpenNow();
    status.querySelector(".status-text").textContent = s.text;
    status.classList.add(s.open ? "is-open" : "is-closed");
  }
  document.querySelectorAll("[data-hours]").forEach((el) => {
    el.innerHTML = SITE.hours
      .map((h) => `<tr><td>${h.day}</td><td>${h.open} – ${h.close}</td></tr>`)
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
    btn.textContent = theme === "dark" ? "Gündüz" : "Gece";
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

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  fillStatic();

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
  if (order.length) renderOrder();

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
