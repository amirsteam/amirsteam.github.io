/**
 * Normalization utilities for MongoDB/API data
 * Ensures UI-safe data regardless of backend inconsistencies
 */

/**
 * Safely convert any value to an array
 * Handles: undefined, null, string, array, comma-separated string
 */
function toSafeArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string') {
    // Handle comma-separated strings
    if (value.includes(',')) {
      return value.split(',').map(s => s.trim()).filter(Boolean)
    }
    return value.trim() ? [value.trim()] : []
  }
  return []
}

/**
 * Safely get string value with fallback
 */
function toSafeString(value, fallback = '') {
  if (value === null || value === undefined) return fallback
  if (typeof value === 'string') return value
  return String(value)
}

/**
 * Generate stable ID from MongoDB doc or fallback
 */
function toSafeId(doc, index) {
  return doc?._id || doc?.id || `item-${index}`
}

// ============================================
// EXPERIENCE NORMALIZER
// ============================================

/**
 * Normalize a single experience document
 * @param {Object} exp - Raw experience from API or static data
 * @param {number} index - Array index for fallback ID
 * @returns {Object} UI-safe experience object
 */
export function normalizeExperience(exp, index = 0) {
  if (!exp || typeof exp !== 'object') {
    return {
      id: `exp-fallback-${index}`,
      title: 'Position',
      company: 'Company',
      location: 'Location',
      period: 'Present',
      description: '',
      achievements: [],
      type: 'experience',
      isPublished: true
    }
  }

  return {
    id: toSafeId(exp, index),
    title: toSafeString(exp.title, 'Position'),
    company: toSafeString(exp.company, 'Company'),
    location: toSafeString(exp.location, 'Location'),
    period: toSafeString(exp.period, 'Present'),
    description: toSafeString(exp.description, ''),
    achievements: toSafeArray(exp.achievements),
    type: toSafeString(exp.type, 'experience'),
    isPublished: exp.isPublished !== false
  }
}

/**
 * Normalize array of experience documents
 */
export function normalizeExperienceArray(data) {
  if (!Array.isArray(data)) return []
  return data.map((exp, i) => normalizeExperience(exp, i))
}

// ============================================
// SERVICE NORMALIZER
// ============================================

/**
 * Normalize a single service document
 */
export function normalizeService(service, index = 0) {
  if (!service || typeof service !== 'object') {
    return {
      id: `service-fallback-${index}`,
      title: 'Service',
      icon: 'Briefcase',
      description: '',
      features: [],
      price: 'Contact for pricing',
      priceNote: 'Starting from',
      popular: false,
      isPublished: true
    }
  }

  return {
    id: toSafeId(service, index),
    title: toSafeString(service.title, 'Service'),
    icon: toSafeString(service.icon, 'Briefcase'),
    description: toSafeString(service.description, ''),
    features: toSafeArray(service.features),
    price: toSafeString(service.price, 'Contact for pricing'),
    priceNote: toSafeString(service.priceNote, 'Starting from'),
    popular: Boolean(service.popular),
    isPublished: service.isPublished !== false
  }
}

/**
 * Normalize array of service documents
 */
export function normalizeServiceArray(data) {
  if (!Array.isArray(data)) return []
  return data.map((service, i) => normalizeService(service, i))
}

// ============================================
// PROJECT NORMALIZER
// ============================================

/**
 * Normalize a single project document
 */
export function normalizeProject(project, index = 0) {
  if (!project || typeof project !== 'object') {
    return {
      id: `project-fallback-${index}`,
      title: 'Project',
      slug: `project-${index}`,
      category: 'Development',
      description: '',
      problem: '',
      solution: '',
      techStack: [],
      thumbnail: '',
      videoPreview: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      isPublished: true
    }
  }

  return {
    id: toSafeId(project, index),
    title: toSafeString(project.title, 'Project'),
    slug: toSafeString(project.slug, `project-${index}`),
    category: toSafeString(project.category, 'Development'),
    description: toSafeString(project.description, ''),
    problem: toSafeString(project.problem, ''),
    solution: toSafeString(project.solution, ''),
    techStack: toSafeArray(project.techStack),
    thumbnail: toSafeString(project.thumbnail, ''),
    videoPreview: toSafeString(project.videoPreview, ''),
    liveUrl: toSafeString(project.liveUrl, ''),
    githubUrl: toSafeString(project.githubUrl, ''),
    featured: Boolean(project.featured),
    isPublished: project.isPublished !== false
  }
}

/**
 * Normalize array of project documents
 */
export function normalizeProjectArray(data) {
  if (!Array.isArray(data)) return []
  return data.map((project, i) => normalizeProject(project, i))
}

// ============================================
// BLOG NORMALIZER
// ============================================

/**
 * Normalize a single blog document
 */
export function normalizeBlog(blog, index = 0) {
  if (!blog || typeof blog !== 'object') {
    return {
      id: `blog-fallback-${index}`,
      title: 'Blog Post',
      slug: `blog-${index}`,
      excerpt: '',
      content: '',
      category: 'General',
      tags: [],
      thumbnail: '',
      publishedAt: new Date().toISOString(),
      readTime: '5 min read',
      author: 'Author',
      isPublished: true
    }
  }

  return {
    id: toSafeId(blog, index),
    title: toSafeString(blog.title, 'Blog Post'),
    slug: toSafeString(blog.slug, `blog-${index}`),
    excerpt: toSafeString(blog.excerpt, ''),
    content: toSafeString(blog.content, ''),
    category: toSafeString(blog.category, 'General'),
    tags: toSafeArray(blog.tags),
    thumbnail: toSafeString(blog.thumbnail, ''),
    publishedAt: toSafeString(blog.publishedAt, new Date().toISOString()),
    readTime: toSafeString(blog.readTime, '5 min read'),
    author: toSafeString(blog.author, 'Author'),
    isPublished: blog.isPublished !== false
  }
}

/**
 * Normalize array of blog documents
 */
export function normalizeBlogArray(data) {
  if (!Array.isArray(data)) return []
  return data.map((blog, i) => normalizeBlog(blog, i))
}

// ============================================
// TESTIMONIAL NORMALIZER
// ============================================

/**
 * Normalize a single testimonial document
 */
export function normalizeTestimonial(testimonial, index = 0) {
  if (!testimonial || typeof testimonial !== 'object') {
    return {
      id: `testimonial-fallback-${index}`,
      name: 'Client',
      role: 'Role',
      company: 'Company',
      content: '',
      avatar: '',
      rating: 5,
      isPublished: true
    }
  }

  return {
    id: toSafeId(testimonial, index),
    name: toSafeString(testimonial.name, 'Client'),
    role: toSafeString(testimonial.role, 'Role'),
    company: toSafeString(testimonial.company, 'Company'),
    content: toSafeString(testimonial.content, ''),
    avatar: toSafeString(testimonial.avatar, ''),
    rating: Number(testimonial.rating) || 5,
    isPublished: testimonial.isPublished !== false
  }
}

/**
 * Normalize array of testimonial documents
 */
export function normalizeTestimonialArray(data) {
  if (!Array.isArray(data)) return []
  return data.map((testimonial, i) => normalizeTestimonial(testimonial, i))
}

// ============================================
// SKILL NORMALIZER
// ============================================

/**
 * Normalize a single skill item within a category
 */
function normalizeSkillItem(item, index = 0) {
  if (!item || typeof item !== 'object') {
    return { name: 'Skill', level: 50 }
  }
  return {
    name: toSafeString(item.name, 'Skill'),
    level: Number(item.level) || 50
  }
}

/**
 * Normalize a single skill category document
 */
export function normalizeSkill(skill, index = 0) {
  if (!skill || typeof skill !== 'object') {
    return {
      id: `skill-fallback-${index}`,
      title: 'Skill Category',
      icon: 'Code',
      color: 'from-blue-500 to-cyan-500',
      description: '',
      items: [],
      isPublished: true
    }
  }

  // Handle items - could be array of objects or array of strings
  let items = []
  if (Array.isArray(skill.items)) {
    items = skill.items.map((item, i) => {
      if (typeof item === 'string') {
        return { name: item, level: 80 }
      }
      return normalizeSkillItem(item, i)
    })
  }

  return {
    id: toSafeId(skill, index),
    title: toSafeString(skill.title, 'Skill Category'),
    icon: toSafeString(skill.icon, 'Code'),
    color: toSafeString(skill.color, 'from-blue-500 to-cyan-500'),
    description: toSafeString(skill.description, ''),
    items,
    isPublished: skill.isPublished !== false
  }
}

/**
 * Normalize array of skill documents
 */
export function normalizeSkillArray(data) {
  if (!Array.isArray(data)) return []
  return data.map((skill, i) => normalizeSkill(skill, i))
}

