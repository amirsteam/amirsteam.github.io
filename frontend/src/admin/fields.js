// Converting between saved values and what the form inputs show

export function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

export function setPath(obj, path, value) {
  const keys = path.split('.')
  const copy = { ...obj }
  let cursor = copy
  keys.slice(0, -1).forEach((key) => {
    cursor[key] = { ...(cursor[key] || {}) }
    cursor = cursor[key]
  })
  cursor[keys[keys.length - 1]] = value
  return copy
}

// Value from the database -> value in the input
export function toInput(field, value) {
  if (field.type === 'list') return Array.isArray(value) ? value.join('\n') : ''
  if (field.type === 'stats') {
    return Array.isArray(value) ? value.map((s) => `${s.value} | ${s.label}`).join('\n') : ''
  }
  if (field.type === 'checkbox') return value === undefined ? Boolean(field.default) : Boolean(value)
  if (value === undefined || value === null) return field.default ?? ''
  return value
}

// Value in the input -> value sent to the API
export function fromInput(field, value) {
  if (field.type === 'list') {
    return String(value).split('\n').map((s) => s.trim()).filter(Boolean)
  }
  if (field.type === 'stats') {
    return String(value).split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
      const [statValue, ...rest] = line.split('|')
      return { value: statValue.trim(), label: rest.join('|').trim() }
    })
  }
  if (field.type === 'number') return value === '' ? undefined : Number(value)
  return value
}

export function formFromItem(fields, item = {}) {
  let form = {}
  for (const field of fields) form = setPath(form, field.name, toInput(field, getPath(item, field.name)))
  return form
}

export function itemFromForm(fields, form) {
  let item = {}
  for (const field of fields) {
    const value = fromInput(field, getPath(form, field.name))
    if (value !== undefined) item = setPath(item, field.name, value)
  }
  return item
}
