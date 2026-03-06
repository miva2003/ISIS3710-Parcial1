import { z } from 'zod'

export const genreSchema = z.object({
  type: z.string().min(1, 'El tipo es obligatorio'),
})

export type GenreFormValues = z.infer<typeof genreSchema>