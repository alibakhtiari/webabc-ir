# AI Coding Agent & UI Generation Prompts: WebABC.ir Redesign

**Target Site:** [https://webabc.ir/en/](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F)  
**Visual & Functional Reference:** [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii) & [ASCII Magic Library Docs](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fdocs)  
**Compatible Agents:** Claude Code, Cursor, Windsurf, v0 by Vercel, Bolt.new, Lovable  

## 1. Master End-to-End Redesign Prompt builds the complete WebABC interface in a single pass

Copy and paste the prompt below into your AI coding agent (such as Claude Code, Cursor, or v0) to generate or refactor the full [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) frontend into the [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii) aesthetic.

```text
You are a Staff Frontend Architect and Design Systems Engineer. Redesign and implement the English homepage and layout shell for WebABC (https://webabc.ir/en/), a full-service web development, technical SEO, and Core Web Vitals agency, using the exact terminal-native visual design language and open-source `<ascii-art>` web component system of https://www.ascii-magic.com/ascii.

### 1. VISUAL DESIGN SYSTEM (ASCII MAGIC PARADIGM)
- **Theme Polarity:** Default to a high-contrast GitHub/Terminal Dark palette (`--bg-canvas: #090b0e`, `--bg-surface: #0d1117`, `--bg-elevated: #161b22`, `--border-hairline: #30363d`, `--text-primary: #e6edf3`, `--text-muted: #8b949e`, `--accent-green: #7ee787`, `--accent-blue: #79c0ff`, `--accent-amber: #ffa657`, `--accent-coral: #ff7b72`, `--accent-purple: #d2a8ff`), with a working Light Mode toggle (`--bg-canvas: #ffffff`, `--bg-surface: #f6f8fa`, `--border-hairline: #d0d7de`, `--text-primary: #1f2328`, `--text-muted: #59636e`).
- **Editorial & Terminal Typography:**
  - Use slash-prefixed uppercase monospace eyebrow labels for every major section: `/SERVICES`, `/OPTIMIZATION`, `/PROCESS`, `/WHY-WEBABC`, `/RESULTS`, `/FREE-TOOLS`, `/FAQS`, `/CONTACT`.
  - Pair geometric sans-serif headings (`Geist`, `Inter`, or `Plus Jakarta Sans`) with crisp monospace metadata badges (`JetBrains Mono` or `Geist Mono`) showing dimensions, metrics, and tags (e.g., `CWV 99/100`, `LCP < 1.2s`, `30 FPS · 3.3 KB`, `JSON-LD`).
- **Structural Grid:** Use exposed `1px solid var(--border-hairline)` bento grids, subtle corner brackets or terminal window headers (`╭─ ... ─╮`), and zero generic stock photos or vector illustrations.

### 2. LIVE `<ascii-art>` WEB COMPONENT INTEGRATION
- Load the open-source MIT-licensed ASCII Magic runtime in the browser:
  `<script type="module" src="https://www.ascii-magic.com/ascii/ascii.js"></script>` (with support for local self-hosting at `/ascii-magic-art/runtime/ascii.js`).
- Create a reusable `<AsciiStage />` component that wraps `<ascii-art>` with:
  - Fixed aspect-ratio container (`min-height` reserved to guarantee `CLS = 0`).
  - Explicit `dir="ltr"` and `style={{ unicodeBidi: 'isolate' }}` so switching the site locale to Persian (`fa`) or Arabic (`ar`) never mirrors or breaks the ASCII character grid.
  - Interactive toolbar allowing visitors to switch the `look` attribute in real time across all 11 character ramps:
    1. `original` (`▓▒░ Original`)
    2. `dots` (`·•● Halftone dots`)
    3. `ascii` (`*#$@ ASCII`)
    4. `dense` (`%B@$ Dense ASCII`)
    5. `numbers` (`6980 Numbers`)
    6. `binary` (`01 Binary`)
    7. `letters` (`AHMW Letters`)
    8. `blocks` (`░▒▓█ Blocks`)
    9. `squares` (`·▪■ Squares`)
    10. `lines` (`╌─━═ Lines`)
    11. `dither` (`▚▞▚▞ Dither`)
  - Playback speed toggles (`Pause`/`still`, `0.5x`, `1x`, `2x`) and canvas `Dark` / `Light` background toggles.

### 3. REQUIRED SECTIONS & EXACT WEBABC CONTENT
Preserve 100% of WebABC's real business content, service taxonomy, free tools, and contact details:

1. **Header & 3-Column Mega-Menu:**
   - Brand logo `WebABC` with monospace terminal badge.
   - Navigation: `Services` (opens 3-column Mega-Menu), `Tools` (jumps to `/FREE-TOOLS`), `Portfolio`, `Service Areas`, `Blog`, `About Us`, `Contact Us`.
   - Mega-Menu Columns:
     - **SEO Services:** `SEO Services` ("Improve your website ranking"), `Local SEO` ("Excel in local searches"), `Link Building` ("Boost domain authority"), `Content Creation` ("Engaging content strategies").
     - **Development Services:** `Web Development` ("Custom web solutions"), `WordPress & WooCommerce` ("Custom WordPress & WooCommerce development — fast, secure, SEO-optimized stores built for growth. Get a free consultation today."), `Web Design & Development` ("Custom web solutions"), `E-commerce Website Design & Development Services` ("Store Setup & Migration").
     - **Support & Optimization:** `Website Maintenance & Care Plans` ("Professional website maintenance and security care plans. We keep your site secure, updated, and high-performing while you focus on growing your business."), `Core Web Vitals & Speed Optimization` ("Achieve lightning-fast load times for better SEO rankings and higher conversions. We optimize images, code, and servers to pass Google's Core Web Vitals."), `Professional UI/UX Audit` ("Identify and fix hidden friction points on your website that are hurting sales. Get a comprehensive UI/UX audit to boost conversions and user satisfaction.").
   - Utility Controls: Locale Switcher (`en` | `fa` | `ar`), Theme Toggle (`Dark` | `Light`), and `Free Consultation` button (opens Consultation Modal).

2. **Hero Section (`/HERO`):**
   - Headline: "Elevate Your Digital Presence with Expert Web Solutions"
   - Subheadline: "WebABC is a full-service digital agency specializing in custom web development, technical SEO, and data-driven growth strategies for businesses across the Middle East."
   - CTAs: `Free Consultation` (triggers modal), `Explore Services`, `View Portfolio`.
   - Trust Strip: `11 Specialized Services` · `5 Free Browser SEO Tools` · `EN / FA / AR` · `Core Web Vitals Engineered`.
   - Interactive Hero `<AsciiStage />`: Defaults to `piece="live-line-chart"` with a `Shuffle Scene` button cycling through `live-line-chart`, `code-editor`, `request-waterfall`, `world-map-pings`, and `settings-toggles`, plus the 11-Look character ramp bar below the stage.

3. **Interactive Services Studio (`/SERVICES`):**
   - Heading: "Digital Marketing Solutions for Your Business"
   - Subcopy: "We provide comprehensive SEO and web development services to help your business succeed online. All our services are designed according to the latest global standards and customized for the specific needs of the market."
   - Split-pane interactive studio with 3 primary tabs that dynamically update a live `<ascii-art>` preview and pre-select the service in the Consultation Modal:
     - **Tab 1: `SEO & Specialized Optimization`** (Piece: `live-line-chart` | Pills: `Keyword Research`, `Content Optimization`, `Technical SEO`, `External Link Building`, `Monthly Reporting` | CTA: `Consult about SEO & Specialized Optimization`).
     - **Tab 2: `Custom Website Design`** (Piece: `code-editor` | Pills: `Responsive Design`, `Modern User Interface`, `Fast Loading Speed`, `SEO Friendly`, `High Security` | CTA: `Consult about Custom Website Design`).
     - **Tab 3: `Specialized Content Creation`** (Piece: `syntax-highlight-pass` | Pills: `Specialized Content`, `SEO Optimized`, `Content Strategy`, `Publication Calendar`, `Custom Graphics` | CTA: `Consult about Specialized Content Creation`).
   - Below the studio, render a 3-card technical bento grid for Support & Optimization: `Core Web Vitals & Speed Optimization` (`piece="request-waterfall"`), `Professional UI/UX Audit` (`piece="signup-funnel"`), and `Website Maintenance & Care Plans` (`piece="status-page"`).

4. **3-Step Process Pipeline (`/PROCESS`):**
   - Connected horizontal terminal cards:
     - `01 Keyword Research` — Identifying the best keywords for your business
     - `02 Content Optimization` — Quality content optimized for search engines
     - `03 External Link Building` — Professional link building strategy to increase site authority

5. **Why Choose WebABC & Results Guaranteed (`/WHY-WEBABC` & `/RESULTS`):**
   - 4 value cards: `Increase Brand Credibility`, `Increase Sales and Revenue`, `Reduce Advertising Costs`, `Gain Competitive Advantage`.
   - Results split section ("Tangible Results with Proven Methods"):
     - Left: 4 guaranteed pillars (`Monthly reports with precise metrics`, `Complete transparency throughout the collaboration`, `Guaranteed improvement in target keyword rankings`, `Flexible contracts with no long-term commitment`) + `Get Free Consultation` button.
     - Right: Live `<ascii-art piece="star-history-climb">` inside a terminal telemetry card with simulated live SEO metrics.

6. **Interactive Free SEO & Marketing Tools Hub (`/FREE-TOOLS`):**
   - Feature WebABC's 5 free tools in an interactive bento grid modeled on https://www.ascii-magic.com/ascii/use:
     1. `Website Cost Calculator` (Instant itemized project estimator)
     2. `Meta Description & Tag Generator`
     3. `Headline & Title Checker — Score CTR + See Exact Google Width`
     4. `UTM Link Builder & URL Builder – Free Campaign URL Generator`
     5. `FAQ Schema Generator – Free FAQPage JSON-LD Schema Maker`
   - Include an interactive mini-preview (e.g., live Google SERP pixel-width meter and JSON-LD schema snippet preview) right inside the grid.

7. **FAQ Section (`/FAQS`), Bottom CTA Banner & Footer:**
   - Render all 4 official WebABC FAQs in a `Q.` / `A.` terminal accordion.
   - Bottom CTA: "Ready to take your business to the next level?" with `Get Free Consultation` and `Contact Us`.
   - Footer with exact contacts: `+98 912 581 1880 (A. Bakhtiari)`, `+98 935 476 7068 (F. SabadBafan)`, `info@webabc.ir`, `Qazvin Science & Technology Park, Km 2 Barajin Road, Qazvin, Iran`, plus sticky quick-action dock (`Back to Top`, `Call Now`, `Chat on WhatsApp`).
   - Consultation Modal (`Full Name`, `Phone Number`, `Email Address`, `Message`, `Send Request`, `Or Chat Directly on WhatsApp`).
```

## 2. Modular Component Prompts let you iterate section by section

If you prefer to refactor [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) incrementally rather than in one monolithic pass, use these five modular prompts in sequence.

### 2.1 Prompt A: `<AsciiStage />` Component & Global Look Switcher

```text
Create a reusable `<AsciiStage />` component modeled on the piece player at https://www.ascii-magic.com/ascii/settings-toggles.
1. Load `https://www.ascii-magic.com/ascii/ascii.js` once on the client.
2. Accept props: `defaultPiece`, `scenes` (array of `{ slug, label, category, dims, fps }`), `defaultLook="original"`, and `height={320}`.
3. Render a terminal window header showing the active piece name, category badge, dimensions (e.g. `66×17 · 30 fps`), and a `Shuffle` button if multiple scenes are passed.
4. Render the `<ascii-art>` custom element inside a container with `dir="ltr"` and `unicode-bidi: isolate` so RTL pages (`fa`, `ar`) never flip the canvas.
5. Render a bottom control bar with:
   - Playback controls: `Pause` (toggles `still` attribute), `0.5×`, `1×`, `2×` (`speed` attribute), and canvas `Dark` / `Light` toggle (`bg` attribute).
   - Look selector pills with glyph prefixes:
     `▓▒░ Original` (`original`), `·•● Halftone dots` (`dots`), `*#$@ ASCII` (`ascii`), `%B@$ Dense ASCII` (`dense`), `6980 Numbers` (`numbers`), `01 Binary` (`binary`), `AHMW Letters` (`letters`), `░▒▓█ Blocks` (`blocks`), `·▪■ Squares` (`squares`), `╌─━═ Lines` (`lines`), `▚▞▚▞ Dither` (`dither`).
```

### 2.2 Prompt B: Interactive `/SERVICES` Studio & Mega-Menu

```text
Refactor the WebABC Services navigation and homepage `/SERVICES` section into the ASCII Magic studio layout:
1. Build a 3-column dark hairline Mega-Menu grouping WebABC's 11 services under `/SEO-SERVICES` (SEO Services, Local SEO, Link Building, Content Creation), `/DEVELOPMENT-SERVICES` (Web Development, WordPress & WooCommerce, Web Design & Development, E-commerce Website Design & Development Services), and `/SUPPORT-OPTIMIZATION` (Website Maintenance & Care Plans, Core Web Vitals & Speed Optimization, Professional UI/UX Audit).
2. On the homepage `/SERVICES` section, build a split-pane interactive card where clicking each of the 3 core pillars (`SEO & Specialized Optimization`, `Custom Website Design`, `Specialized Content Creation`) switches the active `<ascii-art>` piece (`live-line-chart`, `code-editor`, `syntax-highlight-pass`), displays the 5 deliverable pills in monospace tags, and updates the CTA button ("Consult about [Service Name]") to open the Consultation Modal with that service pre-selected.
```

### 2.3 Prompt C: `/FREE-TOOLS` Interactive SEO Utility Showcase

```text
Elevate WebABC's 5 free SEO and web tools from the footer into an interactive homepage section (`/FREE-TOOLS`) inspired by https://www.ascii-magic.com/ascii/use:
1. Create a 5-card bento grid for:
   - Website Cost Calculator
   - Meta Description & Tag Generator
   - Headline & Title Checker — Score CTR + See Exact Google Width
   - UTM Link Builder & URL Builder – Free Campaign URL Generator
   - FAQ Schema Generator – Free FAQPage JSON-LD Schema Maker
2. Give the top 2 cards (`Headline & Title Checker` and `FAQ Schema Generator`) live interactive micro-demos directly on the card (e.g., an input box that calculates live pixel width out of 580px and CTR score, and a live JSON-LD code preview with a one-click `Copy JSON-LD` button) alongside an `Open Full Tool →` link.
```

### 2.4 Prompt D: Multilingual RTL/LTR Switcher (`en` / `fa` / `ar`)

```text
Implement bi-directional layout support for WebABC's three locales (`en` English LTR, `fa` Persian RTL, `ar` Arabic RTL) while preserving the ASCII Magic terminal aesthetic:
1. Set `dir="ltr"` and `--font-sans: 'Geist', 'Inter', sans-serif` for `en`, and `dir="rtl"` with `--font-sans: 'Vazirmatn', sans-serif` for `fa` and `ar`.
2. Enforce `dir="ltr"` and `unicode-bidi: isolate` on all `<ascii-art>` elements, terminal headers, phone numbers (`+98 912 581 1880`, `+98 935 476 7068`), email addresses (`info@webabc.ir`), and code/schema blocks so box-drawing glyphs (`╭─╮│╰─╯`) and ASCII animations never mirror in RTL mode.
```

## 3. Terminal CLI Prompts via `npx ascii-magic-art` speed up piece selection

As documented in the [ASCII Magic Library Docs](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fdocs), you can generate ready-to-paste prompts for individual animations directly from your terminal and feed them to Claude Code or Cursor:

```bash
# Browse all 734 pieces interactively in your terminal and press Enter to copy an agent prompt:
npx ascii-magic-art

# Or print and copy the exact coding-agent prompt for specific pieces suited to WebABC:
npx ascii-magic-art prompt live-line-chart
npx ascii-magic-art prompt code-editor
npx ascii-magic-art prompt request-waterfall
npx ascii-magic-art prompt settings-toggles
npx ascii-magic-art prompt star-history-climb
npx ascii-magic-art prompt world-map-pings
npx ascii-magic-art prompt status-page
```
