'use client'
import { useState, useEffect } from 'react'
import { useGenresStore } from '@/shared/store/genresStore'
import { genreService } from '../services/genreService'

export function useGenres() {
  const { genres, setGenres, addGenre, updateGenre, deleteGenre } = useGenresStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (genres.length > 0) return

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await genreService.getAll()
        setGenres(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [genres.length, setGenres])

  return { genres, isLoading, error, addGenre, updateGenre, deleteGenre }
}