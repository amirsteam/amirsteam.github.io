const mongoose = require('mongoose')
require('dotenv').config()

const Admin = require('../models/Admin')
const Project = require('../models/Project')
const Skill = require('../models/Skill')
const Service = require('../models/Service')
const Experience = require('../models/Experience')
const Testimonial = require('../models/Testimonial')
const Blog = require('../models/Blog')

// Seed Data
const seedData = {
  admin: {
    name: 'Amir Bahadur Shrestha',
    email: process.env.ADMIN_EMAIL || 'admin@amirlearner.me',
    password: process.env.ADMIN_PASSWORD,
    role: 'superadmin'
  },

  projects: [
    {
      title: 'News Portal System',
      slug: 'news-portal',
      category: 'Full Stack',
      description: 'A comprehensive news publishing platform with real-time updates, role-based access control, and SEO optimization.',
      problem: 'Traditional news websites lack modern CMS capabilities, real-time updates, and proper SEO optimization.',
      solution: 'Built a complete MERN stack news portal with a powerful admin dashboard and SEO optimization.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Tailwind CSS'],
      featured: true,
      isPublished: true
    },
    {
      title: 'MERN E-Commerce Platform',
      slug: 'mern-ecommerce',
      category: 'Full Stack',
      description: 'Full-featured e-commerce solution with secure payments, inventory management, and admin analytics.',
      problem: 'Small businesses struggle with expensive e-commerce platforms that lack customization.',
      solution: 'Developed a customizable MERN e-commerce platform with integrated payment processing.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redux Toolkit'],
      featured: true,
      isPublished: true
    },
    {
      title: 'School Management Website',
      slug: 'school-website',
      category: 'Web Development',
      description: 'Modern school website with admission portal, events calendar, and communication system.',
      problem: 'Schools need a professional online presence with integrated features.',
      solution: 'Created a responsive school website with online admission and event management.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Google Workspace API'],
      featured: true,
      isPublished: true
    }
  ],

  skills: [
    {
      title: 'MERN Engineering',
      key: 'mern-engineering',
      icon: 'Code2',
      color: 'from-blue-500 to-cyan-500',
      description: 'Full-stack JavaScript development with modern best practices',
      items: [
        { name: 'Full MERN Architecture', level: 95 },
        { name: 'Secure Authentication (JWT)', level: 92 },
        { name: 'Admin Dashboards', level: 90 },
        { name: 'REST APIs', level: 95 },
        { name: 'MongoDB Schema Design', level: 90 }
      ],
      order: 1,
      isPublished: true
    },
    {
      title: 'UI/UX & Animation',
      key: 'ui-ux-animation',
      icon: 'Palette',
      color: 'from-purple-500 to-pink-500',
      description: 'Beautiful, responsive, and accessible user interfaces',
      items: [
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Material UI (MUI)', level: 90 },
        { name: 'Framer Motion', level: 88 },
        { name: 'Responsive Design', level: 95 }
      ],
      order: 2,
      isPublished: true
    }
  ],

  services: [
    {
      title: 'School / Campus Digital Solution',
      icon: 'School',
      description: 'Complete digital transformation for educational institutions',
      features: [
        'School/Campus website development',
        'Google Workspace enrollment',
        'Official email setup',
        'Training & handover support'
      ],
      price: 'Rs. 25,000',
      priceNote: 'Starting from',
      popular: false,
      order: 1,
      isPublished: true
    },
    {
      title: 'MERN E-Commerce Platform',
      icon: 'ShoppingCart',
      description: 'Full-featured online store with powerful admin tools',
      features: [
        'Full MERN stack application',
        'Admin dashboard',
        'Product & order management',
        'Authentication & security'
      ],
      price: 'Rs. 50,000',
      priceNote: 'Starting from',
      popular: true,
      order: 2,
      isPublished: true
    }
  ],

  experience: [
    {
      title: 'Freelance MERN Stack Developer',
      company: 'Self-employed',
      location: 'Remote',
      period: '2022 - Present',
      description: 'Building production-grade web applications for clients worldwide.',
      achievements: [
        'Delivered 20+ successful projects',
        'Maintained 100% client satisfaction rate',
        'Specialized in scalable MERN architecture'
      ],
      type: 'experience',
      order: 1,
      isPublished: true
    },
    {
      title: 'Web Development Instructor',
      company: 'Local Tech Institute',
      location: 'Panauti, Nepal',
      period: '2021 - Present',
      description: 'Teaching modern web development to aspiring developers.',
      achievements: [
        'Trained 100+ students',
        'Developed comprehensive curriculum'
      ],
      type: 'experience',
      order: 2,
      isPublished: true
    }
  ],

  testimonials: [
    {
      name: 'Rajesh Sharma',
      role: 'Principal',
      company: 'ABC Higher Secondary School',
      content: 'Amir transformed our school\'s digital presence completely. The website is beautiful and easy to manage.',
      rating: 5,
      order: 1,
      isPublished: true
    },
    {
      name: 'Sita Devi Thapa',
      role: 'Founder',
      company: 'Nepal Handcraft Export',
      content: 'The e-commerce platform Amir built increased our online sales by 300%.',
      rating: 5,
      order: 2,
      isPublished: true
    }
  ],

  blogs: [
    {
      title: 'Building Scalable MERN Applications',
      slug: 'building-scalable-mern-applications',
      excerpt: 'Learn how to structure your MERN stack projects for maintainability and scale.',
      content: '# Building Scalable MERN Applications\n\nIn this article, we explore best practices for building scalable MERN applications...',
      category: 'Development',
      tags: ['MERN', 'Architecture', 'Best Practices'],
      isPublished: true
    }
  ]
}

const seedDB = async () => {
  try {
    // Validate required environment variables
    if (!process.env.ADMIN_PASSWORD) {
      console.error('ERROR: ADMIN_PASSWORD environment variable is required.')
      console.error('Please set a strong password in your .env file:')
      console.error('  ADMIN_PASSWORD=your_strong_password_here')
      process.exit(1)
    }

    if (process.env.ADMIN_PASSWORD.length < 8) {
      console.error('ERROR: ADMIN_PASSWORD must be at least 8 characters long.')
      process.exit(1)
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Admin.deleteMany()
    await Project.deleteMany()
    await Skill.deleteMany()
    await Service.deleteMany()
    await Experience.deleteMany()
    await Testimonial.deleteMany()
    await Blog.deleteMany()

    console.log('Cleared existing data')

    // Create admin
    const admin = await Admin.create(seedData.admin)
    console.log('Admin created:', admin.email)

    // Add author to blogs
    seedData.blogs.forEach(blog => {
      blog.author = admin._id
      blog.publishedAt = new Date()
    })

    // Seed all data
    await Project.insertMany(seedData.projects)
    await Skill.insertMany(seedData.skills)
    await Service.insertMany(seedData.services)
    await Experience.insertMany(seedData.experience)
    await Testimonial.insertMany(seedData.testimonials)
    await Blog.insertMany(seedData.blogs)

    console.log('Seed data inserted successfully!')
    console.log('\nAdmin credentials:')
    console.log(`Email: ${seedData.admin.email}`)
    console.log(`Password: ${seedData.admin.password}`)
    console.log('\n⚠️  Please change the password after first login!')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDB()
