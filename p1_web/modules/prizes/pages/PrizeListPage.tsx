'use client'
import { usePrizes } from '../hooks/usePrize'
import { prizeService } from '../services/prizeService'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function PrizesListPage() {
  const { prizes, isLoading, error, deletePrize } = usePrizes()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  const handleDelete = async (id: string) => {
    // await prizeService.delete(id)
    deletePrize(id)
    showNotification('Plataforma eliminada exitosamente', 'success')
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Premios</h1>
        <Link href="/prizes/crear" className="bg-red-900 text-white px-4 py-2 rounded">
          + Crear premio
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {prizes.map((prize) => (
          <div key={prize.id} className="border rounded p-4 flex justify-between items-center">
            <span>{prize.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/prizes/${prize.id}/editar`)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(prize.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}