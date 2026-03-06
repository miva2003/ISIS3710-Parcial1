'use client'
import { usePlatforms } from '../hooks/usePlatforms'
import { platformService } from '../services/platformService'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function PlatformsListPage() {
  const { platforms, isLoading, error, deletePlatform } = usePlatforms()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  const handleDelete = async (id: string) => {
    // await platformService.delete(id)
    deletePlatform(id)
    showNotification('Plataforma eliminada exitosamente', 'success')
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Plataformas</h1>
        <Link href="/platforms/crear" className="bg-red-900 text-white px-4 py-2 rounded">
          + Crear plataforma
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="border rounded p-4 flex justify-between items-center">
            <span>{platform.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/platforms/${platform.id}/editar`)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(platform.id)}
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