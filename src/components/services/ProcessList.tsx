"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Words, { delay } from "@/components/motion/Words";
import { ArrowUpRight, Plus } from "@/components/icons";

const EASE = "cubic-bezier(.23,1,.32,1)";

type Step = {
  id?: string;
  name: string;
  label: string;
  desc: string;
  img: string;
  alt: string;
  copy: string;
  bullets?: string[];
};

const STEPS: Step[] = [
  {
    name: "Прием и контрола",
    label: "Прием на стока",
    desc: "Производите пристигнуваат во EFC, се проверуваат, евидентираат и се поставуваат на соодветна магацинска локација.",
    img: "/assets/efc-packing-station.jpg",
    alt: "Прием на стока во магацинот",
    copy: "Ги примаме, евидентираме и складираме вашите производи во EFC, во соодветни услови и со целосна прегледност на залихата преку WMS системот.",
  },
  {
    id: "uslugi-skladiranje",
    name: "Складирање и залиха",
    label: "Складирање",
    desc: "Секој производ има своја локација, а состојбата на залихата е достапна преку WMS системот во реално време.",
    img: "/assets/containerpackages.avif",
    alt: "Палетни регали во магацинот",
    copy: "Простор за вашите производи, без сопствен магацин. Капацитетот се прилагодува на вашите потреби, без инвестиција во сопствен магацин, опрема или дополнителен кадар.",
  },
  {
    id: "uslugi-fulfilment",
    name: "Селектирање и пакување",
    label: "Процесирање на нарачки",
    desc: "Кога ќе пристигне нарачка, производите се селектираат, проверуваат и пакуваат според договорениот процес.",
    img: "/assets/efc-pick-pack.jpg",
    alt: "Пакување на нарачки во EFC",
    copy: "Нарачките до дневниот пресек се подготвуваат истиот ден, со можност за брендирано пакување и обработка на повратни пратки.",
  },
  {
    id: "uslugi-transport",
    name: "Достава",
    label: "Транспорт и достава",
    desc: "Подготвената пратка се предава на мрежата на ELS и продолжува до крајната адреса на клиентот.",
    img: "/assets/efc-van-dock.avif",
    alt: "Возило на рампа пред излез за достава",
    copy: "Подготвените нарачки директно влегуваат во дистрибутивната мрежа на ELS и се испорачуваат низ цела Македонија.",
    bullets: [
      "Достава за еден ден низ целата држава",
      "Потврда на испораката со OTP код",
      "Наплата при достава во готово или со картичка",
      "Целосна евиденција и следење на секоја пратка",
    ],
  },
];

/**
 * Four-step process. The row nearest the reading line (48% of the viewport)
 * is active and the centre rail fills with progress — scroll-driven and
 * reversible. Clicking a row opens its photo and details.
 */
export default function ProcessList() {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<boolean[]>(() => STEPS.map(() => false));
  const [hover, setHover] = useState(-1);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.48;
      const lr = list.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (line - lr.top) / Math.max(1, lr.height)));
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${reduced ? 1 : p.toFixed(4)})`;
      let best = 0;
      let dist = Infinity;
      btnRefs.current.forEach((b, i) => {
        if (!b) return;
        const r = b.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - line);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(() => {
      setNarrow(list.clientWidth < 760);
      onScroll();
    });
    ro.observe(list);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const cols = narrow ? "38px minmax(0,1fr)" : "minmax(0,1fr) 64px minmax(0,1fr)";
  const side = "clamp(16px,2vw,28px)";

  return (
    <section id="uslugi" style={{ position: "relative", background: "#ffffff", color: "#14141a", padding: "clamp(56px,7vw,104px) clamp(20px,3.5vw,56px)" }}>
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between"
          style={{ gap: "20px clamp(32px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)", borderBottom: "1px solid rgba(20,20,26,.12)" }}
        >
          <div className="min-w-0">
            <span
              className="efc-rise inline-flex items-center"
              style={{ height: 32, padding: "0 16px", borderRadius: 9999, border: "1px solid rgba(20,20,26,.16)", fontSize: 13.5, fontWeight: 500, color: "rgba(20,20,26,.7)" }}
            >
              Нашите услуги
            </span>
            <h2 className="efc-display" style={{ margin: "16px 0 0", maxWidth: "16ch", fontSize: "clamp(30px,3.8vw,56px)", lineHeight: 0.96, color: "#14141a" }}>
              <Words text="Еден процес за секоја ваша нарачка." />
            </h2>
          </div>
          <div className="flex min-w-0 flex-col items-start" style={{ flex: "0 1 46ch", gap: 14 }}>
            <span className="efc-rise" style={{ ...delay(270), fontSize: 13.5, fontWeight: 600, color: "rgba(20,20,26,.5)" }}>
              Чекор <span style={{ color: "#dc2626" }}>{String(active + 1).padStart(2, "0")}</span> / {String(STEPS.length).padStart(2, "0")}
            </span>
            <p
              className="efc-rise"
              style={{ ...delay(360), margin: 0, fontSize: "clamp(14.5px,1.1vw,16.5px)", fontWeight: 300, lineHeight: 1.6, color: "rgba(20,20,26,.72)", textWrap: "pretty" }}
            >
              Складирањето, обработката на нарачките и доставата функционираат како еден поврзан процес — со еден
              партнер, една точка на одговорност и целосна прегледност на секој чекор.
            </p>
          </div>
        </div>

        <div ref={listRef} data-reveal className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0"
            style={{ left: narrow ? 19 : "50%", width: 1, marginLeft: -0.5, background: "rgba(20,20,26,.12)" }}
          >
            <span
              ref={fillRef}
              className="absolute inset-0"
              style={{ background: "#dc2626", transform: "scaleY(0)", transformOrigin: "top", willChange: "transform" }}
            />
          </span>

          {STEPS.map((s, i) => {
            const on = i === active;
            const isOpen = open[i];
            const lit = on || isOpen;
            return (
              <div key={s.name} id={s.id} className="efc-rise relative" style={{ ...delay(i * 90), borderBottom: "1px solid rgba(20,20,26,.12)" }}>
                <button
                  ref={(el) => {
                    btnRefs.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`proc-${i}`}
                  onClick={() => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(-1)}
                  className="grid w-full cursor-pointer text-left"
                  style={{
                    gridTemplateColumns: cols,
                    gridTemplateAreas: narrow ? "'num name' '. info'" : "'name num info'",
                    rowGap: narrow ? 10 : 0,
                    alignItems: narrow ? "start" : "center",
                    minHeight: "clamp(96px,10vw,140px)",
                    padding: "clamp(18px,2vw,26px) 0",
                    border: 0,
                    background: "transparent",
                    fontFamily: "inherit",
                    color: "inherit",
                  }}
                >
                  <span
                    className="efc-display"
                    style={{
                      gridArea: "name",
                      justifySelf: narrow ? "start" : "end",
                      padding: narrow ? "0 0 0 14px" : `0 ${side} 0 0`,
                      fontSize: narrow ? "clamp(24px,7vw,34px)" : "clamp(28px,3.9vw,60px)",
                      lineHeight: 0.96,
                      textAlign: narrow ? "left" : "right",
                      color: lit ? "#14141a" : hover === i ? "rgba(20,20,26,.5)" : "rgba(20,20,26,.22)",
                      transition: `color 360ms ${EASE}`,
                    }}
                  >
                    {s.name}
                  </span>
                  <span className="relative z-[1]" style={{ gridArea: "num", justifySelf: narrow ? "start" : "center", paddingTop: narrow ? 3 : 0 }}>
                    <span
                      className="grid place-items-center"
                      style={{
                        width: 38,
                        height: 26,
                        borderRadius: 6,
                        border: `1px solid ${on ? "#dc2626" : "rgba(20,20,26,.28)"}`,
                        background: on ? "#dc2626" : "#ffffff",
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: on ? "#ffffff" : "rgba(20,20,26,.5)",
                        transition: `background-color 300ms ${EASE}, border-color 300ms ${EASE}, color 300ms ${EASE}`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="flex min-w-0 items-center" style={{ gridArea: "info", gap: 16, paddingLeft: narrow ? 14 : side }}>
                    <span className="flex min-w-0 flex-auto flex-col" style={{ gap: 6 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: lit ? "#dc2626" : "rgba(20,20,26,.42)", transition: `color 300ms ${EASE}` }}>
                        {s.label}
                      </span>
                      <span
                        className="block"
                        style={{
                          maxWidth: "46ch",
                          fontSize: "clamp(14px,1.05vw,16px)",
                          lineHeight: 1.5,
                          color: "rgba(20,20,26,.72)",
                          opacity: lit ? 1 : 0,
                          transform: lit ? "translateY(0)" : "translateY(6px)",
                          transition: `opacity 320ms ${EASE}, transform 420ms ${EASE}`,
                          textWrap: "pretty",
                        }}
                      >
                        {s.desc}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid flex-none place-items-center"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: `1px solid ${isOpen ? "#dc2626" : "rgba(20,20,26,.2)"}`,
                        background: isOpen ? "#dc2626" : "transparent",
                        color: isOpen ? "#ffffff" : "#14141a",
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: `transform 320ms ${EASE}, background-color 240ms ${EASE}, border-color 240ms ${EASE}, color 240ms ${EASE}`,
                      }}
                    >
                      <Plus />
                    </span>
                  </span>
                </button>

                <div
                  id={`proc-${i}`}
                  role="region"
                  className="grid"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transition: `grid-template-rows 520ms ${EASE}` }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: narrow ? "minmax(0,1fr)" : "minmax(0,1fr) 64px minmax(0,1fr)",
                        paddingBottom: "clamp(28px,3vw,44px)",
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateY(0)" : "translateY(10px)",
                        transition: `opacity 320ms ${EASE}, transform 460ms ${EASE}`,
                      }}
                    >
                      <div
                        style={{
                          justifySelf: narrow ? "stretch" : "end",
                          width: narrow ? "100%" : "min(100%,440px)",
                          padding: narrow ? "0 0 18px 52px" : `0 ${side} 0 0`,
                        }}
                      >
                        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: 14, background: "#101014" }}>
                          <Image
                            src={s.img}
                            alt={s.alt}
                            fill
                            sizes="(max-width: 760px) 90vw, 440px"
                            style={{ objectFit: "cover", filter: "saturate(.75) brightness(.95)" }}
                          />
                        </div>
                      </div>
                      {!narrow && <span aria-hidden="true" />}
                      <div className="flex flex-col items-start" style={{ gap: 16, maxWidth: "52ch", paddingLeft: narrow ? 52 : side }}>
                        <p style={{ margin: 0, fontSize: "clamp(14.5px,1.1vw,16.5px)", lineHeight: 1.6, color: "rgba(20,20,26,.78)", textWrap: "pretty" }}>
                          {s.copy}
                        </p>
                        {s.bullets && (
                          <ul
                            className="flex flex-col"
                            style={{ margin: 0, padding: 0, listStyle: "none", gap: 8, fontSize: "clamp(14px,1.05vw,15.5px)", lineHeight: 1.4, color: "rgba(20,20,26,.78)" }}
                          >
                            {s.bullets.map((b) => (
                              <li key={b} className="flex items-baseline" style={{ gap: 10 }}>
                                <span aria-hidden="true" style={{ flex: "none", width: 6, height: 6, borderRadius: "50%", background: "#dc2626", transform: "translateY(-2px)" }} />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <Link href="/contact" className="efc-pill" tabIndex={isOpen ? 0 : -1}>
                          Започнете разговор
                          <ArrowUpRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
