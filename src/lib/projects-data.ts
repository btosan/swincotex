export type Project = {
  code: string;
  client: string;
  location: string;
  title: string;
  duration: string;
  image: string;
  gallery: string[];
};
// manifold
export const projects: Project[] = [
  {
    code: "PRJ-001",
    client: "Shell Petroleum Dev. Co. Ltd (Main Contractor: Packlinc Ltd)",
    location: "SPDC Obigbo Manifold, Kom Kom",
    title: "Construction and erection of enhanced manifold caging",
    duration: "Jun – Sept 2024",
    image:
      "/assets/company-img/swin-fabrication-workshop.png",
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
    image:
      "/assets/company-img/imo-river.png",
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
    image:
      "/assets/company-img/oshie.png",
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
    image:
      "/assets/field-work/fw7.jpeg",
    gallery: [
      "/assets/field-work/fw9.jpeg",
      "/assets/field-work/fw8.jpeg",
      "/assets/field-work/fw7.jpeg",
    ],
  },
];

export const fieldWorks: string[] = [
  "De-sanding / desludging of a 25,000-barrel crude oil storage tank at Addax Izombe Flow Station",
  "Hydro-testing of pre-fabricated piping spools",
  "Steel structural fabrication of canopy structures for Addax Petroleum",
];