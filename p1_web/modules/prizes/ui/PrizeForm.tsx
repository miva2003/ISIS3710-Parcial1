'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { prizeSchema, PrizeFormValues } from '../validation/prizeSchema'

interface PrizeFormProps {
  onSubmit: (data: PrizeFormValues) => void
  defaultValues?: PrizeFormValues
  isSubmitting: boolean
}

export default function PrizeForm({ onSubmit, defaultValues, isSubmitting }: PrizeFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PrizeFormValues>({
    resolver: zodResolver(prizeSchema),
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
        <label htmlFor="category" className="block font-medium">Categoría</label>
        <input
          id="category"
          {...register('category')}
          className="w-full p-2 border rounded"
        />
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="year" className="block font-medium">Año</label>
        <input
          id="year"
          {...register('year')}
          className="w-full p-2 border rounded"
        />
        {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block font-medium">Estado</label>
        <input
          id="status"
          {...register('status')}
          className="w-full p-2 border rounded"
        />
        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
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