import { useState, useEffect } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Plus, Pencil, Trash2, Loader2, Briefcase, GraduationCap } from 'lucide-react'
import { experienceAPI } from '../lib/api'

export default function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

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
        <Button>
          <Plus size={18} />
          Add Entry
        </Button>
      </div>

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
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><Pencil size={18} /></Button>
                  <Button variant="ghost" size="icon"><Trash2 size={18} className="text-[var(--destructive)]" /></Button>
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
