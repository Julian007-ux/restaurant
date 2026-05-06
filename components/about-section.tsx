'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Settings, Staff } from '@/lib/types'

interface AboutSectionProps {
  settings: Settings | null
  staff: Staff[]
}

export function AboutSection({ settings, staff }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/about-restaurant.jpg"
                alt="Our Restaurant Interior"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-lg -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              A Passion for Excellence
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {settings?.about_story ||
                  'Founded in 2010, The Golden Fork has been serving exceptional cuisine to discerning guests. Our commitment to quality ingredients and masterful preparation has made us a destination for food lovers.'}
              </p>
              <p>
                Every dish that leaves our kitchen is a testament to our dedication to
                the culinary arts. We source only the finest ingredients, work with
                local farmers, and treat each plate as a canvas for artistic
                expression.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <span className="block font-serif text-4xl font-bold text-primary">
                  15+
                </span>
                <span className="text-muted-foreground text-sm">Years Experience</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-4xl font-bold text-primary">
                  50+
                </span>
                <span className="text-muted-foreground text-sm">Signature Dishes</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-4xl font-bold text-primary">
                  5
                </span>
                <span className="text-muted-foreground text-sm">Master Chefs</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        {staff.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
                Meet the Team
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                Our Culinary Artists
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group text-center"
                >
                  <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <span className="text-4xl font-serif text-muted-foreground">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  {member.description && (
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {member.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
