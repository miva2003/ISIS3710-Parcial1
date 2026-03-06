import { fetcher } from "@/shared/services/http"
import { Movie } from "@/modules/movies/types/movie"
import { MovieFormValues } from "@/modules/movies/validation/movieSchema"

export const movieService = {
  getAll: () => fetcher<Movie[]>('/movies'),

  getById: (id: string) => fetcher<Movie>(`/movies/${id}`),

  create: (data: MovieFormValues) =>
    fetcher<Movie>('/movies', {
        method: 'POST',
        body: JSON.stringify({
        ...data,
        genre: { id: data.genreId },
        director: { id: data.directorId },
        }),
    }),

  associateActor: (movieId: string, actorId: string) =>
    fetcher<void>(`/movies/${movieId}/actors/${actorId}`, {
        method: 'POST',
    }),

  associatePlatform: (movieId: string, platformId: string) =>
    fetcher<void>(`/movies/${movieId}/platforms/${platformId}`, {
        method: 'POST',
    }),

    
  update: (id: string, data: MovieFormValues) =>
    fetcher<Movie>(`/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetcher<void>(`/movies/${id}`, {
      method: 'DELETE',
    }),
}