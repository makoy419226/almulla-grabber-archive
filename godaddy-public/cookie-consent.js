(() => {
  const storageKey = "almulla_cookie_consent_v1";
  const version = 1;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const closeAnimationMs = 320;
  let pageScrollLocked = false;
  let previousBodyOverflow = "";

  const privacyPolicySections = [
    {
      title: "Information We Collect",
      body: [
        "We may collect information you provide directly, such as your name, email address, phone number, company details, and the content of enquiries you send to us.",
        "When you use the website, we may also collect technical information such as browser type, device information, pages visited, approximate location derived from network data, and cookie preferences.",
      ],
    },
    {
      title: "How We Use Information",
      body: [
        "We use information to respond to enquiries, manage business communications, operate and secure the website, improve website content and performance, and meet legal or regulatory obligations.",
        "We do not sell personal information. Where marketing or analytics tools are used, non-essential cookies are controlled through the cookie preference manager.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "Cookies are small files stored by your browser. We use functional cookies that are necessary for basic website operation and may use analytical, preference, or targeted cookies only according to your saved choices.",
        "You can accept all cookies, reject non-essential cookies, or manage individual categories at any time from the website footer.",
      ],
    },
    {
      title: "Cookie Categories",
      body: [
        "Functional cookies are always active because they support security, consent storage, and basic browsing features.",
        "Analytical cookies help us understand website usage. Preference cookies remember browsing choices. Targeted or advertising cookies support relevant campaign measurement if such tools are enabled.",
      ],
    },
    {
      title: "Sharing Information",
      body: [
        "We may share information with service providers, professional advisers, affiliated entities, or public authorities where necessary for website operations, business administration, legal compliance, or protection of rights.",
        "Service providers are expected to process information only for the purposes we specify and to apply appropriate safeguards.",
      ],
    },
    {
      title: "Retention And Security",
      body: [
        "We keep personal information only for as long as needed for the purposes described in this policy, unless a longer retention period is required or permitted by law.",
        "We use reasonable technical and organisational measures to protect information, but no website or email transmission can be guaranteed to be completely secure.",
      ],
    },
    {
      title: "Your Choices And Rights",
      body: [
        "Depending on applicable law, you may have rights to request access, correction, deletion, restriction, objection, or withdrawal of consent for certain uses of your personal information.",
        "You can change your cookie preferences at any time using the Manage Cookies control in the footer.",
      ],
    },
    {
      title: "Updates To This Policy",
      body: [
        "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised last updated date.",
      ],
    },
  ];

  const categories = [
    {
      key: "functional",
      title: "Functional",
      description:
        "Required for the website to work, including security and basic browsing features.",
      required: true,
    },
    {
      key: "analytical",
      title: "Analytical",
      description:
        "Measures how visitors use the website so we can improve content and performance.",
    },
    {
      key: "preference",
      title: "Preference",
      description: "Remembers browsing choices such as cookie settings and display preferences.",
    },
    {
      key: "targeted",
      title: "Targeted / Advertising",
      description:
        "Supports relevant campaign measurement if advertising or marketing tools are added.",
    },
  ];

  const defaultPreferences = () => ({
    functional: true,
    analytical: false,
    preference: false,
    targeted: false,
    version,
    updatedAt: new Date().toISOString(),
  });

  const allOptionalPreferences = (enabled) => ({
    functional: true,
    analytical: enabled,
    preference: enabled,
    targeted: enabled,
    version,
    updatedAt: new Date().toISOString(),
  });

  const readPreferences = () => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      if (parsed.version !== version) return null;

      return {
        functional: true,
        analytical: Boolean(parsed.analytical),
        preference: Boolean(parsed.preference),
        targeted: Boolean(parsed.targeted),
        version,
        updatedAt:
          typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
      };
    } catch {
      return null;
    }
  };

  const savePreferences = (preferences) => {
    const nextPreferences = {
      ...preferences,
      functional: true,
      version,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(storageKey, JSON.stringify(nextPreferences));
    window.dispatchEvent(
      new CustomEvent("almulla-cookie-consent-change", { detail: nextPreferences }),
    );
    closeCurrentSurface(clearRoot);
  };

  const getRoot = () => {
    let root = document.getElementById("cookie-consent-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "cookie-consent-root";
      document.body.appendChild(root);
    }
    return root;
  };

  const clearRoot = () => {
    const root = document.getElementById("cookie-consent-root");
    if (root) root.innerHTML = "";
  };

  const isPrivacyPolicyRoute = () =>
    window.location.pathname.replace(/\/$/, "") === "/privacy-policy";

  const lockPageScroll = () => {
    if (pageScrollLocked) return;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pageScrollLocked = true;
  };

  const unlockPageScroll = () => {
    if (!pageScrollLocked) return;
    document.body.style.overflow = previousBodyOverflow;
    pageScrollLocked = false;
  };

  const closeCurrentSurface = (afterClose) => {
    const root = document.getElementById("cookie-consent-root");
    const modalShell = root?.querySelector(".cookie-modal-shell, .privacy-modal-shell");

    if (!modalShell) {
      unlockPageScroll();
      afterClose();
      return;
    }

    modalShell.dataset.state = "closed";
    window.setTimeout(() => {
      unlockPageScroll();
      afterClose();
    }, reducedMotionQuery.matches ? 0 : closeAnimationMs);
  };

  const closeModal = () => {
    closeCurrentSurface(() => {
      if (readPreferences()) {
        clearRoot();
      } else {
        renderBanner();
      }
    });
  };

  const closePrivacyPolicy = () => {
    closeCurrentSurface(() => {
      if (isPrivacyPolicyRoute()) {
        window.location.href = "/";
        return;
      }

      if (readPreferences()) {
        clearRoot();
      } else {
        renderBanner();
      }
    });
  };

  const renderPrivacyPolicy = () => {
    lockPageScroll();
    const root = getRoot();
    const sectionMarkup = privacyPolicySections
      .map(
        (section) => `
          <article class="privacy-modal-card">
            <h3>${section.title}</h3>
            ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </article>
        `,
      )
      .join("");

    root.innerHTML = `
      <div class="privacy-modal-shell" role="presentation" data-state="open">
        <div class="privacy-modal-backdrop" data-privacy-close></div>
        <section class="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-modal-title">
          <div class="privacy-modal-header">
            <div>
              <p class="privacy-modal-kicker">Privacy</p>
              <h2 id="privacy-modal-title">Privacy Policy</h2>
              <p class="privacy-modal-intro">This policy explains how AlMulla Holding Group handles information collected through this website and related business enquiries.</p>
              <p class="privacy-modal-updated">Last updated: 8 July 2026</p>
            </div>
            <button type="button" class="privacy-modal-close" aria-label="Close Privacy Policy" data-privacy-close>x</button>
          </div>
          <div class="privacy-modal-content">
            <article class="privacy-modal-card">
              <p class="section-eyebrow">Overview</p>
              <h3>Our commitment</h3>
              <p>AlMulla Holding Group respects your privacy and is committed to handling personal information responsibly. This Privacy Policy applies to almullaholding.com and to information submitted through website-related communications.</p>
              <p>This website is intended for general corporate information and business enquiries. Please avoid submitting sensitive personal information unless we specifically ask for it.</p>
            </article>
            ${sectionMarkup}
            <article class="privacy-modal-card">
              <p class="section-eyebrow">Contact</p>
              <h3>Privacy enquiries</h3>
              <p>For questions about this Privacy Policy or privacy-related requests, contact AlMulla Holding Group using the details below.</p>
              <div class="privacy-modal-contact">
                <a href="mailto:info@almullaholding.com">info@almullaholding.com</a>
                <a href="tel:+97142249662">04 224 9662</a>
              </div>
            </article>
          </div>
        </section>
      </div>
    `;

    root.querySelectorAll("[data-privacy-close]").forEach((element) => {
      element.addEventListener("click", closePrivacyPolicy);
    });
  };

  const renderBanner = () => {
    const root = getRoot();
    root.innerHTML = `
      <section class="cookie-banner" aria-label="Cookie notice">
        <div class="cookie-banner-icon" aria-hidden="true">i</div>
        <div class="cookie-banner-copy">
          <h2>We use cookies</h2>
          <p>We use cookies to keep the website working, understand how it is used, and improve your browsing experience. You can manage your preferences at any time.</p>
          <button type="button" class="cookie-text-link" data-privacy-policy aria-haspopup="dialog">View our Privacy Policy</button>
        </div>
        <div class="cookie-banner-actions">
          <button type="button" class="cookie-action cookie-action-primary" data-cookie-accept>Accept All</button>
          <button type="button" class="cookie-action cookie-action-muted" data-cookie-manage aria-haspopup="dialog">Manage Cookies</button>
          <button type="button" class="cookie-action cookie-action-muted" data-cookie-reject>Reject All</button>
        </div>
      </section>
    `;

    root.querySelector("[data-cookie-accept]").addEventListener("click", () => {
      savePreferences(allOptionalPreferences(true));
    });
    root.querySelector("[data-cookie-reject]").addEventListener("click", () => {
      savePreferences(allOptionalPreferences(false));
    });
    root.querySelector("[data-cookie-manage]").addEventListener("click", () => {
      renderPreferences(readPreferences() || defaultPreferences());
    });
  };

  const renderPreferences = (draft) => {
    lockPageScroll();
    const root = getRoot();
    const categoryMarkup = categories
      .map((category) => {
        const checked = category.required ? true : Boolean(draft[category.key]);
        const control = category.required
          ? '<span class="cookie-required">Always active</span>'
          : `<button type="button" class="cookie-switch" role="switch" aria-checked="${checked}" data-cookie-toggle="${category.key}"><span></span></button>`;

        return `
          <div class="cookie-category">
            <div>
              <h3>${category.title}</h3>
              <p>${category.description}</p>
            </div>
            ${control}
          </div>
        `;
      })
      .join("");

    const lastSaved = readPreferences();
    const lastSavedMarkup = lastSaved
      ? `<p class="cookie-last-updated">Last saved ${new Date(lastSaved.updatedAt).toLocaleDateString("en-GB")}</p>`
      : "";

    root.innerHTML = `
      <div class="cookie-modal-shell" role="presentation" data-state="open">
        <div class="cookie-modal-backdrop" data-cookie-close></div>
        <section class="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title">
          <div class="cookie-modal-header">
            <div>
              <p class="cookie-modal-kicker">Privacy controls</p>
              <h2 id="cookie-preferences-title">Manage Cookie Consent Preferences</h2>
            </div>
            <button type="button" class="cookie-icon-button" aria-label="Close cookie preferences" data-cookie-close>x</button>
          </div>
          <div class="cookie-category-list">${categoryMarkup}</div>
          <div class="cookie-modal-actions">
            <button type="button" class="cookie-action cookie-action-primary" data-cookie-accept>Accept All</button>
            <button type="button" class="cookie-action cookie-action-muted" data-cookie-reject>Reject All</button>
            <button type="button" class="cookie-action cookie-action-outline" data-cookie-save>Save Preferences</button>
          </div>
          ${lastSavedMarkup}
        </section>
      </div>
    `;

    root.querySelectorAll("[data-cookie-close]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });
    root.querySelector("[data-cookie-accept]").addEventListener("click", () => {
      savePreferences(allOptionalPreferences(true));
    });
    root.querySelector("[data-cookie-reject]").addEventListener("click", () => {
      savePreferences(allOptionalPreferences(false));
    });
    root.querySelector("[data-cookie-save]").addEventListener("click", () => {
      savePreferences(draft);
    });
    root.querySelectorAll("[data-cookie-toggle]").forEach((element) => {
      element.addEventListener("click", () => {
        const key = element.getAttribute("data-cookie-toggle");
        draft[key] = !Boolean(draft[key]);
        element.setAttribute("aria-checked", String(Boolean(draft[key])));
      });
    });
  };

  const openPreferences = () => {
    renderPreferences(readPreferences() || defaultPreferences());
  };

  const init = () => {
    if (isPrivacyPolicyRoute()) {
      document.documentElement.classList.add("privacy-modal-route");
    }

    document.addEventListener("click", (event) => {
      const privacyLink = event.target.closest?.("[data-privacy-policy]");
      if (privacyLink) {
        event.preventDefault();
        renderPrivacyPolicy();
      }
    });

    document.querySelectorAll("[data-cookie-preferences]").forEach((element) => {
      element.addEventListener("click", openPreferences);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.querySelector(".cookie-modal-shell")) {
        closeModal();
      } else if (event.key === "Escape" && document.querySelector(".privacy-modal-shell")) {
        closePrivacyPolicy();
      }
    });

    window.AlmullaCookieConsent = {
      getPreferences: readPreferences,
      openPreferences,
      openPrivacyPolicy: renderPrivacyPolicy,
    };

    if (!readPreferences()) {
      renderBanner();
    }

    if (isPrivacyPolicyRoute()) {
      renderPrivacyPolicy();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
