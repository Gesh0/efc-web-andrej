import { Fragment, type CSSProperties } from "react";

/**
 * Splits a headline into per-word clip boxes for the word-by-word reveal.
 * The animation itself is CSS (`.efc-w` in globals.css) and plays when an
 * ancestor gets `.is-in` — put `data-reveal` on the heading (or a wrapper).
 */
export default function Words({
  text,
  start = 0,
  step = 65,
}: {
  text: string;
  /** delay of the first word, ms */
  start?: number;
  /** stagger between words, ms */
  step?: number;
}) {
  const parts = text.trim().split(/\s+/);
  return parts.map((word, i) => (
    <Fragment key={i}>
      <span className="efc-w">
        <span style={{ "--d": `${start + i * step}ms` } as CSSProperties}>
          {word}
        </span>
      </span>
      {i < parts.length - 1 ? " " : null}
    </Fragment>
  ));
}

/** Inline style helper for a staggered `.efc-rise` / `.efc-draw` delay. */
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}
