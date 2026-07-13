import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Mail, Menu, Phone, Send, X } from "lucide-react";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import { CookieConsent } from "@/components/CookieConsent";
import { HeaderExperienceButton } from "@/components/HeaderExperienceButton";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { openCookiePreferences } from "@/lib/cookie-consent";
import { SECTORS_EXPERIENCE_ENABLED } from "@/lib/feature-flags";
import { PRIVACY_POLICY_OPEN_EVENT, openPrivacyPolicyModal } from "@/lib/privacy-policy";

const navLinkBase =
  "nav-hover-magnify inline-flex items-center rounded-md px-2 py-3 text-xs font-bold uppercase text-foreground/70 hover:text-primary lg:px-3 xl:px-4 xl:text-sm";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [renderMobileMenu, setRenderMobileMenu] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [renderPrivacyPolicyModal, setRenderPrivacyPolicyModal] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setRenderMobileMenu(true);
    }
  }, [open]);

  useEffect(() => {
    if (!renderMobileMenu) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!headerRef.current?.contains(target) && !mobileMenuRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, renderMobileMenu]);

  useEffect(() => {
    if (open || !renderMobileMenu) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(
      () => setRenderMobileMenu(false),
      prefersReducedMotion ? 0 : 320,
    );

    return () => window.clearTimeout(timeout);
  }, [open, renderMobileMenu]);

  const closeMobileMenu = () => setOpen(false);

  useEffect(() => {
    const handleOpenPrivacyPolicy = () => {
      setRenderPrivacyPolicyModal(true);
      setPrivacyPolicyOpen(true);
    };

    window.addEventListener(PRIVACY_POLICY_OPEN_EVENT, handleOpenPrivacyPolicy);
    return () => window.removeEventListener(PRIVACY_POLICY_OPEN_EVENT, handleOpenPrivacyPolicy);
  }, []);

  useEffect(() => {
    if (privacyPolicyOpen) {
      setRenderPrivacyPolicyModal(true);
    }
  }, [privacyPolicyOpen]);

  useEffect(() => {
    if (privacyPolicyOpen || !renderPrivacyPolicyModal) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(
      () => setRenderPrivacyPolicyModal(false),
      prefersReducedMotion ? 0 : 300,
    );

    return () => window.clearTimeout(timeout);
  }, [privacyPolicyOpen, renderPrivacyPolicyModal]);

  useEffect(() => {
    if (!renderPrivacyPolicyModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPrivacyPolicyOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [renderPrivacyPolicyModal]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header ref={headerRef} className="site-header-shell sticky top-0 z-50">
        <div className="flex h-[5.75rem] w-full items-center gap-7 px-4 sm:px-6 lg:px-10">
          <Link to="/" className="shrink-0" aria-label="AlMulla Holding home">
            <AlmullaLogo />
          </Link>

          <nav
            className="ml-auto hidden items-center justify-end gap-1 text-right md:flex lg:gap-3 xl:gap-5"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className={navLinkBase}
              activeProps={{ className: `${navLinkBase} text-primary after:scale-x-100` }}
            >
              <span className="nav-echo" data-label="Home">
                <span>Home</span>
              </span>
            </Link>
            {SECTORS_EXPERIENCE_ENABLED && <HeaderExperienceButton />}
            <Link
              to="/about-us"
              className={navLinkBase}
              activeProps={{ className: `${navLinkBase} text-primary after:scale-x-100` }}
            >
              <span className="nav-echo" data-label="Who We Are">
                <span>Who We Are</span>
              </span>
            </Link>
            <Link
              to="/contact-us"
              className={navLinkBase}
              activeProps={{ className: `${navLinkBase} text-primary after:scale-x-100` }}
            >
              <span className="nav-echo" data-label="Get In Touch">
                <span>Get In Touch</span>
              </span>
            </Link>
          </nav>

          <button
            className="mobile-menu-trigger ml-auto md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            data-state={open ? "open" : "closed"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {renderMobileMenu && (
        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          className="mobile-menu-overlay fixed inset-0 z-[80] md:hidden"
          data-state={open ? "open" : "closed"}
          onAnimationEnd={(event) => {
            if (event.currentTarget === event.target && !open) {
              setRenderMobileMenu(false);
            }
          }}
        >
          <div
            className="flex h-full flex-col px-6 pb-8 pt-5 sm:px-10"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-start justify-between gap-6">
              <Link
                to="/"
                className="mobile-menu-logo"
                aria-label="AlMulla Holding home"
                onClick={closeMobileMenu}
              >
                <AlmullaLogo />
              </Link>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mobile-menu-links" aria-label="Mobile navigation">
              {SECTORS_EXPERIENCE_ENABLED && (
                <HeaderExperienceButton mobile onNavigate={closeMobileMenu} />
              )}
              <Link
                to="/about-us"
                className="mobile-menu-link"
                activeProps={{ className: "text-primary" }}
                onClick={closeMobileMenu}
              >
                Who We Are
              </Link>
              <a href="/#businesses" className="mobile-menu-link" onClick={closeMobileMenu}>
                What We Do
              </a>
              <Link
                to="/contact-us"
                className="mobile-menu-link"
                activeProps={{ className: "text-primary" }}
                onClick={closeMobileMenu}
              >
                Get In Touch
              </Link>
            </nav>

            <div className="mobile-menu-contact mt-auto border-t border-foreground/14 pt-6">
              <p className="mobile-menu-contact-title">Let&apos;s Get In Touch</p>
              <div className="mt-6 grid grid-cols-3 items-center text-primary">
                <a
                  href="tel:+97142249662"
                  className="mobile-menu-contact-action"
                  aria-label="Call AlMulla Holding"
                >
                  <Phone className="h-6 w-6" />
                </a>
                <a
                  href="mailto:info@almullaholding.com"
                  className="mobile-menu-contact-action"
                  aria-label="Email AlMulla Holding"
                >
                  <Mail className="h-6 w-6" />
                </a>
                <Link
                  to="/contact-us"
                  className="mobile-menu-contact-action"
                  aria-label="Go to contact page"
                  onClick={closeMobileMenu}
                >
                  <Send className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="site-content flex-1">{children}</main>

      <footer className="footer-premium mt-0 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr] lg:px-8">
          <div className="space-y-5">
            <AlmullaLogo compact />
            <p className="max-w-xs text-sm leading-7 text-primary-foreground/68">
              A diversified holding group committed to building legacies and empowering future
              growth.
            </p>
            <p className="text-xs text-primary-foreground/46">
              © {new Date().getFullYear()} AlMulla Holding. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-primary-foreground">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <Link
                to="/about-us"
                className="text-primary-foreground/66 transition-colors hover:text-gold"
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className="text-primary-foreground/66 transition-colors hover:text-gold"
              >
                Contact Us
              </Link>
              <button
                type="button"
                className="border-0 bg-transparent p-0 text-left text-sm text-primary-foreground/66 transition-colors hover:text-gold"
                aria-haspopup="dialog"
                onClick={openPrivacyPolicyModal}
              >
                Privacy Policy
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-primary-foreground">Contact Us</h3>
            <div className="mt-4 space-y-3 text-sm text-primary-foreground/66">
              <a
                href="tel:+97142249662"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                04 224 9662
              </a>
              <a
                href="mailto:info@almullaholding.com"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold" />
                info@almullaholding.com
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-primary-foreground/44 sm:px-6 lg:px-8">
          <button
            type="button"
            className="footer-legal-button"
            aria-haspopup="dialog"
            onClick={openPrivacyPolicyModal}
          >
            Privacy Policy
          </button>
          <span className="mx-3 text-primary-foreground/20">|</span>
          <span>Terms of Use</span>
          <span className="mx-3 text-primary-foreground/20">|</span>
          <button
            type="button"
            className="footer-legal-button"
            aria-haspopup="dialog"
            onClick={openCookiePreferences}
          >
            Manage Cookies
          </button>
        </div>
      </footer>
      <CookieConsent />
      {renderPrivacyPolicyModal && (
        <PrivacyPolicyModal
          open={privacyPolicyOpen}
          onClose={() => setPrivacyPolicyOpen(false)}
          onExited={() => setRenderPrivacyPolicyModal(false)}
        />
      )}
    </div>
  );
}
