# Swincotex Energy — Website

Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run start
```

## Site structure

```
app/
  layout.tsx              Root layout — fonts, metadata, Navbar/Footer
  globals.css              Tailwind v4 theme tokens (@theme), blueprint-grid & spec-tag utilities
  page.tsx                 Home
  about/page.tsx            About Us
  services/page.tsx         Services hub (all 9 disciplines)
  services/[slug]/page.tsx  Individual service detail page (statically generated)
  projects/page.tsx         Project experience / register
  hse-quality/page.tsx      HSE & Quality
  contact/page.tsx          Contact (static form UI + embedded map)
  not-found.tsx              404 page

components/
  Navbar.tsx                Sticky nav with Services mega-menu (desktop) + mobile drawer
  Footer.tsx
  SectionHeading.tsx         Reusable eyebrow + heading
  ServiceIcon.tsx            Maps service.icon -> lucide-react icon

lib/
  services-data.ts           Single source of truth for all 9 services (feeds nav, hub, detail pages)
  projects-data.ts           Project register + additional field works
```

## Navigation / menu map

- Home
- Services (mega-menu, desktop hover / mobile accordion)
  - Environmental, Process & Thermal Engineering
  - Well Head Services
  - Mechanical Engineering, Design & Construction
  - Fabrication, Supply & Installation of Process Equipment
  - Civil Engineering Construction
  - Inspection & Corrosion Engineering
  - Pipeline Construction
  - EPC Services
  - Maintenance of Mechanical Installations & Structures
- About Us
- Projects
- HSE & Quality
- Contact (+ "Request a Quote" button, always visible)

## Design system

- **Colors** (`app/globals.css` `@theme`): `primary` (Facebook blue #1877F2), `navy` (deep blueprint navy #081B33, used for dark sections), `sky` (Man City sky blue #6CABDD, small accent only), `paper` (off-white background), `steel` (body copy gray-blue).
- **Type**: Space Grotesk (display/headings), Inter (body), JetBrains Mono (spec-sheet style tags — project codes, labels, coordinates).
- **Signature motif**: an engineering "blueprint grid" background (`.blueprint-grid` utility) and spec-sheet style reference tags (`.spec-tag`, e.g. `01`, `PRJ-002`) used throughout as a structural device — echoing the technical drawing / project-register vernacular of an EPC contractor.

## To do before going live

- Wire the contact form (`app/contact/page.tsx`) to an API route or email service (e.g. Resend, or a Next.js Route Handler that emails via SMTP).
- Replace placeholder phone number and swap in real coordinates for the embedded map.
- Add real photography (site/fabrication yard images) — currently the hero/about visuals use the blueprint-grid motif in place of photos.
- Add `favicon.ico` / OG image in `app/` and `public/`.
