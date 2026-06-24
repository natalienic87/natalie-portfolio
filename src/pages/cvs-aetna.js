import { useState } from 'react';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';

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
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
      </button>
    </nav>
  );
}

// ── Metadata label/value pair ─────────────────────────────────────────────────
function MetaItem({ label, value }) {
  const meta = {
    fontFamily:    'Fira Mono, monospace',
    fontWeight:    400,
    fontSize:      '14px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight:    1.5,
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0 16px' }}>
      <span style={{ ...meta, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
      <span style={{ ...meta, color: '#ffffff' }}>{value}</span>
    </div>
  );
}

// ── Hero images ───────────────────────────────────────────────────────────────
const heroImages = [
  '/cvs-agency-work/1-heart-art-hero/1_outline.jpg',
  '/cvs-agency-work/1-heart-art-hero/2_Graphic-heart.jpg',
  '/cvs-agency-work/1-heart-art-hero/3_breakout-transparency.jpg',
  '/cvs-agency-work/1-heart-art-hero/4_Window-heart.jpg',
  '/cvs-agency-work/1-heart-art-hero/5_Outline-pool.jpg',
  '/cvs-agency-work/1-heart-art-hero/6_Breakout-no-transparency.jpg',
];

// ── Act I ─────────────────────────────────────────────────────────────────────
function ActI() {
  return (
    <section style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap:                 '40px',
      paddingLeft:         '80px',
      paddingRight:        '80px',
      paddingTop:          '100px',
      paddingBottom:       '100px',
      alignItems:          'center',
    }}>

      {/* Left — cols 1–3 */}
      <div style={{ gridColumn: '1 / 4' }}>
        <p style={{
          fontFamily:    'Poppins, sans-serif',
          fontWeight:    700,
          fontSize:      '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         '#E35038',
          margin:        '0 0 20px',
        }}>
          Act I
        </p>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize:   '16px',
          lineHeight: 1.75,
          color:      '#A9A9A9',
          margin:     0,
        }}>
          Over four years, I touched every layer of the CVS digital experience — from the Shop page
          customers land on, to the Department Pages that organize their world, to Product Landing
          Pages, to the Product Description pages where they finally decide to buy. I worked the
          whole stack.
        </p>
      </div>

      {/* Right — cols 4–9: video */}
      <div style={{ gridColumn: '4 / 9' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width:        '100%',
            display:      'block',
            borderRadius: '12px',
            boxShadow:    '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <source src="/cvs-agency-work/2-digital-experience.mp4" type="video/mp4" />
        </video>
      </div>

    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CvsAetna() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#101010', color: '#ffffff' }}>
      <Cursor />
      <CaseStudyNav />

      {/* ── Hero: identical to rules-we-made-up ── */}
      <section style={{ display: 'flex', minHeight: '800px', width: '100%' }}>

        {/* Left — fills remaining space, heading top-left */}
        <div style={{
          flex:          1,
          display:       'flex',
          alignItems:    'flex-start',
          paddingLeft:   '80px',
          paddingRight:  '40px',
          paddingTop:    '160px',
          paddingBottom: '64px',
          boxSizing:     'border-box',
        }}>
          <h1 className="font-heading" style={{
            fontWeight: 700,
            fontSize:   '80px',
            lineHeight: '88px',
            color:      '#ffffff',
            margin:     0,
          }}>
            Agency Work:<br />CVS, Aetna
          </h1>
        </div>

        {/* Right — fixed 640x800, flush top and right, cycling images */}
        <div style={{
          flexShrink: 0,
          width:      '640px',
          height:     '800px',
          overflow:   'hidden',
          position:   'relative',
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
                opacity:        0,
                animation:      'cvs-cycle 9s step-end infinite',
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>

      </section>

      {/* ── Metadata + Intro ── */}
      <section style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap:                 '40px',
        paddingTop:          '64px',
        paddingBottom:       '64px',
        paddingLeft:         '80px',
        paddingRight:        '80px',
        alignItems:          'start',
      }}>
        <div style={{ gridColumn: '1 / 3', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <MetaItem label="Year"   value="2020 – 2025" />
          <MetaItem label="Role"   value="SR. Designer & Art Director" />
          <MetaItem label="Medium" value="Omnichannel Campaigns" />
        </div>

        <div style={{ gridColumn: '3 / 9' }}>
          <p style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 400,
            fontSize:   '20px',
            lineHeight: 1.5,
            color:      '#ffffff',
            margin:     0,
          }}>
            For four years, I designed across the entire CVS enterprise — digital, in-store,
            campaigns, and direct mail. Not just touching projects, but building the systems
            everyone else worked inside.
          </p>
        </div>
      </section>

      {/* ── Act I ── */}
      <ActI />

      <Footer />
    </main>
  );
}
