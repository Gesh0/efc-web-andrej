"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import ScrollRail from "@/components/motion/ScrollRail";
import Words, { delay } from "@/components/motion/Words";
import { Check } from "@/components/icons";
import useReducedMotion from "@/components/motion/useReducedMotion";

const EASE = "cubic-bezier(.23,1,.32,1)";
const RED = "#e31e1e";

const MONTHS = ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек"];
// share of pallet places in use, per month — the seasonal curve the chart loops through
const LOAD = [28, 26, 32, 38, 44, 52, 60, 58, 66, 80, 95, 72];
const BINS_PER_ROW = 18;
const BIN_ROWS = 3;
const CYCLE_MS = 7000;
const PAUSE_MS = 900;

/* ---------------------------------------------------------------- card shell */

function FeatCard({
  dark,
  offset,
  eyebrow,
  title,
  body,
  shown,
  cardRef,
  children,
}: {
  dark?: boolean;
  offset: number;
  eyebrow: string;
  title: string;
  body: string;
  shown: boolean;
  cardRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  return (
    <article
      ref={cardRef}
      className="flex flex-wrap"
      style={{
        position: "sticky",
        top: `calc(clamp(88px,10vh,116px) + ${offset}px)`,
        gap: "clamp(20px,2.4vw,40px)",
        marginBottom: "clamp(22px,3vh,44px)",
        padding: "clamp(20px,2.2vw,34px)",
        borderRadius: 15,
        transformOrigin: "50% 0",
        willChange: "transform",
        boxShadow: "0 26px 60px -38px rgba(20,20,26,.5)",
        background: dark ? "#101014" : "#f5f3f2",
        border: `1px solid ${dark ? "rgba(255,255,255,.14)" : "rgba(20,20,26,.07)"}`,
      }}
    >
      <div
        className="flex min-w-0 flex-col justify-between"
        style={{ flex: "1 1 300px", gap: "clamp(26px,3.6vh,52px)", padding: "clamp(8px,1.2vw,22px) clamp(4px,1vw,14px)" }}
      >
        <div>
          <div style={{ fontSize: 14, color: dark ? "rgba(255,255,255,.6)" : "rgba(20,20,26,.6)" }}>{eyebrow}</div>
          <h3
            className="efc-display"
            style={{ margin: "12px 0 0", maxWidth: "22ch", fontSize: "clamp(26px,2.9vw,44px)", lineHeight: 0.98, color: dark ? "#ffffff" : "#101014" }}
          >
            {title}
          </h3>
          <span
            aria-hidden="true"
            className="block"
            style={{
              width: "100%",
              maxWidth: 260,
              height: 1,
              marginTop: 18,
              background: RED,
              transform: shown ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: `transform 640ms ${EASE}`,
            }}
          />
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: "44ch",
            fontSize: "clamp(14px,1.05vw,16px)",
            fontWeight: 300,
            lineHeight: 1.62,
            color: dark ? "rgba(255,255,255,.72)" : "rgba(20,20,26,.66)",
            textWrap: "pretty",
          }}
        >
          {body}
        </p>
      </div>
      {children}
    </article>
  );
}

function PhotoPane({ src, alt, position, children }: { src: string; alt: string; position: string; children: ReactNode }) {
  return (
    <div
      className="relative self-stretch overflow-hidden"
      style={{ flex: "1 1 380px", minHeight: "clamp(260px,34vh,400px)", borderRadius: 12, background: "#101014" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 800px) 100vw, 640px"
        style={{ objectFit: "cover", objectPosition: position, filter: "saturate(.5) contrast(1.05) brightness(.7)" }}
      />
      {children}
    </div>
  );
}

function insetStyle(shown: boolean, width: number): CSSProperties {
  return {
    position: "absolute",
    left: "clamp(14px,1.6vw,26px)",
    bottom: "clamp(14px,1.6vw,26px)",
    width: `min(${width}px, calc(100% - clamp(28px,3.2vw,52px)))`,
    borderRadius: 12,
    background: "#ffffff",
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 560ms ${EASE}, transform 560ms ${EASE}`,
  };
}

/* ------------------------------------------------------------ card contents */

function CostsInset({ shown, reduced }: { shown: boolean; reduced: boolean }) {
  const rows = ["Закуп на магацин", "Полици и опрема", "Магацински персонал"];
  return (
    <div style={{ ...insetStyle(shown, 330), padding: 20 }}>
      <div style={{ marginBottom: 6, fontSize: 13.5, fontWeight: 500, color: "rgba(20,20,26,.62)" }}>Почетни трошоци</div>
      {rows.map((label, i) => (
        <div key={label} className="flex items-center justify-between" style={{ gap: 12, padding: "9px 0", borderBottom: "1px solid rgba(20,20,26,.09)" }}>
          <span className="relative" style={{ fontSize: 14, color: "rgba(20,20,26,.78)" }}>
            {label}
            <span
              aria-hidden="true"
              className="absolute"
              style={{
                left: -2,
                right: -2,
                top: "50%",
                height: 1,
                background: RED,
                transform: shown ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: `transform 480ms ${EASE} ${reduced ? 0 : 420 + i * 150}ms`,
              }}
            />
          </span>
        </div>
      ))}
      <div className="flex items-baseline justify-between" style={{ paddingTop: 13 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#101014" }}>Вкупно</span>
        <span className="efc-display flex items-baseline" style={{ gap: 6, fontSize: 30, lineHeight: 1, color: RED, textTransform: "none" }}>
          0<span style={{ fontSize: 17, fontWeight: 500 }}>МКД</span>
        </span>
      </div>
    </div>
  );
}

function ChecklistInset({ shown, reduced }: { shown: boolean; reduced: boolean }) {
  const rows = ["WMS систем за залихи", "Искусен магацински тим"];
  return (
    <div style={{ ...insetStyle(shown, 348), overflow: "hidden", boxShadow: "0 22px 48px -30px rgba(20,20,26,.55)" }}>
      <div className="flex items-center" style={{ gap: 10, padding: "12px 18px", background: "#101014" }}>
        <span aria-hidden="true" style={{ flex: "none", width: 2, height: 15, background: RED }} />
        <span className="efc-display" style={{ fontSize: 14.5, lineHeight: 1, color: "#ffffff" }}>
          Активно од првиот ден
        </span>
      </div>
      <div className="relative" style={{ padding: "6px 18px 14px" }}>
        <span aria-hidden="true" className="absolute" style={{ left: 27, top: 29, bottom: 36, width: 1, background: "rgba(20,20,26,.14)" }} />
        {rows.map((label, i) => {
          const d = reduced ? 0 : 440 + i * 180;
          return (
            <div
              key={label}
              className="relative flex items-center"
              style={{ gap: 12, padding: "13px 0 12px", opacity: shown ? 1 : 0.34, transition: `opacity 420ms ${EASE} ${d}ms` }}
            >
              <span
                className="flex flex-none items-center justify-center"
                style={{
                  width: 19,
                  height: 19,
                  borderRadius: "50%",
                  background: RED,
                  boxShadow: "0 0 0 4px #ffffff",
                  transform: shown ? "scale(1)" : "scale(.4)",
                  transition: `transform 420ms ${EASE} ${d}ms`,
                }}
              >
                <Check />
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 500, lineHeight: 1.25, color: "#101014" }}>{label}</span>
              <span
                aria-hidden="true"
                className="absolute"
                style={{
                  left: 31,
                  right: 0,
                  bottom: 0,
                  height: 1,
                  background: i === rows.length - 1 ? RED : "rgba(20,20,26,.13)",
                  transform: shown ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: `transform 620ms ${EASE} ${d}ms`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Pallet-place usage through the year: bins fill, the figure counts, the month marker walks. */
function CapacityChart({ running, reduced }: { running: boolean; reduced: boolean }) {
  const [live, setState] = useState({ month: 0, pct: LOAD[0] });
  // reduced motion: hold on the November peak instead of looping
  const state = reduced ? { month: 10, pct: LOAD[10] } : live;

  useEffect(() => {
    if (reduced || !running) return;
    let raf = 0;
    let t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      if (t > CYCLE_MS + PAUSE_MS) t0 = now;
      const x = (Math.min(t, CYCLE_MS) / CYCLE_MS) * (MONTHS.length - 1);
      const lo = Math.floor(x);
      const hi = Math.min(MONTHS.length - 1, lo + 1);
      const pct = Math.round(LOAD[lo] + (LOAD[hi] - LOAD[lo]) * (x - lo));
      const month = Math.round(x);
      setState((s) => (s.pct === pct && s.month === month ? s : { month, pct }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, reduced]);

  const total = BINS_PER_ROW * BIN_ROWS;
  const lit = Math.round((total * state.pct) / 100);

  return (
    <div
      className="flex min-w-0 flex-col justify-center self-stretch"
      style={{ flex: "1 1 440px", padding: "clamp(8px,1.2vw,22px) clamp(4px,1vw,14px)" }}
    >
      <div className="flex items-baseline justify-between" style={{ gap: 16 }}>
        <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.62)" }}>Искористени палетни места</span>
        <span className="efc-display flex items-baseline" style={{ gap: 3, fontSize: "clamp(28px,3vw,42px)", lineHeight: 1, color: "#ffffff" }}>
          <span>{state.pct}</span>
          <span style={{ fontSize: ".5em", fontWeight: 500, color: "rgba(255,255,255,.6)" }}>%</span>
        </span>
      </div>
      <div className="flex flex-col" style={{ gap: 4, marginTop: 18 }} aria-hidden="true">
        {Array.from({ length: BIN_ROWS }, (_, r) => (
          <div key={r} className="flex" style={{ gap: 4, height: "clamp(18px,2.4vh,30px)" }}>
            {Array.from({ length: BINS_PER_ROW }, (_, c) => {
              const i = r * BINS_PER_ROW + c;
              return (
                <span
                  key={c}
                  style={{
                    flex: 1,
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,.26)",
                    backgroundColor: i < lit ? RED : "transparent",
                    transition: `background-color 240ms ${EASE}`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="relative" style={{ height: 1, marginTop: 12, background: "rgba(255,255,255,.14)" }}>
        <span className="absolute left-0 top-0" style={{ height: 1, width: `${state.pct}%`, background: RED, transition: `width 240ms ${EASE}` }} />
      </div>
      <div style={{ marginTop: 20 }}>
        <div className="relative" style={{ height: 1, background: "rgba(255,255,255,.14)" }}>
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              top: -5,
              left: `calc(${((state.month + 0.5) / MONTHS.length) * 100}% - 1px)`,
              width: 2,
              height: 11,
              background: RED,
              transition: `left 260ms ${EASE}`,
            }}
          />
        </div>
        <div className="flex" style={{ marginTop: 8 }}>
          {MONTHS.map((m, i) => (
            <span
              key={m}
              className="min-w-0 flex-1 text-center"
              style={{
                padding: "5px 0",
                fontSize: 11.5,
                color: i === state.month ? "#ffffff" : "rgba(255,255,255,.42)",
                transition: `color 260ms ${EASE}`,
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ section */

export default function WhyStack() {
  const reduced = useReducedMotion();
  const card0 = useRef<HTMLElement>(null);
  const card1 = useRef<HTMLElement>(null);
  const card2 = useRef<HTMLElement>(null);
  const [shown, setShown] = useState([false, false, false]);
  const [capRunning, setCapRunning] = useState(false);

  // each card plays its details once, when its top reaches 72% of the viewport
  useEffect(() => {
    const els = [card0.current, card1.current, card2.current].filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = els.indexOf(e.target as HTMLElement);
          setShown((s) => (s[i] ? s : s.map((v, k) => (k === i ? true : v))));
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -28% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // the capacity chart only runs while its card is on screen
    const cap = els[1];
    const capIo = new IntersectionObserver((entries) => entries.forEach((e) => setCapRunning(e.isIntersecting)));
    if (cap) capIo.observe(cap);
    return () => {
      io.disconnect();
      capIo.disconnect();
    };
  }, []);

  // stacked cards recede (scale down, dim) as the next card slides over them
  useEffect(() => {
    if (reduced) return;
    const els = [card0.current, card1.current, card2.current].filter(Boolean) as HTMLElement[];
    let raf = 0;
    const paint = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      els.forEach((card, i) => {
        const next = els[i + 1];
        let k = 0;
        if (next) {
          const cr = card.getBoundingClientRect();
          const nr = next.getBoundingClientRect();
          const travel = Math.max(1, vh - cr.top);
          k = Math.max(0, Math.min(1, 1 - (nr.top - cr.top) / travel));
        }
        const e = k * k * (3 - 2 * k);
        card.style.transform = `scale(${(1 - 0.055 * e).toFixed(4)})`;
        card.style.filter = e > 0.01 ? `brightness(${(1 - 0.08 * e).toFixed(3)})` : "none";
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section id="why" style={{ background: "#ffffff", padding: "clamp(34px,4vw,60px) clamp(20px,3.5vw,56px) clamp(56px,6vw,88px)" }}>
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <ScrollRail style={{ marginBottom: "clamp(20px,3vh,34px)" }} />
        <div
          className="flex flex-wrap items-start justify-between"
          style={{ gap: "clamp(24px,4vw,64px)", paddingBottom: "clamp(20px,2.4vw,32px)" }}
        >
          <h2 data-reveal className="efc-display" style={{ maxWidth: "20ch", fontSize: "clamp(26px,3vw,44px)", lineHeight: 0.98, color: "#101014" }}>
            <Words text="Целосна логистичка подготвеност, без капитални трошоци" />
          </h2>
          <p
            data-reveal
            className="efc-rise"
            style={{
              ...delay(200),
              margin: 0,
              maxWidth: "46ch",
              flex: "1 1 340px",
              fontSize: "clamp(14.5px,1.1vw,16.5px)",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "rgba(20,20,26,.66)",
              textWrap: "pretty",
            }}
          >
            Брзиот раст на пазарот бара веднаш достапен капацитет. Моделот на EFC ви дава целосно оперативен
            магацин, без почетна инвестиција.
          </p>
        </div>

        <div className="relative">
          <FeatCard
            cardRef={card0}
            offset={0}
            shown={shown[0]}
            eyebrow="Капитал"
            title="Нула почетна инвестиција"
            body="Нема магацин за купување или изнајмување и нема опрема за инсталирање. Обработката на нарачките почнува веднаш по потписот на договорот."
          >
            <PhotoPane src="/assets/efc-pick-pack.jpg" alt="Пакување на нарачка во EFC" position="50% 50%">
              <CostsInset shown={shown[0]} reduced={reduced} />
            </PhotoPane>
          </FeatCard>

          <FeatCard
            dark
            cardRef={card1}
            offset={20}
            shown={shown[1]}
            eyebrow="Капацитет"
            title="Флексибилен капацитет на барање"
            body="Магацинскиот простор и обемот на нарачки растат во сезона и се намалуваат по неа. Плаќате само за ресурсите што ги користите."
          >
            <CapacityChart running={capRunning} reduced={reduced} />
          </FeatCard>

          <FeatCard
            cardRef={card2}
            offset={40}
            shown={shown[2]}
            eyebrow="Инфраструктура"
            title="Готова, оперативна инфраструктура"
            body="Од првиот ден добивате WMS систем со увид во залихата и статусот на секоја нарачка, искусен магацински тим и директна врска со доставната мрежа на ELS."
          >
            <PhotoPane src="/assets/efc-packing-station.jpg" alt="Станица за пакување во EFC со системот за залихи на екран" position="50% 46%">
              <ChecklistInset shown={shown[2]} reduced={reduced} />
            </PhotoPane>
          </FeatCard>

          <div aria-hidden="true" style={{ height: "clamp(170px,40vh,360px)" }} />
        </div>
      </div>
    </section>
  );
}
