"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole site: every `[data-reveal]` element gets `.is-in`
 * the first time it enters the viewport (`data-reveal="load"` gets it on the
 * first frame instead). The CSS in globals.css does the actual animating, so
 * server components can opt into reveals with plain attributes.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = (el: Element) => el.classList.add("is-in");

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target);
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (reduce) return show(el);
        if (el.getAttribute("data-reveal") === "load") {
          requestAnimationFrame(() => show(el));
        } else {
          io.observe(el);
        }
      });
    };
    scan();

    // client components can mount reveal targets after the first scan
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
