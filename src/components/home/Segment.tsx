import type { ReactNode } from "react";
import { delay } from "@/components/motion/Words";
import { Chip, Frame, GAP, PAD, rule } from "@/components/home/frame";

/**
 * Home section shell on the frame. Header box (rule above): a chip, then one statement —
 * the title dark, the lead grey. Content box (rule above and below) holds the section's
 * cells rail to rail.
 */
export default function Segment({
  id,
  label,
  title,
  lead,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative" style={{ paddingTop: GAP, color: "#14141a" }}>
      <Frame>
        <div style={{ borderTop: rule() }}>
          <div data-reveal className="flex flex-col" style={{ gap: 20, maxWidth: 960, padding: `${PAD} ${PAD} calc(${PAD} * 1.5)` }}>
            <span className="efc-rise">
              <Chip>{label}</Chip>
            </span>
            <h2 className="efc-display efc-rise" style={{ ...delay(80), fontSize: "clamp(28px,3vw,44px)", lineHeight: 1.12, color: "#101014", textWrap: "pretty" }}>
              {title}
              {lead && <span style={{ color: "#a1a1a8" }}> {lead}</span>}
            </h2>
          </div>
        </div>
        <div style={{ borderTop: rule(), borderBottom: rule() }}>{children}</div>
      </Frame>
    </section>
  );
}
