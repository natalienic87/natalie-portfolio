import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';
import CaseStudySection  from '../components/CaseStudySection';
import CaseStudyFullBleed from '../components/CaseStudyFullBleed';

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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{
        fontFamily:    'Fira Mono, monospace',
        fontWeight:    400,
        fontSize:      '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        lineHeight:    1.5,
        color:         '#888888',
      }}>{label}</span>
      <span style={{
        fontFamily: 'Fira Mono, monospace',
        fontWeight: 400,
        fontSize:   '14px',
        lineHeight: 1.5,
        color:      '#101010',
      }}>{value}</span>
    </div>
  );
}

// ── But first, a storyboard ───────────────────────────────────────────────────
function HowItStarted() {
  return (
    <CaseStudySection id="how-it-started" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', paddingBottom: '50px' }}>

      {/* Left: photo + caption */}
      <Reveal style={{ flexShrink: 0, width: 'auto' }}>
        <div style={{ marginBottom: '12px', width: '455px', height: '455px' }}>
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
          lineHeight: 1.6,
          color:      '#666666',
          margin:     0,
        }}>I printed it out, because I'm old school like that.</p>
      </Reveal>

      {/* Right: heading + body — staggered after image */}
      <div style={{ flex: 1 }}>
        <Reveal delay={0}>
          <h2 className="font-body" style={{
            fontWeight: 700,
            fontSize:   '33px',
            lineHeight: 1.2,
            color:      '#101010',
            margin:     '0 0 12px',
          }}>But first, a storyboard</h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.6, color: '#404040', margin: '0 0 20px' }}>
            What did I do to start this thing. Before touching any tool, I needed a map. I adapted
            the poem into lyrics, built the song in Suno to set my runtime, then storyboarded scene
            by scene before generating a single frame.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '18px', lineHeight: 1.6, color: '#404040', margin: 0 }}>
            The Title "Rules We Made Up" comes from a line in my poem, which I fought to keep in
            the lyrics. As the rules we make up about work, creativity and value are all shifting,
            it felt like appropriate timing.
          </p>
        </Reveal>
      </div>

    </CaseStudySection>
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
  const [index,        setIndex]        = useState(0);
  const [isAnimating,  setIsAnimating]  = useState(false);
  const [flyingOut,    setFlyingOut]    = useState(false);
  const [enteringPrev, setEnteringPrev] = useState(false);

  const n = slides.length;

  const go = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (dir === 'next') {
      setFlyingOut(true);
      setTimeout(() => {
        setFlyingOut(false);
        setIndex(i => (i + 1) % n);
      }, 400);
      setTimeout(() => setIsAnimating(false), 450);
    } else {
      // Change index immediately — old front card steps back smoothly via its
      // pos=1 transition; new front card enters from the right via CSS keyframe.
      setIndex(i => (i - 1 + n) % n);
      setEnteringPrev(true);
      setTimeout(() => {
        setEnteringPrev(false);
        setIsAnimating(false);
      }, 450);
    }
  };

  // Per-slide card styles — each slide has a persistent DOM node
  const getCardStyle = (si) => {
    const pos = (si - index + n) % n; // 0=front, 1=back1, 2=back2, 3+=hidden
    const rot = cardRotations[si];

    if (pos === 0) {
      // Prev: new front card slides in from the right via CSS keyframe animation.
      // We can't use a transition here because the card was hidden (transition:none).
      if (enteringPrev) {
        return {
          position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
          zIndex: 3,
          animation: 'card-enter-right 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          '--rot': `${rot}deg`,
          boxShadow: '0px 12px 32px rgba(0,0,0,0.18)',
        };
      }
      return {
        position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
        zIndex:     3,
        transform:  flyingOut ? `translateX(120%) rotate(${rot + 15}deg)` : `rotate(${rot}deg)`,
        opacity:    flyingOut ? 0 : 1,
        boxShadow:  '0px 12px 32px rgba(0,0,0,0.18)',
        transition: 'transform 0.4s ease-in, opacity 0.3s ease-in',
      };
    }
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
    <CaseStudySection id="characters" style={{ display: 'flex', gap: '60px', alignItems: 'center', paddingTop: '50px', paddingBottom: '50px' }}>

      {/* ── Left: collage (264px) above heading + text (360px) ── */}
      <div style={{ flex: '0 0 360px', width: '360px' }}>
        <Reveal delay={0}>
          <div style={{ width: '264px', height: '264px', overflow: 'hidden', boxShadow: '0px 4px 20px rgba(0,0,0,0.12)', marginBottom: '28px' }}>
            <img
              src="/rules-we-made-up/4-character-creation/collage-nat-photos.jpg"
              alt="Childhood reference photos"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Reveal>
        <Reveal delay={0}>
          <h2 className="font-body" style={{
            fontWeight: 700,
            fontSize:   '33px',
            lineHeight: 1.2,
            color:      '#101010',
            margin:     '0 0 12px',
          }}>Creating my characters</h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 300,
            fontSize:   '18px',
            lineHeight: 1.6,
            color:      '#404040',
            margin:     0,
          }}>
            I needed references that would actually make me feel something, so I grabbed some
            old photos of myself as a kid. I used them in Nano Banana Pro to start developing
            my character.
          </p>
        </Reveal>
      </div>

      {/* ── Right: card stack + arrows below ── */}
      <Reveal delay={0} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

        {/* Stack container */}
        <div style={{ position: 'relative', width: '518px', height: '636px' }}>
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

        {/* Label + arrows */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{
            fontFamily:    'Fira Mono, monospace',
            fontSize:      '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         '#888',
          }}>flip through the deck</span>
          <ArrowBtn onClick={() => go('prev')}>←</ArrowBtn>
          <ArrowBtn onClick={() => go('next')}>→</ArrowBtn>
        </div>
      </Reveal>

    </CaseStudySection>
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
    <CaseStudySection style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '50px' }}>
      <Reveal delay={0}>
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
      </Reveal>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'nowrap' }}>
        {friends.map(({ file, label }, i) => (
          <Reveal key={file} delay={100 + i * 90} distance={32} style={{ flexShrink: 0, width: '202px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width:        '202px',
                height:       '202px',
                borderRadius: '50%',
                overflow:     'hidden',
                transform:    hovered === file ? 'translateY(-8px)' : 'translateY(0px)',
                transition:   'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor:       'pointer',
                flexShrink:   0,
              }}
              onMouseEnter={() => setHovered(file)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={`/rules-we-made-up/6-family/${file}.png`}
                alt={label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Name below circle */}
            <span style={{
              fontFamily:    'Fira Mono, monospace',
              fontWeight:    400,
              fontSize:      '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#101010',
              textAlign:     'center',
              transition:    'opacity 0.25s ease, transform 0.25s ease',
              height:        '16px',
            }}>{label}</span>
          </Reveal>
        ))}
      </div>
    </CaseStudySection>
  );
}

// ── Mushroom Friend ───────────────────────────────────────────────────────────
const MUSHROOM_TEXT = "The Mushroom Friend is creativity — the kind you had as a kid, before self-doubt got in the way. The kind that rescues you later.\n\nMushrooms are the earth's greatest underground connectors, linking forests invisibly. Creativity flows the same way.";

function MushroomFriend() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const [typed, setTyped]       = useState('');
  const [started, setStarted]   = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el  = sectionRef.current;
      const vid = videoRef.current;
      if (!el || !vid) return;
      const rect     = el.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
      const offset   = progress * 80;
      vid.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!started || typed.length >= MUSHROOM_TEXT.length) return;
    const t = setTimeout(() => setTyped(MUSHROOM_TEXT.slice(0, typed.length + 1)), 30);
    return () => clearTimeout(t);
  }, [started, typed]);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  const paragraphs = typed.split('\n\n');
  const done = typed.length >= MUSHROOM_TEXT.length;
  const textStyle = {
    fontFamily: 'Fira Mono, monospace',
    fontWeight: 400,
    fontSize:   '22px',
    lineHeight: 1.8,
    color:      '#ffffff',
    margin:     0,
    whiteSpace: 'pre-wrap',
  };

  return (
    <section id="mushroom-friend" ref={sectionRef} style={{ display: 'flex', width: '100%', height: '800px' }}>

      {/* Left — red panel with typewriter text */}
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
          {paragraphs.map((p, i) => (
            <p key={i} style={{ ...textStyle, marginBottom: i < paragraphs.length - 1 ? '32px' : 0 }}>
              {p}
              {i === paragraphs.length - 1 && !done && (
                <span style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 0.1s', borderRight: '2px solid #fff', marginLeft: '2px' }}>&nbsp;</span>
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Right — looping video, parallax */}
      <div style={{ flex: '0 0 50%', position: 'relative', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          style={{ position: 'absolute', left: 0, right: 0, top: '-15%', width: '100%', height: '130%', objectFit: 'cover', objectPosition: 'center top', willChange: 'transform' }}
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
    <CaseStudySection style={{ paddingLeft: '80px', paddingRight: '80px', paddingBottom: '50px' }}>

      <Reveal delay={0}>
        <h2 className="font-body" style={{
          fontWeight:  600,
          fontSize:    '33px',
          lineHeight:  1.2,
          color:       '#101010',
          textAlign:   'center',
          margin:      '0 0 12px',
        }}>
          How it ended: With a Blooper Reel
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize:   '18px',
          lineHeight: 1.6,
          color:      '#404040',
          textAlign:  'center',
          margin:     '0 0 48px',
        }}>
          Every film deserves one. This says more about the process than the final cut does.
        </p>
      </Reveal>

      <Reveal delay={200}>
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
      </Reveal>

    </CaseStudySection>
  );
}

function TheTool() {
  return (
    <CaseStudySection id="ltx-studio" style={{ paddingTop: '50px' }}>
      <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>

        {/* Left — text */}
        <div style={{ flex: '0 0 30%' }}>
          <Reveal delay={0}>
            <h2 className="font-body" style={{
              fontWeight: 700,
              fontSize:   '33px',
              lineHeight: 1.2,
              color:      '#101010',
              margin:     '0 0 12px',
            }}>
              LTX Studio
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 300,
              fontSize:   '18px',
              lineHeight: 1.6,
              color:      '#404040',
              margin:     '0 0 20px',
            }}>
              I chose LTX Studio for its built-in storyboarding feature — for a 3-minute film, I needed something that could hold the full sequence together. I learned quickly that uploading everything at once was an expensive mistake. Going scene by scene, slower, was faster in the end.
            </p>
          </Reveal>
        </div>

        {/* Right — screenshot, simultaneous with h2 */}
        <Reveal delay={0} style={{ flex: 1, width: 'auto', minWidth: 0 }}>
          <img
            src="/rules-we-made-up/9-the-tool/LTX.jpg"
            alt="LTX Studio interface"
            style={{ width: '100%', height: '359px', objectFit: 'cover', display: 'block', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)' }}
          />
        </Reveal>

      </div>
    </CaseStudySection>
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
    <section id="principles" style={{
      backgroundColor:    '#F5F0EC',
      paddingTop:         '150px',
      paddingBottom:      '150px',
    }}>

      {/* Centered heading + subtitle */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', paddingLeft: '80px', paddingRight: '80px', textAlign: 'center', marginBottom: '48px', boxSizing: 'border-box' }}>
        <Reveal>
          <h2 className="font-body" style={{
            fontWeight: 700,
            fontSize:   '40px',
            lineHeight: 1.2,
            color:      '#101010',
            margin:     '0 0 16px',
          }}>Nat's 6 AI Filmmaking Principles</h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 300,
            fontSize:   '18px',
            lineHeight: 1.6,
            color:      '#404040',
            margin:     '0 auto',
            maxWidth:   '560px',
          }}>
            Six things I learned making an animated short with AI — things I'd tell anyone starting out.
          </p>
        </Reveal>
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
              fontWeight: 300,
              fontSize:   '16px',
              lineHeight: 1.6,
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
  const [familyOpen, setFamilyOpen] = useState(false);
  const n = festivalImages.length;

  const body = {
    fontFamily: 'Fraunces, serif',
    fontWeight: 300,
    fontSize:   '18px',
    lineHeight: 1.6,
    color:      '#404040',
    margin:     '0 0 20px',
  };

  return (
    <CaseStudySection id="roll-call">
      <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

      {/* Left — phone mockup */}
      <Reveal delay={0} style={{ flexShrink: 0, width: 'auto' }}>
        <img
          src="/rules-we-made-up/7-roll-call/Roll-call-mockup.png"
          alt="Substack roll call post on phone"
          style={{ height: '775px', width: 'auto', display: 'block', boxShadow: '4px 4px 90px 0px rgba(0,0,0,0.10)', borderRadius: '30px' }}
        />
      </Reveal>

      {/* Right — heading + body + groups image */}
      <div style={{ flex: 1 }}>
        <Reveal delay={0}>
          <h2 className="font-body" style={{
            fontWeight: 700,
            fontSize:   '33px',
            lineHeight: 1.2,
            color:      '#101010',
            margin:     '0 0 12px',
          }}>
            Inviting the Substack community into the film
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={body}>
            My film had a festival scene near the end — about 30 seconds of runtime — and I needed
            a crowd. That's when I invited my Substack community to make themselves a claymation
            character and I'd put them in the film. I provided the prompt, and eighteen people showed up.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={body}>
            I divided all the characters into groups by scene so I could animate each cluster
            separately and control the lighting as the night progressed.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <img
            src="/rules-we-made-up/7-roll-call/SupportingCast-groups.png"
            alt="Supporting cast character groups"
            style={{ width: '100%', display: 'block', marginBottom: '32px' }}
          />
        </Reveal>
      </div>

      </div>{/* end flex row */}

      {/* Fira Mono label above family photo */}
      <Reveal delay={0}>
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
      </Reveal>

      {/* Family photo — full width within section padding */}
      <Reveal delay={100}>
      <div
        onClick={() => setFamilyOpen(true)}
        style={{ cursor: 'pointer', overflow: 'hidden' }}
        onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.03)'}
        onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
      >
        <img
          src="/rules-we-made-up/7-roll-call/GENERATED FAMILY PHOTO 1.jpg"
          alt="The full cast of claymation characters"
          style={{ width: '100%', display: 'block', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)', transformOrigin: 'center center' }}
        />
      </div>
      </Reveal>

      {/* Family photo lightbox */}
      {familyOpen && (
        <div
          onClick={() => setFamilyOpen(false)}
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
          <img
            src="/rules-we-made-up/7-roll-call/GENERATED FAMILY PHOTO 1.jpg"
            alt="The full cast of claymation characters"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }}
          />
          <button
            onClick={() => setFamilyOpen(false)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer', lineHeight: 1 }}
          >×</button>
        </div>
      )}

      {/* Five festival stills */}
      <Reveal delay={100}>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          {festivalImages.map(({ src, alt }, i) => (
            <div
              key={src}
              style={{ flex: 1, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s ease' }}
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
      </Reveal>

      <Reveal delay={200}>
        <p style={{
          fontFamily: 'Fraunces, serif',
          fontWeight: 300,
          fontSize:   '18px',
          lineHeight: 1.6,
          color:      '#404040',
          margin:     '32px auto 0',
          maxWidth:   '620px',
          textAlign:  'center',
        }}>
          From there, it was up to me to put all my characters in scene. They brought specific details: a key necklace, a leather bag, a flamingo. Details I wasn't willing to loose. It was the most challenging part of the project and by far, the most rewarding.
        </p>
      </Reveal>

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
            style={{ position: 'absolute', left: '32px', background: 'none', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
            style={{ position: 'absolute', right: '32px', background: 'none', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >→</button>

          {/* Close */}
          <button
            onClick={() => setLightboxIdx(null)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer', lineHeight: 1 }}
          >×</button>
        </div>
      )}

    </CaseStudySection>
  );
}

function CastGallery() { return null; }

// ── Main page ─────────────────────────────────────────────────────────────────
// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, distance = 48, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0px)' : `translateY(${distance}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        width:      '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Section Nav ───────────────────────────────────────────────────────────────
const navItems = [
  { id: 'how-it-started', label: 'How It Started',   dot: '#6366F1' },
  { id: 'characters',     label: 'Characters',        dot: '#F97316' },
  { id: 'mushroom-friend',label: 'Mushroom Friend',   dot: '#EC4899' },
  { id: 'roll-call',      label: 'Roll Call',         dot: '#FDB154' },
  { id: 'ltx-studio',     label: 'LTX Studio',        dot: '#6366F1' },
  { id: 'principles',     label: 'Principles',        dot: '#E35038' },
];

function SectionNav() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{
      position:        'fixed',
      right:           '28px',
      top:             '50%',
      transform:       'translateY(-50%)',
      zIndex:          200,
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'flex-end',
      gap:             0,
      backgroundColor: 'rgba(255,251,248,0.6)',
      backdropFilter:  'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius:    '20px',
      padding:         '24px 14px',
      overflow:        'hidden',
    }}>
      {/* Vertical dashed line — same DNA as career timeline */}
      <div style={{
        position:    'absolute',
        right:       '5px',
        top:         0,
        bottom:      0,
        borderRight: '2px dashed rgba(16,16,16,0.15)',
        zIndex:      0,
        pointerEvents: 'none',
      }} />

      {navItems.map(({ id, label, dot }) => {
        const isActive = activeId === id;
        return (
          <div
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              display:     'flex',
              alignItems:  'center',
              gap:         '10px',
              padding:     '7px 0',
              cursor:      'pointer',
              position:    'relative',
              zIndex:      1,
            }}
          >
            {/* Label */}
            <span style={{
              fontFamily:    'Fira Mono, monospace',
              fontSize:      '10px',
              letterSpacing: isActive ? '0.12em' : '0.08em',
              textTransform: 'uppercase',
              color:         '#101010',
              fontWeight:    400,
              opacity:       isActive ? 1 : 0.25,
              transition:    'opacity 0.5s ease, letter-spacing 0.5s ease',
              whiteSpace:    'nowrap',
            }}>{label}</span>

            {/* Dot — same size & shadow as career timeline */}
            <div style={{
              width:           isActive ? '11px' : '8px',
              height:          isActive ? '11px' : '8px',
              borderRadius:    '50%',
              backgroundColor: isActive ? dot : 'rgba(16,16,16,0.15)',
              boxShadow:       isActive ? `0 2px 8px ${dot}99` : 'none',
              transition:      'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              flexShrink:      0,
            }} />
          </div>
        );
      })}
    </div>
  );
}

export default function RulesWeMadeUp() {
  const [videoHovered, setVideoHovered] = useState(false);

  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFBF8', color: '#101010' }}>
      <Cursor />
      <CaseStudyNav />
      <SectionNav />

      {/* ── Floating doodle decoratives ── */}
      {/* Dotted circle — top right, near hero */}
      <img src="/homepage/1-hero/Ellipse 33.svg" alt="" className="animate-spin-ellipse"
        style={{ position: 'absolute', top: '140px', right: '56px', width: '100px', opacity: 0.5, zIndex: 1, pointerEvents: 'none' }} />

      {/* Dotted heart — left side, how-it-started */}
      <img src="/doodle-heart.svg" alt="" className="animate-float-lazy"
        style={{ position: 'absolute', top: '900px', left: '36px', width: '72px', opacity: 0.45, zIndex: 1, pointerEvents: 'none' }} />

      {/* Small dotted circle — right side, character creation */}
      <img src="/homepage/4-about/small-ellipse.svg" alt="" className="animate-spin-ellipse"
        style={{ position: 'absolute', top: '2100px', right: '52px', width: '60px', opacity: 0.45, zIndex: 1, pointerEvents: 'none' }} />

      {/* Dotted heart — right side, more friends */}
      <img src="/doodle-heart.svg" alt="" className="animate-float-lazy"
        style={{ position: 'absolute', top: '3000px', right: '44px', width: '58px', opacity: 0.4, zIndex: 1, pointerEvents: 'none' }} />

      {/* Dotted circle — left side, roll call */}
      <img src="/homepage/6-careerpath/Ellipse 33 2.svg" alt="" className="animate-spin-ellipse"
        style={{ position: 'absolute', top: '4400px', left: '-32px', width: '120px', opacity: 0.35, zIndex: 1, pointerEvents: 'none' }} />

      {/* Dotted heart — left side, ltx studio */}
      <img src="/doodle-heart.svg" alt="" className="animate-float-lazy"
        style={{ position: 'absolute', top: '5400px', left: '40px', width: '66px', opacity: 0.4, zIndex: 1, pointerEvents: 'none' }} />

      {/* Dotted circle — right side, principles */}
      <img src="/homepage/1-hero/Ellipse 33.svg" alt="" className="animate-spin-ellipse"
        style={{ position: 'absolute', top: '6400px', right: '44px', width: '90px', opacity: 0.35, zIndex: 1, pointerEvents: 'none' }} />

      {/* ── Hero: 50/50 split ── */}
      <section style={{
        display:             'flex',
        position:            'relative',
        minHeight:           '760px',
        width:               '100%',
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
            fontWeight: 300,
            fontSize:   '18px',
            lineHeight: 1.6,
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', cursor: 'default' }}
          >
            <source src="/rules-we-made-up/1-hero/king-loop.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Bouncing scroll cue — bottom left, aligned with text */}
        <div className="animate-scroll-bounce" style={{
          position:       'absolute',
          bottom:         '32px',
          left:           '80px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'flex-start',
          gap:            '6px',
          pointerEvents:  'none',
        }}>
          <span style={{
            fontFamily:    'Fira Mono, monospace',
            fontSize:      '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         '#101010',
            opacity:       0.7,
          }}>scroll</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1 L8 18 M2 12 L8 18 L14 12" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
          </svg>
        </div>
      </section>

      {/* ── Video + Intro ── */}
      <CaseStudyFullBleed background="#F5F0EC" style={{ paddingTop: '150px', paddingBottom: 0 }}>

        {/* Vimeo — padded, no rounded corners, with title overlay */}
        <div
          style={{ position: 'relative', margin: '0 80px', overflow: 'hidden', boxShadow: '0px 5px 65px 0px rgba(0,0,0,0.25)', transform: videoHovered ? 'translateY(-8px)' : 'translateY(0px)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          onMouseEnter={() => setVideoHovered(true)}
          onMouseLeave={() => setVideoHovered(false)}
        >
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1193369686?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Rules We Made Up"
            />
          </div>

          {/* Play overlay — pointer-events none so clicks reach iframe */}
          <div style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            opacity:        videoHovered ? 1 : 0,
            transition:     'opacity 0.3s ease',
            pointerEvents:  'none',
          }}>
            <div style={{
              display:           'flex',
              alignItems:        'center',
              gap:               '12px',
              backgroundColor:   'rgba(255,251,248,0.18)',
              backdropFilter:    'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius:      '100px',
              padding:           '16px 28px 16px 22px',
              border:            '1px solid rgba(255,255,255,0.3)',
            }}>
              {/* Triangle play icon */}
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M2 1.5L16 10L2 18.5V1.5Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
              <span style={{
                fontFamily:    'Fira Mono, monospace',
                fontSize:      '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#ffffff',
              }}>Watch Film</span>
            </div>
          </div>
        </div>
        <Script src="https://player.vimeo.com/api/player.js" />

        {/* Metadata (left) + How it started (right) */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '220px 1fr',
          gap:                 '60px',
          paddingLeft:         '95px',
          paddingRight:        '95px',
          paddingTop:          '80px',
          paddingBottom:       '150px',
          alignItems:          'start',
        }}>
          <Reveal delay={0}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <MetaItem label="Year"   value="2020 – 2024" />
              <MetaItem label="Role"   value="Sr. Designer & Art Director" />
              <MetaItem label="Medium" value="Omnichannel Campaigns" />
            </div>
          </Reveal>

          <div>
            <Reveal delay={0}>
              <h2 className="font-body" style={{
                fontWeight: 700,
                fontSize:   '33px',
                color:      '#101010',
                margin:     '0 0 12px',
              }}>How it started</h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 300,
                fontSize:   '18px',
                lineHeight: 1.6,
                color:      '#404040',
                margin:     '0 0 20px',
              }}>
                This film is adapted from a poem I wrote years ago, late one night. It's about a specific
                kind of person: someone who thinks deeply, resists neat categories, and feels perpetually
                out of step with a world that wants everything linear and labeled.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p style={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 300,
                fontSize:   '18px',
                lineHeight: 1.6,
                color:      '#404040',
                margin:     0,
              }}>
                When AI tools emerged, I finally had the means to bring it to life. The title comes from
                a line I fought to keep in the lyrics. Some rules deserve protecting. Some were never
                worth following. Right now, it feels like it's all up for renegotiation.
              </p>
            </Reveal>
          </div>
        </div>
      </CaseStudyFullBleed>

      {/* ── How it started ── */}
      <HowItStarted />

      {/* ── Character Creation ── */}
      <CharacterCreation />

      {/* ── More Friends ── */}
      <MoreFriends />

      {/* ── Mushroom Friend ── */}
      <MushroomFriend />

      {/* ── Roll Call ── */}
      <RollCall />

      {/* ── The Tool ── */}
      <TheTool />

      {/* ── Filmmaking Principles ── */}
      <FilmmakingPrinciples />

      {/* ── Blooper Reel ── */}
      <BlooperReel />

      <Footer />
    </main>
  );
}
