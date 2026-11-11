import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/ui/LegalPage';

export const metadata: Metadata = { title: 'Terms of Use', robots: { index: false } };

const sections: LegalSection[] = [
  {
    heading: 'About this website',
    body: ['This website provides general information about GVP and its services for government audiences.'],
  },
  {
    heading: 'No offer or commitment',
    body: [
      'Content on this website, including any illustrative figures, is for information only. It does not form an offer, a contract or a commitment. Programme terms are agreed only in a signed agreement with the relevant Government.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: ['The GVP name, logo and website content belong to [registered company name] and may not be reused without permission.'],
  },
  {
    heading: 'Governing law',
    body: ['These terms are governed by the laws of [jurisdiction].'],
  },
];

export default function TermsPage() {
  return <LegalPage overline="Legal" title="Terms of Use" sections={sections} />;
}
