/**
 * TickerStrip — continuous left-scrolling marquee row.
 *
 * Props:
 *   items    — array of strings to display
 *   duration — animation duration in seconds (default 40)
 */
export default function TickerStrip({ items = [], duration = 40 }) {
  const doubled = [...items, ...items];

  return (
    <>
      <div style={{
        overflow:        'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:       'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}>
        <div style={{
          display:    'inline-flex',
          animation:  `ticker-strip ${duration}s linear infinite`,
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}>
          {doubled.map((item, i) => (
            <span key={i} style={{
              display:       'inline-flex',
              alignItems:    'center',
              fontFamily:    'Fira Mono, monospace',
              fontWeight:    400,
              fontSize:      '20px',
              lineHeight:    1.2,
              color:         '#101010',
              textTransform: 'uppercase',
              whiteSpace:    'nowrap',
            }}>
              {item}
              <svg width="22" height="22" viewBox="0 0 16 16" fill="#101010"
                style={{ flexShrink: 0, margin: '0 36px' }}>
                <path d="M8,1 L9.2,5.3 L13.5,3.7 L10.9,7.3 L14.8,9.6 L10.4,9.9 L10.9,14.4 L8,11 L5.1,14.4 L5.6,9.9 L1.2,9.6 L5.1,7.3 L2.5,3.7 L6.8,5.3 Z"/>
              </svg>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

