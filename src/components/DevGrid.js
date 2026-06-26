import { useState, useEffect } from 'react';

const MAX_WIDTH = 1440;
const GUTTER    = 20;
const COLS      = 12;

export default function DevGrid() {
  const [show, setShow] = useState(false);
  const [vw,   setVw]   = useState(0);

  // track viewport width so grid stays accurate on resize
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // keyboard toggle — G
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'g') setShow(v => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // The 1440px container is centered; 120px padding applied inside.
  const containerLeft = Math.max(0, (vw - MAX_WIDTH) / 2);
  const edge120       = containerLeft + 120;

  return (
    <>
      {show && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9990 }}>

          {/* 80px margin zones */}
          <div style={{ position: 'absolute', inset: 0, left: 0,       width: edge120,  background: 'rgba(255,110,0,0.07)', borderRight: '1px solid rgba(255,110,0,0.6)' }} />
          <div style={{ position: 'absolute', inset: 0, left: 'auto',  width: edge120,  background: 'rgba(255,110,0,0.07)', borderLeft:  '1px solid rgba(255,110,0,0.6)' }} />

          {/* 12 columns between the 80px margins */}
          <div style={{
            position:            'absolute',
            top:    0,
            bottom: 0,
            left:   edge120,
            right:  edge120,
            display:             'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap:                 GUTTER,
          }}>
            {Array.from({ length: COLS }).map((_, i) => (
              <div key={i} style={{
                background:  'rgba(0,100,255,0.06)',
                borderLeft:  '1px solid rgba(0,100,255,0.2)',
                borderRight: '1px solid rgba(0,100,255,0.2)',
              }} />
            ))}
          </div>

          {/* Labels */}
          <div style={label({ left: edge120 + 4,  top: 6,  color: 'rgba(255,110,0,0.95)' })}>120px</div>
          <div style={label({ left: edge120 + 4,  top: 18, color: 'rgba(0,100,255,0.85)' })}>12 col · 20px gutter</div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setShow(v => !v)}
        style={{
          position:      'fixed',
          bottom:        130,
          right:         24,
          padding:       '5px 10px',
          fontFamily:    'Fira Mono, monospace',
          fontSize:      10,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color:         '#fff',
          background:    show ? '#0064ff' : 'rgba(16,16,16,0.75)',
          border:        `1px solid ${show ? '#0064ff' : 'rgba(255,255,255,0.2)'}`,
          borderRadius:  4,
          cursor:        'pointer',
          zIndex:        9992,
        }}
      >
        [G] Grid {show ? '●' : '○'}
      </button>
    </>
  );
}

function label({ left, top, color }) {
  return {
    position:      'fixed',
    left,
    top,
    fontFamily:    'Fira Mono, monospace',
    fontSize:      9,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color,
    pointerEvents: 'none',
  };
}
