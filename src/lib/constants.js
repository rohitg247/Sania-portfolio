export const PROFILE = {
  name: 'Sania Ansari',
  role: 'Digital Marketing Manager',
  tagline: 'Digital Marketing & Graphic Designer',
  location: 'Mumbai, India — 400074',
  email: 'saniaansari04@gmail.com',
  phone: '+91 7045351403',
  phoneHref: '+917045351403',
  resume: '/Sania_Ansari_Resume.pdf',
};

export const ROTATING_ROLES = [
  'Digital Marketing Manager',
  'Graphic Designer',
  'Brand Storyteller',
];

// Metrics kept on the site per user decision — the current resume PDF does not state them.
export const STATS = [
  { value: 5, suffix: '+', label: 'Years experience' },
  { value: 100, suffix: '+', label: 'Leads / month' },
  { value: 25, prefix: '~', suffix: '%', label: 'CPL reduction' },
  { value: 1.5, prefix: '₹', suffix: 'L/mo', label: 'Budget managed', decimals: 1 },
];

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const ABOUT_BIO = [
  'Digital Marketing Manager with 5+ years’ experience driving lead generation for real estate and consumer brands. I run Google Ads and Meta campaigns, hyper-local SEO and CRM-tracked nurture funnels across multiple property projects, managing budgets to a low cost per lead.',
  'A graphic design background means ad creative is briefed, reviewed and approved in-house — keeping campaigns fast and on-brand.',
];

export const LANGUAGES = [
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Fluent' },
  { name: 'Urdu', level: 'Proficient' },
  { name: 'Marathi', level: 'Conversational' },
];

// `icon` maps to /public/icons/<icon>.png — see CLAUDE.md for how these were generated.
export const SKILL_GROUPS = [
  {
    title: 'Marketing',
    skills: [
      { name: 'Google Ads', icon: 'google-ads' },
      { name: 'Meta Ads', icon: 'meta-ads' },
      { name: 'SEO', icon: 'seo' },
      { name: 'CRM', icon: 'crm' },
      { name: 'Email Automation', icon: 'email-automation' },
      { name: 'Lead Generation', icon: 'lead-generation' },
    ],
  },
  {
    title: 'Design Tools',
    skills: [
      { name: 'Illustrator', icon: 'illustrator' },
      { name: 'Photoshop', icon: 'photoshop' },
      { name: 'Premiere Pro', icon: 'premiere-pro' },
      { name: 'CorelDRAW', icon: 'coreldraw' },
      { name: 'Canva', icon: 'canva' },
      { name: 'Meta Business Suite', icon: 'meta-business-suite' },
    ],
  },
];

export const EXPERIENCE = [
  {
    company: 'Gaj Infra',
    location: 'Navi Mumbai',
    title: 'Digital Marketing Manager',
    period: 'Apr 2024 – Present',
    points: [
      'Lead digital marketing across the company’s real estate portfolio, owning lead-generation strategy, project launch campaigns and online brand presence.',
      'Design and execute high-ROI paid campaigns on Google Ads and Meta targeting property buyers, investors and high-net-worth individuals — generating 100+ qualified enquiries per month.',
      'Manage a digital budget of approx. ₹1.5 lakh/month across multiple active projects, reducing cost per lead by around 25% through continuous audience and creative testing.',
    ],
  },
  {
    company: 'Arena Animation',
    location: 'Mumbai',
    title: 'Social Media Executive & Academic Counsellor',
    period: 'Nov 2022 – Dec 2023',
    points: [
      'Managed the institute’s social media presence, planning and posting content that drove student engagement and course enquiries.',
      'Ran promotional campaigns for courses and seminars, feeding enquiries directly into the admissions pipeline.',
      'Counselled prospective students and converted enquiries into enrolments; served as Academic Head with a focus on student placement.',
    ],
  },
  {
    company: 'Majestic Real Estate',
    location: 'Mumbai',
    title: 'Digital Marketing Executive',
    period: 'Aug 2021 – Sept 2022',
    points: [
      'Implemented digital marketing strategies to promote property listings across social media, handling inbound enquiries and passing qualified leads to sales.',
      'Produced and published 12–15 social posts per month, plus short-form video and advertising content.',
      'Designed branding materials, logos and marketing collateral using Illustrator, Photoshop, Premiere Pro, Canva and CorelDRAW.',
    ],
  },
  {
    company: 'Freelance',
    location: 'Mumbai',
    title: 'Digital Marketing & Design',
    period: '2020 – Aug 2021',
    points: [
      'Delivered social media content, digital advertising creatives, banners and short-form video for small business clients.',
      'Planned content calendars end to end.',
    ],
  },
];

// H.S.C./S.S.C. dropped per user decision — only the two relevant credentials shown.
export const EDUCATION = [
  {
    year: '2022',
    degree: 'Diploma in Digital Advertising, Design & Marketing',
    institution: 'Arena Animation, Mumbai, India',
  },
  {
    year: '2020',
    degree: 'Bachelor of Mass Media',
    institution: 'V.E.S. College of Arts, Science & Commerce, Mumbai',
    note: 'Grade “A”',
  },
];

// Placeholder hrefs — replace with real profile URLs before launch.
export const SOCIALS = [
  { label: 'LinkedIn', icon: 'linkedin', href: '#' },
  { label: 'Instagram', icon: 'instagram', href: '#' },
];
