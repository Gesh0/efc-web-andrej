"use client";

import { useEffect, useRef } from "react";

/** Muted looping backdrop that only plays while on screen (and never under reduced motion). */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Видео од операциите на EFC"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ filter: "saturate(.6) contrast(1.04) brightness(.86)" }}
    >
      <source src="/assets/efc-services-hero.mp4" type="video/mp4" />
    </video>
  );
}
