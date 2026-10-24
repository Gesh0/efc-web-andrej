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

/** Delivery partner: the page's one full-bleed dark band. Everything listed is ELS's capability, credited to them. */
export default function ElsDelivery() {
  return (
    <Segment
      id="delivery"
      dark
      title="Доставата ја врши ELS, нашиот партнер"
      intro="Еко Логистик Сервис има најголем удел на македонскиот пазар за достава. Спакуваните нарачки од нашиот магацин одат директно во нивната мрежа, без чекање меѓу магацинот и курирот."
    >
      <div data-reveal className="grid grid-cols-1 items-start lg:grid-cols-12" style={{ gap: "var(--el)" }}>
        <div className="efc-rise flex min-w-0 flex-col lg:col-span-5" style={{ gap: "var(--el)" }}>
          <Image src="/assets/elslogo-white.png" alt="ELS — Eco Logistic Service" width={420} height={140} style={{ height: 32, width: "auto", alignSelf: "flex-start" }} />
          <ul className="grid grid-cols-1 sm:grid-cols-2" style={{ margin: 0, padding: 0, listStyle: "none", gap: "var(--el)" }}>
            {FEATURES.map((f) => (
              <li key={f.text} className="flex flex-col" style={{ gap: "var(--s8)", fontSize: 15.5, lineHeight: 1.4 }}>
                <span style={{ color: "#ff5a5a", display: "inline-flex" }}>
                  <MaterialIcon name={f.icon} size={24} />
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>

        {/* shipment tracking card: steps land one after another on reveal */}
        <div className="efc-rise min-w-0 lg:col-span-5 lg:col-start-8" style={delay(160)}>
          <div style={{ borderRadius: 4, background: "#ffffff", color: "#14141a", overflow: "hidden" }}>
            <div className="flex items-center justify-between" style={{ gap: "var(--s16)", padding: "var(--s16)", borderBottom: "1px solid rgba(20,20,26,.08)" }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>
                Пратка <span className="font-numeric">4001-20418</span>
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, padding: "2px var(--s8)", borderRadius: 999, color: "#1f9d55", background: "rgba(31,157,85,.1)" }}>Доставено</span>
            </div>
            <ol className="relative" style={{ margin: 0, padding: "var(--s8) var(--s16) var(--s8) 44px", listStyle: "none" }}>
              <span aria-hidden="true" className="absolute" style={{ left: 23, top: 22, bottom: 22, width: 2, background: "rgba(20,20,26,.1)" }} />
              {TRACK.map((t, i) => (
                <li key={t.label} className="efc-rise relative flex items-baseline justify-between" style={{ ...delay(420 + i * 220), gap: "var(--s16)", padding: "var(--s8) 0", fontSize: 14.5 }}>
                  <span
                    aria-hidden="true"
                    className="absolute"
                    style={{ left: -26, top: 13, width: 12, height: 12, borderRadius: "50%", background: RED, boxShadow: "0 0 0 4px #ffffff" }}
                  />
                  <span style={{ fontWeight: i === TRACK.length - 1 ? 600 : 400 }}>{t.label}</span>
                  <span className="font-numeric" style={{ fontSize: 12.5, color: "rgba(20,20,26,.5)", whiteSpace: "nowrap" }}>{t.time}</span>
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-between" style={{ gap: "var(--s16)", padding: "var(--s16)", borderTop: "1px solid rgba(20,20,26,.08)", fontSize: 14 }}>
              <span>Наплата при достава</span>
              <span className="font-numeric" style={{ fontWeight: 600 }}>1.890 ден · картичка</span>
            </div>
          </div>
        </div>
      </div>
    </Segment>
  );
}
