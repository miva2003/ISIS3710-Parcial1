'use client'
import { useMovies } from '../hooks/useMovies'
import { movieService } from '../services/movieService'
import Link from 'next/link'
import MovieCard from '../ui/MovieCard'
import { useNotificationStore } from '@/shared/store/notificationStore'

export default function MoviesListPage() {
  const { movies, isLoading, error, deleteMovie } = useMovies()
  const { showNotification } = useNotificationStore()

  const handleDelete = async (id: string) => {
    //await movieService.delete(id)
    deleteMovie(id)
    showNotification('Película eliminada exitosamente', 'success')
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Películas</h1>
        <Link href="/movies/crear" className="bg-red-900 text-white px-4 py-2 rounded">
          + Crear Película
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}