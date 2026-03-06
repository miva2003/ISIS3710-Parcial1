'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema, ReviewFormValues } from '@/modules/reviews/validation/reviewSchema'
import { reviewService } from '@/modules/reviews/services/reviewService'
import { Review } from '@/modules/reviews/types/review'

interface ReviewFormProps {
  movieId: string
  onReviewAdded: (review: Review) => void
}

export default function ReviewForm({ movieId, onReviewAdded }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
  })

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      setIsSubmitting(true)
      const created = await reviewService.create(movieId, data)
      onReviewAdded(created)
      reset()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label htmlFor="creator" className="block font-medium">Tu nombre</label>
        <input
          id="creator"
          {...register('creator')}
          className="w-full p-2 border rounded"
        />
        {errors.creator && <p className="text-red-500 text-sm mt-1">{errors.creator.message}</p>}
      </div>

      <div>
        <label htmlFor="score" className="block font-medium">Puntuación (1-5)</label>
        <input
          id="score"
          type="number"
          min={1}
          max={5}
          {...register('score', { valueAsNumber: true })}
          className="w-full p-2 border rounded"
        />
        {errors.score && <p className="text-red-500 text-sm mt-1">{errors.score.message}</p>}
      </div>

      <div>
        <label htmlFor="text" className="block font-medium">Review</label>
        <textarea
          id="text"
          rows={4}
          {...register('text')}
          className="w-full p-2 border rounded"
        />
        {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-red-900 text-white font-bold py-2 px-6 rounded hover:bg-red-800 disabled:bg-gray-300"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar review'}
      </button>
    </form>
  )
}