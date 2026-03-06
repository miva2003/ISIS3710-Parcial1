import { z } from 'zod'

export const platformSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  url: z.string().min(1, 'La URL es obligatoria').url('La URL no es válida'),
})

export type PlatformFormValues = z.infer<typeof platformSchema>