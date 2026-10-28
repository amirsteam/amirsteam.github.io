export const personalInfo = {
  name: 'Amir Bahadur Shrestha',
  title: 'MERN Stack Developer & Digital Solutions Educator',
  tagline: 'Building Scalable Systems, Teaching Developers, Delivering Complete Digital Solutions',
  email: 'amirsvi766@gmail.com',
  phone: '+977 9861158271',
  location: {
    city: 'Panauti',
    district: 'Kavre',
    province: 'Bagmati',
    country: 'Nepal'
  },
  availability: 'Remote & Worldwide',
  primaryGoals: ['Freelancing', 'Teaching Authority', 'Job Opportunities'],
  social: {
    github: 'https://github.com/amirsteam',
    linkedin: 'https://linkedin.com/in/amirsteam',
    twitter: 'https://twitter.com/amirsteam',
    youtube: 'https://youtube.com/@amirsteam'
  },
  bio: `I am a passionate MERN Stack Developer with extensive experience in building scalable, production-ready web applications. My expertise spans across the entire JavaScript ecosystem, from crafting intuitive React frontends to architecting robust Node.js backends with MongoDB databases.

Beyond development, I am deeply committed to education and mentorship. I have helped dozens of aspiring developers master modern web development through hands-on, project-based learning. I also provide institutional consulting, helping schools and campuses embrace digital transformation with custom solutions and Google Workspace implementations.

What sets me apart is my unique combination of technical engineering skills and creative design capabilities. With proficiency in Adobe Creative Suite, I bring motion design and visual storytelling to my web projects, creating experiences that are not just functional but visually compelling.

I believe in building real products, not just demos. Every project I undertake is treated as a business asset, designed to convert visitors into clients and establish technical authority.`
}

export const skills = {
  mernEngineering: {
    title: 'MERN Engineering',
    icon: 'Code2',
    color: 'from-blue-500 to-cyan-500',
    description: 'Full-stack JavaScript development with modern best practices',
    items: [
      { name: 'Full MERN Architecture', level: 95 },
      { name: 'Secure Authentication (JWT)', level: 92 },
      { name: 'Admin Dashboards', level: 90 },
      { name: 'CMS Systems', level: 88 },
      { name: 'REST APIs', level: 95 },
      { name: 'MongoDB Schema Design', level: 90 },
      { name: 'Scalable Folder Structure', level: 88 },
      { name: 'Deployment (Vercel, DigitalOcean, Atlas)', level: 85 }
    ]
  },
  uiUxAnimation: {
    title: 'UI/UX & Animation',
    icon: 'Palette',
    color: 'from-purple-500 to-pink-500',
    description: 'Beautiful, responsive, and accessible user interfaces',
    items: [
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Material UI (MUI)', level: 90 },
      { name: 'Framer Motion', level: 88 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Accessibility (a11y)', level: 85 },
      { name: 'Micro-interactions', level: 88 }
    ]
  },
  graphicsMotion: {
    title: 'Graphics & Motion Design',
    icon: 'Film',
    color: 'from-orange-500 to-red-500',
    description: 'Creative visual solutions that captivate audiences',
    items: [
      { name: 'Adobe Photoshop', level: 90 },
      { name: 'Adobe Illustrator', level: 85 },
      { name: 'Adobe Premiere Pro', level: 88 },
      { name: 'Adobe After Effects', level: 85 },
      { name: 'Motion Graphics', level: 82 },
      { name: 'Video Editing', level: 88 }
    ]
  },
  educatorConsultant: {
    title: 'Educator & Consultant',
    icon: 'GraduationCap',
    color: 'from-green-500 to-emerald-500',
    description: 'Empowering developers and institutions with knowledge',
    items: [
      { name: 'MERN Teaching & Mentorship', level: 92 },
      { name: 'Project-based Learning', level: 95 },
      { name: 'Institutional Digital Consulting', level: 88 },
      { name: 'School & Campus IT Guidance', level: 85 },
      { name: 'Google Workspace Onboarding', level: 90 },
      { name: 'Technical Documentation', level: 88 }
    ]
  }
}

export const projects = [
  {
    id: 1,
    title: 'Nevan Handicraft Store',
    slug: 'nevan-handicraft',
    category: 'Full Stack',
    description: 'Live online store for a Nepali handmade baby-clothing brand: web storefront, admin panel and a mobile app.',
    problem: 'A small handmade brand needed to sell online in Nepal, with local payment methods and a way to talk to customers.',
    solution: 'Express 5 + MongoDB API with eSewa, Khalti and cash-on-delivery payments, live chat over Socket.IO, push notifications, and tests for payments and stock.',
    techStack: ['React 19', 'TypeScript', 'Express', 'MongoDB', 'React Native', 'Socket.IO'],
    thumbnail: '/projects/nevan-handicraft.webp',
    liveUrl: 'https://nevanhandicraft.com.np',
    githubUrl: 'https://github.com/amirsteam/nevan',
    featured: true
  },
  {
    id: 2,
    title: 'Learning MERN with Amir',
    slug: 'mern-academy',
    category: 'Full Stack',
    description: 'My paid course platform where students learn the MERN stack through modules, lessons and real projects.',
    problem: 'Students in Nepal needed a structured MERN course they could pay for with local methods.',
    solution: 'Course → module → lesson structure with video lessons, free preview lessons, and QR payments that an admin approves before access unlocks.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Express', 'MongoDB'],
    thumbnail: '/projects/mern-academy.webp',
    liveUrl: 'https://amirs.codes',
    githubUrl: '',
    featured: true
  },
  {
    id: 3,
    title: 'Academic Workload Platform',
    slug: 'academic-workload',
    category: 'Full Stack',
    description: 'Hackathon project that helps schools spread homework across subjects so students are not overloaded.',
    problem: 'Teachers set homework separately, so students often get several big assignments due on the same day.',
    solution: 'A workload engine adds up homework time per class per day and blocks teachers past a 240-minute limit, with dashboards for admins, teachers and students.',
    techStack: ['React', 'Tailwind CSS', 'Express', 'MongoDB', 'JWT'],
    thumbnail: '/projects/academic-workload.webp',
    liveUrl: 'https://hackathon2082.vercel.app',
    githubUrl: 'https://github.com/amirsteam/hackathon2082',
    featured: true
  },
  {
    id: 4,
    title: 'HamroNepal News Portal',
    slug: 'hamronepal',
    category: 'Full Stack',
    description: 'Nepali-language news portal with a public website, a mobile app and an admin dashboard.',
    problem: 'Nepali readers expect Nepali text and Bikram Sambat dates, which most news templates do not handle.',
    solution: 'TypeScript web and React Native apps on Appwrite Cloud, with admin/editor/reporter roles and BS/AD date conversion in Nepali digits.',
    techStack: ['React', 'React Native', 'TypeScript', 'Appwrite', 'Tailwind CSS'],
    thumbnail: '',
    liveUrl: '',
    githubUrl: 'https://github.com/amirsteam/HamroNepal',
    featured: false
  },
  {
    id: 5,
    title: 'Cinema Booking API',
    slug: 'cinema-booking-api',
    category: 'Backend',
    description: 'Backend API for a Nepali cinema ticket booking platform.',
    problem: 'Booking systems get hard to change when database code, business rules and routes are mixed together.',
    solution: 'Express + MongoDB API split into repositories, services and controllers, with Joi validation, Helmet, CORS and rate limiting.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Joi'],
    thumbnail: '',
    liveUrl: '',
    githubUrl: 'https://github.com/amirsteam/movieticke',
    featured: false
  }
]

export const services = [
  {
    id: 1,
    title: 'School / Campus Digital Solution',
    icon: 'School',
    description: 'Complete digital transformation for educational institutions',
    features: [
      'School/Campus website development',
      'Google Workspace enrollment & configuration',
      'Official email setup',
      'Training & handover support',
      'Ongoing maintenance options'
    ],
    price: 'Rs. 25,000',
    priceNote: 'Starting from',
    popular: false
  },
  {
    id: 2,
    title: 'MERN E-Commerce Platform',
    icon: 'ShoppingCart',
    description: 'Full-featured online store with powerful admin tools',
    features: [
      'Full MERN stack application',
      'Admin dashboard',
      'Product & order management',
      'Authentication & security',
      'Scalable backend architecture',
      'Payment integration ready'
    ],
    price: 'Rs. 50,000',
    priceNote: 'Starting from',
    popular: true
  },
  {
    id: 3,
    title: 'News Portal System',
    icon: 'Newspaper',
    description: 'Professional news publishing platform with SEO focus',
    features: [
      'CMS-based MERN system',
      'Role-based admin dashboard',
      'News publishing workflow',
      'SEO optimization',
      'Performance optimization',
      'Social media integration'
    ],
    price: 'Rs. 60,000',
    priceNote: 'Starting from',
    popular: false
  }
]

export const experience = [
  {
    id: 1,
    title: 'Freelance MERN Stack Developer',
    company: 'Self-employed',
    location: 'Remote',
    period: '2022 - Present',
    description: 'Building production-grade web applications for clients worldwide. Specializing in e-commerce platforms, content management systems, and educational portals.',
    achievements: [
      'Delivered 20+ successful projects for international clients',
      'Maintained 100% client satisfaction rate',
      'Specialized in scalable MERN architecture'
    ]
  },
  {
    id: 2,
    title: 'Web Development Instructor',
    company: 'Local Tech Institute',
    location: 'Panauti, Nepal',
    period: '2021 - Present',
    description: 'Teaching modern web development to aspiring developers. Creating project-based curriculum focused on real-world skills and industry best practices.',
    achievements: [
      'Trained 100+ students in MERN stack development',
      'Developed comprehensive curriculum for full-stack development',
      'Mentored students who secured jobs at tech companies'
    ]
  },
  {
    id: 3,
    title: 'IT Consultant',
    company: 'Various Schools & Institutions',
    location: 'Kavre District, Nepal',
    period: '2020 - Present',
    description: 'Providing digital transformation consulting to educational institutions. Implementing Google Workspace solutions and custom web applications.',
    achievements: [
      'Digitized operations for 10+ schools',
      'Implemented Google Workspace for 5000+ users',
      'Developed custom management systems'
    ]
  }
]

export const education = [
  {
    id: 1,
    degree: 'MPhil in STEAM Education (Running)',
    institution: 'Kathmandu University',
    location: 'Dhulikhel, Nepal',
    period: '2019 - 2025 (Expected)',
    description: 'Focused on software engineering, database systems, and web technologies.'
  },
  {
    id: 2,
    degree: 'Self-taught MERN Stack Development',
    institution: 'Online Learning & Practice',
    location: 'Remote',
    period: '2020 - 2025',
    description: 'Intensive self-study through Udemy, freeCodeCamp, and real project experience.'
  }
]

export const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'Principal',
    company: 'Janahit Higher Secondary School',
    content: 'Amir transformed our school\'s digital presence completely. The website he built is not only beautiful but also easy for our staff to manage. His Google Workspace implementation was seamless.',
    avatar: '/testimonials/rajesh.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Anjana Shrestha',
    role: 'Founder',
    company: 'Nevan Handicraft',
    content: 'The e-commerce platform Amir built for our business has increased our online sales by 300%. His attention to detail and understanding of our needs was exceptional.',
    avatar: '/testimonials/sita.jpg',
    rating: 5
  },
  {
    id: 3,
    name: 'Bikash Tamang',
    role: 'Junior Developer',
    company: 'Tech Startup Nepal',
    content: 'Learning MERN stack from Amir was a game-changer for my career. His project-based teaching approach helped me understand not just the how, but the why behind everything.',
    avatar: '/testimonials/bikash.jpg',
    rating: 5
  },
  {
    id: 4,
    name: 'Maria Santos',
    role: 'Startup Founder',
    company: 'Digital Agency Philippines',
    content: 'Working with Amir remotely was a fantastic experience. He delivered our admin dashboard ahead of schedule with excellent documentation. Highly recommended!',
    avatar: '/testimonials/maria.jpg',
    rating: 5
  }
]

export const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable MERN Applications: Architecture Best Practices',
    slug: 'building-scalable-mern-applications',
    excerpt: 'Learn how to structure your MERN stack projects for maintainability and scale, from folder organization to database design.',
    content: '',
    category: 'Development',
    tags: ['MERN', 'Architecture', 'Best Practices'],
    thumbnail: '/blog/mern-architecture.jpg',
    publishedAt: '2024-01-15',
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'JWT Authentication Done Right: Security Best Practices',
    slug: 'jwt-authentication-best-practices',
    excerpt: 'A comprehensive guide to implementing secure JWT authentication in your Node.js applications.',
    content: '',
    category: 'Security',
    tags: ['JWT', 'Authentication', 'Security'],
    thumbnail: '/blog/jwt-security.jpg',
    publishedAt: '2024-01-10',
    readTime: '6 min read'
  },
  {
    id: 3,
    title: 'Framer Motion: Creating Professional Animations in React',
    slug: 'framer-motion-react-animations',
    excerpt: 'Master the art of creating smooth, professional animations in your React applications using Framer Motion.',
    content: '',
    category: 'Frontend',
    tags: ['React', 'Animation', 'Framer Motion'],
    thumbnail: '/blog/framer-motion.jpg',
    publishedAt: '2024-01-05',
    readTime: '10 min read'
  }
]

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Skills', path: '/#skills' },
  { name: 'Projects', path: '/#projects' },
  { name: 'Services', path: '/#services' },
  // Blog is hidden until there are real posts; add { name: 'Blog', path: '/blog' } back then
  { name: 'Contact', path: '/contact' }
]
