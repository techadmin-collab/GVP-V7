'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { interestOptions, type InterestValue } from '@/lib/site';
import { enquirySchema, flattenErrors, type FieldErrors } from '@/lib/validation';
import { colors, fontStacks } from '@/theme/tokens';
import { TextLink } from '@/components/ui/links';

type FormState = {
  name: string;
  title: string;
  organisation: string;
  country: string;
  email: string;
  phone: string;
  interest: InterestValue | '';
  message: string;
  consent: boolean;
  website: string; // honeypot
};

type Props = { defaultInterest?: InterestValue; defaultTopic?: string };

export default function ContactForm({ defaultInterest, defaultTopic }: Props) {
  const [values, setValues] = React.useState<FormState>({
    name: '',
    title: '',
    organisation: '',
    country: '',
    email: '',
    phone: '',
    interest: defaultInterest ?? '',
    message: defaultTopic ? `I would like to request: ${defaultTopic}.\n\n` : '',
    consent: false,
    website: '',
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = React.useState('');
  const [reference, setReference] = React.useState<string | null>(null);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = key === 'consent' ? (e.target as HTMLInputElement).checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof FieldErrors]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerMessage('');

    const payload = { ...values, sourcePath: typeof window !== 'undefined' ? window.location.pathname + window.location.search : undefined };
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const fe = flattenErrors(parsed.error);
      setErrors(fe);
      setStatus('error');
      setServerMessage('Please check the highlighted fields.');
      // Move focus to the first invalid field for keyboard and screen-reader users
      const first = Object.keys(fe)[0];
      if (first) document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors; reference?: string | null };
      if (!res.ok || !json.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        setStatus('error');
        setServerMessage(json.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setReference(json.reference ?? null);
      setStatus('success');
    } catch {
      setStatus('error');
      setServerMessage('We could not reach the server. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <Box role="status" aria-live="polite" sx={{ p: { xs: 4, md: 6 }, bgcolor: colors.surface, border: `1px solid ${colors.line}`, borderTop: `3px solid ${colors.status.cleared}`, textAlign: 'center' }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 56, color: colors.status.cleared }} />
        <Typography variant="h3" component="h2" sx={{ mt: 2, color: colors.base }}>
          Thank you. Your enquiry has been received.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: colors.muted, maxWidth: 520, mx: 'auto' }}>
          Our government team will contact you to arrange a confidential briefing tailored to your needs.
        </Typography>
        {reference ? (
          <Typography sx={{ mt: 3, fontFamily: fontStacks.mono, fontSize: 13, letterSpacing: '0.1em', color: colors.accentDark }}>
            REFERENCE · {reference}
          </Typography>
        ) : null}
      </Box>
    );
  }

  const submitting = status === 'submitting';
  const fieldProps = (key: keyof FieldErrors) => ({
    id: `enquiry-${key}`,
    name: key,
    error: Boolean(errors[key]),
    helperText: errors[key] ?? ' ',
    disabled: submitting,
  });

  return (
    <Box component="form" noValidate onSubmit={onSubmit} aria-describedby="enquiry-intro" sx={{ position: 'relative', p: { xs: 3, md: 5 }, bgcolor: colors.surface, border: `1px solid ${colors.line}`, borderRadius: '2px' }}>
      <Typography id="enquiry-intro" variant="body2" sx={{ color: colors.muted, mb: 3 }}>
        All fields are required unless marked optional. Your details are used only to respond to your enquiry.
      </Typography>

      {status === 'error' && serverMessage ? (
        <Alert severity="error" sx={{ mb: 3 }} role="alert">
          {serverMessage}
        </Alert>
      ) : null}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, columnGap: 2.5, rowGap: 0.5 }}>
        <TextField label="Full name" autoComplete="name" value={values.name} onChange={set('name')} required {...fieldProps('name')} />
        <TextField label="Title / position" autoComplete="organization-title" value={values.title} onChange={set('title')} required {...fieldProps('title')} />
        <TextField label="Ministry or agency" autoComplete="organization" value={values.organisation} onChange={set('organisation')} required {...fieldProps('organisation')} />
        <TextField label="Country" autoComplete="country-name" value={values.country} onChange={set('country')} required {...fieldProps('country')} />
        <TextField label="Email" type="email" autoComplete="email" value={values.email} onChange={set('email')} required {...fieldProps('email')} />
        <TextField label="Phone (optional)" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} {...fieldProps('phone')} />
        <TextField
          select
          label="Area of interest"
          value={values.interest}
          onChange={set('interest')}
          required
          {...fieldProps('interest')}
          sx={{ gridColumn: { sm: '1 / -1' } }}
        >
          {interestOptions.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Message"
          multiline
          minRows={5}
          value={values.message}
          onChange={set('message')}
          required
          {...fieldProps('message')}
          sx={{ gridColumn: { sm: '1 / -1' } }}
        />
      </Box>

      {/* Honeypot: hidden from people and assistive technology */}
      <Box aria-hidden="true" sx={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="enquiry-website">Website</label>
        <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </Box>

      <Box sx={{ mt: 1 }}>
        <FormControlLabel
          control={<Checkbox id="enquiry-consent" checked={values.consent} onChange={set('consent')} disabled={submitting} color="primary" />}
          label={
            <Typography variant="body2" sx={{ color: colors.text }}>
              I agree that GVP may use these details to respond to my enquiry, as described in the{' '}
              <TextLink href="/privacy" sx={{ color: colors.primary, fontWeight: 600 }}>
                Privacy Policy
              </TextLink>
              .
            </Typography>
          }
        />
        <FormHelperText error={Boolean(errors.consent)} sx={{ ml: 0 }}>
          {errors.consent ?? ' '}
        </FormHelperText>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={submitting}
        endIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon />}
        sx={{ mt: 2, minWidth: 220 }}
      >
        {submitting ? 'Sending…' : 'Send enquiry'}
      </Button>
    </Box>
  );
}
