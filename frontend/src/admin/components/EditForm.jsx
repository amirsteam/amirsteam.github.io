import { useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import FormField from './FormField'
import { formFromItem, itemFromForm, getPath, setPath } from '../fields'
import { btn, card } from '../ui'

// Generic form for a list of field definitions. onSave(values) returns a promise.
export default function EditForm({ fields, item, onSave, extraActions, initialMessage = '', successMessage = 'Saved. Press "Publish site" when you want it live.' }) {
  const [form, setForm] = useState(() => formFromItem(fields, item || {}))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: initialMessage ? 'saved' : 'idle', message: initialMessage })

  async function submit(e) {
    e.preventDefault()
    setStatus({ type: 'busy', message: '' })
    setErrors({})
    try {
      await onSave(itemFromForm(fields, form))
      setStatus({ type: 'saved', message: successMessage })
    } catch (err) {
      setErrors(err.fields || {})
      setStatus({ type: 'error', message: err.message })
    }
  }

  return (
    <form onSubmit={submit} className={`${card} p-5 sm:p-6 space-y-5`} noValidate>
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={getPath(form, field.name)}
          error={errors[field.name]}
          onChange={(value) => setForm((f) => setPath(f, field.name, value))}
        />
      ))}

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--border-color)]">
        <button type="submit" disabled={status.type === 'busy'} className={`${btn.primary} mt-4`}>
          {status.type === 'busy' ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Save size={16} aria-hidden="true" />}
          Save
        </button>
        {extraActions}
        <p aria-live="polite" className={`mt-4 text-sm ${status.type === 'error' ? 'text-[var(--error)]' : 'text-[var(--success)]'}`}>
          {status.message}
        </p>
      </div>
    </form>
  )
}
