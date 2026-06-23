import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Mail, Phone, Menu, X, ChevronDown } from "lucide-react";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);

  const linkCls =
    "text-sm font-semibold tracking-wide uppercase text-foreground hover:text-primary transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-end gap-6">
          <a href="tel:+97142249688" className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
            <Phone className="w-3.5 h-3.5" /> +971 4 224 9688
          </a>
          <a href="mailto:info@almullaholding.co" className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
            <Mail className="w-3.5 h-3.5" /> info@almullaholding.co
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-primary">AlMulla</span>
            <span className="hidden sm:inline text-xs tracking-[0.3em] text-muted-foreground uppercase border-l border-[var(--gold)] pl-3">
              Holding
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={linkCls} activeProps={{ className: linkCls + " text-primary" }}>Home</Link>
            <Link to="/about-us" className={linkCls} activeProps={{ className: linkCls + " text-primary" }}>About Us</Link>
            <div
              className="relative"
              onMouseEnter={() => setBizOpen(true)}
              onMouseLeave={() => setBizOpen(false)}
            >
              <button className={linkCls + " flex items-center gap-1"}>
                Businesses <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {bizOpen && (
                <div className="absolute top-full left-0 pt-3 w-56">
                  <div className="bg-white shadow-xl rounded-md border border-border overflow-hidden">
                    <Link to="/businesses/healthcare" className="block px-4 py-3 text-sm hover:bg-secondary hover:text-primary">Healthcare</Link>
                    <Link to="/businesses/hospitality" className="block px-4 py-3 text-sm hover:bg-secondary hover:text-primary">Hospitality</Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/contact-us" className={linkCls} activeProps={{ className: linkCls + " text-primary" }}>Contact Us</Link>
          </nav>

          <button className="md:hidden text-primary" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="flex flex-col px-4 py-3 gap-3">
              <Link to="/" className={linkCls} onClick={() => setOpen(false)}>Home</Link>
              <Link to="/about-us" className={linkCls} onClick={() => setOpen(false)}>About Us</Link>
              <Link to="/businesses/healthcare" className={linkCls} onClick={() => setOpen(false)}>Healthcare</Link>
              <Link to="/businesses/hospitality" className={linkCls} onClick={() => setOpen(false)}>Hospitality</Link>
              <Link to="/contact-us" className={linkCls} onClick={() => setOpen(false)}>Contact Us</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-serif text-2xl mb-3">AlMulla Holding Group</h3>
            <span className="block w-16 h-0.5 bg-[var(--gold)] mb-4" />
            <p className="text-sm opacity-80 leading-relaxed">
              A business conglomerate with several subsidiaries across healthcare, hospitality and beyond.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-3">Contact</h4>
            <span className="block w-12 h-0.5 bg-[var(--gold)] mb-4" />
            <p className="text-sm opacity-80 leading-relaxed">
              Office #601 Opal Tower,<br />
              Burj Khalifa St, Business Bay,<br />
              Dubai, United Arab Emirates<br />
              <strong>P.O. Box:</strong> 413155
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-3">Get in Touch</h4>
            <span className="block w-12 h-0.5 bg-[var(--gold)] mb-4" />
            <p className="text-sm opacity-80 space-y-1">
              <a href="tel:+97142249688" className="flex items-center gap-2 hover:text-[var(--gold)]">
                <Phone className="w-4 h-4" /> +971 4 224 9688
              </a>
              <a href="mailto:info@almullaholding.co" className="flex items-center gap-2 hover:text-[var(--gold)] mt-2">
                <Mail className="w-4 h-4" /> info@almullaholding.co
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
          © {new Date().getFullYear()} AlMulla Holding Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
