"use client"

import { MovieDetails } from "@/app/types/Movie"
import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"


interface WatchedMoviesContextType {
  watchedMovies: MovieDetails[]
  addToWatched: (movie: MovieDetails) => void
  removeFromWatched: (movieId: number) => void
  isWatched: (movieId: number | string) => boolean
  clearAllWatched: () => void
}

const LOCAL_STORAGE_KEY = "watchedMovies"
const WatchedMoviesContext = createContext<WatchedMoviesContextType | undefined>(undefined)

export function WatchedMoviesProvider({ children }: { children: React.ReactNode }) {
  const [watchedMovies, setWatchedMovies] = useState<MovieDetails[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load watched movies from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setWatchedMovies(parsed)
        } else {
          console.error("Saved watched movies is not an array, resetting")
          localStorage.removeItem(LOCAL_STORAGE_KEY)
        }
      }
    } catch (error) {
      console.error("Error loading watched movies from localStorage:", error)
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save to localStorage whenever watchedMovies changes, but only after initial load
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watchedMovies))
      } catch (error) {
        console.error("Error saving watched movies to localStorage:", error)
      }
    }
  }, [watchedMovies, isInitialized])

  const addToWatched = useCallback((movie: MovieDetails) => {
    setWatchedMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }, [])

  const removeFromWatched = useCallback((movieId: number) => {
    setWatchedMovies((prev) => prev.filter((m) => m.id !== movieId))
  }, [])

  const isWatched = useCallback((movieId: number | string) => {
    const id = typeof movieId === 'string' ? parseInt(movieId, 10) : movieId
    return watchedMovies.some((m) => m.id === id || m.imdbID === movieId)
  }, [watchedMovies])

  const clearAllWatched = useCallback(() => {
    setWatchedMovies([])
  }, [])

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    watchedMovies,
    addToWatched,
    removeFromWatched,
    isWatched,
    clearAllWatched
  }), [watchedMovies, addToWatched, removeFromWatched, isWatched, clearAllWatched])

  return (
    <WatchedMoviesContext.Provider value={value}>
      {children}
    </WatchedMoviesContext.Provider>
  )
}

export function useWatchedMovies() {
  const context = useContext(WatchedMoviesContext)
  if (context === undefined) {
    throw new Error("useWatchedMovies must be used within a WatchedMoviesProvider")
  }
  return context
}
