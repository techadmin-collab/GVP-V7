/**
 * Site-wide configuration: navigation, contact details and enquiry options.
 * Values in [square brackets] are placeholders from the content draft and
 * must be confirmed before publishing.
 */

export const siteConfig = {
  name: 'GVP',
  /** Short line shown with the GVP name (drawer, emails, page titles) */
  nameLine: 'Border Management Partners',
  tagline: 'Secure borders. Open books.',
  /** Full lockup: GVP | Border Management Partners. Secure borders. Open books. */
  fallbackTagline: 'Borders built on trust.',
  description:
    'GVP finances, builds and operates intelligent border management systems through a build-operate-transfer partnership. We recover our investment only through published, user-funded fees. Government retains control and receives a transparent revenue share.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  contact: {
    address: '[Address]',
    phone: '[Phone]',
    email: '[Email]',
    linkedin: '[LinkedIn]',
  },
};

/**
 * Home-page-only preview mode (for showing the home page UI to the team).
 * When on, every link and button stays clickable but doesn't navigate.
 * Off by default; turn it on with NEXT_PUBLIC_HOME_ONLY="true" in .env.
 */
export const HOME_ONLY = process.env.NEXT_PUBLIC_HOME_ONLY === 'true';

/**
 * Pages that are still mostly placeholders (Team, Experience). They are left
 * out of every menu and return "not found" until their content is confirmed.
 * Preview them with NEXT_PUBLIC_SHOW_DRAFT_PAGES="true" in .env.
 */
export const SHOW_DRAFT_PAGES = process.env.NEXT_PUBLIC_SHOW_DRAFT_PAGES === 'true';
export const DRAFT_PAGES = ['/team', '/track-record'];

/** True for unconfirmed "[placeholder]" values, which are hidden on the site. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || /^\s*\[[^\]]*\]\s*$/.test(value);
}

/** Contact details that are confirmed (placeholders are left out). */
export function confirmedContact() {
  const c = siteConfig.contact;
  return {
    address: isPlaceholder(c.address) ? null : c.address,
    phone: isPlaceholder(c.phone) ? null : c.phone,
    email: isPlaceholder(c.email) ? null : c.email,
    linkedin: isPlaceholder(c.linkedin) ? null : c.linkedin,
  };
}

function visible<T extends { href: string }>(items: T[]): T[] {
  return items.filter((i) => SHOW_DRAFT_PAGES || !DRAFT_PAGES.includes(i.href));
}

/** Link target to use: '#' in home-only mode, the real path otherwise. */
export function navHref(href: string): string {
  return HOME_ONLY ? '#' : href;
}

export type NavItem = { label: string; href: string; description?: string };

/** Primary navigation (kept short for government readers). */
export const primaryNav: NavItem[] = visible([
  { label: 'About', href: '/about' },
  { label: 'Solution', href: '/solution' },
  { label: 'Partnership Model', href: '/partnership-model' },
  { label: 'Revenue Share', href: '/revenue-share' },
  { label: 'Team', href: '/team' },
]);

/** Secondary pages shown under "More" on desktop and in full on mobile. */
export const moreNav: NavItem[] = visible([
  { label: 'Destination Promotion', href: '/destination-promotion', description: 'The border as a welcome and a marketing channel' },
  { label: 'Security & Governance', href: '/security', description: 'Data sovereignty, security by design, oversight' },
  { label: 'Delivery Approach', href: '/delivery', description: 'From agreement to go-live, and local capacity' },
  { label: 'Experience', href: '/track-record', description: 'Our track record in airports and biometrics' },
  { label: 'FAQs for Government', href: '/faqs', description: 'Straight answers to common questions' },
]);

export const footerNav: NavItem[] = visible([
  { label: 'About', href: '/about' },
  { label: 'Solution', href: '/solution' },
  { label: 'Partnership Model', href: '/partnership-model' },
  { label: 'Revenue Share', href: '/revenue-share' },
  { label: 'Destination Promotion', href: '/destination-promotion' },
  { label: 'Team', href: '/team' },
  { label: 'Security', href: '/security' },
  { label: 'Delivery', href: '/delivery' },
  { label: 'Experience', href: '/track-record' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]);

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

/** Area-of-interest options for the enquiry form. Keys match the Prisma enum. */
export const interestOptions = [
  { value: 'BMS', label: 'Border Management System (BMS)' },
  { value: 'ETA', label: 'Electronic Travel Authorisation (ETA)' },
  { value: 'EGATES', label: 'eGates and automated counters' },
  { value: 'DESTINATION_PROMOTION', label: 'Destination promotion' },
  { value: 'PARTNERSHIP_MODEL', label: 'Full partnership model' },
  { value: 'OTHER', label: 'Something else' },
] as const;

export type InterestValue = (typeof interestOptions)[number]['value'];

export const interestValues = interestOptions.map((o) => o.value) as [InterestValue, ...InterestValue[]];

export function interestLabel(value: string): string {
  return interestOptions.find((o) => o.value === value)?.label ?? value;
}

/**
 * Builds a link to the contact form with the area of interest and an optional
 * topic pre-filled. Used for "Download …" and "Request …" calls to action
 * until the downloadable PDFs are ready.
 */
export function contactHref(interest?: InterestValue, topic?: string): string {
  const params = new URLSearchParams();
  if (interest) params.set('interest', interest);
  if (topic) params.set('topic', topic);
  const q = params.toString();
  return q ? `/contact?${q}` : '/contact';
}
