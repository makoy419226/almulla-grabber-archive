(() => {
  const desktopQuery = window.matchMedia("(min-width: 1280px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const closeAnimationMs = 320;

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "Who We Are" },
    { href: "/#businesses", label: "What We Do" },
    { href: "/contact-us/", label: "Get In Touch" },
    { href: "/privacy-policy/", label: "Privacy Policy", privacy: true },
  ];

  const buildMenu = () => {
    const menu = document.createElement("div");
    menu.id = "site-mobile-menu";
    menu.className = "site-mobile-menu";
    menu.dataset.open = "false";
    menu.setAttribute("hidden", "");

    const links = menuLinks
      .map(
        (link) =>
          `<a href="${link.href}" data-menu-link${link.privacy ? ' data-privacy-policy aria-haspopup="dialog" onclick="if (window.AlmullaSitePreferences && window.AlmullaSitePreferences.openPrivacyPolicy) { event.preventDefault(); event.stopPropagation(); window.AlmullaSitePreferences.openPrivacyPolicy(); }"' : ""}>${link.label}</a>`,
      )
      .join("");

    menu.innerHTML = `
      <div class="site-mobile-menu-backdrop" data-menu-close></div>
      <aside class="site-mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
        <div class="site-mobile-menu-head">
          <a class="site-mobile-menu-logo" href="/" aria-label="AlMulla Holding home" data-menu-link>
            <picture>
              <source srcset="/logo.webp?v=5" type="image/webp" />
              <img class="logo" src="/logo.png?v=5" alt="AlMulla Holding Group" width="284" height="99" />
            </picture>
          </a>
          <button type="button" class="site-mobile-menu-close" aria-label="Close menu" data-menu-close>x</button>
        </div>
        <nav class="site-mobile-menu-links" aria-label="Mobile navigation">
          ${links}
        </nav>
        <div class="site-mobile-menu-contact">
          <p class="site-mobile-menu-contact-title">Let's Get In Touch</p>
          <div class="site-mobile-menu-contact-actions">
            <a href="tel:+97142249662" aria-label="Call AlMulla Holding" data-menu-link>Call</a>
            <a href="mailto:info@almullaholding.com" aria-label="Email AlMulla Holding" data-menu-link>Email</a>
            <a href="/contact-us/" aria-label="Go to contact page" data-menu-link>Send</a>
          </div>
        </div>
      </aside>
    `;

    document.body.appendChild(menu);
    return menu;
  };

  const init = () => {
    const toggle = document.querySelector("[data-menu-toggle]");
    if (!toggle) return;

    const menu = buildMenu();
    const closeTargets = menu.querySelectorAll("[data-menu-close], [data-menu-link]");
    let hideTimer = 0;

    const setOpen = (open) => {
      window.clearTimeout(hideTimer);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("site-menu-open", open);

      if (open) {
        menu.removeAttribute("hidden");
        window.requestAnimationFrame(() => {
          menu.dataset.open = "true";
          const closeButton = menu.querySelector("[data-menu-close]");
          if (closeButton) {
            closeButton.focus();
          }
        });
      } else {
        menu.dataset.open = "false";
        hideTimer = window.setTimeout(
          () => {
            if (menu.dataset.open !== "true") {
              menu.setAttribute("hidden", "");
            }
          },
          reducedMotionQuery.matches ? 0 : closeAnimationMs
        );
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(menu.dataset.open !== "true");
    });

    closeTargets.forEach((target) => {
      target.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    desktopQuery.addEventListener("change", (event) => {
      if (event.matches) {
        setOpen(false);
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
