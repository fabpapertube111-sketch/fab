'use client';

import { useEffect, useRef, useState } from 'react';

// ── Custom cursor: small dot + trailing ring, color-coded by element type ──────
// Colors match the site palette:
//   default  → #1a4a9e (brand blue)
//   hovering links/buttons → #c8922a (brand gold) + scale-up
//   hovering images → #4db8ff (sky blue) + crosshair dot
//   text areas / inputs → thin I-beam ring

type CursorState = 'default' | 'pointer' | 'text' | 'image';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos   = useRef({ x: -200, y: -200 });
  const ring  = useRef({ x: -200, y: -200 });
  const state = useRef<CursorState>('default');
  const raf   = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // ── track mouse ────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // detect element type under cursor
      const el = e.target as HTMLElement;
      const isPointer = !!el.closest('a, button, [role="button"], select, label[for]');
      const isText    = !!el.closest('input, textarea');
      const isImage   = !!el.closest('img, [data-cursor="image"]');

      state.current = isPointer ? 'pointer'
                    : isText    ? 'text'
                    : isImage   ? 'image'
                    : 'default';
    };

    // ── hide native cursor site-wide via CSS ───────────────────────────────
    document.documentElement.style.cursor = 'none';

    window.addEventListener('mousemove', onMove, { passive: true });

    // ── animation loop: dot snaps instantly, ring lerps ───────────────────
    const LERP = 0.13;

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * LERP;
      ring.current.y += (pos.current.y - ring.current.y) * LERP;

      const dot  = dotRef.current;
      const rng  = ringRef.current;
      if (!dot || !rng) { raf.current = requestAnimationFrame(tick); return; }

      // ── dot: always snaps to exact position ──────────────────────────────
      dot.style.transform  = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;

      // ── ring: lerped ─────────────────────────────────────────────────────
      rng.style.transform  = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;

      // ── state-based styles ────────────────────────────────────────────────
      const s = state.current;

      if (s === 'pointer') {
        // gold, larger ring, dot hides
        dot.style.opacity        = '0';
        rng.style.width          = '44px';
        rng.style.height         = '44px';
        rng.style.borderColor    = '#c8922a';
        rng.style.backgroundColor = 'rgba(200,146,42,0.10)';
        rng.style.borderWidth    = '2px';
      } else if (s === 'text') {
        // thin tall I-beam style ring
        dot.style.opacity        = '1';
        dot.style.backgroundColor = '#1a4a9e';
        dot.style.width          = '2px';
        dot.style.height         = '18px';
        dot.style.borderRadius   = '1px';
        rng.style.width          = '24px';
        rng.style.height         = '24px';
        rng.style.borderColor    = 'rgba(26,74,158,0.4)';
        rng.style.backgroundColor = 'transparent';
        rng.style.borderWidth    = '1.5px';
      } else if (s === 'image') {
        // sky blue crosshair dot + ring
        dot.style.opacity        = '1';
        dot.style.backgroundColor = '#4db8ff';
        dot.style.width          = '6px';
        dot.style.height         = '6px';
        dot.style.borderRadius   = '50%';
        rng.style.width          = '40px';
        rng.style.height         = '40px';
        rng.style.borderColor    = '#4db8ff';
        rng.style.backgroundColor = 'rgba(77,184,255,0.08)';
        rng.style.borderWidth    = '1.5px';
      } else {
        // default — blue dot + ring
        dot.style.opacity        = '1';
        dot.style.backgroundColor = '#1a4a9e';
        dot.style.width          = '6px';
        dot.style.height         = '6px';
        dot.style.borderRadius   = '50%';
        rng.style.width          = '30px';
        rng.style.height         = '30px';
        rng.style.borderColor    = 'rgba(26,74,158,0.55)';
        rng.style.backgroundColor = 'transparent';
        rng.style.borderWidth    = '1.5px';
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    // ── hide both cursors when mouse leaves the window ─────────────────────
    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.style.cursor = '';
    };
  }, []);

  // Don't render on server or touch devices
  if (!mounted) return null;

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#1a4a9e',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.15s, height 0.15s, border-radius 0.15s, background-color 0.15s, opacity 0.12s',
          willChange: 'transform',
        }}
      />

      {/* Ring — lerped trail */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1.5px solid rgba(26,74,158,0.55)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, background-color 0.18s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
