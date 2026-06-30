import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import hospitalityImg from "@/assets/hospitality.jpg";
import dubaiImg from "@/assets/dubai.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/businesses/hospitality")({
  head: () => ({
    meta: [
      { title: "AlMulla Hospitality — AlMulla Holding Group" },
      {
        name: "description",
        content:
          "AlMulla Hospitality creates upscale, conscious-lifestyle hotel experiences across the Cliftonwood family of brands.",
      },
      { property: "og:title", content: "AlMulla Hospitality" },
      { property: "og:description", content: "Upscale hotels for the conscious modern traveler." },
      { property: "og:image", content: hospitalityImg },
    ],
  }),
  component: Hospitality,
});

const brands = [
  {
    name: "Cliftonwood Hotels & Resorts",
    tag: "Distinctive · Luxurious · Exclusive",
    body: "Signature hotels and resorts designed around calm and tranquility — lifestyle properties for business travelers and families that embrace local culture while delivering everything the modern world can provide. Guests can indulge at the spa, enjoy international cuisine, or stay fully connected with in-room Wi-Fi, direct dialing and facsimile.",
  },
  {
    name: "Cliftonwood Park Hotels",
    tag: "The business traveler's home away from home",
    body: "A hub for business travelers, blending luxurious marbled foyers and polished interiors with practical comforts: late automatic check-in, flexible meeting spaces, cosmopolitan dining, a New-York style deli, executive convention rooms and a full business centre with secretarial, courier and video-conferencing facilities.",
  },
  {
    name: "Cliftonwood Tree Hotels",
    tag: "Smart travel, uncompromised quality",
    body: "Designed for the budget-smart traveler who still expects quality. Stylish but uncomplicated, with the same fundamentals of hospitality — warm personal service, a haven to replenish your energy, and a memorable, unexpected welcome from every staff member.",
  },
];

function Hospitality() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-36"
          style={{
            backgroundImage: `url(${hospitalityImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(51,18,20,0.96),rgba(51,18,20,0.76),rgba(51,18,20,0.3))]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <div className="motion-flip-bottom mx-auto mb-8 flex items-center justify-center">
            <AlmullaLogo compact className="[&>div]:h-[7.8rem] [&>div]:w-[5.85rem]" />
          </div>
          <h1 className="motion-flip-bottom motion-delay-2 mt-4 max-w-4xl text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
            AlMulla Hospitality
          </h1>
          <p className="copy-center motion-slide-bottom motion-delay-3 mt-6 max-w-2xl text-base leading-8 text-primary-foreground/76 sm:text-lg">
            Hospitality concepts shaped for modern travelers, premium service, and calm, practical
            luxury.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="motion-slide-bottom grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="surface-card rounded-lg p-6 sm:p-8">
              <div className="section-eyebrow">Concept</div>
              <p className="mt-4 text-lg leading-8 text-foreground/75">
                After a day of work or travel, a hotel should feel calm, efficient, and easy to
                trust. AlMulla Hospitality is built around that idea.
              </p>
            </div>

            <div className="surface-card rounded-lg p-6 sm:p-8">
              <div className="section-eyebrow">Approach</div>
              <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
                Our properties are designed for guests who want thoughtful service, strong brand
                standards, and a modern environment that supports both work and rest.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <img
                src={dubaiImg}
                alt="Dubai"
                className="h-64 w-full rounded-lg object-cover shadow-lg"
                loading="lazy"
                width={800}
                height={400}
              />
              <img
                src={hospitalityImg}
                alt="Hospitality"
                className="h-64 w-full rounded-lg object-cover shadow-lg"
                loading="lazy"
                width={800}
                height={400}
              />
            </div>

            <div className="surface-card rounded-lg p-6 sm:p-8">
              <div className="data-center flex flex-wrap items-center justify-center gap-4">
                <div>
                  <p className="section-eyebrow">Guest experience</p>
                  <p className="mt-3 text-lg font-semibold text-primary">
                    Comfort, consistency, and service details.
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--gold)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="grid gap-6">
            {brands.map((b) => (
              <div key={b.name} className="surface-card rounded-lg p-6 sm:p-8">
                <div className="data-center flex flex-wrap items-start justify-center gap-4 text-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-primary">{b.name}</h3>
                    <p className="mt-2 text-sm font-semibold text-[var(--gold)]">{b.tag}</p>
                  </div>
                </div>
                <p className="copy-center mt-5 max-w-4xl text-sm leading-7 text-foreground/70 sm:text-base">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
