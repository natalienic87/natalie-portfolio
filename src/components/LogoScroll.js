// height values tuned for optical weight, not pixel height
const logos = [
  { src: '/homepage/2-logos/addventures logo.svg',       alt: '(add)ventures',     h: 36 },
  { src: '/homepage/2-logos/cvs-logo.svg',               alt: 'CVS Health',        h: 24 },
  { src: '/homepage/2-logos/aetna-logo.svg',             alt: 'Aetna',             h: 28 },
  { src: '/homepage/2-logos/stopnstop-logo.svg',         alt: 'Stop & Shop',       h: 32 },
  { src: '/homepage/2-logos/mcp-logo.svg',               alt: 'MCP',               h: 36 },
  { src: '/homepage/2-logos/bob-logo.svg',               alt: 'BOB',               h: 40 },
  { src: '/homepage/2-logos/activeadventures-logo.svg',  alt: 'Active Adventures', h: 32 },
  { src: '/homepage/2-logos/austinadventures-logo.svg',  alt: 'Austin Adventures', h: 50 },
  { src: '/homepage/2-logos/collette-logo.svg',          alt: 'Collette',          h: 30 },
  { src: '/homepage/2-logos/RawBarLogoWhite 1.svg',      alt: 'Raw Bar',           h: 36 },
];

// Gap between every logo — including at the seam between loop repetitions
const GAP = 80;

export default function LogoScroll() {
  return (
    <section
      className="logo-scroll-section mt-[60px] overflow-hidden"
      style={{
        backgroundImage: "url('/homepage/2-logos/1-background-paper.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Label */}
      <p
        className="text-center font-body font-bold text-off-white/60"
        style={{ fontSize: '14px', letterSpacing: '0.3em', paddingTop: '30px' }}
      >
        BRANDS I&apos;VE WORKED WITH
      </p>

      {/* Marquee */}
      <div className="overflow-hidden" style={{ paddingTop: '24px', paddingBottom: '36px' }}>
        {/*
          Two identical sets side-by-side. Each set uses gap for inter-logo spacing
          and paddingRight equal to the gap so the seam between set 1 and set 2
          has the same spacing as every other gap. The outer track animates -50%,
          which equals exactly one set width. Loop is perfectly seamless and even.
        */}
        <div className="flex shrink-0 items-center animate-marquee">
          {[0, 1].map((setIdx) => (
            <div
              key={setIdx}
              className="flex shrink-0 items-center"
              style={{ gap: `${GAP}px`, paddingRight: `${GAP}px` }}
            >
              {logos.map(({ src, alt, h }, i) => (
                <img
                  key={i}
                  src={src}
                  alt={alt}
                  style={{ height: `${h}px`, width: 'auto', flexShrink: 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
