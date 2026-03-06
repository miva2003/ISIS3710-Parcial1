'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePrizes } from '../hooks/usePrize'
import { prizeService } from '../services/prizeService'
import { PrizeFormValues } from '../validation/prizeSchema'
import PrizeForm from '../ui/PrizeForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function PrizeCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addPrize } = usePrizes()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  const handleSubmit = async (data: PrizeFormValues) => {
    try {
      setIsSubmitting(true)
      const created = await prizeService.create(data)
      addPrize(created)
      showNotification('Premio creado exitosamente', 'success')
      router.push('/prizes')
    } catch (err) {
      showNotification('Error al crear el premio', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Plaaforma</h1>
      <PrizeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}