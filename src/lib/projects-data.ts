export type Project = {
  code: string;
  client: string;
  location: string;
  title: string;
  duration: string;
  image: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    code: "PRJ-001",
    client: "Shell Petroleum Dev. Co. Ltd (Main Contractor: Packlinc Ltd)",
    location: "SPDC Obigbo Manifold, Kom Kom",
    title: "Construction and erection of enhanced manifold caging",
    duration: "Jun – Sept 2014",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590959651373-a3db0f38c968?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    code: "PRJ-002",
    client: "Shell Petroleum Dev. Co. Ltd (Main Contractor: Jurak Oil Ltd)",
    location: "Imo River 2 Flow Station",
    title: "Design, construction, and installation of 16-inch smokeless flare stack",
    duration: "Aug – Dec 2015",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    code: "PRJ-003",
    client: "Nigeria Agip Oil Co. Ltd (Main Contractor: Jurak Oil Ltd)",
    location: "Oshie Flow Station",
    title:
      "Design, construction, and installation of twin 30-inch smokeless flare, auto ignition system and bondwall",
    duration: "2014 – 2015",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    code: "PRJ-004",
    client: "Addax Petroleum Development Nigeria Limited",
    location: "OML 124",
    title: "Installation of citadel fencing around the Ossu manifold",
    duration: "—",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export const fieldWorks: string[] = [
  "De-sanding / desludging of a 25,000-barrel crude oil storage tank at Addax Izombe Flow Station",
  "Hydro-testing of pre-fabricated piping spools",
  "Steel structural fabrication of canopy structures for Addax Petroleum",
];