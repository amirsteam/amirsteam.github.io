// Site content: CMS content published from the admin dashboard (cms.json,
// written by the deploy workflow) wins; anything missing falls back to the
// built-in defaults in defaults.js.
import cms from './cms.json'
import * as defaults from './defaults.js'

const has = (list) => Array.isArray(list) && list.length > 0

const profile = cms.profile || {}

export const personalInfo = {
  ...defaults.personalInfo,
  ...profile,
  location: { ...defaults.personalInfo.location, ...(profile.location || {}) },
  social: { ...defaults.personalInfo.social, ...(profile.social || {}) }
}

export const stats = has(profile.stats) ? profile.stats : defaults.stats

export const projects = has(cms.projects) ? cms.projects : defaults.projects
export const services = has(cms.services) ? cms.services : defaults.services
export const experience = has(cms.experience) ? cms.experience : defaults.experience
export const education = has(cms.education) ? cms.education : defaults.education
export const testimonials = has(cms.testimonials) ? cms.testimonials : defaults.testimonials
export const blogPosts = defaults.blogPosts

// Skills are a list in the CMS and an object keyed by area on the site
export const skills = has(cms.skills)
  ? Object.fromEntries(cms.skills.map(({ key, items, ...rest }) => [
      key,
      { ...rest, items: (items || []).map((name) => ({ name })) }
    ]))
  : defaults.skills

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  // Blog is hidden until there are real posts; add { name: 'Blog', path: '/blog' } back then
  { name: 'Contact', path: '/contact' }
]
