import { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';
import CaseStudySection  from '../components/CaseStudySection';
import CaseStudyFullBleed from '../components/CaseStudyFullBleed';

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
        width:      '264px',
        flexShrink: 0,
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

// ── Image folder: /public/burketts-bees/ ──────────────────────────────────────
// 1_RawHoneyHero.jpg
// 2_RawHoney_ProductShot1.jpg
// 2_RawHoney_ProductShot2.jpg
// 3_carousel_flavors/
// 4_Burkett_Outside.png
// 5_carousel_toolit/
// 6_Mockups-usecases/
// 7_BeeHindScenes/
// 8_tools-grid/
// 9_addventuresbubbleplus.mp4
// 9_carousel_workshops/
// 10_what-carried-forward.jpg

const BAKED_EXTRAS = [];

export default function BurkettsBees() {
  const [doodleEditEnabled, setDoodleEditEnabled] = useState(false);
  const [doodlePositions, setDoodlePositions]     = useState({});
  const [extraDoodles, setExtraDoodles]           = useState([]);
  const [deletedDoodles, setDeletedDoodles]       = useState(new Set());

  const deleteDoodle        = (id) => setDeletedDoodles(prev => new Set([...prev, id]));
  const updateDoodlePosition = (id, pos) => setDoodlePositions(prev => ({ ...prev, [id]: pos }));

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
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFBF8', color: '#101010', overflowX: 'hidden' }}>
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

      {/* ── Sections go here ── */}

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
