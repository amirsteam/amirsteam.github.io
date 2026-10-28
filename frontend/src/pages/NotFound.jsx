import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { personalInfo } from '../data'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | {personalInfo.name}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">404</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            This page doesn't exist
          </h1>
          <p className="mt-4 text-[var(--text-secondary)]">
            The link may be old or mistyped. You can find my work and contact details on the home page.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-semibold"
            >
              Go to home page
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-[var(--accent-primary)] transition-colors"
            >
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
