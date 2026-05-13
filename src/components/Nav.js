import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <Link
        href="/"
        className="font-body text-[11px] uppercase tracking-[0.18em] text-off-white border-b border-yellow pb-0.5"
      >
        Home
      </Link>

      <div className="flex gap-10">
        {['Exhibition', 'Case Studies', 'Philosophy'].map((item) => (
          <Link
            key={item}
            href="#"
            className="font-body text-[11px] uppercase tracking-[0.18em] text-off-white/70 hover:text-off-white transition-colors"
          >
            {item}
          </Link>
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
