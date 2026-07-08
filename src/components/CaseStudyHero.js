export default function CaseStudyHero({
  title,
  eyebrow     = 'Case Study',
  year,
  role,
  medium,
  mediumLabel = 'Medium',
  summary,
  image,
  imageAlt    = '',
  video,
  accentColor = '#FDB154',
}) {
  const labelStyle = {
    fontFamily:    'Fira Mono, monospace',
    fontWeight:    400,
    fontSize:      '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color:         'rgba(255,255,255,0.40)',
    display:       'block',
    margin:        '0 0 6px',
  };
  const valueStyle = {
    fontFamily: 'Fira Mono, monospace',
    fontWeight: 400,
    fontSize:   '14px',
    lineHeight: 1.5,
    color:      '#FFFBF8',
    display:    'block',
    margin:     0,
  };
  const divider = (
    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '20px 0' }} />
  );

  return (
    <section style={{ backgroundColor: '#101010', position: 'relative' }}>
      <div style={{
        maxWidth:  '1440px',
        margin:    '0 auto',
        padding:   '80px 80px 0',
        boxSizing: 'border-box',
      }}>

        {/* Title — full width above the grid */}
        <h1 className="font-heading cs-hero-title" style={{
          fontWeight: 700,
          fontSize:   '90px',
          lineHeight: 1.0,
          color:      '#FFFBF8',
          margin:     '0 0 48px',
        }}>
          {title}
        </h1>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '0 0 48px' }} />

        {/* Two-column grid: meta left, media right */}
        <div className="cs-hero-grid" style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '80px',
          alignItems:          'start',
        }}>

          {/* LEFT: eyebrow + meta + summary */}
          <div className="cs-hero-left">

            <p style={{
              fontFamily:    'Fira Mono, monospace',
              fontWeight:    400,
              fontSize:      '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         accentColor,
              margin:        '0 0 28px',
              paddingLeft:   '12px',
              borderLeft:    `2px solid ${accentColor}`,
            }}>
              {eyebrow}
            </p>

            <dl style={{ margin: 0, padding: 0 }}>
              <dt style={labelStyle}>Year</dt>
              <dd style={valueStyle}>{year}</dd>
              {divider}
              <dt style={labelStyle}>Role</dt>
              <dd style={valueStyle}>{role}</dd>
              {divider}
              <dt style={labelStyle}>{mediumLabel}</dt>
              <dd style={valueStyle}>{medium}</dd>
            </dl>

            {summary && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '32px 0' }} />
                <p style={{
                  fontFamily: 'Fraunces, serif',
                  fontWeight: 300,
                  fontSize:   '20px',
                  lineHeight: 1.6,
                  color:      'rgba(255,255,255,0.80)',
                  margin:     0,
                }}>
                  {summary}
                </p>
              </>
            )}
          </div>

          {/* RIGHT: looping video or static image */}
          <div className="cs-hero-right">
            {video ? (
              <video
                autoPlay muted loop playsInline
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
              >
                <source src={video} type="video/mp4" />
              </video>
            ) : image ? (
              <img
                src={image}
                alt={imageAlt}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
              />
            ) : null}
          </div>

        </div>
      </div>
    </section>
  );
}
