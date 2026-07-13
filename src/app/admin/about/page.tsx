import { prisma } from "@/lib/prisma";
import AboutContentForm from "@/components/admin/AboutContentForm";

export const dynamic = "force-dynamic";

type Card = { icon: "Target" | "Eye" | "Factory"; title: string; description: string };
type CapabilityGroup = { heading: string; items: string[] };

const DEFAULTS = {
  heroEyebrow: "About",
  heroHeading: "",
  introParagraphs: [] as string[],
  cards: [] as Card[],
  capabilityEyebrow: "Capability",
  capabilityTitle: "",
  capabilityDescription: "",
  capabilityGroups: [] as CapabilityGroup[],
  leadershipEyebrow: "Leadership",
  leadershipTitle: "",
  leadershipDescription: "",
};

export default async function AdminAboutPage() {
  const about = await prisma.aboutContent.findFirst();

  const initial = about
    ? {
        heroEyebrow: about.heroEyebrow,
        heroHeading: about.heroHeading,
        introParagraphs: about.introParagraphs,
        cards: about.cards as unknown as Card[],
        capabilityEyebrow: about.capabilityEyebrow,
        capabilityTitle: about.capabilityTitle,
        capabilityDescription: about.capabilityDescription,
        capabilityGroups: about.capabilityGroups as unknown as CapabilityGroup[],
        leadershipEyebrow: about.leadershipEyebrow,
        leadershipTitle: about.leadershipTitle,
        leadershipDescription: about.leadershipDescription,
      }
    : DEFAULTS;

  return (
    <div>
      <p className="spec-tag text-primary">Content</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">About page</h1>

      <div className="mt-8">
        <AboutContentForm initial={initial} />
      </div>
    </div>
  );
}
