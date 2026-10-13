"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "@/components/motion/useReducedMotion";

/** Large statement whose words light up with scroll progress (reversible). */
export default function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.trim().split(/\s+/);
  const reduced = useReducedMotion();
  const [progressLit, setLit] = useState(0);
  const lit = reduced ? words.length : progressLit;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const p = Math.max(0, Math.min(1, (h * 0.85 - r.top) / (h * 0.55 + r.height)));
      setLit(Math.round(p * words.length));
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
  }, [words.length, reduced]);

  return (
    <p
      ref={ref}
      className="efc-display"
      style={{
        maxWidth: "24ch",
        margin: "0 auto",
        fontSize: "clamp(30px,4.4vw,64px)",
        lineHeight: 1.04,
        textAlign: "center",
        color: "#14141a",
        textWrap: "balance",
      }}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span style={{ opacity: i < lit ? 1 : 0.16, transition: "opacity 260ms cubic-bezier(.23,1,.32,1)" }}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
