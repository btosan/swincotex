export type TeamMember = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio?: string;
};

export const ceo: TeamMember = {
  name: "Engr. Efe Omoruyi",
  role: "Chief Executive Officer",
  image: "https://images.unsplash.com/photo-1495603889488-42d1d66e5523?q=80&w=800&auto=format&fit=crop",
  imageAlt: "Portrait of Engr. Efe Omoruyi, Chief Executive Officer",
  bio: "Efe founded Swincotex with a mandate to build an indigenous EPC contractor capable of full-scope delivery in the Niger Delta. He leads company strategy, client relationships, and major project sign-off, drawing on close to two decades in Nigeria's oil and gas service sector.",
};

export const teamMembers: TeamMember[] = [
  {
    name: "Engr. Chidi Nwosu",
    role: "Head of Engineering & Projects",
    image: "https://images.unsplash.com/photo-1617244147030-8bd6f9e21d1e?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Portrait of Engr. Chidi Nwosu, Head of Engineering & Projects",
  },
  {
    name: "Preye Amiengheme",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1563132337-f159f484226c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Portrait of Preye Amiengheme, Operations Manager",
  },
  {
    name: "Engr. Godwin Ighoyota",
    role: "Fabrication Yard Manager",
    image: "https://images.unsplash.com/photo-1578758803946-2c4f6738df87?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Portrait of Engr. Godwin Ighoyota, Fabrication Yard Manager",
  },
  {
    name: "Ese Ogbeide",
    role: "HSE Manager",
    image: "https://images.unsplash.com/photo-1687422808384-c896d0efd4ab?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Portrait of Ese Ogbeide, HSE Manager",
  },
  {
    name: "Faith Ukamaka Chukwu",
    role: "Finance & Admin Manager",
    image: "https://images.unsplash.com/photo-1606596556957-f6566cc865a9?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Portrait of Faith Ukamaka Chukwu, Finance & Admin Manager",
  },
  {
    name: "Tonye Briggs",
    role: "Business Development Manager",
    image: "https://images.unsplash.com/photo-1552652893-2aa10a0ab4df?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Portrait of Tonye Briggs, Business Development Manager",
  },
];