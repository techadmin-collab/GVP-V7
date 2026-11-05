import { NextResponse, type NextRequest } from 'next/server';
import type { Enquiry } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { enquirySchema, flattenErrors } from '@/lib/validation';
import { rateLimit } from '@/lib/rateLimit';
import { sendEnquiryAcknowledgement, sendEnquiryNotification } from '@/lib/mailer';

// Prisma and Nodemailer need the Node.js runtime (not Edge)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

/**
 * POST /api/enquiries
 * Validates the enquiry, stores it in MongoDB, then emails the GVP team
 * (and optionally the sender). The enquiry is always saved first, so a
 * temporary SMTP problem never loses a government enquiry.
 */
export async function POST(req: NextRequest) {
  // Only accept JSON from our own pages
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ ok: false, error: 'Unsupported content type' }, { status: 415 });
  }

  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  if (origin && host) {
    let originHost = '';
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = '';
    }
    if (originHost !== host) {
      return NextResponse.json({ ok: false, error: 'Invalid origin' }, { status: 403 });
    }
  }

  const ip = clientIp(req);
  const limited = rateLimit(`enquiry:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many enquiries from this connection. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', fieldErrors: flattenErrors(parsed.error) }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot filled in: pretend success so bots learn nothing
  if (data.website) {
    return NextResponse.json({ ok: true, reference: null });
  }

  let enquiry: Enquiry;
  try {
    enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        title: data.title,
        organisation: data.organisation,
        country: data.country,
        email: data.email,
        phone: data.phone || null,
        interest: data.interest,
        message: data.message,
        consent: data.consent,
        ipAddress: ip,
        userAgent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
        sourcePath: data.sourcePath ?? null,
      },
    });
  } catch (err) {
    console.error('[enquiries] Failed to save enquiry', err);
    return NextResponse.json(
      { ok: false, error: 'We could not submit your enquiry right now. Please try again, or email us directly.' },
      { status: 500 },
    );
  }

  // Email delivery (failure is recorded but doesn't fail the request)
  try {
    await sendEnquiryNotification(enquiry);
    if (process.env.SEND_ACKNOWLEDGEMENT !== 'false') {
      try {
        await sendEnquiryAcknowledgement(enquiry);
      } catch (ackErr) {
        console.warn('[enquiries] Acknowledgement email failed', ackErr);
      }
    }
    await prisma.enquiry.update({ where: { id: enquiry.id }, data: { emailStatus: 'SENT', notifiedAt: new Date() } });
  } catch (mailErr) {
    console.error('[enquiries] Notification email failed', mailErr);
    await prisma.enquiry
      .update({
        where: { id: enquiry.id },
        data: { emailStatus: 'FAILED', emailError: String(mailErr instanceof Error ? mailErr.message : mailErr).slice(0, 500) },
      })
      .catch(() => undefined);
  }

  return NextResponse.json({ ok: true, reference: enquiry.id }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
