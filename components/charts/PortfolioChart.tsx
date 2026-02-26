'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { usePortfolioStore } from '@/store/portfolioStore'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'

const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const

export function PortfolioChart() {
  const { portfolio, selectedTimeRange, setTimeRange } = usePortfolioStore()

  if (!portfolio) return null

  const data = portfolio.history.map((point) => ({
    date: point.date,
    value: point.value,
  }))

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
          <p className="text-sm text-white/40 mt-1">Track your portfolio value over time</p>
        </div>
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200',
                selectedTimeRange === range
                  ? 'bg-gold-500/20 text-gold-400'
                  : 'text-white/40 hover:text-white/70'
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4902a" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#d4902a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
              tickLine={false}
              tickFormatter={(value) => {
                const d = new Date(value)
                return `${d.getMonth() + 1}/${d.getDate()}`
              }}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              width={55}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(10,10,11,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px 16px',
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              formatter={(value: number) => [formatCurrency(value), 'Value']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#d4902a"
              strokeWidth={2}
              fill="url(#goldGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
