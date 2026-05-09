'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { cn } from '@/lib/utils'

const categories = ['All', 'Weight Room', 'Cardio', 'Yoga', 'Boxing', 'CrossFit', 'Recovery']

const galleryItems = [
  { src: '/images/gallery1.png', category: 'Weight Room', span: 'md:row-span-2' },
  { src: '/images/gallery2.png', category: 'Cardio', span: '' },
  { src: '/images/gallery3.png', category: 'Yoga', span: '' },
  { src: '/images/gallery4.png', category: 'Boxing', span: 'md:row-span-2' },
  { src: '/images/gallery5.png', category: 'CrossFit', span: '' },
  { src: '/images/gallery6.png', category: 'Recovery', span: '' },
]

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  const goToPrev = useCallback(() => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
    )
  }, [])

  const goToNext = useCallback(() => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev + 1) % galleryItems.length : null
    )
  }, [])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, goToPrev, goToNext])

  const handleOpenLightbox = (idx: number) => {
    setSelectedIdx(idx)
    setLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setSelectedIdx(null)
    setLightboxOpen(false)
  }

  return (
    <section id="gallery" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden">
      {/* Decorative section number */}
      <span className="absolute top-8 left-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">06</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">06 — Gallery</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            THE AVENGER <span className="text-[#e8b923]">EXPERIENCE</span>
          </h2>
          <div className="mx-auto mt-4 flex items-center gap-2">
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="size-1.5 rotate-45 bg-[#d4a017]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#e8b923] to-[#d4a017]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Step inside. Feel the energy.
          </p>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-[#d4a017] text-black shadow-lg shadow-[#d4a017]/25'
                    : 'bg-white/[0.05] text-neutral-400 border border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // Find original index for the lightbox
              const originalIdx = galleryItems.indexOf(item)
              return (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className={item.span}
                >
                  <button
                    onClick={() => handleOpenLightbox(originalIdx)}
                    className="group relative w-full h-full rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                    aria-label={`View ${item.category} photo`}
                  >
                    {/* Image */}
                    <img
                      src={item.src}
                      alt={item.category}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Amber overlay on hover with view icon */}
                    <div className="absolute inset-0 bg-[#d4a017]/0 group-hover:bg-[#d4a017]/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-white font-bold text-sm drop-shadow-lg">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <button className="text-sm font-semibold text-[#d4a017] hover:text-[#e8b923] transition-colors duration-300 underline underline-offset-4 decoration-[#d4a017]/30 hover:decoration-[#e8b923]/50">
              View All Photos →
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxOpen}
        onOpenChange={(open) => !open && handleCloseLightbox()}
      >
        <DialogContent className="bg-[#0a0a0a]/80 border-white/10 max-w-4xl p-0 overflow-hidden backdrop-blur-xl">
          <DialogTitle className="sr-only">
            {selectedIdx !== null ? galleryItems[selectedIdx].category : 'Gallery image'}
          </DialogTitle>
          {/* Image counter */}
          {selectedIdx !== null && (
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/80">
                {selectedIdx + 1} / {galleryItems.length}
              </span>
            </div>
          )}
          {/* Navigation arrows */}
          {selectedIdx !== null && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <AnimatePresence mode="wait">
            {selectedIdx !== null && (
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative"
              >
                <img
                  src={galleryItems[selectedIdx].src}
                  alt={galleryItems[selectedIdx].category}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-[#e8b923] font-semibold text-lg">
                    {galleryItems[selectedIdx].category}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  )
}
