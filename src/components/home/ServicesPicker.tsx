"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Segment from "@/components/home/Segment";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { ArrowUpRight } from "@/components/icons";
import { Card, Pill, Row } from "@/components/home/records";
import { EASE, LINE, PAD, RED, rule } from "@/components/home/frame";

type StepKey = "import" | "in" | "sort" | "store" | "pack" | "fiscal" | "ship" | "return";

/** The parts of the centre, in the order goods move through it. */
const STEPS: { key: StepKey; label: string; icon: MaterialName }[] = [
  { key: "import", label: "Увоз", icon: "flight_land" },
  { key: "in", label: "Прием", icon: "move_to_inbox" },
  { key: "sort", label: "Сортирање", icon: "alt_route" },
  { key: "store", label: "Складирање", icon: "shelves" },
  { key: "pack", label: "Пакување", icon: "package_2" },
  { key: "fiscal", label: "Фискализација", icon: "receipt_long" },
  { key: "ship", label: "Испорака", icon: "local_shipping" },
  { key: "return", label: "Враќање", icon: "assignment_return" },
];

type Service = {
  name: string;
  quote: string;
  uses: StepKey[];
  lead: string;
  points: string[];
  img: string;
  alt: string;
  record: ReactNode;
};

const SERVICES: Service[] = [
  {
    name: "Целосен фулфилмент",
    quote: "„Сакам сè да биде решено“",
    uses: ["in", "store", "pack", "fiscal", "ship", "return"],
    lead: "Ја примаме стоката, ја чуваме, ја пакуваме под камера и ја предаваме на ELS. Купувачот ја добива следниот ден. Вие само продавате.",
    points: ["Пакување под камера", "Фискална сметка", "Достава следниот ден", "Залиха на веб"],
    img: "/assets/efc-pick-pack.jpg",
    alt: "Пакување нарачка во EFC",
    record: (
      <Card title="Нарачка 20418" meta={<Pill>Испратено</Pill>}>
        <Row label="Примено" value="09:14" />
        <Row label="Спакувано · Станица 03" value="14:32" />
        <Row label="Фискална ФС-88213" value="✓" />
        <Row label="Предадено на ELS" value="15:10" />
      </Card>
    ),
  },
  {
    name: "Сортирање и поделба",
    quote: "„Стоката треба да се подели“",
    uses: ["import", "in", "sort", "ship"],
    lead: "Стоката пристигнува, ја распределуваме по артикли, продавници или дестинации и заминува, без долго складирање.",
    points: ["Рампа за шлепер", "Царински склад до нас", "Поделба по ваша листа"],
    img: "/assets/services-details.webp",
    alt: "Камиони на рампите",
    record: (
      <Card title="Поделба П-1120" meta="3 дестинации">
        <Row label="Скопје · 4 палети" value={<Pill>готово</Pill>} />
        <Row label="Битола · 2 палети" value={<Pill>готово</Pill>} />
        <Row label="Охрид · 1 палета" value={<Pill tone="warn">во тек</Pill>} />
      </Card>
    ),
  },
  {
    name: "Складирање",
    quote: "„Ми треба само простор“",
    uses: ["in", "store"],
    lead: "Простор и евиденција, без пакување. Стоката е изброена, проверена и има своја локација.",
    points: ["Палетно или по артикл", "Увид во залиха на веб", "Обезбеден 24/7"],
    img: "/assets/factory.webp",
    alt: "Палетни регали",
    record: (
      <Card title="Залиха" meta="пред 2 мин">
        <Row label="Регал B · Полица 14" value={<b>186</b>} />
        <Row label="Регал C · Полица 02" value={<b>97</b>} />
        <Row label="Регал A · Полица 07" value={<Pill tone="warn">14 · ниско</Pill>} />
      </Card>
    ),
  },
  {
    name: "Фискализација",
    quote: "„Само помошни услуги“",
    uses: ["fiscal"],
    lead: "Фискални сметки, декларации на македонски и другите помошни работи околу пратката.",
    points: ["Фискални сметки", "Декларации", "Етикетирање"],
    img: "/assets/efc-packing-station.jpg",
    alt: "Станица за пакување и етикетирање",
    record: (
      <Card title="Фискална сметка ФС-88213" meta={<Pill>издадена</Pill>}>
        <Row label="Парфем 50 ml × 1" value="1.890" />
        <Row label="Декларација МК" value={<Pill>залепена</Pill>} />
      </Card>
    ),
  },
  {
    name: "Палетно (B2B)",
    quote: "„Палети до продавници“",
    uses: ["in", "store", "ship"],
    lead: "Примаме, чуваме и испраќаме цели палети до продавници, синџири и дистрибутери.",
    points: ["Прием од шлепер", "Палетно складирање", "Испорака на палети"],
    img: "/assets/containerpackages.avif",
    alt: "Палети во магацинот",
    record: (
      <Card title="Испорака Б2Б-044" meta="Маркет ДООЕЛ">
        <Row label="Палети" value={<b>6</b>} />
        <Row label="Тргнува" value="Утре · 08:00" />
      </Card>
    ),
  },
  {
    name: "Повратни пратки",
    quote: "„Вратени пакети“",
    uses: ["return", "store"],
    lead: "Ги отвораме под камера. Неоштетеното се враќа во залиха, а за секој поврат имате запис.",
    points: ["Снимка за секој поврат", "Назад во залиха", "Евиденција"],
    img: "/assets/efc-van-dock.avif",
    alt: "Пратки на рампата",
    record: (
      <Card title="Поврат В-311" meta={<Pill tone="warn">REC</Pill>}>
        <Row label="Парфем 50 ml" value={<Pill>во залиха</Pill>} />
        <Row label="Кутија" value={<Pill tone="warn">оштетена</Pill>} />
        <Row label="Причина" value="откажано" />
      </Card>
    ),
  },
];

/**
 * Attio-style: a sticky index on the left, the services stacked on the right under a sticky
 * process strip. Whichever block sits at the reading line drives both the index and the strip.
 */
export default function ServicesPicker() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const uses = SERVICES[active].uses;

  useEffect(() => {
    // active = the last block whose top has passed the reading line (45% down); the first one before that
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let idx = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Segment
      id="solutions"
      title="Цел логистички центар зад вашата продавница."
      lead="Простор, рампа, тим, опрема и систем за евиденција. Од нив ги составуваме услугите што ви требаат, и оние што не се на листата."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
        {/* index */}
        <nav aria-label="Услуги" className="hidden lg:block" style={{ borderRight: rule(), padding: `${PAD} 24px ${PAD} ${PAD}` }}>
          <ul className="sticky flex flex-col" style={{ top: "calc(var(--nav-h, 64px) + 48px)", transition: "top 360ms cubic-bezier(.23,1,.32,1)", gap: 4, margin: 0, padding: 0, listStyle: "none" }}>
            {SERVICES.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={on ? "true" : undefined}
                    className="flex w-full cursor-pointer flex-col items-start text-left"
                    style={{ padding: "8px 0 8px 14px", border: 0, borderLeft: `2px solid ${on ? RED : LINE}`, background: "transparent", fontFamily: "inherit", transition: `border-color 240ms ${EASE}` }}
                  >
                    <span style={{ fontSize: 15, fontWeight: on ? 600 : 500, color: on ? "#14141a" : "#a1a1a8", transition: `color 240ms ${EASE}` }}>{s.name}</span>
                    <span style={{ fontSize: 12.5, color: "#a1a1a8" }}>{s.quote}</span>
                  </button>
                </li>
              );
            })}
            <li style={{ marginTop: 24 }}>
              <Link href="/services" className="efc-link inline-flex items-center" style={{ gap: 6, fontSize: 14, color: "#14141a" }}>
                <span style={{ color: "rgba(20,20,26,.6)" }}>Нешто друго?</span>
                <b>Сите услуги</b>
                <ArrowUpRight size={13} />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="min-w-0">
          {/* process strip: stays in view and follows the active service */}
          <div className="sticky" style={{ top: "var(--nav-h, 64px)", transition: "top 360ms cubic-bezier(.23,1,.32,1)", zIndex: 4, background: "rgba(255,255,255,.96)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", borderBottom: rule(), padding: `20px ${PAD}` }}>
            <div className="flex items-baseline justify-between" style={{ gap: 12, marginBottom: 16, fontSize: 13, color: "rgba(20,20,26,.6)" }}>
              <span>
                Делови од центарот што ги користи: <b style={{ color: "#14141a" }}>{SERVICES[active].name}</b>
              </span>
              <span className="font-numeric">
                {uses.length} / {STEPS.length}
              </span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <ol className="relative flex justify-between" style={{ minWidth: 560, margin: 0, padding: 0, listStyle: "none", gap: 6 }}>
                <span aria-hidden="true" className="absolute" style={{ left: 28, right: 28, top: 20, height: 1, background: "rgba(20,20,26,.12)" }} />
                {STEPS.map((s) => {
                  const on = uses.includes(s.key);
                  return (
                    <li key={s.key} className="relative flex flex-col items-center text-center" style={{ gap: 8, width: 64 }}>
                      <span
                        className="grid place-items-center"
                        style={{
                          width: 40,
                          height: 40,
                          border: `1px solid ${on ? RED : "rgba(20,20,26,.14)"}`,
                          background: on ? RED : "#ffffff",
                          color: on ? "#ffffff" : "rgba(20,20,26,.4)",
                          transition: `background-color 260ms ${EASE}, border-color 260ms ${EASE}, color 260ms ${EASE}`,
                        }}
                      >
                        <MaterialIcon name={s.icon} size={20} />
                      </span>
                      <span style={{ fontSize: 12, fontWeight: on ? 600 : 400, color: on ? "#14141a" : "#a1a1a8", transition: `color 260ms ${EASE}` }}>{s.label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {SERVICES.map((s, i) => (
            <article
              key={s.name}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              style={{ borderBottom: i < SERVICES.length - 1 ? rule() : undefined, scrollMarginTop: 200 }}
            >
              <div className="flex flex-col" style={{ gap: 16, maxWidth: 760, padding: `${PAD} ${PAD} 28px` }}>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, lineHeight: 1.35, letterSpacing: "-.015em" }}>
                  {s.name}. <span style={{ color: "#a1a1a8" }}>{s.lead}</span>
                </h3>
                <ul className="flex flex-wrap" style={{ gap: "8px 24px", margin: 0, padding: 0, listStyle: "none", fontSize: 14.5 }}>
                  {s.points.map((p) => (
                    <li key={p} className="flex items-baseline" style={{ gap: 6 }}>
                      <span aria-hidden="true" style={{ color: RED, fontWeight: 700 }}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {/* stage: photo and record swap sides from block to block */}
              <div className="grid grid-cols-1 items-center md:grid-cols-2" style={{ gap: 24, padding: PAD, borderTop: rule(), background: "#f7f7f8" }}>
                <div className={`relative overflow-hidden ${i % 2 ? "md:order-2" : ""}`} style={{ aspectRatio: "4 / 3", background: "#101014" }}>
                  <Image src={s.img} alt={s.alt} fill sizes="(max-width: 768px) 100vw, 480px" className="object-cover" style={{ filter: "saturate(.85)" }} />
                </div>
                <div className={i % 2 ? "md:order-1" : ""}>{s.record}</div>
              </div>
            </article>
          ))}

          <div className="lg:hidden" style={{ padding: PAD, borderTop: rule() }}>
            <Link href="/services" className="efc-link inline-flex items-center" style={{ gap: 6, fontSize: 15, color: "#14141a" }}>
              <span style={{ color: "rgba(20,20,26,.6)" }}>Нешто друго?</span>
              <b>Сите услуги</b>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </Segment>
  );
}
