<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Conventions

- **Numbers are always Outfit.** Any numeral rendered in the UI (stat figures, KPIs, percentages, prices) must use the `font-numeric` Tailwind utility (Outfit, loaded in `src/app/layout.tsx`, token in `src/app/globals.css`). Surrounding text stays in Onest (`--font-sans`).
- **Scroll/parallax animations: check `react-scroll-parallax` first.** Before hand-rolling a scroll-driven effect (parallax drift, scroll-progress reveals), check whether `react-scroll-parallax` (already a dependency — see `src/components/ContainerRevealSection.tsx`) covers it with its built-in effects (`translateY`/`translateX`, `scale`, `rotate`, `opacity`, `speed`, `onProgressChange`, `<ParallaxBanner>`). Only fall back to GSAP ScrollTrigger for what it can't express (pinning, timeline choreography across multiple elements).
