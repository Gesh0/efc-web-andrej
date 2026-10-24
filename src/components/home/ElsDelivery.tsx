import Image from "next/image";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { delay } from "@/components/motion/Words";
import { Chip, Frame, GAP, LINE_DARK, PAD, RED, rule } from "@/components/home/frame";

const FEATURES: { icon: MaterialName; text: string }[] = [
  { icon: "local_shipping", text: "Достава следниот ден низ целата држава" },
  { icon: "password", text: "Потврда на испораката со OTP код" },
  { icon: "payments", text: "Наплата при достава во готово или со картичка" },
  { icon: "location_on", text: "Следење на секоја пратка" },
];

const TRACK = [
  { label: "Спакувано во EFC", time: "23.10 · 15:10" },
  { label: "Преземено од ELS", time: "23.10 · 17:30" },
  { label: "Во достава · Битола", time: "24.10 · 08:05" },
  { label: "Доставено · OTP потврден", time: "24.10 · 11:42" },
];

/** Delivery partner: the one dark band. The frame rails carry on through it; everything listed is ELS's, credited to them. */
export default function ElsDelivery() {
  return (
    <section id="delivery" className="relative" style={{ marginTop: GAP, background: "#121214", color: "#ffffff" }}>
      <Frame>
        <div style={{ borderLeft: rule(LINE_DARK), borderRight: rule(LINE_DARK), paddingTop: GAP, paddingBottom: GAP }}>
          <div style={{ borderTop: rule(LINE_DARK) }}>
            <div data-reveal className="flex flex-col" style={{ gap: 20, maxWidth: 960, padding: `${PAD} ${PAD} calc(${PAD} * 1.5)` }}>
              <span className="efc-rise">
                <Chip dark>Достава</Chip>
              </span>
              <h2 className="efc-display efc-rise" style={{ ...delay(80), fontSize: "clamp(28px,3vw,44px)", lineHeight: 1.12, textWrap: "pretty" }}>
                Доставата ја врши ELS, нашиот партнер.{" "}
                <span style={{ color: "#6b6b72" }}>Најголем удел на македонскиот пазар за достава. Спакуваното од нашиот магацин оди директно во нивната мрежа.</span>
              </h2>
            </div>
          </div>

          <div data-reveal className="grid grid-cols-1 lg:grid-cols-2" style={{ borderTop: rule(LINE_DARK), borderBottom: rule(LINE_DARK) }}>
            <div className="efc-rise flex flex-col" style={{ gap: 32, padding: PAD }}>
              <Image src="/assets/elslogo-white.png" alt="ELS — Eco Logistic Service" width={420} height={140} style={{ height: 32, width: "auto", alignSelf: "flex-start" }} />
              <ul className="grid grid-cols-1 sm:grid-cols-2" style={{ margin: 0, padding: 0, listStyle: "none", borderTop: rule(LINE_DARK) }}>
                {FEATURES.map((f, i) => (
                  <li
                    key={f.text}
                    className={`flex items-center ${i % 2 ? "sm:border-l sm:pl-4" : "sm:pr-4"}`}
                    style={{ gap: 12, padding: "16px 0", borderBottom: rule(LINE_DARK), borderColor: LINE_DARK, fontSize: 15, lineHeight: 1.4 }}
                  >
                    <span className="grid flex-none place-items-center" style={{ width: 36, height: 36, border: rule("#3a3a40"), color: "#ff8a8a" }}>
                      <MaterialIcon name={f.icon} size={19} />
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="efc-rise grid place-items-center lg:border-l" style={{ ...delay(160), padding: PAD, borderColor: LINE_DARK }}>
              <div style={{ width: "min(100%, 440px)", background: "#ffffff", color: "#14141a" }}>
                <div className="flex items-center justify-between" style={{ gap: 12, padding: "14px 16px", borderBottom: rule() }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>
                    Пратка <span className="font-numeric">4001-20418</span>
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 8px", color: "#1f9d55", background: "rgba(31,157,85,.1)" }}>Доставено</span>
                </div>
                <ol className="relative" style={{ margin: 0, padding: "8px 16px 8px 44px", listStyle: "none" }}>
                  <span aria-hidden="true" className="absolute" style={{ left: 23, top: 22, bottom: 22, width: 2, background: "rgba(20,20,26,.1)" }} />
                  {TRACK.map((t, i) => (
                    <li key={t.label} className="efc-rise relative flex items-baseline justify-between" style={{ ...delay(420 + i * 220), gap: 12, padding: "10px 0", fontSize: 14.5 }}>
                      <span aria-hidden="true" className="absolute" style={{ left: -26, top: 15, width: 12, height: 12, borderRadius: "50%", background: RED, boxShadow: "0 0 0 4px #ffffff" }} />
                      <span style={{ fontWeight: i === TRACK.length - 1 ? 600 : 400 }}>{t.label}</span>
                      <span className="font-numeric" style={{ fontSize: 12.5, color: "rgba(20,20,26,.5)", whiteSpace: "nowrap" }}>{t.time}</span>
                    </li>
                  ))}
                </ol>
                <div className="flex items-center justify-between" style={{ gap: 12, padding: "14px 16px", borderTop: rule(), fontSize: 14 }}>
                  <span>Наплата при достава</span>
                  <span className="font-numeric" style={{ fontWeight: 600 }}>1.890 ден · картичка</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>
    </section>
  );
}
