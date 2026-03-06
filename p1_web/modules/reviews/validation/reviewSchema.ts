import { z } from 'zod'

export const reviewSchema = z.object({
  text: z.string().min(1, 'El texto es obligatorio'),
  score: z.number().min(1, 'La puntuación es obligatoria'),
  creator: z.string().min(1, 'El creador es obligatorio'),
})

export type ReviewFormValues = z.infer<typeof reviewSchema>