import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — AlMulla Holding Group" },
      { name: "description", content: "Get in touch with AlMulla Holding Group in Business Bay, Dubai." },
      { property: "og:title", content: "Contact AlMulla Holding Group" },
      { property: "og:description", content: "Reach our team in Business Bay, Dubai." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <SiteLayout>
      <section className="border-b border-border/70 bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <div className="section-eyebrow">Contact</div>
          <h1 className="section-title mx-auto mt-4 max-w-3xl">Let’s discuss a project, partnership, or request.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-foreground/65 sm:text-base">
            Use the form or reach out directly through the contact details below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-card rounded-[1.75rem] p-6 sm:p-8 lg:p-10">
            <div className="section-eyebrow">Send a message</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-primary">Get in touch</h2>
            {sent ? (
              <div className="py-14 text-center">
                <p className="text-2xl font-semibold text-primary">Thank you</p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-foreground/65">
                  We&apos;ve received your message and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Name</label>
                  <input required type="text" className="modern-input" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Email address</label>
                  <input required type="email" className="modern-input" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Message</label>
                  <textarea required rows={6} className="modern-input resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Submit message
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          <div className="grid gap-6">
            <div className="surface-card rounded-[1.75rem] p-6 sm:p-8 lg:p-10">
              <div className="section-eyebrow">Contact details</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-primary">Direct lines</h2>
              <ul className="mt-6 space-y-6 text-sm text-foreground">
                <li className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
                  <div>
                    <p className="font-semibold text-primary">Head Office</p>
                    <p className="mt-2 leading-7 text-foreground/65">
                      Office #601 Opal Tower,<br />
                      Burj Khalifa St, Business Bay,<br />
                      Dubai, United Arab Emirates<br />
                      P.O. Box: 413155
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
                  <a href="tel:+97142249688" className="transition-colors hover:text-primary">
                    +971 4 224 9688
                  </a>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
                  <a href="mailto:info@almullaholding.co" className="transition-colors hover:text-primary">
                    info@almullaholding.co
                  </a>
                </li>
              </ul>
            </div>

            <div className="surface-card overflow-hidden rounded-[1.75rem] p-3">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps?q=Opal+Tower+Business+Bay+Dubai&output=embed"
                className="h-72 w-full rounded-[1.35rem]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
