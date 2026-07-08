import { useState } from 'react';
import Link from 'next/link';

const caseStudies = [
  { label: 'Rules We Made Up',            href: '/rules-we-made-up' },
  { label: "Burkett's Bees",              href: '/burketts-bees'    },
  { label: 'CVS Health',                  href: '/cvs-aetna'        },
  { label: '(add)ventures Brand Refresh', href: '/add-refresh'      },
];

export default function CaseStudyNav() {
  const [open, setOpen]         = useState(false);
  const [homeHovered, setHomeHovered] = useState(false);

  return (
    <>
      <nav className="case-study-nav" style={{
        position:       'relative',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '20px 120px',
      }}>
        {/* ← HOME */}
        <Link
          href="/"
          onMouseEnter={() => setHomeHovered(true)}
          onMouseLeave={() => setHomeHovered(false)}
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
            paddingBottom:  '4px',
            position:       'relative',
            transition:     'opacity 0.2s ease',
            opacity:        homeHovered ? 0.75 : 1,
          }}
        >
          <span style={{ fontSize: '14px', lineHeight: 1 }}>←</span>
          Home
        </Link>

        {/* Hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '5px',
            background:    'none',
            border:        'none',
            cursor:        'pointer',
            padding:       0,
          }}
        >
          <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
        </button>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position:        'fixed',
            inset:           0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex:          998,
          }}
        />
      )}

      {/* Slide-in panel */}
      <div style={{
        position:         'fixed',
        top:              0,
        right:            0,
        bottom:           0,
        width:            '320px',
        backgroundColor:  '#101010',
        zIndex:           999,
        padding:          '40px 40px',
        display:          'flex',
        flexDirection:    'column',
        transform:        open ? 'translateX(0)' : 'translateX(100%)',
        transition:       'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow:        '-8px 0 40px rgba(0,0,0,0.25)',
      }}>
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          style={{
            alignSelf:       'flex-end',
            background:      'none',
            border:          'none',
            cursor:          'pointer',
            color:           'rgba(255,255,255,0.6)',
            fontSize:        '24px',
            lineHeight:      1,
            padding:         0,
            marginBottom:    '48px',
          }}
        >
          ✕
        </button>

        {/* Home link */}
        <Link href="/" onClick={() => setOpen(false)} style={{
          fontFamily:     'Poppins, sans-serif',
          fontWeight:     700,
          fontSize:       '11px',
          letterSpacing:  '0.18em',
          textTransform:  'uppercase',
          textDecoration: 'none',
          color:          '#FDB154',
          marginBottom:   '32px',
          display:        'block',
        }}>
          ← Home
        </Link>

        {/* Divider */}
        <p style={{
          fontFamily:    'Fira Mono, monospace',
          fontWeight:    400,
          fontSize:      '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.35)',
          margin:        '0 0 20px',
        }}>
          Case Studies
        </p>

        {/* Case study links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {caseStudies.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              fontFamily:     'Fraunces, serif',
              fontWeight:     300,
              fontSize:       '22px',
              lineHeight:     1.3,
              color:          '#ffffff',
              textDecoration: 'none',
              transition:     'color 0.15s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#FDB154'}
              onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
