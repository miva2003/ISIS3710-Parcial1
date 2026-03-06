import { z } from 'zod'

export const directorSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  photo: z.string().min(1, 'La foto es obligatoria').url('La URL de la foto no es válida'),
  nationality: z.string().min(1, 'La nacionalidad es obligatoria'),
  birthDate: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
  biography: z.string().min(1, 'La biografía es obligatoria'),
})

export type DirectorFormValues = z.infer<typeof directorSchema>