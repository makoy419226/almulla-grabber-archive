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
      { name: "description", content: "AlMulla Hospitality creates upscale, conscious-lifestyle hotel experiences across the Cliftonwood family of brands." },
      { property: "og:title", content: "AlMulla Hospitality" },
      { property: "og:description", content: "Upscale hotels for the conscious modern traveler." },
      { property: "og:image", content: "/src/assets/hospitality.jpg" },
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
      <section className="border-b border-border/70 bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex justify-center">
            <AlmullaLogo compact />
          </div>
          <div className="section-eyebrow mt-6">Hospitality</div>
          <h1 className="section-title mx-auto mt-4 max-w-3xl">AlMulla Hospitality</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-foreground/65 sm:text-base">
            Hospitality concepts shaped for modern travelers, premium service, and calm, practical luxury.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="surface-card rounded-[1.75rem] p-6 sm:p-8">
              <div className="section-eyebrow">Concept</div>
              <p className="mt-4 text-lg leading-8 text-foreground/75">
                After a day of work or travel, a hotel should feel calm, efficient, and easy to trust.
                AlMulla Hospitality is built around that idea.
              </p>
            </div>

            <div className="surface-card rounded-[1.75rem] p-6 sm:p-8">
              <div className="section-eyebrow">Approach</div>
              <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
                Our properties are designed for guests who want thoughtful service, strong brand standards,
                and a modern environment that supports both work and rest.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <img src={dubaiImg} alt="Dubai" className="h-64 w-full rounded-[1.5rem] object-cover shadow-lg" loading="lazy" width={800} height={400} />
              <img src={hospitalityImg} alt="Hospitality" className="h-64 w-full rounded-[1.5rem] object-cover shadow-lg" loading="lazy" width={800} height={400} />
            </div>

            <div className="surface-card rounded-[1.75rem] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Guest experience</p>
                  <p className="mt-3 text-lg font-semibold text-primary">Comfort, consistency, and service details.</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--gold)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {brands.map((b) => (
              <div key={b.name} className="surface-card rounded-[1.5rem] p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-primary">{b.name}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--gold)]">{b.tag}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-4xl text-sm leading-7 text-foreground/70 sm:text-base">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
