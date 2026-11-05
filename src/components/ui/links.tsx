'use client';

/**
 * Client wrappers that combine MUI components with next/link.
 * Server components can't pass `component={NextLink}` directly, so pages use these.
 */
import * as React from 'react';
import NextLink from 'next/link';
import Button, { type ButtonProps } from '@mui/material/Button';
import MuiLink, { type LinkProps as MuiLinkProps } from '@mui/material/Link';
import { HOME_ONLY } from '@/lib/site';

/** In home-only mode, clicks are swallowed so nothing navigates. */
function stay(e: React.MouseEvent) {
  e.preventDefault();
}

type ButtonLinkProps = Omit<ButtonProps, 'href' | 'ref' | 'component'> & { href: string };

export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  if (HOME_ONLY) return <Button href="#" {...props} onClick={stay} />;
  const external = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
  if (external) return <Button href={href} {...props} />;
  // LinkComponent tells MUI to render internal links with next/link
  // (client-side navigation) while keeping Button's own prop types.
  return <Button href={href} LinkComponent={NextLink} {...props} />;
}

type TextLinkProps = Omit<MuiLinkProps, 'href' | 'ref' | 'component'> & { href: string };

export function TextLink({ href, ...props }: TextLinkProps) {
  if (HOME_ONLY) return <MuiLink href="#" {...props} onClick={stay} />;
  const external = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
  if (external) return <MuiLink href={href} {...props} />;
  return <MuiLink component={NextLink} href={href} {...props} />;
}
