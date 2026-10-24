import Image from "next/image";
import Link from "next/link";
import Words, { delay } from "@/components/motion/Words";
import { ArrowUpRight } from "@/components/icons";
import { Frame, GAP, LINE_DARK, PAD, RED, rule } from "@/components/home/frame";

const STEPS = [
  { title: "Ве повикуваме", body: "Прв разговор за вашата продавница." },
  { title: "Прашуваме", body: "Производи, артикли и број на нарачки." },
  { title: "Посета", body: "Го гледате магацинот одблизу." },
  { title: "Понуда", body: "Точна цена за вашите бројки." },
];

/** Closing dark band on the frame: statement + button left, the swinging container right, next steps as cells below. */
export default function HomeCta() {
  return (
    <section id="kontakt" className="relative" style={{ marginTop: GAP, background: "#121214", color: "#ffffff" }}>
      <Frame>
        <div style={{ borderLeft: rule(LINE_DARK), borderRight: rule(LINE_DARK) }}>
          <div data-reveal className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 460 }}>
            <div className="flex flex-col items-start justify-center" style={{ gap: 24, padding: `calc(${PAD} * 2) ${PAD}` }}>
              <h2 className="efc-display" style={{ fontSize: "clamp(32px,3.6vw,56px)", lineHeight: 1.05, textWrap: "balance" }}>
                <Words text="Кажете ни што продавате" step={50} />
              </h2>
              <p className="efc-rise" style={{ ...delay(240), margin: 0, maxWidth: "44ch", fontSize: 16.5, lineHeight: 1.6, color: "rgba(255,255,255,.7)" }}>
                Ќе ви кажеме точно како би работеле со вашата стока и колку би чинело.
              </p>
              <Link
                href="/contact"
                className="efc-rise inline-flex items-center text-white"
                style={{ ...delay(340), gap: 10, height: 50, padding: "0 24px", background: RED, fontSize: 15, fontWeight: 600 }}
              >
                Започнете разговор
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="relative overflow-hidden lg:border-l" style={{ minHeight: 320, borderColor: LINE_DARK }}>
              <div className="absolute" style={{ inset: PAD }}>
                <div className="relative h-full w-full" style={{ transformOrigin: "52% 6%", animation: "efcSwing 4600ms cubic-bezier(.45,0,.55,1) infinite" }}>
                  <Image
                    src="/assets/efc-container-solid-v2.webp"
                    alt="EFC контејнер обесен на кран"
                    fill
                    sizes="(max-width: 1024px) 90vw, 640px"
                    style={{ objectFit: "contain", filter: "drop-shadow(0 26px 60px rgba(220,38,38,.3))" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <ol className="grid grid-cols-2 lg:grid-cols-4" style={{ margin: 0, padding: 0, listStyle: "none", borderTop: rule(LINE_DARK) }}>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={`flex flex-col ${i % 2 ? "border-l" : ""} ${i > 1 ? "max-lg:border-t" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                style={{ gap: 6, padding: `24px ${PAD} 28px`, borderColor: LINE_DARK }}
              >
                <span className="font-numeric" style={{ fontSize: 12.5, fontWeight: 600, color: RED }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, color: "rgba(255,255,255,.6)" }}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Frame>
    </section>
  );
}
