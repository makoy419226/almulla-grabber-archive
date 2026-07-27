# AlMulla Holding Group Website

## Overview

This repository contains the corporate website for **AlMulla Holding Group**, a diversified holding
company focused on long-term value creation across healthcare, hospitality, education, energy,
strategic investment, and real estate.

The site is an English-language, responsive React application. It presents the group, its chairman,
its business sectors, and its public contact details. It also includes SEO metadata, a privacy
policy, cookie preferences, error pages, and static assets for social sharing and installable web
app metadata.

## Website Content

### Brand message

- Primary headline: **Building Legacies. Empowering Futures.**
- Positioning: a diversified holding group committed to sustainable growth and long-term value.
- Visual direction: premium corporate styling using ivory, champagne, gold, bronze, wine, and dark
  neutral tones.
- Public contact details:
  - Telephone: `04 2249688` (`+971 4 224 9688`)
  - Email: `info@almullaholding.com`

### Main navigation

The desktop header provides links to:

- Home
- Who We Are
- Get In Touch

The mobile menu additionally provides a direct link to the businesses section on the home page.
The shared footer contains About Us, Contact Us, Privacy Policy, contact details, cookie management,
and a non-linked Terms of Use label.

### Page and route inventory

| Route | Purpose and content |
| --- | --- |
| `/` | Home page with the group proposition, hero image, and interactive sector cards for Healthcare, Education, Hospitality, and Energy. Selecting a card opens a detailed modal-style sector view. |
| `/about-us` | Chairman's message, group direction, focus areas, and a profile of Chairman Mr. Abdulla Mohamed Saeed AlMulla. |
| `/contact-us` | Corporate enquiry page with click-to-call and click-to-email contact options. |
| `/privacy-policy` | Route-based privacy policy presentation. The same policy is also available as a modal from the shared footer. |
| `/businesses/healthcare` | Dedicated Chicago Healthcare page covering clinical excellence, medical technology, facilities, and community impact. |
| `/businesses/hospitality` | Dedicated AlMulla Hospitality page and descriptions of Cliftonwood Hotels & Resorts, Cliftonwood Park Hotels, and Cliftonwood Tree Hotels. |
| `/businesses/strategic-investment` | Investment approach, portfolio discipline, partnerships, risk stewardship, and value creation. |
| `/businesses/education` | Academic quality, curriculum relevance, campus experience, institutional partnerships, and future skills. |
| `/businesses/real-estate` | Development quality, site selection, occupier experience, lifecycle management, and durable asset demand. |
| `/businesses/energy` | Reliable supply, renewable integration, industrial alignment, solar platforms, and transition infrastructure. |

Unknown routes use a branded 404 page. Unsupported values under `/businesses/:business` use a
business-specific not-found state.

### Sector summaries

#### Healthcare

Healthcare content is presented under the **Chicago Healthcare** identity. It emphasizes trusted
clinical partnerships, advanced medical equipment, high-quality facilities, measurable patient
outcomes, and improved standards of care for local communities.

#### Hospitality

The hospitality offering targets modern business and leisure travelers through premium service,
practical comfort, and consistent guest experiences. Three concepts are described:

- **Cliftonwood Hotels & Resorts** — luxury and resort experiences.
- **Cliftonwood Park Hotels** — business travel, meetings, dining, and business services.
- **Cliftonwood Tree Hotels** — smart, quality-focused accommodation for value-conscious travelers.

#### Education

Education content focuses on student-first learning environments, academic standards, relevant
curricula, dependable campus operations, institutional partnerships, and preparation for future
skills.

#### Energy

Energy content covers reliable generation and infrastructure, renewable integration, solar
platforms, industrial demand, resilience, and commercially practical energy transition planning.

#### Strategic investment

The investment narrative centers on patient capital, selective sector exposure, downside
protection, aligned operating partners, governance, and measurable long-term value creation.

#### Real estate

The real-estate narrative emphasizes prime sites, development and build quality, mixed-use and
income-oriented assets, occupier demand, active asset management, and performance across market
cycles.

## User Experience and Features

- Responsive desktop and mobile navigation.
- Sticky site header and shared footer.
- Responsive images with alternate sizes, lazy loading, and priority loading for hero media.
- Animated page sections, cards, statistics, and modal transitions.
- Interactive home-page sector detail panels.
- Keyboard support for closing menus and dialogs with `Escape`.
- Body-scroll locking while overlays are open.
- Respect for the user's reduced-motion preference in overlay transitions.
- Click-to-call and click-to-email contact actions.
- Privacy policy available both as a route and an overlay.
- Cookie consent and cookie preference management.
- Branded 404 and server-error fallback pages.
- Web app manifest and icons for installable/standalone display.

The current contact page does **not** submit a form or send data to a backend. Enquiries are made
through the displayed telephone and email links.

## Technology Stack

### Core application

| Area | Technology |
| --- | --- |
| Language | TypeScript 5.8 |
| UI | React 19 |
| Routing and full-stack framework | TanStack Router and TanStack Start |
| Build tooling | Vite 8 |
| Styling | Tailwind CSS 4 plus custom CSS |
| Icons | Lucide React |
| Server/build runtime | Nitro |
| Cloud deployment tooling | Cloudflare Wrangler |
| Package manager | npm |
| Runtime used in CI | Node.js 22 |

### Component and utility ecosystem

The repository includes a shadcn/ui-style component library under `src/components/ui/`, built from
Radix UI primitives. Supporting packages include:

- `class-variance-authority`, `clsx`, and `tailwind-merge` for class composition.
- React Hook Form, Zod, and Hook Form resolvers for typed form infrastructure.
- TanStack Query for asynchronous state infrastructure.
- Embla Carousel, Recharts, Sonner, Vaul, CMDK, and date/input utilities.

Not every installed UI package is necessarily used by the current public pages.

## Application Architecture

### Routing

Routes use TanStack's file-based routing in `src/routes/`. The generated route definition is
`src/routeTree.gen.ts` and should not be edited manually.

Important route files:

- `src/routes/__root.tsx` — document shell, global metadata, error page, and 404 page.
- `src/routes/index.tsx` — home page and home-sector content.
- `src/routes/businesses.$business.tsx` — data-driven strategic investment, education, real-estate,
  and energy pages.
- `src/routes/businesses.healthcare.tsx` — dedicated healthcare page.
- `src/routes/businesses.hospitality.tsx` — dedicated hospitality page.
- `src/routes/about-us.tsx`, `contact-us.tsx`, and `privacy-policy.tsx` — corporate pages.

### Shared layout

`src/components/SiteLayout.tsx` owns the common header, mobile menu, content wrapper, footer,
privacy-policy overlay, and cookie-consent interface. Branding is encapsulated in
`AlmullaLogo.tsx` and `BrandIcon.tsx`.

### Content model

Most public content currently lives directly in the route components:

- Home-sector data is stored in the `sectors` array in `src/routes/index.tsx`.
- Data-driven business-page content is stored in `businessPages` in
  `src/routes/businesses.$business.tsx`.
- Hospitality brand content is stored in the `brands` array in
  `src/routes/businesses.hospitality.tsx`.
- Privacy copy is centralized in `src/lib/privacy-policy.ts`.

There is no CMS or database. Content changes require a code edit and a new build/deployment.

### Assets and styling

- Page photography and brand images are stored in `src/assets/`.
- Shared browser assets—favicons, manifest, robots file, sitemap, and Open Graph images—are in
  `public/` and mirrored in `godaddy-public/` for the static hosting build.
- Global theme variables, animations, layout rules, and component styles are in `src/styles.css`.
- The TypeScript alias `@/*` maps to `src/*`.

## SEO, Privacy, and Resilience

### SEO

The application includes:

- Per-route page titles and meta descriptions.
- Open Graph metadata and sharing images.
- Twitter large-image card metadata.
- Organization and WebSite JSON-LD.
- Canonical site constants in `src/lib/seo.ts`.
- `robots.txt` and `sitemap.xml`.
- Favicons, Apple touch icon, and a web app manifest.
- Hero-image preloading on key routes.

When adding or removing a public route, update both the route source and the sitemap copies used by
the relevant build.

### Privacy and cookies

The policy describes directly supplied enquiry information, usage information, cookies, sharing,
retention, security, and user rights. Cookie preferences are handled on the client. Review the
policy and consent categories whenever analytics, advertising tools, form processors, or other
third-party services are introduced.

### Error handling

The root route supplies user-facing 404 and application error states. The TanStack Start server
entry also normalizes catastrophic SSR failures into an HTML error response instead of exposing a
raw JSON server error.

## Build and Deployment

The repository supports two output modes.

### TanStack Start / Cloudflare build

The default Vite configuration uses TanStack Start, Nitro's `cloudflare_module` preset, React,
Tailwind CSS, and TypeScript path resolution.

```bash
npm ci
npm run build
```

The package also defines:

```bash
npm run deploy
```

This builds the application and invokes `wrangler deploy`. A valid Cloudflare/Wrangler
configuration and credentials are required for an actual deployment.

### GoDaddy static React build

The production workflow currently documented in this repository creates a browser-only React SPA
for GoDaddy shared hosting:

```bash
npm run build:godaddy
```

Output is written to:

```text
godaddy-dist/
```

The static build:

1. Uses `godaddy-react/index.html` as its app shell.
2. Mounts the shared React router through `src/godaddy-main.tsx`.
3. Copies the GoDaddy-specific public files.
4. Generates fallback `index.html` files for deployed routes.
5. Adds `.htaccess` support for SPA routing.

To test that package locally:

```bash
npm run preview:godaddy
```

Upload the **contents** of `godaddy-dist/` to the hosting document root, normally `public_html/`.
More operational detail is available in `GODADDY_HOSTING.md`.

### Continuous deployment

`.github/workflows/deploy-godaddy.yml` runs on every push and on manual dispatch. It:

1. Checks out the repository.
2. Installs Node.js 22 and dependencies with `npm ci`.
3. Builds and validates `godaddy-dist/`.
4. uploads the result to the GoDaddy site root over FTP.

The workflow requires these GitHub repository secrets:

```text
GODADDY_FTP_SERVER
GODADDY_FTP_USERNAME
GODADDY_FTP_PASSWORD
```

## Local Development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Available commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Refresh the GoDaddy package, then start the Vite development server. |
| `npm run build` | Create the TanStack Start/Nitro build. |
| `npm run build:godaddy` | Create the static GoDaddy upload package. |
| `npm run preview` | Preview the default Vite production build. |
| `npm run preview:godaddy` | Build and locally serve the GoDaddy package. |
| `npm run lint` | Run ESLint across the repository. |
| `npm run format` | Format repository files with Prettier. |
| `npm run deploy` | Build and deploy through Wrangler. |

## Maintenance Notes

- Keep public contact details synchronized across the contact page, shared layout, and SEO data.
- Keep `public/` and `godaddy-public/` SEO/static assets synchronized.
- Do not manually edit `src/routeTree.gen.ts`.
- Rebuild `godaddy-dist/` before uploading; it is generated output.
- Optimize new photography and provide explicit dimensions and responsive sources where practical.
- Add a backend or third-party form service if the site needs enquiry submission rather than
  telephone/email links.
- Reassess cookie consent and privacy copy before adding analytics or tracking.
- Validate both output modes after routing, metadata, or asset-path changes.
