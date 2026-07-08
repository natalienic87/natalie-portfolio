import { useState, useEffect, useRef } from 'react';

export default function DevEdit() {
  const [active,    setActive]    = useState(false);
  const [changes,   setChanges]   = useState({});
  const [copied,    setCopied]    = useState(false);
  const [focusedEl, setFocusedEl] = useState(null);
  const [rect,      setRect]      = useState(null);
  const originalsRef      = useRef({});
  const originalDisplayRef = useRef({});

  // T key toggle
  useEffect(() => {
    const onKey = (e) => {
      if (!e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key !== 't' && e.key !== 'T') return;
      e.preventDefault(); // stop browser from opening a new tab
      setActive(v => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Enable / disable contentEditable; snapshot originals on activate
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-dev-text]'));
    if (active) {
      const textSnap    = {};
      const displaySnap = {};
      els.forEach(el => {
        textSnap[el.dataset.devText]    = el.textContent;
        displaySnap[el.dataset.devText] = el.style.display || '';
        el.contentEditable = 'true';
      });
      originalsRef.current      = textSnap;
      originalDisplayRef.current = displaySnap;
    } else {
      els.forEach(el => {
        el.contentEditable     = 'false';
        el.style.outline       = '';
        el.style.outlineOffset = '';
      });
      setFocusedEl(null);
      setRect(null);
    }
  }, [active]);

  // Focus / blur / input tracking
  useEffect(() => {
    if (!active) return;

    const onFocusIn = (e) => {
      const el = e.target.closest('[data-dev-text]');
      if (!el) return;
      el.style.outline       = '1px dashed #E35038';
      el.style.outlineOffset = '4px';
      setFocusedEl(el);
      setRect(el.getBoundingClientRect());
    };

    const onFocusOut = (e) => {
      const el = e.target.closest('[data-dev-text]');
      if (!el) return;
      el.style.outline       = '';
      el.style.outlineOffset = '';
      // Delay so Remove button click registers before blur clears state
      setTimeout(() => setFocusedEl(prev => prev === el ? null : prev), 200);
    };

    const onInput = (e) => {
      const el = e.target.closest('[data-dev-text]');
      if (!el) return;
      const key      = el.dataset.devText;
      const original = originalsRef.current[key] ?? '';
      const current  = el.textContent;
      setChanges(prev => {
        // Don't clobber a deletion with a stale input event
        if (prev[key]?.deleted) return prev;
        if (current.trim() === original.trim()) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return { ...prev, [key]: { before: original, after: current } };
      });
    };

    document.addEventListener('focusin',  onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    document.addEventListener('input',    onInput);
    return () => {
      document.removeEventListener('focusin',  onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('input',    onInput);
    };
  }, [active]);

  // Keep Remove button rect in sync with scroll
  useEffect(() => {
    if (!focusedEl) { setRect(null); return; }
    setRect(focusedEl.getBoundingClientRect());
    const onScroll = () => setRect(focusedEl.getBoundingClientRect());
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [focusedEl]);

  const removeElement = () => {
    if (!focusedEl) return;
    const key    = focusedEl.dataset.devText;
    const before = originalsRef.current[key] ?? '';
    focusedEl.style.display = 'none';
    setChanges(prev => ({ ...prev, [key]: { before, deleted: true } }));
    setFocusedEl(null);
    setRect(null);
  };

  const revertOne = (key) => {
    setChanges(prev => {
      const entry = prev[key];
      const el    = document.querySelector(`[data-dev-text="${key}"]`);
      if (el) {
        if (entry?.deleted) {
          el.style.display = originalDisplayRef.current[key] ?? '';
        } else {
          el.textContent = originalsRef.current[key] ?? '';
        }
      }
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const revertAll = () => {
    setChanges(prev => {
      Object.entries(prev).forEach(([key, entry]) => {
        const el = document.querySelector(`[data-dev-text="${key}"]`);
        if (!el) return;
        if (entry.deleted) {
          el.style.display = originalDisplayRef.current[key] ?? '';
        } else {
          el.textContent = originalsRef.current[key] ?? '';
        }
      });
      return {};
    });
  };

  const entries    = Object.entries(changes);
  const hasChanges = entries.length > 0;

  const pageSlug = typeof window !== 'undefined'
    ? window.location.pathname.replace(/^\//, '') || 'index'
    : '';

  const truncate = (str, n = 68) =>
    str.length > n ? str.slice(0, n) + '…' : str;

  const copyAll = () => {
    const text = entries.map(([key, entry]) => {
      const header = `[data-dev-text="${key}"] · ${pageSlug}`;
      if (entry.deleted) {
        return `${header}\nDELETE (was: ${entry.before.trim()})`;
      }
      return `${header}\nBefore: ${entry.before.trim()}\nAfter:  ${entry.after.trim()}`;
    }).join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      {/* Remove button — floats top-right of the focused element */}
      {active && rect && focusedEl && (
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={removeElement}
          style={{
            position:      'fixed',
            top:           Math.max(8, rect.top - 30),
            left:          rect.right - 72,
            padding:       '3px 10px',
            fontFamily:    'Fira Mono, monospace',
            fontSize:      10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         '#fff',
            background:    'rgba(180,40,40,0.92)',
            border:        'none',
            borderRadius:  4,
            cursor:        'pointer',
            zIndex:        10001,
          }}
        >
          ✕ Remove
        </button>
      )}

      {/* Changes panel */}
      {hasChanges && (
        <div style={{
          position:     'fixed',
          bottom:       132,
          right:        24,
          width:        304,
          maxHeight:    400,
          overflowY:    'auto',
          background:   'rgba(10,10,10,0.96)',
          borderRadius: 8,
          padding:      '14px',
          zIndex:       9993,
          fontFamily:   'Fira Mono, monospace',
          fontSize:     10,
          lineHeight:   1.6,
          boxShadow:    '0 4px 24px rgba(0,0,0,0.5)',
        }}>

          <div style={{ color: '#E35038', fontWeight: 700, fontSize: 11, marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {entries.length} pending change{entries.length !== 1 ? 's' : ''}
          </div>

          {entries.map(([key, entry], i) => (
            <div key={key} style={{
              marginBottom:  10,
              paddingBottom: 10,
              borderBottom:  i < entries.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ color: '#E35038', fontSize: 9, letterSpacing: '0.06em' }}>{key}</span>
                <button
                  onClick={() => revertOne(key)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', fontSize: 11, padding: '0 2px', lineHeight: 1 }}
                >↩</button>
              </div>

              {entry.deleted ? (
                <div style={{ color: '#f87171', fontSize: 9, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  ✕ deleted — {truncate(entry.before.trim(), 52)}
                </div>
              ) : (
                <>
                  <div style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>− {truncate(entry.before.trim())}</div>
                  <div style={{ color: '#86efac' }}>+ {truncate(entry.after.trim())}</div>
                </>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <button
              onClick={copyAll}
              style={{
                flex:          1,
                padding:       '6px 0',
                background:    copied ? '#2d7a2d' : '#E35038',
                border:        'none',
                borderRadius:  4,
                cursor:        'pointer',
                color:         '#fff',
                fontFamily:    'Fira Mono, monospace',
                fontSize:      9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition:    'background 0.2s',
              }}
            >
              {copied ? '✓ Copied — paste in chat' : 'Copy all → paste in chat'}
            </button>
            <button
              onClick={revertAll}
              style={{
                padding:       '6px 10px',
                background:    'rgba(255,255,255,0.07)',
                border:        'none',
                borderRadius:  4,
                cursor:        'pointer',
                color:         'rgba(255,255,255,0.4)',
                fontFamily:    'Fira Mono, monospace',
                fontSize:      9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Revert
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setActive(v => !v)}
        style={{
          position:      'fixed',
          bottom:        98,
          right:         24,
          padding:       '5px 10px',
          fontFamily:    'Fira Mono, monospace',
          fontSize:      10,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color:         '#fff',
          background:    active ? '#E35038' : 'rgba(16,16,16,0.75)',
          border:        `1px solid ${active ? '#E35038' : hasChanges ? '#E35038' : 'rgba(255,255,255,0.2)'}`,
          borderRadius:  4,
          cursor:        'pointer',
          zIndex:        9992,
        }}
      >
        [T] Edit {active ? '●' : '○'}{hasChanges ? ` · ${entries.length}` : ''}
      </button>
    </>
  );
}
