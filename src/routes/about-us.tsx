import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import chairmanImg from "@/assets/chairman.jpg";
import { Check } from "lucide-react";

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
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="surface-card rounded-lg p-6 sm:p-8 lg:p-10">
            <div className="section-eyebrow">Chairman&apos;s message</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">
              Focused on quality, resilience, and long-term value.
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-foreground/72 sm:text-base">
              <p>
                AlMulla Holding Group continues to build around sectors where quality, trust, and
                service matter most.
              </p>
            </div>

            <div className="data-center mt-8 grid gap-3 sm:grid-cols-2">
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
                decoding="async"
                sizes="(min-width: 1024px) 45vw, 100vw"
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
    </SiteLayout>
  );
}
