'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
 children: React.ReactNode
 className?: string
 hover?: boolean
 delay?: number
}

export function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
 return (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5, delay }}
     whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
     className={cn(
       'glass-panel p-6 relative overflow-hidden group',
       className
     )}
   >
     <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
     <div className="relative z-10">{children}</div>
   </motion.div>
 )
}
