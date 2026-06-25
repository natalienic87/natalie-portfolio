import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'dev-drag-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}
function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Doodle: translate + scale. Text/box: translate + width resize.
function isDoodle(el) {
  if (el.dataset.devType) return el.dataset.devType === 'doodle';
  return el.tagName === 'IMG';
}

function applyPos(el, pos) {
  const x = pos.x ?? 0;
  const y = pos.y ?? 0;
  if (isDoodle(el)) {
    const scale = pos.scale ?? 1;
    el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    el.style.transformOrigin = 'top left';
  } else {
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transformOrigin = 'top left';
    if (pos.width != null) el.style.width = `${pos.width}px`;
  }
}

export default function DevDrag() {
  const [active, setActive]     = useState(false);
  const [handles, setHandles]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [copied, setCopied]     = useState(false);
  const [tick, setTick]         = useState(0);

  const posRef  = useRef(load());
  const dragRef = useRef(null);
  const rafRef  = useRef(null);
  const prevRef = useRef({});

  // Apply saved positions on mount
  useEffect(() => {
    const t = setTimeout(() => {
      Object.entries(posRef.current).forEach(([id, pos]) => {
        const el = document.querySelector(`[data-dev-id="${id}"]`);
        if (el) applyPos(el, pos);
      });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  // Keyboard toggle — D
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'd') setActive(v => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // RAF loop — scan rects while active
  const scan = useCallback(() => {
    const els = Array.from(document.querySelectorAll('[data-dev-id]'));
    const next = els.map(el => ({ id: el.dataset.devId, el, rect: el.getBoundingClientRect() }));
    const changed = next.some(({ id, rect }) => {
      const p = prevRef.current[id];
      return !p || p.left !== rect.left || p.top !== rect.top || p.width !== rect.width || p.height !== rect.height;
    });
    if (changed) {
      next.forEach(({ id, rect }) => { prevRef.current[id] = rect; });
      setHandles(next);
    }
  }, []);

  useEffect(() => {
    if (!active) { cancelAnimationFrame(rafRef.current); return; }
    scan();
    let running = true;
    const loop = () => { if (!running) return; scan(); rafRef.current = requestAnimationFrame(loop); };
    rafRef.current = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [active, scan]);

  // Mouse move + up
  useEffect(() => {
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d) return;
      const el = document.querySelector(`[data-dev-id="${d.id}"]`);
      if (!el) return;

      let newPos;
      if (d.mode === 'move') {
        newPos = { ...posRef.current[d.id], x: d.origX + (e.clientX - d.startX), y: d.origY + (e.clientY - d.startY) };
      } else if (d.mode === 'scale') {
        const delta = (e.clientX - d.startX) / 150;
        newPos = { ...posRef.current[d.id], scale: Math.max(0.05, d.origScale + delta) };
      } else if (d.mode === 'width') {
        const newW = Math.max(60, d.origWidth + (e.clientX - d.startX));
        newPos = { ...posRef.current[d.id], width: newW };
      }
      posRef.current = { ...posRef.current, [d.id]: newPos };
      applyPos(el, newPos);
      setTick(t => t + 1);
    };
    const onUp = () => {
      if (!dragRef.current) return;
      persist(posRef.current);
      dragRef.current = null;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const getPos = (id) => posRef.current[id] || { x: 0, y: 0, scale: 1 };

  const resetSelected = () => {
    if (!selected) return;
    const el = document.querySelector(`[data-dev-id="${selected}"]`);
    const reset = { x: 0, y: 0, scale: 1, width: undefined };
    if (el) {
      el.style.transform = '';
      el.style.width = '';
    }
    posRef.current = { ...posRef.current, [selected]: { x: 0, y: 0, scale: 1 } };
    persist(posRef.current);
    setTick(t => t + 1);
  };

  const copyPositions = () => {
    const text = JSON.stringify(posRef.current, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const selPos   = selected ? getPos(selected) : null;
  const selEntry = selected ? handles.find(h => h.id === selected) : null;
  const selRect  = selEntry?.rect;
  const selEl    = selEntry?.el;

  return (
    <>
      {/* Handles */}
      {active && handles.map(({ id, el, rect }) => {
        const pos    = getPos(id);
        const isSel  = id === selected;
        const doodle = isDoodle(el);

        return (
          <div
            key={id}
            style={{
              position:      'fixed',
              left:          rect.left,
              top:           rect.top,
              width:         rect.width,
              height:        rect.height,
              border:        isSel ? '2px solid #0064ff' : '1px dashed rgba(0,100,255,0.4)',
              boxSizing:     'border-box',
              zIndex:        9981,
              cursor:        'move',
              pointerEvents: 'all',
            }}
            onMouseDown={(e) => {
              if (e.target !== e.currentTarget) return;
              e.preventDefault();
              setSelected(id);
              dragRef.current = { id, mode: 'move', startX: e.clientX, startY: e.clientY, origX: pos.x ?? 0, origY: pos.y ?? 0, origScale: pos.scale ?? 1 };
            }}
          >
            {/* Label */}
            <span style={{
              position: 'absolute', top: -20, left: 0,
              fontFamily: 'Fira Mono, monospace', fontSize: 9,
              color: isSel ? '#0064ff' : 'rgba(0,100,255,0.65)',
              background: 'rgba(255,255,255,0.93)', padding: '1px 5px',
              borderRadius: 2, pointerEvents: 'none', whiteSpace: 'nowrap',
            }}>
              {id} · x:{Math.round(pos.x ?? 0)} y:{Math.round(pos.y ?? 0)}
              {doodle ? ` s:${(pos.scale ?? 1).toFixed(2)}` : pos.width != null ? ` w:${Math.round(pos.width)}` : ''}
            </span>

            {/* Doodle: scale handle bottom-right */}
            {doodle && (
              <div
                title="Drag to scale"
                style={{ position: 'absolute', right: -5, bottom: -5, width: 10, height: 10, background: '#0064ff', borderRadius: 2, cursor: 'nwse-resize', pointerEvents: 'all' }}
                onMouseDown={(e) => {
                  e.stopPropagation(); e.preventDefault();
                  setSelected(id);
                  dragRef.current = { id, mode: 'scale', startX: e.clientX, startY: e.clientY, origX: pos.x ?? 0, origY: pos.y ?? 0, origScale: pos.scale ?? 1 };
                }}
              />
            )}

            {/* Text/box: width handle right-center */}
            {!doodle && (
              <div
                title="Drag to resize width"
                style={{ position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)', width: 10, height: 24, background: '#0064ff', borderRadius: 2, cursor: 'ew-resize', pointerEvents: 'all' }}
                onMouseDown={(e) => {
                  e.stopPropagation(); e.preventDefault();
                  setSelected(id);
                  const currentW = parseFloat(el.style.width) || rect.width;
                  dragRef.current = { id, mode: 'width', startX: e.clientX, startY: e.clientY, origX: pos.x ?? 0, origY: pos.y ?? 0, origWidth: currentW };
                }}
              />
            )}
          </div>
        );
      })}

      {/* HUD */}
      {active && selected && selPos && (
        <div style={{
          position: 'fixed', bottom: 200, right: 24,
          fontFamily: 'Fira Mono, monospace', fontSize: 11,
          background: 'rgba(10,10,10,0.93)', color: '#fff',
          padding: '10px 14px', borderRadius: 6,
          zIndex: 9999, lineHeight: 1.9, minWidth: 180,
        }}>
          <div style={{ color: '#6af', fontWeight: 700, marginBottom: 4 }}>{selected}</div>
          <div>x  <b>{Math.round(selPos.x ?? 0)}px</b></div>
          <div>y  <b>{Math.round(selPos.y ?? 0)}px</b></div>
          {selRect  && <div>w  {Math.round(selRect.width)}px</div>}
          {selRect  && <div>h  {Math.round(selRect.height)}px</div>}
          {selEl && isDoodle(selEl) && <div>scale  <b>{(selPos.scale ?? 1).toFixed(3)}</b></div>}
          {selEl && !isDoodle(selEl) && selPos.width != null && <div>box-w  <b>{Math.round(selPos.width)}px</b></div>}
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            <button onClick={resetSelected} style={btn('#802020', '#f99')}>Reset</button>
            <button onClick={() => setSelected(null)} style={btn('#1a1a1a', '#aaa')}>Desel</button>
          </div>
          {/* Copy all positions — paste into chat */}
          <button
            onClick={copyPositions}
            style={{ ...btn(copied ? '#005500' : '#0a3a6a', copied ? '#6f6' : '#6af'), marginTop: 6, width: '100%' }}
          >
            {copied ? '✓ Copied!' : 'Copy all → paste in chat'}
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setActive(v => !v)}
        style={{
          position: 'fixed', bottom: 166, right: 24,
          padding: '5px 10px',
          fontFamily: 'Fira Mono, monospace', fontSize: 10,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#fff',
          background: active ? '#0064ff' : 'rgba(16,16,16,0.75)',
          border: `1px solid ${active ? '#0064ff' : 'rgba(255,255,255,0.2)'}`,
          borderRadius: 4, cursor: 'pointer', zIndex: 9992,
        }}
      >
        [D] Drag {active ? '●' : '○'}
      </button>
    </>
  );
}

function btn(bg, color) {
  return {
    flex: 1, fontFamily: 'Fira Mono, monospace', fontSize: 9,
    background: bg, border: 'none', color,
    borderRadius: 3, cursor: 'pointer', padding: '3px 0',
  };
}
