"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Segment from "@/components/home/Segment";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { ArrowUpRight } from "@/components/icons";
import { EASE, LINE, PAD, RED, rule } from "@/components/home/frame";

const LAT = 41.9995322;
const LNG = 21.4758866;
const MAP_EMBED = `https://www.google.com/maps?q=${LAT},${LNG}&t=k&z=17&output=embed&hl=mk`;
const MAP_LINK =
  "https://www.google.com/maps/place/EFC+-+Eco+Fulfillment+Center/@41.9996143,21.4767369,464m/data=!3m1!1e3!4m6!3m5!1s0x13543f4b491ad69d:0xd483051fb0e14110!8m2!3d41.9995322!4d21.4758866";

/** Labels laid over the map. Only EFC sits at a true position (the map centre); the rest point the way. */
type Mark = "efc" | "customs" | "air" | "city";

const BENEFITS: { icon: MaterialName; title: string; body: string; mark: Mark }[] = [
  { icon: "warehouse", title: "Рампа за камион-шлепер", body: "Цел шлепер истоварува директно кај нас. Не плаќате претовар во помали возила.", mark: "efc" },
  { icon: "route", title: "На влезот на Скопје", body: "Камионите не возат низ градот. Стоката стигнува побрзо, без градска гужва.", mark: "city" },
  { icon: "flight", title: "Директна линија со аеродромот", body: "Авио-карго стигнува кај нас по директен пат.", mark: "air" },
  { icon: "fact_check", title: "Јавен царински склад до нас", body: "Увезената стока се оцаринува и влегува во магацинот веднаш.", mark: "customs" },
  { icon: "verified_user", title: "Обезбеден објект 24/7", body: "Видео надзор и обезбедување, и надвор од работното време.", mark: "efc" },
];

function Pin({ on, style, children }: { on: boolean; style: CSSProperties; children: ReactNode }) {
  return (
    <span
      className="absolute inline-flex items-center whitespace-nowrap"
      style={{
        gap: 6,
        padding: "6px 10px",
        fontSize: 12.5,
        fontWeight: 600,
        background: on ? RED : "#ffffff",
        color: on ? "#ffffff" : "#14141a",
        boxShadow: "0 8px 20px -10px rgba(10,10,14,.6)",
        transition: `background-color 240ms ${EASE}, color 240ms ${EASE}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** The satellite map fills the cell; the location benefits sit in a panel on top of it. Hovering a row lights its pin. */
export default function Location() {
  const [hot, setHot] = useState<Mark | null>(null);

  return (
    <Segment id="location" title="На влезот на Скопје." lead="Ферспед, 15 Корпус. Стоката стига до нас брзо и евтино, од било каде.">
      <div className="relative flex flex-col lg:block" style={{ minHeight: 680 }}>
        {/* map */}
        <div className="relative overflow-hidden lg:absolute lg:inset-0" style={{ minHeight: 340, background: "#1b1b20" }}>
          <iframe
            title="Локација на EFC на Google Maps"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0, pointerEvents: "none", filter: "saturate(.85)" }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {/* Google's marker sits at the exact centre; our label rides just above it */}
            <Pin on={hot === "efc"} style={{ left: "50%", top: "50%", translate: "-50% calc(-100% - 44px)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: hot === "efc" ? "#fff" : RED }} />
              EFC
            </Pin>
            <Pin on={hot === "customs"} style={{ left: "50%", top: "50%", translate: "24px 16px" }}>
              Царински склад
            </Pin>
            <Pin on={hot === "air"} style={{ right: 16, top: 16 }}>
              <MaterialIcon name="flight" size={15} />
              Аеродром →
            </Pin>
            <Pin on={hot === "city"} style={{ right: 16, bottom: 72 }}>
              ← Центар на Скопје
            </Pin>
          </div>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener"
            className="absolute inline-flex items-center"
            style={{ right: 16, bottom: 16, gap: 6, padding: "8px 14px", background: "#101014", color: "#ffffff", fontSize: 13, fontWeight: 500 }}
          >
            Отвори во Google Maps
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* panel */}
        <div
          className="relative flex flex-col lg:absolute"
          style={{ left: PAD, top: PAD, bottom: PAD, width: "min(420px, 100%)", background: "#ffffff", border: rule("rgba(20,20,26,.12)"), boxShadow: "0 30px 60px -30px rgba(20,20,22,.4)" }}
        >
          <div className="flex items-center justify-between" style={{ padding: "18px 24px", borderBottom: rule(), fontSize: 13, color: "rgba(20,20,26,.6)" }}>
            <span>Зошто оваа локација</span>
            <span className="font-numeric">{BENEFITS.length}</span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
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
                  style={{ gridTemplateColumns: "36px minmax(0,1fr)", columnGap: 14, rowGap: 4, padding: "16px 24px", borderBottom: rule(), background: on ? "#f7f7f8" : "#ffffff", transition: `background-color 200ms ${EASE}` }}
                >
                  <span
                    className="grid place-items-center"
                    style={{
                      gridRow: "span 2",
                      width: 36,
                      height: 36,
                      border: `1px solid ${on ? RED : LINE}`,
                      background: on ? RED : "#ffffff",
                      color: on ? "#ffffff" : RED,
                      transition: `background-color 200ms ${EASE}, color 200ms ${EASE}, border-color 200ms ${EASE}`,
                    }}
                  >
                    <MaterialIcon name={b.icon} size={19} />
                  </span>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{b.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "rgba(20,20,26,.66)" }}>{b.body}</p>
                </li>
              );
            })}
          </ul>
          <a href={MAP_LINK} target="_blank" rel="noopener" className="mt-auto flex items-center justify-between" style={{ padding: "16px 24px", fontSize: 14, color: "#14141a" }}>
            <span>Ферспед, 15 Корпус, Скопје</span>
            <b>Насоки →</b>
          </a>
        </div>
      </div>
    </Segment>
  );
}
