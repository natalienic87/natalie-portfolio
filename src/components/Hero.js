import { useState } from 'react';
import Button from './Button';

const HEADING = "Hi I'm Natalie.";
const COLORS  = ['#E35038', '#FDB154', '#8286F7', '#FBC1C2', '#6374E4', '#FB5755'];

// Decorative collage elements — back to front
const collageElements = [
  // ── Back layer ─────────────────────────────────────────────────────────────
  {
    src: '/homepage/1-hero/GREN PLANT 1.png',
    style: { top: 'calc(12% + 20px)', right: '-3%', width: '22%' },
    z: 0,
    animClass: 'animate-fabric-blow',
  },
  {
    src: '/homepage/1-hero/Spiral 1.png',
    style: { top: '42%', left: '75%', width: '4.5%' },
    z: 10,
    animClass: 'animate-pulse-small',
  },
  {
    src: '/homepage/1-hero/CLOUDS 1.png',
    style: { bottom: 0, left: 'calc(-3% + 30px)', width: '16.2%' },
    z: 0,
    animClass: 'animate-cloud-1',
  },

  // ── Mid layer ──────────────────────────────────────────────────────────────
  {
    src: '/homepage/1-hero/Star 1.png',
    style: { top: '32%', left: '7%', width: '6%' },
    z: 10,
    animClass: 'animate-spin-star',
  },
  {
    src: '/homepage/1-hero/PURPLE CLOUD 1.png',
    style: { top: '8%', left: '26%', width: '10%' },
    z: 10,
    animClass: 'animate-cloud-2',
  },
  {
    src: '/homepage/1-hero/Ellipse 33.svg',
    style: { top: 'calc(10% + 40px)', left: '56%', width: '10.5%' },
    z: 12,
    animClass: 'animate-spin-ellipse',
  },
  {
    src: '/homepage/1-hero/STARBURST 1.png',
    style: { top: '55%', left: '67.65%', width: '7%' },
    z: 13,
    animClass: 'animate-pulse-star-delay',
  },
  {
    src: '/homepage/1-hero/WHITE STAR 1.png',
    style: { top: '62%', left: '37%', width: '3.5%' },
    z: 16,
    animClass: 'animate-pulse-star-delay-2',
  },
];

export default function Hero() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const liftFor = (i) => {
    if (hoveredIdx === null) return 0;
    const d = Math.abs(i - hoveredIdx);
    if (d === 0) return -14;
    if (d === 1) return -7;
    if (d === 2) return -3;
    return 0;
  };

  return (
    <section className="min-h-screen flex flex-col">
      {/* Collage — flex-1 fills remaining viewport height so doorway is never cropped */}
      <div className="relative w-full flex-1 overflow-hidden">

        {/* Purple plant — far right, full illustration height, bleeds off right edge */}
        <img
          src="/homepage/1-hero/PURPLE PLANT 1.png"
          alt=""
          className="absolute bottom-0 animate-plant-sway"
          style={{ right: '-2%', height: '54.4%', width: 'auto', zIndex: 20 }}
        />

        {/* Planet — outer div positions, inner div spins */}
        <div className="absolute" style={{ top: '50%', left: '15%', width: '16%', transform: 'translateY(-50%)', zIndex: 5 }}>
          <div className="animate-spin-planet">
            <img src="/homepage/1-hero/PLANET 1.png" alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Doorway + figure — outer div positions, inner div floats */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ zIndex: 15, width: '25%' }}
        >
          <div className="animate-float">
            <img
              src="/homepage/1-hero/DOORWAY 1.png"
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
        <h1 className="font-heading font-bold leading-none tracking-normal" style={{ fontSize: '80px' }}>
          {HEADING.split('').map((char, i) => (
            <span
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display:    'inline-block',
                whiteSpace: 'pre',
                color:      hoveredIdx === i ? COLORS[i % COLORS.length] : '#ffffff',
                transform:  `translateY(${liftFor(i)}px)`,
                transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), color 0.15s ease',
                cursor:     'default',
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="font-body font-normal text-body-grey text-[20px] mt-6 max-w-[828px] mx-auto leading-normal">
          Merging high-concept{' '}
          <strong className="text-off-white font-semibold">branding</strong>,
          {' '}cinematic{' '}
          <strong className="text-off-white font-semibold">video</strong>,
          {' '}and{' '}
          <strong className="text-off-white font-semibold">Generative AI</strong>
          {' '}into singular immersive experiences.
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <Button variant="primary" href="#">View Exhibition</Button>
          <Button variant="dashed-outline" href="#">Contact Me</Button>
        </div>
      </div>
    </section>
  );
}
