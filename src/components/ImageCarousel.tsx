"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/lib/gallery-data";

export default function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {galleryImages.map((img) => (
            <div
              key={img.code}
              className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-navy">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/0 to-navy/0" />

                <span className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 border-l-2 border-t-2 border-sky/80" />
                <span className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 border-r-2 border-t-2 border-sky/80" />
                <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-4 w-4 border-b-2 border-l-2 border-sky/80" />
                <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 border-sky/80" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="spec-tag text-sky">{img.code}</p>
                  <p className="mt-1 text-sm font-medium text-white">{img.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <div className="flex gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            aria-label="Previous photo"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-line text-navy transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next photo"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-line text-navy transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}