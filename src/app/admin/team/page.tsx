import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const teamMembers = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="spec-tag text-primary">Content</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-navy">Team</h1>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} /> New team member
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-4 rounded-md border border-line bg-white p-4">
            <img src={member.image} alt={member.imageAlt} className="h-14 w-14 shrink-0 rounded-sm object-cover" />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-navy">
                {member.name}
                {member.isCeo && <Star size={12} className="shrink-0 fill-primary text-primary" />}
              </p>
              <p className="truncate text-xs text-steel-light">{member.role}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Link
                href={`/admin/team/${member.id}/edit`}
                aria-label={`Edit ${member.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-sm text-steel hover:bg-paper hover:text-primary"
              >
                <Pencil size={16} />
              </Link>
              <DeleteButton endpoint={`/api/admin/team/${member.id}`} confirmLabel={member.name} />
            </div>
          </div>
        ))}

        {teamMembers.length === 0 && (
          <p className="col-span-full py-10 text-center text-steel-light">No team members yet.</p>
        )}
      </div>
    </div>
  );
}
