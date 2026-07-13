import { prisma } from "@/lib/prisma";
import ContactContentForm from "@/components/admin/ContactContentForm";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  heroHeading: "",
  heroDescription: "",
  address: "",
  phones: [] as string[],
  email: "",
  hours: "",
  whatsappNumber: "",
  whatsappMessage: "",
  mapEmbedQuery: "",
};

export default async function AdminContactPage() {
  const contact = await prisma.contactContent.findFirst();

  return (
    <div>
      <p className="spec-tag text-primary">Content</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">Contact page</h1>

      <div className="mt-8">
        <ContactContentForm initial={contact ?? DEFAULTS} />
      </div>
    </div>
  );
}
