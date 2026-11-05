import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { colors, fontStacks } from '@/theme/tokens';
import { footerNav, legalNav, siteConfig } from '@/lib/site';
import { TextLink } from '@/components/ui/links';
import Rich from '@/components/ui/Rich';
import SecurityPattern from '@/components/ui/SecurityPattern';

const linkSx = { color: 'rgb(var(--gvp-on-dark) / 0.75)', fontSize: '0.95rem', '&:hover': { color: '#fff' } };

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box component="footer" sx={{ position: 'relative', bgcolor: colors.base, color: 'rgb(var(--gvp-on-dark))', pt: { xs: 8, md: 10 }, pb: 4, overflow: 'hidden' }}>
      <SecurityPattern opacity={0.07} lines={18} amplitude={90} centre={0.2} />
      <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 6, md: 8 },
            gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr 1fr' },
          }}
        >
          <Box>
            <Image src="/brand/gvp-mark-white.png" alt="GVP Global Visit Permit" width={1349} height={370} style={{ height: 40, width: 'auto' }} />
            <Typography variant="body2" sx={{ mt: 3, color: 'rgb(var(--gvp-on-dark) / 0.7)', maxWidth: 380 }}>
              A trusted partner to governments for secure, seamless and sustainable border management. Designed, funded and operated by GVP.
              Governed by the State.
            </Typography>
          </Box>

          <Box component="nav" aria-label="Footer">
            <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 2 }}>
              Explore
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 1.25, columnGap: 3 }}>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} sx={linkSx}>
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 2 }}>
              Government enquiries
            </Typography>
            <Stack spacing={1.25} sx={{ color: 'rgb(var(--gvp-on-dark) / 0.75)', fontSize: '0.95rem' }}>
              <Typography variant="body2"><Rich text={siteConfig.contact.address} /></Typography>
              <Typography variant="body2"><Rich text={siteConfig.contact.phone} /></Typography>
              <Typography variant="body2"><Rich text={siteConfig.contact.email} /></Typography>
              <Typography variant="body2"><Rich text={siteConfig.contact.linkedin} /></Typography>
            </Stack>
            <Box sx={{ mt: 3 }}>
              <TextLink href="/contact" sx={{ color: colors.accentLight, fontWeight: 600 }}>
                Request a confidential briefing →
              </TextLink>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 5, md: 6 }, borderColor: 'rgb(var(--gvp-pattern) / 0.18)' }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ sm: 'center' }}>
          <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.08em', color: 'rgb(var(--gvp-on-dark) / 0.55)' }}>
            © {year} GVP · Global Visit Permit. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {legalNav.map((item) => (
              <TextLink key={item.href} href={item.href} sx={{ ...linkSx, fontSize: '0.85rem' }}>
                {item.label}
              </TextLink>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
