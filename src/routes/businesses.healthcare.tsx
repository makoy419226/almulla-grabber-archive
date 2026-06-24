import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import { ArrowUpRight, HeartPulse, Stethoscope, Building2, Microscope } from "lucide-react";
import healthcareImg from "@/assets/healthcare.jpg";

export const Route = createFileRoute("/businesses/healthcare")({
  head: () => ({
    meta: [
      { title: "Chicago Healthcare — AlMulla Holding Group" },
      {
        name: "description",
        content:
          "Chicago Healthcare invests in and operates premium healthcare ventures in Dubai, partnering with world-class medical experts.",
      },
      { property: "og:title", content: "Chicago Healthcare" },
      {
        property: "og:description",
        content: "Quality healthcare projects with top medical experts.",
      },
      { property: "og:image", content: healthcareImg },
    ],
  }),
  component: Healthcare,
});

const stats = [
  { value: "15+", label: "Years of Investment" },
  { value: "20+", label: "Specialist Partners" },
  { value: "100K+", label: "Patient Touchpoints" },
];

const pillars = [
  {
    icon: Stethoscope,
    title: "Clinical Excellence",
    body: "Partnerships with leading specialists across cardiology, oncology, and advanced diagnostics.",
  },
  {
    icon: Microscope,
    title: "Advanced Technology",
    body: "Investment in the latest medical equipment and digital health infrastructure.",
  },
  {
    icon: Building2,
    title: "World-Class Facilities",
    body: "Premium environments designed around patient dignity, comfort, and outcomes.",
  },
  {
    icon: HeartPulse,
    title: "Community Impact",
    body: "Programs that elevate standards of care across Dubai and the wider region.",
  },
];

function Healthcare() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${healthcareImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/90 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-32 pt-28 sm:px-6 lg:px-8 lg:pb-44 lg:pt-36">
          <div className="motion-flip-bottom mb-8 flex h-20 w-20 items-center justify-center rounded-lg bg-white/95 shadow-2xl shadow-black/20">
            <AlmullaLogo compact />
          </div>
          <div className="motion-flip-bottom motion-delay-1 mb-8 flex items-center gap-3 text-sm font-semibold text-[var(--gold)]">
            <span className="h-px w-10 bg-[var(--gold)]" />
            Sector · Healthcare
          </div>
          <h1 className="motion-flip-bottom motion-delay-2 max-w-5xl text-5xl font-bold leading-none md:text-7xl lg:text-8xl">
            Chicago <span className="text-[var(--gold)]">Healthcare</span>
          </h1>
          <p className="motion-slide-bottom motion-delay-3 mt-8 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
            Investing in the care and improvement of human life — through premium clinical ventures,
            leading specialists, and the technology that defines modern medicine.
          </p>

          <div className="motion-slide-bottom motion-delay-4 mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-primary-foreground/20 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[var(--gold)] md:text-4xl">{s.value}</div>
                <div className="mt-2 text-sm text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / Mission split */}
      <section className="bg-background">
        <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="motion-slide-bottom grid gap-8 lg:grid-cols-12">
            <div className="surface-card rounded-lg p-8 lg:col-span-7 lg:p-12">
              <div className="mb-5 text-sm font-semibold text-[var(--gold)]">Our Mission</div>
              <h2 className="text-3xl font-semibold leading-tight text-primary md:text-4xl">
                A commitment to the care and improvement of human life.
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed text-[17px]">
                <p>
                  Chicago Healthcare invests in and manages high-quality healthcare projects in
                  partnership with leading medical experts. Every venture is shaped around
                  measurable patient outcomes and uncompromising clinical standards.
                </p>
                <p>
                  We bring the highest standards of service to our local communities through the
                  latest medical equipment and close partnerships with respected institutions —
                  helping establish Dubai as a healthcare hub for the region.
                </p>
              </div>
            </div>

            <aside className="flex flex-col justify-between rounded-lg bg-primary p-8 text-primary-foreground lg:col-span-5 lg:p-12">
              <div>
                <div className="mb-5 text-sm font-semibold text-[var(--gold)]">Values</div>
                <p className="text-2xl font-semibold leading-snug">
                  "These values are essential and timeless — guiding every investment, partnership,
                  and patient experience we touch."
                </p>
              </div>
              <Link
                to="/contact-us"
                className="group mt-10 inline-flex items-center justify-between gap-4 border-t border-primary-foreground/20 pt-6 text-sm font-semibold"
              >
                Partner with us
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="mb-4 text-sm font-semibold text-[var(--gold)]">What we build</div>
              <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-primary md:text-5xl">
                Four pillars guiding every investment.
              </h2>
            </div>
            <div className="text-muted-foreground max-w-sm text-[15px]">
              From clinical partnerships to facility design, our portfolio is structured around what
              matters most to patients and practitioners.
            </div>
          </div>

          <div className="grid overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group bg-card p-8 transition-colors hover:bg-secondary lg:p-10"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-primary">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-semibold leading-tight text-primary md:text-4xl">
            Building Dubai's next chapter in healthcare — together with the region's most trusted
            specialists.
          </h2>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link to="/contact-us" className="btn-primary">
              Get in touch
            </Link>
            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              About the group
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
