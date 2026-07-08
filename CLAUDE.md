# CLAUDE.md — Natalie Nicholson Portfolio

**Read this file at the start of every session before touching any case study page.**

---

## 1. Component Library

### `StickyHero` — `src/components/StickyHero.js`
Sticky hero wrapper for all case study pages. Renders a `<section>` with `position: sticky, top: 0, zIndex: 1`.

- Props: `backgroundColor` (default `#FFFBF8`), `minHeight`, `maxHeight` (both default `max(800px, 90vh)`)
- The page `<main>` must NOT have `overflow` or `overflowX: 'hidden'` — this kills sticky. Use `overflowX: 'clip'` on individual carousel wrappers only.
- All case study pages use the same 50/50 split: left panel has heading/meta, right panel has image or video.
- Right panel must also set `minHeight` and `maxHeight` to `max(800px, 90vh)` explicitly.

```jsx
<StickyHero backgroundColor="#FFFBF8">
  <div style={{ flex: '0 0 50%', /* left panel */ }}>...</div>
  <div style={{ flex: '0 0 50%', minHeight: 'max(800px, 90vh)', maxHeight: 'max(800px, 90vh)', overflow: 'hidden' }}>...</div>
</StickyHero>
```

---

### `CaseStudySection` — `src/components/CaseStudySection.js`
Standard section wrapper. Already provides `position: 'relative'`, `zIndex: 2`, `backgroundColor: '#FFFBF8'`.

- Inner div: `maxWidth: 1440px`, `margin: 0 auto`, `paddingLeft/Right: 80px`, `paddingTop/Bottom: 120px`, `boxSizing: 'border-box'`
- Props: `id`, `style` (overrides inner div), `sectionStyle` (overrides outer section), `doodle`
- **Never wrap in a bare `<section>` tag** — it IS the section.
- Override padding: `<CaseStudySection style={{ paddingTop: '80px' }}>`

---

### `CaseStudyFullBleed` — `src/components/CaseStudyFullBleed.js`
Full-bleed section wrapper. Same guarantees as `CaseStudySection` but with tighter padding.

- Inner div: `maxWidth: 1440px`, `margin: 0 auto`, `paddingLeft/Right: 80px`, `paddingTop/Bottom: 120px`, `boxSizing: 'border-box'`
- Props: `id`, `background`, `style`, `sectionStyle`, `doodle`
- For custom internal layouts (splits, grids): `<CaseStudyFullBleed style={{ padding: 0 }}>`
- **Never wrap in a bare `<section>` tag.**

---

### `CaseSplitPanel` — `src/components/CaseSplitPanel.js`
Reusable 50/50 full-bleed split. Always 800px tall.

- Props: `leftColor`, `rightColor`, `eyebrow`, `text` (typewriter mode), `textColor`, `leftContent` (static JSX), `rightFullBleed`, `children` (right panel)
- Typewriter mode: character-by-character at 55ms, triggers on IntersectionObserver at 25% visibility
- Static mode: pass `leftContent` JSX to skip typewriter entirely

---

### `Cursor` — `src/components/Cursor.js`
Custom cursor. Drop `<Cursor />` at the top of every page's render, before nav.

---

### `Footer` — `src/components/Footer.js`
Site footer. Always the last element inside `<main>`.

---

### `Reveal` — defined inline on each case study page
Do not rebuild this from scratch. Copy the exact implementation from rules-we-made-up.js and paste it into the new page file. rules-we-made-up.js is the single source of truth for all inline patterns.

Scroll-reveal wrapper using IntersectionObserver. Fades + slides up on enter.

```jsx
function Reveal({ children, delay = 0, distance = 48, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0px)' : `translateY(${distance}px)`,
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      width: '100%', ...style,
    }}>{children}</div>
  );
}
```

- `style` prop overrides `width: '100%'` — use `style={{ width: 'auto' }}` when centering a fixed-width child.

---

### MediaFrame — inline `<section>` pattern (second section on every case study page)
Do not rebuild this from scratch. Copy the exact implementation from rules-we-made-up.js and paste it into the new page file. rules-we-made-up.js is the single source of truth for all inline patterns.

Not a component — a copy-paste pattern. Always position 2, always slides over the sticky hero.

```jsx
<section style={{
  backgroundColor: '#F5F0EC',
  backgroundImage: 'url(/YOUR-TEXTURE.jpg)',
  backgroundSize: 'cover', backgroundPosition: 'center',
  position: 'relative', zIndex: 2,
  borderRadius: '24px 24px 0 0',
  boxShadow: '0 -8px 40px rgba(0,0,0,0.10)',
  paddingBottom: '80px',
}}>
  <div style={{ padding: '120px 120px 80px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
    <Reveal>
      <div style={{ position: 'relative', overflow: 'hidden', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)', transform: 'translateY(0px)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}>
        <video autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}>
          <source src="/YOUR-VIDEO.mp4" type="video/mp4" />
        </video>
      </div>
    </Reveal>
  </div>
  {/* Torn paper bottom edge — fill = next section background (#FFFBF8) */}
  <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
    <path d="M0,50 L0,30 L60,8 L120,40 L175,12 L230,42 L285,5 L340,35 L395,18 L450,44 L505,8 L560,36 L620,20 L680,45 L740,5 L800,32 L855,12 L910,42 L965,18 L1020,44 L1080,8 L1135,38 L1190,15 L1250,42 L1310,10 L1370,36 L1440,22 L1440,50 Z" fill="#FFFBF8" />
  </svg>
</section>
```

---

### SmallBoxRow — inline `<section>` pattern
Do not rebuild this from scratch. Copy the exact implementation from rules-we-made-up.js and paste it into the new page file. rules-we-made-up.js is the single source of truth for all inline patterns.

Texture background section with torn top+bottom edges, centered heading, row of white-framed image boxes.

- Background: texture image (e.g. `/Medium-beige-darker-bg2.jpg`)
- Top torn edge SVG tears into the section from the previous `#FFFBF8` section
- Bottom torn edge SVG tears out to the next `#FFFBF8` section
- Heading: `font-body` (Poppins) 700 44px
- Body: Fraunces 300 20px
- Frames: always **260×280px**, white, `padding: 20px`, `boxShadow: '0px 4px 24px rgba(0,0,0,0.12)'`
- Hover lift: `translateY(-8px)` at `0.3s ease` on outer wrapper
- Caption: Fira Mono 11px, uppercase, `#888888`, `margin: '12px 0 0'`
- Number of boxes: flexible (3 or 4), always `justifyContent: 'center'`

---

### CardStack (ConceptSystem / ProjectPurpose) — inline function per page
Do not rebuild this from scratch. Copy the exact implementation from rules-we-made-up.js and paste it into the new page file. rules-we-made-up.js is the single source of truth for all inline patterns.

Flip-through card deck. Stack container is always **518×636px**.

- Card rotations: `[-2, 3, -4, 1.5, -3, 2]`
- Slot depths: pos 0 = front (zIndex 3), pos 1 = back1 (translate 6,8 / zIndex 2), pos 2 = back2 (translate -8,14 / zIndex 1), pos 3+ hidden
- Next animation: `translateX(120%) rotate(rot+15deg)` at `0.4s ease-in`
- Prev animation: `card-enter-right 0.45s cubic-bezier(0.16,1,0.3,1)` keyframe defined in `src/styles/globals.css`
- Section entrance: scale-in via IntersectionObserver — `scale(0.96) opacity 0` → `scale(1) opacity 1` at `700ms cubic-bezier(0.16,1,0.3,1)`

---

### ThreeBy / CollageCarousel — inline function per page
Do not rebuild this from scratch. Copy the exact implementation from rules-we-made-up.js and paste it into the new page file. rules-we-made-up.js is the single source of truth for all inline patterns.

Flat-track drag carousel. All cards in one `<div ref={trackRef}>` with CSS `gap`.

Key constants (adjust per page):
```js
const CARD_W = 500;   // or 360 for ThreeBy
const GAP    = 50;    // or 20 for ThreeBy
const SNAP_STEP = CARD_W + GAP;
const getMaxOff = () => Math.max(0, slides.length * CARD_W + (slides.length - 1) * GAP - vpWidthRef.current);
const numDots   = Math.floor(maxOff / SNAP_STEP) + 1;  // render-time, uses vpWidth state
```

- Outer wrapper: `overflowX: 'clip'` (NOT `hidden` — hidden breaks sticky)
- Track: `display: 'flex', gap: \`${GAP}px\`, willChange: 'transform'`
- Hover lift: `translateY(-8px)` suppressed via `dragRef.current.active` to avoid stale closure

---

### PhoneCard — inline function per page
Do not rebuild this from scratch. Copy the exact implementation from rules-we-made-up.js and paste it into the new page file. rules-we-made-up.js is the single source of truth for all inline patterns.

3D tilt phone frame with mousemove interaction. Based on burketts-bees pattern.

```jsx
function PhoneCard({ src, width = '300px' }) {
  const ref = useRef(null);
  const TILT = 12;
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const y = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transition = 'transform 0.1s ease';
    el.style.transform  = `perspective(1000px) rotateX(${-y * TILT}deg) rotateY(${x * TILT}deg)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transition = 'transform 0.6s ease';
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ width, borderRadius: '30px', boxShadow: '4px 4px 90px 0px rgba(0,0,0,0.10)' }}>
      <img src={src} alt="" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '30px' }} />
    </div>
  );
}
```

---

## 2. Rules

### Sticky hero stacking — THE most critical rule
Every section that appears after `<StickyHero>` must have ALL THREE of these on its outermost wrapper:

```jsx
position: 'relative',
zIndex: 2,
backgroundColor: '<section color>',
```

`backgroundColor` alone does not form a stacking context. Without `position: relative` and `zIndex: 2`, the sticky hero (zIndex 1) bleeds through on scroll. `CaseStudySection` and `CaseStudyFullBleed` provide these automatically. Bare `<section>` tags require them explicitly.

### No overflow on `<main>`
Never set `overflow` or `overflowX: 'hidden'` on the page `<main>` wrapper — it kills `position: sticky`. Use `overflowX: 'clip'` on individual carousel wrappers only.

### Hero height
All case study hero sections use `minHeight` and `maxHeight` of `max(800px, 90vh)` — on both `StickyHero` defaults and on the right panel explicitly. This ensures the hero fills tall monitors and scales gracefully on shorter ones.

### Typography scale
| Use | Class / Font | Weight | Size | Other |
|---|---|---|---|---|
| Hero H1 | `font-heading` (Fraunces) | 700 | 90px | lineHeight 1.0 |
| H2 — Section heading | `font-heading` (Fraunces) | 700 | **64px** | lineHeight 1.05 |
| H3 — Card / sub-heading | `font-body` (Poppins) | 700 | **33px** | — |
| Body / editorial | Fraunces 300 | — | **20px** | lineHeight 1.6, color **#404040** |
| Pull quote | Fraunces 400 | — | **28px** | — |
| FourBy card title + body | Fraunces | 700 / 300 | **17px** | — |
| Captions / labels | Fira Mono **500** | — | 11px | uppercase, `letterSpacing: 0.1em` |
| Meta values | Fira Mono 500 | — | 14px | — |
| Mono display / typewriter | Fira Mono 400 | — | 22px | animated text in full-bleed split panels (see `CaseSplitPanel`, `MushroomFriend`) |

### Color palette
| Token | Value | Use |
|---|---|---|
| Page background | `#FFFBF8` | All section backgrounds |
| Body copy | `#404040` | All Fraunces 300 body text |
| Headers | `#101010` | H1, H2, H3, and bold labels |
| Accent | `#FDB154` | Per-page accent (override per project) |
| Caption / meta | `#888888` | Fira Mono labels |
| Border / divider | `rgba(16,16,16,0.20)` or `#C4B8A8` | Dashed lines, card borders |

### Layout system
- **Full bleed:** 100vw — hero images, colored sections, videos. No `maxWidth` constraint.
- **Content sections:** `maxWidth: '1440px'`, `padding: '0 80px'`, `margin: '0 auto'`, `boxSizing: 'border-box'`
- **Text blocks:** `maxWidth: '600px'` within content sections for body/intro copy — enforced via `.cs-body { max-width: 600px }` in globals.css
- **Section vertical padding:** 120px top and bottom — baseline, never go below
- **No 175px or 120px horizontal padding anywhere** — both values are retired

### Spacing defaults
- Section horizontal padding: **80px** on all sections
- Section vertical padding: **120px** top and bottom (baseline)
- Carousel outer margins: **80px** unless specified otherwise

### Borrowing patterns
Never invent new visual styles. Always borrow exactly from an existing case study page. Before building any new section, identify which existing page has the closest pattern and replicate it exactly — same shadows, same border radii, same font sizes, same spacing.

### Image asset paths
Public assets live at `/public/` and are referenced from root `/` in src. Never use relative `../` paths for images.

### `card-enter-right` keyframe
Defined once in `src/styles/globals.css`. Do not redefine it inline.

### Don't add `overflow: hidden` to card stack containers
The stack needs `overflow: visible` so rotated/offset back cards peek out correctly.

### Dashed divider SVG
Full-width horizontal divider used between major sections:
```jsx
<svg width="100%" height="2" style={{ display: 'block' }} preserveAspectRatio="none">
  <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.20)" strokeWidth="2" strokeDasharray="4 6" />
</svg>
```

---

## 3. Mobile

### Breakpoints
- `@media (max-width: 768px)` — tablet / large phone
- `@media (max-width: 414px)` — small phone

### Spacing system (multiples of 8)
- **Section padding:** `32px` top/bottom — auto-applied via `.cs-inner` in the 768px block; gives **64px** total visual gap between adjacent sections
- **Image → heading:** `24px` margin-top on the text column
- **Heading → first body paragraph:** `12px` (`.cs-h2` has `margin-bottom: 12px`)
- **Section-specific overrides** use `#section-id .cs-inner` — ID selector wins over the base `.cs-inner` rule even when both have `!important`

### Typography classes — always add these to mobile-targeted elements
| Element | Class | Mobile value |
|---|---|---|
| Section subhead (33px desktop) | `.cs-h2` | 24px / 700 / lh 1.2 / mb 12px |
| Body copy (20px desktop) | `.cs-body` | 16px / 400 / lh 1.5 |
| Fira Mono labels / callouts (16px desktop) | `.cs-mono` | 12px |
| Section horizontal padding | `.cs-inner` | 60px (768px) → 24px (414px), auto |

### Layout pattern: stacked image + text
For side-by-side desktop layouts that stack on mobile:
1. Add a wrapper class to the flex row (e.g. `section-row`)
2. Add a wrapper **div** around the image — **never put className on `<Reveal>`**, it doesn't pass through
3. Add a class to the text column div
4. CSS: `flex-direction: column; gap: 0` on the row; image wrapper `flex: 0 0 auto; width: 100%`
5. Image aspect ratio on mobile: `aspect-ratio: 16 / 9` on the inner container
6. Text column: `margin-top: 24px` for the image→heading gap

### Layout pattern: mobile photo strip
Swipeable horizontal image row shown only on mobile (hidden on desktop via `style={{ display: 'none' }}`):
- Outer wrapper: CSS `display: block !important` enables on mobile
- Break out of `.cs-inner` padding with `margin-left: -60px; margin-right: -60px` (768px) / `-24px` (414px)
- Inner scroll container: `display: flex; gap: 10px; overflow-x: auto; scroll-snap-type: x mandatory; padding-left: 60/24px`
- Images: `height: 200px; width: auto; flex-shrink: 0; object-fit: cover; scroll-snap-align: start`

### Layout pattern: responsive card stack
- Wrap `<Reveal>` in a plain div with class — Reveal doesn't accept className
- Move `gridColumn` from the Reveal `style` prop to the outer wrapper div
- Card stack container: `width: 100% !important; height: auto !important; aspect-ratio: 622 / 763`
- Nav row below the deck uses class `cs-deck-nav` → mobile: `justify-content: space-between; width: 100%` with order ← label →
- All three case study pages share this pattern: `rules-we-made-up.js`, `burketts-bees.js`, `add-refresh.js`

### What to hide on mobile
- Desktop doodles, decorative stars, collage photos replaced by mobile photo strip: `display: none !important`
- Multi-column grid gaps / star filler columns: `display: none !important`

### Critical rules
- **Never add `className` to `<Reveal>`** — it doesn't forward to the DOM. Wrap Reveal in a div instead.
- CSS `!important` overrides inline `style` props — class-based mobile overrides work on inline-styled elements.
- Both `CaseStudySection` and `CaseStudyFullBleed` apply `.cs-inner` to their inner div — padding rules apply to both.
- All new mobile CSS goes in the existing `@media (max-width: 768px)` and `@media (max-width: 414px)` blocks in `globals.css`. No new breakpoints.

---

## 4. Build Order

When starting work on any case study page:

1. **Read this file first.**
2. Read `src/components/COMPONENT-GUIDE.md` for detailed SmallBoxRow / CardStack / ThreeBy specs.
3. Read the target page file in full before touching anything.
4. Identify which existing page has the closest pattern to what's being built — read that page too if needed.
5. Build sections in the order they appear on the page (top to bottom).
6. After every section added, verify the dev server returns 200.
7. Never skip the sticky stacking rule check on every new bare `<section>`.

### Case study pages
| File | Status |
|---|---|
| `src/pages/rules-we-made-up.js` | Complete |
| `src/pages/burketts-bees.js` | Complete |
| `src/pages/add-refresh.js` | Complete (website section placeholder remains) |
| `src/pages/cvs-aetna.js` | In progress — sections built, design system sweep pending |
