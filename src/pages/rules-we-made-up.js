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
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
      </button>
    </nav>
  );
}

// ── Metadata label/value pair ─────────────────────────────────────────────────
function MetaItem({ label, value }) {
  const meta = {
    fontFamily:    'Poppins, sans-serif',
    fontWeight:    400,
    fontSize:      '14px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight:    1.5,
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0 16px' }}>
      <span style={{ ...meta, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
      <span style={{ ...meta, color: '#ffffff' }}>{value}</span>
    </div>
  );
}

// ── How it started ────────────────────────────────────────────────────────────
function HowItStarted() {
  const [tab, setTab] = useState('overview');

  const bodyStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize:   '16px',
    lineHeight: 1.7,
    color:      '#A9A9A9',
    margin:     '0 0 24px',
  };

  return (
    <section style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap:                 '40px',
      paddingLeft:         '80px',
      paddingRight:        '80px',
      paddingTop:          '40px',
      paddingBottom:       '100px',
      alignItems:          'start',
    }}>

      {/* ── Left column: cols 1–4 ── */}
      <div style={{ gridColumn: '1 / 5' }}>

        {/* Heading */}
        <h2 className="font-heading" style={{
          fontWeight:  500,
          fontSize:    '64px',
          lineHeight:  'normal',
          color:       '#ffffff',
          margin:      '0 0 32px',
        }}>
          How it started
        </h2>


        {/* Body copy */}
        <p style={bodyStyle}>
          This film is adapted from a poem I wrote years ago, late one night. It's about a specific kind of person:
          someone who thinks deeply, resists neat categories, and feels perpetually out of
          step with a world that wants everything linear and labeled.
        </p>
        <p style={bodyStyle}>
          When AI tools emerged, I finally had the means to bring it to life. The title
          comes from a line I fought to keep in the lyrics. Some rules deserve protecting.
          Some were never worth following. Right now, it feels like it's all up for
          renegotiation.
        </p>

        {/* Photo */}
        <div style={{
          width:        '100%',
          borderRadius: '12px',
          overflow:     'hidden',
          marginBottom: '16px',
          aspectRatio:  '4 / 3',
          backgroundColor: '#1e1e1e',
        }}>
          <img
            src="/rules-we-made-up/3-how-it-started/Storyboard 1.jpg"
            alt="Storyboard notes and planning documents"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Caption */}
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize:   '13px',
          lineHeight: 1.5,
          color:      '#A9A9A9',
          margin:     0,
        }}>
          Before touching any tool, I needed a map. I adapted the poem into lyrics, built
          the song in Suno to set my runtime, then storyboarded scene by scene before
          generating a single frame.
        </p>
      </div>

      {/* ── Right column: cols 5–8 ── */}
      <div style={{ gridColumn: '5 / 9' }}>
        <div style={{
          backgroundColor: '#2E2E2E',
          borderRadius:    '16px',
          overflow:        'hidden',
          border:          '1px solid rgba(255,255,255,0.1)',
        }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              {
                id: 'overview', label: 'Overview',
                icon: (color) => (
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3C9 3 6.5 1.5 3 1.5C1.5 1.5 1 2 1 2V14C1 14 2 13.5 3 13.5C6.5 13.5 9 15 9 15M9 3C9 3 11.5 1.5 15 1.5C16.5 1.5 17 2 17 2V14C17 14 16 13.5 15 13.5C11.5 13.5 9 15 9 15M9 3V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                id: 'poem', label: 'Poem',
                icon: (color) => (
                  <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="13" height="16" rx="2" stroke={color} strokeWidth="1.5"/>
                    <line x1="4" y1="6" x2="11" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="4" y1="9" x2="11" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="4" y1="12" x2="8"  y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
              },
            ].map(({ id, label, icon }) => {
              const active = tab === id;
              const color  = active ? '#E35038' : 'rgba(255,255,255,0.45)';
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  style={{
                    flex:           1,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            '8px',
                    padding:        '20px 24px',
                    background:     'none',
                    border:         'none',
                    borderBottom:   active ? '2px solid #E35038' : '2px solid transparent',
                    cursor:         'pointer',
                    fontFamily:     'Poppins, sans-serif',
                    fontWeight:     active ? 600 : 400,
                    fontSize:       '16.5px',
                    color,
                    transition:     'color 0.2s ease',
                    marginBottom:   '-1px',
                  }}
                >
                  {icon(color)}
                  {label}
                </button>
              );
            })}
          </div>

          {/* Overview tab */}
          {tab === 'overview' && (
            <div style={{
              padding:    '48px 40px 108px',
              textAlign:  'center',
              height:     '760px',
              boxSizing:  'border-box',
              overflowY:  'auto',
            }}>
              {/* Flanked typographic quote mark */}
              <div style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '16px',
                marginBottom: '34px',
              }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.12)' }} />
                <div style={{ height: '80px', display: 'flex', alignItems: 'center', overflow: 'visible', transform: 'translateY(30px)' }}>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize:   '160px',
                    lineHeight: 0,
                    color:      '#E35038',
                    display:    'block',
                  }}>{'\u201C'}</span>
                </div>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.12)' }} />
              </div>

              {/* Pull quote */}
              <p className="font-heading" style={{
                fontWeight:  500,
                fontSize:    'clamp(20px, 3.8vw, 38px)',
                lineHeight:  1.2,
                color:       '#ffffff',
                margin:      '0 0 40px',
              }}>
                Know when to stop<br />
                but never give up.<br />
                Coffee goes in a mug,<br />
                Tea goes in a cup.<br />
                <br />
                Expand! – but retract.<br />
                Take charge! – but sit back<br />
                <span style={{ color: '#E35038' }}>And we follow the rules<br />
                as the rules get made up.</span>
              </p>

              {/* Diamond divider */}
              <div style={{
                display:        'flex',
                alignItems:     'center',
                gap:            '12px',
                marginBottom:   '32px',
                justifyContent: 'center',
              }}>
                <div style={{ width: '60px', height: '1px', backgroundColor: '#E35038', opacity: 0.5 }} />
                <span style={{ color: '#E35038', fontSize: '12px' }}>◇</span>
                <div style={{ width: '60px', height: '1px', backgroundColor: '#E35038', opacity: 0.5 }} />
              </div>

              {/* Subtitle + explore prompt */}
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize:   '15px',
                lineHeight: 1.7,
                color:      '#A9A9A9',
                margin:     0,
              }}>
                A line I fought to keep.<br />
                Explore the full poem in the{' '}
                <button
                  onClick={() => setTab('poem')}
                  style={{
                    background: 'none',
                    border:     'none',
                    padding:    0,
                    cursor:     'pointer',
                    color:      '#E35038',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontSize:   '15px',
                  }}
                >
                  Poem
                </button>
                {' '}tab.
              </p>
            </div>
          )}

          {/* Poem tab */}
          {tab === 'poem' && (
            <div style={{
              padding:    '40px',
              height:     '760px',
              overflowY:  'auto',
              boxSizing:  'border-box',
            }}>
              <pre style={{
                fontFamily:  '"Courier New", Courier, monospace',
                fontWeight:  400,
                fontSize:    '14px',
                lineHeight:  2,
                color:       '#ffffff',
                margin:      0,
                whiteSpace:  'pre-wrap',
              }}>{`You shine like the sun, but I shine like the moon
partially hidden, not always in view.
When time is elusive, I feel more attuned.
88 keys on a piano but my hands are just two.

The linear world feels just like an arrow
I drive undirected – the roads seem too narrow.
I pick up and go, but never complete.
Ambitions, when scattered, feel so out of reach.

I don't know what I want – but I know what I don't.
Always searching for meaning – is it starting to show?

I don't want the shallow, I live in the depths
I don't want to be drowning, I live for the breaths
I want to tread lightly, but not be naive
My life is a mess – but I don't like it neat.

I turn pain into art and create out of chaos
but when life gets too dark I lose sight of the canvas.
I stay up all night not wanting to sleep
but wake in the morning and I want to keep dreaming.

I alter my mind to expand what I'm seeing
A different perspective, a new sense of being.
But then I come down, and I feel out of touch
like a song I once loved, but I've heard it too much.

They say, know when to stop, but never give up!
Coffee goes in a mug, tea goes in a cup.
Expand! but retract. Take charge! but sit back
and we follow the rules as the rules get made up.

The King in his castle is just a pawn in The Game.
There's really no difference between crazy and sane.
There's really no difference between love and true pain.
When to love and let go is the same.

There's sin found in laughter and love when we scream
Tears at a wedding and tears when we grieve
Our lives seem like lies, just missing a 'v'
When everything's not as it seems.

But just as it's not, it becomes what it is
In lies lie the truth – a paradoxical quiz!
Like the air lets you know that it's there with the wind
something else lets you know there's no beginning or end

And all that you are, is all that you've been
To find you in the madness will mean you have lived.`}</pre>
            </div>
          )}

        </div>
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
      boxShadow:  '0px 12px 32px rgba(0,0,0,0.7)',
      transition: 'transform 0.4s ease-in, opacity 0.3s ease-in',
    };
    if (pos === 1) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     2,
      transform:  flyingOut ? `rotate(${rot}deg)` : `rotate(${rot}deg) translate(6px, 8px)`,
      opacity:    1,
      boxShadow:  '-4px 6px 18px rgba(0,0,0,0.5)',
      transition: 'transform 0.4s ease-out',
    };
    if (pos === 2) return {
      position: 'absolute', inset: '0', borderRadius: '12px', overflow: 'hidden',
      zIndex:     1,
      transform:  flyingOut ? `rotate(${rot}deg) translate(6px, 8px)` : `rotate(${rot}deg) translate(-8px, 14px)`,
      opacity:    1,
      boxShadow:  '-8px 8px 24px rgba(0,0,0,0.6)',
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
        border:         '1.5px solid rgba(255,255,255,0.5)',
        background:     'none',
        color:          '#ffffff',
        fontSize:       '18px',
        cursor:         isAnimating ? 'default' : 'pointer',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        transition:     'border-color 0.2s ease',
        flexShrink:     0,
        opacity:        isAnimating ? 0.4 : 1,
      }}
      onMouseEnter={e => { if (!isAnimating) e.currentTarget.style.borderColor = '#ffffff'; }}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'}
    >
      {children}
    </button>
  );

  return (
    <section style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap:                 '40px',
      paddingLeft:         '80px',
      paddingRight:        '80px',
      paddingTop:          '80px',
      paddingBottom:       '100px',
      alignItems:          'start',
    }}>

      {/* ── Left: heading + copy + collage ── */}
      <div style={{ gridColumn: '1 / 4' }}>
        <h2 className="font-heading" style={{
          fontWeight:  500,
          fontSize:    '48px',
          lineHeight:  'normal',
          color:       '#ffffff',
          margin:      '0 0 20px',
        }}>
          Character Creation
        </h2>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize:   '15px',
          lineHeight: 1.7,
          color:      '#A9A9A9',
          margin:     '0 0 32px',
        }}>
          I needed references that would actually make me feel something, so I grabbed some
          old photos of myself as a kid. I used them in Nano Banana Pro to start developing
          my character.
        </p>

        {/* Collage photo */}
        <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <img
            src="/rules-we-made-up/4-character-creation/collage-nat-photos.jpg"
            alt="Childhood reference photos"
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </div>

      {/* ── Center: physical card stack carousel ── */}
      <div style={{ gridColumn: '4 / 7', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

        {/* Stack container — one persistent DOM node per slide */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '125%' }}>
          {slides.map((s, si) => (
            <div key={si} style={getCardStyle(si)}>
              <img
                src={s.img}
                alt={`Character slide ${si + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
            </div>
          ))}
        </div>

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <ArrowBtn onClick={() => go('prev')}>←</ArrowBtn>
          <ArrowBtn onClick={() => go('next')}>→</ArrowBtn>
        </div>
      </div>

      {/* ── Right: static copy ── */}
      <div style={{ gridColumn: '7 / 9', paddingTop: '80px' }}>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize:   '15px',
          lineHeight: 1.8,
          color:      '#A9A9A9',
          margin:     '0 0 20px',
        }}>
          Many iterations later, I found her. I locked in my brand color palette on her
          clothing, and added fox ears as a visual thread — to recognize her as the same
          character as she ages.
        </p>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize:   '15px',
          lineHeight: 1.8,
          color:      '#A9A9A9',
          margin:     0,
        }}>
          High quality polymer clay render, stop-motion aesthetic, hand-made texture.
        </p>
      </div>

    </section>
  );
}

// ── Mushroom Friend ───────────────────────────────────────────────────────────
function MushroomFriend() {
  return (
    <section>

      {/* ── Row 1: full-bleed split ── */}
      <div style={{ display: 'flex', width: '100%', height: '800px' }}>

        {/* Left — looping video, 50% */}
        <div style={{ flex: '0 0 50%', position: 'relative', overflow: 'hidden' }}>
          <video
            autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          >
            <source src="/rules-we-made-up/5-mushroom-friend/Mushroom Dance.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Right — coral panel, 50% */}
        <div style={{
          flex:            '0 0 50%',
          backgroundColor: '#E35038',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          padding:         '80px 64px',
        }}>
          <p className="font-heading" style={{
            fontWeight:  400,
            fontSize:    'clamp(20px, 2vw, 28px)',
            lineHeight:  1.55,
            color:       '#ffffff',
            margin:      0,
          }}>
            The Mushroom Friend is a symbol for creativity — the kind you have as a kid,
            before self-doubt gets in the way, and the kind that rescues you later when
            you need it most. Mushrooms are also the earth's greatest underground connectors,
            linking entire forests invisibly. Creativity flows the same way.
          </p>
        </div>
      </div>

      {/* ── Row 2: caption + four image cards ── */}
      <div style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '40px', paddingBottom: '80px' }}>

        {/* Caption */}
        <p style={{
          fontFamily:  'Poppins, sans-serif',
          fontWeight:  400,
          fontSize:    '13px',
          lineHeight:  1.6,
          color:       '#A9A9A9',
          margin:      '0 0 24px',
          maxWidth:    '320px',
        }}>
          From there, I built out the rest of the world. An imaginary mushroom friend.
          My mom (with fox ears, obviously). My husband Tom, and many more friends.
        </p>

        {/* Four image placeholders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{
              aspectRatio:     '16 / 9',
              backgroundColor: '#2E2E2E',
              borderRadius:    '10px',
              overflow:        'hidden',
            }} />
          ))}
        </div>
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

      <h2 className="font-heading" style={{
        fontWeight:  500,
        fontSize:    'clamp(32px, 4vw, 56px)',
        lineHeight:  1.1,
        color:       '#ffffff',
        textAlign:   'center',
        margin:      '0 0 20px',
      }}>
        How it ended: With a Blooper Reel
      </h2>

      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize:   '16px',
        lineHeight: 1.6,
        color:      '#A9A9A9',
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
    <section style={{ paddingTop: '120px', paddingBottom: '100px', paddingLeft: '80px', paddingRight: '80px' }}>
      <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>

        {/* Left — text */}
        <div style={{ flex: '0 0 38%' }}>
          <h2 className="font-heading" style={{
            fontWeight:   500,
            fontSize:     'clamp(36px, 4vw, 64px)',
            lineHeight:   1.1,
            color:        '#ffffff',
            margin:       '0 0 40px',
          }}>
            The Tool: LTX Studio
          </h2>

          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize:   '16px',
            lineHeight: 1.75,
            color:      '#D9D9D9',
            margin:     '0 0 28px',
          }}>
            I chose LTX Studio for its built-in storyboarding feature — for a 3-minute film, I needed something that could hold the full sequence together. I learned quickly that uploading everything at once was an expensive mistake. Going scene by scene, slower, was faster in the end.
          </p>

          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize:   '16px',
            lineHeight: 1.75,
            color:      '#D9D9D9',
            margin:     '0 0 16px',
          }}>
            Where it earned its place: the Elements feature. Upload your characters and backgrounds separately, tag them in prompts, and it handles consistency better than most. Not perfect — but it helped.
          </p>

          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize:   '16px',
            lineHeight: 1.75,
            color:      '#D9D9D9',
            margin:     0,
          }}>
            I finished the film in my own software. All-in-one tools are a gift until they're a limitation.
          </p>
        </div>

        {/* Right — screenshot */}
        <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden' }}>
          <img
            src="/rules-we-made-up/9-the-tool/LTX.jpg"
            alt="LTX Studio interface"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

      </div>
    </section>
  );
}

function FilmmakingPrinciples() {
  const [active, setActive] = useState(0);
  const trackRef  = useRef(null);
  const activeRef = useRef(0);

  const CARD_VW = 50;
  const GAP     = 16;
  const N       = principles.length;

  // Triple the list so the middle copy is always visible during the loop reset
  const looped = [...principles, ...principles, ...principles];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const getSetWidth = () => {
      const cardW = track.offsetWidth * (CARD_VW / 100);
      return N * (cardW + GAP);
    };

    // Start scrolled to the middle set
    track.scrollLeft = getSetWidth();
  }, []);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const cardW = track.offsetWidth * (CARD_VW / 100);
    const setW  = N * (cardW + GAP);

    // Seamless loop: silently jump when approaching either end
    if (track.scrollLeft >= setW * 2) {
      track.scrollLeft -= setW;
    } else if (track.scrollLeft <= 0) {
      track.scrollLeft += setW;
    }

    // Update active highlight
    const center = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0, minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i % N; }
    });
    if (closest !== activeRef.current) {
      activeRef.current = closest;
      setActive(closest);
    }
  };

  return (
    <section style={{ paddingTop: '100px', paddingBottom: '60px' }}>

      <h2 className="font-heading" style={{
        fontWeight:   500,
        fontSize:     'clamp(32px, 4vw, 56px)',
        lineHeight:   1.1,
        color:        '#ffffff',
        textAlign:    'center',
        margin:       '0 0 56px',
        paddingLeft:  '80px',
        paddingRight: '80px',
      }}>
        Nat's AI Filmmaking Principles
      </h2>

      {/* Infinite scroll track — user scrolls, seamless loop on edges */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        style={{
          display:         'flex',
          gap:             `${GAP}px`,
          overflowX:       'auto',
          scrollSnapType:  'x mandatory',
          scrollbarWidth:  'none',
          msOverflowStyle: 'none',
          paddingTop:      '24px',
          paddingBottom:   '40px',
          alignItems:      'center',
        }}
      >
        {looped.map((p, i) => {
          const isActive = (i % N) === active;
          return (
            <div
              key={i}
              style={{
                flexShrink:      0,
                width:           `${CARD_VW}vw`,
                backgroundColor: 'transparent',
                borderRadius:    '20px',
                overflow:        'visible',
                scrollSnapAlign: 'center',
                border:          '1px solid rgba(255,255,255,0.15)',
                transform:       isActive ? 'scale(1.08)' : 'scale(0.88)',
                transition:      'transform 0.3s ease',
                transformOrigin: 'center center',
              }}
            >
              <div style={{ padding: '25px 25px 0' }}>
                <div style={{ aspectRatio: '16 / 9', overflow: 'hidden', borderRadius: '12px' }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
              <div style={{ padding: '24px 25px 28px' }}>
                <h3 className="font-heading" style={{
                  fontWeight: 500,
                  fontSize:   '24px',
                  lineHeight: 1.2,
                  color:      '#ffffff',
                  margin:     '0 0 14px',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 400,
                  fontSize:   '14px',
                  lineHeight: 1.7,
                  color:      '#A9A9A9',
                  margin:     0,
                }}>
                  {p.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

// ── Roll Call ─────────────────────────────────────────────────────────────────
function RollCall() {
  const body = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize:   '15px',
    lineHeight: 1.75,
    color:      '#A9A9A9',
    margin:     '0 0 20px',
  };

  return (
    <section style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap:                 '40px',
      paddingLeft:         '80px',
      paddingRight:        '80px',
      paddingTop:          '100px',
      paddingBottom:       '100px',
      alignItems:          'start',
    }}>

      {/* ── Left: cols 1–4 ── */}
      <div style={{ gridColumn: '1 / 5' }}>

        <h2 className="font-heading" style={{
          fontWeight:  500,
          fontSize:    'clamp(36px, 4vw, 56px)',
          lineHeight:  1.1,
          color:       '#ffffff',
          margin:      '0 0 32px',
        }}>
          The roll call: inviting the crowd into the film
        </h2>

        <p style={body}>
          My film had a festival scene near the end — about 30 seconds of runtime. I needed
          a crowd. Instead of generating one, I invited my Substack community to make
          themselves a claymation character and I'd put them in the film.
        </p>
        <p style={body}>
          I provided the prompt, and eighteen people showed up. They brought specific
          details: a key necklace, a leather bag, a flamingo. Details I wasn't willing to
          let those disappear.
        </p>
        <p style={{ ...body, margin: '0 0 40px' }}>
          Thirty seconds of footage took five full days. It was the hardest part of the
          project and the most rewarding. These people showed up, created something, and
          trusted me with it.
        </p>

        {/* Character groups image */}
        <img
          src="/rules-we-made-up/7-roll-call/SupportingCast-groups.png"
          alt="Supporting cast character groups"
          style={{ width: '100%', display: 'block', borderRadius: '8px', marginBottom: '24px' }}
        />

        {/* Caption */}
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize:   '13px',
          lineHeight: 1.6,
          color:      '#A9A9A9',
          margin:     0,
        }}>
          I divided all characters into groups by scene so I could animate each cluster
          separately and control the lighting as the night progressed.
        </p>
      </div>

      {/* ── Right: cols 5–9 — phone mockup ── */}
      <div style={{ gridColumn: '5 / 9', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
        <img
          src="/rules-we-made-up/7-roll-call/phone-roll-call.png"
          alt="Substack roll call post on phone"
          style={{ width: '100%', maxWidth: '476px', display: 'block' }}
        />
      </div>

    </section>
  );
}

// ── Cast Gallery ─────────────────────────────────────────────────────────────
function CastGallery() {
  const caption = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize:   '13px',
    lineHeight: 1.6,
    color:      '#A9A9A9',
    textAlign:  'center',
    margin:     0,
  };

  return (
    <section style={{ paddingLeft: '80px', paddingRight: '80px', paddingBottom: '100px' }}>

      {/* Family photo */}
      <img
        src="/rules-we-made-up/7-roll-call/GENERATED FAMILY PHOTO 1.jpg"
        alt="The full cast of claymation characters"
        style={{ width: '100%', display: 'block', borderRadius: '10px' }}
      />

      {/* Family photo caption */}
      <p style={{ ...caption, margin: '16px 0 40px' }}>
        "Family photo": The cast of characters created by myself and others.
      </p>

      {/* Five character images */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        {[
          { src: '1-CREDITS_DALLAS.jpg',  alt: 'Dallas' },
          { src: '2-CREDITS_Alyssa.jpg',  alt: 'Alyssa' },
          { src: '3-CREDITS_Anna.jpg',    alt: 'Anna'   },
          { src: '4-CREDITS_RECLAIM.jpg', alt: 'Reclaim'},
          { src: '5-CREDITS_TOM.jpg',     alt: 'Tom'    },
        ].map(({ src, alt }) => (
          <div
            key={src}
            style={{ borderRadius: '8px', overflow: 'hidden', width: '208px', height: '372px', flexShrink: 0, transition: 'transform 0.3s ease', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
          >
            <img
              src={`/rules-we-made-up/7-roll-call/${src}`}
              alt={alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </div>
        ))}
      </div>

      {/* Bottom caption */}
      <p style={caption}>
        From there, it was up to me to make them come alive and make sure nobody got lost in the crowd.
      </p>

    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function RulesWeMadeUp() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#101010', color: '#ffffff' }}>
      <Cursor />
      <CaseStudyNav />

      {/* ── Hero: true 50/50 split, flush top ── */}
      <section style={{ display: 'flex', minHeight: '800px', width: '100%' }}>

        {/* Left — fills remaining space, heading top-left */}
        <div style={{
          flex:           1,
          display:        'flex',
          alignItems:     'flex-start',
          paddingLeft:    '80px',
          paddingRight:   '40px',
          paddingTop:     '160px',
          paddingBottom:  '64px',
          boxSizing:      'border-box',
        }}>
          <h1 className="font-heading" style={{
            fontWeight:  500,
            fontSize:    '64px',
            lineHeight:  'normal',
            color:       '#ffffff',
            margin:      0,
          }}>
            On "Rules We Made Up": The Making of an Animated Short
          </h1>
        </div>

        {/* Right — fixed 640x800, flush top and right */}
        <div style={{
          flexShrink: 0,
          width:      '640px',
          height:     '800px',
          overflow:   'hidden',
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          >
            <source src="/rules-we-made-up/1-hero/king-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ── Metadata + Intro ── */}
      <section style={{
        display:               'grid',
        gridTemplateColumns:   'repeat(8, 1fr)',
        gap:                   '40px',
        paddingTop:            '64px',
        paddingBottom:         '64px',
        paddingLeft:           '80px',
        paddingRight:          '80px',
        alignItems:            'start',
      }}>

        {/* Metadata — columns 1–2 */}
        <div style={{ gridColumn: '1 / 3', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <MetaItem label="Year"   value="2026" />
          <MetaItem label="Role"   value="Writer, Director & Creator" />
          <MetaItem label="Medium" value="AI Animated Short" />
        </div>

        {/* Intro text — columns 3–8, 80px right margin from section padding */}
        <div style={{ gridColumn: '3 / 9' }}>
          <p style={{
            fontFamily:  'Poppins, sans-serif',
            fontWeight:  400,
            fontSize:    '20px',
            lineHeight:  1.6,
            color:       '#ffffff',
            margin:      '0 0 20px',
          }}>
            The rules we made up about work, creativity, and value are all shifting. We're being
            forced to rediscover what it means to be human when AI can replicate what we thought
            made us irreplaceable. And somewhere in that uncertainty is an invitation to find what
            brings you joy, what grounds you, what makes you feel most like yourself.
          </p>
          <p style={{
            fontFamily:  'Poppins, sans-serif',
            fontWeight:  400,
            fontSize:    '20px',
            lineHeight:  1.6,
            color:       '#ffffff',
            margin:      0,
          }}>
            That's what this project is all about.
          </p>
        </div>
      </section>

      {/* ── Vimeo embed ── */}
      <section style={{ paddingLeft: '80px', paddingRight: '80px', paddingBottom: '80px' }}>
        <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
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
      </section>

      {/* ── How it started ── */}
      <HowItStarted />

      {/* ── Character Creation ── */}
      <CharacterCreation />

      {/* ── Mushroom Friend ── */}
      <MushroomFriend />

      {/* ── Roll Call ── */}
      <RollCall />

      {/* ── Cast Gallery ── */}
      <CastGallery />

      {/* ── Filmmaking Principles ── */}
      <FilmmakingPrinciples />

      {/* ── The Tool ── */}
      <TheTool />

      {/* ── Blooper Reel ── */}
      <BlooperReel />

      <Footer />
    </main>
  );
}
