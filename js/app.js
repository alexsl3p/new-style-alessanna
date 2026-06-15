/* ============================================================
   AlesSanna Ilusalong — UI logic
   i18n (ET / RU / EN), scroll reveal, sticky header,
   mobile menu, contact form (mailto fallback).
   ============================================================ */

(function () {
  'use strict';

  /* ---------------- i18n dictionary ---------------- */
  const I18N = {
    et: {
      'brand.sub': 'Ilusalong · Pärnu',
      'nav.services': 'Teenused', 'nav.masters': 'Meistrid', 'nav.about': 'Salongist',
      'nav.products': 'Tooted', 'nav.contact': 'Kontakt', 'nav.gift': 'Kinkekaart', 'nav.book': 'Broneeri',
      'hero.eyebrow': 'Ilusalong Pärnus',
      'hero.title1': 'Ruum, kus ilu', 'hero.title2': 'hingab rahulikult',
      'hero.lead': 'Keeruline värvimine, balayage ja hooldus — täpsuse, hoolega ja kiirustamata. Sinu loomulik ilu, esile toodud.',
      'hero.cta1': 'Broneeri aeg', 'hero.cta2': 'Vaata teenuseid', 'hero.scroll': 'Keri',
      'services.kicker': 'Teenused', 'services.title': 'Mida me loome', 'services.new': 'uus',
      'services.s1.t': 'Keeruline värvimine', 'services.s1.d': 'Balayage, blondeerimine ja mitmetasandiline värvimine — pehmed üleminekud, mis kasvavad ilusti välja.',
      'services.s2.t': 'Hooldus ja taastamine', 'services.s2.d': 'Süvahooldused juuste tugevuse ja sära taastamiseks professionaalse MAVE seeriaga.',
      'services.s3.t': 'Lõikus ja stiil', 'services.s3.d': 'Sinu näojoontele ja elurütmile kohandatud kuju ja soeng — lihtne hooldada.',
      'services.s4.t': 'Henna tätoveering', 'services.s4.d': 'Ajutine looduslik kunst nahale — õrnad mustrid erilisteks hetkedeks.',
      'services.note': 'Hinnad sõltuvad juuste pikkusest ja seisukorrast. Täpse hinnapakkumise saad tasuta konsultatsioonil.',
      'masters.kicker': 'Meistrid', 'masters.title': 'Käed, mida usaldada',
      'masters.m1.role': 'Värvimeister · kolorist', 'masters.m1.d': 'Spetsialiseerunud keerukale värvimisele ja blondidele. Loob tooni, mis sobib just sinuga.',
      'masters.m2.role': 'Salong · hooldus ja stiil', 'masters.m2.d': 'Hooldused, lõikused ja stiil rahulikus õhkkonnas, kus iga külastus on hingetõmme.',
      'about.kicker': 'Salongist', 'about.title': 'Ilu ei kiirusta',
      'about.p1': 'AlesSanna on koht, kus ilu sünnib rahus. Me ei kiirusta — me kuulame, hoolitseme ja loome tulemuse, mis tundub sinu omana.',
      'about.p2': 'Härma Keskuses Pärnus ootab sind valgusküllane ja vaikne ruum, professionaalsed tooted ja meister, kes märkab detaile.',
      'about.l1': 'Tasuta parkimine läheduses', 'about.l2': 'Professionaalsed MAVE tooted', 'about.l3': 'Individuaalne lähenemine',
      'about.stat1': 'aastat kogemust', 'about.stat2': 'looduslik värvitulemus', 'about.stat3': 'soovitatud klientide poolt',
      'products.kicker': 'Tooted', 'products.title': 'Hoolitsus, mis jätkub kodus',
      'products.p1': 'Professionaalne juuksehoolduse seeria — sära, niiskus ja kaitse iga päev.',
      'products.p2': 'Niši parfüümid, mis viimistlevad sinu kuvandi peenelt ja kauakestvalt.',
      'gift.kicker': 'Kinkekaart', 'gift.title': 'Kingi ilu hetk',
      'gift.d': 'AlesSanna kinkekaart on hooliv kingitus igaks puhuks — vali summa ja lase lähedasel ennast hellitada.',
      'gift.cta': 'Küsi kinkekaarti',
      'contact.kicker': 'Kontakt', 'contact.title': 'Broneeri oma aeg',
      'contact.note': 'Veebibroneerimine on hetkel pausil. Helista või kirjuta — leiame sulle sobiva aja hea meelega.',
      'contact.addr': 'Aadress', 'contact.phone': 'Telefon', 'contact.email': 'E-post', 'contact.hours': 'Lahtiolek',
      'contact.hours1': 'E–R 10:00–18:00', 'contact.hours2': 'L 10:00–16:00', 'contact.call': 'Helista',
      'form.name': 'Nimi', 'form.phone': 'Telefon', 'form.msg': 'Soov / küsimus', 'form.send': 'Saada päring',
      'form.ok': 'Aitäh! Avame sulle e-kirja — lisa soovi korral oma sõnum ja saada.',
      'form.err': 'Palun täida nimi ja telefon.',
      'footer.top': 'Üles ↑',
    },
    ru: {
      'brand.sub': 'Салон красоты · Пярну',
      'nav.services': 'Услуги', 'nav.masters': 'Мастера', 'nav.about': 'О салоне',
      'nav.products': 'Продукты', 'nav.contact': 'Контакты', 'nav.gift': 'Подарочная карта', 'nav.book': 'Записаться',
      'hero.eyebrow': 'Салон красоты в Пярну',
      'hero.title1': 'Пространство, где', 'hero.title2': 'красота дышит спокойно',
      'hero.lead': 'Сложное окрашивание, балаяж и уход — с точностью, заботой и без спешки. Ваша естественная красота, раскрытая бережно.',
      'hero.cta1': 'Записаться', 'hero.cta2': 'Смотреть услуги', 'hero.scroll': 'Вниз',
      'services.kicker': 'Услуги', 'services.title': 'Что мы создаём', 'services.new': 'новое',
      'services.s1.t': 'Сложное окрашивание', 'services.s1.d': 'Балаяж, осветление и многоуровневое окрашивание — мягкие переходы, которые красиво отрастают.',
      'services.s2.t': 'Уход и восстановление', 'services.s2.d': 'Глубокий уход для силы и блеска волос с профессиональной линией MAVE.',
      'services.s3.t': 'Стрижка и стиль', 'services.s3.d': 'Форма и укладка под ваши черты и ритм жизни — простые в уходе.',
      'services.s4.t': 'Тату хной', 'services.s4.d': 'Временное натуральное искусство на коже — нежные узоры для особых моментов.',
      'services.note': 'Цены зависят от длины и состояния волос. Точную стоимость вы узнаете на бесплатной консультации.',
      'masters.kicker': 'Мастера', 'masters.title': 'Руки, которым доверяешь',
      'masters.m1.role': 'Мастер-колорист', 'masters.m1.d': 'Специализируется на сложном окрашивании и блондах. Создаёт оттенок именно для вас.',
      'masters.m2.role': 'Салон · уход и стиль', 'masters.m2.d': 'Уход, стрижки и стиль в спокойной атмосфере, где каждый визит — как вдох.',
      'about.kicker': 'О салоне', 'about.title': 'Красота не спешит',
      'about.p1': 'AlesSanna — место, где красота рождается в покое. Мы не торопимся — слушаем, заботимся и создаём результат, который ощущается вашим.',
      'about.p2': 'В центре Härma в Пярну вас ждёт светлое и тихое пространство, профессиональные продукты и мастер, замечающий детали.',
      'about.l1': 'Бесплатная парковка рядом', 'about.l2': 'Профессиональные продукты MAVE', 'about.l3': 'Индивидуальный подход',
      'about.stat1': 'лет опыта', 'about.stat2': 'натуральный результат', 'about.stat3': 'рекомендуют клиенты',
      'products.kicker': 'Продукты', 'products.title': 'Уход, который продолжается дома',
      'products.p1': 'Профессиональная линия ухода за волосами — блеск, увлажнение и защита каждый день.',
      'products.p2': 'Нишевые ароматы, что завершают ваш образ тонко и надолго.',
      'gift.kicker': 'Подарочная карта', 'gift.title': 'Подарите момент красоты',
      'gift.d': 'Подарочная карта AlesSanna — заботливый подарок на любой повод. Выберите сумму и позвольте близкому человеку расслабиться.',
      'gift.cta': 'Запросить карту',
      'contact.kicker': 'Контакты', 'contact.title': 'Запишитесь на приём',
      'contact.note': 'Онлайн-запись временно на паузе. Позвоните или напишите — мы с радостью подберём удобное время.',
      'contact.addr': 'Адрес', 'contact.phone': 'Телефон', 'contact.email': 'Эл. почта', 'contact.hours': 'Часы работы',
      'contact.hours1': 'Пн–Пт 10:00–18:00', 'contact.hours2': 'Сб 10:00–16:00', 'contact.call': 'Позвонить',
      'form.name': 'Имя', 'form.phone': 'Телефон', 'form.msg': 'Пожелание / вопрос', 'form.send': 'Отправить заявку',
      'form.ok': 'Спасибо! Откроем письмо — добавьте сообщение при желании и отправьте.',
      'form.err': 'Пожалуйста, укажите имя и телефон.',
      'footer.top': 'Наверх ↑',
    },
    en: {
      'brand.sub': 'Beauty salon · Pärnu',
      'nav.services': 'Services', 'nav.masters': 'Masters', 'nav.about': 'About',
      'nav.products': 'Products', 'nav.contact': 'Contact', 'nav.gift': 'Gift card', 'nav.book': 'Book',
      'hero.eyebrow': 'Beauty salon in Pärnu',
      'hero.title1': 'A space where beauty', 'hero.title2': 'breathes calmly',
      'hero.lead': 'Complex coloring, balayage and care — with precision, attention and no rush. Your natural beauty, gently revealed.',
      'hero.cta1': 'Book an appointment', 'hero.cta2': 'View services', 'hero.scroll': 'Scroll',
      'services.kicker': 'Services', 'services.title': 'What we create', 'services.new': 'new',
      'services.s1.t': 'Complex coloring', 'services.s1.d': 'Balayage, lightening and multi-level coloring — soft transitions that grow out beautifully.',
      'services.s2.t': 'Care & restoration', 'services.s2.d': 'Deep treatments to restore strength and shine with the professional MAVE line.',
      'services.s3.t': 'Cut & style', 'services.s3.d': 'Shape and styling tailored to your features and rhythm of life — easy to maintain.',
      'services.s4.t': 'Henna tattoo', 'services.s4.d': 'Temporary natural body art — delicate patterns for special moments.',
      'services.note': 'Prices depend on hair length and condition. You will get an exact quote at a free consultation.',
      'masters.kicker': 'Masters', 'masters.title': 'Hands you can trust',
      'masters.m1.role': 'Color master · colorist', 'masters.m1.d': 'Specialised in complex coloring and blondes. Creates a shade made just for you.',
      'masters.m2.role': 'Salon · care & style', 'masters.m2.d': 'Treatments, cuts and styling in a calm atmosphere where every visit is a breath.',
      'about.kicker': 'About', 'about.title': 'Beauty is unhurried',
      'about.p1': 'AlesSanna is a place where beauty is born in calm. We do not rush — we listen, care and create a result that feels like your own.',
      'about.p2': 'In Härma Centre in Pärnu, a light and quiet space awaits, with professional products and a master who notices the details.',
      'about.l1': 'Free parking nearby', 'about.l2': 'Professional MAVE products', 'about.l3': 'Individual approach',
      'about.stat1': 'years of experience', 'about.stat2': 'natural color result', 'about.stat3': 'recommended by clients',
      'products.kicker': 'Products', 'products.title': 'Care that continues at home',
      'products.p1': 'A professional hair care line — shine, moisture and protection every day.',
      'products.p2': 'Niche perfumes that finish your image subtly and lastingly.',
      'gift.kicker': 'Gift card', 'gift.title': 'Gift a moment of beauty',
      'gift.d': 'An AlesSanna gift card is a caring present for any occasion — choose an amount and let someone dear be pampered.',
      'gift.cta': 'Request a gift card',
      'contact.kicker': 'Contact', 'contact.title': 'Book your time',
      'contact.note': 'Online booking is paused for now. Call or write — we will gladly find a time that suits you.',
      'contact.addr': 'Address', 'contact.phone': 'Phone', 'contact.email': 'Email', 'contact.hours': 'Hours',
      'contact.hours1': 'Mon–Fri 10:00–18:00', 'contact.hours2': 'Sat 10:00–16:00', 'contact.call': 'Call',
      'form.name': 'Name', 'form.phone': 'Phone', 'form.msg': 'Wish / question', 'form.send': 'Send request',
      'form.ok': 'Thank you! We will open an email — add your message if you like and send.',
      'form.err': 'Please fill in your name and phone.',
      'footer.top': 'Top ↑',
    },
  };

  const htmlLangMap = { et: 'et', ru: 'ru', en: 'en' };
  let current = localStorage.getItem('as-lang') ||
    (navigator.language || 'et').slice(0, 2).toLowerCase();
  if (!I18N[current]) current = 'et';

  function applyLang(lang) {
    if (!I18N[lang]) return;
    current = lang;
    const dict = I18N[lang];
    document.documentElement.lang = htmlLangMap[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll('.lang button').forEach((b) =>
      b.classList.toggle('is-active', b.dataset.lang === lang));
    localStorage.setItem('as-lang', lang);
  }

  document.querySelectorAll('.lang button').forEach((b) =>
    b.addEventListener('click', () => applyLang(b.dataset.lang)));

  /* ---------------- Sticky header ---------------- */
  const header = document.querySelector('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#mobile-menu');
  const toggleMenu = (force) => {
    const open = force != null ? force : !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu());
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------------- Scroll reveal ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------------- Contact form (mailto) ---------------- */
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    if (!name || !phone) {
      status.textContent = I18N[current]['form.err'];
      return;
    }
    const subject = encodeURIComponent(`AlesSanna — ${name}`);
    const body = encodeURIComponent(`${name}\n${phone}\n\n${message}`);
    window.location.href =
      `mailto:alessanna.ilusalong@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = I18N[current]['form.ok'];
    form.reset();
  });

  /* ---------------- Footer year ---------------- */
  document.querySelector('#year').textContent = new Date().getFullYear();

  /* ---------------- Init ---------------- */
  applyLang(current);
})();