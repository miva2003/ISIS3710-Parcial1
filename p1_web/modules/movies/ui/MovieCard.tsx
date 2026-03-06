'use client'
import { Movie } from '../types/movie'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/shared/utils/formatDate'

interface MovieCardProps {
  movie: Movie
  onDelete: (id: string) => void
}

export default function MovieCard({ movie, onDelete }: MovieCardProps) {
  const router = useRouter()

  return (
    <div className="border rounded-lg p-4 flex gap-4 items-start">
      <Image src={movie.poster} alt={movie.title} width={64} height={64} className="w-16 h-20 rounded-lg object-cover shrink-0" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.country} - {formatDate(movie.releaseDate)}</p>
        <p className="text-sm mt-1 line-clamp-2 text-gray-700">Popularidad: {movie.popularity}</p>
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={() => router.push(`/movies/${movie.id}`)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Detalle
        </button>
        <button
          onClick={() => router.push(`/movies/${movie.id}/editar`)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}