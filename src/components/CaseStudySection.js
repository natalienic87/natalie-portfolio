export default function CaseStudySection({ children, id, style }) {
  return (
    <section id={id} style={{ backgroundColor: '#FFFBF8' }}>
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
      }}>
        {children}
      </div>
    </section>
  );
}
