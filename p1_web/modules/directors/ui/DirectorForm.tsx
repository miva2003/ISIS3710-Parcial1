'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { directorSchema, DirectorFormValues } from '../validation/directorSchema'

interface DirectorFormProps {
  onSubmit: (data: DirectorFormValues) => void
  defaultValues?: DirectorFormValues
  isSubmitting: boolean
}

export default function DirectorForm({ onSubmit, defaultValues, isSubmitting }: DirectorFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<DirectorFormValues>({
    resolver: zodResolver(directorSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label htmlFor="name" className="block font-medium">Nombre</label>
        <input
          id="name"
          {...register('name')}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="photo" className="block font-medium">Foto</label>
        <input
          id="photo"
          type="url"
          {...register('photo')}
          className="w-full p-2 border rounded"
        />
        {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
      </div>

      <div>
        <label htmlFor="nationality" className="block font-medium">Nacionalidad</label>
        <input
          id="nationality"
          {...register('nationality')}
          className="w-full p-2 border rounded"
        />
        {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>}
      </div>

      <div>
        <label htmlFor="birthDate" className="block font-medium">Fecha de nacimiento</label>
        <input
          id="birthDate"
          type="date"
          {...register('birthDate')}
          className="w-full p-2 border rounded"
        />
        {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
      </div>

      <div>
        <label htmlFor="biography" className="block font-medium">Biografía</label>
        <input
          id="biography"
          {...register('biography')}
          className="w-full p-2 border rounded"
        />
        {errors.biography && <p className="text-red-500 text-sm mt-1">{errors.biography.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-red-900 text-white font-bold py-2 px-6 rounded hover:bg-red-800 disabled:bg-gray-300"
      >
        {isSubmitting ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}