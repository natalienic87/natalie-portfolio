export default function CaseStudyFullBleed({ children, id, background, style, sectionStyle, doodle }) {
  return (
    <section id={id} style={{ background, position: 'relative', zIndex: 2, ...sectionStyle }}>
      {doodle}
      <div style={{
        maxWidth:      '1440px',
        margin:        '0 auto',
        width:         '100%',
        paddingLeft:   '120px',
        paddingRight:  '120px',
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
