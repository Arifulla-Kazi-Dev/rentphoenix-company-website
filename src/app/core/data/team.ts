// Everyone who has been part of RentPhoenix, current and former, shown on /team.
// Add a member here and the badges, filters, structure chart and counts all pick them up.

export type TeamGroup = 'leadership' | 'team';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  group: TeamGroup;
  /** Badge accent: 'ember' for the founder, 'ink' for directors, 'stone' for the team. */
  tone: 'ember' | 'ink' | 'stone';
  /** Shown on the badge, e.g. "Since Dec 2025" or "24 Aug – 29 Oct 2026". */
  period: string;
  /** True once someone has finished their time with us; they stay listed as alumni. */
  former?: boolean;
  /** Official reference number, when the company has issued one. */
  badgeId?: string;
  /** Path in /public, e.g. 'team/arifulla.webp'. Initials are shown until one is added. */
  photo?: string;
  summary: string;
  /** Back of the badge: what they do or contributed. */
  highlights: string[];
  facts?: { label: string; value: string }[];
  link?: { label: string; href: string };
}

export const TEAM: TeamMember[] = [
  {
    id: 'arifulla-kazi',
    name: 'Arifulla Kazi',
    initials: 'AK',
    role: 'Founder, Director & Developer',
    group: 'leadership',
    tone: 'ember',
    period: 'Since Dec 2025',
    summary: 'Founded RentPhoenix Technologies and builds its products — from first architecture sketch to production.',
    highlights: [
      'Company direction and product strategy',
      'Designs and builds RentPhoenix OS and CO-Founder',
      'Leads client and government software projects',
    ],
    facts: [
      { label: 'Education', value: 'BE, Electronics & Communication — Agnel Institute of Technology & Design, Goa' },
      { label: 'Previously', value: 'Network Engineer, United Telecoms Limited' },
    ],
    link: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arifulla-kazi-b73743243' },
  },
  {
    id: 'ragina-kazi',
    name: 'Ragina Kazi',
    initials: 'RK',
    role: 'Director',
    group: 'leadership',
    tone: 'ink',
    period: 'Since Dec 2025',
    summary: 'Serves on the board of RentPhoenix Technologies Private Limited.',
    highlights: [
      'Director on the company board',
    ],
  },
  {
    id: 'samiksha-raul',
    name: 'Samiksha Raul',
    initials: 'SR',
    role: 'Quality Assurance (QA) Intern',
    group: 'team',
    tone: 'stone',
    period: '24 Aug – 29 Oct 2026',
    former: true,
    badgeId: 'RPTPL/INT/2026/001',
    summary: 'Tested RentPhoenix OS end to end and turned what she found into clearer, better product.',
    highlights: [
      'Tested landlord and tenant workflows, found and reported bugs',
      'Shared feedback on features and user journeys',
      'Validated usability through iterative testing',
      'Fed findings back into product refinements',
    ],
  },
];
