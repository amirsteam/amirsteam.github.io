import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  ExternalLink,
  Github,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { projectsAPI } from '../lib/api'
import { formatDate } from '../lib/utils'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Full Stack',
    description: '',
    problem: '',
    solution: '',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    isPublished: true
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll()
      setProjects(response.data.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const data = {
        ...formData,
        techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean)
      }

      if (editingProject) {
        await projectsAPI.update(editingProject._id, data)
        setMessage({ type: 'success', text: 'Project updated successfully!' })
      } else {
        await projectsAPI.create(data)
        setMessage({ type: 'success', text: 'Project created successfully!' })
      }

      fetchProjects()
      resetForm()
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'An error occurred' })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description,
      problem: project.problem,
      solution: project.solution,
      techStack: project.techStack.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
      isPublished: project.isPublished
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return

    try {
      await projectsAPI.delete(id)
      setProjects(projects.filter(p => p._id !== id))
      setMessage({ type: 'success', text: 'Project deleted successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete project' })
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProject(null)
    setFormData({
      title: '',
      slug: '',
      category: 'Full Stack',
      description: '',
      problem: '',
      solution: '',
      techStack: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      isPublished: true
    })
  }

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add Project
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
            <CardTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project Title"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="project-slug"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Tech Stack (comma separated)</label>
                  <Input
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description..."
                  className="flex min-h-24 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Problem</label>
                  <textarea
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="What problem does this solve?"
                    className="flex min-h-20 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Solution</label>
                  <textarea
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="How did you solve it?"
                    className="flex min-h-20 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Live URL</label>
                  <Input
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">GitHub URL</label>
                  <Input
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Featured Project</span>
                </label>
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
                  {editingProject ? 'Update Project' : 'Create Project'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects List */}
      <div className="grid gap-4">
        {filteredProjects.map((project) => (
          <Card key={project._id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-600">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.isPublished 
                        ? 'bg-green-500/10 text-green-600' 
                        : 'bg-gray-500/10 text-gray-600'
                    }`}>
                      {project.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs rounded bg-[var(--secondary)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-[var(--accent)]"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-[var(--accent)]"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                    <Pencil size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project._id)}>
                    <Trash2 size={18} className="text-[var(--destructive)]" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          No projects found
        </div>
      )}
    </div>
  )
}
