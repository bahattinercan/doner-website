/* ============================================================
   TANDIR DÖNER — site verisi
   Buradaki her şeyi kendi dükkanına göre değiştir.
   Menü ürünlerini düzenlemek için tek yer: MENU dizisi.
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
  // Açılış saatleri: 0 = Pazar ... 6 = Cumartesi
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

function isOpenNow() {
  const now = new Date();
  const idx = (now.getDay() + 6) % 7; // Pazartesi = 0
  const h = SITE.hours[idx];
  if (!h) return { open: false, text: "Saat bilgisi yok" };
  const [oh, om] = h.open.split(":").map(Number);
  const [ch, cm] = h.close.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  const isOpen = cur >= openMin && cur < closeMin;
  return {
    open: isOpen,
    text: isOpen ? `Şu an açık · ${h.close}'e kadar` : `Kapalı · ${h.open}'te açılıyor`,
  };
}

/* ---------- sipariş sepeti (WhatsApp'a mesaj olarak gider) ---------- */

const order = [];

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
    })
  );
  panel.querySelector(".order-total").textContent = TL(total);
  panel.querySelector(".order-send").href = waLink();
}

function addToOrder(item) {
  const found = order.find((o) => o.name === item.name);
  if (found) found.qty += 1;
  else order.push({ name: item.name, price: item.price, qty: 1 });
  renderOrder();
}

/* ---------- menü render ---------- */

function renderMenu(target, filter = "") {
  const el = document.getElementById(target);
  if (!el) return;
  const q = filter.trim().toLowerCase();
  let count = 0;

  el.innerHTML = MENU
    .map((group) => {
      const items = group.items.filter(
        (i) => !q || i.name.toLowerCase().includes(q) || (i.desc || "").toLowerCase().includes(q)
      );
      if (!items.length) return "";
      count += items.length;
      return `
        <section class="menu-group">
          <h3>${group.category}</h3>
          ${group.note ? `<p class="group-note">${group.note}</p>` : ""}
          <ul class="menu-list">
            ${items
              .map(
                (i) => `
                <li class="menu-item">
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
}

function wireMenuButtons() {
  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = MENU.flatMap((g) => g.items).find((i) => i.name === btn.dataset.add);
      if (item) addToOrder(item);
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
}

document.addEventListener("DOMContentLoaded", () => {
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

  // arama (menü sayfası)
  const search = document.getElementById("menu-search");
  if (search) {
    renderMenu("menu");
    search.addEventListener("input", () => renderMenu("menu", search.value));
  }

  // ana sayfa vitrin menüsü
  if (document.getElementById("menu-preview")) {
    renderMenu("menu-preview");
  }

  wireMenuButtons();
});
