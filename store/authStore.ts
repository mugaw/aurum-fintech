import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface AuthState {
 user: User | null
 isAuthenticated: boolean
 isLoading: boolean
 login: (email: string, password: string) => Promise<void>
 logout: () => void
 updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
 persist(
   (set) => ({
     user: null,
     isAuthenticated: false,
     isLoading: false,
     
     login: async (email: string, password: string) => {
       set({ isLoading: true })
       await new Promise(resolve => setTimeout(resolve, 1000))
       
       const mockUser: User = {
         id: '1',
         email,
         name: email.split('@')[0],
         tier: 'premium',
         joinedAt: new Date(),
       }
       
       set({ user: mockUser, isAuthenticated: true, isLoading: false })
     },
     
     logout: () => {
       set({ user: null, isAuthenticated: false })
     },
     
     updateUser: (updates) => {
       set((state) => ({
         user: state.user ? { ...state.user, ...updates } : null
       }))
     },
   }),
   {
     name: 'auth-storage',
   }
 )
)
