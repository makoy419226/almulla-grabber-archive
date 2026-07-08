(() => {
  const storageKey = "almulla_cookie_consent_v1";
  const version = 1;

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
    clearRoot();
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

  const closeModal = () => {
    if (readPreferences()) {
      clearRoot();
    } else {
      renderBanner();
    }
  };

  const renderBanner = () => {
    const root = getRoot();
    root.innerHTML = `
      <section class="cookie-banner" aria-label="Cookie notice">
        <div class="cookie-banner-icon" aria-hidden="true">i</div>
        <div class="cookie-banner-copy">
          <h2>We use cookies</h2>
          <p>We use cookies to keep the website working, understand how it is used, and improve your browsing experience. You can manage your preferences at any time.</p>
          <a class="cookie-text-link" href="/privacy-policy/">View our Privacy Policy</a>
        </div>
        <div class="cookie-banner-actions">
          <button type="button" class="cookie-action cookie-action-primary" data-cookie-accept>Accept All</button>
          <button type="button" class="cookie-action cookie-action-muted" data-cookie-manage>Manage Cookies</button>
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
      <div class="cookie-modal-shell" role="presentation">
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
        renderPreferences(draft);
      });
    });
  };

  const openPreferences = () => {
    renderPreferences(readPreferences() || defaultPreferences());
  };

  const init = () => {
    document.querySelectorAll("[data-cookie-preferences]").forEach((element) => {
      element.addEventListener("click", openPreferences);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.querySelector(".cookie-modal-shell")) {
        closeModal();
      }
    });

    window.AlmullaCookieConsent = {
      getPreferences: readPreferences,
      openPreferences,
    };

    if (!readPreferences()) {
      renderBanner();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
