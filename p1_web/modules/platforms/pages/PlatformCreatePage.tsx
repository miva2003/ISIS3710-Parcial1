'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePlatforms } from '../hooks/usePlatforms'
import { platformService } from '../services/platformService'
import { PlatformFormValues } from '../validation/platformSchema'
import PlatformForm from '../ui/PlatformForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function PlatformCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addPlatform } = usePlatforms()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  const handleSubmit = async (data: PlatformFormValues) => {
    try {
      setIsSubmitting(true)
      const created = await platformService.create(data)
      addPlatform(created)
      showNotification('Plataforma creada exitosamente', 'success')
      router.push('/platforms')
    } catch (err) {
      showNotification('Error al crear la plataforma', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Plaaforma</h1>
      <PlatformForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}