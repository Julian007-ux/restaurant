'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '@/lib/types'

interface GallerySectionProps {
  images: GalleryImage[]
}

export function GallerySection({ images }: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goNext = () => {
    if (selectedIndex !== null && images.length > 0) {
      setSelectedIndex((selectedIndex + 1) % images.length)
    }
  }

  const goPrev = () => {
    if (selectedIndex !== null && images.length > 0) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    }
  }

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Visual Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our world of culinary artistry and elegant ambiance.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openLightbox(index)}
                className={`relative cursor-pointer overflow-hidden rounded-lg group ${
                  index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div
                  className={`relative ${
                    index % 5 === 0 ? 'h-64 md:h-full min-h-[400px]' : 'h-48 md:h-64'
                  }`}
                >
                  <Image
                    src={image.image_url}
                    alt={image.title || 'Gallery image'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300" />
                  {image.title && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-foreground font-serif text-lg text-center px-4">
                        {image.title}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground text-lg">
              Our gallery is being curated.
            </p>
            <p className="text-muted-foreground/70 text-sm mt-2">
              Check back soon for beautiful images of our dishes and restaurant.
            </p>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && images[selectedIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goPrev()
                    }}
                    className="absolute left-6 text-foreground hover:text-primary transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={48} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goNext()
                    }}
                    className="absolute right-6 text-foreground hover:text-primary transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={48} />
                  </button>
                </>
              )}

              {/* Image */}
              <motion.div
                key={selectedIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl max-h-[80vh] w-full h-full m-6"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[selectedIndex].image_url}
                  alt={images[selectedIndex].title || 'Gallery image'}
                  fill
                  className="object-contain"
                />
                {images[selectedIndex].title && (
                  <div className="absolute bottom-0 left-0 right-0 text-center py-4 bg-gradient-to-t from-background to-transparent">
                    <span className="text-foreground font-serif text-xl">
                      {images[selectedIndex].title}
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
