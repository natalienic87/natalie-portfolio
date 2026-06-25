import { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';
import CaseStudySection  from '../components/CaseStudySection';
import CaseStudyFullBleed from '../components/CaseStudyFullBleed';
import CaseSplitPanel    from '../components/CaseSplitPanel';
import StickyHero        from '../components/StickyHero';

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
      {/* ← HOME */}
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
          paddingBottom:  '4px',
          position:       'relative',
          transition:     'opacity 0.2s ease',
          opacity:        hovered ? 0.75 : 1,
        }}
      >
        <span style={{ fontSize: '14px', lineHeight: 1 }}>←</span>
        Home
      </Link>

      {/* Hamburger */}
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
        fontFamily:  'Fira Mono, monospace',
        fontWeight:  400,
        fontSize:    '14px',
        lineHeight:  1.5,
        color:       '#101010',
        flex:        1,
        whiteSpace:  'nowrap',
      }}>{value}</span>
    </div>
  );
}

// ── Doodle shapes ─────────────────────────────────────────────────────────────
function DoodleCircle({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
    </svg>
  );
}

function DoodleStar({ size = 70 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M50,5 L60.6,35.4 L92.8,36.1 L67.1,55.6 L76.4,86.4 L50,68 L23.6,86.4 L32.9,55.6 L7.2,36.1 L39.4,35.4 Z"
        stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleStar8({ size = 70 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M50,6 L57,33 L81,19 L67,43 L94,50 L67,57 L81,81 L57,67 L50,94 L43,67 L19,81 L33,57 L6,50 L33,43 L19,19 L43,33 Z"
        stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleSquiggle({ width = 110, height = 28 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 110 28" fill="none">
      <path
        d="M0,14 C14,3 24,25 38,14 C52,3 62,25 76,14 C90,3 100,25 110,14"
        stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round"
      />
    </svg>
  );
}

function DoodleSpiral({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M50,90 A40,40 0 1 0 50,10 A30,30 0 1 1 50,70 A20,20 0 1 0 50,30 A10,10 0 1 1 50,50"
        stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round"
      />
    </svg>
  );
}

function DoodleDoubleCircle({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
      <circle cx="50" cy="50" r="29" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
    </svg>
  );
}

const DOODLE_REGISTRY = [];

const SHAPE_TYPES = [
  { type: 'circle',   label: 'circle',        size: 72 },
  { type: 'double',   label: 'double circle', size: 80 },
  { type: 'squiggle', label: 'squiggle',      size: 72 },
  { type: 'star',     label: 'star',          size: 68 },
  { type: 'star8',    label: '8pt star',      size: 68 },
  { type: 'spiral',   label: 'spiral',        size: 80 },
];

function renderDoodleShape(type, size = 72) {
  switch (type) {
    case 'circle':   return <DoodleCircle size={size} />;
    case 'double':   return <DoodleDoubleCircle size={size} />;
    case 'star':     return <DoodleStar size={size} />;
    case 'star8':    return <DoodleStar8 size={size} />;
    case 'squiggle': return <DoodleSquiggle width={size} height={Math.round(size * 0.28)} />;
    case 'spiral':   return <DoodleSpiral size={size} />;
    default:         return <DoodleCircle size={size} />;
  }
}

const DoodleEditContext = createContext({
  enabled: false,
  positions: {},
  updatePosition: () => {},
  deletedDoodles: new Set(),
  deleteDoodle: () => {},
});

function Doodle({ children, className = '', style, id }) {
  const { enabled, positions, updatePosition, deletedDoodles, deleteDoodle } = useContext(DoodleEditContext);
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  if (deletedDoodles.has(id)) return null;

  if (!enabled) {
    return (
      <div aria-hidden="true" className={className}
        style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none', color: '#101010', ...style }}>
        {children}
      </div>
    );
  }

  const override = positions[id] || {};
  const scale    = override.scale ?? 1;
  const color    = override.color ?? style.color ?? '#101010';

  const effectiveStyle = { ...style };
  if (override.top  !== undefined) { effectiveStyle.top = override.top;   delete effectiveStyle.bottom; }
  if (override.left !== undefined) { effectiveStyle.left = override.left; delete effectiveStyle.right;  }
  const baseTransform = (style.transform || '').replace(/\s*scale\([^)]*\)/g, '');
  effectiveStyle.transform = scale !== 1 ? `${baseTransform} scale(${scale})`.trim() : (baseTransform || undefined);
  effectiveStyle.color = color;

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    const startTop  = el.offsetTop;
    const startLeft = el.offsetLeft;
    const startMX   = e.clientX;
    const startMY   = e.clientY;
    setDragging(true);

    const onMove = (me) => {
      updatePosition(id, {
        ...positions[id],
        top:  `${Math.round(startTop  + me.clientY - startMY)}px`,
        left: `${Math.round(startLeft + me.clientX - startMX)}px`,
      });
    };
    const onUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const handleResizeDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    const startMX    = e.clientX;
    const startMY    = e.clientY;
    const startScale = scale;
    const elSize     = el.offsetWidth;

    const onMove = (me) => {
      const delta = (me.clientX - startMX + me.clientY - startMY) / 2;
      const next  = Math.max(0.3, Math.min(6, startScale + delta / elSize));
      updatePosition(id, { ...positions[id], scale: Math.round(next * 100) / 100 });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      onMouseDown={handleMouseDown}
      style={{
        position:        'absolute',
        zIndex:          50,
        pointerEvents:   'all',
        cursor:          dragging ? 'grabbing' : 'grab',
        outline:         '1.5px dashed #818cf8',
        outlineOffset:   '5px',
        userSelect:      'none',
        transformOrigin: 'top left',
        ...effectiveStyle,
      }}
    >
      {children}
      <div style={{ position: 'absolute', top: '-20px', left: 0, display: 'flex', alignItems: 'center', gap: '4px', pointerEvents: 'all' }}>
        <span style={{
          fontSize: '9px', fontFamily: 'Fira Mono, monospace', color: '#818cf8',
          background: 'rgba(255,255,255,0.9)', padding: '1px 4px',
          borderRadius: '3px', whiteSpace: 'nowrap', lineHeight: 1.4,
        }}>{id}</span>
        {[['#101010', 'dark'], ['#C0C0C0', 'light']].map(([c, label]) => (
          <button key={c} title={label}
            onMouseDown={e => e.stopPropagation()}
            onClick={() => updatePosition(id, { ...positions[id], color: c })}
            style={{
              width: '11px', height: '11px', borderRadius: '50%', background: c,
              border: color === c ? '2px solid #818cf8' : '1.5px solid #ccc',
              cursor: 'pointer', padding: 0, flexShrink: 0,
            }}
          />
        ))}
        <button title="delete"
          onMouseDown={e => e.stopPropagation()}
          onClick={() => deleteDoodle(id)}
          style={{
            background: '#ef4444', border: 'none', color: 'white', borderRadius: '3px',
            cursor: 'pointer', fontSize: '9px', padding: '1px 5px', lineHeight: 1.4,
            fontFamily: 'Fira Mono, monospace',
          }}>✕</button>
      </div>
      <div
        onMouseDown={handleResizeDown}
        style={{
          position: 'absolute', bottom: '-7px', right: '-7px',
          width: '13px', height: '13px',
          background: 'white', border: '2px solid #818cf8',
          borderRadius: '3px', cursor: 'nwse-resize', zIndex: 1,
        }}
      />
    </div>
  );
}

function ExtraDoodleItem({ id, type, size, top, left, scale, color = '#101010', onUpdate, onDelete }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const s = scale ?? 1;

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    const startTop = el.offsetTop, startLeft = el.offsetLeft;
    const startMX = e.clientX, startMY = e.clientY;
    setDragging(true);
    const onMove = (me) => onUpdate({ top: Math.round(startTop + me.clientY - startMY), left: Math.round(startLeft + me.clientX - startMX) });
    const onUp = () => { setDragging(false); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const handleResizeDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    const startMX    = e.clientX;
    const startMY    = e.clientY;
    const startScale = s;
    const elSize     = el.offsetWidth;
    const onMove = (me) => {
      const delta = (me.clientX - startMX + me.clientY - startMY) / 2;
      const next  = Math.max(0.3, Math.min(6, startScale + delta / elSize));
      onUpdate({ scale: Math.round(next * 100) / 100 });
    };
    const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div ref={ref} onMouseDown={handleMouseDown} style={{
      position: 'absolute', top: `${top}px`, left: `${left}px`,
      zIndex: 50, opacity: 0.25, userSelect: 'none', pointerEvents: 'all',
      cursor: dragging ? 'grabbing' : 'grab',
      transform: s !== 1 ? `scale(${s})` : undefined,
      transformOrigin: 'top left',
      outline: '1.5px dashed #f59e0b', outlineOffset: '5px',
      color,
    }}>
      {renderDoodleShape(type, size)}
      <div style={{ position: 'absolute', top: '-20px', left: 0, display: 'flex', alignItems: 'center', gap: '4px', pointerEvents: 'all' }}>
        <span style={{
          fontSize: '9px', fontFamily: 'Fira Mono, monospace', color: '#f59e0b',
          background: 'rgba(255,255,255,0.9)', padding: '1px 4px',
          borderRadius: '3px', whiteSpace: 'nowrap', lineHeight: 1.4,
        }}>{id}</span>
        {[['#101010', 'dark'], ['#C0C0C0', 'light']].map(([c, label]) => (
          <button key={c} title={label}
            onMouseDown={e => e.stopPropagation()}
            onClick={() => onUpdate({ color: c })}
            style={{
              width: '11px', height: '11px', borderRadius: '50%', background: c,
              border: color === c ? '2px solid #f59e0b' : '1.5px solid #ccc',
              cursor: 'pointer', padding: 0, flexShrink: 0,
            }}
          />
        ))}
        <button onMouseDown={e => e.stopPropagation()} onClick={onDelete} style={{
          background: '#f59e0b', border: 'none', color: 'white', borderRadius: '3px',
          cursor: 'pointer', fontSize: '9px', padding: '1px 5px', lineHeight: 1.4,
          fontFamily: 'Fira Mono, monospace',
        }}>✕</button>
      </div>
      <div onMouseDown={handleResizeDown} style={{
        position: 'absolute', bottom: '-7px', right: '-7px',
        width: '13px', height: '13px',
        background: 'white', border: '2px solid #f59e0b',
        borderRadius: '3px', cursor: 'nwse-resize', zIndex: 1,
      }} />
    </div>
  );
}

const chipBtn = (onClick, label, accent = '#6366f1') => (
  <button onClick={onClick} style={{
    padding: '3px 7px', background: accent + '18', color: accent, border: `1px solid ${accent}44`,
    borderRadius: '4px', cursor: 'pointer', fontFamily: 'Fira Mono, monospace',
    fontSize: '10px', lineHeight: 1.4, whiteSpace: 'nowrap',
  }}>{label}</button>
);

function DoodleEditorPanel({ positions, extras, onReset, onDuplicate, onDeleteExtra }) {
  const moved = Object.entries(positions);

  const copyAll = () => {
    const sLines = moved.map(([id, pos]) => {
      const parts = [];
      if (pos.top  !== undefined) parts.push(`top: '${pos.top}'`);
      if (pos.left !== undefined) parts.push(`left: '${pos.left}'`);
      if (pos.scale !== undefined && pos.scale !== 1) parts.push(`scale: ${pos.scale}×`);
      return `${id}: { ${parts.join(', ')} }`;
    });
    const eLines = extras.map(d =>
      `${d.id} [page-level]: { top: '${d.top}px', left: '${d.left}px'${d.scale && d.scale !== 1 ? `, scale: ${d.scale}×` : ''} }`
    );
    navigator.clipboard.writeText([...sLines, ...eLines].join('\n'));
  };

  return (
    <div style={{
      position: 'fixed', bottom: '72px', right: '16px', width: '268px',
      maxHeight: '480px', overflowY: 'auto',
      background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px',
      padding: '14px', boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
      zIndex: 9999, fontFamily: 'Fira Mono, monospace', fontSize: '11px', lineHeight: 1.5,
    }}>
      <div style={{ fontWeight: 700, fontSize: '12px', color: '#101010', marginBottom: '10px' }}>✦ Doodle Editor</div>

      {moved.length > 0 && (
        <>
          <div style={{ color: '#aaa', fontSize: '10px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>moved</div>
          {moved.map(([id, pos]) => (
            <div key={id} style={{ marginBottom: '6px', padding: '7px 8px', background: '#f5f3ff', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#6366f1', fontWeight: 700 }}>{id}</span>
                {chipBtn(() => onDuplicate(id), '⧉ dup')}
              </div>
              <div style={{ color: '#666', marginTop: '2px' }}>
                {pos.top && `↕ ${pos.top}`}{pos.top && pos.left ? '  ' : ''}
                {pos.left && `↔ ${pos.left}`}
                {pos.scale && pos.scale !== 1 ? `  ⊞ ${pos.scale}×` : ''}
              </div>
            </div>
          ))}
        </>
      )}

      {extras.length > 0 && (
        <>
          <div style={{ color: '#aaa', fontSize: '10px', margin: '10px 0 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>copies</div>
          {extras.map(d => (
            <div key={d.id} style={{ marginBottom: '6px', padding: '7px 8px', background: '#fffbeb', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#d97706', fontWeight: 700 }}>{d.id}</span>
                {chipBtn(() => onDeleteExtra(d.id), '✕', '#d97706')}
              </div>
              <div style={{ color: '#666', marginTop: '2px' }}>
                ↕ {d.top}px  ↔ {d.left}px{d.scale && d.scale !== 1 ? `  ⊞ ${d.scale}×` : ''}
              </div>
            </div>
          ))}
        </>
      )}

      <div style={{ color: '#aaa', fontSize: '10px', margin: '10px 0 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⧉ duplicate any</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
        {SHAPE_TYPES.map(s => chipBtn(() => onDuplicate(s.type, s.size), s.label))}
      </div>

      {(moved.length > 0 || extras.length > 0) && (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={copyAll} style={{
            flex: 1, padding: '6px', background: '#6366f1', color: 'white',
            border: 'none', borderRadius: '6px', cursor: 'pointer',
            fontFamily: 'Fira Mono, monospace', fontSize: '11px',
          }}>Copy positions</button>
          <button onClick={onReset} style={{
            padding: '6px 10px', background: '#f3f4f6', color: '#404040',
            border: 'none', borderRadius: '6px', cursor: 'pointer',
            fontFamily: 'Fira Mono, monospace', fontSize: '11px',
          }}>Reset</button>
        </div>
      )}
      {moved.length === 0 && extras.length === 0 && (
        <div style={{ color: '#888' }}>Drag a doodle to move it.<br />Drag the corner handle to resize.</div>
      )}
    </div>
  );
}

function DoodleEditorToggle({ enabled, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      position:     'fixed',
      bottom:       '20px',
      right:        '16px',
      padding:      '9px 16px',
      background:   enabled ? '#6366f1' : '#101010',
      color:        'white',
      border:       'none',
      borderRadius: '999px',
      cursor:       'pointer',
      fontFamily:   'Fira Mono, monospace',
      fontSize:     '12px',
      zIndex:       10000,
      boxShadow:    '0 4px 16px rgba(0,0,0,0.25)',
      transition:   'background 0.2s',
    }}>
      {enabled ? '✕ exit doodle edit' : '✦ edit doodles'}
    </button>
  );
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, distance = 48, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
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

// ── Project Purpose ──────────────────────────────────────────────────────────
const flavorSlides = [
  '/burketts-bees/3_carousel_flavors/3_RawHoney_Flavors_1a.jpg',
  '/burketts-bees/3_carousel_flavors/3_RawHoney_Flavors_1b.jpg',
  '/burketts-bees/3_carousel_flavors/3_RawHoney_Flavors_blue_2a.jpg',
  '/burketts-bees/3_carousel_flavors/3_RawHoney_Flavors_blue_2b.jpg',
  '/burketts-bees/3_carousel_flavors/3_RawHoney_Flavors_lav_3a.jpg',
  '/burketts-bees/3_carousel_flavors/3_RawHoney_Flavors_lav_3b.jpg',
];

const flavorCardRotations = [-2, 3, -4, 1.5, -3, 2];

const goals = [
  { num: '01', title: 'Test the workflow',           desc: 'Explore where AI could support strategy, identity, packaging, mockups, copy and presentation design.' },
  { num: '02', title: 'Build something concrete',    desc: 'Create a full spec brand the team could actually see, critique and discuss.' },
  { num: '03', title: 'Separate hype from usefulness', desc: 'Document where the tools helped, where they fell short and where they might fit into agency work.' },
  { num: '04', title: 'Start a bigger conversation', desc: 'Use the project as a practical entry point for AI integration at (add)ventures.' },
];

function ProjectPurpose() {
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

  const n = flavorSlides.length;

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
    const rot = flavorCardRotations[si];
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
    <CaseStudySection id="project-purpose" style={{ paddingTop: '50px', paddingBottom: '50px' }} doodle={undefined}>
      <div ref={contentRef} style={{
        display: 'flex', gap: '60px', alignItems: 'center',
        transform: 'scale(0.96)', opacity: 0,
        transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'center center',
      }}>

        {/* Left: heading + body */}
        <div style={{ flex: '0 0 360px', width: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch' }}>
          <Reveal delay={0}>
            <h2 className="font-body" style={{
              fontWeight: 700, fontSize: '33px', lineHeight: 1.2,
              color: '#101010', margin: '0 0 12px',
            }}>Project purpose</h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{
              fontFamily: 'Fraunces, serif', fontWeight: 300,
              fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0,
            }}>
              The Burkett's Bees Raw Honey project wasn't just about testing creative AI tools.
              It was about inspiring the creative team with practical examples of how AI could
              fit inside a creative workflow.
            </p>
          </Reveal>
        </div>

        {/* Right: card stack + arrows */}
        <Reveal delay={0} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <div style={{ position: 'relative', width: '518px', height: '636px' }}>
            {flavorSlides.map((src, si) => (
              <div key={si} style={getCardStyle(si)}>
                <img
                  src={src}
                  alt={`Flavor label ${si + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Fira Mono, monospace', fontSize: '11px',
              letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888',
            }}>flip through the deck</span>
            <ArrowBtn onClick={() => go('prev')}>←</ArrowBtn>
            <ArrowBtn onClick={() => go('next')}>→</ArrowBtn>
          </div>
        </Reveal>

      </div>
    </CaseStudySection>
  );
}

// ── Image folder: /public/burketts-bees/ ──────────────────────────────────────
// ── MediaFrame Carousel ───────────────────────────────────────────────────────
const mediaFrameImages = [
  '/burketts-bees/2_RawHoney_ProductShot1.jpg',
  '/burketts-bees/2_RawHoney_ProductShot2.jpg',
];

function MediaFrameCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + mediaFrameImages.length) % mediaFrameImages.length);
  const next = () => setIdx(i => (i + 1) % mediaFrameImages.length);

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)', transform: 'translateY(0px)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
    >
      <img
        src={mediaFrameImages[idx]}
        alt="Burkett's Bees product"
        style={{ width: '100%', display: 'block' }}
      />

      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Previous image"
        style={{
          position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.85)', border: '1.5px solid rgba(16,16,16,0.15)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', color: '#101010', boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
          zIndex: 2,
        }}
      >←</button>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Next image"
        style={{
          position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.85)', border: '1.5px solid rgba(16,16,16,0.15)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', color: '#101010', boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
          zIndex: 2,
        }}
      >→</button>

      {/* Dot indicators */}
      <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 2 }}>
        {mediaFrameImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Image ${i + 1}`}
            style={{
              width: i === idx ? '24px' : '8px', height: '8px', borderRadius: '4px',
              backgroundColor: i === idx ? '#ffffff' : 'rgba(255,255,255,0.55)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s ease, background-color 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 1_RawHoneyHero.jpg
// 3_carousel_flavors/
// 4_Burkett_Outside.png
// 5_carousel_toolit/
// 6_Mockups-usecases/
// 7_BeeHindScenes/
// 8_tools-grid/
// 9_addventuresbubbleplus.mp4
// 9_carousel_workshops/
// 10_what-carried-forward.jpg

// ── Workshop Carousel ─────────────────────────────────────────────────────────
const workshops = [
  {
    img:   '/burketts-bees/9_carousel_workshops/9_Workshop_1.jpg',
    title: 'AI Ethics',
    body:  <>We watched MasterClass videos and used frameworks like <strong>Ethan Mollick&rsquo;s AI scenarios</strong> to help the team think critically about where AI might be headed — not just what it can do today. We also made space to discuss creative ownership, brand safety, human judgment and responsible use.</>,
    crop:  'left',
  },
  {
    img:   '/burketts-bees/9_carousel_workshops/9_Workshop_2.jpg',
    title: 'Custom GPTs & Gems',
    body:  'Gemini was the only approved tool at the time, so we started with Custom Gems. To make it accessible, we started with something fun first – creating Gems for their daily life. Recipe use. Bicycling routes in Providence. Learning a second language assistant. Everyone came with their own. Got them excited first, so then they could start thinking about how its used in professional life.',
  },
  {
    img:   '/burketts-bees/9_carousel_workshops/9_Workshop_3.jpg',
    title: 'Image Generation in Firefly',
    body:  'Firefly was also the only approved image generation tool at the time, because of its safe licensing and training policies. Led hands-on demos showing how Firefly could support visual exploration, creative ideation, social content and brand-safe image generation. How to prompt for Text-to image, text effects, gen fill, text-to-video, 3D to image.',
  },
  {
    img:   '/burketts-bees/9_carousel_workshops/9_Workshop_4.jpg',
    title: 'Activities and Contests',
    body:  'This is where things going hands-on. Carved out time to have low-entry point activities. Learn by doing, not just by watching. Created space for contests and “workshop” like time to practice together.',
  },
  {
    img:   '/burketts-bees/9_carousel_workshops/9_Workshop_5.jpg',
    title: 'Creative Use Cases',
    body:  'I spent a lot of time here. Researching how other agencies and brands were using generative AI, and showcasing where it worked and where it didn’t. Broadened our understanding of AI. Not just about image generations but about developing new campaigns, involving the community. Talking honestly about backlash.',
  },
];

function WorkshopCarousel() {
  const [page, setPage]         = useState(0);
  const viewportRef             = useRef(null);
  const trackRef                = useRef(null);
  const offsetRef               = useRef(0);
  const animRef                 = useRef(null);
  const dragRef                 = useRef({ active: false, startX: 0, startOffset: 0 });
  const vpWidthRef              = useRef(1120);
  const [vpWidth, setVpWidth]   = useState(1120);
  const [dragging, setDragging] = useState(false);
  const GAP   = 20;
  const PAGES = [workshops.slice(0, 3), workshops.slice(3)];

  const getStep   = () => vpWidthRef.current + GAP;
  const getMaxOff = () => (PAGES.length - 1) * getStep();

  const applyTransform = () => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
  };

  const animateTo = (target) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const clamped  = Math.max(0, Math.min(getMaxOff(), target));
    const start    = offsetRef.current;
    const diff     = clamped - start;
    const duration = 500;
    const t0       = performance.now();
    const tick = (now) => {
      const p    = Math.min((now - t0) / duration, 1);
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      offsetRef.current = start + diff * ease;
      applyTransform();
      if (p < 1) animRef.current = requestAnimationFrame(tick);
      else { offsetRef.current = clamped; applyTransform(); }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const snapNearest = () => {
    const step    = getStep();
    const nearest = Math.max(0, Math.min(PAGES.length - 1, Math.round(offsetRef.current / step)));
    setPage(nearest);
    animateTo(nearest * step);
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      vpWidthRef.current = e.contentRect.width;
      setVpWidth(e.contentRect.width);
    });
    ro.observe(el);
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (animRef.current) cancelAnimationFrame(animRef.current);
      offsetRef.current = Math.max(0, Math.min(getMaxOff(), offsetRef.current + e.deltaX));
      applyTransform();
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { ro.disconnect(); el.removeEventListener('wheel', handleWheel); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { animateTo(page * getStep()); }, [page, vpWidth]); // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseDown = (e) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    offsetRef.current = Math.max(0, Math.min(getMaxOff(), dragRef.current.startOffset + (dragRef.current.startX - e.clientX)));
    applyTransform();
  };
  const onDragEnd = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
    snapNearest();
  };

  const arrowStyle = (disabled) => ({
    position:        'absolute',
    top:             '50%',
    transform:       'translateY(-50%)',
    zIndex:          2,
    width:           '44px',
    height:          '44px',
    borderRadius:    '50%',
    border:          '1.5px solid rgba(16,16,16,0.18)',
    backgroundColor: '#ffffff',
    cursor:          disabled ? 'default' : 'pointer',
    opacity:         disabled ? 0.3 : 1,
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    fontSize:        '18px',
    color:           '#101010',
    transition:      'opacity 0.25s ease',
    boxShadow:       '0 2px 12px rgba(0,0,0,0.08)',
    flexShrink:      0,
  });

  return (
    <>
      <CaseStudyFullBleed id="workshops" background="#FFFBF8" style={{ paddingTop: '175px', paddingBottom: '48px', textAlign: 'center' }}>
        <Reveal>
          <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '75px', lineHeight: 1.05, color: '#101010', margin: '0 0 16px' }}>
            Monthly workshops &amp; discussions
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 auto', maxWidth: '560px' }}>
            We made space for honest questions, tool demos, creative exercises and open discussion.
          </p>
        </Reveal>
      </CaseStudyFullBleed>

      {/* Draggable paginated card carousel */}
      <div style={{ backgroundColor: '#FFFBF8', paddingBottom: '80px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box', position: 'relative' }}>

          <button onClick={() => setPage(p => Math.max(0, p - 1))} aria-label="Previous"
            style={{ ...arrowStyle(page === 0), left: '28px' }}>←</button>
          <button onClick={() => setPage(p => Math.min(PAGES.length - 1, p + 1))} aria-label="Next"
            style={{ ...arrowStyle(page === PAGES.length - 1), right: '28px' }}>→</button>

          <div style={{ overflowX: 'clip', marginLeft: '-60px', paddingLeft: '60px' }}>
            <div
              ref={viewportRef}
              style={{ overflow: 'visible', padding: '40px 0 80px', cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
            >
              <div ref={trackRef} style={{ display: 'flex', gap: `${GAP}px`, willChange: 'transform' }}>
                {PAGES.map((cards, pageIdx) => (
                  <div key={pageIdx} style={{ display: 'flex', gap: `${GAP}px`, width: `${vpWidth}px`, flexShrink: 0 }}>
                    {cards.map(w => (
                      <div key={w.title + w.img} style={{
                        width:           '360px',
                        flexShrink:      0,
                        backgroundColor: '#ffffff',
                        borderRadius:    '20px',
                        overflow:        'hidden',
                        border:          '2px dashed #101010',
                        padding:         '24px',
                        display:         'flex',
                        flexDirection:   'column',
                        boxShadow:       '0 16px 48px rgba(0,0,0,0.14)',
                      }}>
                        <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', flexShrink: 0 }}>
                          <img src={w.img} alt={w.title} draggable={false}
                            style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', objectPosition: w.crop === 'left' ? 'left center' : 'center', display: 'block' }} />
                        </div>
                        <h3 className="font-body" style={{ fontWeight: 700, fontSize: '22px', lineHeight: 1.2, color: '#101010', margin: '0 0 10px' }}>
                          {w.title}
                        </h3>
                        <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '15px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                          {w.body}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Page dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {PAGES.map((_, idx) => (
              <button key={idx} onClick={() => setPage(idx)} aria-label={`Page ${idx + 1}`}
                style={{
                  width:           idx === page ? '24px' : '8px',
                  height:          '8px',
                  borderRadius:    '4px',
                  backgroundColor: idx === page ? '#101010' : 'rgba(16,16,16,0.25)',
                  border:          'none',
                  cursor:          'pointer',
                  padding:         0,
                  transition:      'width 0.3s ease, background-color 0.3s ease',
                }} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

// ── AI Assessment ─────────────────────────────────────────────────────────────
const ASSESSMENT_TEXT = "As I was creating the brand, I kept note of where I thought AI was actually helping the process.\n\nI scored each based on how well the tools followed direction, stayed on brand, how many generations it took to get somewhere useful, and how much editing I had to do afterwards.";

const AI_BARS = [
  { label: 'Brainstorming & ideation', pct: 100, color: '#E8892A' },
  { label: 'Content strategy',         pct: 70,  color: '#7CB342' },
  { label: 'Copywriting & editing',    pct: 60,  color: '#5B9BD5' },
  { label: 'Competitive research',     pct: 50,  color: '#2D2D2D' },
  { label: 'Product mockups',          pct: 70,  color: '#9B59B6' },
  { label: 'Image generation',         pct: 50,  color: '#6FA8DC' },
  { label: 'Presentation deck',        pct: 40,  color: '#1A1A2E' },
];

function AIAssessment() {
  const [animated, setAnimated] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <CaseSplitPanel
      id="ai-assessment"
      leftColor="#3975A7"
      rightColor="#CADCEF"
      eyebrow="My Assessment of AI in 2023"
      text={ASSESSMENT_TEXT}
    >
      {/* Bar chart — right panel content */}
      <div ref={chartRef} style={{ width: '100%' }}>
        {AI_BARS.map(({ label, pct, color }, i) => (
          <div key={label} style={{ marginBottom: i < AI_BARS.length - 1 ? '28px' : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '16px', color: '#101010' }}>
                {label}
              </span>
              <span style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '13px', color: 'rgba(0,0,0,0.55)', marginLeft: '16px', flexShrink: 0 }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: '7px', backgroundColor: 'rgba(0,0,0,0.10)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height:          '100%',
                width:           animated ? `${pct}%` : '0%',
                backgroundColor: color,
                borderRadius:    '4px',
                transition:      `width ${0.8 + i * 0.08}s cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: animated ? `${i * 0.07}s` : '0s',
              }} />
            </div>
          </div>
        ))}
      </div>
    </CaseSplitPanel>
  );
}

const BAKED_EXTRAS = [];

export default function BurkettsBees() {
  const [doodleEditEnabled, setDoodleEditEnabled] = useState(false);
  const [doodlePositions, setDoodlePositions]     = useState({});
  const [extraDoodles, setExtraDoodles]           = useState([]);
  const [deletedDoodles, setDeletedDoodles]       = useState(new Set());

  const deleteDoodle        = (id) => setDeletedDoodles(prev => new Set([...prev, id]));
  const updateDoodlePosition = (id, pos) => setDoodlePositions(prev => ({ ...prev, [id]: pos }));

  const phoneRef = useRef(null);
  const PHONE_MAX_TILT = 12;
  const handlePhoneTiltMove = (e) => {
    const el = phoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const y = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    el.style.transition = 'transform 0.1s ease';
    el.style.transform  = `perspective(1000px) rotateX(${-y * PHONE_MAX_TILT}deg) rotateY(${x * PHONE_MAX_TILT}deg)`;
  };
  const handlePhoneTiltLeave = () => {
    const el = phoneRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.6s ease';
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const duplicateDoodle = (typeOrId, sizeOverride) => {
    const isType = SHAPE_TYPES.some(s => s.type === typeOrId);
    const reg    = isType
      ? SHAPE_TYPES.find(s => s.type === typeOrId)
      : (DOODLE_REGISTRY.find(r => r.id === typeOrId) || { type: 'circle', size: 72 });
    const type   = isType ? typeOrId : reg.type;
    const size   = sizeOverride ?? reg.size;
    setExtraDoodles(prev => {
      const n = prev.length + 1;
      return [...prev, {
        id:       `${type}-copy-${n}`,
        sourceId: typeOrId,
        type,
        size,
        top:   Math.round(window.scrollY + 220 + n * 30),
        left:  360 + n * 30,
        scale: 1,
        color: '#101010',
      }];
    });
  };

  const updateExtraDoodle = (id, updates) =>
    setExtraDoodles(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));

  const deleteExtraDoodle = (id) =>
    setExtraDoodles(prev => prev.filter(d => d.id !== id));

  return (
    <DoodleEditContext.Provider value={{ enabled: doodleEditEnabled, positions: doodlePositions, updatePosition: updateDoodlePosition, deletedDoodles, deleteDoodle }}>
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFBF8', color: '#101010' }}>
      <Cursor />
      <CaseStudyNav />

      {/* Baked page-level doodles */}
      {BAKED_EXTRAS.map(d => (
        <div key={d.id} aria-hidden="true" className={d.className} style={{
          position:      'absolute',
          top:           `${d.top}px`,
          left:          `${d.left}px`,
          opacity:       0.2,
          color:         '#101010',
          zIndex:        1,
          pointerEvents: 'none',
        }}>
          {renderDoodleShape(d.type, d.size)}
        </div>
      ))}

      {/* ── Hero: 50/50 split ── */}
      <StickyHero backgroundColor="#FFFBF8">

        {/* Left — 50%, stacked content */}
        <div style={{
          flex:           '0 0 50%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          paddingLeft:    '80px',
          paddingRight:   '80px',
          paddingTop:     '80px',
          paddingBottom:  '80px',
          boxSizing:      'border-box',
          backgroundColor: '#FFFBF8',
          position:       'relative',
          zIndex:         1,
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
            From Branding Experiment to AI Integration
          </h1>

          {/* Dashed divider */}
          <svg width="500" height="2" style={{ display: 'block', margin: '32px 0' }} preserveAspectRatio="none">
            <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.25)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <MetaItem label="Year"   value="2024" />
            <MetaItem label="Role"   value="Creative Director & AI Strategist" />
            <MetaItem label="Medium" value="Branding, AI Integration, Education" />
          </div>
        </div>

        {/* Right — 50%, full-height looping video */}
        <div style={{ flex: '0 0 50%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          <video
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          >
            <source src="/burketts-bees/1_looping_video_flowers_sway_in_a_light.mp4" type="video/mp4" />
          </video>
        </div>

      </StickyHero>

      {/* ── MediaFrame: Product Shot ── */}
      <section style={{ backgroundColor: '#F5F0EC', backgroundImage: 'url(/Medium-beige-darker-bg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', zIndex: 2, borderRadius: '24px 24px 0 0', boxShadow: '0 -8px 40px rgba(0,0,0,0.10)', paddingBottom: '80px' }}>

        <div style={{ padding: '100px 100px 60px', maxWidth: '1320px', margin: '0 auto', boxSizing: 'border-box' }}>
          <Reveal>
            <MediaFrameCarousel />
          </Reveal>
        </div>

        {/* Torn paper edge — #FFFBF8 (next section) tears up into this section */}
        <svg
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}
        >
          <path d="M0,50 L0,30 L60,8 L120,40 L175,12 L230,42 L285,5 L340,35 L395,18 L450,44 L505,8 L560,36 L620,20 L680,45 L740,5 L800,32 L855,12 L910,42 L965,18 L1020,44 L1080,8 L1135,38 L1190,15 L1250,42 L1310,10 L1370,36 L1440,22 L1440,50 Z" fill="#FFFBF8" />
        </svg>

      </section>

      {/* ── How it started ── */}
      <CaseStudySection
        id="how-it-started"
        sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

          {/* Left: heading + body copy */}
          <div style={{ width: '644px', flexShrink: 0 }}>
            <Reveal delay={0}>
              <h2 className="font-heading" style={{
                fontWeight: 700,
                fontSize:   '75px',
                lineHeight: 1.05,
                color:      '#101010',
                margin:     '0 0 28px',
              }}>How it started</h2>
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
                In 2023, I joined a six-week AI learning course that fundamentally shifted how I
                thought about AI. I wanted to know where AI could actually support the creative
                process — not cheapen the work, or replace what we do best at (add)ventures, the
                creative agency I worked at. What started as a branding exercise eventually
                became the foundation for a larger conversation about AI integration. My interest
                earned me the unofficial title of "AI Girl" and later, the official title of{' '}
                <strong>Art Director, AI Integration</strong>.
              </p>
            </Reveal>
          </div>

          {/* Right: bumble bee */}
          <div style={{ flexShrink: 0, width: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/ELEMENTS/bumble-bee@2x.png"
              alt=""
              style={{ width: '180px', display: 'block', pointerEvents: 'none' }}
            />
          </div>

        </div>
      </CaseStudySection>

      {/* ── Why Burkett's Bees? ── */}
      <CaseStudySection
        id="why-burketts-bees"
        sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
        style={{ paddingTop: '50px', paddingBottom: '50px' }}
        doodle={undefined}
      >

        <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

          {/* Left: photo */}
          <Reveal style={{ flexShrink: 0, width: 'auto' }}>
            <div
              style={{ width: '455px', height: '455px', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <img
                src="/burketts-bees/4_Burkett_Outside.png"
                alt="Real bee hive outside (add)ventures office"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
            </div>
          </Reveal>

          {/* Right: heading + body */}
          <div style={{ flex: 1 }}>
            <Reveal delay={0}>
              <h2 className="font-body" style={{
                fontWeight: 700,
                fontSize:   '33px',
                lineHeight: 1.2,
                color:      '#101010',
                margin:     '0 0 12px',
              }}>Why Burkett's Bees?</h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                <strong>The brand may have been fictional, but the inspiration was not.</strong>{' '}
                The idea started with the actual beehives outside the (add)ventures office.
                K. Burkett, a retired team member and unofficial caretaker of the hives, became
                the muse for the brand. He brought the kind of warmth and craftsmanship I wanted
                the identity to carry, so the spec project became less random and more rooted in
                the world of the agency itself.
              </p>
            </Reveal>
          </div>

        </div>

      </CaseStudySection>

      {/* ── Project Purpose ── */}
      <ProjectPurpose />

      {/* ── Project Goals: 4-card row ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', boxSizing: 'border-box' }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {goals.map(({ num, title, desc }, i) => (
              <div key={num} style={{ border: '1px solid rgba(16,16,16,0.12)', borderRadius: '16px', padding: '28px', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundColor: '#F5AF5A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '26px', color: '#101010' }}>{i + 1}</span>
                  </div>
                  <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '18px', lineHeight: 1.3, color: '#101010' }}>{title}</span>
                </div>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '15px', lineHeight: 1.7, color: '#404040', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Built With AI: SmallBoxRow ── */}
      <section style={{
        backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        position:           'relative',
        zIndex:             2,
        paddingTop:         '120px',
        paddingBottom:      '100px',
      }}>

        {/* Top torn edge — #FFFBF8 tears down into the beige section */}
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,0 L0,28 L48,6 L95,35 L148,8 L200,38 L260,4 L315,32 L370,15 L425,40 L480,10 L535,34 L595,18 L650,42 L710,6 L765,28 L820,10 L875,38 L930,14 L985,40 L1040,5 L1095,30 L1150,12 L1210,38 L1270,8 L1330,32 L1390,15 L1440,25 L1440,0 Z" fill="#FFFBF8" />
        </svg>

        {/* Centered heading + body */}
        <Reveal>
          <div style={{ maxWidth: '738px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box', textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="font-body" style={{
              fontWeight: 700,
              fontSize:   '44px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 16px',
            }}>Built with AI. Art Directed by Me</h2>
            <p style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 300,
              fontSize:   '20px',
              lineHeight: 1.6,
              color:      '#404040',
              margin:     0,
            }}>
              AI helped me build a brand identity toolkit in a fraction of the time. Concept
              exploration was faster, but the decisions were still mine. I decided to riff off the
              existing (add)ventures color palette, develop bold illustrations that could flex easily
              across flavor profiles, and incorporate blue sky as the brand's emotional register.
            </p>
          </div>
        </Reveal>

        {/* 4-box image row */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {[
            { src: '/burketts-bees/5_carousel_toolit/5_BB_Color.jpg',       label: 'Color' },
            { src: '/burketts-bees/5_carousel_toolit/5_BB_Logo.jpg',        label: 'Lockup' },
            { src: '/burketts-bees/5_carousel_toolit/5_BB_Illu.jpg',        label: 'Illustrations' },
            { src: '/burketts-bees/5_carousel_toolit/5_BB_Photography.jpg', label: 'Product photography' },
          ].map((item) => (
            <Reveal key={item.label}>
              <div
                style={{ transform: 'translateY(0px)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
              >
                {/* White frame with drop shadow */}
                <div style={{
                  width:           '260px',
                  height:          '280px',
                  backgroundColor: '#ffffff',
                  padding:         '20px',
                  boxSizing:       'border-box',
                  boxShadow:       '0px 4px 24px rgba(0,0,0,0.12)',
                }}>
                  <img
                    src={item.src}
                    alt={item.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  />
                </div>
                <p style={{
                  fontFamily:    'Fira Mono, monospace',
                  fontWeight:    400,
                  fontSize:      '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         '#888888',
                  textAlign:     'center',
                  margin:        '12px 0 0',
                }}>{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>

        {/* Bottom torn edge — #FFFBF8 tears up into the beige section */}
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,50 L0,22 L55,45 L110,18 L168,44 L225,10 L280,38 L335,20 L390,46 L445,12 L500,40 L558,8 L615,36 L675,22 L735,48 L792,10 L845,38 L900,18 L958,44 L1015,6 L1070,34 L1128,16 L1185,42 L1245,8 L1300,36 L1360,20 L1440,38 L1440,50 Z" fill="#FFFBF8" />
        </svg>

      </section>

      {/* ── Putting the Toolkit to Work ── */}
      <section style={{ backgroundColor: '#FFFBF8', position: 'relative', zIndex: 2, paddingTop: '80px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '80px', paddingRight: '80px', boxSizing: 'border-box', backgroundColor: '#FFFBF8' }}>

          {/* Heading + body + sun */}
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
              <div style={{ minWidth: '762px' }}>
                <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                  Putting the toolkit to work
                </h2>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  After building the toolkit, I wanted to see how far the brand could flex. The
                  mockups were visually impressive, but making ideas visible enough to have productive
                  conversations about them was the real value. Traditionally, that kind of ideation
                  costs real time and money before a single thing gets approved.
                </p>
              </div>
              <img src="/ELEMENTS/Sun@2x.png" alt="" style={{ width: '180px', flexShrink: 0, pointerEvents: 'none' }} />
            </div>
          </Reveal>

          {/* Top divider */}
          <div style={{ borderTop: '1px dashed #C4B8A8', margin: '48px 0' }} />

          {/* ── Rows 1 & 2: Social Media (left, tall) + Website Design / Merch (right, stacked) ── */}
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px' }}>

              {/* Social Media Campaigns — col 1–5 */}
              <div style={{ gridColumn: '1 / 6' }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                  Social Media Campaigns
                </p>
                <div
                  ref={phoneRef}
                  onMouseMove={handlePhoneTiltMove}
                  onMouseLeave={handlePhoneTiltLeave}
                  style={{ display: 'inline-block', borderRadius: '30px', boxShadow: '4px 4px 90px 0px rgba(0,0,0,0.10)', marginTop: '20px' }}
                >
                  <img
                    src="/burketts-bees/6_Mockups-usecases/6_BB_PhoneMockup.png"
                    alt="Social media phone mockup"
                    style={{ width: '100%', display: 'block', borderRadius: '30px' }}
                  />
                </div>
              </div>

              {/* Right column: Website Design + Merch — col 6–12, vertical divider left */}
              <div style={{ gridColumn: '6 / 13', borderLeft: '1px dashed #C4B8A8', paddingLeft: '40px', display: 'flex', flexDirection: 'column' }}>

                {/* Website Design */}
                <div>
                  <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                    Website Design
                  </p>
                  <img
                    src="/burketts-bees/6_Mockups-usecases/6_BB_ComputerMockup.png"
                    alt="Website laptop mockup"
                    style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Inner horizontal divider */}
                <div style={{ borderTop: '1px dashed #C4B8A8', margin: '48px 0' }} />

                {/* Merch / Apparel */}
                <div>
                  <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                    Merch / Apparel
                  </p>
                  <img
                    src="/burketts-bees/6_Mockups-usecases/6_BB_MerchHats.png"
                    alt="Merch hats mockup"
                    style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', display: 'block' }}
                  />
                </div>

              </div>
            </div>
          </Reveal>

          {/* Mid divider */}
          <div style={{ borderTop: '1px dashed #C4B8A8', margin: '48px 0' }} />

          {/* ── Row 3: Three equal columns ── */}
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px' }}>

              {/* Sustainability — col 1–4 */}
              <div style={{ gridColumn: '1 / 5' }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                  Sustainability
                </p>
                <img
                  src="/burketts-bees/6_Mockups-usecases/6_BB_Sustainability.png"
                  alt="Sustainability report mockup"
                  style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Corporate Gifting — col 5–8, vertical divider left */}
              <div style={{ gridColumn: '5 / 9', borderLeft: '1px dashed #C4B8A8', paddingLeft: '40px' }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                  Corporate Gifting
                </p>
                <img
                  src="/burketts-bees/6_Mockups-usecases/6_BB_Gifting.png"
                  alt="Corporate gifting box mockup"
                  style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Event / Experiential — col 9–12, vertical divider left */}
              <div style={{ gridColumn: '9 / 13', borderLeft: '1px dashed #C4B8A8', paddingLeft: '40px' }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '28px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
                  Event / Experiential
                </p>
                <img
                  src="/burketts-bees/6_Mockups-usecases/6_BB_Event.png"
                  alt="Event signage mockup"
                  style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', display: 'block', marginTop: '12px' }}
                />
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* ── AI Assessment ── */}
      <AIAssessment />

      {/* ── Bee-hind the Scenes + Realistic Use Cases ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px', paddingLeft: '80px', paddingRight: '80px', boxSizing: 'border-box' }}>
        <div>

          {/* Row 1: heading + body left | presentation slides right */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px', alignItems: 'start', marginBottom: '60px' }}>
            <div style={{ gridColumn: '1 / 6' }}>
              <Reveal>
                <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                  Bee-hind the scenes of working with AI
                </h2>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  It was important that my team saw the weird AI-isms and behind-the-scenes work that it took to create the brand. I presented my findings with honesty. It opened up a discussion about where it actually might be useful.
                </p>
              </Reveal>
            </div>
            <div style={{ gridColumn: '6 / 13' }}>
              <Reveal>
                <img
                  src="/burketts-bees/7_BeeHindScenes/7_BeeHindScenes1.png"
                  alt="Bee-hind the scenes presentation slides"
                  style={{ width: '100%', display: 'block' }}
                />
              </Reveal>
            </div>
          </div>

          {/* Row 2: mosaic image + caption left | text paragraphs right */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px', alignItems: 'center' }}>
            <div style={{ gridColumn: '1 / 8' }}>
              <Reveal>
                <img
                  src="/burketts-bees/7_BeeHindScenes/7_BeeHindScenes2.jpg"
                  alt="Original AI-generated flower and bee pattern concepts"
                  style={{ width: '100%', display: 'block' }}
                />
                <p style={{
                  fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '11px',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#888888', margin: '12px 0 0',
                }}>
                  Original concepts from when I first started prompting flowers
                </p>
              </Reveal>
            </div>
            <div style={{ gridColumn: '8 / 13' }}>
              <Reveal>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 24px' }}>
                  Image generation has come a long way since 2025, and the score would look different today. But at the time, it felt it was important to show both the potential and the friction.
                </p>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  But it felt incredibly important to give my team a look at the frustration. And all the editing work that needed to happen at the later stages.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Dashed section divider */}
          <div style={{ borderTop: '1px dashed #C4B8A8', margin: '80px 0' }} />

          {/* Realistic use cases */}
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 className="font-heading" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.1, color: '#101010', margin: '0 0 16px' }}>
                Realistic use cases
              </h1>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', maxWidth: '640px', margin: '0 auto' }}>
                Working with Fortune 500 clients meant working inside strict brand systems. Can this tool be used safely, responsibly and consistently inside real agency work?
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[
                { n: 1, title: 'Creative exploration & brainstorming', desc: 'Explore where AI could support strategy, identity, packaging, mockups, copy and presentation design.' },
                { n: 2, title: 'Pitching ideas / RFPs / Nationals',    desc: 'Create a full spec brand the team could actually see, critique and discuss.' },
                { n: 3, title: 'Social media assets',                   desc: 'Document where the tools helped, where they fell short and where they might fit into agency work.' },
                { n: 4, title: 'Mockups and Presentations',             desc: 'Use the project as a practical entry point for AI integration at (add)ventures.' },
              ].map(({ n, title, desc }) => (
                <div key={n} style={{ border: '1px solid rgba(16,16,16,0.12)', borderRadius: '16px', padding: '28px', backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', backgroundColor: '#F5AF5A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '26px', color: '#101010' }}>{n}</span>
                    </div>
                    <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '18px', lineHeight: 1.3, color: '#101010' }}>{title}</span>
                  </div>
                  <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '15px', lineHeight: 1.7, color: '#404040', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── Tools ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingLeft: '80px', paddingRight: '80px', paddingBottom: '120px', boxSizing: 'border-box' }}>
        {/* Dashed separator — no paddingTop so the line sits flush at the section boundary */}
        <div style={{ borderTop: '1px dashed #C4B8A8', marginBottom: '80px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px', alignItems: 'start' }}>

          {/* Left: heading + body + tag pills */}
          <div style={{ gridColumn: '1 / 5' }}>
            <Reveal>
              <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                Tools
              </h2>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 32px' }}>
                Working with Fortune 500 clients meant working inside strict brand systems. In that reality, AI-generated creative was not always something we could use as a final asset. The output often needed too much editing or didn't fit tightly enough within existing guidelines.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Custom GPTs', 'AI Plug-ins', 'Data Asset Management Systems'].map(tag => (
                  <span key={tag} style={{
                    fontFamily:   'Fira Mono, monospace',
                    fontSize:     '12px',
                    color:        '#101010',
                    border:       '1px solid #101010',
                    borderRadius: '100px',
                    padding:      '6px 14px',
                    display:      'inline-block',
                  }}>{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: image grid — full-width top + two bottom */}
          <div style={{ gridColumn: '5 / 13', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Reveal>
              <img
                src="/burketts-bees/8_tools-grid/8_Tools_Grid1.jpg"
                alt="Beyond Clutter website screenshot"
                style={{ width: '100%', display: 'block' }}
              />
            </Reveal>
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <img
                  src="/burketts-bees/8_tools-grid/8_Tools_Grid2_BottomL.png"
                  alt="Figma AI workflow tools"
                  style={{ width: '100%', display: 'block' }}
                />
                <img
                  src="/burketts-bees/8_tools-grid/8_Tools_Grid3_BottomRight.png"
                  alt="AI image tagging and recognition UI"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── AI Education + Integration (full-bleed split) ── */}
      <CaseSplitPanel
        id="ai-education"
        leftColor="#F5AF5A"
        rightColor="#EEEAE4"
        leftContent={
          <>
            <h2 className="font-heading" style={{ fontWeight: 700, fontSize: '52px', lineHeight: 1.1, color: '#101010', margin: '0 0 28px' }}>
              From curiosity to AI education and integration
            </h2>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.7, color: '#101010', margin: 0 }}>
              Burkett&rsquo;s Bees gave the team something concrete to react to. The project helped shift the conversation from abstract AI hype to practical creative workflows and became part of the foundation for my eventual role as <strong style={{ fontWeight: 700 }}>Art Director, AI Integration.</strong>
            </p>
          </>
        }
      >
        <video
          src="/burketts-bees/9_addventuresbubbleplus.mp4"
          autoPlay muted loop playsInline
          style={{ width: '100%', display: 'block' }}
        />
      </CaseSplitPanel>

      {/* ── The Role in Practice ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px', paddingLeft: '80px', paddingRight: '80px', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px', alignItems: 'center' }}>

          {/* Left: heading + body */}
          <div style={{ gridColumn: '1 / 6' }}>
            <Reveal>
              <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                The role in practice
              </h2>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                In the role, I maintained my Art Director responsibilities, while also integrating new tools and educating the team. While also leading AI research, testing and implementation across creative workflows. The work was not just about experimenting with new tools. It was also about internal education, and figuring out what was useful, safe, and compliant for an agency serving highly regulated clients.
              </p>
            </Reveal>
          </div>

          {/* Right: tag cloud */}
          <div style={{ gridColumn: '6 / 13' }}>
            <Reveal>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                {[
                  { label: 'AI Lunch & Discuss',     variant: 'orange'  },
                  { label: 'Demos',                   variant: 'purple'  },
                  { label: 'Mentoring',               variant: 'dashed'  },
                  { label: 'Art Direction',           variant: 'dashed'  },
                  { label: 'Ethics',                  variant: 'purple'  },
                  { label: 'Image Gen',               variant: 'dashed'  },
                  { label: 'Custom Models',           variant: 'purple'  },
                  { label: 'Discussion',              variant: 'dashed'  },
                  { label: 'Tool testing',            variant: 'orange'  },
                  { label: 'Guidelines & Guardrails', variant: 'dashed'  },
                  { label: 'Compliance',              variant: 'dashed'  },
                  { label: 'New business support',    variant: 'orange'  },
                ].map(({ label, variant }) => {
                  const base = {
                    fontFamily:   'Fira Mono, monospace',
                    fontSize:     '13px',
                    lineHeight:   1,
                    borderRadius: '100px',
                    padding:      '11px 20px',
                    display:      'inline-block',
                    color:        '#101010',
                  };
                  if (variant === 'orange') return <span key={label} style={{ ...base, backgroundColor: '#F5AF5A' }}>{label}</span>;
                  if (variant === 'purple') return <span key={label} style={{ ...base, backgroundColor: '#C5BFEC' }}>{label}</span>;
                  return <span key={label} style={{ ...base, backgroundColor: 'transparent', border: '1.5px dashed #101010' }}>{label}</span>;
                })}
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── Workshop Carousel ── */}
      <WorkshopCarousel />

      {/* ── Three C's + What Carried Forward ── */}
      <section style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px', paddingLeft: '80px', paddingRight: '80px', boxSizing: 'border-box' }}>

        {/* Testing AI against the Three C's — centered heading */}
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
              Testing AI against the &ldquo;Three C&rsquo;s&rdquo;
            </h2>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              I developed a simple framework to evaluate AI tools against real agency needs — from presentation makers and image generators to plug-ins, internal GPTs and DAM capabilities.
            </p>
          </div>
        </Reveal>

        {/* Three cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { num: '1', title: 'Collaboration', body: 'Does it help teams work better together? Can it speed up ideation, review and shared decision-making?' },
            { num: '2', title: 'Consistency',   body: 'Can it stay on brand and on brief across multiple outputs, formats and teams? Where do we lose cohesion?' },
            { num: '3', title: 'Compliance',    body: 'Can it be used safely within client, privacy, security and internal approval requirements?' },
          ].map(({ num, title, body }) => (
            <Reveal key={title}>
              <div style={{ border: '1px solid rgba(16,16,16,0.12)', borderRadius: '16px', padding: '28px', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundColor: '#F5AF5A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '26px', lineHeight: 1, color: '#101010' }}>{num}</span>
                  </div>
                  <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '20px', color: '#101010' }}>{title}</span>
                </div>
                <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '15px', lineHeight: 1.7, color: '#404040', margin: 0 }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dashed divider */}
        <div style={{ borderTop: '1px dashed #C4B8A8', margin: '80px 0' }} />

        {/* What carried forward */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px', alignItems: 'center' }}>
          <div style={{ gridColumn: '1 / 6' }}>
            <Reveal>
              <h2 className="font-body" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                What carried forward
              </h2>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.7, color: '#404040', margin: '0 0 20px' }}>
                The use cases I identified through Burkett&rsquo;s Bees ended up being the same places AI proved useful inside the agency: RFPs, notionals, pitch materials, social content, mockups and early creative exploration.
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.7, color: '#404040', margin: '0 0 20px' }}>
                When (add)ventures later explored a new internal brand direction, AI-assisted collage became part of the visual identity.
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.7, color: '#404040', margin: 0 }}>
                AI may have replaced a few pricey stock photos, but it did not replace the people behind the craft. Designers still had to direct, edit, combine, refine and turn those pieces into usable brand assets.
              </p>
            </Reveal>
          </div>
          <div style={{ gridColumn: '6 / 13' }}>
            <Reveal>
              <img
                src="/burketts-bees/10_what-carried-forward.jpg"
                alt="(add)ventures AI-assisted collage brand identity"
                style={{ width: '100%', display: 'block' }}
              />
            </Reveal>
          </div>
        </div>

      </section>

      <Footer />

      {/* Page-level extra doodles overlay */}
      {doodleEditEnabled && extraDoodles.map(d => (
        <ExtraDoodleItem
          key={d.id}
          {...d}
          onUpdate={(updates) => updateExtraDoodle(d.id, updates)}
          onDelete={() => deleteExtraDoodle(d.id)}
        />
      ))}

      <DoodleEditorToggle enabled={doodleEditEnabled} onToggle={() => setDoodleEditEnabled(v => !v)} />
      {doodleEditEnabled && (
        <DoodleEditorPanel
          positions={doodlePositions}
          extras={extraDoodles}
          onReset={() => { setDoodlePositions({}); setExtraDoodles([]); setDeletedDoodles(new Set()); }}
          onDuplicate={duplicateDoodle}
          onDeleteExtra={deleteExtraDoodle}
        />
      )}
    </main>
    </DoodleEditContext.Provider>
  );
}
