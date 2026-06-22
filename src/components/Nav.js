import Link from 'next/link';
import { useState } from 'react';

function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:       'relative',
        fontFamily:     'Poppins, sans-serif',
        fontWeight:     700,
        fontSize:       '11px',
        letterSpacing:  '0.18em',
        textTransform:  'uppercase',
        textDecoration: 'none',
        color:          hovered ? '#ffffff' : '#D9D9D9',
        paddingBottom:  '5px',
        transition:     'color 0.2s ease',
        display:        'inline-block',
      }}
    >
      {children}
      <span style={{
        position:        'absolute',
        bottom:          0,
        left:            0,
        height:          '1.5px',
        width:           hovered ? '100%' : '0%',
        backgroundColor: '#FDB154',
        transition:      'width 0.35s ease-out',
        borderRadius:    '2px',
      }} />
    </Link>
  );
}

export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <NavLink href="/">Home</NavLink>

      <div className="flex gap-10">
        {['Exhibition', 'Case Studies', 'Philosophy'].map((item) => (
          <NavLink key={item} href="#">{item}</NavLink>
        ))}
      </div>

      <button aria-label="Open menu" className="flex flex-col gap-[5px]">
        <span className="block w-5 h-px bg-off-white" />
        <span className="block w-5 h-px bg-off-white" />
        <span className="block w-5 h-px bg-off-white" />
      </button>
    </nav>
  );
}
