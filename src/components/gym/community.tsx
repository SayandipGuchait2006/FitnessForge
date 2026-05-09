'use client'

import { motion } from 'framer-motion'
import { Heart, Instagram, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

interface CommunityPost {
  id: number
  gradient: string
  likes: number
  caption: string
}

const communityPosts: CommunityPost[] = [
  {
    id: 1,
    gradient: 'from-amber-600 via-yellow-500 to-orange-500',
    likes: 247,
    caption: 'Morning grind never stops 💪 Start your day with purpose at Avenger',
  },
  {
    id: 2,
    gradient: 'from-yellow-500 via-amber-400 to-orange-400',
    likes: 189,
    caption: 'New PR alert! 🏋️ Our member Sarah hit her first 100kg squat',
  },
  {
    id: 3,
    gradient: 'from-orange-500 via-amber-500 to-yellow-600',
    likes: 312,
    caption: 'Group HIIT session energy was unmatched today 🔥',
  },
  {
    id: 4,
    gradient: 'from-amber-500 via-orange-400 to-red-400',
    likes: 156,
    caption: 'Transformation Tuesday — 6 months of dedication pays off ✨',
  },
  {
    id: 5,
    gradient: 'from-yellow-600 via-amber-500 to-orange-300',
    likes: 203,
    caption: 'Our boxing class is the best stress buster in the city 🥊',
  },
  {
    id: 6,
    gradient: 'from-orange-400 via-amber-600 to-yellow-500',
    likes: 278,
    caption: 'Weekend warriors unite! Saturday session was packed 💯',
  },
]

export function Community() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden" id="community">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">15</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">15 — Community</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            JOIN OUR <span className="text-[#e8b923]">TRIBE</span>
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
            Follow <span className="text-[#e8b923] font-semibold">@avengerfitness</span> for daily motivation, member spotlights, and gym culture.
          </p>
        </ScrollReveal>

        {/* Community Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {communityPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/[0.06] hover:border-[#d4a017]/30 transition-all duration-300"
              >
                {/* Gradient background (placeholder image) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Pattern overlay for visual interest */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />

                {/* Default overlay: likes + Instagram icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/10">
                  <div className="flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-300">
                    <Heart className="h-5 w-5 text-white fill-white" />
                    <span className="text-white font-bold text-sm">{post.likes}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Instagram className="h-4 w-4 text-white/80" />
                  </div>
                </div>

                {/* Hover overlay: caption slides up */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-[#e8b923] fill-[#e8b923]" />
                    <span className="text-white font-bold text-sm">{post.likes}</span>
                  </div>
                  <p className="text-gray-200 text-xs leading-relaxed line-clamp-3">
                    {post.caption}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Follow CTA */}
        <ScrollReveal delay={0.5}>
          <div className="mt-10 text-center">
            <Button
              asChild
              className="bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-300 group"
            >
              <a href="https://instagram.com/avengerfitness" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4 mr-2" />
                Follow @avengerfitness
                <ExternalLink className="h-3.5 w-3.5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
            <p className="text-xs text-gray-600 mt-3">
              12.5K followers • 850+ posts
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
