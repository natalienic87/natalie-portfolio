// Decorative collage elements — back to front
const collageElements = [
  // ── Back layer ─────────────────────────────────────────────────────────────
  {
    src: '/images/1-hero/GREN PLANT 1.png',
    style: { top: 'calc(12% + 20px)', right: '-3%', width: '22%' },
    z: 0,
    animClass: 'animate-fabric-blow',
  },
  {
    src: '/images/1-hero/Spiral 1.png',
    style: { top: '42%', left: '75%', width: '4.5%' },
    z: 10,
    animClass: 'animate-pulse-small',
  },
  {
    src: '/images/1-hero/CLOUDS 1.png',
    style: { bottom: 0, left: 'calc(-3% + 30px)', width: '16.2%' },
    z: 0,
    animClass: 'animate-cloud-1',
  },

  // ── Mid layer ──────────────────────────────────────────────────────────────
  {
    src: '/images/1-hero/Star 1.png',
    style: { top: '32%', left: '7%', width: '6%' },
    z: 10,
    animClass: 'animate-spin-star',
  },
  {
    src: '/images/1-hero/PURPLE CLOUD 1.png',
    style: { top: '8%', left: '26%', width: '10%' },
    z: 10,
    animClass: 'animate-cloud-2',
  },
  {
    src: '/images/1-hero/Ellipse 33.svg',
    style: { top: 'calc(10% + 40px)', left: '56%', width: '10.5%' },
    z: 12,
    animClass: 'animate-spin-ellipse',
  },
  {
    src: '/images/1-hero/STARBURST 1.png',
    style: { top: '55%', left: '67.65%', width: '11.7%' },
    z: 13,
    animClass: 'animate-pulse-star-delay',
  },
  {
    src: '/images/1-hero/WHITE STAR 1.png',
    style: { top: '62%', left: '37%', width: '3.5%' },
    z: 16,
    animClass: 'animate-pulse-star-delay-2',
  },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Collage — flex-1 fills remaining viewport height so doorway is never cropped */}
      <div className="relative w-full flex-1 overflow-hidden">

        {/* Purple plant — far right, full illustration height, bleeds off right edge */}
        <img
          src="/images/1-hero/PURPLE PLANT 1.png"
          alt=""
          className="absolute bottom-0 animate-plant-sway"
          style={{ right: '-2%', height: '54.4%', width: 'auto', zIndex: 20 }}
        />

        {/* Planet — outer div positions, inner div spins */}
        <div className="absolute" style={{ top: '50%', left: '15%', width: '16%', transform: 'translateY(-50%)', zIndex: 5 }}>
          <div className="animate-spin-planet">
            <img src="/images/1-hero/PLANET 1.png" alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Doorway + figure — outer div positions, inner div floats */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ zIndex: 15, width: '25%' }}
        >
          <div className="animate-float">
            <img
              src="/images/1-hero/DOORWAY 1.png"
              alt="Creative Director standing in doorway"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* All other decorative elements */}
        {collageElements.map(({ src, style, z, animClass }) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute object-contain${animClass ? ` ${animClass}` : ''}`}
            style={{ ...style, zIndex: z }}
          />
        ))}
      </div>

      {/* Text content */}
      <div className="text-center px-6 pt-[20px] pb-20">
        <h1 className="font-heading font-medium text-[96px] leading-none tracking-normal text-off-white">
          Creative Director
        </h1>
        <h2 className="font-heading font-medium text-[64px] leading-none tracking-normal text-off-white">
          for the new reality
        </h2>
        <p className="font-body font-medium text-body-grey text-[20px] mt-6 max-w-[828px] mx-auto leading-normal">
          Merging high-concept{' '}
          <strong className="text-off-white font-semibold">branding</strong>,
          {' '}cinematic{' '}
          <strong className="text-off-white font-semibold">video</strong>,
          {' '}and{' '}
          <strong className="text-off-white font-semibold">Generative AI</strong>
          {' '}into singular immersive experiences.
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <a
            href="#"
            className="font-body text-[11px] uppercase tracking-[0.18em] font-semibold bg-yellow text-background px-8 py-3.5 hover:opacity-90 transition-opacity"
          >
            View Exhibition
          </a>
          <a
            href="#"
            className="font-body text-[11px] uppercase tracking-[0.18em] text-off-white border border-dashed border-off-white/50 px-8 py-3.5 hover:border-off-white/80 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
