'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Send, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

const timeSlots = [
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
]

export function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    special_requests: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase.from('reservations').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        special_requests: formData.special_requests || null,
        status: 'pending',
      })

      if (insertError) throw insertError

      setIsSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        special_requests: '',
      })

      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError('Failed to submit reservation. Please try again.')
      console.error('[v0] Reservation error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Get tomorrow's date as minimum
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <section id="reservation" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Reserve
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Book Your Table
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Reserve your table today
            and let us take care of the rest.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/10 border border-primary/30 rounded-lg p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                Reservation Submitted!
              </h3>
              <p className="text-muted-foreground">
                Thank you for your reservation. We&apos;ll confirm your booking via
                email shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Date *
                  </label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    min={minDate}
                    value={formData.date}
                    onChange={handleChange}
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    <Clock className="inline w-4 h-4 mr-1" />
                    Time *
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    <Users className="inline w-4 h-4 mr-1" />
                    Guests *
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="special_requests"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Special Requests
                </label>
                <textarea
                  id="special_requests"
                  name="special_requests"
                  rows={3}
                  value={formData.special_requests}
                  onChange={handleChange}
                  placeholder="Dietary restrictions, special occasions, seating preferences..."
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Reserve Table
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
