import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import educationImg from "@/assets/sector-education.jpg";
import educationImg900 from "@/assets/sector-education-900.jpg";
import energyImg from "@/assets/sector-energy.jpg";
import energyImg900 from "@/assets/sector-energy-900.jpg";
import heroAlmullaEtihadImg from "@/assets/hero-almulla-etihad-burj.jpg";
import heroAlmullaEtihadImg720 from "@/assets/hero-almulla-etihad-burj-720.jpg";
import healthcareImg from "@/assets/sector-healthcare.jpg";
import healthcareImg900 from "@/assets/sector-healthcare-900.jpg";
import hospitalityImg from "@/assets/sector-hospitality.jpg";
import hospitalityImg900 from "@/assets/sector-hospitality-900.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AlMulla Holding Group — Diversified Holding Company" },
      {
        name: "description",
        content:
          "AlMulla Holding Group is a diversified holding company building long-term value across healthcare, hospitality, education, and energy.",
      },
      { property: "og:title", content: "AlMulla Holding Group" },
      {
        property: "og:description",
        content:
          "A diversified holding company focused on long-term value across healthcare, hospitality, education, and energy.",
      },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroAlmullaEtihadImg720,
        imageSrcSet: `${heroAlmullaEtihadImg720} 720w, ${heroAlmullaEtihadImg} 1536w`,
        imageSizes: "100vw",
      },
    ],
  }),
  component: Home,
});

const sectors = [
  {
    title: "Healthcare",
    img: healthcareImg,
    imgSmall: healthcareImg900,
    width: 1536,
    height: 1024,
    body: "Delivering advanced healthcare services that improve lives and communities.",
  },
  {
    title: "Education",
    img: educationImg,
    imgSmall: educationImg900,
    width: 1536,
    height: 1024,
    body: "Supporting future generations through quality education and innovative learning.",
  },
  {
    title: "Hospitality",
    img: hospitalityImg,
    imgSmall: hospitalityImg900,
    width: 1536,
    height: 1024,
    body: "Creating exceptional experiences through world-class hospitality and leisure.",
  },
  {
    title: "Energy",
    img: energyImg,
    imgSmall: energyImg900,
    width: 1536,
    height: 1024,
    body: "Powering progress through reliable energy platforms and solutions.",
  },
];

function Home() {
  return (
    <SiteLayout>
      <div className="home-legacy">
        <section className="legacy-hero">
          <div className="legacy-hero-media">
            <img
              src={heroAlmullaEtihadImg720}
              alt=""
              className="h-full w-full"
              srcSet={`${heroAlmullaEtihadImg720} 720w, ${heroAlmullaEtihadImg} 1536w`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="100vw"
              width={1536}
              height={864}
            />
            <div className="legacy-hero-grid flex px-4 sm:px-6 lg:px-8">
              <div className="legacy-hero-copy reveal-up">
                <h1 className="legacy-heading">
                  <span>Building Legacies.</span>
                  <span>Empowering Futures.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8">
                  AlMulla Holding Group is a diversified holding company committed to long-term
                  value creation and sustainable growth across key sectors that shape tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="businesses" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="legacy-eyebrow">What We Do</div>
            <h2 className="legacy-section-title mt-3">Our Portfolio</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
            {sectors.map((sector) => (
              <article key={sector.title} className="legacy-sector-card">
                <div className="legacy-sector-media">
                  <img
                    src={sector.img}
                    alt={sector.title}
                    className="h-full w-full object-cover"
                    srcSet={`${sector.imgSmall} 900w, ${sector.img} ${sector.width}w`}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    width={sector.width}
                    height={sector.height}
                  />
                </div>
                <div className="legacy-sector-body">
                  <h3>{sector.title}</h3>
                  <p className="legacy-sector-copy mt-3">{sector.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
