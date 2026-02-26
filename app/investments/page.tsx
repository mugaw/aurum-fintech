'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { usePortfolioStore } from '@/store/portfolioStore'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react'

const filterTabs = ['All', 'Stocks', 'Crypto', 'Real Estate', 'Commodities'] as const
type FilterTab = typeof filterTabs[number]

const typeMap: Record<FilterTab, string | null> = {
  'All': null,
  'Stocks': 'stock',
  'Crypto': 'crypto',
  'Real Estate': 'realestate',
  'Commodities': 'commodity',
}

const badgeVariantMap: Record<string, 'info' | 'warning' | 'gold' | 'success'> = {
  stock: 'info',
  crypto: 'warning',
  realestate: 'gold',
  commodity: 'success',
}

export default function InvestmentsPage() {
  const portfolio = usePortfolioStore((s) => s.portfolio)
  const [activeTab, setActiveTab] = useState<FilterTab>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<'value' | 'change' | 'name'>('value')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  if (!portfolio) return null

  const filteredAssets = portfolio.assets
    .filter((a) => {
      const typeMatch = !typeMap[activeTab] || a.type === typeMap[activeTab]
      const searchMatch = !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      return typeMatch && searchMatch
    })
    .sort((a, b) => {
      let cmp = 0
      if (sortField === 'value') cmp = a.value - b.value
      if (sortField === 'change') cmp = a.changePercentage24h - b.changePercentage24h
      if (sortField === 'name') cmp = a.name.localeCompare(b.name)
      return sortDir === 'desc' ? -cmp : cmp
    })

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  return (
    <div>
      <Header title="Investments" subtitle="Manage and explore your asset portfolio" />

      {/* Filter Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                activeTab === tab
                  ? 'bg-gold-500/20 text-gold-400'
                  : 'text-white/40 hover:text-white/70'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-luxury pl-10 w-64 text-sm py-2.5"
          />
        </div>
      </div>

      {/* Assets Table */}
      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-white/30 uppercase tracking-wider border-b border-white/5">
                <th className="pb-3 pr-4">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-white/60 transition-colors">
                    Asset <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3 pr-4">
                  <button onClick={() => handleSort('change')} className="flex items-center gap-1 hover:text-white/60 transition-colors">
                    24h Change <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="pb-3 pr-4">Holdings</th>
                <th className="pb-3 pr-4">
                  <button onClick={() => handleSort('value')} className="flex items-center gap-1 hover:text-white/60 transition-colors">
                    Value <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredAssets.map((asset, i) => (
                  <motion.tr
                    key={asset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.03 * i }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-gold-400">{asset.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{asset.name}</p>
                          <p className="text-xs text-white/40">{asset.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge variant={badgeVariantMap[asset.type] || 'default'}>
                        {asset.type === 'realestate' ? 'Real Estate' : asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-sm text-white">{formatCurrency(asset.price)}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-1.5">
                        {asset.changePercentage24h >= 0 ? (
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                        )}
                        <span className={cn(
                          'text-sm font-medium',
                          asset.changePercentage24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                        )}>
                          {formatPercentage(asset.changePercentage24h)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-sm text-white/70">{asset.holdings}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-sm font-medium text-white">{formatCurrency(asset.value)}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm">Buy</Button>
                        <Button variant="secondary" size="sm">Sell</Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12 text-white/30">
            No assets found matching your criteria.
          </div>
        )}
      </GlassCard>
    </div>
  )
}
