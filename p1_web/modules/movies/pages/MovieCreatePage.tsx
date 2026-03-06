'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMovies } from '../hooks/useMovies'
import { useActors } from '@/modules/actors/hooks/useActors'
import { usePlatforms } from '@/modules/platforms/hooks/usePlatforms'
import { movieService } from '../services/movieService'
import { MovieFormValues } from '../validation/movieSchema'
import MovieForm from '../ui/MovieForm'
import { useNotificationStore } from '@/shared/store/notificationStore'
import { usePrizes } from '@/modules/prizes/hooks/usePrize'

export default function MovieCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedActorIds, setSelectedActorIds] = useState<string[]>([])
  const [selectedPlatformIds, setSelectedPlatformIds] = useState<string[]>([])
  const [selectedPrizeIds, setSelectedPrizeIds] = useState<string[]>([])
  const { addMovie } = useMovies()
  const { actors } = useActors()
  const { platforms } = usePlatforms()
  const {prizes} = usePrizes()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  const handleActorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value)
    setSelectedActorIds(selected)
  }

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value)
    setSelectedPlatformIds(selected)
  }

  const handleSubmit = async (data: MovieFormValues) => {
    try {
      setIsSubmitting(true)
      const created = await movieService.create(data)

      for (const actorId of selectedActorIds) {
        await movieService.associateActor(created.id, actorId)
      }

      for (const prizeId of selectedPrizeIds) {
        await movieService.associatePrize(created.id, prizeId)
      }

      for (const platformId of selectedPlatformIds) {
        await movieService.associatePlatform(created.id, platformId)
      }

      addMovie(created)
      showNotification('Película creada correctamente', 'success')
      router.push('/movies')
    } catch (err) {
      console.error(err)
      showNotification('Error al crear la película', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Película</h1>
      <MovieForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      <div className="space-y-4 max-w-lg mt-4">
        <div>
          <label className="block font-medium mb-1">Actores</label>
          <select
            multiple
            onChange={handleActorChange}
            className="w-full p-2 border rounded h-32"
          >
            {actors.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-400 mt-1">Mantén Ctrl para seleccionar varios</p>
        </div>

        <div>
          <label className="block font-medium mb-1">Premios</label>
          <select
            multiple
            onChange={handlePlatformChange}
            className="w-full p-2 border rounded h-32"
          >
            {prizes.map((prize) => (
              <option key={prize.id} value={prize.id}>
                {prize.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-400 mt-1">Mantén Ctrl para seleccionar varios</p>
        </div>

        <div>
          <label className="block font-medium mb-1">Plataformas</label>
          <select
            multiple
            onChange={handlePlatformChange}
            className="w-full p-2 border rounded h-32"
          >
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-400 mt-1">Mantén Ctrl para seleccionar varios</p>
        </div>
      </div>
    </div>
  )
}