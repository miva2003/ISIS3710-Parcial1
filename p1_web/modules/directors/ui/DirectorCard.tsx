'use client'
import { Director } from '../types/director'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/shared/utils/formatDate'


interface DirectorCardProps {
  director: Director
  onDelete: (id: string) => void
}

export default function DirectorCard({ director, onDelete }: DirectorCardProps) {
  const router = useRouter()

  return (
    <div className="border rounded-lg p-4 flex gap-4 items-start">
      <Image src={director.photo} alt={director.name} width={64} height={64} className="w-16 h-20 rounded-lg object-cover shrink-0" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{director.name}</h3>
        <p className="text-sm text-gray-500">{director.nationality} - {formatDate(director.birthDate)}</p>
        <p className="text-sm mt-1 line-clamp-2 text-gray-700">{director.biography}</p>
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={() => router.push(`/directors/${director.id}/editar`)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(director.id)}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}