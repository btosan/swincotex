export type Service = {
  slug: string;
  code: string;
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
    | "settings-2"
    | "layers"
    | "recycle"
    | "users";
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
    image: "/assets/company-img/environmental.png",
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
    image: "/assets/well-services/we2.jpeg",
    imageAlt: "Oil pump jack silhouette in a field at sunset",
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
    image: "/assets/company-img/mechanical.png",
    imageAlt: "Large heavy-industry plant complex",
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
    image: "/assets/company-img/fabrication-installation.png",
    imageAlt: "Welder working with sparks flying from metal",
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
    image: "/assets/company-img/civil.png",
    imageAlt: "Building under construction next to a tower crane",
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
    image: "/assets/company-img/corrosion.png",
    imageAlt: "Rusted industrial valve showing corrosion on a pipeline",
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
    image: "/assets/company-img/pipeline-construction.png",
    imageAlt: "Excavator digging a trench for pipeline construction",
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
    image: "/assets/company-img/epc.png",
    imageAlt: "Metal mechanical parts laid out on engineering blueprints",
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
    image: "/assets/company-img/maintenance.png",
    imageAlt: "Cooling towers in operation at an industrial plant during sunset",
    icon: "hard-hat",
  },
  {
    slug: "drilling-well-intervention",
    code: "10",
    title: "Drilling & Well Intervention",
    short: "Rig operations, workover, and well intervention across onshore, swamp, and offshore assets.",
    summary:
      "We support drilling and post-drilling well operations across the Niger Delta's onshore, swamp, and shallow-offshore environments — deploying rig crews, workover units, and intervention tools to bring wells online and keep them producing efficiently.",
    scope: [
      "Onshore, swamp and shallow-offshore drilling rig operations",
      "Directional drilling, MWD/LWD and mud logging support",
      "Workover, well completion and recompletion services",
      "Wireline, slickline and coiled tubing intervention",
      "Pumping, stimulation and cementing services",
      "Well testing and plug & abandonment (P&A) programmes",
    ],
    image: "https://images.unsplash.com/photo-1722183704200-e96339975ba4?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Oil rig at sea during drilling operations",
    icon: "layers",
  },
  {
    slug: "drilling-waste-management",
    code: "11",
    title: "Drilling Waste Management",
    short: "Treatment and disposal of drill cuttings, muds, and produced water to regulatory standard.",
    summary:
      "We manage the waste streams generated by drilling operations — cuttings, spent muds, and produced water — through approved treatment and disposal routes, helping operators meet NUPRC and NOSDRA environmental compliance requirements across onshore and swamp locations.",
    scope: [
      "Drill cuttings treatment via thermal desorption, cuttings re-injection and bioremediation",
      "Water-based and oil-based mud (WBM/OBM) handling and disposal",
      "Produced water treatment and NORM (naturally occurring radioactive material) management",
      "Waste pit remediation and hydrocarbon-contaminated soil treatment",
      "Licensed waste transportation, storage and secondary waste (ash/sludge) disposal",
      "Regulatory reporting and compliance support for NUPRC/NOSDRA waste standards",
    ],
    image: "/assets/company-img/drilling-waste-management.png",
    imageAlt: "Industrial plant piping used in waste treatment",
    icon: "recycle",
  },
{
    slug: "manpower-supply",
    code: "12",
    title: "Manpower Supply",
    short: "Technical and skilled personnel supply for field, plant, and project operations.",
    summary:
      "We provide skilled, semi-skilled, and professional manpower for drilling, construction, fabrication, and maintenance projects, sourcing and mobilising qualified Nigerian personnel in line with NOGICD Act local content requirements.",
    scope: [
      "Full drilling crew supply: Rig Manager, Tool Pusher, Night Tool Pusher, Driller, Assistant Driller, Derrickman, Mud Man, Floorhands and Roustabouts",
      "Rig support trades: Electrician, Mechanic, Materials Man, Rig Safety Officer and Medic",
      "Skilled and semi-skilled field labour for construction and fabrication",
      "Technical personnel: engineers, riggers, welders, scaffolders and technicians",
      "HSE officers and safety supervision personnel",
      "Contract staffing in line with NOGICD Act local content requirements",
      "Workforce mobilisation, camp logistics and personnel administration",
      "Short-term project surge staffing and long-term secondment",
    ],
    image: "/assets/field-work/fw3.jpeg",
    imageAlt: "Rows of hard hats representing field workforce",
    icon: "users",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}