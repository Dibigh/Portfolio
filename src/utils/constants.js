// ─── Constants: Personal Data ─────────────────────────────
export const PERSONAL = {
  name: 'Dibigh Rai',
  roles: ['Full Stack Developer', 'AI/ML Enthusiast', 'React & Python Developer'],
  tagline: 'Building the future, one line at a time.',
  intro:
    'Passionate developer interested in Web Development, Machine Learning, AI technologies, and immersive digital experiences. Dedicated to building efficient software solutions using React, Python, and modern AI technologies.',
  location: 'Lalitpur, Nepal',
  email: 'dibighrai2017@gmail.com',
  phone: '+977-9863322266',
  github: 'https://github.com/Dibigh',
  linkedin: 'https://www.linkedin.com/in/dibigh-rai-870203263'
};

// ─── Skills ───────────────────────────────────────────────
export const SKILLS = {
  Frontend: [
    { name: 'React.js', level: 90, color: '#61DAFB' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E' },
    { name: 'TypeScript', level: 70, color: '#3178C6' },
    { name: 'Tailwind CSS', level: 88, color: '#38BDF8' },
    { name: 'Next.js', level: 65, color: '#FFFFFF' },
  ],
  Backend: [
    { name: 'Node.js', level: 78, color: '#83CD29' },
    { name: 'Express.js', level: 75, color: '#FFFFFF' },
    { name: 'MongoDB', level: 70, color: '#4DB33D' },
    { name: 'SQL', level: 65, color: '#F29111' },
  ],
  'AI / ML': [
    { name: 'Python', level: 85, color: '#3776AB' },
    { name: 'TensorFlow', level: 72, color: '#FF6F00' },
    { name: 'PyTorch', level: 65, color: '#EE4C2C' },
    { name: 'NumPy', level: 80, color: '#013243' },
    { name: 'Pandas', level: 78, color: '#150458' },
    { name: 'CNN', level: 70, color: '#7B61FF' },
  ],
  Other: [
    { name: 'GitHub', level: 88, color: '#ffffff70' },
    { name: 'Flutter', level: 55, color: '#54C5F8' },
    { name: 'C#', level: 60, color: '#9B4F96' },
    { name: 'Unity', level: 55, color: '#FFFFFF' },
    { name: 'Godot', level: 50, color: '#478CBF' },
  ],
};

// Flat list for 3D sphere
export const ALL_SKILLS = Object.values(SKILLS).flat();

// ─── Projects ─────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 1,
    title: 'Sabrasta Web App',
    description:
      'Full-stack web application with React frontend and Express backend featuring SMTP email integration via Nodemailer for seamless form submission handling.',
    tags: ['React', 'Node.js', 'Express', 'Nodemailer'],
    github: 'https://github.com/Dibigh/Sabrasta/tree/main',
    live: null,
    color: '#00D9FF',
    period: '04/2024 – 07/2024',
  },
  {
    id: 2,
    title: 'Plant Disease Classification',
    description:
      'Deep learning image classification system using CNN and ResNet50 architecture to accurately predict plant diseases from leaf images.',
    tags: ['Python', 'TensorFlow', 'CNN', 'ResNet50'],
    github: 'https://github.com/Dibigh/Minor-Project.git',
    live: null,
    color: '#7B61FF',
    period: '11/2024 – 03/2025',
  },
  {
    id: 3,
    title: 'Indoor Navigation for Visually Impaired',
    description:
      'Intelligent indoor navigation assistant using logistic regression for illumination classification, integrating mobile camera and sensor data for accessibility.',
    tags: ['Python', 'Machine Learning', 'Computer Vision'],
    github: 'https://github.com/Dibigh/Major-Project.git',
    live: null,
    color: '#5EE6FF',
    period: '07/2025 – 01/2026',
  },
];

// ─── Experience ────────────────────────────────────────────
export const EXPERIENCE = [
  {
    title: 'React Development',
    period: '2022 – Present',
    icon: '⚛️',
    color: '#61DAFB',
    points: [
      'React Hooks, state management, and component architecture',
      'JavaScript & TypeScript in modern React ecosystem',
      'Node.js and basic backend integration',
    ],
  },
  {
    title: 'Python & AI / ML',
    period: '2023 – Present',
    icon: '🤖',
    color: '#7B61FF',
    points: [
      'TensorFlow and PyTorch for deep learning projects',
      'CNN-based image classification models',
      'NumPy & Pandas for data manipulation',
    ],
  },
  {
    title: 'C# & Game Development',
    period: '2023 – Present',
    icon: '🎮',
    color: '#00D9FF',
    points: [
      'Unity and Godot game engine interfaces',
      'Object-oriented programming concepts',
      'Beginner-level gameplay scripts and mechanics',
    ],
  },
];

// ─── Counters ──────────────────────────────────────────────
export const COUNTERS = [
  { label: 'Projects Built', value: 3, suffix: '+' },
  { label: 'Technologies', value: 20, suffix: '+' },
  { label: 'Years Learning', value: 3, suffix: '+' },
  // { label: 'Cups of Coffee', value: 500, suffix: '+' },
];

// ─── Languages ─────────────────────────────────────────────
export const LANGUAGES = [
  { name: 'Nepali', level: 'Native', pct: 100 },
  { name: 'Hindi', level: 'Professional Working Proficiency', pct: 90 },
  { name: 'English', level: 'Professional Working Proficiency', pct: 80 },
];

// ─── Interests ─────────────────────────────────────────────
export const INTERESTS = [
  { label: 'Football', emoji: '⚽' },
  { label: 'Video Games', emoji: '🎮' },
  { label: 'Listening to Music', emoji: '🎵' },
  { label: 'Science Fiction', emoji: '🚀' },
  { label: 'Animation', emoji: '✨' },
];

// ─── Nav Links ─────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
