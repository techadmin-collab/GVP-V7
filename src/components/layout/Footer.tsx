import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { colors } from '@/theme/tokens';
import { confirmedContact, footerNav, legalNav, siteConfig } from '@/lib/site';
import { TextLink } from '@/components/ui/links';
import Rich from '@/components/ui/Rich';
import LogoMark from '@/components/ui/LogoMark';

/** v7 Modern bento: the footer is itself a set of rounded tiles on the blush page. */
export default function Footer() {
  const year = new Date().getFullYear();
  const contact = Object.values(confirmedContact()).filter((v): v is string => Boolean(v));
  const tile = { bgcolor: colors.surface, borderRadius: '28px', border: `1px solid ${colors.line}`, p: { xs: 3, md: 4 } } as const;
  return (
    <Box component="footer" sx={{ bgcolor: colors.background, pt: { xs: 4, md: 6 }, pb: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '5fr 4fr 3fr' } }}>
          <Box sx={{ ...tile, bgcolor: colors.primary, border: 'none', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 240 }}>
            <LogoMark color="#FFFFFF" height={32} />
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, letterSpacing: '-0.03em', lineHeight: 1.05 }}>{siteConfig.tagline}</Typography>
              <Typography sx={{ mt: 1, opacity: 0.8 }}>{siteConfig.nameLine}</Typography>
            </Box>
          </Box>
          <Box component="nav" aria-label="Footer" sx={tile}>
            <Typography sx={{ fontWeight: 700, color: colors.muted, fontSize: '0.85rem', mb: 1.5 }}>Explore</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {footerNav.map((item) => (
                <TextLink key={item.href} href={item.href} underline="none" sx={{ px: 1.75, py: 0.75, borderRadius: 999, bgcolor: colors.background, color: colors.text, fontWeight: 600, fontSize: '0.88rem', '&:hover': { bgcolor: colors.accentLight } }}>
                  {item.label}
                </TextLink>
              ))}
            </Box>
          </Box>
          <Box sx={tile}>
            <Typography sx={{ fontWeight: 700, color: colors.muted, fontSize: '0.85rem', mb: 1.5 }}>Government enquiries</Typography>
            {contact.map((v) => (
              <Typography key={v} variant="body2" sx={{ color: colors.text }}><Rich text={v} /></Typography>
            ))}
            <TextLink href="/contact" sx={{ display: 'inline-block', mt: 1, color: colors.primary, fontWeight: 700 }}>Request a confidential briefing →</TextLink>
          </Box>
        </Box>
        <Box sx={{ mt: 2.5, px: 1, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>© {year} GVP | {siteConfig.nameLine}. All rights reserved.</Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {legalNav.map((item) => (
              <TextLink key={item.href} href={item.href} sx={{ fontSize: '0.82rem', color: colors.muted }}>{item.label}</TextLink>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
