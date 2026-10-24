import type { ReactNode } from "react";
import Image from "next/image";
import Segment from "@/components/home/Segment";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { delay } from "@/components/motion/Words";
import { Card, Pill, Row } from "@/components/home/records";
import { LINE, PAD, RED, rule } from "@/components/home/frame";

/* ------------------------------------------------------------------ visuals
   Attio-style: a light stage that runs to the cell edges, holding one crisp UI record. */

const strike = (t: string) => <span style={{ textDecoration: "line-through", textDecorationColor: RED, color: "rgba(20,20,26,.5)" }}>{t}</span>;

function NoUpfront() {
  return (
    <Card title="Почетни трошоци">
      <Row label={strike("Закуп на магацин")} value="—" />
      <Row label={strike("Полици и опрема")} value="—" />
      <Row label={strike("Магацински персонал")} value="—" />
      <Row label={strike("Фиксна месечна сума")} value="—" />
      <Row label={<b>Вкупно</b>} value={<b style={{ color: RED, fontSize: 18 }}>0 ден</b>} />
    </Card>
  );
}

// share of capacity used per month — the seasonal curve the cost follows
const LOAD = [28, 26, 32, 38, 44, 52, 60, 58, 66, 80, 95, 72];
const MONTHS = ["Ј", "Ф", "М", "А", "М", "Ј", "Ј", "А", "С", "О", "Н", "Д"];

function PayPerUse() {
  return (
    <Card title="Трошок по месец" meta="2026">
      <div className="flex items-end" style={{ gap: 6, height: 132, padding: "16px 16px 0" }} aria-hidden="true">
        {LOAD.map((v, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end" style={{ gap: 6 }}>
            <span style={{ width: "100%", height: `${v}%`, background: i === 10 ? RED : "rgba(20,20,26,.14)" }} />
            <span style={{ fontSize: 10.5, color: "rgba(20,20,26,.45)" }}>{MONTHS[i]}</span>
          </div>
        ))}
      </div>
      <Row label="Тивок месец" value="плаќате помалку" />
    </Card>
  );
}

function Scale() {
  const rows: [string, string, number][] = [
    ["Јануари", "120", 12],
    ["Јуни", "480", 46],
    ["Ноември", "1.040", 100],
  ];
  return (
    <Card title="Нарачки по месец" meta={<Pill>ист договор</Pill>}>
      {rows.map(([m, n, pct]) => (
        <div key={m} style={{ padding: "10px 16px", borderBottom: rule() }}>
          <div className="flex justify-between" style={{ fontSize: 14, marginBottom: 8 }}>
            <span>{m}</span>
            <b className="font-numeric">{n}</b>
          </div>
          <div style={{ height: 4, background: "rgba(20,20,26,.06)" }}>
            <span style={{ display: "block", width: `${pct}%`, height: "100%", background: pct === 100 ? RED : "rgba(20,20,26,.3)" }} />
          </div>
        </div>
      ))}
    </Card>
  );
}

function Custody() {
  return (
    <Card title="Нарачка 20418" meta="одговорност">
      <Row label="Примено во магацин" value={<Pill>EFC</Pill>} />
      <Row label="Складирано · B-14" value={<Pill>EFC</Pill>} />
      <Row label="Спакувано под камера" value={<Pill>EFC</Pill>} />
      <Row label="Предадено на курир" value={<Pill tone="muted">ELS</Pill>} />
    </Card>
  );
}

function StockTable() {
  return (
    <Card title="Залиха" meta="пред 2 мин">
      <Row label="Парфем 50 ml" value={<b>186</b>} />
      <Row label="Парфем 100 ml" value={<b>97</b>} />
      <Row label="Сет за подарок" value={<Pill tone="warn">14 · ниско</Pill>} />
    </Card>
  );
}

function HandOff() {
  return (
    <Card title="Кој што прави">
      <Row label="Пакување и фискализација" value={<Pill tone="muted">EFC</Pill>} />
      <Row label="Залиха и враќања" value={<Pill tone="muted">EFC</Pill>} />
      <Row label="Достава" value={<Pill tone="muted">ELS</Pill>} />
      <Row label={<b>Продажба и маркетинг</b>} value={<Pill tone="warn">Вие</Pill>} />
    </Card>
  );
}

/** Light stage behind a record: a faint dot grid, the record centred in it. */
function Stage({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid h-full place-items-center"
      style={{ padding: PAD, background: "#f7f7f8", backgroundImage: "radial-gradient(rgba(20,20,26,.09) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
    >
      <div style={{ width: "min(100%, 420px)" }}>{children}</div>
    </div>
  );
}

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full overflow-hidden" style={{ minHeight: 280, background: "#101014" }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" style={{ filter: "saturate(.85)" }} />
    </div>
  );
}

/* ----------------------------------------------------------------- benefits */

type Benefit = { icon: MaterialName; title: string; body: string; visual: ReactNode; photo?: boolean; full?: boolean };

// row pattern: full · half half · half half · full · half half
const BENEFITS: Benefit[] = [
  { full: true, icon: "savings", title: "Нула трошоци однапред", body: "Без закуп на магацин, полици, опрема или вработување. Почнувате со стоката што веќе ја имате.", visual: <NoUpfront /> },
  { icon: "payments", title: "Плаќате колку што користите", body: "Нема фиксен месечен трошок. Во тивок месец плаќате помалку, во сезона повеќе.", visual: <PayPerUse /> },
  { icon: "trending_up", title: "Расте со вас", body: "Без минимум и без горна граница на нарачки. Истиот договор додека растете, а сезоната ја покриваме ние.", visual: <Scale /> },
  { icon: "verified_user", title: "Одговорноста е наша", body: "Од приемот до предавањето на курирот, ние одговараме за стоката.", visual: <Custody /> },
  { icon: "groups", title: "Нема кадар за водење", body: "Ние вработуваме, обучуваме и организираме смени. Вие не водите магацински тим.", photo: true, visual: <Photo src="/assets/efc-pick-pack.jpg" alt="Тимот на EFC пакува нарачки" /> },
  { full: true, icon: "handshake", title: "Еден партнер за магацин и достава", body: "Спакуваните нарачки одат директно кај ELS. Нема чекање меѓу магацинот и курирот и нема дополнителен посредник.", photo: true, visual: <Photo src="/assets/efc-van-dock.avif" alt="Пратки се товарат во возило за достава" /> },
  { icon: "visibility", title: "Увид во секој момент", body: "Залиха и статус на нарачките на веб, без да нè прашувате.", visual: <StockTable /> },
  { icon: "storefront", title: "Вие се фокусирате на продажбата", body: "Времето што одеше на пакување и курири сега оди на продавање.", visual: <HandOff /> },
];

/**
 * Bordered grid rail to rail. Each cell: the claim on top, its proof below on a stage that
 * runs to the cell edges (full-width rows put the stage on the right half instead).
 */
export default function Benefits() {
  return (
    <Segment id="why" title="Што добивате кога логистиката е кај нас." lead="Сè што повеќе не плаќате, не водите и не ве загрижува.">
      <div data-reveal className="grid grid-cols-1 lg:grid-cols-2">
        {BENEFITS.map((b, i) => {
          // a half cell is the left of its pair when an even number of half cells precede it
          const halvesBefore = BENEFITS.slice(0, i).filter((x) => !x.full).length;
          const left = !b.full && halvesBefore % 2 === 0;
          const lastRow = i >= BENEFITS.length - (BENEFITS[BENEFITS.length - 1].full ? 1 : 2);
          const visual = b.photo ? b.visual : <Stage>{b.visual}</Stage>;
          return (
            <article
              key={b.title}
              className={[
                "efc-rise grid min-w-0 border-[rgba(20,20,26,.08)]",
                i < BENEFITS.length - 1 ? "border-b" : "",
                lastRow ? "lg:border-b-0" : "",
                left ? "lg:border-r" : "",
                b.full ? "lg:col-span-2 lg:grid-cols-2" : "grid-rows-[auto_1fr]",
              ].join(" ")}
              style={delay((i % 2) * 90)}
            >
              <div className="flex flex-col" style={{ gap: 14, padding: PAD }}>
                <span style={{ color: RED, display: "inline-flex" }}>
                  <MaterialIcon name={b.icon} size={26} />
                </span>
                <h3 className="efc-display" style={{ fontSize: "clamp(20px,1.7vw,26px)", lineHeight: 1.15, color: "#101014" }}>
                  {b.title}
                </h3>
                <p style={{ margin: 0, maxWidth: "48ch", fontSize: 15.5, lineHeight: 1.6, color: "rgba(20,20,26,.66)", textWrap: "pretty" }}>{b.body}</p>
              </div>
              <div className={b.full ? "max-lg:border-t lg:border-l" : "border-t"} style={{ borderColor: LINE, minHeight: b.full ? 320 : 300 }}>
                {visual}
              </div>
            </article>
          );
        })}
      </div>
    </Segment>
  );
}
