"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/MaterialIcon";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import useMagnetic from "@/components/motion/useMagnetic";

const LOGIN_URL = "https://efc.wms.pro/login";

const LINKS = [
  { href: "/", label: "Почетна" },
  { href: "/services", label: "Услуги" },
  { href: "/#why", label: "Зошто EFC" },
  { href: "/about", label: "За нас" },
];

/**
 * Floating pill nav. Light on the home and about pages, dark on contact, and
 * on /services it rides dark over the hero video, then turns into the light
 * pill once the white page is behind it.
 */
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [overHero, setOverHero] = useState(pathname === "/services");
  const contactRef = useRef<HTMLAnchorElement>(null);
  useMagnetic(contactRef);

  useEffect(() => {
    if (pathname !== "/services") return;
    const hero = document.getElementById("top");
    if (!hero) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      setOverHero(hero.getBoundingClientRect().bottom > 70);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const dark =
    pathname === "/contact" || (pathname === "/services" && overHero);

  const ink = dark ? "#ffffff" : "#1f1f1f";
  const shell: CSSProperties = isHome
    ? {
        top: "clamp(8px,1.6vw,14px)",
        left: "clamp(8px,2.5vw,24px)",
        right: "clamp(8px,2.5vw,24px)",
        padding: "10px 10px 10px clamp(14px,2vw,20px)",
        borderRadius: 15,
        border: "1px solid rgba(20,20,26,0.1)",
        background: "rgba(255,255,255,0.62)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
      }
    : {
        top: 14,
        left: "clamp(14px,2.5vw,24px)",
        right: "clamp(14px,2.5vw,24px)",
        padding: "12px clamp(14px,1.6vw,20px)",
        borderRadius: 24,
        border: `1px solid ${dark ? "rgba(255,255,255,.18)" : "rgba(31,31,31,.12)"}`,
        background: dark
          ? pathname === "/contact"
            ? "rgba(11,4,5,.6)"
            : "rgba(11,4,5,.44)"
          : "rgba(255,255,255,.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      };

  return (
    <header
      style={{
        position: "fixed",
        margin: "0 auto",
        maxWidth: 1200,
        zIndex: 50,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px 20px",
        transition:
          "background-color 320ms cubic-bezier(.23,1,.32,1), border-color 320ms cubic-bezier(.23,1,.32,1)",
        ...shell,
      }}
    >
      <Link
        href="/"
        aria-label="EFC — почетна"
        className="flex flex-none items-center"
        style={{ gap: 9, color: ink }}
      >
        <Logo size={isHome ? 30 : 28} />
        <span
          style={{
            fontFamily: "var(--font-wordmark)",
            fontSize: isHome ? 25 : 23,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: ink,
            transition: "color 240ms cubic-bezier(.23,1,.32,1)",
          }}
        >
          EFC
        </span>
      </Link>

      <nav
        className="flex min-w-0 flex-wrap items-center justify-end"
        style={{ gap: "clamp(10px,2vw,28px)" }}
      >
        {LINKS.map(({ href, label }) => {
          const current = href === pathname;
          return (
            <Link
              key={href}
              href={href}
              aria-current={current ? "page" : undefined}
              className="efc-link max-sm:hidden"
              style={{
                fontSize: 14.5,
                fontWeight: current ? 500 : 400,
                color: current
                  ? ink
                  : dark
                    ? "rgba(255,255,255,.72)"
                    : "rgba(31,31,31,.68)",
                transition: "color 280ms cubic-bezier(.23,1,.32,1)",
              }}
            >
              {label}
            </Link>
          );
        })}
        <a
          href={LOGIN_URL}
          target="_blank"
          rel="noopener"
          aria-label="Логирај се"
          className="efc-press inline-flex items-center whitespace-nowrap px-5 hover:border-brand! hover:text-brand! max-sm:px-[9px]"
          style={{
            height: 40,
            borderRadius: 9999,
            border: `1px solid ${dark ? "rgba(255,255,255,.34)" : "rgba(20,20,26,.22)"}`,
            color: dark ? "#ffffff" : "#14141a",
            fontSize: 13.5,
            fontWeight: 600,
            transition:
              "transform 140ms cubic-bezier(.23,1,.32,1), border-color 240ms cubic-bezier(.23,1,.32,1), color 240ms cubic-bezier(.23,1,.32,1)",
          }}
        >
          {/* phones: icon only, so the nav stays on one row next to the CTA */}
          <span className="max-sm:hidden">Логирај се</span>
          <span className="inline-flex sm:hidden">
            <MaterialIcon name="login" size={20} />
          </span>
        </a>
        <Link
          ref={contactRef}
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          className="inline-flex items-center text-white hover:bg-[#ef2f2f]!"
          style={{
            height: 40,
            padding: "0 22px",
            borderRadius: 9999,
            background: "#dc2626",
            fontSize: 13.5,
            fontWeight: 600,
          }}
        >
          Започнете разговор
        </Link>
      </nav>
    </header>
  );
}
