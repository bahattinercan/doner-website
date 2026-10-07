/* ============================================================
   DÜKKAN AYARLARI — siteni özelleştirmek için SADECE bu dosyayı değiştir.
   Menü, fiyat, saat, telefon, adres, kayan şerit burada.
   Kod/animasyon mantığı site.js içinde.
   ============================================================ */

const SITE = {
  name: "Tandır Döner",
  slogan: "Ateşte dönüyor, fiyatta dönmüyor.",
  intro:
    "Et her sabah bizde çekilir, lavaş her sabah bizde açılır, turşuyu ben kurarım. " +
    "20 yıldır aynı ocakta aynı döneri çeviriyoruz. Nazik olursan ekstra et koyarım.",
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
    "Et bugün çekildi; dünkü et diye bir şey yok",
    "Lavaş günlük açılır, bayatı dürüme girmez",
    "Mahalle fiyatı. Turist fiyatı değil, söz.",
    "Cuma & cumartesi 24:00'e kadar; yorgun ama aç",
    "WhatsApp'tan yaz; telefonla arama utancını yaşama",
    "Son şiş bitince ocak kapanır, bize de sorma",
    "Ocak sabah 09:00'da yanar, usta 09:15'te gelir",
    "Dürüm sıcak gelir; evde bekletirsen sen bilirsin",
    "Beyoğlu · İstiklal Cd. No: 12 (tramvayın hemen altı)",
    "20 yıldır aynı usta, değiştirmeyi düşünmüyoruz",
    "Vejetaryen seçenekler var, kimseye kızmıyoruz",
    "Fiyatlar sahaya göre değişmez; enflasyon ayrı konu",
    "Kaşar ekstraysa da mutluluğun bedeli yok",
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
    note: "Tüm dönerler dürüm ya da porsiyon gelir. 'Az etli olsun' diyene güleriz; şaka yapıyoruz.",
    items: [
      { name: "Tandır Dürüm", desc: "Odun ateşinde dönen dana tandır, lavaş, patates, sarımsaklı sos. En çok satan bu, sorgulamayın.", price: 285, tags: ["Çok satan"], img: "assets/menu/tandir-durum-generated.jpg" },
      { name: "Yönüm Dürüm", desc: "İncecik kıyılmış döner, çıtır lavaş, turşu, acı sos. Yönü belli bir dürüm.", price: 260, img: "assets/menu/yonum-durum-generated.jpg" },
      { name: "Porsiyon Döner", desc: "Tabakta döner, yanında pilav ve çoban salata. Çatal bıçak istemeyi unutma; biz sormayız.", price: 320, img: "assets/menu/porsiyon-doner-generated.jpg" },
      { name: "Döner Sandviç", desc: "Lavaş yerine ekmek arası, domates ve turşu ile. Lavaşçıları üzmek istemeyiz ama ekmek de güzel.", price: 210, img: "assets/menu/doner-sandvic-generated.jpg" },
      { name: "Çeyrek Döner", desc: "Küçük porsiyon, yanında patates. 'Doymadım' diyeceksin, biliyoruz; duble var.", price: 175, img: "assets/menu/ceyrek-doner-generated.jpg" },
      { name: "Etli Pide", desc: "Kıymalı döner parçaları, kaşar, közlenmiş biber. Kaşar bu seferlik ekstra değil.", price: 240, img: "assets/menu/etli-pide-generated.jpg" },
      { name: "Adana Dürüm", desc: "Acılı kıyım, çift lavaş, közlenmiş biber. Acıya dayanamıyorsan su getiririz, gurur getirmeyiz.", price: 300, tags: ["Acı sever"], img: "assets/menu/adana-durum-generated.jpg" },
      { name: "Döner Burger", desc: "Lavaş yerine brioche, cheddar, turşu, sarımsaklı sos. Dönerci olduğumuzu unuttuğumuz an.", price: 340, tags: ["Yeni"], img: "assets/menu/doner-burger-generated.jpg" },
      { name: "Kaşarlı Dürüm", desc: "Döner + eritilmiş kaşar, çift lavaş. Kaşar uzuyor, çene çalışıyor.", price: 300, img: "assets/menu/kasarli-durum-generated.jpg" },
      { name: "Duble Tandır", desc: "İki kat et, iki kat lavaş. Ciddi bir porsiyon; aç gelin, sonra ağlamayın.", price: 420, tags: ["Çok satan"], img: "assets/menu/duble-tandir-generated.jpg" },
    ],
  },
  {
    category: "Fırından",
    note: "Odun ateşinin kıyısından: pide, lahmacun, börek. Fırın 22:00'de kapanır, ona göre.",
    items: [
      { name: "Lahmacun", desc: "İnce hamur, kıymalı harç, maydanoz ve limon. Limonu sıkmadan yiyeni görürsek üzülürüz.", price: 180, tags: ["Çok satan"], img: "assets/menu/lahmacun-generated.jpg" },
      { name: "Kaşarlı Pide", desc: "Bol kaşarlı, közlenmiş biberli. 'Bol' kelimesi burada gerçekten bol.", price: 220, img: "assets/menu/kasarli-pide-generated.jpg" },
      { name: "Paçanga Böreği", desc: "Pastırmalı, kaşarlı, fırından sıcak. Bir tane yetmez, iki tane fazla; karar senin.", price: 165, img: "assets/menu/pacanga-boregi-generated.jpg" },
      { name: "Çift Lahmacun", desc: "İki lahmacun, yanında ayran. Yalnız gelen çok oluyor, yargılamıyoruz.", price: 330, img: "assets/menu/cift-lahmacun-generated.jpg" },
    ],
  },
  {
    category: "Başlangıçlar",
    items: [
      { name: "Mercimek Çorbası", desc: "Ev yapımı, tereyağlı, limon ile. Kaşık istemezsen bardaktan iç, biz karışmayız.", price: 95, img: "assets/menu/mercimek-corbasi-generated.jpg" },
      { name: "Ezogelin Çorbası", desc: "Bulgurlu, domatesli, naneli. Adı güzel, kendisi daha güzel.", price: 90, img: "assets/menu/ezogelin-corbasi-generated.jpg" },
      { name: "Çoban Salata", desc: "Domates, salatalık, biber, nar ekşisi. Dönerin yanına şart; tartışmaya kapalı.", price: 120, img: "assets/menu/coban-salata-generated.jpg" },
      { name: "Roket Salata", desc: "Roket, beyaz peynir, nar ve zeytinyağı. Evet, roket sadece salata; uçmuyoruz.", price: 135, tags: ["Vejetaryen"], img: "assets/menu/roket-salata-generated.jpg" },
      { name: "Humus", desc: "Nohut ezmesi, zeytinyağı, sıcak lavaş ile. Humus zaten 'nohut' demek; Arapça bilmene gerek yok.", price: 130, tags: ["Vejetaryen"], img: "assets/menu/humus-generated.jpg" },
      { name: "Haydari", desc: "Süzme yoğurt, nane, sarımsak; lavaş ile. Sarımsak boldur, şimdiden uyarıyoruz.", price: 110, tags: ["Vejetaryen"], img: "assets/menu/haydari-generated.jpg" },
      { name: "Közlenmiş Biber", desc: "Odun ateşinde közlenmiş, sarımsaklı. Hazırlanışı göz açıyor, yemesi kapatıyor.", price: 110, tags: ["Vejetaryen"], img: "assets/menu/kozlenmis-biber-generated.jpg" },
    ],
  },
  {
    category: "Yanında İyi Gider",
    items: [
      { name: "Çıtır Patates", desc: "Elde kesilmiş, tuzlu, kıtır. Dondurulmuş değil; gerçekten patates.", price: 110, img: "assets/menu/citir-patates-generated.jpg" },
      { name: "Büyük Patates", desc: "200 g, elde kesilmiş, tuzlu. Büyük diyorsak büyük.", price: 150, img: "assets/menu/buyuk-patates-generated.jpg" },
      { name: "Soğan Halkası", desc: "Çıtır pane, acı sos ile. 'Soğan sevmiyorum' diyenler bile yiyor; istatistik bu.", price: 100, img: "assets/menu/sogan-halkasi-generated.jpg" },
      { name: "Turşu Tabağı", desc: "Karışık turşu, ev yapımı. Ben kuruyorum, annemin tarifi; o yüzden güzel.", price: 70, img: "assets/menu/tursu-tabagi-generated.jpg" },
      { name: "Pilav", desc: "Tereyağlı bulgur pilavı. Pirinç soran olursa cevabımız yok.", price: 90, img: "assets/menu/pilav-generated.jpg" },
      { name: "Çıtır Lavaş", desc: "Sıcak, tek kişilik lavaş. Sıcakken yemezsen sertleşir; sonra bize kızma.", price: 40, img: "assets/menu/citir-lavas-generated.jpg" },
      { name: "Mısır", desc: "Haşlanmış, tereyağlı. Sinemada üç katı fiyata almayın, yazık.", price: 60, img: "assets/menu/misir-generated.jpg" },
    ],
  },
  {
    category: "Tatlılar",
    items: [
      { name: "Künefe", desc: "Antep fıstıklı, sıcak şerbetli. Sıcakken ye; soğursa pişman olursun.", price: 190, tags: ["Çok satan"], img: "assets/menu/kunefe-generated.jpg" },
      { name: "Fistikli Baklava", desc: "4 parça, fıstıklı, şerbetli. 'Fıstık gerçek mi' diye soranlara cevabımız: evet.", price: 160, img: "assets/menu/fistikli-baklava-generated.jpg" },
      { name: "Sütlaç", desc: "Fırında, tarçınlı. Üstü yanık olan daha güzel; bilimsel.", price: 120, img: "assets/menu/sutlac-generated.jpg" },
      { name: "Kazandibi", desc: "Yanık süt tatlısı, fındıklı. 'Yanık' gelmesi normal, kazanın dibi meşhur.", price: 130, img: "assets/menu/kazandibi-generated.jpg" },
      { name: "Şekerpare", desc: "Ev yapımı, 4 adet, çay ile iyi gider. Çay bizden, şekerpare bizden; mutluluk sende.", price: 110, img: "assets/menu/sekerpare-generated.jpg" },
    ],
  },
  {
    category: "İçecekler",
    items: [
      { name: "Ayran", desc: "Taze, yayla ayranı. Dönerin resmî içeceği.", price: 45, img: "assets/menu/ayran-generated.jpg" },
      { name: "Şalgam", desc: "Acılı veya acısız. Acılıyı seçen ya cesur ya da alışkın.", price: 50, img: "assets/menu/salgam-generated.jpg" },
      { name: "Limonata", desc: "Ev yapımı, nane ile. Tozu suyla karıştırmıyoruz; fark bu.", price: 60, img: "assets/menu/limonata-generated.jpg" },
      { name: "Soda", desc: "Koyu / açık. Ustaya 'koyu' dersen o bilir.", price: 40, img: "assets/menu/soda-generated.jpg" },
      { name: "Su", desc: "500 ml, kaynak suyu. Menüdeki en dürüst fiyat.", price: 20, img: "assets/menu/su-generated.jpg" },
      { name: "Maden Suyu", desc: "Sade, limonlu. Gazı kaçmamış olsun diye tek tek kontrol ediyoruz.", price: 35, img: "assets/menu/maden-suyu-generated.jpg" },
      { name: "Çay", desc: "İnce belli, demlenmiş. Sabah dokuzdan gece yarısına kadar tavşan kanı.", price: 25, img: "assets/menu/cay-generated.jpg" },
      { name: "Türk Kahvesi", desc: "Köpüklü, lokum ile. Fal bakmıyoruz; sadece kahve.", price: 65, img: "assets/menu/turk-kahvesi-generated.jpg" },
      { name: "Filtre Kahve", desc: "Sıcak filtre; sütlü istenirse +10 ₺. Artık üçüncü nesil dönerci sayılırız.", price: 80, tags: ["Yeni"], img: "assets/menu/filtre-kahve-generated.jpg" },
    ],
  },
];

