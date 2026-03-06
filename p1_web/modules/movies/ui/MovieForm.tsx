'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { movieSchema, MovieFormValues } from '../validation/movieSchema'
import { useDirectors } from '@/modules/directors/hooks/useDirector'
import { useGenres } from '@/modules/genres/hooks/useGenres'

interface MovieFormProps {
  onSubmit: (data: MovieFormValues) => void
  defaultValues?: MovieFormValues
  isSubmitting: boolean
}

export default function MovieForm({ onSubmit, defaultValues, isSubmitting }: MovieFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<MovieFormValues>({
        resolver: zodResolver(movieSchema),
        defaultValues,
    })
    const { directors } = useDirectors()
    const { genres } = useGenres()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label htmlFor="title" className="block font-medium">Título</label>
        <input
          id="title"
          {...register('title')}
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="poster" className="block font-medium">Póster</label>
        <input
          id="poster"
          type="url"
          {...register('poster')}
          className="w-full p-2 border rounded"
        />
        {errors.poster && <p className="text-red-500 text-sm mt-1">{errors.poster.message}</p>}
      </div>

      <div>
        <label htmlFor="country" className="block font-medium">País</label>
        <input
          id="country"
          {...register('country')}
          className="w-full p-2 border rounded"
        />
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
      </div>

      <div>
        <label htmlFor="duration" className="block font-medium">Duración</label>
        <input
          id="duration"
          type="number"
          {...register('duration', { valueAsNumber: true })}
          className="w-full p-2 border rounded"
        />
        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
      </div>

      <div>
        <label htmlFor="releaseDate" className="block font-medium">Fecha de estreno</label>
        <input
          id="releaseDate"
          type="date"
          {...register('releaseDate')}
          className="w-full p-2 border rounded"
        />
        {errors.releaseDate && <p className="text-red-500 text-sm mt-1">{errors.releaseDate.message}</p>}
      </div>

      <div>
        <label htmlFor="popularity" className="block font-medium">Popularidad</label>
        <input
          id="popularity"
          type="number"
          {...register('popularity', { valueAsNumber: true })}
          className="w-full p-2 border rounded"
        />
        {errors.popularity && <p className="text-red-500 text-sm mt-1">{errors.popularity.message}</p>}
      </div>

      <div>
        <label htmlFor="directorId" className="block font-medium">Director</label>
        <select id="directorId" {...register('directorId')} className="w-full p-2 border rounded">
        <option value="">Selecciona un director</option>
        {directors.map((director) => (
            <option key={director.id} value={director.id}>
            {director.name}
            </option>
        ))}
        </select>
        {errors.directorId && <p className="text-red-500 text-sm mt-1">{errors.directorId.message}</p>}
      </div>

      <div>
        <label htmlFor="genreId" className="block font-medium">Género</label>
        <select id="genreId" {...register('genreId')} className="w-full p-2 border rounded">
        <option value="">Selecciona un género</option>
        {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
            {genre.type}
            </option>
        ))}
        </select>
        {errors.genreId && <p className="text-red-500 text-sm mt-1">{errors.genreId.message}</p>}
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