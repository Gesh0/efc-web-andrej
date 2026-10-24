"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Segment from "@/components/home/Segment";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";

const EASE = "cubic-bezier(.23,1,.32,1)";
const RED = "#e31e1e";
const GREEN = "#1f9d55";

/* ------------------------------------------------------------ record cards */

function Card({ icon, title, meta, children }: { icon: MaterialName; title: string; meta?: string; children: ReactNode }) {
  return (
    <div style={{ borderRadius: 6, background: "#ffffff", color: "#14141a", boxShadow: "0 24px 50px -28px rgba(10,10,14,.6)", overflow: "hidden", fontSize: 14 }}>
      <div className="flex items-center justify-between" style={{ gap: 12, padding: "12px 16px", borderBottom: "1px solid rgba(20,20,26,.08)" }}>
        <span className="inline-flex items-center" style={{ gap: 8, fontWeight: 600 }}>
          <span style={{ color: RED, display: "inline-flex" }}>
            <MaterialIcon name={icon} size={18} />
          </span>
          {title}
        </span>
        {meta && <span className="font-numeric" style={{ fontSize: 12.5, color: "rgba(20,20,26,.5)" }}>{meta}</span>}
      </div>
      <div style={{ padding: "4px 16px" }}>{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between" style={{ gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(20,20,26,.06)" }}>
      <span>{label}</span>
      <span className="font-numeric inline-flex items-center" style={{ gap: 8, whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
}

function Pill({ tone = "ok", children }: { tone?: "ok" | "warn" | "muted"; children: ReactNode }) {
  const c = tone === "ok" ? GREEN : tone === "warn" ? RED : "rgba(20,20,26,.55)";
  const bg = tone === "ok" ? "rgba(31,157,85,.1)" : tone === "warn" ? "rgba(227,30,30,.09)" : "rgba(20,20,26,.06)";
  return <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 9px", borderRadius: 999, color: c, background: bg, fontFamily: "var(--font-sans)" }}>{children}</span>;
}

/* ------------------------------------------------------------------ steps */

type Step = { title: string; body: string; img: string; alt: string; record: ReactNode };

const STEPS: Step[] = [
  {
    title: "Прием",
    body: "Ја броиме и проверуваме стоката пред да влезе во залиха. Ако нешто не се совпаѓа со испратницата, ве известуваме.",
    img: "/assets/services-details.webp",
    alt: "Камиони на рампите за прием",
    record: (
      <Card icon="move_to_inbox" title="Прием П-0912" meta="24.10 · 09:14">
        <Row label="Парфем 50 ml" value={<>240 / 240 <Pill>✓</Pill></>} />
        <Row label="Парфем 100 ml" value={<>118 / 120 <Pill tone="warn">−2 пријавено</Pill></>} />
        <Row label="Оштетени при транспорт" value="0" />
      </Card>
    ),
  },
  {
    title: "Евиденција",
    body: "Секој артикл добива своја локација во системот. Залихата и статусот на нарачките ги гледате на веб, во секој момент.",
    img: "/assets/factory.webp",
    alt: "Палетни регали во магацинот",
    record: (
      <Card icon="inventory_2" title="Парфем 50 ml" meta="пред 2 мин">
        <Row label="Локација" value="Регал B · Полица 14" />
        <Row label="На залиха" value="186 ком" />
        <Row label="Резервирано за нарачки" value="12 ком" />
      </Card>
    ),
  },
  {
    title: "Пакување под камера",
    body: "Над секоја станица за пакување има камера. Секоја нарачка е снимена, па ако купувач рекламира, ја имаме снимката.",
    img: "/assets/efc-packing-station.jpg",
    alt: "Станица за пакување во EFC",
    record: (
      <Card icon="videocam" title="Станица 03" meta="14:32:07">
        <Row label={<span className="inline-flex items-center" style={{ gap: 8 }}><span className="efc-rec" />Снимање</span>} value="Нарачка 20418" />
        <Row label="Артикли во пакетот" value="2 / 2 ✓" />
        <Row label="Снимката се чува" value="[?] дена" />
      </Card>
    ),
  },
  {
    title: "Одговорност",
    body: "Од моментот кога ја примаме, па сè до предавањето на курирот, одговорноста за стоката е наша.",
    img: "/assets/efc-van-dock.avif",
    alt: "Предавање пратки на возило за достава",
    record: (
      <Card icon="verified_user" title="Нарачка 20418">
        <Row label="Примено во магацин" value={<Pill>EFC</Pill>} />
        <Row label="Складирано · B-14" value={<Pill>EFC</Pill>} />
        <Row label="Спакувано под камера" value={<Pill>EFC</Pill>} />
        <Row label="Предадено на курир" value={<Pill tone="muted">ELS</Pill>} />
      </Card>
    ),
  },
  {
    title: "Вратени пратки",
    body: "Вратените пакети ги отвораме под камера. Неоштетеното се враќа во залиха, а за секој поврат имате запис.",
    img: "/assets/efc-pick-pack.jpg",
    alt: "Отворање вратен пакет",
    record: (
      <Card icon="assignment_return" title="Поврат В-311" meta="снимено">
        <Row label="Парфем 50 ml" value={<Pill>во залиха</Pill>} />
        <Row label="Кутија оштетена" value={<Pill tone="warn">пријавено</Pill>} />
        <Row label="Причина" value="Купувачот се откажа" />
      </Card>
    ),
  },
];

/**
 * "Follow one order". Desktop: steps scroll on the left while a pinned panel on the right
 * swaps photo + record for the step at the reading line. Mobile: each step carries its own
 * photo + record inline, so the same story reads top to bottom.
 */
export default function SecurityTrail() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Segment
      id="security"
      title="Што се случува со вашата стока"
      intro="Следете една нарачка низ магацинот. Секој чекор остава запис што можете да го проверите."
    >
      <div className="grid grid-cols-[minmax(0,1fr)] items-start lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" style={{ gap: "clamp(20px,3vw,56px)" }}>
        <ol className="flex min-w-0 flex-col" style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid rgba(20,20,26,.1)" }}>
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className="flex flex-col lg:min-h-[30vh] lg:justify-center"
                style={{ gap: 18, padding: "clamp(22px,2.4vw,36px) 0", borderBottom: "1px solid rgba(20,20,26,.1)" }}
              >
                <div
                  className="grid transition-opacity duration-500 lg:opacity-[var(--o)]"
                  style={{ "--o": on ? 1 : 0.35, gridTemplateColumns: "40px minmax(0,1fr)", columnGap: 16, rowGap: 6 } as React.CSSProperties}
                >
                  <span
                    className="font-numeric grid place-items-center"
                    style={{
                      gridRow: "span 2",
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      background: on ? RED : "#f5f3f2",
                      color: on ? "#ffffff" : "rgba(20,20,26,.6)",
                      transition: `background-color 320ms ${EASE}, color 320ms ${EASE}`,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ margin: 0, fontSize: "clamp(20px,1.7vw,26px)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-.015em" }}>{s.title}</h3>
                  <p style={{ margin: 0, maxWidth: "52ch", fontSize: "clamp(15px,1.1vw,17px)", lineHeight: 1.6, color: "rgba(20,20,26,.68)", textWrap: "pretty" }}>{s.body}</p>
                </div>

                {/* mobile: this step's photo + record, inline */}
                <div className="relative overflow-hidden lg:hidden" style={{ minHeight: 300, borderRadius: 6, background: "#101014" }}>
                  <Image src={s.img} alt={s.alt} fill sizes="100vw" className="object-cover" style={{ filter: "saturate(.75) brightness(.8)" }} />
                  <div className="absolute" style={{ left: 12, right: 12, bottom: 12 }}>{s.record}</div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* desktop: one pinned panel that follows the active step */}
        <div className="sticky hidden overflow-hidden lg:block" style={{ top: 120, height: "min(72vh, 680px)", borderRadius: 6, background: "#101014" }}>
          {STEPS.map((s, i) => (
            <Image
              key={s.img}
              src={s.img}
              alt={i === active ? s.alt : ""}
              fill
              sizes="(max-width: 1920px) 52vw, 1000px"
              className="object-cover"
              style={{ filter: "saturate(.75) brightness(.78)", opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.04)", transition: `opacity 600ms ${EASE}, transform 900ms ${EASE}` }}
            />
          ))}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,14,0) 45%, rgba(10,10,14,.45) 100%)" }} />
          <div key={active} className="absolute" style={{ left: 24, right: 24, bottom: 24, maxWidth: 440, animation: `efc-swap 480ms ${EASE}` }}>
            {STEPS[active].record}
          </div>
        </div>
      </div>
    </Segment>
  );
}
