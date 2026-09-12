'use client';

import { useEffect, useRef, useState } from 'react';

// ── Custom cursor — always visible on any background ───────────────────────────
//
// DOT   : white with mix-blend-mode:difference → auto-inverts against any bg
//         (white on dark = white, white on light = black — always visible)
//
// RING  : gold (#c8922a) semi-transparent trailing ring — lerped for smoothness
//
// STATES:
//   default  → 8px white dot  + 32px gold ring
//   pointer  → dot hidden     + 48px gold filled ring (links/buttons)
//   text     → 2px white beam + 28px thin white ring  (inputs)
//   image    → 8px white dot  + 44px white ring       (images)

type CursorState = 'default' | 'pointer' | 'text' | 'image';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos    = useRef({ x: -300, y: -300 });
  const ringXY = useRef({ x: -300, y: -300 });
  const state  = useRef<CursorState>('default');
  const raf    = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only on pointer (mouse) devices — skip touch
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setMounted(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const el = e.target as HTMLElement;
      const isPointer = !!el.closest('a, button, [role="button"], select');
      const isText    = !!el.closest('input, textarea');
      const isImage   = !!el.closest('img, [data-cursor="image"]');

      state.current = isPointer ? 'pointer'
                    : isText    ? 'text'
                    : isImage   ? 'image'
                    : 'default';
    };

    document.documentElement.style.cursor = 'none';
    window.addEventListener('mousemove', onMove, { passive: true });

    const LERP = 0.11;

    const tick = () => {
      ringXY.current.x += (pos.current.x - ringXY.current.x) * LERP;
      ringXY.current.y += (pos.current.y - ringXY.current.y) * LERP;

      const dot = dotRef.current;
      const rng = ringRef.current;
      if (!dot || !rng) { raf.current = requestAnimationFrame(tick); return; }

      // Dot snaps, ring trails
      dot.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
      rng.style.transform = `translate(${ringXY.current.x}px,${ringXY.current.y}px) translate(-50%,-50%)`;

      const s = state.current;

      // ── DOT styles ────────────────────────────────────────────────────────
      if (s === 'pointer') {
        dot.style.opacity         = '0';
        dot.style.width           = '8px';
        dot.style.height          = '8px';
        dot.style.borderRadius    = '50%';
        dot.style.mixBlendMode    = 'difference';
      } else if (s === 'text') {
        dot.style.opacity         = '1';
        dot.style.width           = '2px';
        dot.style.height          = '20px';
        dot.style.borderRadius    = '1px';
        dot.style.mixBlendMode    = 'difference';
      } else {
        // default + image
        dot.style.opacity         = '1';
        dot.style.width           = '8px';
        dot.style.height          = '8px';
        dot.style.borderRadius    = '50%';
        dot.style.mixBlendMode    = 'difference';
      }

      // ── RING styles ───────────────────────────────────────────────────────
      if (s === 'pointer') {
        rng.style.width            = '52px';
        rng.style.height           = '52px';
        rng.style.borderColor      = 'rgba(200,146,42,0.85)';
        rng.style.backgroundColor  = 'rgba(200,146,42,0.12)';
        rng.style.borderWidth      = '2px';
        rng.style.opacity          = '1';
      } else if (s === 'text') {
        rng.style.width            = '28px';
        rng.style.height           = '28px';
        rng.style.borderColor      = 'rgba(255,255,255,0.6)';
        rng.style.backgroundColor  = 'transparent';
        rng.style.borderWidth      = '1.5px';
        rng.style.opacity          = '1';
      } else if (s === 'image') {
        rng.style.width            = '48px';
        rng.style.height           = '48px';
        rng.style.borderColor      = 'rgba(255,255,255,0.75)';
        rng.style.backgroundColor  = 'rgba(255,255,255,0.06)';
        rng.style.borderWidth      = '1.5px';
        rng.style.opacity          = '1';
      } else {
        // default
        rng.style.width            = '34px';
        rng.style.height           = '34px';
        rng.style.borderColor      = 'rgba(200,146,42,0.70)';
        rng.style.backgroundColor  = 'transparent';
        rng.style.borderWidth      = '1.5px';
        rng.style.opacity          = '1';
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '1';
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

  if (!mounted) return null;

  return (
    <>
      {/* ── Dot ── snaps to exact cursor position, mix-blend-mode:difference */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '8px',
          height:          '8px',
          borderRadius:    '50%',
          backgroundColor: '#ffffff',
          mixBlendMode:    'difference',
          pointerEvents:   'none',
          zIndex:          99999,
          willChange:      'transform',
          transition:      'width 0.14s ease, height 0.14s ease, border-radius 0.14s ease, opacity 0.1s ease',
        }}
      />

      {/* ── Ring ── trails behind with lerp, gold accent */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '34px',
          height:          '34px',
          borderRadius:    '50%',
          border:          '1.5px solid rgba(200,146,42,0.70)',
          backgroundColor: 'transparent',
          pointerEvents:   'none',
          zIndex:          99998,
          willChange:      'transform',
          transition:      'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.12s ease',
        }}
      />
    </>
  );
}
