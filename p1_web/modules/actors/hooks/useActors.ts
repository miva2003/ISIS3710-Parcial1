'use client'
import { useState, useEffect } from 'react'
import { useActorsStore } from '@/shared/store/actorsStore'
import { actorService } from '../services/actorService'

export function useActors() {
  const { actors, setActors, addActor, updateActor, deleteActor } = useActorsStore()
  const [isLoading, setIsLoading] = useState(actors.length === 0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (actors.length > 0) return

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await actorService.getAll()
        setActors(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [actors.length, setActors])

  return { actors, isLoading, error, addActor, updateActor, deleteActor }
}