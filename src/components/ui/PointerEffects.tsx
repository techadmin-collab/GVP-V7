'use client';

import * as React from 'react';

/**
 * Site-wide card tilt, using one passive listener (no per-element wrappers):
 *  - [data-tilt]: the element tilts gently towards the cursor (--rx / --ry)
 * Only runs on devices with a fine pointer that can hover, and never for
 * people who prefer reduced motion. Styling lives in globals.css.
 */
const MAX_TILT = 7; // degrees

function resetTilt(el: HTMLElement) {
  el.style.setProperty('--rx', '0deg');
  el.style.setProperty('--ry', '0deg');
  el.style.setProperty('--lift', '0px');
  delete el.dataset.tilting;
}

export default function PointerEffects() {
  React.useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    let current: HTMLElement | null = null;

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target instanceof Element ? e.target : null;

      const tilt = target?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (tilt !== current) {
        if (current) resetTilt(current);
        current = tilt;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty('--ry', `${(px * MAX_TILT * 2).toFixed(2)}deg`);
        tilt.style.setProperty('--rx', `${(-py * MAX_TILT * 2).toFixed(2)}deg`);
        tilt.style.setProperty('--lift', '-4px');
        tilt.dataset.tilting = 'true';
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onOut = (e: PointerEvent) => {
      // pointer left the window
      if (!e.relatedTarget && current) {
        resetTilt(current);
        current = null;
      }
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      if (frame) cancelAnimationFrame(frame);
      if (current) resetTilt(current);
    };
  }, []);

  return null;
}
