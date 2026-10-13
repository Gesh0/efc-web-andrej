# Handoff: EFC — Eco Fulfillment Center Marketing Site

## Overview
A three-page marketing website for **EFC (Eco Fulfillment Center)**, a Warehouse-as-a-Service (WaaS) operator based in Skopje, North Macedonia. The site sells fulfillment-as-a-service to growing e-commerce businesses, explains the operating model, presents market data, and captures leads via a quote-request form.

Pages:
1. **Home** (`EFC Landing.dc.html`) — hero + product narrative + lead form.
2. **Contact** (`Contact.dc.html`) — map, direct contact info, quote form, About Us.
3. **Case Studies** (`Case Studies.dc.html`) — market-insight statistics + WaaS value argument.

The target rebuild is **Next.js (React)**.

---

## About the Design Files
The files in `design_files/` are **design references created in HTML** — prototypes that show the intended look, layout, copy, and interactions. **They are not production code to copy directly.**

The `.dc.html` files use a small in-house template runtime (`support.js`) with custom tags (`<x-dc>`, `<sc-if>`, `<sc-for>`, `{{ }}` holes) and a `class Component extends DCLogic` logic block at the bottom of each file. **Do not port this runtime.** Read these files only to extract markup structure, inline styles (the source of truth for all visual tokens), copy, and the documented behavior below — then re-implement everything idiomatically in Next.js with your component model and styling solution of choice (CSS Modules, Tailwind, styled-components, etc.).

If you open the files: the real DOM/markup lives between `<x-dc>` and `</x-dc>`; dynamic values like `{{ pills }}`, `{{ navStyle }}` are computed in the `renderVals()` method of the trailing `<script>`. Everything else is plain inline-styled HTML.

---

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, and interactions are all specified. Recreate the UI pixel-perfectly. All visual values are inline in the HTML; the exact tokens are also consolidated in the **Design Tokens** section below.

---

## Global System (applies to all pages)

### Typography
- **Font family:** `Schibsted Grotesk` (Google Fonts, weights 400/500/600/700/800/900), fallback `-apple-system, system-ui, sans-serif`. Load via `next/font/google`.
- **Headings:** weight 800, `letter-spacing: -0.025em` to `-0.03em`, `line-height ~1.05`, `text-wrap: balance`.
- **Body:** weight 400–500, `line-height ~1.5`, secondary text uses `text-wrap: pretty`.
- **Eyebrow/labels:** 11.5–12.5px, weight 600–700, `letter-spacing .07em–.14em`, `text-transform: uppercase`.

### Global Navigation (fixed top bar) — present on every page
- `position: fixed; top:0; left:0; right:0; z-index:50`.
- Layout: `display:flex; align-items:center; justify-content:space-between; padding:15px clamp(24px,5vw,72px)` (Contact & Case Studies). On Home the padding animates with scroll (see Home → Nav behavior).
- **Left:** EFC logo mark (red SVG, 26×26) + wordmark "EFC" (`font-weight:800; font-size:21px; letter-spacing:.14em`).
- **Right:** three links — `Home`, `Case Studies`, `Contact` — `font-size:14.5px; gap: clamp(22px,3vw,40px)`. Inactive links `color:#374151; font-weight:500`; the **active page's link** is `color:#DC2626; font-weight:600`. Hover → `#DC2626`.
- **Solid variant** (Contact, Case Studies, and Home-after-scroll): `background: rgba(249,250,251,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid #E5E7EB; box-shadow: 0 6px 28px -18px rgba(10,10,12,0.5)`. Logo/links use dark text (`#0a0a0c` / `#374151`).
- **Transparent variant** (Home, before scroll, over the dark hero): `background: transparent; no border; no shadow`. Logo wordmark `#fff`, links `rgba(255,255,255,0.86)`.
- Logo mark is **always red** (`#DC2626`) in both variants.

**Nav routing:** Home → `/`, Case Studies → `/case-studies`, Contact → `/contact`. Logo → `/`.

### EFC logo mark (SVG)
Six red (`#DC2626`) angular paths forming a stylized "EFC" monogram, `viewBox="0 0 1024 1024"`. The exact `<path d="…">` data is in every `.dc.html` (search for `viewBox="0 0 1024 1024"`). Extract it into a reusable `<Logo />` component with a `color` prop (defaults red; only ever red here).

---

## Screens / Views

### 1. Home (`EFC Landing.dc.html`)
Full marketing landing page. Sections top to bottom:

**a. Hero** — `id="top"`, full-viewport (`height:100svh; min-height:640px`), dark (`#0a0a0c`).
- Background: looping muted autoplay `<video>` (`assets/efc-hero-loop.webm`, `object-fit:cover`), with a vertical gradient scrim on top: `linear-gradient(180deg, rgba(8,9,12,0.62) 0%, rgba(8,9,12,0.38) 38%, rgba(8,9,12,0.30) 62%, rgba(8,9,12,0.70) 100%)`, plus an optional flat darkening layer whose opacity = `scrimDarkness` setting (default 0).
- Content (vertically centered, default **left**-aligned, padding `0 clamp(24px,6vw,96px) 72px`):
  - **Pill badge:** "Warehouse-as-a-Service" — `padding:7px 14px 7px 11px; border:1px solid rgba(255,255,255,0.20); border-radius:100px; background:rgba(255,255,255,0.06); backdrop-filter:blur(6px)`; leading 7px red dot with `box-shadow:0 0 0 4px rgba(220,38,38,0.22)`; text 12.5px/600/uppercase/`rgba(255,255,255,0.92)`.
  - **H1:** "Your Warehouse. Your Logistics. **Zero Investments.**" — `color:#fff; font-weight:800; font-size:clamp(40px,6.4vw,86px); line-height:1.02; letter-spacing:-0.03em; max-width:14ch`. "Zero Investments." is `#DC2626`.
  - **Sub:** "Professional Warehouse-as-a-Service in Macedonia." — `clamp(16px,1.7vw,22px); rgba(255,255,255,0.80); margin-top:26px`.
  - **CTA button:** "Start Scaling" + arrow icon — `background:#DC2626; color:#fff; font-weight:700; font-size:17px; padding:18px 34px; border-radius:8px; box-shadow:0 10px 34px -8px rgba(220,38,38,0.62)`. Hover: `translateY(-2px); background:#ef2f2f; box-shadow:0 16px 40px -8px rgba(220,38,38,0.72)`.
- **Scroll cue** (optional, toggle `showScrollCue`, default on): centered bottom, "Scroll" label + chevron with a gentle bounce animation (`efcCue`, 1.8s ease-in-out infinite, translateY 0→7px + opacity .45→1).

**b. WaaS Paradigm** — white (`#FFFFFF`), padding `clamp(80px,10vw,148px) clamp(24px,6vw,96px)`, inner `max-width:1180px`.
- Centered header: red-dot eyebrow "The WaaS Paradigm", H2 "Two ways to run a warehouse. Only one scales." (`clamp(30px,4vw,52px)`, `#0a0a0c`), subhead `#6b7280`.
- Two comparison cards (`flex; gap:24px; flex-wrap; align-items:stretch`), each `flex:1 1 360px; border-radius:18px; padding:clamp(28px,3vw,42px)`:
  - **Traditional Logistics** (`background:#F9FAFB; border:1px solid #E5E7EB`): label, "High CapEx", description, 4 cons each with a gray "✕" icon (`#9CA3AF`), rows separated by `1px solid #ECEDEF`.
  - **Warehouse-as-a-Service** (`background:#0a0a0c; box-shadow:0 30px 60px -28px rgba(220,38,38,0.45)`): a "Recommended" pill (top-right, red-tinted), red label, "Agile OpEx", description in `rgba(255,255,255,0.66)`, 4 pros each with a red "✓" check (`#DC2626`), rows separated by `1px solid rgba(255,255,255,0.10)`, body text `#f3f4f6`.

**c. How it Works** — `id` none, light (`#F9FAFB`), same padding/width pattern.
- Centered header: eyebrow "How it Works", H2 "The journey of every product.", subhead.
- **Vertical timeline**, `max-width:940px`, 6 alternating steps (left/right of a center spine). Spine: 2px vertical line, gradient fade top/bottom (`linear-gradient(180deg, rgba(220,38,38,0) 0%, #E5E7EB 7%, #E5E7EB 93%, rgba(220,38,38,0) 100%)`).
  - Each step: a circular **marker node** (`62×62; border-radius:50%; background:#fff; border:1px solid #E5E7EB; box-shadow:0 8px 24px -8px rgba(10,10,12,0.20)`) centered on the spine, containing a red line-icon; and a content block (max-width 330px) with red step number (`01`–`06`, weight 800, `letter-spacing:.16em`), H3 (`clamp(19px,2vw,24px)`), and description (`#6b7280`).
  - Steps: 01 Arrival & Acceptance · 02 Counting & Verification · 03 Systematic Storage · 04 Sorting & Cross-Docking · 05 Preparation & Packaging · 06 Returns Management.
  - **Responsive:** below ~760px the spine moves to the left (`left:31px`), markers sit at the start (`order:-1`), all content goes single-column left-aligned, empty columns hide.

**d. Strategic Integration (ELS)** — white, two-column (`flex; gap:clamp(40px,6vw,88px); align-items:center`).
- **Left copy:** eyebrow "Strategic Integration", H2 "Native delivery, built in.", paragraph mentioning **Eco Logistic Services (ELS)** partnership, then 3 feature rows (icon tile `44×44; border-radius:12px; background:rgba(220,38,38,0.07); border:1px solid rgba(220,38,38,0.20)` + red icon, H4 + description), separated by `1px solid #ECEDEF`: "One integrated handoff", "Tracked to the doorstep", "Nationwide coverage".
- **Right lockup card** (`max-width:420px; background:#F9FAFB; border:1px solid #E5E7EB; border-radius:22px`): "Native Integration · Live" header (green dot `#16A34A` + glow), an **EFC** row card, a vertical connector with a red circular sync icon, and an **ELS** row card (`Eco Logistic Services · Last-mile delivery · Macedonia`).

**e. Proprietary Technology (DARK)** — **this is the only dark section in the body** (`background:#0A0F1D`), padding `clamp(150px,17vw,250px) … clamp(80px,9vw,140px)`. A gradient transition strip at the top fades white→`#0A0F1D` (`height:clamp(120px,16vw,220px)`).
- Centered header: eyebrow "Proprietary Technology", H2 "Meet Nostro — our warehouse OS." (`#fff`), subhead `rgba(255,255,255,0.62)`.
- **Featured screenshot** (`max-width:1080px`): a faux browser window — title bar `#11182b` with a red + two gray dots and a monospace URL "app.efc.mk/orders" — wrapping `assets/nostro-orders.png`. Card: `border-radius:16px; border:1px solid rgba(255,255,255,0.10); background:#0E1426; box-shadow:0 50px 110px -45px rgba(0,0,0,0.85), 0 0 80px -40px rgba(220,38,38,0.25)`.
- Below: a two-column row — **left** three feature rows (red icon tiles on dark: `background:rgba(220,38,38,0.12); border:1px solid rgba(220,38,38,0.30)`): "Real-time order tracking", "Live inventory control", "Courier & COD integration"; **right** a second faux browser window ("app.efc.mk/inventory") wrapping `assets/nostro-inventory.png`.

**f. Request a Quote (LIGHT)** — `id="contact"`, light (`#F9FAFB`), `border-top:1px solid #E5E7EB`.
- Centered header: eyebrow "Request a Quote", H2 "Let's build your fulfillment.", subhead.
- Two columns (`flex; gap:clamp(24px,3.5vw,52px); align-items:stretch`):
  - **Form card** (`flex:1 1 520px; background:#FFFFFF; border:1px solid #E5E7EB; border-radius:22px; padding:clamp(26px,3vw,42px); box-shadow:0 30px 60px -40px rgba(10,10,12,0.18)`). See **Quote Form** under Components.
  - **Contact info card** (`flex:1 1 300px`, same card styling): "Talk to us directly", 3 info rows (Email `contact@efc.mk`, Phone `+389 70 288 816`, Address `15 Korpus, Skopje, S. Macedonia`) with red icon tiles; footer (border-top) with logo + "EFC · Eco Fulfillment Center".

> **Note:** The Quote Form and Contact info also appear on the Contact page. Build them once as shared components.

#### Home → Nav scroll behavior
The Home nav starts **transparent** (white text over the dark hero). On `window.scrollY > 40` it switches to the **solid** variant (light blurred bar, dark text) and shrinks padding from `22px` to `13px`, transitioning `background, padding, box-shadow, border-color` over `.25s`. Implement with a scroll listener + state, or `IntersectionObserver` on the hero. Other pages don't need this — their nav is always solid.

---

### 2. Contact (`Contact.dc.html`)
Light theme throughout. Fixed solid nav (active link: **Contact**). First section padding-top clears the fixed nav (`clamp(118px,13vw,168px)`).

**a. Contact** — `id="contact"`, `background:#F9FAFB`.
- Centered header: eyebrow "Contact", H2 "Get in touch.", subhead.
- Two columns (`flex; gap:clamp(24px,3.5vw,52px); align-items:stretch`):
  - **Left** (`flex:1 1 440px; display:flex; flex-direction:column; gap:24px`):
    - **Google Map** in a rounded card (`border-radius:22px; overflow:hidden; border:1px solid #E5E7EB; box-shadow:0 30px 60px -40px rgba(10,10,12,0.18)`, `flex:1 1 auto; min-height:340px`). Embed: an `<iframe>` keyless Google Maps embed → `https://maps.google.com/maps?q=15%20Korpus%2C%20Skopje%2C%20North%20Macedonia&t=&z=15&ie=UTF8&iwloc=&output=embed`, `width:100%; height:100%; min-height:340px; border:0`. (Consider a proper Maps Embed API key + place ID for production.)
    - **Direct contact card** (white, same card styling): Address, Email (`contact@efc.mk`), Phone (`+389 70 288 816`) rows with red icon tiles, separated by `1px solid #ECEDEF`.
  - **Right:** the **Quote Form** card (identical to Home's), prefixed with its own heading "Request a quote" + one-line subhead.

**b. About Us** — `background:#FFFFFF; border-top:1px solid #E5E7EB`. Two columns (`align-items:center`):
- **Left** (`flex:1 1 380px`): the **workflow animation** (`assets/efc-workflow.webp`, animated WebP, autoplays/loops as an `<img>`) in a rounded card (`max-width:480px; border-radius:24px; overflow:hidden; border:1px solid #E5E7EB; box-shadow:0 40px 80px -44px rgba(10,10,12,0.30)`).
- **Right** (`flex:1 1 430px`): eyebrow "About Us", H2 "One team running your whole fulfillment.", two paragraphs, and a 3-stat row (`6 steps` / `Nationwide` / `€0`, each with red `clamp(28px,3vw,36px)` number + gray label).

---

### 3. Case Studies (`Case Studies.dc.html`)
Light theme. Fixed solid nav (active link: **Case Studies**).

**a. Hero** — `id="case-studies"`, `background:#F9FAFB`, padding-top clears nav.
- Centered: eyebrow "Case Studies · Market Insight", H1 "The Macedonian E-Commerce Boom" (`clamp(38px,5.6vw,76px)`), subhead (`max-width:60ch`).

**b. Insight Cards** — `background:#F9FAFB`. Three equal cards (`flex:1 1 320px; gap:24px; align-items:stretch`), each white `border-radius:20px; padding:clamp(28px,3vw,40px); box-shadow:0 30px 60px -42px rgba(10,10,12,0.18); display:flex; flex-direction:column`:
  - Top: red icon tile (44×44) + uppercase gray category label.
  - Big stat: red (`#DC2626`), `clamp(48px,6vw,68px)`, weight 800, `line-height:0.9`, with a smaller "%" / unit.
  - Bold dark sub-label, then `#6b7280` description (key figures bolded `#0a0a0c`).
  - `margin-top:auto` chip pinned to the bottom (`background:#F9FAFB; border:1px solid #E5E7EB; border-radius:8px; padding:7px 12px`).
  - **Card 1 — Rapid Market Growth:** `+25.4%` · "Total completed online transactions grew **25.4% in Q1 2025**, reaching **€213.3 million**." · chip "€213.3M total · Q1 2025".
  - **Card 2 — The Cross-Border Challenge:** `+32%` · "Cross-border online shopping **surged 32%**…" · chip "Demand outpacing local supply".
  - **Card 3 — Consumer Adoption:** `64%` · "**64% of internet users** in Macedonia now purchase goods online from domestic sellers…" · chip "Domestic-first shopping habit".
  - Below the row: a `#9CA3AF` source line "Source: Macedonian e-commerce market data, Q1 2025."

**c. WaaS Infrastructure** — `background:#FFFFFF; border-top:1px solid #E5E7EB`. Two columns (`align-items:center`):
- **Left:** eyebrow "What This Means", H2 "Growth this fast outpaces the warehouse you can build.", two paragraphs, and a red CTA "Scale with EFC" → `/contact` (same button style as Home's hero CTA but `padding:16px 30px; font-size:16px`).
- **Right:** three feature rows (red icon tiles, H4 + description), separated/bounded by `1px solid #ECEDEF`: "Zero upfront investment", "Scale capacity on demand", "Infrastructure already built".

---

## Components (build as shared/reusable)

### Quote Form (used on Home §f and Contact §a-right)
Controlled form with these fields:
- **Name** (text, required), **Last Name** (text, required) — side by side (`flex:1 1 200px` each, `gap:16px`, wraps).
- **Email Address** (email, required).
- **Business Profile** — multi-select pill group, "Select all that apply". Options: `Startup Business`, `Physical Store`, `Only E-store`, `Under 5000 products`, `Over 5000 products`. Each pill: `padding:11px 17px; border-radius:100px; font-size:14px; font-weight:600; gap:9px` with a 7px leading dot.
  - **Off state:** `background:#fff; border:1px solid #E5E7EB; color:#374151`; dot `#9CA3AF`.
  - **On state:** `background:#DC2626; border:1px solid #DC2626; color:#fff; box-shadow:0 8px 20px -8px rgba(220,38,38,0.6)`; dot `#fff`.
  - Transition `background/border-color/color .15s`.
- **Message** — textarea, 5 rows, `resize:vertical`.
- **Submit button:** full-width, "Send me an offer" + arrow — `background:#DC2626; color:#fff; font-weight:800; font-size:15.5px; letter-spacing:.08em; text-transform:uppercase; padding:18px 28px; border-radius:11px; box-shadow:0 14px 36px -10px rgba(220,38,38,0.6)`. Hover: `translateY(-2px); background:#ef2f2f; box-shadow:0 20px 44px -10px rgba(220,38,38,0.7)`.

**Inputs/textarea (light):** `padding:14px 16px; background:#F9FAFB; border:1px solid #E5E7EB; border-radius:11px; color:#0a0a0c; font-size:15px`. Placeholder `#9CA3AF`. **Focus:** `border-color:#DC2626; background:#fff`.
**Labels:** `display:block; color:#6b7280; font-size:12.5px; font-weight:600; letter-spacing:.07em; text-transform:uppercase; margin-bottom:9px`.

### Quote Form — success state
On submit (`preventDefault`), replace the form with a centered confirmation:
- Red circular check badge (66×66, `background:#DC2626`, white check icon, `box-shadow:0 14px 36px -10px rgba(220,38,38,0.6)`).
- H3 "Offer request received." (`#0a0a0c`).
- Paragraph "Thanks — our team will review your business profile and send a tailored offer to your inbox shortly." (`#6b7280`, `max-width:42ch`).
- Secondary button "Send another request" → resets form state. Outline style: `border:1px solid #E5E7EB; color:#374151`; hover `background:#F9FAFB; border-color:#D1D5DB`.

> The prototype is **front-end only** — submit just flips to the success view; there is no backend. Wire to a real endpoint / email service / CRM as needed.

### Faux Browser Window (Proprietary Technology section)
Reusable frame: title bar `padding:14px 18px; background:#11182b; border-bottom:1px solid rgba(255,255,255,0.07)`, three 11px dots (first red `#DC2626`, others `rgba(255,255,255,0.20)`), a monospace URL label (`ui-monospace, 'SF Mono', Menlo, monospace; color:rgba(255,255,255,0.42)`), and a full-bleed screenshot below. Outer: `border-radius:16px; border:1px solid rgba(255,255,255,0.10); background:#0E1426` + the dark glow shadow noted above.

### Icon tile (used throughout)
`width:44–46px; height:44–46px; border-radius:11–12px; display:flex; center`. Light sections: `background:rgba(220,38,38,0.07); border:1px solid rgba(220,38,38,0.20)`. Dark sections: `background:rgba(220,38,38,0.12); border:1px solid rgba(220,38,38,0.30)`. Contains a 22px red stroked line-icon (`stroke="#DC2626"`, `stroke-width ~1.8`). Icons are simple inline SVGs — copy `<path>`s from the source files, or substitute an icon library (e.g. lucide-react) with matching glyphs.

---

## Interactions & Behavior
- **Nav (Home):** transparent→solid + padding shrink on scroll past 40px (`.25s` transitions). Other pages: nav always solid.
- **Hero video:** muted, autoplay, loop, `playsinline`; call `.play()` on mount and swallow rejection (some browsers block autoplay).
- **Scroll cue:** keyframe bounce, infinite.
- **CTA buttons:** hover lift `translateY(-2px)` + brighter red `#ef2f2f` + larger shadow, `.18s cubic-bezier(.2,.7,.2,1)`.
- **Pills:** click toggles membership in the selected set; visual on/off as specified.
- **Form submit:** `preventDefault` → success view; "Send another" resets all fields + selected pills.
- **Inputs:** focus turns border red and background white.
- **Links:** hover → `#DC2626`.
- **Workflow animation:** animated WebP, plays automatically and loops (no controls).

## State Management
Scoped, local component state — no global store needed.
- **Quote form:** `name`, `lastName`, `email`, `message` (strings); `profiles` (set/array of selected pill keys); `submitted` (boolean). Submit → `submitted=true`; reset → clear all.
- **Home nav:** `scrolled` (boolean) from a scroll listener (threshold 40px). Optionally `viewportWidth` for the timeline's mobile layout switch (≤760px) — or just use CSS media queries in the rebuild.
- No data fetching in the prototype (forms are stubbed).

## Design Tokens

**Colors**
- Brand red: `#DC2626` · hover red: `#ef2f2f` · red dot glow: `rgba(220,38,38,0.22)` (dark) / `rgba(220,38,38,0.16)` (light)
- Red tints (icon tiles): light `rgba(220,38,38,0.07)` bg / `rgba(220,38,38,0.20)` border; dark `rgba(220,38,38,0.12)` bg / `rgba(220,38,38,0.30)` border
- Ink / near-black text: `#0a0a0c`
- Hero dark bg: `#0a0a0c` · WaaS card dark: `#0a0a0c`
- Tech section dark bg: `#0A0F1D` · dark card surface: `#0E1426` · dark title bar: `#11182b`
- Page light bg: `#F9FAFB` · white surface: `#FFFFFF`
- Borders: `#E5E7EB` (primary) · `#ECEDEF` (hairline dividers) · `#D1D5DB` (hover)
- Secondary text: `#6b7280` · tertiary/labels: `#9CA3AF` · medium text: `#374151` · light body on dark: `#f3f4f6`
- White-on-dark text opacities: `rgba(255,255,255,0.92/0.86/0.80/0.66/0.62/0.58/0.55/0.46)`
- Success green (ELS live dot): `#16A34A`

**Radii:** 8px (buttons), 11–12px (inputs, icon tiles), 14px (lockup rows), 16px (browser frames), 18px (WaaS cards), 20px (insight cards), 22px (form/contact/map cards), 24px (about animation card), 100px / 50% (pills, dots, markers).

**Shadows:**
- Red CTA: `0 10px 34px -8px rgba(220,38,38,0.62)` → hover `0 16px 40px -8px rgba(220,38,38,0.72)`
- Form submit btn: `0 14px 36px -10px rgba(220,38,38,0.6)` → hover `0 20px 44px -10px rgba(220,38,38,0.7)`
- Light cards: `0 30px 60px -40px rgba(10,10,12,0.18)` (and `-42px/-44px` variants)
- Nav (solid): `0 6px 28px -18px rgba(10,10,12,0.5)`
- Timeline marker: `0 8px 24px -8px rgba(10,10,12,0.20)`
- Dark browser frames: `0 50px 110px -45px rgba(0,0,0,0.85), 0 0 80px -40px rgba(220,38,38,0.25)`
- WaaS dark card: `0 30px 60px -28px rgba(220,38,38,0.45)`

**Spacing/layout conventions:** content `max-width:1180px` (1080 for tech feature, 940 for timeline, 700–720 for centered headers); section padding `clamp(80px,10vw,148px) clamp(24px,6vw,96px)`; column gaps `clamp(24px,3.5vw,88px)`; everything is flexbox with `flex-wrap` + `flex:1 1 <basis>` (no fixed grid). All sizing uses `clamp()` for fluid responsiveness.

**Pill / animation keyframes:** `efcCue` (scroll cue bounce: translateY 0→7px, opacity .45→1, 1.8s ease-in-out infinite); `efcFadeUp` (defined but optional — opacity 0→1, translateY 18px→0).

## Assets
All in `design_files/assets/` — copy into the Next.js `public/` (or import) directory:
- `efc-hero-loop.webm` — hero background video (muted/loop).
- `efc-workflow.webp` — **animated** WebP (640×640, 547 frames) of the EFC fulfillment workflow; used in Contact → About Us. Plays/loops automatically as an `<img>`.
- `nostro-orders.png` — Nostro WMS "Orders" dashboard screenshot (Proprietary Technology, featured frame).
- `nostro-inventory.png` — Nostro WMS "Inventory" dashboard screenshot (Proprietary Technology, secondary frame).
- **EFC logo** is inline SVG (no file) — extract the six `#DC2626` paths (`viewBox="0 0 1024 1024"`) into a `<Logo />` component.

Fonts: **Schibsted Grotesk** via Google Fonts / `next/font`.

## Files
In `design_files/`:
- `EFC Landing.dc.html` — Home page (all 6 sections).
- `Contact.dc.html` — Contact page (map + form + About Us).
- `Case Studies.dc.html` — Case Studies page (hero + insight cards + WaaS infrastructure).
- `support.js` — the prototype runtime. **Reference only — do not port.**
- `assets/` — images + video listed above.

## Suggested Next.js structure (guidance, not prescriptive)
- Routes: `/` (Home), `/contact`, `/case-studies`.
- Shared components: `<Nav variant="transparent|solid" active=…/>`, `<Logo/>`, `<QuoteForm/>` (+ success state), `<ContactInfoCard/>`, `<IconTile/>`, `<BrowserFrame url=… src=…/>`, `<SectionHeader eyebrow=… title=… sub=…/>`, `<CtaButton/>`.
- Put the design tokens above into your styling layer (CSS variables / Tailwind theme).
- The hero video, the scroll-driven nav, and the form belong in client components; everything else can be server components.
