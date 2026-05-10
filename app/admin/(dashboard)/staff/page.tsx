'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Staff } from '@/lib/types'

export default function StaffAdminPage() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    description: '',
  })

  const supabase = createClient()

  const fetchStaff = async () => {
    const { data } = await supabase
      .from('staff')
      .select('*')
      .order('created_at', { ascending: true })
    setStaff(data || [])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  const resetForm = () => {
    setFormData({ name: '', role: '', image: '', description: '' })
    setEditingStaff(null)
  }

  const openEditDialog = (member: Staff) => {
    setEditingStaff(member)
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image || '',
      description: member.description || '',
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name: formData.name,
      role: formData.role,
      image: formData.image || null,
      description: formData.description || null,
    }

    if (editingStaff) {
      await supabase.from('staff').update(payload).eq('id', editingStaff.id)
    } else {
      await supabase.from('staff').insert(payload)
    }

    setIsDialogOpen(false)
    resetForm()
    fetchStaff()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      await supabase.from('staff').delete().eq('id', id)
      fetchStaff()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Staff</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-serif text-foreground">
                {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="bg-secondary border-border"
                  placeholder="e.g., Executive Chef"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Photo URL</Label>
                <Input
                  id="image"
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image: e.target.value }))
                  }
                  className="bg-secondary border-border"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Bio</Label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border focus:border-primary focus:outline-none resize-none text-foreground"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground">
                  {editingStaff ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : staff.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">
            No staff members yet. Add your first team member!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <div
              key={member.id}
              className="bg-card border border-border rounded-lg overflow-hidden group"
            >
              <div className="relative h-48">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-4xl font-serif text-muted-foreground">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm uppercase tracking-wider">
                  {member.role}
                </p>
                {member.description && (
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                    {member.description}
                  </p>
                )}
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(member)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
