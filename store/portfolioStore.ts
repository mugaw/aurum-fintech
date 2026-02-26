import { create } from 'zustand'
import { Portfolio, Asset } from '@/types'

interface PortfolioState {
 portfolio: Portfolio | null
 selectedTimeRange: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'
 setTimeRange: (range: PortfolioState['selectedTimeRange']) => void
 refreshPortfolio: () => Promise<void>
}

const generateMockPortfolio = (): Portfolio => {
 const assets: Asset[] = [
   { id: '1', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', price: 185.92, change24h: 2.45, changePercentage24h: 1.34, holdings: 150, value: 27888, allocation: 25 },
   { id: '2', symbol: 'BTC', name: 'Bitcoin', type: 'crypto', price: 52340.00, change24h: -1240.50, changePercentage24h: -2.32, holdings: 0.45, value: 23553, allocation: 21 },
   { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', price: 142.65, change24h: 3.21, changePercentage24h: 2.30, holdings: 120, value: 17118, allocation: 15 },
   { id: '4', symbol: 'ETH', name: 'Ethereum', type: 'crypto', price: 2890.45, change24h: 45.20, changePercentage24h: 1.59, holdings: 4.2, value: 12140, allocation: 11 },
   { id: '5', symbol: 'RE-001', name: 'Manhattan Penthouse', type: 'realestate', price: 2500000, change24h: 12500, changePercentage24h: 0.50, holdings: 0.004, value: 10000, allocation: 9 },
   { id: '6', symbol: 'MSFT', name: 'Microsoft Corp.', type: 'stock', price: 378.91, change24h: -5.43, changePercentage24h: -1.41, holdings: 20, value: 7578, allocation: 7 },
   { id: '7', symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', price: 201.35, change24h: 8.92, changePercentage24h: 4.64, holdings: 35, value: 7047, allocation: 6 },
   { id: '8', symbol: 'GOLD', name: 'Gold ETF', type: 'commodity', price: 189.45, change24h: 1.23, changePercentage24h: 0.65, holdings: 30, value: 5684, allocation: 5 },
 ]
 
 const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
 
 const history = Array.from({ length: 30 }, (_, i) => {
   const date = new Date()
   date.setDate(date.getDate() - (29 - i))
   const baseValue = 100000
   const randomChange = (Math.random() - 0.5) * 0.02
   const trend = i * 0.001
   return {
     date: date.toISOString().split('T')[0],
     value: baseValue * (1 + trend + randomChange * i),
   }
 })
 
 const currentValue = history[history.length - 1].value
 const previousValue = history[history.length - 2].value
 const change24h = currentValue - previousValue
 const changePercentage24h = (change24h / previousValue) * 100
 
 return {
   totalValue: currentValue,
   change24h,
   changePercentage24h,
   assets,
   history,
 }
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
 portfolio: generateMockPortfolio(),
 selectedTimeRange: '1M',
 
 setTimeRange: (range) => set({ selectedTimeRange: range }),
 
 refreshPortfolio: async () => {
   await new Promise(resolve => setTimeout(resolve, 500))
   set({ portfolio: generateMockPortfolio() })
 },
}))
