export default function CaseStudyLayout({ children, style }) {
  return (
    <div style={{
      maxWidth:     '1280px',
      margin:       '0 auto',
      width:        '100%',
      paddingLeft:  '80px',
      paddingRight: '80px',
      boxSizing:    'border-box',
      ...style,
    }}>
      {children}
    </div>
  );
}
