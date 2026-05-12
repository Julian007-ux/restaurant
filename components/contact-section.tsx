'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { Settings } from '@/lib/types'

interface ContactSectionProps {
  settings: Settings | null
}

export function ContactSection({ settings }: ContactSectionProps) {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Get in Touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out for inquiries, private events,
            or just to say hello.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              Location
            </h3>
            <a href={`https://www.google.com/maps/search/?api=1&query=restaurante+prime bite+luanda`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              {settings?.contact_address || '123 Gourmet Avenue, New York, NY 10001'}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              Phone
            </h3>
            <p className="text-muted-foreground text-sm">
              <a
                href={`tel:${settings?.contact_phone || '+1 (555) 123-4567'}`}
                className="hover:text-primary transition-colors"
              >
                {settings?.contact_phone || '+1 (555) 123-4567'}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              Email
            </h3>
            <p className="text-muted-foreground text-sm">
              <a
                href={`mailto:${settings?.contact_email || 'info@primebite.com'}`}
                className="hover:text-primary transition-colors"
              >
                {settings?.contact_email || 'info@primebite.com'}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              Hours
            </h3>
            <p className="text-muted-foreground text-sm whitespace-pre-line">
              {settings?.opening_hours?.replace(/, /g, '\n') ||
                'Mon-Thu: 5PM-10PM\nFri-Sat: 5PM-11PM\nSun: 4PM-9PM'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
