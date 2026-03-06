import { fetcher } from "@/shared/services/http"
import { Platform } from "@/modules/platforms/types/platform"
import { PlatformFormValues } from "@/modules/platforms/validation/platformSchema"

export const platformService = {
  getAll: () => fetcher<Platform[]>('/platforms'),

  create: (data: PlatformFormValues) =>
    fetcher<Platform>('/platforms', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: PlatformFormValues) =>
    fetcher<Platform>(`/platforms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetcher<void>(`/platforms/${id}`, {
      method: 'DELETE',
    }),
}