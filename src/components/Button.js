import { useState, useRef, useEffect } from 'react';

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5 0.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

const base = {
  display:        'inline-flex',
  alignItems:     'center',
  justifyContent: 'center',
  fontFamily:     'Inter, sans-serif',
  fontWeight:     700,
  fontSize:       '11px',
  letterSpacing:  '0.18em',
  textTransform:  'uppercase',
  textDecoration: 'none',
  padding:        '14px 28px',
  borderRadius:   '8px',
  cursor:         'pointer',
  border:         'none',
  whiteSpace:     'nowrap',
  outline:        'none',
};

const noiseOverlay = {
  position:        'absolute',
  inset:           0,
  backgroundImage: NOISE_SVG,
  backgroundSize:  '300px 300px',
  mixBlendMode:    'overlay',
  pointerEvents:   'none',
  borderRadius:    '8px',
};

// ── Primary — liquid gradient at rest, cursor-tracked radial bloom on hover ───
function PrimaryButton({ children, href, onClick, style = {}, ...props }) {
  const Tag    = href ? 'a' : 'button';
  const btnRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width)  * 100).toFixed(2);
    const y = (((e.clientY - rect.top)  / rect.height) * 100).toFixed(2);
    btnRef.current.style.setProperty('--mx', `${x}%`);
    btnRef.current.style.setProperty('--my', `${y}%`);
  };

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className={hovered ? 'btn-primary-hover' : 'btn-primary-liquid'}
      style={{
        ...base,
        position: 'relative',
        overflow: 'hidden',
        color:    '#101010',
        ...style,
      }}
      {...props}
    >
      <span style={noiseOverlay} />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </Tag>
  );
}

// ── Dashed Outline — drawing border on hover ──────────────────────────────────
function DashedOutlineButton({ children, href, onClick, style = {}, ...props }) {
  const btnRef   = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [dims, setDims]       = useState(null);

  useEffect(() => {
    if (!btnRef.current) return;
    const { offsetWidth: w, offsetHeight: h } = btnRef.current;
    const r = 8;
    const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
    setDims({ w, h, perimeter });
  }, []);

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...base,
        position:        'relative',
        backgroundColor: 'transparent',
        color:           '#FEFEFE',
        border: hovered
          ? '1.5px solid transparent'
          : '1.5px dashed rgba(255,255,255,0.75)',
        transition: 'border-color 0.1s',
        ...style,
      }}
      {...props}
    >
      {children}
      {dims && hovered && (
        <svg
          width={dims.w} height={dims.h}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
        >
          <rect
            x="0.75" y="0.75"
            width={dims.w - 1.5} height={dims.h - 1.5}
            rx="7.25" fill="none" stroke="white" strokeWidth="1.5"
            style={{
              strokeDasharray: dims.perimeter,
              '--p':           `${dims.perimeter}px`,
              animation:       'draw-border 0.45s ease-out forwards',
            }}
          />
        </svg>
      )}
    </Tag>
  );
}

// ── Text Link — arrow push + drawn underline on hover ────────────────────────
function TextLinkButton({ children, href, onClick, style = {}, arrow = 'right', ...props }) {
  const [hovered, setHovered] = useState(false);
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...base,
        position:        'relative',
        backgroundColor: 'transparent',
        color:           hovered ? '#FEFEFE' : '#D9D9D9',
        textDecoration:  'none',
        padding:         '0 0 5px 0',
        borderRadius:    '0',
        gap:             '6px',
        transition:      'color 0.2s ease',
        ...style,
      }}
      {...props}
    >
      <span>{children}</span>
      <span style={{
        color:      '#FDB154',
        display:    'inline-block',
        fontSize:   '16px',
        transform:  hovered
          ? (arrow === 'down' ? 'translateY(3px)' : 'translateX(5px)')
          : 'translate(0)',
        transition: 'transform 0.25s ease',
        lineHeight: 1,
      }}>{arrow === 'down' ? '↓' : '→'}</span>
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
    </Tag>
  );
}

// ── Public API ────────────────────────────────────────────────────────────────
export default function Button({ variant = 'primary', ...props }) {
  if (variant === 'primary')        return <PrimaryButton {...props} />;
  if (variant === 'dashed-outline') return <DashedOutlineButton {...props} />;
  if (variant === 'text-link')      return <TextLinkButton {...props} />;
  return null;
}
