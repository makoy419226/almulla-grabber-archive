import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { MapPin, Phone, Mail } from "lucide-react";

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
      <section className="py-16 bg-secondary text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl text-primary uppercase">Contact Us</h1>
          <span className="gold-divider" />
          <h2 className="font-serif text-2xl text-foreground mt-2">How can we help you?</h2>
          <p className="text-muted-foreground mt-3">
            Choose any of the methods below and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white border border-border rounded-lg p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-primary mb-1">Get in touch</h3>
            <span className="block w-16 h-0.5 bg-[var(--gold)] mb-6" />
            {sent ? (
              <div className="text-center py-12">
                <p className="text-primary font-serif text-xl">Thank you!</p>
                <p className="text-muted-foreground mt-2">We've received your message and will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-foreground mb-1">Name</label>
                  <input required type="text" className="w-full px-4 py-2 border border-input rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-foreground mb-1">Email Address</label>
                  <input required type="email" className="w-full px-4 py-2 border border-input rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-foreground mb-1">Message</label>
                  <textarea required rows={5} className="w-full px-4 py-2 border border-input rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <button type="submit" className="btn-primary w-full">Submit</button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <h3 className="font-serif text-2xl text-primary mb-1">Contact</h3>
            <span className="block w-16 h-0.5 bg-[var(--gold)] mb-6" />
            <ul className="space-y-5 text-foreground">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-[var(--gold)] mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">Head Office</p>
                  <p className="text-muted-foreground">
                    Office #601 Opal Tower,<br />
                    Burj Khalifa St, Business Bay,<br />
                    Dubai, United Arab Emirates<br />
                    P.O. Box: 413155
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-[var(--gold)] mt-1 shrink-0" />
                <a href="tel:+97142249688" className="hover:text-primary">+971 4 224 9688</a>
              </li>
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-[var(--gold)] mt-1 shrink-0" />
                <a href="mailto:info@almullaholding.co" className="hover:text-primary">info@almullaholding.co</a>
              </li>
            </ul>

            <div className="mt-8 rounded-lg overflow-hidden border border-border h-72">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps?q=Opal+Tower+Business+Bay+Dubai&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
