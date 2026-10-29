// Shared fields for every piece of site content: manual ordering and a
// published switch, so drafts can be saved without showing on the site.
function contentFields(schema) {
  schema.add({
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  })
  schema.set('timestamps', true)
  schema.set('toJSON', {
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = String(ret._id)
      delete ret._id
      return ret
    }
  })
}

const trimmed = (extra = {}) => ({ type: String, trim: true, default: '', ...extra })
const stringList = () => ({ type: [{ type: String, trim: true }], default: [] })

module.exports = { contentFields, trimmed, stringList }
