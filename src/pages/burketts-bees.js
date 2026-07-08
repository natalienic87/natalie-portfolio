import { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import CaseStudyNav from '../components/CaseStudyNav';
import Footer from '../components/Footer';
import CaseStudySection  from '../components/CaseStudySection';
import CaseStudyFullBleed from '../components/CaseStudyFullBleed';
import CaseSplitPanel    from '../components/CaseSplitPanel';
import CaseStudyHero     from '../components/CaseStudyHero';
import TickerStrip         from '../components/TickerStrip';
import DashedCardCarousel  from '../components/DashedCardCarousel';



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
    <CaseStudySection id="project-purpose" style={{ paddingTop: '120px', paddingBottom: '120px' }} doodle={undefined}>
      <div ref={contentRef} className="char-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        columnGap: '20px',
        alignItems: 'center',
        transform: 'scale(0.96)', opacity: 0,
        transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'center center',
      }}>

        {/* Left: heading + text (cols 1–5) */}
        <div className="char-text-col" style={{ gridColumn: '1 / 6' }}>
          <Reveal delay={0}>
            <h2 className="font-body cs-h3" style={{
              fontWeight: 700, fontSize: '33px', lineHeight: 1.2,
              color: '#101010', margin: '0 0 20px',
            }}>Building the flavor system</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
              I wanted to see whether AI could help extend a brand system, so I built a line of
              flavors to test how well the tools could maintain consistency across related packaging.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              I decided to riff off the existing (add)ventures color palette, and develop bold
              illustrations that could flex across flavor profiles. The real test was whether the
              logo, label structure, illustration style, and handmade warmth could stay consistent
              across flavor profiles.
            </p>
          </Reveal>
        </div>

        {/* Right: card stack + arrows (cols 7–12) */}
        <div className="char-card-reveal" style={{ gridColumn: '7 / 13' }}>
          <Reveal delay={0} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <div className="char-card-stack" style={{ position: 'relative', width: '622px', height: '763px' }}>
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
          <div className="cs-deck-nav" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <ArrowBtn onClick={() => go('prev')}>←</ArrowBtn>
            <span className="cs-mono" style={{
              fontFamily: 'Fira Mono, monospace', fontWeight: 400,
              fontSize: '16px', lineHeight: 1.2, color: '#101010',
            }}>flip through the deck</span>
            <ArrowBtn onClick={() => go('next')}>→</ArrowBtn>
          </div>
          </Reveal>
        </div>

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
  return (
    <>
      <section style={{
        backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        backgroundColor:    '#F5F0EC',
        position:           'relative',
        zIndex:             2,
        paddingTop:         '140px',
        paddingBottom:      '140px',
      }}>
        {/* Top torn edge */}
        <svg className="bb-torn-edge" viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,0 L1440,0 L1440,25 C1380,42 1320,42 1260,25 C1200,8 1140,8 1080,25 C1020,42 960,42 900,25 C840,8 780,8 720,25 C660,42 600,42 540,25 C480,8 420,8 360,25 C300,42 240,42 180,25 C120,8 60,8 0,25 Z" fill="#FFFBF8" />
        </svg>

        {/* Heading */}
        <div className="workshop-heading-wrap" style={{ textAlign: 'center', maxWidth: '1440px', margin: '0 auto', padding: '0 80px 10px', boxSizing: 'border-box' }}>
          <Reveal>
            <h3 className="font-body cs-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
              Running monthly workshops &amp; discussions
            </h3>
          </Reveal>
          <Reveal delay={100}>
            <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 auto', maxWidth: '560px' }}>
              Another colleague and I held monthly &ldquo;Lunch &amp; discusses&rdquo; &ndash; intentionally
              making them hands-on, practical and pressure-free. We made space for honest questions,
              tool demos, creative exercises and open discussion.
            </p>
          </Reveal>
        </div>

        {/* Carousel */}
        <div style={{ paddingBottom: '0', position: 'relative', zIndex: 2 }}>
          <DashedCardCarousel items={workshops} />
        </div>

        {/* Bottom torn edge */}
        <svg className="bb-torn-edge" viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,25 C60,8 120,8 180,25 C240,42 300,42 360,25 C420,8 480,8 540,25 C600,42 660,42 720,25 C780,8 840,8 900,25 C960,42 1020,42 1080,25 C1140,8 1200,8 1260,25 C1320,42 1380,42 1440,25 L1440,50 L0,50 Z" fill="#FFFBF8" />
        </svg>
      </section>
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
      eyebrowStyle={{ fontSize: '16px', letterSpacing: 0, textTransform: 'none', color: '#CADCEF' }}
      text={ASSESSMENT_TEXT}
    >
      {/* Bar chart — right panel content */}
      <div ref={chartRef} style={{ width: '100%' }}>
        {AI_BARS.map(({ label, pct, color }, i) => (
          <div key={label} style={{ marginBottom: i < AI_BARS.length - 1 ? '28px' : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#101010' }}>
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

const USE_CASES = [
  { label: 'Social Media Campaigns', src: '/burketts-bees/6_Mockups-usecases/6_BB_PhoneMockup.png',    alt: 'Social media phone mockup' },
  { label: 'Website Design',         src: '/burketts-bees/6_Mockups-usecases/6_BB_ComputerMockup.png', alt: 'Website laptop mockup' },
  { label: 'Merch / Apparel',        src: '/burketts-bees/6_Mockups-usecases/6_BB_MerchHats.png',      alt: 'Merch hats mockup' },
  { label: 'Sustainability',         src: '/burketts-bees/6_Mockups-usecases/6_BB_Sustainability.png', alt: 'Sustainability report mockup' },
  { label: 'Corporate Gifting',      src: '/burketts-bees/6_Mockups-usecases/6_BB_Gifting.png',        alt: 'Corporate gifting box mockup' },
  { label: 'Events',                 src: '/burketts-bees/6_Mockups-usecases/6_BB_Event.png',          alt: 'Event signage mockup' },
];

export default function BurkettsBees() {
  const [doodleEditEnabled, setDoodleEditEnabled] = useState(false);
  const [doodlePositions, setDoodlePositions]     = useState({});
  const [extraDoodles, setExtraDoodles]           = useState([]);
  const [deletedDoodles, setDeletedDoodles]       = useState(new Set());
  const [activeUseCase, setActiveUseCase]         = useState(null);

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
    <main className="main-clip-mobile" style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFBF8', color: '#101010' }}>
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

      <CaseStudyHero
        title="From Branding Experiment to AI Integration"
        year="2024"
        role="Creative Director & AI Strategist"
        medium="Branding, AI Integration, Education"
        video="/burketts-bees/1_looping_video_flowers_sway_in_a_light.mp4"
      />

      {/* ── MediaFrame: Product Shot ── */}
      <section className="video-intro-section" style={{ backgroundColor: '#F5F0EC', backgroundImage: 'url(/Medium-beige-darker-bg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', zIndex: 2, borderRadius: '24px 24px 0 0', boxShadow: '0 -8px 40px rgba(0,0,0,0.10)', paddingBottom: '140px' }}>

        <div className="video-intro-inner" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
          <Reveal>
            <MediaFrameCarousel />
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

      {/* ── Project Overview ── */}
      <CaseStudySection
        id="project-overview"
        sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
        style={{ paddingTop: '120px', paddingBottom: '0px' }}
      >
        <div className="project-overview-row" style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

          {/* Left: heading + body copy — 8 of 12 columns */}
          <div style={{ flex: '0 0 66.66%', minWidth: 0 }}>
            <Reveal delay={0}>
              <h2 className="font-heading cs-h2" style={{
                fontWeight:  700,
                fontSize:    '64px',
                lineHeight:  1.05,
                color:       '#101010',
                margin:      '0 0 28px',
              }}>The project</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body" style={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 300,
                fontSize:   '20px',
                lineHeight: 1.6,
                color:      '#404040',
                margin:     0,
              }}>
                Burkett's Bees started as a self-initiated AI branding experiment I worked on in 2023,
                when AI first became mainstream. I used a fictional honey brand to test how generative
                AI could support an actual creative workflow, from identity and packaging to mockups,
                social concepts, and internal discussion.
              </p>
            </Reveal>
          </div>

          {/* Right: bee doodle */}
          <div className="project-headphones-doodle" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/ELEMENTS/bumble-bee@2x.png"
              alt=""
              style={{ width: '220px', display: 'block', animation: 'float-strong 4s ease-in-out infinite' }}
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
          <h3 className="cs-mono" style={{
            fontFamily: 'Fira Mono, monospace',
            fontWeight: 400,
            fontSize:   '16px',
            lineHeight: 1.2,
            color:      '#101010',
            margin:     '0 0 20px',
          }}>What it became</h3>
        </Reveal>

        <div className="what-it-became-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            {
              num:   1,
              title: 'A concrete AI conversation',
              body:  'A fictional honey brand gave the team something real to critique, question, and learn from.',
            },
            {
              num:   2,
              title: 'A workflow testing ground',
              body:  'The project tested where AI could help across identity, packaging, mockups, copy, social, and presentation design.',
            },
            {
              num:   3,
              title: 'A new creative role',
              body:  'The experiment helped shape my eventual role as Art Director, AI Integration, focused on tools, education, and integration.',
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
                    backgroundColor: '#D2D7F5',
                    borderRadius:    '10px',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                  }}>
                    <span className="wib-badge-num" style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '24px', color: '#101010', lineHeight: 1 }}>{num}</span>
                  </div>
                  <h4 className="wib-title" style={{
                    fontFamily: 'Fraunces, serif',
                    fontWeight: 700,
                    fontSize:   '24px',
                    lineHeight: '24px',
                    color:      '#101010',
                    margin:     0,
                  }}>{title}</h4>
                </div>
                <p className="wib-body" style={{
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

      {/* ── It started with a muse ── */}
      <CaseStudySection id="how-it-started" style={{ paddingTop: '120px', paddingBottom: '120px' }}
        sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
        doodle={undefined}
      >
        <div className="how-it-started-row" style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>

          {/* Left: square image — 6 of 12 columns */}
          <div className="how-it-started-img-wrap" style={{ flex: '0 0 590px' }}>
            <Reveal>
              <div
                className="how-it-started-img"
                style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}
                onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
              >
                <img
                  src="/burketts-bees/4-Burketts-outsideA.jpg"
                  alt="Beehives outside the (add)ventures office"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </div>
            </Reveal>
          </div>

          {/* Right: text group, vertically centered */}
          <div className="how-it-started-text" style={{ flex: 1 }}>
            <Reveal delay={0}>
              <h2 className="font-body cs-h3" style={{
                fontWeight: 700,
                fontSize:   '33px',
                lineHeight: 1.2,
                color:      '#101010',
                margin:     '0 0 20px',
              }}>It started with a muse</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
                The brand may have been fictional, but the inspiration was not. I was inspired by
                the beehives outside the (add)ventures office and more importantly, Keith Burkett —
                a beloved, retired team member, who used to be the unofficial caretaker of the hives.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                He brought the warmth and craftsmanship I wanted the identity to carry, which made
                the spec project feel less random and more rooted in the agency itself. He would be
                the muse for the brand.
              </p>
            </Reveal>
          </div>

        </div>
      </CaseStudySection>

      {/* ── Project Purpose ── */}
      <ProjectPurpose />


      {/* ── Built With AI: SmallBoxRow ── */}
      <section id="built-with-ai" style={{
        backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        position:           'relative',
        zIndex:             2,
        paddingTop:         '140px',
        paddingBottom:      '140px',
      }}>

        {/* Top torn edge — #FFFBF8 tears down into the beige section */}
        <svg className="bb-torn-edge" viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,0 L1440,0 L1440,25 C1380,42 1320,42 1260,25 C1200,8 1140,8 1080,25 C1020,42 960,42 900,25 C840,8 780,8 720,25 C660,42 600,42 540,25 C480,8 420,8 360,25 C300,42 240,42 180,25 C120,8 60,8 0,25 Z" fill="#FFFBF8" />
        </svg>

        {/* Centered heading + body */}
        <Reveal>
          <div className="cs-inner carousel-heading-wrap" style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '1440px', margin: '0 auto 50px', padding: '0 80px', boxSizing: 'border-box' }}>
            <h3 className="font-body cs-h3" style={{
              fontWeight: 700,
              fontSize:   '33px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 16px',
            }}>Built with AI. Art Directed by Me</h3>
            <p className="cs-body" style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 300,
              fontSize:   '20px',
              lineHeight: 1.6,
              color:      '#404040',
              maxWidth:   '794px',
              margin:     '0 auto',
            }}>
              In 2023, AI design tools needed a lot of help. They were useful for getting to a
              visual direction faster, but the outputs were rarely finished brand assets. The toolkit
              still took a lot of manual work and cleaning up, but AI certainly helped me get to a
              concept I could work with, faster.
            </p>
          </div>
        </Reveal>

        {/* 4-box image row */}
        <div className="cs-inner" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <div className="toolkit-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                  <div style={{
                    width:           '283px',
                    height:          '305px',
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
          <div className="toolkit-dots" style={{ display: 'none' }}>
            {['Color', 'Lockup', 'Illustrations', 'Product photography'].map((_, i) => (
              <span key={i} className="char-photo-dot" />
            ))}
          </div>
        </div>

        {/* Bottom torn edge — #FFFBF8 tears up into the beige section */}
        <svg className="bb-torn-edge" viewBox="0 0 1440 50" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
          <path d="M0,25 C60,8 120,8 180,25 C240,42 300,42 360,25 C420,8 480,8 540,25 C600,42 660,42 720,25 C780,8 840,8 900,25 C960,42 1020,42 1080,25 C1140,8 1200,8 1260,25 C1320,42 1380,42 1440,25 L1440,50 L0,50 Z" fill="#FFFBF8" />
        </svg>

      </section>

      {/* ── Putting the Toolkit to Work ── */}
      <section id="putting-to-work" style={{ backgroundColor: '#FFFBF8', position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="cs-inner" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>

          {/* Heading + body + sun */}
          <Reveal>
            <div className="toolkit-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
              <div style={{ maxWidth: '794px' }}>
                <h2 className="font-body cs-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                  Putting the toolkit to work
                </h2>
                <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  Once I started applying the brand across different assets, AI's value became much
                  clearer. It could make early concepts visible enough for a team to discuss, critique,
                  and build on. Traditionally, that kind of ideation costs real time and money before a
                  single thing gets approved.
                </p>
              </div>
              <img className="toolkit-sun" src="/ELEMENTS/Sun@2x.png" alt="" style={{ width: '180px', flexShrink: 0, pointerEvents: 'none' }} />
            </div>
          </Reveal>

          <div className="use-cases-desktop-grid">
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
          </div>{/* /use-cases-desktop-grid */}

          {/* Mobile accordion — hidden on desktop */}
          <div className="use-cases-accordion">
            {USE_CASES.map((item, i) => (
              <div key={item.label} className="use-cases-acc-item">
                <button
                  className="use-cases-acc-trigger"
                  onClick={() => setActiveUseCase(activeUseCase === i ? null : i)}
                >
                  <span className="use-cases-acc-label">{item.label}</span>
                  <svg className={`use-cases-acc-caret${activeUseCase === i ? ' open' : ''}`}
                    width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 6L8 11L13 6" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className={`use-cases-acc-body${activeUseCase === i ? ' open' : ''}`}>
                  <img src={item.src} alt={item.alt} className="use-cases-acc-img" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── AI Assessment ── */}
      <AIAssessment />

      {/* ── Bee-hind the Scenes + Realistic Use Cases ── */}
      <section id="beehind-scenes" style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="cs-inner" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>

          {/* Row 1: heading + body left | presentation slides right */}
          <div className="beehind-row" style={{ display: 'flex', gap: '50px', alignItems: 'flex-start', marginBottom: '60px' }}>
            <div className="beehind-text" style={{ flex: '0 0 490px' }}>
              <Reveal>
                <h2 className="font-heading cs-h2" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.05, color: '#101010', margin: '0 0 20px' }}>
                  Bee-hind the scenes of working with AI
                </h2>
                <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  It was important that my team saw the weird AI-isms and behind-the-scenes work that it took to create the brand. I presented my findings with honesty. While AI's capabilities were impressive, the tool could also be frustrating and full of surprises.
                </p>
              </Reveal>
            </div>
            <div className="beehind-image" style={{ flex: 1, minWidth: 0 }}>
              <Reveal>
                <img
                  src="/burketts-bees/7_BeeHindScenes/7_BeeHindScenes1.png"
                  alt="Bee-hind the scenes presentation slides"
                  style={{ width: '100%', display: 'block' }}
                />
              </Reveal>
            </div>
          </div>

          {/* Row 2: mosaic image + caption left | text cols 8–11 */}
          <div className="concepts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '20px', alignItems: 'center' }}>
            <div className="concepts-image" style={{ gridColumn: '1 / 8' }}>
              <Reveal>
                <img
                  src="/burketts-bees/7_BeeHindScenes/7_BeeHindScenes2.jpg"
                  alt="Original AI-generated flower and bee pattern concepts"
                  style={{ width: '100%', display: 'block' }}
                />
                <p className="cs-mono" style={{
                  fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px',
                  lineHeight: 1.2, color: '#101010', margin: '12px 0 0',
                }}>
                  Original concepts from when I first started prompting flowers
                </p>
              </Reveal>
            </div>
            <div className="concepts-text" style={{ gridColumn: '8 / 12', paddingLeft: '97px' }}>
              <Reveal>
                <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  Even if the outputs were not production-ready, the early concepts still made it
                  easier to discuss direction, spot potential, and decide what was worth making or
                  editing ourselves.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Dashed section divider */}
          <div className="bb-section-divider" style={{ borderTop: '1px dashed #C4B8A8', margin: '80px 0' }} />

          {/* Realistic use cases */}
          <div className="use-cases-row" style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>

            {/* Left: heading + body */}
            <div className="use-cases-text" style={{ flex: '0 0 387px' }}>
              <Reveal>
                <h3 className="font-body cs-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                  Realistic use cases
                </h3>
                <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                  Working with Fortune 500 clients meant working inside strict brand systems. In that
                  reality, AI-generated creative was not always something we could use as a final asset.
                  The output often did not fit tightly enough within existing guidelines.
                </p>
                <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '20px 0 0' }}>
                  The question became: Where could AI make the process easier without making the work
                  feel cheaper?
                </p>
              </Reveal>
            </div>

            {/* Right: 2×2 card grid */}
            <div className="use-cases-cards" style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {[
                { n: 1, title: 'Creative exploration',      body: 'Generate early visual directions, thought-starters, and styles so the team could compare options before committing to one.' },
                { n: 2, title: 'RFPs & new business',       body: 'Build quick spec visuals that helped teams respond faster, shape a pitch, and make new business ideas easier to understand.' },
                { n: 3, title: 'Campaign & social concepts', body: 'Explore campaign ideas, post formats, content themes, and fast-moving social trends without investing too much time.' },
                { n: 4, title: 'Presentation buildout',     body: 'Use tools with built-in layouts and simple animations to make ideas easier to present, update, and hand off to non-designers.' },
              ].map(({ n, title, body }) => (
                <Reveal key={n} delay={(n - 1) * 100}>
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
                        flexShrink: 0, width: '60px', height: '60px',
                        backgroundColor: '#D2D7F5', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span className="wib-badge-num" style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '24px', color: '#101010', lineHeight: 1 }}>{n}</span>
                      </div>
                      <h4 className="wib-title" style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '24px', lineHeight: '24px', color: '#101010', margin: 0 }}>{title}</h4>
                    </div>
                    <p className="wib-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '16px', lineHeight: '160%', color: '#404040', margin: 0 }}>{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="use-cases-dots" style={{ display: 'none' }}>
              {[1, 2, 3, 4].map((_, i) => <span key={i} className="char-photo-dot" />)}
            </div>

          </div>

        </div>
      </section>

      {/* ── Tools ── */}
      <section id="tools-section" style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="cs-inner" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
        {/* Dashed separator — no paddingTop so the line sits flush at the section boundary */}
        <div className="bb-bottom-divider" style={{ borderTop: '1px dashed #C4B8A8', marginBottom: '80px' }} />

        <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '20px', alignItems: 'start' }}>

          {/* Left: heading + body + tag pills */}
          <div className="tools-text" style={{ gridColumn: '1 / 5', paddingRight: '30px' }}>
            <Reveal>
              <h2 className="font-body cs-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                Helping designers design, not design <em>for</em> them
              </h2>
              <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 32px' }}>
                Creative tools aren't just about image generation. I explored tools that could reduce
                tedious parts of the design process: organizing assets, naming layers, checking
                accessibility, supporting onboarding, managing brand assets, and speeding up
                production work.
              </p>
            </Reveal>
          </div>

          {/* Right: image grid — full-width top + two bottom */}
          <div className="tools-images" style={{ gridColumn: '5 / 13', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Reveal>
              <img
                src="/burketts-bees/8_tools-grid/8_Tools_Grid1.jpg"
                alt="Beyond Clutter website screenshot"
                style={{ width: '100%', display: 'block' }}
              />
            </Reveal>
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ height: '260px', overflow: 'hidden' }}>
                  <img
                    src="/burketts-bees/8_tools-grid/8_Tools_Grid2_BottomL.png"
                    alt="Figma AI workflow tools"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                </div>
                <div style={{ height: '260px', overflow: 'hidden' }}>
                  <img
                    src="/burketts-bees/8_tools-grid/8_Tools_Grid3_BottomRight.png"
                    alt="AI image tagging and recognition UI"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  />
                </div>
              </div>
            </Reveal>
          </div>

        </div>
        </div>
      </section>

      {/* ── AI Education + Integration (full-bleed split) ── */}
      <CaseSplitPanel
        id="ai-education"
        leftColor="#F5AF5A"
        rightColor="#EEEAE4"
        text="The project helped shift the conversation from abstract AI hype to practical creative workflows and became part of the foundation for my eventual role as Art Director, AI Integration."
        textColor="#101010"
        rightFullBleed
        rightHeightOffset={100}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <video
            src="/burketts-bees/9_addventuresbubbleplus.mp4"
            autoPlay muted loop playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 55%',
              display: 'block',
            }}
          />
        </div>
      </CaseSplitPanel>

      {/* ── The Role in Practice ── */}
      <section id="role-in-practice" style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="cs-inner" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <p className="cs-mono" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 400, fontSize: '16px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                A new role in the company
              </p>
              <h2 className="font-heading cs-h2" style={{ fontWeight: 700, fontSize: '64px', lineHeight: 1.05, color: '#101010', margin: '0 0 28px' }}>
                Art Director, AI Integration
              </h2>
              <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                What the role looked like in practice: I kept my art direction responsibilities while
                researching tools, testing workflows, leading discussions, and helping the team figure
                out what was useful, safe, and realistic for both internal and client work.
              </p>
            </div>
          </Reveal>

          {/* Scrolling ticker */}
          <div className="role-ticker-wrap" style={{ marginTop: '60px' }}>
            <TickerStrip duration={40} items={[
              'Monthly Workshops', 'Demos', 'One-on-one mentoring', 'Art Direction',
              'Ethics', 'Image Gen', 'Custom Models', 'Discussion',
              'Tool Testing', 'Guidelines & Guardrails', 'Compliance', 'New Business Support',
            ]} />
          </div>


        </div>
      </section>

      {/* ── Workshop Carousel ── */}
      <WorkshopCarousel />

      {/* ── Three C's + What Carried Forward ── */}
      <section id="three-cs" style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8', paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="cs-inner" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>

        {/* Testing AI against the Three C's — centered heading */}
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <h2 className="font-body cs-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 16px' }}>
              Testing AI against the &ldquo;Three C&rsquo;s&rdquo;
            </h2>
            <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              I developed a simple framework to evaluate AI tools against real agency needs — from presentation makers and image generators to plug-ins, internal GPTs and DAM capabilities.
            </p>
          </div>
        </Reveal>

        {/* Three cards */}
        <div className="three-cs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { num: 1, title: 'Collaboration', body: 'Does it help teams work better together? Can it speed up ideation, review and shared decision-making?' },
            { num: 2, title: 'Consistency',   body: 'Can it stay on brand and on brief across multiple outputs, formats and teams? Where do we lose cohesion?' },
            { num: 3, title: 'Compliance',    body: 'Can it be used safely within client, privacy, security and internal approval requirements?' },
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
                    backgroundColor: '#D2D7F5',
                    borderRadius:    '10px',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                  }}>
                    <span className="wib-badge-num" style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '24px', color: '#101010', lineHeight: 1 }}>{num}</span>
                  </div>
                  <h4 className="wib-title" style={{
                    fontFamily: 'Fraunces, serif',
                    fontWeight: 700,
                    fontSize:   '24px',
                    lineHeight: '24px',
                    color:      '#101010',
                    margin:     0,
                  }}>{title}</h4>
                </div>
                <p className="wib-body" style={{
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

        {/* Dashed divider */}
        <div className="bb-section-divider" style={{ borderTop: '1px dashed #C4B8A8', margin: '80px 0' }} />

        {/* What carried forward */}
        <div className="carried-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '40px', alignItems: 'center' }}>
          <div className="carried-text" style={{ gridColumn: '1 / 6' }}>
            <Reveal>
              <h2 className="font-body cs-h3" style={{ fontWeight: 700, fontSize: '33px', lineHeight: 1.2, color: '#101010', margin: '0 0 20px' }}>
                What carried forward
              </h2>
              <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
                The use cases I identified through Burkett&rsquo;s Bees ended up being the same places AI proved useful inside the agency: RFPs, notionals, pitch materials, social content, mockups and early creative exploration.
              </p>
              <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
                When (add)ventures later explored a new internal brand direction, AI-assisted collage became part of the visual identity.
              </p>
              <p className="cs-body" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
                AI may have replaced a few pricey stock photos, but it did not replace the people behind the craft. Designers still had to direct, edit, combine, refine and turn those pieces into usable brand assets.
              </p>
            </Reveal>
          </div>
          <div className="carried-image" style={{ gridColumn: '6 / 13' }}>
            <Reveal>
              <img
                src="/burketts-bees/10_what-carried-forward.jpg"
                alt="(add)ventures AI-assisted collage brand identity"
                style={{ width: '100%', display: 'block' }}
              />
            </Reveal>
          </div>
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

    </main>
    </DoodleEditContext.Provider>
  );
}
