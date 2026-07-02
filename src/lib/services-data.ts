export type Service = {
  slug: string;
  code: string; // spec-sheet style code, e.g. 01
  title: string;
  short: string;
  summary: string;
  scope: string[];
  image: string;
  imageAlt: string;
  icon:
    | "flame"
    | "wrench"
    | "drill"
    | "hard-hat"
    | "building-2"
    | "shield-check"
    | "waypoints"
    | "clipboard-list"
    | "settings-2";
};

export const services: Service[] = [
  {
    slug: "environmental-process-thermal-engineering",
    code: "01",
    title: "Environmental, Process & Thermal Engineering",
    short: "Process design and environmental engineering for upstream and midstream facilities.",
    summary:
      "We design and engineer process systems across the crude oil and gas value chain — from production trains to phase separation and dehydration — balancing throughput, environmental compliance, and thermal efficiency.",
    scope: [
      "Oil production trains: separators, heater-treaters and dehydrators",
      "Desanders and crude oil phase separation systems",
      "Oil and gas dehydration systems",
      "Gas gathering and gas/oil separation plants",
      "Incinerators and environmental control systems",
    ],
    image: "https://images.unsplash.com/photo-1539186607619-df476afe6ff1?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Process tower at an industrial gas plant",
    icon: "flame",
  },
  {
    slug: "well-head-services",
    code: "02",
    title: "Well Head Services",
    short: "Well head installation, maintenance, and field support.",
    summary:
      "Our field crews provide well head installation, service, and maintenance support to keep production assets running safely and reliably across flow stations and manifolds.",
    scope: [
      "Well head installation and maintenance",
      "Flow station and manifold support",
      "Field labour supply for well site operations",
      "Routine and planned maintenance programmes",
    ],
    image: "https://images.unsplash.com/photo-1624771002998-4aadfd43e7c4?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Well head pump jack equipment in a field",
    icon: "drill",
  },
  {
    slug: "mechanical-engineering-design-construction",
    code: "03",
    title: "Mechanical Engineering, Design & Construction",
    short: "Mechanical design and construction for plants, terminals, and offshore platforms.",
    summary:
      "From petrochemical plants and refineries to offshore platforms, we deliver mechanical engineering, design, and construction across the full weight of heavy and light industrial work.",
    scope: [
      "Gas treatment plants, gathering centres and pumping stations",
      "Bulk crude handling and storage facilities",
      "Prefabrication of piping spools, pipe supports and structural assemblies",
      "Oil loading and off-loading terminals",
      "Fabrication of platforms for offshore facilities",
      "Heavy and light industrial plants",
    ],
    image: "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Industrial power plant skyline",
    icon: "settings-2",
  },
  {
    slug: "fabrication-installation-process-equipment",
    code: "04",
    title: "Fabrication, Supply & Installation of Process Equipment",
    short: "Workshop fabrication and site installation of process equipment and instrumentation.",
    summary:
      "Our engineering workshop and fabrication yard in Warri supports the fabrication, supply, and installation of process equipment and instrumentation for oil and gas facilities, including sand-blasting, painting, and pipe isometric work.",
    scope: [
      "Fabrication, supply and installation of process equipment and instrumentation",
      "Sand-blasting and painting of tanks and steel structures",
      "Pipe work (isometric) design and construction",
      "Storage tanks, columns, evaporators and heaters",
      "Packaged equipment and pipe coating",
    ],
    image: "https://images.unsplash.com/photo-1507497806295-753c4108560c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Welder in protective gear fabricating steel components",
    icon: "wrench",
  },
  {
    slug: "civil-engineering-construction",
    code: "05",
    title: "Civil Engineering Construction",
    short: "Civil works for energy infrastructure and general buildings.",
    summary:
      "We deliver civil engineering construction for jetties, power plants, and high-quality buildings, alongside general civil works such as roads, highways, and drainage.",
    scope: [
      "Jetties and power plants",
      "Housing and high-quality buildings — hotels, hospitals, educational institutions",
      "Roads, highways and drainage",
      "General civil works for oil and gas sites",
    ],
    image: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Tower crane at a civil construction site",
    icon: "building-2",
  },
  {
    slug: "inspection-corrosion-engineering",
    code: "06",
    title: "Inspection & Corrosion Engineering",
    short: "Integrity inspection and corrosion control for critical assets.",
    summary:
      "We support asset integrity through inspection and corrosion engineering services, protecting pipelines, tanks, and structures across their operating life.",
    scope: [
      "Corrosion engineering assessments",
      "Structural and pipeline inspection",
      "Hydro-testing of pre-fabricated piping spools",
      "Tank and structure integrity support",
    ],
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Pipe weld inspection and integrity testing",
    icon: "shield-check",
  },
  {
    slug: "pipeline-construction",
    code: "07",
    title: "Pipeline Construction",
    short: "Construction and maintenance of water, oil, and gas pipelines.",
    summary:
      "We construct and maintain pipeline networks that move water, oil, and gas safely across onshore and offshore developments.",
    scope: [
      "Water, oil and gas pipelines",
      "Gas transmission pipelines",
      "Pipe laying and related works",
      "Flare gas knockout vessels and flare stacks",
      "Flare auto-ignition systems",
    ],
    image: "https://images.unsplash.com/photo-1565364507085-325347bae748?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Excavator beside large pipes at a pipeline construction site",
    icon: "waypoints",
  },
  {
    slug: "epc-services",
    code: "08",
    title: "EPC — Project Management, Engineering, Procurement & Construction",
    short: "Turnkey EPC delivery from feasibility through commissioning.",
    summary:
      "We provide project management, engineering, procurement, and construction services across process, mechanical, piping, electrical & instrumentation, and civil/structural disciplines — from pilot studies through full turnkey delivery.",
    scope: [
      "Process, mechanical, piping, electrical & instrumentation, civil/structural EPC",
      "Pilot plant studies through full turnkey plant installation",
      "Installation, commissioning and operator training",
      "Project management and planned maintenance",
      "Plant / process refurbishment and overhaul",
    ],
    image: "https://images.unsplash.com/photo-1769147339214-076740872485?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Mechanical components laid out on engineering blueprints",
    icon: "clipboard-list",
  },
  {
    slug: "maintenance-services",
    code: "09",
    title: "Maintenance of Mechanical Installations & Structures",
    short: "Planned and reactive maintenance for refineries, plants, and offshore structures.",
    summary:
      "We maintain mechanical installations and structures across oil refineries, petrochemical plants, and offshore structures, backed by full technical support and after-sales service.",
    scope: [
      "Oil refineries and petrochemical plants",
      "Offshore structures",
      "Planned maintenance programmes",
      "Full technical support and after-sales service",
    ],
    image: "https://images.unsplash.com/photo-1691927458684-8b30380b9412?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Cooling towers in operation at an industrial plant",
    icon: "hard-hat",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}