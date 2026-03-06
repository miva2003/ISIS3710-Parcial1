'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { genreSchema, GenreFormValues } from '../validation/genreSchema'

interface GenreFormProps {
  onSubmit: (data: GenreFormValues) => void
  defaultValues?: GenreFormValues
  isSubmitting: boolean
}

export default function GenreForm({ onSubmit, defaultValues, isSubmitting }: GenreFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<GenreFormValues>({
    resolver: zodResolver(genreSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label htmlFor="type" className="block font-medium">Tipo</label>
        <input
          id="type"
          {...register('type')}
          className="w-full p-2 border rounded"
        />
        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
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