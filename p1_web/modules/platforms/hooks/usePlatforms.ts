'use client'
import { useState, useEffect } from 'react'
import { usePlatformsStore } from '@/shared/store/platformsStore'
import { platformService } from '../services/platformService'

export function usePlatforms() {
  const { platforms, setPlatforms, addPlatform, updatePlatform, deletePlatform } = usePlatformsStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (platforms.length > 0) return

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await platformService.getAll()
        setPlatforms(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [platforms.length, setPlatforms])

  return { platforms, isLoading, error, addPlatform, updatePlatform, deletePlatform }
}