import { useState } from 'react';
import Button from './Button';

const chapters = [
  {
    dates: '2007–2010',
    dot: '#6366F1',
    title: 'The Origin Story',
    subtitle: 'From journalism to film — finding the storytelling foundation.',
    bullets: [
      'Studied Journalism at UMass Amherst with a Film certificate and Sociology minor',
      'Member of Honors Commonwealth College, Citizen Scholar scholarship',
      'Discovered that storytelling was the through-line across every medium',
    ],
    pills: [
      '/homepage/6-careerpath/Pill-Journalism.png',
      '/homepage/6-careerpath/Pill-Film.png',
    ],
  },
  {
    dates: '2010–2016',
    dot: '#F97316',
    title: 'Early Experiments',
    subtitle: 'Learning to make things — design, science, and content.',
    bullets: [
      'Data visualization and podcast editing at New England Journal of Medicine',
      'Brand identity and content strategy at nDash Marketing',
      'Graphic Design Certificate at MassArt',
    ],
    pills: [
      '/homepage/6-careerpath/Pill-Design.png',
      '/homepage/6-careerpath/Pill-ContentStrategy.png',
    ],
  },
  {
    dates: '2017–2020',
    dot: '#EC4899',
    title: 'Finding the Craft',
    subtitle: 'Building brands from the ground up.',
    bullets: [
      'Built entire brand and marketing infrastructure for Modern Clinical Planning',
      'Developed investor materials, government proposals, and CRM systems',
      'Designed across print, digital, and email at Collette travel, for US, CAN, UK, AUS markets',
    ],
    pills: [
      '/homepage/6-careerpath/Pill-BrandStrategy.png',
      '/homepage/6-careerpath/Pill-Content.png',
    ],
  },
  {
    dates: '2020–2025',
    dot: '#6366F1',
    title: 'Agency & Scale',
    subtitle: 'Leading creative at agency level — and pioneering AI before anyone asked.',
    bullets: [
      'Art directed omnichannel campaigns for CVS Health, Aetna, and Stop & Shop',
      'Introduced AI practices through Lunch & Learns before most agencies had a policy',
      'Co-led (add)ventures brand refresh; promoted to Art Director, AI Integration',
    ],
    pills: [
      '/homepage/6-careerpath/Pill-CreativeDirection.png',
      '/homepage/6-careerpath/Pill-ai-Integration.png',
    ],
  },
];

function AccordionCard({ chapter, isOpen, onToggle }) {
  const { dates, dot, title, subtitle, bullets, pills } = chapter;

  return (
    <div
      onClick={onToggle}
      style={{
        backgroundColor: '#101010',
        borderRadius: '20px',
        border: isOpen ? `1px solid ${dot}` : '1px solid transparent',
        padding: '24px 28px 24px 52px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Date + chevron */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="font-body" style={{ fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0, letterSpacing: '0.05em' }}>
          {dates}
        </p>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}
        >
          <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Title */}
      <div style={{ marginTop: '14px' }}>
        <h3 className="font-heading" style={{ fontWeight: 500, fontSize: '19px', color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
          {title}
        </h3>
      </div>

      {/* Subtitle */}
      <p className="font-body" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', margin: '8px 0 0', lineHeight: 1.5 }}>
        {subtitle}
      </p>

      {/* Expanded content */}
      {isOpen && (
        <>
          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.15)', margin: '20px 0' }} />

          {bullets.length > 0 && (
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bullets.map((b, i) => (
                <li key={i} className="font-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>
                  {b}
                </li>
              ))}
            </ul>
          )}

          {pills.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
              {pills.map((src, i) => (
                <img key={i} src={src} alt="" style={{ height: '32px', width: 'auto' }} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function Career() {
  const [openIdx, setOpenIdx] = useState(0);
  const toggle = (i) => setOpenIdx(prev => (prev === i ? -1 : i));

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 100px' }}>

      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/homepage/6-careerpath/Charcoal-BG1.png')",
        backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
      }} />

      {/* ── Decorative elements ── */}
      {/* Saturn — moved to cards container */}

      {/* Red diamond — above the ellipse, top right */}
      <img src="/homepage/6-careerpath/d-Red Diamond 2.png" alt=""
        className="animate-pulse-star"
        style={{ position: 'absolute', top: '330px', right: '115px', width: '36px', zIndex: 2 }} />

      {/* White burst — left mid */}
      <div style={{ position: 'absolute', top: '52%', left: '52px', width: '44px', zIndex: 1, transform: 'translateY(-50%)' }}>
        <img src="/homepage/6-careerpath/d-White Burst 3.png" alt=""
          className="animate-pulse-star"
          style={{ width: '100%' }} />
      </div>

      {/* Spiral — moved to cards container */}

      {/* Ellipse 33 — upper right */}
      <img src="/homepage/6-careerpath/Ellipse 33.svg" alt=""
        className="animate-spin-ellipse"
        style={{ position: 'absolute', top: '340px', right: '-30px', width: '130px', opacity: 0.55, zIndex: 1 }} />

      {/* Ellipse 33 2 — lower left */}
      <img src="/homepage/6-careerpath/Ellipse 33 2.svg" alt=""
        className="animate-spin-ellipse"
        style={{ position: 'absolute', bottom: '80px', left: '-30px', width: '150px', opacity: 0.45, zIndex: 1 }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Header — full width, centered */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="font-body"
            style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '0.3em', color: '#E35038', textTransform: 'uppercase', marginBottom: '12px' }}>
            Career Path
          </p>
          <h2 className="font-heading"
            style={{ fontWeight: 500, fontSize: '80px', color: '#ffffff', lineHeight: 1, margin: 0 }}>
            The journey so far
          </h2>
          <div style={{ marginTop: '16px' }}>
            <Button variant="text-link" arrow="down" href="#">Download My Resume</Button>
          </div>
        </div>

        {/* Timeline + cards — 820px centered, line overlays all cards */}
        <div style={{ width: '820px', margin: '0 auto', position: 'relative' }}>

          {/* Saturn — nestled top-left of first card, peeking behind it */}
          <img src="/homepage/6-careerpath/d-Yellow Satrun 1.png" alt=""
            style={{ position: 'absolute', left: '-130px', top: '-94px', width: '200px', zIndex: 0, pointerEvents: 'none' }} />

          {/* Spiral — nestled bottom-right of last card, peeking behind it */}
          <img src="/homepage/6-careerpath/d-Spiral.png" alt=""
            style={{ position: 'absolute', right: '-80px', bottom: '-50px', width: '108px', zIndex: 0, pointerEvents: 'none' }} />

          {/* Single vertical dotted line — runs over all cards, pointer-events none so clicks pass through */}
          <div style={{
            position: 'absolute', left: '27px', top: 0, bottom: 0,
            borderLeft: '2px dashed rgba(255,255,255,0.22)',
            zIndex: 5, pointerEvents: 'none',
          }} />

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {chapters.map((ch, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* Timeline dot — centered on the line (line at 27px, dot 12px → left: 21px) */}
                <div style={{
                  position: 'absolute', left: '21px', top: '52px',
                  width: '12px', height: '12px', borderRadius: '50%',
                  backgroundColor: ch.dot, zIndex: 6, pointerEvents: 'none',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.5)',
                }} />
                <AccordionCard chapter={ch} isOpen={openIdx === i} onToggle={() => toggle(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
