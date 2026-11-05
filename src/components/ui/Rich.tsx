import * as React from 'react';
import { colors } from '@/theme/tokens';

const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== 'false';

/**
 * Renders copy from the content draft. Any text in [square brackets] is a
 * placeholder that needs confirmation before publishing; it is highlighted
 * so reviewers can spot it. Set NEXT_PUBLIC_SHOW_PLACEHOLDERS="false" to
 * render placeholders as plain text.
 */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const isPlaceholder = part.startsWith('[') && part.endsWith(']');
        if (!isPlaceholder || !SHOW_PLACEHOLDERS) return <React.Fragment key={i}>{part}</React.Fragment>;
        return (
          <mark
            key={i}
            title="Placeholder: confirm before publishing"
            style={{
              backgroundColor: 'rgb(var(--gvp-accent) / 0.22)',
              color: 'inherit',
              borderBottom: `1.5px dashed ${colors.accentDark}`,
              padding: '0 2px',
              borderRadius: 2,
            }}
          >
            {part}
          </mark>
        );
      })}
    </>
  );
}
