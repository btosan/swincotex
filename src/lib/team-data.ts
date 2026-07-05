export type TeamMember = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio?: string;
};

export const ceo: TeamMember = {
  name: "Edwin Othuke Asedere",
  role: "Chief Executive Officer",
  image: "/assets/team/Edwin.jpeg",
  imageAlt: "Portrait of Edwin Othuke Asedere, Chief Executive Officer",
  bio: "Edwin founded Swincotex with a mandate to build an indigenous EPC contractor capable of full-scope delivery in the Niger Delta. He leads company strategy, client relationships, and major project sign-off, drawing on close to two decades in Nigeria's oil and gas service sector.",
};

export const teamMembers: TeamMember[] = [
  {
    name: "Pst. Morgan Obahor",
    role: "Operations Manager",
    image: "/assets/team/MorganObahor.jpg",
    imageAlt: "Portrait of Pst. Morgan Obahor, Operations Manager",
  },
  {
    name: "Stanley Chukwudi Ifebadiofu",
    role: "QHSE Manager",
    image: "/assets/team/Stanley.jpeg",
    imageAlt: "Portrait of Stanley Chukwudi Ifebadiofu, QHSE Manager",
  },
  {
    name: "Maria Okuibala",
    role: "Accounts Manager",
    image: "/assets/team/IshiomaR.png",
    imageAlt: "Portrait of Maria Okuibala, Accounts Manager",
  },
    {
    name: "Dr. Godwin Friday Chukwuyem",
    role: "Base Manager",
    image: "/assets/team/Godwin.jpg",
    imageAlt: "Portrait of Dr. Godwin Friday Chukwuyem, Base Manager",
  },

  {
    name: "Ishioma Rita Asedere",
    role: "Human Resources Manager",
    image: "/assets/team/mrs-asedere.jpeg",
    imageAlt: "Portrait of Ishioma Rita Asedere, Human Resources Manager",
  },

  // {
  //   name: "Tonye Briggs",
  //   role: "Business Development Manager",
  //   image: "https://images.unsplash.com/photo-1552652893-2aa10a0ab4df?q=80&w=800&auto=format&fit=crop",
  //   imageAlt: "Portrait of Tonye Briggs, Business Development Manager",
  // },
];