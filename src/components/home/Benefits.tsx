import ScrollRail from "@/components/motion/ScrollRail";
import Words, { delay } from "@/components/motion/Words";
import { BoxIcon, GrowthIcon, ReturnIcon, TruckIcon } from "@/components/icons";

const BENEFITS = [
  {
    icon: <GrowthIcon />,
    title: "Операција што расте со вас",
    body: "Повеќе производи или повеќе нарачки не значат нов магацин и нов кадар. Капацитетот се прилагодува на вашиот обем, од првата до илјадитата нарачка.",
  },
  {
    icon: <TruckIcon />,
    title: "Ефикасна достава",
    body: "Нарачките до дневниот пресек заминуваат истиот ден и стигнуваат до купувачот следниот ден, преку доставната мрежа на ELS.",
  },
  {
    icon: <ReturnIcon />,
    title: "Повратни пратки без главоболка",
    body: "Вратената стока ја примаме и проверуваме, а неоштетените артикли се враќаат на залиха. Секој чекор е евидентиран во WMS системот.",
  },
  {
    icon: <BoxIcon />,
    title: "Целосна одговорност",
    body: "Од приемот до испораката, ние целосно се грижиме за вашата стока. Вие се фокусирате на продажбата.",
  },
];

/** Heading reveals word by word, items rise in a stagger and each item's rule draws as it lands. */
export default function Benefits() {
  return (
    <section
      id="benefits"
      data-reveal
      style={{ position: "relative", background: "#ffffff", padding: "clamp(28px,3vw,46px) clamp(20px,3.5vw,56px) clamp(30px,3.2vw,50px)" }}
    >
      <div className="mx-auto flex flex-col items-start" style={{ maxWidth: 1180 }}>
        <ScrollRail style={{ marginBottom: "clamp(20px,3vh,34px)" }} />
        <h2
          className="efc-display"
          style={{ maxWidth: "22ch", textWrap: "pretty", fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 0.96, color: "#1f1f1f" }}
        >
          <Words text="Помалку логистика. Повеќе простор за раст." />
        </h2>
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))",
            columnGap: "clamp(32px,5vw,72px)",
            rowGap: "clamp(36px,4vw,56px)",
            marginTop: "clamp(32px,4vw,56px)",
          }}
        >
          {BENEFITS.map((b, i) => (
            <article key={b.title} className="efc-rise flex min-w-0 flex-col" style={delay(240 + i * 110)}>
              <div className="flex items-center" style={{ gap: 14, paddingBottom: "clamp(14px,1.4vw,18px)" }}>
                {b.icon}
                <h3
                  style={{ margin: 0, fontSize: "clamp(19px,1.7vw,25px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-.01em", color: "#14141a", textWrap: "balance" }}
                >
                  {b.title}
                </h3>
              </div>
              <span
                aria-hidden="true"
                className="efc-draw block"
                style={{ ...delay(400 + i * 110), height: 1, background: "rgba(20,20,26,.14)" }}
              />
              <p
                style={{
                  margin: "clamp(14px,1.4vw,18px) 0 0",
                  maxWidth: "52ch",
                  fontSize: "clamp(14.5px,1.1vw,16px)",
                  lineHeight: 1.6,
                  color: "rgba(20,20,26,.72)",
                  textWrap: "pretty",
                }}
              >
                {b.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
