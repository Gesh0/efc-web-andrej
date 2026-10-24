import type { ReactNode } from "react";
import { delay } from "@/components/motion/Words";
import { Frame, PAD, rule } from "@/components/home/frame";

/** Header type shared by every home section: the title dark, the lead grey, in one statement. */
export function SectionHead({ title, lead, dark = false }: { title: string; lead?: string; dark?: boolean }) {
  return (
    <div data-reveal style={{ maxWidth: 960, padding: `calc(${PAD} * 2) ${PAD} calc(${PAD} * 1.5)` }}>
      <h2 className="efc-display efc-rise" style={{ ...delay(40), fontSize: "clamp(28px,3vw,44px)", lineHeight: 1.12, color: dark ? "#ffffff" : "#101014", textWrap: "pretty" }}>
        {title}
        {lead && <span style={{ color: dark ? "#6b6b72" : "#a1a1a8" }}> {lead}</span>}
      </h2>
    </div>
  );
}

/**
 * Home section shell on the frame. Sections stack directly: the previous section's bottom
 * rule is this one's top edge. Header statement, then the content box (rule above and
 * below) whose cells reach rail to rail.
 */
export default function Segment({ id, title, lead, children }: { id?: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative" style={{ color: "#14141a" }}>
      <Frame>
        <SectionHead title={title} lead={lead} />
        <div style={{ borderTop: rule(), borderBottom: rule() }}>{children}</div>
      </Frame>
    </section>
  );
}
