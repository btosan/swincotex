import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <p className="spec-tag text-primary">Content · Projects</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">New project</h1>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
