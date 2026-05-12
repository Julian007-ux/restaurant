'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import type { Settings } from '@/lib/types'

interface FooterProps {
  settings: Settings | null
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold text-primary">
                {settings?.site_name || 'Prime Bite'}
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Experience the art of fine dining where every dish tells a story and
              every meal becomes a cherished memory.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#menu"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#reservation"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Reservations
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                {settings?.contact_address || '123 Gourmet Avenue, New York, NY 10001'}
              </li>
              <li>
                <a
                  href={`tel:${settings?.contact_phone || '+1 (555) 123-4567'}`}
                  className="hover:text-primary transition-colors"
                >
                  {settings?.contact_phone || '+1 (555) 123-4567'}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings?.contact_email || 'info@primebite.com'}`}
                  className="hover:text-primary transition-colors"
                >
                  {settings?.contact_email || 'info@primebite.com'}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} {settings?.site_name || 'Prime Bite'}. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
