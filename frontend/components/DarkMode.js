'use client'
import { useDarkMode } from '../hooks/useDarkMode'

export default function DarkMode() {
  const [darkMode, toggleDarkMode] = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  )
}