'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedWatchlist = localStorage.getItem("movieWatchlist")
    
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist))
      } catch (error) {
        console.error("Erreur lors du parsing de la watchlist :", error)
        setWatchlist([])
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("movieWatchlist", JSON.stringify(watchlist))
    }
  }, [mounted, watchlist])

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId))
  }

  const isInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId)
  }

  const clearWatchlist = () => {
    setWatchlist([])
  }

  if (!mounted) {
    return (
      <WatchlistContext.Provider value={{
        watchlist: [],
        addToWatchlist: () => {},
        removeFromWatchlist: () => {},
        isInWatchlist: () => false,
        clearWatchlist: () => {},
      }}>
        {children}
      </WatchlistContext.Provider>
    )
  }

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      clearWatchlist,
    }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider')
  }
  return context
}