import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Mail, Phone, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import { cn } from "@/lib/utils";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });
  const selectedBusiness =
    pathname === "/businesses/healthcare"
      ? "Healthcare"
      : pathname === "/businesses/hospitality"
        ? "Hospitality"
        : "Businesses";
  const isBusinessRoute = pathname.startsWith("/businesses/");

  const linkCls =
    "relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-[var(--gold)] after:transition-all after:duration-200 hover:after:w-full";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="border-b border-[#7a1720] bg-[#831823] text-sm text-white shadow-sm">
        <div className="mx-auto flex min-h-12 max-w-7xl items-center justify-end px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 ml-auto">
            <a
              href="tel:+97142249688"
              className="flex items-center gap-2 text-white/90 transition-colors hover:text-[var(--gold)]"
            >
              <Phone className="h-3.5 w-3.5" /> +971 4 224 9688
            </a>
            <a
              href="mailto:info@almullaholding.co"
              className="flex items-center gap-2 text-white/90 transition-colors hover:text-[var(--gold)]"
            >
              <Mail className="h-3.5 w-3.5" /> info@almullaholding.co
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <AlmullaLogo className="gap-2 sm:gap-3" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <Link
              to="/"
              className={linkCls}
              activeProps={{ className: `${linkCls} text-primary after:w-full` }}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className={linkCls}
              activeProps={{ className: `${linkCls} text-primary after:w-full` }}
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
                  "flex items-center gap-1 border-0 bg-transparent p-0",
                  isBusinessRoute && "text-primary after:w-full",
                )}
                aria-expanded={bizOpen}
                aria-haspopup="menu"
                onClick={() => setBizOpen((current) => !current)}
              >
                {selectedBusiness} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {bizOpen && (
                <div className="absolute left-0 top-full pt-4">
                  <div className="surface-card w-64 overflow-hidden rounded-2xl p-2" role="menu">
                    <Link
                      to="/businesses/healthcare"
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                      activeProps={{ className: "bg-secondary text-primary" }}
                      onClick={() => setBizOpen(false)}
                    >
                      Healthcare
                      <ArrowUpRight className="h-4 w-4 opacity-60" />
                    </Link>
                    <Link
                      to="/businesses/hospitality"
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                      activeProps={{ className: "bg-secondary text-primary" }}
                      onClick={() => setBizOpen(false)}
                    >
                      Hospitality
                      <ArrowUpRight className="h-4 w-4 opacity-60" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/contact-us"
              className={linkCls}
              activeProps={{ className: `${linkCls} text-primary after:w-full` }}
            >
              Contact
            </Link>
          </nav>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-primary shadow-sm transition-transform hover:-translate-y-0.5 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border/70 bg-background/95 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              <Link
                to="/"
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                to="/businesses/healthcare"
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                Healthcare
              </Link>
              <Link
                to="/businesses/hospitality"
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                Hospitality
              </Link>
              <Link
                to="/contact-us"
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-border/70 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.35fr_1fr_1fr] lg:px-8">
          <div className="space-y-5">
            <AlmullaLogo compact className="items-start" />
            <p className="max-w-xl text-sm leading-7 text-foreground/70">
              AlMulla Holding Group brings together healthcare and hospitality platforms shaped
              around quality, consistency, and long-term value.
            </p>
          </div>
          <div className="surface-card rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Contact
            </h3>
            <p className="mt-4 text-sm leading-7 text-foreground/70">
              Office #601 Opal Tower,
              <br />
              Burj Khalifa St, Business Bay,
              <br />
              Dubai, United Arab Emirates
              <br />
              P.O. Box: 413155
            </p>
          </div>
          <div className="surface-card rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Get in Touch
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="tel:+97142249688"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-[var(--gold)]" /> +971 4 224 9688
              </a>
              <a
                href="mailto:info@almullaholding.co"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-[var(--gold)]" /> info@almullaholding.co
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/70 px-4 py-4 text-center text-xs text-foreground/55 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} AlMulla Holding Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
