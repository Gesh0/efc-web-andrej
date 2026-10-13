"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useReducedMotion from "@/components/motion/useReducedMotion";

const EASE = "cubic-bezier(.23,1,.32,1)";

// routes fan out from the Skopje hub (699,320) in the map's 1586×992 space
const ROUTES = [
  "M699 320 Q529 165 358 440",
  "M699 320 Q602 206 504 680",
  "M699 320 Q760 226 822 660",
  "M699 320 Q896 150 1093 540",
  "M699 320 Q950 120 1201 360",
];

// hub first, then one pin per route end — positions as % of the map
const PINS = [
  { left: 44.1, top: 32.3, hub: true },
  { left: 22.6, top: 44.4 },
  { left: 31.8, top: 68.5 },
  { left: 51.8, top: 66.5 },
  { left: 68.9, top: 54.4 },
  { left: 75.7, top: 36.3 },
];

/**
 * Scroll progress through the figure draws each route from the hub and drops
 * its pin; pins pulse only once placed. Reversible.
 */
export default function CoverageMap() {
  const figRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [progress, setP] = useState(0);
  const p = reduced ? 1 : progress;

  useEffect(() => {
    const fig = figRef.current;
    if (!fig || reduced) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = fig.getBoundingClientRect();
      const vh = window.innerHeight;
      const next = Math.max(0, Math.min(1, (vh * 0.92 - r.top) / Math.max(1, r.height + vh * 0.25)));
      setP((prev) => (Math.abs(prev - next) < 0.0015 ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <figure
      ref={figRef}
      className="relative m-0 min-w-0"
      style={{
        flex: "2 1 480px",
        width: "calc(100% + clamp(12px,3.2vw,52px))",
        maxWidth: "none",
        marginRight: "calc(-1 * clamp(12px,3.2vw,52px))",
      }}
    >
      <Image
        src="/assets/efc-coverage-map.png"
        alt="Мапа на покриеноста на EFC во Македонија"
        width={1586}
        height={992}
        sizes="(max-width: 900px) 100vw, 860px"
        style={{ display: "block", width: "100%", height: "auto", borderRadius: 20 }}
      />
      <svg viewBox="0 0 1586 992" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
        {ROUTES.map((d, i) => {
          const q = Math.max(0, Math.min(1, (p - (0.1 + i * 0.13)) / 0.22));
          return (
            <g key={d}>
              <mask id={`efcRoute${i}`}>
                <path d={d} pathLength={1} fill="none" stroke="#ffffff" strokeWidth={14} strokeDasharray={1} strokeDashoffset={1 - q} />
              </mask>
              <path d={d} fill="none" stroke="#dc2626" strokeWidth={3} strokeDasharray="10 12" strokeLinecap="round" mask={`url(#efcRoute${i})`} />
            </g>
          );
        })}
      </svg>
      {PINS.map((pin, i) => {
        const on = p >= 0.08 + i * 0.13;
        const ring = pin.hub ? 46 : 34;
        return (
          <span key={i} className="pointer-events-none absolute" style={{ left: `${pin.left}%`, top: `${pin.top}%`, width: 0, height: 0 }}>
            {[0, 800].map((offset, k) => (
              <span
                key={k}
                data-anim
                aria-hidden="true"
                className="absolute left-0 top-0"
                style={{
                  width: ring,
                  height: ring,
                  margin: `${-ring / 2}px 0 0 ${-ring / 2}px`,
                  borderRadius: "50%",
                  border: k === 0 ? "2px solid #dc2626" : undefined,
                  background: k === 1 ? "rgba(220,38,38,.28)" : undefined,
                  opacity: 0,
                  visibility: on ? "visible" : "hidden",
                  animation: "efcPing 2400ms cubic-bezier(.16,1,.3,1) infinite",
                  animationDelay: `${i * 260 + offset}ms`,
                  animationPlayState: on ? "running" : "paused",
                }}
              />
            ))}
            <span
              className="absolute left-0 bottom-0"
              style={{
                transform: on ? "translate(-50%,0) scale(1)" : "translate(-50%,0) scale(.4)",
                opacity: on ? 1 : 0,
                transformOrigin: "50% 100%",
                transition: `transform 520ms ${EASE}, opacity 320ms ${EASE}`,
              }}
            >
              <svg
                viewBox="0 0 24 32"
                width={pin.hub ? 34 : 26}
                height={pin.hub ? 45 : 35}
                fill="none"
                aria-hidden="true"
                style={{ display: "block", filter: "drop-shadow(0 6px 10px rgba(220,38,38,.35))" }}
              >
                <path d="M12 31c0 0-11-11.6-11-19A11 11 0 0 1 23 12c0 7.4-11 19-11 19Z" fill="#dc2626" />
                <circle cx="12" cy="12" r="4.2" fill="#ffffff" />
              </svg>
            </span>
          </span>
        );
      })}
    </figure>
  );
}
