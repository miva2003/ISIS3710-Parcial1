'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGenres } from '../hooks/useGenres'
import { genreService } from '../services/genreService'
import { GenreFormValues } from '../validation/genreSchema'
import GenreForm from '../ui/GenreForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function GenreCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addGenre } = useGenres()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  const handleSubmit = async (data: GenreFormValues) => {
    try {
      setIsSubmitting(true)
      const created = await genreService.create(data)
      addGenre(created)
      showNotification('Género creado exitosamente', 'success')
      router.push('/genres')
    } catch (err) {
      showNotification('Error al crear el género', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Género</h1>
      <GenreForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}