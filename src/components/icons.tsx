/**
 * Inline SVG icons used across the site. Stroke icons inherit `currentColor`.
 */

type IconProps = { size?: number; strokeWidth?: number; className?: string };

export function ArrowUpRight({ size = 14, strokeWidth = 2.2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true" className={className}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ size = 17, strokeWidth = 2.2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true" className={className}>
      <path d="M5 12h13" />
      <path d="M12 5.5 18.5 12 12 18.5" />
    </svg>
  );
}

export function Plus({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function Check({ size = 11, strokeWidth = 3.2, color = "#fff" }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ChevronDown({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Facebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M14 8.5h2.5V5.2c-.4-.1-1.9-.2-3.5-.2-3.5 0-4.9 2.1-4.9 5.1v2.4H5.5V16h2.6v8h3.3v-8h2.8l.4-3.5h-3.2v-2.1c0-1 .3-1.9 2.6-1.9z" />
    </svg>
  );
}

export function Instagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M5 9.5h3V19H5zM6.5 5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10.5 9.5h2.9v1.3c.4-.8 1.4-1.5 2.9-1.5 3 0 3.6 2 3.6 4.6V19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3.1z" />
    </svg>
  );
}

/* benefit glyphs (home "Придобивки") — 1.6 stroke in brand red */
const benefitProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#dc2626",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  style: { flex: "none" },
};

export function GrowthIcon() {
  return (
    <svg {...benefitProps}>
      <path d="M4 19h16" />
      <path d="M6 15l4-4 3 3 5-6" />
      <path d="M14 8h4v4" />
    </svg>
  );
}

export function TruckIcon() {
  return (
    <svg {...benefitProps}>
      <path d="M3 7h10v9H3z" />
      <path d="M13 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17" cy="17.5" r="1.6" />
    </svg>
  );
}

export function ReturnIcon() {
  return (
    <svg {...benefitProps}>
      <path d="M4 9h11a5 5 0 0 1 0 10H9" />
      <path d="M8 5L4 9l4 4" />
    </svg>
  );
}

export function BoxIcon() {
  return (
    <svg {...benefitProps}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5l8 4.5 8-4.5" />
      <path d="M12 12v9" />
    </svg>
  );
}
