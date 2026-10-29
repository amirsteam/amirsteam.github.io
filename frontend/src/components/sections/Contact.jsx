import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  Twitter,
  Youtube
} from 'lucide-react'
import { personalInfo } from '../../data'
import { api } from '../../lib/api'

const SUBJECT_LABELS = {
  project: 'Project Inquiry',
  consultation: 'Consultation',
  teaching: 'Teaching/Mentoring',
  job: 'Job Opportunity',
  other: 'Other'
}

// Builds a mailto link with the visitor's message already filled in,
// so nothing is lost when the API can't be reached.
function buildMailtoLink(data) {
  const subject = `[Portfolio] ${SUBJECT_LABELS[data.subject] || 'Message'} from ${data.name}`
  const body = [
    data.message,
    '',
    `— ${data.name}`,
    data.email,
    data.phone
  ].filter((line) => line !== undefined).join('\n')
  return `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function buildWhatsAppLink(data) {
  const phone = personalInfo.phone.replace(/\D/g, '')
  const text = `Hi Amir, I'm ${data.name} (${data.email}).\n\n${data.message}`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export default function Contact({ isPage = false }) {
  // As a standalone page the section title is the page h1
  const Heading = isPage ? 'h1' : 'h2'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '' // honeypot: hidden from people, bots tend to fill it
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  // Copy of what was sent, so the fallback links still work after an error
  const [failedMessage, setFailedMessage] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { website, ...message } = formData
    const emptyForm = { name: '', email: '', phone: '', subject: '', message: '', website: '' }

    // Bot filled the hidden field: act as if it worked, send nothing
    if (website) {
      setSubmitStatus('success')
      setFormData(emptyForm)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    const result = await api.submitContact(message)

    if (result.success) {
      setSubmitStatus('success')
      setFailedMessage(null)
      setFormData(emptyForm)
    } else {
      // Keep the form filled in and offer other ways to send it
      setSubmitStatus('error')
      setFailedMessage(message)
    }
    setIsSubmitting(false)
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: Linkedin, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: Twitter, url: personalInfo.social.twitter },
    { name: 'YouTube', icon: Youtube, url: personalInfo.social.youtube }
  ]

  return (
    <section id="contact" className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 max-w-2xl">
            <span className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              Get In Touch
            </span>
            <Heading className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Let's Work Together
            </Heading>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Contact Information
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Fill out the form and I'll get back to you within 24 hours. Or reach out directly through any of these channels.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <div className="p-3 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <div className="p-3 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Phone</p>
                    <a href={`tel:${personalInfo.phone}`} className="font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <div className="p-3 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Location</p>
                    <p className="font-medium text-[var(--text-primary)]">
                      {`${personalInfo.location.city}, ${personalInfo.location.district}, ${personalInfo.location.country}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <div className="p-3 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Availability</p>
                    <p className="font-medium text-[var(--text-primary)]">{personalInfo.availability}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-4">Follow Me</h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-[var(--bg-primary)] rounded-xl p-8 border border-[var(--border-color)]">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="project">Project Inquiry</option>
                      <option value="consultation">Consultation</option>
                      <option value="teaching">Teaching/Mentoring</option>
                      <option value="job">Job Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Honeypot: hidden from people and screen readers */}
                  <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Status Messages */}
                <div aria-live="polite">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400"
                    >
                      <CheckCircle size={20} className="shrink-0" />
                      <span>Message sent. I'll get back to you within 24 hours.</span>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && failedMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400"
                    >
                      <p className="flex items-center gap-2 font-medium">
                        <AlertCircle size={20} className="shrink-0" />
                        Your message couldn't be sent from here.
                      </p>
                      <p className="mt-1 text-sm">
                        It's still filled in above. Send it with one click instead:
                      </p>
                      <div className="mt-3 flex flex-col sm:flex-row gap-2">
                        <a
                          href={buildMailtoLink(failedMessage)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:border-[var(--accent-primary)] transition-colors"
                        >
                          <Mail size={16} />
                          Send by email
                        </a>
                        <a
                          href={buildWhatsAppLink(failedMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:border-[var(--accent-primary)] transition-colors"
                        >
                          <Phone size={16} />
                          Send on WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
