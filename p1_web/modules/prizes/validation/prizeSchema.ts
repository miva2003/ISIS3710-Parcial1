import { z } from 'zod'

export const prizeSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  year: z.number().min(1, 'El año es obligatorio'),
  status: z.string().min(1, 'El estado es obligatorio'),
})

export type PrizeFormValues = z.infer<typeof prizeSchema>