import { z } from 'zod'

export const movieSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  poster: z.string().min(1, 'El póster es obligatorio').url('La URL no es válida'),
  country: z.string().min(1, 'El país es obligatorio'),
  duration: z.number().min(1, 'La duración debe ser un número positivo'),
  releaseDate: z.date().min(1, 'La fecha de estreno es obligatoria'),
  popularity: z.number().min(0, 'La popularidad debe ser un número positivo'),
  directorId: z.string().min(1, 'El director es obligatorio'),
  genreId: z.string().min(1, 'El género es obligatorio'),
})

export type MovieFormValues = z.infer<typeof movieSchema>