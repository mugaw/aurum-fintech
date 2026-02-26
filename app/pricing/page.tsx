'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check, Sparkles, Gem, Crown } from 'lucide-react'

interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  highlighted: boolean
  icon: React.ReactNode
  badge?: string
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for getting started with smart investing',
    monthlyPrice: 9.99,
    yearlyPrice: 99,
    features: [
      'Portfolio tracking (up to 10 assets)',
      'Basic market data',
      'Daily portfolio summary',
      'Email support',
      'Mobile app access',
      'Community forums',
    ],
    highlighted: false,
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Advanced tools for serious investors',
    monthlyPrice: 29.99,
    yearlyPrice: 299,
    features: [
      'Unlimited asset tracking',
      'Real-time market data',
      'AI-powered insights',
      'Advanced charting tools',
      'Priority support (24/7)',
      'Tax-loss harvesting',
      'Custom alerts & notifications',
      'API access',
    ],
    highlighted: true,
    icon: <Gem className="w-6 h-6" />,
    badge: 'Most Popular',
  },
  {
    id: 'vip',
    name: 'VIP',
    description: 'White-glove service for high-net-worth clients',
    monthlyPrice: 99.99,
    yearlyPrice: 999,
    features: [
      'Everything in Premium',
      'Dedicated account manager',
      'Private investment research',
      'Exclusive deal flow access',
      'Concierge service',
      'Custom portfolio construction',
      'Institutional-grade analytics',
      'Direct line to analysts',
      'Priority IPO access',
    ],
    highlighted: false,
    icon: <Crown className="w-6 h-6" />,
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div>
      <Header title="Pricing" subtitle="Choose the plan that fits your investment journey" />

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={cn('text-sm font-medium transition-colors', !isYearly ? 'text-white' : 'text-white/40')}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="relative w-14 h-7 rounded-full bg-white/10 border border-white/10 transition-colors hover:bg-white/15"
        >
          <motion.div
            layout
            className="absolute top-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg"
            animate={{ left: isYearly ? '30px' : '2px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </button>
        <span className={cn('text-sm font-medium transition-colors', isYearly ? 'text-white' : 'text-white/40')}>
          Yearly
        </span>
        {isYearly && (
          <Badge variant="success">Save 17%</Badge>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className={cn(
              'relative rounded-2xl p-6 flex flex-col',
              plan.highlighted
                ? 'glass-panel-strong border-gold-500/30 shadow-xl shadow-gold-500/10 scale-105'
                : 'glass-panel'
            )}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="gold">{plan.badge}</Badge>
              </div>
            )}

            {/* Icon & Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                plan.highlighted ? 'bg-gold-500/20 text-gold-400' : 'bg-white/5 text-white/50'
              )}>
                {plan.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-white/40">{plan.description}</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-white/30 text-sm mb-1">
                  /{isYearly ? 'year' : 'month'}
                </span>
              </div>
              {isYearly && (
                <p className="text-xs text-white/30 mt-1">
                  ${(plan.yearlyPrice / 12).toFixed(2)}/month billed annually
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className={cn(
                    'w-4 h-4 mt-0.5 flex-shrink-0',
                    plan.highlighted ? 'text-gold-400' : 'text-white/30'
                  )} />
                  <span className="text-sm text-white/70">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant={plan.highlighted ? 'primary' : 'secondary'}
              className="w-full"
            >
              {plan.id === 'vip' ? 'Contact Sales' : 'Get Started'}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-8 mt-16 text-white/20 text-xs"
      >
        <span>256-bit Encryption</span>
        <span>•</span>
        <span>SOC 2 Certified</span>
        <span>•</span>
        <span>SIPC Protected</span>
        <span>•</span>
        <span>Cancel Anytime</span>
      </motion.div>
    </div>
  )
}
