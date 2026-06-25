export default function FourBy({ items, accentColor = '#E8973A' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          border: '1px solid rgba(16,16,16,0.12)',
          borderRadius: '14px',
          padding: '24px',
          backgroundColor: '#ffffff',
        }}>
          {/* Badge + title */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              backgroundColor: accentColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '17px', color: '#ffffff' }}>
                {item.number ?? i + 1}
              </span>
            </div>
            <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '17px', color: '#101010', margin: 0, lineHeight: 1.3 }}>
              {item.title}
            </p>
          </div>
          {/* Body */}
          <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '17px', lineHeight: 1.65, color: '#404040', margin: 0 }}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}
