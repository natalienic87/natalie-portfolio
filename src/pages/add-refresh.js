import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import CaseStudyNav from '../components/CaseStudyNav';
import Footer from '../components/Footer';
import CaseStudySection  from '../components/CaseStudySection';
import CaseStudyFullBleed from '../components/CaseStudyFullBleed';
import StickyHero          from '../components/StickyHero';
import DashedCardCarousel  from '../components/DashedCardCarousel';
import TickerStrip         from '../components/TickerStrip';

// ── Metadata label/value pair ─────────────────────────────────────────────────
function MetaItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '24px', width: '500px' }}>
      <span style={{
        fontFamily:    'Fira Mono, monospace',
        fontWeight:    400,
        fontSize:      '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        lineHeight:    1.5,
        color:         '#888888',
        minWidth:      '72px',
        flexShrink:    0,
      }}>{label}</span>
      <span style={{
        fontFamily: 'Fira Mono, monospace',
        fontWeight: 400,
        fontSize:   '14px',
        lineHeight: 1.5,
        color:      '#101010',
        flex:       1,
        whiteSpace: 'nowrap',
      }}>{value}</span>
    </div>
  );
}

// ── Scroll-reveal wrapper ─────────────────────────────────────────────────────
function Reveal({ children, delay = 0, distance = 48, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0px)' : `translateY(${distance}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        width:      '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Collage carousel ─────────────────────────────────────────────────────────
const collageItems = [
  { img: '/add-refresh/7_collages/7_collage1.jpg' },
  { img: '/add-refresh/7_collages/7_collage4.jpg' },
  { img: '/add-refresh/7_collages/7_collage6.jpg' },
  { img: '/add-refresh/7_collages/7_collage2.jpg' },
  { img: '/add-refresh/7_collages/7_collage5.jpg' },
  { img: '/add-refresh/7_collages/7_collage3.jpg' },
];

function CollageCarousel() {
  return (
    <>
      <CaseStudyFullBleed background="#FFFBF8" style={{ paddingTop: '80px', paddingBottom: '10px', textAlign: 'center' }}>
        <Reveal>
          <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
            Collage as an Expression
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 auto', maxWidth: '640px' }}>
            The goal was to turn (add)ventures physical artifacts and ownable addventures symbols into a dimensional, collage-based visual language. I created these concepts using a blend of AI and photoshop.
          </p>
        </Reveal>
      </CaseStudyFullBleed>

      <div style={{ backgroundColor: '#FFFBF8', paddingBottom: '80px', position: 'relative', zIndex: 2 }}>
        <DashedCardCarousel items={collageItems} imageRatio="1 / 1" />
      </div>
    </>
  );
}

// ── Card deck: toolkit slides ─────────────────────────────────────────────────
const toolkitSlides = [
  '/add-refresh/5_tookit/5_add_type.jpg',
  '/add-refresh/5_tookit/5_add_gradient.jpg',
  '/add-refresh/5_tookit/5_add_mark.jpg',
  '/add-refresh/5_tookit/5_add_swag.jpg',
  '/add-refresh/5_tookit/5_add_decks.jpg',
  '/add-refresh/5_tookit/5_add_collage.jpg',
];
const toolkitRotations = [-2, 3, -4, 1.5, -3, 2];

function ConceptSystem() {
  const [index,        setIndex]        = useState(0);
  const [isAnimating,  setIsAnimating]  = useState(false);
  const [flyingOut,    setFlyingOut]    = useState(false);
  const [enteringPrev, setEnteringPrev] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'scale(1)';
          el.style.opacity   = '1';
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const n = toolkitSlides.length;

  const go = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (dir === 'next') {
      setFlyingOut(true);
      setTimeout(() => { setFlyingOut(false); setIndex(i => (i + 1) % n); }, 400);
      setTimeout(() => setIsAnimating(false), 450);
    } else {
      setIndex(i => (i - 1 + n) % n);
      setEnteringPrev(true);
      setTimeout(() => { setEnteringPrev(false); setIsAnimating(false); }, 450);
    }
  };

  const getCardStyle = (si) => {
    const pos = (si - index + n) % n;
    const rot = toolkitRotations[si];
    if (pos === 0) {
      if (enteringPrev) return {
        position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
        zIndex: 3, animation: 'card-enter-right 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        '--rot': `${rot}deg`, boxShadow: '0px 12px 32px rgba(0,0,0,0.18)',
      };
      return {
        position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
        zIndex: 3,
        transform:  flyingOut ? `translateX(120%) rotate(${rot + 15}deg)` : `rotate(${rot}deg)`,
        opacity:    flyingOut ? 0 : 1,
        boxShadow:  '0px 12px 32px rgba(0,0,0,0.18)',
        transition: 'transform 0.4s ease-in, opacity 0.3s ease-in',
      };
    }
    if (pos === 1) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex: 2, transform: flyingOut ? `rotate(${rot}deg)` : `rotate(${rot}deg) translate(6px, 8px)`,
      opacity: 1, boxShadow: '-4px 6px 18px rgba(0,0,0,0.12)', transition: 'transform 0.4s ease-out',
    };
    if (pos === 2) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex: 1, transform: flyingOut ? `rotate(${rot}deg) translate(6px, 8px)` : `rotate(${rot}deg) translate(-8px, 14px)`,
      opacity: 1, boxShadow: '-8px 8px 24px rgba(0,0,0,0.12)', transition: 'transform 0.4s ease-out',
    };
    return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex: 0, transform: `rotate(${rot}deg) translate(-8px, 14px)`, opacity: 0, transition: 'none',
    };
  };

  const ArrowBtn = ({ onClick, children }) => (
    <button onClick={onClick} style={{
      width: '44px', height: '44px', borderRadius: '50%',
      border: '1.5px solid rgba(0,0,0,0.3)', background: 'none', color: '#101010',
      fontSize: '18px', cursor: isAnimating ? 'default' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'border-color 0.2s ease', flexShrink: 0,
      opacity: isAnimating ? 0.4 : 1,
    }}
      onMouseEnter={e => { if (!isAnimating) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.6)'; }}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'}
    >{children}</button>
  );

  return (
    <CaseStudySection style={{ paddingTop: '80px', paddingBottom: '120px' }}>
      <div ref={contentRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        columnGap: '20px',
        alignItems: 'center',
        transform: 'scale(0.96)', opacity: 0,
        transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'center center',
      }}>

        {/* Left: heading + text (cols 1–5) */}
        <div style={{ gridColumn: '1 / 6' }}>
          <Reveal delay={0}>
            <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
              Familiar enough to belong. Flexible enough to grow.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
              The direction I helped develop — &ldquo;Night at the muse-em&rdquo; — was selected as the foundation because it built upon the brand&apos;s existing equity. This gave the agency more room to express its personality without a full reset.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              From there, the challenge was synthesis: taking the strongest conceptual elements from the broader team&apos;s explorations and weaving them into a single, cohesive visual system that still felt unified.
            </p>
          </Reveal>
        </div>

        {/* Right: card stack + arrows (cols 7–12) */}
        <Reveal delay={0} style={{ gridColumn: '7 / 13', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <div style={{ position: 'relative', width: '622px', height: '763px' }}>
            {toolkitSlides.map((src, si) => (
              <div key={si} style={getCardStyle(si)}>
                <img src={src} alt={`Brand system ${si + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Fira Mono, monospace', fontWeight: 400,
              fontSize: '16px', lineHeight: 1.2, color: '#101010',
            }}>flip through the deck</span>
            <ArrowBtn onClick={() => go('prev')}>←</ArrowBtn>
            <ArrowBtn onClick={() => go('next')}>→</ArrowBtn>
          </div>
        </Reveal>

      </div>
    </CaseStudySection>
  );
}

// ── Phone frame with tilt hover ──────────────────────────────────────────────
function PhoneCard({ src, width = '300px' }) {
  const ref = useRef(null);
  const TILT = 12;
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const y = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transition = 'transform 0.1s ease';
    el.style.transform  = `perspective(1000px) rotateX(${-y * TILT}deg) rotateY(${x * TILT}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AddRefresh() {
  return (
    // NO overflow on <main> — required for StickyHero position:sticky to work
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFBF8', color: '#101010' }}>
      <Cursor />
      <CaseStudyNav />

      {/* ── Hero: 50/50 split ── */}
      <StickyHero backgroundColor="#FFFBF8">

        {/* Left — eyebrow + title + meta */}
        <div style={{
          flex:            '0 0 50%',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'center',
          paddingLeft:     'max(120px, calc((100vw - 1440px) / 2 + 120px))',
          paddingRight:    '120px',
          paddingTop:      '80px',
          paddingBottom:   '80px',
          boxSizing:       'border-box',
          backgroundColor: '#FFFBF8',
          position:        'relative',
          zIndex:          1,
        }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '500px', marginBottom: '50px' }}>
            <style>{`@keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="#101010" style={{ flexShrink: 0, animation: 'slow-spin 12s linear infinite', transformOrigin: 'center' }}>
              <path d="M8,1 L9.2,5.3 L13.5,3.7 L10.9,7.3 L14.8,9.6 L10.4,9.9 L10.9,14.4 L8,11 L5.1,14.4 L5.6,9.9 L1.2,9.6 L5.1,7.3 L2.5,3.7 L6.8,5.3 Z"/>
            </svg>
            <span style={{
              fontFamily:    'Fira Mono, monospace',
              fontWeight:    400,
              fontSize:      '18px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         '#101010',
            }}>Case Study</span>
          </div>

          <h1 className="font-heading" style={{
            fontWeight: 700,
            fontSize:   '80px',
            lineHeight: '80px',
            color:      '#101010',
            margin:     '0 0 28px',
          }}>
            Refreshing the (add)ventures brand from the inside out
          </h1>

          {/* Dashed divider */}
          <svg width="500" height="2" style={{ display: 'block', margin: '32px 0' }} preserveAspectRatio="none">
            <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.25)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <MetaItem label="Year"   value="2025" />
            <MetaItem label="Role"   value="Sr. Designer & Art Director" />
            <MetaItem label="Medium" value="Brand Identity, Visual Systems, Web" />
          </div>
        </div>

        {/* Right — full-height looping video */}
        <div style={{ flex: '0 0 50%', overflow: 'hidden', position: 'relative', zIndex: 1, minHeight: 'max(700px, 75vh)', maxHeight: 'max(700px, 75vh)' }}>
          <video
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          >
            <source src="/add-refresh/1_Hero_LoopingVideo_bee.mp4" type="video/mp4" />
          </video>
        </div>

      </StickyHero>

      {/* ── MediaFrame ── */}
      <section style={{
        backgroundColor:    '#F5F0EC',
        backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        position:           'relative',
        zIndex:             2,
        borderRadius:       '24px 24px 0 0',
        boxShadow:          '0 -8px 40px rgba(0,0,0,0.10)',
        paddingBottom:      '80px',
      }}>
        <div style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
          <Reveal>
            <div
              style={{ position: 'relative', overflow: 'hidden', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)', transform: 'translateY(0px)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <video autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}>
                <source src="/add-refresh/2_StrategyCreative_LoopingVid.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>

        {/* Torn paper edge */}
        <svg
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}
        >
          <path d="M0,50 L0,30 L60,8 L120,40 L175,12 L230,42 L285,5 L340,35 L395,18 L450,44 L505,8 L560,36 L620,20 L680,45 L740,5 L800,32 L855,12 L910,42 L965,18 L1020,44 L1080,8 L1135,38 L1190,15 L1250,42 L1310,10 L1370,36 L1440,22 L1440,50 Z" fill="#FFFBF8" />
        </svg>
      </section>

      {/* ── Project Overview ── */}
      <CaseStudySection
        id="project-overview"
        sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
        style={{ paddingTop: '80px', paddingBottom: '0px' }}
      >
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

          <div style={{ flex: '0 0 66.66%', minWidth: 0 }}>
            <Reveal delay={0}>
              <h2 className="font-heading" style={{
                fontWeight: 700,
                fontSize:   '64px',
                lineHeight: 1.05,
                color:      '#101010',
                margin:     '0 0 28px',
              }}>The project</h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 300,
                fontSize:   '20px',
                lineHeight: 1.6,
                color:      '#404040',
                margin:     0,
              }}>
                The (add)ventures brand had history, recognition, and personality, but the system
                needed more range. What began as an illustration exploration became a broader
                refresh built from office artifacts, collage, typography, color, doodles, and strategy.
              </p>
            </Reveal>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/ELEMENTS/Sun@2x.png"
              alt=""
              style={{ width: '220px', display: 'block', animation: 'spin-planet 20s linear infinite' }}
            />
          </div>

        </div>
      </CaseStudySection>

      {/* ── What it became ── */}
      <CaseStudySection
        id="what-it-became"
        sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
        style={{ paddingTop: '50px', paddingBottom: '120px' }}
      >
        <Reveal>
          <h3 style={{
            fontFamily: 'Fira Mono, monospace',
            fontWeight: 400,
            fontSize:   '16px',
            lineHeight: 1.2,
            color:      '#101010',
            margin:     '0 0 20px',
          }}>What it became</h3>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            {
              num:   1,
              title: 'A more flexible visual language',
              body:  'A refreshed system that gave the agency more range without losing its existing personality.',
            },
            {
              num:   2,
              title: 'A brand system built to stretch',
              body:  'A direction that could flex across decks, social, swag, wayfinding, podcast graphics, internal initiatives, and web.',
            },
            {
              num:   3,
              title: 'A refresh from the inside out',
              body:  'A brand evolution built from agency culture, office artifacts, collage, type, color, and creative strategy.',
            },
          ].map(({ num, title, body }) => (
            <Reveal key={num} delay={(num - 1) * 120}>
              <div style={{
                backgroundColor: '#ffffff',
                border:          '1px solid #E8E0D8',
                borderRadius:    '16px',
                padding:         '28px',
                boxSizing:       'border-box',
                boxShadow:       '0px 4px 20px rgba(0,0,0,0.06)',
                height:          '100%',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    flexShrink:      0,
                    width:           '60px',
                    height:          '60px',
                    backgroundColor: '#FDB154',
                    borderRadius:    '10px',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                  }}>
                    <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '24px', color: '#101010', lineHeight: 1 }}>{num}</span>
                  </div>
                  <h4 style={{
                    fontFamily: 'Fraunces, serif',
                    fontWeight: 700,
                    fontSize:   '24px',
                    lineHeight: '24px',
                    color:      '#101010',
                    margin:     0,
                  }}>{title}</h4>
                </div>
                <p style={{
                  fontFamily: 'Fraunces, serif',
                  fontWeight: 300,
                  fontSize:   '16px',
                  lineHeight: '160%',
                  color:      '#404040',
                  margin:     0,
                }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </CaseStudySection>

      {/* ── How it started ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '80px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>

        {/* Top row: heading + body (8 cols) | pencil (4 cols) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '20px', alignItems: 'flex-start', marginBottom: '50px' }}>

          <div style={{ gridColumn: '1 / 9' }}>
            <Reveal>
              <h3 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                It started with a seemingly small ask
              </h3>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                The project began with a focused request: explore a new illustration style for the (add)ventures agency. But as we sketched and tested, we hit the same roadblocks as other parallel internal workstreams.
              </p>
            </Reveal>
          </div>

          <div style={{ gridColumn: '9 / 13', position: 'relative' }}>
            <div style={{ position: 'absolute', right: 0, top: 0 }}>
              <Reveal delay={200} style={{ width: 'auto' }}>
                <img
                  src="/ELEMENTS/Pencil@2x.png"
                  alt=""
                  className="animate-pencil-hover"
                  style={{ width: '60px' }}
                />
              </Reveal>
            </div>
          </div>

        </div>

        {/* Video card */}
        <Reveal>
          <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
            Initial Character Illustrations. Drawn on Procreate.
          </p>
          <div
            style={{ backgroundColor: '#ffffff', padding: '24px', boxShadow: '0px 4px 40px rgba(0,0,0,0.08)', transform: 'translateY(0px)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
          >
            <video autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}>
              <source src="/add-refresh/3_PortfolioIllu_Vid.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>

      </div>
      </section>

      {/* ── The natural next step for the brand ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '40px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '793px', margin: '0 auto' }}>
              <h3 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                The natural next step for the brand
              </h3>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
                The agency was evolving, and the brand needed room to evolve with it. What started as an illustration exploration quickly raised bigger questions about type, color, motion, tone, and how the system should behave across channels.
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                We were bringing that kind of strategic thinking to client work every day. This became a chance to bring it back to ourselves.
              </p>
            </div>
          </Reveal>

          <div style={{ marginTop: '60px' }}>
            <TickerStrip duration={40} items={[
              'Which font, when?', 'How much yellow?', 'How does it show up across channels?',
              'How does Brand Slam fit in?', 'How does DoorG fit in?', 'Where are we allowed to flex?',
              'Internal initiative?', 'When did we last update our templates?',
            ]} />
          </div>
        </div>
      </section>

      {/* ── The Concept Sprint: SmallBoxRow ── */}
      <section style={{
        backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        position:           'relative',
        zIndex:             2,
        paddingTop:         '80px',
        paddingBottom:      '120px',
      }}>

        {/* Top torn edge */}
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,0 L0,28 L48,6 L95,35 L148,8 L200,38 L260,4 L315,32 L370,15 L425,40 L480,10 L535,34 L595,18 L650,42 L710,6 L765,28 L820,10 L875,38 L930,14 L985,40 L1040,5 L1095,30 L1150,12 L1210,38 L1270,8 L1330,32 L1390,15 L1440,25 L1440,0 Z" fill="#FFFBF8" />
        </svg>

        {/* Centered heading + body */}
        <Reveal>
          <div style={{ maxWidth: '740px', margin: '0 auto', textAlign: 'center', marginBottom: '56px' }}>
            <h3 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
              Let the Concept Sprint Begin!
            </h3>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              In a fast-paced sprint, a small group of art directors developed independent visions for the brand&apos;s evolution.
            </p>
          </div>
        </Reveal>

        {/* 3-box image row */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {[
              { src: '/add-refresh/4_carousel_concepts/4_Concept1.jpg', label: 'Back to the Future' },
              { src: '/add-refresh/4_carousel_concepts/4_Concept2.png', label: 'Found in Translation' },
              { src: '/add-refresh/4_carousel_concepts/4_Concept3.jpg', label: 'Night at the Muse-eum' },
            ].map((item) => (
              <Reveal key={item.label}>
                <div
                  style={{ transform: 'translateY(0px)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
                >
                  <div style={{
                    width:           '283px',
                    height:          '305px',
                    backgroundColor: '#ffffff',
                    padding:         '20px',
                    boxSizing:       'border-box',
                    boxShadow:       '0px 4px 24px rgba(0,0,0,0.12)',
                  }}>
                    <img src={item.src} alt={item.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </div>
                  <p style={{
                    fontFamily: 'Fira Mono, monospace',
                    fontWeight: 400,
                    fontSize:   '16px',
                    lineHeight: 1.2,
                    color:      '#101010',
                    textAlign:  'center',
                    margin:     '12px 0 0',
                  }}>{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom torn edge */}
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,50 L0,22 L55,45 L110,18 L168,44 L225,10 L280,38 L335,20 L390,46 L445,12 L500,40 L558,8 L615,36 L675,22 L735,48 L792,10 L845,38 L900,18 L958,44 L1015,6 L1070,34 L1128,16 L1185,42 L1245,8 L1300,36 L1360,20 L1440,38 L1440,50 Z" fill="#FFFBF8" />
        </svg>

      </section>

      <ConceptSystem />

      {/* ── The answer was in the building ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px', alignItems: 'center' }}>

          {/* Left: image mosaic */}
          <div style={{ gridColumn: '1 / 8' }}>
            <Reveal>
              <div style={{ display: 'flex', gap: '8px', aspectRatio: '1 / 1' }}>
                {/* Left column: car + plane */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ flex: 3, overflow: 'hidden' }}>
                    <img src="/add-refresh/6_in-office/6_grid-car.jpg" alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </div>
                  <div style={{ flex: 2, overflow: 'hidden' }}>
                    <img src="/add-refresh/6_in-office/6_grid-plane.jpg" alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </div>
                </div>
                {/* Right column: railroad + art + typewriter */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ flex: 2, overflow: 'hidden' }}>
                    <img src="/add-refresh/6_in-office/6_grid-railcrossing.jpg" alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </div>
                  <div style={{ flex: 1.5, overflow: 'hidden' }}>
                    <img src="/add-refresh/6_in-office/6_grid-art-on-walls.jpg" alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </div>
                  <div style={{ flex: 1.5, overflow: 'hidden' }}>
                    <img src="/add-refresh/6_in-office/6_grid-typewriter.jpg" alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '12px 0 0' }}>
                Image in the Epic HQ
              </p>
            </Reveal>
          </div>

          {/* Right: heading + body */}
          <div style={{ gridColumn: '8 / 13' }}>
            <Reveal>
              <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                The answer was in the building
              </h2>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                We realized the most authentic way to refresh the brand was to build from the inside out. EPIC Headquarters wasn&apos;t just an office; it was a creative archive. By pulling inspiration directly from the space&apos;s layered history&mdash;vintage typewriters, airplane seats, and unexpected props&mdash;we let the physical culture dictate the new visual direction.
              </p>
            </Reveal>
          </div>

        </div>
      </div>
      </section>

      <CollageCarousel />

      {/* ── Turning a concept into a working system ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>

        {/* Dashed divider */}
        <svg width="100%" height="2" style={{ display: 'block', marginBottom: '60px' }} preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.20)" strokeWidth="2" strokeDasharray="4 6" />
        </svg>

        {/* Heading (left) + Credits (right) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '20px', alignItems: 'start', marginBottom: '60px' }}>

          <div style={{ gridColumn: '1 / 8' }}>
            <Reveal>
              <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.05, color: '#101010', margin: '0 0 20px' }}>
                Turning a concept into a working system
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                Members from the (add)ventures Creative Team and I tested the direction across various touchpoints: presentation decks, social media, logo expression, brand marks, shapes, gradients, text treatments, doodles, illustrations, swag, wayfinding, headlines, internal initiatives, podcast graphics, and the virtual production studio.
              </p>
            </Reveal>
          </div>

          <div style={{ gridColumn: '9 / 13', display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px' }}>
            {[
              { label: 'Creative Direction',        value: 'Meagan Driscoll' },
              { label: 'Art Direction + Design',    value: 'Natalie Nicholson' },
              { label: 'Additional Design Support', value: 'The (add)ventures Creative Team' },
            ].map(({ label, value }, i) => (
              <Reveal key={label} delay={150 + i * 80}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{
                    fontFamily:    'Fira Mono, monospace',
                    fontWeight:    400,
                    fontSize:      '16px',
                    letterSpacing: '0.08em',
                    lineHeight:    1.2,
                    color:         '#888888',
                  }}>{label}</span>
                  <span style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontSize:   '20px',
                    lineHeight: 1.4,
                    color:      '#101010',
                  }}>{value}</span>
                </div>
              </Reveal>
            ))}
          </div>

        </div>

        {/* Full-width dark image */}
        <Reveal>
          <img src="/add-refresh/8-working-sytem/8_ws-addclarity.jpg" alt=""
            style={{ width: '100%', display: 'block', marginBottom: '60px' }} />
        </Reveal>

        {/* Row 1: gradient rules (left) + color grid (right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start', marginBottom: '60px' }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                Creating rules around color and gradients
              </p>
              <img src="/add-refresh/8-working-sytem/8_ws-gradient-rules.png" alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          </Reveal>
          <Reveal>
            <img src="/add-refresh/8-working-sytem/8_ws-color.png" alt="" style={{ width: '100%', display: 'block' }} />
          </Reveal>
        </div>

        {/* Row 2: mark GIF (left) + mark cleanup caption + image (right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <Reveal>
            <img src="/add-refresh/8-working-sytem/MARK%20GIF.png" alt="" style={{ width: '100%', display: 'block' }} />
          </Reveal>
          <Reveal>
            <div>
              <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                Brand mark cleanup, parentheses behavior
              </p>
              <img src="/add-refresh/8-working-sytem/8_ws-addmark.png" alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          </Reveal>
        </div>

        {/* Row 3: parens banner (left, wider) + arrow square (right, smaller) */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '40px', alignItems: 'start', marginTop: '60px' }}>
          <Reveal>
            <img src="/add-refresh/8-working-sytem/8_ws-parens.jpg" alt="" style={{ width: '100%', display: 'block' }} />
          </Reveal>
          <Reveal>
            <img src="/add-refresh/8-working-sytem/8_ws-arrow.png" alt="" style={{ width: '100%', display: 'block' }} />
          </Reveal>
        </div>

        {/* Row 4: caption + type specimen (left, narrower) | GIF texture + decks stacked (right, wider) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '40px', alignItems: 'start', marginTop: '60px' }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                Defining roles for headlines, wayfinding, and expressive type
              </p>
              <img src="/add-refresh/8-working-sytem/8_ws-typography.png" alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <img src="/add-refresh/8-working-sytem/8_texture-MarkGIF.png" alt="" style={{ width: '100%', display: 'block' }} />
              <img src="/add-refresh/8-working-sytem/8_ws-decks.png" alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          </Reveal>
        </div>

      </div>
      </section>

      {/* ── Integrating collage, shape language, doodles, and patterns ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '80px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>

        <Reveal>
          <p style={{ textAlign: 'center', fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '0 0 28px' }}>
            Integrating collage, shape language, doodles, and patterns
          </p>
        </Reveal>

        <Reveal>
          <div style={{ display: 'flex', gap: '16px', height: '620px' }}>
            {/* Left: tall collage 787px */}
            <div style={{ flex: '0 0 787px', overflow: 'hidden' }}>
              <img src="/add-refresh/8-working-sytem/8_ws-grid-collage1.jpg" alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {/* Right: two stacked images 384px */}
            <div style={{ flex: '0 0 384px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <img src="/add-refresh/8-working-sytem/8_ws-grid-collage2-steve.png" alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <img src="/add-refresh/8-working-sytem/8_ws-grid-shapes.png" alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
        </Reveal>

      </div>
      </section>

      {/* ── Deck fan ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '80px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Reveal style={{ width: 'auto' }}>
            <div style={{ position: 'relative', width: '800px', height: '450px' }}>
              {[
                { src: '/add-refresh/8-working-sytem/8_ws-deck-b.jpg', rot: -8, z: 1 },
                { src: '/add-refresh/8-working-sytem/8_ws-deck-c.png', rot:  0, z: 2 },
                { src: '/add-refresh/8-working-sytem/8_ws-deck-d.jpg', rot:  8, z: 3 },
              ].map(({ src, rot, z }) => (
                <div key={src} style={{
                  position: 'absolute', inset: 0,
                  transformOrigin: 'bottom center',
                  transform: `rotate(${rot}deg)`,
                  boxShadow: '0 20px 56px rgba(0,0,0,0.18)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  zIndex: z,
                }}>
                  <img src={src} alt="" style={{ width: '100%', display: 'block' }} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      </section>

      {/* ── Two posters, centered ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '80px', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
        <Reveal style={{ width: 'auto' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <img src="/add-refresh/8-working-sytem/8_ws-poster1.jpg" alt=""
              style={{ width: '290px', display: 'block', borderRadius: '8px' }} />
            <img src="/add-refresh/8-working-sytem/8_ws-poster2.jpg" alt=""
              style={{ width: '290px', display: 'block', borderRadius: '8px' }} />
          </div>
        </Reveal>
      </div>
      </section>

      {/* ── Totes, apparel, and swag ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '80px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>
        <Reveal>
          <p style={{ textAlign: 'center', fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '0 0 24px' }}>
            Totes, apparel, and swag
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img src="/add-refresh/8-working-sytem/8_ws-totes.jpg" alt=""
              style={{ width: '100%', display: 'block' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <img src="/add-refresh/8-working-sytem/8_ws-waterbottle.png" alt=""
                style={{ width: '386px', display: 'block' }} />
              <img src="/add-refresh/8-working-sytem/8_ws-sweatshirt.jpg" alt=""
                style={{ width: '453px', display: 'block' }} />
              <img src="/add-refresh/8-working-sytem/8_ws-bs-mug.png" alt=""
                style={{ width: '283px', display: 'block' }} />
            </div>
          </div>
        </Reveal>
      </div>
      </section>

      {/* ── Social media and podcast graphics ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '80px', paddingBottom: '120px', boxSizing: 'border-box', width: '100%' }}>
        <Reveal>
          <p style={{ textAlign: 'center', fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '0 0 48px' }}>
            Social media and podcast graphics
          </p>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '24px', width: '100%' }}>
          <Reveal delay={0} style={{ width: '300px', flexShrink: 0 }}>
            <PhoneCard src="/add-refresh/8-working-sytem/8_ws-phonemockup1.png" width="300px" />
          </Reveal>
          <Reveal delay={80} style={{ width: '340px', flexShrink: 0, marginBottom: '-40px' }}>
            <PhoneCard src="/add-refresh/8-working-sytem/8_ws-phonemockup2.png" width="340px" />
          </Reveal>
          <Reveal delay={160} style={{ width: '300px', flexShrink: 0 }}>
            <PhoneCard src="/add-refresh/8-working-sytem/8_ws-phonemockup3.png" width="300px" />
          </Reveal>
        </div>
      </section>

      {/* ── Carrying the system to a brand new website ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '80px', paddingBottom: '120px', boxSizing: 'border-box' }}>

        {/* Dotted divider */}
        <svg width="100%" height="2" style={{ display: 'block', marginBottom: '64px' }} preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.20)" strokeWidth="2" strokeDasharray="4 6" />
        </svg>

        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '842px', margin: '0 auto' }}>
            <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.05, color: '#101010', margin: '0 0 24px' }}>
              Carrying the system to create a brand new website
            </h2>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              As the refresh gained momentum, the system moved directly into a website sprint. In a short timeline, the team began translating the new direction into digital structure, page design, content hierarchy, and interactive brand moments.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ maxWidth: '1440px', margin: '60px auto 0', padding: '0 120px', boxSizing: 'border-box' }}>
            <video
              autoPlay muted loop playsInline
              style={{ width: '100%', display: 'block' }}
            >
              <source src="/add-refresh/9_new-website/add website-1.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>

      </section>

      <Footer />
    </main>
  );
}
