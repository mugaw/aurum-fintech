'use client'

import { Header } from '@/components/layout/Header'
import { PortfolioChart } from '@/components/charts/PortfolioChart'
import { AllocationChart } from '@/components/charts/AllocationChart'
import { StatCard } from '@/components/ui/StatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { usePortfolioStore } from '@/store/portfolioStore'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, Bitcoin, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function DashboardPage() {
  const portfolio = usePortfolioStore((s) => s.portfolio)

  if (!portfolio) return null

  const bestPerformer = portfolio.assets.reduce((best, asset) =>
    asset.changePercentage24h > best.changePercentage24h ? asset : best
  )

  const cryptoAllocation = portfolio.assets
    .filter((a) => a.type === 'crypto')
    .reduce((sum, a) => sum + a.allocation, 0)

  return (
    <div>
      <Header title="Dashboard" subtitle="Welcome back — here's your portfolio overview" />

      {/* Portfolio Value Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel-strong p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative z-10">
          <p className="text-white/40 text-sm mb-2">Total Portfolio Value</p>
          <div className="flex items-end gap-4 mb-2">
            <h2 className="text-5xl font-bold text-white">{formatCurrency(portfolio.totalValue)}</h2>
            <div className={`flex items-center gap-1 pb-2 ${portfolio.changePercentage24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {portfolio.changePercentage24h >= 0 ? (
                <ArrowUpRight className="w-5 h-5" />
              ) : (
                <ArrowDownRight className="w-5 h-5" />
              )}
              <span className="text-lg font-semibold">{formatPercentage(portfolio.changePercentage24h)}</span>
            </div>
          </div>
          <p className="text-white/30 text-sm">
            {portfolio.changePercentage24h >= 0 ? '+' : ''}{formatCurrency(portfolio.change24h)} today
          </p>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Assets"
          value={portfolio.assets.length.toString()}
          change="Diversified portfolio"
          changeType="neutral"
          icon={Wallet}
          delay={0.1}
        />
        <StatCard
          label="Best Performer"
          value={bestPerformer.symbol}
          change={formatPercentage(bestPerformer.changePercentage24h)}
          changeType="positive"
          icon={TrendingUp}
          delay={0.2}
        />
        <StatCard
          label="Crypto Allocation"
          value={`${cryptoAllocation}%`}
          change="BTC + ETH"
          changeType="neutral"
          icon={Bitcoin}
          delay={0.3}
        />
        <StatCard
          label="Monthly Return"
          value={formatPercentage(2.4)}
          change="vs 1.8% benchmark"
          changeType="positive"
          icon={BarChart3}
          delay={0.4}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>
        <AllocationChart />
      </div>

      {/* Holdings Table */}
      <GlassCard hover={false}>
        <h3 className="text-lg font-semibold text-white mb-4">Top Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-white/30 uppercase tracking-wider border-b border-white/5">
                <th className="pb-3 pr-4">Asset</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3 pr-4">24h Change</th>
                <th className="pb-3 pr-4">Holdings</th>
                <th className="pb-3 pr-4">Value</th>
                <th className="pb-3">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.assets.map((asset, i) => (
                <motion.tr
                  key={asset.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-gold-400">{asset.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{asset.name}</p>
                        <p className="text-xs text-white/40">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-sm text-white">{formatCurrency(asset.price)}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant={asset.changePercentage24h >= 0 ? 'success' : 'danger'}>
                      {formatPercentage(asset.changePercentage24h)}
                    </Badge>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-sm text-white/70">{asset.holdings}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-sm font-medium text-white">{formatCurrency(asset.value)}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-500 rounded-full"
                          style={{ width: `${asset.allocation}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/40">{asset.allocation}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
