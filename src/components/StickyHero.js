/**
 * StickyHero — sticky hero wrapper for all case study pages.
 *
 * Renders the <section> that sticks to the top while post-hero sections
 * scroll over it. All children (left panel, right panel) go inside.
 *
 * REQUIRED on the page's <main> tag: NO overflow property.
 * overflowX: 'hidden' on any ancestor kills position: sticky.
 * Use overflowX: 'clip' on individual carousel wrappers instead.
 */
export default function StickyHero({ children, backgroundColor = '#FFFBF8', minHeight = 'max(800px, 90vh)', maxHeight = 'max(800px, 90vh)' }) {
  return (
    <section style={{
      display:         'flex',
      position:        'sticky',
      top:             0,
      zIndex:          1,
      minHeight,
      maxHeight,
      width:           '100%',
      backgroundColor,
    }}>
      {children}
    </section>
  );
}
