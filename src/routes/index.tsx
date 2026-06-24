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
      {
        name: "description",
        content:
          "AlMulla Holding Group is a Dubai-based conglomerate with subsidiaries in healthcare and hospitality, chaired by Mr. Abdulla Mohamed Saeed AlMulla.",
      },
      { property: "og:title", content: "AlMulla Holding Group" },
      {
        property: "og:description",
        content: "A Dubai conglomerate spanning healthcare and hospitality.",
      },
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
      <section className="relative min-h-[76vh] overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(51,18,20,0.94)_0%,rgba(51,18,20,0.78)_46%,rgba(51,18,20,0.28)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(20,14,12,0.46))]" />
        </div>

        <div className="relative mx-auto flex min-h-[76vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="reveal-up text-sm font-semibold text-[var(--gold)]">
              Dubai holding group
            </div>
            <h1 className="reveal-up reveal-delay-1 mt-5 text-5xl font-bold leading-none text-primary-foreground sm:text-6xl lg:text-7xl">
              AlMulla Holding Group
            </h1>
            <p className="copy-center reveal-up reveal-delay-2 mt-6 max-w-2xl text-base leading-8 text-primary-foreground/78 sm:text-lg">
              A modern holding company with focused investments in healthcare and hospitality, built
              around quality service and long-term value.
            </p>
            <div className="reveal-up reveal-delay-2 mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/about-us" className="btn-primary">
                Discover the group
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-white/18"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-20">
        <div className="surface-card fluid-morph overflow-hidden rounded-lg p-2">
          <img
            src={chairmanImg}
            alt="Chairman"
            className="h-[440px] w-full rounded-md object-cover"
            loading="eager"
            width={900}
            height={1100}
          />
        </div>

        <div className="self-center text-center">
          <div className="section-eyebrow">Leadership</div>
          <h2 className="section-title mt-4 max-w-3xl">
            Built around clarity, disciplined investment, and consistent service.
          </h2>
          <p className="copy-center mt-5 max-w-2xl text-base leading-8 text-foreground/68">
            The group brings together healthcare and hospitality platforms with a practical focus on
            quality, trusted partnerships, and long-term value creation.
          </p>
          <div className="mt-8 surface-card fluid-morph rounded-lg p-5">
            <div className="data-center flex flex-wrap items-center justify-center gap-4">
              <div>
                <p className="text-lg font-semibold text-primary">
                  Mr. Abdulla Mohamed Saeed AlMulla
                </p>
                <p className="mt-1 text-sm text-foreground/58">Chairman</p>
              </div>
              <AlmullaLogo compact />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-white/62">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="surface-card fluid-morph rounded-lg p-6">
              <Sparkles className="mx-auto h-5 w-5 text-[var(--gold)]" />
              <h2 className="mt-4 text-xl font-semibold text-primary">Modern structure</h2>
              <p className="mt-2 text-sm leading-7 text-foreground/70">
                A focused portfolio with clean presentation, clear hierarchy, and an editorial
                layout.
              </p>
            </div>
            <div className="surface-card fluid-morph rounded-lg p-6">
              <HeartPulse className="mx-auto h-5 w-5 text-[var(--gold)]" />
              <h2 className="mt-4 text-xl font-semibold text-primary">Healthcare focus</h2>
              <p className="mt-2 text-sm leading-7 text-foreground/70">
                Built around specialist partnerships, service quality, and patient-centered
                outcomes.
              </p>
            </div>
            <div className="surface-card fluid-morph rounded-lg p-6">
              <Building2 className="mx-auto h-5 w-5 text-[var(--gold)]" />
              <h2 className="mt-4 text-xl font-semibold text-primary">Hospitality platform</h2>
              <p className="mt-2 text-sm leading-7 text-foreground/70">
                Designed for modern travelers with a calm, premium, and highly usable brand
                expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-center gap-6 text-center">
          <div className="mx-auto">
            <div className="section-eyebrow">Businesses</div>
            <h2 className="section-title mt-3 max-w-2xl">
              Two focused platforms with one operating standard.
            </h2>
          </div>
          <p className="copy-center max-w-lg text-sm leading-7 text-foreground/65">
            Healthcare and hospitality are presented through clear sector pages, direct copy, and a
            sharper visual system.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sectors.map((sector) => (
            <article key={sector.title} className="card-business fluid-morph overflow-hidden">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="text-center">
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

                <div className="overflow-hidden rounded-md">
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
