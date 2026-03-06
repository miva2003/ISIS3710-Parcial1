'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useActors } from '../hooks/useActors'
import { actorService } from '../services/actorService'
import { ActorFormValues } from '../validation/actorSchema'
import ActorForm from '../ui/ActorForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

interface ActorEditPageProps {
  id: string
}

export default function ActorEditPage({ id }: ActorEditPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { actors, isLoading, updateActor } = useActors()
  const router = useRouter()
  const { showNotification } = useNotificationStore()


  if (isLoading) return <p>Cargando...</p>

  const actor = actors.find((a) => a.id === id)

  if (!actor) return <p>Actor no encontrado.</p>


  const handleSubmit = async (data: ActorFormValues) => {
    try {
      setIsSubmitting(true)
      const updated = await actorService.update(id, data)
      updateActor(updated)
      showNotification('Actor actualizado exitosamente', 'success')
      router.push('/actors')
    } catch (err) {
      showNotification('Error al actualizar el actor', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Editar Actor</h1>
      <ActorForm
        onSubmit={handleSubmit}
        defaultValues={{
            name: actor.name,
            photo: actor.photo,
            nationality: actor.nationality,
            birthDate: actor.birthDate ? actor.birthDate.split('T')[0] : '',
            biography: actor.biography,
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}