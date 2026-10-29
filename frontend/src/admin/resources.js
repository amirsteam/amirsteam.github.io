// Which content types the admin edits, and the form fields for each.
// Field types: text, textarea, url, number, checkbox, select, list (one item per line).
import { Briefcase, Wrench, Layers, GraduationCap, School, Quote } from 'lucide-react'

const SERVICE_ICONS = ['School', 'ShoppingCart', 'Newspaper', 'Briefcase']
const SKILL_ICONS = ['Code2', 'Palette', 'Film', 'GraduationCap']

const publishing = [
  { name: 'isPublished', label: 'Show on the site', type: 'checkbox', default: true, help: 'Untick to keep it as a draft.' },
  { name: 'order', label: 'Order', type: 'number', help: 'Lower numbers show first.' }
]

export const resources = {
  projects: {
    label: 'Projects',
    singular: 'project',
    icon: Briefcase,
    columns: ['title', 'category', 'featured'],
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true, help: 'Short id for the project: lowercase letters, numbers and dashes, e.g. nevan-store.' },
      { name: 'category', label: 'Category', type: 'text', default: 'Full Stack', help: 'Used for the filter buttons, e.g. Full Stack or Backend.' },
      { name: 'description', label: 'Short description', type: 'textarea', rows: 2, required: true },
      { name: 'problem', label: 'Problem', type: 'textarea', rows: 2 },
      { name: 'solution', label: 'What I built', type: 'textarea', rows: 3 },
      { name: 'techStack', label: 'Tech stack', type: 'list', help: 'One per line. The first four show on the card.' },
      { name: 'thumbnail', label: 'Screenshot path', type: 'text', help: 'Leave empty to use an automatic screenshot of the live site (taken when you publish). Or enter your own file, e.g. /projects/my-project.webp (in frontend/public/projects).' },
      { name: 'liveUrl', label: 'Live site URL', type: 'url' },
      { name: 'githubUrl', label: 'Source code URL', type: 'url' },
      { name: 'featured', label: 'Featured (shown on the home page)', type: 'checkbox' },
      ...publishing
    ]
  },
  services: {
    label: 'Services',
    singular: 'service',
    icon: Wrench,
    columns: ['title', 'price', 'popular'],
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'icon', label: 'Icon', type: 'select', options: SERVICE_ICONS, default: 'Briefcase' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 2, required: true },
      { name: 'features', label: 'What is included', type: 'list', help: 'One per line.' },
      { name: 'price', label: 'Price', type: 'text', help: 'e.g. From NPR 50,000' },
      { name: 'priceNote', label: 'Price note', type: 'text' },
      { name: 'popular', label: 'Highlight as "Most Popular"', type: 'checkbox' },
      ...publishing
    ]
  },
  skills: {
    label: 'Skills',
    singular: 'skill area',
    icon: Layers,
    columns: ['title', 'key'],
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'key', label: 'Key', type: 'text', required: true, help: 'Short id, letters and numbers only, e.g. mernEngineering.' },
      { name: 'icon', label: 'Icon', type: 'select', options: SKILL_ICONS, default: 'Code2' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
      { name: 'items', label: 'Tools & skills', type: 'list', help: 'One per line.' },
      { name: 'usedIn', label: 'Used in (project titles)', type: 'list', help: 'One project title per line.' },
      ...publishing
    ]
  },
  experience: {
    label: 'Experience',
    singular: 'job',
    icon: School,
    columns: ['title', 'company', 'period'],
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Job title', type: 'text', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'period', label: 'Period', type: 'text', help: 'e.g. 2022 – Present' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { name: 'achievements', label: 'Achievements', type: 'list', help: 'One per line.' },
      ...publishing
    ]
  },
  education: {
    label: 'Education',
    singular: 'education entry',
    icon: GraduationCap,
    columns: ['degree', 'institution', 'period'],
    titleField: 'degree',
    fields: [
      { name: 'degree', label: 'Degree or course', type: 'text', required: true },
      { name: 'institution', label: 'Institution', type: 'text', required: true },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'period', label: 'Period', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
      ...publishing
    ]
  },
  testimonials: {
    label: 'Testimonials',
    singular: 'testimonial',
    icon: Quote,
    columns: ['name', 'company', 'rating'],
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'content', label: 'Quote', type: 'textarea', rows: 4, required: true, help: 'Only real quotes you have permission to publish.' },
      { name: 'rating', label: 'Rating (1–5)', type: 'number', default: 5, min: 1, max: 5 },
      ...publishing
    ]
  }
}

export const profileFields = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'title', label: 'Job title', type: 'text' },
  { name: 'tagline', label: 'Tagline', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'location.city', label: 'City', type: 'text' },
  { name: 'location.district', label: 'District', type: 'text' },
  { name: 'location.province', label: 'Province', type: 'text' },
  { name: 'location.country', label: 'Country', type: 'text' },
  { name: 'availability', label: 'Availability', type: 'text', help: 'e.g. Remote & Worldwide' },
  { name: 'social.github', label: 'GitHub URL', type: 'url' },
  { name: 'social.linkedin', label: 'LinkedIn URL', type: 'url' },
  { name: 'social.twitter', label: 'Twitter / X URL', type: 'url' },
  { name: 'social.youtube', label: 'YouTube URL', type: 'url' },
  { name: 'bio', label: 'Bio (About page)', type: 'textarea', rows: 10, help: 'Leave a blank line between paragraphs.' },
  { name: 'stats', label: 'About-page stats', type: 'stats', help: 'One per line as "value | label", e.g. 20+ | Projects Completed.' }
]
