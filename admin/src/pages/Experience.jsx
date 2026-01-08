import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Plus, Pencil, Trash2, Loader2, Briefcase, GraduationCap, AlertCircle, CheckCircle } from 'lucide-react'
import { experienceAPI } from '../lib/api'

export default function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    period: '',
    description: '',
    achievements: '',
    type: 'experience',
    isPublished: true
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await experienceAPI.getAll()
      setExperiences(response.data.data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (exp) => {
    setEditingExperience(exp)
    setFormData({
      title: exp.title,
      company: exp.company,
      location: exp.location,
      period: exp.period,
      description: exp.description,
      achievements: exp.achievements?.join(', ') || '',
      type: exp.type || 'experience',
      isPublished: exp.isPublished !== false
    })
    setShowForm(true)
    setMessage({ type: '', text: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const data = {
        ...formData,
        achievements: formData.achievements.split(',').map(a => a.trim()).filter(Boolean)
      }

      if (editingExperience) {
        await experienceAPI.update(editingExperience._id, data)
        setMessage({ type: 'success', text: 'Experience updated successfully!' })
      } else {
        await experienceAPI.create(data)
        setMessage({ type: 'success', text: 'Experience created successfully!' })
      }

      await fetchExperiences()
      resetForm()
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'An error occurred' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return

    try {
      await experienceAPI.delete(id)
      setExperiences(experiences.filter(e => e._id !== id))
      setMessage({ type: 'success', text: 'Entry deleted successfully!' })
    } catch (error) {
      console.error('Delete failed:', error)
      setMessage({ type: 'error', text: 'Failed to delete entry' })
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingExperience(null)
    setFormData({
      title: '',
      company: '',
      location: '',
      period: '',
      description: '',
      achievements: '',
      type: 'experience',
      isPublished: true
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience & Education</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Manage your career timeline</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add Entry
        </Button>
      </div>

      {message.text && (
        <div className={`flex items-center gap-2 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-500/10 text-green-600' 
            : 'bg-red-500/10 text-red-600'
        }`}>
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingExperience ? 'Edit Entry' : 'Add New Entry'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title / Position</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Senior Developer, Bachelor's Degree"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Company / Institution</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Google, MIT"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Kathmandu, Nepal"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Period</label>
                  <Input
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="e.g., 2020 - Present"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                >
                  <option value="experience">Work Experience</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your role or studies..."
                  className="flex min-h-20 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Achievements (comma separated)</label>
                <textarea
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  placeholder="Achievement 1, Achievement 2, Achievement 3"
                  className="flex min-h-20 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Published</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingExperience ? 'Update Entry' : 'Create Entry'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {experiences.map((exp) => (
          <Card key={exp._id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl ${exp.type === 'education' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                    {exp.type === 'education' ? (
                      <GraduationCap className="w-6 h-6 text-green-500" />
                    ) : (
                      <Briefcase className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-[var(--primary)]">{exp.company}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{exp.period} • {exp.location}</p>
                    <p className="text-sm text-[var(--muted-foreground)] mt-2">{exp.description}</p>
                    {exp.achievements?.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-[var(--muted-foreground)]">• {achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                    <Pencil size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(exp._id)}>
                    <Trash2 size={18} className="text-[var(--destructive)]" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          No entries found. Add your first experience or education!
        </div>
      )}
    </div>
  )
}
