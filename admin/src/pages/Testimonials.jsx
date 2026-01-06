import { useState, useEffect } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Plus, Pencil, Trash2, Loader2, Star, Quote } from 'lucide-react'
import { testimonialsAPI } from '../lib/api'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAll()
      setTestimonials(response.data.data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
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
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Manage client testimonials</p>
        </div>
        <Button>
          <Plus size={18} />
          Add Testimonial
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card key={testimonial._id}>
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-[var(--primary)] mb-4" />
              <p className="text-[var(--muted-foreground)] italic mb-4">"{testimonial.content}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                <Button variant="ghost" size="sm"><Pencil size={16} /> Edit</Button>
                <Button variant="ghost" size="sm"><Trash2 size={16} className="text-[var(--destructive)]" /> Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          No testimonials found. Add your first client testimonial!
        </div>
      )}
    </div>
  )
}
