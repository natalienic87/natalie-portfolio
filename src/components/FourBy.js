export default function FourBy({ items, accentColor = '#E8973A', badgeTextColor = '#ffffff', columns = 4 }) {
  return (
    <div className="what-it-became-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '20px' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          backgroundColor: '#ffffff',
          border:          '1px solid #E8E0D8',
          borderRadius:    '16px',
          padding:         '28px',
          boxSizing:       'border-box',
          boxShadow:       '0px 4px 20px rgba(0,0,0,0.06)',
          height:          '100%',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div className="wib-badge" style={{
              flexShrink:      0,
              width:           '60px',
              height:          '60px',
              backgroundColor: accentColor,
              borderRadius:    '10px',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}>
              <span className="wib-badge-num" style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '24px', color: badgeTextColor, lineHeight: 1 }}>
                {item.number ?? i + 1}
              </span>
            </div>
            <h4 className="wib-title" style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 700,
              fontSize:   '24px',
              lineHeight: '24px',
              color:      '#101010',
              margin:     0,
            }}>{item.title}</h4>
          </div>
          <p className="wib-body" style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 300,
            fontSize:   '16px',
            lineHeight: '160%',
            color:      '#404040',
            margin:     0,
          }}>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
