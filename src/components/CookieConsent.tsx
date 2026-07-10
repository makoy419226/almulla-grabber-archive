import { Cookie, Settings, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { COOKIE_CONSENT_OPEN_EVENT } from "@/lib/cookie-consent";
import { openPrivacyPolicyModal } from "@/lib/privacy-policy";

const STORAGE_KEY = "almulla_cookie_consent_v1";
const CONSENT_VERSION = 1;

type OptionalCookieKey = "analytical" | "preference" | "targeted";

type CookiePreferences = {
  functional: true;
  analytical: boolean;
  preference: boolean;
  targeted: boolean;
  version: number;
  updatedAt: string;
};

type CookieCategory = {
  key: "functional" | OptionalCookieKey;
  title: string;
  description: string;
  required?: boolean;
};

const cookieCategories: CookieCategory[] = [
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
    description: "Measures how visitors use the website so we can improve content and performance.",
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

const defaultPreferences = (): CookiePreferences => ({
  functional: true,
  analytical: false,
  preference: false,
  targeted: false,
  version: CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
});

const allOptionalPreferences = (enabled: boolean): CookiePreferences => ({
  functional: true,
  analytical: enabled,
  preference: enabled,
  targeted: enabled,
  version: CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
});

function readStoredPreferences() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as Partial<CookiePreferences>;
    if (parsed.version !== CONSENT_VERSION) return null;

    return {
      functional: true,
      analytical: Boolean(parsed.analytical),
      preference: Boolean(parsed.preference),
      targeted: Boolean(parsed.targeted),
      version: CONSENT_VERSION,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    } satisfies CookiePreferences;
  } catch {
    return null;
  }
}

function persistPreferences(preferences: CookiePreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(new CustomEvent("almulla-cookie-consent-change", { detail: preferences }));
}

export function CookieConsent() {
  const [hydrated, setHydrated] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [renderPreferencesModal, setRenderPreferencesModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => defaultPreferences());

  const storedPreferences = useMemo(() => (hydrated ? readStoredPreferences() : null), [hydrated]);

  useEffect(() => {
    const stored = readStoredPreferences();
    if (stored) {
      setPreferences(stored);
      setBannerOpen(false);
    } else {
      setBannerOpen(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleOpenPreferences = () => {
      const stored = readStoredPreferences();
      if (stored) {
        setPreferences(stored);
      }
      setBannerOpen(false);
      setPreferencesOpen(true);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpenPreferences);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreferencesOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [preferencesOpen]);

  useEffect(() => {
    if (preferencesOpen) {
      setRenderPreferencesModal(true);
    }
  }, [preferencesOpen]);

  useEffect(() => {
    if (preferencesOpen || !renderPreferencesModal) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(
      () => setRenderPreferencesModal(false),
      prefersReducedMotion ? 0 : 300,
    );

    return () => window.clearTimeout(timeout);
  }, [preferencesOpen, renderPreferencesModal]);

  const savePreferences = (nextPreferences: CookiePreferences) => {
    persistPreferences(nextPreferences);
    setPreferences(nextPreferences);
    setBannerOpen(false);
    setPreferencesOpen(false);
  };

  const handleToggle = (key: OptionalCookieKey, checked: boolean) => {
    setPreferences((current) => ({
      ...current,
      [key]: checked,
      functional: true,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleAcceptAll = () => savePreferences(allOptionalPreferences(true));
  const handleRejectAll = () => savePreferences(allOptionalPreferences(false));
  const handleSaveCurrent = () => {
    savePreferences({
      ...preferences,
      functional: true,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
    });
  };

  if (!hydrated) return null;

  return (
    <>
      {bannerOpen && !preferencesOpen && (
        <section className="cookie-banner" aria-label="Cookie notice">
          <div className="cookie-banner-icon" aria-hidden="true">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="cookie-banner-copy">
            <h2>We use cookies</h2>
            <p>
              We use cookies to keep the website working, understand how it is used, and improve
              your browsing experience. You can manage your preferences at any time.
            </p>
            <button
              type="button"
              className="cookie-text-link"
              aria-haspopup="dialog"
              onClick={openPrivacyPolicyModal}
            >
              View our Privacy Policy
            </button>
          </div>
          <div className="cookie-banner-actions">
            <button
              type="button"
              className="cookie-action cookie-action-primary"
              onClick={handleAcceptAll}
            >
              Accept All
            </button>
            <button
              type="button"
              className="cookie-action cookie-action-muted"
              aria-haspopup="dialog"
              onClick={() => setPreferencesOpen(true)}
            >
              <Settings className="h-4 w-4" />
              Manage Cookies
            </button>
            <button
              type="button"
              className="cookie-action cookie-action-muted"
              onClick={handleRejectAll}
            >
              Reject All
            </button>
          </div>
        </section>
      )}

      {renderPreferencesModal && (
        <div
          className="cookie-modal-shell"
          role="presentation"
          data-state={preferencesOpen ? "open" : "closed"}
          onAnimationEnd={(event) => {
            if (event.currentTarget === event.target && !preferencesOpen) {
              setRenderPreferencesModal(false);
            }
          }}
        >
          <div className="cookie-modal-backdrop" onClick={() => setPreferencesOpen(false)} />
          <section
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
          >
            <div className="cookie-modal-header">
              <div>
                <p className="cookie-modal-kicker">Privacy controls</p>
                <h2 id="cookie-preferences-title">Manage Cookie Consent Preferences</h2>
              </div>
              <button
                type="button"
                className="cookie-icon-button"
                aria-label="Close cookie preferences"
                onClick={() => setPreferencesOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="cookie-category-list">
              {cookieCategories.map((category) => {
                const checked = category.required
                  ? true
                  : preferences[category.key as OptionalCookieKey];

                return (
                  <div className="cookie-category" key={category.key}>
                    <div>
                      <h3>{category.title}</h3>
                      <p>{category.description}</p>
                    </div>
                    {category.required ? (
                      <span className="cookie-required">Always active</span>
                    ) : (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        className="cookie-switch"
                        data-state={checked ? "checked" : "unchecked"}
                        onClick={() => handleToggle(category.key as OptionalCookieKey, !checked)}
                      >
                        <span />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="cookie-modal-actions">
              <button
                type="button"
                className="cookie-action cookie-action-primary"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
              <button
                type="button"
                className="cookie-action cookie-action-muted"
                onClick={handleRejectAll}
              >
                Reject All
              </button>
              <button
                type="button"
                className="cookie-action cookie-action-outline"
                onClick={handleSaveCurrent}
              >
                Save Preferences
              </button>
            </div>

            {storedPreferences && (
              <p className="cookie-last-updated">
                Last saved {new Date(storedPreferences.updatedAt).toLocaleDateString("en-GB")}
              </p>
            )}
          </section>
        </div>
      )}
    </>
  );
}
