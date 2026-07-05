export type GalleryImage = {
  code: string;
  caption: string;
  src: string;
};

// Unsplash placeholders — swap `src` for /assets/gallery/*.jpg as you shoot real site photos.
// 
export const galleryImages: GalleryImage[] = [
  {
    code: "PHOTO 02",
    caption: "Manifold fabrication, Warri workshop",
    src: "/assets/company-img/swin-fabrication-workshop.png",
  },
  {
    code: "PHOTO 03",
    caption: "Tank de-sanding, Addax Izombe Flow Station",
    src: "/assets/field-work/fw7.jpeg",
  },
  {
    code: "PHOTO 04",
    caption: "Structural steel erection, site works",
    src: "/assets/company-img/swin-machine.png",
  },
  {
    code: "PHOTO 05",
    caption: "Pipe welding and NDT inspection",
    src: "/assets/company-img/swin-pipe-welding.png",
  },
  {
    code: "PHOTO 06",
    caption: "Flare line integrity works",
    src: "/assets/field-work/fw9.jpeg",
  },
  {
    code: "PHOTO 07",
    caption: "Civil works, well head platform",
    src: "/assets/well-services/ws.jpeg",
  },
    {
    code: "PHOTO 08",
    caption: "Rig drilling & well intervention",
    src: "/assets/company-img/rig-drilling.jpeg",
  },
];