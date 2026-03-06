'use client'
import { useDirectors } from '../hooks/useDirector'
import { directorService } from '../services/directorService'
import Link from 'next/link'
import DirectorCard from '../ui/DirectorCard'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function DirectorsListPage() {
  const { directors, isLoading, error, deleteDirector } = useDirectors()
  const { showNotification } = useNotificationStore()
  

  const handleDelete = async (id: string) => {
    //await directorService.delete(id)
    deleteDirector(id)
    showNotification('Director eliminado exitosamente', 'success')
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Directores</h1>
        <Link href="/directors/crear" className="bg-red-900 text-white px-4 py-2 rounded">
          + Crear Director
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {directors.map((director) => (
            <DirectorCard key={director.id} director={director} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}