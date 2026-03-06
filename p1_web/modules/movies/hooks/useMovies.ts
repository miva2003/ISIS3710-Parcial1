'use client'
import { useState, useEffect } from 'react'
import { useMoviesStore } from '@/shared/store/moviesStore'
import { movieService } from '../services/movieService'

export function useMovies() {
  const { movies, setMovies, addMovie, updateMovie, deleteMovie } = useMoviesStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (movies.length > 0) return

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await movieService.getAll()
        setMovies(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [movies.length, setMovies])

  return { movies, isLoading, error, addMovie, updateMovie, deleteMovie }
}