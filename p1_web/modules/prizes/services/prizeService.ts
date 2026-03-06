import { fetcher } from "@/shared/services/http"
import { Prize } from "@/modules/prizes/types/prize"
import { PrizeFormValues } from "@/modules/prizes/validation/prizeSchema"

export const prizeService = {
  getAll: () => fetcher<Prize[]>('/prizes'),

  create: (data: PrizeFormValues) =>
    fetcher<Prize>('/prizes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: PrizeFormValues) =>
    fetcher<Prize>(`/prizes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetcher<void>(`/prizes/${id}`, {
      method: 'DELETE',
    }),
}