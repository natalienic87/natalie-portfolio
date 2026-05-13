import { useState } from 'react';

const pills = [
  { src: '/images/4-about/3-branding-pill.png',      alt: 'Branding' },
  { src: '/images/4-about/4-artdirection-pill.png',  alt: 'Art Direction' },
  { src: '/images/4-about/5-designsystems-pill.png', alt: 'Design Systems' },
  { src: '/images/4-about/6-directing-pill.png',     alt: 'Directing' },
  { src: '/images/4-about/7-videoediting-pill.png',  alt: 'Video Editing' },
  { src: '/images/4-about/8-animation-pill.png',     alt: 'Animation' },
  { src: '/images/4-about/9-vibecoding-pill.png',    alt: 'Vibecoding' },
  { src: '/images/4-about/10-writing-pill.png',      alt: 'Writing' },
  { src: '/images/4-about/11-soundesign-pill.png',   alt: 'Sound Design' },
];

const testimonials = [
  {
    color: '#FDB154',
    textDark: true,
    quote: 'I\u2019m convinced she is the next big thing.',
    name: 'Pinkie',
    title: 'Branding & Creative Lead',
    source: 'SUBSTACK',
    featured: false,
  },
  {
    color: '#D2D7F5',
    textDark: true,
    quote: 'Natalie is such a talented, positive and energetic force. Every creative piece she tackles is imbued with a unique and bespoke flair.',
    name: 'Alyssa J.',
    title: 'Sr. UX Content Designer',
    source: 'LINKEDIN',
    featured: false,
  },
  {
    color: '#E35038',
    textDark: false,
    quote: 'I\u2019m convinced she is the next big thing.',
    name: 'Pinkie',
    title: 'Branding & Creative Lead',
    source: 'SUBSTACK',
    featured: true,
  },
];

function TestimonialCard({ color, textDark, quote, name, title, source, featured }) {
  const text  = textDark ? '#101010' : '#FEFEFE';
  const muted = textDark ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.55)';
  const quoteMarkColor = textDark ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)';
  const dividerColor   = textDark ? 'rgba(0,0,0,0.2)'  : 'rgba(255,255,255,0.35)';

  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '20px',
        padding: '36px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '400px',
        height: '100%',
      }}
    >
      {/* Opening quote mark */}
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '72px',
          lineHeight: 1,
          color: quoteMarkColor,
          marginBottom: '8px',
          alignSelf: 'flex-start',
        }}
      >
        &#x201C;
      </span>

      {/* Quote */}
      <p
        className="font-heading font-medium text-center"
        style={{
          fontSize: featured ? '28px' : '17px',
          lineHeight: featured ? '1.3' : '1.6',
          color: text,
          flex: 1,
        }}
      >
        {quote}
      </p>

      {/* Dashed divider */}
      <div
        style={{
          width: '48px',
          borderTop: `1px dashed ${dividerColor}`,
          margin: '24px 0',
        }}
      />

      {/* Name */}
      <p
        className="font-body font-bold uppercase tracking-widest"
        style={{ fontSize: '12px', color: text, letterSpacing: '0.15em' }}
      >
        {name}
      </p>

      {/* Title */}
      <p
        className="font-body uppercase"
        style={{ fontSize: '10px', color: muted, marginTop: '4px', letterSpacing: '0.1em' }}
      >
        {title}
      </p>

      {/* Source */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p className="font-body uppercase" style={{ fontSize: '10px', color: muted, letterSpacing: '0.15em', lineHeight: 1.8 }}>
          +<br />{source}
        </p>
      </div>
    </div>
  );
}

function Carousel({ items }) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(total - 1, i + 1));

  return (
    <div>
      {/* Track — 3 cards visible, translate by 1 card + gap per step */}
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            transition: 'transform 0.5s ease',
            // Each card is 1/3 of container minus gap share; step = card + gap
            transform: `translateX(calc(-${index} * (33.333% + 8px)))`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{ flex: '0 0 calc(33.333% - 16px)', minWidth: 0 }}
            >
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows + dots */}
      <div
        className="flex items-center justify-center"
        style={{ gap: '16px', marginTop: '40px' }}
      >
        {/* Prev arrow */}
        <button
          onClick={prev}
          disabled={index === 0}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.5)',
            background: 'transparent',
            color: '#FEFEFE',
            fontSize: '16px',
            cursor: index === 0 ? 'default' : 'pointer',
            opacity: index === 0 ? 0.3 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ←
        </button>

        {/* Dots */}
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i === index ? '#FEFEFE' : 'transparent',
              border: '1px solid rgba(255,255,255,0.6)',
              padding: 0,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          />
        ))}

        {/* Next arrow */}
        <button
          onClick={next}
          disabled={index === total - 1}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.5)',
            background: 'transparent',
            color: '#FEFEFE',
            fontSize: '16px',
            cursor: index === total - 1 ? 'default' : 'pointer',
            opacity: index === total - 1 ? 0.3 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      style={{ marginTop: '60px', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Background ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0, right: 0,
          backgroundImage: "url('/images/4-about/1-purple-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* ── Decorative elements ── */}
      {/* Large ellipse — top right */}
      <div
        style={{ position: 'absolute', top: '-40px', right: '-20px', opacity: 0.5, zIndex: 1 }}
      >
        <img src="/images/4-about/large-ellipse.svg" alt="" className="animate-spin-ellipse" />
      </div>

      {/* Small ellipse — lower left */}
      <div
        style={{ position: 'absolute', bottom: '160px', left: '40px', opacity: 0.4, zIndex: 1 }}
      >
        <img src="/images/4-about/small-ellipse.svg" alt="" className="animate-spin-ellipse" />
      </div>

      {/* Star — no separate parallax, rides with content */}
      <img
        src="/images/4-about/Star 2.png"
        alt=""
        className="absolute animate-pulse-star"
        style={{ top: '60px', right: '180px', width: '28px', opacity: 0.7, zIndex: 1 }}
      />

      {/* ── All content at normal scroll speed ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

      {/* ── PART 1: About ─────────────────────────────────────────── */}
      <div style={{ padding: '70px 80px 60px' }}>

        {/* Section label */}
        <p
          className="font-body font-bold text-center text-off-white"
          style={{ fontSize: '12px', letterSpacing: '0.28em', marginBottom: '48px' }}
        >
          PART DIRECTOR. PART BUILDER. FULLY HUMAN.
        </p>

        {/* 2-column layout — true 50/50 */}
        <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

          {/* Left — headshot, 50% */}
          <div style={{ flex: '0 0 calc(50% - 30px)' }}>
            <img
              src="/images/4-about/2-headshot.jpg"
              alt="Natalie Nicholson"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
                display: 'block',
                boxShadow: '4px 4px 20px 5px rgba(0,0,0,0.25)',
              }}
            />
          </div>

          {/* Right — 50% column, text constrained to 430px */}
          <div style={{ flex: '0 0 calc(50% - 30px)', paddingTop: '8px' }}>
          <div style={{ maxWidth: '430px' }}>
            <h2
              className="font-heading font-medium"
              style={{ fontSize: '48px', lineHeight: 1.1, color: '#101010' }}
            >
              Brand. Film. AI.
            </h2>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p className="font-body font-medium" style={{ fontSize: '20px', lineHeight: 1.6, color: '#101010' }}>
                I work across brand, film, and emerging technology, and have just enough vibe coding skills to be dangerous. 🔥
              </p>
              <p className="font-body font-medium" style={{ fontSize: '20px', lineHeight: 1.6, color: '#101010' }}>
                I&apos;m building with AI the way I&apos;ve always built: with intention, with craft, and storytelling. I have a deep suspicion of anything that looks impressive but says nothing.
              </p>
            </div>

            {/* Skill pills — 3 explicit rows, 10px column gap, 15px row gap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '32px' }}>
              {[pills.slice(0, 3), pills.slice(3, 6), pills.slice(6, 9)].map((row, rowIdx) => (
                <div key={rowIdx} style={{ display: 'flex', gap: '10px' }}>
                  {row.map(({ src, alt }) => (
                    <img key={src} src={src} alt={alt} style={{ height: '39px', width: 'auto', display: 'block' }} />
                  ))}
                </div>
              ))}
            </div>
          </div>{/* end 430px inner constraint */}
          </div>{/* end right column */}
        </div>
      </div>

      {/* ── Dashed divider ────────────────────────────────────────── */}
      <div style={{ padding: '0 80px' }}>
        <img
          src="/images/4-about/Line 7.svg"
          alt=""
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* ── PART 2: Testimonials ──────────────────────────────────── */}
      <div style={{ padding: '60px 80px 80px' }}>

        {/* Labels */}
        <p
          className="font-body font-bold text-center text-off-white uppercase"
          style={{ fontSize: '12px', letterSpacing: '0.28em', marginBottom: '8px' }}
        >
          Kind Words on LinkedIn and Substack
        </p>
        <p
          className="font-body text-center uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)', marginBottom: '48px' }}
        >
          From Former Colleagues and Collaborators
        </p>

        <Carousel items={testimonials} />
      </div>
      </div>{/* end content wrapper */}
    </section>
  );
}
