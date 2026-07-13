import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <p className="spec-tag text-primary">Content · Services</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">New service</h1>

      <div className="mt-8">
        <ServiceForm />
      </div>
    </div>
  );
}
