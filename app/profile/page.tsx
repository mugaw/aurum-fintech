'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuthStore } from '@/store/authStore'
import { motion } from 'framer-motion'
import { User, Mail, Shield, Bell, Palette, Globe, LogOut, Gem, CreditCard, Key } from 'lucide-react'

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuthStore()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    priceAlerts: true,
  })

  if (!user) return null

  const tierConfig = {
    basic: { label: 'Basic', variant: 'default' as const, color: 'text-white/50' },
    premium: { label: 'Premium', variant: 'gold' as const, color: 'text-gold-400' },
    vip: { label: 'VIP', variant: 'warning' as const, color: 'text-amber-400' },
  }

  const tier = tierConfig[user.tier]

  return (
    <div>
      <Header title="Profile" subtitle="Manage your account settings and preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <GlassCard hover={false} className="text-center">
            {/* Avatar */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center shadow-2xl shadow-gold-500/20">
                <span className="text-3xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center border-2 border-dark-950">
                <span className="text-xs">✓</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
            <p className="text-sm text-white/40 mb-3">{user.email}</p>
            <Badge variant={tier.variant}>{tier.label} Member</Badge>

            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Member since</span>
                <span className="text-white/70">
                  {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Account tier</span>
                <span className={tier.color}>{tier.label}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Status</span>
                <Badge variant="success">Active</Badge>
              </div>
            </div>

            <Button variant="secondary" className="w-full mt-6">
              <CreditCard className="w-4 h-4" />
              Upgrade Plan
            </Button>
          </GlassCard>
        </motion.div>

        {/* Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                  <p className="text-xs text-white/40">Update your account details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="input-luxury w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="input-luxury w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="input-luxury w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Country</label>
                  <input
                    type="text"
                    placeholder="United States"
                    className="input-luxury w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button variant="primary" size="sm">Save Changes</Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <p className="text-xs text-white/40">Manage how you receive updates</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive trade confirmations and account updates' },
                  { key: 'push', label: 'Push Notifications', desc: 'Get alerts on your devices in real-time' },
                  { key: 'weekly', label: 'Weekly Digest', desc: 'Summary of your portfolio performance each week' },
                  { key: 'priceAlerts', label: 'Price Alerts', desc: 'Notify when assets hit your target price' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/30">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? 'bg-gold-500' : 'bg-white/10'
                      }`}
                    >
                      <motion.div
                        layout
                        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                        animate={{ left: notifications[item.key as keyof typeof notifications] ? '22px' : '2px' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Security</h3>
                  <p className="text-xs text-white/40">Keep your account secure</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-white/30" />
                    <div>
                      <p className="text-sm font-medium text-white">Password</p>
                      <p className="text-xs text-white/30">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>

                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-white/30" />
                    <div>
                      <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-emerald-400">Enabled</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
