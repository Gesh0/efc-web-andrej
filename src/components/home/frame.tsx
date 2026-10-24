import type { CSSProperties, ReactNode } from "react";

/**
 * The home page frame (Attio-style): one content column with two light rails running the
 * full page at its edges. Sections open on a rule and their cells reach rail to rail, so
 * cell borders and rails form one grid.
 */
export const FRAME_MAX = 1440;
export const GUTTER = "clamp(16px,4.4vw,64px)"; // rail distance from the viewport edge
export const PAD = "clamp(24px,3.4vw,48px)"; // inner padding of every cell
export const LINE = "rgba(20,20,26,.08)";
export const LINE_DARK = "#2c2c32";
export const RED = "#e31e1e";
export const EASE = "cubic-bezier(.23,1,.32,1)";
export const rule = (c = LINE) => `1px solid ${c}`;

/** Centred content column; its padding puts the content edges on the rails. */
export function Frame({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`relative mx-auto w-full ${className}`} style={{ maxWidth: FRAME_MAX, paddingInline: GUTTER, ...style }}>
      {children}
    </div>
  );
}

/** The two full-height rails. Rendered once per page, behind the content. */
export function Rails() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0" style={{ zIndex: 0 }}>
      <Frame className="h-full">
        <div className="h-full" style={{ borderLeft: rule(), borderRight: rule() }} />
      </Frame>
    </div>
  );
}

/**
 * Dot grid that fades along a gradient. `mask` decides where it is dense (opaque) and where it
 * dissolves; the default is dense bottom-left, gone by the top-right.
 */
export function DotField({
  mask = "linear-gradient(to top right, #000 0%, rgba(0,0,0,.55) 35%, transparent 75%)",
  color = "rgba(20,20,26,.16)",
  size = 16,
  tint,
  style,
}: {
  mask?: string;
  color?: string;
  size?: number;
  /** optional wash under the dots, same mask */
  tint?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1.2px)${tint ? `, linear-gradient(${tint}, ${tint})` : ""}`,
        backgroundSize: `${size}px ${size}px${tint ? ", 100% 100%" : ""}`,
        maskImage: mask,
        WebkitMaskImage: mask,
        ...style,
      }}
    />
  );
}
