import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });

  if (!member) notFound();

  return (
    <div>
      <p className="spec-tag text-primary">Content · Team</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">Edit team member</h1>
      <div className="mt-8">
        <TeamMemberForm
          initial={{
            id: member.id,
            name: member.name,
            role: member.role,
            image: member.image,
            imageAlt: member.imageAlt,
            bio: member.bio ?? "",
            isCeo: member.isCeo,
            order: member.order,
          }}
        />
      </div>
    </div>
  );
}
