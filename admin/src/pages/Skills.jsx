import { useState, useEffect } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { skillsAPI } from '../lib/api'

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll()
      setSkills(response.data.data)
    } catch (error) {
      console.error('Error fetching skills:', error)
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
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Manage your skill categories</p>
        </div>
        <Button>
          <Plus size={18} />
          Add Skill Category
        </Button>
      </div>

      <div className="grid gap-4">
        {skills.map((skill) => (
          <Card key={skill._id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{skill.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{skill.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skill.items?.map((item) => (
                      <span key={item.name} className="px-2 py-1 text-xs rounded bg-[var(--secondary)]">
                        {item.name}: {item.level}%
                      </span>
                    ))}
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

      {skills.length === 0 && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          No skills found. Add your first skill category!
        </div>
      )}
    </div>
  )
}
