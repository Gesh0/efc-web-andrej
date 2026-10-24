import Image from "next/image";
import Segment from "@/components/home/Segment";
import MaterialIcon, { type MaterialName } from "@/components/MaterialIcon";
import { delay } from "@/components/motion/Words";

const RED = "#e31e1e";

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

/** Delivery partner. Everything listed here is ELS's capability, credited to them. */
export default function ElsDelivery() {
  return (
    <Segment id="delivery">
      <div
        data-reveal
        className="relative grid grid-cols-[minmax(0,1fr)] items-center overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        style={{ gap: "clamp(28px,4vw,72px)", padding: "clamp(28px,4vw,72px)", borderRadius: 6, background: "#101014", color: "#ffffff" }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: "-30%", right: "-10%", width: "60%", height: "90%", background: "radial-gradient(closest-side, rgba(227,30,30,.28), rgba(227,30,30,0))" }}
        />

        <div className="efc-rise relative flex min-w-0 flex-col items-start" style={{ gap: 20 }}>
          <Image src="/assets/elslogo-white.png" alt="ELS — Eco Logistic Service" width={420} height={140} style={{ height: 36, width: "auto" }} />
          <h2 className="efc-display" style={{ maxWidth: "18ch", fontSize: "clamp(28px,3.4vw,52px)", lineHeight: 1.04 }}>
            Доставата ја врши ELS, нашиот партнер
          </h2>
          <p style={{ margin: 0, maxWidth: "50ch", fontSize: "clamp(15px,1.15vw,17px)", lineHeight: 1.6, color: "rgba(255,255,255,.72)", textWrap: "pretty" }}>
            Еко Логистик Сервис има најголем удел на македонскиот пазар за достава. Спакуваните нарачки од нашиот магацин
            одат директно во нивната мрежа, без чекање меѓу магацинот и курирот.
          </p>
          <ul className="grid w-full" style={{ margin: "8px 0 0", padding: 0, listStyle: "none", gap: 10, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))" }}>
            {FEATURES.map((f) => (
              <li
                key={f.text}
                className="flex items-center"
                style={{ gap: 12, padding: "12px 14px", borderRadius: 6, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", fontSize: 14.5, lineHeight: 1.35 }}
              >
                <span style={{ color: "#ff5a5a", display: "inline-flex", flex: "none" }}>
                  <MaterialIcon name={f.icon} size={20} />
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>

        {/* shipment tracking card: steps land one after another on reveal */}
        <div className="efc-rise relative min-w-0" style={{ ...delay(160), justifySelf: "center", width: "min(100%, 460px)" }}>
          <div style={{ borderRadius: 6, background: "#ffffff", color: "#14141a", boxShadow: "0 30px 70px -30px rgba(0,0,0,.7)", overflow: "hidden" }}>
            <div className="flex items-center justify-between" style={{ gap: 12, padding: "14px 18px", borderBottom: "1px solid rgba(20,20,26,.08)" }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>
                Пратка <span className="font-numeric">4001-20418</span>
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999, color: "#1f9d55", background: "rgba(31,157,85,.1)" }}>Доставено</span>
            </div>
            <ol className="relative" style={{ margin: 0, padding: "10px 18px 10px 46px", listStyle: "none" }}>
              <span aria-hidden="true" className="absolute" style={{ left: 25, top: 22, bottom: 22, width: 2, background: "rgba(20,20,26,.1)" }} />
              {TRACK.map((t, i) => (
                <li key={t.label} className="efc-rise relative flex items-baseline justify-between" style={{ ...delay(420 + i * 220), gap: 12, padding: "11px 0", fontSize: 14.5 }}>
                  <span
                    aria-hidden="true"
                    className="absolute"
                    style={{ left: -26, top: 16, width: 12, height: 12, borderRadius: "50%", background: RED, boxShadow: "0 0 0 4px #ffffff" }}
                  />
                  <span style={{ fontWeight: i === TRACK.length - 1 ? 600 : 400 }}>{t.label}</span>
                  <span className="font-numeric" style={{ fontSize: 12.5, color: "rgba(20,20,26,.5)", whiteSpace: "nowrap" }}>{t.time}</span>
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-between" style={{ gap: 12, padding: "14px 18px", borderTop: "1px solid rgba(20,20,26,.08)", background: "#f7f6f5", fontSize: 14 }}>
              <span>Наплата при достава</span>
              <span className="font-numeric" style={{ fontWeight: 600 }}>1.890 ден · картичка</span>
            </div>
          </div>
        </div>
      </div>
    </Segment>
  );
}
