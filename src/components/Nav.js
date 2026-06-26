import Link from 'next/link';
import { useState } from 'react';

const navLinkStyle = (hovered) => ({
  position:       'relative',
  fontFamily:     'Fira Mono, monospace',
  fontWeight:     500,
  fontSize:       '13px',
  letterSpacing:  '0.12em',
  textTransform:  'uppercase',
  textDecoration: 'none',
  color:          hovered ? '#ffffff' : '#D9D9D9',
  paddingBottom:  '5px',
  transition:     'color 0.2s ease',
  display:        'inline-block',
});

function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={navLinkStyle(hovered)}
    >
      {children}
      <span style={{
        position:        'absolute',
        bottom:          0,
        left:            0,
        height:          '1.5px',
        width:           hovered ? '100%' : '0%',
        backgroundColor: '#FDB154',
        transition:      'width 0.35s ease-out',
        borderRadius:    '2px',
      }} />
    </Link>
  );
}

const caseStudies = [
  { label: 'Rules We Made Up',           href: '/rules-we-made-up' },
  { label: "Burkett's Bees",             href: '/burketts-bees'    },
  { label: 'CVS Health',                 href: '/cvs-aetna'        },
  { label: '(add)ventures Brand Refresh', href: '/add-refresh'     },
];

function CaseStudiesDropdown() {
  const [open, setOpen]         = useState(false);
  const [labelHovered, setLabelHovered] = useState(false);

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => { setOpen(true);  setLabelHovered(true);  }}
      onMouseLeave={() => { setOpen(false); setLabelHovered(false); }}
    >
      {/* Trigger */}
      <span style={{ ...navLinkStyle(labelHovered), cursor: 'default' }}>
        Case Studies
        <span style={{
          position:        'absolute',
          bottom:          0,
          left:            0,
          height:          '1.5px',
          width:           labelHovered ? '100%' : '0%',
          backgroundColor: '#FDB154',
          transition:      'width 0.35s ease-out',
          borderRadius:    '2px',
        }} />
      </span>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position:        'absolute',
          top:             '100%',
          left:            '50%',
          transform:       'translateX(-50%)',
          backgroundColor: '#1a1a1a',
          border:          '1px solid rgba(255,255,255,0.1)',
          borderRadius:    '8px',
          padding:         '20px 0 8px',
          minWidth:        '220px',
          zIndex:          100,
        }}>
          {caseStudies.map(({ label, href }) => (
            <DropdownItem key={href} href={href}>{label}</DropdownItem>
          ))}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ href, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'block',
        padding:        '10px 20px',
        fontFamily:     'Poppins, sans-serif',
        fontWeight:     600,
        fontSize:       '11px',
        letterSpacing:  '0.12em',
        textTransform:  'uppercase',
        textDecoration: 'none',
        color:          hovered ? '#ffffff' : '#D9D9D9',
        backgroundColor: hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
        transition:     'color 0.15s ease, background-color 0.15s ease',
        whiteSpace:     'nowrap',
      }}
    >
      {children}
    </Link>
  );
}

function Divider() {
  return (
    <span style={{ display: 'inline-block', width: '1px', height: '14px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8" style={{ paddingTop: '24px', paddingBottom: '24px' }}>

        {/* LEFT — wordmark */}
        <Link href="/" style={{
          fontFamily:     'Fraunces, serif',
          fontWeight:     600,
          fontSize:       '15px',
          letterSpacing:  '0.06em',
          textTransform:  'uppercase',
          textDecoration: 'none',
          color:          '#ffffff',
        }}>
          Natalie Nicholson
        </Link>

        {/* RIGHT — desktop: case studies + contact + substack */}
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <CaseStudiesDropdown />
          <Divider />
          <NavLink href="mailto:natalienic87@gmail.com">Contact</NavLink>
          <Divider />
          <a
            href="https://crankthatnat.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily:     'Fira Mono, monospace',
              fontWeight:     500,
              fontSize:       '13px',
              letterSpacing:  '0.12em',
              textTransform:  'uppercase',
              textDecoration: 'none',
              color:          '#D9D9D9',
            }}
          >
            The Off Hours Substack↗
          </a>
        </div>

        {/* Mobile — hamburger */}
        <button
          className="nav-hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
          <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
          <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
        </button>

      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 998 }} />
      )}

      {/* Slide-in panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '320px',
        backgroundColor: '#101010', zIndex: 999,
        padding: '40px', display: 'flex', flexDirection: 'column',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.25)',
      }}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ alignSelf: 'flex-end', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '24px', lineHeight: 1, padding: 0, marginBottom: '48px' }}>✕</button>

        <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: '15px', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', color: '#ffffff', marginBottom: '32px', display: 'block' }}>
          Natalie Nicholson
        </Link>

        <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 20px' }}>
          Case Studies
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {caseStudies.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '22px', lineHeight: 1.3, color: '#ffffff', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FDB154'}
              onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
            >{label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="mailto:natalienic87@gmail.com" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 500, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FDB154', textDecoration: 'none' }}>Contact</a>
          <a href="https://crankthatnat.substack.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 500, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>The Off Hours Substack↗</a>
        </div>
      </div>
    </>
  );
}
