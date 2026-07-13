import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serviceIconMap } from "@/lib/service-icon-map";
import DeleteServiceButton from "@/components/admin/DeleteServiceButton";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="spec-tag text-primary">Content</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-navy">Services</h1>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} /> New service
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-md border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-steel-light">
            <tr>
              <th className="px-5 py-3 font-semibold">Code</th>
              <th className="px-5 py-3 font-semibold">Title</th>
              <th className="px-5 py-3 font-semibold">Icon</th>
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const IconComponent = serviceIconMap[service.icon].component;
              return (
                <tr key={service.id} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-3 font-mono text-xs text-steel-light">{service.code}</td>
                  <td className="px-5 py-3 font-medium text-navy">{service.title}</td>
                  <td className="px-5 py-3 text-steel">
                    <IconComponent size={16} />
                  </td>
                  <td className="px-5 py-3 text-steel">{service.order}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        aria-label={`Edit ${service.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-steel hover:bg-paper hover:text-primary"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteServiceButton id={service.id} title={service.title} />
                    </div>
                  </td>
                </tr>
              );
            })}

            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-steel-light">
                  No services yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
