'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { usePortfolioStore } from '@/store/portfolioStore'
import { formatCurrency } from '@/lib/utils'

const COLORS = ['#d4902a', '#e3a947', '#edc67a', '#f6e0b3', '#b87620', '#945c1d', '#7a4d1e', '#653f1b']

const typeLabels: Record<string, string> = {
  stock: 'Stocks',
  crypto: 'Crypto',
  realestate: 'Real Estate',
  commodity: 'Commodities',
}

export function AllocationChart() {
  const portfolio = usePortfolioStore((s) => s.portfolio)

  if (!portfolio) return null

  const allocationByType = portfolio.assets.reduce((acc, asset) => {
    const type = typeLabels[asset.type] || asset.type
    acc[type] = (acc[type] || 0) + asset.value
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(allocationByType).map(([name, value]) => ({
    name,
    value,
  }))

  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-white mb-2">Asset Allocation</h3>
      <p className="text-sm text-white/40 mb-6">Portfolio distribution by asset type</p>

      <div className="flex items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(10,10,11,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [formatCurrency(value), '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-white/70">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/40">{((item.value / total) * 100).toFixed(1)}%</span>
                <span className="text-white font-medium">{formatCurrency(item.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
