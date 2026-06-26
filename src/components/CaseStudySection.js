export default function CaseStudySection({ children, id, style, sectionStyle, doodle }) {
  return (
    <section id={id} style={{ backgroundColor: '#FFFBF8', position: 'relative', zIndex: 2, ...sectionStyle }}>
      {doodle}
      <div className="cs-inner" style={{
        maxWidth:      '1440px',
        margin:        '0 auto',
        width:         '100%',
        paddingTop:    '120px',
        paddingBottom: '120px',
        boxSizing:     'border-box',
        ...style,
        position:      'relative',
        zIndex:        1,
      }}>
        {children}
      </div>
    </section>
  );
}
