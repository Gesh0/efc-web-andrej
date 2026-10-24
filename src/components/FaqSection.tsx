"use client";

import { useState } from "react";
import ScrollRail from "@/components/motion/ScrollRail";
import Words, { delay } from "@/components/motion/Words";
import { ArrowUpRight } from "@/components/icons";

const EASE = "cubic-bezier(.23,1,.32,1)";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "Кои региони се покриени со достава?",
    a: "Доставата се врши на територијата на целата држава преку директната интеграција со мрежата на ELS, опфаќајќи го секој град и населено место, со целосна следливост до крајната адреса.",
  },
  {
    q: "Како изгледа процесот на отпочнување соработка (onboarding)?",
    a: "Врз основа на спецификациите на производите (SKU), обемот на нарачки и дестинациите, се креира персонализиран план за фулфилмент. По системската интеграција и приемот на залихите во магацинот, процесот на испорака започнува во рок од неколку дена.",
  },
  {
    q: "Дали се врши процесирање на кршливи производи и производи со висока вредност?",
    a: "Да. При приемот се врши детална контрола на квалитетот (QA), а за чувствителната стока се нудат опции за специјализирано заштитно пакување, со што се обезбедува безбедност низ целиот логистички синџир.",
  },
  {
    q: "Дали нудите поддршка при увоз и царинење на стоката?",
    a: "Во соработка со нашите партнери, можеме да обезбедиме поддршка при увозот и царинската постапка за вашата стока. Контактирајте нè за да ги разгледаме вашите конкретни потреби.",
  },
];

export default function FaqSection({
  id,
  maxWidth = 1180,
  single = false,
  items = FAQS,
  wide = false,
}: {
  id: string;
  maxWidth?: number;
  /** exclusive accordion: opening one answer closes the others */
  single?: boolean;
  /** questions to show; defaults to the general set */
  items?: Faq[];
  /** home layout: spacing scale, no scroll rail, no row lines */
  wide?: boolean;
}) {
  // first answer starts open
  const [open, setOpen] = useState<boolean[]>(() => items.map((_, i) => i === 0));
  const toggle = (i: number) => setOpen((s) => s.map((v, k) => (k === i ? !v : single ? false : v)));

  return (
    <section
      id={id}
      style={{
        position: "relative",
        background: "#ffffff",
        padding: wide ? "calc(var(--section-y) / 2) var(--gutter)" : "clamp(64px,7vw,116px) clamp(20px,3.5vw,56px)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: wide ? 1920 : maxWidth }}>
        {!wide && <ScrollRail style={{ marginBottom: "clamp(20px,3vh,34px)" }} />}
        <div data-reveal className="flex flex-wrap items-start justify-between" style={{ gap: "clamp(24px,4vw,64px)" }}>
          <h2
            className="efc-display"
            style={{ maxWidth: "16ch", textWrap: "pretty", fontSize: wide ? "clamp(30px,3.6vw,56px)" : "clamp(26px,3vw,44px)", lineHeight: wide ? 1.04 : 0.98, color: "#101014" }}
          >
            <Words text="Имате прашања? Тука сме да Ви помогнеме." />
          </h2>
          <div className="flex min-w-0 flex-col items-start" style={{ flex: "0 1 46ch" }}>
            <p
              className="efc-rise"
              style={{ ...delay(180), margin: 0, fontSize: "clamp(14.5px,1.1vw,16.5px)", fontWeight: 300, lineHeight: 1.6, color: "rgba(20,20,26,.72)" }}
            >
              Не го наоѓате тоа што го барате? Контактирајте нè на:
            </p>
            <div className="efc-rise" style={{ ...delay(270), marginTop: "clamp(14px,1.6vw,20px)" }}>
              <a href="mailto:contact@efc.mk" className="efc-pill">
                contact@efc.mk
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        <div data-reveal className="efc-rise" style={wide ? { marginTop: "var(--head)", maxWidth: "66%", minWidth: "min(100%, 640px)" } : { marginTop: "clamp(32px,4vw,56px)", borderTop: "1px solid rgba(20,20,26,.09)" }}>
          {items.map((f, i) => (
            <div key={f.q} style={wide ? undefined : { borderBottom: "1px solid rgba(20,20,26,.09)" }}>
              <button
                type="button"
                aria-expanded={open[i]}
                aria-controls={`${id}-a${i}`}
                onClick={() => toggle(i)}
                className="efc-press flex w-full cursor-pointer items-start justify-between text-left"
                style={{ gap: 24, padding: wide ? "var(--s16) 0" : "clamp(16px,1.8vw,22px) 0", border: 0, background: "transparent", fontFamily: "inherit" }}
              >
                <span style={{ fontSize: wide ? "clamp(17px,1.4vw,20px)" : "clamp(15.5px,1.3vw,18px)", fontWeight: 500, lineHeight: 1.35, color: "#101014", textWrap: "pretty" }}>
                  {f.q}
                </span>
                <span aria-hidden="true" className="relative block flex-none" style={{ width: 16, height: 16, marginTop: 6 }}>
                  <span className="absolute left-0" style={{ top: "50%", width: "100%", height: 2, marginTop: -1, borderRadius: 2, background: "#e31e1e" }} />
                  <span
                    className="absolute top-0"
                    style={{
                      left: "50%",
                      width: 2,
                      height: "100%",
                      marginLeft: -1,
                      borderRadius: 2,
                      background: "#e31e1e",
                      transform: open[i] ? "scaleY(0)" : "scaleY(1)",
                      opacity: open[i] ? 0 : 1,
                      transition: `transform 300ms ${EASE}, opacity 220ms ${EASE}`,
                    }}
                  />
                </span>
              </button>
              <div
                id={`${id}-a${i}`}
                role="region"
                className="grid"
                style={{
                  gridTemplateRows: open[i] ? "1fr" : "0fr",
                  opacity: open[i] ? 1 : 0,
                  transition: `grid-template-rows 380ms ${EASE}, opacity 260ms ${EASE}`,
                }}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    style={{
                      margin: 0,
                      paddingBottom: wide ? "var(--s16)" : "clamp(16px,1.8vw,22px)",
                      maxWidth: "72ch",
                      fontSize: "clamp(14.5px,1.1vw,16px)",
                      fontWeight: 300,
                      lineHeight: 1.62,
                      color: "rgba(20,20,26,.72)",
                      textWrap: "pretty",
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
