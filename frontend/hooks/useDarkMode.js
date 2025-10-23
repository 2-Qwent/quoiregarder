'use client'
import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Vérifier la préférence stockée ou celle du système
    const stored = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const isDark = stored ? JSON.parse(stored) : prefersDark
    setDarkMode(isDark)
    
    // Appliquer la classe au document
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
    
    // Appliquer la classe uniquement sur documentElement
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Éviter les problèmes d'hydratation avec Next.js
  if (!mounted) {
    return [false, () => {}]
  }

  return [darkMode, toggleDarkMode]
}