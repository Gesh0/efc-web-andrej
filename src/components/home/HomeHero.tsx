"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TITLE = ["Складираме,", "пакуваме", "и", "испорачуваме", "вашите"];
// the object of the sentence cycles through these
const ROTATING = ["нарачки", "продукти", "парфеми", "играчки", "книги", "палети"];

const CONTAINER_SHADOW = "drop-shadow(0 48px 46px rgba(20,20,26,0.34))";

/** Cycles the last headline word: old one exits up through a clip, the next rises in, the line re-centres to the new width. */
function useRotator(boxRef: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const box = boxRef.current;
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const EASE = "cubic-bezier(.77,0,.175,1)";
    const DUR = 640;
    const HOLD = 2300;
    let i = 0;
    let cur = box.firstElementChild as HTMLElement;
    let visible = true;
    let busy = false;

    const step = () => {
      if (!visible || busy || document.hidden) return;
      busy = true;
      i = (i + 1) % ROTATING.length;
      const next = document.createElement("span");
      next.textContent = ROTATING[i];
      next.style.cssText =
        "position:absolute;left:0;top:0;display:inline-block;white-space:nowrap;transform:translateY(105%)";
      box.appendChild(next);
      const from = box.offsetWidth;
      const to = next.offsetWidth;
      box.animate([{ width: from + "px" }, { width: to + "px" }], { duration: DUR, easing: EASE, fill: "forwards" });
      cur.animate(
        [{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-105%)", opacity: 0 }],
        { duration: DUR, easing: EASE, fill: "forwards" },
      );
      const a = next.animate([{ transform: "translateY(105%)" }, { transform: "translateY(0)" }], {
        duration: DUR,
        easing: EASE,
        fill: "forwards",
      });
      a.onfinish = () => {
        cur.remove();
        next.style.position = "static";
        next.style.transform = "none";
        a.cancel();
        box.getAnimations().forEach((x) => x.cancel());
        cur = next;
        busy = false;
      };
    };

    const io = new IntersectionObserver((es) => es.forEach((e) => (visible = e.isIntersecting)));
    io.observe(box);
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      step();
      timer = setInterval(step, HOLD + DUR);
    }, 2600);
    return () => {
      io.disconnect();
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [boxRef]);
}

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const rotRef = useRef<HTMLSpanElement>(null);
  useRotator(rotRef);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root);

      // intro — media first, then headline words
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          q("[data-hero=container]"),
          { autoAlpha: 0, y: 74, scale: 1.07, rotation: 4, filter: `blur(14px) ${CONTAINER_SHADOW}` },
          { autoAlpha: 1, y: 0, scale: 1, rotation: 0, filter: `blur(0px) ${CONTAINER_SHADOW}`, duration: 1.6 },
        )
        .fromTo(q("[data-hero=word]"), { yPercent: 108, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.05, stagger: 0.055 }, 0.12);

      // container drifts up as the page scrolls away
      gsap.to(q("[data-hero=lift]"), {
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom center", scrub: 1.1, invalidateOnRefresh: true },
      });

      // pointer parallax on the container
      if (window.matchMedia("(pointer: fine)").matches) {
        const stage = q("[data-hero=stage]")[0] as HTMLElement;
        const box = q("[data-hero=lift]")[0];
        const xTo = gsap.quickTo(box, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(box, "y", { duration: 0.9, ease: "power3.out" });
        const rTo = gsap.quickTo(box, "rotation", { duration: 1.1, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          const dx = e.clientX - r.left - r.width / 2;
          const dy = e.clientY - r.top - r.height / 2;
          xTo(dx * 0.026);
          yTo(dy * 0.03);
          rTo(dx * 0.004);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
          rTo(0);
        };
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerleave", leave);
        return () => {
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerleave", leave);
        };
      }
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex flex-col items-center overflow-hidden"
      style={{
        padding: "clamp(104px,13vh,140px) clamp(12px,2.2vw,30px) 0",
        gap: "clamp(14px,1.8vh,22px)",
        background: "#ffffff",
      }}
    >
      <h1
        className="efc-display"
        aria-label={`${TITLE.join(" ")} ${ROTATING[0]}`}
        style={{
          margin: "0 auto",
          maxWidth: "34ch",
          textAlign: "center",
          fontSize: "clamp(27px,4.6vw,58px)",
          lineHeight: 1.08,
          letterSpacing: "0.005em",
          color: "#14141a",
          textWrap: "balance",
        }}
      >
        {TITLE.map((w) => (
          <span key={w}>
            <span data-hero="word" className="efc-pre inline-block">
              {w}
            </span>{" "}
          </span>
        ))}
        <span data-hero="word" className="efc-pre inline-block">
          <span
            ref={rotRef}
            aria-hidden="true"
            style={{
              position: "relative",
              display: "inline-block",
              verticalAlign: "bottom",
              whiteSpace: "nowrap",
              overflow: "hidden",
              paddingBottom: ".1em",
              marginBottom: "-.1em",
            }}
          >
            <span className="inline-block">{ROTATING[0]}</span>
          </span>
        </span>
      </h1>

      <div
        data-hero="stage"
        className="relative grid w-full place-items-center"
        style={{ zIndex: 6, maxWidth: 1280, paddingBottom: "clamp(40px,7vh,88px)", pointerEvents: "none" }}
      >
        <div data-hero="lift" className="grid w-full place-items-center" style={{ willChange: "transform" }}>
          <Image
            data-hero="container"
            src="/assets/efc-container-hero.png"
            alt="EFC контејнер"
            width={1448}
            height={1086}
            preload
            sizes="(max-width: 900px) 78vw, 680px"
            className="efc-pre"
            style={{
              position: "relative",
              zIndex: 2,
              width: "min(78%, 680px, 64vh)",
              height: "auto",
              transformOrigin: "50% 55%",
              filter: CONTAINER_SHADOW,
              pointerEvents: "auto",
            }}
          />
        </div>
      </div>
    </section>
  );
}
