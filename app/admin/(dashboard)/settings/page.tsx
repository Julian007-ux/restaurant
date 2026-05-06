'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Check } from 'lucide-react'
import type { Settings } from '@/lib/types'

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [formData, setFormData] = useState({
    site_name: '',
    hero_title: '',
    hero_description: '',
    about_story: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    opening_hours: '',
  })

  const supabase = createClient()

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('settings').select('*').single()
      if (data) {
        setSettings(data)
        setFormData({
          site_name: data.site_name || '',
          hero_title: data.hero_title || '',
          hero_description: data.hero_description || '',
          about_story: data.about_story || '',
          contact_email: data.contact_email || '',
          contact_phone: data.contact_phone || '',
          contact_address: data.contact_address || '',
          opening_hours: data.opening_hours || '',
        })
      }
      setIsLoading(false)
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    await supabase
      .from('settings')
      .update({
        site_name: formData.site_name,
        hero_title: formData.hero_title,
        hero_description: formData.hero_description,
        about_story: formData.about_story,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        contact_address: formData.contact_address,
        opening_hours: formData.opening_hours,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1)

    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your restaurant website
          </p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-2 text-green-400">
            <Check className="w-5 h-5" />
            <span>Settings saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif text-foreground">General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">Restaurant Name</Label>
              <Input
                id="site_name"
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
                className="bg-secondary border-border"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif text-foreground">Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero_title">Hero Title</Label>
              <Input
                id="hero_title"
                name="hero_title"
                value={formData.hero_title}
                onChange={handleChange}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_description">Hero Description</Label>
              <textarea
                id="hero_description"
                name="hero_description"
                rows={2}
                value={formData.hero_description}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-secondary border border-border focus:border-primary focus:outline-none resize-none text-foreground"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif text-foreground">About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="about_story">Our Story</Label>
              <textarea
                id="about_story"
                name="about_story"
                rows={4}
                value={formData.about_story}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-secondary border border-border focus:border-primary focus:outline-none resize-none text-foreground"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif text-foreground">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_address">Address</Label>
              <Input
                id="contact_address"
                name="contact_address"
                value={formData.contact_address}
                onChange={handleChange}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opening_hours">Opening Hours</Label>
              <Input
                id="opening_hours"
                name="opening_hours"
                value={formData.opening_hours}
                onChange={handleChange}
                className="bg-secondary border-border"
                placeholder="e.g., Mon-Thu: 5PM-10PM, Fri-Sat: 5PM-11PM"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
