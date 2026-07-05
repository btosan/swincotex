import type { Metadata } from "next";
import { Target, Eye, Factory } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ceo, teamMembers } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Swincotex Energy Nigeria Limited is an indigenous oil and gas service organization based in Warri, Delta State, Nigeria.",
};

const companyImage =
  "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?q=80&w=1400&auto=format&fit=crop";

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <img
          src={companyImage}
          alt="Swincotex industrial facility"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="blueprint-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/20 via-navy/40 to-navy/60" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-gray-200">About</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            An indigenous oil &amp; gas service company built on the field.
          </h1>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="Who we are" title="About Swincotex" />
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-steel">
              <p>
                Swincotex Energy Nigeria Limited is an incorporated organization
                that provides technical and labour supply services to the oil and gas
                industry, spanning environmental, process and thermal engineering,
                well head services, mechanical engineering design and construction,
                fabrication and installation of process equipment and instrumentation,
                civil engineering construction, and inspection and corrosion engineering.
              </p>
              <p>
                Based in Warri, Delta State, Nigeria, Swincotex employs about 20 people
                across its oil and gas service operations, inclusive of non-permanent
                staff, and owns and operates an engineering workshop and fabrication
                yard in Warri.
              </p>
              <p>
                We provide project management, engineering, procurement and construction
                services for the oil &amp; gas industry, power plants, buildings, general
                civil works, and offshore light industry &mdash; from pilot plant studies
                and feasibility, through full turnkey installation, commissioning, operator
                training, and planned maintenance.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-md border border-line bg-white p-6">
              <Target size={22} className="text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Our Aspiration</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">
                To be one of the fastest growing firms among indigenous oil and gas
                service organizations in Nigeria.
              </p>
            </div>
            <div className="rounded-md border border-line bg-white p-6">
              <Eye size={22} className="text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Our Approach</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">
                Full-scope delivery &mdash; process, mechanical, piping, electrical &amp;
                instrumentation, and civil/structural &mdash; under one contractor,
                backed by a standardized project safety programme.
              </p>
            </div>
            <div className="rounded-md border border-line bg-white p-6">
              <Factory size={22} className="text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Our Base</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">
                An engineering workshop and fabrication yard in Warri, Delta State
                &mdash; positioned in the heart of the Niger Delta operating environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capability summary */}
      <section className="border-t border-line bg-paper py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Capability"
            title="What we build, install, and maintain"
            description="Our EPC activities span every discipline required to take a facility from concept to commissioning."
          />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              {
                heading: "Mechanical works",
                items: [
                  "Petrochemical plants and refineries — gas treatment plants, gathering centres, pumping stations",
                  "Bulk crude handling and storage facilities",
                  "Prefabrication of piping spools, pipe supports and structural assemblies",
                  "Oil loading and off-loading terminals; offshore platform fabrication",
                ],
              },
              {
                heading: "Civil & building works",
                items: [
                  "Jetties, power plants, housing and high-quality buildings",
                  "Hotels, hospitals and educational institutions",
                  "Roads, highways and drainage",
                ],
              },
              {
                heading: "Pipelines & process",
                items: [
                  "Water, oil and gas pipelines",
                  "Oil & gas phase separation and dehydration",
                  "Gas compression systems and flare gas knockout vessels",
                  "Flare stacks and flare auto-ignition systems",
                ],
              },
              {
                heading: "EPC activities",
                items: [
                  "Process, mechanical and piping engineering",
                  "Electrical & instrumentation",
                  "Civil / structural engineering",
                  "Installation, commissioning and operator training",
                ],
              },
            ].map((group) => (
              <div key={group.heading}>
                <h3 className="font-display text-base font-semibold text-navy">{group.heading}</h3>
                <ul className="mt-3 flex flex-col gap-2 border-l-2 border-sky/40 pl-4">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-steel">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Leadership"
            title="The team behind the work"
            description="Seven people leading engineering, operations, and delivery out of our Warri fabrication yard."
          />

          <div className="mt-12 flex flex-col gap-6">
            {/* CEO — featured, larger */}
            <div className="flex flex-col gap-6 rounded-md border border-line bg-white p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-sm border border-line bg-navy sm:w-64">
                <img
                  src={ceo.image}
                  alt={ceo.imageAlt}
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 border-l-2 border-t-2 border-sky/80" />
                <span className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 border-r-2 border-t-2 border-sky/80" />
                <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-4 w-4 border-b-2 border-l-2 border-sky/80" />
                <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 border-sky/80" />
              </div>
              <div>
                <p className="spec-tag text-primary">{ceo.role}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
                  {ceo.name}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel">{ceo.bio}</p>
              </div>
            </div>

            {/* Rest of team */}
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col overflow-hidden rounded-md border border-line bg-white"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-navy">
                    <img
                      src={member.image}
                      alt={member.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h4 className="font-display text-sm font-semibold leading-snug text-navy sm:text-base">
                      {member.name}
                    </h4>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-steel-light">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}