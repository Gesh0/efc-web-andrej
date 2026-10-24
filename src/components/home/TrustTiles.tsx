import Image from "next/image";
import { delay } from "@/components/motion/Words";
import { Frame, LINE, PAD, rule } from "@/components/home/frame";

const TILES = [
  { num: "3.500 m²", title: "Магацински простор", body: "Палетни регали, зона за прием и посебни станици за пакување. Сè под еден покрив.", img: "/assets/factory.webp", alt: "Палетни регали во магацинот на EFC" },
  { num: "100%", title: "Секоја нарачка е снимена", body: "Камера над секоја станица за пакување. Ако купувач рекламира, ја имаме снимката.", img: "/assets/efc-pick-pack.jpg", alt: "Пакување на нарачка во EFC" },
  { num: "1 ден", title: "До купувачот", body: "Нарачките одат директно во мрежата на ELS, најголемата доставна мрежа во Македонија.", img: "/assets/efc-van-dock.avif", alt: "Возило за достава на рампата на EFC" },
  { num: "24/7", title: "Обезбеден објект", body: "Видео надзор и обезбедување. Вашата стока е заштитена и надвор од работното време.", img: "/assets/containerpackages.avif", alt: "Магацинот на EFC" },
];

/** 2×2 cells rail to rail: photo on top, the figure and its meaning underneath. */
export default function TrustTiles() {
  return (
    <section id="trust" className="relative">
      <Frame>
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: rule(), borderBottom: rule() }}>
          {TILES.map((t, i) => (
            <article
              key={t.num}
              className={`efc-rise flex min-w-0 flex-col ${i > 0 ? "max-md:border-t" : ""} ${i > 1 ? "md:border-t" : ""}`}
              style={{ ...delay((i % 2) * 90), borderColor: LINE }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 9", background: "#101014" }}>
                <Image
                  src={t.img}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 680px"
                  className="object-cover"
                  style={{ filter: "saturate(.85)" }}
                />
              </div>
              <div className={`grid flex-1 items-baseline ${i % 2 ? "md:border-l" : ""}`} style={{ gridTemplateColumns: "auto minmax(0,1fr)", columnGap: 24, rowGap: 6, padding: `28px ${PAD} 32px`, borderTop: rule(), borderColor: LINE }}>
                <span className="font-numeric" style={{ gridRow: "span 2", fontSize: "clamp(36px,3.4vw,56px)", fontWeight: 600, letterSpacing: "-.04em", lineHeight: 1 }}>
                  {t.num}
                </span>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: "-.01em" }}>{t.title}</h3>
                <p style={{ margin: 0, maxWidth: "48ch", fontSize: 15, lineHeight: 1.55, color: "rgba(20,20,26,.66)" }}>{t.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Frame>
    </section>
  );
}
