import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import heroImg from "@/assets/hero.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import hospitalityImg from "@/assets/hospitality.jpg";
import chairmanImg from "@/assets/chairman.jpg";
import { ArrowUpRight, Building2, HeartPulse, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AlMulla Holding Group — Dubai Conglomerate" },
      { name: "description", content: "AlMulla Holding Group is a Dubai-based conglomerate with subsidiaries in healthcare and hospitality, chaired by Mr. Abdulla Mohamed Saeed AlMulla." },
      { property: "og:title", content: "AlMulla Holding Group" },
      { property: "og:description", content: "A Dubai conglomerate spanning healthcare and hospitality." },
    ],
  }),
  component: Home,
});

function Home() {
  const sectors = [
    {
      title: "Healthcare",
      img: healthcareImg,
      to: "/businesses/healthcare",
      body: "Investments shaped around clinical quality, specialist partnerships, and modern patient experiences.",
    },
    {
      title: "Hospitality",
      img: hospitalityImg,
      to: "/businesses/hospitality",
      body: "Hospitality concepts designed for modern travelers, comfort, and memorable service.",
    },
  ];

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,245,0.97)_0%,rgba(250,248,245,0.88)_44%,rgba(250,248,245,0.6)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.2)_100%)]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-24">
          <div className="max-w-2xl self-center">
            <div className="reveal-up section-eyebrow">Dubai holding group</div>
            <h1 className="reveal-up reveal-delay-1 mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-primary sm:text-6xl lg:text-7xl">
              AlMulla Holding Group
            </h1>
            <p className="reveal-up reveal-delay-2 mt-6 max-w-xl text-base leading-8 text-foreground/70 sm:text-lg">
              A modern holding company with focused investments in healthcare and hospitality, built around quality service and long-term value.
            </p>
            <div className="reveal-up reveal-delay-2 mt-8 flex flex-wrap gap-3">
              <Link to="/about-us" className="btn-primary">
                Discover the group
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-border bg-white/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Contact us
              </Link>
            </div>

          </div>

          <div className="self-center">
            <div className="surface-card overflow-hidden rounded-[1.75rem] p-3">
              <div className="relative overflow-hidden rounded-[1.4rem]">
                <img
                  src={chairmanImg}
                  alt="Chairman"
                  className="h-[420px] w-full object-cover sm:h-[520px]"
                  loading="eager"
                  width={900}
                  height={1100}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(23,17,14,0.12)_100%)]" />

                <div className="absolute left-4 top-4 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
                  Chairman profile
                </div>

                <div className="absolute bottom-4 left-4 right-4 surface-card rounded-2xl p-4 backdrop-blur">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">Mr. Abdulla Mohamed Saeed AlMulla</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-foreground/55">Chairman</p>
                    </div>
                    <AlmullaLogo compact />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="surface-card rounded-[1.5rem] p-6">
            <Sparkles className="h-5 w-5 text-[var(--gold)]" />
            <h2 className="mt-4 text-xl font-semibold text-primary">Modern structure</h2>
            <p className="mt-2 text-sm leading-7 text-foreground/70">
              A focused portfolio with clean presentation, clear hierarchy, and an editorial layout.
            </p>
          </div>
          <div className="surface-card rounded-[1.5rem] p-6">
            <HeartPulse className="h-5 w-5 text-[var(--gold)]" />
            <h2 className="mt-4 text-xl font-semibold text-primary">Healthcare focus</h2>
            <p className="mt-2 text-sm leading-7 text-foreground/70">
              Built around specialist partnerships, service quality, and patient-centered outcomes.
            </p>
          </div>
          <div className="surface-card rounded-[1.5rem] p-6">
            <Building2 className="h-5 w-5 text-[var(--gold)]" />
            <h2 className="mt-4 text-xl font-semibold text-primary">Hospitality platform</h2>
            <p className="mt-2 text-sm leading-7 text-foreground/70">
              Designed for modern travelers with a calm, premium, and highly usable brand expression.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="section-eyebrow">Businesses</div>
            <h2 className="section-title mt-3 max-w-2xl">Two core businesses, presented with a lighter touch.</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-foreground/65">
            The site now leans into a cleaner, modern visual system with stronger spacing, soft surfaces, and animated entry states.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sectors.map((sector) => (
            <article key={sector.title} className="card-business overflow-hidden">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <div className="section-eyebrow">{sector.title}</div>
                  <h3 className="mt-3 text-2xl font-semibold text-primary">{sector.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/70">{sector.body}</p>
                  <Link
                    to={sector.to}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[var(--gold)]"
                  >
                    Read more
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="overflow-hidden rounded-[1.25rem]">
                  <img
                    src={sector.img}
                    alt={sector.title}
                    className="h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    loading="lazy"
                    width={900}
                    height={600}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
