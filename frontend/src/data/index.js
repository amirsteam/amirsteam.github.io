export const personalInfo = {
  name: 'Amir Bahadur Shrestha',
  title: 'MERN Stack Developer & Digital Solutions Educator',
  tagline: 'Building Scalable Systems, Teaching Developers, Delivering Complete Digital Solutions',
  email: 'amir@amirlearner.me',
  phone: '+977 9800000000',
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
    title: 'News Portal System',
    slug: 'news-portal',
    category: 'Full Stack',
    description: 'A comprehensive news publishing platform with real-time updates, role-based access control, and SEO optimization.',
    problem: 'Traditional news websites lack modern CMS capabilities, real-time updates, and proper SEO optimization, making content management cumbersome and limiting reach.',
    solution: 'Built a complete MERN stack news portal with a powerful admin dashboard, role-based publishing workflow, automated SEO, and optimized performance for high traffic.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Tailwind CSS'],
    thumbnail: '/projects/news-portal.jpg',
    videoPreview: '/projects/news-portal-preview.mp4',
    liveUrl: 'https://news-portal-demo.vercel.app',
    githubUrl: 'https://github.com/amirsteam/news-portal',
    featured: true
  },
  {
    id: 2,
    title: 'MERN E-Commerce Platform',
    slug: 'mern-ecommerce',
    category: 'Full Stack',
    description: 'Full-featured e-commerce solution with secure payments, inventory management, and admin analytics.',
    problem: 'Small businesses struggle with expensive e-commerce platforms that lack customization and have high transaction fees.',
    solution: 'Developed a customizable MERN e-commerce platform with integrated payment processing, real-time inventory tracking, and comprehensive admin analytics.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redux Toolkit'],
    thumbnail: '/projects/ecommerce.jpg',
    videoPreview: '/projects/ecommerce-preview.mp4',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/amirsteam/mern-ecommerce',
    featured: true
  },
  {
    id: 3,
    title: 'School Management Website',
    slug: 'school-website',
    category: 'Web Development',
    description: 'Modern school website with admission portal, events calendar, and parent-teacher communication system.',
    problem: 'Schools need a professional online presence with integrated features for admissions, events, and stakeholder communication.',
    solution: 'Created a beautiful, responsive school website with online admission forms, dynamic events calendar, and integrated communication tools.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Google Workspace API'],
    thumbnail: '/projects/school-website.jpg',
    videoPreview: '/projects/school-preview.mp4',
    liveUrl: 'https://school-demo.vercel.app',
    githubUrl: 'https://github.com/amirsteam/school-website',
    featured: true
  },
  {
    id: 4,
    title: 'Campus Digital Platform',
    slug: 'campus-platform',
    category: 'Full Stack',
    description: 'Comprehensive campus management system with student portal, faculty dashboard, and administrative tools.',
    problem: 'Educational institutions need unified platforms for managing students, faculty, courses, and administrative processes.',
    solution: 'Built an integrated campus platform with role-based dashboards, course management, attendance tracking, and performance analytics.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'MUI'],
    thumbnail: '/projects/campus-platform.jpg',
    videoPreview: '/projects/campus-preview.mp4',
    liveUrl: 'https://campus-demo.vercel.app',
    githubUrl: 'https://github.com/amirsteam/campus-platform',
    featured: false
  },
  {
    id: 5,
    title: 'Portfolio Platform',
    slug: 'portfolio-platform',
    category: 'Full Stack',
    description: 'Production-grade portfolio system with CMS, admin dashboard, and client inquiry management.',
    problem: 'Freelancers need professional portfolios that go beyond static sites, with easy content management and client communication.',
    solution: 'Developed this very platform - a complete MERN portfolio with custom admin dashboard, project showcase, and integrated contact management.',
    techStack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Framer Motion'],
    thumbnail: '/projects/portfolio.jpg',
    videoPreview: '/projects/portfolio-preview.mp4',
    liveUrl: 'https://amirlearner.me',
    githubUrl: 'https://github.com/amirsteam/amirsteam.github.io',
    featured: true
  },
  {
    id: 6,
    title: 'Admin Dashboard System',
    slug: 'admin-dashboard',
    category: 'Full Stack',
    description: 'Versatile admin dashboard template with data visualization, user management, and real-time analytics.',
    problem: 'Every project needs an admin interface, but building one from scratch is time-consuming and repetitive.',
    solution: 'Created a reusable admin dashboard system with modular components, customizable themes, and pre-built data management features.',
    techStack: ['React', 'Node.js', 'MongoDB', 'shadcn/ui', 'Recharts', 'JWT'],
    thumbnail: '/projects/admin-dashboard.jpg',
    videoPreview: '/projects/admin-preview.mp4',
    liveUrl: 'https://admin-demo.vercel.app',
    githubUrl: 'https://github.com/amirsteam/admin-dashboard',
    featured: true
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
    degree: 'Bachelor in Computer Science',
    institution: 'Kathmandu University',
    location: 'Dhulikhel, Nepal',
    period: '2019 - 2023',
    description: 'Focused on software engineering, database systems, and web technologies.'
  },
  {
    id: 2,
    degree: 'Self-taught MERN Stack Development',
    institution: 'Online Learning & Practice',
    location: 'Remote',
    period: '2020 - 2022',
    description: 'Intensive self-study through Udemy, freeCodeCamp, and real project experience.'
  }
]

export const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'Principal',
    company: 'ABC Higher Secondary School',
    content: 'Amir transformed our school\'s digital presence completely. The website he built is not only beautiful but also easy for our staff to manage. His Google Workspace implementation was seamless.',
    avatar: '/testimonials/rajesh.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Sita Devi Thapa',
    role: 'Founder',
    company: 'Nepal Handcraft Export',
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
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
]
