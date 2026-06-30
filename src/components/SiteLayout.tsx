import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import { SeoUpdater } from "@/components/SeoUpdater";
import { cn } from "@/lib/utils";

const businessLinks = [
  { label: "Healthcare", to: "/businesses/healthcare" },
  { label: "Hospitality", to: "/businesses/hospitality" },
  { label: "Education", to: "/businesses/education" },
  { label: "Energy", to: "/businesses/energy" },
];

const navLinkBase =
  "nav-hover-magnify inline-flex items-center rounded-md px-4 py-3 text-base font-bold text-foreground/72 hover:text-primary";

const mobileLinkBase =
  "nav-hover-magnify mobile-nav-link flex min-h-12 items-center rounded-md px-5 text-base font-semibold text-foreground/82 hover:bg-white/78 hover:text-primary";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  const selectedBusiness =
    businessLinks.find((business) => business.to === pathname)?.label ?? "Businesses";
  const isBusinessRoute = pathname.startsWith("/businesses/");

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
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
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SeoUpdater />

      <header ref={headerRef} className="site-header-shell sticky top-0 z-50">
        <div className="mx-auto flex h-[6.5rem] max-w-[104rem] items-center justify-between gap-7 px-4 sm:px-6 lg:px-10">
          <Link to="/" className="nav-hover-magnify shrink-0" aria-label="AlMulla Holding home">
            <AlmullaLogo />
          </Link>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
            <Link
              to="/"
              className={navLinkBase}
              activeProps={{ className: `${navLinkBase} text-primary after:scale-x-100` }}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className={navLinkBase}
              activeProps={{ className: `${navLinkBase} text-primary after:scale-x-100` }}
            >
              About Us
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setBizOpen(true)}
              onMouseLeave={() => setBizOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  navLinkBase,
                  "gap-1.5 border-0 bg-transparent",
                  isBusinessRoute && "text-primary after:scale-x-100",
                )}
                aria-expanded={bizOpen}
                aria-haspopup="menu"
                onClick={() => setBizOpen((current) => !current)}
              >
                {selectedBusiness}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {bizOpen && (
                <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-5">
                  <div
                    className="surface-card glass-morph rounded-[1.5rem] p-3 shadow-2xl shadow-black/10"
                    role="menu"
                  >
                    {businessLinks.map((business) => (
                      <Link
                        key={business.to}
                        to={business.to}
                        className="nav-hover-magnify dropdown-nav-link group flex min-h-12 items-center justify-between rounded-md px-4 text-sm font-semibold text-foreground/76 hover:bg-secondary hover:text-primary"
                        activeProps={{ className: "bg-secondary text-primary" }}
                        onClick={() => setBizOpen(false)}
                      >
                        {business.label}
                        <ArrowUpRight className="dropdown-nav-arrow h-4 w-4 opacity-55" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/contact-us"
              className={navLinkBase}
              activeProps={{ className: `${navLinkBase} text-primary after:scale-x-100` }}
            >
              Contact Us
            </Link>
          </nav>

          <button
            className="nav-hover-magnify inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/12 bg-white/70 text-primary shadow-sm md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div
            id="mobile-navigation"
            className="mobile-nav-panel absolute left-4 right-4 top-[calc(100%+0.75rem)] z-50 rounded-[1.5rem] border border-primary/10 bg-white/92 p-3 shadow-2xl shadow-black/12 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              <Link
                to="/"
                className={mobileLinkBase}
                activeProps={{ className: `${mobileLinkBase} bg-white text-primary shadow-sm` }}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className={mobileLinkBase}
                activeProps={{ className: `${mobileLinkBase} bg-white text-primary shadow-sm` }}
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>
              {businessLinks.map((business) => (
                <Link
                  key={business.to}
                  to={business.to}
                  className={mobileLinkBase}
                  activeProps={{ className: `${mobileLinkBase} bg-white text-primary shadow-sm` }}
                  onClick={() => setOpen(false)}
                >
                  {business.label}
                </Link>
              ))}
              <Link
                to="/contact-us"
                className={mobileLinkBase}
                activeProps={{ className: `${mobileLinkBase} bg-white text-primary shadow-sm` }}
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="site-content flex-1">{children}</main>

      <footer className="footer-premium mt-0 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1.1fr_0.8fr] lg:px-8">
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
            <h3 className="text-sm font-semibold text-primary-foreground">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <Link to="/" className="text-primary-foreground/66 transition-colors hover:text-gold">
                Home
              </Link>
              <Link
                to="/about-us"
                className="text-primary-foreground/66 transition-colors hover:text-gold"
              >
                About Us
              </Link>
              <Link
                to="/businesses/healthcare"
                className="text-primary-foreground/66 transition-colors hover:text-gold"
              >
                Businesses
              </Link>
              <Link
                to="/contact-us"
                className="text-primary-foreground/66 transition-colors hover:text-gold"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary-foreground">Contact Us</h3>
            <div className="mt-4 space-y-3 text-sm text-primary-foreground/66">
              <p className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Office no. 1405, Aspect Tower Zone B, Business Bay, PO BOX 413155, Dubai, UAE
                </span>
              </p>
              <a
                href="tel:+97142249662"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                04 224 9662
              </a>
              <a
                href="mailto:info@almullaholding.co"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold" />
                info@almullaholding.co
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary-foreground">Follow Us</h3>
            <div className="mt-4 flex gap-2">
              {[Linkedin, Instagram, Facebook, Youtube].map((Icon, index) => (
                <span
                  key={index}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/16 text-primary-foreground/70"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-primary-foreground/44 sm:px-6 lg:px-8">
          <span>Privacy Policy</span>
          <span className="mx-3 text-primary-foreground/20">|</span>
          <span>Terms of Use</span>
        </div>
      </footer>
    </div>
  );
}
