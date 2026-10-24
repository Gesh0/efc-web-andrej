import type { ReactNode } from "react";
import Image from "next/image";
import Segment from "@/components/home/Segment";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { delay } from "@/components/motion/Words";

const RED = "#e31e1e";
const LINE = "1px solid rgba(20,20,26,.1)";

/* ------------------------------------------------------------ small visuals */

function Panel({ children }: { children: ReactNode }) {
  return <div style={{ borderRadius: 6, background: "#f5f3f2", padding: "clamp(16px,1.6vw,22px)", fontSize: 14 }}>{children}</div>;
}

function NoUpfront() {
  const rows = ["Закуп на магацин", "Полици и опрема", "Магацински персонал", "Фиксна месечна сума"];
  return (
    <Panel>
      {rows.map((r) => (
        <div key={r} style={{ padding: "9px 0", borderBottom: LINE, color: "rgba(20,20,26,.55)", textDecoration: "line-through", textDecorationColor: RED }}>
          {r}
        </div>
      ))}
      <div className="flex items-baseline justify-between" style={{ paddingTop: 14 }}>
        <span style={{ fontWeight: 600 }}>Почетен трошок</span>
        <span className="font-numeric" style={{ fontSize: 36, fontWeight: 600, lineHeight: 1, color: RED }}>
          0 <span style={{ fontSize: 16 }}>ден</span>
        </span>
      </div>
    </Panel>
  );
}

// share of capacity used per month — the seasonal curve the cost follows
const LOAD = [28, 26, 32, 38, 44, 52, 60, 58, 66, 80, 95, 72];
const MONTHS = ["Ј", "Ф", "М", "А", "М", "Ј", "Ј", "А", "С", "О", "Н", "Д"];

function PayPerUse() {
  return (
    <Panel>
      <div className="flex items-end" style={{ gap: 6, height: 120 }} aria-hidden="true">
        {LOAD.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center" style={{ gap: 6, height: "100%", justifyContent: "flex-end" }}>
            <span style={{ width: "100%", height: `${v}%`, borderRadius: 3, background: i === 10 ? RED : "rgba(227,30,30,.35)" }} />
            <span style={{ fontSize: 10.5, color: "rgba(20,20,26,.45)" }}>{MONTHS[i]}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between" style={{ marginTop: 12, fontSize: 13, color: "rgba(20,20,26,.6)" }}>
        <span>Тивок месец: плаќате помалку</span>
        <span>Сезона: повеќе</span>
      </div>
    </Panel>
  );
}

function Scale() {
  return (
    <Panel>
      <div className="flex items-baseline justify-between" style={{ fontWeight: 600, fontSize: 15 }}>
        <span>Првата нарачка</span>
        <span style={{ color: RED }}>Сезонски врв</span>
      </div>
      <div className="relative" style={{ height: 8, marginTop: 12, borderRadius: 99, background: "rgba(20,20,26,.08)" }}>
        <span className="absolute inset-y-0 left-0" style={{ width: "100%", borderRadius: 99, background: `linear-gradient(90deg, rgba(227,30,30,.25), ${RED})` }} />
      </div>
      <div style={{ marginTop: 12, fontSize: 13, color: "rgba(20,20,26,.6)" }}>Без минимум и без горна граница. Ист договор, без нов магацин.</div>
    </Panel>
  );
}

function Custody() {
  return (
    <Panel>
      <div className="flex" style={{ gap: 4, height: 34 }}>
        <span className="grid flex-4 place-items-center" style={{ borderRadius: 4, background: RED, color: "#fff", fontWeight: 600, fontSize: 13 }}>
          EFC одговара
        </span>
        <span className="grid flex-1 place-items-center" style={{ borderRadius: 4, background: "rgba(20,20,26,.1)", fontWeight: 600, fontSize: 13 }}>
          ELS
        </span>
      </div>
      <div className="flex justify-between" style={{ marginTop: 10, fontSize: 12.5, color: "rgba(20,20,26,.55)" }}>
        <span>Прием</span>
        <span>Предавање на курир</span>
      </div>
    </Panel>
  );
}

function StockTable() {
  const rows: [string, number, number][] = [
    ["Парфем 50 ml", 186, 78],
    ["Парфем 100 ml", 97, 42],
    ["Сет за подарок", 14, 10],
  ];
  return (
    <Panel>
      {rows.map(([name, qty, pct]) => (
        <div key={name} className="flex items-center justify-between" style={{ gap: 12, padding: "8px 0", borderBottom: LINE }}>
          <span>{name}</span>
          <span className="flex items-center" style={{ gap: 10 }}>
            <span style={{ width: 80, height: 6, borderRadius: 99, background: "rgba(20,20,26,.08)", overflow: "hidden" }}>
              <span style={{ display: "block", width: `${pct}%`, height: "100%", background: pct < 15 ? RED : "#14141a" }} />
            </span>
            <span className="font-numeric" style={{ minWidth: 28, textAlign: "right" }}>{qty}</span>
          </span>
        </div>
      ))}
    </Panel>
  );
}

/** What moves off the client's desk, and what stays on it. */
function HandOff() {
  const ours = ["Пакување", "Курири", "Залиха", "Враќања"];
  const yours = ["Продажба", "Маркетинг", "Купувачи"];
  const col = (title: string, items: string[], on: boolean) => (
    <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 8 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(20,20,26,.55)" }}>{title}</span>
      {items.map((t) => (
        <span
          key={t}
          style={{ padding: "8px 12px", borderRadius: 6, fontSize: 14, background: on ? RED : "#ffffff", color: on ? "#ffffff" : "#14141a", border: on ? "none" : LINE }}
        >
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <Panel>
      <div className="flex items-start" style={{ gap: 12 }}>
        {col("Преминува кај EFC", ours, false)}
        <span aria-hidden="true" style={{ alignSelf: "center", fontSize: 20, color: "rgba(20,20,26,.35)" }}>→</span>
        {col("Ви останува вам", yours, true)}
      </div>
    </Panel>
  );
}

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: 200, height: "100%", borderRadius: 6, background: "#101014" }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1100px) 100vw, 900px" className="object-cover" style={{ filter: "saturate(.8)" }} />
    </div>
  );
}

/* -------------------------------------------------------------- benefits */

type Benefit = { icon: MaterialName; title: string; body: string; visual: ReactNode; full?: boolean };

// row pattern: full · half half · half half · full · half half
const BENEFITS: Benefit[] = [
  { full: true, icon: "savings", title: "Нула трошоци однапред", body: "Без закуп на магацин, полици, опрема или вработување. Почнувате со стоката што веќе ја имате.", visual: <NoUpfront /> },
  { icon: "payments", title: "Плаќате колку што користите", body: "Нема фиксен месечен трошок. Во тивок месец плаќате помалку, во сезона повеќе.", visual: <PayPerUse /> },
  { icon: "trending_up", title: "Расте со вас", body: "Без минимум и без горна граница на нарачки. Истиот договор додека растете, а сезоната ја покриваме ние.", visual: <Scale /> },
  { icon: "verified_user", title: "Одговорноста е наша", body: "Од приемот до предавањето на курирот, ние одговараме за стоката.", visual: <Custody /> },
  { icon: "groups", title: "Нема кадар за водење", body: "Ние вработуваме, обучуваме и организираме смени. Вие не водите магацински тим.", visual: <Photo src="/assets/efc-pick-pack.jpg" alt="Тимот на EFC пакува нарачки" /> },
  { full: true, icon: "handshake", title: "Еден партнер за магацин и достава", body: "Спакуваните нарачки одат директно кај ELS. Нема чекање меѓу магацинот и курирот и нема дополнителен посредник.", visual: <Photo src="/assets/efc-van-dock.avif" alt="Пратки се товарат во возило за достава" /> },
  { icon: "visibility", title: "Увид во секој момент", body: "Залиха и статус на нарачките на веб, без да нè прашувате.", visual: <StockTable /> },
  { icon: "storefront", title: "Вие се фокусирате на продажбата", body: "Времето што одеше на пакување и курири сега оди на продавање.", visual: <HandOff /> },
];

/** Render-style bordered grid: rows of one full-width cell or two equal cells, each claim paired with its proof. */
export default function Benefits() {
  return (
    <Segment id="why" title="Што добивате кога логистиката е кај нас" intro="Сè што повеќе не плаќате, не водите и не ве загрижува.">
      <div data-reveal className="grid grid-cols-[minmax(0,1fr)] overflow-hidden lg:grid-cols-2" style={{ border: LINE, borderRadius: 6 }}>
        {BENEFITS.map((b, i) => {
          // a half cell is the left of its pair when an even number of half cells precede it
          const halvesBefore = BENEFITS.slice(0, i).filter((x) => !x.full).length;
          const left = !b.full && halvesBefore % 2 === 0;
          const lastRow = i >= BENEFITS.length - (BENEFITS[BENEFITS.length - 1].full ? 1 : 2);
          const head = (
            <div className="flex flex-col" style={{ gap: 12 }}>
              <span className="grid place-items-center" style={{ width: 40, height: 40, borderRadius: 8, background: "#f5f3f2", color: RED }}>
                <MaterialIcon name={b.icon} size={22} />
              </span>
              <h3 className="efc-display" style={{ fontSize: "clamp(20px,1.8vw,28px)", lineHeight: 1.12, color: "#101014" }}>
                {b.title}
              </h3>
              <p style={{ margin: 0, maxWidth: "48ch", fontSize: "clamp(14.5px,1.05vw,16px)", lineHeight: 1.6, color: "rgba(20,20,26,.68)", textWrap: "pretty" }}>{b.body}</p>
            </div>
          );
          return (
            <article
              key={b.title}
              className={[
                "efc-rise flex min-w-0 flex-col border-[rgba(20,20,26,.1)]",
                i < BENEFITS.length - 1 ? "border-b" : "",
                lastRow ? "lg:border-b-0" : "",
                left ? "lg:border-r" : "",
                b.full ? "lg:col-span-2 lg:grid lg:grid-cols-2 lg:items-center" : "",
              ].join(" ")}
              style={{ ...delay((i % 2) * 90), gap: "clamp(20px,2.4vw,40px)", padding: "clamp(22px,2.6vw,40px)" }}
            >
              {head}
              <div className={b.full ? "" : "mt-auto"} style={{ minHeight: b.full ? 220 : undefined }}>
                {b.visual}
              </div>
            </article>
          );
        })}
      </div>
    </Segment>
  );
}
