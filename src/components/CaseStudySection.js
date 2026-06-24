export default function CaseStudySection({ children, id, style, sectionStyle, doodle }) {
  return (
    <section id={id} style={{ backgroundColor: '#FFFBF8', position: 'relative', zIndex: 2, ...sectionStyle }}>
      {doodle}
      <div style={{
        maxWidth:      '1280px',
        margin:        '0 auto',
        width:         '100%',
        paddingLeft:   '175px',
        paddingRight:  '175px',
        paddingTop:    '150px',
        paddingBottom: '150px',
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
