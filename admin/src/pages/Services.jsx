import { useState, useEffect } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react'
import { servicesAPI } from '../lib/api'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

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
        <Button>
          <Plus size={18} />
          Add Service
        </Button>
      </div>

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
                <Button variant="ghost" size="icon"><Pencil size={18} /></Button>
                <Button variant="ghost" size="icon"><Trash2 size={18} className="text-[var(--destructive)]" /></Button>
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
