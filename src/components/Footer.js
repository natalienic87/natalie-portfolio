import Button from './Button';

export default function Footer() {
  return (
    <footer style={{ position: 'relative', zIndex: 2, backgroundColor: '#101010', overflow: 'hidden' }}>

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 40px 60px' }}>

        {/* Mail icon */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '52px', height: '52px', backgroundColor: '#101010',
          border: '2px solid rgba(255,255,255,0.85)', borderRadius: '10px',
          marginBottom: '28px',
        }}>
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.75" y="0.75" width="22.5" height="16.5" rx="1.25" stroke="white" strokeWidth="1.5"/>
            <path d="M1 1.5L12 10.5L23 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-heading"
          style={{ fontWeight: 500, fontSize: '80px', color: '#ffffff', margin: '0 0 20px', lineHeight: 1.05 }}>
          Open a new dimension
        </h2>

        {/* Subtext */}
        <p className="font-body"
          style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', margin: '0 0 36px', lineHeight: 1.6 }}>
          Currently accepting <strong style={{ color: '#ffffff', fontStyle: 'italic' }}>Generative AI</strong>,
          {' '}concept <strong style={{ color: '#ffffff' }}>Branding</strong>, and cinematic{' '}
          <strong style={{ color: '#ffffff' }}>Video</strong> into singular immersive experiences.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '48px' }}>
          <Button variant="primary" href="#">View Exhibition</Button>
          <Button variant="dashed-outline" href="#">Contact Me</Button>
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '48px', justifyContent: 'center' }}>
          {['LinkedIn', 'Substack', 'Instagram', 'Facebook'].map((name) => (
            <a key={name} href="#" className="font-body"
              style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
              }}>
              {name}
            </a>
          ))}
        </div>
      </div>

      {/* Planet — ~100px left and below Substack link */}
      <img src="/homepage/7-footer/Planet 1.png" alt=""
        className="animate-float-lazy"
        style={{ position: 'absolute', top: '580px', left: 'calc(50% - 200px)', width: '115px', zIndex: 3, pointerEvents: 'none' }} />

      {/* Light purple flower — far right, above orange/red leaves */}
      <img src="/homepage/7-footer/L Purple Flower 1.png" alt=""
        className="animate-spin-planet-reverse"
        style={{ position: 'absolute', top: '580px', left: 'calc(82% + 105px)', width: '120px', zIndex: 3, pointerEvents: 'none' }} />

      {/* Moon — same y as planet, above right plant section */}
      <img src="/homepage/7-footer/Moon_ 1.png" alt=""
        className="animate-float"
        style={{ position: 'absolute', top: '540px', left: 'calc(68% + 50px)', width: '64px', zIndex: 3, pointerEvents: 'none' }} />

      {/* Diamond star — upper, right of center */}
      <img src="/homepage/7-footer/Yellow Diamond Star 2.png" alt=""
        className="animate-pulse-star-fast"
        style={{ position: 'absolute', top: '540px', left: 'calc(58% + 60px)', width: '24px', zIndex: 3, pointerEvents: 'none' }} />

      {/* Diamond star — lower, left of center */}
      <img src="/homepage/7-footer/Yellow Diamond Star 2.png" alt=""
        className="animate-pulse-star-slow"
        style={{ position: 'absolute', top: '670px', left: 'calc(72% - 230px)', width: '20px', zIndex: 3, pointerEvents: 'none' }} />

      {/* White star — 28px below social links, left-aligned with flower */}
      <img src="/homepage/7-footer/White Star 1.png" alt=""
        className="animate-pulse-star"
        style={{ position: 'absolute', top: '460px', left: 'calc(3% + 280px)', width: '36px', zIndex: 3, pointerEvents: 'none' }} />

      {/* ── Bottom zone: floating elements + botanical strip ── */}
      <div style={{ position: 'relative', lineHeight: 0 }}>

        {/* Orange flower — sitting on purple stem, far left */}
        <img src="/homepage/7-footer/Yellow Flower 1 (1).png" alt=""
          className="animate-spin-planet" style={{ position: 'absolute', bottom: 'calc(60% - 40px)', left: 'calc(3% + 70px)', width: '181px', zIndex: 3, pointerEvents: 'none' }} />

        {/* Purple flower — resting on yellow-leafed stem */}
        <img src="/homepage/7-footer/M Purple Flower 1.png" alt=""
          className="animate-spin-planet-reverse"
          style={{ position: 'absolute', bottom: 'calc(55% - 180px)', left: 'calc(52% - 215px)', width: '120px', zIndex: 3, pointerEvents: 'none' }} />

        {/* Yellow flower 2 — resting on purple stem, right side, near bottom */}
        <img src="/homepage/7-footer/Yellow Flower 2.png" alt=""
          className="animate-spin-planet"
          style={{ position: 'absolute', bottom: 'calc(20% - 90px)', left: 'calc(72% - 170px)', width: '126px', zIndex: 3, pointerEvents: 'none' }} />

        {/* White fern — rising from center-right plant group */}
        <img src="/homepage/7-footer/White fern 1 (1).png" alt=""
          style={{ position: 'absolute', bottom: '-40px', left: 'calc(52% + 380px)', width: '126px', zIndex: 3, pointerEvents: 'none' }} />

        {/* Red Fern — nestled between white fern and brown leaf */}
        <img src="/homepage/7-footer/Red Fern 1 (1).png" alt=""
          style={{ position: 'absolute', bottom: '0', left: 'calc(28% - 90px)', width: '120px', zIndex: 3, pointerEvents: 'none' }} />

        {/* Botanical base image */}
        <img
          src="/homepage/7-footer/Base Image (1).png"
          alt=""
          style={{ width: '100%', display: 'block', position: 'relative', zIndex: 2 }}
        />
      </div>

    </footer>
  );
}
