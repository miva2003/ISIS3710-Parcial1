'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDirectors } from '../hooks/useDirector'
import { directorService } from '../services/directorService'
import { DirectorFormValues } from '../validation/directorSchema'
import DirectorForm from '../ui/DirectorForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

interface DirectorEditPageProps {
  id: string
}

export default function DirectorEditPage({ id }: DirectorEditPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { directors, isLoading, updateDirector } = useDirectors()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  if (isLoading) return <p>Cargando...</p>

  const director = directors.find((g) => g.id === id)

  if (!director) return <p>Director no encontrado.</p>

  const handleSubmit = async (data: DirectorFormValues) => {
    try {
      setIsSubmitting(true)
      const updated = await directorService.update(id, data)
      updateDirector(updated)
      showNotification('Director actualizado exitosamente', 'success')
      router.push('/directors')
    } catch (err) {
      showNotification('Error al actualizar el director', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Editar Director</h1>
      <DirectorForm
        onSubmit={handleSubmit}
        defaultValues={{
            name: director.name,
            photo: director.photo,
            nationality: director.nationality,
            birthDate: director.birthDate ? director.birthDate.split('T')[0] : '',
            biography: director.biography,
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}