import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hashPassword } from "../src/lib/password";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// --- Inline copies of your existing hardcoded data -------------------
// These mirror src/lib/services-data.ts, team-data.ts, projects-data.ts,
// and gallery-data.ts. Keeping the seed self-contained means it still
// works after you delete those files once the CMS is live.

const services = [
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
    icon: "flame" as const,
    order: 1,
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
    icon: "drill" as const,
    order: 2,
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
    icon: "settings_2" as const,
    order: 3,
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
    icon: "wrench" as const,
    order: 4,
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
    icon: "building_2" as const,
    order: 5,
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
    icon: "shield_check" as const,
    order: 6,
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
    icon: "waypoints" as const,
    order: 7,
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
    icon: "clipboard_list" as const,
    order: 8,
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
    icon: "hard_hat" as const,
    order: 9,
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
    icon: "layers" as const,
    order: 10,
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
    icon: "recycle" as const,
    order: 11,
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
    image: "/assets/company-img/manpower.png",
    imageAlt: "Rows of hard hats representing field workforce",
    icon: "users" as const,
    order: 12,
  },
];

const projects = [
  {
    code: "PRJ-001",
    client: "Shell Petroleum Dev. Co. Ltd (Main Contractor: Packlinc Ltd)",
    location: "SPDC Obigbo Manifold, Kom Kom",
    title: "Construction and erection of enhanced manifold caging",
    duration: "Jun – Sept 2024",
    image: "/assets/company-img/swin-fabrication-workshop.png",
    gallery: [
      "/assets/company-img/swin-pipelines.png",
      "/assets/company-img/shell.jpg",
      "/assets/company-img/swin-fabrication-workshop.png",
    ],
  },
  {
    code: "PRJ-002",
    client: "Shell Petroleum Dev. Co. Ltd (Main Contractor: Jurak Oil Ltd)",
    location: "Imo River 2 Flow Station",
    title: "Design, construction, and installation of 16-inch smokeless flare stack",
    duration: "Aug – Dec 2025",
    image: "/assets/company-img/imo-river.png",
    gallery: [
      "/assets/company-img/imo-river.png",
      "/assets/company-img/imo-river2.png",
      "/assets/company-img/imo-river3.png",
    ],
  },
  {
    code: "PRJ-003",
    client: "Nigeria Agip Oil Co. Ltd (Main Contractor: Jurak Oil Ltd)",
    location: "Oshie Flow Station",
    title:
      "Design, construction, and installation of twin 30-inch smokeless flare, auto ignition system and bondwall",
    duration: "2020 – 2021",
    image: "/assets/company-img/oshie.png",
    gallery: [
      "/assets/company-img/oshie-fs.jpg",
      "/assets/company-img/oshie.png",
      "/assets/company-img/oshie-fs2.jpg",
    ],
  },
  {
    code: "PRJ-004",
    client: "Addax Petroleum Development Nigeria Limited",
    location: "OML 124",
    title: "Installation of BOP, Blowout Preventer, and associated piping for wellhead platform",
    duration: "2021 – 2022",
    image: "/assets/field-work/fw7.jpeg",
    gallery: [
      "/assets/company-img/blowout2.jpg",
      "/assets/company-img/blowout.jpg",
      "/assets/field-work/fw7.jpeg",
    ],
  },
];

const fieldWorks = [
  "De-sanding / desludging of a 25,000-barrel crude oil storage tank at Addax Izombe Flow Station",
  "Hydro-testing of pre-fabricated piping spools",
  "Steel structural fabrication of canopy structures for Addax Petroleum",
];

const galleryImages = [
  { code: "PHOTO 02", caption: "Well head fabrication, ongoing project", src: "/assets/company-img/swin-fabrication-workshop.png" },
  { code: "PHOTO 03", caption: "Drilling site", src: "/assets/company-img/drilling-waste-management.png" },
  { code: "PHOTO 04", caption: "Fabrication workshop", src: "/assets/company-img/swin-structural-fabrication.png" },
  { code: "PHOTO 05", caption: "Pipe welding and NDT inspection", src: "/assets/company-img/swin-pipe-welding.png" },
  { code: "PHOTO 06", caption: "Pipeline project", src: "/assets/company-img/swin-pipeline-laying-2.png" },
  { code: "PHOTO 07", caption: "Well head", src: "/assets/well-services/ws.jpeg" },
  { code: "PHOTO 08", caption: "Rig drilling & well intervention", src: "/assets/company-img/rig-drilling.jpeg" },
  { code: "PHOTO 09", caption: "De-sanding / Desludging of 25,000 barrel Crude Oil storage Tank", src: "/assets/company-img/swin-building and civil.png" },
];

const teamMembers = [
  { name: "Pst. Morgan Obahor", role: "Operations Manager", image: "/assets/team/Morgan.jpg", imageAlt: "Portrait of Pst. Morgan Obahor, Operations Manager", isCeo: false },
  { name: "Stanley Chukwudi Ifebadiofu", role: "QHSE Manager", image: "/assets/team/Stanley3.jpg", imageAlt: "Portrait of Stanley Chukwudi Ifebadiofu, QHSE Manager", isCeo: false },
  { name: "Maria Okuibala", role: "Accounts Manager", image: "/assets/team/IshiomaR.png", imageAlt: "Portrait of Maria Okuibala, Accounts Manager", isCeo: false },
  { name: "Dr. Godwin Friday Chukwuyem", role: "Base Manager", image: "/assets/team/Godwin.jpg", imageAlt: "Portrait of Dr. Godwin Friday Chukwuyem, Base Manager", isCeo: false },
  { name: "Ishioma Rita Asedere", role: "Human Resources Manager", image: "/assets/team/mrs-asedere.jpeg", imageAlt: "Portrait of Ishioma Rita Asedere, Human Resources Manager", isCeo: false },
  { name: "Engr. Ifie Ogheneyoma Jonathan", role: "Project Engineer", image: "/assets/team/ifie.jpg", imageAlt: "Portrait of Engr. Ifie Ogheneyoma Jonathan, Project Engineer", isCeo: false },
  { name: "Engr. Idowu Godwin Dania", role: "Project Manager", image: "/assets/team/dania.jpeg", imageAlt: "Portrait of Engr. Idowu Godwin Dania, Project Manager", isCeo: false },
  { name: "Olaniyan Josiah Oluwayomi", role: "Site Engineer", image: "/assets/team/olaniyan.jpeg", imageAlt: "Portrait of Olaniyan Josiah Oluwayomi, Site Engineer", isCeo: false },
];

const ceo = {
  name: "Edwin Othuke Asedere",
  role: "Chief Executive Officer",
  image: "/assets/team/ceo2.png",
  imageAlt: "Portrait of Edwin Othuke Asedere, Chief Executive Officer",
  bio: "Edwin founded Swincotex with a mandate to build an indigenous EPC contractor capable of full-scope delivery in the Niger Delta. He leads company strategy, client relationships, and major project sign-off, drawing on close to two decades in Nigeria's oil and gas service sector.",
  isCeo: true,
};

async function main() {
  console.log("Seeding admin & staff users…");
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const staffPassword = process.env.SEED_STAFF_PASSWORD || "ChangeMe123!";
  const adminPasswordHash = await hashPassword(adminPassword);
  const staffPasswordHash = await hashPassword(staffPassword);

  await prisma.user.upsert({
    where: { email: "admin@swincotex.com" },
    update: { passwordHash: adminPasswordHash },
    create: {
      name: "Site Admin",
      email: "admin@swincotex.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "staff@swincotex.com" },
    update: { passwordHash: staffPasswordHash },
    create: {
      name: "News Editor",
      email: "staff@swincotex.com",
      passwordHash: staffPasswordHash,
      role: "STAFF",
    },
  });

  console.log("Seeding services…");
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  console.log("Seeding projects…");
  for (const project of projects) {
    await prisma.project.upsert({
      where: { code: project.code },
      update: project,
      create: project,
    });
  }

  console.log("Seeding field works…");
  await prisma.fieldWork.deleteMany();
  for (const [i, description] of fieldWorks.entries()) {
    await prisma.fieldWork.create({ data: { description, order: i } });
  }

  console.log("Seeding gallery…");
  await prisma.galleryImage.deleteMany();
  for (const [i, image] of galleryImages.entries()) {
    await prisma.galleryImage.create({ data: { ...image, order: i } });
  }

  console.log("Seeding team…");
  await prisma.teamMember.deleteMany();
  await prisma.teamMember.create({ data: { ...ceo, order: 0 } });
  for (const [i, member] of teamMembers.entries()) {
    await prisma.teamMember.create({ data: { ...member, order: i + 1 } });
  }

  console.log("Seeding About page content…");
  await prisma.aboutContent.deleteMany();
  await prisma.aboutContent.create({
    data: {
      heroHeading: "An indigenous oil & gas service company built on the field.",
      introParagraphs: [
        "Swincotex Energy Nigeria Limited is an incorporated organization that provides technical and labour supply services to the oil and gas industry, spanning environmental, process and thermal engineering, well head services, mechanical engineering design and construction, fabrication and installation of process equipment and instrumentation, civil engineering construction, and inspection and corrosion engineering.",
        "Based in Warri, Delta State, Nigeria, Swincotex employs about 20 people across its oil and gas service operations, inclusive of non-permanent staff, and owns and operates an engineering workshop and fabrication yard in Warri.",
        "We provide project management, engineering, procurement and construction services for the oil & gas industry, power plants, buildings, general civil works, and offshore light industry — from pilot plant studies and feasibility, through full turnkey installation, commissioning, operator training, and planned maintenance.",
      ],
      cards: [
        { icon: "Target", title: "Our Aspiration", description: "To be one of the fastest growing firms among indigenous oil and gas service organizations in Nigeria." },
        { icon: "Eye", title: "Our Approach", description: "Full-scope delivery — process, mechanical, piping, electrical & instrumentation, and civil/structural — under one contractor, backed by a standardized project safety programme." },
        { icon: "Factory", title: "Our Base", description: "An engineering workshop and fabrication yard in Warri, Delta State — positioned in the heart of the Niger Delta operating environment." },
      ],
      capabilityTitle: "What we build, install, and maintain",
      capabilityDescription: "Our EPC activities span every discipline required to take a facility from concept to commissioning.",
      capabilityGroups: [
        { heading: "Mechanical works", items: [
          "Petrochemical plants and refineries — gas treatment plants, gathering centres, pumping stations",
          "Bulk crude handling and storage facilities",
          "Prefabrication of piping spools, pipe supports and structural assemblies",
          "Oil loading and off-loading terminals; offshore platform fabrication",
        ]},
        { heading: "Civil & building works", items: [
          "Jetties, power plants, housing and high-quality buildings",
          "Hotels, hospitals and educational institutions",
          "Roads, highways and drainage",
        ]},
        { heading: "Pipelines & process", items: [
          "Water, oil and gas pipelines",
          "Oil & gas phase separation and dehydration",
          "Gas compression systems and flare gas knockout vessels",
          "Flare stacks and flare auto-ignition systems",
        ]},
        { heading: "EPC activities", items: [
          "Process, mechanical and piping engineering",
          "Electrical & instrumentation",
          "Civil / structural engineering",
          "Installation, commissioning and operator training",
        ]},
      ],
      leadershipTitle: "The team behind the work",
      leadershipDescription: "Seven people leading engineering, operations, and delivery out of our Warri fabrication yard.",
    },
  });

  console.log("Seeding Contact page content…");
  await prisma.contactContent.deleteMany();
  await prisma.contactContent.create({
    data: {
      heroHeading: "Tell us about your project and scope.",
      heroDescription:
        "Reach our engineering team directly, or send your specification through the form and we'll respond with scope, timeline, and next steps.",
      address:
        "100, Midwestern College of Maritime Nautical Management & Technology, Enerhen Road, Warri, Delta State, Nigeria",
      phones: ["+234 805 250 7358", "+234 812 232 2331"],
      email: "info@swincotex.com",
      hours: "Mon – Fri, 8:00am – 5:00pm",
      whatsappNumber: "2348052507358",
      whatsappMessage: "Hello Swincotex, I'd like to enquire about a project.",
      mapEmbedQuery: "Warri, Delta State, Nigeria",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
