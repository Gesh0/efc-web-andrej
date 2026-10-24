import type { ReactNode } from "react";
import Image from "next/image";
import { delay } from "@/components/motion/Words";

const N = ({ children }: { children: ReactNode }) => <span className="font-numeric">{children}</span>;

const TILES: { title: ReactNode; body: string; img: string; alt: string; position?: string }[] = [
  {
    title: (
      <>
        Магацин од <span style={{ whiteSpace: "nowrap" }}><N>3.500</N> m²</span>
      </>
    ),
    body: "Палетни регали, зона за прием и посебни станици за пакување. Сè под еден покрив.",
    img: "/assets/factory.webp",
    alt: "Палетни регали во магацинот на EFC",
  },
  {
    title: "Секоја нарачка е снимена",
    body: "Камера над секоја станица за пакување. Ако купувач рекламира дека нешто недостасува, ја имаме снимката.",
    img: "/assets/efc-pick-pack.jpg",
    alt: "Пакување на нарачка во EFC",
  },
  {
    title: "До купувачот следниот ден",
    body: "Нарачките одат директно во мрежата на ELS, најголемата доставна мрежа во Македонија.",
    img: "/assets/efc-van-dock.avif",
    alt: "Возило за достава на рампата на EFC",
  },
  {
    title: (
      <>
        Обезбеден <N>24/7</N>
      </>
    ),
    body: "Видео надзор и обезбедување во секое време. Вашата стока е заштитена и надвор од работното време.",
    img: "/assets/containerpackages.avif",
    alt: "Магацинот на EFC",
    position: "50% 60%",
  },
];

/** Four photo tiles, each carrying one trust message top-left. */
export default function TrustTiles() {
  return (
    <section id="trust" style={{ background: "#ffffff", padding: "calc(var(--section-y) / 2) var(--gutter)" }}>
      <div className="mx-auto" style={{ maxWidth: 1920 }}>
        <h2 className="sr-only">Зошто да ни ја доверите стоката</h2>
        <div
          data-reveal
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,520px),1fr))", gap: "var(--el)" }}
        >
          {TILES.map((t, i) => (
            <article
              key={t.img}
              className="efc-rise group relative overflow-hidden"
              style={{ ...delay(i * 90), aspectRatio: "2 / 1", minHeight: 280, borderRadius: 6, background: "#101014" }}
            >
              <Image
                src={t.img}
                alt={t.alt}
                fill
                sizes="(max-width: 1100px) 100vw, 920px"
                className="object-cover transition-transform duration-700 ease-(--ease-efc) group-hover:scale-[1.04]"
                style={{ objectPosition: t.position ?? "50% 50%", filter: "saturate(.8)" }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(155deg, rgba(10,10,14,.55) 0%, rgba(10,10,14,.2) 38%, rgba(10,10,14,0) 62%)" }}
              />
              <div className="relative flex flex-col" style={{ gap: "var(--s8)", padding: "var(--s32)", maxWidth: "36ch", textShadow: "0 1px 12px rgba(10,10,14,.35)" }}>
                <h3 className="efc-display" style={{ margin: 0, fontSize: "clamp(24px,2.5vw,36px)", lineHeight: 1.02, color: "#ffffff" }}>
                  {t.title}
                </h3>
                <p style={{ margin: 0, fontSize: "clamp(14px,1.05vw,16px)", lineHeight: 1.55, color: "rgba(255,255,255,.86)", textWrap: "pretty" }}>
                  {t.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
