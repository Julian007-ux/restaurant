export interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  image_1: string | null
  image_2: string | null
  category: string
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  image_url: string
  title: string | null
  created_at: string
}

export interface Staff {
  id: string
  name: string
  role: string
  image: string | null
  description: string | null
  created_at: string
}

export interface Settings {
  id: number
  site_name: string
  primary_color: string
  secondary_color: string
  hero_title: string
  hero_description: string
  contact_email: string
  contact_phone: string
  contact_address: string
  about_story: string
  opening_hours: string
  created_at: string
  updated_at: string
}

export interface Reservation {
  id: string
  name: string
  email: string
  phone: string | null
  date: string
  time: string
  guests: number
  special_requests: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}
