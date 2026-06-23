export default function CaseStudyLayout({ children, style }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', ...style }}>
      {children}
    </div>
  );
}
