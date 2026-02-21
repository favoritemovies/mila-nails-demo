/* =========================================================
   Mila Nails Demo — Vanilla JS, no libs
   - i18n (EN/RU) with localStorage
   - Portfolio loads from gallery.json
   - Filters + Lightbox (focus trap, ESC, arrows)
   - Contact form validation + mailto compose
========================================================= */

const state = {
  lang: "en",
  galleryAll: [],
  galleryFiltered: [],
  activeCategory: "all",
  lightboxIndex: 0,
  lastFocusedEl: null,
  navOpen: false,
};

const translations = {
  en: {
    "a11y.langToggle": "Switch language",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.pricing": "Pricing",
    "nav.reviews": "Reviews",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.book": "Book",

    "hero.badge": "Clean • Gentle • Long-lasting",
    "hero.title": "Mila Nails",
    "hero.subtitle": "Beautiful manicure & gel sets with a clean, modern finish - designed for your lifestyle.",
    "hero.ctaBook": "Book now",
    "hero.ctaPortfolio": "See portfolio",
    "hero.point1": "Sterile tools & single-use disposables",
    "hero.point2": "Precise shaping & cuticle care",
    "hero.point3": "Soft, trendy palettes & custom art",
    "hero.rating": "Average rating",
    "hero.duration": "Minutes per session",
    "hero.chip1": "Manicure",
    "hero.chip2": "Gel",
    "hero.chip3": "Extensions",
    "hero.chip4": "Art",

    "services.title": "Services",
    "services.subtitle": "Choose a service  I'll tailor the details to your nails and style.",
    "services.manicure.title": "Manicure",
    "services.manicure.desc": "Clean cuticle work, shaping, and a glossy or nude finish.",
    "services.manicure.li1": "Shape + cuticle care",
    "services.manicure.li2": "Classic or nude polish",
    "services.gel.title": "Gel",
    "services.gel.desc": "Long-lasting gel color with a smooth, even surface.",
    "services.gel.li1": "Perfect leveling",
    "services.gel.li2": "Trendy shades",
    "services.ext.title": "Extensions",
    "services.ext.desc": "Natural-looking length and strength - short to medium or glam.",
    "services.ext.li1": "Length + structure",
    "services.ext.li2": "Refill available",
    "services.art.title": "Nail Art",
    "services.art.desc": "Minimal lines, chrome accents, French, or custom designs.",
    "services.art.li1": "Custom ideas",
    "services.art.li2": "Add-on friendly",

    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "",
    "portfolio.filters.all": "All",
    "portfolio.filters.manicure": "Manicure",
    "portfolio.filters.gel": "Gel",
    "portfolio.filters.extensions": "Extensions",
    "portfolio.filters.art": "Art",
    "portfolio.count": "{count} works",

    "pricing.title": "Pricing",
    "pricing.subtitle": "Final cost depends on length & design complexity.",
    "pricing.from": "starting from",
    "pricing.cta": "Book this",
    "pricing.popular": "Most popular",
    "pricing.basic.title": "Essential",
    "pricing.basic.desc": "Clean manicure + one color.",
    "pricing.basic.li1": "Shape + cuticle care",
    "pricing.basic.li2": "One gel color",
    "pricing.basic.li3": "Top coat + finish",
    "pricing.plus.title": "Signature",
    "pricing.plus.desc": "Gel + leveling + simple design.",
    "pricing.plus.li1": "Gel leveling",
    "pricing.plus.li2": "1–2 accent nails",
    "pricing.plus.li3": "Long-lasting wear",
    "pricing.pro.title": "Extensions",
    "pricing.pro.desc": "Length + structure + polish.",
    "pricing.pro.li1": "Short–medium length",
    "pricing.pro.li2": "Structure & shaping",
    "pricing.pro.li3": "Color included",
    "pricing.addonsTitle": "Add-ons",
    "pricing.addon1": "French / Ombre",
    "pricing.addon2": "Chrome / Cat eye",
    "pricing.addon3": "Complex art (per nail)",
    "pricing.addon4": "Repair (per nail)",
    "pricing.note": "Note: prices are placeholders for this demo. Adjust to your local market and experience.",

    "reviews.title": "Reviews",
    "reviews.subtitle": "",
    "reviews.r1.text": "So clean and precise! The cuticle work is perfect and the gel lasted 3+ weeks.",
    "reviews.r1.meta": "- Anna, Brooklyn",
    "reviews.r2.text": "I asked for a natural look and got exactly what I wanted. Super friendly and professional.",
    "reviews.r2.meta": "- Kate, Queens",
    "reviews.r3.text": "Beautiful nail art and a calm atmosphere. I'll definitely book again.",
    "reviews.r3.meta": "- Maria, New York City",

    "faq.title": "FAQ",
    "faq.subtitle": "",
    "faq.q1.q": "How do I book an appointment?",
    "faq.q1.a": "Use the contact form below — it will open your email app with all details filled in.",
    "faq.q2.q": "How long does it take?",
    "faq.q2.a": "Most sessions take 60-90 minutes. Extensions and complex art can take longer.",
    "faq.q3.q": "Do you do repairs?",
    "faq.q3.a": "Yes — small repairs are available per nail. Mention it in your message.",
    "faq.q4.q": "What should I bring?",
    "faq.q4.a": "Just your inspiration photos. If you have allergies/sensitivities, tell me in advance.",

    "contact.title": "Contact",
    "contact.subtitle": "",
    "contact.detailsTitle": "Details",
    "contact.phone": "Phone",
    "contact.instagram": "Instagram",
    "contact.area": "Area",
    "contact.areaValue": "Manhattan, New York",
    "contact.hours": "Hours",
    "contact.hoursValue": "Mon-Sat • 10:00-18:00",
    "contact.tip": "Tip: Add reference photos and your preferred length/shape for the fastest quote.",

    "form.name": "Name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.service": "Service",
    "form.servicePlaceholder": "Select a service",
    "form.serviceManicure": "Manicure",
    "form.serviceGel": "Gel",
    "form.serviceExtensions": "Extensions",
    "form.serviceArt": "Nail Art",
    "form.date": "Preferred date",
    "form.dateHint": "If you’re flexible, leave it empty and tell preferred days/times.",
    "form.message": "Message",
    "form.submit": "Send request",
    "form.note": "",

    "footer.creditPrefix": "Demo landing built by",
  },

  ru: {
    "a11y.langToggle": "Переключить язык",
    "nav.services": "Услуги",
    "nav.portfolio": "Портфолио",
    "nav.pricing": "Цены",
    "nav.reviews": "Отзывы",
    "nav.faq": "Вопросы",
    "nav.contact": "Контакты",
    "nav.book": "Записаться",

    "hero.badge": "Чисто • Аккуратно • Долго носится",
    "hero.title": "Mila Nails",
    "hero.subtitle": "Красивый маникюр и гель-покрытие в чистом современном стиле - под ваш ритм жизни.",
    "hero.ctaBook": "Записаться",
    "hero.ctaPortfolio": "Смотреть работы",
    "hero.point1": "Стерильные инструменты и одноразовые расходники",
    "hero.point2": "Точная форма и обработка кутикулы",
    "hero.point3": "Нежные оттенки и дизайн под запрос",
    "hero.rating": "Средняя оценка",
    "hero.duration": "Минут на процедуру",
    "hero.chip1": "Маникюр",
    "hero.chip2": "Гель",
    "hero.chip3": "Наращивание",
    "hero.chip4": "Дизайн",

    "services.title": "Услуги",
    "services.subtitle": "Выберите услугу - детали подберём под ваши ногти и стиль.",
    "services.manicure.title": "Маникюр",
    "services.manicure.desc": "Чистая обработка, форма, глянец или нюд.",
    "services.manicure.li1": "Форма + кутикула",
    "services.manicure.li2": "Классика или нюд",
    "services.gel.title": "Гель",
    "services.gel.desc": "Стойкий цвет с ровной, гладкой поверхностью.",
    "services.gel.li1": "Идеальное выравнивание",
    "services.gel.li2": "Трендовые оттенки",
    "services.ext.title": "Наращивание",
    "services.ext.desc": "Естественная длина и прочность - от натурального до яркого.",
    "services.ext.li1": "Длина + архитектура",
    "services.ext.li2": "Есть коррекция",
    "services.art.title": "Дизайн ногтей",
    "services.art.desc": "Минимализм, хром, френч, или дизайн по референсам.",
    "services.art.li1": "Идеи под вас",
    "services.art.li2": "Удобно как add-on",

    "portfolio.title": "Портфолио",
    "portfolio.subtitle": "",
    "portfolio.filters.all": "Все",
    "portfolio.filters.manicure": "Маникюр",
    "portfolio.filters.gel": "Гель",
    "portfolio.filters.extensions": "Наращивание",
    "portfolio.filters.art": "Дизайн",
    "portfolio.count": "Работ: {count}",

    "pricing.title": "Цены",
    "pricing.subtitle": "Итог зависит от длины и сложности дизайна.",
    "pricing.from": "от",
    "pricing.cta": "Записаться",
    "pricing.popular": "Чаще выбирают",
    "pricing.basic.title": "База",
    "pricing.basic.desc": "Чистый маникюр + один цвет.",
    "pricing.basic.li1": "Форма + кутикула",
    "pricing.basic.li2": "Один цвет геля",
    "pricing.basic.li3": "Топ + финиш",
    "pricing.plus.title": "Сигнатурный",
    "pricing.plus.desc": "Гель + выравнивание + простой дизайн.",
    "pricing.plus.li1": "Выравнивание",
    "pricing.plus.li2": "1-2 акцентных ногтя",
    "pricing.plus.li3": "Долго носится",
    "pricing.pro.title": "Наращивание",
    "pricing.pro.desc": "Длина + архитектура + покрытие.",
    "pricing.pro.li1": "Короткая–средняя длина",
    "pricing.pro.li2": "Архитектура и форма",
    "pricing.pro.li3": "Цвет включён",
    "pricing.addonsTitle": "Дополнения",
    "pricing.addon1": "Френч / Омбре",
    "pricing.addon2": "Хром / Cat eye",
    "pricing.addon3": "Сложный дизайн (за ноготь)",
    "pricing.addon4": "Ремонт (за ноготь)",
    "pricing.note": "",

    "reviews.title": "Отзывы",
    "reviews.subtitle": "",
    "reviews.r1.text": "Очень чисто и аккуратно! Кутикула идеальная, маникюр держался больше 3 недель.",
    "reviews.r1.meta": "- Анна, Бруклин",
    "reviews.r2.text": "Просила натуральный эффект - получила ровно то, что хотела. Очень приятная и профессиональная девушка.",
    "reviews.r2.meta": "- Катя, Квинс",
    "reviews.r3.text": "Красивый дизайн и спокойная атмосфера, обязательно приду снова.",
    "reviews.r3.meta": "- Мария, Нью Йорк Сити",

    "faq.title": "Часто задаваемые вопросы",
    "faq.subtitle": "",
    "faq.q1.q": "Как записаться?",
    "faq.q1.a": "Заполните форму ниже - откроется почта с уже заполненным письмом.",
    "faq.q2.q": "Сколько времени занимает процедура?",
    "faq.q2.a": "Обычно 60–90 минут. Наращивание и сложный дизайн - дольше.",
    "faq.q3.q": "Делаете ремонт ногтя?",
    "faq.q3.a": "Да, небольшой ремонт возможен за ноготь. Укажите в сообщении.",
    "faq.q4.q": "Что нужно взять с собой?",
    "faq.q4.a": "Только референсы. Если есть аллергии/чувствительность - сообщите заранее.",

    "contact.title": "Контакты",
    "contact.subtitle": "Отправьте запрос — форма откроет почту с заполненными данными.",
    "contact.detailsTitle": "Данные",
    "contact.phone": "Телефон",
    "contact.instagram": "Инстаграм",
    "contact.area": "Район",
    "contact.areaValue": "Манхеттен, Нью-Йорк",
    "contact.hours": "Часы",
    "contact.hoursValue": "Пн–Сб • 10:00-18:00",
    "contact.tip": "",

    "form.name": "Имя",
    "form.email": "Email",
    "form.phone": "Телефон",
    "form.service": "Услуга",
    "form.servicePlaceholder": "Выберите услугу",
    "form.serviceManicure": "Маникюр",
    "form.serviceGel": "Гель",
    "form.serviceExtensions": "Наращивание",
    "form.serviceArt": "Дизайн",
    "form.date": "Желаемая дата",
    "form.dateHint": "Если вы гибкие по времени - оставьте пусто и напишите предпочтения.",
    "form.message": "Сообщение",
    "form.submit": "Отправить запрос",
    "form.note": "",

    "footer.creditPrefix": "Демо-лендинг сделала",
  }
};

/* ============ Helpers ============ */
function $(sel, root = document){ return root.querySelector(sel); }
function $all(sel, root = document){ return Array.from(root.querySelectorAll(sel)); }

function safeText(key){
  const dict = translations[state.lang] || translations.en;
  return dict[key] ?? translations.en[key] ?? key;
}

function formatText(tpl, vars){
  return tpl.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ""));
}

function setLang(nextLang){
  state.lang = nextLang === "ru" ? "ru" : "en";
  localStorage.setItem("lang", state.lang);
  document.documentElement.lang = state.lang;
  applyTranslations();
  renderPortfolioFilters();   // re-render filter button labels
  renderPortfolioGrid();      // re-render category tags
  updatePortfolioCount();
}

function applyTranslations(){
  $all("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = safeText(key);
  });
}

/* ============ Nav (mobile) ============ */
function setupNav(){
  const toggle = $(".nav-toggle");
  const menu = $("#nav-menu");

  if(!toggle || !menu) return;

  const setOpen = (open) => {
    state.navOpen = open;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
    if(open){
      // focus first link
      const first = menu.querySelector("a,button");
      first && first.focus();
    }
  };

  toggle.addEventListener("click", () => setOpen(!state.navOpen));

  // close when clicking a link (mobile)
  menu.addEventListener("click", (e) => {
    const t = e.target;
    if(t && t.classList && t.classList.contains("nav-link")){
      setOpen(false);
    }
  });

  // close on escape
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && state.navOpen){
      setOpen(false);
      toggle.focus();
    }
  });

  // close on resize to desktop
  window.addEventListener("resize", () => {
    if(window.innerWidth >= 900 && state.navOpen){
      setOpen(false);
    }
  });
}

/* ============ Portfolio ============ */
const categoryOrder = ["all", "manicure", "gel", "extensions", "art"];

function humanCategory(cat){
  const map = {
    all: safeText("portfolio.filters.all"),
    manicure: safeText("portfolio.filters.manicure"),
    gel: safeText("portfolio.filters.gel"),
    extensions: safeText("portfolio.filters.extensions"),
    art: safeText("portfolio.filters.art"),
  };
  return map[cat] || cat;
}

async function loadGallery(){
  try{
    const res = await fetch("./gallery.json", { cache: "no-store" });
    if(!res.ok) throw new Error(`Failed to load gallery.json: ${res.status}`);
    const data = await res.json();
    if(!Array.isArray(data)) throw new Error("gallery.json must be an array");
    // normalize
    state.galleryAll = data
      .filter(x => x && typeof x.src === "string")
      .map(x => ({
        src: x.src,
        category: normalizeCategory(x.category),
        alt: typeof x.alt === "string" ? x.alt : "Nail design",
      }));
  }catch(err){
    console.error(err);
    state.galleryAll = [];
  }

  applyFilter("all");
}

function normalizeCategory(cat){
  const c = String(cat || "").toLowerCase().trim();
  if(c === "manicure") return "manicure";
  if(c === "gel") return "gel";
  if(c === "extensions") return "extensions";
  if(c === "ext") return "extensions";
  if(c === "art") return "art";
  return "manicure";
}

function applyFilter(cat){
  state.activeCategory = cat;
  state.galleryFiltered = (cat === "all")
    ? state.galleryAll.slice()
    : state.galleryAll.filter(x => x.category === cat);

  renderPortfolioFilters();
  renderPortfolioGrid();
  updatePortfolioCount();
}

function renderPortfolioFilters(){
  const wrap = $("#portfolioFilters");
  if(!wrap) return;

  wrap.innerHTML = "";
  categoryOrder.forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "seg-btn" + (state.activeCategory === cat ? " active" : "");
    btn.setAttribute("aria-label", `Filter: ${humanCategory(cat)}`);
    btn.textContent = humanCategory(cat);
    btn.addEventListener("click", () => applyFilter(cat));
    wrap.appendChild(btn);
  });
}

function updatePortfolioCount(){
  const el = $("#portfolioCount");
  if(!el) return;
  const tpl = safeText("portfolio.count");
  el.textContent = formatText(tpl, { count: String(state.galleryFiltered.length) });
}

function renderPortfolioGrid(){
  const grid = $("#portfolioGrid");
  if(!grid) return;

  grid.innerHTML = "";

  if(state.galleryFiltered.length === 0){
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = state.lang === "ru"
      ? "Пока нет изображений. Добавьте файлы в assets/gallery и обновите gallery.json."
      : "No images yet. Add files to assets/gallery and update gallery.json.";
    grid.appendChild(empty);
    return;
  }

  state.galleryFiltered.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gcard";
    btn.setAttribute("aria-label", `Open image ${idx + 1}`);
    btn.addEventListener("click", () => openLightbox(idx));

    const thumb = document.createElement("div");
    thumb.className = "gthumb";

    const img = document.createElement("img");

img.src = item.src;

// Говорим браузеру: используй более чёткую версию
img.srcset = `
  ${item.src} 1x,
  ${item.src} 2x
`;

img.sizes = "(min-width: 1024px) 260px, (min-width: 720px) 33vw, 50vw";

img.loading = "eager";        // для демо — да
img.decoding = "async";
img.alt = item.alt;


    thumb.appendChild(img);

    const meta = document.createElement("div");
    meta.className = "gmeta";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = humanCategory(item.category);

    const num = document.createElement("span");
    num.className = "muted";
    num.textContent = `${idx + 1}/${state.galleryFiltered.length}`;

    meta.appendChild(tag);
    meta.appendChild(num);

    btn.appendChild(thumb);
    btn.appendChild(meta);

    grid.appendChild(btn);
  });
}

/* ============ Lightbox (Modal) ============ */
function setupLightbox(){
  const modal = $("#lightbox");
  const backdrop = $(".modal-backdrop");
  const closeBtn = $(".modal-close");
  const prevBtn = $(".modal-nav.prev");
  const nextBtn = $(".modal-nav.next");

  if(!modal) return;

  const close = () => closeLightbox();
  backdrop && backdrop.addEventListener("click", (e) => {
    const t = e.target;
    if(t && t.getAttribute("data-close") === "true") close();
  });
  closeBtn && closeBtn.addEventListener("click", close);

  prevBtn && prevBtn.addEventListener("click", () => stepLightbox(-1));
  nextBtn && nextBtn.addEventListener("click", () => stepLightbox(1));

  document.addEventListener("keydown", (e) => {
    if(!isLightboxOpen()) return;

    if(e.key === "Escape"){
      e.preventDefault();
      close();
      return;
    }
    if(e.key === "ArrowLeft"){
      e.preventDefault();
      stepLightbox(-1);
      return;
    }
    if(e.key === "ArrowRight"){
      e.preventDefault();
      stepLightbox(1);
      return;
    }
    if(e.key === "Tab"){
      trapFocus(e);
      return;
    }
  });
}

function isLightboxOpen(){
  const modal = $("#lightbox");
  return !!modal && modal.classList.contains("open");
}

function openLightbox(index){
  const modal = $("#lightbox");
  if(!modal) return;

  state.lastFocusedEl = document.activeElement;
  state.lightboxIndex = clamp(index, 0, state.galleryFiltered.length - 1);

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  renderLightbox();

  // Focus close button for accessibility
  const closeBtn = $(".modal-close");
  closeBtn && closeBtn.focus();

  document.body.style.overflow = "hidden";
}

function closeLightbox(){
  const modal = $("#lightbox");
  if(!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  // Restore focus
  if(state.lastFocusedEl && typeof state.lastFocusedEl.focus === "function"){
    state.lastFocusedEl.focus();
  }
  state.lastFocusedEl = null;
}

function stepLightbox(delta){
  if(state.galleryFiltered.length === 0) return;
  state.lightboxIndex = (state.lightboxIndex + delta + state.galleryFiltered.length) % state.galleryFiltered.length;
  renderLightbox();
}

function renderLightbox(){
  const imgEl = $("#lightboxImg");
  const capEl = $("#lightboxCap");
  const counterEl = $("#lightboxCounter");

  if(!imgEl || !capEl || !counterEl) return;

  const item = state.galleryFiltered[state.lightboxIndex];
  if(!item) return;

  imgEl.src = item.src;
  imgEl.alt = item.alt;

  const cat = humanCategory(item.category);
  capEl.textContent = `${cat} • ${item.alt}`;

  counterEl.textContent = `${state.lightboxIndex + 1} / ${state.galleryFiltered.length}`;
}

function trapFocus(e){
  const modal = $("#lightbox");
  if(!modal) return;

  const focusables = Array.from(modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )).filter(el => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");

  if(focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;

  if(e.shiftKey && active === first){
    e.preventDefault();
    last.focus();
  }else if(!e.shiftKey && active === last){
    e.preventDefault();
    first.focus();
  }
}

function clamp(n, min, max){
  return Math.max(min, Math.min(max, n));
}

/* ============ i18n toggle ============ */
function setupLanguage(){
  const saved = localStorage.getItem("lang");
  state.lang = (saved === "ru" || saved === "en") ? saved : "en";
  document.documentElement.lang = state.lang;

  const btn = $("#langToggle");
  if(btn){
    btn.addEventListener("click", () => {
      setLang(state.lang === "en" ? "ru" : "en");
    });
  }

  applyTranslations();
}

/* ============ Form (mailto) ============ */
function setupForm(){
  const form = $("#contactForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    clearErrors();

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const phone = $("#phone").value.trim();
    const service = $("#service").value.trim();
    const date = $("#date").value.trim();
    const message = $("#message").value.trim();

    const ok = validateForm({ name, email, phone, service, message });
    if(!ok) return;

    const subject = state.lang === "ru"
      ? `Запись: ${service} — ${name}`
      : `Booking request: ${service} — ${name}`;

    const lines = [
      state.lang === "ru" ? "Здравствуйте! Хочу записаться:" : "Hi! I'd like to book an appointment:",
      "",
      `${state.lang === "ru" ? "Имя" : "Name"}: ${name}`,
      `${state.lang === "ru" ? "Email" : "Email"}: ${email}`,
      `${state.lang === "ru" ? "Телефон" : "Phone"}: ${phone || "-"}`,
      `${state.lang === "ru" ? "Услуга" : "Service"}: ${service}`,
      `${state.lang === "ru" ? "Желаемая дата" : "Preferred date"}: ${date || "-"}`,
      "",
      `${state.lang === "ru" ? "Сообщение" : "Message"}:`,
      message,
      "",
      state.lang === "ru" ? "Спасибо!" : "Thank you!",
    ];

    // TODO: replace with real nail tech email
    const to = "mila.nails@example.com";

    const mailto = buildMailto(to, subject, lines.join("\n"));
    window.location.href = mailto;
  });
}

function buildMailto(to, subject, body){
  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}

function clearErrors(){
  ["name","email","phone","service","message"].forEach(k => {
    const el = $(`#err-${k}`);
    if(el) el.textContent = "";
  });
}

function setError(field, msg){
  const el = $(`#err-${field}`);
  if(el) el.textContent = msg;
}

function validateForm({ name, email, phone, service, message }){
  let ok = true;

  if(name.length < 2){
    ok = false;
    setError("name", state.lang === "ru" ? "Введите имя (минимум 2 символа)." : "Please enter your name (min 2 characters).");
  }

  if(!isValidEmail(email)){
    ok = false;
    setError("email", state.lang === "ru" ? "Введите корректный email." : "Please enter a valid email.");
  }

  // Phone is optional, but if present must be reasonable
  if(phone && phone.replace(/[^\d]/g, "").length < 10){
    ok = false;
    setError("phone", state.lang === "ru" ? "Телефон выглядит коротким. Укажите 10+ цифр или оставьте пусто." : "Phone looks too short. Enter 10+ digits or leave empty.");
  }

  if(!service){
    ok = false;
    setError("service", state.lang === "ru" ? "Выберите услугу." : "Please select a service.");
  }

  if(message.length < 10){
    ok = false;
    setError("message", state.lang === "ru" ? "Сообщение слишком короткое (минимум 10 символов)." : "Message is too short (min 10 characters).");
  }

  // Focus first error field
  if(!ok){
    const firstErr = $all(".field-error").find(x => (x.textContent || "").trim().length > 0);
    if(firstErr){
      const id = firstErr.id.replace("err-", "");
      const field = $(`#${id}`);
      field && field.focus();
    }
  }

  return ok;
}

function isValidEmail(v){
  // Simple, reasonable email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/* ============ Init ============ */
function init(){
  // footer year
  const y = $("#year");
  if(y) y.textContent = String(new Date().getFullYear());

  setupNav();
  setupLanguage();
  setupForm();
  setupLightbox();

  // portfolio
  renderPortfolioFilters();
  loadGallery();

  // Ensure initial language applied to nodes created after load
  applyTranslations();
}

document.addEventListener("DOMContentLoaded", init);
