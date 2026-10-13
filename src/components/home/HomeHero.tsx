"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useMagnetic from "@/components/motion/useMagnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TITLE = ["Евидентираме,", "складираме,", "пакуваме", "и", "испорачуваме", "вашите"];
// the object of the sentence cycles through these
const ROTATING = ["нарачки", "продукти", "пратки", "артикли", "парфеми", "играчки", "книги"];

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
  const ctaA = useRef<HTMLAnchorElement>(null);
  const ctaB = useRef<HTMLAnchorElement>(null);
  useRotator(rotRef);
  useMagnetic(ctaA);
  useMagnetic(ctaB);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root);

      // intro — media first, headline words, panel last
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          q("[data-hero=container]"),
          { autoAlpha: 0, y: 74, scale: 1.07, rotation: 4, filter: `blur(14px) ${CONTAINER_SHADOW}` },
          { autoAlpha: 1, y: 0, scale: 1, rotation: 0, filter: `blur(0px) ${CONTAINER_SHADOW}`, duration: 1.6 },
        )
        .fromTo(q("[data-hero=word]"), { yPercent: 108, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.05, stagger: 0.055 }, 0.12)
        .fromTo(q("[data-hero=panel]"), { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 0.7);

      // panel content, revealed on scroll
      const panel = q("[data-hero=panel]")[0];
      gsap.fromTo(
        q("[data-hero=claim-word], [data-hero=logos] > *"),
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.95, ease: "power4.out", stagger: 0.05, scrollTrigger: { trigger: panel, start: "top 78%", once: true } },
      );
      gsap.fromTo(
        q("[data-hero=claim-body], [data-hero=claim-cta]"),
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: q("[data-hero=claim-body]")[0], start: "top 86%", once: true } },
      );

      // clip reveal + slow parallax on the warehouse figure
      const fig = q("[data-hero=figure]")[0];
      const figImg = q("[data-hero=figure-img]")[0];
      gsap
        .timeline({ scrollTrigger: { trigger: fig, start: "top 85%", once: true } })
        .fromTo(fig, { clipPath: "inset(0 0 100% 0 round 18px)" }, { clipPath: "inset(0 0 0% 0 round 18px)", duration: 1.1, ease: "power4.out" })
        .fromTo(figImg, { scale: 1.12, autoAlpha: 0.7 }, { scale: 1, autoAlpha: 1, duration: 1.25, ease: "power4.out" }, 0);
      gsap.to(figImg, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: 1.2, invalidateOnRefresh: true },
      });

      // container floats up and settles as the panel arrives
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
        style={{ zIndex: 6, maxWidth: 1280, marginBottom: "clamp(-160px,-14vw,-54px)", pointerEvents: "none" }}
      >
        <div data-hero="lift" className="grid w-full place-items-center" style={{ willChange: "transform" }}>
          <Image
            data-hero="container"
            src="/assets/efc-container-hero.png"
            alt="EFC контејнер"
            width={1448}
            height={1086}
            preload
            sizes="(max-width: 900px) 62vw, 560px"
            className="efc-pre"
            style={{
              position: "relative",
              zIndex: 2,
              width: "min(62%, 560px, 56vh)",
              height: "auto",
              transformOrigin: "50% 55%",
              filter: CONTAINER_SHADOW,
              pointerEvents: "auto",
            }}
          />
        </div>
      </div>

      <div
        data-hero="panel"
        className="efc-pre relative w-full overflow-hidden text-white"
        style={{
          zIndex: 1,
          maxWidth: 1480,
          borderRadius: "clamp(20px,3vw,40px)",
          background: "#101014",
          padding: "clamp(20px,3.4vw,48px)",
          paddingTop: "calc(clamp(54px,14vw,160px) + clamp(16px,2vw,28px))",
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: "-22%", right: 0, width: "68%", height: "60%", background: "radial-gradient(closest-side, rgba(227,30,30,0.36), rgba(227,30,30,0.1) 58%, rgba(227,30,30,0))" }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: "-18%", left: "-6%", width: "52%", height: "48%", background: "radial-gradient(closest-side, rgba(227,30,30,0.2), rgba(227,30,30,0))" }}
        />

        <div
          className="relative grid items-stretch"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: "clamp(16px,2.6vw,44px)" }}
        >
          <figure
            data-hero="figure"
            className="relative m-0 overflow-hidden"
            style={{ minHeight: "clamp(196px,25vw,296px)", borderRadius: 18, isolation: "isolate" }}
          >
            <div data-hero="figure-img" className="absolute inset-x-0 top-0" style={{ height: "112%", willChange: "transform" }}>
              <Image
                src="/assets/containerpackages.avif"
                alt="Регали со палети во магацинот на EFC"
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "50% 60%", filter: "brightness(1.32) contrast(1.06) saturate(.92)" }}
              />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(10,10,14,0) 55%, rgba(10,10,14,0.22) 100%)" }}
            />
          </figure>

          <div className="flex min-w-0 flex-col justify-start" style={{ gap: "clamp(14px,1.6vw,20px)" }}>
            <h2
              className="efc-display"
              style={{ fontSize: "clamp(26px,3.3vw,50px)", lineHeight: 1.08, letterSpacing: "0.01em", textWrap: "pretty" }}
            >
              <span data-hero="claim-word" className="inline-block" style={{ color: "#e31e1e" }}>
                #1
              </span>{" "}
              <span data-hero="claim-word" className="inline-block">
                логистички
              </span>{" "}
              <span data-hero="claim-word" className="inline-block">
                центар
              </span>
            </h2>
            <p
              data-hero="claim-body"
              style={{ margin: 0, maxWidth: "52ch", fontSize: "clamp(13.5px,1.05vw,16px)", fontWeight: 300, lineHeight: 1.65, color: "rgba(255,255,255,0.72)" }}
            >
              EFC управува со 3.500 m² складишен простор и напреден софтвер за менаџирање на магацин со
              следење на залихите во реално време. Од полицата директно во курирската мрежа, до купувачот
              следниот ден, со секое движење евидентирано.
            </p>
            <div data-hero="claim-cta" className="flex flex-wrap" style={{ gap: 12 }}>
              <Link
                ref={ctaA}
                href="/contact"
                className="inline-flex items-center text-white transition-colors duration-300 hover:bg-white! hover:text-[#101014]!"
                style={{ height: 50, padding: "0 clamp(20px,2.4vw,28px)", borderRadius: 999, background: "#e31e1e", fontSize: 14.5, fontWeight: 500 }}
              >
                Контактирај нè
              </Link>
              <a
                ref={ctaB}
                href="#why"
                className="inline-flex items-center text-white transition-colors duration-300 hover:bg-white/15"
                style={{ height: 50, padding: "0 clamp(20px,2.4vw,28px)", borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)", fontSize: 14.5, fontWeight: 500 }}
              >
                Дознајте повеќе
              </a>
            </div>
            <div
              data-hero="logos"
              className="flex flex-nowrap items-center"
              style={{
                gap: "clamp(12px,1.6vw,18px)",
                marginTop: "clamp(6px,1vw,14px)",
                paddingTop: "clamp(16px,1.8vw,22px)",
                borderTop: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              <Image
                src="/assets/elslogo-white.png"
                alt="ELS — Eco Logistic Service"
                width={420}
                height={140}
                sizes="140px"
                style={{ width: "clamp(96px,10vw,140px)", height: "auto", flex: "none" }}
              />
              <span aria-hidden="true" style={{ flex: "none", width: 1, height: 34, background: "rgba(255,255,255,0.2)" }} />
              <span className="flex min-w-0 flex-col" style={{ flex: "1 1 0", gap: 3 }}>
                <span style={{ fontSize: "clamp(13px,1.1vw,14.5px)", fontWeight: 500, color: "#fff" }}>
                  Партнер на Еко Логистик Сервис
                </span>
                <span style={{ fontSize: "clamp(11.5px,1vw,12.5px)", fontWeight: 300, color: "rgba(255,255,255,0.6)" }}>
                  Најголем удел на македонскиот пазар за достава
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
