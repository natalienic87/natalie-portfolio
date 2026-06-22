import Button from '../components/Button';

const row = {
  display:        'flex',
  alignItems:     'center',
  gap:            '24px',
  flexWrap:       'wrap',
};

const label = {
  fontFamily:   'Poppins, sans-serif',
  fontSize:     '11px',
  letterSpacing:'0.15em',
  textTransform:'uppercase',
  color:        'rgba(255,255,255,0.4)',
  marginBottom: '12px',
};

export default function ButtonsTest() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#101010', padding: '80px 60px', display: 'flex', flexDirection: 'column', gap: '56px' }}>

      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
        Button Variants
      </h1>

      {/* Primary */}
      <div>
        <p style={label}>Primary</p>
        <div style={row}>
          <Button variant="primary">View Exhibition</Button>
          <Button variant="primary">Download Resume</Button>
        </div>
      </div>

      {/* Dashed outline */}
      <div>
        <p style={label}>Dashed Outline</p>
        <div style={row}>
          <Button variant="dashed-outline">Contact Me</Button>
          <Button variant="dashed-outline">Learn More</Button>
        </div>
      </div>

      {/* Text link */}
      <div>
        <p style={label}>Text Link</p>
        <div style={row}>
          <Button variant="text-link" arrow="down">Download My Resume</Button>
          <Button variant="text-link">See All Projects</Button>
        </div>
      </div>

      {/* All together */}
      <div>
        <p style={label}>All Together</p>
        <div style={row}>
          <Button variant="primary">View Exhibition</Button>
          <Button variant="dashed-outline">Contact Me</Button>
          <Button variant="text-link">See All Projects</Button>
        </div>
      </div>

    </main>
  );
}
