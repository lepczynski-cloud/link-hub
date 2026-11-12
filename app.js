(() => {
  "use strict";

  const config = window.LINK_HUB_CONFIG;

  if (!config) {
    document.getElementById("link-sections").innerHTML =
      '<p class="config-error">The page configuration could not be loaded.</p>';
    return;
  }

  const icons = {
    blog: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9a3 3 0 0 1 3 3v15l-6-3-6 3V3Z"/><path d="M9 8h6M9 12h5"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.3 7.2a3 3 0 0 0-2.1-2.1C17.4 4.6 12 4.6 12 4.6s-5.4 0-7.2.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2.2 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8Z"/><path d="m10 15.2 5-3.2-5-3.2v6.4Z" class="icon-fill"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.4 8.2H3.2V21h3.2V8.2ZM4.8 3A1.9 1.9 0 1 0 4.8 6.8 1.9 1.9 0 0 0 4.8 3ZM21 13.7c0-3.9-2.1-5.7-4.9-5.7a4.2 4.2 0 0 0-3.8 2.1V8.2H9.1V21h3.2v-6.3c0-1.7.3-3.3 2.4-3.3s2.1 1.9 2.1 3.4V21H21v-7.3Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3V5Z"/><path d="m4 7 8 6 8-6"/></svg>',
    compass: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/></svg>',
    terminal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 12l2-2 2 2 3-4 3 3"/></svg>',
    dial: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M21 12h-3M12 21v-3M3 12h3"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9"/><path d="M19 13v6H5V5h6"/></svg>'
  };

  const allowedProtocols = new Set(["https:", "http:", "mailto:"]);

  function isSafeUrl(value) {
    try {
      const url = new URL(value, window.location.href);
      return allowedProtocols.has(url.protocol);
    } catch {
      return false;
    }
  }

  function icon(name) {
    return icons[name] || icons.external;
  }

  function isExternalWebUrl(url) {
    return /^https?:/i.test(url);
  }

  function applyPageMetadata() {
    if (!config.page) return;

    if (config.page.title) {
      document.title = config.page.title;
      document.querySelector('meta[property="og:title"]')?.setAttribute("content", config.page.title);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", config.page.title);
    }

    if (config.page.description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", config.page.description);
    }
  }

  function renderProfile() {
    const profile = config.profile || {};
    const avatar = document.getElementById("profile-avatar");
    const fallback = document.getElementById("avatar-fallback");

    document.getElementById("profile-name").textContent = profile.name || "";
    document.getElementById("profile-eyebrow").textContent = profile.eyebrow || "";
    document.getElementById("profile-bio").textContent = profile.bio || "";
    fallback.textContent = profile.initials || "";

    if (profile.avatar && isSafeUrl(profile.avatar)) {
      avatar.src = profile.avatar;
      avatar.alt = profile.name || "Profile photo";
      avatar.addEventListener("load", () => {
        avatar.classList.add("is-loaded");
        fallback.classList.add("is-hidden");
      }, { once: true });
      avatar.addEventListener("error", () => {
        avatar.removeAttribute("src");
        avatar.classList.remove("is-loaded");
        fallback.classList.remove("is-hidden");
      }, { once: true });
    }
  }

  function renderSocials() {
    const container = document.getElementById("socials");
    const links = (config.socialLinks || []).filter(item => item.enabled !== false && isSafeUrl(item.url));

    links.forEach((item, index) => {
      const anchor = document.createElement("a");
      anchor.className = "social-link reveal-item";
      anchor.href = item.url;
      anchor.setAttribute("aria-label", item.label);
      anchor.setAttribute("title", item.label);
      anchor.style.setProperty("--delay", `${80 + index * 45}ms`);
      anchor.innerHTML = icon(item.icon);

      if (isExternalWebUrl(item.url)) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }

      container.appendChild(anchor);
    });
  }

  function renderSections() {
    const container = document.getElementById("link-sections");
    let delayIndex = 0;

    (config.sections || []).forEach(section => {
      const visibleLinks = (section.links || []).filter(item => item.enabled !== false && isSafeUrl(item.url));
      if (!visibleLinks.length) return;

      const sectionElement = document.createElement("section");
      sectionElement.className = "link-section";

      const heading = document.createElement("h2");
      heading.className = "section-title reveal-item";
      heading.textContent = section.title || "Links";
      heading.style.setProperty("--delay", `${180 + delayIndex * 55}ms`);
      sectionElement.appendChild(heading);
      delayIndex += 1;

      const list = document.createElement("div");
      list.className = "link-list";

      visibleLinks.forEach(item => {
        const anchor = document.createElement("a");
        const classes = ["link-card", "reveal-item"];

        if (item.featured) classes.push("link-card--featured");
        if (item.compact) classes.push("link-card--compact");

        anchor.className = classes.join(" ");
        anchor.href = item.url;
        anchor.style.setProperty("--delay", `${210 + delayIndex * 55}ms`);
        delayIndex += 1;

        if (isExternalWebUrl(item.url)) {
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
        }

        const iconWrap = document.createElement("span");
        iconWrap.className = "link-card__icon";
        iconWrap.innerHTML = icon(item.icon);

        const content = document.createElement("span");
        content.className = "link-card__content";

        const titleRow = document.createElement("span");
        titleRow.className = "link-card__title-row";

        const title = document.createElement("span");
        title.className = "link-card__title";
        title.textContent = item.title || "Untitled link";
        titleRow.appendChild(title);

        if (item.badge) {
          const badge = document.createElement("span");
          badge.className = "link-card__badge";
          badge.textContent = item.badge;
          titleRow.appendChild(badge);
        }

        content.appendChild(titleRow);

        if (item.description) {
          const description = document.createElement("span");
          description.className = "link-card__description";
          description.textContent = item.description;
          content.appendChild(description);
        }

        const arrow = document.createElement("span");
        arrow.className = "link-card__arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.innerHTML = icon("external");

        anchor.append(iconWrap, content, arrow);
        list.appendChild(anchor);
      });

      sectionElement.appendChild(list);
      container.appendChild(sectionElement);
    });
  }

  function renderFooter() {
    document.getElementById("footer-copy").textContent = config.footer || "";
  }

  function enablePointerGlow() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frameId = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;

    const update = () => {
      document.documentElement.style.setProperty("--pointer-x", `${x}px`);
      document.documentElement.style.setProperty("--pointer-y", `${y}px`);
      frameId = null;
    };

    window.addEventListener("pointermove", event => {
      x = event.clientX;
      y = event.clientY;
      if (!frameId) frameId = window.requestAnimationFrame(update);
    }, { passive: true });
  }

  applyPageMetadata();
  renderProfile();
  renderSocials();
  renderSections();
  renderFooter();
  enablePointerGlow();

  window.requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });
})();
