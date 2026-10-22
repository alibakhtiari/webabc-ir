# Product Requirements Document (PRD): WebABC.ir Redesign to the ASCII Magic Design System

**Project Name:** WebABC Terminal-Native Redesign (`webabc.ir/en/`)  
**Target URL:** [https://webabc.ir/en/](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) (with bi-directional parity for `/` Persian and `/ar/` Arabic)  
**Design Reference:** [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii) & [ASCII Magic Studio](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2F)  
**Date:** October 20, 2026  
**Status:** Ready for Implementation  

## 1. Executive Summary helps WebABC transition from a standard agency template to an interactive engineering showcase

[WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) is a full-service digital agency specializing in custom web development, WordPress and WooCommerce engineering, technical SEO, Core Web Vitals optimization, and UI/UX audits for clients across the Middle East and internationally. While the agency offers strong technical capabilities and five free browser-based SEO/marketing tools, the current visual presentation relies on conventional corporate layouts and generic vector illustrations (`Digital marketing and web development illustration`, `SEO Results Image`).

Redesigning [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) using the visual language and open-source `<ascii-art>` runtime of the [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii) aligns the medium with the message. Instead of telling prospective clients that WebABC builds high-speed, Core Web Vitals-compliant websites, the site itself becomes a live, zero-bloat demonstration of technical craft—replacing heavy raster graphics with 3–10 KB procedural canvas animations, slash-prefixed terminal typography, interactive character-ramp switchers, and front-and-center SEO utility tools.

## 2. Current-State vs. Target-State Audit maps every existing WebABC asset into the new paradigm

| Dimension | Current State on `webabc.ir/en/` | Target State (`ascii-magic.com/ascii` Paradigm) |
| :--- | :--- | :--- |
| **Visual Identity** | Conventional agency layout with generic vector illustrations and standard rounded cards. | Dark-first, terminal-native studio aesthetic with `1px solid #30363d` hairline grids, monospace telemetry badges, and slash-prefixed section headers (`/SERVICES`, `/RESULTS`, `/TOOLS`). |
| **Hero Media** | Static "Digital marketing and web development illustration" graphic beside headline text. | Interactive live `<ascii-art>` stage featuring curated technical animations (`request-waterfall`, `live-line-chart`, `code-editor`, `world-map-pings`) with a scene shuffler and 11-mode `Look` switcher. |
| **Service Showcase** | Three standard text tabs (`SEO`, `Custom Website Design`, `Content Creation`) with bullet pills. | Interactive Studio Matrix where selecting each service dynamically switches a live procedural ASCII animation, displays real performance telemetry badges, and triggers a pre-filled consultation prompt. |
| **Results Proof** | Static bullet list paired with a generic "SEO Results Image" placeholder. | Live animated ASCII data visualization (`star-history-climb` and `live-line-chart`) framed inside a terminal window with verified Core Web Vitals and organic growth metrics. |
| **Free SEO Tools** | Five high-value tools (`Cost Calculator`, `Meta Generator`, `Headline CTR Checker`, `UTM Builder`, `FAQ Schema Maker`) buried in the footer and FAQ text. | Dedicated `/FREE-TOOLS` interactive homepage showcase modeled on the [ASCII Magic Use-Case Builders](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fuse), driving immediate product-led engagement and lead capture. |
| **Theme & Locale** | Light/dark toggle and `en / fa / ar` switcher over a standard corporate layout. | High-contrast GitHub-dark default (`#0d1117`) with a crisp daylight mode (`#f6f8fa`) and strict `dir="ltr"` isolation on all `<ascii-art>` canvases so Persian (`fa`) and Arabic (`ar`) RTL layouts never scramble character grids. |

## 3. Target Audience & User Personas drive conversion paths across three distinct visitor groups

1. **Growth-Focused Business Owners & CMOs (Middle East & International):** Seeking reliable custom web development, WooCommerce builds, or full-stack SEO. They need immediate proof of engineering quality, transparent deliverables, and frictionless contact via the Consultation Modal or WhatsApp (`+98 912 581 1880` / `+98 935 476 7068`).
2. **Product & Technical Leads Seeking Speed & UX Audits:** Looking for Core Web Vitals remediation, technical SEO architecture, or UI/UX conversion audits. The lightweight `<ascii-art>` runtime (under 10 KB per piece, zero layout shift) proves WebABC practices elite performance engineering.
3. **Marketers & Developers Using Free SEO Tools:** Visiting for the `Meta Description & Tag Generator`, `Headline & Title Checker`, `UTM Link Builder`, `FAQ Schema Generator`, or `Website Cost Calculator`. Giving these tools a prominent interactive grid converts organic tool users into agency consultation leads.

## 4. Information Architecture & Page-by-Page Functional Requirements preserve all existing WebABC content

### 4.1 Global Header, Mega-Menu & Utility Bar

* **Top Announcement / Telemetry Strip (Optional Dismissible Bar):** Displays live site performance status (e.g., `CWV STATUS: PASS · LCP 0.8s · INP 24ms · Explore our 5 Free SEO & Web Tools →`) modeled on the [ASCII Magic Studio](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2F) announcement bar.
* **Brand Mark:** Monospace-accented `WebABC` logo with a subtle blinking cursor or glyph badge (`[WebABC_]` or `▓▒░ WebABC`).
* **Primary Navigation Links:**
  * `Services` (opens the 3-column structured Mega-Menu below)
  * `Tools` (new top-level link jumping to `/FREE-TOOLS` or dropdown of the 5 free utilities, modeled on the [ASCII Magic Tools Hub](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Ftools))
  * `Portfolio`
  * `Service Areas`
  * `Blog`
  * `About Us`
  * `Contact Us`
* **3-Column Services Mega-Menu:** Must preserve all 11 service routes and descriptions currently on [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F), enhanced with monospace category headers and micro-glyph icons:
  * **Column 1 — `/SEO-SERVICES`:**
    * **SEO Services:** Improve your website ranking
    * **Local SEO:** Excel in local searches
    * **Link Building:** Boost domain authority
    * **Content Creation:** Engaging content strategies
  * **Column 2 — `/DEVELOPMENT-SERVICES`:**
    * **Web Development:** Custom web solutions
    * **WordPress & WooCommerce:** Custom WordPress & WooCommerce development — fast, secure, SEO-optimized stores built for growth
    * **Web Design & Development:** Custom web solutions
    * **E-commerce Website Design & Development Services:** Store Setup & Migration
  * **Column 3 — `/SUPPORT-AND-OPTIMIZATION`:**
    * **Website Maintenance & Care Plans:** Professional website maintenance and security care plans
    * **Core Web Vitals & Speed Optimization:** Achieve lightning-fast load times for better SEO rankings and higher conversions
    * **Professional UI/UX Audit:** Identify and fix hidden friction points on your website that are hurting sales
* **Right Utility Cluster:**
  * **Locale Switcher (`en` | `fa` | `ar`):** Compact pill switcher toggling English (`LTR`), فارسی (`RTL`), and العربية (`RTL`).
  * **Theme Switcher (`Dark` | `Light`):** Terminal-style segmented button matching the [Settings Toggles Piece](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fsettings-toggles) control bar.
  * **Primary Action Button (`Free Consultation`):** High-contrast accent button that opens the Consultation Modal.

### 4.2 Interactive Hero Section (`/HERO`)

* **Left Column — Value Proposition & Conversion CTAs:**
  * **Eyebrow Badge:** `/DIGITAL-AGENCY · SEO · WEB-ENGINEERING · MIDDLE-EAST`
  * **Primary Headline (H1):** `Elevate Your Digital Presence with Expert Web Solutions` (with an optional monospace token accent such as `{Web_Solutions}`).
  * **Subheadline:** `WebABC is a full-service digital agency specializing in custom web development, technical SEO, and data-driven growth strategies for businesses across the Middle East.`
  * **Primary CTA Group:**
    * `Free Consultation →` (opens the Consultation Modal)
    * `Explore Services` (scrolls to `/SERVICES`)
    * `View Portfolio` (links to Portfolio page)
  * **Quick Trust Metadata Row:** `11 Specialized Services` · `5 Free SEO Tools` · `EN / FA / AR` · `CWV Guaranteed` (modeled on the `734 pieces · 24 categories · 18 use-case guides · MIT licence` stat strip on the [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii)).
* **Right Column — Interactive `<ascii-art>` Stage:**
  * Replaces the static `"Digital marketing and web development illustration"` with an interactive terminal frame rendering a live `<ascii-art>` animation from the open-source [ASCII Magic Library Docs](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fdocs).
  * **Curated Scene Cycling (`Shuffle` / Scene Tabs):** Cycles through 5 agency-relevant pieces:
    1. `live-line-chart` (Organic Traffic & Ranking Growth)
    2. `code-editor` (Custom Web & WooCommerce Engineering)
    3. `request-waterfall` (Core Web Vitals & Speed Optimization)
    4. `world-map-pings` (Middle East & International Reach)
    5. `settings-toggles` (UI/UX Audit & Conversion Optimization)
  * **Live "Look" Switcher Bar:** Directly below the hero canvas, allow visitors to click and restyle the live animation across the 11 ASCII Magic character ramps (`▓▒░ Original`, `·•● Halftone dots`, `*#$@ ASCII`, `%B@$ Dense ASCII`, `6980 Numbers`, `01 Binary`, `AHMW Letters`, `░▒▓█ Blocks`, `·▪■ Squares`, `╌─━═ Lines`, `▚▞▚▞ Dither`) plus playback controls (`Pause`, `1×`, `2×`, `Dark/Light`).

### 4.3 Interactive Services Studio (`/SERVICES`)

* **Section Header:**
  * **Slash Label:** `/SERVICES`
  * **Heading (H2):** `Digital Marketing & Web Engineering Solutions for Your Business`
  * **Description:** `We provide comprehensive SEO and web development services to help your business succeed online. All our services are designed according to the latest global standards and customized for the specific needs of the market.`
* **Interactive Split-Pane Studio Layout:**
  * **Left Pane — Service Selector Tabs & Deliverable Pills:**
    * **Tab 1: `SEO & Specialized Optimization`**
      * Copy: `Professional SEO services to boost your search engine ranking. We use advanced, standard techniques to increase organic traffic, improve visibility, and grow your online presence.`
      * Deliverable Pills: `Keyword Research`, `Content Optimization`, `Technical SEO`, `External Link Building`, `Monthly Reporting`
      * Action CTA: `Consult about SEO & Specialized Optimization →` (opens Consultation Modal with service pre-selected)
      * Paired `<ascii-art>` Piece: `live-line-chart` (or `bar-chart-race`)
    * **Tab 2: `Custom Website Design`**
      * Copy: `Custom web design and development services for modern businesses. We create attractive, SEO-friendly, and mobile-responsive websites that engage users and drive conversions.`
      * Deliverable Pills: `Responsive Design`, `Modern User Interface`, `Fast Loading Speed`, `SEO Friendly`, `High Security`
      * Action CTA: `Consult about Custom Website Design →`
      * Paired `<ascii-art>` Piece: `code-editor` (or `window-tiling-manager`)
    * **Tab 3: `Specialized Content Creation`**
      * Copy: `High-quality content creation services tailored to your niche. We produce SEO-optimized articles and copy that resonate with your audience and improve search performance.`
      * Deliverable Pills: `Specialized Content`, `SEO Optimized`, `Content Strategy`, `Publication Calendar`, `Custom Graphics`
      * Action CTA: `Consult about Specialized Content Creation →`
      * Paired `<ascii-art>` Piece: `syntax-highlight-pass` (or `typewriter`)
  * **Secondary Technical Services Bento Row (3 Cards):** Highlights the 3 Support & Optimization pillars from the Mega-Menu (`Core Web Vitals & Speed Optimization` with `request-waterfall`, `Professional UI/UX Audit` with `signup-funnel`, and `Website Maintenance & Care Plans` with `status-page`).

### 4.4 3-Step Execution Pipeline (`/PROCESS`)

* **Section Header:** `/PROCESS` — `How Our Search & Engineering Workflow Executes`
* **3 Horizontal Terminal Stepper Cards (connected by ASCII box-drawing arrows `───►`):**
  * **Step `01` — `Keyword Research`:** `Identifying the best keywords for your business` (accompanied by a compact `search-autocomplete` or monospace query badge).
  * **Step `02` — `Content Optimization`:** `Quality content optimized for search engines` (accompanied by semantic HTML/schema telemetry tags).
  * **Step `03` — `External Link Building`:** `Professional link building strategy to increase site authority` (accompanied by a network node/graph indicator).

### 4.5 Value Proposition & Results Telemetry (`/WHY-WEBABC` & `/RESULTS`)

* **Part A — `/WHY-WEBABC` (`Why Choose WebABC?`):**
  * 4-card hairline grid with monospace index numbers (`[01]`–`[04]`):
    1. `Increase Brand Credibility` — Boost your brand's credibility with a strong presence in search results.
    2. `Increase Sales and Revenue` — Attract targeted traffic to improve conversion rates and sales.
    3. `Reduce Advertising Costs` — Lower your pay-per-click advertising costs by improving organic rankings.
    4. `Gain Competitive Advantage` — Get ahead of your competitors with advanced SEO strategies.
* **Part B — `/RESULTS` (`Tangible Results with Proven Methods`):**
  * **Left Column:** Headline, introductory copy (`We believe that SEO is an ongoing process. With careful planning and sound strategies, we bring long-term and sustainable results to your business.`), 4-item verified checklist with terminal `[✓]` markers:
    * `[✓] Monthly reports with precise metrics`
    * `[✓] Complete transparency throughout the collaboration`
    * `[✓] Guaranteed improvement in target keyword rankings`
    * `[✓] Flexible contracts with no long-term commitment`
    * Primary CTA: `Get Free Consultation →`
  * **Right Column (Replaces static `SEO Results Image`):** Live `<ascii-art piece="star-history-climb">` or `<ascii-art piece="contribution-heatmap">` inside a terminal inspector card showing sample client telemetry (`Organic Impressions`, `Core Web Vitals Pass Rate`, `Keyword Top-3 Velocity`).

### 4.6 Elevated Free SEO & Web Tools Suite (`/FREE-TOOLS`)

Inspired by the [ASCII Magic Recipes](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Frecipes) and [Use-Case Builders](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fuse), elevate WebABC's 5 existing free tools from footer links into a primary interactive homepage section:

| Tool Name on `webabc.ir/en/` | Monospace Badge | Card Description & Interactive Preview |
| :--- | :--- | :--- |
| **Website Cost Calculator** | `ESTIMATOR · INSTANT` | Interactive project scope calculator mentioned in the FAQ for instant, itemized web design and SEO price estimates. |
| **Meta Description & Tag Generator** | `SERP · META-TAGS` | Generates SEO-compliant `<title>` and `<meta name="description">` tags with live character/pixel counters. |
| **Headline & Title Checker** | `CTR-SCORE · PX-WIDTH` | Scores headline click-through rate (CTR) and previews exact Google SERP pixel width before truncation. |
| **UTM Link Builder & URL Builder** | `ANALYTICS · CAMPAIGN` | Free campaign URL generator appending standardized `utm_source`, `utm_medium`, and `utm_campaign` parameters. |
| **FAQ Schema Generator** | `JSON-LD · RICH-RESULTS` | Free `FAQPage` JSON-LD structured data maker with one-click copy for Google Rich Results eligibility. |

### 4.7 Frequently Asked Questions (`/FAQS`)

* **Section Header:** `/FAQS` — `Frequently Asked Questions`
* **Terminal-Styled Accordion List** (modeled on the `Q.` / `A.` layout in the [ASCII Magic Library Docs](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fdocs)):
  1. `Q. What services does WebABC provide?` — Full breakdown of web design, custom web development, WordPress & WooCommerce, e-commerce, SEO, UI/UX audits, speed optimization, and maintenance.
  2. `Q. Do you work with clients outside Iran?` — Highlights English, Persian (Farsi), and Arabic operations across the Middle East and internationally (remote and select on-site consultations).
  3. `Q. How much does a typical project cost?` — Directs visitors to the free `Website Cost Calculator` for an instant estimate or a free consultation for an itemized quote.
  4. `Q. How do I get started?` — Explains booking a free consultation to review goals, service recommendations, timeline, and quote.

### 4.8 Consultation Modal, Bottom Conversion Banner & Footer

* **Consultation Modal (`Request a Consultation`):**
  * Triggered by any `Free Consultation` or `Consult about...` button without leaving the page.
  * Styled like a terminal command dialog (`╭─ Request a Consultation ─── ESC to close ─╮`).
  * Fields: `Full Name`, `Phone Number`, `Email Address`, `Selected Service` (auto-filled when clicked from a service card), `Message`, primary `Send Request` button, and a secondary `Or Chat Directly on WhatsApp` button.
* **Bottom Conversion Banner (`/GET-STARTED`):**
  * Headline: `Ready to take your business to the next level?`
  * Subcopy: `Get a free consultation and receive a custom SEO and web development strategy for your business.`
  * Buttons: `Get Free Consultation` and `Contact Us`.
* **Multi-Column Terminal Footer:**
  * **Agency Summary & Direct Contacts:**
    * `+98 912 581 1880 (A. Bakhtiari)`
    * `+98 935 476 7068 (F. SabadBafan)`
    * `info@webabc.ir`
    * `Qazvin Science & Technology Park, Km 2 Barajin Road, Qazvin, Iran`
  * **Link Columns:** `Services` (5 core links), `Company` (6 core links), `Tools` (all 5 free tools).
  * **Sticky Quick-Action Dock:** `Back to Top`, `Call Now`, and `Chat on WhatsApp`.

## 5. Technical, Accessibility & Multilingual Constraints

1. **Self-Hosted Open-Source ASCII Runtime:** Install `ascii-magic-art` (MIT License) locally under `/public/ascii-magic-art/{runtime,pieces,lib}` as documented in the [ASCII Art Library Docs](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fdocs) so that visitors in Iran and across the Middle East never experience external CDN blocks or third-party DNS latency.
2. **Strict RTL Isolation for Persian (`/`) and Arabic (`/ar/`):** While prose paragraphs, navigation menus, and form inputs flip to `dir="rtl"` in Persian and Arabic, every `<ascii-art>` element, terminal control bar, and code preview MUST enforce `dir="ltr"` and `unicode-bidi: isolate` so box-drawing characters (`╭─╮│╰─╯`) and coordinate grids render identically across all three languages.
3. **Core Web Vitals Guardrails:**
   * Reserve explicit `aspect-ratio` or fixed pixel heights on every `<ascii-art>` wrapper to maintain `CLS = 0.00`.
   * Lazy-load pieces below the fold; the `<ascii-art>` runtime automatically pauses off-screen canvas loops.
   * Honor `prefers-reduced-motion: reduce` by rendering a single static frame (`still` attribute behavior).
4. **Accessibility (`WCAG 2.2 AA`):** Preserve `<ascii-art>`'s built-in `role="img"` and descriptive `aria-label` attributes so screen readers announce the animation's title once rather than reading raw ASCII characters, and maintain a minimum `4.5:1` contrast ratio for all body text across both Dark and Light themes.
