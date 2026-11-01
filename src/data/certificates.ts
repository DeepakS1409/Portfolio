export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  category: 'Membership' | 'Hackathon' | 'Competition' | 'Course';
  image: string;
  badge: string;
  issueDate?: string;
  validity?: string;
  credentialId?: string;
  verificationUrl?: string;
  downloadUrl?: string;
  description: string;
  details: {
    label: string;
    value: string;
  }[];
  highlights: string[];
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'igen-student-member',
    title: 'IGEN Student Member',
    organization: 'The Institution of Green Engineers (IGEN)',
    category: 'Membership',
    image: '/certificates/igen-student-member.jpg',
    badge: 'ACTIVE MEMBERSHIP',
    validity: 'October 2027',
    credentialId: 'IGEN/SM26M0606',
    verificationUrl: 'https://www.theigen.org',
    downloadUrl: '/certificates/igen-student-member.jpg',
    description:
      'Official Student Membership Certificate awarded by The Institution of Green Engineers (IGEN). Committed to sustainable technological developments, eco-friendly engineering paradigms, and green innovations.',
    details: [
      { label: 'Membership Type', value: 'IGEN Non-Donor Member' },
      { label: 'Membership ID', value: 'IGEN/SM26M0606' },
      { label: 'G Score', value: '25' },
      { label: 'Validity Period', value: 'Valid thru OCT 2027' },
      { label: 'Official Portal', value: 'www.theigen.org' }
    ],
    highlights: [
      'Active Student Member in The Institution of Green Engineers (IGEN)',
      'Earned G Score of 25 contributing to sustainable green engineering',
      'Non-Donor category certified with verified ID: IGEN/SM26M0606',
      'Official credentials active and valid through October 2027'
    ]
  },
  {
    id: 'boss-hackathon-contributor',
    title: 'BOSS $1000 Contributor Hackathon',
    organization: 'BOSS Console (via Unstop)',
    category: 'Hackathon',
    image: '/certificates/boss-hackathon-contributor.png',
    badge: 'PARTICIPATION & CONTRIBUTION',
    issueDate: '2025 - 2026',
    credentialId: 'BOSS-SECE-DEEPAK',
    downloadUrl: '/certificates/boss-hackathon-contributor.png',
    description:
      'Certificate of Participation awarded to Deepak S from Sri Eshwar College of Engineering (SECE) for active participation and open-source contributions in the global BOSS $1000 Contributor Hackathon organized by BOSS Console.',
    details: [
      { label: 'Organizer', value: 'BOSS Console' },
      { label: 'Platform Partner', value: 'Unstop' },
      { label: 'Recognition', value: 'Certificate of Participation' },
      { label: 'Institution', value: 'Sri Eshwar College of Engineering (SECE)' },
      { label: 'Recipient', value: 'Deepak S (B.Tech IT)' }
    ],
    highlights: [
      'Successfully competed and submitted code in the BOSS $1000 Contributor Hackathon',
      'Represented Sri Eshwar College of Engineering (SECE)',
      'Contributed to real-world developer tools and open-source systems',
      'Verified participation credential backed by BOSS Console and Unstop'
    ]
  },
  {
    id: 'national-agentic-ai-hackathon',
    title: 'National Agentic AI Hackathon 2026',
    organization: 'Ziro.Digital',
    category: 'Competition',
    image: '/certificates/national-agentic-ai-hackathon.png',
    badge: 'NATIONAL QUALIFICATION RANK #132',
    issueDate: '2026',
    downloadUrl: '/certificates/national-agentic-ai-hackathon.png',
    description:
      'National Qualification Certificate recognized by Ziro.Digital (#1 AI Career Intelligence Platform). Secured National Qualification Rank #132 with an Overall Evaluation Score of 116 / 180 as Team TRIFORGE.',
    details: [
      { label: 'National Rank', value: 'Rank #132' },
      { label: 'Evaluation Score', value: '116 / 180' },
      { label: 'Team Name', value: 'TRIFORGE' },
      { label: 'Team Members', value: 'Deepak S IT, Anushuvetha SJ, Shanmugi A' },
      { label: 'Institution', value: 'Sri Eshwar College of Engineering' },
      { label: 'Organizer', value: 'Ziro.Digital (AI Intelligence Platform)' }
    ],
    highlights: [
      'Achieved prestigious National Qualification Rank #132 in Agentic AI Hackathon',
      'Scored 116 / 180 in comprehensive AI model & system evaluation',
      'Collaborated as key developer in Team TRIFORGE representing SECE',
      'Recognized for advanced Agentic AI workflows, prompt architecture, and automation'
    ]
  }
];
