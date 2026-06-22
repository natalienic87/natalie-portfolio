import { useState, useEffect, useRef } from 'react';

const pills = [
  { src: '/homepage/4-about/3-branding-pill.png',      alt: 'Branding' },
  { src: '/homepage/4-about/4-artdirection-pill.png',  alt: 'Art Direction' },
  { src: '/homepage/4-about/5-designsystems-pill.png', alt: 'Design Systems' },
  { src: '/homepage/4-about/6-directing-pill.png',     alt: 'Directing' },
  { src: '/homepage/4-about/7-videoediting-pill.png',  alt: 'Video Editing' },
  { src: '/homepage/4-about/8-animation-pill.png',     alt: 'Animation' },
  { src: '/homepage/4-about/9-vibecoding-pill.png',    alt: 'Vibecoding' },
  { src: '/homepage/4-about/10-writing-pill.png',      alt: 'Writing' },
  { src: '/homepage/4-about/11-soundesign-pill.png',   alt: 'Sound Design' },
];

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

const GAP        = 40;  // px between cards
const CARD_W_PCT = 30;  // % of container width — cards slightly smaller so hover scale has room

function Carousel({ cards }) {
  const deck = [...cards, ...cards, ...cards]; // triple for seamless loop

  const containerRef  = useRef(null);
  const trackRef      = useRef(null);
  const offsetRef     = useRef(0);
  const stepRef       = useRef(0);
  const setWRef       = useRef(0);
  const dragRef       = useRef({ active: false, startX: 0, startOffset: 0 });
  const animRef       = useRef(null);
  const snapTimerRef  = useRef(null);
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
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; // ease-in-out cubic
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
    const target = Math.round(cardFloat);
    animateTo(setW + target * step + step * 0.7);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cardPx = container.clientWidth * CARD_W_PCT / 100;
    const step   = cardPx + GAP;
    const setW   = cards.length * step;
    stepRef.current = step;
    setWRef.current = setW;
    offsetRef.current = setW + step * 0.7; // start with left-peek visible
    applyTransform();

    // Non-passive wheel listener so we can preventDefault on horizontal swipe.
    // Mac trackpad sends many small deltaX events during momentum — we wait until
    // they taper off (< 1.5px) before snapping, so momentum feels uninterrupted.
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

  // ── Drag handlers ──────────────────────────────────────────────────────────
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

  // ── Arrow / dot navigation ─────────────────────────────────────────────────
  const goNext = () => {
    const t = offsetRef.current + stepRef.current;
    animateTo(t >= 2 * setWRef.current ? t - setWRef.current : t);
  };
  const goPrev = () => {
    const t = offsetRef.current - stepRef.current;
    animateTo(t < setWRef.current ? t + setWRef.current : t);
  };
  const goTo = (i) => {
    animateTo(setWRef.current + stepRef.current * i + stepRef.current * 0.7);
    setActiveDot(i);
  };

  const arrowStyle = {
    width: '40px', height: '40px', borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.5)', background: 'transparent',
    color: '#ffffff', fontSize: '16px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
    >
      {/* overflowX: clip prevents horizontal scroll without creating a scroll container,
          so overflowY stays truly visible — shadow/scale never clips top or bottom.
          Padding gives vertical breathing room; horizontal edge shadow is unavoidable at full-width. */}
      <div style={{ overflowX: 'clip', padding: '40px 0' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: `${GAP}px`, willChange: 'transform' }}>
          {deck.map((src, i) => (
            <div key={i} className="testimonial-card" style={{ flex: `0 0 ${CARD_W_PCT}%`, minWidth: 0 }}>
              <img
                src={src} alt="" draggable={false}
                style={{
                  width: '100%', height: 'auto', display: 'block',
                  borderRadius: '20px',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows + dots — padded back in since carousel is full-width */}
      <div
        className="flex items-center justify-center"
        style={{ gap: '16px', marginTop: '40px', paddingBottom: '80px' }}
        onMouseDown={e => e.stopPropagation()}
      >
        <button onClick={goPrev} style={arrowStyle}>←</button>

        {cards.map((_, i) => (
          <button
            key={i} onClick={() => goTo(i)}
            style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: i === activeDot ? '#ffffff' : 'transparent',
              border: '1px solid rgba(255,255,255,0.6)',
              padding: 0, cursor: 'pointer', transition: 'background 0.2s',
            }}
          />
        ))}

        <button onClick={goNext} style={arrowStyle}>→</button>
      </div>
    </div>
  );
}

export default function About() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setInView(entry.isIntersecting); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ marginTop: '60px', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Background ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0, right: 0,
          backgroundImage: "url('/homepage/4-about/1-purple-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* ── Decorative elements ── */}
      {/* Spinning ellipse + starburst — top right */}
      <div style={{ position: 'absolute', top: '-40px', right: '-20px', zIndex: 1 }}>
        <img
          src="/homepage/4-about/Ellipse 33.svg"
          alt=""
          className="animate-spin-ellipse"
          style={{ opacity: 0.6, display: 'block' }}
        />
        {/* Cloud — positioned in the visible quadrant of the ellipse */}
        <img
          src="/homepage/4-about/Purple Cloud 4.png"
          alt=""
          className="animate-cloud-1"
          style={{
            position: 'absolute',
            top: 'calc(52% + 120px)',
            left: 'calc(18% - 120px)',
            width: '1728px',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        />
      </div>

      {/* Small ellipse — lower left */}
      <div
        style={{ position: 'absolute', bottom: '160px', left: '40px', opacity: 0.4, zIndex: 1 }}
      >
        <img src="/homepage/4-about/small-ellipse.svg" alt="" className="animate-spin-ellipse" />
      </div>

      {/* Star — no separate parallax, rides with content */}
      <img
        src="/homepage/4-about/Star 2.png"
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
          className="font-body font-bold text-center"
          style={{ fontSize: '18px', letterSpacing: '0.3em', marginBottom: '48px', color: '#101010' }}
        >
          PART DIRECTOR. PART BUILDER. FULLY HUMAN.
        </p>

        {/* 2-column layout — true 50/50 */}
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

          {/* Left — headshot, 50% — crossfades to hover image on mouse over */}
          <div
            style={{ flex: '0 0 calc(50% - 30px)', position: 'relative', opacity: inView ? undefined : 0, animation: inView ? 'slide-in-left 0.6s ease-out forwards' : 'none' }}
            onMouseEnter={e => e.currentTarget.querySelector('.headshot-hover-img').style.opacity = 1}
            onMouseLeave={e => e.currentTarget.querySelector('.headshot-hover-img').style.opacity = 0}
          >
            {/* Base image */}
            <img
              src="/homepage/4-about/2-headshot.jpg"
              alt="Natalie Nicholson"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
                display: 'block',
                boxShadow: '4px 4px 20px 5px rgba(0,0,0,0.25)',
              }}
            />
            {/* Hover image — sits on top, fades in on hover */}
            <img
              src="/homepage/4-about/2-Nat headshot-hover.jpg"
              alt=""
              aria-hidden="true"
              className="headshot-hover-img"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                boxShadow: '4px 4px 20px 5px rgba(0,0,0,0.25)',
              }}
            />
          </div>

          {/* Right — 50% column, text constrained to 430px */}
          <div style={{ flex: '0 0 calc(50% - 30px)', opacity: inView ? undefined : 0, animation: inView ? 'slide-in-right 0.6s ease-out forwards' : 'none' }}>
          <div style={{ maxWidth: '430px' }}>
            <h2
              className="font-heading font-bold"
              style={{ fontSize: '48px', lineHeight: 1.1, color: '#101010' }}
            >
              Brand. Film. AI.
            </h2>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p className="font-body font-normal" style={{ fontSize: '20px', lineHeight: 1.6, color: '#101010' }}>
                I work across brand, film, and emerging technology, and have just enough vibe coding skills to be dangerous. 🔥
              </p>
              <p className="font-body font-normal" style={{ fontSize: '20px', lineHeight: 1.6, color: '#101010' }}>
                I&apos;m building with AI the way I&apos;ve always built: with intention, with craft, and storytelling. I have a deep suspicion of anything that looks impressive but says nothing.
              </p>
            </div>

            {/* Skill pills — 3 explicit rows, 10px column gap, 15px row gap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '32px' }}>
              {[pills.slice(0, 3), pills.slice(3, 6), pills.slice(6, 9)].map((row, rowIdx) => (
                <div key={rowIdx} style={{ display: 'flex', gap: '10px' }}>
                  {row.map(({ src, alt }, colIdx) => {
                    const delay = (rowIdx * 3 + colIdx) * 0.09;
                    return (
                      <div key={src} className="pill-wiggle" style={{ display: 'inline-block' }}>
                        <img
                          src={src}
                          alt={alt}
                          style={{
                            height: '39px',
                            width: 'auto',
                            display: 'block',
                            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))',
                          }}
                        />
                      </div>
                    );
                  })}
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
          src="/homepage/4-about/Line 7.svg"
          alt=""
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* ── PART 2: Testimonials ──────────────────────────────────── */}

        {/* Labels — padded normally */}
        <div style={{ padding: '60px 80px 48px' }}>
          <p
            className="font-body font-bold text-center uppercase"
            style={{ fontSize: '18px', letterSpacing: '0.3em', marginBottom: '8px', color: '#101010' }}
          >
            Kind Words on LinkedIn and Substack
          </p>
          <p
            className="font-body font-bold text-center uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#101010' }}
          >
            From Former Colleagues and Collaborators
          </p>
        </div>

        {/* Carousel — full width, no side padding */}
        <Carousel cards={testimonialCards} />
      </div>{/* end content wrapper */}
    </section>
  );
}
