import { fetcher } from "@/shared/services/http"
import { Genre } from "@/modules/genres/types/genre"
import { GenreFormValues } from "@/modules/genres/validation/genreSchema"

export const genreService = {
  getAll: () => fetcher<Genre[]>('/genres'),

  create: (data: GenreFormValues) =>
    fetcher<Genre>('/genres', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: GenreFormValues) =>
    fetcher<Genre>(`/genres/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetcher<void>(`/genres/${id}`, {
      method: 'DELETE',
    }),
}