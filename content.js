/* ============================================================
   DÜKKAN AYARLARI — siteni özelleştirmek için SADECE bu dosyayı değiştir.
   Menü, fiyat, saat, telefon, adres, kayan şerit burada.
   Kod/animasyon mantığı site.js içinde.
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
  // Kayan şerit: buraya istediğin kadar yazı ekleyebilirsin.
  // Şeridi kapatmak için sayfadaki × düğmesine bas; tercih localStorage'da
  // "tandir-ticker" anahtarında durur.
  ticker: [
    "Odun ateşinde döner",
    "Her gün taze çekilen et",
    "Günlük açılan lavaş",
    "Mahalle fiyatı",
    "Cuma & cumartesi 24:00'a kadar",
    "WhatsApp ile sipariş",
    "Son şiş bitince ocak kapanır",
    "Ocak sabah 09:00'da yanar",
    "Dürüm sıcak gelir, bekletilmez",
    "Beyoğlu · İstiklal Cd. No: 12",
    "20 yıldır aynı usta",
    "Vejetaryen seçenekler var",
  ],
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
      { name: "Adana Dürüm", desc: "Acılı kıyım, çift lavaş, közlenmiş biber.", price: 300, tags: ["Acı sever"] },
      { name: "Döner Burger", desc: "Lavaş yerine brioche, cheddar, turşu, sarımsaklı sos.", price: 340, tags: ["Yeni"] },
      { name: "Kaşarlı Dürüm", desc: "Döner + eritilmiş kaşar, çift lavaş.", price: 300 },
      { name: "Duble Tandır", desc: "İki kat et, iki kat lavaş. Ciddi bir porsiyon.", price: 420, tags: ["Çok satan"] },
    ],
  },
  {
    category: "Fırından",
    note: "Odun ateşinin kıyısından: pide, lahmacun, börek.",
    items: [
      { name: "Lahmacun", desc: "İnce hamur, kıymalı harç, maydanoz ve limon.", price: 180, tags: ["Çok satan"] },
      { name: "Kaşarlı Pide", desc: "Bol kaşarlı, közlenmiş biberli.", price: 220 },
      { name: "Paçanga Böreği", desc: "Pastırmalı, kaşarlı, fırından sıcak.", price: 165 },
      { name: "Çift Lahmacun", desc: "İki lahmacun, yanında ayran.", price: 330 },
    ],
  },
  {
    category: "Başlangıçlar",
    items: [
      { name: "Mercimek Çorbası", desc: "Ev yapımı, tereyağlı, limon ile.", price: 95 },
      { name: "Ezogelin Çorbası", desc: "Bulgurlu, domatesli, naneli.", price: 90 },
      { name: "Çoban Salata", desc: "Domates, salatalık, biber, nar ekşisi.", price: 120 },
      { name: "Roket Salata", desc: "Roket, beyaz peynir, nar ve zeytinyağı.", price: 135, tags: ["Vejetaryen"] },
      { name: "Humus", desc: "Nohut ezmesi, zeytinyağı, sıcak lavaş ile.", price: 130, tags: ["Vejetaryen"] },
      { name: "Haydari", desc: "Süzme yoğurt, nane, sarımsak; lavaş ile.", price: 110, tags: ["Vejetaryen"] },
      { name: "Közlenmiş Biber", desc: "Odun ateşinde közlenmiş, sarımsaklı.", price: 110, tags: ["Vejetaryen"] },
    ],
  },
  {
    category: "Yanında İyi Gider",
    items: [
      { name: "Çıtır Patates", desc: "Elde kesilmiş, tuzlu, kıtır.", price: 110 },
      { name: "Büyük Patates", desc: "200 g, elde kesilmiş, tuzlu.", price: 150 },
      { name: "Soğan Halkası", desc: "Çıtır pane, acı sos ile.", price: 100 },
      { name: "Turşu Tabağı", desc: "Karışık turşu, ev yapımı.", price: 70 },
      { name: "Pilav", desc: "Tereyağlı bulgur pilavı.", price: 90 },
      { name: "Çıtır Lavaş", desc: "Sıcak, tek kişilik lavaş.", price: 40 },
      { name: "Mısır", desc: "Haşlanmış, tereyağlı.", price: 60 },
    ],
  },
  {
    category: "Tatlılar",
    items: [
      { name: "Künefe", desc: "Antep fıstıklı, sıcak şerbetli.", price: 190, tags: ["Çok satan"] },
      { name: "Fistikli Baklava", desc: "4 parça, fıstıklı, şerbetli.", price: 160 },
      { name: "Sütlaç", desc: "Fırında, tarçanlı.", price: 120 },
      { name: "Kazandibi", desc: "Yanık süt tatlısı, fındıklı.", price: 130 },
      { name: "Şekerpare", desc: "Ev yapımı, 4 adet, çay ile iyi gider.", price: 110 },
    ],
  },
  {
    category: "İçecekler",
    items: [
      { name: "Ayran", desc: "Taze, yayla ayranı.", price: 45 },
      { name: "Şalgam", desc: "Acılı veya acısız.", price: 50 },
      { name: "Limonata", desc: "Ev yapımı, nane ile.", price: 60 },
      { name: "Soda", desc: "Koyu / açık.", price: 40 },
      { name: "Su", desc: "500 ml, kaynak suyu.", price: 20 },
      { name: "Maden Suyu", desc: "Sade, limonlu.", price: 35 },
      { name: "Çay", desc: "İnce belli, demlenmiş.", price: 25 },
      { name: "Türk Kahvesi", desc: "Köpüklü, lokum ile.", price: 65 },
      { name: "Filtre Kahve", desc: "Sıcak filtre; sütlü istenirse +10 ₺.", price: 80, tags: ["Yeni"] },
    ],
  },
];

