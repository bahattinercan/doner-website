/* ============================================================
   DÜKKAN AYARLARI — site içeriği yalnızca bu dosyada tutulur.
   Menü, fiyatlar, açılış saatleri, iletişim bilgileri ve duyuru şeridi
   burada tanımlanır. Görüntüleme ve etkileşim mantığı site.js içindedir.
   ============================================================ */

const SITE = {
  name: "Tandır Döner",
  slogan: "Odun ateşinde, her gün taze döner.",
  intro:
    "Et her sabah kendi mutfağımızda hazırlanır, lavaş günlük açılır, turşu kendi üretimimizdir. " +
    "2004'ten beri aynı adreste, aynı ocakta hizmet veriyoruz.",
  phone: "+90 532 123 45 67",
  phoneHref: "tel:+905321234567",
  whatsapp: "905321234567",
  address: "İstiklal Caddesi No: 12, Beyoğlu / İstanbul",
  mapsQuery: "İstiklal Caddesi 12 Beyoğlu İstanbul",
  instagram: "https://instagram.com/",
  email: "info@tandirdoner.com",
  // Duyuru şeridi: istediğiniz kadar satır ekleyebilirsiniz.
  // Şeridi kapatmak için sayfadaki × düğmesine basılır; tercih
  // localStorage'da "tandir-ticker" anahtarında saklanır.
  ticker: [
    "Odun ateşinde döner",
    "Et günlük olarak hazırlanır",
    "Lavaş her gün taze açılır",
    "Mahalle standartlarında fiyatlar",
    "Cuma ve cumartesi 24:00'a kadar açığız",
    "Sipariş telefon ve WhatsApp üzerinden alınır",
    "Günlük üretim tamamlandığında satış kapanır",
    "Ocak sabah 09:00'da yakılır",
    "Dürümler sıcak olarak servis edilir",
    "Beyoğlu · İstiklal Caddesi No: 12 (tramvay durağına 2 dakika)",
    "2004'ten beri aynı usta",
    "Vejetaryen seçenekler mevcuttur",
    "Fiyatlara KDV dahildir",
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
    note: "Tüm dönerler dürüm veya porsiyon olarak servis edilir.",
    items: [
      { name: "Tandır Dürüm", desc: "Odun ateşinde pişen dana tandır, lavaş, patates ve sarımsaklı sos. En çok tercih edilen ürünümüz.", price: 285, tags: ["Çok satan"], img: "assets/menu/tandir-durum-generated.jpg" },
      { name: "Kıyım Dürüm", desc: "İnce kıyılmış döner, çıtır lavaş, turşu ve acı sos.", price: 260, img: "assets/menu/yonum-durum-generated.jpg" },
      { name: "Porsiyon Döner", desc: "Tabakta servis edilen döner, yanında pilav ve çoban salata.", price: 320, img: "assets/menu/porsiyon-doner-generated.jpg" },
      { name: "Döner Sandviç", desc: "Lavaş yerine ekmek arası; domates ve turşu ile.", price: 210, img: "assets/menu/doner-sandvic-generated.jpg" },
      { name: "Çeyrek Döner", desc: "Küçük porsiyon; yanında patates.", price: 175, img: "assets/menu/ceyrek-doner-generated.jpg" },
      { name: "Etli Pide", desc: "Kıyma ve döner parçaları, kaşar ve közlenmiş biber.", price: 240, img: "assets/menu/etli-pide-generated.jpg" },
      { name: "Adana Dürüm", desc: "Acılı kıyım, çift lavaş ve közlenmiş biber.", price: 300, tags: ["Acılı"], img: "assets/menu/adana-durum-generated.jpg" },
      { name: "Döner Burger", desc: "Brioche ekmek, cheddar, turşu ve sarımsaklı sos.", price: 340, tags: ["Yeni"], img: "assets/menu/doner-burger-generated.jpg" },
      { name: "Kaşarlı Dürüm", desc: "Döner ve eritilmiş kaşar, çift lavaş.", price: 300, img: "assets/menu/kasarli-durum-generated.jpg" },
      { name: "Duble Tandır", desc: "Çift et ve çift lavaş; büyük porsiyon.", price: 420, tags: ["Çok satan"], img: "assets/menu/duble-tandir-generated.jpg" },
    ],
  },
  {
    category: "Fırın Ürünleri",
    note: "Odun ateşinde pide, lahmacun ve börek. Fırın 22:00'de kapanır.",
    items: [
      { name: "Lahmacun", desc: "İnce hamur, kıymalı harç, maydanoz ve limon.", price: 180, tags: ["Çok satan"], img: "assets/menu/lahmacun-generated.jpg" },
      { name: "Kaşarlı Pide", desc: "Bol kaşarlı, közlenmiş biberli.", price: 220, img: "assets/menu/kasarli-pide-generated.jpg" },
      { name: "Paçanga Böreği", desc: "Pastırmalı ve kaşarlı; fırından sıcak servis edilir.", price: 165, img: "assets/menu/pacanga-boregi-generated.jpg" },
      { name: "Çift Lahmacun", desc: "İki lahmacun, yanında ayran.", price: 330, img: "assets/menu/cift-lahmacun-generated.jpg" },
    ],
  },
  {
    category: "Başlangıçlar",
    items: [
      { name: "Mercimek Çorbası", desc: "Ev yapımı, tereyağlı; limon ile servis edilir.", price: 95, img: "assets/menu/mercimek-corbasi-generated.jpg" },
      { name: "Ezogelin Çorbası", desc: "Bulgurlu, domatesli ve naneli.", price: 90, img: "assets/menu/ezogelin-corbasi-generated.jpg" },
      { name: "Çoban Salata", desc: "Domates, salatalık, biber ve nar ekşisi.", price: 120, img: "assets/menu/coban-salata-generated.jpg" },
      { name: "Roket Salata", desc: "Roket, beyaz peynir, nar ve zeytinyağı.", price: 135, tags: ["Vejetaryen"], img: "assets/menu/roket-salata-generated.jpg" },
      { name: "Humus", desc: "Nohut ezmesi, zeytinyağı ve sıcak lavaş ile.", price: 130, tags: ["Vejetaryen"], img: "assets/menu/humus-generated.jpg" },
      { name: "Haydari", desc: "Süzme yoğurt, nane ve sarımsak; lavaş ile.", price: 110, tags: ["Vejetaryen"], img: "assets/menu/haydari-generated.jpg" },
      { name: "Közlenmiş Biber", desc: "Odun ateşinde közlenmiş, sarımsaklı.", price: 110, tags: ["Vejetaryen"], img: "assets/menu/kozlenmis-biber-generated.jpg" },
    ],
  },
  {
    category: "Yan Ürünler",
    items: [
      { name: "Çıtır Patates", desc: "Elde kesilmiş, tuzlu. Dondurulmuş ürün kullanılmaz.", price: 110, img: "assets/menu/citir-patates-generated.jpg" },
      { name: "Büyük Patates", desc: "200 g, elde kesilmiş ve tuzlu.", price: 150, img: "assets/menu/buyuk-patates-generated.jpg" },
      { name: "Soğan Halkası", desc: "Çıtır pane; acı sos ile.", price: 100, img: "assets/menu/sogan-halkasi-generated.jpg" },
      { name: "Turşu Tabağı", desc: "Karışık turşu; kendi üretimimiz.", price: 70, img: "assets/menu/tursu-tabagi-generated.jpg" },
      { name: "Pilav", desc: "Tereyağlı bulgur pilavı.", price: 90, img: "assets/menu/pilav-generated.jpg" },
      { name: "Çıtır Lavaş", desc: "Sıcak, tek kişilik lavaş.", price: 40, img: "assets/menu/citir-lavas-generated.jpg" },
      { name: "Mısır", desc: "Haşlanmış, tereyağlı.", price: 60, img: "assets/menu/misir-generated.jpg" },
    ],
  },
  {
    category: "Tatlılar",
    items: [
      { name: "Künefe", desc: "Antep fıstıklı, sıcak şerbetli.", price: 190, tags: ["Çok satan"], img: "assets/menu/kunefe-generated.jpg" },
      { name: "Fıstıklı Baklava", desc: "4 parça, fıstıklı ve şerbetli.", price: 160, img: "assets/menu/fistikli-baklava-generated.jpg" },
      { name: "Sütlaç", desc: "Fırında, tarçınlı.", price: 120, img: "assets/menu/sutlac-generated.jpg" },
      { name: "Kazandibi", desc: "Yanık süt tatlısı, fındıklı.", price: 130, img: "assets/menu/kazandibi-generated.jpg" },
      { name: "Şekerpare", desc: "Ev yapımı, 4 adet; çay ile servis edilir.", price: 110, img: "assets/menu/sekerpare-generated.jpg" },
    ],
  },
  {
    category: "İçecekler",
    items: [
      { name: "Ayran", desc: "Taze yayla ayranı.", price: 45, img: "assets/menu/ayran-generated.jpg" },
      { name: "Şalgam", desc: "Acılı veya acısız.", price: 50, img: "assets/menu/salgam-generated.jpg" },
      { name: "Limonata", desc: "Ev yapımı, nane ile.", price: 60, img: "assets/menu/limonata-generated.jpg" },
      { name: "Soda", desc: "Koyu veya açık.", price: 40, img: "assets/menu/soda-generated.jpg" },
      { name: "Su", desc: "500 ml.", price: 20, img: "assets/menu/su-generated.jpg" },
      { name: "Maden Suyu", desc: "Sade veya limonlu.", price: 35, img: "assets/menu/maden-suyu-generated.jpg" },
      { name: "Çay", desc: "İnce belli, demlenmiş.", price: 25, img: "assets/menu/cay-generated.jpg" },
      { name: "Türk Kahvesi", desc: "Köpüklü; lokum ile servis edilir.", price: 65, img: "assets/menu/turk-kahvesi-generated.jpg" },
      { name: "Filtre Kahve", desc: "Sıcak filtre kahve; sütlü istenirse +10 ₺.", price: 80, tags: ["Yeni"], img: "assets/menu/filtre-kahve-generated.jpg" },
    ],
  },
];
