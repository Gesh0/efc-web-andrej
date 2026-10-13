import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollStatement from "@/components/about/ScrollStatement";
import Words, { delay } from "@/components/motion/Words";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "За нас | EFC — Еко Фулфилмент Центар",
  description:
    "EFC е логистички центар во Скопје за складирање, процесирање на нарачки и достава, партнер на Еко Логистик Сервис.",
};

const SIDE = "clamp(20px,3.5vw,56px)";

const H2: CSSProperties = {
  fontSize: "clamp(28px,3.2vw,46px)",
  lineHeight: 0.98,
  color: "#14141a",
};

const BODY: CSSProperties = {
  margin: 0,
  maxWidth: "48ch",
  fontSize: "clamp(16px,1.25vw,18px)",
  lineHeight: 1.6,
  color: "rgba(20,20,26,.78)",
  textWrap: "pretty",
};

const FIGURE: CSSProperties = {
  margin: 0,
  position: "relative",
  aspectRatio: "4/3",
  borderRadius: "clamp(14px,1.6vw,22px)",
  overflow: "hidden",
  background: "#ece7e3",
};

const SERVICES = [
  {
    href: "/services#uslugi-skladiranje",
    img: "/assets/img1-service.png",
    alt: "Работник носи пратка низ магацинот",
    title: "Складирање",
    body: "Простор за вашите производи, без сопствен магацин.",
  },
  {
    href: "/services#uslugi-fulfilment",
    img: "/assets/img2-service.png",
    alt: "Предавање на пратка",
    title: "Процесирање на нарачки",
    body: "Селектирање, проверка и пакување истиот ден.",
  },
  {
    href: "/services#uslugi-transport",
    img: "/assets/img3-service.png",
    alt: "Камион за транспорт на пратки",
    title: "Транспорт и достава",
    body: "Достава следниот ден низ целата држава.",
  },
];

function Pill({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const content = (
    <>
      {children}
      <ArrowUpRight />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener" className="efc-pill">
      {content}
    </a>
  ) : (
    <Link href={href} className="efc-pill">
      {content}
    </Link>
  );
}

export default function AboutPage() {
  return (
    <div style={{ background: "#ffffff", color: "#14141a" }}>
      {/* ============ HERO ============ */}
      <section id="top" style={{ padding: `clamp(140px,18vh,200px) ${SIDE} clamp(56px,7vw,96px)` }}>
        <div data-reveal="load" className="mx-auto flex flex-col items-center text-center" style={{ maxWidth: 1200 }}>
          <span className="efc-rise" style={{ fontSize: 14.5, fontWeight: 500, color: "rgba(20,20,26,.6)" }}>
            Компанија
          </span>
          <h1 className="efc-display" style={{ margin: "14px 0 0", fontSize: "clamp(52px,9vw,128px)", lineHeight: 0.92, color: "#14141a" }}>
            <Words text="За EFC" start={120} step={70} />
          </h1>
          <p
            className="efc-rise"
            style={{
              ...delay(200),
              margin: "clamp(22px,2.6vw,32px) 0 0",
              maxWidth: "46ch",
              fontSize: "clamp(17px,1.5vw,21px)",
              fontWeight: 300,
              lineHeight: 1.55,
              color: "rgba(20,20,26,.78)",
              textWrap: "balance",
            }}
          >
            EFC — Еко Фулфилмент Центар е логистички центар во Скопје за складирање, процесирање на нарачки и
            достава. Нашата цел е секоја нарачка да стигне до купувачот брзо, точно и следливо.
          </p>
        </div>
      </section>

      {/* ============ MISSION ============ */}
      <section style={{ padding: `0 ${SIDE} clamp(64px,8vw,120px)` }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div
            data-reveal
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
              gap: "clamp(20px,4vw,72px)",
              paddingTop: "clamp(24px,3vw,36px)",
              borderTop: "1px solid rgba(20,20,26,.12)",
            }}
          >
            <h2 className="efc-display efc-rise" style={H2}>
              Нашата мисија
            </h2>
            <div className="efc-rise flex flex-col items-start" style={{ ...delay(90), gap: 20 }}>
              <p style={{ ...BODY, maxWidth: "52ch" }}>
                Е-трговијата во Македонија расте побрзо од логистичката инфраструктура. Ние ја преземаме целата
                оператива — магацин, пакување и достава — за вие да се фокусирате на продажбата и растот.
              </p>
              <div className="flex flex-wrap" style={{ gap: 12 }}>
                <Pill href="/services">Нашите услуги</Pill>
                <Pill href="/#why">Зошто EFC</Pill>
              </div>
            </div>
          </div>
          <figure
            data-reveal
            className="efc-rise"
            style={{ ...FIGURE, aspectRatio: "21/9", marginTop: "clamp(36px,4.4vw,64px)" }}
          >
            <Image
              src="/assets/efc-pick-pack.jpg"
              alt="Селектирање и пакување на нарачки во магацинот на EFC"
              fill
              sizes="(max-width: 1260px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
            />
          </figure>
        </div>
      </section>

      {/* ============ STATEMENT ============ */}
      <section style={{ padding: `clamp(40px,6vw,96px) ${SIDE}` }}>
        <ScrollStatement text="Ја градиме логистиката што им овозможува на македонските е-продавници да растат без сопствен магацин." />
      </section>

      {/* ============ ELS PARTNER ============ */}
      <section style={{ padding: `clamp(64px,8vw,120px) ${SIDE} 0` }}>
        <div
          data-reveal
          className="mx-auto grid items-center"
          style={{ maxWidth: 1200, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "clamp(32px,5vw,80px)" }}
        >
          <figure className="efc-rise" style={FIGURE}>
            <Image
              src="/assets/services-details.webp"
              alt="Камиони на товарните рампи, поглед од воздух"
              fill
              sizes="(max-width: 860px) 100vw, 600px"
              style={{ objectFit: "cover", filter: "saturate(.8)" }}
            />
          </figure>
          <div className="efc-rise flex flex-col items-start" style={{ ...delay(90), gap: 20 }}>
            <Image src="/assets/elslogo.png" alt="ELS — Eco Logistic Service" width={90} height={30} style={{ height: 30, width: "auto" }} />
            <h2 className="efc-display" style={H2}>
              Партнер на Еко Логистик Сервис
            </h2>
            <p style={BODY}>
              Доставата ја врши нашиот партнер ELS, најголемата логистичка мрежа за достава на пратки во Северна
              Македонија. Подготвените нарачки од нашиот магацин директно влегуваат во нивната мрежа и стигнуваат до
              купувачот следниот ден.
            </p>
            <Pill href="/services#uslugi-transport">За доставата</Pill>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section style={{ padding: `clamp(64px,8vw,120px) ${SIDE} 0` }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div
            data-reveal
            className="flex flex-wrap items-end justify-between"
            style={{ gap: "16px 32px", paddingTop: "clamp(24px,3vw,36px)", borderTop: "1px solid rgba(20,20,26,.12)" }}
          >
            <h2 className="efc-display efc-rise" style={H2}>
              Што работиме
            </h2>
            <Link href="/services" className="efc-rise efc-link inline-flex items-center" style={{ ...delay(90), gap: 8, fontSize: 15, fontWeight: 600, color: "#14141a" }}>
              Сите услуги
              <ArrowUpRight />
            </Link>
          </div>
          <div
            data-reveal
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
              gap: "clamp(16px,2vw,28px)",
              marginTop: "clamp(28px,3.4vw,44px)",
            }}
          >
            {SERVICES.map((s, i) => (
              <div key={s.href} className="efc-rise" style={delay(i * 90)}>
                <Link href={s.href} className="group efc-press flex flex-col" style={{ gap: 16, color: "#14141a" }}>
                  <span className="relative block overflow-hidden" style={{ aspectRatio: "1/1", borderRadius: 16, background: "#ece7e3" }}>
                    <Image
                      src={s.img}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, 400px"
                      className="object-cover transition-transform duration-600 ease-(--ease-efc) group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="flex flex-col" style={{ gap: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-.01em" }}>{s.title}</span>
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(20,20,26,.66)" }}>{s.body}</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TECHNOLOGY ============ */}
      <section style={{ padding: `clamp(64px,8vw,120px) ${SIDE} 0` }}>
        <div
          data-reveal
          className="mx-auto grid items-center"
          style={{ maxWidth: 1200, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "clamp(32px,5vw,80px)" }}
        >
          <div className="efc-rise flex flex-col items-start" style={{ gap: 20 }}>
            <h2 className="efc-display" style={H2}>
              Технологија зад секоја нарачка
            </h2>
            <p style={BODY}>
              Секое движење на стоката се евидентира во нашиот WMS систем, од приемот до испораката. Нашите клиенти
              во секој момент имаат увид во залихата и статусот на секоја нарачка.
            </p>
            <Pill href="https://efc.wms.pro/login" external>
              Логирај се во WMS
            </Pill>
          </div>
          <figure className="efc-rise" style={{ ...FIGURE, ...delay(90) }}>
            <Image
              src="/assets/track.jpg"
              alt="Следење на нарачки на таблет"
              fill
              sizes="(max-width: 860px) 100vw, 600px"
              style={{ objectFit: "cover", filter: "saturate(.8)" }}
            />
          </figure>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section style={{ padding: `clamp(80px,10vw,150px) ${SIDE}` }}>
        <div
          data-reveal
          className="mx-auto flex flex-col items-center text-center"
          style={{ maxWidth: 1200, gap: "clamp(22px,2.6vw,32px)" }}
        >
          <h2
            className="efc-display"
            style={{ maxWidth: "18ch", fontSize: "clamp(34px,5vw,72px)", lineHeight: 0.96, color: "#14141a", textWrap: "balance" }}
          >
            <Words text="Ајде да ја поедноставиме вашата логистика" />
          </h2>
          <div className="efc-rise" style={delay(300)}>
            <Link
              href="/contact"
              className="efc-btn-red inline-flex items-center text-white"
              style={{ gap: 10, height: 52, padding: "0 28px", borderRadius: 9999, background: "#dc2626", fontSize: 15, fontWeight: 600 }}
            >
              Контактирај нè
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
