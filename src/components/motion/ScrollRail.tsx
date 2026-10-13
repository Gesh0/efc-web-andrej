"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Hairline section rule whose dark fill tracks the reader's progress through
 * the enclosing <section> (from its top at 85% of the viewport to its bottom
 * at 45%). Scroll-scrubbed and reversible.
 */
export default function ScrollRail({ style }: { style?: CSSProperties }) {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const sec = fill?.closest("section");
    if (!fill || !sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transform = "scaleX(1)";
      return;
    }
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85 - r.top; // px scrolled past "top 85%"
      const span = r.height + vh * 0.4; // distance to "bottom 45%"
      const p = Math.max(0, Math.min(1, start / Math.max(1, span)));
      fill.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        height: 1,
        background: "rgba(20,20,26,.12)",
        overflow: "hidden",
        ...style,
      }}
    >
      <span
        ref={fillRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20,20,26,.55)",
          transform: "scaleX(0)",
          transformOrigin: "left",
          willChange: "transform",
        }}
      />
    </span>
  );
}
