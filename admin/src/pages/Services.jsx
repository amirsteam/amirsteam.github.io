import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Plus, Pencil, Trash2, Loader2, Star, AlertCircle, CheckCircle } from 'lucide-react'
import { servicesAPI } from '../lib/api'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    title: '',
    icon: 'Briefcase',
    description: '',
    features: '',
    price: '',
    priceNote: 'Starting from',
    popular: false,
    isPublished: true
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll()
      setServices(response.data.data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      icon: service.icon || 'Briefcase',
      description: service.description,
      features: service.features?.join(', ') || '',
      price: service.price,
      priceNote: service.priceNote || 'Starting from',
      popular: service.popular || false,
      isPublished: service.isPublished !== false
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
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
      }

      if (editingService) {
        await servicesAPI.update(editingService._id, data)
        setMessage({ type: 'success', text: 'Service updated successfully!' })
      } else {
        await servicesAPI.create(data)
        setMessage({ type: 'success', text: 'Service created successfully!' })
      }

      await fetchServices()
      resetForm()
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'An error occurred' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return

    try {
      await servicesAPI.delete(id)
      setServices(services.filter(s => s._id !== id))
      setMessage({ type: 'success', text: 'Service deleted successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete service' })
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingService(null)
    setFormData({
      title: '',
      icon: 'Briefcase',
      description: '',
      features: '',
      price: '',
      priceNote: 'Starting from',
      popular: false,
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
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Manage your service packages</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add Service
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
            <CardTitle>{editingService ? 'Edit Service' : 'Add New Service'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Service Title"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Icon Name</label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., Briefcase, Code, School"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description..."
                  className="flex min-h-20 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Features (comma separated)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="flex min-h-20 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Rs. 25,000"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Price Note</label>
                  <Input
                    value={formData.priceNote}
                    onChange={(e) => setFormData({ ...formData, priceNote: e.target.value })}
                    placeholder="Starting from"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Popular Service</span>
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
                  {editingService ? 'Update Service' : 'Create Service'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service._id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                {service.popular && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">{service.description}</p>
              <div className="text-2xl font-bold text-[var(--primary)] mb-4">{service.price}</div>
              <ul className="space-y-2 mb-4">
                {service.features?.slice(0, 3).map((feature, i) => (
                  <li key={i} className="text-sm text-[var(--muted-foreground)]">• {feature}</li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                  <Pencil size={18} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(service._id)}>
                  <Trash2 size={18} className="text-[var(--destructive)]" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          No services found. Add your first service package!
        </div>
      )}
    </div>
  )
}
