export type GalleryImage = {
  code: string;
  caption: string;
  src: string;
};

// Unsplash placeholders — swap `src` for /assets/gallery/*.jpg as you shoot real site photos.

export const galleryImages: GalleryImage[] = [
  {
    code: "PHOTO 02",
    caption: "Manifold fabrication, ongoing project",
    src: "/assets/company-img/swin-fabrication-workshop.png",
  },
  {
    code: "PHOTO 03",
    caption: "Drilling site",
    src: "/assets/field-work/fw6.jpeg",
  },
  {
    code: "PHOTO 04",
    caption: "Fabrication workshop",
    src: "/assets/company-img/swin-structural-fabrication.png",
  },
  {
    code: "PHOTO 05",
    caption: "Pipe welding and NDT inspection",
    src: "/assets/company-img/swin-pipe-welding.png",
  },
  {
    code: "PHOTO 06",
    caption: "Pipeline project",
    src: "/assets/company-img/swin-pipeline-laying-2.png",
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
    {
    code: "PHOTO 09",
    caption: "De-sanding / Desludging of 25,000 barrel Crude Oil storage Tank",
    src: "/assets/company-img/swin-building and civil.png",
  },
];