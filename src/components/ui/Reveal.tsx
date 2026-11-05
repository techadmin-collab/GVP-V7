'use client';

import * as React from 'react';

type Props = {
  children: React.ReactNode;
  /** Delay in ms, for staggering items in a row */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Fades and lifts its content into view the first time it scrolls into
 * the viewport. Content already on screen at load is left as is, nothing
 * is hidden if JavaScript is off, and people who prefer reduced motion
 * just see the content.
 */
export default function Reveal({ children, delay = 0, className, style }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already visible on load: don't animate
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setHidden(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setHidden(false);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`gvp-reveal${hidden ? '' : ' is-visible'}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: hidden ? undefined : `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
