"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"
import { useThemeStore } from "@/store/theme-store"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const { theme, setTheme } = useTheme()

  // Sync Zustand with next-themes on mount / change
  useEffect(() => {
    if (theme === 'dark' && !isDarkMode) toggleTheme()
    else if (theme === 'light' && isDarkMode) toggleTheme()
  }, [theme, isDarkMode, toggleTheme])

  const handleToggleTheme = () => {
    const newMode = !isDarkMode
    toggleTheme()
    setTheme(newMode ? 'dark' : 'light')
  }

  return (
    <Button   onClick={handleToggleTheme}>
      <Sun className="h-5 w-5 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    </Button>
  )
}
