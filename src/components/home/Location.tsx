"use client";

import { useState, type CSSProperties } from "react";
import { delay } from "@/components/motion/Words";
import Segment from "@/components/home/Segment";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { ArrowUpRight } from "@/components/icons";

const EASE = "cubic-bezier(.23,1,.32,1)";
const RED = "#e31e1e";

const LAT = 41.9995322;
const LNG = 21.4758866;
const MAP_EMBED = `https://www.google.com/maps?q=${LAT},${LNG}&t=k&z=17&output=embed&hl=mk`;
const MAP_LINK = "https://www.google.com/maps/place/EFC+-+Eco+Fulfillment+Center/@41.9996143,21.4767369,464m/data=!3m1!1e3!4m6!3m5!1s0x13543f4b491ad69d:0xd483051fb0e14110!8m2!3d41.9995322!4d21.4758866";

/** Labels laid over the map. Only EFC sits at a true position (the map centre); the rest point the way. */
type Mark = "efc" | "customs" | "air" | "city";

const BENEFITS: { icon: MaterialName; title: string; body: string; mark: Mark }[] = [
  {
    icon: "warehouse",
    title: "Рампа за камион-шлепер",
    body: "Цел шлепер истоварува директно кај нас. Не плаќате претовар во помали возила.",
    mark: "efc",
  },
  {
    icon: "route",
    title: "На влезот на Скопје",
    body: "Камионите не возат низ градот. Стоката стигнува побрзо, без градска гужва.",
    mark: "city",
  },
  {
    icon: "flight",
    title: "Директна линија со аеродромот",
    body: "Авио-карго стигнува кај нас по директен пат, па залихата за производи што доаѓаат со авион брзо се полни.",
    mark: "air",
  },
  {
    icon: "fact_check",
    title: "Јавен царински склад до нас",
    body: "Увезената стока се оцаринува и влегува во магацинот веднаш, без дополнителен превоз низ градот.",
    mark: "customs",
  },
  {
    icon: "verified_user",
    title: "Обезбеден објект 24/7",
    body: "Видео надзор и обезбедување во секое време. Стоката е заштитена и надвор од работното време.",
    mark: "efc",
  },
];

function Chip({ on, style, children }: { on: boolean; style: CSSProperties; children: React.ReactNode }) {
  return (
    <span
      className="absolute inline-flex items-center whitespace-nowrap"
      style={{
        gap: 6,
        padding: "6px 12px",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 500,
        background: on ? RED : "rgba(255,255,255,.94)",
        color: on ? "#ffffff" : "#14141a",
        boxShadow: "0 8px 22px -10px rgba(10,10,14,.6)",
        transform: on ? "scale(1.06)" : "none",
        transition: `background-color 260ms ${EASE}, color 260ms ${EASE}, transform 260ms ${EASE}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Location benefits on the left; satellite map of the site on the right with the matching label lit on hover. */
export default function Location() {
  const [hot, setHot] = useState<Mark | null>(null);

  return (
    <Segment
      id="location"
      title="На влезот на Скопје"
      intro="Локацијата е избрана за стоката да стигне до нас брзо и евтино, од било каде. Ферспед, 15 Корпус, Скопје."
    >
        <div
          data-reveal
          className="efc-rise grid grid-cols-[minmax(0,1fr)] items-start lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
          style={{ ...delay(260), gap: "clamp(16px,2vw,32px)" }}
        >
          {/* benefits */}
          <ul className="order-2 flex min-w-0 flex-col lg:order-1" style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid rgba(20,20,26,.1)" }}>
            {BENEFITS.map((b) => {
              const on = hot === b.mark;
              return (
                <li
                  key={b.title}
                  tabIndex={0}
                  onPointerEnter={() => setHot(b.mark)}
                  onPointerLeave={() => setHot(null)}
                  onFocus={() => setHot(b.mark)}
                  onBlur={() => setHot(null)}
                  className="grid cursor-default outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  style={{ gridTemplateColumns: "44px minmax(0,1fr)", columnGap: 16, rowGap: 4, padding: "clamp(16px,1.6vw,22px) 0", borderBottom: "1px solid rgba(20,20,26,.1)" }}
                >
                  <span
                    className="grid place-items-center"
                    style={{
                      gridRow: "span 2",
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      border: `1px solid ${on ? RED : "rgba(20,20,26,.14)"}`,
                      background: on ? RED : "#ffffff",
                      color: on ? "#ffffff" : "#14141a",
                      transition: `background-color 260ms ${EASE}, color 260ms ${EASE}, border-color 260ms ${EASE}`,
                    }}
                  >
                    <MaterialIcon name={b.icon} size={22} />
                  </span>
                  <h3 style={{ margin: 0, fontSize: "clamp(17px,1.3vw,20px)", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-.01em" }}>{b.title}</h3>
                  <p style={{ margin: 0, maxWidth: "56ch", fontSize: "clamp(14.5px,1.05vw,16px)", lineHeight: 1.55, color: "rgba(20,20,26,.68)", textWrap: "pretty" }}>{b.body}</p>
                </li>
              );
            })}
          </ul>

          {/* map */}
          <div
            className="relative order-1 overflow-hidden lg:sticky lg:order-2"
            style={{ top: 120, minHeight: "clamp(320px,38vw,560px)", height: "100%", borderRadius: 6, background: "#1b1b20" }}
          >
            <iframe
              title="Локација на EFC на Google Maps"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0, pointerEvents: "none", filter: "saturate(.85)" }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(10,10,14,0) 40%, rgba(10,10,14,.35) 100%)" }} />

            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {/* Google's own marker sits at the exact centre; our label rides just above it */}
              <Chip on={hot === "efc"} style={{ left: "50%", top: "50%", translate: "-50% calc(-100% - 46px)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: hot === "efc" ? "#fff" : RED }} />
                EFC
              </Chip>
              <Chip on={hot === "customs"} style={{ left: "50%", top: "50%", translate: "24px 18px" }}>
                <MaterialIcon name="fact_check" size={16} />
                Царински склад до нас
              </Chip>
              <Chip on={hot === "air"} style={{ right: 16, top: 16 }}>
                <MaterialIcon name="flight" size={16} />
                Аеродром Скопје →
              </Chip>
              <Chip on={hot === "city"} style={{ left: 16, bottom: 16 }}>
                ← Центар на Скопје
              </Chip>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener"
              className="absolute inline-flex items-center"
              style={{ right: 16, bottom: 16, gap: 6, padding: "8px 14px", borderRadius: 6, background: "#101014", color: "#fff", fontSize: 13, fontWeight: 500 }}
            >
              Отвори во Google Maps
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
    </Segment>
  );
}
