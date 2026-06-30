import { useState, useEffect, useRef } from 'react';

/**
 * CaseSplitPanel — reusable 50/50 full-bleed split section. Always 800px tall.
 *
 * Two modes for the left panel:
 *   - Typewriter mode (default): pass `text` (with \n\n paragraph breaks) and optionally `eyebrow`.
 *   - Static mode: pass `leftContent` (any JSX) — renders it directly, no animation.
 *
 * Props:
 *   id             — section id (optional)
 *   leftColor      — background hex for left panel
 *   rightColor     — background hex for right panel
 *   eyebrow        — small Fira Mono label above the typewriter text (typewriter mode only)
 *   text           — typewriter body text; use \n\n for paragraph breaks (typewriter mode)
 *   textColor      — text color on left panel (default #ffffff, typewriter mode only)
 *   leftContent    — static JSX to render in the left panel (skips typewriter entirely)
 *   children       — right panel content
 *   rightFullBleed — when true, right panel has no padding and children fill edge-to-edge
 */
export default function CaseSplitPanel({
  id,
  leftColor        = '#3975A7',
  rightColor       = '#CADCEF',
  eyebrow,
  eyebrowStyle     = {},
  text             = '',
  textColor        = '#ffffff',
  leftContent,
  rightFullBleed   = false,
  rightHeightOffset = 0,
  children,
}) {
  const sectionRef    = useRef(null);
  const leftPanelRef  = useRef(null);
  const rightPanelRef = useRef(null);

  const [typed,    setTyped]    = useState('');
  const [started,  setStarted]  = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  // Start typewriter when section scrolls into view
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

  // Character-by-character at 55ms — matches MushroomFriend exactly
  useEffect(() => {
    if (!started || typed.length >= text.length) return;
    const t = setTimeout(() => setTyped(text.slice(0, typed.length + 1)), 55);
    return () => clearTimeout(t);
  }, [started, typed, text]);

  // Blinking cursor at 530ms
  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  // On mobile: sync right panel height to left panel height (fullbleed video needs a set height)
  useEffect(() => {
    if (!rightFullBleed) return;
    const syncHeight = () => {
      const left  = leftPanelRef.current;
      const right = rightPanelRef.current;
      if (!left || !right) return;
      if (window.innerWidth <= 768) {
        right.style.height = (left.offsetHeight + rightHeightOffset) + 'px';
      } else {
        right.style.height = '';
      }
    };
    const ro = new ResizeObserver(syncHeight);
    if (leftPanelRef.current) ro.observe(leftPanelRef.current);
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => { ro.disconnect(); window.removeEventListener('resize', syncHeight); };
  }, [rightFullBleed, rightHeightOffset]);

  const paragraphs = typed.split('\n\n');
  const done       = typed.length >= text.length;

  const textStyle = {
    fontFamily: 'Fira Mono, monospace',
    fontWeight: 400,
    fontSize:   '22px',
    lineHeight: 1.8,
    color:      textColor,
    margin:     0,
    whiteSpace: 'pre-wrap',
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="csp-section"
      style={{ display: 'flex', width: '100%', height: '800px', position: 'relative', zIndex: 2, backgroundColor: leftColor }}
    >
      {/* Left panel — static content OR typewriter */}
      <div ref={leftPanelRef} className="csp-left" style={{
        flex:            '0 0 50%',
        backgroundColor: leftColor,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '80px',
        boxSizing:       'border-box',
        overflow:        'hidden',
      }}>
        {leftContent ? (
          <div style={{ width: '100%' }}>{leftContent}</div>
        ) : (
          <div style={{ width: '100%' }}>
            {eyebrow && (
              <p style={{
                fontFamily:    'Fira Mono, monospace',
                fontWeight:    400,
                fontSize:      '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         `${textColor}88`,
                margin:        '0 0 32px',
                ...eyebrowStyle,
              }}>{eyebrow}</p>
            )}

            {/* Invisible placeholder holds height — prevents layout shift during typing */}
            <div style={{ position: 'relative' }}>
              <div aria-hidden="true" style={{ opacity: 0, pointerEvents: 'none' }}>
                {text.split('\n\n').map((p, i, arr) => (
                  <p key={i} style={{ ...textStyle, marginBottom: i < arr.length - 1 ? '32px' : 0 }}>{p}</p>
                ))}
              </div>
              {/* Visible typed text overlay */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                {paragraphs.map((p, i) => (
                  <p key={i} style={{ ...textStyle, marginBottom: i < paragraphs.length - 1 ? '32px' : 0 }}>
                    {p}
                    {i === paragraphs.length - 1 && !done && (
                      <span style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 0.1s', borderRight: `2px solid ${textColor}`, marginLeft: '2px' }}>&nbsp;</span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right panel — consumer-supplied content */}
      <div ref={rightPanelRef} className={rightFullBleed ? 'csp-right csp-right-fullbleed' : 'csp-right'} style={{
        flex:            '0 0 50%',
        backgroundColor: rightColor,
        display:         'flex',
        alignItems:      'center',
        padding:         rightFullBleed ? 0 : '80px',
        boxSizing:       'border-box',
        overflow:        'hidden',
        height:          rightFullBleed ? '100%' : undefined,
      }}>
        <div style={{ width: '100%', height: rightFullBleed ? '100%' : undefined }}>
          {children}
        </div>
      </div>
    </section>
  );
}
