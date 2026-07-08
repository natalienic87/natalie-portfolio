import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import CaseStudyNav from '../components/CaseStudyNav';
import Footer from '../components/Footer';
import StickyHero from '../components/StickyHero';
import PhoneCarousel from '../components/PhoneCarousel';
import FourBy from '../components/FourBy';
import CaseStudyFullBleed from '../components/CaseStudyFullBleed';
import CaseStudySection from '../components/CaseStudySection';
import TickerStrip from '../components/TickerStrip';


// ── Metadata label/value pair ─────────────────────────────────────────────────
function MetaItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '24px' }}>
      <span className="hero-meta-label" style={{
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
      <span className="hero-meta-value" style={{
        fontFamily: 'Fira Mono, monospace',
        fontWeight: 400,
        fontSize:   '14px',
        lineHeight: 1.5,
        color:      '#101010',
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

// ── Hero cycling images ───────────────────────────────────────────────────────
const heroImages = [
  '/cvs-agency-work/1-heart-art-hero/1_outline.jpg',
  '/cvs-agency-work/1-heart-art-hero/2_Graphic-heart.jpg',
  '/cvs-agency-work/1-heart-art-hero/3_breakout-transparency.jpg',
  '/cvs-agency-work/1-heart-art-hero/4_Window-heart.jpg',
  '/cvs-agency-work/1-heart-art-hero/5_Outline-pool.jpg',
  '/cvs-agency-work/1-heart-art-hero/6_Breakout-no-transparency.jpg',
];

// ── Beyond DotCom carousel ───────────────────────────────────────────────────
const beyondSlides = [
  {
    type:  'video',
    src:   '/cvs-agency-work/9-beyond-dot-com/beyond-phone-brands-vid.mp4',
    title: 'Store Brands Banner Refresh',
    body:  'CVS had an owned-brand ecosystem with no consistent presence on the site. We designed and templated a modular banner system that gave each brand its own visual distinction while making CVS ownership hard to miss.',
  },
  {
    type:  'video',
    src:   '/cvs-agency-work/9-beyond-dot-com/beyond-hearthaus-vid.mp4',
    title: 'Heart Haus Case Study',
    body:  'Heart Haus — CVS Health’s in-house creative agency — needed a website worthy of the work behind it. I designed the full site, organizing their campaigns, visuals, and strategic impact into one cohesive story.',
  },
  {
    type:  'image',
    src:   '/cvs-agency-work/9-beyond-dot-com/beyond-our-brands.jpg',
    title: 'Store Brands Identity Refresh',
    body:  'When CVS decided to formally unify its entire owned-brand portfolio under one visual system, I helped unify CVS owned brands into a flexible visual system spanning color, a “bootstrap” grid, and photography over physical and digital environments.',
  },
  {
    type:  'image',
    src:   '/cvs-agency-work/9-beyond-dot-com/beyond-holiday-heart.jpg',
    title: 'Holiday with Heart, 2023',
    body:  'Holiday with Heart was designed as an antidote to holiday chaos. I created a direction using inclusive color, giftwrap textures, sentimental photography and festive product details. Our Holiday 2023 work awarded us omni-channel seasonal projects in 2024 and beyond, like Valentine’s Day, Easter, and Halloween.',
  },
  {
    type:  'image',
    src:   '/cvs-agency-work/9-beyond-dot-com/beyond-optical.jpg',
    title: 'CVS Optical Experience Refresh',
    body:  'CVS Optical had to sell contacts, explain insurance, support prescription renewal and simplify reordering and filtering. I art directed and designed three concept directions that turned a complex shopping journey into a clearer customer experience.',
  },
];

function BeyondCarousel({ slides }) {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];
  return (
    <div>
      {/* Prev / Slide / Next row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>

        {/* Prev */}
        <button onClick={() => setIdx(i => (i - 1 + slides.length) % slides.length)}
          style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid #101010', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Slide */}
        <div style={{ position: 'relative', flex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 5px 48px rgba(0,0,0,0.15)' }}>
          {slides.map((s, i) => (
            <div key={i} style={{
              position:      i === 0 ? 'relative' : 'absolute',
              top:           i === 0 ? 'auto' : 0,
              left:          i === 0 ? 'auto' : 0,
              width:         '100%',
              opacity:       i === idx ? 1 : 0,
              transition:    'opacity 0.45s ease',
              pointerEvents: i === idx ? 'auto' : 'none',
            }}>
              {s.type === 'video' ? (
                <video autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}>
                  <source src={s.src} type="video/mp4" />
                </video>
              ) : (
                <img src={s.src} alt="" style={{ width: '100%', display: 'block' }} />
              )}
            </div>
          ))}
        </div>

        {/* Next */}
        <button onClick={() => setIdx(i => (i + 1) % slides.length)}
          style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid #101010', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      {/* Dot navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            style={{
              width:           i === idx ? '24px' : '10px',
              height:          '10px',
              borderRadius:    '5px',
              backgroundColor: i === idx ? '#CC0000' : 'rgba(16,16,16,0.25)',
              border:          'none',
              cursor:          'pointer',
              padding:         0,
              transition:      'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Slide caption */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
        <p className="font-body cs-h2" style={{ fontWeight: 700, fontSize: '33px', color: '#101010', margin: '0 0 16px' }}>
          {slide.title}
        </p>
        <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
          {slide.body}
        </p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
function RequestAccessWall() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div style={{
      position:        'fixed',
      inset:           0,
      zIndex:          9999,
      backgroundColor: 'rgba(16,16,16,0.72)',
      backdropFilter:  'blur(4px)',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      padding:         '20px',
    }}>
      <div style={{
        backgroundColor: '#FFFBF8',
        borderRadius:    '20px',
        padding:         '56px 48px',
        maxWidth:        '480px',
        width:           '100%',
        textAlign:       'center',
        boxShadow:       '0 32px 80px rgba(0,0,0,0.35)',
      }}>
        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontWeight: 700,
          fontSize:   '33px',
          lineHeight: 1.2,
          color:      '#101010',
          margin:     '0 0 20px',
        }}>
          This work is protected per agency policy.
        </h2>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize:   '16px',
          lineHeight: 1.7,
          color:      '#404040',
          margin:     '0 0 36px',
        }}>
          Five years of omnichannel campaigns, brand systems, and platform work I&apos;m happy to walk you through directly.
        </p>
        <a
          href="mailto:natalienic87@gmail.com"
          style={{
            display:         'inline-block',
            backgroundColor: '#E35038',
            color:           '#ffffff',
            fontFamily:      'Poppins, sans-serif',
            fontWeight:      600,
            fontSize:        '15px',
            letterSpacing:   '0.03em',
            padding:         '14px 32px',
            borderRadius:    '8px',
            textDecoration:  'none',
            marginBottom:    '20px',
          }}
        >
          Request Access →
        </a>
        <p style={{
          fontFamily: 'Fira Mono, monospace',
          fontWeight: 400,
          fontSize:   '13px',
          lineHeight: 1.5,
          color:      '#888888',
          margin:     '0 0 28px',
          userSelect: 'all',
        }}>
          natalienic87@gmail.com
        </p>
        <Link href="/" style={{
          fontFamily:     'Fira Mono, monospace',
          fontWeight:     400,
          fontSize:       '13px',
          color:          '#101010',
          textDecoration: 'none',
          opacity:        0.5,
          display:        'inline-block',
        }}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

export default function CvsAetna() {
  return (
    <>
      <RequestAccessWall />
      {/* Page content — blurred and non-interactive behind the wall */}
      <div style={{ filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' }}>
      <main className="main-clip-mobile" style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFBF8', color: '#101010' }}>
      <Cursor />
      <CaseStudyNav />

      {/* ── Hero ── */}
      <StickyHero backgroundColor="#FFFBF8">

        {/* Left — 50%, stacked content */}
        <div className="hero-panel-left" style={{
          flex:            '0 0 50%',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'center',
          paddingLeft:     '120px',
          paddingRight:    '120px',
          paddingTop:      '160px',
          paddingBottom:   '80px',
          boxSizing:       'border-box',
          backgroundColor: '#FFFBF8',
          position:        'relative',
          zIndex:          1,
        }}>

          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '500px', marginBottom: '50px' }}>
            <style>{`@keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="#101010" style={{ flexShrink: 0, animation: 'slow-spin 12s linear infinite', transformOrigin: 'center' }}>
              <path d="M8,1 L9.2,5.3 L13.5,3.7 L10.9,7.3 L14.8,9.6 L10.4,9.9 L10.9,14.4 L8,11 L5.1,14.4 L5.6,9.9 L1.2,9.6 L5.1,7.3 L2.5,3.7 L6.8,5.3 Z"/>
            </svg>
            <span className="hero-eyebrow-text" style={{
              fontFamily:    'Fira Mono, monospace',
              fontWeight:    400,
              fontSize:      '18px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         '#101010',
            }}>Case Study</span>
          </div>

          <h1 className="font-heading hero-title" data-dev-text="hero-title" style={{
            fontWeight: 700,
            fontSize:   '90px',
            lineHeight: '80px',
            color:      '#101010',
            margin:     '0 0 28px',
          }}>
            CVS Health: Designing for Retail Scale
          </h1>

          {/* Dashed divider */}
          <svg className="hero-divider" width="500" height="2" style={{ display: 'block', margin: '32px 0' }} preserveAspectRatio="none">
            <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.25)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Meta */}
          <div className="hero-meta-container" style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <MetaItem label="Year"  value="2020 – 2024" />
            <MetaItem label="Role"  value="Senior Designer & Art Director" />
            <MetaItem label="Scope" value="CVS.com systems, ecommerce, campaign design, platform playbooks" />
          </div>
        </div>

        {/* Right — CVS red with cycling heart-art images */}
        <div className="hero-panel-right" style={{
          flex:            '0 0 50%',
          position:        'relative',
          overflow:        'hidden',
          backgroundColor: '#CC0000',
          zIndex:          1,
          minHeight:       'max(700px, 75vh)',
          maxHeight:       'max(700px, 75vh)',
        }}>
          {heroImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                position:       'absolute',
                top:            0,
                left:           0,
                width:          '100%',
                height:         '100%',
                objectFit:      'cover',
                objectPosition: 'center',
                opacity:        0,
                animation:      'cvs-cycle 9s step-end infinite',
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>

      </StickyHero>

      {/* ── MediaFrame ── */}
      <section className="video-intro-section" style={{
        backgroundColor:    '#F5F0EC',
        backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        position:           'relative',
        zIndex:             2,
        borderRadius:       '24px 24px 0 0',
        boxShadow:          '0 -8px 40px rgba(0,0,0,0.10)',
        paddingBottom:      '140px',
      }}>
        <div className="video-intro-inner" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
          <Reveal>
            <div
              className="video-intro-frame"
              style={{ position: 'relative', overflow: 'hidden', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)', transform: 'translateY(0px)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <video autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}>
                <source src="/cvs-agency-work/2-digital-experience.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>

        {/* Torn paper edge — desktop (full drama) */}
        <svg
          className="torn-edge-desktop"
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}
        >
          <path d="M0,25 C60,8 120,8 180,25 C240,42 300,42 360,25 C420,8 480,8 540,25 C600,42 660,42 720,25 C780,8 840,8 900,25 C960,42 1020,42 1080,25 C1140,8 1200,8 1260,25 C1320,42 1380,42 1440,25 L1440,50 L0,50 Z" fill="#FFFBF8" />
        </svg>

        {/* Torn paper edge — mobile (subtle, shallow peaks) */}
        <svg
          className="torn-edge-mobile"
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'none', zIndex: 3, pointerEvents: 'none' }}
        >
          <path d="M0,43 C60,38 120,38 180,43 C240,48 300,48 360,43 C420,38 480,38 540,43 C600,48 660,48 720,43 C780,38 840,38 900,43 C960,48 1020,48 1080,43 C1140,38 1200,38 1260,43 C1320,48 1380,48 1440,43 L1440,50 L0,50 Z" fill="#FFFBF8" />
        </svg>
      </section>

      {/* ── The Work Overview ── */}
      <CaseStudySection
        id="project-overview"
        sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
        style={{ paddingTop: '80px', paddingBottom: '0px' }}
      >
        <div className="project-overview-row" style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

          <div style={{ flex: '0 0 66.66%', minWidth: 0 }}>
            <Reveal delay={0}>
              <h2 className="font-heading cs-h2" data-dev-text="work-h2" style={{
                fontWeight: 700,
                fontSize:   '64px',
                lineHeight: 1.05,
                color:      '#101010',
                margin:     '0 0 28px',
              }}>The work</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body" data-dev-text="work-body-1" style={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 300,
                fontSize:   '20px',
                lineHeight: 1.6,
                color:      '#404040',
                margin:     0,
              }}>
                Over several years with CVS Health, my agency work grew from fast-moving CVS.com production into larger systems for e-commerce, campaigns, store brands, and platform guidelines. The through line was scale: making work that could move quickly, stay on brand, survive real production constraints, and become widely used and understood across client and teams.
              </p>
            </Reveal>
          </div>

          <div className="project-headphones-doodle" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/ELEMENTS/Red Planet.png"
              alt=""
              style={{ width: '220px', display: 'block', animation: 'float-strong 4s ease-in-out infinite' }}
            />
          </div>

        </div>
      </CaseStudySection>

      {/* ── The Through Line ── */}
      <CaseStudySection
        id="the-through-line"
        sectionStyle={{ zIndex: 3, backgroundColor: '#FFFBF8' }}
        style={{ paddingTop: '50px', paddingBottom: '20px' }}
      >
        <Reveal>
          <h3 className="cs-mono" data-dev-text="through-line-label" style={{
            fontFamily: 'Fira Mono, monospace',
            fontWeight: 400,
            fontSize:   '16px',
            lineHeight: 1.2,
            color:      '#101010',
            margin:     '0 0 20px',
          }}>My role included:</h3>
        </Reveal>

        <div className="what-it-became-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            {
              num:   1,
              title: 'Digital systems',
              body:  'Reusable templates, components, navigation patterns, and production rules for CVS.com.',
            },
            {
              num:   2,
              title: 'Retail campaigns',
              body:  'High-volume creative across weekly cycles, seasonal moments, owned brands, and national campaigns.',
            },
            {
              num:   3,
              title: 'Brand at scale',
              body:  'Playbooks and systems that helped agency partners and internal teams apply the brand consistently.',
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
                  <div className="wib-badge" style={{
                    flexShrink:      0,
                    width:           '60px',
                    height:          '60px',
                    backgroundColor: '#E35038',
                    borderRadius:    '10px',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                  }}>
                    <span className="wib-badge-num" style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '24px', color: '#ffffff', lineHeight: 1 }}>{num}</span>
                  </div>
                  <h4 className="wib-title" data-dev-text={`through-line-title-${num}`} style={{
                    fontFamily: 'Fraunces, serif',
                    fontWeight: 700,
                    fontSize:   '24px',
                    lineHeight: '24px',
                    color:      '#101010',
                    margin:     0,
                  }}>{title}</h4>
                </div>
                <p className="wib-body" data-dev-text={`through-line-body-${num}`} style={{
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
      <CaseStudySection style={{ paddingTop: '0', paddingBottom: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 588px', alignItems: 'center', gap: '0' }}>

          {/* Left: mascara image */}
          <Reveal style={{ overflow: 'visible' }}>
            <img src="/cvs-agency-work/3-lipstick-smear.png" alt=""
              style={{ width: '100%', display: 'block', transform: 'scale(1.2) translateY(42px)', transformOrigin: 'center bottom' }} />
          </Reveal>

          {/* Right: heading + body */}
          <Reveal>
            <div>
              <h3 className="font-body cs-h2" data-dev-text="dotcom-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 28px' }}>
                Four years at a glance
              </h3>
              <div data-dev-text="dotcom-body-1">
                {[
                  { year: '2020',      title: 'Started on DotCom', body: 'Production and craft: learning the weekly Shop system, then designing inside it — color theory, seasonal ideation, campaign creative.' },
                  { year: '2021–2022', title: 'Built the system',   body: "Systems ownership: component library, governance rules, PSD templates, and the handoff workflow that let CVS's teams run it independently." },
                  { year: '2023',      title: 'The CMS broke',      body: 'Crisis leadership: diagnosed the failure and presented the fix directly to CVS leadership — the moment the relationship shifted from vendor to trusted partner.' },
                  { year: '2024',      title: 'Ran it sitewide',    body: 'Team management: led the design and production team behind the 700-navigation VizNav rollout.' },
                ].map((entry, i, arr) => (
                  <div key={entry.year} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '16px', paddingBottom: '20px', marginBottom: '20px', borderBottom: i < arr.length - 1 ? '1px solid rgba(16,16,16,0.1)' : 'none' }}>
                    <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888888', margin: '4px 0 0', lineHeight: 1.4 }}>{entry.year}</p>
                    <div>
                      <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '18px', lineHeight: 1.3, color: '#101010', margin: '0 0 6px' }}>{entry.title}</p>
                      <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.5, color: '#404040', margin: 0 }}>{entry.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </CaseStudySection>

      {/* ── Proposed User Journey + Reimagining CVS Shop ── */}
      <CaseStudySection style={{ paddingTop: '120px', paddingBottom: '120px' }}>

        {/* Full-bleed journey phones image */}
        <Reveal>
          <div style={{ marginLeft: '-120px', marginRight: '-120px' }}>
            <img src="/cvs-agency-work/4-north-star-journey-phones.jpg" alt=""
              style={{ width: '100%', display: 'block' }} />
          </div>
        </Reveal>

        {/* 80px gap */}
        <div style={{ height: '80px' }} />

        {/* Two-column: text + cards left / phone carousel right */}
        <div style={{ display: 'grid', gridTemplateColumns: '585px 488px', justifyContent: 'space-between', alignItems: 'start' }}>

          {/* Left: heading + body + label + 2×2 cards */}
          <div>
            <Reveal>
              <h3 className="font-body cs-h2" data-dev-text="reimagine-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 24px' }}>
                Reimagining CVS Shop
              </h3>
              <p className="cs-body" data-dev-text="reimagine-body-1" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 16px' }}>
                Then came the &ldquo;blue-sky&rdquo; sprint. The brief was to reimagine the CVS.com shopping experience and build a full pitch deck for senior executives to present with. The timeline was under two weeks.
              </p>
              <p className="cs-body" data-dev-text="reimagine-body-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                We had creative freedom, but this was still CVS at national retail scale. &ldquo;The sky is the limit&rdquo; had to survive thousands of SKUs, weekly merchandising needs, accessibility requirements and real production constraints. Basically, the system had to flex without falling apart.
              </p>
            </Reveal>

            <Reveal>
              <p className="cs-mono" data-dev-text="reimagine-mono" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888888', margin: '40px 0 20px' }}>
                We built a modular shopping experience around a few core pillars.
              </p>
            </Reveal>

            <Reveal>
              <FourBy columns={2} accentColor="#CC0000" items={[
                { title: 'Strategic Badging',      body: 'Tags that actually communicate value – clean ingredients, dermatologist-tested, FSA eligible and more.' },
                { title: 'Guided Shopping',         body: 'Skincare quizzes for personalized regimens and mid-browse MinuteClinic consultations.' },
                { title: 'Social Commerce',         body: 'Share-worthy reviews, influencer integration, and UGC frameworks CVS didn\'t even have yet.' },
                { title: 'Ingredient Transparency', body: 'Clear scannable ingredient stories and iconography with clinical backstops so customers can shop with trust.' },
              ]} />
            </Reveal>
          </div>

          {/* Right: phone carousel — 488px wide */}
          <Reveal>
            <PhoneCarousel width="488px" slides={[
              '/cvs-agency-work/5-northstar-phones/4-skincare-a.png',
              '/cvs-agency-work/5-northstar-phones/4-skincare-b.png',
              '/cvs-agency-work/5-northstar-phones/4-skincare-c.png',
              '/cvs-agency-work/5-northstar-phones/4-skincare-d.png',
              '/cvs-agency-work/5-northstar-phones/4-skincare-e.png',
              '/cvs-agency-work/5-northstar-phones/4-skincare-f.png',
            ]} />
          </Reveal>

        </div>

      </CaseStudySection>


      {/* ── Department Pages ── */}
      {/* ── Scaling the department pages — textured header ── */}
      <section style={{
        backgroundColor:    '#F5F0EC',
        backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        position:           'relative',
        zIndex:             2,
        paddingBottom:      '80px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 120px 0', boxSizing: 'border-box' }}>

          {/* Zone 1: Centered header */}
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 className="font-heading cs-h2" data-dev-text="dept-h2" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.05, color: '#101010', margin: '0 0 24px' }}>
                Scaling the department pages
              </h2>
              <p className="cs-body" data-dev-text="dept-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', maxWidth: '680px', margin: '0 auto' }}>
                Shortly after the sprint, I was assigned to another major CVS.com project: rebuilding the department pages. At the time, there was no consistent content or commerce layer for these pages. We created a system that balanced commerce, content and category personality, then scaled it across twelve department pages.
              </p>
            </div>
          </Reveal>

          {/* Full-bleed cycling department page images */}
          <Reveal>
            <div style={{ marginLeft: '-120px', marginRight: '-120px', position: 'relative', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.18)' }}>
              {[
                '/cvs-agency-work/6-dept-pgs/3-dp-personalcare.jpg',
                '/cvs-agency-work/6-dept-pgs/2-dp-household.jpg',
                '/cvs-agency-work/6-dept-pgs/3-dp-healthmed.jpg',
                '/cvs-agency-work/6-dept-pgs/1-dp-beauty.jpg',
              ].map((src, i) => (
                <img key={src} src={src} alt=""
                  style={{
                    position:       i === 0 ? 'relative' : 'absolute',
                    top:            i === 0 ? 'auto' : 0,
                    left:           i === 0 ? 'auto' : 0,
                    width:          '100%',
                    display:        'block',
                    opacity:        0,
                    animation:      'dept-cycle 12s step-end infinite',
                    animationDelay: `${i * 3}s`,
                  }}
                />
              ))}
            </div>
          </Reveal>

        </div>

        {/* Torn bottom edge — fill = next section background (#FFFBF8) */}
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,25 C60,8 120,8 180,25 C240,42 300,42 360,25 C420,8 480,8 540,25 C600,42 660,42 720,25 C780,8 840,8 900,25 C960,42 1020,42 1080,25 C1140,8 1200,8 1260,25 C1320,42 1380,42 1440,25 L1440,50 L0,50 Z" fill="#FFFBF8" />
        </svg>
      </section>

      {/* ── Scaling: Zone 2 + Zone 3 ── */}
      <CaseStudySection style={{ paddingTop: '120px', paddingBottom: '120px' }}>

        {/* Zone 2: Creating a flexible, repeatable system */}
        <Reveal>
          <h3 className="font-body cs-h2" data-dev-text="system-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 24px' }}>
            Creating a flexible, repeatable system
          </h3>
          <div data-dev-text="system-body" style={{ maxWidth: '720px', margin: '0 0 56px' }}>
            <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
              Once the visual direction was approved, I helped turn it into a working system.
            </p>
            <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              I built and maintained the component library, wrote rules for how components could and could not be used, created PSD templates, and documented the handoff workflow so all teams could build from the same logic. The system covered brand alignment, visual consistency, governance, documentation, handoff, training, workflow architecture, navigation components, type hierarchy, spacing rules, responsive design, wireframes, and reusable story blocks.
            </p>
          </div>
        </Reveal>

        {/* Ticker tape */}
        <div style={{ margin: '0 0 56px' }}>
          <TickerStrip
            items={['GOVERNANCE', 'DOCUMENTATION AND HANDOFF', 'TRAINING AND ROLLOUT', 'WORKFLOW ARCHITECTURE', 'BRAND ALIGNMENT', 'VISUAL CONSISTENCY']}
            duration={30}
          />
        </div>

        {/* 4 artifact images */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { src: '/cvs-agency-work/7-sys-artifacts/7-sys-artifact-UI.png',        caption: 'Navigational Components' },
              { src: '/cvs-agency-work/7-sys-artifacts/7-sys-artifact-grids.png',      caption: 'Type hierarchy and bento box grids' },
              { src: '/cvs-agency-work/7-sys-artifacts/7-sys-artifact-PSD-layers.png', caption: 'PSD templates' },
              { src: '/cvs-agency-work/7-sys-artifacts/7-sys-artifact-component.png',  caption: 'All atoms, molecules and components' },
            ].map((img, i) => (
              <div key={i}>
                <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                  <img src={img.src} alt="" style={{ width: '100%', display: 'block' }} />
                </div>
                <p className="cs-mono" data-dev-text={`artifact-caption-${i + 1}`} style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: 0, lineHeight: 1.5 }}>
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Zone 3: Spacing rules + wireframe split */}
        <div style={{ borderTop: '1px dashed #C4B8A8', margin: '80px 0 56px' }} />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '20px' }}>
            <div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                <img src="/cvs-agency-work/7-sys-artifacts/7-sys-artifact-Dsktp.png" alt="" style={{ width: '100%', display: 'block' }} />
              </div>
              <p className="cs-mono" data-dev-text="spacing-caption" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: 0, lineHeight: 1.5 }}>
                Spacing rules and responsive design
              </p>
            </div>
            <div>
              <div style={{ border: '1px solid #101010', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', position: 'relative' }}>
                {[
                  '/cvs-agency-work/7-sys-artifacts/Liftshift-1.png',
                  '/cvs-agency-work/7-sys-artifacts/Liftshift-2.png',
                  '/cvs-agency-work/7-sys-artifacts/Liftshift-3.png',
                  '/cvs-agency-work/7-sys-artifacts/Liftshift-4.png',
                ].map((src, i) => (
                  <img key={src} src={src} alt=""
                    style={{
                      position:       i === 0 ? 'relative' : 'absolute',
                      top:            i === 0 ? 'auto' : 0,
                      left:           i === 0 ? 'auto' : 0,
                      width:          '100%',
                      display:        'block',
                      opacity:        0,
                      animation:      'dept-cycle 16s step-end infinite',
                      animationDelay: `${i * 4}s`,
                    }}
                  />
                ))}
              </div>
              <p className="cs-mono" data-dev-text="wireframes-caption" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: 0, lineHeight: 1.5 }}>
                Wireframes and &ldquo;story&rdquo; blocks
              </p>
            </div>
          </div>
        </Reveal>

      </CaseStudySection>

      {/* ── Beyond DotCom ── */}
      <CaseStudyFullBleed
        background="#F5F0EC"
        sectionStyle={{
          backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
        }}
        doodle={
          <>
            <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
              <path d="M0,0 L1440,0 L1440,25 C1380,42 1320,42 1260,25 C1200,8 1140,8 1080,25 C1020,42 960,42 900,25 C840,8 780,8 720,25 C660,42 600,42 540,25 C480,8 420,8 360,25 C300,42 240,42 180,25 C120,8 60,8 0,25 Z" fill="#FFFBF8" />
            </svg>
            <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
              style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
              <path d="M0,25 C60,8 120,8 180,25 C240,42 300,42 360,25 C420,8 480,8 540,25 C600,42 660,42 720,25 C780,8 840,8 900,25 C960,42 1020,42 1080,25 C1140,8 1200,8 1260,25 C1320,42 1380,42 1440,25 L1440,50 L0,50 Z" fill="#FFFBF8" />
            </svg>
          </>
        }
      >
        {/* Centered heading + intro */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="font-heading cs-h2" data-dev-text="beyond-h2" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.1, color: '#101010', margin: '0 0 24px' }}>
              Beyond DotCom
            </h2>
            <p className="cs-body" data-dev-text="beyond-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', maxWidth: '680px', margin: '0 auto' }}>
              We had proven we could do more than execute inside the system, the scope widened. Here are a few campaigns and brand workstreams where I had a bigger hand, both on and off CVS.com.
            </p>
          </div>
        </Reveal>

        {/* Carousel */}
        <BeyondCarousel slides={beyondSlides} />

      </CaseStudyFullBleed>

      {/* ── Platform Playbook intro ── */}
      <CaseStudySection style={{ paddingTop: '80px', paddingBottom: '80px' }}>

        {/* Dotted top divider */}
        <svg width="100%" height="2" style={{ display: 'block', marginBottom: '64px' }} preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.20)" strokeWidth="1.5" strokeDasharray="3 6" />
        </svg>

        {/* Centered heading + intro */}
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
            <h2 className="font-heading cs-h2" data-dev-text="playbook-h2" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.1, color: '#101010', margin: '0 0 24px' }}>
              Platform Playbook
            </h2>
            <p className="cs-body" data-dev-text="playbook-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              The ask was no longer just to design another page, asset or seasonal system. It was to help turn a national brand platform into a playbook every agency partner and internal team could use.
            </p>
          </div>
        </Reveal>

        {/* Full-width hero image */}
        <Reveal>
          <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-hero.jpg" alt=""
            style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
        </Reveal>

      </CaseStudySection>

      {/* ── 01 The Shift ── */}
      <CaseStudySection style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            <Reveal>
              <p data-dev-text="shift-mono" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: '0 0 12px' }}>
                01 The Shift
              </p>
              <h2 className="font-body cs-h3" data-dev-text="shift-pullquote" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                The enterprise needed to signal its shift from individual businesses to an integrated health solutions company
              </h2>
              <p className="cs-body" data-dev-text="shift-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 40px' }}>
                At a time when health care felt expensive, fragmented and hard to navigate, the brand needed a clearer, more human platform.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ backgroundColor: '#6B4C9A', borderRadius: '14px', padding: '36px 32px' }}>
                <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-31M.gif" alt="31M"
                  style={{ width: '160px', display: 'block', marginBottom: '12px' }} />
                <p className="cs-body" data-dev-text="shift-stat" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.5, color: '#ffffff', margin: 0 }}>
                  people under the age of 65 are uninsured.
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div>
            <Reveal>
              <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-lifestyle-family.jpg" alt=""
                style={{ width: '100%', display: 'block', borderRadius: '8px', marginBottom: '24px' }} />
            </Reveal>
            <Reveal delay={60}>
              <div style={{ border: '1.5px dashed #C4B8A8', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                <p data-dev-text="hht-quote" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '24px', lineHeight: 1.55, color: '#404040', margin: 0 }}>
                  Healthier Happens Together&trade; became the playbook for how that unified company should express itself across the CVS Health ecosystem.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </CaseStudySection>

      {/* ── 02 The Playbook ── */}
      <CaseStudySection style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            <Reveal>
              <p data-dev-text="playbook-mono" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E35038', margin: '0 0 12px' }}>
                02 The Playbook
              </p>
              <h2 className="font-body cs-h3" data-dev-text="playbook-pullquote" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                I helped translate Healthier Happens Together&trade; into a 96-page enterprise playbook
              </h2>
              <p className="cs-body" data-dev-text="playbook-left-body-1" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
                The platform had to work across CVS Health&reg;, Aetna and the broader ecosystem. It needed to be flexible enough for partner agencies and internal teams, but consistent enough to show up clearly across DotCom, app, social, search, chat, digital media and out-of-home.
              </p>
              <p className="cs-body" data-dev-text="playbook-left-body-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 40px' }}>
                This became one of the most challenging projects of my career, with layers of executive review, input from business lines and accessibility requirements that touched every page.
              </p>
            </Reveal>
            <Reveal>
              <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-infographic.jpg" alt=""
                style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
            </Reveal>
          </div>

          {/* RIGHT */}
          <div>
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-lifestyle-man.jpg" alt=""
                  style={{ width: '100%', display: 'block', borderRadius: '8px', objectFit: 'cover', height: '100%' }} />
                <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-voice.gif" alt="Brand voice"
                  style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
              </div>
            </Reveal>
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '32px' }}>
                <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-identity-grid.gif" alt=""
                  style={{ width: '100%', display: 'block', borderRadius: '6px' }} />
                <img src="/cvs-agency-work/10-healthier-happens-togegther/htt-underline-text.gif" alt=""
                  style={{ width: '100%', display: 'block', borderRadius: '6px' }} />
                <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-templated-deck.png" alt=""
                  style={{ width: '100%', display: 'block', borderRadius: '6px' }} />
              </div>
            </Reveal>
            <Reveal>
              <p className="cs-body" data-dev-text="playbook-full-body-1" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
                Over six months, I helped define the working visual system across photography, typography, iconography, color, motion, print and digital guidance.
              </p>
              <p className="cs-body" data-dev-text="playbook-full-body-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                In the final stretch, I carried the playbook across the finish line, working directly with CVS Health&rsquo;s VP of Brand Experience to refine the system and prepare it for handoff.
              </p>
            </Reveal>
          </div>

        </div>
      </CaseStudySection>

      {/* ── 03 The Impact ── */}
      <CaseStudySection style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            <Reveal>
              <p data-dev-text="impact-mono" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E35038', margin: '0 0 16px' }}>
                03 The Impact
              </p>
              <h2 className="font-body cs-h3" data-dev-text="impact-h2" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 28px' }}>
                Thousands of people have been trained on the playbook&rsquo;s contents
              </h2>
              <p className="cs-body" data-dev-text="impact-body-1" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
                To date, the Healthier happens together platform has been adopted at every level and in every corner of the organization.
              </p>
              <p className="cs-body" data-dev-text="impact-body-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 48px' }}>
                Once the playbook was handed off, we built a reusable campaign template to make the next one easier to build.
              </p>
            </Reveal>

            <Reveal>
              <p data-dev-text="impact-delivered-label" style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '22px', lineHeight: 1.3, color: '#101010', margin: '0 0 20px' }}>
                What was delivered:
              </p>
              {[
                { key: 'impact-d1', title: '96-page playbook',           desc: 'Strategy, voice, visual system and enterprise applications.' },
                { key: 'impact-d2', title: 'Enterprise-wide platform',   desc: 'Built to work across CVS Health, Aetna and the broader ecosystem.' },
                { key: 'impact-d3', title: 'National launch system',     desc: 'Extended across TV, radio, digital, retail, direct mail and enterprise environments' },
                { key: 'impact-d4', title: 'Reusable campaign framework', desc: 'Gave future launches a foundation to build from instead of starting over.' },
              ].map((item, i) => (
                <div key={item.key} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: '14px', paddingBottom: '20px', marginBottom: '20px', borderBottom: '1.5px dashed rgba(16,16,16,0.15)' }}>
                  <span style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 700, fontSize: '13px', color: '#101010', lineHeight: 1.4, paddingTop: '3px' }}>0{i + 1}</span>
                  <div>
                    <p data-dev-text={`${item.key}-title`} style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '17px', lineHeight: 1.3, color: '#101010', margin: '0 0 4px' }}>{item.title}</p>
                    <p data-dev-text={`${item.key}-desc`} style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '17px', lineHeight: 1.5, color: '#606060', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          {/* RIGHT */}
          <div>
            <Reveal>
              <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-lifestyle-clinician.jpg" alt=""
                style={{ width: '100%', display: 'block', borderRadius: '8px', marginBottom: '12px' }} />
            </Reveal>
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-templated-deck.png" alt=""
                  style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
                <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-infographic.jpg" alt=""
                  style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
              </div>
            </Reveal>
          </div>

        </div>
      </CaseStudySection>

      <Footer />
    </main>
      </div>
    </>
  );
}
