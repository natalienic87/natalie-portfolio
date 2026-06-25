import { useState } from 'react';

export default function PhoneCarousel({ slides, width = '360px', accentColor = '#CC0000' }) {
  const [idx, setIdx] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Prev / Phone / Next row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

        {/* Prev */}
        <button onClick={() => setIdx(i => (i - 1 + slides.length) % slides.length)}
          style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid #101010', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Phone frame — first image is relative to set height; rest are absolute overlays */}
        <div style={{ position: 'relative', width, borderRadius: '30px', boxShadow: '4px 4px 90px 0px rgba(0,0,0,0.10)', overflow: 'hidden', flexShrink: 0 }}>
          {slides.map((src, i) => (
            <img key={src} src={src} alt=""
              style={{
                width: '100%',
                display: 'block',
                borderRadius: '30px',
                position: i === 0 ? 'relative' : 'absolute',
                top:  i === 0 ? 'auto' : 0,
                left: i === 0 ? 'auto' : 0,
                opacity: i === idx ? 1 : 0,
                transition: 'opacity 0.45s ease',
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button onClick={() => setIdx(i => (i + 1) % slides.length)}
          style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid #101010', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      {/* Dot navigation */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            style={{
              width: i === idx ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              backgroundColor: i === idx ? accentColor : 'rgba(16,16,16,0.25)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
