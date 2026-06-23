import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';

// ── Minimal case-study nav ────────────────────────────────────────────────────
function CaseStudyNav() {
  const [hovered, setHovered] = useState(false);

  return (
    <nav style={{
      position:       'absolute',
      top:            0,
      left:           0,
      right:          0,
      zIndex:         50,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '20px 32px',
    }}>
      {/* ← HOME */}
      <Link
        href="/"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '8px',
          fontFamily:     'Poppins, sans-serif',
          fontWeight:     700,
          fontSize:       '11px',
          letterSpacing:  '0.18em',
          textTransform:  'uppercase',
          textDecoration: 'none',
          color:          '#FDB154',
          paddingBottom:  '4px',
          position:       'relative',
          transition:     'opacity 0.2s ease',
          opacity:        hovered ? 0.75 : 1,
        }}
      >
        <span style={{ fontSize: '14px', lineHeight: 1 }}>←</span>
        Home
      </Link>

      {/* Hamburger */}
      <button aria-label="Open menu" style={{
        display:        'flex',
        flexDirection:  'column',
        gap:            '5px',
        background:     'none',
        border:         'none',
        cursor:         'pointer',
        padding:        0,
      }}>
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#101010' }} />
      </button>
    </nav>
  );
}

// ── Metadata label/value pair ─────────────────────────────────────────────────
function MetaItem({ label, value }) {
  const labelStyle = {
    fontFamily:    'Fira Mono, monospace',
    fontWeight:    400,
    fontSize:      '14px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight:    1.5,
    color:         '#404040',
  };
  const valueStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize:   '14px',
    lineHeight: 1.5,
    color:      '#404040',
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0 16px' }}>
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  );
}

// ── But first, a storyboard ───────────────────────────────────────────────────
function HowItStarted() {
  return (
    <section style={{
      display:       'flex',
      gap:           '60px',
      paddingLeft:   '80px',
      paddingRight:  '175px',
      paddingTop:    '100px',
      paddingBottom: '0',
      alignItems:    'flex-start',
    }}>

      {/* Left: photo + caption */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ marginBottom: '12px', width: '515px', height: '387px' }}>
          <img
            src="/rules-we-made-up/3-how-it-started/Storyboard 1.jpg"
            alt="Storyboard planning documents"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <p style={{
          fontFamily: 'Fira Mono, monospace',
          fontWeight: 400,
          fontSize:   '13px',
          lineHeight: 1.5,
          color:      '#666666',
          margin:     0,
        }}>I printed it out, because I'm old school like that.</p>
      </div>

      {/* Right: heading + body */}
      <div style={{ flex: 1 }}>
        <h2 className="font-body" style={{
          fontWeight: 700,
          fontSize:   '33px',
          color:      '#101010',
          margin:     '0 0 12px',
        }}>But first, a storyboard</h2>
        <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '20px', lineHeight: 1.5, color: '#404040', margin: '0 0 20px' }}>
          What did I do to start this thing. Before touching any tool, I needed a map. I adapted
          the poem into lyrics, built the song in Suno to set my runtime, then storyboarded scene
          by scene before generating a single frame.
        </p>
        <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '20px', lineHeight: 1.5, color: '#404040', margin: 0 }}>
          The Title "Rules We Made Up" comes from a line in my poem, which I fought to keep in
          the lyrics. As the rules we make up about work, creativity and value are all shifting,
          it felt like appropriate timing.
        </p>
      </div>

    </section>
  );
}

// ── Character Creation ────────────────────────────────────────────────────────
const slides = [
  {
    img:  '/rules-we-made-up/4-character-creation/1-nat-claymation.jpg',
    copy: 'Placeholder copy for slide 1. Describe this character iteration here.',
  },
  {
    img:  '/rules-we-made-up/4-character-creation/2-nat-claymation.jpg',
    copy: 'Placeholder copy for slide 2. Describe this character iteration here.',
  },
  {
    img:  '/rules-we-made-up/4-character-creation/3-nat-claymation.jpg',
    copy: 'Placeholder copy for slide 3. Describe this character iteration here.',
  },
  {
    img:  '/rules-we-made-up/4-character-creation/4-nat-claymation.jpg',
    copy: 'Many iterations later, I found her. I locked in my brand color palette on her clothing, and added fox ears as a visual thread — to recognize her as the same character as she ages.\n\nHigh quality polymer clay render, stop-motion aesthetic, hand-made texture.',
  },
  {
    img:  '/rules-we-made-up/4-character-creation/5-nat-claymation.jpg',
    copy: 'Placeholder copy for slide 5. Describe this character iteration here.',
  },
];

const cardRotations = [-2, 3, -4, 1.5, -3];

function CharacterCreation() {
  const [index,      setIndex]      = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flyingOut,   setFlyingOut]   = useState(false);
  const [direction,   setDirection]   = useState('next');

  const n = slides.length;

  const go = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setFlyingOut(true);

    setTimeout(() => {
      setFlyingOut(false);
      setIndex(i => dir === 'next' ? (i + 1) % n : (i - 1 + n) % n);
    }, 400);

    setTimeout(() => setIsAnimating(false), 450);
  };

  // Per-slide card styles — each slide has a persistent DOM node
  const getCardStyle = (si) => {
    const pos = (si - index + n) % n; // 0=front, 1=back1, 2=back2, 3+=hidden
    const rot = cardRotations[si];
    const flyX  = direction === 'next' ? '120%' : '-120%';
    const flyRot = direction === 'next' ? rot + 15 : rot - 15;

    if (pos === 0) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     3,
      transform:  flyingOut ? `translateX(${flyX}) rotate(${flyRot}deg)` : `rotate(${rot}deg)`,
      opacity:    flyingOut ? 0 : 1,
      boxShadow:  '0px 12px 32px rgba(0,0,0,0.18)',
      transition: 'transform 0.4s ease-in, opacity 0.3s ease-in',
    };
    if (pos === 1) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     2,
      transform:  flyingOut ? `rotate(${rot}deg)` : `rotate(${rot}deg) translate(6px, 8px)`,
      opacity:    1,
      boxShadow:  '-4px 6px 18px rgba(0,0,0,0.12)',
      transition: 'transform 0.4s ease-out',
    };
    if (pos === 2) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     1,
      transform:  flyingOut ? `rotate(${rot}deg) translate(6px, 8px)` : `rotate(${rot}deg) translate(-8px, 14px)`,
      opacity:    1,
      boxShadow:  '-8px 8px 24px rgba(0,0,0,0.12)',
      transition: 'transform 0.4s ease-out',
    };
    // hidden — snap instantly, no transition
    return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     0,
      transform:  `rotate(${rot}deg) translate(-8px, 14px)`,
      opacity:    0,
      boxShadow:  'none',
      transition: 'none',
    };
  };

  const ArrowBtn = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        width:          '44px',
        height:         '44px',
        borderRadius:   '50%',
        border:         '1.5px solid rgba(0,0,0,0.3)',
        background:     'none',
        color:          '#101010',
        fontSize:       '18px',
        cursor:         isAnimating ? 'default' : 'pointer',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        transition:     'border-color 0.2s ease',
        flexShrink:     0,
        opacity:        isAnimating ? 0.4 : 1,
      }}
      onMouseEnter={e => { if (!isAnimating) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.6)'; }}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'}
    >
      {children}
    </button>
  );

  return (
    <section style={{
      display:       'flex',
      gap:           '60px',
      paddingLeft:   '80px',
      paddingRight:  '80px',
      paddingTop:    '100px',
      paddingBottom: '100px',
      alignItems:    'flex-start',
    }}>

      {/* ── Left: heading + text + 2×2 photo grid ── */}
      <div style={{ flex: '0 0 38%' }}>
        <h2 className="font-body" style={{
          fontWeight: 700,
          fontSize:   '33px',
          color:      '#101010',
          margin:     '0 0 12px',
        }}>Creating my characters</h2>
        <p style={{
          fontFamily: 'Fraunces, serif',
          fontWeight: 400,
          fontSize:   '20px',
          lineHeight: 1.5,
          color:      '#404040',
          margin:     '0 0 32px',
        }}>
          I needed references that would actually make me feel something, so I grabbed some
          old photos of myself as a kid. I used them in Nano Banana Pro to start developing
          my character.
        </p>

        {/* Reference photo collage */}
        <div style={{ width: '413px', height: '469px', borderRadius: '8px', overflow: 'hidden' }}>
          <img
            src="/rules-we-made-up/4-character-creation/collage-nat-photos.jpg"
            alt="Childhood reference photos"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* ── Right: card stack + arrows below ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

        {/* Stack container */}
        <div style={{ position: 'relative', width: '518px', height: '628px' }}>
          {slides.map((s, si) => {
            const base = getCardStyle(si);
            return (
              <div key={si} style={base}>
                <img
                  src={s.img}
                  alt={`Character slide ${si + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>
            );
          })}
        </div>

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <ArrowBtn onClick={() => go('prev')}>←</ArrowBtn>
          <ArrowBtn onClick={() => go('next')}>→</ArrowBtn>
        </div>
      </div>

    </section>
  );
}

// ── More Friends ─────────────────────────────────────────────────────────────
const friends = [
  { file: 'Piggie', label: 'Jim'             },
  { file: 'wizard', label: 'Will'             },
  { file: 'Mom',    label: 'Mom'             },
  { file: 'Piper',  label: 'Piper'           },
  { file: 'Tom',    label: 'Tom'             },
];

function MoreFriends() {
  const [hovered, setHovered] = useState(null);
  return (
    <section style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '0', paddingBottom: '100px' }}>
      <p style={{
        fontFamily:    'Fira Mono, monospace',
        fontWeight:    400,
        fontSize:      '13px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         '#404040',
        textAlign:     'center',
        marginBottom:  '40px',
      }}>More friends and family</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
        {friends.map(({ file, label }) => (
          <div
            key={file}
            style={{
              position:   'relative',
              width:      '198px',
              height:     '198px',
              borderRadius: '50%',
              overflow:   'hidden',
              flexShrink: 0,
              transform:  hovered === file ? 'translateY(-8px)' : 'translateY(0px)',
              transition: 'transform 0.3s ease',
              cursor:     'pointer',
            }}
            onMouseEnter={() => setHovered(file)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={`/rules-we-made-up/6-family/${file}.png`}
              alt={label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Name overlay */}
            <div style={{
              position:        'absolute',
              inset:           0,
              borderRadius:    '50%',
              backgroundColor: 'rgba(0,0,0,0.45)',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              opacity:         hovered === file ? 1 : 0,
              transition:      'opacity 0.25s ease',
            }}>
              <span style={{
                fontFamily:    'Fira Mono, monospace',
                fontWeight:    400,
                fontSize:      '13px',
                letterSpacing: '0.08em',
                color:         '#ffffff',
                textAlign:     'center',
              }}>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Mushroom Friend ───────────────────────────────────────────────────────────
function MushroomFriend() {
  return (
    <section style={{ display: 'flex', width: '100%', height: '800px' }}>

      {/* Left — red panel with Fira Mono text */}
      <div style={{
        flex:            '0 0 50%',
        backgroundColor: '#C2311E',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '80px',
        boxSizing:       'border-box',
      }}>
        <div>
          <p style={{
            fontFamily: 'Fira Mono, monospace',
            fontWeight: 400,
            fontSize:   '25px',
            lineHeight: 1.8,
            color:      '#ffffff',
            margin:     '0 0 24px',
          }}>
            The Mushroom Friend is a symbol for creativity — the kind you have as a kid,
            before self-doubt gets in the way, and the kind that rescues you later when
            you need it most.
          </p>
          <p style={{
            fontFamily: 'Fira Mono, monospace',
            fontWeight: 400,
            fontSize:   '25px',
            lineHeight: 1.8,
            color:      '#ffffff',
            margin:     0,
          }}>
            Mushrooms are also the earth's greatest underground connectors,
            linking entire forests invisibly. Creativity flows the same way.
          </p>
        </div>
      </div>

      {/* Right — looping video, full bleed */}
      <div style={{ flex: '0 0 50%', position: 'relative', overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        >
          <source src="/rules-we-made-up/5-mushroom-friend/Mushroom Dance.mp4" type="video/mp4" />
        </video>
      </div>

    </section>
  );
}

// ── Filmmaking Principles ─────────────────────────────────────────────────────
const principles = [
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/mix-your-shots.jpg',
    title: 'Mix Your Shots',
    body:  'Think like a director. Establishing shots orient. Close-ups create intimacy. Low angles create power. Learn a handful of camera terms and use them in your prompts — AI responds well. And when AI can\'t execute a transition, do it manually. That\'s not wasted time. It\'s what gives you options.',
  },
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/insert-yourself.jpg',
    title: 'Insert Yourself into the Film',
    body:  'Ask: what makes this film mine? My character wore the outfits I loved in my twenties. There\'s maple syrup on the kitchen table because we always had it growing up. Nobody else would make those connections. That\'s exactly why they\'re there.',
  },
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/direct-for-consistency.jpg',
    title: 'Direct for Consistency & Continuity',
    body:  'Consistency — same character, same style across every shot — is only the baseline. What matters more is continuity: the connective tissue between scenes. The viewer may not notice it, but they need to feel the world keeps moving even when the camera isn\'t watching.',
  },
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/prompt-with-emotion.jpg',
    title: 'Prompt with Emotion',
    body:  'AI will give you expressive faces if you ask. But the moments that hit harder are the subtler ones — a hand appearing from outside the frame, a quick glance between characters, a camera shake to evoke disorientation. Give the tool a vibe instead of an expression.',
  },
  {
    img:   '/rules-we-made-up/8-filmmaking-principles/generate-short-ruthlessly.jpg',
    title: 'Generate Short. Edit Ruthlessly.',
    body:  'Go scene by scene. The tool will get it wrong — but the output is raw footage, not a final product. What you do in post — the cuts, the transitions, the sound design — that\'s your eye, your timing, your judgment. That\'s what creates the story.',
  },
];

function BlooperReel() {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '120px', paddingLeft: '80px', paddingRight: '80px' }}>

      <h2 className="font-body" style={{
        fontWeight:  600,
        fontSize:    '33px',
        lineHeight:  1.1,
        color:       '#101010',
        textAlign:   'center',
        margin:      '0 0 12px',
      }}>
        How it ended: With a Blooper Reel
      </h2>

      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize:   '20px',
        lineHeight: 1.5,
        color:      '#404040',
        textAlign:  'center',
        margin:     '0 0 48px',
      }}>
        Every film deserves one. This says more about the process than the final cut does.
      </p>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1193427742?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Outtakes - Rules We Made Up"
            />
          </div>
        </div>
      </div>

    </section>
  );
}

function TheTool() {
  return (
    <section style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '175px', paddingRight: '175px' }}>
      <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>

        {/* Left — text */}
        <div style={{ flex: '0 0 30%' }}>
          <h2 className="font-body" style={{
            fontWeight: 700,
            fontSize:   '33px',
            lineHeight: 1.1,
            color:      '#101010',
            margin:     '0 0 12px',
          }}>
            LTX Studio
          </h2>

          <p style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 400,
            fontSize:   '20px',
            lineHeight: 1.5,
            color:      '#404040',
            margin:     '0 0 20px',
          }}>
            I chose LTX Studio for its built-in storyboarding feature — for a 3-minute film, I needed something that could hold the full sequence together. I learned quickly that uploading everything at once was an expensive mistake. Going scene by scene, slower, was faster in the end.
          </p>

        </div>

        {/* Right — screenshot, no rounded corners */}
        <div style={{ flex: 1 }}>
          <img
            src="/rules-we-made-up/9-the-tool/LTX.jpg"
            alt="LTX Studio interface"
            style={{ width: '100%', height: '359px', objectFit: 'cover', display: 'block', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)' }}
          />
        </div>

      </div>
    </section>
  );
}

function FilmmakingPrinciples() {
  const trackRef = useRef(null);
  const N        = principles.length;
  const looped   = [...principles, ...principles, ...principles];
  const CARD_W   = 380;
  const GAP      = 20;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = N * (CARD_W + GAP);
  }, []);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const setW = N * (CARD_W + GAP);
    if (track.scrollLeft >= setW * 2) track.scrollLeft -= setW;
    else if (track.scrollLeft <= 0)   track.scrollLeft += setW;
  };

  return (
    <section style={{
      backgroundImage:    "url('/Medium-beige-darker-bg2.jpg')",
      backgroundSize:     'cover',
      backgroundPosition: 'center',
      paddingTop:         '100px',
      paddingBottom:      '100px',
    }}>

      {/* Centered heading + subtitle */}
      <div style={{ textAlign: 'center', paddingLeft: '80px', paddingRight: '80px', marginBottom: '48px' }}>
        <h2 className="font-body" style={{
          fontWeight: 700,
          fontSize:   '40px',
          lineHeight: 1.1,
          color:      '#101010',
          margin:     '0 0 16px',
        }}>Nat's 6 AI Filmmaking Principles</h2>
        <p style={{
          fontFamily: 'Fraunces, serif',
          fontWeight: 400,
          fontSize:   '20px',
          lineHeight: 1.5,
          color:      '#404040',
          margin:     '0 auto',
          maxWidth:   '560px',
        }}>
          Six things I learned making an animated short with AI — things I'd tell anyone starting out.
        </p>
      </div>

      {/* Scrollable card track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        style={{
          display:         'flex',
          gap:             `${GAP}px`,
          overflowX:       'auto',
          scrollbarWidth:  'none',
          msOverflowStyle: 'none',
          paddingLeft:     '80px',
          paddingRight:    '80px',
          paddingBottom:   '8px',
          alignItems:      'flex-start',
        }}
      >
        {looped.map((p, i) => (
          <div key={i} style={{
            flexShrink:      0,
            width:           '665px',
            height:          '584px',
            backgroundColor: '#ffffff',
            borderRadius:    '20px',
            overflow:        'hidden',
            border:          '2px dashed #101010',
            padding:         '20px',
            display:         'flex',
            flexDirection:   'column',
          }}>
            {/* Image */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', flexShrink: 0 }}>
              <img
                src={p.img}
                alt={p.title}
                style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Text */}
            <h3 className="font-body" style={{
              fontWeight: 700,
              fontSize:   '24px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 10px',
            }}>{p.title}</h3>
            <p style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 400,
              fontSize:   '16px',
              lineHeight: 1.5,
              color:      '#404040',
              margin:     0,
            }}>{p.body}</p>
          </div>
        ))}
      </div>

    </section>
  );
}

// ── Roll Call ─────────────────────────────────────────────────────────────────
const festivalImages = [
  { src: '1-CREDITS_DALLAS.jpg',  alt: 'Dallas'  },
  { src: '2-CREDITS_Alyssa.jpg',  alt: 'Alyssa'  },
  { src: '3-CREDITS_Anna.jpg',    alt: 'Anna'    },
  { src: '4-CREDITS_RECLAIM.jpg', alt: 'Reclaim' },
  { src: '5-CREDITS_TOM.jpg',     alt: 'Tom'     },
];

function RollCall() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const n = festivalImages.length;

  const body = {
    fontFamily: 'Fraunces, serif',
    fontWeight: 400,
    fontSize:   '20px',
    lineHeight: 1.5,
    color:      '#404040',
    margin:     '0 0 20px',
  };

  return (
    <section style={{
      backgroundColor: '#F5F0EC',
      paddingLeft:     '175px',
      paddingRight:    '175px',
      paddingTop:      '100px',
      paddingBottom:   '100px',
    }}>
      <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

      {/* Left — phone mockup */}
      <div style={{ flexShrink: 0 }}>
        <img
          src="/rules-we-made-up/7-roll-call/Roll-call-mockup.png"
          alt="Substack roll call post on phone"
          style={{ height: '775px', width: 'auto', display: 'block', boxShadow: '4px 4px 90px 0px rgba(0,0,0,0.10)' }}
        />
      </div>

      {/* Right — heading + body + groups image */}
      <div style={{ flex: 1 }}>
        <h2 className="font-body" style={{
          fontWeight: 700,
          fontSize:   '33px',
          lineHeight: 1.1,
          color:      '#101010',
          margin:     '0 0 12px',
        }}>
          Inviting the Substack community into the film
        </h2>

        <p style={body}>
          My film had a festival scene near the end — about 30 seconds of runtime — and I needed
          a crowd. That's when I invited my Substack community to make themselves a claymation
          character and I'd put them in the film. I provided the prompt, and eighteen people showed up.
        </p>
        <p style={body}>
          I divided all the characters into groups by scene so I could animate each cluster
          separately and control the lighting as the night progressed.
        </p>

        {/* Character groups image */}
        <img
          src="/rules-we-made-up/7-roll-call/SupportingCast-groups.png"
          alt="Supporting cast character groups"
          style={{ width: '100%', display: 'block', marginBottom: '32px' }}
        />

      </div>

      </div>{/* end flex row */}

      {/* Fira Mono label above family photo */}
      <p style={{
        fontFamily:    'Fira Mono, monospace',
        fontWeight:    400,
        fontSize:      '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         '#404040',
        margin:        '80px 0 12px',
        lineHeight:    1.6,
      }}>Generated "Family Photo" / in Nano Banana</p>

      {/* Family photo — full width within section padding */}
      <div>
        <img
          src="/rules-we-made-up/7-roll-call/GENERATED FAMILY PHOTO 1.jpg"
          alt="The full cast of claymation characters"
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* Five festival stills */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        {festivalImages.map(({ src, alt }, i) => (
          <div
            key={src}
            style={{ flex: 1, overflow: 'hidden', transition: 'transform 0.3s ease', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
            onClick={() => setLightboxIdx(i)}
          >
            <img
              src={`/rules-we-made-up/7-roll-call/${src}`}
              alt={alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>


{/* Caption below stills */}
      <p style={{
        fontFamily: 'Fraunces, serif',
        fontWeight: 400,
        fontSize:   '20px',
        lineHeight: 1.5,
        color:      '#404040',
        margin:     '32px auto 0',
        maxWidth:   '620px',
        textAlign:  'center',
      }}>
        From there, it was up to me to put all my characters in scene. They brought specific details: a key necklace, a leather bag, a flamingo. Details I wasn't willing to loose. It was the most challenging part of the project and by far, the most rewarding.
      </p>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          style={{
            position:        'fixed',
            inset:           0,
            backgroundColor: 'rgba(0,0,0,0.88)',
            zIndex:          1000,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
        >
          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + n) % n); }}
            style={{ position: 'absolute', left: '32px', background: 'none', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >←</button>

          {/* Image */}
          <img
            src={`/rules-we-made-up/7-roll-call/${festivalImages[lightboxIdx].src}`}
            alt={festivalImages[lightboxIdx].alt}
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }}
          />

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % n); }}
            style={{ position: 'absolute', right: '32px', background: 'none', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >→</button>

          {/* Close */}
          <button
            onClick={() => setLightboxIdx(null)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer', lineHeight: 1 }}
          >×</button>
        </div>
      )}

    </section>
  );
}

function CastGallery() { return null; }

// ── Main page ─────────────────────────────────────────────────────────────────
export default function RulesWeMadeUp() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFBF8', color: '#101010' }}>
      <Cursor />
      <CaseStudyNav />

      {/* ── Hero: 50/50 split ── */}
      <section style={{
        display:             'flex',
        minHeight:           '760px',
        width:               '100%',
        backgroundImage:     "url('/Medium-beige-bg1.jpg')",
        backgroundSize:      'cover',
        backgroundPosition:  'center',
        backgroundRepeat:    'no-repeat',
      }}>

        {/* Left — 50%, stacked content */}
        <div style={{
          flex:           '0 0 50%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          paddingLeft:    '80px',
          paddingRight:   '80px',
          paddingTop:     '80px',
          paddingBottom:  '80px',
          boxSizing:      'border-box',
        }}>

          {/* CASE STUDY pill */}
          <div style={{
            display:       'inline-flex',
            alignSelf:     'flex-start',
            alignItems:    'center',
            border:        '1.5px dashed #101010',
            borderRadius:  '100px',
            padding:       '6px 18px',
            marginBottom:  '32px',
          }}>
            <span style={{
              fontFamily:    'Fira Mono, monospace',
              fontWeight:    400,
              fontSize:      '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              lineHeight:    1.5,
              color:         '#101010',
            }}>Case Study</span>
          </div>

          <h1 className="font-heading" style={{
            fontWeight:  700,
            fontSize:    '62px',
            lineHeight:  '70px',
            color:       '#101010',
            margin:      '0 0 28px',
          }}>
            The Making of an Animated Short with AI
          </h1>

          <p style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 400,
            fontSize:   '20px',
            lineHeight: 1.5,
            color:      '#404040',
            margin:     0,
          }}>
            This short film, "Rules We Made Up" is adapted from a poem I wrote years ago.
            Music creation, storyboarding, character creation, and a community scene.
          </p>
        </div>

        {/* Right — 50%, full-height image */}
        <div style={{ flex: '0 0 50%', overflow: 'hidden' }}>
          <video
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          >
            <source src="/rules-we-made-up/1-hero/king-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Dashed section divider */}
      <div style={{
        height:          '2px',
        margin:          '0',
        backgroundImage: 'repeating-linear-gradient(90deg, #101010 0, #101010 4px, transparent 4px, transparent 8px)',
      }} />

      {/* ── Video + Intro ── */}
      <section style={{
        paddingTop:          '100px',
        backgroundImage:     "url('/Medium-beige-darker-bg2.jpg')",
        backgroundSize:      'cover',
        backgroundPosition:  'center',
        backgroundRepeat:    'no-repeat',
      }}>

        {/* Vimeo — padded, no rounded corners, with title overlay */}
        <div style={{ position: 'relative', margin: '0 80px', overflow: 'hidden', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)' }}>
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1193369686?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Rules We Made Up"
            />
          </div>
        </div>
        <Script src="https://player.vimeo.com/api/player.js" />

        {/* Metadata (left) + How it started (right) */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '360px 1fr',
          gap:                 '60px',
          paddingLeft:         '80px',
          paddingRight:        '175px',
          paddingTop:          '80px',
          paddingBottom:       '100px',
          alignItems:          'start',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <MetaItem label="Year"   value="2020 – 2024" />
            <MetaItem label="Role"   value="Sr. Designer & Art Director" />
            <MetaItem label="Medium" value="Omnichannel Campaigns" />
          </div>

          <div>
            <h2 className="font-body" style={{
              fontWeight: 700,
              fontSize:   '33px',
              color:      '#101010',
              margin:     '0 0 12px',
            }}>How it started</h2>
            <p style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 400,
              fontSize:   '20px',
              lineHeight: 1.5,
              color:      '#404040',
              margin:     '0 0 20px',
            }}>
              This film is adapted from a poem I wrote years ago, late one night. It's about a specific
              kind of person: someone who thinks deeply, resists neat categories, and feels perpetually
              out of step with a world that wants everything linear and labeled.
            </p>
            <p style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 400,
              fontSize:   '20px',
              lineHeight: 1.5,
              color:      '#404040',
              margin:     0,
            }}>
              When AI tools emerged, I finally had the means to bring it to life. The title comes from
              a line I fought to keep in the lyrics. Some rules deserve protecting. Some were never
              worth following. Right now, it feels like it's all up for renegotiation.
            </p>
          </div>
        </div>
      </section>

      {/* Dashed section divider */}
      <div style={{
        height:          '2px',
        margin:          '0',
        backgroundImage: 'repeating-linear-gradient(90deg, #101010 0, #101010 4px, transparent 4px, transparent 8px)',
      }} />

      {/* ── How it started ── */}
      <HowItStarted />

      {/* ── Character Creation ── */}
      <CharacterCreation />

      {/* ── More Friends ── */}
      <MoreFriends />

      {/* Dashed section divider */}
      <div style={{
        height:          '2px',
        margin:          '0',
        backgroundImage: 'repeating-linear-gradient(90deg, #101010 0, #101010 4px, transparent 4px, transparent 8px)',
      }} />

      {/* ── Mushroom Friend ── */}
      <MushroomFriend />

      {/* Dashed section divider */}
      <div style={{
        height:          '2px',
        margin:          '0',
        backgroundImage: 'repeating-linear-gradient(90deg, #101010 0, #101010 4px, transparent 4px, transparent 8px)',
      }} />

      {/* ── Roll Call ── */}
      {/* ── Roll Call ── */}
      <RollCall />

      {/* Dashed section divider */}
      <div style={{
        height:          '2px',
        margin:          '0',
        backgroundImage: 'repeating-linear-gradient(90deg, #101010 0, #101010 4px, transparent 4px, transparent 8px)',
      }} />

      {/* ── The Tool ── */}
      <TheTool />

      {/* Dashed section divider */}
      <div style={{
        height:          '2px',
        margin:          '0',
        backgroundImage: 'repeating-linear-gradient(90deg, #101010 0, #101010 4px, transparent 4px, transparent 8px)',
      }} />

      {/* ── Filmmaking Principles ── */}
      <FilmmakingPrinciples />

      {/* ── Blooper Reel ── */}
      <BlooperReel />

      <Footer />
    </main>
  );
}
