import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import contactTeamHero from "@/assets/contact-team-hero.webp";
import { Mail, Phone } from "lucide-react";
import { createSeoHead } from "@/lib/seo";

const contactEmail = "info@almullaholding.com";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    ...createSeoHead("/contact-us"),
    links: [
      ...createSeoHead("/contact-us").links,
      {
        rel: "preload",
        as: "image",
        href: contactTeamHero,
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <div className="scale-in-ver-top">
        <section className="page-hero relative overflow-hidden border-b border-primary/15 bg-primary text-primary-foreground">
          <img
            src={contactTeamHero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-52"
            fetchPriority="high"
            decoding="async"
            width={1024}
            height={1024}
            aria-hidden
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,27,21,0.9),rgba(60,42,31,0.78),rgba(60,42,31,0.38))]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
            <div className="text-sm font-semibold text-[var(--gold)]">Contact</div>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Get in touch with our team.
            </h1>
            <p className="copy-center mt-5 max-w-2xl text-base leading-8 text-primary-foreground/72">
              For business enquiries, partnerships, or corporate requests, please contact us
              directly.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="surface-card mx-auto max-w-3xl rounded-lg p-6 text-center sm:p-8 lg:p-10">
            <div className="section-eyebrow">Contact details</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary">Direct enquiries</h2>
            <ul className="data-center mt-8 grid gap-5 text-sm text-foreground sm:grid-cols-2">
              <li>
                <a
                  href="tel:+97142249688"
                  className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-md border border-border bg-white px-4 py-5 transition-colors hover:text-primary"
                  aria-label="Call AlMulla Holding at 04 2249688"
                >
                  <Phone className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                  04 2249688
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-md border border-border bg-white px-4 py-5 transition-colors hover:text-primary"
                  aria-label={`Email AlMulla Holding at ${contactEmail}`}
                >
                  <Mail className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
