import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — AlMulla Holding Group" },
      {
        name: "description",
        content: "Get in touch with AlMulla Holding Group in Business Bay, Dubai.",
      },
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
      <section className="border-b border-primary/15 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="text-sm font-semibold text-[var(--gold)]">Contact</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Let’s discuss a project, partnership, or request.
          </h1>
          <p className="copy-center mt-5 max-w-2xl text-base leading-8 text-primary-foreground/72">
            Use the form or reach out directly through the contact details below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-card rounded-lg p-6 sm:p-8 lg:p-10">
            <div className="section-eyebrow">Send a message</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary">Get in touch</h2>
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
                  <label className="mb-2 block text-sm font-semibold text-foreground/64">
                    Name
                  </label>
                  <input required type="text" className="modern-input" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground/64">
                    Email address
                  </label>
                  <input required type="email" className="modern-input" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground/64">
                    Message
                  </label>
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
            <div className="surface-card rounded-lg p-6 sm:p-8 lg:p-10">
              <div className="section-eyebrow">Contact details</div>
              <h2 className="mt-4 text-3xl font-semibold text-primary">Direct lines</h2>
              <ul className="data-center mt-6 space-y-6 text-sm text-foreground">
                <li className="flex flex-col items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                  <div>
                    <p className="font-semibold text-primary">Head Office</p>
                    <p className="mt-2 leading-7 text-foreground/65">
                      Office no. 1405, Aspect Tower Zone B,
                      <br />
                      Business Bay,
                      <br />
                      PO BOX 413155,
                      <br />
                      Dubai, UAE
                    </p>
                  </div>
                </li>
                <li className="flex flex-col items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                  <a href="tel:+97142249662" className="transition-colors hover:text-primary">
                    04 224 9662
                  </a>
                </li>
                <li className="flex flex-col items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                  <a
                    href="mailto:info@almullaholding.co"
                    className="transition-colors hover:text-primary"
                  >
                    info@almullaholding.co
                  </a>
                </li>
              </ul>
            </div>

            <div className="surface-card overflow-hidden rounded-lg p-2">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps?q=Aspect+Tower+Zone+B+Business+Bay+Dubai&output=embed"
                className="h-72 w-full rounded-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
