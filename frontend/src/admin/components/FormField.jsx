import { input } from '../ui'

// One labelled input for a field definition from resources.js
export default function FormField({ field, value, onChange, error }) {
  const id = `field-${field.name.replace(/\./g, '-')}`
  const describedBy = [field.help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  const common = {
    id,
    name: field.name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy
  }

  if (field.type === 'checkbox') {
    return (
      <div className="flex items-start gap-3">
        <input
          {...common}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[var(--accent-primary)]"
        />
        <div>
          <label htmlFor={id} className="text-sm font-medium text-[var(--text-primary)]">{field.label}</label>
          {field.help && <p id={`${id}-help`} className="text-xs text-[var(--text-muted)] mt-0.5">{field.help}</p>}
        </div>
      </div>
    )
  }

  let control
  if (field.type === 'textarea' || field.type === 'list' || field.type === 'stats') {
    control = (
      <textarea
        {...common}
        rows={field.rows || (field.type === 'textarea' ? 3 : 5)}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`${input} resize-y`}
      />
    )
  } else if (field.type === 'select') {
    control = (
      <select {...common} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={input}>
        {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    )
  } else {
    control = (
      <input
        {...common}
        type={['number', 'url', 'password'].includes(field.type) ? field.type : 'text'}
        autoComplete={field.type === 'password' ? (field.name === 'currentPassword' ? 'current-password' : 'new-password') : undefined}
        min={field.min}
        max={field.max}
        required={field.required}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={input}
      />
    )
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
        {field.label}{field.required && <span className="text-[var(--error)]" aria-hidden="true"> *</span>}
      </label>
      {control}
      {field.help && <p id={`${id}-help`} className="text-xs text-[var(--text-muted)] mt-1">{field.help}</p>}
      {error && <p id={`${id}-error`} className="text-xs text-[var(--error)] mt-1">{error}</p>}
    </div>
  )
}
