# MERN Portfolio Platform

A complete, production-grade MERN Portfolio Platform built for Amir Bahadur Shrestha.

## 🚀 Overview

This portfolio platform functions as:
- A freelancer conversion engine
- A technical authority website  
- A creative + engineering showcase
- A scalable CMS-driven system

## 📁 Project Structure

```
├── frontend/          # React (Vite) Frontend
├── backend/           # Node.js + Express API
├── admin/             # Admin Dashboard
└── README.md
```

## 🧱 Tech Stack

### Frontend
- React (Vite)
- JavaScript (NO TypeScript)
- Tailwind CSS
- Framer Motion
- Redux Toolkit
- React Router DOM
- React Helmet Async (SEO)

### Backend
- Node.js
- Express.js
- JWT Authentication
- MongoDB (Mongoose)

### Admin Dashboard
- React (Vite)
- Tailwind CSS
- Custom shadcn-style components
- Recharts for analytics

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/amirsteam/amirsteam.github.io.git
cd amirsteam.github.io
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
npm install
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Setup Admin Dashboard
```bash
cd admin
npm install
npm run dev
```

### 5. Seed the Database
```bash
cd backend
npm run seed
```

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@amirlearner.me
ADMIN_PASSWORD=changeme123
```

## 📱 Features

### Public Website
- ✅ Animated Hero Section
- ✅ About Me Section
- ✅ 4 Skill Pillars (MERN, UI/UX, Graphics, Education)
- ✅ Projects Showcase (6 projects)
- ✅ Solutions & Packages
- ✅ Experience & Education Timeline
- ✅ Testimonials Carousel
- ✅ Blog/Articles Section
- ✅ Contact Form (MongoDB-backed)
- ✅ Dark/Light Mode Toggle
- ✅ SEO Optimization
- ✅ Nepali (BS) & English (AD) Date Support

### Admin Dashboard
- ✅ JWT-based Authentication
- ✅ Protected Routes
- ✅ Dashboard with Statistics
- ✅ Projects CRUD
- ✅ Skills CRUD
- ✅ Services CRUD
- ✅ Experience CRUD
- ✅ Testimonials CRUD
- ✅ Blog Posts CRUD
- ✅ Contact Inquiry Management

## 🗄️ Database Models

1. **Admin** - Admin users with JWT authentication
2. **Project** - Portfolio projects
3. **Skill** - Skill categories and items
4. **Service** - Service packages
5. **Experience** - Work & education history
6. **Testimonial** - Client testimonials
7. **Blog** - Blog posts
8. **Contact** - Contact form submissions

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 👤 Author

**Amir Bahadur Shrestha**
- MERN Stack Developer & Digital Solutions Educator
- Location: Panauti, Kavre, Nepal
- Website: [amirlearner.me](https://amirlearner.me)

## 📄 License

MIT License - see LICENSE file for details.