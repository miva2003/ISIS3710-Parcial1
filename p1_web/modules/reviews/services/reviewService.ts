import { fetcher } from "@/shared/services/http"
import { Review } from "@/modules/reviews/types/review"
import { ReviewFormValues } from "@/modules/reviews/validation/reviewSchema"

export const reviewService = {
  create: (movieId: string, data: ReviewFormValues) =>
    fetcher<Review>(`/movies/${movieId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAll: (movieId: string) => fetcher<Review[]>(`/movies/${movieId}/reviews`),

  delete: (movieId: string, reviewId: string) =>
    fetcher<void>(`/movies/${movieId}/reviews/${reviewId}`, {
        method: 'DELETE',
    }),

  update: (movieId: string, reviewId: string, data: ReviewFormValues) =>
    fetcher<Review>(`/movies/${movieId}/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

  getById: (movieId: string, reviewId: string) => fetcher<Review>(`/movies/${movieId}/reviews/${reviewId}`),
}