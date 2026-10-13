import type { Metadata } from "next";
import Link from "next/link";
import HeroVideo from "@/components/services/HeroVideo";
import ProcessList from "@/components/services/ProcessList";
import CoverageMap from "@/components/services/CoverageMap";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import Words, { delay } from "@/components/motion/Words";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Услуги — складирање, процесирање на нарачки и достава | EFC",
  description:
    "Прием, складирање, селектирање и пакување и достава преку ELS — поврзани во еден процес, со еден партнер и целосна прегледност преку WMS системот.",
};

export default function ServicesPage() {
  return (
    <div style={{ background: "#0b0405", color: "#ffffff" }}>
      {/* ============ HERO (video) ============ */}
      <section id="top" className="relative overflow-hidden" style={{ background: "#0b0405", padding: "0 clamp(20px,3.5vw,56px)" }}>
        <HeroVideo />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(7,3,4,.44) 0%,rgba(7,3,4,.16) 34%,rgba(7,3,4,.34) 62%,rgba(7,3,4,.82) 88%,rgba(7,3,4,.92) 100%)",
          }}
        />
        <div
          data-reveal="load"
          className="relative mx-auto"
          style={{ maxWidth: 1320, padding: "clamp(120px,22vh,240px) 0 clamp(48px,6vh,76px)" }}
        >
          <span
            aria-hidden="true"
            className="efc-draw block"
            style={{ width: "clamp(46px,5vw,70px)", height: 3, marginBottom: "clamp(16px,1.8vw,22px)", background: "#dc2626" }}
          />
          <h1 className="efc-display" style={{ maxWidth: "24ch", fontSize: "clamp(32px,4vw,58px)", lineHeight: 0.94, color: "#ffffff" }}>
            <Words text="Складирање, подготовка и достава — поврзани во еден процес." />
          </h1>
          <p
            className="efc-rise"
            style={{
              ...delay(180),
              margin: "clamp(22px,2.6vw,30px) 0 0",
              maxWidth: "56ch",
              fontSize: "clamp(15px,1.15vw,17.5px)",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "rgba(255,255,255,.86)",
              textWrap: "pretty",
            }}
          >
            Од приемот на производите до испораката до вашиот клиент, EFC ја презема целата оперативна логистика на
            едно место. Вие се фокусирате на продажбата и растот. Ние се грижиме за сè што се случува потоа.
          </p>
          <div className="efc-rise flex flex-wrap items-center" style={{ ...delay(270), gap: 14, marginTop: "clamp(26px,3vw,38px)" }}>
            <Link
              href="/contact"
              className="efc-split relative inline-flex items-center overflow-hidden"
              style={{ height: 52, padding: "0 30px", borderRadius: 9999, background: "#dc2626" }}
            >
              <span aria-hidden="true" className="efc-sweep" />
              <span className="efc-split-ink inline-flex items-center text-white" style={{ gap: 10, fontSize: 15, fontWeight: 600 }}>
                Ајде да поразговараме
                <ArrowRight />
              </span>
            </Link>
            <a
              href="#uslugi"
              className="efc-press inline-flex items-center justify-center whitespace-nowrap text-white transition-colors hover:border-white!"
              style={{ height: 52, padding: "0 28px", borderRadius: 9999, border: "1px solid rgba(255,255,255,.32)", fontSize: 15, fontWeight: 500 }}
            >
              Нашите услуги
            </a>
          </div>
        </div>
      </section>

      {/* ============ PROCESS (scroll-driven steps) ============ */}
      <ProcessList />

      {/* ============ COVERAGE MAP ============ */}
      <section style={{ background: "#ffffff", color: "#1f1f1f", padding: "clamp(18px,2.2vw,32px) clamp(20px,3.5vw,56px)" }}>
        <div className="mx-auto flex flex-wrap items-center" style={{ gap: "clamp(28px,4vw,64px)", maxWidth: 1320 }}>
          <div data-reveal className="min-w-0" style={{ flex: "1 1 300px", maxWidth: 480 }}>
            <span
              className="efc-rise inline-flex items-center text-white"
              style={{ height: 32, padding: "0 16px", borderRadius: 9999, background: "#dc2626", fontSize: 13, fontWeight: 600 }}
            >
              Покриеност
            </span>
            <h2 className="efc-display" style={{ margin: "14px 0 0", maxWidth: "16ch", fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 0.96, color: "#1f1f1f" }}>
              <Words text="Од Скопје до вашите клиенти низ цела Македонија." />
            </h2>
            <div
              className="efc-rise flex flex-col"
              style={{
                ...delay(270),
                gap: "1em",
                margin: "clamp(20px,2.4vw,30px) 0 0",
                maxWidth: "52ch",
                fontSize: "clamp(15px,1.12vw,17px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(31,31,31,.72)",
                textWrap: "pretty",
              }}
            >
              <p style={{ margin: 0 }}>
                Магацинот на EFC е во Скопје, од каде подготвените пратки директно се вклучуваат во дистрибутивната
                мрежа на ELS.
              </p>
              <p style={{ margin: 0 }}>
                На тој начин, со еден оперативен процес добивате складирање, подготовка и достава до градови и
                населени места низ целата држава.
              </p>
            </div>
          </div>
          <CoverageMap />
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FaqSection id="prashanja" maxWidth={1320} />

      {/* ============ CTA ============ */}
      <CtaBand
        id="kontakt"
        title="Како изгледа вашата логистика денес?"
        body="Кажете ни колку производи и нарачки обработувате и што ви одзема најмногу време. Ќе ви покажеме како EFC може да се вклопи во вашиот процес."
        href="mailto:contact@efc.mk"
      />
    </div>
  );
}
