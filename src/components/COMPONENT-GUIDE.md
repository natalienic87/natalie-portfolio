# Rules We Made Up — Component Guide

Aliases for existing code patterns in `src/pages/rules-we-made-up.js`.
No new components were created — these are reference names only.

---

## HeroSplit
**Alias for:** the Hero section (bare `<section>`, sticky, 50/50 flex layout)
**In code:** The first section in `RulesWeMadeUp()` render — left panel has title/meta, right panel has looping video.
**Key props:** `minHeight: 760px`, `position: sticky, top: 0`, left panel `80px` padding

---

## MediaFrame
**Alias for:** the texture-framed section that slides over the sticky hero (always the second section on a case study page)
**In code:** Bare `<section>` — no wrapper component, inline styles only

**Permanent spec (copy exactly onto every case study page):**
```jsx
<section style={{
  backgroundColor:    '#F5F0EC',
  backgroundImage:    'url(/YOUR-TEXTURE.jpg)',  // swap per project
  backgroundSize:     'cover',
  backgroundPosition: 'center',
  position:           'relative',
  zIndex:             2,
  borderRadius:       '24px 24px 0 0',
  boxShadow:          '0 -8px 40px rgba(0,0,0,0.10)',
  paddingBottom:      '80px',
}}>
  <div style={{ padding: '100px 100px 60px', maxWidth: '1320px', margin: '0 auto', boxSizing: 'border-box' }}>
    {/* main content (image or video) wrapped in Reveal */}
  </div>

  {/* Torn paper edge — fill colour = background of the NEXT section (usually #FFFBF8) */}
  <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
    <path d="M0,50 L0,30 L60,8 L120,40 L175,12 L230,42 L285,5 L340,35 L395,18 L450,44 L505,8 L560,36 L620,20 L680,45 L740,5 L800,32 L855,12 L910,42 L965,18 L1020,44 L1080,8 L1135,38 L1190,15 L1250,42 L1310,10 L1370,36 L1440,22 L1440,50 Z" fill="#FFFBF8" />
  </svg>
</section>
```

**Content frame (image or video inside):**
```jsx
<div style={{
  position:   'relative',
  overflow:   'hidden',
  boxShadow:  '0px 5px 65px 0px rgba(0,0,0,0.25)',
  transform:  'translateY(0px)',
  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
}}
  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
>
  <img src="/YOUR-IMAGE.jpg" style={{ width: '100%', display: 'block' }} />
</div>
```

**Critical — sticky hero stacking rule (applies to EVERY section on EVERY case study page):**
Every section that appears after the sticky hero must have all three of these on its outermost wrapper:
```jsx
position: 'relative',
zIndex: 2,
backgroundColor: '<section color>',
```
`backgroundColor` alone does not work. Without `position: 'relative'` and `zIndex: 2`, the element cannot form a stacking context above the hero's `zIndex: 1`, so the hero bleeds through on scroll. All three are required together, on the outermost `<section>` or top-level `<div>` — never on a child element. `CaseStudySection` and `CaseStudyFullBleed` already pass `zIndex: 2` via `sectionStyle`; bare `<section>` tags require it explicitly.

The preceding hero section MUST have `position: sticky, top: 0, zIndex: 1` and its `<main>` wrapper must NOT have `overflowX: 'hidden'` — that property kills sticky and breaks the card slide-up effect. Add `overflowX: 'hidden'` only to individual carousel clip wrappers, never to `<main>`.

---

## ThreeBy
**Alias for:** the FilmmakingPrinciples paginated carousel (set carousel component)
**In code:** `function FilmmakingPrinciples()` — two-part render: `CaseStudyFullBleed` heading + bare `<div>` carousel below
**Key props:** 3 cards per page × 360px, 20px gap, 1120px track, 2px dashed border, 4:3 image ratio, drag + wheel input

---

## FullBleed
**Alias for:** `CaseStudyFullBleed` wrapper
**In code:** `src/components/CaseStudyFullBleed.js`
**Key props:** `max-width: 1280px`, `80px` L/R padding, `80px` T/B padding (default), accepts `doodle` prop for absolute-positioned elements outside the content div

**This component IS the section.** Never wrap it in a bare `<section>` tag. It provides `position: 'relative'` and `zIndex: 2` on the outer section automatically — never set those manually.

**For custom internal layouts** (two-panel splits, charts, any full-width content that needs its own padding), pass `style={{ padding: 0 }}`:
```jsx
<CaseStudyFullBleed background="#YOURCOLOR" style={{ padding: 0 }}>
  <div style={{ display: 'flex', width: '100%' }}>
    {/* left panel with its own padding */}
    {/* right panel with its own padding */}
  </div>
</CaseStudyFullBleed>
```
The `background` prop sets the outer section color. Inner panels handle their own `padding` and `backgroundColor`.

---

## CardStack
**Alias for:** the flip-through card deck (used in CharacterCreation, ProjectPurpose, and any future image deck section)
**In code:** inline component function per page — copy the architecture from `ProjectPurpose` in `burketts-bees.js`

**Permanent spec — never deviate from these values:**
```jsx
{/* Stack container — always 518×636px */}
<div style={{ position: 'relative', width: '518px', height: '636px' }}>
  {slides.map((src, si) => (
    <div key={si} style={getCardStyle(si)}>
      <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
    </div>
  ))}
</div>

{/* Label + arrows — always this layout */}
<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
  <span style={{ fontFamily: 'Fira Mono, monospace', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888' }}>
    flip through the deck
  </span>
  <ArrowBtn onClick={() => go('prev')}>←</ArrowBtn>
  <ArrowBtn onClick={() => go('next')}>→</ArrowBtn>
</div>
```

**Card rotations** (use this set, extend with similar values for more slides):
`[-2, 3, -4, 1.5, -3, 2]`

**Slot offsets for depth** (pos 0 = front, 1 = back1, 2 = back2, 3+ = hidden):
- pos 0: `rotate(rot)`, shadow `0px 12px 32px rgba(0,0,0,0.18)`, zIndex 3
- pos 1: `rotate(rot) translate(6px, 8px)`, shadow `-4px 6px 18px rgba(0,0,0,0.12)`, zIndex 2
- pos 2: `rotate(rot) translate(-8px, 14px)`, shadow `-8px 8px 24px rgba(0,0,0,0.12)`, zIndex 1
- pos 3+: opacity 0, transition none

**Animations:** next = fly-out `translateX(120%) rotate(rot+15deg)` at `0.4s ease-in`, prev = `card-enter-right 0.45s cubic-bezier(0.16,1,0.3,1)`

**Outer wrapper** (the Reveal that holds stack + arrows):
`flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px'`

**Section enter animation:** scale-in via IntersectionObserver — starts `scale(0.96) opacity 0`, transitions to `scale(1) opacity 1` at `700ms cubic-bezier(0.16,1,0.3,1)` when 10% visible with `-100px` rootMargin

---

## PhoneFrame
**Alias for:** the RollCall phone mockup section
**In code:** Inside `function RollCall()` — phone image with 3D tilt hover interaction
**Key props:** `perspective(1000px)`, ±12deg tilt on mousemove, `0.1s ease` on move, `0.6s ease` on leave

---

## SmallBoxRow
**Alias for:** the row of white-framed image boxes with texture background and torn paper edges
**In code:** Inline bare `<section>` — first used in `burketts-bees.js` ("Built with AI. Art Directed by Me" section)

**Permanent spec — copy exactly:**
```jsx
<section style={{
  backgroundImage:    'url(/YOUR-TEXTURE.jpg)',  // e.g. /Medium-beige-darker-bg2.jpg
  backgroundSize:     'cover',
  backgroundPosition: 'center',
  position:           'relative',
  zIndex:             2,
  paddingTop:         '120px',   // extra room for top torn SVG
  paddingBottom:      '100px',   // extra room for bottom torn SVG
}}>

  {/* Top torn edge — previous section colour (#FFFBF8) tears down */}
  <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
    <path d="M0,0 L0,28 L48,6 L95,35 L148,8 L200,38 L260,4 L315,32 L370,15 L425,40 L480,10 L535,34 L595,18 L650,42 L710,6 L765,28 L820,10 L875,38 L930,14 L985,40 L1040,5 L1095,30 L1150,12 L1210,38 L1270,8 L1330,32 L1390,15 L1440,25 L1440,0 Z" fill="#FFFBF8" />
  </svg>

  {/* Centered heading + body — 738px wide */}
  <Reveal>
    <div style={{ maxWidth: '738px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box', textAlign: 'center', marginBottom: '56px' }}>
      <h2 className="font-body" style={{ fontWeight: 700, fontSize: '44px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
        Section Heading
      </h2>
      <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
        Body copy.
      </p>
    </div>
  </Reveal>

  {/* Image box row — 80px from 1280px container edge */}
  <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      {items.map((item) => (
        <Reveal key={item.label}>
          <div
            style={{ transform: 'translateY(0px)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
          >
            {/* White frame — always 260×280px, 20px padding, subtle drop shadow */}
            <div style={{
              width:           '260px',
              height:          '280px',
              backgroundColor: '#ffffff',
              padding:         '20px',
              boxSizing:       'border-box',
              boxShadow:       '0px 4px 24px rgba(0,0,0,0.12)',
            }}>
              <img src={item.src} alt={item.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
            </div>
            {/* Caption */}
            <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px',
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888888',
              textAlign: 'center', margin: '12px 0 0' }}>{item.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>

  {/* Bottom torn edge — next section colour (#FFFBF8) tears up */}
  <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
    <path d="M0,50 L0,22 L55,45 L110,18 L168,44 L225,10 L280,38 L335,20 L390,46 L445,12 L500,40 L558,8 L615,36 L675,22 L735,48 L792,10 L845,38 L900,18 L958,44 L1015,6 L1070,34 L1128,16 L1185,42 L1245,8 L1300,36 L1360,20 L1440,38 L1440,50 Z" fill="#FFFBF8" />
  </svg>
</section>
```

**Frame spec (never change):** white `260×280px`, `padding: '20px'`, `boxShadow: '0px 4px 24px rgba(0,0,0,0.12)'`
**Hover:** `translateY(-8px)` at `0.3s ease` on the outer wrapper div
**Caption:** Fira Mono 11px, uppercase, `#888888`, centered, `margin: '12px 0 0'`
**Number of boxes:** flexible — 3 or 4; use `justifyContent: 'center'` so they stay centered regardless

---

## Reference: Section Wrappers

| Name | File | L/R Pad | T/B Pad | Background |
|---|---|---|---|---|
| `CaseStudySection` | `src/components/CaseStudySection.js` | 175px | 150px | `#FFFBF8` |
| `CaseStudyFullBleed` (FullBleed) | `src/components/CaseStudyFullBleed.js` | 80px | 80px | `#FFFBF8` |
