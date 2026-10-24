import type { ReactNode } from "react";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { LINE, RED, rule } from "@/components/home/frame";

/** Small UI "records" that prove a sentence: intake sheet, shelf card, order timeline, receipt. */

export function Card({ icon, title, meta, children }: { icon?: MaterialName; title: ReactNode; meta?: ReactNode; children: ReactNode }) {
  return (
    <div style={{ background: "#ffffff", color: "#14141a", border: rule("rgba(20,20,26,.1)"), boxShadow: "0 20px 40px -28px rgba(20,20,22,.35)", fontSize: 14 }}>
      <div className="flex items-center justify-between" style={{ gap: 12, padding: "11px 16px", borderBottom: rule(LINE) }}>
        <span className="inline-flex items-center" style={{ gap: 8, fontWeight: 600 }}>
          {icon && (
            <span style={{ color: RED, display: "inline-flex" }}>
              <MaterialIcon name={icon} size={18} />
            </span>
          )}
          {title}
        </span>
        {meta && <span className="font-numeric" style={{ fontSize: 12.5, color: "rgba(20,20,26,.5)", whiteSpace: "nowrap" }}>{meta}</span>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function Row({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between" style={{ gap: 12, padding: "10px 16px", borderBottom: rule(LINE) }}>
      <span>{label}</span>
      <span className="font-numeric inline-flex items-center" style={{ gap: 8, whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
}

export function Pill({ tone = "ok", children }: { tone?: "ok" | "warn" | "muted"; children: ReactNode }) {
  const c = tone === "ok" ? "#1f9d55" : tone === "warn" ? RED : "rgba(20,20,26,.55)";
  const bg = tone === "ok" ? "rgba(31,157,85,.1)" : tone === "warn" ? "rgba(227,30,30,.09)" : "rgba(20,20,26,.06)";
  return <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 8px", color: c, background: bg, fontFamily: "var(--font-sans)" }}>{children}</span>;
}
