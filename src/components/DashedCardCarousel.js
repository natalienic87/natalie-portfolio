import { useState, useRef, useEffect } from 'react';

/**
 * DashedCardCarousel — continuous-scroll draggable card carousel.
 *
 * Props:
 *   items       — array of { img, title?, body?, crop?, alt? }
 *                 Omit title/body for image-only cards.
 *   cardWidth   — px width of each card on desktop (default 500)
 *   gap         — px gap between cards on desktop (default 50)
 *   imageRatio  — CSS aspect-ratio for the image (default '4 / 3', use '1 / 1' for square)
 */
export default function DashedCardCarousel({ items = [], cardWidth = 500, gap = 50, imageRatio = '4 / 3' }) {
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const CARD_W    = isMobile ? Math.min(cardWidth, windowWidth - 48) : cardWidth;
  const GAP       = isMobile ? 16 : gap;
  const SNAP_STEP = CARD_W + GAP;

  const [page,     setPage]     = useState(0);
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef(null);
  const trackRef    = useRef(null);
  const offsetRef   = useRef(0);
  const animRef     = useRef(null);
  const dragRef     = useRef({ active: false, startX: 0, startOffset: 0 });
  const vpWidthRef  = useRef(windowWidth);
  const [vpWidth,   setVpWidth] = useState(windowWidth);

  const getMaxOff = () =>
    Math.max(0, items.length * CARD_W + (items.length - 1) * GAP - vpWidthRef.current);

  const applyTransform = () => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
  };

  const animateTo = (target) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const clamped  = Math.max(0, Math.min(getMaxOff(), target));
    const start    = offsetRef.current;
    const diff     = clamped - start;
    const t0       = performance.now();
    const tick = (now) => {
      const p    = Math.min((now - t0) / 500, 1);
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      offsetRef.current = start + diff * ease;
      applyTransform();
      if (p < 1) animRef.current = requestAnimationFrame(tick);
      else { offsetRef.current = clamped; applyTransform(); }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const snapNearest = () => {
    const maxPage = Math.floor(getMaxOff() / SNAP_STEP);
    const nearest = Math.max(0, Math.min(maxPage, Math.round(offsetRef.current / SNAP_STEP)));
    setPage(nearest);
    animateTo(nearest * SNAP_STEP);
  };

  // Reset to page 0 when switching between mobile and desktop
  useEffect(() => {
    offsetRef.current = 0;
    setPage(0);
    animateTo(0);
  }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      vpWidthRef.current = e.contentRect.width;
      setVpWidth(e.contentRect.width);
    });
    ro.observe(el);
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (animRef.current) cancelAnimationFrame(animRef.current);
      offsetRef.current = Math.max(0, Math.min(getMaxOff(), offsetRef.current + e.deltaX));
      applyTransform();
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { ro.disconnect(); el.removeEventListener('wheel', handleWheel); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { animateTo(page * SNAP_STEP); }, [page, vpWidth]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mouse handlers
  const onMouseDown = (e) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    offsetRef.current = Math.max(0, Math.min(getMaxOff(), dragRef.current.startOffset + (dragRef.current.startX - e.clientX)));
    applyTransform();
  };
  const onDragEnd = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
    snapNearest();
  };

  // Touch handlers
  const onTouchStart = (e) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    dragRef.current = { active: true, startX: e.touches[0].clientX, startOffset: offsetRef.current };
  };
  const onTouchMove = (e) => {
    if (!dragRef.current.active) return;
    offsetRef.current = Math.max(0, Math.min(getMaxOff(), dragRef.current.startOffset + (dragRef.current.startX - e.touches[0].clientX)));
    applyTransform();
  };
  const onTouchEnd = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    snapNearest();
  };

  const maxOff  = Math.max(0, items.length * CARD_W + (items.length - 1) * GAP - vpWidth);
  const numDots = Math.floor(maxOff / SNAP_STEP) + 1;

  const outerPad  = isMobile ? '0 24px' : '0 120px';
  const overflowML = isMobile ? '0' : '-60px';
  const overflowPL = isMobile ? '0' : '60px';

  const arrowStyle = (disabled, side) => ({
    position: 'absolute', top: isMobile ? 'calc(50% - 40px)' : '50%',
    transform: 'translateY(-50%)', zIndex: 2,
    [side]: isMobile ? '4px' : '28px',
    width: '44px', height: '44px', borderRadius: '50%',
    border: '1.5px solid rgba(16,16,16,0.18)', backgroundColor: '#ffffff',
    cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.3 : 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '18px', color: '#101010', transition: 'opacity 0.25s ease',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)', flexShrink: 0,
  });

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ padding: outerPad, boxSizing: 'border-box', position: 'relative' }}>

        <button onClick={() => setPage(p => Math.max(0, p - 1))} aria-label="Previous"
          style={arrowStyle(page === 0, 'left')}>←</button>
        <button onClick={() => setPage(p => Math.min(numDots - 1, p + 1))} aria-label="Next"
          style={arrowStyle(page === numDots - 1, 'right')}>→</button>

        <div style={{ overflowX: 'clip', marginLeft: overflowML, paddingLeft: overflowPL }}>
          <div ref={viewportRef}
            style={{ overflow: 'visible', padding: isMobile ? '24px 0 40px' : '40px 0 80px', cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          >
            <div ref={trackRef} style={{ display: 'flex', gap: `${GAP}px`, willChange: 'transform' }}>
              {items.map((item, i) => (
                <div key={i}
                  style={{
                    width:           `${CARD_W}px`,
                    flexShrink:      0,
                    backgroundColor: '#ffffff',
                    borderRadius:    '20px',
                    overflow:        'hidden',
                    border:          '2px dashed #101010',
                    padding:         '16px',
                    boxSizing:       'border-box',
                    boxShadow:       '0 16px 48px rgba(0,0,0,0.14)',
                    transform:       'translateY(0px)',
                    transition:      'transform 0.3s ease',
                    display:         'flex',
                    flexDirection:   'column',
                  }}
                  onMouseEnter={e => { if (!dragRef.current.active) e.currentTarget.style.transform = 'translateY(-8px)'; }}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
                >
                  <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: item.title ? '16px' : 0, flexShrink: 0 }}>
                    <img src={item.img} alt={item.alt || item.title || ''} draggable={false}
                      style={{ width: '100%', aspectRatio: imageRatio, objectFit: 'cover', objectPosition: item.crop === 'left' ? 'left center' : 'center', display: 'block' }} />
                  </div>
                  {item.title && (
                    <div style={{ padding: '8px' }}>
                      <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: isMobile ? '18px' : '24px', lineHeight: isMobile ? '1.2' : '26px', color: '#101010', margin: '0 0 10px' }}>
                        {item.title}
                      </h4>
                      {item.body && (
                        <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: '16px', lineHeight: '160%', color: '#404040', margin: 0 }}>
                          {item.body}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: isMobile ? '16px' : '32px' }}>
          {Array.from({ length: numDots }).map((_, idx) => (
            <button key={idx} onClick={() => setPage(idx)} aria-label={`Page ${idx + 1}`}
              style={{
                width: idx === page ? '24px' : '8px', height: '8px', borderRadius: '4px',
                backgroundColor: idx === page ? '#101010' : 'rgba(16,16,16,0.25)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }} />
          ))}
        </div>

      </div>
    </div>
  );
}
