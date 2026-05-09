'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsappFloat() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 left-6 z-30 group flex items-center gap-2"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute left-full ml-3 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 pointer-events-none">
        Chat with us!
      </span>
      {/* Button */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600/90 text-white shadow-lg shadow-green-600/20 hover:bg-green-500 hover:scale-110 hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300">
        <MessageCircle className="h-5 w-5" />
      </div>
    </a>
  )
}
