import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  docker,
  postgresql,
  rubyrails,
  graphql,
  komikult,
  leaderboard,
  math,
  movie,
  nyeusi,
  space,
  shopify,
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Frontend Developer',
    icon: frontend,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'UI/UX Design',
    icon: ux,
  },
  {
    title: 'Software Prototyping',
    icon: prototyping,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'Rails',
    icon: rubyrails,
  },
  {
    name: 'graphql',
    icon: graphql,
  },
  {
    name: 'postgresql',
    icon: postgresql,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const experiences = [
  {
    title: 'Software Developer',
    company_name: 'Kosqu Technolab',
    iconBg: '#333333',
    date: 'Feb 2024 - Apr 2025',
  },
  {
    title: 'Web Developer Intern',
    company_name: 'Nancens Enterprises',
    icon: shopify,
    iconBg: '#333333',
    date: 'July 2022 - Jan 2023',
  },
];

const projects = [
  {
    id: 'project-1',
    name: 'FlawLess-Bricks',
    description: 'Real Estate Management System: Simplifying property management and enhancing communication in the real estate industry.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'chakra-ui',
        color: 'pink-text-gradient',
      },
    ],
    image: komikult,
    repo: 'https://github.com/rohitg247/FlawLess-Bricks',
    demo: 'https://flaw-less-bricks.vercel.app/',
  },
  {
    id: 'project-2',
    name: 'Pokemon-Studio',
    description: 'A one-page application enabling users to view a list of Pokémon, including their types, classifications, and evolution.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'graphql',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: leaderboard,
    repo: 'https://github.com/rohitg247/Pokemon-Studio',
    demo: 'https://pokemon-go-lyart.vercel.app/',
  },
  {
    id: 'project-3',
    name: 'Math Magicians',
    description: 'This is a single-page calculator app built with React',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: math,
    repo: 'https://github.com/shaqdeff/Math-Magicians',
    demo: 'https://inspiring-medovik-37d3b3.netlify.app/',
  },
  {
    id: 'project-4',
    name: 'React-Portfolio',
    description: `Introducing a full-stack portfolio using React, SCSS, and Sanity. It features interactive UIs,
                  stylish customization with SCSS, and efficient content management through Sanity.`,
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'sanity',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: movie,
    repo: 'https://github.com/rohitg247/Portfolio',
    demo: 'https://portfolio-rohitg247.vercel.app/',
  },
  {
    id: 'project-5',
    name: 'Login-Auth-Application',
    description: 'This is a login website for Authenticated using Firebase.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'firebase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: nyeusi,
    repo: 'https://github.com/rohitg247/Login-Auth-Application',
    demo: 'https://login-auth-application.vercel.app/',
  },
];

export { services, technologies, experiences, projects };
