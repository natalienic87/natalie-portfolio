export default function CaseStudyFullBleed({ children, id, background, style }) {
  return (
    <section id={id} style={{ background }}>
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
      }}>
        {children}
      </div>
    </section>
  );
}
