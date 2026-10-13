"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown } from "@/components/icons";
import { delay } from "@/components/motion/Words";

const VOLUMES = ["до 300", "300 – 1.500", "1.500 – 5.000", "над 5.000"];
const SERVICES = ["Складирање", "Процесирање на нарачки", "Достава", "Повратни пратки", "Друго"];
const CATEGORIES = ["Облека и обувки", "Козметика и нега", "Електроника", "Дом и градина", "Храна и додатоци", "Друго"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const H2: CSSProperties = {
  margin: 0,
  fontSize: "clamp(22px,2vw,28px)",
  fontWeight: 500,
  letterSpacing: "-.01em",
  color: "#ffffff",
};

const GROUP_LABEL: CSSProperties = { fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,.75)" };

function Chip({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className="efc-press inline-flex flex-none cursor-pointer items-center whitespace-nowrap text-white hover:border-brand!"
      style={{
        height: 42,
        padding: "0 18px",
        borderRadius: 9999,
        border: `1px solid ${on ? "#dc2626" : "rgba(255,255,255,.26)"}`,
        background: on ? "#dc2626" : "transparent",
        fontSize: 14.5,
        fontWeight: 500,
        transition:
          "transform 140ms cubic-bezier(.23,1,.32,1), background-color 220ms cubic-bezier(.23,1,.32,1), border-color 220ms cubic-bezier(.23,1,.32,1)",
      }}
    >
      {label}
    </button>
  );
}

/**
 * Quote request form. Client-side only for now (validates the e-mail and
 * shows a thank-you state) — wire `submit` to a real endpoint when one exists.
 */
export default function ContactForm() {
  const [volume, setVolume] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [emailErr, setEmailErr] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!EMAIL_RE.test(email)) {
      setEmailErr(true);
      return;
    }
    setEmailErr(false);
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setSent(false);
    setVolume(null);
    setServices([]);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start" style={{ gap: 18, paddingTop: 8 }} role="status">
        <span aria-hidden="true" className="grid place-items-center" style={{ width: 52, height: 52, borderRadius: "50%", background: "#dc2626" }}>
          <Check size={22} strokeWidth={2.4} />
        </span>
        <h2 className="efc-display" style={{ fontSize: "clamp(28px,3vw,42px)", lineHeight: 1, color: "#ffffff" }}>
          Ви благодариме
        </h2>
        <p style={{ margin: 0, maxWidth: "42ch", fontSize: 16, fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,.8)" }}>
          Вашето барање е испратено. Ќе ве контактираме наскоро на внесената е-пошта.
        </p>
        <button
          type="button"
          onClick={reset}
          className="efc-press inline-flex cursor-pointer items-center text-white hover:border-brand!"
          style={{ height: 44, padding: "0 20px", borderRadius: 9999, border: "1px solid rgba(255,255,255,.3)", background: "transparent", fontSize: 14, fontWeight: 600 }}
        >
          Испрати ново барање
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate data-reveal="load" className="flex flex-col">
      <h2 className="efc-rise" style={{ ...H2, ...delay(260) }}>
        Ваши податоци
      </h2>
      <div className="efc-rise flex flex-col" style={{ ...delay(330), marginTop: 8 }}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Е-пошта*"
          aria-label="Е-пошта"
          aria-invalid={emailErr}
          aria-describedby={emailErr ? "email-err" : undefined}
          required
          className="efc-field"
          style={emailErr ? { borderBottomColor: "#f87171" } : undefined}
        />
        {emailErr && (
          <span id="email-err" style={{ marginTop: 6, fontSize: 13, color: "#f87171" }}>
            Внесете валидна е-пошта.
          </span>
        )}
        <input name="phone" type="tel" autoComplete="tel" placeholder="Телефон" aria-label="Телефон" className="efc-field" />
      </div>

      <div className="efc-rise flex flex-col" style={delay(400)}>
        <input name="website" type="url" placeholder="Веб-страница или е-продавница" aria-label="Веб-страница или е-продавница" className="efc-field" />
        <div className="relative">
          <select
            name="category"
            aria-label="Категорија производи"
            defaultValue=""
            className="efc-field cursor-pointer appearance-none"
            style={{ paddingRight: 32, color: "rgba(255,255,255,.85)" }}
          >
            <option value="">Категорија производи</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute" style={{ right: 4, bottom: 16, color: "rgba(255,255,255,.7)" }}>
            <ChevronDown />
          </span>
        </div>
      </div>

      <fieldset className="efc-rise m-0 border-0 p-0" style={{ ...delay(470), marginTop: "clamp(30px,3.4vw,40px)" }}>
        <legend className="p-0" style={GROUP_LABEL}>
          Месечен број на нарачки
        </legend>
        <input type="hidden" name="volume" value={volume ?? ""} />
        <div className="flex flex-wrap" style={{ gap: 10, marginTop: 14 }}>
          {VOLUMES.map((v) => (
            <Chip key={v} label={v} on={volume === v} onClick={() => setVolume((cur) => (cur === v ? null : v))} />
          ))}
        </div>
      </fieldset>

      <fieldset className="efc-rise m-0 border-0 p-0" style={{ ...delay(540), marginTop: "clamp(28px,3vw,36px)" }}>
        <legend className="p-0" style={GROUP_LABEL}>
          Потребни услуги
        </legend>
        <input type="hidden" name="services" value={services.join(", ")} />
        <div className="flex flex-wrap" style={{ gap: 10, marginTop: 14 }}>
          {SERVICES.map((s) => (
            <Chip
              key={s}
              label={s}
              on={services.includes(s)}
              onClick={() => setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))}
            />
          ))}
        </div>
      </fieldset>

      <h2 className="efc-rise" style={{ ...H2, ...delay(610), marginTop: "clamp(44px,5vw,64px)" }}>
        Опишете ги вашите потреби
      </h2>
      <div className="efc-rise" style={{ ...delay(680), marginTop: 8 }}>
        <textarea
          name="message"
          rows={5}
          placeholder="Кажете ни повеќе за вашите производи и потреби"
          aria-label="Порака"
          className="efc-field block"
          style={{ lineHeight: 1.5, resize: "vertical" }}
        />
      </div>

      <div
        className="efc-rise flex flex-wrap items-center justify-between"
        style={{ ...delay(750), gap: "16px 24px", marginTop: "clamp(30px,3.4vw,40px)" }}
      >
        <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.55)" }}>Полињата означени со * се задолжителни.</span>
        <button
          type="submit"
          className="efc-btn-red inline-flex cursor-pointer items-center text-white"
          style={{ gap: 10, height: 50, padding: "0 26px", border: 0, borderRadius: 9999, background: "#dc2626", fontSize: 15, fontWeight: 600 }}
        >
          Испрати барање
          <ArrowUpRight size={15} />
        </button>
      </div>
    </form>
  );
}
