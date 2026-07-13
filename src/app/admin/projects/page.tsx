import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";
import FieldWorksManager from "@/components/admin/FieldWorksManager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const [projects, fieldWorks] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.fieldWork.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="spec-tag text-primary">Content</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-navy">Projects</h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} /> New project
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-md border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-steel-light">
            <tr>
              <th className="px-5 py-3 font-semibold">Code</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">Client</th>
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-line last:border-b-0">
                <td className="px-5 py-3 font-mono text-xs text-steel-light">{project.code}</td>
                <td className="px-5 py-3 font-medium text-navy">{project.location}</td>
                <td className="px-5 py-3 text-steel">{project.client}</td>
                <td className="px-5 py-3 text-steel">{project.order}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      aria-label={`Edit ${project.code}`}
                      className="flex h-8 w-8 items-center justify-center rounded-sm text-steel hover:bg-paper hover:text-primary"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteButton endpoint={`/api/admin/projects/${project.id}`} confirmLabel={project.code} />
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-steel-light">
                  No projects yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FieldWorksManager initial={fieldWorks} />
    </div>
  );
}
