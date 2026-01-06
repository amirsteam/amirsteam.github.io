import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { contactsAPI } from '../lib/api'
import { formatDateTime } from '../lib/utils'
import { 
  Mail, 
  Clock, 
  MessageSquare,
  CheckCircle,
  Archive,
  Trash2,
  Loader2,
  Phone
} from 'lucide-react'

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [filter])

  const fetchContacts = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {}
      const response = await contactsAPI.getAll(params)
      setContacts(response.data.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await contactsAPI.update(id, { status })
      fetchContacts()
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, status })
      }
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return
    try {
      await contactsAPI.delete(id)
      setContacts(contacts.filter(c => c._id !== id))
      if (selectedContact?._id === id) {
        setSelectedContact(null)
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-600'
      case 'read': return 'bg-yellow-500/10 text-yellow-600'
      case 'replied': return 'bg-green-500/10 text-green-600'
      case 'archived': return 'bg-gray-500/10 text-gray-600'
      default: return 'bg-gray-500/10 text-gray-600'
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
      <div>
        <h1 className="text-3xl font-bold">Client Inquiries</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Manage messages from your contact form
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {['all', 'new', 'read', 'replied', 'archived'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto">
          {contacts.map((contact) => (
            <Card
              key={contact._id}
              className={`cursor-pointer transition-colors ${
                selectedContact?._id === contact._id ? 'ring-2 ring-[var(--primary)]' : ''
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">{contact.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-2 flex items-center gap-1">
                  <Clock size={12} />
                  {formatDateTime(contact.createdAt)}
                </p>
              </CardContent>
            </Card>
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-8 text-[var(--muted-foreground)]">
              No inquiries found
            </div>
          )}
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedContact.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {selectedContact.email}
                      </span>
                      {selectedContact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={14} />
                          {selectedContact.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Subject</h4>
                  <p className="capitalize">{selectedContact.subject}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Message</h4>
                  <div className="p-4 rounded-lg bg-[var(--muted)]">
                    <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                  {selectedContact.status === 'new' && (
                    <Button size="sm" onClick={() => updateStatus(selectedContact._id, 'read')}>
                      <CheckCircle size={16} />
                      Mark as Read
                    </Button>
                  )}
                  {selectedContact.status !== 'replied' && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(selectedContact._id, 'replied')}>
                      <MessageSquare size={16} />
                      Mark as Replied
                    </Button>
                  )}
                  {selectedContact.status !== 'archived' && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(selectedContact._id, 'archived')}>
                      <Archive size={16} />
                      Archive
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => deleteContact(selectedContact._id)}>
                    <Trash2 size={16} className="text-[var(--destructive)]" />
                  </Button>
                </div>

                <div className="text-xs text-[var(--muted-foreground)]">
                  Received: {formatDateTime(selectedContact.createdAt)}
                  {selectedContact.repliedAt && (
                    <span className="ml-4">Replied: {formatDateTime(selectedContact.repliedAt)}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-64">
              <p className="text-[var(--muted-foreground)]">Select an inquiry to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
