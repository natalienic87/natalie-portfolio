import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';
import StickyHero from '../components/StickyHero';
import PhoneCarousel from '../components/PhoneCarousel';
import FourBy from '../components/FourBy';
import CaseStudyFullBleed from '../components/CaseStudyFullBleed';
import CaseStudySection from '../components/CaseStudySection';

// ── Minimal case-study nav ────────────────────────────────────────────────────
function CaseStudyNav() {
  const [hovered, setHovered] = useState(false);

  return (
    <nav style={{
      position:       'absolute',
      top:            0,
      left:           0,
      right:          0,
      zIndex:         50,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '20px 32px',
    }}>
      <Link
        href="/"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '8px',
          fontFamily:     'Poppins, sans-serif',
          fontWeight:     700,
          fontSize:       '11px',
          letterSpacing:  '0.18em',
          textTransform:  'uppercase',
          textDecoration: 'none',
          color:          '#FDB154',
          transition:     'opacity 0.2s ease',
          opacity:        hovered ? 0.75 : 1,
        }}
      >
        <span style={{ fontSize: '14px', lineHeight: 1 }}>←</span>
        Home
      </Link>

      <button aria-label="Open menu" style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           '5px',
        background:    'none',
        border:        'none',
        cursor:        'pointer',
        padding:       0,
      }}>
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
      </button>
    </nav>
  );
}

// ── Metadata label/value pair ─────────────────────────────────────────────────
function MetaItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '24px' }}>
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
        <p className="font-body" style={{ fontWeight: 700, fontSize: '33px', color: '#101010', margin: '0 0 16px' }}>
          {slide.title}
        </p>
        <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: 0 }}>
          {slide.body}
        </p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CvsAetna() {
  return (
    // NO overflow on <main> — required for StickyHero position:sticky to work
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFBF8', color: '#101010' }}>
      <style>{`
        @keyframes cvs-cycle {
          0%     { opacity: 1; }
          16.67% { opacity: 0; }
          100%   { opacity: 0; }
        }
        @keyframes dept-cycle {
          0%     { opacity: 1; }
          12.5%  { opacity: 0; }
          100%   { opacity: 0; }
        }
      `}</style>

      <Cursor />
      <CaseStudyNav />

      {/* ── Hero ── */}
      <StickyHero backgroundColor="#FFFBF8">

        {/* Left — 50%, stacked content */}
        <div style={{
          flex:            '0 0 50%',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'center',
          paddingLeft:     '80px',
          paddingRight:    '80px',
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
            fontSize:   '90px',
            lineHeight: '90px',
            color:      '#101010',
            margin:     '0 0 28px',
          }}>
            Agency Work:<br />CVS Health&reg;
          </h1>

          {/* Dashed divider */}
          <svg width="500" height="2" style={{ display: 'block', margin: '32px 0' }} preserveAspectRatio="none">
            <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.25)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <MetaItem label="Year"   value="2020 – 2024" />
            <MetaItem label="Role"   value="Sr. Designer & Art Director" />
            <MetaItem label="Medium" value="Omnichannel Campaigns" />
          </div>
        </div>

        {/* Right — CVS red with cycling heart-art images */}
        <div style={{
          flex:            '0 0 50%',
          position:        'relative',
          overflow:        'hidden',
          backgroundColor: '#CC0000',
          zIndex:          1,
          minHeight:       'max(800px, 90vh)',
          maxHeight:       'max(800px, 90vh)',
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
        <div style={{ padding: '120px 80px 80px', maxWidth: '1120px', margin: '0 auto', boxSizing: 'border-box' }}>
          <Reveal>
            <div
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

        {/* Torn paper edge */}
        <svg
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}
        >
          <path d="M0,50 L0,30 L60,8 L120,40 L175,12 L230,42 L285,5 L340,35 L395,18 L450,44 L505,8 L560,36 L620,20 L680,45 L740,5 L800,32 L855,12 L910,42 L965,18 L1020,44 L1080,8 L1135,38 L1190,15 L1250,42 L1310,10 L1370,36 L1440,22 L1440,50 Z" fill="#FFFBF8" />
        </svg>
      </section>

      {/* ── How it started ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', padding: '100px 80px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '2fr 3fr', alignItems: 'center', gap: '0' }}>

          {/* Left: mascara image */}
          <Reveal>
            <img src="/cvs-agency-work/3-lipstick-smear.png" alt=""
              style={{ width: '100%', display: 'block' }} />
          </Reveal>

          {/* Right: heading + body, dashed left border */}
          <Reveal>
            <div style={{ paddingLeft: '64px', borderLeft: '2px dashed #5B9BD5' }}>
              <h3 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 24px' }}>
                How it started
              </h3>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 20px' }}>
                When I was first hired, I was put on the CVS Shop Page. If you&apos;ve ever been on CVS.com, you&apos;ve likely seen it. It&apos;s the weekly deals engine. Fast cycles, constant production, lots of moving parts. Heavy on implementation, light on creativity. But even inside a rigid template without much safe space, I was pushing. Experimenting with elevated shadows, white space, new visual treatments — figuring out how much creative range really lived inside those components.
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: 0 }}>
                I learned the system fast. A colleague and I were put in charge of onboarding, where we built out interactive Murals, process docs, and even gamified some of the training. We were looking for ways to simplify the workflow rather than add to it. This all got the attention of the Art Director. So when a project came around that needed both creative range and systems thinking, I was called into the kickoff meeting.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── Proposed User Journey ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingBottom: '100px', boxSizing: 'border-box' }}>

        {/* Dotted divider */}
        <svg width="100%" height="2" style={{ display: 'block', marginBottom: '56px' }} preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.18)" strokeWidth="1.5" strokeDasharray="3 6" />
        </svg>

        <Reveal>
          <p style={{ textAlign: 'center', fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888888', margin: '0 0 40px' }}>
            Proposed User Journey
          </p>
        </Reveal>

        <Reveal>
          <div style={{ width: '1120px', margin: '0 auto' }}>
            <img src="/cvs-agency-work/4-north-star-journey-phones.jpg" alt=""
              style={{ width: '100%', display: 'block' }} />
          </div>
        </Reveal>

      </section>

      {/* ── The brief: reimagine CVS shop ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', padding: '100px 80px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left: text */}
          <Reveal>
            <div>
              <h3 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 24px' }}>
                The brief: reimagine CVS shop
              </h3>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 16px' }}>
                I wanted creative freedom, and I got that. I also got a taste of what it was like working past midnight on a sprint like this one.
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 16px' }}>
                The brief: reimagine the entire CVS.com shopping experience. Then build a full pitch deck for senior executives to present with. &ldquo;Blue-sky&rdquo; thinking. Meeting in less than two weeks.
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 16px' }}>
                We heard &ldquo;sky&rsquo;s the limit&rdquo; but knew what that meant at a national retail scale. We needed a system ambitious enough to excite a room full of executives and grounded enough that they could actually envision it happening.
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: 0 }}>
                Facial Care alone had 2,000+ SKUs. Vitamins over 450+. All of it had to hold together. So we built a system that could. To survive that kind of scale, we engineered a highly modular UI built on a few core pillars:
              </p>
            </div>
          </Reveal>

          {/* Right: phone carousel */}
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PhoneCarousel width="360px" slides={[
                '/cvs-agency-work/5-northstar-phones/4-skincare-a.png',
                '/cvs-agency-work/5-northstar-phones/4-skincare-b.png',
                '/cvs-agency-work/5-northstar-phones/4-skincare-c.png',
                '/cvs-agency-work/5-northstar-phones/4-skincare-d.png',
                '/cvs-agency-work/5-northstar-phones/4-skincare-e.png',
                '/cvs-agency-work/5-northstar-phones/4-skincare-f.png',
              ]} />
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── Core pillars ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', padding: '80px 80px 120px', boxSizing: 'border-box' }}>
        <Reveal>
          <FourBy accentColor="#CC0000" items={[
            { title: 'Strategic Badging',      body: 'Tags that actually communicate value – clean ingredients, dermatologist-tested, FSA eligible and more.' },
            { title: 'Guided Shopping',         body: 'Skincare quizzes for personalized regimens and mid-browse MinuteClinic consultations.' },
            { title: 'Social Commerce',         body: 'Share-worthy reviews, influencer integration, and UGC frameworks CVS didn\'t even have yet.' },
            { title: 'Ingredient Transparency', body: 'Clear scannable ingredient stories and iconography with clinical backstops so customers can shop with trust.' },
          ]} />
        </Reveal>
      </section>

      {/* ── Department pages — texture section ── */}
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
              <path d="M0,0 L0,28 L48,6 L95,35 L148,8 L200,38 L260,4 L315,32 L370,15 L425,40 L480,10 L535,34 L595,18 L650,42 L710,6 L765,28 L820,10 L875,38 L930,14 L985,40 L1040,5 L1095,30 L1150,12 L1210,38 L1270,8 L1330,32 L1390,15 L1440,25 L1440,0 Z" fill="#FFFBF8" />
            </svg>
            <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
              style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
              <path d="M0,50 L0,22 L55,45 L110,18 L168,44 L225,10 L280,38 L335,20 L390,46 L445,12 L500,40 L558,8 L615,36 L675,22 L735,48 L792,10 L845,38 L900,18 L958,44 L1015,6 L1070,34 L1128,16 L1185,42 L1245,8 L1300,36 L1360,20 L1440,38 L1440,50 Z" fill="#FFFBF8" />
            </svg>
          </>
        }
      >
        <Reveal>
          <div style={{ position: 'relative', width: '100%', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.18)' }}>
            {[
              '/cvs-agency-work/6-dept-pgs/3-dp-healthmed_NAV.jpg',
              '/cvs-agency-work/6-dept-pgs/2-dp-household.jpg',
              '/cvs-agency-work/6-dept-pgs/2-dp-household_NAV.jpg',
              '/cvs-agency-work/6-dept-pgs/3-dp-personalcare.jpg',
              '/cvs-agency-work/6-dept-pgs/3-dp-personalcare_NAV.jpg',
              '/cvs-agency-work/6-dept-pgs/3-dp-healthmed.jpg',
              '/cvs-agency-work/6-dept-pgs/1-dp-beauty.jpg',
              '/cvs-agency-work/6-dept-pgs/1-dp-beauty_NAV.jpg',
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
                  animationDelay: `${i * 1.5}s`,
                }}
              />
            ))}
          </div>
        </Reveal>
      </CaseStudyFullBleed>

      {/* ── Twelve Department Pages ── */}
      <CaseStudySection style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '120px', paddingBottom: '120px' }}>

        {/* ZONE 1: Centered header */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 className="font-heading" style={{ fontWeight: 700, fontSize: '75px', lineHeight: 1.05, color: '#101010', margin: '0 0 28px' }}>
              Twelve Department Pages
            </h1>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', maxWidth: '680px', margin: '0 auto' }}>
              Shortly after the sprint, I was assigned to another high-stakes CVS.com project. At the time, there was no real content or commerce layer for the department pages, no visual system and no templates. Every page was a one off. We built a reusable system that balances commerce, content and category personality – then scaled it across twelve pages to launch a consistent experience.
            </p>
          </div>
        </Reveal>

        {/* ZONE 2+3: Two-column split — 5fr left / 7fr right */}
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr' }}>

          {/* LEFT COLUMN — Making it repeatable */}
          <div style={{ paddingRight: '56px' }}>

            <Reveal>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', color: '#101010', margin: '0 0 32px' }}>
                Making it repeatable
              </p>
            </Reveal>

            {[
              { num: '01', title: 'Establish the look',      body: 'Defined the visual language, spacing and tone to anchor every department page.' },
              { num: '02', title: 'Templates & components',   body: 'Defined a modular layout that balances commerce, content and category personality.' },
              { num: '03', title: 'Create the rules',         body: 'Helped to write the guidelines that govern components, imagery and content usage.' },
              { num: '04', title: 'Teach the system',         body: 'Documented, templated, and trained teams to scale.' },
            ].map((item, i, arr) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ paddingBottom: '24px', marginBottom: '24px', borderBottom: i < arr.length - 1 ? '1px dashed #C4B8A8' : 'none' }}>
                  <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: '0 0 6px' }}>{item.num}</p>
                  <p className="font-body" style={{ fontWeight: 700, fontSize: '16px', color: '#101010', margin: '0 0 6px' }}>{item.title}</p>
                  <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '16px', lineHeight: 1.65, color: '#404040', margin: 0 }}>{item.body}</p>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', color: '#101010', margin: '40px 0 20px' }}>
                Color / navigation
              </p>
            </Reveal>
            <Reveal>
              <img src="/cvs-agency-work/7-sys-artifacts/7-sys-artifact-viznav.png" alt=""
                style={{ width: '100%', display: 'block', borderRadius: '12px' }} />
            </Reveal>

          </div>

          {/* RIGHT COLUMN — System artifacts + Responsive design */}
          <div style={{ borderLeft: '1px dashed #C4B8A8', paddingLeft: '56px' }}>

            <Reveal>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', color: '#101010', margin: '0 0 24px' }}>
                System artifacts
              </p>
            </Reveal>

            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '56px' }}>
                {[
                  { src: '/cvs-agency-work/7-sys-artifacts/7-sys-artifact-UI.png',         caption: 'UI Components' },
                  { src: '/cvs-agency-work/7-sys-artifacts/7-sys-artifact-grids.png',       caption: 'Type hierarchy and bento box grids' },
                  { src: '/cvs-agency-work/7-sys-artifacts/7-sys-artifact-PSD-layers.png',  caption: 'PSD templates' },
                  { src: '/cvs-agency-work/7-sys-artifacts/7-sys-artifact-component.png',   caption: 'All atoms, molecules and components' },
                ].map((img, i) => (
                  <div key={i}>
                    <img src={img.src} alt="" style={{ width: '100%', display: 'block', borderRadius: '8px', marginBottom: '10px' }} />
                    <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: 0, lineHeight: 1.5 }}>{img.caption}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', color: '#101010', margin: '0 0 24px' }}>
                Responsive design
              </p>
            </Reveal>

            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                <img src="/cvs-agency-work/7-sys-artifacts/7-sys-artifact-Dsktp.png" alt="" style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
                <img src="/cvs-agency-work/7-sys-artifacts/7-sys-artifact-mbl.png" alt="" style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
              </div>
              <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: 0, lineHeight: 1.6 }}>
                Before AI could do everything for you we built responsive padding guidelines for desktop, tablet and mobile
              </p>
            </Reveal>

          </div>
        </div>

      </CaseStudySection>

      {/* ── Built to lift, shift and scale ── */}
      <CaseStudySection style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '80px', paddingBottom: '120px' }}>

        {/* Dotted top divider */}
        <svg width="100%" height="2" style={{ display: 'block', marginBottom: '64px' }} preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.20)" strokeWidth="1.5" strokeDasharray="3 6" />
        </svg>

        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT — heading + body */}
          <div>
            <Reveal>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', lineHeight: 1.2, color: '#101010', margin: '0 0 28px' }}>
                Built to lift, shift and scale
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 20px' }}>
                Each department page needed its own curated mix of weekly deals — from seasonal stories to HSA-eligible products, trending shelves to favorite-brand modules.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 20px' }}>
                We designed the pages around modular content blocks that could move, update and cross-pollinate across departments without requiring a redesign each time. The system had to work before every possible combination happened.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: 0 }}>
                Introducing the department pages was more than a new aesthetic. Once the visual direction was established, I helped translate it into a repeatable production system: templates, naming conventions, folder structures, XD components and PSD files that made the system usable across design, production and leadership.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — two wireframe images side by side */}
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <img src="/cvs-agency-work/7-sys-artifacts/Liftshift-1.png" alt=""
                style={{ width: '100%', display: 'block' }} />
              <img src="/cvs-agency-work/7-sys-artifacts/Liftshift-2.png" alt=""
                style={{ width: '100%', display: 'block' }} />
            </div>
          </Reveal>

        </div>
      </CaseStudySection>

      {/* ── And then one morning ── */}
      <CaseStudySection style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '80px', paddingBottom: '120px' }}>

        {/* Dotted top divider */}
        <svg width="100%" height="2" style={{ display: 'block', marginBottom: '64px' }} preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.20)" strokeWidth="1.5" strokeDasharray="3 6" />
        </svg>

        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT — story + numbered steps */}
          <div>
            <Reveal>
              <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.1, color: '#101010', margin: '0 0 32px' }}>
                And then one morning, everything was broken
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 20px' }}>
                One morning, we signed onto CVS.com and the site just looked ... broken.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 20px' }}>
                Images were warping. Products were cropping incorrectly. Faces, logos and text was getting cut off.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 20px' }}>
                We learned that CVS had migrated to a new CMS, and the new components were not handling content the way their old system had. It looked like a visual problem, but it was a giant accessibility issue that needed to be fixed, fast.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 48px' }}>
                I was part of a small group given sandbox access to understand how the new components actually worked, so we could make them usable. We diagnosed the issue and created a rollout plan to re-deliver thousands of assets while the weekly Shop cycle continued.
              </p>
            </Reveal>

            <Reveal>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', color: '#101010', margin: '0 0 32px' }}>
                How we fixed it
              </p>
            </Reveal>

            {[
              { num: '01', title: 'Diagnose & Define',  body: 'Mapped how the new CMS components handled imagery, crops, scaling and focal points so we could turn a messy migration into clear production rules.' },
              { num: '02', title: 'Plan the Rollout',   body: 'Helped build a phased migration plan that folded thousands of assets into the existing weekly workflow without stopping live production.' },
              { num: '03', title: 'Train & Transfer',   body: 'Documented the new rules and trained designers, production, leadership and CVS site teams so everyone could work from the same component logic.' },
            ].map((item, i, arr) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ paddingBottom: '24px', marginBottom: '24px', borderBottom: i < arr.length - 1 ? '1px dashed #C4B8A8' : 'none' }}>
                  <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: '0 0 6px' }}>{item.num}</p>
                  <p className="font-body" style={{ fontWeight: 700, fontSize: '16px', color: '#101010', margin: '0 0 6px' }}>{item.title}</p>
                  <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '16px', lineHeight: 1.65, color: '#404040', margin: 0 }}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* RIGHT — mural image + body + pull quote */}
          <div>
            <Reveal>
              <img src="/cvs-agency-work/8-history-mural.jpg" alt=""
                style={{ width: '100%', display: 'block', marginBottom: '12px' }} />
              <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: '0 0 40px', lineHeight: 1.6, textAlign: 'center' }}>
                This was the scale of the migration: every tiny rectangle is a full page that had to be checked, rebuilt and QA&rsquo;d without stopping the weekly Shop cycle.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 20px' }}>
                The CMS migration was meant to reduce dependence on outside production support. Instead, it revealed that the value of our team was not just execution — it was system knowledge, brand judgment and the ability to translate between creative, technical, accessibility and merchandising teams.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 40px' }}>
                After the rollout was complete, the relationship changed. It became a defining moment of trust between the client and agency.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ border: '1.5px dashed #C4B8A8', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '26px', lineHeight: 1.5, color: '#101010', margin: 0 }}>
                  The rollout became a turning point. CVS saw that we could protect the brand while helping the system evolve.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
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
              <path d="M0,0 L0,28 L48,6 L95,35 L148,8 L200,38 L260,4 L315,32 L370,15 L425,40 L480,10 L535,34 L595,18 L650,42 L710,6 L765,28 L820,10 L875,38 L930,14 L985,40 L1040,5 L1095,30 L1150,12 L1210,38 L1270,8 L1330,32 L1390,15 L1440,25 L1440,0 Z" fill="#FFFBF8" />
            </svg>
            <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
              style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
              <path d="M0,50 L0,22 L55,45 L110,18 L168,44 L225,10 L280,38 L335,20 L390,46 L445,12 L500,40 L558,8 L615,36 L675,22 L735,48 L792,10 L845,38 L900,18 L958,44 L1015,6 L1070,34 L1128,16 L1185,42 L1245,8 L1300,36 L1360,20 L1440,38 L1440,50 Z" fill="#FFFBF8" />
            </svg>
          </>
        }
      >
        {/* Centered heading + intro */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.1, color: '#101010', margin: '0 0 24px' }}>
              Beyond DotCom
            </h2>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', maxWidth: '680px', margin: '0 auto' }}>
              We had proven we could do more than execute inside the system, the scope widened. Here&rsquo;s a look at a few of the campaigns and brand workstreams where I had a bigger hand, both on and off DotCom.
            </p>
          </div>
        </Reveal>

        {/* Carousel */}
        <BeyondCarousel slides={beyondSlides} />

      </CaseStudyFullBleed>

      {/* ── Platform Playbook ── */}
      <CaseStudySection style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '100px', paddingBottom: '120px' }}>

        {/* Dotted top divider */}
        <svg width="100%" height="2" style={{ display: 'block', marginBottom: '64px' }} preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.20)" strokeWidth="1.5" strokeDasharray="3 6" />
        </svg>

        {/* Centered heading + intro */}
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
            <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.1, color: '#101010', margin: '0 0 24px' }}>
              Platform Playbook
            </h2>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: 0 }}>
              The ask was no longer just to design another page, asset or seasonal system. It was to help turn a national brand platform into a playbook every agency partner and internal team could use.
            </p>
          </div>
        </Reveal>

        {/* Full-width hero image */}
        <Reveal>
          <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-hero.jpg" alt=""
            style={{ width: '100%', display: 'block', borderRadius: '8px', marginBottom: '72px' }} />
        </Reveal>

        {/* Two-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            <Reveal>
              <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888888', margin: '0 0 12px' }}>
                01 The Shift
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '28px', lineHeight: 1.25, color: '#101010', margin: '0 0 20px' }}>
                The enterprise needed to signal its shift from individual businesses to an integrated health solutions company
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.7, color: '#101010', margin: '0 0 40px' }}>
                At a time when health care felt expensive, fragmented and hard to navigate, the brand needed a clearer, more human platform.
              </p>
            </Reveal>

            {/* 31M stat box */}
            <Reveal delay={80}>
              <div style={{ backgroundColor: '#6B4C9A', borderRadius: '14px', padding: '36px 32px' }}>
                <img src="/cvs-agency-work/10-healthier-happens-togegther/hht-31M.gif" alt="31M"
                  style={{ width: '160px', display: 'block', marginBottom: '12px' }} />
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.5, color: '#ffffff', margin: 0 }}>
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
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '24px', lineHeight: 1.55, color: '#101010', margin: 0 }}>
                  Healthier Happens Together&trade; became the playbook for how that unified company should express itself across the CVS Health ecosystem.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </CaseStudySection>

      <Footer />
    </main>
  );
}
