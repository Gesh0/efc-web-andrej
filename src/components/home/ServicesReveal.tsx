"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import ScrollRail from "@/components/motion/ScrollRail";
import Words, { delay } from "@/components/motion/Words";
import { ArrowUpRight } from "@/components/icons";

type Card = {
  img: string;
  alt: string;
  title: string;
  body: string;
  bullets?: string[];
};

const CARDS: Card[] = [
  {
    img: "/assets/factory.webp",
    alt: "Светол магацин со високи палетни регали",
    title: "Складирање без капитални трошоци",
    body: "EFC обезбедува безбеден магацински простор во Скопје како услуга — без потреба од инвестиции во сопствен магацин, инсталација на опрема или вработување дополнителен кадар.",
  },
  {
    img: "/assets/efc-pick-pack.jpg",
    alt: "Селектирање и пакување на нарачки во зоната за pick and pack",
    title: "Процесирање на нарачки",
    body: "Целосно процесирање на нарачки за е-трговија во развој.",
    bullets: [
      "Синхронизација во реално време преку WMS системот",
      "Брз прием на стоката",
      "Прецизно селектирање и пакување",
      "Предавање за достава истиот ден",
    ],
  },
  {
    img: "/assets/efc-van-dock.avif",
    alt: "Возило на EFC на рампа пред излез за достава",
    title: "Транспорт и достава",
    body: "Доставата ја врши нашиот партнер ELS — најголемата логистичка мрежа за достава на пратки во Република Северна Македонија.",
    bullets: [
      "Достава за еден ден низ целата држава",
      "Потврда на испораката со OTP код",
      "Наплата при достава во готово или со картичка",
      "Целосна евиденција и следење на секоја пратка",
    ],
  },
];

const GROW = 2.3; // open card width : closed card width
const GAP = 12;
const HOME = 0; // card that is open when nothing is hovered
const EASE = "cubic-bezier(.23,1,.32,1)";
const PANEL_BLUR = "blur(26px) saturate(140%)";

export default function ServicesReveal() {
  const rowRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [active, setActive] = useState(HOME);
  // open-card width in px: inner layers are sized to it so nothing re-lays
  // out while the card's own width animates
  const [openW, setOpenW] = useState<number | null>(null);
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const w = row.clientWidth;
      setStacked(w > 0 && w < 720);
      const unit = (w - GAP * (CARDS.length - 1)) / (GROW + CARDS.length - 1);
      setOpenW(Math.round(unit * GROW));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => {
      ro.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  // hover intent: a pointer sweeping across the row must not fire three switches
  const queue = (i: number, wait: number) => {
    clearTimeout(timer.current);
    if (!wait) return setActive(i);
    timer.current = setTimeout(() => setActive(i), wait);
  };

  return (
    <section
      id="solutions"
      style={{
        padding: "clamp(60px,9vh,110px) clamp(16px,4vw,60px) clamp(52px,8vh,96px)",
        background: "#ffffff",
        color: "#14141a",
      }}
    >
      <div className="mx-auto flex flex-col" style={{ gap: "clamp(20px,3vh,34px)", maxWidth: 1180 }}>
        <ScrollRail />
        <div className="flex flex-wrap items-start justify-between" style={{ gap: "clamp(24px,4vw,64px)" }}>
          <h2
            data-reveal
            className="efc-display"
            style={{ maxWidth: "20ch", fontSize: "clamp(26px,3vw,44px)", lineHeight: 0.98, color: "#101014", textWrap: "pretty" }}
          >
            <Words text="Складирање, процесирање, достава" step={55} />
          </h2>
          <p
            data-reveal
            className="efc-rise"
            style={{
              ...delay(250),
              margin: 0,
              maxWidth: "46ch",
              flex: "1 1 340px",
              minWidth: 0,
              fontSize: "clamp(14.5px,1.1vw,16.5px)",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "rgba(20,20,26,.66)",
              textWrap: "pretty",
            }}
          >
            Три услуги, еден поврзан процес. Изберете ја услугата што сакате да ја разгледате.
          </p>
        </div>

        <div
          ref={rowRef}
          data-reveal
          className="flex items-stretch"
          style={{ gap: GAP, flexDirection: stacked ? "column" : "row" }}
          onPointerLeave={stacked ? undefined : () => queue(HOME, 180)}
        >
          {CARDS.map((card, i) => {
            const on = stacked || i === active;
            const layerW: CSSProperties["width"] = stacked || openW === null ? "100%" : openW;
            return (
              <article
                key={card.title}
                tabIndex={0}
                className="efc-rise relative min-w-0 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brand"
                style={{
                  ...delay(200 + i * 75),
                  flex: stacked ? "0 0 auto" : `${on ? GROW : 1} 1 0`,
                  height: stacked ? "auto" : "clamp(320px,50vh,470px)",
                  borderRadius: 18,
                  background: stacked ? "#141217" : "#ece7e3",
                  cursor: stacked ? "default" : "pointer",
                  transition: `flex-grow 750ms ${EASE}, opacity 720ms ${EASE} var(--d), transform 720ms ${EASE} var(--d)`,
                }}
                onPointerEnter={stacked ? undefined : () => queue(i, 90)}
                onFocus={() => queue(i, 0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    queue(i, 0);
                  }
                }}
              >
                <div
                  style={
                    stacked
                      ? { position: "relative", width: "100%", height: "clamp(190px,52vw,280px)" }
                      : {
                          position: "absolute",
                          top: 0,
                          left: "50%",
                          height: "100%",
                          width: layerW,
                          transform: `translateX(-50%) scale(${on ? 1.04 : 1})`,
                          transition: `transform 950ms ${EASE}`,
                        }
                  }
                >
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, 640px"
                    style={{ objectFit: "cover", filter: "saturate(.72) brightness(.94)" }}
                  />
                </div>
                {!stacked && (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "rgba(10,8,12,.32)", opacity: on ? 0 : 1, transition: `opacity 550ms ${EASE}` }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "linear-gradient(180deg,rgba(10,8,12,0) 45%,rgba(10,8,12,.42) 100%)" }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute grid place-items-center text-white"
                      style={{
                        top: 14,
                        right: 14,
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "#dc2626",
                        opacity: on ? 1 : 0,
                        transform: on ? "none" : "translateY(-6px) scale(.86)",
                        transition: `opacity 400ms ${EASE} ${on ? 150 : 0}ms, transform 400ms ${EASE} ${on ? 150 : 0}ms`,
                      }}
                    >
                      <ArrowUpRight strokeWidth={2.4} />
                    </span>
                  </>
                )}
                <div
                  style={{
                    position: stacked ? "relative" : "absolute",
                    left: 0,
                    bottom: 0,
                    width: layerW,
                    padding: "20px clamp(18px,2vw,26px) 24px",
                    borderRadius: "0 0 18px 18px",
                    background: stacked ? "#141217" : "rgba(12,10,14,.34)",
                    backdropFilter: stacked || !on ? "none" : PANEL_BLUR,
                    WebkitBackdropFilter: stacked || !on ? "none" : PANEL_BLUR,
                    color: "#ffffff",
                    opacity: on ? 1 : 0,
                    transform: on ? "none" : "translateY(calc(100% + 28px)) scale(.98)",
                    transition: stacked
                      ? "none"
                      : on
                      ? `opacity 700ms cubic-bezier(.16,1,.3,1) 100ms, transform 700ms cubic-bezier(.16,1,.3,1) 100ms`
                      : `opacity 420ms cubic-bezier(.55,0,1,.45), transform 420ms cubic-bezier(.55,0,1,.45)`,
                  }}
                >
                  <div className="flex items-baseline" style={{ gap: 10 }}>
                    <span className="efc-display" style={{ flex: "none", fontSize: 13, color: "#ff5a5a" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="efc-display"
                      style={{ fontSize: "clamp(17px,1.55vw,22px)", lineHeight: 1.02, color: "#ffffff", textWrap: "pretty" }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      margin: "11px 0 0",
                      maxWidth: "54ch",
                      fontSize: "clamp(13.5px,1vw,15px)",
                      lineHeight: 1.5,
                      letterSpacing: ".004em",
                      color: "rgba(255,255,255,.92)",
                      textWrap: "pretty",
                    }}
                  >
                    {card.body}
                  </p>
                  {card.bullets && (
                    <ul
                      className="flex flex-col"
                      style={{
                        margin: "10px 0 0",
                        padding: 0,
                        listStyle: "none",
                        gap: 6,
                        fontSize: "clamp(13.5px,1vw,15px)",
                        lineHeight: 1.4,
                        letterSpacing: ".004em",
                        color: "rgba(255,255,255,.92)",
                      }}
                    >
                      {card.bullets.map((b) => (
                        <li key={b} className="flex items-baseline" style={{ gap: 10 }}>
                          <span
                            aria-hidden="true"
                            style={{ flex: "none", width: 6, height: 6, borderRadius: "50%", background: "#ff5a5a", transform: "translateY(-2px)" }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
