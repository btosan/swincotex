export type GalleryImage = {
  code: string;
  caption: string;
  src: string;
};

// Unsplash placeholders — swap `src` for /assets/gallery/*.jpg as you shoot real site photos.
export const galleryImages: GalleryImage[] = [
  {
    code: "PHOTO 02",
    caption: "Manifold fabrication, Warri workshop",
    src: "/assets/company-img/swin-fabrication-workshop.png",
  },
  {
    code: "PHOTO 03",
    caption: "Tank de-sanding, Addax Izombe Flow Station",
    src: "/assets/company-img/swin-pipeline-laying-2.png",
  },
  {
    code: "PHOTO 04",
    caption: "Structural steel erection, site works",
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
  },
  {
    code: "PHOTO 05",
    caption: "Pipe welding and NDT inspection",
    src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    code: "PHOTO 06",
    caption: "Flare line integrity works",
    src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    code: "PHOTO 07",
    caption: "Civil works, well head platform",
    src: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?q=80&w=1200&auto=format&fit=crop",
  },
];