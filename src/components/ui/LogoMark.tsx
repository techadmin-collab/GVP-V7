import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * The GVP mark in any colour. The logo file is white on transparent, so it is
 * used as a CSS mask and filled with the requested colour (maroon on light
 * headers, white on dark ones). Aspect ratio of the artwork: 1349 x 370.
 */
export default function LogoMark({ color, height = 30, label = 'GVP | Border Management Partners' }: { color: string; height?: number; label?: string }) {
  const mask = {
    WebkitMaskImage: 'url(/brand/gvp-mark-white.png)',
    maskImage: 'url(/brand/gvp-mark-white.png)',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'left center',
    maskPosition: 'left center',
  } as const;
  return <Box role="img" aria-label={label} sx={{ display: 'block', height, width: Math.round((height * 1349) / 370), bgcolor: color, ...mask }} />;
}
