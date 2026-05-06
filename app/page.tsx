import { createClient } from '@/lib/supabase/server'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { MenuSection } from '@/components/menu-section'
import { AboutSection } from '@/components/about-section'
import { GallerySection } from '@/components/gallery-section'
import { ReservationSection } from '@/components/reservation-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import type { Settings, MenuItem, Staff, GalleryImage } from '@/lib/types'

export const revalidate = 60 // Revalidate every 60 seconds

async function getSettings(): Promise<Settings | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('*').single()
  return data
}

async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('menu_items')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true })
  return data || []
}

async function getStaff(): Promise<Staff[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('staff')
    .select('*')
    .order('created_at', { ascending: true })
  return data || []
}

async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function HomePage() {
  const [settings, menuItems, staff, galleryImages] = await Promise.all([
    getSettings(),
    getMenuItems(),
    getStaff(),
    getGalleryImages(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection settings={settings} />
      <MenuSection menuItems={menuItems} />
      <AboutSection settings={settings} staff={staff} />
      <GallerySection images={galleryImages} />
      <ReservationSection />
      <ContactSection settings={settings} />
      <Footer settings={settings} />
    </main>
  )
}
