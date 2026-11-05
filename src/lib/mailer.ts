import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import { interestLabel, siteConfig } from './site';
import { colors } from '@/theme/tokens';

export type EnquiryEmailData = {
  id: string;
  name: string;
  title: string;
  organisation: string;
  country: string;
  email: string;
  phone?: string | null;
  interest: string;
  message: string;
  sourcePath?: string | null;
  createdAt: Date;
};

let transporter: Transporter | null = null;

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT ?? 587);
  transporter = nodemailer.createTransport({
    host: requiredEnv('SMTP_HOST'),
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: process.env.SMTP_USER ? { user: requiredEnv('SMTP_USER'), pass: requiredEnv('SMTP_PASS') } : undefined,
  });
  return transporter;
}

/** Escape user input before placing it in HTML email bodies. */
function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Strip CR/LF so user input can't inject extra email headers via the subject. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

const brand = {
  ink: colors.base,
  primary: colors.primary,
  parchment: colors.background,
  copper: colors.accent,
  text: colors.text,
  label: colors.accentDark,
  pattern: colors.pattern,
  muted: colors.muted,
};

function layout(title: string, inner: string): string {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:${brand.parchment};font-family:Arial,Helvetica,sans-serif;color:${brand.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.parchment};padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #E3D9D2;">
        <tr><td style="background:${brand.ink};padding:22px 28px;color:#ffffff;">
          <div style="font-family:Georgia,serif;font-size:22px;letter-spacing:0.04em;">GVP</div>
          <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.24em;color:${brand.pattern};margin-top:4px;">GLOBAL VISIT PERMIT</div>
        </td></tr>
        <tr><td style="height:3px;background:${brand.copper};line-height:3px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px;">
          <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:22px;color:${brand.ink};margin:0 0 18px;">${title}</h1>
          ${inner}
        </td></tr>
        <tr><td style="padding:18px 28px;background:${brand.parchment};font-size:12px;color:${brand.muted};">
          GVP · Global Visit Permit · ${esc(siteConfig.url)}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px 8px 0;vertical-align:top;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.label};white-space:nowrap;">${label}</td>
    <td style="padding:8px 0;vertical-align:top;font-size:15px;color:${brand.text};">${value}</td>
  </tr>`;
}

/** Notification to the GVP government team. */
export async function sendEnquiryNotification(e: EnquiryEmailData): Promise<void> {
  const to = requiredEnv('ENQUIRY_TO')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const interest = interestLabel(e.interest);

  const html = layout(
    'New government enquiry',
    `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${row('Name', esc(e.name))}
      ${row('Title', esc(e.title))}
      ${row('Ministry / agency', esc(e.organisation))}
      ${row('Country', esc(e.country))}
      ${row('Email', `<a href="mailto:${esc(e.email)}" style="color:${brand.primary};">${esc(e.email)}</a>`)}
      ${row('Phone', e.phone ? esc(e.phone) : '—')}
      ${row('Interest', esc(interest))}
      ${row('Received', esc(e.createdAt.toUTCString()))}
      ${row('Reference', esc(e.id))}
      ${e.sourcePath ? row('Page', esc(e.sourcePath)) : ''}
    </table>
    <div style="margin-top:20px;padding:16px 18px;background:${brand.parchment};border-left:3px solid ${brand.copper};font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(e.message)}</div>
    <p style="font-size:13px;color:${brand.muted};margin-top:20px;">Reply directly to this email to respond to ${esc(e.name)}.</p>`,
  );

  const text = [
    'New government enquiry',
    '',
    `Name: ${e.name}`,
    `Title: ${e.title}`,
    `Ministry / agency: ${e.organisation}`,
    `Country: ${e.country}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone || '-'}`,
    `Interest: ${interest}`,
    `Received: ${e.createdAt.toUTCString()}`,
    `Reference: ${e.id}`,
    '',
    'Message:',
    e.message,
  ].join('\n');

  await getTransporter().sendMail({
    from: requiredEnv('MAIL_FROM'),
    to,
    replyTo: { name: oneLine(e.name), address: e.email },
    subject: oneLine(`New enquiry: ${e.organisation}, ${e.country} (${interest})`),
    text,
    html,
  });
}

/** Acknowledgement to the person who submitted the form. */
export async function sendEnquiryAcknowledgement(e: EnquiryEmailData): Promise<void> {
  const html = layout(
    'Thank you for your enquiry',
    `<p style="font-size:15px;line-height:1.7;margin:0 0 14px;">Dear ${esc(e.name)},</p>
     <p style="font-size:15px;line-height:1.7;margin:0 0 14px;">Thank you for contacting GVP. We have received your enquiry about <strong>${esc(
       interestLabel(e.interest),
     )}</strong>. A member of our government team will be in touch to arrange a confidential briefing tailored to your needs.</p>
     <p style="font-size:15px;line-height:1.7;margin:0 0 14px;">Your reference is <span style="font-family:'Courier New',monospace;">${esc(e.id)}</span>.</p>
     <p style="font-size:15px;line-height:1.7;margin:0;">Kind regards,<br/>GVP Government Team</p>`,
  );

  const text = `Dear ${e.name},

Thank you for contacting GVP. We have received your enquiry about ${interestLabel(e.interest)}. A member of our government team will be in touch to arrange a confidential briefing tailored to your needs.

Your reference is ${e.id}.

Kind regards,
GVP Government Team`;

  await getTransporter().sendMail({
    from: requiredEnv('MAIL_FROM'),
    to: { name: oneLine(e.name), address: e.email },
    subject: 'Thank you for contacting GVP',
    text,
    html,
  });
}
