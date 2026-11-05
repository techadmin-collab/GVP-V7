'use client';

import * as React from 'react';

export type HeroVideoSource = { mp4: string; webm?: string; poster: string };

/**
 * Decorative background video for heroes.
 * - Muted, looping and inline (required for autoplay on phones)
 * - Doesn't autoplay for people who prefer reduced motion (they see the poster)
 * - Pauses while the hero is off screen, to save battery and CPU
 */
export default function HeroVideo({ mp4, webm, poster, opacity = 0.6 }: HeroVideoSource & { opacity?: number }) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const play = () => v.play().catch(() => undefined);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) play();
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity,
        pointerEvents: 'none',
      }}
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
