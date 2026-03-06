'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDirectors } from '../hooks/useDirector'
import { directorService } from '../services/directorService'
import { DirectorFormValues } from '../validation/directorSchema'
import DirectorForm from '../ui/DirectorForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function DirectorCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addDirector } = useDirectors()
  const { showNotification } = useNotificationStore()
  const router = useRouter()

  const handleSubmit = async (data: DirectorFormValues) => {
    try {
      setIsSubmitting(true)
      const created = await directorService.create(data)
      addDirector(created)
      showNotification('Director creado exitosamente', 'success')
      router.push('/directors')
    } catch (err) {
      showNotification('Error al crear el director', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Director</h1>
      <DirectorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}