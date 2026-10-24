import type { CSSProperties, ReactNode } from "react";
import Words, { delay } from "@/components/motion/Words";

/** Side gutter shared by every home segment (32–64px). */
export const GUTTER = "clamp(32px,4vw,64px)";

/**
 * Home-page segment shell: full-bleed white section, 1920px container, and an optional
 * header row (title left, intro right). Gaps — segment to segment and header to content —
 * all come from --section-y so the rhythm stays even.
 */
export default function Segment({
  id,
  title,
  intro,
  children,
  style,
}: {
  id?: string;
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section id={id} style={{ background: "#ffffff", color: "#14141a", padding: `calc(var(--section-y) / 2) ${GUTTER}`, ...style }}>
      <div className="mx-auto flex flex-col" style={{ maxWidth: 1920, gap: "var(--section-y)" }}>
        {title && (
          <div className="flex flex-wrap items-end justify-between" style={{ gap: "clamp(20px,4vw,64px)" }}>
            <h2
              data-reveal
              className="efc-display"
              style={{ maxWidth: "18ch", fontSize: "clamp(28px,3.4vw,52px)", lineHeight: 1.04, color: "#101014", textWrap: "balance" }}
            >
              <Words text={title} step={45} />
            </h2>
            {intro && (
              <p
                data-reveal
                className="efc-rise"
                style={{
                  ...delay(200),
                  margin: 0,
                  maxWidth: "48ch",
                  flex: "1 1 340px",
                  fontSize: "clamp(15px,1.15vw,17px)",
                  lineHeight: 1.6,
                  color: "rgba(20,20,26,.66)",
                  textWrap: "pretty",
                }}
              >
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
