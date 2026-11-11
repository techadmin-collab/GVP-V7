import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/ui/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy', robots: { index: false } };

const sections: LegalSection[] = [
  {
    heading: 'Who we are',
    body: ['This website is operated by GVP, [registered company name and address].'],
  },
  {
    heading: 'What we collect',
    body: [
      'When you submit an enquiry we collect your name, title, ministry or agency, country, email address, optional phone number, area of interest and message.',
      'We also record technical information needed to protect the form from abuse, such as your IP address and browser type.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'We use your details only to respond to your enquiry and arrange any briefing you request. We do not sell your information or use it for unrelated marketing.',
    ],
  },
  {
    heading: 'Where it is stored and for how long',
    body: ['Enquiries are stored securely in [hosting location] and retained for [retention period], after which they are deleted.'],
  },
  {
    heading: 'Your rights',
    body: ['You can ask to see, correct or delete the information we hold about you by contacting [privacy contact email].'],
  },
];

export default function PrivacyPage() {
  return <LegalPage overline="Legal" title="Privacy Policy" sections={sections} />;
}
