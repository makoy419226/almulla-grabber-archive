import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowUpRight, HeartPulse, Stethoscope, Building2, Microscope } from "lucide-react";
import healthcareImg from "@/assets/healthcare.jpg";

export const Route = createFileRoute("/businesses/healthcare")({
  head: () => ({
    meta: [
      { title: "Chicago Healthcare — AlMulla Holding Group" },
      { name: "description", content: "Chicago Healthcare invests in and operates premium healthcare ventures in Dubai, partnering with world-class medical experts." },
      { property: "og:title", content: "Chicago Healthcare" },
      { property: "og:description", content: "Quality healthcare projects with top medical experts." },
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
  { icon: Stethoscope, title: "Clinical Excellence", body: "Partnerships with leading specialists across cardiology, oncology, and advanced diagnostics." },
  { icon: Microscope, title: "Advanced Technology", body: "Investment in the latest medical equipment and digital health infrastructure." },
  { icon: Building2, title: "World-Class Facilities", body: "Premium environments designed around patient dignity, comfort, and outcomes." },
  { icon: HeartPulse, title: "Community Impact", body: "Programs that elevate standards of care across Dubai and the wider region." },
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
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/90 to-transparent" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-32 lg:pt-40 lg:pb-48">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-8">
            <span className="h-px w-10 bg-[var(--gold)]" />
            Sector · Healthcare
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl">
            Chicago <span className="italic text-[var(--gold)]">Healthcare</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
            Investing in the care and improvement of human life — through premium clinical
            ventures, leading specialists, and the technology that defines modern medicine.
          </p>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl border-t border-primary-foreground/20 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl md:text-4xl text-[var(--gold)]">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / Mission split */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-card rounded-2xl shadow-[0_30px_60px_-30px_oklch(0_0_0/0.25)] p-10 lg:p-14">
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-5">Our Mission</div>
              <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
                A commitment to the care and improvement of human life.
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed text-[17px]">
                <p>
                  Chicago Healthcare invests in and manages high-quality healthcare projects in
                  partnership with leading medical experts. Every venture is shaped around
                  measurable patient outcomes and uncompromising clinical standards.
                </p>
                <p>
                  We bring the highest standards of service to our local communities through
                  the latest medical equipment and close partnerships with respected
                  institutions — helping establish Dubai as a healthcare hub for the region.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5 bg-primary text-primary-foreground rounded-2xl p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-5">Values</div>
                <p className="font-serif text-2xl leading-snug">
                  "These values are essential and timeless — guiding every investment,
                  partnership, and patient experience we touch."
                </p>
              </div>
              <Link
                to="/contact-us"
                className="mt-10 inline-flex items-center justify-between gap-4 group border-t border-primary-foreground/20 pt-6 text-sm uppercase tracking-[0.2em]"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-4">What we build</div>
              <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-2xl leading-tight">
                Four pillars guiding every investment.
              </h2>
            </div>
            <div className="text-muted-foreground max-w-sm text-[15px]">
              From clinical partnerships to facility design, our portfolio is structured
              around what matters most to patients and practitioners.
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-card p-8 lg:p-10 group transition-colors hover:bg-secondary"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-primary mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
            Building Dubai's next chapter in healthcare — together with the region's most
            trusted specialists.
          </h2>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link to="/contact-us" className="btn-primary">Get in touch</Link>
            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
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
