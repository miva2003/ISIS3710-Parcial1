'use client'
import { useActors } from '../hooks/useActors'
import { actorService } from '../services/actorService'
import Link from 'next/link'
import ActorCard from '../ui/ActorCard'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function ActorsListPage() {
  const { actors, isLoading, error, deleteActor } = useActors()
  const { showNotification } = useNotificationStore()

  const handleDelete = async (id: string) => {
    try {
      //console.log('Eliminando actor con id:', id) para revisar que esta pasando
      //await actorService.delete(id)
      deleteActor(id)
      showNotification('Actor eliminado correctamente', 'success')
    } catch (err) {
      console.error(err)
      showNotification('Error al eliminar el actor', 'error')
    }
  }
  if (isLoading) return <p>Cargando...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Actores</h1>
        <Link href="/actors/crear" className="bg-red-900 text-white px-4 py-2 rounded">
          + Crear Actor
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {actors.map((actor) => (
            <ActorCard key={actor.id} actor={actor} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}