import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Aurum Fintech | Premium Investment Platform',
  description: 'Your gateway to intelligent investing. Manage stocks, crypto, real estate, and commodities in one luxurious dashboard.',
  keywords: ['fintech', 'investments', 'portfolio', 'stocks', 'crypto', 'dashboard'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
