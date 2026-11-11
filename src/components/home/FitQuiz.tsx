'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { colors, fontStacks } from '@/theme/tokens';
import { ButtonLink } from '@/components/ui/links';
import { contactHref, type InterestValue } from '@/lib/site';

/**
 * "Is GVP right for your country?" — four quick questions that lead to a
 * tailored summary and the briefing form. Everything it recommends comes
 * from the content brief (modules, phased delivery, GVP financing).
 */

type Entry = 'airports' | 'seaports' | 'land';
type System = 'manual' | 'partial' | 'legacy' | 'fragmented';
type Priority = 'security' | 'queues' | 'revenue' | 'tourism';
type Timeline = 'soon' | 'mid' | 'exploring';

type Answers = { entry: Entry[]; system?: System; priority?: Priority; timeline?: Timeline };

type Option<T extends string> = { value: T; label: string; hint?: string };

const Q_ENTRY: Option<Entry>[] = [
  { value: 'airports', label: 'Airports' },
  { value: 'seaports', label: 'Seaports' },
  { value: 'land', label: 'Land crossings' },
];
const Q_SYSTEM: Option<System>[] = [
  { value: 'manual', label: 'Mostly manual counters', hint: 'Paper or basic systems' },
  { value: 'partial', label: 'Some automation', hint: 'A few eGates or e-visas' },
  { value: 'legacy', label: 'An ageing system', hint: 'Due for replacement' },
  { value: 'fragmented', label: 'Modern but fragmented', hint: 'Separate systems that don’t talk' },
];
const Q_PRIORITY: Option<Priority>[] = [
  { value: 'security', label: 'Stronger security' },
  { value: 'queues', label: 'Shorter queues' },
  { value: 'revenue', label: 'New revenue stream' },
  { value: 'tourism', label: 'Tourism growth' },
];
const Q_TIMELINE: Option<Timeline>[] = [
  { value: 'soon', label: 'Within 12 months' },
  { value: 'mid', label: 'In 1–2 years' },
  { value: 'exploring', label: 'Just exploring' },
];

const STEPS = ['Entry points', 'Current system', 'Main priority', 'Timeline'] as const;

const HEADLINES: Record<Priority, string> = {
  security: 'Stronger security from the first traveller.',
  queues: 'Shorter queues without adding counters or staff.',
  revenue: 'A new revenue stream, built around your country.',
  tourism: 'A border that welcomes, and promotes, your country.',
};

const PRIORITY_MODULES: Record<Priority, string[]> = {
  security: ['Electronic Travel Authorisation (ETA) with pre-arrival screening', 'Risk assessment and watchlist integration'],
  queues: ['Biometric eGates and automated counters', 'Passenger-flow analytics and live dashboards'],
  revenue: ['ETA with published, digitally collected fees', 'Government revenue dashboard and independent audit'],
  tourism: ['Destination-branded ETA and arrival experience', 'Anonymised traveller insights for tourism planners'],
};

const SYSTEM_MODULE: Record<System, string> = {
  manual: 'Officer and supervisor workstations, with full training',
  partial: 'eGates and workstations alongside your existing counters',
  legacy: 'An integration layer to migrate from your current system',
  fragmented: 'An integration layer that brings every system onto one platform',
};

const TIMELINE_NOTE: Record<Timeline, string> = {
  soon: 'A briefing now lets your finance and legal teams review the model alongside the budget cycle.',
  mid: 'There is time for discovery and design workshops before any procurement decision.',
  exploring: 'We can share a summary of the model so your officials can assess it at their own pace.',
};

const INTEREST: Record<Priority, InterestValue> = {
  security: 'BMS',
  queues: 'EGATES',
  revenue: 'PARTNERSHIP_MODEL',
  tourism: 'DESTINATION_PROMOTION',
};

const ENTRY_LABEL: Record<Entry, string> = { airports: 'airport', seaports: 'seaport', land: 'land crossing' };

function startingPoint(entry: Entry[]) {
  const order: Entry[] = ['airports', 'seaports', 'land'];
  const chosen = order.filter((e) => entry.includes(e));
  const first = chosen[0] ?? 'airports';
  const rest = chosen.slice(1).map((e) => (e === 'land' ? 'land crossings' : e));
  const then = rest.length ? `, then a phased roll-out to your ${rest.join(' and ')}` : ', then a phased roll-out to other entry points';
  return `A controlled pilot at your priority ${ENTRY_LABEL[first]}${then}.`;
}

function OptionButton({ selected, label, hint, onClick, multi }: { selected: boolean; label: string; hint?: string; onClick: () => void; multi?: boolean }) {
  return (
    <ButtonBase
      onClick={onClick}
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 1.5,
        width: '100%',
        textAlign: 'left',
        px: 2.5,
        py: 2,
        borderRadius: '4px',
        border: `1.5px solid ${selected ? colors.primary : colors.line}`,
        bgcolor: selected ? 'rgb(var(--gvp-primary) / 0.07)' : colors.surface,
        transition: 'border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease',
        '&:hover': { borderColor: colors.primary, transform: 'translateY(-1px)' },
        '&.Mui-focusVisible': { outline: `2px solid ${colors.accentDark}`, outlineOffset: 2 },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: multi ? '5px' : '50%',
          border: `1.5px solid ${selected ? colors.primary : colors.pattern}`,
          bgcolor: selected ? colors.primary : 'transparent',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          '& svg': { fontSize: 15 },
        }}
      >
        {selected ? <CheckRoundedIcon /> : null}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600, color: colors.base, lineHeight: 1.3 }}>{label}</Typography>
        {hint ? (
          <Typography variant="body2" sx={{ color: colors.muted, fontSize: '0.85rem' }}>
            {hint}
          </Typography>
        ) : null}
      </Box>
    </ButtonBase>
  );
}

export default function FitQuiz() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({ entry: [] });
  const done = step >= STEPS.length;

  const canNext =
    (step === 0 && answers.entry.length > 0) ||
    (step === 1 && !!answers.system) ||
    (step === 2 && !!answers.priority) ||
    (step === 3 && !!answers.timeline);

  const toggleEntry = (e: Entry) =>
    setAnswers((a) => ({ ...a, entry: a.entry.includes(e) ? a.entry.filter((x) => x !== e) : [...a.entry, e] }));

  const restart = () => {
    setAnswers({ entry: [] });
    setStep(0);
  };

  const questionTitles = [
    'Which entry points would you like to modernise?',
    'How would you describe your current system?',
    'What matters most to your Government?',
    'When would you like to start?',
  ];

  return (
    <Box sx={{ bgcolor: colors.surface, border: `1px solid ${colors.line}`, borderRadius: '4px', overflow: 'hidden', boxShadow: '0 24px 48px -28px rgb(var(--gvp-base) / 0.35)' }}>
      {/* Progress */}
      <Box sx={{ display: 'flex', borderBottom: `1px solid ${colors.line}` }}>
        {STEPS.map((label, i) => {
          const state = done || i < step ? 'done' : i === step ? 'current' : 'todo';
          return (
            <Box
              key={label}
              sx={{
                flex: 1,
                px: { xs: 1, sm: 2 },
                py: 1.5,
                borderBottom: `3px solid ${state === 'todo' ? 'transparent' : state === 'current' ? colors.accent : colors.primary}`,
                bgcolor: state === 'current' ? colors.background : 'transparent',
                transition: 'border-color 0.3s ease, background-color 0.3s ease',
              }}
            >
              <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 11, letterSpacing: '0.14em', color: state === 'todo' ? colors.muted : colors.accentDark }}>
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '0.85rem', fontWeight: 600, color: state === 'todo' ? colors.muted : colors.base }}>
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ p: { xs: 3, md: 5 } }} aria-live="polite">
        {!done ? (
          <Box key={step} className="gvp-swap">
            <Typography variant="h3" component="h3" sx={{ color: colors.base, mb: 1 }}>
              {questionTitles[step]}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.muted, mb: 3 }}>
              {step === 0 ? 'Choose all that apply.' : 'Choose one.'}
            </Typography>

            <Box
              role={step === 0 ? 'group' : 'radiogroup'}
              aria-label={questionTitles[step]}
              sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' } }}
            >
              {step === 0
                ? Q_ENTRY.map((o) => (
                    <OptionButton key={o.value} multi label={o.label} hint={o.hint} selected={answers.entry.includes(o.value)} onClick={() => toggleEntry(o.value)} />
                  ))
                : null}
              {step === 1
                ? Q_SYSTEM.map((o) => (
                    <OptionButton key={o.value} label={o.label} hint={o.hint} selected={answers.system === o.value} onClick={() => setAnswers((a) => ({ ...a, system: o.value }))} />
                  ))
                : null}
              {step === 2
                ? Q_PRIORITY.map((o) => (
                    <OptionButton key={o.value} label={o.label} hint={o.hint} selected={answers.priority === o.value} onClick={() => setAnswers((a) => ({ ...a, priority: o.value }))} />
                  ))
                : null}
              {step === 3
                ? Q_TIMELINE.map((o) => (
                    <OptionButton key={o.value} label={o.label} hint={o.hint} selected={answers.timeline === o.value} onClick={() => setAnswers((a) => ({ ...a, timeline: o.value }))} />
                  ))
                : null}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
              <Button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                startIcon={<ArrowBackRoundedIcon />}
                sx={{ color: colors.muted, visibility: step === 0 ? 'hidden' : 'visible' }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" size="large" disabled={!canNext} onClick={() => setStep((s) => s + 1)} endIcon={<ArrowForwardRoundedIcon />}>
                {step === STEPS.length - 1 ? 'See my summary' : 'Next'}
              </Button>
            </Box>
          </Box>
        ) : (
          <Result answers={answers} onRestart={restart} />
        )}
      </Box>
    </Box>
  );
}

function Result({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const priority = answers.priority ?? 'security';
  const modules = [...PRIORITY_MODULES[priority], SYSTEM_MODULE[answers.system ?? 'manual']];
  const interest = INTEREST[priority];

  return (
    <Box className="gvp-swap">
      <Typography variant="overline" component="p" sx={{ color: colors.accentDark }}>
        A possible starting point
      </Typography>
      <Typography variant="h3" component="h3" sx={{ color: colors.base, mt: 1 }}>
        {HEADLINES[priority]}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: { xs: 3, md: 5 }, mt: 4 }}>
        <Box>
          <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.14em', color: colors.accentDark, mb: 1.5 }}>
            WHERE WE WOULD START
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1.25 }}>
            {modules.map((m) => (
              <Box component="li" key={m} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <CheckRoundedIcon sx={{ color: colors.status.cleared, fontSize: 20, mt: '3px' }} />
                <Typography variant="body1" sx={{ color: colors.text }}>
                  {m}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body1" sx={{ mt: 2.5, color: colors.text }}>
            <strong>Delivery:</strong> {startingPoint(answers.entry)}
          </Typography>
        </Box>

        <Box sx={{ p: 3, bgcolor: colors.base, color: colors.onDark, borderRadius: '4px', alignSelf: 'start' }}>
          <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.14em', color: colors.accentLight }}>
            FINANCING
          </Typography>
          <Typography sx={{ fontFamily: fontStacks.heading, fontSize: '2.2rem', lineHeight: 1.1, color: '#fff' }}>Financed by GVP</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'rgb(var(--gvp-on-dark) / 0.8)' }}>
            Repaid from published traveller fees, shared openly with Government. Government keeps control of policy and data.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: 'rgb(var(--gvp-on-dark) / 0.8)' }}>
            {TIMELINE_NOTE[answers.timeline ?? 'exploring']}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4, alignItems: 'center' }}>
        <ButtonLink href={contactHref(interest, 'Tailored briefing from the fit check')} variant="contained" color="secondary" size="large" endIcon={<ArrowForwardRoundedIcon />}>
          Request a Government Briefing
        </ButtonLink>
        <Button onClick={onRestart} startIcon={<ReplayRoundedIcon />} sx={{ color: colors.muted }}>
          Start again
        </Button>
      </Box>
    </Box>
  );
}
