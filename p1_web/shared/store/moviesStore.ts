import { create } from 'zustand'
import { Movie } from '@/modules/movies/types/movie'

interface MovieStore {
  movies: Movie[]
  selectedMovie: Movie | null
  setMovies: (movies: Movie[]) => void
  addMovie: (movie: Movie) => void
  updateMovie: (movie: Movie) => void
  deleteMovie: (id: string) => void
  selectMovie: (movie: Movie | null) => void
}

export const useMoviesStore = create<MovieStore>((set) => ({
  movies: [],
  selectedMovie: null,
  setMovies: (movies: Movie[]) => set({ movies }),
  addMovie: (movie) => set((s) => ({ movies: [...s.movies, movie] })),
  updateMovie: (updated) => set((s) => ({
    movies: s.movies.map((m) => m.id === updated.id ? updated : m),
  })),
  deleteMovie: (id) => set((s) => ({
    movies: s.movies.filter((m) => m.id !== id),
  })),
  selectMovie: (movie) => set({ selectedMovie: movie }),
}))