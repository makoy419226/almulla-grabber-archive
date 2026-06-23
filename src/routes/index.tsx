import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BrandIcon } from "@/components/BrandIcon";
import heroImg from "@/assets/hero.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import hospitalityImg from "@/assets/hospitality.jpg";
import chairmanImg from "@/assets/chairman.jpg";

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
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-primary tracking-tight uppercase drop-shadow-sm">
            AlMulla Holding Group
          </h1>
          <span className="gold-divider" />
        </div>

        {/* Business cards overlapping */}
        <div className="relative max-w-6xl mx-auto px-4 -mt-4 pb-16 grid md:grid-cols-2 gap-8">
          {[
            { title: "Healthcare", img: healthcareImg, to: "/businesses/healthcare" },
            { title: "Hospitality", img: hospitalityImg, to: "/businesses/hospitality" },
          ].map((b) => (
            <div key={b.title} className="card-business">
              <BrandIcon className="w-20 h-24 mx-auto" />
              <h3 className="mt-4 text-2xl font-serif uppercase tracking-widest text-primary">{b.title}</h3>
              <img src={b.img} alt={b.title} className="mt-6 w-full h-44 object-cover rounded-md" loading="lazy" width={600} height={300} />
              <Link to={b.to} className="inline-block mt-5 text-sm font-semibold uppercase tracking-widest text-primary border-b-2 border-[var(--gold)] pb-1 hover:opacity-80">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="bg-secondary py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl text-primary uppercase">AlMulla Holding Group</h2>
            <span className="block w-24 h-0.5 bg-[var(--gold)] my-5" />
            <p className="text-muted-foreground leading-relaxed mb-8">
              AlMulla Holding Group is a business conglomerate with several subsidiaries,
              chaired by Mr. Abdulla Mohamed Saeed AlMulla. Headquartered in Dubai, the
              group invests across healthcare, hospitality and strategic ventures.
            </p>
            <Link to="/contact-us" className="btn-primary">Contact Us</Link>
          </div>
          <div className="relative">
            <img src={chairmanImg} alt="Chairman" className="rounded-lg shadow-xl w-full" loading="lazy" width={800} height={800} />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-[var(--gold)] rounded-lg -z-0" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
