'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMovies } from '../hooks/useMovies'
import { movieService } from '../services/movieService'
import { MovieFormValues } from '../validation/movieSchema'
import MovieForm from '../ui/MovieForm'
import { useNotificationStore } from '@/shared/store/notificationStore'

interface MovieEditPageProps {
  id: string
}

export default function MovieEditPage({ id }: MovieEditPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { movies, isLoading, updateMovie } = useMovies()
  const router = useRouter()
  const { showNotification } = useNotificationStore()

  if (isLoading) return <p>Cargando...</p>

  const movie = movies.find((g) => g.id === id)

  if (!movie) return <p>Movie no encontrado.</p>

  const handleSubmit = async (data: MovieFormValues) => {
    try {
      setIsSubmitting(true)
      const updated = await movieService.update(id, data)
      updateMovie(updated)
      showNotification('Movie actualizado exitosamente', 'success')
      router.push('/movies')
    } catch (err) {
      showNotification('Error al actualizar el Movie', 'error')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Editar Movie</h1>
      <MovieForm
        onSubmit={handleSubmit}
        defaultValues={{
            title: movie.title,
            poster: movie.poster,
            country: movie.country,
            duration: movie.duration,
            releaseDate: new Date(movie.releaseDate ? movie.releaseDate.split('T')[0] : ''),
            popularity: movie.popularity,
            directorId: movie.director?.id,
            genreId: movie.genre?.id
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}