import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  return (
    <div>
      <p className="spec-tag text-primary">Content · Projects</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">Edit project</h1>
      <div className="mt-8">
        <ProjectForm initial={project} />
      </div>
    </div>
  );
}
