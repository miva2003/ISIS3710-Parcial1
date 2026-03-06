'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useActors } from '../hooks/useActors'
import { actorService } from '../services/actorService'
import { ActorFormValues } from '../validation/actorSchema'
import ActorForm from '../ui/ActorForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function ActorCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addActor } = useActors()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  const handleSubmit = async (data: ActorFormValues) => {
    try {
      setIsSubmitting(true)
      const created = await actorService.create(data)
      addActor(created)
      showNotification('Actor creado exitosamente', 'success')
      router.push('/actors')
    } catch (err) {
      showNotification('Error al crear el actor', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Actor</h1>
      <ActorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}