'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// TypeScript interface
interface ThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
}

// Zustand store with persistence
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage', // key for localStorage
    }
  )
)
