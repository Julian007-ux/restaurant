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
import { Plus, Trash2 } from 'lucide-react'
import type { GalleryImage } from '@/lib/types'

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
  })

  const supabase = createClient()

  const fetchImages = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    setImages(data || [])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const resetForm = () => {
    setFormData({ image_url: '', title: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await supabase.from('gallery').insert({
      image_url: formData.image_url,
      title: formData.title || null,
    })

    setIsDialogOpen(false)
    resetForm()
    fetchImages()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      await supabase.from('gallery').delete().eq('id', id)
      fetchImages()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Manage your restaurant&apos;s image gallery
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
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-serif text-foreground">
                Add Gallery Image
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  type="text"
                  required
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                  }
                  className="bg-secondary border-border"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title (optional)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="bg-secondary border-border"
                  placeholder="e.g., Our Signature Dish"
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
                  Add Image
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : images.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">
            No images in the gallery yet. Add your first image!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group bg-card border border-border rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={image.image_url}
                  alt={image.title || 'Gallery image'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
              {image.title && (
                <div className="p-3 border-t border-border">
                  <p className="text-sm text-foreground truncate">{image.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
