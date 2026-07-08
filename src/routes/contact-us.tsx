import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Phone } from "lucide-react";

const contactEmail = "info@almullaholding.com";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — AlMulla Holding Group" },
      {
        name: "description",
        content: "Get in touch with AlMulla Holding Group for business enquiries and requests.",
      },
      { property: "og:title", content: "Contact AlMulla Holding Group" },
      { property: "og:description", content: "Reach the AlMulla Holding Group team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="page-hero border-b border-primary/15 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="text-sm font-semibold text-[var(--gold)]">Contact</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Get in touch with our team.
          </h1>
          <p className="copy-center mt-5 max-w-2xl text-base leading-8 text-primary-foreground/72">
            For business enquiries, partnerships, or corporate requests, please contact us directly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="surface-card mx-auto max-w-3xl rounded-lg p-6 text-center sm:p-8 lg:p-10">
          <div className="section-eyebrow">Contact details</div>
          <h2 className="mt-4 text-3xl font-semibold text-primary">Direct enquiries</h2>
          <ul className="data-center mt-8 grid gap-5 text-sm text-foreground sm:grid-cols-2">
            <li className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-md border border-border bg-white px-4 py-5">
              <Phone className="h-5 w-5 shrink-0 text-[var(--gold)]" />
              <a href="tel:+97142249662" className="transition-colors hover:text-primary">
                04 224 9662
              </a>
            </li>
            <li className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-md border border-border bg-white px-4 py-5">
              <Mail className="h-5 w-5 shrink-0 text-[var(--gold)]" />
              <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-primary">
                {contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
