'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePlatforms } from '../hooks/usePlatforms'
import { platformService } from '../services/platformService'
import { PlatformFormValues } from '../validation/platformSchema'
import PlatformForm from '../ui/PlatformForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

interface PlatformEditPageProps {
  id: string
}

export default function PlatformEditPage({ id }: PlatformEditPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { platforms, isLoading, updatePlatform } = usePlatforms()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  if (isLoading) return <p>Cargando...</p>

  const platform = platforms.find((g) => g.id === id)

  if (!platform) return <p>Plataforma no encontrada.</p>

  const handleSubmit = async (data: PlatformFormValues) => {
    try {
      setIsSubmitting(true)
      const updated = await platformService.update(id, data)
      updatePlatform(updated)
      showNotification('Plataforma actualizada exitosamente', 'success')
      router.push('/platforms')
    } catch (err) {
      showNotification('Error al actualizar la plataforma', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Editar Género</h1>
      <PlatformForm
        onSubmit={handleSubmit}
        defaultValues={{ 
            name: platform.name,
            url: platform.url,
         }}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}