import { useEffect, useRef, useState } from 'react'
import { Loader2, Save, RotateCcw } from 'lucide-react'
import FormField from './FormField'
import { formFromItem, itemFromForm, getPath, setPath } from '../fields'
import { clearDraft, loadDraft, saveDraft, setUnsaved } from '../unsaved'
import { btn, card } from '../ui'

const fieldId = (name) => `field-${name.replace(/\./g, '-')}`
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// Generic form for a list of field definitions. onSave(values) returns a promise.
// With a draftKey, unsaved edits are kept in this browser tab and restored on return
// (never pass one for password forms).
export default function EditForm({
  fields, item, onSave, extraActions, draftKey,
  initialMessage = '',
  successMessage = 'Saved. Press "Publish site" when you want it live.'
}) {
  const formRef = useRef(null)
  // What's saved on the server, as form values
  const [saved, setSaved] = useState(() => formFromItem(fields, item || {}))
  const [form, setForm] = useState(() => {
    const draft = loadDraft(draftKey)
    return draft && !same(draft, saved) ? draft : saved
  })
  const [restored, setRestored] = useState(() => !same(form, saved))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: initialMessage ? 'saved' : 'idle', message: initialMessage })
  const dirty = !same(form, saved)

  // Keep the draft and the "unsaved changes" flag in step with the form
  useEffect(() => {
    if (!draftKey) return
    if (dirty) saveDraft(draftKey, form)
    else clearDraft(draftKey)
  }, [draftKey, dirty, form])

  useEffect(() => {
    setUnsaved(dirty)
  }, [dirty])
  useEffect(() => () => setUnsaved(false), [])

  // "Saved" fades after a few seconds; errors stay until the next save
  useEffect(() => {
    if (status.type !== 'saved') return
    const timer = setTimeout(() => setStatus({ type: 'idle', message: '' }), 4000)
    return () => clearTimeout(timer)
  }, [status])

  // Ctrl+S / Cmd+S saves
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (status.type === 'busy') return
    setStatus({ type: 'busy', message: '' })
    setErrors({})
    const submitted = form
    try {
      await onSave(itemFromForm(fields, submitted))
      setSaved(submitted)
      setRestored(false)
      if (draftKey) clearDraft(draftKey)
      setStatus({ type: 'saved', message: successMessage })
    } catch (err) {
      const fieldErrors = err.fields || {}
      setErrors(fieldErrors)
      setStatus({ type: 'error', message: err.message })
      // Take the user to the first field that needs fixing
      const first = fields.find((f) => fieldErrors[f.name])
      if (first) document.getElementById(fieldId(first.name))?.focus()
    }
  }

  function discardDraft() {
    setForm(saved)
    setRestored(false)
    clearDraft(draftKey)
  }

  return (
    <form ref={formRef} onSubmit={submit} className={`${card} p-5 sm:p-6 space-y-5`} noValidate>
      {restored && (
        <div role="status" className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-[var(--accent-soft)] text-sm">
          <span className="flex-1">Restored your unsaved changes from earlier. Save to keep them.</span>
          <button type="button" onClick={discardDraft} className="inline-flex items-center gap-1 font-medium text-[var(--accent-primary)] hover:underline">
            <RotateCcw size={14} aria-hidden="true" /> Discard changes
          </button>
        </div>
      )}

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
        <button type="submit" disabled={status.type === 'busy'} className={`${btn.primary} mt-4`} title="Save (Ctrl+S)">
          {status.type === 'busy' ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Save size={16} aria-hidden="true" />}
          Save
        </button>
        {extraActions}
        <p aria-live="polite" className={`mt-4 text-sm ${status.type === 'error' ? 'text-[var(--error)]' : 'text-[var(--success)]'}`}>
          {status.message || (dirty && status.type === 'idle' ? <span className="text-[var(--text-muted)]">Unsaved changes</span> : '')}
        </p>
      </div>
    </form>
  )
}
