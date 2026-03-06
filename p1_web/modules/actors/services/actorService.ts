import { fetcher } from "@/shared/services/http"
import { Actor } from "@/modules/actors/types/actor"
import { ActorFormValues } from "@/modules/actors/validation/actorSchema"

export const actorService = {
  getAll: () => fetcher<Actor[]>('/actors'),

  create: (data: ActorFormValues) =>
    fetcher<Actor>('/actors', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  associateMovie: (actorId: string, movieId: string) =>
    fetcher<void>(`/movies/${movieId}/actors/${actorId}`, {
        method: 'POST',
    }),

  update: (id: string, data: ActorFormValues) =>
    fetcher<Actor>(`/actors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetcher<void>(`/actors/${id}`, {
      method: 'DELETE',
    }),
}