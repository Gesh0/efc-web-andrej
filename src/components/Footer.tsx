"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, LinkedIn } from "@/components/icons";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/EFC-Eco-Fulfillment-Center/61575690793398/",
    icon: <Facebook />,
  },
  { label: "Instagram", href: "https://www.instagram.com/efc_fulfillment/", icon: <Instagram /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/efc-macedonia/", icon: <LinkedIn /> },
];

const LINK_STYLE = {
  fontSize: 14.5,
  fontWeight: 400,
  color: "rgba(255,255,255,.78)",
} as const;

const SMALL_LINK_STYLE = {
  fontSize: 12.5,
  fontWeight: 400,
  color: "rgba(255,255,255,.62)",
} as const;

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ flex: "1 1 150px", minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.5)" }}>{title}</div>
      <div className="flex flex-col" style={{ gap: 10, marginTop: 16 }}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const night = pathname === "/services" || pathname === "/contact";

  return (
    <footer
      style={{
        background: night ? "#0b0405" : "#101014",
        color: "#ffffff",
        padding: "clamp(56px,6vw,88px) clamp(20px,3.5vw,56px) clamp(26px,3vw,40px)",
      }}
    >
      <div style={{ maxWidth: isHome ? 1180 : 1320, margin: "0 auto" }}>
        <div className="flex flex-wrap" style={{ gap: "clamp(32px,4vw,64px)" }}>
          <div style={{ flex: "1.4 1 260px", minWidth: 0, maxWidth: 380 }}>
            <Image
              src="/assets/efc-logo-white.avif"
              alt="EFC"
              width={100}
              height={30}
              style={{ height: 30, width: "auto" }}
            />
            <p
              style={{
                margin: "20px 0 0",
                maxWidth: "36ch",
                fontSize: 14.5,
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,.72)",
                textWrap: "pretty",
              }}
            >
              Складирање, процесирање на нарачки и достава низ цела Македонија — од едно место.
            </p>
            <div className="flex" style={{ gap: 10, marginTop: 24 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="grid place-items-center text-white transition-[transform,border-color,background-color] duration-200 ease-(--ease-efc) hover:border-brand! hover:bg-brand active:scale-[.94]"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,.22)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <Column title="Страници">
            <Link href="/" className="efc-link-white transition-colors" style={LINK_STYLE}>Почетна</Link>
            <Link href="/services" className="efc-link-white transition-colors" style={LINK_STYLE}>Услуги</Link>
            <Link href="/#why" className="efc-link-white transition-colors" style={LINK_STYLE}>Зошто EFC</Link>
            <Link href="/about" className="efc-link-white transition-colors" style={LINK_STYLE}>За нас</Link>
            <Link href={isHome ? "/#faq" : "/services#prashanja"} className="efc-link-white transition-colors" style={LINK_STYLE}>Прашања</Link>
          </Column>

          <Column title="Услуги">
            <Link href="/services#uslugi-skladiranje" className="efc-link-white transition-colors" style={LINK_STYLE}>Складирање</Link>
            <Link href="/services#uslugi-fulfilment" className="efc-link-white transition-colors" style={LINK_STYLE}>Процесирање на нарачки</Link>
            <Link href="/services#uslugi-transport" className="efc-link-white transition-colors" style={LINK_STYLE}>Транспорт и достава</Link>
          </Column>

          <Column title="Контакт">
            <span style={{ ...LINK_STYLE, lineHeight: 1.5 }}>
              15 Корпус
              <br />
              Скопје, Северна Македонија
            </span>
            <a href="mailto:contact@efc.mk" className="efc-link-white transition-colors" style={LINK_STYLE}>contact@efc.mk</a>
            <a href="tel:+38970288816" className="efc-link-white transition-colors" style={LINK_STYLE}>+389 70 288 816</a>
            <a href="https://efc.wms.pro/login" target="_blank" rel="noopener" className="efc-link-white transition-colors" style={LINK_STYLE}>Логирај се</a>
          </Column>
        </div>

        <div
          className="flex items-center"
          style={{
            gap: 12,
            marginTop: "clamp(36px,4vw,56px)",
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,.13)",
          }}
        >
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)" }}>
            Партнер на Еко Логистик Сервис
          </span>
          <Image
            src="/assets/elslogo-white.png"
            alt="ELS"
            width={60}
            height={20}
            style={{ height: 20, width: "auto" }}
          />
        </div>

        <div
          className="flex flex-wrap items-center justify-between"
          style={{ gap: "12px 24px", marginTop: 22 }}
        >
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)" }}>
            © 2026 EFC — Еко Фулфилмент Центар. Сите права задржани.
          </span>
          <div className="flex flex-wrap" style={{ gap: "12px 22px" }}>
            <a href="https://efc.mk/politika-na-privatnost" target="_blank" rel="noopener" className="efc-link-white transition-colors" style={SMALL_LINK_STYLE}>
              Политика на приватност
            </a>
            <a href="https://efc.mk/uslovi-za-koristenje" target="_blank" rel="noopener" className="efc-link-white transition-colors" style={SMALL_LINK_STYLE}>
              Услови за користење
            </a>
            <a href="#top" className="efc-link-white transition-colors" style={SMALL_LINK_STYLE}>
              Назад на почеток
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
