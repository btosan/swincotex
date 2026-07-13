import TeamMemberForm from "@/components/admin/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <p className="spec-tag text-primary">Content · Team</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">New team member</h1>
      <div className="mt-8">
        <TeamMemberForm />
      </div>
    </div>
  );
}
