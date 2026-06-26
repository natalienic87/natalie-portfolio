import Link from 'next/link';

const cards = [
  {
    video: '/homepage/3-projects/1-rules.mp4',
    src:   '/homepage/3-projects/1-rules.jpg',
    alt:   'Rules We Made Up',
    title: 'Creating an AI Animated Short, "Rules We Made Up"',
    body:  'AI-assisted character, world-building, and visual storytelling for a personal animated short. Plus, how a solo project became a community scene.',
    cta:   'Explore Case Study',
    href:  '/rules-we-made-up',
  },
  {
    src:   '/homepage/3-projects/2-cvs-agencywork (1).jpg',
    alt:   'CVS Agency Work',
    title: 'Agency Work: CVS Health®',
    body:  'Agency work across CVS.com systems, campaign design, scalable templates, and brand platform support.',
    cta:   'Request Access',
    href:  '/cvs-aetna',
  },
  {
    src:   '/homepage/3-projects/3-brand-refresh.jpg',
    alt:   'Brand Refresh',
    title: '(add)ventures Brand Refresh',
    body:  'An internal agency brand refresh built from strategy, collage, typography, office culture, and flexible design rules.',
    cta:   'Explore Case Study',
    href:  '/add-refresh',
  },
  {
    src:   '/homepage/3-projects/4-ai-integration-honey.jpg',
    alt:   'AI Integration',
    title: 'Burketts Bees / AI Integration',
    body:  'How a self-initiated AI branding experiment grew into a new creative role, internal education, and agency-wide AI integration.',
    cta:   'Explore Case Study',
    href:  '/burketts-bees',
  },
];

function Card({ src, alt, title, body, cta, video, href }) {
  return (
    <Link
      href={href}
      className="group"
      style={{ display: 'block', textDecoration: 'none', transition: 'transform 0.3s ease' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
    >
      {/* Media wrapper clips zoom to rounded corners */}
      <div className="overflow-hidden" style={{ borderRadius: '20px' }}>
        {video ? (
          <video
            autoPlay muted loop playsInline
            className="w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            style={{ aspectRatio: '3 / 4', display: 'block' }}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            style={{ aspectRatio: '3 / 4' }}
          />
        )}
      </div>

      <h3
        className="font-body font-normal text-off-white"
        style={{ fontSize: '33px', lineHeight: '40px', marginTop: '24px' }}
      >
        {title}
      </h3>
      <p
        style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '20px', lineHeight: 1.6, marginTop: '12px', color: 'rgba(255,255,255,0.65)' }}
      >
        {body}
      </p>
      <p style={{
        fontFamily:    'Fira Mono, monospace',
        fontWeight:    400,
        fontSize:      '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         'rgba(255,255,255,0.7)',
        marginTop:     '16px',
      }}>
        {cta} →
      </p>
    </Link>
  );
}

export default function Exhibition() {
  const [left, right] = [
    [cards[0], cards[2]],
    [cards[1], cards[3]],
  ];

  return (
    <section style={{ marginTop: '60px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 120px', boxSizing: 'border-box' }}>

        {/* Header row */}
        <div className="flex justify-between items-start">
          <div>
            <p style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 500, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              The Exhibition
            </p>
            <h2
              className="font-heading font-bold text-off-white"
              style={{ fontSize: '64px', lineHeight: 1.05, marginTop: '12px' }}
            >
              Selected works
            </h2>
          </div>

          {/* Dotted circle */}
          <a
            href="mailto:natalienic87@gmail.com"
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
              Let&rsquo;s work<br />together
            </span>
          </a>
        </div>

        {/* Staggered 2-column grid */}
        <div className="flex mt-[40px]" style={{ gap: '40px' }}>
          <div className="flex-1 flex flex-col gap-[60px]">
            {left.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-10" style={{ paddingTop: '200px' }}>
            {right.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
