import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) notFound();

  return (
    <div>
      <p className="spec-tag text-primary">Content · Services</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">Edit service</h1>

      <div className="mt-8">
        <ServiceForm initial={service} />
      </div>
    </div>
  );
}
