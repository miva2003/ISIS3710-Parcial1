import { create } from 'zustand'
import { Review } from '@/modules/reviews/types/review'

interface ReviewsStore {
  reviews: Review[]
  setReviews: (reviews: Review[]) => void
  addReview: (review: Review) => void
}

export const useReviewsStore = create<ReviewsStore>((set) => ({
  reviews: [],
  setReviews: (reviews) => set({ reviews }),
  addReview: (review) => set((s) => ({ reviews: [...s.reviews, review] })),
}))