import { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Cursor from '../components/Cursor';
import CaseStudyNav from '../components/CaseStudyNav';
import Footer from '../components/Footer';
import CaseStudySection  from '../components/CaseStudySection';
import CaseStudyFullBleed from '../components/CaseStudyFullBleed';
import StickyHero           from '../components/StickyHero';
import DashedCardCarousel   from '../components/DashedCardCarousel';

// ── Metadata label/value pair ─────────────────────────────────────────────────
function MetaItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '24px' }}>
      <span style={{
        fontFamily: 'Fira Mono, monospace',
        fontWeight: 400,
        fontSize:   '16px',
        lineHeight: 1.2,
        color:      '#101010',
        minWidth:   '72px',
        flexShrink: 0,
      }}>{label}</span>
      <span style={{
        fontFamily: 'Fira Mono, monospace',
        fontWeight: 400,
        fontSize:   '16px',
        lineHeight: 1.2,
        color:      '#101010',
        width:      '264px',
        flexShrink: 0,
      }}>{value}</span>
    </div>
  );
}

// ── Doodle shapes ────────────────────────────────────────────────────────────
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

const DOODLE_REGISTRY = [
  { id: 'hero-circle',           type: 'circle',   size: 76 },
  { id: 'howitstarted-squiggle', type: 'squiggle', size: 72 },
  { id: 'morefriends-circle',    type: 'circle',   size: 68 },
  { id: 'bloopers-circle',       type: 'circle',   size: 72 },
  { id: 'ltx-spiral',           type: 'spiral',   size: 82 },
  { id: 'principles-star',       type: 'star',     size: 60 },
  { id: 'rollcall-star',         type: 'star',     size: 64 },
  { id: 'rollcall-squiggle',     type: 'squiggle', size: 72 },
  { id: 'video-star',            type: 'star',     size: 68 },
];

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

const DoodleEditContext = createContext({ enabled: false, positions: {}, updatePosition: () => {}, deletedDoodles: new Set(), deleteDoodle: () => {} });

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
      const delta    = (me.clientX - startMX + me.clientY - startMY) / 2;
      const next     = Math.max(0.3, Math.min(6, startScale + delta / elSize));
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
        position:      'absolute',
        zIndex:        50,
        pointerEvents: 'all',
        cursor:        dragging ? 'grabbing' : 'grab',
        outline:       '1.5px dashed #818cf8',
        outlineOffset: '5px',
        userSelect:    'none',
        transformOrigin: 'top left',
        ...effectiveStyle,
      }}
    >
      {children}
      <div style={{
        position: 'absolute', top: '-20px', left: 0,
        display: 'flex', alignItems: 'center', gap: '4px',
        pointerEvents: 'all',
      }}>
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
      {/* Resize handle — bottom-right corner */}
      <div
        onMouseDown={handleResizeDown}
        style={{
          position:  'absolute',
          bottom:    '-7px',
          right:     '-7px',
          width:     '13px',
          height:    '13px',
          background: 'white',
          border:    '2px solid #818cf8',
          borderRadius: '3px',
          cursor:    'nwse-resize',
          zIndex:    1,
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
      {/* Resize handle — bottom-right corner */}
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

  const panelStyle = {
    position: 'fixed', bottom: '72px', right: '16px', width: '268px',
    maxHeight: '480px', overflowY: 'auto',
    background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px',
    padding: '14px', boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
    zIndex: 9999, fontFamily: 'Fira Mono, monospace', fontSize: '11px', lineHeight: 1.5,
  };

  return (
    <div style={panelStyle}>
      <div style={{ fontWeight: 700, fontSize: '12px', color: '#101010', marginBottom: '10px' }}>✦ Doodle Editor</div>

      {/* Moved doodles */}
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

      {/* Extra / duplicated doodles */}
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

      {/* Duplicate any shape */}
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

// ── But first, a storyboard ───────────────────────────────────────────────────
function HowItStarted() {
  return (
    <CaseStudySection id="how-it-started" style={{ paddingTop: '80px', paddingBottom: '120px' }}
      sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
      doodle={undefined}
    >
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>

        {/* Left: square image — 6 of 12 columns */}
        <Reveal style={{ flex: '0 0 590px' }}>
          <div
            style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}
            onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
          >
            <img
              src="/rules-we-made-up/3-how-it-started/Storyboard 1.jpg"
              alt="Storyboard planning documents"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
          </div>
        </Reveal>

        {/* Right: text group, vertically centered */}
        <div style={{ flex: 1 }}>
          <Reveal delay={0}>
            <h2 className="font-body" style={{
              fontWeight: 700,
              fontSize:   '33px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 20px',
            }}>It started with a storyboard</h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
              Before touching animation, I needed a map. I adapted the poem into lyrics, built the
              song in Suno, and used the final track as my runtime. Once I had the song (80
              generations later), I storyboarded the film scene by scene.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 32px' }}>
              That storyboard gave the project a spine. It was the thing I came back to whenever
              the tools got too shiny, too chaotic, or too far from the point.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p style={{
              fontFamily: 'Fira Mono, monospace',
              fontWeight: 400,
              fontSize:   '16px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 10px',
            }}>Wanna make a song yourself?</p>
            <a
              href="https://open.substack.com/pub/crankthatnat/p/how-we-turned-our-substack-brands?r=5v51sb&utm_campaign=post-expanded-share&utm_medium=web"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:     'Fraunces, serif',
                fontWeight:     400,
                fontSize:       '18px',
                lineHeight:     1.4,
                color:          '#101010',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                cursor:         'pointer',
              }}
            >
              Read more about my Suno Songwriting process here
            </a>
          </Reveal>
        </div>

      </div>
    </CaseStudySection>
  );
}

// ── Character Creation ────────────────────────────────────────────────────────
const slides = [
  {
    img:  '/rules-we-made-up/4-character-creation/1-nat-claymation.jpg',
    copy: 'Placeholder copy for slide 1. Describe this character iteration here.',
  },
  {
    img:  '/rules-we-made-up/4-character-creation/2-nat-claymation.jpg',
    copy: 'Placeholder copy for slide 2. Describe this character iteration here.',
  },
  {
    img:  '/rules-we-made-up/4-character-creation/3-nat-claymation.jpg',
    copy: 'Placeholder copy for slide 3. Describe this character iteration here.',
  },
  {
    img:  '/rules-we-made-up/4-character-creation/4-nat-claymation.jpg',
    copy: 'Many iterations later, I found her. I locked in my brand color palette on her clothing, and added fox ears as a visual thread — to recognize her as the same character as she ages.\n\nHigh quality polymer clay render, stop-motion aesthetic, hand-made texture.',
  },
  {
    img:  '/rules-we-made-up/4-character-creation/5-nat-claymation.jpg',
    copy: 'Placeholder copy for slide 5. Describe this character iteration here.',
  },
];

const cardRotations = [-2, 3, -4, 1.5, -3];

function CharacterCreation() {
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

  const n = slides.length;

  const go = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (dir === 'next') {
      setFlyingOut(true);
      setTimeout(() => {
        setFlyingOut(false);
        setIndex(i => (i + 1) % n);
      }, 400);
      setTimeout(() => setIsAnimating(false), 450);
    } else {
      // Change index immediately — old front card steps back smoothly via its
      // pos=1 transition; new front card enters from the right via CSS keyframe.
      setIndex(i => (i - 1 + n) % n);
      setEnteringPrev(true);
      setTimeout(() => {
        setEnteringPrev(false);
        setIsAnimating(false);
      }, 450);
    }
  };

  // Per-slide card styles — each slide has a persistent DOM node
  const getCardStyle = (si) => {
    const pos = (si - index + n) % n; // 0=front, 1=back1, 2=back2, 3+=hidden
    const rot = cardRotations[si];

    if (pos === 0) {
      // Prev: new front card slides in from the right via CSS keyframe animation.
      // We can't use a transition here because the card was hidden (transition:none).
      if (enteringPrev) {
        return {
          position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
          zIndex: 3,
          animation: 'card-enter-right 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          '--rot': `${rot}deg`,
          boxShadow: '0px 12px 32px rgba(0,0,0,0.18)',
        };
      }
      return {
        position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
        zIndex:     3,
        transform:  flyingOut ? `translateX(120%) rotate(${rot + 15}deg)` : `rotate(${rot}deg)`,
        opacity:    flyingOut ? 0 : 1,
        boxShadow:  '0px 12px 32px rgba(0,0,0,0.18)',
        transition: 'transform 0.4s ease-in, opacity 0.3s ease-in',
      };
    }
    if (pos === 1) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     2,
      transform:  flyingOut ? `rotate(${rot}deg)` : `rotate(${rot}deg) translate(6px, 8px)`,
      opacity:    1,
      boxShadow:  '-4px 6px 18px rgba(0,0,0,0.12)',
      transition: 'transform 0.4s ease-out',
    };
    if (pos === 2) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     1,
      transform:  flyingOut ? `rotate(${rot}deg) translate(6px, 8px)` : `rotate(${rot}deg) translate(-8px, 14px)`,
      opacity:    1,
      boxShadow:  '-8px 8px 24px rgba(0,0,0,0.12)',
      transition: 'transform 0.4s ease-out',
    };
    return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     0,
      transform:  `rotate(${rot}deg) translate(-8px, 14px)`,
      opacity:    0,
      boxShadow:  'none',
      transition: 'none',
    };
  };

  const ArrowBtn = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        width:          '44px',
        height:         '44px',
        borderRadius:   '50%',
        border:         '1.5px solid rgba(0,0,0,0.3)',
        background:     'none',
        color:          '#101010',
        fontSize:       '18px',
        cursor:         isAnimating ? 'default' : 'pointer',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        transition:     'border-color 0.2s ease',
        flexShrink:     0,
        opacity:        isAnimating ? 0.4 : 1,
      }}
      onMouseEnter={e => { if (!isAnimating) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.6)'; }}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'}
    >
      {children}
    </button>
  );

  return (
    <CaseStudySection id="characters" style={{ paddingTop: '80px', paddingBottom: '120px' }}
      doodle={undefined}
    >
      <div
        ref={contentRef}
        style={{
          display:         'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          columnGap:       '20px',
          alignItems:      'center',
          transform:       'scale(0.96)',
          opacity:         0,
          transition:      'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'center center',
        }}
      >

        {/* ── Left: collage image + heading + text (cols 1–5) ── */}
        <div style={{ gridColumn: '1 / 6' }}>
          <Reveal delay={0}>
            <div
              style={{ width: '284px', height: '284px', overflow: 'hidden', boxShadow: '0px 4px 20px rgba(0,0,0,0.12)', marginBottom: '50px' }}
              onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <img
                src="/rules-we-made-up/4-character-creation/collage-nat-photos.jpg"
                alt="Childhood reference photos"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
            </div>
          </Reveal>
          <Reveal delay={0}>
            <h2 className="font-body" style={{
              fontWeight: 700,
              fontSize:   '33px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 20px',
            }}>Building the cast</h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
              I started with the main character (me!) because the whole film depended on her
              feeling specific. I used old photos of myself as a kid as reference, and developed
              her in Nano Banana, with all my favorite outfits throughout the years.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
              The goal was not a perfect likeness to myself (I don't really have fox ears), but
              recognition as the timeline progressed. Once I had her down, I began building out
              the rest of the crew.
            </p>
          </Reveal>
        </div>

        {/* ── Star doodle in the gap (col 6) ── */}
        <div style={{ gridColumn: '6 / 7', alignSelf: 'flex-start', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '106px', transform: 'translateX(-100px)' }}>
          <img
            src="/ELEMENTS/Yellow Star_.png"
            alt=""
            style={{ width: '72px', display: 'block', pointerEvents: 'none', animation: 'spin-planet 10s linear infinite', transformOrigin: 'center' }}
          />
        </div>

        {/* ── Right: card stack + arrows (cols 7–12) ── */}
        <Reveal delay={0} style={{ gridColumn: '7 / 13', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

          {/* Stack container */}
          <div style={{ position: 'relative', width: '622px', height: '763px' }}>
            {slides.map((s, si) => {
              const base = getCardStyle(si);
              return (
                <div key={si} style={base}>
                  <img
                    src={s.img}
                    alt={`Character slide ${si + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Label + arrows */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Fira Mono, monospace',
              fontWeight: 400,
              fontSize:   '16px',
              lineHeight: 1.2,
              color:      '#101010',
            }}>flip through the deck</span>
            <ArrowBtn onClick={() => go('prev')}>←</ArrowBtn>
            <ArrowBtn onClick={() => go('next')}>→</ArrowBtn>
          </div>
        </Reveal>

      </div>
    </CaseStudySection>
  );
}

// ── More Friends ─────────────────────────────────────────────────────────────
const friends = [
  { file: 'Piggie', label: 'Jim'             },
  { file: 'wizard', label: 'Will'             },
  { file: 'Mom',    label: 'Mom'             },
  { file: 'Piper',  label: 'Piper'           },
  { file: 'Tom',    label: 'Tom'             },
];

function MoreFriends() {
  const [hovered, setHovered] = useState(null);
  return (
    <CaseStudySection style={{ paddingLeft: '120px', paddingRight: '120px', paddingTop: '80px', paddingBottom: '120px' }}
      doodle={undefined}
    >
      <Reveal delay={0}>
        <p style={{
          fontFamily:   'Fira Mono, monospace',
          fontWeight:   400,
          fontSize:     '16px',
          lineHeight:   1.2,
          color:        '#101010',
          textAlign:    'center',
          marginBottom: '40px',
        }}>More friends and family</p>
      </Reveal>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
        {friends.map(({ file, label }, i) => (
          <Reveal key={file} delay={100 + i * 90} distance={32} style={{ flexShrink: 0, width: '205px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width:        '205px',
                height:       '205px',
                borderRadius: '50%',
                overflow:     'hidden',
                transform:    hovered === file ? 'translateY(-8px)' : 'translateY(0px)',
                transition:   'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor:       'pointer',
                flexShrink:   0,
                boxShadow:    '0 4px 24px rgba(0,0,0,0.10)',
              }}
              onMouseEnter={() => setHovered(file)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={`/rules-we-made-up/6-family/${file}.png`}
                alt={label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Name below circle */}
            <span style={{
              fontFamily:    'Fira Mono, monospace',
              fontWeight:    400,
              fontSize:      '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#101010',
              textAlign:     'center',
              transition:    'opacity 0.25s ease, transform 0.25s ease',
              height:        '16px',
            }}>{label}</span>
          </Reveal>
        ))}
      </div>
    </CaseStudySection>
  );
}

// ── Mushroom Friend ───────────────────────────────────────────────────────────
const MUSHROOM_TEXT = "The Mushroom Friend is creativity — the kind you had as a kid, before self-doubt got in the way. The kind that rescues you later.\n\nMushrooms are the earth's greatest underground connectors, linking forests invisibly. Creativity flows the same way.";

function MushroomFriend() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const [typed, setTyped]       = useState('');
  const [started, setStarted]   = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el  = sectionRef.current;
      const vid = videoRef.current;
      if (!el || !vid) return;
      const rect     = el.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
      const offset   = progress * 80;
      vid.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!started || typed.length >= MUSHROOM_TEXT.length) return;
    const t = setTimeout(() => setTyped(MUSHROOM_TEXT.slice(0, typed.length + 1)), 55);
    return () => clearTimeout(t);
  }, [started, typed]);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  const paragraphs = typed.split('\n\n');
  const done = typed.length >= MUSHROOM_TEXT.length;
  const textStyle = {
    fontFamily: 'Fira Mono, monospace',
    fontWeight: 400,
    fontSize:   '22px',
    lineHeight: 1.8,
    color:      '#ffffff',
    margin:     0,
    whiteSpace: 'pre-wrap',
  };

  return (
    <section id="mushroom-friend" ref={sectionRef} style={{ display: 'flex', width: '100%', height: '800px', position: 'relative', zIndex: 2, backgroundColor: '#FFFBF8' }}>

      {/* Left — red panel with typewriter text */}
      <div style={{
        flex:            '0 0 50%',
        backgroundColor: '#C2311E',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '80px 80px 120px',
        boxSizing:       'border-box',
        overflow:        'hidden',
      }}>
        {/* Relative wrapper: invisible full text holds height; typed text overlays it */}
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Invisible placeholder — establishes full height so centering never shifts */}
          <div aria-hidden="true" style={{ opacity: 0, pointerEvents: 'none' }}>
            {MUSHROOM_TEXT.split('\n\n').map((p, i, arr) => (
              <p key={i} style={{ ...textStyle, marginBottom: i < arr.length - 1 ? '32px' : 0 }}>{p}</p>
            ))}
          </div>
          {/* Visible typed text */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ ...textStyle, marginBottom: i < paragraphs.length - 1 ? '32px' : 0 }}>
                {p}
                {i === paragraphs.length - 1 && !done && (
                  <span style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 0.1s', borderRight: '2px solid #fff', marginLeft: '2px' }}>&nbsp;</span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right — looping video, parallax */}
      <div style={{ flex: '0 0 50%', position: 'relative', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          style={{ position: 'absolute', left: 0, right: 0, top: '-15%', width: '100%', height: '130%', objectFit: 'cover', objectPosition: 'center top', willChange: 'transform' }}
        >
          <source src="/rules-we-made-up/5-mushroom-friend/Mushroom Dance.mp4" type="video/mp4" />
        </video>
      </div>

    </section>
  );
}

// ── Filmmaking Principles ─────────────────────────────────────────────────────
const principles = [
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/mix-your-shots.jpg',
    title: 'Mix Your Shots',
    body:  'Think like a director. Establishing shots orient. Close-ups create intimacy. Low angles create power. Learn a handful of camera terms and use them in your prompts — AI responds well. And when AI can\'t execute a transition, do it manually. That\'s not wasted time. It\'s what gives you options.',
  },
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/insert-yourself.jpg',
    title: 'Insert Yourself into the Film',
    body:  'Ask: what makes this film mine? My character wore the outfits I loved in my twenties. There\'s maple syrup on the kitchen table because we always had it growing up. Nobody else would make those connections. That\'s exactly why they\'re there.',
    crop:  'left',
  },
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/direct-for-consistency.jpg',
    title: 'Direct for Consistency & Continuity',
    body:  'Consistency — same character, same style across every shot — is only the baseline. What matters more is continuity: the connective tissue between scenes. The viewer may not notice it, but they need to feel the world keeps moving even when the camera isn\'t watching.',
  },
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/prompt-with-emotion.jpg',
    title: 'Prompt with Emotion',
    body:  'AI will give you expressive faces if you ask. But the moments that hit harder are the subtler ones — a hand appearing from outside the frame, a quick glance between characters, a camera shake to evoke disorientation. Give the tool a vibe instead of an expression.',
  },
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/generate-short-ruthlessly.jpg',
    title: 'Generate Short. Edit Ruthlessly.',
    body:  'Go scene by scene. The tool will get it wrong — but the output is raw footage, not a final product. What you do in post — the cuts, the transitions, the sound design — that\'s your eye, your timing, your judgment. That\'s what creates the story.',
  },
];

function BlooperReel() {
  return (
    <CaseStudySection style={{ paddingTop: '80px', paddingBottom: '120px' }}
      doodle={
        <>
          <div data-dev-id="burst-blooper-left" data-dev-type="doodle"
            style={{ position: 'absolute', top: '40px', left: '20px', width: '160px', zIndex: 0, transform: 'translate(69px, -285px) scale(1.247)', transformOrigin: 'top left' }}>
            <img src="/ELEMENTS/White Burst.png" alt="" style={{ width: '100%', display: 'block', pointerEvents: 'none', animation: 'spin-planet 14s linear infinite', transformOrigin: 'center' }} />
          </div>
          <div data-dev-id="burst-blooper-right" data-dev-type="doodle"
            style={{ position: 'absolute', bottom: '40px', right: '20px', width: '160px', zIndex: 0, transform: 'translate(-32px, -294px) scale(1)', transformOrigin: 'top left' }}>
            <img src="/ELEMENTS/White Burst.png" alt="" style={{ width: '100%', display: 'block', pointerEvents: 'none', animation: 'spin-planet 20s linear infinite', transformOrigin: 'center' }} />
          </div>
        </>
      }
    >

      <Reveal delay={0}>
        <h2 className="font-body" style={{
          fontWeight:  600,
          fontSize:    '33px',
          lineHeight:  1.2,
          color:       '#101010',
          textAlign:   'center',
          margin:      '0 0 12px',
        }}>
          How it ended: With a Blooper Reel
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <p style={{
          fontFamily: 'Fraunces, serif',
          fontWeight: 300,
          fontSize:   '20px',
          lineHeight: 1.6,
          color:      '#404040',
          textAlign:  'center',
          margin:     '0 0 48px',
        }}>
          Every film deserves one. This says more about the process than the final cut does.
        </p>
      </Reveal>

      <Reveal delay={200}>
      <div style={{ position: 'relative', overflow: 'hidden', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <iframe
            src="https://player.vimeo.com/video/1193427742?badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="Outtakes - Rules We Made Up"
          />
        </div>
      </div>
      </Reveal>

    </CaseStudySection>
  );
}

function TheTool() {
  const ltxRef  = useRef(null);
  const MAX_TILT = 12;

  const handleTiltMove = (e) => {
    const el = ltxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const y = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    el.style.transition = 'transform 0.1s ease';
    el.style.transform  = `perspective(1000px) rotateX(${-y * MAX_TILT}deg) rotateY(${x * MAX_TILT}deg)`;
  };

  const handleTiltLeave = () => {
    const el = ltxRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.6s ease';
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <CaseStudySection id="ltx-studio" style={{ paddingTop: '80px', paddingBottom: '120px' }}
      doodle={undefined}
    >
      <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>

        {/* Left — text */}
        <div style={{ flex: '0 0 30%' }}>
          <Reveal delay={0}>
            <h2 className="font-body" style={{
              fontWeight: 700,
              fontSize:   '33px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 12px',
            }}>
              LTX Studio
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 300,
              fontSize:   '20px',
              lineHeight: 1.6,
              color:      '#404040',
              margin:     '0 0 20px',
            }}>
              I chose LTX Studio for its built-in storyboarding feature — for a 3-minute film, I needed something that could hold the full sequence together. I learned quickly that uploading everything at once was an expensive mistake. Going scene by scene, slower, was faster in the end.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p style={{
              fontFamily: 'Fira Mono, monospace',
              fontWeight: 400,
              fontSize:   '16px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 10px',
            }}>Want to learn more about LTX Studio?</p>
            <a
              href="https://crankthatnat.substack.com/p/i-built-a-short-film-in-ltx-studio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:          'Fraunces, serif',
                fontWeight:          400,
                fontSize:            '18px',
                lineHeight:          1.4,
                color:               '#101010',
                textDecoration:      'underline',
                textUnderlineOffset: '3px',
                cursor:              'pointer',
              }}
            >
              Get my thoughts on it here
            </a>
          </Reveal>
        </div>

        {/* Right — screenshot + caption with 3D tilt */}
        <Reveal delay={0} style={{ flex: 1, width: 'auto', minWidth: 0 }}>
          <div
            ref={ltxRef}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            style={{ display: 'block', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)' }}
          >
            <img
              src="/rules-we-made-up/9-the-tool/LTX.jpg"
              alt="LTX Studio interface"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
            {['Elements', 'Editor', 'Character consistency'].map(label => (
              <span key={label} style={{
                fontFamily: 'Fira Mono, monospace',
                fontWeight: 400,
                fontSize:   '16px',
                lineHeight: 1.2,
                color:      '#101010',
              }}>{label}</span>
            ))}
          </div>
        </Reveal>

      </div>
    </CaseStudySection>
  );
}

function FilmmakingPrinciples() {
  return (
    <>
      <CaseStudyFullBleed id="principles" background="#FFFBF8" sectionStyle={{ overflowX: 'clip' }} style={{ paddingTop: '80px', paddingBottom: '10px', textAlign: 'center' }}
        doodle={
          <div data-dev-id="burst-principles-left" data-dev-type="doodle"
            style={{ position: 'absolute', top: '80px', left: '20px', width: '160px', zIndex: 0, transform: 'translate(-72px, -39px) scale(0.891)', transformOrigin: 'top left' }}>
            <img src="/ELEMENTS/White Burst.png" alt="" style={{ width: '100%', display: 'block', pointerEvents: 'none', animation: 'spin-planet 18s linear infinite', transformOrigin: 'center' }} />
          </div>
        }
      >
        <Reveal>
          <h2 className="font-heading" style={{
            fontWeight: 700,
            fontSize:   '64px',
            lineHeight: 1.05,
            color:      '#101010',
            margin:     '0 0 16px',
          }}>What I learned</h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 300,
            fontSize:   '20px',
            lineHeight: 1.6,
            color:      '#404040',
            margin:     '0 auto',
            maxWidth:   '560px',
          }}>
            Six things I learned making an animated short with AI — things I'd tell anyone starting out.
          </p>
        </Reveal>
      </CaseStudyFullBleed>

      {/* Carousel */}
      <div style={{ backgroundColor: '#FFFBF8', paddingBottom: '80px', position: 'relative', zIndex: 2 }}>
        <DashedCardCarousel items={principles} />
      </div>
    </>
  );
}

// ── Roll Call ─────────────────────────────────────────────────────────────────
const festivalImages = [
  { src: '1-CREDITS_DALLAS.jpg',  alt: 'Dallas'  },
  { src: '2-CREDITS_Alyssa.jpg',  alt: 'Alyssa'  },
  { src: '3-CREDITS_Anna.jpg',    alt: 'Anna'    },
  { src: '4-CREDITS_RECLAIM.jpg', alt: 'Reclaim' },
  { src: '5-CREDITS_TOM.jpg',     alt: 'Tom'     },
];

// ── Scene Creation ───────────────────────────────────────────────────────────
const sceneSlides = [
  '/rules-we-made-up/7a-scenes/Snapshot_5.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_6.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_7.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_9.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_22.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_10.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_11.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_12.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_13.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_14.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_15.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_16.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_17.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_18.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_19.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_20.jpg',
  '/rules-we-made-up/7a-scenes/Snapshot_21.jpg',
];

function SceneCreation() {
  const [current, setCurrent] = useState(0);
  const n = sceneSlides.length;
  const prev = () => setCurrent(i => (i - 1 + n) % n);
  const next = () => setCurrent(i => (i + 1) % n);

  const ArrowBtn = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: '1.5px solid rgba(0,0,0,0.3)', background: 'none',
        color: '#101010', fontSize: '18px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.2s ease', flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.6)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'; }}
    >
      {children}
    </button>
  );

  return (
    <CaseStudySection
      id="scene-creation"
      style={{ paddingTop: '80px', paddingBottom: '120px', textAlign: 'center' }}
      doodle={
        <>
          {/* Saturn — upper right, outside content margins */}
          <div
            data-dev-id="saturn"
            data-dev-type="doodle"
            style={{ position: 'absolute', top: '60px', right: '40px', width: '110px', zIndex: 3, transform: 'translate(-224px, 22px) scale(1.227)', transformOrigin: 'top left' }}
          >
            <img src="/ELEMENTS/Yellow Satrun.png" alt="" style={{ width: '100%', display: 'block', pointerEvents: 'none', animation: 'float 4s ease-in-out infinite' }} />
          </div>
        </>
      }
    >
      {/* Heading */}
      <Reveal delay={0}>
        <h2 className="font-body" style={{
          fontWeight:   700,
          fontSize:     '33px',
          lineHeight:   1.2,
          color:        '#101010',
          margin:       '0 0 20px',
        }}>Scene creation</h2>
      </Reveal>

      {/* Body copy */}
      <Reveal delay={100}>
        <p style={{
          fontFamily: 'Fraunces, serif',
          fontWeight: 300,
          fontSize:   '20px',
          lineHeight: 1.6,
          color:      '#404040',
          maxWidth:   '590px',
          margin:     '0 auto 40px',
        }}>
          I started developing my scenes according to my storyboard. Each scene had to feel
          like a world — built from color, light, and the kind of detail only I would notice.
          It was an act of patience.
        </p>
      </Reveal>

      {/* Carousel */}
      <div style={{ position: 'relative' }}>
        {/* Left arrow */}
        <div style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
          <ArrowBtn onClick={prev}>←</ArrowBtn>
        </div>

        {/* Slide viewport */}
        <div style={{ overflow: 'hidden', borderRadius: '16px', width: '100%' }}>
          <div style={{ display: 'flex', transform: `translateX(-${current * 100}%)`, transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            {sceneSlides.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Scene ${i + 1}`}
                style={{ width: '100%', flexShrink: 0, display: 'block', objectFit: 'cover', aspectRatio: '16 / 9' }}
              />
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <div style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
          <ArrowBtn onClick={next}>→</ArrowBtn>
        </div>
      </div>

      {/* Fira Mono caption */}
      <p style={{
        fontFamily: 'Fira Mono, monospace',
        fontWeight: 400,
        fontSize:   '16px',
        lineHeight: 1.2,
        color:      '#101010',
        margin:     '24px 0 12px',
      }}>
        Scene {current + 1} of {n}
      </p>

      {/* Pagination pills */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
        {sceneSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width:        i === current ? '28px' : '8px',
              height:       '8px',
              borderRadius: '4px',
              background:   i === current ? '#101010' : 'rgba(0,0,0,0.2)',
              border:       'none',
              cursor:       'pointer',
              padding:      0,
              transition:   'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </CaseStudySection>
  );
}

function RollCall() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [familyOpen, setFamilyOpen] = useState(false);
  const n = festivalImages.length;
  const phoneRef = useRef(null);
  const MAX_TILT = 12;

  const handleTiltMove = (e) => {
    const el = phoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const y = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    el.style.transition = 'transform 0.1s ease';
    el.style.transform  = `perspective(1000px) rotateX(${-y * MAX_TILT}deg) rotateY(${x * MAX_TILT}deg)`;
  };

  const handleTiltLeave = () => {
    const el = phoneRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.6s ease';
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const body = {
    fontFamily: 'Fraunces, serif',
    fontWeight: 300,
    fontSize:   '20px',
    lineHeight: 1.6,
    color:      '#404040',
    margin:     '0 0 20px',
  };

  return (
    <>
      <CaseStudySection
        id="roll-call"
        style={{ paddingTop: '80px', paddingBottom: '120px' }}
      >
        <div style={{ display: 'flex', gap: '222px', alignItems: 'center' }}>

          {/* Left — phone mockup 488px wide */}
          <Reveal delay={0} style={{ flexShrink: 0, width: 'auto' }}>
            <div
              ref={phoneRef}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              style={{ display: 'inline-block', borderRadius: '30px', boxShadow: '4px 4px 90px 0px rgba(0,0,0,0.10)' }}
            >
              <img
                src="/rules-we-made-up/7-roll-call/Roll-call-mockup.png"
                alt="Substack roll call post on phone"
                style={{ width: '488px', height: 'auto', display: 'block', borderRadius: '30px' }}
              />
            </div>
          </Reveal>

          {/* Right — heading + body + image, starts at x=710 */}
          <div style={{ width: '488px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Reveal delay={0}>
              <h2 className="font-body" style={{
                fontWeight: 700,
                fontSize:   '33px',
                lineHeight: 1.2,
                color:      '#101010',
                margin:     0,
                maxWidth:   '488px',
              }}>
                Inviting the Substack community into the film
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ ...body, maxWidth: '488px', margin: 0 }}>
                My film had a festival scene near the end — about 30 seconds of runtime — and I needed
                a crowd. That's when I invited my Substack community to make themselves a claymation
                character and I'd put them in the film. I provided the prompt, and eighteen people showed up.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p style={{ ...body, maxWidth: '488px', margin: 0 }}>
                I divided all the characters into groups by scene so I could animate each cluster
                separately and control the lighting as the night progressed.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <img
                src="/rules-we-made-up/7-roll-call/SupportingCast-groups.png"
                alt="Supporting cast character groups"
                style={{ width: '488px', display: 'block' }}
              />
            </Reveal>
          </div>

        </div>
      </CaseStudySection>

      <CaseStudyFullBleed
        background="#F5F0EC"
        sectionStyle={{
          backgroundImage:    'url(/Medium-beige-darker-bg2.jpg)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
        }}
        doodle={
          <>
            {/* Top torn edge — #FFFBF8 tears down into the beige section */}
            <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
              <path d="M0,0 L0,28 L48,6 L95,35 L148,8 L200,38 L260,4 L315,32 L370,15 L425,40 L480,10 L535,34 L595,18 L650,42 L710,6 L765,28 L820,10 L875,38 L930,14 L985,40 L1040,5 L1095,30 L1150,12 L1210,38 L1270,8 L1330,32 L1390,15 L1440,25 L1440,0 Z" fill="#FFFBF8" />
            </svg>
            {/* Bottom torn edge — #FFFBF8 tears up into the beige section */}
            <svg viewBox="0 0 1440 50" preserveAspectRatio="none"
              style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}>
              <path d="M0,50 L0,22 L55,45 L110,18 L168,44 L225,10 L280,38 L335,20 L390,46 L445,12 L500,40 L558,8 L615,36 L675,22 L735,48 L792,10 L845,38 L900,18 L958,44 L1015,6 L1070,34 L1128,16 L1185,42 L1245,8 L1300,36 L1360,20 L1440,38 L1440,50 Z" fill="#FFFBF8" />
            </svg>
          </>
        }
      >

        {/* Fira Mono label above family photo */}
        <Reveal delay={0}>
          <p style={{
            fontFamily: 'Fira Mono, monospace',
            fontWeight: 400,
            fontSize:   '16px',
            lineHeight: 1.2,
            color:      '#101010',
            margin:     '0 0 12px',
          }}>Generated "Family Photo" / in Nano Banana</p>
        </Reveal>

        {/* Family photo — full width within section padding */}
        <Reveal delay={100}>
          <div
            onClick={() => setFamilyOpen(true)}
            style={{ cursor: 'pointer', overflow: 'hidden' }}
            onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
          >
            <img
              src="/rules-we-made-up/7-roll-call/GENERATED FAMILY PHOTO 1.jpg"
              alt="The full cast of claymation characters"
              style={{ width: '100%', display: 'block', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)', transformOrigin: 'center center' }}
            />
          </div>
        </Reveal>

        {/* Family photo lightbox */}
        {familyOpen && (
          <div
            onClick={() => setFamilyOpen(false)}
            style={{
              position:        'fixed',
              inset:           0,
              backgroundColor: 'rgba(0,0,0,0.88)',
              zIndex:          1000,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}
          >
            <img
              src="/rules-we-made-up/7-roll-call/GENERATED FAMILY PHOTO 1.jpg"
              alt="The full cast of claymation characters"
              onClick={e => e.stopPropagation()}
              style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }}
            />
            <button
              onClick={() => setFamilyOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer', lineHeight: 1 }}
            >×</button>
          </div>
        )}

        {/* Five festival stills */}
        <Reveal delay={100}>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            {festivalImages.map(({ src, alt }, i) => (
              <div
                key={src}
                style={{ flex: 1, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
                onClick={() => setLightboxIdx(i)}
              >
                <img
                  src={`/rules-we-made-up/7-roll-call/${src}`}
                  alt={alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 300,
            fontSize:   '20px',
            lineHeight: 1.6,
            color:      '#404040',
            margin:     '32px auto 0',
            maxWidth:   '620px',
            textAlign:  'center',
          }}>
            From there, it was up to me to put all my characters in scene. They brought specific details: a key necklace, a leather bag, a flamingo. Details I wasn't willing to loose. It was the most challenging part of the project and by far, the most rewarding.
          </p>
        </Reveal>

        {/* Festival stills lightbox */}
        {lightboxIdx !== null && (
          <div
            onClick={() => setLightboxIdx(null)}
            style={{
              position:        'fixed',
              inset:           0,
              backgroundColor: 'rgba(0,0,0,0.88)',
              zIndex:          1000,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}
          >
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + n) % n); }}
              style={{ position: 'absolute', left: '32px', background: 'none', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >←</button>
            <img
              src={`/rules-we-made-up/7-roll-call/${festivalImages[lightboxIdx].src}`}
              alt={festivalImages[lightboxIdx].alt}
              onClick={e => e.stopPropagation()}
              style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }}
            />
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % n); }}
              style={{ position: 'absolute', right: '32px', background: 'none', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >→</button>
            <button
              onClick={() => setLightboxIdx(null)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer', lineHeight: 1 }}
            >×</button>
          </div>
        )}

      </CaseStudyFullBleed>
    </>
  );
}

function CastGallery() { return null; }

// ── Main page ─────────────────────────────────────────────────────────────────
// ── Scroll Reveal ─────────────────────────────────────────────────────────────
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

// ── Section Nav ───────────────────────────────────────────────────────────────

// Sizes pre-multiplied by scale so CSS transform conflicts with animations are avoided
const BAKED_EXTRAS = [];

export default function RulesWeMadeUp() {
  const videoContainerRef = useRef(null);
  const videoOverlayRef   = useRef(null);
  const videoPillRef      = useRef(null);
  const [doodleEditEnabled, setDoodleEditEnabled] = useState(false);
  const [doodlePositions, setDoodlePositions] = useState({});
  const [extraDoodles, setExtraDoodles] = useState([]);
  const [deletedDoodles, setDeletedDoodles] = useState(new Set());

  const deleteDoodle = (id) => setDeletedDoodles(prev => new Set([...prev, id]));

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
        id:    `${type}-copy-${n}`,
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


      {/* ── Hero: 50/50 split ── */}
      <StickyHero>



        {/* Left — 50%, stacked content */}
        <div className="hero-panel-left" style={{
          flex:           '0 0 50%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          paddingLeft:    '120px',
          paddingRight:   '120px',
          paddingTop:     '80px',
          paddingBottom:  '80px',
          boxSizing:      'border-box',
          position:       'relative',
          zIndex:         1,
        }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', alignSelf: 'flex-start', marginBottom: '50px' }}>
            <style>{`@keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="#101010" style={{ flexShrink: 0, animation: 'slow-spin 12s linear infinite', transformOrigin: 'center' }}>
              <path d="M8,1 L9.2,5.3 L13.5,3.7 L10.9,7.3 L14.8,9.6 L10.4,9.9 L10.9,14.4 L8,11 L5.1,14.4 L5.6,9.9 L1.2,9.6 L5.1,7.3 L2.5,3.7 L6.8,5.3 Z"/>
            </svg>
            <span style={{
              fontFamily: 'Fira Mono, monospace',
              fontWeight: 400,
              fontSize:   '16px',
              lineHeight: 1.2,
              color:      '#101010',
            }}>Case Study</span>
          </div>

          <h1 className="font-heading hero-title" style={{
            fontWeight:  700,
            fontSize:    '80px',
            lineHeight:  '80px',
            color:       '#101010',
            margin:      '0 0 28px',
          }}>
            The Making of an Animated Short with AI
          </h1>

          {/* Dashed divider — 2px stroke, 4px dashes */}
          <svg width="100%" height="2" style={{ display: 'block', margin: '32px 0' }} preserveAspectRatio="none">
            <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(16,16,16,0.25)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <MetaItem label="Year"   value="2025" />
            <MetaItem label="Role"   value="Director, Writer, Art Director" />
            <MetaItem label="Medium" value="AI-assisted animation, music, character design, visual storytelling" />
          </div>
        </div>

        {/* Right — 50%, full-height image */}
        <div className="hero-panel-right" style={{ flex: '0 0 50%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          <video
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', cursor: 'default' }}
          >
            <source src="/rules-we-made-up/1-hero/king-loop.mp4" type="video/mp4" />
          </video>
        </div>

      </StickyHero>

      {/* ── Video + Intro ── */}
      <section style={{ backgroundColor: '#F5F0EC', backgroundImage: 'url(/Medium-beige-darker-bg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', zIndex: 2, borderRadius: '24px 24px 0 0', boxShadow: '0 -8px 40px rgba(0,0,0,0.10)', paddingBottom: '80px' }}>

        {/* Video — 100px padding, section #F5F0EC IS the frame */}
        <div style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
        <div
          ref={videoContainerRef}
          style={{ position: 'relative', overflow: 'hidden', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)', transform: 'translateY(0px)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          onMouseEnter={() => {
            if (videoContainerRef.current) videoContainerRef.current.style.transform = 'translateY(-8px)';
            if (videoPillRef.current)      videoPillRef.current.style.opacity = '1';
          }}
          onMouseLeave={() => {
            if (videoContainerRef.current) videoContainerRef.current.style.transform = 'translateY(0px)';
            if (videoPillRef.current)      videoPillRef.current.style.opacity = '0';
          }}
          onMouseDown={() => {
            if (videoPillRef.current) {
              videoPillRef.current.style.transition = 'transform 0.1s ease';
              videoPillRef.current.style.transform  = 'scale(0.93)';
            }
          }}
          onMouseUp={() => {
            if (videoPillRef.current) {
              videoPillRef.current.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
              videoPillRef.current.style.transform  = 'scale(1)';
            }
          }}
        >
          <div style={{ padding: '56.25% 0 0 0', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src="https://player.vimeo.com/video/1193369686?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Rules We Made Up"
            />
          </div>

          {/* Play overlay — pointer-events none so clicks reach iframe */}
          <div ref={videoOverlayRef} style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            pointerEvents:  'none',
          }}>
            <div ref={videoPillRef} style={{
              display:           'flex',
              alignItems:        'center',
              gap:               '12px',
              backgroundColor:   'rgba(255,251,248,0.18)',
              backdropFilter:    'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius:      '100px',
              padding:           '16px 28px 16px 22px',
              border:            '1px solid rgba(255,255,255,0.3)',
              opacity:           0,
              transition:        'opacity 0.6s ease-in-out',
            }}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M2 1.5L16 10L2 18.5V1.5Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
              <span style={{
                fontFamily:    'Fira Mono, monospace',
                fontSize:      '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#ffffff',
              }}>Watch Film</span>
            </div>
          </div>
        </div>
        </div>

        {/* Film caption — on #F5F0EC, centered below video, before torn edge */}
        <div style={{ textAlign: 'center', paddingBottom: '80px', maxWidth: '1440px', margin: '0 auto' }}>
          <span style={{
            fontFamily: 'Fira Mono, monospace',
            fontWeight: 400,
            fontSize:   '16px',
            lineHeight: 1.2,
            color:      '#101010',
          }}>Rules We Made Up / Directed by Natalie Nicholson</span>
        </div>

        {/* Torn paper edge — #FFFBF8 (next section) tears up into this section */}
        <svg
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', display: 'block', zIndex: 3, pointerEvents: 'none' }}
        >
          <path d="M0,50 L0,30 L60,8 L120,40 L175,12 L230,42 L285,5 L340,35 L395,18 L450,44 L505,8 L560,36 L620,20 L680,45 L740,5 L800,32 L855,12 L910,42 L965,18 L1020,44 L1080,8 L1135,38 L1190,15 L1250,42 L1310,10 L1370,36 L1440,22 L1440,50 Z" fill="#FFFBF8" />
        </svg>

        <Script src="https://player.vimeo.com/api/player.js" />
      </section>

      {/* ── Project Overview ── */}
      <CaseStudySection
        id="project-overview"
        sectionStyle={{ zIndex: 2, backgroundColor: '#FFFBF8' }}
        style={{ paddingTop: '80px', paddingBottom: '0px' }}
      >
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

          {/* Left: heading + body copy — 8 of 12 columns */}
          <div data-dev-id="proj-text" data-dev-type="text" style={{ flex: '0 0 66.66%', minWidth: 0 }}>
            <Reveal delay={0}>
              <h2 className="font-heading" style={{
                fontWeight:  700,
                fontSize:    '64px',
                lineHeight:  1.05,
                color:       '#101010',
                margin:      '0 0 28px',
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
                <em>Rules We Made Up</em> is a self-directed animated short built with AI-assisted tools,
                original music, storyboarding, character design, and <em>a lot</em> of human editing. What
                started as an old poem became a song, then a claymation-inspired world about creativity,
                the rules we inherit, protect, break, or make up as we go.
              </p>
            </Reveal>
          </div>

          {/* Right: headphones doodle */}
          <div data-dev-id="proj-headphones" data-dev-type="doodle" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/ELEMENTS/headphones.png"
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
          <h3 style={{
            fontFamily:    'Fira Mono, monospace',
            fontWeight:    400,
            fontSize:      '16px',
            lineHeight:    1.2,
            color:         '#101010',
            margin:        '0 0 20px',
          }}>What it became</h3>
        </Reveal>

        <div className="what-it-became-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            {
              num:   1,
              title: 'A test of personal AI storytelling',
              body:  'A way to find out whether AI could help me make something emotional, specific, and mine — not just "generated".',
            },
            {
              num:   2,
              title: 'A full creative workflow',
              body:  'A crash course in writing lyrics, generating music, storyboarding, directing scenes, building characters, editing footage, and learning LTX Studio scene by scene.',
            },
            {
              num:   3,
              title: 'A process I could carry forward',
              body:  'The project taught me how much direction AI still needs: references, structure, pacing, consistency, and restraint.',
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
                {/* Badge + title row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    flexShrink:      0,
                    width:           '60px',
                    height:          '60px',
                    backgroundColor: '#D2D7F5',
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
                {/* Body */}
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
      <HowItStarted />

      {/* ── Character Creation ── */}
      <CharacterCreation />

      {/* ── More Friends ── */}
      <MoreFriends />

      {/* ── Mushroom Friend ── */}
      <MushroomFriend />

      {/* ── Scene Creation ── */}
      <SceneCreation />

      {/* ── Roll Call ── */}
      <RollCall />

      {/* ── Filmmaking Principles ── */}
      <FilmmakingPrinciples />

      {/* ── The Tool ── */}
      <TheTool />

      {/* ── Blooper Reel ── */}
      <BlooperReel />

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
