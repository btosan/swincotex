import type { Metadata } from "next";
import { Target, Eye, Factory, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Swincotex Energy Nigeria Limited is an indigenous oil and gas service organization based in Warri, Delta State, Nigeria.",
};

const companyImage =
  "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?q=80&w=1400&auto=format&fit=crop";

// AboutContent.cards and .capabilityGroups are stored as Prisma `Json`,
// so they come back typed as `unknown` at runtime — these mirror the
// shapes seed.ts writes them in.
type AboutCard = { icon: "Target" | "Eye" | "Factory"; title: string; description: string };
type CapabilityGroup = { heading: string; items: string[] };

// Card `icon` is persisted as a plain string in the Json column, so it
// needs to be mapped back to the actual lucide-react component here —
// the DB has no concept of a component reference.
const cardIconMap: Record<AboutCard["icon"], LucideIcon> = {
  Target,
  Eye,
  Factory,
};

export default async function AboutPage() {
  const [aboutContent, teamMembers] = await Promise.all([
    prisma.aboutContent.findFirst(),
    prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!aboutContent) {
    // AboutContent is a singleton row created by seed.ts — if it's
    // missing, the seed hasn't been run yet rather than this being a
    // normal "no content" state.
    return (
      <section className="container-page py-24 text-center text-steel">
        About page content hasn&apos;t been seeded yet. Run{" "}
        <code className="rounded bg-paper px-1.5 py-0.5">npx prisma db seed</code>.
      </section>
    );
  }

  const cards = aboutContent.cards as AboutCard[];
  const capabilityGroups = aboutContent.capabilityGroups as CapabilityGroup[];

  const ceo = teamMembers.find((member) => member.isCeo);
  const restOfTeam = teamMembers.filter((member) => !member.isCeo);

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <img
          src={companyImage}
          alt="Swincotex industrial facility"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="blueprint-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/20 via-navy/40 to-navy/60" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-gray-200">{aboutContent.heroEyebrow}</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {aboutContent.heroHeading}
          </h1>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="Who we are" title="About Swincotex" />
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-steel">
              {aboutContent.introParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {cards.map((card) => {
              const Icon = cardIconMap[card.icon];
              return (
                <div key={card.title} className="rounded-md border border-line bg-white p-6">
                  <Icon size={22} className="text-primary" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capability summary */}
      <section className="border-t border-line bg-paper py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow={aboutContent.capabilityEyebrow}
            title={aboutContent.capabilityTitle}
            description={aboutContent.capabilityDescription}
          />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {capabilityGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="font-display text-base font-semibold text-navy">{group.heading}</h3>
                <ul className="mt-3 flex flex-col gap-2 border-l-2 border-sky/40 pl-4">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-steel">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow={aboutContent.leadershipEyebrow}
            title={aboutContent.leadershipTitle}
            description={aboutContent.leadershipDescription}
          />

          <div className="mt-12 flex flex-col gap-6">
            {/* CEO — featured, larger */}
            {ceo && (
              <div className="flex flex-col gap-6 rounded-md border border-line bg-white p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                <div className="relative aspect-square w-full shrink-0 overflow-hidden  bg-transparent sm:w-64">
                  <img
                    src={ceo.image}
                    alt={ceo.imageAlt}
                    className="h-full w-full object-cover"
                  />
                  <span className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 border-l-2 border-t-2 border-navy/80" />
                  <span className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 border-r-2 border-t-2 border-navy/80" />
                  <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-4 w-4 border-b-2 border-l-2 border-sky/80" />
                  <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 border-sky/80" />
                </div>
                <div>
                  <p className="spec-tag text-primary">{ceo.role}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
                    {ceo.name}
                  </h3>
                  {ceo.bio && (
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel">{ceo.bio}</p>
                  )}
                </div>
              </div>
            )}

            {/* Rest of team */}
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {restOfTeam.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col overflow-hidden rounded-md border border-line bg-white"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-navy">
                    <img
                      src={member.image}
                      alt={member.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h4 className="font-display text-sm font-semibold leading-snug text-navy sm:text-base">
                      {member.name}
                    </h4>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-steel-light">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}