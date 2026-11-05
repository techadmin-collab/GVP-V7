import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stamp from '@/components/ui/Stamp';
import Rich from '@/components/ui/Rich';
import { colors } from '@/theme/tokens';

/**
 * Security and governance commitments shown as passport entry stamps.
 * Every stamp is a commitment stated in the content brief. The standards
 * stamp stays a placeholder until certifications are confirmed (brief:
 * "every figure, certification and past achievement should be substantiated").
 */

type StampSpec = {
  ring: string;
  top: string;
  main: string;
  bottom: string;
  title: string;
  body: string;
  tilt: number;
  pending?: boolean;
};

const stamps: StampSpec[] = [
  {
    ring: 'GOVERNMENT OWNS ALL DATA · SOVEREIGN · ',
    top: 'YOUR LAWS',
    main: 'DATA',
    bottom: 'IN-COUNTRY',
    title: 'Data sovereignty',
    body: 'Hosting in-country or in a Government-approved location. Government owns all traveller and operational data.',
    tilt: -8,
  },
  {
    ring: 'OPEN BOOKS · INDEPENDENT AUDIT · ',
    top: 'VERIFIED',
    main: 'AUDIT',
    bottom: 'OPEN BOOKS',
    title: 'Independent audit',
    body: 'An independent auditor verifies volumes, collections and distributions [annually or as agreed].',
    tilt: 6,
  },
  {
    ring: 'ENCRYPTION · ROLE-BASED ACCESS · TRAILS · ',
    top: 'BY DESIGN',
    main: 'SECURE',
    bottom: 'TESTED',
    title: 'Security by design',
    body: 'Encryption, role-based access, complete audit trails and regular penetration testing.',
    tilt: -4,
  },
  {
    ring: 'AUTOMATION SUPPORTS · OFFICERS DECIDE · ',
    top: 'THE STATE',
    main: 'HUMAN',
    bottom: 'OVERSIGHT',
    title: 'Human oversight',
    body: 'Automation supports officers. Decisions remain with the State, within national law and policy.',
    tilt: 9,
  },
  {
    ring: 'STANDARDS ALIGNED · TO BE CONFIRMED · ',
    top: 'ALIGNED',
    main: 'ISO',
    bottom: 'PENDING',
    title: 'Recognised standards',
    body: 'Alignment with [for example ISO 27001 and relevant national requirements].',
    tilt: -6,
    pending: true,
  },
];

export default function GovernanceStamps() {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gap: { xs: 4, md: 3 },
        gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))', lg: 'repeat(5, minmax(0, 1fr))' },
      }}
    >
      {stamps.map((s) => (
        <Box component="li" key={s.title} sx={{ textAlign: 'center' }}>
          <Box
            aria-hidden="true"
            sx={{
              width: { xs: 130, md: 150 },
              mx: 'auto',
              transform: `rotate(${s.tilt}deg)`,
              transition: 'transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)',
              opacity: s.pending ? 0.55 : 1,
              '&:hover': { transform: 'rotate(0deg) scale(1.05)' },
              '& svg': { width: '100%', height: 'auto' },
            }}
          >
            <Stamp
              ring={s.ring}
              centreTop={s.top}
              centreMain={s.main}
              centreBottom={s.bottom}
              size={150}
              rotate={0}
              color={s.pending ? colors.muted : colors.primary}
            />
          </Box>
          <Typography variant="h5" component="h3" sx={{ mt: 2.5, color: colors.base }}>
            {s.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: colors.muted, maxWidth: 230, mx: 'auto' }}>
            <Rich text={s.body} />
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
