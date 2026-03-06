'use client'
import { useGenres } from '../hooks/useGenres'
import { genreService } from '../services/genreService'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function GenresListPage() {
  const { genres, isLoading, error, deleteGenre } = useGenres()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  const handleDelete = async (id: string) => {
    //await genreService.delete(id)
    deleteGenre(id)
    showNotification('Género eliminado exitosamente', 'success')
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Géneros</h1>
        <Link href="/genres/crear" className="bg-red-900 text-white px-4 py-2 rounded">
          + Crear género
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {genres.map((genre) => (
          <div key={genre.id} className="border rounded p-4 flex justify-between items-center">
            <span>{genre.type}</span>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/genres/${genre.id}/editar`)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(genre.id)}
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