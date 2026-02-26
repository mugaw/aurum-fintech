'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Clock, User, BookOpen, TrendingUp, Shield, Lightbulb, Globe } from 'lucide-react'

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  readTime: number
  publishedAt: string
  tags: string[]
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Rise of AI-Driven Portfolio Management',
    excerpt: 'How machine learning algorithms are reshaping investment strategies for retail and institutional investors alike. Discover the latest trends in algorithmic trading and robo-advisors.',
    category: 'Technology',
    author: 'Sarah Chen',
    readTime: 8,
    publishedAt: '2024-02-15',
    tags: ['AI', 'Portfolio', 'Technology'],
  },
  {
    id: '2',
    title: 'Bitcoin Halving 2024: What Investors Should Know',
    excerpt: 'A comprehensive analysis of the upcoming Bitcoin halving event and its potential impact on cryptocurrency markets, based on historical data from previous halvings.',
    category: 'Crypto',
    author: 'Marcus Williams',
    readTime: 12,
    publishedAt: '2024-02-14',
    tags: ['Bitcoin', 'Crypto', 'Analysis'],
  },
  {
    id: '3',
    title: 'ESG Investing: Beyond the Buzzword',
    excerpt: 'Environmental, Social, and Governance criteria are now crucial factors for long-term value creation. Learn how top funds integrate ESG into their strategies.',
    category: 'Sustainability',
    author: 'Emily Rodriguez',
    readTime: 6,
    publishedAt: '2024-02-13',
    tags: ['ESG', 'Sustainability', 'Funds'],
  },
  {
    id: '4',
    title: 'Navigating Interest Rate Uncertainty in 2024',
    excerpt: 'With central banks sending mixed signals, portfolio positioning becomes critical. Expert strategies for both rising and falling rate environments.',
    category: 'Markets',
    author: 'James Park',
    readTime: 10,
    publishedAt: '2024-02-12',
    tags: ['Interest Rates', 'Federal Reserve', 'Strategy'],
  },
  {
    id: '5',
    title: 'Real Estate Tokenization: A New Frontier',
    excerpt: 'Blockchain technology is making real estate investment accessible to everyone. How tokenized properties are democratizing one of the oldest asset classes.',
    category: 'Real Estate',
    author: 'Olivia Thompson',
    readTime: 7,
    publishedAt: '2024-02-11',
    tags: ['Real Estate', 'Blockchain', 'Tokenization'],
  },
  {
    id: '6',
    title: 'Defensive Strategies for Volatile Markets',
    excerpt: 'Build resilience into your portfolio with time-tested defensive strategies including options hedging, diversification, and tactical allocation shifts.',
    category: 'Strategy',
    author: 'David Kim',
    readTime: 9,
    publishedAt: '2024-02-10',
    tags: ['Strategy', 'Risk Management', 'Hedging'],
  },
]

const categories = ['All', 'Technology', 'Crypto', 'Sustainability', 'Markets', 'Real Estate', 'Strategy']

const categoryIcons: Record<string, React.ReactNode> = {
  Technology: <Lightbulb className="w-4 h-4" />,
  Crypto: <TrendingUp className="w-4 h-4" />,
  Sustainability: <Globe className="w-4 h-4" />,
  Markets: <TrendingUp className="w-4 h-4" />,
  'Real Estate': <Shield className="w-4 h-4" />,
  Strategy: <BookOpen className="w-4 h-4" />,
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? mockArticles
    : mockArticles.filter((a) => a.category === activeCategory)

  return (
    <div>
      <Header title="Insights" subtitle="Market analysis, research, and expert commentary" />

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
              activeCategory === cat
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/20'
                : 'text-white/40 bg-white/5 border border-white/5 hover:text-white/70 hover:border-white/10'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article, i) => (
          <GlassCard key={article.id} delay={0.05 * i} className="flex flex-col">
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400">
                  {categoryIcons[article.category] || <BookOpen className="w-4 h-4" />}
                </div>
                <Badge variant="gold">{article.category}</Badge>
              </div>
              <div className="flex items-center gap-1 text-white/30 text-xs">
                <Clock className="w-3 h-3" />
                {article.readTime} min
              </div>
            </div>

            {/* Title & Excerpt */}
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-white/40 mb-4 line-clamp-3 flex-1">
              {article.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-white/50">{article.author}</span>
              </div>
              <span className="text-xs text-white/30">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
