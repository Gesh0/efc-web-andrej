import type { CSSProperties, ReactNode } from "react";
import Words, { delay } from "@/components/motion/Words";

/**
 * Home-page segment shell. Spacing comes only from the scale in globals.css:
 * half of --section-y above and below (so any two segments sit --section-y apart),
 * --head between the header row and the content, --gutter at the sides.
 * No dividers: whitespace separates segments.
 */
export default function Segment({
  id,
  title,
  intro,
  children,
  dark = false,
  style,
}: {
  id?: string;
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
  /** full-bleed dark band (used once, for delivery) */
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      style={{
        background: dark ? "#101014" : "#ffffff",
        color: dark ? "#ffffff" : "#14141a",
        padding: "calc(var(--section-y) / 2) var(--gutter)",
        ...style,
      }}
    >
      <div className="mx-auto flex flex-col" style={{ maxWidth: 1920, gap: "var(--head)" }}>
        {title && (
          <div className="grid grid-cols-1 items-end lg:grid-cols-12" style={{ gap: "var(--el)" }}>
            <h2
              data-reveal
              className="efc-display lg:col-span-6"
              style={{ maxWidth: "18ch", fontSize: "clamp(30px,3.6vw,56px)", lineHeight: 1.04, color: dark ? "#ffffff" : "#101014", textWrap: "balance" }}
            >
              <Words text={title} step={45} />
            </h2>
            {intro && (
              <p
                data-reveal
                className="efc-rise lg:col-span-4 lg:col-start-8"
                style={{
                  ...delay(200),
                  margin: 0,
                  maxWidth: "48ch",
                  fontSize: "clamp(15px,1.15vw,17px)",
                  lineHeight: 1.6,
                  color: dark ? "rgba(255,255,255,.66)" : "rgba(20,20,26,.66)",
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
