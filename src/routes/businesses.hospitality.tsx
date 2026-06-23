import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BrandIcon } from "@/components/BrandIcon";
import hospitalityImg from "@/assets/hospitality.jpg";
import dubaiImg from "@/assets/dubai.jpg";

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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BrandIcon className="w-16 h-20 mx-auto mb-4" />
          <h1 className="font-serif text-5xl text-primary uppercase">AlMulla Hospitality</h1>
          <span className="gold-divider" />
        </div>

        <div className="max-w-3xl mx-auto px-4 mt-8 text-muted-foreground leading-relaxed space-y-5 text-lg">
          <p>
            The modern traveler asks more of every journey. After a day of meetings or
            sightseeing, a room is no longer enough — a hotel must be an antidote to
            stress, a place where guests can truly relax and rejuvenate in an
            environment aligned with their values.
          </p>
          <p>
            AlMulla Hospitality has built that haven. Our properties are designed for the
            upscale, conscious lifestyle traveler, integrating local culture, mindful
            living and Shariah-compliant principles with the comforts a discerning guest
            expects. Our mission is sustainable quality and satisfaction — to delight
            every guest on every visit.
          </p>
          <p>
            Personalised service and close interaction are central to this concept. We
            build customer relationships founded on honesty, trust and integrity so that
            a stay is remembered not just by the mind, but by the soul.
          </p>
          <p>
            All of our restaurants, lounges and cafés lean toward healthy, conscious
            eating. Our spas blend international treatments with local rituals so guests
            experience the flavour of the destination. Small personal touches — a choice
            of flowers, incense or music in the room, preferences saved for future
            visits — make a meaningful difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 mt-14">
          <img src={dubaiImg} alt="Dubai" className="rounded-lg shadow-lg w-full h-64 object-cover" loading="lazy" width={800} height={400} />
          <img src={hospitalityImg} alt="Hospitality" className="rounded-lg shadow-lg w-full h-64 object-cover" loading="lazy" width={800} height={400} />
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-20 space-y-10">
          {brands.map((b) => (
            <div key={b.name} className="bg-white rounded-lg shadow-md border border-border p-8">
              <h3 className="font-serif text-2xl text-primary">{b.name}</h3>
              <p className="text-sm text-[var(--gold)] uppercase tracking-widest mt-1">{b.tag}</p>
              <span className="block w-16 h-0.5 bg-[var(--gold)] my-4" />
              <p className="text-muted-foreground leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
