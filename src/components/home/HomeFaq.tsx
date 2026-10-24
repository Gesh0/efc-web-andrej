"use client";

import { useState } from "react";
import { delay } from "@/components/motion/Words";
import { ArrowUpRight } from "@/components/icons";
import { Chip, EASE, Frame, GAP, PAD, RED, rule } from "@/components/home/frame";

const FAQ = [
  {
    q: "Може ли да користам само дел од услугите?",
    a: "Да. Секоја услуга може да се користи посебно: само складирање, сортирање и поделба на роба, фискализација или палетно работење. Ако ви треба нешто што не е на листата, кажете ни.",
  },
  { q: "Колку чини?", a: "Цената зависи од просторот што го користите и од бројот на нарачки. Нема фиксен месечен трошок. Кажете ни што продавате и колку нарачки имате, и ќе добиете точна понуда." },
  { q: "Колку време треба за да почнеме?", a: "По првиот разговор ги договараме деталите, ја поврзуваме вашата продавница со нашиот систем и ја примаме стоката. Обично почнуваме за помалку од една недела." },
  { q: "Што ако имам мал број нарачки?", a: "Нема минимум и нема горна граница. Плаќате само за она што го користите, па и мал обем има смисла." },
  { q: "Што ако купувач рекламира дека нешто недостасува?", a: "Секоја нарачка е снимена при пакување. Ја проверуваме снимката од таа нарачка и ви ја испраќаме." },
];

/** Header row (statement left, contact right) over a numbered, full-width accordion. */
export default function HomeFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative" style={{ paddingTop: GAP }}>
      <Frame>
        <div style={{ borderTop: rule() }}>
          <div data-reveal className="grid grid-cols-1 items-end lg:grid-cols-12" style={{ gap: 32, padding: `${PAD} ${PAD} calc(${PAD} * 1.5)` }}>
            <div className="flex flex-col lg:col-span-7" style={{ gap: 20 }}>
              <span className="efc-rise">
                <Chip>Прашања</Chip>
              </span>
              <h2 className="efc-display efc-rise" style={{ ...delay(80), fontSize: "clamp(28px,3vw,44px)", lineHeight: 1.12, color: "#101014" }}>
                Имате прашања? <span style={{ color: "#a1a1a8" }}>Тука сме да ви помогнеме.</span>
              </h2>
            </div>
            <div className="efc-rise flex flex-col items-start lg:col-span-4 lg:col-start-9" style={{ ...delay(160), gap: 14 }}>
              <p style={{ margin: 0, fontSize: 15.5, color: "rgba(20,20,26,.66)" }}>Не го наоѓате тоа што го барате? Пишете ни:</p>
              <a href="mailto:contact@efc.mk" className="inline-flex items-center" style={{ gap: 8, height: 40, padding: "0 16px", border: rule("rgba(20,20,26,.16)"), fontSize: 14, fontWeight: 600, color: "#14141a" }}>
                contact@efc.mk
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div data-reveal className="efc-rise" style={{ borderTop: rule(), borderBottom: rule() }}>
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} style={{ borderTop: i ? rule() : undefined }}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`faq-a${i}`}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="grid w-full cursor-pointer items-baseline text-left"
                  style={{ gridTemplateColumns: "48px minmax(0,1fr) 24px", gap: 16, padding: `24px ${PAD}`, border: 0, background: "transparent", fontFamily: "inherit", color: "#14141a" }}
                >
                  <span className="font-numeric" style={{ fontSize: 12.5, fontWeight: 600, color: on ? RED : "#a1a1a8", transition: `color 240ms ${EASE}` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "clamp(16px,1.3vw,19px)", fontWeight: 500, lineHeight: 1.35 }}>{f.q}</span>
                  <span aria-hidden="true" style={{ fontSize: 22, lineHeight: 1, color: RED, textAlign: "right" }}>
                    {on ? "–" : "+"}
                  </span>
                </button>
                <div id={`faq-a${i}`} role="region" className="grid" style={{ gridTemplateRows: on ? "1fr" : "0fr", transition: `grid-template-rows 380ms ${EASE}` }}>
                  <div className="min-h-0 overflow-hidden">
                    <p style={{ margin: 0, padding: `0 ${PAD} 24px calc(${PAD} + 64px)`, maxWidth: "calc(72ch + 160px)", fontSize: 15.5, lineHeight: 1.6, color: "rgba(20,20,26,.66)" }}>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Frame>
    </section>
  );
}
