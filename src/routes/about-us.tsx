import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import chairmanImg from "@/assets/chairman.jpg";
import { ArrowUpRight, Check } from "lucide-react";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — AlMulla Holding Group" },
      {
        name: "description",
        content:
          "Learn about AlMulla Holding Group and a message from Chairman Mr. Abdulla Mohamed Saeed AlMulla.",
      },
      { property: "og:title", content: "About AlMulla Holding Group" },
      { property: "og:description", content: "Chairman's message and company overview." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="border-b border-primary/15 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-sm font-semibold text-[var(--gold)]">About us</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            A focused holding group with a modern operating style.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/72">
            The group is chaired by Mr. Abdulla Mohamed Saeed AlMulla and structured around a
            practical, long-term investment outlook.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="surface-card rounded-lg p-6 sm:p-8 lg:p-10">
            <div className="section-eyebrow">Chairman&apos;s message</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">
              We keep the group focused, adaptable, and built for the long term.
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-foreground/72 sm:text-base">
              <p>
                In a fast-moving market, sustained value comes from clarity of focus and disciplined
                execution. AlMulla Holding Group continues to build around sectors where quality,
                trust, and service matter most.
              </p>
              <p>
                The company is structured to support growth across healthcare and hospitality while
                maintaining a modern operating mindset and consistent brand standards.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Strategic investment",
                "Healthcare operations",
                "Hospitality development",
                "Long-term value creation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-border bg-white px-4 py-3 text-sm text-foreground/75"
                >
                  <Check className="h-4 w-4 text-[var(--gold)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="surface-card overflow-hidden rounded-lg p-2">
              <img
                src={chairmanImg}
                alt="Mr. Abdulla Mohamed Saeed AlMulla, Chairman"
                className="h-[520px] w-full rounded-md object-cover"
                loading="lazy"
                width={900}
                height={1100}
              />
            </div>

            <div className="surface-card rounded-lg p-6">
              <p className="text-sm font-semibold text-[var(--gold)]">Chairman</p>
              <p className="mt-3 text-xl font-semibold text-primary">
                Mr. Abdulla Mohamed Saeed AlMulla
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/65">
                Guiding the group with an emphasis on quality, resilience, and sector-focused
                growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="surface-card grid gap-8 rounded-lg p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
          <div>
            <div className="section-eyebrow">Next step</div>
            <h3 className="mt-3 text-3xl font-semibold text-primary">
              Explore the group or get in touch.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/65">
              The site now uses a cleaner visual rhythm, modern spacing, and softer surfaces while
              keeping the same core content.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/contact-us" className="btn-primary">
              Contact us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Back home
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
