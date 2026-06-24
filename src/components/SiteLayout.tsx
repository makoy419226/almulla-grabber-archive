import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Mail, Phone, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import { cn } from "@/lib/utils";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const developmentNotice = "This website is in development";
  const pathname = useLocation({ select: (location) => location.pathname });
  const selectedBusiness =
    pathname === "/businesses/healthcare"
      ? "Healthcare"
      : pathname === "/businesses/hospitality"
        ? "Hospitality"
        : "Businesses";
  const isBusinessRoute = pathname.startsWith("/businesses/");

  const linkCls =
    "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-foreground/72 transition-colors hover:bg-secondary hover:text-primary";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="border-b border-primary/10 bg-primary text-xs text-primary-foreground">
        <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-end px-4 py-2 sm:px-6 lg:px-8">
          <div className="ml-auto flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
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

      <div className="development-strip" role="status" aria-label={developmentNotice}>
        <div className="development-marquee" aria-hidden="true">
          <div className="development-marquee-group">
            <span>{developmentNotice}</span>
            <span>{developmentNotice}</span>
            <span>{developmentNotice}</span>
            <span>{developmentNotice}</span>
          </div>
          <div className="development-marquee-group">
            <span>{developmentNotice}</span>
            <span>{developmentNotice}</span>
            <span>{developmentNotice}</span>
            <span>{developmentNotice}</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <AlmullaLogo className="gap-2 sm:gap-3" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className={linkCls}
              activeProps={{ className: `${linkCls} bg-secondary text-primary` }}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className={linkCls}
              activeProps={{ className: `${linkCls} bg-secondary text-primary` }}
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
                  isBusinessRoute && "bg-secondary text-primary",
                )}
                aria-expanded={bizOpen}
                aria-haspopup="menu"
                onClick={() => setBizOpen((current) => !current)}
              >
                {selectedBusiness} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {bizOpen && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="surface-card w-64 overflow-hidden rounded-lg p-2" role="menu">
                    <Link
                      to="/businesses/healthcare"
                      className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium text-foreground/78 transition-colors hover:bg-secondary hover:text-primary"
                      activeProps={{ className: "bg-secondary text-primary" }}
                      onClick={() => setBizOpen(false)}
                    >
                      Healthcare
                      <ArrowUpRight className="h-4 w-4 opacity-60" />
                    </Link>
                    <Link
                      to="/businesses/hospitality"
                      className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium text-foreground/78 transition-colors hover:bg-secondary hover:text-primary"
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
              activeProps={{ className: `${linkCls} bg-secondary text-primary` }}
            >
              Contact
            </Link>
          </nav>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-white text-primary shadow-sm transition-transform hover:-translate-y-0.5 md:hidden"
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
                className="rounded-md px-4 py-3 text-sm font-semibold hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className="rounded-md px-4 py-3 text-sm font-semibold hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                to="/businesses/healthcare"
                className="rounded-md px-4 py-3 text-sm font-semibold hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                Healthcare
              </Link>
              <Link
                to="/businesses/hospitality"
                className="rounded-md px-4 py-3 text-sm font-semibold hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                Hospitality
              </Link>
              <Link
                to="/contact-us"
                className="rounded-md px-4 py-3 text-sm font-semibold hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-border/70 bg-white/72 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.35fr_1fr_1fr] lg:px-8">
          <div className="space-y-5">
            <AlmullaLogo compact className="items-start" />
            <p className="max-w-xl text-sm leading-7 text-foreground/70">
              AlMulla Holding Group brings together healthcare and hospitality platforms shaped
              around quality, consistency, and long-term value.
            </p>
          </div>
          <div className="surface-card rounded-lg p-6">
            <h3 className="text-sm font-semibold text-primary">Contact</h3>
            <p className="mt-4 text-sm leading-7 text-foreground/70">
              Office no. 1405, Aspect Tower Zone B,
              <br />
              Business Bay,
              <br />
              PO BOX 413155,
              <br />
              Dubai, UAE
            </p>
          </div>
          <div className="surface-card rounded-lg p-6">
            <h3 className="text-sm font-semibold text-primary">Get in Touch</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="tel:+97142249662"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-[var(--gold)]" /> 04 224 9662
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
