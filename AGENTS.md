<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Conventions

- **One typeface: Geist.** Copy, headings (sentence case, `.efc-display`), numerals and the wordmark all use Geist, loaded once in `src/app/layout.tsx`. Numerals still carry the `font-numeric` utility (token in `src/app/globals.css`) so they can be restyled in one place.
- **Scroll/parallax animations: check `react-scroll-parallax` first.** Before hand-rolling a scroll-driven effect (parallax drift, scroll-progress reveals), check whether `react-scroll-parallax` (already a dependency — see `src/components/ContainerRevealSection.tsx`) covers it with its built-in effects (`translateY`/`translateX`, `scale`, `rotate`, `opacity`, `speed`, `onProgressChange`, `<ParallaxBanner>`). Only fall back to GSAP ScrollTrigger for what it can't express (pinning, timeline choreography across multiple elements).
