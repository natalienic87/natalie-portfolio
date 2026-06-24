import Button from './Button';

const cards = [
  {
    src: '/homepage/3-projects/1-rules.jpg',
    alt: 'Rules We Made Up',
    title: 'Rules We Made Up',
    body: 'Brand identity and campaign design for a tabletop game studio pushing the boundaries of play.',
    cta: 'View Project',
  },
  {
    src: '/homepage/3-projects/2-cvs-agencywork (1).jpg',
    alt: 'CVS Agency Work',
    title: 'CVS Agency Work',
    body: 'Integrated agency work spanning brand, broadcast video, and large-scale digital campaigns.',
    cta: 'View Project',
  },
  {
    src: '/homepage/3-projects/3-brand-refresh.jpg',
    alt: 'Brand Refresh',
    title: 'Brand Refresh',
    body: 'Full identity redesign — from visual language to tone — for a brand ready to evolve.',
    cta: 'View Project',
  },
  {
    src: '/homepage/3-projects/4-ai-integration-honey.jpg',
    alt: 'AI Integration',
    title: 'AI Integration',
    body: 'Blending generative AI with editorial craft to produce a new kind of immersive brand story.',
    cta: 'View Project',
  },
];

function Card({ src, alt, title, body, cta }) {
  return (
    <div
      className="group"
      style={{ transition: 'transform 0.3s ease' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
    >
      {/* Image wrapper clips the zoom to the rounded corners */}
      <div className="overflow-hidden" style={{ borderRadius: '20px' }}>
        <img
          src={src}
          alt={alt}
          className="w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          style={{ aspectRatio: '3 / 4' }}
        />
      </div>
      <h3
        className="font-body font-normal text-off-white"
        style={{ fontSize: '33px', lineHeight: '40px', marginTop: '24px' }}
      >
        {title}
      </h3>
      <p
        className="font-body font-normal text-body-grey"
        style={{ fontSize: '20px', marginTop: '12px', lineHeight: '1.5' }}
      >
        {body}
      </p>
      <Button
        variant="text-link"
        href="#"
        style={{ marginTop: '16px', position: 'relative', zIndex: 1 }}
      >
        {cta}
      </Button>
    </div>
  );
}

export default function Exhibition() {
  const [left, right] = [
    [cards[0], cards[2]],
    [cards[1], cards[3]],
  ];

  return (
    <section style={{ marginTop: '60px', paddingLeft: '80px', paddingRight: '80px' }}>

      {/* Header row */}
      <div className="flex justify-between items-start">
        <div>
          <p
            className="font-body text-off-white/60 uppercase tracking-[0.25em]"
            style={{ fontSize: '12px' }}
          >
            The Exhibition
          </p>
          <h2
            className="font-heading font-bold text-off-white"
            style={{ fontSize: '80px', lineHeight: 1, marginTop: '12px' }}
          >
            Selected works
          </h2>
        </div>

        {/* Dotted circle — circle rotates, text stays centered */}
        <a
          href="#"
          className="relative flex items-center justify-center flex-shrink-0"
          style={{ width: '110px', height: '110px' }}
        >
          <img
            src="/homepage/3-projects/7-Ellipse 33-2.svg"
            alt=""
            className="absolute inset-0 w-full h-full animate-spin-star"
          />
          <span
            className="relative font-body text-off-white text-center uppercase"
            style={{ fontSize: '8px', letterSpacing: '0.14em', lineHeight: '1.5' }}
          >
            View all<br />projects
          </span>
        </a>
      </div>

      {/* Staggered 2-column grid — right column offset 200px down */}
      <div className="flex mt-[40px]" style={{ gap: '40px' }}>

        {/* Left column — sits higher */}
        <div className="flex-1 flex flex-col gap-[60px]">
          {left.map((card) => (
            <Card key={card.src} {...card} />
          ))}
        </div>

        {/* Right column — offset 200px down for asymmetric stagger */}
        <div className="flex-1 flex flex-col gap-10" style={{ paddingTop: '200px' }}>
          {right.map((card) => (
            <Card key={card.src} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
