import { fetcher } from "@/shared/services/http"
import { Director } from "@/modules/directors/types/director"
import { DirectorFormValues } from "@/modules/directors/validation/directorSchema"

export const directorService = {
  getAll: () => fetcher<Director[]>('/directors'),

  create: (data: DirectorFormValues) =>
    fetcher<Director>('/directors', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: DirectorFormValues) =>
    fetcher<Director>(`/directors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetcher<void>(`/directors/${id}`, {
      method: 'DELETE',
    }),
}