'use client'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { Review } from '@/modules/reviews/types/review'
import Detail from '../ui/MovieDetail'
import { useNotificationStore } from '@/shared/store/notificationStore'

interface MovieDetailPageProps {
  id: string
}

export default function MovieDetailPage({ id }: MovieDetailPageProps) {
  const { movie, isLoading, error, setMovie } = useMovieDetail(id)
  const { showNotification } = useNotificationStore()

  const handleReviewAdded = (review: Review) => {
    if (!movie) return
    setMovie({ ...movie, reviews: [...(movie.reviews ?? []), review] })
    showNotification('Reseña agregada exitosamente', 'success')
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!movie) return <p>Película no encontrada.</p>

  return <Detail movie={movie} onReviewAdded={handleReviewAdded} />
}