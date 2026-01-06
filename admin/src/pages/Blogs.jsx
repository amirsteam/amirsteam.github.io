import { useState, useEffect } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Plus, Pencil, Trash2, Loader2, Eye, Calendar, Clock } from 'lucide-react'
import { blogsAPI } from '../lib/api'
import { formatDate } from '../lib/utils'

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAll()
      setBlogs(response.data.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
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
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Manage your articles</p>
        </div>
        <Button>
          <Plus size={18} />
          New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card key={blog._id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      blog.isPublished 
                        ? 'bg-green-500/10 text-green-600' 
                        : 'bg-gray-500/10 text-gray-600'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mb-3">{blog.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {blog.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {blog.views || 0} views
                    </span>
                    <span className="px-2 py-1 rounded bg-[var(--secondary)]">
                      {blog.category}
                    </span>
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

      {blogs.length === 0 && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          No blog posts found. Write your first article!
        </div>
      )}
    </div>
  )
}
