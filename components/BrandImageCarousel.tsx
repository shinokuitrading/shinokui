"use client";

import Image from "next/image";
import { useState } from "react";

type CarouselImage = {
  src: string;
  alt: string;
};

type Props = {
  images: CarouselImage[];
  previousLabel: string;
  nextLabel: string;
};

export function BrandImageCarousel({
  images,
  previousLabel,
  nextLabel
}: Props) {
  const [current, setCurrent] = useState(0);
  const image = images[current];

  const showPrevious = () => {
    setCurrent((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const showNext = () => {
    setCurrent((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="relative bg-oceanBrown/5">
      <div className="relative aspect-[4/3] md:aspect-[16/10]">
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={current === 0}
          sizes="(min-width: 768px) 70vw, 100vw"
          className="object-contain object-center"
        />
      </div>
      <button
        type="button"
        aria-label={previousLabel}
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-oceanBrown/30 bg-ivory/90 text-2xl leading-none text-oceanBrown shadow-sm transition-colors hover:bg-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-oceanBrown/70"
        onClick={showPrevious}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-oceanBrown/30 bg-ivory/90 text-2xl leading-none text-oceanBrown shadow-sm transition-colors hover:bg-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-oceanBrown/70"
        onClick={showNext}
      >
        ›
      </button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((item, index) => (
          <button
            key={item.src}
            type="button"
            aria-label={`${index + 1} / ${images.length}`}
            className={`h-2.5 w-2.5 rounded-full border border-ivory/80 ${
              index === current ? "bg-ivory" : "bg-textDark/35"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
