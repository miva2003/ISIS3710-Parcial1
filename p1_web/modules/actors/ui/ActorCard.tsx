'use client'
import { Actor } from '../types/actor'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import MoviesModal from './MoviesModal'
import Image from 'next/image'
import { formatDate } from '@/shared/utils/formatDate'


interface ActorCardProps {
  actor: Actor
  onDelete: (id: string) => void
}

export default function ActorCard({ actor, onDelete }: ActorCardProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="border rounded-lg p-4 flex gap-4 items-start">
      <Image src={actor.photo} alt={actor.name} width={64} height={64} className="w-16 h-20 rounded-lg object-cover shrink-0" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{actor.name}</h3>
        <p className="text-sm text-gray-500">{actor.nationality} - {formatDate(actor.birthDate)}</p>
        <p className="text-sm mt-1 line-clamp-2 text-gray-700">{actor.biography}</p>
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
        >
          Ver películas
        </button>
        <button
          onClick={() => router.push(`/actors/${actor.id}/editar`)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(actor.id)}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Eliminar
        </button>
      </div>
      <MoviesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movies={actor.movies}
      />
    </div>
  )
}