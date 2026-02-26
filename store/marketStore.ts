import { create } from 'zustand'
import { MarketTicker } from '@/types'

interface MarketState {
 tickers: MarketTicker[]
 lastUpdate: Date
 updateTickers: () => void
}

const initialTickers: MarketTicker[] = [
 { symbol: 'S&P 500', price: 4892.95, change: 12.45, changePercent: 0.25 },
 { symbol: 'NASDAQ', price: 15455.36, change: -45.23, changePercent: -0.29 },
 { symbol: 'BTC/USD', price: 52340.00, change: -1240.50, changePercent: -2.32 },
 { symbol: 'ETH/USD', price: 2890.45, change: 45.20, changePercent: 1.59 },
 { symbol: 'GOLD', price: 2015.30, change: 8.45, changePercent: 0.42 },
 { symbol: 'EUR/USD', price: 1.0845, change: -0.0012, changePercent: -0.11 },
 { symbol: 'AAPL', price: 185.92, change: 2.45, changePercent: 1.34 },
 { symbol: 'TSLA', price: 201.35, change: 8.92, changePercent: 4.64 },
]

export const useMarketStore = create<MarketState>((set) => ({
 tickers: initialTickers,
 lastUpdate: new Date(),
 
 updateTickers: () => {
   set((state) => ({
     tickers: state.tickers.map(ticker => ({
       ...ticker,
       price: ticker.price * (1 + (Math.random() - 0.5) * 0.001),
       change: ticker.change + (Math.random() - 0.5),
       changePercent: ticker.changePercent + (Math.random() - 0.5) * 0.01,
     })),
     lastUpdate: new Date(),
   }))
 },
}))
