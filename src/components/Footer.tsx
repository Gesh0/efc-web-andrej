"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, LinkedIn } from "@/components/icons";
import { Frame, PAD, rule } from "@/components/home/frame";

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/people/EFC-Eco-Fulfillment-Center/61575690793398/", icon: <Facebook /> },
  { label: "Instagram", href: "https://www.instagram.com/efc_fulfillment/", icon: <Instagram /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/efc-macedonia/", icon: <LinkedIn /> },
];

const LINE = "#2c2c32";
const LINK = { fontSize: 15, color: "rgba(255,255,255,.78)" } as const;
const SMALL = { fontSize: 13, color: "rgba(255,255,255,.55)" } as const;

function Column({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`} style={{ gap: 20, padding: PAD, borderColor: LINE }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.45)" }}>{title}</div>
      <div className="flex flex-col" style={{ gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

/** Dark footer on the same frame as the home page: rails carry through, columns are cells divided by lines. */
export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer style={{ background: "#121214", color: "#ffffff" }}>
      <Frame>
        <div style={{ borderLeft: rule(LINE), borderRight: rule(LINE) }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <div className="flex flex-col sm:col-span-2 lg:col-span-1" style={{ gap: 24, padding: PAD }}>
              <Image src="/assets/efc-logo-white.avif" alt="EFC" width={100} height={30} style={{ height: 30, width: "auto", alignSelf: "flex-start" }} />
              <p style={{ margin: 0, maxWidth: "36ch", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.7)" }}>
                Складирање, пакување и достава низ цела Македонија, од еден логистички центар на влезот на Скопје.
              </p>
              <div className="flex" style={{ gap: 8 }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={s.label}
                    className="grid place-items-center text-white hover:border-brand! hover:bg-brand"
                    style={{ width: 40, height: 40, border: rule("rgba(255,255,255,.22)") }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <Column title="Страници" className="max-lg:border-t lg:border-l">
              <Link href="/" className="efc-link-white" style={LINK}>Почетна</Link>
              <Link href="/services" className="efc-link-white" style={LINK}>Услуги</Link>
              <Link href="/#why" className="efc-link-white" style={LINK}>Зошто EFC</Link>
              <Link href="/about" className="efc-link-white" style={LINK}>За нас</Link>
              <Link href={isHome ? "/#faq" : "/services#prashanja"} className="efc-link-white" style={LINK}>Прашања</Link>
            </Column>

            <Column title="Услуги" className="border-t sm:border-l lg:border-t-0">
              <Link href="/services#uslugi-skladiranje" className="efc-link-white" style={LINK}>Складирање</Link>
              <Link href="/services#uslugi-fulfilment" className="efc-link-white" style={LINK}>Процесирање на нарачки</Link>
              <Link href="/services#uslugi-transport" className="efc-link-white" style={LINK}>Транспорт и достава</Link>
            </Column>

            <Column title="Контакт" className="border-t sm:col-span-2 lg:col-span-1 lg:border-t-0 lg:border-l">
              <span style={{ ...LINK, lineHeight: 1.5 }}>
                Ферспед, 15 Корпус
                <br />
                Скопје, Северна Македонија
              </span>
              <a href="mailto:contact@efc.mk" className="efc-link-white" style={LINK}>contact@efc.mk</a>
              <a href="tel:+38970288816" className="efc-link-white" style={LINK}>+389 70 288 816</a>
              <a href="https://efc.wms.pro/login" target="_blank" rel="noopener" className="efc-link-white" style={LINK}>Логирај се</a>
            </Column>
          </div>

          <div className="flex flex-wrap items-center justify-between" style={{ gap: "16px 32px", padding: `24px ${PAD}`, borderTop: rule(LINE) }}>
            <div className="flex flex-wrap items-center" style={{ gap: "8px 24px" }}>
              <span style={SMALL}>© 2026 EFC — Еко Фулфилмент Центар. Сите права задржани.</span>
              <span className="inline-flex items-center" style={{ ...SMALL, gap: 10 }}>
                Партнер на Еко Логистик Сервис
                <Image src="/assets/elslogo-white.png" alt="ELS" width={60} height={20} style={{ height: 18, width: "auto" }} />
              </span>
            </div>
            <div className="flex flex-wrap" style={{ gap: "8px 24px" }}>
              <a href="https://efc.mk/politika-na-privatnost" target="_blank" rel="noopener" className="efc-link-white" style={SMALL}>Политика на приватност</a>
              <a href="https://efc.mk/uslovi-za-koristenje" target="_blank" rel="noopener" className="efc-link-white" style={SMALL}>Услови за користење</a>
              <a href="#top" className="efc-link-white" style={SMALL}>Назад на почеток</a>
            </div>
          </div>
        </div>
      </Frame>
    </footer>
  );
}
