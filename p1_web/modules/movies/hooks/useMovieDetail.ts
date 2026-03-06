'use client'
import { useState, useEffect } from 'react'
import { Movie } from '../types/movie'
import { movieService } from '../services/movieService'

export function useMovieDetail(id: string) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await movieService.getById(id)
        setMovie(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [id])

  return { movie, isLoading, error, setMovie }
}