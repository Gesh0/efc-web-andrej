"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Words, { delay } from "@/components/motion/Words";
import { ArrowUpRight } from "@/components/icons";

/**
 * Dark closing band: the EFC container swings on its crane hook and hauls in
 * from the right as the band scrolls through (scrubbed, reversible).
 */
export default function CtaBand({
  id,
  title,
  body,
  href,
  label = "Започнете разговор",
  steps,
  wide = false,
}: {
  id?: string;
  title: string;
  body: string;
  href: string;
  /** button text */
  label?: string;
  /** optional "what happens next" list under the body */
  steps?: string[];
  /** home-segment layout: 1920px container, 32–64px gutter, --section-y rhythm */
  wide?: boolean;
}) {
  const bandRef = useRef<HTMLElement>(null);
  const haulRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const haul = haulRef.current;
    if (!band || !haul || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = band.getBoundingClientRect();
      const vh = window.innerHeight;
      // from band top at 92% of the viewport to band bottom at 60%
      const p = Math.max(0, Math.min(1, (vh * 0.92 - r.top) / Math.max(1, r.height + vh * 0.32)));
      haul.style.transform = `translateX(${(22 * (1 - p)).toFixed(2)}%) rotate(${(1.2 * (1 - p)).toFixed(3)}deg)`;
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
  }, []);

  const external = !href.startsWith("/");
  const buttonInner = (
    <>
      <span
        className="relative inline-flex items-center overflow-hidden"
        style={{ height: 48, padding: "0 24px", borderRadius: "9px 3px 3px 9px", background: "#dc2626" }}
      >
        <span aria-hidden="true" className="efc-sweep" />
        <span className="efc-split-ink">{label}</span>
      </span>
      <span
        aria-hidden="true"
        className="relative grid place-items-center overflow-hidden"
        style={{ width: 48, height: 48, borderRadius: "3px 9px 9px 3px", background: "#dc2626" }}
      >
        <span className="efc-sweep efc-sweep-late" />
        <span className="efc-split-ink efc-split-arrow grid place-items-center">
          <ArrowUpRight size={15} strokeWidth={2.4} />
        </span>
      </span>
    </>
  );
  const btnClass = "efc-split inline-flex items-stretch text-white";
  const btnStyle = { gap: 3, fontSize: 14, fontWeight: 600 } as const;

  return (
    <section
      id={id}
      ref={bandRef}
      style={{
        background: "#ffffff",
        padding: wide
          ? "calc(var(--section-y) / 2) clamp(32px,4vw,64px) clamp(32px,4vw,64px)"
          : "clamp(18px,2.2vw,32px) clamp(10px,1.2vw,18px) clamp(10px,1.2vw,18px)",
      }}
    >
      <div
        className="relative mx-auto flex items-start overflow-hidden"
        style={{
          maxWidth: wide ? 1920 : 1600,
          minHeight: "clamp(360px,40vw,520px)",
          borderRadius: wide ? 6 : 22,
          background: "radial-gradient(120% 130% at 8% 12%, #1b1418 0%, #0b0405 58%, #070304 100%)",
        }}
      >
        <div className="pointer-events-none absolute top-[2%] right-[-2%] aspect-[1448/1086] w-[min(58%,880px)] max-[899px]:top-auto max-[899px]:right-[-18%] max-[899px]:bottom-[-14%] max-[899px]:w-[78%] max-[899px]:opacity-40">
          <div ref={haulRef} className="relative h-full w-full" style={{ willChange: "transform" }}>
            <div
              data-anim
              className="relative h-full w-full"
              style={{ transformOrigin: "52% 6%", animation: "efcSwing 4600ms cubic-bezier(.45,0,.55,1) infinite" }}
            >
              <Image
                src="/assets/efc-container-solid-v2.webp"
                alt="EFC контејнер обесен на кран"
                fill
                sizes="(max-width: 900px) 78vw, 880px"
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 26px 60px rgba(220,38,38,.34)) drop-shadow(0 0 120px rgba(220,38,38,.22))",
                }}
              />
            </div>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg,rgba(7,3,4,.92) 0%,rgba(7,3,4,.72) 38%,rgba(7,3,4,0) 62%)" }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "22%",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            maskImage: "linear-gradient(180deg,transparent 0%,#000 78%)",
            WebkitMaskImage: "linear-gradient(180deg,transparent 0%,#000 78%)",
            background: "linear-gradient(180deg,rgba(7,3,4,0) 0%,rgba(7,3,4,.14) 62%,rgba(7,3,4,.3) 100%)",
          }}
        />

        <div
          data-reveal
          className="relative flex max-w-[min(52ch,50%)] flex-col items-start justify-start max-[899px]:max-w-full"
          style={{ gap: "clamp(18px,2vw,26px)", padding: "clamp(34px,4vw,60px) clamp(34px,4.4vw,76px)" }}
        >
          <h2
            className="efc-display"
            style={{ maxWidth: "22ch", fontSize: "clamp(28px,3.4vw,50px)", lineHeight: 1, color: "#ffffff", textWrap: "balance" }}
          >
            <Words text={title} step={55} />
          </h2>
          <p
            className="efc-rise"
            style={{
              ...delay(280),
              margin: 0,
              maxWidth: "44ch",
              fontSize: "clamp(14.5px,1.1vw,16.5px)",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "rgba(255,255,255,.72)",
              textWrap: "pretty",
            }}
          >
            {body}
          </p>
          {steps && (
            <ol className="efc-rise flex flex-col" style={{ ...delay(340), margin: 0, padding: 0, listStyle: "none", gap: 10 }}>
              {steps.map((s, i) => (
                <li key={s} className="flex items-baseline" style={{ gap: 14, fontSize: "clamp(14.5px,1.1vw,16px)", color: "rgba(255,255,255,.86)" }}>
                  <span className="font-numeric" style={{ flex: "none", fontSize: 13, fontWeight: 600, color: "#ff5a5a" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          )}
          <div className="efc-rise" style={delay(steps ? 480 : 400)}>
            {external ? (
              <a href={href} className={btnClass} style={btnStyle}>
                {buttonInner}
              </a>
            ) : (
              <Link href={href} className={btnClass} style={btnStyle}>
                {buttonInner}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
