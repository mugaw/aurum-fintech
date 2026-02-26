'use client'

import { useAuthStore } from '@/store/authStore'
import { MarketTicker } from './MarketTicker'
import { Search, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const user = useAuthStore((s) => s.user)

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      {/* Market Ticker */}
      <div className="glass-panel px-4 py-2 mb-6 rounded-xl">
        <MarketTicker />
      </div>

      {/* Title Row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-white/40 text-sm mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search..."
              className="input-luxury pl-10 w-64 text-sm py-2.5"
            />
          </div>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-gold-500/20">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </motion.header>
  )
}
