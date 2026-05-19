import { useEffect } from 'react';

const COLORS = ['#c084fc', '#818cf8', '#60a5fa', '#f472b6', '#a78bfa', '#e879f9'];

export default function Cursor() {
  useEffect(() => {
    const onClick = (e) => {
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * 360;
        const dist  = 32 + Math.random() * 18;
        const tx    = Math.cos((angle * Math.PI) / 180) * dist;
        const ty    = Math.sin((angle * Math.PI) / 180) * dist;

        const el = document.createElement('div');
        el.className   = 'cursor-sparkle';
        el.textContent = '✦';
        el.style.cssText = `
          left: ${e.clientX}px;
          top:  ${e.clientY}px;
          color: ${COLORS[i]};
          --tx: ${tx}px;
          --ty: ${ty}px;
          font-size: ${10 + Math.random() * 6}px;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 420);
      }
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return null;
}
