'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  delay?: number
}

export function StatCard({ label, value, change, changeType = 'neutral', icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-panel p-5 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/50">{label}</span>
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-gold-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        {change && (
          <div className="flex items-center gap-1">
            {changeType === 'positive' ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            ) : changeType === 'negative' ? (
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            ) : null}
            <span
              className={cn(
                'text-sm font-medium',
                changeType === 'positive' && 'text-emerald-400',
                changeType === 'negative' && 'text-red-400',
                changeType === 'neutral' && 'text-white/50'
              )}
            >
              {change}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
