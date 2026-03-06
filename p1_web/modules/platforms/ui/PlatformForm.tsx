'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { platformSchema, PlatformFormValues } from '../validation/platformSchema'

interface PlatformFormProps {
  onSubmit: (data: PlatformFormValues) => void
  defaultValues?: PlatformFormValues
  isSubmitting: boolean
}

export default function PlatformForm({ onSubmit, defaultValues, isSubmitting }: PlatformFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PlatformFormValues>({
    resolver: zodResolver(platformSchema),
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
        <label htmlFor="url" className="block font-medium">URL</label>
        <input
          id="url"
          type="url"
          {...register('url')}
          className="w-full p-2 border rounded"
        />
        {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
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