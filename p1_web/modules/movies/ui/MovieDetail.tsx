'use client'
import Image from 'next/image'
import { Movie } from '../types/movie'
import ReviewForm from './ReviewForm'
import { Review } from '@/modules/reviews/types/review'
import { formatDate } from '@/shared/utils/formatDate'


interface DetailProps {
  movie: Movie
  onReviewAdded: (review: Review) => void
}

export default function Detail({ movie, onReviewAdded }: DetailProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex gap-8 mb-8">
        <Image
          src={movie.poster}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded-lg object-cover shrink-0"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-500 mb-1">País: {movie.country}</p>
          <p className="text-gray-500 mb-1">Duración: {movie.duration} min</p>
          <p className="text-gray-500 mb-1">Fecha de estreno: {formatDate(movie.releaseDate)}</p>
          <p className="text-gray-500 mb-1">Popularidad: {movie.popularity}</p>
          <p className="text-gray-500 mb-1">Director: {movie.director?.name}</p>
          <p className="text-gray-500 mb-1">Género: {movie.genre?.type}</p>

          <div className="mt-3">
            <p className="font-medium">Plataformas:</p>
            <div className="flex gap-2 mt-1">
              {movie.platforms?.map((platform) => (
                <span key={platform.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {platform.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="font-medium">Actores:</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {movie.actors?.map((actor) => (
                <span key={actor.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {actor.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {movie.reviews?.length === 0 ? (
          <p className="text-gray-400">No hay reviews aún.</p>
        ) : (
          <div className="flex flex-col gap-4 mb-8">
            {movie.reviews?.map((review) => (
              <div key={review.id} className="border rounded p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{review.creator}</span>
                  <span>
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={i < review.score ? 'bi bi-star-fill text-warning' : 'bi bi-star text-warning'}
                      />
                    ))}
                  </span>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold mb-4">Agregar review</h3>
        <ReviewForm movieId={movie.id} onReviewAdded={onReviewAdded} />
      </div>
    </div>
  )
}