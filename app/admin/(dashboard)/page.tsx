import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UtensilsCrossed, Image, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

async function getDashboardStats() {
  const supabase = await createClient()

  const [menuResult, galleryResult, staffResult, reservationsResult] =
    await Promise.all([
      supabase.from('menu_items').select('id', { count: 'exact', head: true }),
      supabase.from('gallery').select('id', { count: 'exact', head: true }),
      supabase.from('staff').select('id', { count: 'exact', head: true }),
      supabase
        .from('reservations')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending'),
    ])

  return {
    menuCount: menuResult.count || 0,
    galleryCount: galleryResult.count || 0,
    staffCount: staffResult.count || 0,
    pendingReservations: reservationsResult.count || 0,
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const cards = [
    {
      title: 'Menu Items',
      value: stats.menuCount,
      icon: UtensilsCrossed,
      href: '/admin/menu',
      description: 'Total menu items',
    },
    {
      title: 'Gallery Images',
      value: stats.galleryCount,
      icon: Image,
      href: '/admin/gallery',
      description: 'Images in gallery',
    },
    {
      title: 'Staff Members',
      value: stats.staffCount,
      icon: Users,
      href: '/admin/staff',
      description: 'Team members',
    },
    {
      title: 'Pending Reservations',
      value: stats.pendingReservations,
      icon: Calendar,
      href: '/admin/reservations',
      description: 'Awaiting confirmation',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s an overview of your restaurant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-foreground">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/admin/menu"
              className="block p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground">Add Menu Item</span>
              <span className="block text-sm text-muted-foreground">
                Create a new dish for your menu
              </span>
            </Link>
            <Link
              href="/admin/gallery"
              className="block p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground">Upload to Gallery</span>
              <span className="block text-sm text-muted-foreground">
                Add new photos to the gallery
              </span>
            </Link>
            <Link
              href="/admin/reservations"
              className="block p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground">Manage Reservations</span>
              <span className="block text-sm text-muted-foreground">
                View and confirm pending bookings
              </span>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-foreground">
              Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground text-sm">
                Add high-quality images to your menu items for better customer
                engagement.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground text-sm">
                Keep your gallery updated with recent photos of dishes and
                restaurant ambiance.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground text-sm">
                Respond to reservations promptly to ensure a great customer
                experience.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
