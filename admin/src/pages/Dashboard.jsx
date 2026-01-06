import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { 
  FolderKanban, 
  FileText, 
  Mail, 
  Eye,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react'
import { projectsAPI, blogsAPI, contactsAPI, testimonialsAPI } from '../lib/api'
import { formatDateTime } from '../lib/utils'

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    contacts: { total: 0, new: 0 },
    testimonials: 0
  })
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, blogsRes, contactsStatsRes, testimonialsRes, contactsRes] = await Promise.all([
        projectsAPI.getAll(),
        blogsAPI.getAll(),
        contactsAPI.getStats(),
        testimonialsAPI.getAll(),
        contactsAPI.getAll({ status: 'new' })
      ])

      setStats({
        projects: projectsRes.data.count,
        blogs: blogsRes.data.count,
        contacts: contactsStatsRes.data.data,
        testimonials: testimonialsRes.data.count
      })
      setRecentContacts(contactsRes.data.data.slice(0, 5))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Blog Posts',
      value: stats.blogs,
      icon: FileText,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'New Inquiries',
      value: stats.contacts.new,
      icon: Mail,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail size={20} />
            Recent Inquiries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentContacts.length > 0 ? (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-medium">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">{contact.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm capitalize px-2 py-1 rounded bg-[var(--secondary)]">
                      {contact.subject}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      {formatDateTime(contact.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--muted-foreground)] py-8">
              No new inquiries yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Total Contacts</span>
                <span className="font-semibold">{stats.contacts.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Unread Messages</span>
                <span className="font-semibold text-orange-500">{stats.contacts.new}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Published Projects</span>
                <span className="font-semibold">{stats.projects}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye size={20} />
              System Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Platform</span>
                <span className="font-semibold">MERN Stack</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Dashboard</span>
                <span className="font-semibold">Custom Built</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Version</span>
                <span className="font-semibold">1.0.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
