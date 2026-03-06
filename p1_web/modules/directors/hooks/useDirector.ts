'use client'
import { useState, useEffect } from 'react'
import { useDirectorsStore } from '@/shared/store/directorsStore'
import { directorService } from '../services/directorService'

export function useDirectors() {
  const { directors, setDirectors, addDirector, updateDirector, deleteDirector } = useDirectorsStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (directors.length > 0) return

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await directorService.getAll()
        setDirectors(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [directors.length, setDirectors])

  return { directors, isLoading, error, addDirector, updateDirector, deleteDirector }
}