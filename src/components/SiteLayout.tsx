import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Mail, Phone, Menu, X, ChevronDown, ArrowUpRight, MapPin } from "lucide-react";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import { cn } from "@/lib/utils";

const businessLinks = [
  { label: "Strategic investment", to: "/businesses/strategic-investment" },
  { label: "Real-estate", to: "/businesses/real-estate" },
  { label: "Healthcare", to: "/businesses/healthcare" },
  { label: "Hospitality", to: "/businesses/hospitality" },
  { label: "Education", to: "/businesses/education" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });
  const selectedBusiness =
    businessLinks.find((business) => business.to === pathname)?.label ?? "Businesses";
  const isBusinessRoute = pathname.startsWith("/businesses/");

  const linkCls =
    "inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:bg-white/72 hover:text-primary";
  const mobileLinkCls =
    "flex items-center rounded-lg px-4 py-3 text-base font-semibold text-foreground/82 transition-colors hover:bg-white/72 hover:text-primary";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="border-b border-white/10 bg-[var(--ink)] text-xs text-primary-foreground">
        <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-end px-4 py-2 sm:px-6 lg:px-8">
          <div className="ml-auto flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
            <span className="hidden items-center gap-2 text-primary-foreground/70 sm:flex">
              <MapPin className="h-3.5 w-3.5 text-[var(--gold)]" /> Business Bay, Dubai
            </span>
            <a
              href="tel:+97142249662"
              className="flex items-center gap-2 text-primary-foreground/88 transition-colors hover:text-[var(--gold)]"
            >
              <Phone className="h-3.5 w-3.5" /> 04 224 9662
            </a>
            <a
              href="mailto:info@almullaholding.co"
              className="flex items-center gap-2 text-primary-foreground/88 transition-colors hover:text-[var(--gold)]"
            >
              <Mail className="h-3.5 w-3.5" /> info@almullaholding.co
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-3 z-50 px-4 py-3 sm:px-6 lg:px-8">
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="glass-morph relative grid w-full grid-cols-[auto_auto] items-center justify-between gap-3 rounded-[1.5rem] px-3 py-2.5 md:grid-cols-[minmax(12rem,1fr)_auto_minmax(12rem,1fr)] md:rounded-[2.25rem] md:px-4 md:py-3 lg:px-6">
            <div
              className="liquid-glass pointer-events-none absolute inset-0 rounded-[1.5rem] md:rounded-[2.25rem]"
              aria-hidden="true"
            />

            <Link to="/" className="relative z-10 shrink-0 justify-self-start">
              <AlmullaLogo />
            </Link>

            <nav className="relative z-20 hidden items-center justify-center gap-1 md:flex md:justify-self-center">
              <Link
                to="/"
                className={linkCls}
                activeProps={{ className: `${linkCls} bg-white text-primary shadow-sm` }}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className={linkCls}
                activeProps={{ className: `${linkCls} bg-white text-primary shadow-sm` }}
              >
                About
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setBizOpen(true)}
                onMouseLeave={() => setBizOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    linkCls,
                    "gap-1 border-0 bg-transparent",
                    isBusinessRoute && "bg-white/76 text-primary shadow-sm",
                  )}
                  aria-expanded={bizOpen}
                  aria-haspopup="menu"
                  onClick={() => setBizOpen((current) => !current)}
                >
                  {selectedBusiness} <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {bizOpen && (
                  <div className="absolute left-0 top-full z-50 pt-3">
                    <div
                      className="surface-card glass-morph w-64 overflow-hidden rounded-[1.25rem] p-2 shadow-2xl shadow-black/10"
                      role="menu"
                    >
                      {businessLinks.map((business) => (
                        <Link
                          key={business.to}
                          to={business.to}
                          className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium text-foreground/78 transition-colors hover:bg-secondary hover:text-primary"
                          activeProps={{ className: "bg-white text-primary shadow-sm" }}
                          onClick={() => setBizOpen(false)}
                        >
                          {business.label}
                          <ArrowUpRight className="h-4 w-4 opacity-60" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/contact-us"
                className={linkCls}
                activeProps={{ className: `${linkCls} bg-white text-primary shadow-sm` }}
              >
                Contact
              </Link>
            </nav>

            <div className="relative z-10 hidden justify-self-end md:block" aria-hidden="true" />

            <button
              className="relative z-10 inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-white/70 bg-white/72 text-primary shadow-sm transition-transform hover:-translate-y-0.5 sm:h-11 sm:w-11 md:hidden"
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
              className="liquid-glass glass-morph absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[1.5rem] shadow-2xl shadow-black/10 md:hidden"
            >
              <nav className="flex flex-col gap-1 p-2" aria-label="Mobile navigation">
                <Link
                  to="/"
                  className={mobileLinkCls}
                  activeProps={{ className: `${mobileLinkCls} bg-white text-primary shadow-sm` }}
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about-us"
                  className={mobileLinkCls}
                  activeProps={{ className: `${mobileLinkCls} bg-white text-primary shadow-sm` }}
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
                {businessLinks.map((business) => (
                  <Link
                    key={business.to}
                    to={business.to}
                    className={mobileLinkCls}
                    activeProps={{ className: `${mobileLinkCls} bg-white text-primary shadow-sm` }}
                    onClick={() => setOpen(false)}
                  >
                    {business.label}
                  </Link>
                ))}
                <Link
                  to="/contact-us"
                  className={mobileLinkCls}
                  activeProps={{ className: `${mobileLinkCls} bg-white text-primary shadow-sm` }}
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="site-content flex-1">{children}</main>

      <footer className="mt-20 border-t border-border/70 bg-[var(--ink)] text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.35fr_1fr_1fr] lg:px-8">
          <div className="space-y-5 text-center">
            <AlmullaLogo compact className="mx-auto items-start" />
            <p className="mx-auto max-w-xl text-justify text-sm leading-7 text-primary-foreground/68">
              AlMulla Holding Group brings together healthcare and hospitality platforms shaped
              around quality, consistency, and long-term value.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 text-center">
            <h3 className="text-sm font-semibold text-[var(--gold)]">Contact</h3>
            <p className="mt-4 text-sm leading-7 text-primary-foreground/72">
              Office no. 1405, Aspect Tower Zone B,
              <br />
              Business Bay,
              <br />
              PO BOX 413155,
              <br />
              Dubai, UAE
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 text-center">
            <h3 className="text-sm font-semibold text-[var(--gold)]">Get in Touch</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="tel:+97142249662"
                className="flex items-center justify-center gap-2 text-primary-foreground/72 transition-colors hover:text-[var(--gold)]"
              >
                <Phone className="h-4 w-4 text-[var(--gold)]" /> 04 224 9662
              </a>
              <a
                href="mailto:info@almullaholding.co"
                className="flex items-center justify-center gap-2 text-primary-foreground/72 transition-colors hover:text-[var(--gold)]"
              >
                <Mail className="h-4 w-4 text-[var(--gold)]" /> info@almullaholding.co
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-primary-foreground/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} AlMulla Holding Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
