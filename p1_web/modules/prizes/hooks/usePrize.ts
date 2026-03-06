'use client'
import { useState, useEffect } from 'react'
import { usePrizesStore } from '@/shared/store/prizeStore'
import { prizeService } from '../services/prizeService'

export function usePrizes() {
  const { prizes, setPrizes, addPrize, updatePrize, deletePrize } = usePrizesStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (prizes.length > 0) return

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await prizeService.getAll()
        setPrizes(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [prizes.length, setPrizes])

  return { prizes, isLoading, error, addPrize, updatePrize, deletePrize }
}