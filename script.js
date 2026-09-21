(function () {
  const STORAGE_KEY = "vitarex_lang";
  let currentLang = "ru";

  const ICONS = {
    dropFill: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.8c-4.2 5.1-7.2 8.9-7.2 12.7a7.2 7.2 0 0 0 14.4 0c0-3.8-3-7.6-7.2-12.7Z"/></svg>`,
    tap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h9a4 4 0 0 1 4 4v1"/><path d="M17 10.5V6a2 2 0 0 1 2-2h1"/><circle cx="4" cy="9" r="1.5" fill="currentColor" stroke="none"/><path d="M9 14v3a3 3 0 0 1-3 3H5"/><path d="M9 14v6"/></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 11.5 12 4l8.5 7.5"/><path d="M6 10v9.5h12V10"/><path d="M10 19.5v-6h4v6"/></svg>`,
    layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>`,
    building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3.5" width="9" height="17" rx="1"/><path d="M14 9h5v11.5h-5"/><path d="M8 7h1M11 7h1M8 10.5h1M11 10.5h1M8 14h1M11 14h1"/></svg>`,
    wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5 6.5 21l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.8-.9-.9-2.8 2.6-2.6Z"/></svg>`,
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v9H3z"/><path d="M14 10.5h4l3 3V16h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5"/><path d="M4 20v-4.5h4.5"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 19 6v5.5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-2.5Z"/><path d="m9 12 2 2 4-4"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5h16v10H9l-4 3.5v-3.5H4z"/></svg>`,
    gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15a8 8 0 1 1 16 0"/><path d="M12 15l4-5"/><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 5 6.1 1.5 1.5 0 0 1 6.5 3.5Z"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 3.5 3 10.4l6.2 2.4M20.5 3.5 14 20.5l-4.8-7.7M20.5 3.5 9.2 12.8"/></svg>`,
    camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6.5" width="18" height="13" rx="2.5"/><circle cx="12" cy="13" r="3.4"/><path d="M8 6.5 9.3 4h5.4L16 6.5"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 7"/></svg>`,
    quote: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 6c-3 1.3-4.8 3.7-4.8 6.9 0 2.6 1.7 4.4 3.9 4.4 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.8-3.1.3-1.8 1.7-3.3 3.4-4.1L9.5 6Zm9 0c-3 1.3-4.8 3.7-4.8 6.9 0 2.6 1.7 4.4 3.9 4.4 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.8-3.1.3-1.8 1.7-3.3 3.4-4.1L18.5 6Z"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 10 5 5 5-5"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 17.5 4 20l2.6-2.4A8 8 0 1 1 9.5 19.2L6.5 17.5Z"/><path d="M9 10c0 3 2 5 5 5 .5 0 1-.7 1-1.3s-1.3-1.4-1.7-1.4-.5.5-.8.5c-.5 0-2-1-2-2.5 0-.3.5-.3.5-.8s-.8-1.7-1.4-1.7S9 8.5 9 10Z" fill="currentColor" stroke="none"/></svg>`,
  };

  function icon(key) {
    return ICONS[key] || "";
  }

  function applyTranslations(lang) {
    const dict = TRANSLATIONS[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });
    document.documentElement.lang = lang;
  }

  function renderStaticIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      el.innerHTML = icon(el.getAttribute("data-icon"));
    });
  }

  function renderCatalog(lang) {
    const grid = document.getElementById("catalogGrid");
    const dict = TRANSLATIONS[lang];
    grid.innerHTML = CATALOG[lang]
      .map(
        (item) => `
        <article class="product-card${item.featured ? " product-card--featured" : ""}" data-reveal>
          <div class="product-card__media">
            <span class="product-card__badge">${item.badge}</span>
            <span class="product-card__icon">${icon(item.icon)}</span>
          </div>
          <div class="product-card__body">
            <h3>${item.name}</h3>
            <p class="product-card__desc">${item.desc}</p>
            <div class="product-card__specs">
              ${item.specs.map((s) => `<span class="spec-chip">${s}</span>`).join("")}
            </div>
            <div class="product-card__footer">
              <div class="product-card__price">
                ${item.price} <small>${dict.price_currency}</small>
              </div>
              <a class="btn-circle" href="${buildTelegramLink(item.name, lang)}" target="_blank" rel="noopener" aria-label="${dict.order_btn}">
                ${icon("arrow")}
              </a>
            </div>
          </div>
        </article>`
      )
      .join("");
  }

  function renderAdvantages(lang) {
    const grid = document.getElementById("advantagesGrid");
    grid.innerHTML = ADVANTAGES[lang]
      .map(
        (a) => `
        <div class="advantage-card" data-reveal>
          <span class="advantage-card__icon">${icon(a.icon)}</span>
          <h3>${a.title}</h3>
          <p>${a.text}</p>
        </div>`
      )
      .join("");
  }

  function renderSteps(lang) {
    const grid = document.getElementById("stepsGrid");
    grid.innerHTML = STEPS[lang]
      .map(
        (s, i) => `
        <div class="step-card" data-reveal>
          <div class="step-card__num">${i + 1}</div>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </div>`
      )
      .join("");
  }

  function renderReviews(lang) {
    const grid = document.getElementById("reviewsGrid");
    grid.innerHTML = REVIEWS[lang]
      .map(
        (r) => `
        <div class="review-card" data-reveal>
          <span class="review-card__quote">${icon("quote")}</span>
          <div class="review-card__stars">★★★★★</div>
          <p class="review-card__text">${r.text}</p>
          <div class="review-card__author">
            <span class="review-card__avatar">${r.initial}</span>
            ${r.name}
          </div>
        </div>`
      )
      .join("");
  }

  function renderCompare(lang) {
    const table = document.getElementById("compareTable");
    const dict = TRANSLATIONS[lang];
    const items = CATALOG[lang];
    const rows = [
      { key: "steps", label: dict.compare_row_steps },
      { key: "resource", label: dict.compare_row_resource },
      { key: "performance", label: dict.compare_row_performance },
      { key: "bestFor", label: dict.compare_row_bestfor },
    ];

    const head = `
      <thead>
        <tr>
          <th class="compare-table__corner"></th>
          ${items.map((item) => `<th>${item.name}</th>`).join("")}
        </tr>
      </thead>`;

    const bodyRows = rows
      .map(
        (row) => `
        <tr>
          <th scope="row">${row.label}</th>
          ${items.map((item) => `<td>${item[row.key]}</td>`).join("")}
        </tr>`
      )
      .join("");

    const priceRow = `
      <tr class="compare-table__price-row">
        <th scope="row">${dict.compare_row_price}</th>
        ${items.map((item) => `<td>${item.price} <small>${dict.price_currency}</small></td>`).join("")}
      </tr>`;

    const ctaRow = `
      <tr>
        <th scope="row"></th>
        ${items
          .map(
            (item) =>
              `<td><a class="btn-circle" href="${buildTelegramLink(item.name, lang)}" target="_blank" rel="noopener" aria-label="${dict.order_btn}">${icon("arrow")}</a></td>`
          )
          .join("")}
      </tr>`;

    table.innerHTML = `${head}<tbody>${bodyRows}${priceRow}${ctaRow}</tbody>`;
  }

  function renderFaq(lang) {
    const list = document.getElementById("faqList");
    list.innerHTML = FAQ[lang]
      .map(
        (item, i) => `
        <div class="faq-item" data-reveal>
          <button type="button" class="faq-item__question" aria-expanded="false" data-faq-toggle="${i}">
            <span>${item.q}</span>
            <span class="faq-item__chevron">${icon("chevron")}</span>
          </button>
          <div class="faq-item__answer"><p>${item.a}</p></div>
        </div>`
      )
      .join("");

    list.querySelectorAll("[data-faq-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const isOpen = item.classList.contains("is-open");
        list.querySelectorAll(".faq-item.is-open").forEach((el) => {
          el.classList.remove("is-open");
          el.querySelector(".faq-item__question").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function renderFormOptions(lang) {
    const select = document.getElementById("formModelSelect");
    select.innerHTML = CATALOG[lang]
      .map((item) => `<option value="${item.name}">${item.name}</option>`)
      .join("");
  }

  function buildTelegramLink(modelName, lang) {
    const text =
      lang === "uz"
        ? `Salom! Vitarex — ${modelName} modeli bilan qiziqyapman.`
        : `Здравствуйте! Интересует модель Vitarex — ${modelName}.`;
    return `https://t.me/Vitarex_admin?text=${encodeURIComponent(text)}`;
  }

  function safeStorage(action, value) {
    try {
      return action === "get" ? localStorage.getItem(STORAGE_KEY) : localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      return null;
    }
  }

  function setLang(lang) {
    currentLang = lang;
    safeStorage("set", lang);
    applyTranslations(lang);
    renderCatalog(lang);
    renderCompare(lang);
    renderAdvantages(lang);
    renderSteps(lang);
    renderReviews(lang);
    renderFaq(lang);
    renderFormOptions(lang);
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    initReveal();
  }

  function initLangSwitch() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
  }

  function initMobileNav() {
    const header = document.getElementById("siteHeader");
    const burger = document.getElementById("burgerBtn");
    burger.addEventListener("click", () => header.classList.toggle("nav-open"));
    document.getElementById("mainNavMobile").querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => header.classList.remove("nav-open"));
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById("siteHeader");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initDemoBanner() {
    const banner = document.getElementById("demoBanner");
    document.getElementById("demoBannerClose").addEventListener("click", () => {
      banner.classList.add("hidden");
    });
  }

  function initOrderForm() {
    const form = document.getElementById("orderForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const model = form.model.value;
      const text =
        currentLang === "uz"
          ? `Salom! Ismim ${name}, telefon: ${phone}. ${model} modeli bo'yicha ariza qoldirmoqchiman.`
          : `Здравствуйте! Меня зовут ${name}, телефон: ${phone}. Хочу оставить заявку на модель ${model}.`;
      window.open(`https://t.me/Vitarex_admin?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
  }

  function initCountUp() {
    const el = document.querySelector("[data-count]");
    if (!el || el.dataset.counted) return;
    const target = parseInt(el.getAttribute("data-count"), 10);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || el.dataset.counted) return;
          el.dataset.counted = "1";
          const duration = 1200;
          const start = performance.now();
          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toLocaleString("ru-RU");
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
  }

  let revealObserver;
  function initReveal() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => revealObserver.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    renderStaticIcons();
    initLangSwitch();
    initMobileNav();
    initHeaderScroll();
    initDemoBanner();
    initOrderForm();
    initCountUp();

    const saved = safeStorage("get");
    setLang(saved === "uz" ? "uz" : "ru");
  });
})();
