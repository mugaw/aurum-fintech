'use client'

import { useEffect } from 'react'
import { useMarketStore } from '@/store/marketStore'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

export function MarketTicker() {
  const { tickers, updateTickers } = useMarketStore()

  useEffect(() => {
    const interval = setInterval(updateTickers, 3000)
    return () => clearInterval(interval)
  }, [updateTickers])

  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dark-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark-950 to-transparent z-10" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 py-2"
      >
        {[...tickers, ...tickers].map((ticker, i) => (
          <div key={`${ticker.symbol}-${i}`} className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-semibold text-white/80">{ticker.symbol}</span>
            <span className="text-sm text-white/60">${ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={cn(
              'flex items-center gap-0.5 text-xs font-medium',
              ticker.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
            )}>
              {ticker.changePercent >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {ticker.changePercent >= 0 ? '+' : ''}{ticker.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
