export default function CaseStudyLayout({ children, style }) {
  return (
    <div style={{
      maxWidth:     '1440px',
      margin:       '0 auto',
      width:        '100%',
      paddingLeft:  '120px',
      paddingRight: '120px',
      boxSizing:    'border-box',
      ...style,
    }}>
      {children}
    </div>
  );
}
