"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { delay } from "@/components/motion/Words";
import Segment from "@/components/home/Segment";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { ArrowUpRight } from "@/components/icons";

const EASE = "cubic-bezier(.23,1,.32,1)";
const RED = "#e31e1e";

type StepKey = "import" | "in" | "store" | "sort" | "pack" | "fiscal" | "ship" | "return";

/** The parts of the centre a request can use, in the order goods move through it. */
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

type Request = { name: string; quote: string; uses: StepKey[]; title: string; body: string; points: string[] };

const REQUESTS: Request[] = [
  {
    name: "Целосен фулфилмент",
    quote: "„Сакам сè да биде решено“",
    uses: ["in", "store", "pack", "fiscal", "ship", "return"],
    title: "Ние ја водиме целата логистика",
    body: "Ја примаме вашата стока, ја чуваме, ја пакуваме под камера и ја предаваме на ELS. Купувачот ја добива следниот ден. Вие само продавате.",
    points: ["Пакување под камера", "Достава следниот ден преку ELS", "Залиха и нарачки на веб"],
  },
  {
    name: "Сортирање и поделба на роба",
    quote: "„Стоката треба да се подели“",
    uses: ["import", "in", "sort", "ship"],
    title: "Пристигнува, се дели и заминува",
    body: "Стоката што пристигнува ја распределуваме по артикли, продавници или дестинации и ја испраќаме понатаму, без долго складирање.",
    points: ["Рампа за камион-шлепер", "Јавен царински склад до нас", "Поделба според ваша листа"],
  },
  {
    name: "Складирање",
    quote: "„Ми треба само простор“",
    uses: ["in", "store"],
    title: "Простор и евиденција, без пакување",
    body: "Вашата стока стои кај нас, изброена, проверена и евидентирана. Ја подигате или ја испраќаме кога ќе ви треба.",
    points: ["Палетно или по артикл", "Увид во залихата на веб", "Обезбеден објект 24/7"],
  },
  {
    name: "Фискализација и декларации",
    quote: "„Ми требаат само помошните услуги“",
    uses: ["fiscal"],
    title: "Помошните работи околу пратката",
    body: "Издаваме фискални сметки, лепиме декларации и етикети и ги правиме другите ситни работи што ви одземаат време.",
    points: ["Фискални сметки", "Декларации на македонски", "Етикетирање и препакување"],
  },
  {
    name: "Палетно работење (B2B)",
    quote: "„Испраќам палети до продавници“",
    uses: ["in", "store", "ship"],
    title: "Цели палети, до вашите B2B клиенти",
    body: "Примаме, чуваме и испраќаме цели палети до продавници, синџири и дистрибутери.",
    points: ["Прием од шлепер", "Палетно складирање", "Испорака на палети"],
  },
  {
    name: "Повратни пратки",
    quote: "„Што правам со вратените пакети?“",
    uses: ["return", "store"],
    title: "Повратите, проверени под камера",
    body: "Вратените пакети ги отвораме под камера. Неоштетените артикли се враќаат во залиха, а вие добивате евиденција за секој поврат.",
    points: ["Снимка за секое отворање", "Враќање во залиха", "Евиденција зошто е вратено"],
  },
];

/** Process strip + copy for the picked request. Shared by the desktop side panel and the mobile inline panel. */
function Detail({ req, active }: { req: Request; active: number }) {
  return (
    <>
      <div style={{ overflowX: "auto", margin: "0 -4px", padding: "0 4px" }}>
        <ol className="relative flex justify-between" style={{ minWidth: 640, margin: 0, padding: 0, listStyle: "none", gap: 8 }}>
          {/* rail runs from the first icon's centre to the last one's */}
          <span aria-hidden="true" className="absolute" style={{ left: 36, right: 36, top: 23, height: 2, background: "rgba(20,20,26,.1)" }} />
          {STEPS.map((s) => {
            const on = req.uses.includes(s.key);
            return (
              <li key={s.key} className="relative flex flex-col items-center text-center" style={{ gap: 10, width: 72 }}>
                <span
                  className="grid place-items-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    border: `1px solid ${on ? RED : "rgba(20,20,26,.14)"}`,
                    background: on ? RED : "#ffffff",
                    color: on ? "#ffffff" : "rgba(20,20,26,.45)",
                    boxShadow: on ? "0 10px 24px -12px rgba(227,30,30,.8)" : "none",
                    transition: `background-color 320ms ${EASE}, border-color 320ms ${EASE}, color 320ms ${EASE}, box-shadow 320ms ${EASE}`,
                  }}
                >
                  <MaterialIcon name={s.icon} size={22} />
                </span>
                <span style={{ fontSize: 13, fontWeight: on ? 500 : 400, color: on ? "#14141a" : "rgba(20,20,26,.5)", transition: `color 320ms ${EASE}` }}>
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div key={active} className="flex flex-1 flex-col" style={{ gap: "clamp(20px,2.4vw,32px)", animation: `efc-swap 420ms ${EASE}` }}>
        <div className="flex flex-col" style={{ gap: 12 }}>
          <h3 className="efc-display" style={{ fontSize: "clamp(22px,2vw,30px)", lineHeight: 1.1, color: "#101014" }}>
            {req.title}
          </h3>
          <p style={{ margin: 0, maxWidth: "62ch", fontSize: "clamp(15px,1.1vw,16.5px)", lineHeight: 1.6, color: "rgba(20,20,26,.7)", textWrap: "pretty" }}>
            {req.body}
          </p>
        </div>
        {/* points sit on the panel floor so the panel never shows an empty block */}
        <ul
          className="grid"
          style={{ marginTop: "auto", padding: 0, listStyle: "none", gap: 8, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))" }}
        >
          {req.points.map((p) => (
            <li
              key={p}
              className="flex items-start"
              style={{ gap: 10, padding: "14px 16px", borderRadius: 6, background: "#ffffff", fontSize: 15, lineHeight: 1.4, color: "#14141a" }}
            >
              <span aria-hidden="true" style={{ color: RED, fontWeight: 700 }}>✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** Client requests on the left; the right panel lights the parts of the centre that handle the picked one. */
export default function ServicesPicker() {
  const [active, setActive] = useState(0);
  const req = REQUESTS[active];

  return (
    <Segment
      id="solutions"
      title="Цел логистички центар зад вашата продавница"
      intro="Простор, рампа, тим, опрема и систем за евиденција. Од нив ги составуваме услугите што вам ви требаат, вклучително и оние што не се на листата."
    >
        <div
          data-reveal
          className="efc-rise grid grid-cols-[minmax(0,1fr)] items-start lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]"
          style={{ ...delay(260), gap: "clamp(12px,1.4vw,20px)" }}
        >
          {/* requests */}
          <div className="flex min-w-0 flex-col" role="group" aria-label="Изберете што ви треба" style={{ gap: 8 }}>
            {REQUESTS.map((r, i) => {
              const on = i === active;
              return (
                <Fragment key={r.name}>
                  <button
                    type="button"
                    aria-pressed={on}
                    aria-controls="solutions-panel"
                    onClick={() => setActive(i)}
                    className="efc-press flex cursor-pointer items-center justify-between text-left"
                    style={{
                      gap: 16,
                      padding: "13px 18px",
                      borderRadius: 6,
                      border: `1px solid ${on ? "#101014" : "rgba(20,20,26,.12)"}`,
                      background: on ? "#101014" : "#ffffff",
                      color: on ? "#ffffff" : "#14141a",
                      fontFamily: "inherit",
                      transition: `background-color 260ms ${EASE}, color 260ms ${EASE}, border-color 260ms ${EASE}`,
                    }}
                  >
                    <span className="flex min-w-0 flex-col" style={{ gap: 2 }}>
                      <span style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3 }}>{r.name}</span>
                      <span style={{ fontSize: 13.5, lineHeight: 1.35, color: on ? "rgba(255,255,255,.62)" : "rgba(20,20,26,.52)" }}>{r.quote}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      style={{ flex: "none", width: 8, height: 8, borderRadius: "50%", background: on ? RED : "rgba(20,20,26,.16)", transition: `background-color 260ms ${EASE}` }}
                    />
                  </button>
                  {on && (
                    <div className="flex min-w-0 flex-col lg:hidden" style={{ gap: 24, padding: 20, borderRadius: 6, background: "#f5f3f2" }}>
                      <Detail req={r} active={i} />
                    </div>
                  )}
                </Fragment>
              );
            })}
            <Link href="/services" className="efc-link inline-flex flex-wrap items-baseline self-start" style={{ gap: "4px 8px", marginTop: 10, fontSize: 15, color: "#14141a" }}>
              <span style={{ color: "rgba(20,20,26,.6)" }}>Нешто друго?</span>
              <span className="inline-flex items-center" style={{ gap: 6, fontWeight: 600 }}>
                Погледнете ги сите услуги
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>

          {/* the centre */}
          <div
            id="solutions-panel"
            aria-live="polite"
            className="hidden min-w-0 flex-col lg:flex"
            style={{ gap: "clamp(24px,3vw,40px)", padding: "clamp(20px,2.6vw,40px)", borderRadius: 6, background: "#f5f3f2", alignSelf: "stretch" }}
          >
            <Detail req={req} active={active} />
          </div>
        </div>
    </Segment>
  );
}
