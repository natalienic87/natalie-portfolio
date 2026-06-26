import { useState, useEffect, useRef } from 'react';
import TickerStrip from './TickerStrip';

const testimonialCards = [
  '/homepage/4-about/T1-Taylor Testimonial.png',
  '/homepage/4-about/T2-Alyssa J Testimonial.png',
  '/homepage/4-about/T3-Pinkie Testimonial.png',
  '/homepage/4-about/T4-Nancy C Testinonial.png',
  '/homepage/4-about/T5-Alyssa F Testimonial.png',
  '/homepage/4-about/T6-Michael G Testimonial.png',
  '/homepage/4-about/T7-Halle R Testimonial.png',
  '/homepage/4-about/T8-Courtney I Testimonial.png',
];

const GAP        = 40;
const CARD_W_PCT = 24;

function Carousel({ cards }) {
  const deck = [...cards, ...cards, ...cards];

  const containerRef  = useRef(null);
  const trackRef      = useRef(null);
  const offsetRef     = useRef(0);
  const stepRef       = useRef(0);
  const setWRef       = useRef(0);
  const dragRef       = useRef({ active: false, startX: 0, startOffset: 0 });
  const animRef       = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dragging, setDragging]   = useState(false);

  const applyTransform = () => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    const step = stepRef.current;
    const setW = setWRef.current;
    if (step > 0) {
      const dot = Math.floor((offsetRef.current - setW) / step) % cards.length;
      if (dot >= 0 && dot < cards.length) setActiveDot(dot);
    }
  };

  const normalize = () => {
    const setW = setWRef.current;
    if (offsetRef.current >= 2 * setW) offsetRef.current -= setW;
    if (offsetRef.current <      setW) offsetRef.current += setW;
  };

  const animateTo = (target) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start    = offsetRef.current;
    const diff     = target - start;
    const duration = 500;
    const t0       = performance.now();
    const tick = (now) => {
      const p    = Math.min((now - t0) / duration, 1);
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      offsetRef.current = start + diff * ease;
      applyTransform();
      if (p < 1) { animRef.current = requestAnimationFrame(tick); }
      else        { normalize(); applyTransform(); }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const snapNearest = () => {
    const step = stepRef.current;
    const setW = setWRef.current;
    const cardFloat = (offsetRef.current - setW - step * 0.7) / step;
    animateTo(setW + Math.round(cardFloat) * step + step * 0.7);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cardPx = container.clientWidth * CARD_W_PCT / 100;
    const step   = cardPx + GAP;
    const setW   = cards.length * step;
    stepRef.current = step;
    setWRef.current = setW;
    offsetRef.current = setW + step * 0.7;
    applyTransform();
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (animRef.current) cancelAnimationFrame(animRef.current);
      offsetRef.current += e.deltaX;
      normalize();
      applyTransform();
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [cards.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseDown = (e) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    offsetRef.current = dragRef.current.startOffset + (dragRef.current.startX - e.clientX);
    normalize();
    applyTransform();
  };
  const onDragEnd = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
  };

  const goNext = () => { const t = offsetRef.current + stepRef.current; animateTo(t >= 2 * setWRef.current ? t - setWRef.current : t); };
  const goPrev = () => { const t = offsetRef.current - stepRef.current; animateTo(t < setWRef.current ? t + setWRef.current : t); };
  const goTo   = (i) => { animateTo(setWRef.current + stepRef.current * i + stepRef.current * 0.7); setActiveDot(i); };

  const arrowStyle = {
    width: '40px', height: '40px', borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.5)', background: 'transparent',
    color: '#ffffff', fontSize: '16px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };

  return (
    <div ref={containerRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove}
      onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
      style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
    >
      <div style={{ overflowX: 'clip', padding: '40px 0' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: `${GAP}px`, willChange: 'transform' }}>
          {deck.map((src, i) => (
            <div key={i} className="testimonial-card" style={{ flex: `0 0 ${CARD_W_PCT}%`, minWidth: 0 }}>
              <img src={src} alt="" draggable={false}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px', boxShadow: '0 6px 24px rgba(0,0,0,0.18)', pointerEvents: 'none' }} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center"
        style={{ gap: '16px', marginTop: '40px', paddingBottom: '80px' }}
        onMouseDown={e => e.stopPropagation()}
      >
        <button onClick={goPrev} style={arrowStyle}>←</button>
        {cards.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: i === activeDot ? '#ffffff' : 'transparent',
            border: '1px solid rgba(255,255,255,0.6)',
            padding: 0, cursor: 'pointer', transition: 'background 0.2s',
          }} />
        ))}
        <button onClick={goNext} style={arrowStyle}>→</button>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* ── Section 1: Fun ideas, made functional ── */}
      <section style={{ position: 'relative', backgroundImage: "url('/Medium-beige-darker-bg2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100px', paddingBottom: '100px', zIndex: 2 }}>

        {/* Top torn edge — dark bleeds into beige */}
        <svg width="100%" height="50" viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}>
          <path d="M0,0 L1440,0 L1440,22 L1370,36 L1310,10 L1250,42 L1190,15 L1135,38 L1080,8 L1020,44 L965,18 L910,42 L855,12 L800,32 L740,5 L680,45 L620,20 L560,36 L505,8 L450,44 L395,18 L340,35 L285,5 L230,42 L175,12 L120,40 L60,8 L0,30 Z" fill="#101010" />
        </svg>

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>

          {/* 12-col grid: image left, text right */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '20px', alignItems: 'center' }}>

            {/* Left: headshot */}
            <div style={{ gridColumn: '1 / 7' }}>
              <img
                src="/homepage/4-about/2-headshot.jpg"
                alt="Natalie Nicholson"
                style={{ width: '520px', height: '650px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
            </div>

            {/* Right: text, centered vertically by grid align */}
            <div style={{ gridColumn: '7 / 13' }}>
              <p style={{
                fontFamily:    'Fira Mono, monospace',
                fontWeight:    400,
                fontSize:      '16px',
                lineHeight:    1.2,
                color:         '#6366c1',
                margin:        '0 0 16px',
              }}>
                The &ldquo;Human in the Loop&rdquo;
              </p>

              <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.05, color: '#101010', margin: '0 0 28px' }}>
                Fun ideas, made functional
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  I&apos;m a Senior Art Director and designer with a background in brand systems, campaign work, visual storytelling, and AI-assisted creative production.
                </p>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  I like the part of a project where the idea is still weird, and someone needs to turn the fog into a direction people can actually build from.
                </p>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  My work blends creative direction, design systems, writing, image-making, and generative tools. The tools change fast but the job stays pretty consistent: make smart decisions, protect the idea, and keep the work from looking like everyone else&apos;s.
                </p>
              </div>
            </div>

          </div>

          {/* Ticker tape 50px below image */}
          <div style={{ marginTop: '50px' }}>
            <TickerStrip items={['Branding', 'Art Direction', 'Design Systems', 'AI Workflows', 'Writing', 'Vibecoding', 'Video Editing']} />
          </div>

        </div>

        {/* Bottom torn edge — beige into dark below */}
        <svg width="100%" height="50" viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, display: 'block' }}>
          <path d="M0,50 L0,30 L60,8 L120,40 L175,12 L230,42 L285,5 L340,35 L395,18 L450,44 L505,8 L560,36 L620,20 L680,45 L740,5 L800,32 L855,12 L910,42 L965,18 L1020,44 L1080,8 L1135,38 L1190,15 L1250,42 L1310,10 L1370,36 L1440,22 L1440,50 Z" fill="#68512F" />
        </svg>

      </section>

      {/* ── Section 2: Testimonials ── */}
      <section style={{ backgroundColor: '#68512F', paddingTop: '80px' }}>

        {/* Eyebrow + heading */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{
            fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px',
            lineHeight: 1.2, color: '#FDB154', margin: '0 0 16px',
          }}>
            Kind words on LinkedIn &amp; Substack
          </p>
          <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.05, color: '#ffffff', margin: 0 }}>
            Trusted by creative leads and<br />fast-moving teams
          </h2>
        </div>

        {/* Carousel */}
        <Carousel cards={testimonialCards} />

      </section>
    </>
  );
}
