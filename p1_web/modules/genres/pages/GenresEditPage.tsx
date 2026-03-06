'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGenres } from '../hooks/useGenres'
import { genreService } from '../services/genreService'
import { GenreFormValues } from '../validation/genreSchema'
import GenreForm from '../ui/GenreForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

interface GenreEditPageProps {
  id: string
}

export default function GenreEditPage({ id }: GenreEditPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { genres, isLoading, updateGenre } = useGenres()
  const router = useRouter()
  const { showNotification } = useNotificationStore()
  
  if (isLoading) return <p>Cargando...</p>

  const genre = genres.find((g) => g.id === id)

  if (!genre) return <p>Género no encontrado.</p>

  const handleSubmit = async (data: GenreFormValues) => {
    try {
      setIsSubmitting(true)
      const updated = await genreService.update(id, data)
      updateGenre(updated)
      showNotification('Género actualizado exitosamente', 'success')
      router.push('/genres')
    } catch (err) {
      showNotification('Error al actualizar el género', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Editar Género</h1>
      <GenreForm
        onSubmit={handleSubmit}
        defaultValues={{ type: genre.type }}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}