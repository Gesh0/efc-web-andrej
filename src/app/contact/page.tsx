import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import Words, { delay } from "@/components/motion/Words";

export const metadata: Metadata = {
  title: "Контакт — Ајде да разговараме | EFC Еко Фулфилмент Центар",
  description:
    "Кажете ни повеќе за вашиот бизнис и обемот на нарачки, а ние ќе ви предложиме решение за складирање, процесирање и достава.",
};

const LABEL = { fontSize: 13.5, fontWeight: 500, color: "rgba(255,255,255,.55)" } as const;
const VALUE = { fontSize: 16, fontWeight: 500, color: "#ffffff" } as const;

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0405", color: "#ffffff" }}>
      <section id="top" style={{ padding: "clamp(130px,16vh,180px) clamp(20px,3.5vw,56px) clamp(64px,8vw,120px)" }}>
        <div
          className="mx-auto grid items-start"
          style={{ maxWidth: 1200, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "clamp(48px,7vw,128px)" }}
        >
          <div data-reveal="load" className="flex min-w-0 flex-col">
            <h1 className="efc-display" style={{ maxWidth: "12ch", fontSize: "clamp(40px,6vw,88px)", lineHeight: 0.94, color: "#ffffff" }}>
              <Words text="Ајде да разговараме" start={80} />
            </h1>
            <p
              className="efc-rise"
              style={{
                ...delay(260),
                margin: "clamp(20px,2.4vw,30px) 0 0",
                maxWidth: "40ch",
                fontSize: "clamp(16px,1.3vw,19px)",
                fontWeight: 300,
                lineHeight: 1.55,
                color: "rgba(255,255,255,.82)",
                textWrap: "pretty",
              }}
            >
              Кажете ни повеќе за вашиот бизнис и обемот на нарачки, а ние ќе ви предложиме решение за складирање,
              процесирање и достава.
            </p>
            <figure
              className="efc-rise relative overflow-hidden"
              style={{ ...delay(330), margin: "clamp(32px,4vw,48px) 0 0", aspectRatio: "4/3", borderRadius: 16, background: "#151012" }}
            >
              <Image
                src="/assets/factory.webp"
                alt="Магацин со палетни регали"
                fill
                preload
                sizes="(max-width: 900px) 100vw, 540px"
                style={{ objectFit: "cover", filter: "saturate(.6) brightness(.84)" }}
              />
            </figure>
            <div
              className="efc-rise grid"
              style={{
                ...delay(400),
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))",
                gap: "22px 32px",
                marginTop: "clamp(28px,3vw,40px)",
                paddingTop: "clamp(22px,2.4vw,30px)",
                borderTop: "1px solid rgba(255,255,255,.14)",
              }}
            >
              <div className="flex flex-col" style={{ gap: 6 }}>
                <span style={LABEL}>Е-пошта</span>
                <a href="mailto:contact@efc.mk" className="efc-link" style={VALUE}>
                  contact@efc.mk
                </a>
              </div>
              <div className="flex flex-col" style={{ gap: 6 }}>
                <span style={LABEL}>Телефон</span>
                <a href="tel:+38970288816" className="efc-link" style={VALUE}>
                  +389 70 288 816
                </a>
              </div>
              <div className="flex flex-col" style={{ gap: 6 }}>
                <span style={LABEL}>Адреса</span>
                <span style={{ ...VALUE, lineHeight: 1.45 }}>15 Корпус, Скопје</span>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
