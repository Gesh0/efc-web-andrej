"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Segment from "@/components/home/Segment";
import { Card, Pill, Row } from "@/components/home/records";
import { EASE, PAD, RED, rule } from "@/components/home/frame";

type Step = { title: string; body: string; img: string; alt: string; record: ReactNode };

const STEPS: Step[] = [
  {
    title: "Прием",
    body: "Ја броиме и проверуваме стоката пред да влезе во залиха. Ако нешто не се совпаѓа со испратницата, тоа веднаш го гледате на нашата платформа.",
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
 * "Follow one order". Desktop: the steps run down the left cell while the right cell pins a
 * photo + record that follow the step at the reading line. Mobile: each step carries its own
 * photo + record inline.
 */
export default function SecurityTrail() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Segment id="security" label="Евиденција" title="Што се случува со вашата стока." lead="Следете една нарачка низ магацинот. Секој чекор остава запис што можете да го проверите.">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ol className="lg:border-r" style={{ margin: 0, padding: 0, listStyle: "none", borderColor: "rgba(20,20,26,.08)" }}>
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className="flex flex-col justify-center lg:min-h-[220px]"
                style={{ gap: 20, padding: `40px ${PAD}`, borderBottom: i < STEPS.length - 1 ? rule() : undefined }}
              >
                <div className="flex flex-col transition-opacity duration-500 lg:opacity-[var(--o)]" style={{ gap: 10, "--o": on ? 1 : 0.4 } as React.CSSProperties}>
                  <span className="font-numeric" style={{ fontSize: 12.5, fontWeight: 600, color: on ? RED : "#a1a1a8", transition: `color 300ms ${EASE}` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ margin: 0, fontSize: "clamp(20px,1.7vw,24px)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-.015em" }}>{s.title}</h3>
                  <p style={{ margin: 0, maxWidth: "50ch", fontSize: 15.5, lineHeight: 1.6, color: "rgba(20,20,26,.66)" }}>{s.body}</p>
                </div>
                {/* mobile: this step's photo + record, inline */}
                <div className="relative overflow-hidden lg:hidden" style={{ minHeight: 300, background: "#101014" }}>
                  <Image src={s.img} alt={s.alt} fill sizes="100vw" className="object-cover" style={{ filter: "saturate(.75) brightness(.8)" }} />
                  <div className="absolute" style={{ left: 12, right: 12, bottom: 12 }}>{s.record}</div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* desktop: one pinned photo that follows the active step */}
        <div className="hidden lg:block" style={{ padding: PAD }}>
          <div className="sticky overflow-hidden" style={{ top: 112, height: "min(72vh, 680px)", background: "#101014" }}>
            {STEPS.map((s, i) => (
              <Image
                key={s.img + i}
                src={s.img}
                alt={i === active ? s.alt : ""}
                fill
                sizes="(max-width: 1440px) 52vw, 760px"
                className="object-cover"
                style={{ filter: "saturate(.75) brightness(.8)", opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.04)", transition: `opacity 600ms ${EASE}, transform 900ms ${EASE}` }}
              />
            ))}
            <div key={active} className="absolute" style={{ left: 24, right: 24, bottom: 24, maxWidth: 440, animation: `efc-swap 480ms ${EASE}` }}>
              {STEPS[active].record}
            </div>
          </div>
        </div>
      </div>
    </Segment>
  );
}
