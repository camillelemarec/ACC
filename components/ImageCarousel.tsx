'use client';

import { useEffect, useState } from "react";

type CarouselImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

type ImageCarouselProps = {
  images: CarouselImage[];
  className?: string;
  intervalMs?: number;
  startDelayMs?: number;
};

export default function ImageCarousel({
  images,
  className = "",
  intervalMs = 4500,
  startDelayMs = 0
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    let intervalTimer: number | undefined;

    const startInterval = () => {
      intervalTimer = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }, intervalMs);
    };

    const delayTimer = window.setTimeout(() => {
      startInterval();
    }, startDelayMs);

    return () => {
      window.clearTimeout(delayTimer);
      if (intervalTimer) window.clearInterval(intervalTimer);
    };
  }, [images.length, intervalMs, startDelayMs]);

  if (images.length === 0) return null;

  const goTo = (index: number) => setActiveIndex(index);
  const previous = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);

  return (
    <div className={`section-frame relative overflow-hidden rounded-2xl bg-white ${className}`}>
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <div
            className={`h-full w-full bg-center bg-no-repeat ${
              image.fit === "contain" ? "bg-contain" : "bg-cover"
            }`}
            style={{ backgroundImage: `url('${image.src}')` }}
            aria-label={image.alt}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            className="absolute left-3 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/35 text-white transition hover:bg-black/55"
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/35 text-white transition hover:bg-black/55"
            aria-label="Image suivante"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {images.map((image, index) => (
              <button
                key={`${image.src}-dot`}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-white" : "bg-white/45"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
