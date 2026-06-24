export default function CaseStudyFullBleed({ children, id, background, style, sectionStyle, doodle }) {
  return (
    <section id={id} style={{ background, position: 'relative', zIndex: 2, ...sectionStyle }}>
      {doodle}
      <div style={{
        maxWidth:      '1280px',
        margin:        '0 auto',
        width:         '100%',
        paddingLeft:   '80px',
        paddingRight:  '80px',
        paddingTop:    '80px',
        paddingBottom: '80px',
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
