import { useState, useEffect } from 'react';

export default function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        setVisible(v => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {visible && (
        <div style={{
          position:      'fixed',
          inset:         0,
          zIndex:        9999,
          pointerEvents: 'none',
          display:       'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width:      '100%',
            maxWidth:   '1440px',
            padding:    '0 120px',
            boxSizing:  'border-box',
            display:    'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap:        '20px',
            alignSelf:  'stretch',
          }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(99, 102, 241, 0.10)',
                borderLeft:      '1px solid rgba(99, 102, 241, 0.25)',
                borderRight:     '1px solid rgba(99, 102, 241, 0.25)',
              }} />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setVisible(v => !v)}
        title="Toggle grid (G)"
        style={{
          position:        'fixed',
          bottom:          '20px',
          right:           '20px',
          zIndex:          10000,
          width:           '36px',
          height:          '36px',
          borderRadius:    '8px',
          border:          '1.5px solid rgba(16,16,16,0.18)',
          backgroundColor: visible ? '#6366F1' : '#ffffff',
          color:           visible ? '#ffffff' : '#888888',
          cursor:          'pointer',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          boxShadow:       '0 2px 12px rgba(0,0,0,0.10)',
          transition:      'background-color 0.15s ease, color 0.15s ease',
          padding:         0,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="4" height="16" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="7" y="1" width="4" height="16" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="13" y="1" width="4" height="16" rx="1" fill="currentColor" opacity="0.5" />
        </svg>
      </button>
    </>
  );
}
