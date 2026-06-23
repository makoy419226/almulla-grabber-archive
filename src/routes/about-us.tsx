import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import chairmanImg from "@/assets/chairman.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — AlMulla Holding Group" },
      { name: "description", content: "Learn about AlMulla Holding Group and a message from Chairman Mr. Abdulla Mohamed Saeed AlMulla." },
      { property: "og:title", content: "About AlMulla Holding Group" },
      { property: "og:description", content: "Chairman's message and company overview." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="bg-secondary py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl text-primary uppercase">About Us</h1>
          <span className="gold-divider" />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="font-serif text-3xl text-primary mb-4">Chairman's Message</h2>
            <span className="block w-20 h-0.5 bg-[var(--gold)] mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              In today's dynamic environment, growth is essential for sustainability
              and for protecting the interests of our stakeholders. At AlMulla Holding
              Group we continuously prepare for new opportunities and embrace economic
              diversity. The group is built around subsidiaries focused on Healthcare,
              Energy and Hospitality.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">Our activities span:</p>
            <ul className="space-y-2 mb-8">
              {["Strategic investment", "Real estate", "Healthcare", "Hospitality", "Education"].map((i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)]" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={chairmanImg} alt="Mr. Abdulla Mohamed Saeed AlMulla, Chairman" className="rounded-lg shadow-xl w-full" loading="lazy" width={800} height={800} />
            <div className="text-center mt-5">
              <p className="font-serif italic text-xl text-primary">Mr. Abdulla Mohamed Saeed AlMulla</p>
              <p className="text-sm text-muted-foreground tracking-widest uppercase">Chairman</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-serif text-3xl mb-4">AlMulla Holding Group</h3>
          <p className="opacity-90 mb-8">
            A conglomerate with several subsidiaries, chaired by Mr. Abdulla Mohamed Saeed AlMulla.
          </p>
          <Link to="/contact-us" className="btn-primary !bg-[var(--gold)] !text-primary">Contact Us</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
